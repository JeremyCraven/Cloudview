define([
    './Module'
], function(module) {
    return module.factory('CloudView.Services.ErrorDialog', [
        '$mdDialog',
        function ErrorDialogService($mdDialog) {
            function ErrorDialogController($scope, $mdDialog, title, body, more) {
                $scope.title = title;
                $scope.body = body;
                $scope.more = more;
                $scope.showMore = false;
                $scope.details = function() {
                    $scope.showMore = !$scope.showMore;
                };
                $scope.finish = function() {
                    $mdDialog.hide();
                };
            }

            var service = {};
            service.showError = function(title, body, more, from) {
                $mdDialog.show({
                    controller: ErrorDialogController,
                    templateUrl: './Views/_error_dialog.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    openFrom: from,
                    closeTo: from,
                    locals: {
                        'title': title,
                        'body': body,
                        'more': more
                    }
                });
            };

			return service;
        }
    ]);
});
