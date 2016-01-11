(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.admin')
    .config(['$stateProvider', adminRouter]);

  function adminRouter($stateProvider) {
    $stateProvider
      .state('adminAccounts', {
        url: '/admin/accounts',
        templateUrl: 'modules/wallet/client/admin/accounts/index.html',
        controller: 'AdminAccountsController',
        controllerAs: 'vm',
        authenticate: 'admin'
      })
      .state('adminTransactions', {
        url: '/admin/transactions',
        templateUrl: 'modules/wallet/client/admin/transactions/index.html',
        controller: 'AdminTransactionsController',
        controllerAs: 'vm',
        authenticate: 'admin'
      });
  }

})(window, window.angular);