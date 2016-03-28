'use strict';

var EventEmitter = require('events').EventEmitter;
var Withdrawal = require('./withdrawal');
var WithdrawalEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WithdrawalEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Withdrawal.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WithdrawalEvents.emit(event + ':' + doc._id, doc);
    WithdrawalEvents.emit(event, doc);
  }
}

module.exports = WithdrawalEvents;
