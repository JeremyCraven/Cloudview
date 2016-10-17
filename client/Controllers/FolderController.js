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
			angular.extend(this, $controller('CloudView.Controllers.Common.Folder', {$scope: $scope, $mdSidenav: $mdSidenav, $mdDialog: $mdDialog}));

            var currentState = '';
            var stack = [];
			
            $scope.ui.folder.go = function(folder) {
                stack.push(currentState);
                currentState = folder.id;
                $scope.folder.path.push(folder);
                $scope.folder.subfolders = [];
                $scope.folder.files = [];
                getFiles(folder.id);
            };

            $scope.ui.back = function() {
                $scope.folder.path.pop();
                $scope.folder.subfolders = [];
                $scope.folder.files = [];
                var newState = stack.pop();
                getFiles(newState);
                currentState = newState;
            }

            $scope.ui.file.open = function(id, url) {
                console.log(url);
                var data = {
                    fileId: id,
                    token: AccountServices.userAccount.cloudViewToken
                }
                FileServices.downloadFile(data, url);
            }

            var getFiles = function(path) {
                var data = {
                    folderId: path,
                    token: AccountServices.userAccount.cloudViewToken
                }
                FileServices.getFiles(data)
                    .then(
                        function(result) {
                            sort(result.data.files);
                        },
                        function(result) {
                            console.log(result.data);
                        }
                    );
            };

            var activate = function() {
                getFiles('');
                $scope.user = AccountServices.userAccount;    
            }

            activate();

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
                console.log(file);
                file.type = file.mimeType;
                file.account = 0;
                return file;
            }
        }
    ]);
});
