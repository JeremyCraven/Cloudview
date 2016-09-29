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
						$mdDialog.hide('success'); //TODO: figure out a response to folder controller to tell it to update the view
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
