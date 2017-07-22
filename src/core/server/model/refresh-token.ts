var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var schema = new Schema({
  token: {
    type: String,
    unique: true,
    require: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true,
  }
}, {
  collection: 'refreshToken',
});

schema.index({token: 1}, {unique: true});
schema.index({updated: 1}, {expireAfterSeconds: 3600 * 24 * 5});

schema.methods.createToken = function () {
  const byteSize = 64;
  this.token = crypto.randomBytes(byteSize).toString('base64');
};

schema.plugin(require('../../../core/server/db/created-plugin'));
schema.plugin(require('../../../core/server/db/updated-plugin'));

export = mongoose.model('refreshToken', schema);
