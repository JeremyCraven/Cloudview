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

<<<<<<< HEAD
router.route('/api/create_account').get((req, res) => {
	res.json({
		status: 200
	});
});

router.route('/api/login').post((req, res) => {
    // Check if user exists
=======
router.route('/users/create_account').post((req, res) => {
    var name = req.body.name;
    var username = req.body.username;
	var email = req.body.email;
    var password = req.body.password;

    console.log(req.body);

    User.findOne({ 'email': email}, (err, user) => {
        if (err) {
            res.json({
                status: 'Error'
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
                    res.json({
                        status: 'Error'
                    });
                }
                else {
                    res.json({
                        user: newAccount
                    });
                }
            });
        }
        else {
            // Account already exists
            console.log(user);
            res.json({
                status: 'Error'
            });
        }
    });
});

router.route('/users/login').post((req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
>>>>>>> origin/master

    // TODO
    var login_credentials = (username == undefined) ? email : username;

    // Check if user exists
    User.findOne({ 'email': email, 'password': password }, (err, user) => {
        if (err) {
            res.json({
                status: 'Error'
            });
        }
        else if (user === null) {
            // Check username instead of email
            User.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err) {
                    res.json({
                        status: 'Error'
                    });
                }
                else if (user === null) {
                    res.json({
                        status: 'Invalid login'
                    });
                }
                else {
                    res.json({
                        // return the user
                        status: 'Error'
                    });
                }
            })
        }
        else {
            res.send("TODO");
        }
    });
});

router.route('/users/auth_google').get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/drive'] }));

router.route('/users/auth_google_callback').get(
    passport.authenticate('google',
        { 
            failureRedirect: '/signup',
            session: false
        }
    ),
    (req, res) => {
        res.redirect('/');
    }
);

var savedAuth = null
var dropboxSavedToken = null

router.route('/api/v1/get_files').get((req, res) => {
	var folder = req.query.folderId;
	if (!folder) { folder = ''; }
	var pageToken = req.query.pageToken;
	api_access.get_files(folder, pageToken, res);
});

// TODO: this is temp. In the future, we should call this api_access.login when we
// login to a specific account and use api_access.store_credentials(creds)
// otherwise when we have the authentication token stored in the db
//
// TODO: edit api_access.login to not take the res, because we won't call
// it from an endpoint
router.route('/api/v1/login').get((req, res) => {
	api_access.login(['google', 'dropbox'], res);
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