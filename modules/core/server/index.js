'use strict';

var async = require('async');

var app = {
  config: null,
  db: require('./db'),
  auth: require('./auth'),
  web: require('./web'),
  init: init,
  start: start
};

module.exports = app;

function init(config){
  app.config = config;
  initModels();
  initAuth();
  initMailer();
  initToken();
  addModules(config.modules.slice(1));

  function initModels(){
    app.db.models.user = require('./model/user');
  }
  function initAuth(){
    var userModel = require('./model/user');
    app.auth.init(userModel, app.config);
  }
  function initMailer(){
    var mail = require('./mailer')(config.email);
    app.mail = mail;
  }
  function initToken(){
    var token = require('./token')(config.token);
    app.token = token;
  }
  function addModules(modules) {
    modules.forEach(initModule);
  }
  function initModule(name) {
    var path = require('path');
    var fs = require('fs');
    var modulePath = path.join(
      __dirname, '../../../modules',
      name, 'server');
    if (!fs.existsSync(modulePath)) {
      return;
    }
    var moduleServer = require(modulePath);
    moduleServer(app, app.config);
  }
}

function start(callback){
  async.series([
      app.db.init.bind(app.db, app.config.db),
      seed,
      initWeb,
      app.web.start.bind(
        app.web, app.config.web, app.auth)
    ],
    function(err) {
      if (err) {
        return callback(err);
      }
      return callback();
    }
  );

  function seed(callback){
    if ('development' !== app.config.env &&
      'test' !== app.config.env) {
      return callback();
    }
    app.db.seed(app.config.seed, callback);
  }
  function initWeb(callback){

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
