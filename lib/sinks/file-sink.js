const fs = require("fs-promises");

const createSink = (options) => {
  const sink = (messageParts, entities) => {};
  return sink;
};

module.exports = createSink;
