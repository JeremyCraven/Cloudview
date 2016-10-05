define([
	'Controllers-Common/LoginController'
], function(module) {
	return module.controller('CloudView.Controllers.Login', [
		'$scope',
		'$controller',
		'$state',
		function LoginController($scope, $controller, $state) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Login', {$scope: $scope, $state: $state}));
			$scope.login = function() {};
		}
	]);
});
