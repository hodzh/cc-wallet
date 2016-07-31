(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.admin')
    .config(['$stateProvider', adminRouter]);

  function adminRouter($stateProvider) {
    $stateProvider
      .state('adminDeposit', {
        url: '/admin/paygates/deposit',
        templateUrl: 'modules/paygates/client/admin/deposit/index.html',
        controller: 'AdminDepositController',
        controllerAs: 'vm',
        authenticate: 'admin'
      })
      .state('adminWithdrawal', {
        url: '/admin/paygates/withdrawal',
        templateUrl: 'modules/paygates/client/admin/withdrawal/index.html',
        controller: 'AdminWithdrawalController',
        controllerAs: 'vm',
        authenticate: 'admin'
      });
  }

})(window, window.angular);