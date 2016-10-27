define([
    './Common/AddFileDialogController'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.AddFile', [
        '$scope',
        '$mdDialog',
		'$controller',
        function AddFileDialogController($scope, $mdDialog, $controller) {
            angular.extend(this, $controller('CloudView.Controllers.Common.Dialog.AddFile', {$scope: $scope, $mdDialog: $mdDialog}));

            

        }
    ]);
});
