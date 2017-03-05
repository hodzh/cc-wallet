var Promise = require('bluebird');
var EventEmitter = require('events').EventEmitter;
var log = require('log4js').getLogger('db');

export = function(schema) {

  const events = new EventEmitter();

  // Set max event listeners (0 == unlimited)
  events.setMaxListeners(0);

  schema.statics.onceEvent = function(key, handler) {
    var model = this;
    const invokeHandler = () => {
      var result = handler();
      model.off(key, invokeHandler);
      return result;
    };
    model.on(key, invokeHandler);
  };

  schema.statics.onEvent = events.addListener.bind(events);
  schema.statics.offEvent = events.removeListener.bind(events);

  schema.statics.emitEvent = function (name) {
    const listeners = events.listeners(name);
    if (!listeners || !listeners.length) {
      return Promise.resolve(false);
    }
    const args = Array.prototype.slice.call(arguments, 1);
    return Promise.all(listeners.map(listener => listener.apply(events, args)));
  };

  schema.pre('save', function(next) {
    schema.statics.emitEvent('presave', this)
      .then(() => {
        next();
      })
      .catch((err) => {
        log.error(err);
        next(err);
      });
  });

  schema.post('save', function() {
    schema.statics.emitEvent('save', this);
  });
};
