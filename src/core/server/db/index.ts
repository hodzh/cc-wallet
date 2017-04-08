import mongoose = require('mongoose');
mongoose.Promise = Promise;
require('mongoose-long')(mongoose);
import merge = require('mongoose-merge-plugin');
const log = require('log4js').getLogger('db');
const EventEmitter = require('events').EventEmitter;

class Database {
  private eventEmitter: any;
  private models: any;
  private connected: boolean;

  constructor() {
    this.connected = false;
    this.eventEmitter = new EventEmitter();
    this.models = {};

    mongoose.plugin(merge);
  }

  init(config) {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.host, config.options);
      mongoose.connection.on('error', (err) => {
        this.onError(err);
        reject(err || 'undefined error');
      });
      mongoose.connection.on('connected', () => {
        this.onConnected()
          .then(() => resolve())
          .catch(error => {
            log.error(error);
            reject(error);
          });
      });
    });
  }

  onError(err) {
    console.error('MongoDB connection error: ' + err);
    if (this.connected) {
      throw new Error(err);
    }
  }

  onConnected() {
    this.connected = true;
    log.info('mongodb connected');
    return this.emit('connect');
  }

  emit(name, ...args): Promise<any> {
    let listeners = this.eventEmitter.listeners(name);
    if (!listeners || !listeners.length) {
      return Promise.resolve(false);
    }
    return Promise.all(listeners.map((listener) =>
      listener.apply(this.eventEmitter, args)));
  }

  once(...args) {
    this.eventEmitter.once(...args);
  }
}

export = new Database();
