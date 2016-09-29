define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Dialog.NewAccount', [
		'$scope',
		'$mdDialog',
		function NewAccountDialogController($scope, $mdDialog) {
			$scope.google = {
				onsuccess: function(googleUser) {
					//TODO: tell server
					debugger;
					if(true) { //TODO: change to if success on our server
						$mdDialog.hide('success');
					} else {
						$mdDialog.hide('reason'); //TODO: change reason for toast
					}
				}
			};
			$scope.close = function() {
				$mdDialog.cancel();
			}
		}
	]);
});
