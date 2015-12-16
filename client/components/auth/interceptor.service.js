(function (window, angular) { 'use strict';

  angular.module('walleApp.auth')
      .factory('authInterceptor',
          ['$rootScope', '$q', '$cookies', '$injector', 'Util', authInterceptor]);

  function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
    var state;
    return {
      // Add authorization token to headers
      request: request,

      // Intercept 401s and redirect you to login
      responseError: responseError
    };

    function request(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    }

    function responseError(response) {
      if (response.status === 401) {
        (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  }

})(window, window.angular);