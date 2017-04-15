import mongoose = require('mongoose');
mongoose.Promise = Promise;
require('mongoose-long')(mongoose);
import merge = require('mongoose-merge-plugin');
import { QueueService } from '../queue/queue-service';
const log = require('log4js').getLogger('db');
const EventEmitter = require('events').EventEmitter;

class Database {
  public models: any;
  public queueService: QueueService;
  private eventEmitter: any;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.models = {};

    mongoose.plugin(merge);
  }

  async init(config) {
    await mongoose.connect(config.host, config.options);
    this.queueService = new QueueService(mongoose.connection.db);
    mongoose.connection.on('error', (err) => {
      this.onConnectionError(err);
    });
    await this.onConnected();
  }

  onConnectionError(err) {
    log.error('mongodb connection error: ' + err);
    throw new Error(err);
  }

  async onConnected() {
    log.info('mongodb connected');
    await this.emit('connect');
  }

  async emit(name, ...args) {
    let listeners = this.eventEmitter.listeners(name);
    if (!listeners || !listeners.length) {
      return false;
    }
    await Promise.all(listeners.map((listener) =>
      listener.apply(this.eventEmitter, args)));
  }

  once(...args) {
    this.eventEmitter.once(...args);
  }
}

export = new Database();
