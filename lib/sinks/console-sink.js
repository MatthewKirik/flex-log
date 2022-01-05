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

const writeMessage = (loggingLevel, levelColors, message) => {
  const color = levelColors.get(loggingLevel);
  if (!color) color = Colors.FgColors.Black;
  const colorLogLevel = `${color}${loggingLevel.toUpperCase()}${Colors.Style.Reset}`;
  console.log(`[${colorLogLevel}]: ${message}`);
};

const createSink = (options) => {
  const sink = (loggingLevel, messageParts, entities) => {
    const message = buildMessage(messageParts, entities);
    writeMessage(loggingLevel, options.levelColors, message);
  };
  return sink;
};

module.exports = createSink;
