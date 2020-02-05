import { getConfig, getIgnoreList } from '@rajzik/config-prettier';

export = {
  ...getConfig(),
  ignore: getIgnoreList(),
};
