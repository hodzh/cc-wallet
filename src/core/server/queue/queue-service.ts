import { Queue } from './queue';
import { QueueWorker } from './worker';

export class QueueService {
  private connection: any;

  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Returns a new {@link Worker}
   * @param {string[]|string} queues - list of queue names, a single queue name,
   * or '*' for a universal worker
   * @param {Object} options - an object with worker options
   */
  worker(queues, options?) {
    if (!options) {
      options = {};
    }

    var collection = options.collection || 'jobs';

    if (queues === '*') {
      options.universal = true;

      queues = [this.queue('*', {
        universal: true,
        collection: collection
      })];
    } else {
      if (!Array.isArray(queues)) {
        queues = [queues];
      }

      queues = queues.map(queue => {
        if (typeof queue === 'string') {
          queue = this.queue(queue, {
            collection: collection
          });
        }

        return queue;
      });
    }

    return new QueueWorker(queues, options);
  }

  queue(name, options?) {
    return new Queue(this.connection, name, options);
  }
}
