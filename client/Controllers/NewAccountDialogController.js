define([
    './Module'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.NewAccount', [
        '$scope',
        '$mdDialog',
        function NewAccountDialogController($scope, $mdDialog) {
            //TODO: handle google auto signin
            $scope.google = {
                'width': 240,
                'height': 50,
                onsuccess: function(googleUser) {
                    //TODO: tell server
                    debugger;
					gapi.auth2.getAuthInstance().signOut();
                    if (true) { //TODO: change to if success on our server
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
