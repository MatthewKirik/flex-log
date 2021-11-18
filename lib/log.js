const createLogger = (sink) => {
  return (loggingLevel, message, ...entities) => {
    const parts = message.split("%");
    sink(parts, entities);
  };
};

module.exports = {
  createLogger,
};
