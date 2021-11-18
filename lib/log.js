const createLogger = (sink) => {
  return function log(loggingLevel, message, ...entities) {
    const parts = message.split("%");
    sink(parts, entities);
  };
};

module.exports = {
  createLogger,
};
