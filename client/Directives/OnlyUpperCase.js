define([
    './Module',
    'xregexp'
], function(module, XRegExp) {
    'use strict';
    return module.directive('onlyUpperCase', function patternTest($parse) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                var regex = XRegExp("/[\p{Ll}\p{Lo}/");
                ctrl.$validators.onlyUpperCase = function() {
                    return regex.test(ctrl.$viewValue) === true;
                };
            }
        };
    });
});
