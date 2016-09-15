define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Login', [
		'$scope',
		'$state',
		'CloudView.Services'
		function LoginController($scope, $state, CloudView.Services) {
			$scope.username = '';
			$scope.password = '';

			$scope.warn = {
				exists: false,
				prefix:	'',
				message: ''
			};
			$scope.loading = false;

			$scope.login = function() {
				var credentials = { 
					username: $scope.username,
					password: $scope.password 
				};
				CloudView.Services.AccountServices.login(credentials)
					.then(
						function(result) {
							var data = result.data;
							// do something with data
						}, 
						function(result) {
							var error = result.data;
							// do something with error
						}
					);
			};
			$scope.signup = function() {
				$state.go('signup');
			};
		}
	]);
});
