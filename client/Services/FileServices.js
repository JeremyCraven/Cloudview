define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.FileServices', [
		'$http',
		function($http) {
			var service = {};

			var url = 'http://localhost:8081/api/v1/';

			service.getFiles = function(credentials) {
				credentials.token = AccountServices.userAccount.cloudViewToken;
				return $http({
					method: 'POST',
					url: url + 'get_files',
					data: credentials
				});
			};

			service.authorizeGoogle = function() {
				return $http({
					method: 'GET',
					url: url + 'authorize_google',
				});
			};

			service.authorizeDropbox = function() {
				return $http({
					method: 'GET',
					url: url + 'authorize_dropbox'
				})
			};

			return service;
		}
	]);
});
