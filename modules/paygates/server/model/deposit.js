'use strict';

var Promise = require('bluebird');
var mongoose = require('mongoose');
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
  currency: {
    type: String,
    require: true
  },
  transaction: {
    type: Schema.ObjectId,
    ref: 'Transaction'
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
  status: {
    type: String,
    require: true
  }
}, {
  collection: 'deposit'
});

schema.pre('save', function (next) {
  if (this.isNew){
    this.createDate = new Date();
  }
  this.updateDate = new Date();
  next();
});

module.exports = mongoose.model('Deposit', schema);
