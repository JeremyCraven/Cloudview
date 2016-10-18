define([
    './Common/FolderController'
], function(module) {
    return module.controller('CloudView.Controllers.Folder', [
        '$scope',
        '$window',
		'$controller',
        '$state',
        '$mdSidenav',
		'$mdDialog',
        'CloudView.Services.FileServices',
        'CloudView.Services.AccountServices',
        function FolderController($scope, $window, $controller, $state, $mdSidenav, $mdDialog, FileServices, AccountServices) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Folder', {$scope: $scope, $mdSidenav: $mdSidenav, $mdDialog: $mdDialog}));

            var currentFolder = '';
			
            $scope.ui.folder.go = function(folder) {
                console.log(folder);
                if (folder.id === currentFolder.id) {
                    return;
                }
                $scope.folder.subfolders = [];
                $scope.folder.files = [];
                var index = search($scope.folder.path, folder.id);
                console.log(index);
                if (index == -1) {
                    $scope.folder.path.push(folder);
                }
                else {
                    $scope.folder.path.splice(index + 1);
                }
                currentFolder = folder;
                getFiles(folder.id);
            };

            var search = function(array, key) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == key) {
                        return i;
                    }
                }
                return -1;
            }

            $scope.ui.file.open = function(url, viewUrl) {
                if (url) {
                    $window.open(url);
                } else {
                    $window.open(viewUrl);
                }
                //FileServices.downloadFile(data, url);
            }

            $scope.ui.folder.new_folder = function(ev) {
                console.log('folder');
                $mdDialog.show({
                    controller: 'CloudView.Controllers.Dialog.AddFolder',
                    templateUrl: './Views/_new_folder_dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true
                })
            }

            $scope.ui.file.new_file = function(ev) {
                console.log('file');
                $mdDialog.show({
                    controller: 'CloudView.Controllers.Dialog.AddFile',
                    templateUrl: './Views/_new_file_dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true
                })
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
                $scope.user = AccountServices.userAccount;   
                $scope.ui.folder.go({name: 'Root', id: 'Root'}); 
            }

            activate();

            var sort = function(files) {
                if (angular.isDefined(files)) {
                    files.forEach(function(file) {
                        if (file.isDir) {
                            $scope.folder.subfolders.push(setProperties(file));
                        } else {
                            $scope.folder.files.push(setProperties(file));
                        }
                    })
                }
            }

            var setProperties = function(fileFolder) {
                console.log(fileFolder);
                fileFolder.type = fileFolder.mimeType;
                switch (fileFolder.root) {
                    case 'google':
                        fileFolder.account = 0;
                        break;
                    case 'onedrive':
                        fileFolder.account = 2;
                        break;
                    case 'dropbox':
                        fileFolder.account = 1;
                        break;
                    default:
                        fileFolder.account = 0;
                }
                return fileFolder;
            }

            var mapFolder = function(folder) {
                console.log(folder);
                folder.type = folder.mimeType;
                if (folder.root == 'google')
                    folder.account = 0;
                else if (folder.root == 'dropbox')
                    folder.account = 1;
                else
                    folder.account = 2;
                return folder;
            }

            var mapFile = function(file) {
                console.log(file);
                file.type = file.mimeType;
                if (file.root == 'google')
                    file.account = 0;
                else if (file.root == 'dropbox')
                    file.account = 1;
                else
                    file.account = 2;
                return file;
            }
        }
    ]);
});
