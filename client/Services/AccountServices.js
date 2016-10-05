define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.AccountServices', [
		'$http',
		'CloudView.Services.AccountServices'
		function($http, AccountServices) {
			var service = {};

			service.cookie_token_key = 'token';

			service.userAccount = {
				hasName:	false,
				accounts: []
			}

			var url = 'http://localhost:8081/api/v1/';

			service.login = function(credentials) {
				return $http({
					method: 'POST',
					url: url + 'users/login',
					data: credentials
				});
			}

			service.signup = function(userAccount) {
				return $http({
					method: 'POST',
					url: url + 'users/create_account',
					data: userAccount
				});
			}

			service.addGoogleDriveAccount = function(googleDriveCredentials) {
				return $http({
					method: 'POST',
					url: url + 'users/auth_google',
					data: googleDriveCredentials
				});
			}

			service.addDropboxAccount = function(dropboxCredentials) {
				return $http({
					method: 'POST',
					url: url + '',
					data: dropboxCredentials
				});
			}

			service.addOneDriveAccount = function(oneDriveCredentials) {
				return $http({
					method: 'POST',
					url: url + '',
					data: oneDriveCredentials
				});
			}

			return service;
		}
	]);
});
