const createLogger = (sink) => {
  return setImmediate((loggingLevel, message, ...entities) => {
    const parts = message.split("%");
    sink(parts, entities);
  });
};

module.exports = {
  createLogger,
};
