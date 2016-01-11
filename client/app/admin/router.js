(function (window, angular) { 'use strict';

  angular.module('walleApp.admin')
    .config(['$stateProvider', adminRouter]);

  function adminRouter($stateProvider) {
    $stateProvider
      .state('adminDashboard', {
        url: '/admin/dashboard',
        templateUrl: 'app/admin/dashboard/index.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        authenticate: 'admin'
      })
      .state('adminUsers', {
        url: '/admin/users',
        templateUrl: 'app/admin/users/index.html',
        controller: 'UsersController',
        controllerAs: 'vm',
        authenticate: 'admin'
      });
  }

})(window, window.angular);