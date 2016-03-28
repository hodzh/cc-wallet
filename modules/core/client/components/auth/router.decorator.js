(function (window, angular) { 'use strict';

  angular.module('walleApp.auth')
      .run(['$rootScope', '$state', 'Auth', routerDecorator]);

  function routerDecorator($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', onStateChange);

    function onStateChange(event, next) {
      if(!next.authenticate) {
        return;
      }

      var query = typeof next.authenticate === 'string' ?
        Auth.hasRole : Auth.isLoggedIn;

      query(1,2).then(function(good) {
        if(!good) {
          event.preventDefault();
          $state.go(Auth.isLoggedIn() ? 'main' : 'login');
        }
      });
    }
  }

})(window, window.angular);
