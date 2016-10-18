require.config({
    paths: {
        //Bower Libraries
        'angular': './bower_components/angular/angular',
        'ngAnimate': './bower_components/angular-animate/angular-animate',
        'ngAria': './bower_components/angular-aria/angular-aria',
        'ngMaterial': './bower_components/angular-material/angular-material',
        'ngMessages': './bower_components/angular-messages/angular-messages',
        'ngSanitize': './bower_components/angular-sanitize/angular-sanitize',
        'ngCookies': './bower_components/angular-cookies/angular-cookies',
        'pascalprecht.translate': './bower_components/angular-translate/angular-translate',
        'ui.router': './bower_components/angular-ui-router/release/angular-ui-router',
        'ui.tree': './bower_components/angular-ui-tree/dist/angular-ui-tree',
        'validation.match': './bower_components/angular-validation-match/dist/angular-validation-match',
        'domReady': './bower_components/domReady/domReady',
        'underscore': './bower_components/underscore/underscore',
        'xregexp': './bower_components/xregexp/xregexp-all',
		'viewport-units-buggyfill':	'./bower_components/viewport-units-buggyfill/viewport-units-buggyfill',
		'viewport-units-buggyfill-hacks':	'./bower_components/viewport-units-buggyfill/viewport-units-buggyfill.hacks',
        'angular-file-upload': './bower_components/angular-file-upload/dist/angular-file-upload',
        //our code
		'Controllers-Common': './Controllers/Common',
        'Controllers': './Controllers',
        'Directives': './Directives',
        'Filters': './Filters',
        'Libraries': './Libraries',
        'Services': './Services'

    },
    shim: {
        'angular': {
            exports: 'angular'
        },
		'underscore': {
			exports: '_'
		},
        'angular-file-upload': {
            deps: ['angular']
        },
        'ngAnimate': {
            deps: ['angular']
        },
        'ngAria': {
            deps: ['angular']
        },
        'ngMaterial': {
            deps: ['angular']
        },
        'ngMessages': {
            deps: ['angular']
        },
        'ngSanitize': {
            deps: ['angular']
        },
        'ngCookies': {
            deps: ['angular']
        },
        'pascalprecht.translate': {
            deps: ['angular']
        },
        'ui.router': {
            deps: ['angular']
        },
        'ui.tree': {
            deps: ['angular']
        },
        'validation.match': {
            deps: ['angular']
        },
        'xregexp': {
            exports: "XRegExp",
        }
    },
    deps: ['./Bootstrap']
});
