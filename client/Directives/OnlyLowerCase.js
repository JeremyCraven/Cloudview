define([
    './Module',
    'xregexp'
], function(module, XRegExp) {
    'use strict';
    return module.directive('onlyLowerCase', function patternTest($parse) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                var regex = XRegExp('(?=.*[\\p{Lu}\\p{Lo}])');
                ctrl.$validators.onlyLowerCase = function() {
                    return regex.test(ctrl.$viewValue) === true;
                };
            }
        };
    });
});
