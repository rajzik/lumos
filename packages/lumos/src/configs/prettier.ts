import { getConfig, getIgnoreList } from '@rajzik/config-prettier';

module.exports = {
  ...getConfig(),
  ignore: getIgnoreList(),
};
