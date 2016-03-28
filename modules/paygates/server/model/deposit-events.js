'use strict';

var EventEmitter = require('events').EventEmitter;
var Deposit = require('./deposit');
var DepositEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DepositEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Deposit.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DepositEvents.emit(event + ':' + doc._id, doc);
    DepositEvents.emit(event, doc);
  }
}

module.exports = DepositEvents;
