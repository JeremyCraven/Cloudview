define([
	'./Common/LoginController'
], function(module) {
	return module.controller('CloudView.Controllers.Login', [
		'$scope',
 -		'$controller',
  		'$state',
 -		'$cookies',
  		'CloudView.Services.AccountServices',
 -		function LoginController($scope, $controller, $state, $cookies, AccountServices) {
 -			angular.extend(this, $controller('CloudView.Controllers.Common.Login', {$scope: $scope, $state: $state}));

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
							AccountServices.userAccount.hasName = true;
							AccountServices.userAccount.name = data.user.name;
							AccountServices.userAccount.email = data.user.email;
							AccountServices.userAccount.cloudViewToken = data.user.token;
							console.log(AccountServices.userAccount);
							//AccountServices.
							$scope.loading = false;
							$state.go('folder');
						},
						function(result) {
							console.log(result.data);
							//ErrorDialog.showError('Error', result.data, 'no', 'Login');
							$state.go('folder');
						}
					);
			};
		}
	]);
});
