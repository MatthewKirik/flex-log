const fs = require("fs-promises");

const buildMessage = (loggingLevel, messageParts, entities) => {
  // const spaceCount = 2;
  // let message = "";
  // for (let i = 0; i < messageParts.length - 1; i++) {
  //   message += messageParts[i] + "\n";
  //   message += JSON.stringify(entities[i], null, spaceCount);
  //   message += "\n";
  // }
  // message += messageParts[messageParts.length - 1];
  // message += `\n#${loggingLevel}`;
  // return message;
};

const createSink = (options) => {
  const sink = (loggingLevel, messageParts, entities) => {
    buildMessage(loggingLevel, messageParts, entities);
    
  };
  return sink;
};

module.exports = createSink;
