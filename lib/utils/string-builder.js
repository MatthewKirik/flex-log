'use strict';

class StringBuilder {
  constructor(initStr) {
    this.strings = [];
    if (initStr) {
      this.strings.push(initStr);
    }
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
