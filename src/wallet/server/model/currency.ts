var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  decimal: {
    type: Number,
    required: true
  },
  enableWallet: {
    type: Boolean,
    required: true
  },
  minWithdrawal: {
    type: Schema.Types.Decimal,
    required: true
  },
  withdrawalFee: {
    type: Schema.Types.Decimal,
    required: true
  },
  withdrawalConfirmations: {
    type: Number,
    required: true,
  },
  depositConfirmations: {
    type: Number,
    required: true,
  },
}, {
  collection: 'currency'
});

schema.index({
    code: 1,
  },
  {
    unique: true
  });

schema.index({
    name: 1,
  },
  {
    unique: true
  });

schema.plugin(require('../../../core/server/db/query-plugin'));
schema.plugin(require('../../../core/server/db/created-plugin'));
schema.plugin(require('../../../core/server/db/updated-plugin'));

export const Currency = mongoose.model('Currency', schema);
