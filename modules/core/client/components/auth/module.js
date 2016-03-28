(function (window, angular) { 'use strict';

  angular.module('walleApp.auth', [
      'walleApp.constants',
      'walleApp.util',
      'ngCookies',
      'ui.router'
    ])
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });

})(window, window.angular);