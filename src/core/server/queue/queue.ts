import { Job } from './job';
var mongo = require('mongodb');

export class Queue {
  collection: any;
  connection: any;
  private name: string;
  private options: any;

  constructor(connection, name, options) {
    if (typeof name === 'object' && options === undefined) {
      options = name;
      name = undefined;
    }

    if (!options) {
      (options = {});
    }
    if (!options.collection) {
      (options.collection = 'jobs');
    }
    if (!options.universal) {
      (options.universal = false);
    }

    this.connection = connection;
    this.name = name || 'default';
    this.options = options;

    this.collection = connection.collection(this.options.collection);

    if (options.index !== false) {
      this.collection.ensureIndex({
        status: 1, queue: 1, priority: -1, _id: 1, delay: 1
      }, function (err) {
        if (err) {
          console.error(err);
        }
      });
      // var numberOfSeconds = 60 * 60 * 24; // 60 sec * 60 min * 24 hours
      // db.expire.ensureIndex({ "endTime": 1}, {expireAfterSeconds: numberOfSeconds });
    }
  }

  job(data) {
    return new Job(this.collection, data);
  }

  get(id, callback) {
    var self = this;

    if (typeof id === 'string') {
      id = new mongo.ObjectID(id);
    }

    var query: any = {_id: id};
    if (!this.options.universal) {
      query.queue = this.name;
    }

    this.collection.findOne(query, function (err, data) {
      if (err) {
        return callback(err);
      }
      if (!data) {
        return callback(new Error('job not found ' + id.toString()));
      }
      var job = new Job(self.collection, data);
      callback(null, job);
    });
  }

  enqueue(name, params, options, callback) {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = {};
    }

    var job = this.job({
      name: name,
      params: params,
      queue: this.name,
      attempts: parseAttempts(options.attempts),
      timeout: parseTimeout(options.timeout),
      delay: options.delay,
      priority: options.priority
    });

    job.enqueue(callback);
  }

  dequeue(options, callback) {
    var self = this;

    if (callback === undefined) {
      callback = options;
      options = {};
    }

    var query: any = {
      status: Job.QUEUED,
      delay: {$lte: new Date()}
    };

    if (!this.options.universal) {
      query.queue = this.name;
    }

    if (options.minPriority !== undefined) {
      query.priority = {$gte: options.minPriority};
    }

    if (options.callbacks !== undefined) {
      var callback_names = Object.keys(options.callbacks);
      query.name = {$in: callback_names};
    }

    var sort = {
      'priority': -1,
      '_id': 1
    };

    var update = {$set: {status: Job.DEQUEUED, dequeued: new Date()}};

    this.collection.findAndModify(
      query,
      sort,
      update,
      {new: true},
      function (err, doc) {
        if (err) {
          return callback(err);
        }
        if (!doc || !doc.value) {
          return callback();
        }

        callback(null, self.job(doc.value));
      });
  }
}

// Helpers

function parseTimeout(timeout) {
  if (timeout === undefined) {
    return undefined;
  }
  return parseInt(timeout, 10);
}

function parseAttempts(attempts) {
  if (!attempts) {
    return;
  }

  if (typeof attempts !== 'object') {
    throw new Error('attempts must be an object');
  }

  var result: any = {
    count: parseInt(attempts.count, 10)
  };

  if (attempts.delay !== undefined) {
    result.delay = parseInt(attempts.delay, 10);
    result.strategy = attempts.strategy;
  }

  return result;
}
