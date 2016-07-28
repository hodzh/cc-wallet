'use strict';

var path = require('path');
var http = require('http');

var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var express = require('express');
var favicon = require('favicon');
var methodOverride = require('method-override');
var passport = require('passport');
var morgan = require('morgan');

var log = require('log4js').getLogger('core');

var app = express();
var server = http.createServer(app);
var web = {
  express: app,
  server: server,
  init: initServer,
  start: startServer,
  use: app.use.bind(app),
  routers: {},
  route: route
};

module.exports = web;

function initServer(config) {

  app.set('env', config.env);
  app.set('rootPath', config.root);
  app.set('appPath', path.join(config.root, 'public'));

  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(passport.initialize());

  if ('production' === config.env) {
    app.use(morgan('dev'));
  }

  if ('development' === app.get('env')) {
    app.use(require('connect-livereload')());
  }

  if ('development' === config.env || 'test' === config.env) {
    app.use(morgan('dev'));
  }

  //app.use(require('./io'));
}

function startServer(config, auth, callback) {

  beforeStart(auth);

  server.listen(config.http.port, function(err) {
    if (err){
      return callback(err);
    }

    log.info('Walle server listening on %d, in %s mode',
      config.http.port, app.get('env'));

    callback();
  });
}

function beforeStart(auth){

  // use api

  registerApi(web.routers, web, '');

  function registerApi(routers, router, routePath){
    Object.keys(routers).forEach(registerApiKey);

    function registerApiKey(apiKey){
      var api = routers[apiKey];
      var apiRouter = express.Router();
      var apiPath = [routePath, apiKey].join('');
      if (typeof api === 'function') {
        api(apiRouter, auth);
      }
      else {
        registerApi(api, apiRouter, apiPath);
      }
      log.info('route', apiPath);
      router.use(apiKey, apiRouter);
    }
  }

  // use static api

  app.use(express.static(app.get('appPath')));
  //app.use(favicon(path.join(app.get('appPath'), 'favicon.ico')));

  if ('development' === app.get('env')) {
    app.use(require('connect-livereload')());
  }
  if ('development' === app.get('env') || 'test' === app.get('env')) {
    app.use('/bower_components',
      express.static(path.join(app.get('rootPath'), 'bower_components')));
  }

  // render index.html otherwise

  app.get('/*', renderRoot);

  // error handler has to be last

  if ('development' === app.get('env') || 'test' === app.get('env')) {
    app.use(errorHandler());
  } else {
    app.use(onError);
  }

  function onError(err, req, res, next) {
    var code = 500;
    var msg = { message: "Internal Server Error" };

    switch (err.name) {
      case "UnauthorizedError":
        code = err.status;
        msg = null;
        break;
      case "BadRequestError":
      case "UnauthorizedAccessError":
      case "NotFoundError":
        code = err.status;
        msg = err.inner;
        break;
      default:
        break;
    }

    return res.status(code).json(msg);

  }
}

function renderRoot(req, res) {
  if (req.originalUrl !== '/') {
    log.error(req.originalUrl, 'not found');
  }
  res.sendFile(path.join(app.get('appPath'), 'index.html'));
}

function route(routers){
  Object.keys(routers).forEach(
    function(key){
      web.routers[key] = routers[key];
    }
  );
}
