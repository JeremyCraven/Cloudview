require.config({
    paths: {
		//Bower Libraries
        'angular':		'./bower_components/angular/angular',
		'ngAnimate':	'./bower_components/angular-animate/angular-animate',
		'ngAria':		'./bower_components/angular-aria/angular-aria',
		'ngMaterial':	'./bower_components/angular-material/angular-material',
		'ngMessages':	'./bower_components/angular-messages/angular-messages',
		'ngSanitize':	'./bower_components/angular-sanitize/angular-sanitize',
		'pascalprecht.translate':
						'./bower_components/angular-translate/angular-translate',
		'ui.router':	'./bower_components/angular-ui-router/release/angular-ui-router',
		'ui.tree':		'./bower_components/angular-ui-tree/dist/angular-ui-tree',
		'validation.match':
						'./bower_components/angular-validation-match/dist/angular-validation-match',
		'domReady':		'./bower_components/domReady/domReady',
		//our code
		//'Controllers':	'./Controllers/Index',
		'Directives':	'./Directive/Index',
		'Filters':		'./Filters/Index',
		'Libraries':	'./Libraries/Index',
		//'Services':		'./Services/Index'

	},
    shim: {
        'angular': {
            exports: 'angular'
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
		}
    },
    deps: ['./Bootstrap']
});
