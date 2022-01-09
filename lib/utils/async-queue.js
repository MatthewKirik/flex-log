'use strict';

class Queue {
  constructor() {
    this.waiting = [];
    this.waitingCount = 0;
    this.idle = true;
  }

  async start() {
    this.idle = false;
    while (this.waitingCount > 0) {
      const next = this.waiting.shift();
      this.waitingCount--;
      await next();
    }
    this.idle = true;
  }

  async add(f) {
    this.waiting.add(f);
    this.waitingCount++;
    if (this.idle) this.start();
  }
}

module.exports = Queue;
