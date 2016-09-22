// Karma configuration
// Generated on Thu Sep 22 2016 15:11:18 GMT-0400 (ora legale fuso or.)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            JASMINE,
            JASMINE_ADAPTER,
            REQUIRE,
            REQUIRE_ADAPTER,

            {
                pattern: '**/*.js',
                included: false
            }, {
                pattern: 'Test/**/*Spec.js',
                included: false
            },

			'./bower_components/angular/angular',
	        './bower_components/angular-animate/angular-animate',
	        './bower_components/angular-aria/angular-aria',
	        './bower_components/angular-material/angular-material',
	        './bower_components/angular-messages/angular-messages',
	        './bower_components/angular-sanitize/angular-sanitize',
	        './bower_components/angular-translate/angular-translate',
	        './bower_components/angular-ui-router/release/angular-ui-router',
	        './bower_components/angular-ui-tree/dist/angular-ui-tree',
	        './bower_components/angular-validation-match/dist/angular-validation-match',
	        './bower_components/domReady/domReady',
	        './bower_components/underscore/underscore',
	        './bower_components/xregexp/xregexp-all',
			'./bower_components/viewport-units-buggyfill/viewport-units-buggyfill',
			'./bower_components/viewport-units-buggyfill/viewport-units-buggyfill.hacks',

            'Test/Main.test.js'
        ],


        // list of files to exclude
        exclude: ['Main.js', 'Shelved/*'],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'IE'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
