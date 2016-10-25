define([
    './Common/AddFolderDialogController'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.AddFolder', [
        '$scope',
        '$mdDialog',
		'$controller',
        function AddFolderDialogController($scope, $mdDialog, $controller) {
            angular.extend(this, $controller('CloudView.Controllers.Common.Dialog.AddFolder', {$scope: $scope, $mdDialog: $mdDialog}));

        }
    ]);
});
