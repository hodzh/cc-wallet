import { Mailer } from './mailer/index';
import { ClusterWorker } from './cluster/worker';
import { WebServer } from './web/index';
import {EventEmitterAsync} from './util/event-emitter-async';
let EventEmitter = require('events').EventEmitter;

let log4js = require('log4js');
let log = log4js.getLogger('core');
let User = require('./model/user');
let Token = require('./token');

class App {
  web: any;
  config = null;
  db = require('./db');
  auth = require('./auth');
  mail: Mailer = null;
  token = null;
  eventEmitter = new EventEmitterAsync();
  private clusterWorker: ClusterWorker;

  constructor() {
  }

  on(event, handler) {
    this.eventEmitter.on(event, handler);
  }

  once(event, handler) {
    this.eventEmitter.once(event, handler);
  }

  off(event, handler) {
    this.eventEmitter.off(event, handler);
  }

  async emit(event, ...args) {
    return await this.eventEmitter.emit(event, ...args);
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
    this.emit('start');
  }

  private async init(config, modules) {
    this.initLog(config.log);
    log.info('app init node', process.version);
    await this.emit('init');
    this.config = config;
    this.db.models.user = User;
    this.auth.init(User, this.config);
    this.mail = new Mailer();
    this.token = Token(this.config.token);
    this.clusterWorker = new ClusterWorker(config.cluster);
    this.clusterWorker.events.on('shutdown', () => this.emit('shutdown'));
    if (this.config.web.enable) {
      this.web = new WebServer();
    } else {
      this.web = {
        init: () => {
        },
        start: () => {
        },
        route: () => {
        },
      };
    }
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
    this.web.init(this.config, this.clusterWorker);
    this.web.route({
      '/auth/local': require('./auth/local')(config.auth),
      '/api/me': require('./api/user/user')(config.auth, this.token, this.mail, this.auth),
      '/api/token': require('./api/user/token')(this.token),
      '/aapi/user': require('./api/admin/user'),
    });
  }

  private initLog(options) {
    let logger = log4js.getLogger();
    if (options && options.level) {
      logger.level = options.level;
    }
  }
}

let app = new App();

export = app;
