(function (window, angular) { 'use strict';

  angular.module('walleApp.auth')
    .factory('User', ['$resource', UserResource]);

  function UserResource($resource) {
    return $resource('/api/me/:controller', {
      },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller:'password'
          }
        },
        get: {
          method: 'GET'
        },
        update: {
          method: 'PUT'
        }
      });
  }

})(window, window.angular);