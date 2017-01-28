let path = require('path');
let http = require('http');

let bodyParser = require('body-parser');
let compression = require('compression');
let cookieParser = require('cookie-parser');
let errorHandler = require('errorhandler');
let express = require('express');
let methodOverride = require('method-override');
let passport = require('passport');
let morgan = require('morgan');

let log = require('log4js').getLogger('web');

let app = express();
let server = http.createServer(app);
let web = {
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
  app.use(bodyParser.urlencoded(config.web.bodyParser.urlencoded));
  app.use(bodyParser.json(config.web.bodyParser.json));
  app.use(methodOverride());
  app.use(passport.initialize());

  if (config.web.log) {
    app.use(morgan('dev', {
      stream: {
        write: (msg) => {
          log.info(msg);
        }
      }
    }));
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

    // app.cluster.sendOnline();

    callback();
  });
}

function beforeStart(config, auth) {

  // use api

  registerApi(web.routers, web, '');

  function registerApi(routers, router, routePath) {
    Object.keys(routers).forEach(registerApiKey);

    function registerApiKey(apiKey) {
      let api = routers[apiKey];
      let apiRouter = express.Router();
      let apiPath = [routePath, apiKey].join('');
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

    let staticRoot = path.resolve(config.static);
    app.use(express.static(staticRoot));

    // render index.html otherwise

    app.get('/*', renderRoot);

    log.info('serving static files from', staticRoot);
  }

  // error handler has to be last

  app.use(onError);

  function onError(err, req, res, next) {
    log.error(err);
    let code = 500;
    let msg = {message: 'Internal Server Error'};
    return res.status(code).json(msg);
  }


  function renderRoot(req, res) {
    if (req.originalUrl !== '/') {
      log.error(req.originalUrl, 'not found');
    }
    let indexPath = path.join(path.resolve(config.static), 'index.html');
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
