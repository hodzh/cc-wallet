

export class NaughtCluster {

  constructor() {
    process.on('message',
      (message) => this.shutdown(message));
  }

  sendOnline() {
    if (process.send) {
      process.send('online');
    }
  }

  shutdown(message) {
    if (message === 'shutdown') {
      process.exit(0);
    }
  }
}
