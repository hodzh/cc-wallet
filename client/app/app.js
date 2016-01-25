(function (window, angular) { 'use strict';

  angular.module('walleApp', [
      'walleApp.auth',
      'walleApp.admin',
      'walleApp.constants',
      'walleApp.ui',
      'walleApp.wallet.admin',
      'walleApp.wallet.user',
      'walleApp.wallet.ui',
      'walleApp.vp.admin',
      'walleApp.vp.user',
      'walleApp.vp.ui',
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'validation.match'
    ])
    .config(function($urlRouterProvider, $locationProvider) {
      $urlRouterProvider
        .otherwise('/');

      $locationProvider.html5Mode(true);
    });

})(window, window.angular);