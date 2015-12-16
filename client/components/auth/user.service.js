(function (window, angular) { 'use strict';

  angular.module('walleApp.auth')
      .factory('User', ['$resource', UserResource]);

  function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
          id: '@_id'
        },
        {
          changePassword: {
            method: 'PUT',
            params: {
              controller:'password'
            }
          },
          get: {
            method: 'GET',
            params: {
              id:'me'
            }
          }
        });
  }

})(window, window.angular);