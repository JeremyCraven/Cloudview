define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Login', [
		'$scope',
		'$state',
		'CloudView.Services.AccountServices',
		function LoginController($scope, $state, AccountServices) {
			$scope.username = '';
			$scope.password = '';

			$scope.warn = {
				exists: false,
				prefix:	'',
				message: ''
			};
			$scope.loading = false;

			$scope.login = function() {
				$scope.loading = true;
				var credentials = {
					username: $scope.username,
					password: $scope.password
				};
				AccountServices.login(credentials)
					.then(
						function(result) {
							var data = result.data;
							console.log(data);
							AccountServices.userAccount.hasName = true;
							AccountServices.userAccount.name = data.user.name;
							AccountServices.userAccount.email = data.user.email;
							AccountServices.userAccount.cloudViewToken = data.user.token;
							console.log(AccountServices.userAccount);
							$scope.loading = false;
							$state.go('folder');
						},
						function(result) {
							console.log(result.data);
						}
					);
			};
			$scope.signup = function() {
				$state.go('signup');
			};
		}
	]);
});
