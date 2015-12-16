(function (window, angular) { 'use strict';

  angular.module('walleApp.util')
      .factory('Util', ['$window', UtilService]);

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  function UtilService($window) {

    return {

      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */
      safeCb: safeCb,

      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse: urlParse,

      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin: isSameOrigin
    };

    function safeCb(cb) {
      return (angular.isFunction(cb)) ? cb : angular.noop;
    }

    function urlParse(url) {
      var a = document.createElement('a');
      a.href = url;
      return a;
    }

    function isSameOrigin(url, origins) {
      url = urlParse(url);
      origins = (origins && [].concat(origins)) || [];
      origins = origins.map(urlParse);
      origins.push($window.location);
      origins = origins.filter(function (o) {
        return url.hostname === o.hostname &&
            url.port === o.port &&
            url.protocol === o.protocol;
      });
      return (origins.length >= 1);
    }
  }

})(window, window.angular);
