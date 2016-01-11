(function (window, angular) { 'use strict';

  angular.module('walleApp.admin')
    .controller('DashboardController', ['UserResource', DashboardController]);

  function DashboardController(User) {
    var vm = this;
    //vm.userCount = User.count();
  }

})(window, window.angular);