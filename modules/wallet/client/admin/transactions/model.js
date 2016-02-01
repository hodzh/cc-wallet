(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.admin')
    .factory('AdminTransactions', ['$resource', AdminTransactions]);

  function AdminTransactions($resource) {
    return $resource('/aapi/transaction/:id/:controller',{
      id: '@_id'
    });
  }

})(window, window.angular);
