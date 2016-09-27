var api_access_google = require('../api_logic/google_access');
var api_access_dropbox = require('../api_logic/api_access_dropbox');

var api = new Object();

// folder is a string id for the folder
// creds = { google: ..., dropbox: ..., onedrive: ...}
api.get_files = function(creds, folder, pageToken, res) {
	var sp = folder.split('|');
	var id = sp[1];
	var service = sp[0];
	switch (service) {
		case 'google':
			var callback = function(err, obj) {
				if (err) { return {error:err}; }
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

					return ret; 
				}
			}
			api_access_google.get_google_files(creds.google,
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
				return ret;
			}
			api_access_dropbox.metadata(creds.dropbox,
				id === undefined ? '' : id,
				callback); 
			break;
		default:
			return {
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
			};
	}
}



module.exports = api;