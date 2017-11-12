var mongoose = require('mongoose');
var log = require('log4js').getLogger('wallet');
var Schema = mongoose.Schema;

var Account = require('./account');

var schema = new Schema({
  state: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  amount: {
    type: Schema.Types.Long,
    default: mongoose.Types.Long(0),
    required: true
  },
  from: {
    type: Schema.ObjectId,
    ref: 'Account',
    required: true
  },
  to: {
    type: Schema.ObjectId,
    ref: 'Account',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  purpose: {
    type: String
  },
  error: {
    type: String
  }
}, {
  collection: 'transaction'
});

schema.statics.getPendingTransactions = function (id, callback) {
  this.find({
    state: 'pending',
    $or: [
      {to: id},
      {from: id}
    ]
  }).sort({
    created: -1
  }).exec(callback);
};

schema.statics.getStatistics = function (currency, callback) {
  var me = this;
  me.aggregate(
    {
      $match: {
        currency: currency
      }
    },
    {
      $group: {
        _id: '$category',
        amount: {$sum: '$amount'}
      }
    },
    function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
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
    status: this.status,
    error: this.error
  };
};

function adminTransaction(Transaction, type, adminId, accountId, data) {
  log.trace(type, adminId, accountId, JSON.stringify(data));

  return Account.findByOrderNumber(accountId)
    .then((userAccount) => {
      if (!userAccount) {
        throw new Error('account not found');
      }
      return Account.enable({
        type: 'admin',
        owner: adminId,
        currency: userAccount.currency
      }, true)
        .then((adminAccount) => {
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
            to: type === 'outcome' ? adminAccount._id : userAccount._id
          });
          return transaction.save()
            .then(() => Transaction.process(transaction));
        });
    });
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

export = mongoose.model('Transaction', schema);
