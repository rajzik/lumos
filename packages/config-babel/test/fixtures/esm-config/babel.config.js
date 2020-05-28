const { getConfig } = require('../../../lib/index');
const config = getConfig({ srcFolder: '.', esm: true });
module.exports = config;
