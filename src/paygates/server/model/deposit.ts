'use strict';

var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = require('../../../wallet/server/model/account');
var Transaction = require('../../../wallet/server/model/transaction');
var log = require('log4js').getLogger('paygates');

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
  currency: {
    type: String,
    require: true
  },
  transaction: {
    type: Schema.ObjectId,
    ref: 'Transaction'
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
  status: {
    type: String,
    require: true
  }
}, {
  discriminatorKey: 'type',
  collection: 'deposit'
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

var EventEmitter = require('events').EventEmitter;
var DepositEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
DepositEvents.setMaxListeners(0);

function emitEvent(event, doc) {
  DepositEvents.emit(event + ':' + doc._id, doc);
  DepositEvents.emit(event, doc);
}

schema.methods.confirm = function () {
  var deposit = this;
  log.trace('confirm deposit');
  return Promise.resolve()
    .then(function () {
      if (deposit.status != 'unconfirmed') {
        throw new Error('bad deposit status');
      }
      deposit.status = 'confirmed';
      return deposit.save();
    })
    .then(function () {
      return Account.enable({
        owner: null,
        type: 'paygate',
        currency: deposit.currency
      });
    })
    .then(function (account) {
      var transaction = new Transaction({
        currency: deposit.currency,
        amount: deposit.amount,
        to: deposit.account,
        from: account._id,
        category: 'deposit',
        state: 'new'
      });
      return transaction.save()
        .thenReturn(transaction);
    })
    .then(function (transaction) {
      deposit.transaction = transaction._id;
      deposit.status = 'process';
      return deposit.save()
        .thenReturn(transaction);
    })
    .then(function (transaction) {
      return Transaction
        .process(transaction);
    })
    .then(function (result) {
      deposit.status = 'done';
      return deposit.save()
        .thenReturn(result.transaction);
    })
    .then(function (transaction) {
      log.trace('deposit processed', transaction._id);
    })
    .catch(function (error) {
      log.error(error);
    });
};

schema.methods.verify = function () {
  var deposit = this;
  return Promise.resolve()
    .then(function () {
      if (deposit.status != 'approved') {
        throw new Error('bad deposit status ' + deposit.status);
      }
    });
};

schema.statics.on = DepositEvents.on.bind(DepositEvents);
schema.statics.off = DepositEvents.removeListener.bind(DepositEvents);
schema.statics.once = DepositEvents.once.bind(DepositEvents);

schema.plugin(require('../../../core/server/db/query'));

export = mongoose.model('Deposit', schema);
