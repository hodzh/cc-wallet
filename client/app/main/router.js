(function (window, angular) { 'use strict';

angular.module('walleApp')
  .config(angular.noop);

  function mainRoute($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        authenticate: true
      });
  }

})(window, window.angular);