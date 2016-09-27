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
				folderID = $state.params;
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
						$scope.folder.subfolders.push(file);
					}
					else {
						$scope.folder.files.push(file);
					}
				})
			}

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
