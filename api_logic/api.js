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
				if (err) { res({error:err}); }
				else { 
					var ret = new Object();
					if ('nextPageToken' in obj) { ret.nextPageToken = obj.nextPageToken; }
					ret.files = [];
					obj.files.forEach((file) => {
						var f = new Object();
						f.id = 'google|' + file.id;
						f.root = 'google';
						f.mimeType = file.mimeType;
						f.isDir = (f.mimeType === 'application/vnd.google-apps.folder');
						if (!f.isDir) { console.log(file) }
						f.name = file.name;
						f.date = file.modifiedTime;
						if ('webViewLink' in file) { f.webViewLink = file.webViewLink; }
						if ('webContentLink' in file) { f.webContentLink = file.webContentLink; }

						ret.files.push(f);
					});

					res(ret); 
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
					f.root = 'dropbox';
					var sp = file.path.split('/');
					f.name = sp[sp.length-1];
					f.isDir = file.is_dir;
					f.mimeType = 'mime_type' in file ? file.mime_type : 'dropbox/folder';
					f.webViewLink = 'http://www.google.com';
					f.date = file.modified;
					ret.files.push(f);
				});
				res(ret);
			}
			api_access_dropbox.metadata(creds.dropbox,
				id === undefined ? '' : id,
				callback); 
			break;
		case 'onedrive':
			res({ files: [{id:'onedrive',root:'onedrive',mimeType:'cloudview/folder',isDir:true,name:'onedrive'}] });
			break;
		default:
			var ret = {files:[]};
			if (true || 'google' in creds) {
				ret.files.push({
						id: 'google',
						root: 'google',
						mimeType: 'cloudview/folder',
						isDir: true,
						name: 'Google Drive'
					});
			}
			if (true || 'dropbox' in creds) {
				ret.files.push({
						id: 'dropbox',
						root: 'dropbox',
						mimeType: 'cloudview/folder',
						isDir: true,
						name: 'Dropbox'
					});
			}
			if (true || 'onedrive' in creds) {
				ret.files.push({
						id: 'onedrive',
						root: 'onedrive',
						mimeType: 'cloudview/folder',
						isDir: true,
						name: 'OneDrive'
					});
			}
			res(ret);
	}
}
api.move_file = function(creds, fileId, folderId, callback) {
	var sp = fileId.split('|');
	var id = sp[1];
	var service = sp[0];
	switch (service) {
		case 'google':
			var cb = function(err, obj) {
				callback(obj);
			}
			api_access_google.move_google_file(creds.google,
				id,
				folderId.split('|')[1],
				cb);
			break;
		case 'dropbox':
			var cb = function(err, obj) {
				callback(obj)
			}
			api_access_dropbox.move(creds.dropbox,
				id,
				folderId.split('|')[1],
				cb);
			break;
		case 'onedrive':
			callback({success: false})
			break;
		default:
			callback({success: false});
	}
}
api.delete_file = function(creds, fileId, callback) {
	var sp = fileId.split('|');
	var id = sp[1];
	var service = sp[0];
	switch (service) {
		case 'google':
			var cb = function(err, obj) {
				callback(obj);
			}
			api_access_google.delete_google_file(creds.google,
				id,
				cb);
			break;
		case 'dropbox':
			var cb = function(err, obj) {
				callback(obj)
			}
			api_access_dropbox.move(creds.dropbox,
				id,
				cb);
			break;
		case 'onedrive':
			callback({success: false})
			break;
		default:
			callback({success: false});
	}
}
api.put_file = function(creds, is_folder, name, file, callback) {
	callback({success:true});
}




module.exports = api;