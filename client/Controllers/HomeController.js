define([
	'./Common/HomeController'
], function(module) {
	return module.controller('CloudView.Controllers.Home', [
		'$scope',
		'$state',
		'$controller',
		function HomeController($scope, $state, $controller) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Home', {$scope: $scope, $state: $state}));
		}
	]);
});
