'use strict';

module.exports = {
  isAuthenticated : function() {
    return 'authService.isAuthenticated';
  },
  hasRole : function(role) {
    return 'authService.hasRole.' + role;
  },
  signToken : function() {

  }
};