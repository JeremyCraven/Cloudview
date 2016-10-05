define([
    'Controllers-Common/NewAccountDialogController'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.NewAccount', [
        '$scope',
        '$mdDialog',
        'CloudView.Services.AccountServices',
        function NewAccountDialogController($scope, $mdDialog, AccountServices) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Dialog.NewAccount', {$scope: $scope, $mdDialog: $mdDialog}));
			$scope.login_google = function() {};
        }
    ]);
});
