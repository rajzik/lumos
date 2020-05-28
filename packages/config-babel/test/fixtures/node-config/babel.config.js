const { getConfig } = require('../../../lib/index');
const config = getConfig({ srcFolder: '.', node: true });
module.exports = config;
