const defaultLoggingLevels = ["debug", "info", "error"];
const Queue = require("./utils/async-queue");

const ERRORS = {
  LOGGING_LEVEL_NOT_EXISTS:
    "Specified logging level was not registered on sink creation!",
};

const getImportancy = (levels, level) => {
  return levels.findIndex((l) => l == level);
};

const entityDelimeter = "%";
const createLogger = (options, sink) => {
  const loggingLevels = options.levels || defaultLoggingLevels;
  const minimalImportancy = getImportancy(loggingLevels, loggingLevel);
  const queue = new Queue();
  return (loggingLevel, message, ...entities) => {
    const logMessage = async () => {
      const importancy = getImportancy(loggingLevels, loggingLevel);
      if (importancy === -1) {
        throw new Error(ERRORS.LOGGING_LEVEL_NOT_EXISTS);
      }
      if (importancy >= minimalImportancy) {
        const parts = message.split(entityDelimeter);
        await sink(loggingLevel, parts, entities);
      }
    };
    queue.add(logMessage);
  };
};

module.exports = {
  createLogger,
};
