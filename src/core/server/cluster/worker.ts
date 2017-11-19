import {EventEmitterAsync} from '../util/event-emitter-async';

let log = require('log4js').getLogger('worker');

const DEFAULT_FORCE_TIMEOUT = 300000;

export class ClusterWorker {
  events: EventEmitterAsync;
  static get isRoot(): boolean {
    if (process.platform === 'win32') {
      return true;
    }
    return process.getuid && process.getuid() === 0;
  }
  shuttingDown: boolean;
  private config: any;

  constructor(config) {
    this.config = config || {};
    this.events = new EventEmitterAsync();
    process.on('SIGINT', () => {
      log.trace('SIGINT');
      this.shutdown();
    });
    process.on('message', (msg) => {
      if (msg === 'shutdown') {
        log.trace('shutdown message');
        this.shutdown();
      }
    });
    process.on('unhandledRejection', error => {
      log.error('unhandledRejection', error);
      this.shutdown();
    });
    process.on('uncaughtException', error => {
      log.error('uncaughtException', error);
      this.shutdown();
    });
  }

  ready() {
    if (process.send) {
      process.send('ready');
    }
  }

  private shutdown() {
    // Don't bother with graceful shutdown on development to speed up round trip
    // if (!process.env.NODE_ENV) return process.exit(1);

    if (this.shuttingDown) {
      return;
    }
    this.shuttingDown = true;
    log.warn('Shutting down');
    setTimeout(() => {
      log.error('Could not shutdown in time, forcefully shutting down');
      process.exit(1);
    }, this.config.forceTimeout || DEFAULT_FORCE_TIMEOUT);

    this.events.emit('shutdown')
      .catch((err) => {log.error(err);})
      .then(() => {process.exit();});
  }
}
