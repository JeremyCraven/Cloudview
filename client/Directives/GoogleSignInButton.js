define([
    './Module'
], function(module) {
    'use strict';
    return module.directive('googleSignInButton', function() {
		var i = 0;
        return {
            scope: {
                buttonId: '@',
                options: '&'
            },
            template: '<div></div>',
            link: function(scope, element, attrs) {
                var div = element.find('div')[0];
                div.id = attrs.buttonId + "-" + i++;
                gapi.signin2.render(div.id, scope.options()); //render a google button, first argument is an id, second options
            }
        };
    });
});
