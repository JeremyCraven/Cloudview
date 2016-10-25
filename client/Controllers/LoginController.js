define([
    './Common/LoginController'
], function(module) {
    return module.controller('CloudView.Controllers.Login', [
        '$scope',
        '$controller',
        '$state',
        '$cookies',
        'CloudView.Services.AccountServices',
        'CloudView.Services.ErrorDialog',
        function LoginController($scope, $controller, $state, $cookies, AccountServices, ErrorDialog) {
            angular.extend(this, $controller('CloudView.Controllers.Common.Login', {
                $scope: $scope,
                $state: $state
            }));

            $scope.login = function() {
                $scope.loading = true;
                var credentials = {
                    username: $scope.username,
                    password: $scope.password
                }

                AccountServices.login(credentials)
                    .then(
                        function(result) {
                            $scope.loading = false;
                            AccountServices.store_token(result.data.user.token);
                            $cookies.put(AccountServices.cookie_token_key, result.data.user.token);
                            $state.go('folder');
                        },
                        function(result) {
                            switch (result.status) {
                                case 403:
                                ErrorDialog.showError('LOGIN.ERRORS.403.TITLE', 'LOGIN.ERRORS.403.CONTENT', '', '#login-button');
                                break;
                            }
							$scope.loading = false;
                        }
                    );
            };
        }
    ]);
});
