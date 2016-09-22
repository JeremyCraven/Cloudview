define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.AccountServices', [
		'$http',
		function($http) {
			var service = {};

			var url = 'http://localhost:8081/';
			
			service.login = function(credentials) {
				return $http({
					method: 'POST',
					url: url + 'login',
					data: credentials
				});
			}
			
			service.signup = function(userAccount) {
				return $http({
					method: 'POST',
					url: url + 'signup',
					data: userAccount
				})
			}
			
			return service;
		}
	]);
});