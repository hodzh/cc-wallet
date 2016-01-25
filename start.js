'use strict';

var config = require('./config');
// console.log(config);

var server = require('./server');
server.config = config;
var modules = ['wallet', 'vp'];
server.addModules(modules);
server.start(onStart);

function onStart(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
}

