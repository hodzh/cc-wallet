(function (window, angular) { 'use strict';

  angular.module('walleApp.auth')
    .factory('AuthInterceptor',
      ['$rootScope', '$q', 'TokenStorage', '$injector', 'Util', AuthInterceptor]);

  function AuthInterceptor($rootScope, $q, storage, $injector, Util) {
    var state;
    return {
      // Add authorization token to headers
      request: request,

      // Intercept 401s and redirect you to login
      responseError: responseError
    };

    function request(config) {
      config.headers = config.headers || {};
      if (storage.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = 'Bearer ' + storage.get('token');
      }
      return config;
    }

    function responseError(response) {
      if (response.status === 401) {
        (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        storage.remove('token');
      }
      return $q.reject(response);
    }
  }

})(window, window.angular);