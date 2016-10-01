define([
    './Common/FolderController'
], function(module) {
    return module.controller('CloudView.Controllers.Folder', [
        '$scope',
		'$controller',
        '$state',
        '$mdSidenav',
		'$mdDialog',
        'CloudView.Services.FileServices',
        'CloudView.Services.AccountServices',
        function FolderController($scope, $controller, $state, $mdSidenav, $mdDialog, FileServices, AccountServices) {
            //console.log($state.params);
			angular.extend(this, $controller('CloudView.Controllers.Common.Folder', {$scope: $scope, $mdSidenav: $mdSidenav, $mdDialog: $mdDialog}));
            $scope.ui.folder.go = function(path) {
                $state.params.folderId = path;
                $scope.folder.subfolders = [];
                $scope.folder.files = [];
                getFiles();
            }
            var getFiles = function() {
                folderID = $state.params;
                folderID.token = AccountServices.userAccount.cloudViewToken
                FileServices.getFiles(folderID)
                    .then(
                        function(result) {
                            sort(result.data.files);
                        },
                        function(result) {
                            console.log(result.data);
                        }
                    );

            };
            getFiles();

            var sort = function(files) {
                files.forEach(function(file) {
                    if (file.isDir) {
                        $scope.folder.subfolders.push(mapFolder(file));
                    } else {
                        $scope.folder.files.push(mapFile(file));
                    }
                })
            }

            var mapFolder = function(folder) {
                folder.type = folder.mimeType;
                folder.account = 0;
                return folder;
            }

            var mapFile = function(file) {
                file.type = file.mimeType;
                file.account = 0;
                return file;
            }
        }
    ]);
});
