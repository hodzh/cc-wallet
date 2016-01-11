'use strict';

var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var schema = new Schema({

  type: {
    type: String,
    require: true
  },
  owner: {
    type: Schema.ObjectId,
    require: true
  },
  currency: {
    type: String,
    require: true
  },

  balance: {
    type: Schema.Types.Long,
    default: '0'
  },

  enable: {
    type: Boolean,
    default: true
  },

  updateDate: {
    type: Date
  },

  createDate: {
    type: Date
  },

  pendingTransactions: [
    {
      type: Schema.ObjectId,
      ref: "Transaction"
    }
  ],

  address: String
});

schema.index({
    owner: 1,
    type: 1,
    currency: 1
  },
  {
    unique: true
  });

schema.pre('save', function (next) {
  if (this.isNew) {
    this.createDate = new Date();
  }
  this.updateDate = new Date();
  next();
});

schema.statics.enable = function (index, value) {
  return this.findOneAndUpdateAsync(
    index,
    {
      $setOnInsert: {
        createDate: new Date(),
        balance: 0
      },
      $set: {
        enable: value,
        updateDate: new Date()
      }
    },
    {
      upsert: true,
      returnNewDocument: true,
      new: true
    })
    .then(
      function(account) {
        if (account) {
          // console.log('enable', 'account', JSON.stringify(account.toObject()));
        }
        return account;
      }
    )
    .catch(
      function(error) {
        console.log('failed', 'enable', 'account', JSON.stringify(index), 'due', JSON.stringify(error));
      }
    );
};

schema.statics.getAccounts = function (type, userId) {
  return this.findAsync({
    type: type,
    owner: userId
  });
};

schema.statics.rollbackTo = function (transaction) {
  return this.updateAsync(
    {
      _id: transaction.to,
      pendingTransactions: transaction._id
    },
    {
      $dec: {
        balance: transaction.amount
      },
      $pull: { pendingTransactions: transaction._id }
    })
    .then(
      function(result) {
        if (result.nMatched !== 1 || result.nModified !== 1){
          Promise.reject();
        }
      }
    );
};

schema.statics.rollbackFrom = function (transaction) {
  return this.updateAsync(
    {
      _id: transaction.from,
      pendingTransactions: {
        $ne: transaction._id
      }
    },
    {
      $dec: {
        balance: transaction.amount
      },
      $push: {
        pendingTransactions: transaction._id
      }
    })
    .then(
      function(result) {
        if (result.nMatched !== 1 || result.nModified !== 1){
          Promise.reject();
        }
      }
    );
};

schema.statics.transactionTo = function (transaction) {
  return this.updateAsync(
    {
      _id: transaction.to,
      pendingTransactions: {
        $ne: transaction._id
      }
    },
    {
      $inc: {
        balance: transaction.amount
      },
      $push: {
        pendingTransactions: transaction._id
      }
    })
    .then(
      function(result) {
        if (result.nModified !== 1){
          Promise.reject();
        }
      }
    );
};

schema.statics.transactionFrom = function (transaction) {
  return this.updateAsync(
    {
      _id: transaction.from,
      pendingTransactions: {
        $ne: transaction._id
      }
    },
    {
      $inc: {
        balance: transaction.amount.negate()
      },
      $push: {
        pendingTransactions: transaction._id
      }
    })
    .then(
      function(result) {
        if (result.nModified !== 1){
          Promise.reject();
        }
      }
    );
};

schema.statics.transactionCommitTo = function (transaction) {
  return this.findOneAndUpdateAsync({
      _id: transaction.to,
      pendingTransactions: transaction._id
    },
    {
      $pull: {
        pendingTransactions: transaction._id
      }
    },
    {
      returnNewDocument:true,
      new: true
    })
    .then(
      function(result) {
        if (!result){
          return Promise.reject();
        }
        return result;
      }
    );
};

schema.statics.transactionCommitFrom = function (transaction) {
  return this.findOneAndUpdateAsync({
      _id: transaction.from,
      pendingTransactions: transaction._id
    },
    {
      $pull: {
        pendingTransactions: transaction._id
      }
    },
    {
      returnNewDocument:true,
      new: true
    })
    .then(
      function(result) {
        if (!result){
          return Promise.reject();
        }
        return result;
      }
    );
};

schema.statics.getUserData = function (account) {
  return {
    _id: String(account._id),
    enable: account.enable,
    currency: account.currency,
    balance: account.balance,
    address: account.address
  }
};

schema.methods.getUserData = function () {
  return this.model(this.constructor.modelName).getUserData(this);
};

module.exports = mongoose.model('Account', schema);
