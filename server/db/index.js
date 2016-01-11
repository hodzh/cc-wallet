
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);

module.exports = {
  models: {},
  init: init
};

function init(config, callback) {

  mongoose.connect(config.host, config.options);

  mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    callback(err || "undefined error");
  });

  mongoose.connection.on('connected', function() {
    callback();
  });

}
