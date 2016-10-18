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

			service.store_token = function(token) {
				service.userAccount.cloudViewToken = token;
			}

			service.login = function(credentials) {
				return $http({
					method: 'POST',
					url: url + 'users/login',
					data: credentials
				});
			};

			service.get_account_info = function(credentials) {
				return $http({
					method: 'POST',
					url: url + 'users/get_info',
					data: credentials
				});
			}

			service.get_user_info = function(credentials) {
				return $http({
					method: 'POST',
					url: url + 'users/get_user',
					data: credentials
				});
			}

			service.verify_token = function(token) {
				return $http({
					method: 'POST',
					url: url + 'users/verify_token',
					data: token
				});
			}

			service.store_user_info = function(result) {
				var data = result.data;
				service.userAccount.hasName = true;
				service.userAccount.name = data.name;
				service.userAccount.email = data.email;
				service.userAccount.accounts = [];
				if (angular.isDefined(data.google_accounts)) {
					if (!search_accounts('Google Drive'))
						var gAccount = {
							type: 'Google Drive',
							active: true
						}
						service.userAccount.accounts.push(gAccount);
				}
				if (angular.isDefined(data.dropbox_accounts)) {
					if (!search_accounts('Dropbox'))
						var dAccount = {
							type: 'Dropbox',
							active: true
						}
						service.userAccount.accounts.push(dAccount);
				}
				if (angular.isDefined(data.onedrive_accounts)) {
					if (!search_accounts('One Drive'))
						var oAccount = {
							type: 'One Drive',
							active: true
						}
						service.userAccount.accounts.push(oAccount);
				}
			}

			var search_accounts = function(key) {
				var accounts = service.userAccount.accounts;
				for (var i = 0; i < accounts.length; i++) {
					if (accounts[i].type === key)
						return true;
				} 
				return false;
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
