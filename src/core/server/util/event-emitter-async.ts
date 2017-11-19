import {EventEmitter} from 'events';

export class EventEmitterAsync {
  private eventEmitter: EventEmitter;
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  on(event, handler) {
    return this.eventEmitter.addListener(event, handler);
  }

  once(event, handler) {
    return this.eventEmitter.once(event, handler);
  }

  off(event, handler) {
    return this.eventEmitter.removeListener(event, handler);
  }

  async emit(event, ...args) {
    const listeners = this.eventEmitter.listeners(event);
    if (!listeners || !listeners.length) {
      return false;
    }
    return await Promise.all(listeners.map(listener => listener.apply(this, args)));
  }
}
