(function (window, angular) { 'use strict';

  angular.module('walleApp')
    .controller('NavbarController', ['Auth', 'MainMenu', NavbarController]);

  function NavbarController(Auth, MainMenu) {
    var vm = this;
    vm.menu = MainMenu.items;
    vm.isCollapsed = true;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.hasRole = Auth.hasRole;
    vm.getCurrentUser = Auth.getCurrentUser;
  }

})(window, window.angular);