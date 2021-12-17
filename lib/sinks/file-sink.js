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
      sb.append(`\n${loggingLevel}`);     // MAKE CAPS OUTPUT
    } else {
      sb
        .append('\n')
        .append(JSON.stringify(entities[i], null, spaceCount))
        .append('\n');
    }
  }

  return sb.toString();
};

const writeMessage = (filePath, message) => {
  return fs.writeFile(filePath, message, null);
};

const createSink = (options) => {
  const sink = (loggingLevel, messageParts, entities) => {
    const message = buildMessage(loggingLevel, messageParts, entities);
    await writeMessage(options.filePath, options.rollInterval, message);
  };
  return sink;
};

module.exports = createSink;




// в options будет приходить path: String
// (путь к папке и файлу, но к нему надо добавлять
// временной интервал если передали rollInterval),
// rollInterval: Number (время отката файла в секундах,
// можно сделать константы для дня, недели и тд),


