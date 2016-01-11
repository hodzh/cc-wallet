(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.user')
    .controller('UserAccountsController', ['UserAccounts', UserAccountsController]);

  function UserAccountsController(UserAccounts) {
    var vm = this;
    vm.accounts = UserAccounts.query();

    vm.enableAccount = enableAccount;
    vm.disableAccount = disableAccount;
    vm.cashOut = cashOut;

    function enableAccount(account) {
      account.$enable({id: account.currency});
    }

    function disableAccount(account) {
      account.$disable({id: account.currency});
    }

    function cashOut(account) {
      account.$cashOut();
    }
  }

})(window, window.angular);
