'use strict';

const fs = require('fs').promises;
const StringBuilder = require('../string-builder');


// add chaining syntax returning (this) in StringBuilder
// here we maybe can iterate asynchronously
const buildMessage = (loggingLevel, messageParts, entities) => {
  const spaceCount = 2;
  const sb = new StringBuilder();
  for (let i = 0; i < messageParts.length - 1; i++) {
    sb.append(messageParts[i]);
    if (i === messageParts.length - 1) {
      sb.append(`\n#${loggingLevel}`);
    } else {
      sb.append('\n' + JSON.stringify(
        entities[i], null, spaceCount) + '\n'); // why not?
    }
    // message += messageParts[i] + "\n";
    // message += JSON.stringify(entities[i], null, spaceCount);
    // message += "\n";
  }

  return sb.toString();
};

const createSink = (options) => {
  const sink = (loggingLevel, messageParts, entities) => {
    buildMessage(loggingLevel, messageParts, entities);
    
  };
  return sink;
};

module.exports = createSink;
