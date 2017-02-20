var Promise = require('bluebird');
let log = require('log4js').getLogger('core');
let User = require('./model/user');
let Token = require('./token');

class App {
  config = null;
  db = require('./db');
  auth = require('./auth');
  web = require('./web');
  mail = null;
  token = null;

  constructor() {
  }

  init(config, modules) {
    log.trace('app init', process.version);
    this.config = config;
    this.db.models.user = User;
    this.auth.init(User, this.config);
    let mail = require('./mailer');
    this.mail = mail(config.email);
    let token = Token(config.token);
    this.token = token;
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
  }

  start() {
    return Promise.resolve()
      .then(() => Promise.fromNode(this.db.init.bind(this.db, this.config.db)))
      .then(() => Promise.fromNode(this.initWeb.bind(this)))
      .then(() => Promise.fromNode(this.web.start.bind(
        this.web, this.config.web, this.auth)));
  }

  initWeb(callback) {

    let web = this.web;
    let auth = this.auth;

    web.init(this.config);

    // register core routes

    web.route({
      '/auth/local': require('./auth/local'),
      '/api/me': require('./api/user/user')(this.token, this.mail),
      '/api/token': require('./api/user/token')(this.token),
      '/aapi/user': require('./api/admin/user')
    });

    callback();
  }
}

let app = new App();

export = app;

process.on('unhandledRejection', reason => {
  log.error(reason);
  throw reason;
});

process.on('uncaughtException', error => {
  log.error(error);
  // todo exit gracefully
  process.exit(1);
});
