define([
    './Module'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.NewAccount', [
        '$scope',
        '$mdDialog',
        'CloudView.Services.AccountServices',
        function NewAccountDialogController($scope, $mdDialog, AccountServices) {
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
            $scope.login_google = function() {
                $scope.loading = true;
                var credentials = {
                    token: AccountServices.userAccount.cloudViewToken
                };
                AccountServices.addGoogleDriveAccount(credentials)
                    .then(
                        function(result) {
                            var data = result.data;
                            //console.log(data);
                            //AccountServices.userAccount.accounts.push(data);
                            $scope.loading = false;
                            $scope.close();
                        },
                        function(result) {
                            console.log(result.data);
                        }
                    );
            }
        }
    ]);
});
