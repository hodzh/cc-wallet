'use strict';

var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var Account = require('./account');

var schema = new Schema({

  state: {
    type: String,
    require: true
  },

  createDate: {
    type: Date,
    require: true
  },

  updateDate: {
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
    ref: 'Account',
    require: true
  },

  to: {
    type: Schema.ObjectId,
    ref: 'Account',
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
    type: String,
  },

  error: {
    type: String
  },
});

schema.pre('save', function (next) {
  if (this.isNew) {
    this.createDate = new Date();
  }
  this.updateDate = new Date();
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
    createDate: -1
  }).exec(callback);
};

schema.statics.getStatistics = function(currency, callback) {
  var me = this;
  me.aggregate({$match:{
      currency:currency
    }},
    {$group:{
      _id : "$category",
      amount : {$sum: "$amount"}}},
    function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
};

schema.methods.getUserData = function () {
  var me = this;
  return {
    createDate: me.createDate,
    updateDate: me.updateDate,
    category: me.category,
    currency: me.currency,
    amount: me.amount,
    fee:me.fee,
    status: me.status,
    error: me.error
  };
};

function adminTransaction(Transaction, type, adminId, accountId, data) {
  console.log(type, adminId, accountId, JSON.stringify(data));

  return Account.findByIdAsync(accountId)
    .then(enableAdminAccount)
    .spread(createTransaction);

  function enableAdminAccount(userAccount){
    if (!userAccount) {
      return null;
    }
    return [
      userAccount,
      Account.enable({
        type: 'admin',
        owner: adminId,
        currency: userAccount.currency
      }, true)
    ];
  }

  function createTransaction(userAccount, adminAccount) {
    if (!userAccount || !adminAccount){
      return null;
    }
    var transaction = new Transaction({
      state: 'new',
      category: type,
      currency: adminAccount.currency,
      amount: data.amount,
      from: type === 'income' ? adminAccount._id : userAccount._id,
      to: type === 'outcome' ? adminAccount._id : userAccount._id
    });
    return transaction.saveAsync().then(
      function () {
        return Transaction.process(transaction);
      });
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

module.exports = mongoose.model('Transaction', schema);
