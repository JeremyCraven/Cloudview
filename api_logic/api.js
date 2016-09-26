var api_access_google = require('../api_logic/google_access');
var api_access_dropbox = require('../api_logic/api_access_dropbox');

var google_token;
var dropbox_token;

var api = new Object();
// options is array with any/all of the following:
// [ 'google', 'dropbox', 'onedrive' ]
api.login = function(options, res) {
	for (var i = 0; i < options.length; i++) {
		switch (options[i]) {
			case 'google':
				var saveAuth = function(auth) {
					google_token = auth;
				}
				api_access_google.login_google(saveAuth);
				break;
			case 'dropbox':
				var getReq = function(auth) {
					var saveAuth = function(auth2) {
						dropbox_token = auth2;
					}
					// get access token which we can then save
					api_access_dropbox.authorized(auth, null, saveAuth);
				}
				// get request token if needed
				api_access_dropbox.authorize(null, getReq);
				break;
			default:
				console.log('Service not recognized');
		}
		if (i == options.length - 1) {
			res.json({success: true});
		}
	}
}
// creds is an object with the credentials
// { google: {...}, dropbox: {...}, onedrive: {...}}
api.store_credentials = function(creds) {
	if ('google' in creds) {
		google_token = creds.google;
	}
	if ('dropbox' in creds) {
		dropbox_token = creds.dropbox;
	}
}
// folder is a string id for the folder
api.get_files = function(folder, pageToken, res) {
	var sp = folder.split('|');
	var id = sp[1];
	var service = sp[0];
	switch (service) {
		case 'google':
			var callback = function(err, obj) {
				if (err) { res.send(err); }
				else { 
					var ret = new Object();
					if ('nextPageToken' in obj) { ret.nextPageToken = obj.nextPageToken; }
					ret.files = [];
					obj.files.forEach((file) => {
						var f = new Object();
						f.id = 'google|' + file.id;
						f.mimeType = file.mimeType;
						f.isDir = (f.mimeType === 'application/vnd.google-apps.folder');
						f.name = file.name;
						if ('webViewLink' in obj) { f.webViewLink = file.webViewLink; }
						if ('webContentLink' in obj) { f.webContentLink = file.webContentLink; }

						ret.files.push(f);
					});

					res.json(ret); 
				}
			}
			api_access_google.get_google_files(google_token,
				id === undefined ? null : id,
				pageToken,
				callback);
			break;
		case 'dropbox':
			var callback = function(obj) {
				var ret = new Object();
				ret.files = [];
				obj.contents.forEach((file) => {
					var f = new Object();
					f.id = 'dropbox|' + file.path.substring(1); // get path minus first '/'
					var sp = file.path.split('/');
					f.name = sp[sp.length-1];
					f.isDir = file.is_dir;
					f.mimeType = 'mime_type' in file ? file.mime_type : 'dropbox/folder';
					f.webViewLink = 'http://www.google.com';
					ret.files.push(f);
				});
				res.json(ret);
			}
			api_access_dropbox.metadata(dropbox_token,
				id === undefined ? '' : id,
				callback);
			break;
		default:
			res.json({
				files: [
					{
						id: 'google',
						mimeType: 'cloudview/folder',
						isDir: true,
						name: 'Google Drive'
					},
					{
						id: 'dropbox',
						mimeType: 'cloudview/folder',
						isDir: true,
						name: 'Dropbox'
					},
					{
						id: 'onedrive',
						mimeType: 'cloudview/folder',
						isDir: true,
						name: 'OneDrive'
					},
				]
			});
	}
}



module.exports = api;