'use strict';

// Karma configuration
module.exports = function(config) {
  var basePath = '';

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: basePath,

    files: [
      // bower:js
      './bower_components/jquery/dist/jquery.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './bower_components/angular-cookies/angular-cookies.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      './bower_components/angular-validation-match/src/angular-validation-match.js',
      // endinject

      // inject:js
      './client/components/util/util.module.js',
      './client/components/util/util.service.js',
      './client/app/app.js',
      './client/components/socket/socket.service.js',
      './client/components/oauth-buttons/oauth-buttons.directive.js',
      './client/components/oauth-buttons/oauth-buttons.controller.js',
      './client/components/navbar/navbar.directive.js',
      './client/components/navbar/navbar.controller.js',
      './client/components/mongoose-error/mongoose-error.directive.js',
      './client/components/modal/modal.service.js',
      './client/components/footer/footer.directive.js',
      './client/components/auth/auth.module.js',
      './client/components/auth/user.service.js',
      './client/components/auth/router.decorator.js',
      './client/components/auth/interceptor.service.js',
      './client/components/auth/auth.service.js',
      './client/app/main/main.js',
      './client/app/main/main.controller.js',
      './client/app/constants/walle.js',
      './client/app/admin/admin.module.js',
      './client/app/admin/admin.router.js',
      './client/app/admin/admin.controller.js',
      './client/app/account/signup/signup.controller.js',
      './client/app/account/settings/settings.controller.js',
      './client/app/account/login/login.controller.js',
      './client/app/account/account.js',
      // endinject

      './client/**/*.mock.js',
      './client/**/*.spec.js',
      './client/**/*.html'
    ],

    // frameworks to use
    frameworks: ['jasmine', 'phantomjs-shim'],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage', 'junit'],

    junitReporter: {
      outputDir: 'tests/results/public/junit/'
    },

    // coverage
    preprocessors: {
      // source files that you want to generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'client/app/**/*.js': ['coverage'],
      'client/components/**/*.js': ['coverage'],

      'client/app/**/*.html': ['ng-html2js'],
      'client/components/**/*.html': ['ng-html2js']
    },

    coverageReporter: {
      type: 'html',
      dir: 'tests/results/coverage/'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/',
      //  moduleName: 'templates'
    },

    // web server port
    port: 9876,
    // Look for server on port 3001 (invoked by mocha) - via @brownman
    proxies: {
      '/': 'http://localhost:3001/'
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    //browsers: ['PhantomJS'],
    browsers: ['Firefox'],

    urlRoot: '/__karma__/',

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    //singleRun: true
  });
};

