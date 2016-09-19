define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Folder', [
		'$scope',
		'$state',
		'$mdSidenav',
		function FolderController($scope, $state, $mdSidenav) {
			$scope.user = {
				hasName:	true,
				username:	'john.doe123',
				name:		'John Doe',
				accounts: [
					{
						type:		'Google',
						username:	'john.doe123@googlemail.com',
						active: true,
						space: {
							used:	1024,
							available:	15*1024*1024*1024
						}
					},
					{
						type:		'Google',
						username:	'John.Doe@work.com',
						active:		true,
						space: {
							used: 960*1024*1024,
							available: 5*1024*1024*1024
						}
					},
					{
						type:		'Dropbox',
						username:	'john.doe123',
						active:		false,
						space: {
							used: 14.5*1024*1024*1024,
							available: 15*1024*1024*1024
						}
					}
				]
			};
			$scope.folder = {
				title: 'New Folder',
				account: 'Gmail', //TODO: Bacakend guy figure out datatype
				path:	['party', 'suuplies'],
				subfolders: [],
				files:	[]
			}
			for(var i = 0; i<13; i++) {
				$scope.folder.subfolders.push('Folder ' + (i+1));
			}
			for(var i = 0; i<100; i++) {
				$scope.folder.files.push({
					name: 'File  ' + (i+1),
					type: 'word',
					account: i % $scope.user.accounts.length
				});
			}
			$scope.toggleSidenav = function() {
				$mdSidenav('left').toggle();
			};
			$scope.user.account_toggle = function(index) {
				$scope.user.accounts[index].active = !$scope.user.accounts[index].active;
			}
		}
	]);
});
