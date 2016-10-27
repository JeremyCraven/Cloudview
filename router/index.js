var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var DropboxOAuth2Strategy = require('passport-dropbox-oauth2').Strategy;
var OneDriveStrategy = require('passport-onedrive').Strategy;
var jwt = require('jsonwebtoken');
var https = require('https');

// Config
var conf = require('../config.js');
var conf_global = require('../config_global.js');

// Models
var User = require('../models/user');
var CloudAccount = require('../models/cloud_account');

// API Logic
var api_access_google = require('../api_logic/google_access');
var api_access_dropbox = require('../api_logic/api_access_dropbox');
var api_access_onedrive = require('../api_logic/api_access_onedrive');
var api_access = require('../api_logic/api');

const util = require('util');

// Auth Google Strategy
passport.use(new GoogleStrategy({
        clientID: conf.CLIENT_ID,
        clientSecret: conf.CLIENT_SECRET,
        callbackURL: conf.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, params, profile, done) {
        var userInfo = {
            accountType: 'google',
            accountId: 'google-' + profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        return done(null, userInfo);
    }
));

passport.use(new DropboxOAuth2Strategy({
    apiVersion: '2',
    clientID: conf.DROPBOX_ID,
    clientSecret: conf.DROPBOX_SECRET,
    callbackURL: conf.DROPBOX_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    var userInfo = {
            accountType: 'dropbox',
            accountId: 'dropbox-' + profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    return done(null, userInfo);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Auth OneDrive Strategy
passport.use(new OneDriveStrategy({
        clientID: conf_global.ONEDRIVE_CLIENT_ID,
        clientSecret: conf_global.ONEDRIVE_CLIENT_SECRET,
        callbackURL: conf_global.ONEDRIVE_CALLBACK
      },
      function(accessToken, refreshToken, profile, done) {
        var userInfo = {
            accountType: 'onedrive',
            accountId: 'onedrive-' + profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken
        };

        return done(null, userInfo);
      }
));

// Create an account
router.route('/users/create_account').post((req, res) => {
    var name = req.body.name;
    var username = req.body.username;
	var email = req.body.email;
    var password = req.body.password;

    User.findOne({ 'email': email}, (err, user) => {
        if (err) {
            res.status(403).json({
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
                    res.status(403).json({
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
            res.status(403).json({
                message: 'Error: Account already exists'
            });
        }
    });
});

// Login
router.route('/users/login').post((req, res) => {
    var login = req.body.username;
    var password = req.body.password;

    // Check if user exists
    User.findOne({ 'email': login })
    .populate('google_accounts dropbox_accounts onedrive_accounts')
    .exec((err, user) => {
        if (err) {
            res.status(403).json({
                message: 'Error: Database access'
            });
        }
        else if (user === null) {
            // Check username instead of email
            User.findOne({ 'username': login })
            .populate('google_accounts dropbox_accounts onedrive_accounts')
            .exec((err, user) => {
                if (err) {
                    res.status(403).json({
                        message: 'Error: Database access'
                    });
                }
                else if (user === null) {
                    res.status(403).json({
                        message: 'Error: Invalid login'
                    });
                }
                else {
                    // test a matching password
                    user.comparePassword(password, function(err, isMatch) {
                        if (err) {
                            res.status(403).json({
                                message: 'Error: Password decrypting'
                            });
                        }
                        else if (isMatch) {
                            var token = jwt.sign({ id: user._id }, conf.TOKEN_SECRET, {
                                expiresIn: '3h'
                            });
                            res.status(200).json({
                                user: {
                                    name: user.name,
                                    email: user.email,
                                    token: token,
                                    google_accounts: user.google_accounts,
                                    dropbox_accounts: user.dropbox_accounts,
                                    onedrive_accounts: user.onedrive_accounts
                                },
                                message: 'Successful login'
                            });
                        }
                        else {
                            res.status(403).json({
                                message: 'Error: Invalid login'
                            });    
                        }
                    });
                }
            });
        }
        else {
            // Test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) {
                    res.status(403).json({
                        message: 'Error: Password decrypting'
                    });
                }
                else if (isMatch) {
                    var token = jwt.sign({ id: user._id }, conf.TOKEN_SECRET, {
                        expiresIn: '1h'
                    });

                    res.status(200).json({
                        user: {
                            name: user.name,
                            email: user.email,
                            token: token,
                            google_accounts: user.google_accounts,
                            dropbox_accounts: user.dropbox_accounts,
                            onedrive_accounts: user.onedrive_accounts
                        },
                        message: 'Successful login'
                    });
                }
                else {
                    res.status(403).json({
                        message: 'Error: Invalid login'
                    });
                }
            });
        }
    });
});

// verify token for login skipping
router.route('/users/verify_token').post((req, res) => {
    var token = req.body.token;

    if (!token) {
        token = req.query.state;
        req.token = token;
    }
    
    if (token) {
        jwt.verify(token, conf.TOKEN_SECRET, function(err, decoded) {
            if (err) {
                res.status(403).json({
                    message: 'Error: Invalid token'
                });
            }
            else {
                res.status(200).json({
                    message: 'success'
                })
            }
        });
    }
    else {
        res.status(403).json({
            message: 'Error: Invalid token'
        });
    }
});

// Protects routes
router.use((req, res, next) => {
    var token = req.body.token;

    if (!token) {
        token = req.query.state;
    }

    req.token = token;
    
    if (token) {
        jwt.verify(token, conf.TOKEN_SECRET, function(err, decoded) {
            if (err) {
                res.status(403).json({
                    message: 'Error: Invalid token'
                });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.status(403).json({
            message: 'Error: Invalid token'
        });
    }
});

// TODO: Get user info from token, if no token send to login page
router.route('/users/get_user').post((req, res) => {
    var token = req.body.token;

    if (!token) {
        // 403 message go to login page
        res.status(403).json({
            message: 'Error: Invalid token'
        });
    }
    else {
        User.findOne({ _id: req.decoded.id })
            .populate('google_accounts')
            .populate('dropbox_accounts')
            .exec(function(err, user) {
                if (err) {
                    res.status(403).json({
                        message: 'Error: Database access'
                    });
                }
                else {
                    res.status(200).json(user);
                }
        });
    }
});

router.route('/users/auth_dropbox').get((req, res, next) => {
    passport.authenticate('dropbox-oauth2', {
        accessType: 'offline',
        approvalPrompt: 'force',
        session: false,
        state: req.query.state
    })(req, res, next);
});

router.route('/users/auth_dropbox_callback').get(
    passport.authenticate('dropbox-oauth2',
        {
            failureRedirect: '/'
        }
    ),
    (req, res) => {
        // TODO: use one method for google and dropbox callbacks *************
        var userInfo = req.user;

        User.findOne({ _id: req.decoded.id }, function(err, user) {
            if (err) {
                res.status(403).json({
                    Error: err
                });
            }
            else {
                var newDropboxAccount = CloudAccount();
                newDropboxAccount.accountType = userInfo.accountType;
                newDropboxAccount.accountId = userInfo.accountId;
                newDropboxAccount.accessToken = userInfo.accessToken;
                newDropboxAccount.refreshToken = userInfo.refreshToken;

                newDropboxAccount.save(function(err) {
                    if (err) {
                        res.status(403).json({
                            Error: err
                        });
                    }
                    else {
                        if (!user.dropbox_accounts) { user.dropbox_accounts = []; }
                        user.dropbox_accounts.push(newDropboxAccount);
                        user.save(function(err) {
                            if (err) {
                                res.status(403).json({
                                    Error: err
                                });
                            } else {
                                //res.json({success: true});
                                res.redirect('/');
                            }
                        });
                    }
                });
            }
        });

        /*res.json({
            message: 'Successfully authenticated with google drive'
        });*/
    }
);

router.route('/users/auth_google').get((req, res, next) => {
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/plus.login'],
        accessType: 'offline',
        approvalPrompt: 'force',
        session: false,
        state: req.query.state
    })(req, res, next);
});

router.route('/users/auth_google_callback').get(
    passport.authenticate('google',
        { 
            failureRedirect: '/',
            session: false
        }
    ),
    (req, res) => {
        var userInfo = req.user;

        User.findOne({ _id: req.decoded.id }, function(err, user) {
            if (err) {
                res.status(403).json({
                    Error: err
                });
            }
            else {
                var newGoogleAccount = CloudAccount();
                newGoogleAccount.accountType = userInfo.accountType;
                newGoogleAccount.accountId = userInfo.accountId;
                newGoogleAccount.accessToken = userInfo.accessToken;
                newGoogleAccount.refreshToken = userInfo.refreshToken;

                newGoogleAccount.save(function(err) {
                    if (err) {
                        res.status(403).json({
                            Error: err
                        });
                    }
                    else {
                        if (!user.google_accounts) { user.google_accounts = []; }
                        user.google_accounts.push(newGoogleAccount);
                        user.save(function(err) {
                            if (err) {
                                res.status(403).json({
                                    Error: err
                                });
                            } else {
                                //res.json({success: true});
                                res.status(200).redirect('/#/folder');
                            }
                        });
                    }
                });
            }
        });

        /*res.json({
            message: 'Successfully authenticated with google drive'
        });*/
    }
);

router.route('/users/auth_onedrive').get((req, res, next) => {
    passport.authenticate('onedrive', {
        scope: ["wl.basic", "wl.offline_access", "wl.skydrive_update"],
        state: req.query.state
    })(req, res, next);
});

router.route('/users/auth_onedrive_callback').get( 
    passport.authenticate('onedrive',
        { 
            failureRedirect: '/',
            session: false
        }
    ),
    (req, res) => {
        var userInfo = req.user;

        User.findOne({ _id: req.decoded.id }, function(err, user) {
            if (err) {
                res.status(500).json({
                    Error: err
                });
            }
            else {
                var newOneDriveAccount = CloudAccount();
                newOneDriveAccount.accountType = userInfo.accountType;
                newOneDriveAccount.accountId = userInfo.accountId;
                newOneDriveAccount.accessToken = userInfo.accessToken;
                newOneDriveAccount.refreshToken = userInfo.refreshToken;

                newOneDriveAccount.save(function(err) {
                    if (err) {
                        res.status(500).json({
                            Error: err
                        });
                    }
                    else {
                        if (!user.onedrive_accounts) { user.onedrive_accounts = []; }
                        user.onedrive_accounts.push(newOneDriveAccount);
                        user.save(function(err) {
                            if (err) {
                                res.status(500).json({
                                    Error: err
                                });
                            } else {
                                // success!
                                res.status(200).redirect('/');
                            }
                        });
                    }
                });
            }
        });
    }
);

var savedAuth = null
var dropboxSavedToken = null

getCredentials = function(req, callback) {
    User.findOne({ _id: req.decoded.id })
        .populate('google_accounts')
        .populate('dropbox_accounts')
        .populate('onedrive_accounts')
        .exec(function(err, user) {
            if (err) {
                callback(null);
            }
            else {
                // TODO: merge the two/three loops into one loop **************************
                var credentials = {};
                if (user && 'google_accounts' in user && user.google_accounts.length > 0) {
                    credentials.google = {};
                    for (account of user.google_accounts) {
                        // TODO: make it so it doesn't only get the last one
                        credentials.google.access_token = account.accessToken;
                        credentials.google.refresh_token = account.refreshToken;
                    }
                }

                if (user && 'dropbox_accounts' in user && user.dropbox_accounts.length > 0) {
                    credentials.dropbox = {};
                    for (account of user.dropbox_accounts) {
                        // TODO: make it so it doesn't only get the last one
                        credentials.dropbox.access_token = account.accessToken;
                        credentials.dropbox.refresh_token = account.refreshToken;
                    }
                }

                if (user && 'onedrive_accounts' in user && user.onedrive_accounts.length > 0) {
                    credentials.onedrive = {};
                    for (account of user.onedrive_accounts) {
                        // TODO: make it so it doesn't only get the last one
                        credentials.onedrive.access_token = account.accessToken;
                        credentials.onedrive.refresh_token = account.refreshToken;
                    }
                }
                
                credentials.cloudview = req.token;
                callback(credentials);
            }
    });
}

router.route('/upload_file').post((req, res) => {
    var file = req.file;

    getCredentials(req, (creds) => {
        var callback = function(obj) {
            console.log(file);
            res.status(200).json({
                message: "Working"
            });
        };

        api_access.upload_file(creds, file, callback);
    });
});

router.route('/move_file').post((req, res) => {
    var file = req.body.fileId;
    var folder = req.body.folderId;

    getCredentials(req, (creds) => {
        var callback = function(obj) {
            res.send(obj);
        };
        api_access.move_file(creds, file, folder, callback);
    });
});

router.route('/get_files').post((req, res) => {
	var folder = req.body.folderId;
	if (!folder) { folder = ''; }
	var pageToken = req.body.pageToken;

    getCredentials(req, (creds) => {
        var callback = function(obj) {
            // if obj doesn't have obj.error, it will be the object you have to return to the user
            res.send(obj);
        };
        api_access.get_files(creds, folder, pageToken, callback);
    });   
});

router.route('/download_dropbox_file').get((req, res) => {
    var file = req.query.fileId;
    getCredentials(req, (creds) => {
        api_access.download_dropbox(creds, file, (obj) => {
            obj.url
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + file
            });
            //https.get(obj.url).pipe(res)
            https.get(obj.url, function(response) {
              response.pipe(res);
            });
        });
    });
});

router.route('/delete_file').post((req, res) => {
    var file = req.body.fileId;
    getCredentials(req, (creds) => {
        var callback = function(obj) {
            // if obj doesn't have obj.error, it will be the object you have to return to the user
            res.send(obj);
        };
        api_access.delete_file(creds, file, callback);
    });  
});
router.route('/users/get_info').post((req, res) => {
    getCredentials(req, (creds) => {
        api_access.get_account_info(creds, (obj) => {
            res.send(obj);
        });
    });
});

/*
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
*/

/*
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
	return !req.params.file_path ? '' : req.params.file_path;
}
*/

module.exports = router;