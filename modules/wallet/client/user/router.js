(function (window, angular) { 'use strict';

angular.module('walleApp.wallet.user')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'modules/wallet/client/user/accounts/index.html',
        controller: 'UserAccountsController',
        controllerAs: 'vm',
        authenticate: true
      });
  });

})(window, window.angular);