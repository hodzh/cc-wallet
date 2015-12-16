(function (window, angular) { 'use strict';

  angular.module('walleApp', [
        'walleApp.auth',
        'walleApp.admin',
        'walleApp.constants',
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