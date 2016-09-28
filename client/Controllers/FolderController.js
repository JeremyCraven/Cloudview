define([
	'./Module'
], function(module) {
	return module.controller('CloudView.Controllers.Folder', [
		'$scope',
		'$state',
		'$mdSidenav',
		'CloudView.Services.FileServices',
		'CloudView.Services.AccountServices',
		function FolderController($scope, $state, $mdSidenav, FileServices, AccountServices) {
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
				var data = {
					folderId: $state.params.folderId,
					token: AccountServices.userAccount.cloudViewToken	
				}
				console.log(data);
				
				FileServices.getFiles(data)
					.then(
						function(result) {
							sort(result.data.files);
							if ($state.params.folderId == '') {
								$folder.title = 'root';
							}
							else {
								$folder.title = '$state.params.folderId';
							}							
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
						$scope.folder.subfolders.push(mapFolder(file));
					}
					else {
						$scope.folder.files.push(mapFile(file));
					}
				})
			}

			var mapFolder = function(file) {
				newFile = {};
				// TODO
				newFile = file;
				return newFile;
			}

			var mapFile = function(folder) {
				newFolder = {};
				// TODO
				newFolder = folder;
				return newFolder;
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
