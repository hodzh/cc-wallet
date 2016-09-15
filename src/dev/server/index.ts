'use strict';

var Promise = require('bluebird');
var path = require('path');
var log = require('log4js').getLogger('dev');

export = devModule;

function devModule(server, config) {

  server.web.route({
    '/aapi/dev/db': require('./api')
  });

}
