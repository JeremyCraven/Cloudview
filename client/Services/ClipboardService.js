define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.ClipboardService', [
		function() {
			var service = {};

			service.storedObject = {
				parentFolder: '' // ID of parent folder
				type: '', //file or folder
				Id: '' // folder of file ID 
			}

			var url = 'http://localhost:8081/api/v1/';

			service.copy = function(object) {
				if (object.isDir) {
					service.storedObject.type = 'folder';
					
				}
				else {
					service.storedObject.type = 'file';
				}
				service.storedObject.parentFolder = object.parentFolder;
				service.storedObject.Id = object.Id;
			}

			service.move = function() {

			}

			service.delete = function() {

			}

			return service;
		}
	]);
});
