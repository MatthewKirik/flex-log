'use strict';

const { writeFile, appendFile, readdir, stat } = require('fs').promises;
const { dirname, extname, basename } = require('path');

const fileProc = {
  writeFile,
  appendFile,
  readdir,
  stat
};

const pathProc = {
  dirname,
  extname,
  basename
};

const baseFileName = filePath => basename(filePath).replace(/\.[^/.]+$/, '');
const pathWithoutExt = filePath => filePath.replace(/\.[^/.]+$/, '');

module.exports = Object.assign(fileProc, pathProc,
  { pathWithoutExt, baseFileName });
