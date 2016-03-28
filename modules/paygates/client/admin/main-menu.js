(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.admin')
    .run(['MainMenu', adminMainMenu]);

  function adminMainMenu(MainMenu) {
    MainMenu.items.push(
      {
        'title': 'Deposit',
        'state': 'adminDeposit',
        'role': 'admin'
      },
      {
        'title': 'Withdrawal',
        'state': 'adminWithdrawal',
        'role': 'admin'
      }
    );
  }

})(window, window.angular);