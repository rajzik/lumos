// @ts-check

const { getConfig, getIgnoreList } = require('@rajzik/config-prettier');

module.exports = {
  ...getConfig(),
  ignore: getIgnoreList(),
};
