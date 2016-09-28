define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Dialog.NewAccount', [
		'$scope',
		'$mdDialog',
		function NewAccountDialogController($scope, $mdDialog) {
			require(['google-signin'], function(){
				//lazy load the apis
				gapi.signin2.render('google-signin', {
					'scope': 'profile email',
					'width': 240,
					'height': 50,
					'longtitle': true,
					'theme': 'light',
					'onsuccess': $scope.google.onSuccess,
					'onfailure': $scope.google.onFailure
				});
			});
			$scope.google = {
				onSuccess: function(googleUser) {
					//TODO: tell server
					if(true) { //TODO: change to if success on our server
						$scope.hide('success');
					} else {
						$scope.hide('reason'); //TODO: change reason for toast
					}
				},
				onFailure: function(error) {
					//TODO: handle failure
					$mdDialog.hide('reason'); //TODO: change reason for toast
				}
			};
			$scope.close = function() {
				$mdDialog.cancel();
			}
		}
	]);
});
