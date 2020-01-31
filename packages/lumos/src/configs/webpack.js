// @ts-check

const { getConfig } = require('@rajzik/config-webpack');
const { getSettings } = require('@rajzik/lumos-common');

const { srcFolder, react } = getSettings();

module.exports = getConfig({
  analyzeBundle: !!process.env.WEBPACK_ANALYZE,
  port: process.env.PORT,
  react,
  sourceMaps: !!process.env.SOURCE_MAPS,
  srcFolder,
});
