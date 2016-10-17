define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.FileServices', [
		'$http',
		function($http) {
			var service = {};

			var url = 'http://localhost:8081/api/v1/';

			service.getFiles = function(data) {
				return $http({
					method: 'POST',
					url: url + 'get_files',
					data: data
				});
			};

			service.downloadFile = function(data, url) {
				return $http({
					method: 'POST',
					url: url,
					data: data
				});
			};

			service.addFile = function() {
				
			}

			service.addFolder = function() {
				
			}

			return service;
		}
	]);
});
