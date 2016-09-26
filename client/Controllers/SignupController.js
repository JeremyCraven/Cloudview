define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Signup', [
		'$scope',
		'$state',
		'CloudView.Services.AccountServices',
		function SignupController($scope, $state, AccountServices) {
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

			$scope.error = {
				message: '',
				exists: ''
			};

			$scope.login = function() {
				$state.go('login');
			};
			$scope.signup = function() {
				var userAccount = {
						name: $scope.name,
						username: $scope.username,
						email: $scope.email,
						password: $scope.password
				};
				if (isValid(userAccount)) {
					AccountServices.signup(userAccount)
						.then(
							function(result) {
								$state.go('login');
							},
							function(result) {
								console.log(result.data);
							}
						);
				}
			};

			var isValid = function(userAccount) {
				var valid = true;
				if (userAccount.email != $scope.confirm_email) {
					$scope.error.exists = true;
					$scope.error.message = 'The email addresses provided do not match';
				}

				if (userAccount.password != $scope.confirm_password) {
					$scope.error.exists = true;
					$scope.error.message = 'The passwords provided do not match';
				}
				if (valid) {
					$scope.error.exists = false;
				}
				return valid;
			};
		}
	]);
});
