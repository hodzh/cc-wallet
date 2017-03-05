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

schema.methods.confirm = function () {
  let deposit = this;
  log.trace('confirm deposit');
  return Promise.resolve()
    .then(() => {
      if (deposit.status != 'unconfirmed') {
        throw new Error('bad deposit status');
      }
      deposit.status = 'confirmed';
      return deposit.save();
    })
    .then(() => Account.enable({
      owner: null,
      type: 'paygate',
      currency: deposit.currency
    }))
    .then(account => {
      let transaction = new Transaction({
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
    .then(transaction => {
      deposit.transaction = transaction._id;
      deposit.status = 'process';
      return deposit.save()
        .thenReturn(transaction);
    })
    .then(transaction => Transaction
      .process(transaction))
    .then(result => {
      deposit.status = 'done';
      return deposit.save()
        .thenReturn(result.transaction);
    })
    .then(transaction => {
      log.trace('deposit processed', transaction._id);
    })
    .catch(error => {
      log.error(error);
    });
};

schema.methods.verify = function () {
  let deposit = this;
  return Promise.resolve()
    .then(function () {
      if (deposit.status != 'approved') {
        throw new Error('bad deposit status ' + deposit.status);
      }
    });
};

schema.plugin(require('../../../core/server/db/query-plugin'), {
  sort: {
    created: -1
  }
});
schema.plugin(require('../../../core/server/db/events-plugin'));
schema.plugin(require('../../../core/server/db/created-plugin'));
schema.plugin(require('../../../core/server/db/updated-plugin'));

export = mongoose.model('Deposit', schema);
