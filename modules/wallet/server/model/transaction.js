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

  error: String,
  category: String,
  purpose: String,
  status: String,

  crypto: {
    time: Number,
    account: String,
    address: String,
    txid: String
  }
});

schema.pre('save', function (next) {
  this.updateDate = new Date();
  next();
});

schema.statics.process = function (transaction) {
  var Transaction = this;
  return Account.transactionFrom(transaction)
    .then(function(){
      return Account.transactionTo(transaction);
    })
    .then(function(){
      return Transaction.findByIdAndUpdateAsync(
        transaction._id,
        {
          $set: {
            state: 'commit'
          }
        });
    })
    .then(function(){
      return [
        Account.transactionCommitFrom(transaction),
        Account.transactionCommitTo(transaction)
      ];
    })
    .spread(function(accountFrom, accountTo){
      return Transaction.findByIdAndUpdateAsync(
        transaction._id,
        {
          $set: {
            state: 'done'
          }
        },
        {
          returnNewDocument: true,
          new: true
        })
        .then(function(transactionNew) {
          return {
            accountFrom: accountFrom,
            accountTo: accountTo,
            transaction: transactionNew
          };
        });
    })
    .catch(
      function(err){
        console.log('transaction failed', err);
        return Transaction.rollback(transaction);
      }
    );
};

schema.statics.rollback = function (transaction) {
  var Transaction = this;
  return Account.rollbackFrom(transaction)
    .then(function(){
      return Account.rollbackTo(transaction);
    })
    .then(function(){
      return Transaction.findByIdAndUpdateAsync(
        transaction._id,
        {
          $set: {
            state: 'error',
            status: transaction.status
          }
        });
    })
    ;
};

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
    error: me.error,
    address: me.crypto ? me.crypto.address : ''
  };
};

function adminTransaction(Transaction, adminId, accountId, data, type) {
  console.log(type, adminId, accountId, JSON.stringify(data));

  return Account.findByIdAsync(accountId)
    .then(enableAdminAccount)
    .spread(createIncomeTransaction);

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

  function createIncomeTransaction(userAccount, adminAccount) {
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
  return adminTransaction(this, adminId, accountId, data, 'income');
};

schema.statics.outcome = function (adminId, accountId, data) {
  return adminTransaction(this, adminId, accountId, data, 'outcome');
};

schema.statics.cashOut = function (userId, accountId, data) {
  var me = this;
  /*var wallet = api.wallet[me.currency];
   var amount = Number(data.amount);
   var fee = Number(data.fee || 0);
   if (!wallet || isNaN(amount) || isNaN(fee) ||
   amount <= 0 || fee < 0) {
   return  callback("bad arguments");
   }
   if (me.balance < amount + fee) {
   return  callback("not enough");
   }*/
  return this.createAsync({
    state: "new",
    category: "outcome",
    currency: me.currency,
    amount: amount,
    fee: fee,
    from: me._id,
    to: wallet.account._id,
    crypto: {
      address: data.address
    }
  });
};

module.exports = mongoose.model('Transaction', schema);
