(function (window, angular) { 'use strict';

angular.module('walleApp.paygates.user')
  .config(function($stateProvider) {
    $stateProvider
      .state('userDeposit', {
        url: '/deposit',
        templateUrl: 'modules/paygates/client/user/deposit/index.html',
        controller: 'UserDepositController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('userWithdrawal', {
        url: '/withdrawal',
        templateUrl: 'modules/paygates/client/user/withdrawal/index.html',
        controller: 'UserWithdrawalController',
        controllerAs: 'vm',
        authenticate: true
      });
  });

})(window, window.angular);