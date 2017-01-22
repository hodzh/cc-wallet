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

export = web;

function initServer(config) {
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(passport.initialize());

  if (config.web.log) {
    app.use(morgan('dev'));
  }

  if (config.web.liveReload) {
    app.use(require('connect-livereload')());
  }

  //app.use(require('./io'));
}

function startServer(config, auth, callback) {

  beforeStart(config, auth);

  server.listen(config.http.port, function (err) {
    if (err) {
      return callback(err);
    }

    log.info('HTTP server listening on %d',
      config.http.port);

    callback();
  });
}

function beforeStart(config, auth) {

  // use api

  registerApi(web.routers, web, '');

  function registerApi(routers, router, routePath) {
    Object.keys(routers).forEach(registerApiKey);

    function registerApiKey(apiKey) {
      var api = routers[apiKey];
      var apiRouter = express.Router();
      var apiPath = [routePath, apiKey].join('');
      if (typeof api === 'function') {
        api(apiRouter, auth);
      } else {
        registerApi(api, apiRouter, apiPath);
      }
      log.info('route', apiPath);
      router.use(apiKey, apiRouter);
    }
  }

  if (config.static) {

    // use static api

    var staticRoot = path.resolve(config.static);
    app.use(express.static(staticRoot));
    // app.use(favicon(path.join(staticRoot, 'favicon.ico')));

    // render index.html otherwise

    app.get('/*', renderRoot);

    log.info('serving static files from', staticRoot);
  }

  // error handler has to be last

  app.use(onError);

  function onError(err, req, res, next) {
    log.error(err);
    var code = 500;
    var msg = {message: 'Internal Server Error'};
    return res.status(code).json(msg);
  }


  function renderRoot(req, res) {
    if (req.originalUrl !== '/') {
      log.error(req.originalUrl, 'not found');
    }
    var indexPath = path.join(path.resolve(config.static), 'index.html');
    log.trace(indexPath);
    res.sendFile(indexPath);
  }
}

function route(routers) {
  Object.keys(routers).forEach(
    function (key) {
      web.routers[key] = routers[key];
    }
  );
}
