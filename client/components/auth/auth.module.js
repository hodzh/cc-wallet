(function (window, angular) { 'use strict';

  angular.module('walleApp.auth', [
        'walleApp.constants',
        'walleApp.util',
        'ngCookies',
        'ui.router'
      ])
      .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
      });

})(window, window.angular);