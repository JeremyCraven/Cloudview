define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Signup', [
		'$scope',
		'$state',
		'CloudView.Services.AccountServices',
		function SignupController($scope, $state, AccountServices) {
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
			$scope.signup = function() {
				var userAccount = {
						username: $scope.username,
						email: $scope.email,
						password: $scope.password
				};
				if (isValid(userAccount)) {
					AccountServices.signup(userAccount)
						.then(
							function(result) {
								var data = result.data;
								// do something
							},
							function(result) {
								var error = result.data;
								// do something
							}
						);
				}
			};

			var isValid = function(userAccount) {
				if (userAccount.email != userAccount.confirm_email) {
					// show some error
					return false;
				}

				if (userAccount.password != userAccount.confirm_password) {
					// show some error
					return false;
				}
			};
		}
	]);
});
