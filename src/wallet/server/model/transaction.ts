import { Account } from './account';

var mongoose = require('mongoose');
var log = require('log4js').getLogger('wallet');
var Schema = mongoose.Schema;

var schema = new Schema({
  state: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  amount: {
    type: Schema.Types.Decimal,
    required: true,
  },
  from: {
    type: Schema.ObjectId,
    ref: 'Account',
    required: true,
  },
  to: {
    type: Schema.ObjectId,
    ref: 'Account',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
  },
  error: {
    type: String,
  },
}, {
  collection: 'transaction',
});

schema.statics.getPendingTransactions = async function (id) {
  return await this.find({
    state: 'pending',
    $or: [
      {to: id},
      {from: id},
    ],
  });
};

schema.statics.getStatistics = async function (currency) {
  return await this.aggregate(
    {
      $match: {
        currency: currency,
      },
    },
    {
      $group: {
        _id: '$category',
        amount: {$sum: '$amount'},
      },
    },
  );
};

schema.methods.sanitize = function () {
  return {
    _id: this._id.toString(),
    state: this.state,
    created: this.created,
    updated: this.updated,
    category: this.category,
    currency: this.currency,
    amount: this.amount,
    fee: this.fee,
    error: this.error,
  };
};

async function adminTransaction(Transaction, type, adminId, accountId, data) {
  log.trace(type, adminId, accountId, JSON.stringify(data));
  const userAccount = await Account.findById(accountId);
  if (!userAccount) {
    throw new Error('account not found');
  }
  const adminAccount = await Account.enable({
    type: 'admin',
    owner: adminId,
    currency: userAccount.currency,
  }, true);
  if (!adminAccount) {
    throw new Error('admin account not found');
  }
  log.trace('create transaction');
  let transaction = new Transaction({
    state: 'new',
    category: type,
    currency: adminAccount.currency,
    amount: data.amount,
    from: type === 'income' ? adminAccount._id : userAccount._id,
    to: type === 'outcome' ? adminAccount._id : userAccount._id,
  });
  await transaction.save();
  return await Transaction.process(transaction);
}

schema.statics.income = function (adminId, accountId, data) {
  return adminTransaction(this, 'income', adminId, accountId, data);
};

schema.statics.outcome = function (adminId, accountId, data) {
  return adminTransaction(this, 'outcome', adminId, accountId, data);
};

require('./transaction-process')(schema, Account);

schema.plugin(require('./../../../core/server/db/events-plugin'));
schema.plugin(require('../../../core/server/db/query-plugin'));
schema.plugin(require('../../../core/server/db/created-plugin'));
schema.plugin(require('../../../core/server/db/updated-plugin'));

export const Transaction = mongoose.model('Transaction', schema);
