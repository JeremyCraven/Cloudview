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
							angular.extend(AccountServices.userAccount, result.data);
							AccountServices.userAccount.hasName = true;
							console.log(AccountServices.userAccount);
							$scope.loading = false;
							//$state.go('folder', AccountServices.userAccount.CloudViewToken);
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
