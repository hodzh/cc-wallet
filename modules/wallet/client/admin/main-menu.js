(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.admin')
    .run(['MainMenu', adminMainMenu]);

  function adminMainMenu(MainMenu) {
    MainMenu.items.push(
      {
        'title': 'Accounts',
        'state': 'adminAccounts',
        'role': 'admin'
      },
      {
        'title': 'Transactions',
        'state': 'adminTransactions',
        'role': 'admin'
      }
    );
  }

})(window, window.angular);