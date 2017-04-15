import { EventEmitter } from 'events';
var util = require('util');

/**
 * Job retry specification
 * @typedef {Object} Job~Attempts
 * @property {string} strategy - Name of {@link Worker~strategyCallback} to use on retry
 * @property {number} count - total number of attempts so far
 * @property {number} delay - a delay constant for use in determining a delay.
 * In default linear strategy, this will be the delay between attempts
 */

/**
 * @constructor
 * @param {string} collection - The collection to save the job to
 * @param {Object} data - The Job data
 */
export class Job extends EventEmitter {

  static QUEUED = 'queued';
  static DEQUEUED = 'dequeued';
  static COMPLETE = 'complete';
  static FAILED = 'failed';
  static CANCELLED = 'cancelled';

  private collection: any;
  private data: any;

  constructor(collection, data) {
    super();
    this.collection = collection;

    if (data) {
      // Convert plain object to JobData type
      data.__proto__ = JobData.prototype;
      this.data = data;
    } else {
      this.data = new JobData();
    }
  }

  save(callback) {
    this.collection.save(this.data, (err, doc) => {
      if (err) {
        return callback && callback(err);
      }

      if (doc && doc.ops && doc.ops.length && this.data._id === undefined) {
        this.data._id = doc.ops[0]._id;
      }

      return callback && callback(null, this);
    });
  }

  cancel(callback) {
    if (this.data.status !== Job.QUEUED) {
      return callback(new Error('Only queued jobs may be cancelled'));
    }

    this.data.status = Job.CANCELLED;
    this.data.ended = new Date();

    this.save(callback);
  }

  complete(result, callback) {
    this.data.status = Job.COMPLETE;
    this.data.ended = new Date();
    this.data.result = result;

    this.save(callback);
  }

  fail(err, callback) {
    this.data.status = Job.FAILED;
    this.data.ended = new Date();
    this.data.error = err.message;
    this.data.stack = err.stack;

    this.save(callback);
  }

  enqueue(callback) {
    if (this.data.delay === undefined) {
      this.data.delay = new Date();
    }

    if (this.data.priority === undefined) {
      this.data.priority = 0;
    }

    this.data.status = Job.QUEUED;
    this.data.enqueued = new Date();

    this.save(callback);
  }

  delay(delay, callback) {
    this.data.delay = new Date(new Date().getTime() + delay);

    this.enqueue(callback);
  }
}

function JobData() {
}

Object.defineProperty(JobData.prototype, 'id', {
  get: function () {
    return this._id && this._id.toString && this._id.toString();
  }
});

