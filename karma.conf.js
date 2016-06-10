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
      './modules/wallet/client/admin/transaction/schema.js',
      './modules/wallet/client/admin/transaction/model.js',
      './modules/wallet/client/admin/transaction/controller.js',
      './modules/wallet/client/admin/router.js',
      './modules/wallet/client/admin/main-menu.js',
      './modules/wallet/client/admin/account/schema.js',
      './modules/wallet/client/admin/account/model.js',
      './modules/wallet/client/admin/account/controller.js',
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
      './modules/vp/client/user/canvas/painter.js',
      './modules/vp/client/user/canvas/directive.js',
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
      './modules/paygates-bitcoin/client/user/module.js',
      './modules/paygates-bitcoin/client/user/withdrawal-form/directive.js',
      './modules/paygates-bitcoin/client/user/withdrawal-form/controller.js',
      './modules/paygates-bitcoin/client/user/withdrawal/model.js',
      './modules/paygates-bitcoin/client/user/transaction/model.js',
      './modules/paygates-bitcoin/client/user/transaction/controller.js',
      './modules/paygates/client/user/module.js',
      './modules/paygates-bitcoin/client/user/router.js',
      './modules/paygates-bitcoin/client/user/main-menu.js',
      './modules/paygates-bitcoin/client/user/address/model.js',
      './modules/paygates-bitcoin/client/user/address/controller.js',
      './modules/paygates-bitcoin/client/components/module.js',
      './modules/paygates-bitcoin/client/admin/module.js',
      './modules/paygates-bitcoin/client/admin/transaction/schema.js',
      './modules/paygates-bitcoin/client/admin/transaction/model.js',
      './modules/paygates-bitcoin/client/admin/transaction/controller.js',
      './modules/paygates-bitcoin/client/admin/router.js',
      './modules/paygates-bitcoin/client/admin/main-menu.js',
      './modules/paygates-bitcoin/client/admin/address/schema.js',
      './modules/paygates-bitcoin/client/admin/address/model.js',
      './modules/paygates-bitcoin/client/admin/address/controller.js',
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
      './modules/core/client/components/util/module.js',
      './modules/core/client/components/util/service.js',
      './modules/core/client/app/app.js',
      './modules/core/client/components/socket/socket.service.js',
      './modules/core/client/components/module.js',
      './modules/core/client/components/password/directive.js',
      './modules/core/client/components/password/controller.js',
      './modules/core/client/components/oauth-buttons/oauth-buttons.directive.js',
      './modules/core/client/components/oauth-buttons/oauth-buttons.controller.js',
      './modules/core/client/components/navbar/directive.js',
      './modules/core/client/components/navbar/controller.js',
      './modules/core/client/components/mongoose-error/directive.js',
      './modules/core/client/components/modal/service.js',
      './modules/core/client/components/main-menu/factory.js',
      './modules/core/client/components/footer/directive.js',
      './modules/core/client/components/email/directive.js',
      './modules/core/client/components/email/controller.js',
      './modules/core/client/components/editable/xs-input-sync.directive.js',
      './modules/core/client/components/editable/enter.js',
      './modules/core/client/components/editable/editable-select.js',
      './modules/core/client/components/editable/editable-paragraph.js',
      './modules/core/client/components/editable/editable.js',
      './modules/core/client/components/auth/module.js',
      './modules/core/client/components/auth/user.service.js',
      './modules/core/client/components/auth/token-storage.service.js',
      './modules/core/client/components/auth/router.decorator.js',
      './modules/core/client/components/auth/interceptor.service.js',
      './modules/core/client/components/auth/auth.service.js',
      './modules/core/client/app/main/router.js',
      './modules/core/client/app/main/controller.js',
      './modules/core/client/app/constants/module.js',
      './modules/core/client/app/constants/machine-state.js',
      './modules/core/client/app/constants/currency.js',
      './modules/core/client/app/constants/app-config.js',
      './modules/core/client/app/admin/module.js',
      './modules/core/client/app/admin/users/model.js',
      './modules/core/client/app/admin/users/controller.js',
      './modules/core/client/app/admin/router.js',
      './modules/core/client/app/admin/dashboard/controller.js',
      './modules/core/client/app/account/signup/controller.js',
      './modules/core/client/app/account/settings/controller.js',
      './modules/core/client/app/account/login/controller.js',
      './modules/core/client/app/account/account.js',
      // endinject

      // inject-dev:js
      './modules/core/client/app/account/login/index.html',
      './modules/core/client/app/account/settings/index.html',
      './modules/core/client/app/account/signup/controller.spec.js',
      './modules/core/client/app/account/signup/index.html',
      './modules/core/client/app/admin/dashboard/index.html',
      './modules/core/client/app/admin/users/index.html',
      './modules/core/client/app/main/controller.spec.js',
      './modules/core/client/app/main/index.html',
      './modules/core/client/components/email/controller.spec.js',
      './modules/core/client/components/email/directive.spec.js',
      './modules/core/client/components/email/index.html',
      './modules/core/client/components/footer/index.html',
      './modules/core/client/components/modal/index.html',
      './modules/core/client/components/navbar/index.html',
      './modules/core/client/components/oauth-buttons/oauth-buttons.controller.spec.js',
      './modules/core/client/components/oauth-buttons/oauth-buttons.directive.spec.js',
      './modules/core/client/components/oauth-buttons/oauth-buttons.html',
      './modules/core/client/components/password/controller.spec.js',
      './modules/core/client/components/password/directive.spec.js',
      './modules/core/client/components/password/index.html',
      './modules/core/client/components/socket/socket.mock.js',
      './modules/core/client/components/ui-router/ui-router.mock.js',
      './modules/core/client/index.html',
      './modules/paygates/client/admin/deposit/index.html',
      './modules/paygates/client/admin/withdrawal/index.html',
      './modules/paygates/client/user/deposit/index.html',
      './modules/paygates/client/user/withdrawal/index.html',
      './modules/paygates-bitcoin/client/admin/address/index.html',
      './modules/paygates-bitcoin/client/admin/transaction/index.html',
      './modules/paygates-bitcoin/client/user/withdrawal-form/controller.spec.js',
      './modules/paygates-bitcoin/client/user/withdrawal-form/directive.spec.js',
      './modules/paygates-bitcoin/client/user/withdrawal-form/index.html',
      './modules/vp/client/admin/config/index.html',
      './modules/vp/client/admin/index.html',
      './modules/vp/client/admin/state/index.html',
      './modules/vp/client/user/bot/controller.spec.js',
      './modules/vp/client/user/bot/directive.spec.js',
      './modules/vp/client/user/bot/index.html',
      './modules/vp/client/user/canvas/directive.spec.js',
      './modules/vp/client/user/canvas/index.html',
      './modules/vp/client/user/state/index.html',
      './modules/wallet/client/admin/account/index.html',
      './modules/wallet/client/admin/transaction/index.html',
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
      'modules/paygates-bitcoin/client/**/*.html': ['ng-html2js']
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

