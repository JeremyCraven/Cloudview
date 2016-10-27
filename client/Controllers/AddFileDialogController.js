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

            var uploader = new FileUploader();
            
            $scope.submit = function() {
            	$mdDialog.cancel();
            	refresh();
            	/*var data = {
            		name: $scope.name,
            		parentDirectory: FileServices.currentFolder,
            		token: AccountServices.userAccount.cloudViewToken
            	}
            	FileServices.addFile(data)
            		.then(
            			function(result) {
            				$state.go('folder');
            		},
            			function(result) {

            		})*/
            }
        }
    ]);
});
