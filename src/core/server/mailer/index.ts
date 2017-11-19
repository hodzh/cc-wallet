import { MailerQueue } from './mailer-queue';
import { QueueService } from '../queue/queue-service';
import { callback2promise } from '../util/promisify';

export class Mailer {
  private mailer: any;

  constructor() {
  }

  init(config, queueService: QueueService) {
    this.mailer = new MailerQueue(config, queueService);
  }

  send(params, options) {
    return callback2promise(this.mailer.send.bind(
      this.mailer, params, options || {}));
  }
}
