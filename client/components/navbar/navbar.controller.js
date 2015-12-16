(function (window, angular) { 'use strict';

  angular.module('walleApp')
      .controller('NavbarController', ['Auth', NavbarController]);

  function NavbarController(Auth) {
    this.menu = [{
      'title': 'Home',
      'state': 'main'
    }];
    this.isCollapsed = true;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

})(window, window.angular);