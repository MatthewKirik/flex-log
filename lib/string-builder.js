'use strict';

class StringBuilder {
  constructor() {
    this.strings = [];
  }

  append(str) {
    this.strings.push(str);
    return this;
  }

  toString() {
    return this.strings.join('');
  }
}

module.exports = StringBuilder;
