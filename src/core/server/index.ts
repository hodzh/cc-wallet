import { Mailer } from './mailer/index';
import { ClusterWorker } from './cluster/worker';
let log = require('log4js').getLogger('core');
let User = require('./model/user');
let Token = require('./token');

class App {
  config = null;
  db = require('./db');
  auth = require('./auth');
  web = require('./web');
  mail: Mailer = null;
  token = null;

  constructor() {
  }

  async start(config, modules) {
    await this.init(config, modules);
    let addUser = process.argv.indexOf('--add-user');
    if (addUser !== -1) {
      if (!ClusterWorker.isRoot) {
        throw new Error('permission denied');
      }
      await User.addUser({
        provider: 'local',
        email: process.argv[++addUser],
        emailValid: true,
        password: process.argv[++addUser],
        role: process.argv[++addUser],
      }).then((user) => {
        log.info('add user', user.email);
      }).catch((err) => {
        log.error(err);
      }).then(() => {
        process.exit(0);
      });
      return true;
    }
    await this.web.start(this.config.web, this.auth);
  }

  private async init(config, modules) {
    log.trace('app init node', process.version);
    this.config = config;
    this.db.models.user = User;
    this.auth.init(User, this.config);
    this.mail = new Mailer();
    this.token = Token(this.config.token);
    modules.slice(1).forEach((moduleServer) => {
      /*let path = require('path');
       let fs = require('fs');
       let modulePath = path.join(
       __dirname, '../../../modules',
       name, 'server');
       if (!fs.existsSync(modulePath)) {
       return;
       }
       let moduleServer = require(modulePath);*/
      moduleServer(this, this.config);
    });
    await this.db.init(this.config.db);
    this.mail.init(this.config.email, this.db.queueService);
    this.web.init(this.config);
    this.web.route({
      '/auth/local': require('./auth/local'),
      '/api/me': require('./api/user/user')(this.token, this.mail, this.auth),
      '/api/token': require('./api/user/token')(this.token),
      '/aapi/user': require('./api/admin/user')
    });
  }
}

let app = new App();

export = app;
