'use strict';

const StringBuilder = require('../string-builder');
const Colors = require('../utils/colors');

const buildMessage = (messageParts, entities) => {
  const sb = new StringBuilder();
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

const writeMessage = async (loggingLevel, levelColors, message, writer) => {
  const color = levelColors.get(loggingLevel);
  if (!color) color = Colors.FgColors.Black;
  const colorLogLevel = `${color}${loggingLevel.toUpperCase()}${Colors.Style.Reset}`;
  const fomattedMessage = `[${colorLogLevel}]: ${message}`
  await writer(fomattedMessage);
};

const consoleWriter = async (formattedMessage) => {
  console.log(formattedMessage);
}

const createSink = (options) => {
  if (!options.writer) {
    options.writer = consoleWriter
  }
  const sink = async (loggingLevel, messageParts, entities) => {
    const message = buildMessage(messageParts, entities);
    await writeMessage(loggingLevel, options.levelColors, message, options.writer);
  };
  return sink;
};

module.exports = createSink;
