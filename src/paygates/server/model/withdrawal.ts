'use strict';

var Promise = require('bluebird');
var mongoose = require('mongoose');
var EventEmitter = require('events').EventEmitter;
var log = require('log4js').getLogger('devModule');

var Account = require('../../../wallet/server/model/account');
var Transaction = require('../../../wallet/server/model/transaction');

var WithdrawalEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
// WithdrawalEvents.setMaxListeners(0);

var Schema = mongoose.Schema;

var schema = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true
  },
  account: {
    type: Schema.ObjectId,
    ref: 'AdminAccount',
    require: true
  },
  transaction: {
    type: Schema.ObjectId,
    ref: 'Transaction',
    require: true
  },
  transactionCancel: {
    type: Schema.ObjectId,
    ref: 'Transaction',
    require: true
  },
  currency: {
    type: String,
    require: true
  },
  updated: {
    type: Date,
    require: true
  },
  created: {
    type: Date,
    require: true
  },
  amount: {
    type: Schema.Types.Long,
    require: true
  },
  fee: {
    type: Schema.Types.Long,
    require: true
  },
  status: {
    type: String,
    require: true
  }
}, {
  discriminatorKey: 'type',
  collection: 'withdrawal'
});

schema.pre('save', function (next) {
  if (this.isNew) {
    this.created = new Date();
  }
  this.updated = new Date();
  next();
});

schema.post('save', function (doc) {
  emitEvent('save', doc);
});

function emitEvent(event, doc, params?) {
  WithdrawalEvents.emit(event + ':' + doc._id, doc, params);
  WithdrawalEvents.emit(event, doc, params);
}

schema.statics.emit = WithdrawalEvents.emit.bind(WithdrawalEvents);
schema.statics.on = WithdrawalEvents.on.bind(WithdrawalEvents);
schema.statics.off = WithdrawalEvents.removeListener.bind(WithdrawalEvents);
// schema.statics.once = WithdrawalEvents.once.bind(WithdrawalEvents);

schema.methods.confirm = function () {
  var withdrawal = this;
  log.trace('confirm withdrawal');
  return Promise.resolve()
                .then(function () {
                  if (withdrawal.status != 'unconfirmed') {
                    throw new Error('bad withdrawal status ' + withdrawal.status);
                  }
                  withdrawal.status = 'confirmed';
                  return withdrawal.save();
                })
                .then(function () {
                  emitEvent('confirmed', withdrawal);
                });
};
schema.methods.approve = function () {
  var withdrawal = this;
  log.trace('approve withdrawal');
  return Promise.resolve()
                .then(function () {
                  if (withdrawal.status != 'confirmed') {
                    throw new Error('bad withdrawal status ' + withdrawal.status);
                  }
                  withdrawal.status = 'approved';
                  return withdrawal.save();
                })
                .then(function () {
                  emitEvent('approved', withdrawal);
                });
};
schema.methods.cancel = function () {
  var withdrawal = this;
  log.trace('cancel withdrawal', withdrawal._id);

  return Promise.resolve()
                .then(function () {
                  if (withdrawal.status != 'confirmed') {
                    throw new Error('bad withdrawal status ' + withdrawal.status);
                  }
                  withdrawal.status = 'cancelled';
                  return withdrawal.save();
                })
                .then(function (withdrawal) {
                  emitEvent('canceled', withdrawal);
                  return withdrawal;
                });
};
schema.methods.sign = function () {
  var withdrawal = this;
  return Promise.resolve()
                .then(function () {
                  if (withdrawal.status != 'approved') {
                    throw new Error('bad withdrawal status ' + withdrawal.status);
                  }
                  withdrawal.status = 'signed';
                  return withdrawal.save()
                                   .thenReturn(withdrawal);
                });
};

schema.plugin(require('../../../core/server/db/query'));

export = mongoose.model('Withdrawal', schema);
