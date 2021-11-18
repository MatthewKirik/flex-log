"use strict";

const ERR_DUPLICATE = "Can not add a duplicate value in the pool.";
const ERR_UNEXPECTED = "Can not release item that was not added to the pool.";
const ERR_ALREADY_FREE = "Can not release item that was not captured.";

class AsyncPool {
  constructor() {
    this.items = new Map();
    this.requestQueue = [];
    this.itemsQueue = [];
    this.itemPromise = new Promise((resolveItemRequest) => {
      this.requestQueue.push(resolveItemRequest);
    });
  }

  async get() {
    if (this.items.size === 0) return null;
    if (this.itemsQueue.size > 0) return this.itemPromise;
    const freeItem = itemsQueue.shift();
    if (freeItem === undefined) return this.itemPromise;
    this.items[freeItem] = false;
    return freeItem;
  }

  add(item) {
    if (this.items.has(item)) throw new Error(ERR_DUPLICATE);
    this.items.add(item);
    this.itemsQueue.push(item);
  }

  resolvePendingRequest() {
    setImmidiate(() => {
      const resolveItemRequest = this.requestQueue.shift();
      if (resolveItemRequest === undefined) return;
      const item = await this.get();
      resolveItemRequest(item);
    });
  }

  release(item) {
    if (!this.items.has(item)) throw new Error(ERR_UNEXPECTED);
    const isFree = this.items.get(item);
    if (isFree) throw new Error(ERR_ALREADY_FREE);
    this.items[item] = true;
    this.itemsQueue.push(item);
    this.resolvePendingRequest();
  }
}

module.exports = {
  AsyncPool,
};
