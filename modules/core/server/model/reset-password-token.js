'use strict';

var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Token = require('./token');

var ResetPasswordTokenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true
  }
}, {
  discriminatorKey: 'type',
  collection: 'token'
});

module.exports = Token.discriminator('resetPassword', ResetPasswordTokenSchema);