'use strict';

module.exports = function(config){

  var Promise = require('bluebird');
  var events = new (require('events').EventEmitter)();
  var iface = require('./jwt')(config);

  return {
    create: create,
    verify: verify,

    on: events.on.bind(events),
    off: events.removeListener.bind(events)
  };

  function create(data) {
    return iface.create(data);
  }
  function verify(code) {
    return Promise.resolve()
      .then(function(){
        return iface.verify(code);
      })
      .then(function(token){
        events.emit(token.type, token);
      });
  }
};
