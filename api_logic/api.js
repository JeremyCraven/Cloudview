var api_access_google = require('../api_logic/google_access');
var api_access_dropbox = require('../api_logic/api_access_dropbox');
var api_access_onedrive = require('../api_logic/api_access_onedrive');
var Promise = require('es6-promise').Promise;

var api = new Object();

// folder is a string id for the folder
// creds = { google: ..., dropbox: ..., onedrive: ...}
api.get_files = function(creds, folder, pageToken, res) {
	var sp = folder.split('|');
	var id = sp[1];
	var service = sp[0];
	switch (service) {
		case 'google':
			var callback = function(err, obj, new_creds) {
				if (err) { res({error:err}, null); }
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
						//if (!f.isDir) { console.log(file) }
						f.name = file.name;
						f.date = file.modifiedTime;
						if ('webViewLink' in file) { f.webViewLink = file.webViewLink; }
						if ('webContentLink' in file) { f.webContentLink = file.webContentLink; }

						ret.files.push(f);
					});

					res(ret, new_creds); 
				}
			}
			if (!creds.google) { res({files:[]}); return;}
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
					f.webContentLink = 'http://localhost:8081/api/v1/download_dropbox_file?state=' + creds.cloudview + '&fileId='+f.id;
					f.date = file.modified;
					ret.files.push(f);
				});
				res(ret);
			}
			if (!creds.dropbox) { res({files:[]}); return;}
			api_access_dropbox.metadata(creds.dropbox,
				id === undefined ? '' : id,
				callback); 
			break;
		case 'onedrive':
		    var callback = function(obj) {
				var ret = new Object();
				ret.files = [];
				obj.data.forEach((file) => {
					var f = new Object();
					f.id = 'onedrive|' + file.id;
					f.root = 'onedrive';
					f.name = file.name;
					f.isDir = file.id[1] == 'o';
					f.mimeType = 'mime-type';
					f.webContentLink = file.source;
					f.date = file.updated_time;
					ret.files.push(f);
				});
				res(ret);
			}
			if (!creds.onedrive) { res({files:[]}); return;}
			if( id === undefined) {
				api_access_onedrive.list_files(creds.onedrive.access_token, callback); 
			} else {				
				api_access_onedrive.list_files(creds.onedrive.access_token, callback, id); 
			}
			break;
		default:
			var ret = {files:[]};
			if ('google' in creds) {
				ret.files.push({
						id: 'google',
						root: 'google',
						mimeType: 'cloudview/folder',
						isDir: true,
						name: 'Google Drive'
					});
			}
			if ('dropbox' in creds) {
				ret.files.push({
						id: 'dropbox',
						root: 'dropbox',
						mimeType: 'cloudview/folder',
						isDir: true,
						name: 'Dropbox'
					});
			}
			if ('onedrive' in creds) {
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
api.get_account_info = function(creds, callback) {
	var obj = {};
	var promise = new Promise(function(resolve, reject) {   
    	api_access_dropbox.get_dropbox_account_info(creds.dropbox, (reply) => {
		obj.dropbox = reply
		resolve(obj);
	});
  });

  promise.then(function(object) {
		api_access_google.get_google_account_info(creds.google, (reply) => {
		obj.google = reply
		return obj;
	});
  }, null).then(function(object) {
  		api_access_onedrive.user_info(creds.onedrive.access_token, (reply) => {
		obj.onedrive = reply
		callback(obj);
	});
  }, null);
}
api.download_dropbox = function(creds, fileId, callback) {
	var sp = fileId.split('|');
	var id = sp[1];
	var service = sp[0];
	if (service === 'dropbox') {
		api_access_dropbox.download_file(creds.dropbox, id, (err, res) => {
			callback(res);
		});
	} else {
		callback({success: false});
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
			if(folderId == 'onedrive') {
				api_access_onedrive.list_files(creds.onedrive.access_token, function(obj) {
					var cb = function(err, obj2) {
						callback(obj2)
					}
					api_access_onedrive.move_stuff(creds.onedrive.access_token,
						id,
						obj.data[0].parent_id,
						cb);	
				}); 


			} else {
				var cb = function(err, obj) {
					callback(obj)
				}
				api_access_onedrive.move_stuff(creds.onedrive.access_token,
					id,
					folderId.split('|')[1],
					cb);
			}
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
			api_access_dropbox.delete(creds.dropbox,
				id,
				cb);
			break;
		case 'onedrive':
			var cb = function(err, obj) {
				callback(obj)
			}
			api_access_onedrive.delete(creds.onedrive.access_token,
				id,
				cb);

			break;
		default:
			callback({success: false});
	}
}

api.upload_file = function(creds, file, folder, callback) {
	var sp = folder.split('|');
	var id = 'root';
	if (sp.length > 1) id = sp[1];
	var service = sp[0];

	switch (service) {
		case 'google':
			var cb = function(err, obj) {
				callback(obj);
			};

			api_access_google.upload_google_file(creds.google, file, id, cb);
			break;
		case 'dropbox':
			var cb = function(err, obj) {
				callback(obj);
			};

			api_access_dropbox.upload_file(creds.dropbox, file, id, cb);
			break;
		case 'onedrive':
			var cb = function(err, obj) {
				callback(obj);
			};

			api_access_onedrive.upload_onedrive_file(creds.google, file, cb);
			break;
		default:
			callback({ success: false });
	}
}

api.create_folder = function(creds, folderName, destination, callback) {
	var sp = destination.split('|');
	var id = 'root';
	if (sp.length > 1) id = sp[1];
	var service = sp[0];

	switch (service) {
		case 'google':
			var cb = function(err, obj) {
				callback(obj);
			};

			api_access_google.create_google_folder(creds.google, folderName, id, cb);
			break;
		case 'dropbox':
			var cb = function(err, obj) {
				callback(obj);
			};

			api_access_dropbox.create_folder(creds.dropbox, folderName, id, cb);
			break;
		case 'onedrive':
			var cb = function(err, obj) {
				callback(obj);
			};

			api_access_onedrive.create_folder(creds.onedrive.access_token, folderName, cb);
			break;
		default:
			callback({ success: false });
	}
}



module.exports = api;