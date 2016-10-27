define([
	'./Common/HomeController'
], function(module) {
	return module.controller('CloudView.Controllers.Home', [
		'$scope',
		'$state',
		'$controller',
		'$cookies',
		'CloudView.Services.AccountServices',
		function HomeController($scope, $state, $controller, $cookies, AccountServices) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Home', {$scope: $scope, $state: $state}));
			var token = $cookies.get(AccountServices.cookie_token_key);
			if (token) {
				tokenObject = {token: token};
				AccountServices.verify_token(tokenObject)
					.then(
						function(result) {
							AccountServices.store_token(token);
							$state.go('folder');
						},
						function(result) {}
					);
			}
		}
	]);
});
