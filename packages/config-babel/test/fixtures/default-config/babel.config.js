const { getConfig } = require('../../../lib/index');
const config = getConfig({ srcFolder: '.' });
module.exports = config;
