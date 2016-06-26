'use strict';

var jwt = require('jsonwebtoken');

module.exports = function(config){
  return {
    create: create,
    verify: verify
  };

  function create(data) {
    return jwt.sign(data,
      config.secret, {
        expiresIn: config.expiresIn,
        algorithm:config.algorithm
      });
  }

  function verify(code) {
    return jwt.verify(code,
      config.secret, {
        algorithms:config.algorithm
      });
  }
};

