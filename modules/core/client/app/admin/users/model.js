(function (window, angular) { 'use strict';

  angular.module('walleApp.admin')
    .factory('UserResource', ['$resource', UserResource]);

  function UserResource($resource) {
    return $resource('/aapi/user/:id',
      {
        id: '@_id'
      },
      {
        update: {
          method: 'PUT'
        }
      }
    );
  }

})(window, window.angular);
