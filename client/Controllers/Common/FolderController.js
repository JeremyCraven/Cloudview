define([
    './Module'
], function(module) {
    return module.controller('CloudView.Controllers.Common.Folder', [
        '$scope',
        '$mdSidenav',
        '$mdDialog',
        function FolderController($scope, $mdSidenav, $mdDialog) {
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
                    go: function(path) {},
                    new_folder: function() {},
					on_new_folder: function() {}
                },
                file: {
                    open: function(path) {},
                    new_file: function() {},
					on_new_file: function() {}
                },
                sort: {
                    fields: [{
                        display: 'None',
                        value: null,
                        has_direction: false
                    }, {
                        display: 'Name',
                        value: 'name',
                        has_direction: true
                    }],
                    sort: function(field, direction) {
                        $scope.ui.sort.field = field;
                        $scope.ui.sort.reverse = direction;
                    },
                    field: null,
                    reverse: false
                },
				search: {
					string: '',
					go: function() {}
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
                        .then($scope.ui.new_account_response, function() {});
                },
                new_account_response: function(response) {
                    // refreshing accounts
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
        }
    ]);
});
