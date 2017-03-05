var Promise = require('bluebird');
var mongoose = require('mongoose');
var log = require('log4js').getLogger('paygates');

var Schema = mongoose.Schema;

var schema = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true
  },
  stat: {
    type: [Date],
    require: true
  },
  updated: {
    type: Date,
    require: true
  },
}, {
  collection: 'withdrawalStat',
});

schema.index({ 'owner': 1 }, { unique: true });
schema.index({ 'updated': 1 }, { expireAfterSeconds: 3600 });

schema.pre('save', function (next) {
  this.updated = new Date();
  next();
});

schema.statics.onNewWithdrawal = function (withdrawal, maxPerHour) {
  return Promise.resolve()
    .then(() => {
      if (!maxPerHour) {
        return {};
      }
      log.trace('check max per hour');
      let date = new Date();
      date.setHours(date.getHours() - 1);
      return this //mongoose.connection.db.collection('withdrawalStat')
        .update({
          owner: withdrawal.owner,
          $or: [{
            ['stat.' + (maxPerHour - 1)]: {$exists: false},
          }, {
            'stat.0': {$lt: date}
          }],
        }, {
          $push: {
            stat: {$each: [new Date()], $slice: -maxPerHour}
          },
          $currentDate: {updated: true},
        }, {
          upsert: true,
        });
    })
    .then((result) => {
      if (result.n === 0) {
        throw new Error('max per hour failed');
      }
    });
};

export = mongoose.model('WithdrawalStat', schema);
