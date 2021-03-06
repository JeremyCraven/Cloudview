define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Common.Signup', [
		'$scope',
		'$state',
		function SignupController($scope, $state) {
			$scope.name = '';
			$scope.username = '';
			$scope.email = '';
			$scope.confirm_email = '';
			$scope.password = '';
			$scope.confirm_password = '';

			$scope.warn = {
				exists: false,
				prefix:	'',
				message: ''
			};
			$scope.loading = false;

			$scope.login = function() {
				$state.go('login');
			};
			$scope.signup = function() {};
		}
	]);
});
