define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Common.Home', [
		'$scope',
		'$state',
		function HomeController($scope, $state) {
			$scope.login = function() {
				$state.go('login');
			};
			$scope.signup = function() {
				$state.go('signup');
			};
		}
	]);
});
