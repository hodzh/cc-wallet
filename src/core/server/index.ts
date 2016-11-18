var async = require('async');
var log = require('log4js').getLogger('core');
var User = require('./model/user');
var Token = require('./token');

var app = {
  config: null,
  db: require('./db'),
  auth: require('./auth'),
  web: require('./web'),
  mail: null,
  token: null,
  init: init,
  start: start
};

export = app;

function init(config, modules) {
  log.trace('app init', process.version);
  app.config = config;
  initModels();
  initAuth();
  initMailer();
  initToken();
  //addModules(config.modules.slice(1));
  addModules(modules.slice(1));

  function initModels() {
    app.db.models.user = User;
  }

  function initAuth() {
    app.auth.init(User, app.config);
  }

  function initMailer() {
    var mail = require('./mailer');
    app.mail = mail(config.email);
  }

  function initToken() {
    var token = Token(config.token);
    app.token = token;
  }

  function addModules(modules) {
    modules.forEach(initModule);
  }

  function initModule(moduleServer) {
    /*var path = require('path');
     var fs = require('fs');
     var modulePath = path.join(
     __dirname, '../../../modules',
     name, 'server');
     if (!fs.existsSync(modulePath)) {
     return;
     }
     var moduleServer = require(modulePath);*/
    moduleServer(app, app.config);
  }
}

function start(callback) {
  async.series([
      app.db.init.bind(app.db, app.config.db),
      initWeb,
      app.web.start.bind(
        app.web, app.config.web, app.auth)
    ],
    function (err) {
      if (err) {
        return callback(err);
      }
      return callback();
    }
  );

  function initWeb(callback) {

    var web = app.web;
    var auth = app.auth;

    web.init(app.config);

    // register core routes

    web.route({
      '/auth/local': require('./auth/local'),
      '/api/me': require('./api/user/user')(app.token, app.mail),
      '/api/token': require('./api/user/token')(app.token),
      '/aapi/user': require('./api/admin/user')
    });

    callback();
  }
}

process.on('unhandledRejection', function (reason) {
  throw reason;
});

process.on('uncaughtException', function (error) {
  log.error(error);
  // todo exit gracefully
  process.exit(1);
});
