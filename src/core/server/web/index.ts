import { ClusterWorker } from '../cluster/worker';
import {callback2promise} from '../util/promisify';

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
  private config: any;
  private auth: any;

  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);
  }

  init(config, clusterWorker) {
    this.clusterWorker = clusterWorker;
    this.clusterWorker.events.on('shutdown', async () => {
      await callback2promise(this.server.close.bind(this.server));
      log.info('Closed out remaining connections');
    });
    this.express.disable('x-powered-by');
    this.express.use(this.shutdownMiddleware.bind(this));
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
          },
        },
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
    this.config = config;
    this.auth = auth;

    // use api

    this.registerApi(this.routers, this, '');

    if (config.static) {

      // use static api

      let staticRoot = path.resolve(config.static);
      this.express.use(express.static(staticRoot));

      // render index.html otherwise

      this.express.get('/*', this.renderRoot.bind(this));

      log.info('serving static files from', staticRoot);
    }

    // error handler has to be last

    this.express.use(this.onError.bind(this));
  }

  route(routers) {
    Object.keys(routers).forEach(
      (key) => {
        this.routers[key] = routers[key];
      },
    );
  }

  onError(err, req, res, next) {
    log.error('on error', err);
    let code = 500;
    let msg = {message: 'Internal Server Error'};
    return res.status(code).json(msg);
  }

  renderRoot(req, res) {
    if (req.originalUrl !== '/') {
      log.error(req.originalUrl, 'not found');
    }
    let indexPath = path.join(path.resolve(this.config.static), 'index.html');
    log.trace(indexPath);
    res.sendFile(indexPath);
  }

  registerApi(routers, router, routePath) {
    Object.keys(routers).forEach((apiKey) => {
      let api = routers[apiKey];
      let apiRouter = express.Router();
      let apiPath = [routePath, apiKey].join('');
      if (typeof api === 'function') {
        api(apiRouter, this.auth);
      } else {
        this.registerApi(api, apiRouter, apiPath);
      }
      log.info('route', apiPath);
      router.express.use(apiKey, apiRouter);
    });
  }

  shutdownMiddleware (req, res, next) {
    if (!this.clusterWorker.shuttingDown) {
      return next();
    }
    res.set('Connection', 'close');
    res.status(503).send('Server is in the process of restarting');
  }
}
