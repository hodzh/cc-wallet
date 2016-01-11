(function (window, angular) { 'use strict';

  angular.module('walleApp.auth')
    .factory('TokenStorage',
      ['$cookies', '$window', TokenStorage]);

  function TokenStorage($cookies, $window) {
    var storage = $window.localStorage;
    if (storage) {
      return {
        get: getStorage,
        put: putStorage,
        remove: removeStorage
      };
    }
    else {
      return {
        get: getCookie,
        put: putCookie,
        remove: removeCookie
      };
    }

    function getStorage(key) {
      return storage.getItem(key);
    }

    function putStorage(key, value) {
      return storage.setItem(key, value);
    }

    function removeStorage(key) {
      return storage.removeItem(key);
    }

    function getCookie(key) {
      return $cookies.get(key);
    }

    function putCookie(key, value) {
      return $cookies.put(key, value);
    }

    function removeCookie(key) {
      return $cookies.remove(key);
    }
  }

})(window, window.angular);