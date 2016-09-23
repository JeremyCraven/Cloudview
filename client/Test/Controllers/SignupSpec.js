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
            it('nonmatching password', function() {
                $scope.password = 'Correct';
                $scope.confirm_password = 'Incorrect';
                $scope.signup();
                expect($scope.error.exists).toBe(true);
                expect($scope.error.message).toEqual('The passwords provided do not match');
            });

            it('nonmatching email', function() {
                $scope.email = 'Correct';
                $scope.confirm_email = 'Incorrect';
                $scope.signup();
                expect($scope.error.exists).toBe(true);
                expect($scope.error.message).toEqual('The email addresses provided do not match');
            });

            it('no error', function() {
                $scope.email = 'Correct';
                $scope.confirm_email = 'Correct';
                $scope.password = 'Correct';
                $scope.confirm_password = 'Correct';
                $scope.signup();
                expect($scope.error.exists).toBe(false);
                expect($scope.error.message).toEqual('');
            })
        });
    });
});
