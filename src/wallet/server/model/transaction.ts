var Promise = require("bluebird");
var mongoose = require('mongoose');
var log = require('log4js').getLogger('wallet');
var Schema = mongoose.Schema;

var Account = require('./account');

var schema = new Schema({
  state: {
    type: String,
    require: true
  },
  created: {
    type: Date,
    require: true
  },
  updated: {
    type: Date,
    require: true
  },
  currency: {
    type: String,
    require: true
  },
  amount: {
    type: Schema.Types.Long,
    default: mongoose.Types.Long(0),
    require: true
  },
  from: {
    type: Schema.ObjectId,
    ref: 'AdminAccount',
    require: true
  },
  to: {
    type: Schema.ObjectId,
    ref: 'AdminAccount',
    require: true
  },
  category: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
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

schema.pre('save', function (next) {
  if (this.isNew) {
    this.created = new Date();
  }
  this.updated = new Date();
  next();
});

schema.statics.getPendingTransactions = function (id, callback) {
  this.find({
    state: "pending",
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
        _id: "$category",
        amount: {$sum: "$amount"}
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
  var me = this;
  return {
    _id: me._id.toString(),
    state: me.state,
    created: me.created,
    updated: me.updated,
    category: me.category,
    currency: me.currency,
    amount: me.amount,
    fee: me.fee,
    status: me.status,
    error: me.error
  };
};

function adminTransaction(Transaction, type, adminId, accountId, data) {
  log.trace(type, adminId, accountId, JSON.stringify(data));

  return Account.findById(accountId)
    .then(enableAdminAccount);

  function enableAdminAccount(userAccount) {
    if (!userAccount) {
      throw new Error('account not found');
    }
    return Account.enable({
      type: 'admin',
      owner: adminId,
      currency: userAccount.currency
    }, true)
      .then(createTransaction);

    function createTransaction(adminAccount) {
      if (!adminAccount) {
        throw new Error('admin account not found');
      }
      log.trace('create transaction');
      var transaction = new Transaction({
        state: 'new',
        category: type,
        currency: adminAccount.currency,
        amount: data.amount,
        from: type === 'income' ? adminAccount._id : userAccount._id,
        to: type === 'outcome' ? adminAccount._id : userAccount._id
      });
      return transaction.save().then(
        function () {
          return Transaction.process(transaction);
        });
    }
  }
}

schema.statics.income = function (adminId, accountId, data) {
  return adminTransaction(this, 'income', adminId, accountId, data);
};

schema.statics.outcome = function (adminId, accountId, data) {
  return adminTransaction(this, 'outcome', adminId, accountId, data);
};

require('./transaction-events')(schema);
require('./transaction-process')(schema, Account);

schema.plugin(require('../../../core/server/db/query'));

export = mongoose.model('Transaction', schema);
