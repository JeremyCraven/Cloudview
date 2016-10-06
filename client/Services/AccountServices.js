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

			var url = '/api/v1/';

			service.login = function(credentials, cbs, cbf) {
				$http({
					method: 'POST',
					url: url + 'users/login',
					data: credentials
				}).then(login_success(cbs), login_failure(cbf));
			};

			var login_success = function(cb) {
				return function(result) {
					debugger;
					var data = result.data;
					service.userAccount.hasName = true;
					service.userAccount.name = data.user.name;
					service.userAccount.email = data.user.email;
					service.userAccount.cloudViewToken = data.user.token;
					service.userAccount.accounts.push(data.user.google_accounts);
					service.userAccount.accounts.push(data.user.dropbox_accounts);
					service.userAccount.accounts.push(data.user.onedrive_accounts);
					cb(result);
				}
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
