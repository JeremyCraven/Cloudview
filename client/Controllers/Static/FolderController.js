define([
    './Module'
], function(module) {
    return module.controller('CloudView.Controllers.Folder', [
        '$scope',
        '$state',
        '$mdSidenav',
        '$mdDialog',
        '$mdBottomSheet',
        function FolderController($scope, $state, $mdSidenav, $mdDialog, $mdBottomSheet) {
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
                            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                        })
                        .then(function(answer) {
                            //TODO: handle 'success'
                        }, function() {
                            //do nothing becuase the action was canceled
                        });
                }
            };
            $scope.user = {
                hasName: true,
                username: 'john.doe123',
                name: 'John Doe',
                accounts: [{
                    type: 'Google',
                    username: 'john.doe123@googlemail.com',
                    active: true,
                    space: {
                        used: 1024,
                        available: 15 * 1024 * 1024 * 1024
                    }
                }, {
                    type: 'Google',
                    username: 'John.Doe@work.com',
                    active: true,
                    space: {
                        used: 960 * 1024 * 1024,
                        available: 5 * 1024 * 1024 * 1024
                    }
                }, {
                    type: 'Dropbox',
                    username: 'john.doe123',
                    active: false,
                    space: {
                        used: 14.5 * 1024 * 1024 * 1024,
                        available: 15 * 1024 * 1024 * 1024
                    }
                }],
                account_toggle: function(index) {
                    $scope.user.accounts[index].active = !$scope.user.accounts[index].active;
                }
            };
            $scope.folder = {
                title: 'New Folder',
                path: [{
                    name: 'Party',
                    id: 1
                }, {
                    name: 'Suplies',
                    id: 2
                }],
                subfolders: [],
                files: []
            }
            for (var i = 0; i < 13; i++) {
                $scope.folder.subfolders.push({
                    name: 'Folder ' + (i + 1),
                    id: i + 3
                });
            }
            for (var i = 0; i < 100; i++) {
                $scope.folder.files.push({
                    name: 'File  ' + (i + 1),
                    type: 'word',
                    account: i % $scope.user.accounts.length,
                    id: i
                });
            }
        }
    ]);
});
