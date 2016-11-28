var jwt = require('jsonwebtoken');

export = function (config) {
  return {
    create: create,
    verify: verify
  };

  /**
   * Create token code
   * @param {Object} data to encode
   * @returns {String} token code string
   */
  function create(data) {
    return jwt.sign(data,
      config.secret, {
        expiresIn: config.expiresIn,
        algorithm: config.algorithm
      });
  }

  /**
   * Decode and verify token code
   * @param {String} code
   * @returns {Object} decoded data object if success
   */
  function verify(code) {
    return jwt.verify(code,
      config.secret, {
        algorithms: config.algorithm
      });
  }
};
