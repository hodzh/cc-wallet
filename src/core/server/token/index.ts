export = function (config) {
  var events = new (require('events').EventEmitter)();
  var token = require('./jwt')(config);

  return {
    create: create,
    verify: verify,

    /**
     * add event listener
     * @param {String} event moniker
     * @param {Function} event handler
     * @returns {*}
     */
    on: events.on.bind(events),

    /**
     * remove event listener
     * @param {String} event moniker
     * @param {Function} event handler
     * @returns {*}
     */
    off: events.removeListener.bind(events)
  };

  /**
   * Create token code
   * @param {Object} data to encode
   * @returns {String} token code string
   */
  function create(data) {
    return token.create(data);
  }

  /**
   * Decode and verify token code, fire event if success
   * @param {String} code
   * @returns {Object} decoded data object if success
   */
  function verify(code) {
    return Promise.resolve()
      .then(() => token.verify(code))
      .then(token => {
        events.emit(token.type, token);
        return token;
      });
  }
};
