const { getConfig } = require('../lib');

module.exports = getConfig({
  root: __dirname,
  srcFolder: 'src',
  entryPoint: 'index.jsx',
  buildFolder: `build2${process.env.NODE_ENV}`,
  publicPath: './',
  react: true,
  aliasPattern: '~*',
});
