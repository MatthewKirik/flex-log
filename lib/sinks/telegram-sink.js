'use strict';

const https = require('../utils/https-post');
const AsyncPool = require('../utils/async-pool');

const options = (token, method) => ({
  hostname: 'api.telegram.org',
  path: `/bot${token}/${method}/`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});

const sendMessage = async (token, chatId, message) => {
  const body = {
    'chat_id': chatId,
    text: message,
    'parse_mode': 'HTML',
  };
  try {
    const res = await https({
      body: JSON.stringify(body),
      ...options(token, 'sendMessage'),
    });
    return res;
  } catch (error) {
    throw new Error('Error on logging to Telegram:  ' + error.message);
  }
};

const buildMessage = (loggingLevel, messageParts, entities) => {
  let message = '';
  for (let i = 0; i < messageParts.length - 1; i++) {
    message += messageParts[i] + '\n';
    message += JSON.stringify(entities[i], null, 2);
    message += '\n';
  }
  message += messageParts[messageParts.length - 1];
  message += `\n#${loggingLevel}`;
  return message;
};

const createSender = tokens => {
  const pool = new AsyncPool();
  for (const token of tokens) {
    const sender = (...args) => {
      sendMessage(token, ...args);
    };
    pool.add(sender);
    return async (chatId, message) => {
      const sender = await pool.get();
      await sender(chatId, message);
      pool.release(sender);
    };
  }
};

const createSink = options => {
  const sendMessage = createSender(options.tokens);
  const sink = async (loggingLevel, messageParts, entities) => {
    const message = buildMessage(loggingLevel, messageParts, entities);
    await sendMessage(options.channels[0].id, message);
  };
  return sink;
};

module.exports = createSink;
