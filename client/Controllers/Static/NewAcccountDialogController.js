define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Dialog.NewAccount', [
		'$scope',
		'$mdDialog',
		function newAccountDialogController($scope, $mdDialog) {
			require(['google-signin'], function(gapi){
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
					//TODO: do something
				},
				onFailureL function(error) {
					//TODO: handle failure
				}
			};
			$scope.close = function() {
				//tells the opening controller that we did nothing,
				//hide(answer) should trigger a refresh on server.
				//Use hide for success.
				$mdDialog.cancel();
			};
		}
	]);
});
