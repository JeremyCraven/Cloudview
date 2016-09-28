define([
	'./Module',
	'google-signin'
], function(module) {
	return module.controller('CloudView.Controllers.Dialog.NewAccount', [
		'$scope',
		'$mdDialog',
		function NewAccountDialogController($scope, $mdDialog) {
			$scope.google = {
				signin: function(googleUser) {
					//TODO: tell server
					if(true) { //TODO: change to if success on our server
						$scope.hide('success');
					} else {
						$scope.hide('reason'); //TODO: change reason for toast
					}
				}
			};
			$scope.close = function() {
				$mdDialog.cancel();
			}
		}
	]);
});
