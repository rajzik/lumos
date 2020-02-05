import { getExtendsList, getIgnoreList } from '@rajzik/config-eslint';
import { getSettings } from '@rajzik/lumos-common';

const { tool } = process.beemo;
const { next, node } = getSettings();

export = {
  extends: getExtendsList({
    next,
    node,
    prettier: tool.isPluginEnabled('driver', 'prettier'),
    typescript: tool.isPluginEnabled('driver', 'typescript'),
  }),
  ignore: getIgnoreList(),
};
