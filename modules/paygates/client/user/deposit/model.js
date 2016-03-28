(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.user')
    .factory('UserDeposit', ['$resource', UserDeposit]);

  function UserDeposit($resource) {
    return $resource(
      '/api/paygates/deposit/:id/:controller',
      {
        id: '@_id'
      },
      {

      }
    );
  }

})(window, window.angular);
