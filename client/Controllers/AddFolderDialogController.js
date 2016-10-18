define([
    './Common/AddFolderDialogController'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.AddFolder', [
        '$scope',
        '$mdDialog',
        function AddFolderDialogController($scope, $mdDialog) {
            angular.extend(this, $controller('CloudView.Controllers.Common.Dialog.AddFolder', {$scope: $scope, $mdDialog: $mdDialog}));

        }
    ]);
});
