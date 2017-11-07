var log = require('log4js').getLogger('wallet');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  type: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.ObjectId,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  balance: {
    type: Schema.Types.Long,
    default: mongoose.Types.Long(0),
    required: true
  },
  enable: {
    type: Boolean,
    default: true,
    required: true
  },
  pendingTransactions: [
    {
      type: Schema.ObjectId,
      ref: 'Transaction'
    }
  ]
}, {
  collection: 'account'
});

schema.index({
    owner: 1,
    type: 1,
    currency: 1
  },
  {
    unique: true
  });

schema.statics.enable = function (index, value) {
  return this.findOneAndUpdate(
    index,
    {
      $setOnInsert: {
        created: new Date(),
        balance: 0
      },
      $set: {
        enable: (typeof value === 'undefined' ? true : value),
        updated: new Date()
      }
    },
    {
      upsert: true,
      returnNewDocument: true,
      new: true
    })
    .then(
      function (account) {
        if (!account) {
          throw new Error('fail upsert account');
        }
        return account;
      }
    )
    .catch(error => {
      log.error('failed', 'enable', 'account',
        JSON.stringify(index), 'due', JSON.stringify(error));
    });
};

schema.statics.getAccounts = function (type, userId) {
  return this.find({
    type: type,
    owner: userId
  }).exec();
};

schema.methods.sanitize = function () {
  let account = this;
  return {
    _id: String(account._id),
    enable: account.enable,
    currency: account.currency,
    balance: account.balance,
    address: account.address,
    type: account.type,
    owner: account.owner,
    updated: account.updated,
    created: account.created,
  };
};

schema.methods.getUserData = function () {
  let account = this;
  return {
    _id: String(account._id),
    enable: account.enable,
    currency: account.currency,
    balance: account.balance,
    address: account.address
  };
};


schema.plugin(require('../../../core/server/db/query-plugin'));
schema.plugin(require('../../../core/server/db/created-plugin'));
schema.plugin(require('../../../core/server/db/updated-plugin'));

export = mongoose.model('Account', schema);
