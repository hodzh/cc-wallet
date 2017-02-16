var async = require('async');
var log = require('log4js').getLogger('core');
var User = require('./model/user');
var Token = require('./token');

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
    var mail = require('./mailer');
    this.mail = mail(config.email);
    var token = Token(config.token);
    this.token = token;
    modules.slice(1).forEach((moduleServer) => {
      /*var path = require('path');
       var fs = require('fs');
       var modulePath = path.join(
       __dirname, '../../../modules',
       name, 'server');
       if (!fs.existsSync(modulePath)) {
       return;
       }
       var moduleServer = require(modulePath);*/
      moduleServer(this, this.config);
    });
  }

  start(callback) {
    async.series([
        this.db.init.bind(this.db, this.config.db),
        initWeb,
        this.web.start.bind(
          this.web, this.config.web, this.auth)
      ],
      function (err) {
        if (err) {
          return callback(err);
        }
        return callback();
      }
    );

    function initWeb(callback) {

      var web = this.web;
      var auth = this.auth;

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
}

var app = new App();

export = app;

process.on('unhandledRejection', function (reason) {
  log.error(reason);
  throw reason;
});

process.on('uncaughtException', function (error) {
  log.error(error);
  // todo exit gracefully
  process.exit(1);
});
