import '../../../core/server/setup';
import { MODULES } from './modules';
import server = require('../../../core/server');
const config = require('../../../core/server/config').CONFIG;
const log = require('log4js').getLogger('core');
server.start(config, MODULES).catch((err) => {
  log.error(err);
  process.exit(1);
});
