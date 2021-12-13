'use strict';

class StringBuilder {
  constructor() {
    this.strings = [];
  }

  append(str) {
    this.strings.push(str);
  }

  toString() {
    // const str = this.strings[i];
    return this.strings.join('');
  }
}

module.exports = StringBuilder;



// class StringBuilder {
//   constructor() {
//     this.strings = [];
//     // this._charLength = 0;
//   }

//   append(str) {
//     const lastIndex = this.strings.length - 1;
//     this.strings[lastIndex] = str;
//     // this._charLength += str.length;
//   }

//   // getTotalLength() {
//   //   const charCounter = 0;
//   //   for (let i = 0; i < this.strings.length; i++) {
//   //     const str = strings[i];
//   //     charCounter += str.length;
//   //   }
//   // }

//   toString() {
//     // const buffer = [];
//     // const index = 0;
//     const str = this.strings[i];
//     return this.strings.join('');
//   }
// }