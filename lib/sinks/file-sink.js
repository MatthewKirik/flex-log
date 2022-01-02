'use strict';

const fh = require('./file-handler');
const StringBuilder = require('../utils/string-builder');


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
  const dirPath = fh.dirname(filePath);
  const baseFileName = fh.baseFileName(filePath);

  const fileNames = await fh.readdir(dirPath)
    .then((names) => names.filter(
      (name) => name.startsWith(baseFileName)));

  if (fileNames.length === 0) return null;

  const fileTimePromises = fileNames.map(async (fileName) => {
    return { fileName, mtime: (await fh.stat(fileName)).mtime }
  });

  return Promise.all(fileTimePromises)
    .then((fileTimes) => fileTimes.reduce(
      (latest, curr) => latest.mtime > curr.mtime ? latest : curr
    ));
};

const writeMessage = async (filePath, message) => {
  const currDate = new Date();
  const pathWithoutExt = fh.pathWithoutExt(filePath);
  const fileExt = fh.extname(filePath);
  const fileToWrite = `${pathWithoutExt}_${currDate.toISOString()}${fileExt}`;
  await fh.writeFile(fileToWrite, message, null);
};

const appendMessage = async (filePath, message) => {
  const dirPath = fh.dirname(filePath);
  const appendPath = dirPath + '/' + latestFile.fileName;
  await fh.appendFile(appendPath, message, null);
};

const processMessage = async (filePath, rollInterval, message) => {
  const latestFile = await getLatestFile(filePath);
  if (!latestFile) {
    await writeMessage(filePath, message);
    return;
  }

  const currDate = new Date();
  const fileAge = latestFile.mtime - currDate;
  const rollIntervalPassed = fileAge >= rollInterval;
  if (rollIntervalPassed) {
    await appendMessage(filePath, message);
  } else {
    await writeMessage(filePath, message);
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
