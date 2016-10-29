define([
    './Common/AddFileDialogController'
], function(module) {
    return module.controller('CloudView.Controllers.Dialog.AddFile', [
        '$scope',
        '$state',
        '$mdDialog',
		'$controller',
		'FileUploader',
		'CloudView.Services.FileServices',
        'CloudView.Services.AccountServices',
        function AddFileDialogController($scope, $state, $mdDialog, $controller, FileUploader, FileServices, AccountServices) {
            angular.extend(this, $controller('CloudView.Controllers.Common.Dialog.AddFile', {$scope: $scope, $mdDialog: $mdDialog}));

            $scope.accounts = AccountServices.userAccount.accounts;

            $scope.uploader = new FileUploader({
            	url: 'api/v1/upload_file',
            	queueLimit: 1,
            	formData:[{token: AccountServices.userAccount.cloudViewToken, destination: FileServices.currentFolder.id}]
            });

            
            $scope.submit = function() {
            	$scope.uploader.uploadItem(0);
            	$mdDialog.cancel();
            }
        }
    ]);
});
