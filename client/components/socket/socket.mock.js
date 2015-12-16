(function (window, angular) { 'use strict';

  angular.module('socketMock', [])
      .factory('socket', socketMock);

  function socketMock() {
    return {
      socket: {
        connect: function() {},
        on: function() {},
        emit: function() {},
        receive: function() {}
      },

      syncUpdates: function() {},
      unsyncUpdates: function() {}
    };
  }

})(window, window.angular);