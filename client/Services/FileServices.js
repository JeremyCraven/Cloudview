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
					url: url + '',
					data: data
				});
			};

			service.addFile = function(file) {
				return $http({
					method: 'POST',
					url: url + 'upload_file',
					data: file
				});
			}

			service.moveFile = function(fileId, folder) {
				var data = {
					fileId: fileId,
					folder: folder
				}
				return $http({
					method: 'POST',
					url: url + 'move_file',
					data: data
				});
			}

			service.deleteFile = function(fileId) {
				var data = {
					fileId: fileId
				}
				return $http({
					method: 'POST',
					url: url + 'delete_file',
					data: data
				});
			}

			service.addFolder = function() {
				
			}

			return service;
		}
	]);
});
