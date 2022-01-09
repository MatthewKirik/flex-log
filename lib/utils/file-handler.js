const { writeFile, appendFile, readdir, stat } = require('fs').promises;
const { dirname, extname, basename } = require('path');

const files = { writeFile, appendFile, readdir, stat };
const pathes = { dirname, extname, basename };
const baseFileName =  filePath => basename(filePath).replace(/\.[^/.]+$/, '');
const pathWithoutExt = filePath => filePath.replace(/\.[^/.]+$/, '');

module.exports = Object.assign(pathes, files, { pathWithoutExt, baseFileName });
