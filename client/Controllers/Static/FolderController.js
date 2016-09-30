define([
    'Controllers-Common/FolderController'
], function(module) {
    'use strict';
    return module.controller('CloudView.Controllers.Folder', [
        '$scope',
		'$controller',
        '$state',
        '$mdSidenav',
        '$mdDialog',
        '$mdBottomSheet',
        function FolderController($scope, $controller, $state, $mdSidenav, $mdDialog, $mdBottomSheet) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Folder', {$scope: $scope, $mdSidenav: $mdSidenav, $mdDialog: $mdDialog}));
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
                }]
			};
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
