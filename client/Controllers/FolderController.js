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
						dirs: []
					},
					{
						type:		'Google',
						username:	'John.Doe@work.com',
						dirs: []
					},
					{
						type:		'Dropbox',
						username:	'john.doe123',
						dirs: []
					}
				]
			};
			$scope.folder = {
				title: 'New Folder',
				account: 'Gmail', //TODO: Bacakend guy figure out datatype
				path:	['party', 'suuplies'],
				subfolders: [
					'Sub1',
					'sub2',
					'aaaaaaabc',
					'Canada',
					'Evil things No.6'
				],
				files:	[]
			}
			$scope.toggleSidenav = function() {
				$mdSidenav('left').toggle();
			};
		}
	]);
});
