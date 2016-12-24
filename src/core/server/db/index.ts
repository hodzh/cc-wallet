var Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
require('mongoose-long')(mongoose);

var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter();
var models = {};

export = {
  models: models,
  init: init,
  once: events.once.bind(events)
};

function init(config, callback) {
  let connected = false;
  mongoose.connect(config.host, config.options);

  mongoose.connection.on('error', onError);
  mongoose.connection.on('connected', onConnected);

  function onError(err) {
    console.error('MongoDB connection error: ' + err);
    if (!connected) {
      callback(err || 'undefined error');
    } else {
      throw new Error(err);
    }
  }

  function onConnected() {
    connected = true;
    console.log('mongodb connected');
    emit('connect')
      .then(function () {
        callback();
      })
      .catch(function (error) {
        console.error(error);
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
