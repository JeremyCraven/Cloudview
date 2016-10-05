define([
	'./Common/SignupController'
], function(module) {
	return module.controller('CloudView.Controllers.Signup', [
		'$scope',
		'$controller',
		'$state',
		'CloudView.Services.AccountServices',
		function SignupController($scope, $controller, $state, AccountServices) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Signup', {$scope: $scope, $state: $state}));
			$scope.signup = function() {
				$scope.loading = true;
				var userAccount = {
						name: $scope.name,
						username: $scope.username,
						email: $scope.email,
						password: $scope.password
				};
				AccountServices.signup(userAccount)
					.then(
						function(result) {
							console.log(result.data);

							$scope.loading = false;
							$state.go('login');
						},
						function(result) {
							console.log(result.data);
							//ErrorDialogService.showError('Error', result.data, 'no', 'Signup');
						}
					);

			};
		}
	]);
});
