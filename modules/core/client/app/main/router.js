(function (window, angular) { 'use strict';

angular.module('walleApp')
  .config(angular.noop);

  function mainRoute($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'modules/core/client/app/main/index.html',
        controller: 'MainController',
        controllerAs: 'vm',
        authenticate: true
      });
  }

})(window, window.angular);