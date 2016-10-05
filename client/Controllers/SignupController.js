define([
	'./Common/SignupController'
], function(module) {
	return module.controller('CloudView.Controllers.Signup', [
		'$scope',
		'$controller',
		'$state',
		'CloudView.Services.AccountServices',
		'CloudView.Services.ErrorDialog',
		function SignupController($scope, $controller, $state, AccountServices, ErrorDialog) {
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
							switch (result.status) {
								case 403:
									ErrorDialog.showError('SIGNUP.ERRORS.409.TITLE', 'SIGNUP.ERRORS.409.CONTENT', '', '#login-button');
									break;		
							}
						}
					);

			};
		}
	]);
});
