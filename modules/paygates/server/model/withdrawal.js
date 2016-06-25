'use strict';

var Promise = require('bluebird');
var mongoose = require('mongoose');
var EventEmitter = require('events').EventEmitter;
var log = require('log4js').getLogger('paygates');

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
  },
  bitcoin: {
    address: String,
    txid: String,
    confirmations: Number
  }
}, {
  discriminatorKey: 'kind',
  collection: 'withdrawal'
});

schema.pre('save', function (next) {
  if (this.isNew){
    this.created = new Date();
  }
  this.updated = new Date();
  next();
});

schema.post('save', function (doc) {
  emitEvent('save', doc);
});

function emitEvent(event, doc, params) {
  WithdrawalEvents.emit(event + ':' + doc._id, doc, params);
  WithdrawalEvents.emit(event, doc, params);
}

schema.statics.on = WithdrawalEvents.on.bind(WithdrawalEvents);
schema.statics.off = WithdrawalEvents.removeListener.bind(WithdrawalEvents);
schema.statics.once = WithdrawalEvents.once.bind(WithdrawalEvents);

schema.statics.create = function (params) {
  var Withdrawal = this;
  var userId = params.user;
  var accountId = params.account;
  var currency;
  var amount = params.amount;
  var fee = params.fee;

  log.trace('create withdrawal', userId, accountId, amount, fee);

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
      if (account.balance < amount) {
        throw new Error('not enough funds');
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
      emitEvent('create', withdrawal, params);
      return withdrawal.save()
        .thenReturn(withdrawal);
    })
    .then(function (withdrawal) {
      emitEvent('new', withdrawal);
      return withdrawal;
    })
    .then(function (withdrawal) {
      withdrawal.status = 'unconfirmed';
      return withdrawal.save()
        .thenReturn(withdrawal);
    })
    .then(function (withdrawal) {
      emitEvent('unconfirmed', withdrawal);
      return withdrawal;
    });
};

schema.methods.confirm = function () {
  var withdrawal = this;
  log.trace('confirm withdrawal');
  return Promise.resolve()
    .then(function () {
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
      return Account.findById(withdrawal.account);
    })
    .then(function (account) {
      if (!account) {
        throw new Error('account not found');
      }
      if (account.owner.toString() != withdrawal.owner) {
        throw new Error('account not found');
      }
      if (account.type != 'user') {
        throw new Error('account not found');
      }
    })
    .then(function () {
      return Account.enable({
        owner: null,
        type: 'paygate',
        currency: withdrawal.currency
      });
    })
    .then(function (paygate) {
      var transaction = new Transaction({
        currency: withdrawal.currency,
        to: withdrawal.account,
        from: paygate._id,
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
      withdrawal.transactionCancel = transaction._id;
      withdrawal.status = 'canceled';
      return withdrawal.save()
        .thenReturn(withdrawal);
    })
    .then(function (withdrawal) {
      emitEvent('canceled', withdrawal);
      return withdrawal;
    });
};
schema.methods.verify = function () {
  var withdrawal = this;
  //todo
  return Promise.resolve();
};

module.exports = mongoose.model('Withdrawal', schema);