define([
	'./Module'
], function(module) {
	return module.factory('CloudView.Services.AccountServices', [
		'$http',
		function($http) {
			var service = {};
			
			service.login = function(credentials) {
				return $http({
					method: 'POST',
					url: ENDPOINT_URI + 'login',
					data: credentials
				});
			}
			
			service.signup = function(userAccount) {
				return $http({
					method: 'POST',
					url: ENDPOINT_URI + 'signup',
					data: userAccount
				})
			}
			
			return service;
		}
	]);
});