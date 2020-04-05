const { getConfig } = require('../lib');

module.exports = getConfig({
  root: __dirname,
  srcFolder: 'src',
  entryPoint: 'index.js',
  buildFolder: 'build2',
});
