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

const getLastFileDate = async (dirPath) => {
  throw new Error('Not implemented');
};

const writeMessage = async (filePath, rollInterval, message) => {
  if (!(await fileExists(filePath))) {
    await fs.writeFile(filePath, '', null);
  }

  const pathWithoutExt = filePath.replace(/\.[^/.]+$/, "");
  const fileExt = filePath.split(pathWithoutExt)[1];

  const lastFileDate = await getLastFileDate(filePath);
  const currDate = new Date();
  const rollIntervalPassed = (lastFileDate - currDate) >= rollInterval;
  if (!rollIntervalPassed) return false;

  const fileToWrite = `${pathWithoutExt}_${currDate.toISOString()}${fileExt}`;
  await fs.appendFile(fileToWrite, message, null);
  return true;
};

const createSink = (options) => {
  const sink = (loggingLevel, messageParts, entities) => {
    const message = buildMessage(loggingLevel, messageParts, entities);
    await writeMessage(options.filePath, options.rollInterval, message);
  };
  return sink;
};

module.exports = createSink;
