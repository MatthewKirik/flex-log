'use strict';

const fs = require('fs').promises;
const path = require('path');
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

const getLatestFile = async (filePath) => {
  const dirPath = path.dirname(filePath);
  const baseFileName = path.basename(filePath)
    .replace(/\.[^/.]+$/, "");

  const fileNames = await fs.readdir(dirPath)
    .then((names) => names.filter(
      (name) => name.startsWith(baseFileName)));

  const fileTimePromises = fileNames.map(async (fileName) => {
    return { fileName, mtime: (await fs.stat(fileName)).mtime }
  });

  return Promise.all(fileTimePromises)
    .then((fileTimes) => fileTimes.reduce(
      (latest, curr) => latest.mtime > curr.mtime ? latest : curr
    ));
};

const processMessage = async (filePath, rollInterval, message) => {
  const latestFile;
  try {
    latestFile = await getLatestFile(filePath);
  } catch {
    writeMessage();
    return;
  }

  if (!latestFile) {
    writeMessage();
    return;
  }

  const currDate = new Date();
  const fileAge = latestFile.mtime - currDate;
  const rollIntervalPassed = fileAge >= rollInterval;
  if (rollIntervalPassed) {
    // appendMessage()
    const dirPath = path.dirname(filePath);
    const appendPath = dirPath + '/' + latestFile.fileName;
    await fs.appendFile(appendPath, message, null);
  } else {
    // writeMessage()
    const currDate = new Date();
    const pathWithoutExt = filePath.replace(/\.[^/.]+$/, "");
    const fileExt = path.extname(filePath);
    const fileToWrite = `${pathWithoutExt}_${currDate.toISOString()}${fileExt}`; 
    await fs.writeFile(fileToWrite, message, null);
  }
};

const createSink = (options) => {
  const sink = (loggingLevel, messageParts, entities) => {
    const message = buildMessage(loggingLevel, messageParts, entities);
    await processMessage(options.filePath, options.rollInterval, message);
  };
  return sink;
};

module.exports = createSink;
