define([
	'./Common/LoginController'
], function(module) {
	return module.controller('CloudView.Controllers.Login', [
		'$scope',
 		'$controller',
  		'$state',
 		'$cookies',
  		'CloudView.Services.AccountServices',
 		function LoginController($scope, $controller, $state, $cookies, AccountServices) {
 			angular.extend(this, $controller('CloudView.Controllers.Common.Login', {$scope: $scope, $state: $state}));

			$scope.login = function() {
				$scope.loading = true;
				var credentials = {
					username: $scope.username,
					password: $scope.password
				};
				AccountServices.login(credentials)
					.then(
						function(result) {
							AccountServices.login_success(result);	
							$scope.loading = false;
							$state.go('folder');
						},
						function(result) {
							ErrorDialog.showError('Error', result.data, 'body');
							$state.go('folder');
						}
					);
			};
		}
	]);
});
