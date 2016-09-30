define([
    './Common/NewAccountDialogController'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.NewAccount', [
        '$scope',
        '$mdDialog',
        'CloudView.Services.AccountServices',
        function NewAccountDialogController($scope, $mdDialog, AccountServices) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Dialog.NewAccount', {$scope: $scope, $mdDialog: $mdDialog}));
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
            };
        }
    ]);
});
