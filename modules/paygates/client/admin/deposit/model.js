(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.admin')
    .factory('AdminDeposit', ['$resource', AdminDeposit]);

  function AdminDeposit($resource) {
    return $resource(
      '/aapi/paygates/deposit/:id/:controller',
      {
        id: '@_id'
      },
      {

      }
    );
  }

})(window, window.angular);
