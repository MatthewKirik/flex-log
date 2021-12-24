'use strict';

const fs = require('fs').promises;
const StringBuilder = require('../string-builder');


const buildMessage = (loggingLevel, messageParts, entities) => {
  const sb = new StringBuilder(
    `${loggingLevel} [${new Date().toISOString()}]:`
  );

  const spaceCount = 2;
  for (let i = 0; i < entities.length; i++) {
    sb.append(messageParts[i])
      .append('\n')
      .append(JSON.stringify(entities[i], null, spaceCount))
      .append('\n');
  }
  sb.append(messageParts[messageParts.length - 1])
    .append('\n');

  return sb.toString();
};

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

const writeMessage = (filePath, rollInterval, message) => {
  setInterval(async () => {
    if (!(await fileExists(filePath))) {
      await fs.writeFile(filePath, '', null);
    }

    const pathWithoutExt = filePath.replace(/\.[^/.]+$/, "");
    const fileExt = filePath.split(pathWithoutExt)[1];
    const currDate = new Date().toISOString();

    const fileToWrite = `${pathWithoutExt}${currDate}${fileExt}`;
    await fs.appendFile(fileToWrite, message, null);
  }, rollInterval);
};

const createSink = (options) => {
  const sink = (loggingLevel, messageParts, entities) => {
    const message = buildMessage(loggingLevel, messageParts, entities);
    writeMessage(options.filePath, options.rollInterval, message);
  };
  return sink;
};

module.exports = createSink;
