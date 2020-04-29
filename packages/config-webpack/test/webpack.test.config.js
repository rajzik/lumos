const { getConfig } = require('../lib');

module.exports = getConfig({
  root: __dirname,
  buildFolder: `build${process.env.NODE_ENV}`,
  srcFolder: 'src',
  publicPath: './',
  react: true,
  aliasPattern: '~*',
});
