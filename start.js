'use strict';

var config = require('./config');
// console.log(config);

var server = require('./server');

var wallet = require('./modules/wallet/server');
wallet(server, config);

server.start(config, onStart);

function onStart(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
}

