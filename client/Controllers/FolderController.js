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
			$scope.user = {
				hasName:	false,
				username:	'',
				name:		'',
				accounts: []
			};
			$scope.folder = {
				title: '',
				account: '', //TODO: Bacakend guy figure out datatype
				path:	[],
				subfolders: [],
				files:	[]
			}
			$scope.toggleSidenav = function() {
				$mdSidenav('left').toggle();
			};

			$scope.getFiles = function() {
				var cloudViewToken = $state.params;
				FileServices.getFiles(cloudViewToken)
					.then(
						function(result) {
							console.log(result.data);
						}, 
						function(result) {
							console.log(result.data);
						}
					);

			};

			FileServices.authorizeGoogle();
			FileServices.authorizeDropbox();
			$scope.getFiles();

		}
	]);
});
