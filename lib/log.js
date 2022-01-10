'use strict';

const Queue = require('./data-structs/async-queue');

const defaultLoggingLevels = ['debug', 'info', 'error'];
const ERRORS = {
  LOGGING_LEVEL_NOT_EXISTS:
    'Specified logging level was not registered on sink creation!',
};

const getImportancy = (levels, level) => levels.findIndex(l => l === level);

const ENTITY_DELIMETER = '%';
const createLogger = (options, ...sinks) => {
  const loggingLevels = options.levels || defaultLoggingLevels;
  const minimalImportancy = getImportancy(loggingLevels, options.loggingLevel);
  const queue = new Queue();
  return (loggingLevel, message, ...entities) => {
    const logMessage = async () => {
      const importancy = getImportancy(loggingLevels, loggingLevel);
      if (importancy === -1) {
        throw new Error(ERRORS.LOGGING_LEVEL_NOT_EXISTS);
      }
      if (importancy >= minimalImportancy) {
        const parts = message.split(ENTITY_DELIMETER);
        const sinkPromises = sinks.map(sink =>
          sink(loggingLevel, parts, entities)
        );
        await Promise.all(sinkPromises);
      }
    };
    queue.add(logMessage);
  };
};

module.exports = {
  createLogger,
  DEFAULT_LEVELS: defaultLoggingLevels,
};
