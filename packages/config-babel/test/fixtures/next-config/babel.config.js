const { getConfig } = require('../../../lib/index');
const config = getConfig({ srcFolder: '.', next: true });
module.exports = config;
