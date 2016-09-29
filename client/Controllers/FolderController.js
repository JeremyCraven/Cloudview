define([
    './Module'
], function(module) {
    return module.controller('CloudView.Controllers.Folder', [
        '$scope',
        '$state',
        '$mdSidenav',
		'$mdDialog',
        'CloudView.Services.FileServices',
        'CloudView.Services.AccountServices',
        function FolderController($scope, $state, $mdSidenav, $mdDialog, FileServices, AccountServices) {
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
							if(answer === 'success') {
								//TODO: reload account list
							} else {
								//TODO: render ErrorDialog or use a toast
							}
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
