define(['Application', 'angular', 'ngMocks', 'View.signup'], function(app, ng, mocks) {
    describe('testing signup view', function() {
        beforeEach(module('CloudView'));
		beforeEach(module('templates'));

        var $scope;
        var $templateCache;
        var $compile;
        var form;

        beforeEach(inject(function($rootScope, _$templateCache_, _$compile_) {
            $scope = $rootScope;
            $templateCache = _$templateCache_;
            $compile = _$compile_;
			$scope.username = '';
			$scope.email = '';
			$scope.confirm_email = '';
			$scope.password = '';
			$scope.confirm_password = '';
			$scope.warn = {
				exists: false,
				prefix:	'',
				message: ''
			};
			$scope.loading = false;
			var html = $templateCache.get('Views/_signup.html');
			var view = $compile(angular.element(html))($scope);
            form = $scope.signupForm;
			debugger;
        }));

        describe('testing username', function() {
            it('require should work for entered value', function() {
                form.username.$setViewValue('captantan')
                $scope.$digest();
                expect(form.username.$valid).toBe(true);
            });
            it('require should fail for empty value', function() {
				form.username.$setViewValue('');
				debugger;
                $scope.$digest();
                expect(form.username.$valid).toBe(false);
            });
        });
    });
});
