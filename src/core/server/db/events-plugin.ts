var EventEmitter = require('events').EventEmitter;
var log = require('log4js').getLogger('db');

export = function(schema) {

  const events = new EventEmitter();

  // Set max event listeners (0 == unlimited)
  events.setMaxListeners(0);

  schema.statics.onceEvent = function(key, handler) {
    const invokeHandler = () => {
      var result = handler();
      schema.statics.offEvent(key, invokeHandler);
      return result;
    };
    schema.statics.onEvent(key, invokeHandler);
  };

  schema.statics.onEvent = events.addListener.bind(events);
  schema.statics.offEvent = events.removeListener.bind(events);

  schema.statics.emitEvent = function (name, ...args) {
    const listeners = events.listeners(name);
    if (!listeners || !listeners.length) {
      return Promise.resolve(false);
    }
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

  // schema.post('save', function() {
  //   schema.statics.emitEvent('save', this);
  // });
};
