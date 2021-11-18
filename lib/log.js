const createLogger = (sink) => {
  return setImmediate((loggingLevel, message, ...entities) => {
    const parts = message.split("%");
    sink(loggingLevel, parts, entities);
  });
};

module.exports = {
  createLogger,
};
