define([
    'require',
    'angular',
    './Application',
    './Routes'
], function(require, ng) {
    'use strict';
    require(['domReady!'], function(document) {
        ng.bootstrap(document, ['CloudView']);
    });
});
