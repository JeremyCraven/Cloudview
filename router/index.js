var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Config
var conf = require('../config.js');

// Models
var User = require('../models/user');

// API Logic
var api_access_google = require('../api_logic/google_access');
var api_access_dropbox = require('../api_logic/api_access_dropbox');
var api_access = require('../api_logic/api');

// Auth
passport.use(new GoogleStrategy({
        clientID: conf.CLIENT_ID,
        clientSecret: conf.CLIENT_SECRET,
        callbackURL: conf.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('ACCESS TOKEN: ' + accessToken);
        return done({ success: true });
    }
));

router.use((req, res, next) => {
    // Default route
    next();
});

router.route('/routes').get((req, res) => {
    res.json(router.stack);
});

router.route('/users/create_account').post((req, res) => {
    var name = req.body.name;
    var username = req.body.username;
	var email = req.body.email;
    var password = req.body.password;

    User.findOne({ 'email': email}, (err, user) => {
        if (err) {
            res.status(500).json({
                message: 'Error: Database access'
            });
        }
        else if (user === null) {
            // Create a new account
            var newAccount = User();
            newAccount.name = name;
            newAccount.username = username;
            newAccount.email = email;
            newAccount.password = password;

            newAccount.save((err) => {
                if (err) {
                    res.status(500).json({
                        error: err,
                        message: 'Error: Account creation failed'
                    });
                }
                else {
                    res.status(200).json({
                        message: 'Successful account creation'
                    });
                }
            });
        }
        else {
            // Account already exists
            res.status(500).json({
                message: 'Error: Account already exists'
            });
        }
    });
});

router.route('/users/login').post((req, res) => {
    var login = req.body.login;
    var password = req.body.password;

    // Check if user exists
    User.findOne({ 'email': login }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: 'Error: Database access'
            });
        }
        else if (user === null) {
            // Check username instead of email
            User.findOne({ 'username': login }, (err, user) => {
                if (err) {
                    res.status(500).json({
                        message: 'Error: Database access'
                    });
                }
                else if (user === null) {
                    res.status(401).json({
                        message: 'Error: Invalid login'
                    });
                }
                else {
                    // test a matching password
                    user.comparePassword(password, function(err, isMatch) {
                        if (err) {
                            res.status(500).json({
                                message: 'Error: Password decrypting'
                            });
                        }
                        else if (isMatch) {
                            res.status(200).json({
                                message: 'Successful login'
                            });
                        }
                    });
                }
            })
        }
        else {
            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) {
                    res.status(500).json({
                        message: 'Error: Password decrypting'
                    });
                }
                else if (isMatch) {
                    res.status(200).json({
                        message: 'Successful login'
                    });
                }
            });
        }
    });
});

router.route('/users/auth_google').get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/drive'] }));

router.route('/users/auth_google_callback').get(
    passport.authenticate('google',
        { 
            failureRedirect: '/',
            session: false
        }
    ),
    (req, res) => {
        res.redirect('/');
    }
);

var savedAuth = null
var dropboxSavedToken = null

router.route('/get_files').get((req, res) => {
	var folder = req.query.folderId;
	if (!folder) { folder = ''; }
	var pageToken = req.query.pageToken;
    var credentials = { google: {token: 'blah'}};// TODO: get based on person who requests **** JEREMY
	res.json(api_access.get_files(credentials, folder, pageToken));
});

router.route('/authorize_google').get((req, res) => {
	function saveAuth(auth) {
		savedAuth = auth;
		res.send("saved auth");
	}

	api_access_google.login_google(saveAuth);
});

router.route('/get_google_files').get((req, res) => {
	function result(obj) {
		res.json(obj)
	}
	var folder = req.query.folderId;
	api_access_google.get_google_files(savedAuth, folder, null, result)
});

router.route('/upload_google_text').get((req, res) => {
	function result(obj) {
		res.json(obj)
	}
	var fileObj = {mimeType: 'text/plain', body: 'hello world!'};
	api_access.put_google_file(savedAuth, "hello.txt", fileObj, result)
});

router.route('/authorize_dropbox').get((req, res) => {
		function saveAuth(auth) {
		savedAuth = auth;
	}
	api_access_dropbox.authorize(res, saveAuth);
});

router.route('/authorized_dropbox').get((req, res) => {
	function saveAuth(auth) {
		dropboxSavedToken = auth;
		res.send("Thank you for authorizing your Dropbox account! :) </br><a href = \"./dropbox_temp_available\">Click here to see what you can do!</a>")
	}
	api_access_dropbox.authorized(savedAuth, res, saveAuth);
});

router.route('/dropbox_temp_available').get((req, res) => {
	res.send("<a href = \"./dropbox_account_info\">/dropbox_account_info</a></br>" +
	//"<a href = \"./dropbox_all\">/dropbox_all</a> -> Shows <a href=\"http://media.giphy.com/media/wPrqe5846Z9GU/giphy.gif\">everything</a> recursively in dropbox_all/file_path dir. Default is root</br>" + 
	"<a href = \"./dropbox_file_metadata\">/dropbox_file_metadata</a> -> Go to /dropbox_file_metadata/file_path for specific file. Example, /dropbox_file_metadata/Photos/hello.png</br>" + 
	"<a href = \"./dropbox_file_link\">/dropbox_file_link</a> -> Same as above </br>" + 
	"<a href = \"./dropbox_file_stream\">/dropbox_file_stream</a> -> Same as above (Only applies to downloadable files)</br>" +
	"<a href = \"./dropbox_search/foo/\">/dropbox_search/foo/</a> -> /to_search/where_to_search</br>" +
	"<a href = \"./dropbox_create/foo/Hello%20World\">/dropbox_create/foo/Hello%20World</a> -> Uploads foo.txt in root with text 'Hello World'</br>");

});

router.route('/dropbox_account_info').get((req, res) => {
	api_access_dropbox.account_info(dropboxSavedToken, res);
});

router.route('/dropbox_all/:file_path(*)?').get((req, res) => {
	console.log("GOT : " + get_path(req));
	api_access_dropbox.show_all(dropboxSavedToken, get_path(req), res);
});

router.route('/dropbox_file_metadata/:file_path(*)?').get((req, res) => {
	var temp = function(obj) {
		res.send(obj);
	}
	api_access_dropbox.metadata(dropboxSavedToken, get_path(req), temp);
});

router.route('/dropbox_file_link/:file_path(*)?').get((req, res) => {
	api_access_dropbox.get_link(dropboxSavedToken, get_path(req), res);
});

router.route('/dropbox_file_stream/:file_path(*)?').get((req, res) => {
	api_access_dropbox.get_streamable(dropboxSavedToken, get_path(req), res);
});

router.route('/dropbox_search/:search/:file_path(*)?').get((req, res) => {
	api_access_dropbox.search(dropboxSavedToken, req.params.search, get_path(req), res);
});

router.route('/dropbox_create/:file_name/:text').get((req, res) => {
	api_access_dropbox.create(dropboxSavedToken, req.params.file_name + ".txt", req.params.text, res);
});

function get_path(req) {
	return !req.params.file_path ? '' : req.params.file_path
}

module.exports = router;