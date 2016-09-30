define([
	'Controllers-Common/SignupController'
], function(module) {
	return module.controller('CloudView.Controllers.Signup', [
		'$scope',
		'$controller',
		'$state',
		function SignupController($scope, $controller, $state) {
			angular.extend(this, $controller('CloudView.Controllers.Common.Signup', {$scope: $scope, $state: $state}));
			$scope.signup = function() {
				debugger;
			};
		}
	]);
});
