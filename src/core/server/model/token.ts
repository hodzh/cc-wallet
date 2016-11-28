var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  token: {
    type: String,
    unique: true,
    require: true
  }
}, {
  discriminatorKey: 'type',
  collection: 'token'
});

export = mongoose.model('Token', TokenSchema);
