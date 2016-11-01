define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.ClipboardService', [
		function() {
			var service = {};

			service.files = [];

			var search = function(key) {
				var result = false;
				service.files.forEach(function(file) {
					console.log(file.id);
					if (key == file.id) {
						result = true;
					}
				})
				console.log('return false');
				return result;
			}

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
				if (!search(fileFolderObject.id)) {
					service.files.push(fileFolderObject);
				}
			}

			service.clear = function() {
				service.files.splice(0);
			}

			return service;
		}
	]);
});
