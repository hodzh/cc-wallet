'use strict';

var log = require('log4js').getLogger('main');
var config = require('./config');
var server = require('./modules/core/server');
server.init(config);
server.start(onStart);

function onStart(err) {
  if (err) {
    log.error(err);
    process.exit(1);
  }
}

