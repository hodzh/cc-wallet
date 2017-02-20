import '../../../core/server/setup';
import { MODULES } from './modules';

var log = require('log4js').getLogger('core');
var config = require('../../../core/server/config').CONFIG;
import server = require('../../../core/server');
server.init(config, MODULES);
server.start().catch((err) => {
  log.error(err);
  process.exit(1);
});
