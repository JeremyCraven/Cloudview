define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.ClipboardService', [
		function() {
			var service = {};

			service.files = [];

			service.copy = function(object) {
				console.log(object);
				var fileFolderObject = {};
				if (object.isDir) {
					fileFolderObject.isFolder = true;
				}
				else {
					fileFolderObject.isFolder = false;
				}
				fileFolderObject.name = object.name;
				fileFolderObject.id = object.id; 
				service.files.push(fileFolderObject);
				console.log(service.files);
			}

			service.clear = function() {
				service.files = [];
			}

			return service;
		}
	]);
});
