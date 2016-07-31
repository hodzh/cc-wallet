(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.user')
    .run(['MainMenu', userMainMenu]);

  function userMainMenu(MainMenu) {
    MainMenu.items.push(
      {
        'title': 'Deposit',
        'state': 'userDeposit',
        'role': 'user'
      },
      {
        'title': 'Withdrawal',
        'state': 'userWithdrawal',
        'role': 'user'
      }
    );
  }

})(window, window.angular);