var mongoose = require('mongoose');
mongoose.Promise = Promise;
require('mongoose-long')(mongoose);
var merge = require('mongoose-merge-plugin');
var log = require('log4js').getLogger('db');


mongoose.plugin(merge);

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
  // {autoIndex: process.env.NODE_ENV !== 'production'}

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
    log.info('mongodb connected');
    emit('connect')
      .then(() => {
        callback();
      })
      .catch(error => {
        log.error(error);
        callback(error);
      });
  }

  function emit(name, ...args): Promise<any> {
    var listeners = events.listeners(name);
    if (!listeners || !listeners.length) {
      return Promise.resolve(false);
    }
    return Promise.all(listeners.map(listenerInvoke));

    function listenerInvoke(listener) {
      return listener.apply(events, args);
    }
  }

}
