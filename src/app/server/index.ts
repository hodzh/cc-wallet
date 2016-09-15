import { MODULES } from './modules';

var log = require('log4js').getLogger('core');
import config = require('../../../config');
import server = require('../../core/server');
server.init(config, MODULES);
server.start(onStart);

function onStart(err) {
  if (err) {
    log.error(err);
    process.exit(1);
  }
}
