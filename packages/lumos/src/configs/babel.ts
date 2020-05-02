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
  aliasPattern,
} = getSettings();

export = tool.isPluginEnabled('driver', 'next')
  ? getNextConfig({
      env,
      graphql,
      next,
      react,
      srcFolder,
      aliasPattern,
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
      aliasPattern,
    });
