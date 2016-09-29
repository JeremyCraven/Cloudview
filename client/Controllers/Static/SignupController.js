define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Signup', [
		'$scope',
		'$state',
		'CloudView.Services.ErrorDialog',
		function SignupController($scope, $state, errDg) {
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
				errDg.showError('GENERAL.ERRORS.DEFAULT.TITLE',
					'GENERAL.ERRORS.DEFAULT.CONTENT',
					'This is a test', '#signup-button');
				/*
				var status_code = response.status;
					var reason = response.data;
					$scope.loading = false;
					//show alert
					switch(status_code){
						case 403:
							$scope.showError('LOGIN.ERRORS.403.TITLE', 'LOGIN.ERRORS.403.CONTENT', '', '#login-button');
							break;
						case 409:
							$scope.showError('SIGNUP.ERRORS.409.TITLE', 'SIGNUP.ERRORS.409.CONTENT', '', '#signup-button');
							break;
						case 500:
							$scope.showError('GENERAL.ERRORS.500.TITLE', 'GENERAL.ERRORS.500.CONTENT', reason, '#login-button);
							break;
						default:
							$scope.showError('GENERAL.ERRORS.DEFAULT.TITLE', 'GENERAL.ERRORS.DEFAULT.CONTENT', reason, '#login-button');
					}
				*/
			};
		}
	]);
});
