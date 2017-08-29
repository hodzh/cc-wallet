import { ClusterWorker } from '../cluster/worker';
let path = require('path');
let http = require('http');

let bodyParser = require('body-parser');
let compression = require('compression');
let cookieParser = require('cookie-parser');
let express = require('express');
let methodOverride = require('method-override');
let passport = require('passport');
let morgan = require('morgan');

let log = require('log4js').getLogger('web');

export class WebServer {

  express;
  server;
  routers = {};
  private clusterWorker: ClusterWorker;

  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);
  }

  init(config) {
    this.express.disable('x-powered-by');
    this.clusterWorker = new ClusterWorker(config.cluster, this.server);
    this.express.use(this.clusterWorker.middleware.bind(this.clusterWorker));
    this.express.use(compression());
    this.express.use(bodyParser.urlencoded(config.web.bodyParser.urlencoded));
    this.express.use(bodyParser.json(config.web.bodyParser.json));
    this.express.use(methodOverride());
    this.express.use(passport.initialize());

    if (config.web.log) {
      const logMode = typeof config.web.log === 'string' ?
        config.web.log : 'combined';
      this.express.use(morgan(logMode, {
        stream: {
          write: (msg) => {
            log.info(msg.slice(0, -1));
          }
        }
      }));
    }

    if (config.web.liveReload) {
      this.express.use(require('connect-livereload')());
    }

    //this.express.use(require('./io'));
  }

  start(config, auth) {
    this.beforeStart(config, auth);
    return new Promise((resolve, reject) => {
      this.server.listen(config.http.port, err => {
        if (err) {
          return reject(err);
        }
        log.info(`HTTP server listening on \
${config.http.host || '0.0.0.0'}:${config.http.port}`);
        this.clusterWorker.ready();
        resolve();
      });
    });
  }

  beforeStart(config, auth) {

    // use api

    registerApi(this.routers, this, '');

    function registerApi(routers, router, routePath) {
      Object.keys(routers).forEach((apiKey) => {
        let api = routers[apiKey];
        let apiRouter = express.Router();
        let apiPath = [routePath, apiKey].join('');
        if (typeof api === 'function') {
          api(apiRouter, auth);
        } else {
          registerApi(api, apiRouter, apiPath);
        }
        log.info('route', apiPath);
        router.express.use(apiKey, apiRouter);
      });
    }

    if (config.static) {

      // use static api

      let staticRoot = path.resolve(config.static);
      this.express.use(express.static(staticRoot));

      // render index.html otherwise

      this.express.get('/*', renderRoot);

      log.info('serving static files from', staticRoot);
    }

    // error handler has to be last

    this.express.use(onError);

    function onError(err, req, res, next) {
      log.error('on error', err);
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

  route(routers) {
    Object.keys(routers).forEach(
      (key) => {
        this.routers[key] = routers[key];
      }
    );
  }
}
