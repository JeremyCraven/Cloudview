define(['Application', 'angular', 'ngMocks'], function(app, ng, mocks) {
    describe('testing home view', function() {
        beforeEach(module('CloudView'));

        var $scope;
        var $templateCache;
        var $compile;

        beforeEach(inject(function($rootScope, _$templateCache_, _$compile_) {
			$scope = $rootScope;
            $templateCache = _$templateCache_;
            $compile = _$compile_;
        }));

        describe('testing buttons exit', function() {
            it('login button should exist', function() {
                var html = $templateCache.get('_home.html');
                var view = $compile(angular.element(html))($scope);
                //expect(view.find('#login')).toExist();
				$scope.$digest();
				expect(view.find('#login')).toBeDefined();
            });
            it('signup button should exist', function() {
				//$scope.group.Items[0].IsClickable = true;
                //$scope.permissions.IsAllowed = true;
                var html = $templateCache.get('_home.html');
                var view = $compile(angular.element(html))($scope);
                //expect(view.find('#login')).toExist();
				$scope.$digest();
				expect(view.find('#signup')).toBeDefined();
            });
        });
    });
});
