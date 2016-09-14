define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Folder', [
		'$scope',
		'$state',
		'$mdSidenav',
		function FolderController($scope, $state, $mdSidenav) {
			$scope.user = {
				username:	'john.doe123',
				name:		'John Doe',
				accounds: [
					{
						type:		'Google',
						username:	'john.doe123@googlemail.com',
						dirs: []
					},
					{
						type:		'Google',
						username:	'John.Doe@work.com'
					},
					{
						type:		'Dropbox',
						username:	'john.doe123'
					}
				]
			};
			$scope.folder = {
				title: 'New Folder',
				accound: 'Gmail', //TODO: Bacakend guy figure out datatype
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
				debugger;
				$mdSidenav('left').toggle();
			};
		}
	]);
});
