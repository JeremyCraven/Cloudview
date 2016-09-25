define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.FileServices', [
		'$http',
		function($http) {
			var service = {};

			var url = 'http://localhost:8081/api/';
			
			service.getFiles = function(credentials) {
				return $http({
					method: 'POST',
					url: url + 'v1/get_files',
					data: credentials
				});
			}
			
			return service;
		}
	]);
});