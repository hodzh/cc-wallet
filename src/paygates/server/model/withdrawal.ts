var mongoose = require('mongoose');
var log = require('log4js').getLogger('paygates');

var Account = require('../../../wallet/server/model/account');
var Transaction = require('../../../wallet/server/model/transaction');

var Schema = mongoose.Schema;

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
  }
}, {
  discriminatorKey: 'type',
  collection: 'withdrawal'
});

schema.methods.confirm = function () {
  let withdrawal = this;
  log.trace('confirm withdrawal');

  return Promise.resolve()
    .then(() => {
      if (withdrawal.status != 'unconfirmed') {
        throw new Error('confirm bad withdrawal status ' + withdrawal.status);
      }
      withdrawal.status = 'confirmed';
      return withdrawal.save();
    })
    .then(() => withdrawal.constructor.emitEvent('confirmed', withdrawal));
};
schema.methods.approve = function () {
  let withdrawal = this;
  log.trace('approve withdrawal');
  return Promise.resolve()
    .then(() => {
      if (withdrawal.status != 'confirmed') {
        throw new Error('approve bad withdrawal status ' + withdrawal.status);
      }
      withdrawal.status = 'approved';
      return withdrawal.save();
    })
    .then(() => withdrawal.constructor.emitEvent('approved', withdrawal))
    .then(() => withdrawal);
};
schema.methods.cancel = function () {
  let withdrawal = this;
  log.trace('cancel withdrawal', withdrawal._id);

  return Promise.resolve()
    .then(() => {
      if (withdrawal.status != 'confirmed') {
        throw new Error('cancel bad withdrawal status ' + withdrawal.status);
      }
      withdrawal.status = 'cancelled';
      return withdrawal.save();
    })
    .then(() => withdrawal.constructor.emitEvent('canceled', withdrawal))
    .then(() => withdrawal);
};
schema.methods.sign = function () {
  let withdrawal = this;
  log.trace('sign withdrawal', withdrawal._id);

  return Promise.resolve()
    .then(() => {
      if (withdrawal.status != 'approved') {
        throw new Error('sign bad withdrawal status ' + withdrawal.status);
      }
      withdrawal.status = 'signed';
      return withdrawal.save();
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

export = mongoose.model('Withdrawal', schema);
