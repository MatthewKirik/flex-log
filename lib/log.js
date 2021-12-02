const defaultLoggingLevels = ["debug", "info", "error"];

const ERRORS = {
  LOGGING_LEVEL_NOT_EXISTS:
    "Specified logging level was not registered on sink creation!",
};

const getImportancy = (levels, level) => {
  return levels.findIndex((l) => l == level);
};

const createLogger = (options, sink) => {
  const loggingLevels = options.levels || defaultLoggingLevels;
  const minimalImportancy = getImportancy(loggingLevels, loggingLevel);
  return (loggingLevel, message, ...entities) => {
    setTimeout(async () => {
      const importancy = getImportancy(loggingLevels, loggingLevel);
      if (importancy === -1) {
        throw new Error(ERRORS.LOGGING_LEVEL_NOT_EXISTS);
      }
      if (importancy >= minimalImportancy) {
        const parts = message.split("%");
        await sink(loggingLevel, parts, entities);
      }
    }, 0);
  };
};

module.exports = {
  createLogger,
};
