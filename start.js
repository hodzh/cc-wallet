'use strict';

var config = require('./config');
var server = require('./modules/core/server');
server.init(config);
server.start(onStart);

function onStart(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
}

