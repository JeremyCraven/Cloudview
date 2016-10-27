define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.ClipboardService', [
		function() {
			var service = {};

			service.storedObject = {
				isFolder: false,
				Id: '',
				name: ''
			}

			service.copy = function(object) {
				service.storedObject.Id = object.Id;
			}

			return service;
		}
	]);
});
