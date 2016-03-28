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
    default: mongoose.Types.Long(0),
    require: true
  },
  enable: {
    type: Boolean,
    default: true,
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
  pendingTransactions: [
    {
      type: Schema.ObjectId,
      ref: 'Transaction'
    }
  ]
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
