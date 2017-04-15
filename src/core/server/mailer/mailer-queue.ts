import { QueueService } from '../queue/queue-service';

export class MailerQueue {
  private worker: any;
  private queue: any;
  private mailer: any;

  constructor(config, queueService: QueueService) {
    this.mailer = require('./mailer')(config);
    const queueName = 'mailer';
    this.queue = queueService.queue(queueName);
    this.worker = queueService.worker([this.queue]);
    this.worker.register({
      send: (params, callback) => {
        this.doSend(params, callback);
      }
    });
    this.worker.start();
  }

  send(params, options, callback) {
    this.queue.enqueue('send', params, options, callback);
  }

  private doSend(...args) {
    this.mailer.send(...args);
  }
}
