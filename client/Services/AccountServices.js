define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.AccountServices', [
		'$http',
		function($http) {
			var service = {};

			var path = 'http://localhost:8081/api/';
			
			service.login = function(credentials) {
				return $http({
					method: 'POST',
					url: path + 'login',
					data: credentials
				});
			}
			
			service.signup = function(userAccount) {
				return $http({
					method: 'POST',
					url: path + 'signup',
					data: userAccount
				})
			}
			
			return service;
		}
	]);
});