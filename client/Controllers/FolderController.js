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

			$scope.fileFolderStructure = {};

			$scope.getFiles = function() {
				folderID = $state.params;
				FileServices.getFiles(folderID)
					.then(
						function(result) {
							$scope.fileFolderStructure = result.data;
							console.log($scope.fileFolderStructure);
						}, 
						function(result) {
							console.log(result.data);
						}
					);

			};

			FileServices.authorizeGoogle();
			//FileServices.authorizeDropbox();
			$scope.getFiles();

			$scope.open = function(object) {
				if (object.isDir) {
					$state.go('folder', object.id);
				}
				else {
					// open file
				}
			}

		}
	]);
});
