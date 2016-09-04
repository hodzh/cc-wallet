export = transactionEvents;

function transactionEvents(schema) {

  var Promise = require("bluebird");
  var EventEmitter = require('events').EventEmitter;

  var events = new EventEmitter();

  // Set max event listeners (0 == unlimited)
  events.setMaxListeners(0);

  schema.statics.once = function (key, handler) {
    var model = this;
    model.on(key, invokeHandler);
    function invokeHandler() {
      var result = handler();
      model.off(key, invokeHandler);
      return result;
    }
  };

  schema.statics.on = events.addListener.bind(events);
  schema.statics.off = events.removeListener.bind(events);

  schema.statics.emit = function (name) {
    var listeners = events.listeners(name);
    if (!listeners || !listeners.length) {
      return Promise.fulfilled(false);
    }
    var args = Array.prototype.slice.call(arguments, 1);
    return Promise.all(listeners.map(listenerInvoke));

    function listenerInvoke(listener) {
      return listener.apply(events, args);
    }
  };

  schema.post('save', onSave);

  function onSave() {
    events.emit('save', this);
  }
}
