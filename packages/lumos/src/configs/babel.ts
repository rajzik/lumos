import { getConfig, getNextConfig } from '@rajzik/config-babel';
import { getSettings } from '@rajzik/lumos-common';

const { context, tool } = process.beemo;
const {
  graphql,
  library,
  next,
  node,
  react,
  env,
  emptyBabelConfig: empty,
  srcFolder,
} = getSettings();

export = tool.isPluginEnabled('driver', 'next')
  ? getNextConfig({
      graphql,
      next,
      react,
      typescript: tool.isPluginEnabled('driver', 'typescript'),
      srcFolder,
    })
  : getConfig({
      env,
      esm: !!(context.args.esm || process.env.ESM),
      graphql,
      library,
      next,
      node,
      react,
      typescript: tool.isPluginEnabled('driver', 'typescript'),
      empty,
      srcFolder,
    });
