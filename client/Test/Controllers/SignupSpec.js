define(['Application', 'angular', 'ngMocks'], function(app, ng, mocks) {
    describe('testing signup controller', function() {
        beforeEach(module('CloudView'));

        var $controller;

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
        }));

        describe('form validation', function() {
            var $scope, controller;

            beforeEach(function() {
                $scope = {};
                controller = $controller('CloudView.Controllers.Signup', {
                    $scope: $scope
                });
            });
        });
    });
});
