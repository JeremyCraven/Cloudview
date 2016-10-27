define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.ClipboardService', [
		function() {
			var service = {};

			service.storedFiles = [];

			service.paste = function(object) {
				var fileFolderObject = {};
				if (object.isDir) {
					fileFolderObject.isFolder = true;
				}
				else {
					fileFolderObject.isFolder = false;
				}
				fileFolderObject.name = object.name;
				fileFolderObject.fileId = object.id; 
				service.storedFiles.push(fileFolderObject);
				console.log(service.storedFiles)
			}

			return service;
		}
	]);
});
