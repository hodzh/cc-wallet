'use strict';

var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var schema = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true
  },
  account: {
    type: Schema.ObjectId,
    ref: 'Account',
    require: true
  },
  transaction: {
    type: Schema.ObjectId,
    ref: 'Transaction',
    require: true
  },
  currency: {
    type: String,
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
});

schema.pre('save', function (next) {
  if (this.isNew){
    this.createDate = new Date();
  }
  this.updateDate = new Date();
  next();
});

module.exports = mongoose.model('Withdrawal', schema);
