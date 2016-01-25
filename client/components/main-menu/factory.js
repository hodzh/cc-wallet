(function (window, angular) { 'use strict';

  angular.module('walleApp.ui')
    .factory('MainMenu', [MainMenu]);

  function MainMenu() {
    var items = [
      {
        'title': 'Dashboard',
        'state': 'adminDashboard',
        'role': 'admin'
      },
      {
        'title': 'Users',
        'state': 'adminUsers',
        'role': 'admin'
      }
    ];
    return {
      items: items
    };
  }

})(window, window.angular);