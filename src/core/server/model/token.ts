var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var schema = new Schema({
  token: {
    type: String,
    unique: true,
    required: true
  }
}, {
  discriminatorKey: 'type',
  collection: 'token'
});

schema.methods.createToken = function() {
  const byteSize = 64;
  this.token = crypto.randomBytes(byteSize).toString('base64');
};

schema.plugin(require('../../../core/server/db/created-plugin'));
schema.plugin(require('../../../core/server/db/updated-plugin'));

export = mongoose.model('Token', schema);
