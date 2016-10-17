define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.AccountServices', [
		'$http',
		function($http) {
			var service = {};

			service.cookie_token_key = 'token';

			service.userAccount = {
				hasName:	false,
				email: '',
				cloudViewToken: '',
				accounts: []
			};

			var url = 'http://localhost:8081/api/v1/';

			service.login = function(credentials) {
				return $http({
					method: 'POST',
					url: url + 'users/login',
					data: credentials
				});
			};

			service.login_success = function(result) {
				var data = result.data;
				service.userAccount.hasName = true;
				service.userAccount.name = data.user.name;
				service.userAccount.email = data.user.email;
				service.userAccount.cloudViewToken = data.user.token;
				if (data.user.google_accounts != '') {
					data.user.google_accounts.type = 'Google Drive';
					data.user.google_accounts.active = true;
					service.userAccount.accounts.push(data.user.google_accounts);

				}
				if (data.user.dropbox_accounts != '') {
					data.user.dropbox_accounts.type = 'Dropbox';
					data.user.dropbox_accounts.active = true;
					service.userAccount.accounts.push(data.user.dropbox_accounts);
				}
				if (data.user.onedrive_accounts != '') {
					data.user.onedrive_accounts.type = 'OneDrive';
					data.user.onedrive_accounts.active = true;
					service.userAccount.accounts.push(data.user.onedrive_accounts);
				}
			}

			service.login_failure = function(result) {
			};

			var login_failure = function(sb) {
				return function(response) {
					debugger;
					cb(response);
				}
			}

			service.signup = function(userAccount) {
				return $http({
					method: 'POST',
					url: url + 'users/create_account',
					data: userAccount
				});
			};

			service.signup_success = function() {

			}

			service.signup_failure = function() {

			}

			service.addGoogleDriveAccount = function(googleDriveCredentials) {
				return $http({
					method: 'POST',
					url: url + 'users/auth_google',
					data: googleDriveCredentials
				});
			};

			service.addDropboxAccount = function(dropboxCredentials) {
				return $http({
					method: 'POST',
					url: url + '',
					data: dropboxCredentials
				});
			};

			service.addOneDriveAccount = function(oneDriveCredentials) {
				return $http({
					method: 'POST',
					url: url + '',
					data: oneDriveCredentials
				});
			};

			return service;
		}
	]);
});
