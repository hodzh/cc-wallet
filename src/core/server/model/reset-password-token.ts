var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Token = require('./token');

var ResetPasswordTokenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  discriminatorKey: 'type',
  collection: 'token'
});

export = Token.discriminator('resetPassword', ResetPasswordTokenSchema);
