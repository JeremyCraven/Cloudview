define([
    './Common/NewAccountDialogController'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.NewAccount', [
        '$scope',
        '$window',
        '$mdDialog',
        'CloudView.Services.AccountServices',
        function NewAccountDialogController($scope, $window, $mdDialog, AccountServices) {
            //TODO: handle google auto signin
            $scope.google = {
                'width': 240,
                'height': 50,
                onsuccess: function(googleUser) {
                    //TODO: tell server
                    console.log(googleUser);
                    var credentials = {
                        token: AccountServices.userAccount.cloudViewToken,
                        credentials: googleUser.Zi
                    };
                    AccountServices.addGoogleDriveAccount(credentials)
                        .then(function(result) {
                            // TODO: what do we do with the result of adding the stuff?
                        });
                    //debugger;
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
                //$scope.loading = true;
                var credentials = {
                    token: AccountServices.userAccount.cloudViewToken
                };
                $window.location.href = ('http://localhost:8081/api/v1/users/auth_google?state=' + credentials.token);
                /*AccountServices.addGoogleDriveAccount(credentials)
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
                    );*/
            }
            $scope.login_dropbox = function() {
                var credentials = {
                    token: AccountServices.userAccount.cloudViewToken
                };
                $window.location.href = ('http://localhost:8081/api/v1/users/auth_dropbox?state=' + credentials.token);
            }
            $scope.login_onedrive = function() {
                var credentials = {
                    token: AccountServices.userAccount.cloudViewToken
                };
                $window.location.href = ('http://localhost:8081/api/v1/users/auth_onedrive?state=' + credentials.token);
            }
        }
    ]);
});
