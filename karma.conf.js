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
      './modules/wallet/client/user/module.js',
      './modules/wallet/client/user/router.js',
      './modules/wallet/client/user/accounts/model.js',
      './modules/wallet/client/user/accounts/controller.js',
      './modules/wallet/client/components/module.js',
      './modules/wallet/client/admin/module.js',
      './modules/wallet/client/admin/transactions/schema.js',
      './modules/wallet/client/admin/transactions/model.js',
      './modules/wallet/client/admin/transactions/controller.js',
      './modules/wallet/client/admin/router.js',
      './modules/wallet/client/admin/main-menu.js',
      './modules/wallet/client/admin/accounts/schema.js',
      './modules/wallet/client/admin/accounts/model.js',
      './modules/wallet/client/admin/accounts/controller.js',
      './modules/vp/client/user/module.js',
      './modules/vp/client/user/state/state.js',
      './modules/vp/client/user/state/sprite-animation.js',
      './modules/vp/client/user/state/sounds.js',
      './modules/vp/client/user/state/model.js',
      './modules/vp/client/user/state/loader.js',
      './modules/vp/client/user/state/images.js',
      './modules/vp/client/user/state/game-state.js',
      './modules/vp/client/user/state/controller.js',
      './modules/vp/client/user/state/config.js',
      './modules/vp/client/user/state/canvas.js',
      './modules/vp/client/user/state/buttons.js',
      './modules/vp/client/user/state/animaton.js',
      './modules/vp/client/user/router.js',
      './modules/vp/client/user/main-menu.js',
      './modules/vp/client/user/bot/strategy/risk.js',
      './modules/vp/client/user/bot/strategy/hold-simple.js',
      './modules/vp/client/user/bot/strategy/hold.js',
      './modules/vp/client/user/bot/model.js',
      './modules/vp/client/user/bot/directive.js',
      './modules/vp/client/user/bot/controller.js',
      './modules/vp/client/components/module.js',
      './modules/vp/client/assets/sprites/classic-images-map.js',
      './modules/vp/client/admin/module.js',
      './modules/vp/client/admin/state/schema.js',
      './modules/vp/client/admin/state/model.js',
      './modules/vp/client/admin/state/controller.js',
      './modules/vp/client/admin/router.js',
      './modules/vp/client/admin/main-menu.js',
      './modules/vp/client/admin/controller.js',
      './modules/vp/client/admin/config/schema.js',
      './modules/vp/client/admin/config/model.js',
      './modules/vp/client/admin/config/controller.js',
      './modules/paygates/client/user/module.js',
      './modules/paygates/client/user/withdrawal/schema.js',
      './modules/paygates/client/user/withdrawal/model.js',
      './modules/paygates/client/user/withdrawal/controller.js',
      './modules/paygates/client/user/router.js',
      './modules/paygates/client/user/main-menu.js',
      './modules/paygates/client/user/deposit/schema.js',
      './modules/paygates/client/user/deposit/model.js',
      './modules/paygates/client/user/deposit/controller.js',
      './modules/paygates/client/components/module.js',
      './modules/paygates/client/admin/module.js',
      './modules/paygates/client/admin/withdrawal/schema.js',
      './modules/paygates/client/admin/withdrawal/model.js',
      './modules/paygates/client/admin/withdrawal/controller.js',
      './modules/paygates/client/admin/router.js',
      './modules/paygates/client/admin/main-menu.js',
      './modules/paygates/client/admin/deposit/schema.js',
      './modules/paygates/client/admin/deposit/model.js',
      './modules/paygates/client/admin/deposit/controller.js',
      './client/components/util/module.js',
      './client/components/util/service.js',
      './client/app/app.js',
      './client/components/socket/socket.service.js',
      './client/components/module.js',
      './client/components/password/directive.js',
      './client/components/password/controller.js',
      './client/components/oauth-buttons/oauth-buttons.directive.js',
      './client/components/oauth-buttons/oauth-buttons.controller.js',
      './client/components/navbar/directive.js',
      './client/components/navbar/controller.js',
      './client/components/mongoose-error/directive.js',
      './client/components/modal/service.js',
      './client/components/main-menu/factory.js',
      './client/components/footer/directive.js',
      './client/components/email/directive.js',
      './client/components/email/controller.js',
      './client/components/editable/xs-input-sync.directive.js',
      './client/components/editable/enter.js',
      './client/components/editable/editable-select.js',
      './client/components/editable/editable-paragraph.js',
      './client/components/editable/editable.js',
      './client/components/auth/module.js',
      './client/components/auth/user.service.js',
      './client/components/auth/token-storage.service.js',
      './client/components/auth/router.decorator.js',
      './client/components/auth/interceptor.service.js',
      './client/components/auth/auth.service.js',
      './client/app/main/router.js',
      './client/app/main/controller.js',
      './client/app/constants/module.js',
      './client/app/constants/machine-state.js',
      './client/app/constants/currency.js',
      './client/app/constants/app-config.js',
      './client/app/admin/module.js',
      './client/app/admin/users/model.js',
      './client/app/admin/users/controller.js',
      './client/app/admin/router.js',
      './client/app/admin/dashboard/controller.js',
      './client/app/account/signup/controller.js',
      './client/app/account/settings/controller.js',
      './client/app/account/login/controller.js',
      './client/app/account/account.js',
      // endinject

      // inject-dev:js
      './client/app/account/login/index.html',
      './client/app/account/settings/index.html',
      './client/app/account/signup/controller.spec.js',
      './client/app/account/signup/index.html',
      './client/app/admin/dashboard/index.html',
      './client/app/admin/users/index.html',
      './client/app/main/controller.spec.js',
      './client/app/main/index.html',
      './client/components/email/controller.spec.js',
      './client/components/email/directive.spec.js',
      './client/components/email/index.html',
      './client/components/footer/index.html',
      './client/components/modal/index.html',
      './client/components/navbar/index.html',
      './client/components/oauth-buttons/oauth-buttons.controller.spec.js',
      './client/components/oauth-buttons/oauth-buttons.directive.spec.js',
      './client/components/oauth-buttons/oauth-buttons.html',
      './client/components/password/controller.spec.js',
      './client/components/password/directive.spec.js',
      './client/components/password/index.html',
      './client/components/socket/socket.mock.js',
      './client/components/ui-router/ui-router.mock.js',
      './client/index.html',
      './modules/paygates/client/admin/deposit/index.html',
      './modules/paygates/client/admin/withdrawal/index.html',
      './modules/paygates/client/user/deposit/index.html',
      './modules/paygates/client/user/withdrawal/index.html',
      './modules/vp/client/admin/config/index.html',
      './modules/vp/client/admin/index.html',
      './modules/vp/client/admin/state/index.html',
      './modules/vp/client/user/bot/controller.spec.js',
      './modules/vp/client/user/bot/directive.spec.js',
      './modules/vp/client/user/bot/index.html',
      './modules/vp/client/user/state/index.html',
      './modules/wallet/client/admin/accounts/index.html',
      './modules/wallet/client/admin/transactions/index.html',
      './modules/wallet/client/user/accounts/index.html',
      // endinject
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

    preprocessors: {
      // (these files will be instrumented by Istanbul)
      'client/app/**/*.js': ['coverage'],
      'client/components/**/*.js': ['coverage'],
      'modules/**/client/**/*.js': ['coverage'],

      'client/app/**/*.html': ['ng-html2js'],
      'client/components/**/*.html': ['ng-html2js'],
      'modules/wallet/client/**/*.html': ['ng-html2js'],
      'modules/vp/client/**/*.html': ['ng-html2js'],
      'modules/paygates/client/**/*.html': ['ng-html2js'],
      'modules/paygates-bitcoind/client/**/*.html': ['ng-html2js']
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
    browsers: ['PhantomJS'],
    //browsers: ['Firefox'],

    urlRoot: '/__karma__/',

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    //singleRun: true
  });
};

