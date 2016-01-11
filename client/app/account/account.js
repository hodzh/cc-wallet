(function (window, angular) { 'use strict';

angular.module('walleApp.ui')
  .config(['$stateProvider', accountRoute])
  .run(onRun);

  function accountRoute($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/index.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout',
        template: '',
        controller: logoutController
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/index.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/index.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
  }

  function logoutController($state, Auth) {
    Auth.logout();
    $state.go('login');
  }

  function onRun($rootScope) {
    $rootScope.$on('$stateChangeStart', onStateChangeStart);
  }

  function onStateChangeStart(event, next, nextParams, current) {
    if (next.name === 'logout' &&
      current && current.name &&
      !current.authenticate) {
      next.referrer = current.name;
    }
  }

})(window, window.angular);