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
						username:	'john.doe123@googlemail.com'
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
				account: 'Gmail', //TODO: Bacakend guy figure out datatype
				path:	['party', 'suuplies'],
				subfolders: [
					'Sub1',
					'sub2',
					'Sub3',
					'Sub4',
					'Sub5',
					'Sub6'
				],
				files:	[
					{
						name: "File 1",
						type: 'word'
					},
					{
						name: "File 2",
						type: 'word'
					},
					{
						name: "File 3",
						type: 'word'
					},
					{
						name: "File 4",
						type: 'word'
					},
					{
						name: "File 5",
						type: 'word'
					},
					{
						name: "File 6",
						type: 'word'
					},
					{
						name: "File 7",
						type: 'word'
					},
					{
						name: "File 8",
						type: 'word'
					},
					{
						name: "File 9",
						type: 'word'
					},
					{
						name: "File 10",
						type: 'word'
					},
					{
						name: "File 11",
						type: 'word'
					},
					{
						name: "File 12",
						type: 'word'
					},
					{
						name: "File 13",
						type: 'word'
					}
				]
			}
			$scope.toggleSidenav = function() {
				$mdSidenav('left').toggle();
			};
		}
	]);
});
