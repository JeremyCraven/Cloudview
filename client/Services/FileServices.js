define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.FileServices', [
		'$http',
		function($http) {
			var service = {};

			var url = 'http://localhost:8081/api/v1/';

			service.currentFolder = '';

			service.getFiles = function(data) {
				return $http({
					method: 'POST',
					url: url + 'get_files',
					data: data
				});
			};

			service.addFile = function(data) {
				return $http({
					method: 'POST',
					url: url + 'upload_file',
					data: data
				});
			}

			service.addFolder = function(data) {
				return $http({
					method: 'POST',
					url: url + 'add_folder',
					data: data
				});
			}

			service.moveFile = function(data) {
				return $http({
					method: 'POST',
					url: url + 'move_file',
					data: data
				});
			}

			service.deleteFile = function(data) {
				console.log(data);
				return $http({
					method: 'POST',
					url: url + 'delete_file',
					data: data
				});
			}

			return service;
		}
	]);
});
