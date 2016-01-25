
var Promise = require("bluebird");
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);

var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter();

module.exports = {
  models: {},
  init: init,
  once: events.once.bind(events)
};

function init(config, callback) {

  mongoose.connect(config.host, config.options);

  mongoose.connection.on('error', onError);
  mongoose.connection.on('connected', onConnected);

  function onError(err) {
    console.error('MongoDB connection error: ' + err);
    callback(err || 'undefined error');
  }

  function onConnected() {
    emit('connect')
      .then(function(){
        callback();
      })
      .catch(function(error){
        callback(error);
      });
  }

  function emit(name) {
    var listeners = events.listeners(name);
    if (!listeners || !listeners.length) {
      return Promise.fulfilled(false);
    }
    var args = Array.prototype.slice.call(arguments, 1);
    return Promise.all(listeners.map(listenerInvoke));

    function listenerInvoke(listener) {
      //events.removeListener(name, listener);
      return listener.apply(events, args);
    }
  }

}
