import { getConfig } from '@rajzik/config-babel';
import { getSettings } from '@rajzik/lumos-common';

const { context, tool } = process.beemo;
const { graphql, library, next, node, react, env, emptyBabelConfig: empty } = getSettings();

export = getConfig({
  env,
  esm: !!(context.args.esm || process.env.ESM),
  graphql,
  library,
  next,
  node,
  react,
  typescript: tool.isPluginEnabled('driver', 'typescript'),
  empty,
});
