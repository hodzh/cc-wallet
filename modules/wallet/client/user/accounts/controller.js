(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.user')
    .controller('UserAccountsController', ['UserAccounts', 'currency', UserAccountsController]);

  function UserAccountsController(UserAccounts, currency) {
    var vm = this;
    vm.currency = {};
    vm.currencies = Object.keys(currency).map(function (name) {
      var c = {
        currency: name,
        enable: false
      };
      vm.currency[name] = c;
      return c;
    });
    vm.accounts = UserAccounts.query(onAccounts);

    vm.enableAccount = enableAccount;
    vm.disableAccount = disableAccount;

    vm.withdrawalInfo = {};

    function onAccounts(){
      vm.accounts.forEach(onAccount);
      function  onAccount(account){
        vm.currency[account.currency].enable = true;
      }
    }

    function accountFindById(account) {
      for(var i = 0, count = vm.accounts.length; i < count; ++i){
        var ai = vm.accounts[i];
        if (account._id === ai._id) {
          return ai;
        }
      }
      return null;
    }

    function accountFindByCurrency(account) {
      for(var i = 0, count = vm.accounts.length; i < count; ++i){
        var ai = vm.accounts[i];
        if (account.currency === ai.currency) {
          return ai;
        }
      }
      return null;
    }

    function enableAccount(account) {
      var accountExists = accountFindByCurrency(account);
      if (accountExists) {
        accountExists.$enable(onEnable);
      }
      else {
        UserAccounts.enable({currency: account.currency}, {}, onEnable);
      }

      function onEnable(enabledAccount) {
        vm.currency[account.currency].enable = true;
        if (!accountExists) {
          vm.accounts.push(enabledAccount);
        }
      }
    }

    function disableAccount(account) {
      account.$disable(onDisable);
      function onDisable() {
        vm.currency[account.currency].enable = false;
      }
    }
  }

})(window, window.angular);
