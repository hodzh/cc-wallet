/**
 * Account model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Account = require('./account');
var AccountEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AccountEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Account.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    AccountEvents.emit(event + ':' + doc._id, doc);
    AccountEvents.emit(event, doc);
  }
}

export = AccountEvents;
