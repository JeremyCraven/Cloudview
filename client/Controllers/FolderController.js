define([
    './Module'
], function(module) {
    return module.controller('CloudView.Controllers.Folder', [
        '$scope',
        '$state',
        '$mdSidenav',
        'CloudView.Services.FileServices',
        function FolderController($scope, $state, $mdSidenav, FileServices) {
            console.log($state.params);
            $scope.ui = {
                fab: {
                    isOpen: false
                },
                sideNav: {
                    toggleSidenav: function() {
                        $mdSidenav('left').toggle();
                    }
                },
                folder: {
                    go: function(path) {
                        //TODO: go-to folder
                    },
                    new_folder: function() {
                        //TODO: new folder dialogue
                    },
                },
                file: {
                    open: {
                        //TODO: open file?
                    },
                    new_file: function() {
                        //TODO: new file dialogue
                    }
                },
                new_account: function(ev) {
                    $mdDialog.show({
                            controller: 'CloudView.Controllers.Dialog.NewAccount',
                            templateUrl: './Views/_new_account_dialog.html',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            fullscreen: true
                        })
                        .then(function(answer) {
                            //TODO: handle 'success'
                        }, function() {
                            //do nothing becuase the action was canceled
                        });
                }
            };
            $scope.user = {
                hasName: false,
                username: '',
                name: '',
                accounts: []
            };
            $scope.folder = {
                title: '',
                account: '', //TODO: Bacakend guy figure out datatype
                path: [],
                subfolders: [],
                files: []
            };
            $scope.getFiles = function() {
                folderID = $state.params;
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


            $scope.getFiles();

            var sort = function(files) {
                files.forEach(function(file) {
                    if (file.isDir) {
                        $scope.folder.subfolders.push(mapFolder(file));
                    } else {
                        $scope.folder.files.push(mapFile(file));
                    }
                })
            }

            var mapFolder = function(file) {
                newFile = {};
                // TODO
                newFile = file;
                return newFile;
            }

            var mapFile = function(folder) {
                newFolder = {};
                // TODO
                newFolder = folder;
                return newFolder;
            }

            $scope.open = function(object) {
                if (object.isDir) {
                    $state.go('folder', object.id);
                } else {
                    // open file
                }
            }

        }
    ]);
});
