define([
    './Common/AddFolderDialogController'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.AddFolder', [
        '$scope',
        '$state',
        '$mdDialog',
		'$controller',
		'FileUploader',
		'CloudView.Services.FileServices',
        'CloudView.Services.AccountServices',
        function AddFolderDialogController($scope, $state, $mdDialog, $controller, FileUploader, FileServices, AccountServices) {
            angular.extend(this, $controller('CloudView.Controllers.Common.Dialog.AddFolder', {$scope: $scope, $mdDialog: $mdDialog}));

            $scope.accounts = AccountServices.userAccount.accounts;

            $scope.submit = function() {
            	var data = {
            		folder: $scope.name,
            		parentDirectory: FileServices.currentFolder,
            		token: AccountServices.userAccount.cloudViewToken
            	}
            	console.log(data);
            	FileServices.addFolder(data)
            		.then(
            			function(result) {
            				$mdDialog.cancel();
            		},
            			function(result) {
            				console.log(result.data)
            		})
            }

        }
    ]);
});
