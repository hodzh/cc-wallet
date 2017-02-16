let log = require('log4js').getLogger('worker');

const DEFAULT_FORCE_TIMEOUT = 1000;

export class ClusterWorker {
  private shuttingDown: boolean;

  constructor(private config, private server) {
    process.on('SIGINT', () => this.shutdown());
    process.on('message', (msg) => {
      if (msg === 'shutdown') {
        this.shutdown();
      }
    });
  }

  middleware (req, res, next) {
    if (!this.shuttingDown) {
      return next();
    }
    res.set('Connection', 'close');
    res.status(503).send('Server is in the process of restarting.');
  }

  private shutdown() {
    // Don't bother with graceful shutdown on development to speed up round trip
    // if (!process.env.NODE_ENV) return process.exit(1);

    if (this.shuttingDown) {
      return;
    }
    this.shuttingDown = true;
    log.warn('Received kill signal (SIGTERM), shutting down');

    setTimeout(() => {
      log.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, this.config.forceTimeout || DEFAULT_FORCE_TIMEOUT);

    this.server.close(() => {
      log.info('Closed out remaining connections.');
      process.exit();
    });
  }
}
