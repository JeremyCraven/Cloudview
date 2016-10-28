define([
    './Module'
], function(module) {
    return module.controller('CloudView.Controllers.Common.Dialog.AddFolder', [
        '$scope',
        '$mdDialog',
        function AddFolderDialogController($scope, $mdDialog) {
            //TODO: handle google auto signin
            $scope.name = '';
			$scope.account = 0;
			$scope.accounts = [
				//accounts listed here
				//id
				//type - {Google, Dropbox, etc}
				//email - a.b@c.com
			];
            $scope.close = function() {
                $mdDialog.cancel();
            };
            $scope.submit = function() {};
        }
    ]);
});
