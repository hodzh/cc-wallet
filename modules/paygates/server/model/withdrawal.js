'use strict';

var Promise = require('bluebird');
var mongoose = require('mongoose');
var EventEmitter = require('events').EventEmitter;

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
    ref: 'Account',
    require: true
  },
  transaction: {
    type: Schema.ObjectId,
    ref: 'Transaction',
    require: true
  },
  currency: {
    type: String,
    require: true
  },
  updateDate: {
    type: Date,
    require: true
  },
  createDate: {
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
  collection: 'withdrawal'
});

schema.pre('save', function (next) {
  if (this.isNew){
    this.createDate = new Date();
  }
  this.updateDate = new Date();
  next();
});

schema.post('save', function (doc) {
  emitEvent('save', doc);
});

function emitEvent(event, doc) {
  // WithdrawalEvents.emit(event + ':' + doc._id, doc);
  WithdrawalEvents.emit(event, doc);
}

schema.statics.on = WithdrawalEvents.on.bind(WithdrawalEvents);

schema.statics.create = function (params) {
  var Withdrawal = this;
  var userId = params.user;
  var accountId = params.account;
  var currency;
  var amount = params.amount;
  var fee = params.fee;

  return Promise.resolve()
    .then(function () {
      return Account.findById(accountId);
    })
    .then(function (account) {
      if (!account) {
        throw new Error('account not found');
      }
      if (account.owner.toString() != userId) {
        throw new Error('account not found');
      }
      if (account.type != 'user') {
        throw new Error('account not found');
      }
      currency = account.currency;
    })
    .then(function () {
      return Account.enable({
        owner: null,
        type: 'paygate',
        currency: currency
      });
    })
    .then(function (paygate) {
      var transaction = new Transaction({
        currency: currency,
        to: paygate._id,
        from: accountId,
        amount: amount,
        category: 'withdrawal',
        state: 'new'
      });
      return transaction.save()
        .thenReturn(transaction);
    })
    .then(function (transaction) {
      return Transaction.process(transaction)
        .thenReturn(transaction);
    })
    .then(function (transaction) {
      var withdrawal = new Withdrawal({
        owner: userId,
        account: accountId,
        currency: currency,
        amount: amount,
        fee: fee,
        transaction: transaction._id,
        status: 'new'
      });
      return withdrawal.save()
        .thenReturn(withdrawal);
    })
}

module.exports = mongoose.model('Withdrawal', schema);
