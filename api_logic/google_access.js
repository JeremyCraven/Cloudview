var fs = require('fs');
var readline = require('readline');

var google = require('googleapis');
var googleAuth = require('google-auth-library');

var conf = require('../config.js');


// TODO: stub out service (for google) and see if we can fake api calls for unit testing\

var access = new Object();
access.service = google.drive('v3')

access.login_google = function(storeAuth) {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + JSON.stringify(err));
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Drive API.
    authorize(JSON.parse(content), storeAuth);
  });
}

var get_google_creds = function(auth, refresh, callback) {
  var auth_obj = new googleAuth();
  var oauth2Client = new auth_obj.OAuth2(conf.CLIENT_ID, conf.CLIENT_SECRET, conf.GOOGLE_AUTH_REDIRECT_URL);
  oauth2Client.credentials = auth;

  // TODO: We only actually pass back the token in the get_google_files case. That means if we have an
  // expired token in any other case, we just ignore the refresh and call refresh every time from here
  // on out. Hopefully that won't cause issues. It's a bit of an edge case.
  if (refresh && auth.expiry < new Date().getTime()) {
    oauth2Client.refreshAccessToken(function(err, tokens) {
      //console.log(auth);
      //console.log(err);
      //console.log(tokens);
      oauth2Client.credentials = tokens;
      callback(oauth2Client, tokens);
    });
  } else {
    callback(oauth2Client, null);
  }
}

// page token is so you can get the next page
// null folder for root, null pagetoken for first page
// webViewLink will supply a preview (provided by Google), or the link to the google doc
// webContentLink will appear for non-google doc files and allows you to download the file
access.get_google_files = function(auth, folder, pageToken, res) {
  var query = "'root' in parents and trashed = false";
  if (folder != null) {
    query = "'"+folder+"'" + " in parents and trashed = false"
  }

  get_google_creds(auth, true, (oauth2Client, new_token) => {
    var req = {
      auth: oauth2Client,
      q: query,
      fields: 'nextPageToken, files(mimeType,id,name,parents,webContentLink,webViewLink,modifiedTime)'
    }
    if (pageToken != null) {
      req.pageToken = pageToken
    }
    this.service.files.list(req, function(err, response) {
      if (err) {
        res('The API returned an error: ' + JSON.stringify(err), null, null);
        return;
      }
      var files = response.files;
      if (files.length == 0) {
          res('No files found.', null, new_token);
      } else {
        res(null, response, new_token);
      }
    });
  });
  
}
access.move_google_file = function(auth, fileId, folderId, res) {

  get_google_creds(auth, false, (oauth2Client) => {
    this.service.files.get({
      auth: oauth2Client,
      fileId: fileId,
      fields: 'parents'
    }, (err, file) => {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        // Move the file to the new folder
        var previousParents = file.parents.join(',');
        this.service.files.update({
          auth: oauth2Client,
          fileId: fileId,
          addParents: folderId,
          removeParents: previousParents,
          fields: 'id, parents'
        }, function(err, file) {
          if(err) {
            console.log(err)
          } else {
            res(null, {success: true});
          }
        });
      }
    });
  });

};

access.upload_google_file = function(auth, file, res) {
  var auth_obj = new googleAuth();
  var oauth2Client = new auth_obj.OAuth2(conf.CLIENT_ID, conf.CLIENT_SECRET, conf.GOOGLE_AUTH_REDIRECT_URL);
  oauth2Client.credentials = auth;

  var drive = google.drive({ version: 'v3', auth: oauth2Client });

  drive.files.create({
    resource: {
      name: file.originalname,
      mimeType: file.mimetype
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream('./tmp/uploads/' + file.filename)
    }
  }, (err, response) => {
    fs.unlink('./tmp/uploads/' + file.filename);

    if (err) {
      console.log(err);
      res(null, { success: false });
    }
    else {
      res(null, { success: true });
    }
  });

};

access.delete_google_file = function(auth, fileId, res) {

  get_google_creds(auth, false, (oauth2Client) => {
    var req = {
      auth: oauth2Client,
      fileId: fileId
    };
    this.service.files.delete(req, (err, response) => {
      if (err) {
        console.log(err)
      } else {
        res(null, {success: true});
      }
    });
  });
}
access.get_google_file = function(auth, fileId, res) {
  var req = {
    auth: auth,
    fileId: fileId,
    fields: 'mimeType,id,name,parents,webContentLink,webViewLink'
  }
  this.service.files.get(req, function(err, response) {
    if (err) {
      res('The API returned an error: ' + JSON.stringify(err));
      return;
    }
    res(response);
  });
}
access.get_google_account_info = function(auth, res) {

  get_google_creds(auth, false, (oauth2Client) => {
    var req = {
      auth: oauth2Client,
      fields: 'storageQuota,user'
    }
    this.service.about.get(req, (err, response) => {
      if (err) {
        res('The API returned an error: ' + JSON.stringify(err));
        return;
      }
      var obj = {};
      obj.email = response.user.emailAddress
      obj.storage = {};
      obj.storage.used = response.storageQuota.usage;
      obj.storage.limit = response.storageQuota.limit;
      res(obj);
    });
  });
}

access.create_google_folder = function(auth, folderName, parentFolder, res) {
  get_google_creds(auth, false, (oauth2Client) => {
    var fileMetadata = {
      name : folderName,
      mimeType : 'application/vnd.google-apps.folder'
    };
    if (parentFolder !== 'root') {
      fileMetadata.parents = [parentFolder];
    }

    this.service.files.create({
      auth: oauth2Client,
      resource: fileMetadata,
      fields: 'id,mimeType,name,parents'
    }, function(err, file) {
      if (err) {
        res('The API returned an error: ' + JSON.stringify(err));
        return;
      }
      res(file);
    });
  });
}

access.get_token_from_code = function(code, callback) {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(conf.CLIENT_ID, conf.CLIENT_SECRET, 'urn:ietf:wg:oauth:2.0:oob');
  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    oauth2Client.credentials = token;
    callback(oauth2Client);
  });
}






// ********* GOOGLE API AUTHENTICATION *********



// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  // ****** TODO ********
  // write to our user object in mongodb for later use
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {

	var service = google.drive('v3');
  	service.files.list({
    	auth: auth,
    	pageSize: 10,
    	fields: "nextPageToken, files(id, name)"
  	}, function(err, response) {
    	if (err) {
      	console.log('The API returned an error: ' + err);
      	return;
    	}
    	var files = response.files;
    	if (files.length == 0) {
      	console.log('No files found.');
    	} else {
      	console.log('Files:');
      	for (var i = 0; i < files.length; i++) {
        	var file = files[i];
        	console.log('%s (%s)', file.name, file.id);
      	}
    }
  });
}

module.exports = access;