const { getConfig } = require('../../../lib/index');
const config = getConfig({ srcFolder: '.', library: true });
module.exports = config;
