const fs = require("fs-promises");

const createSink = (options) => {
  const sink = (loggingLevel, messageParts, entities) => {};
  return sink;
};

module.exports = createSink;
