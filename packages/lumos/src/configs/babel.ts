// @ts-check

import { getConfig } from '@rajzik/config-babel';
import { getSettings } from '@rajzik/lumos-common';

const { context, tool } = process.beemo;
const { graphql, library, next, node, react, env } = getSettings();

module.exports = getConfig({
  env,
  esm: !!(context.args.esm || process.env.ESM),
  graphql,
  library,
  next,
  node,
  react,
  typescript: tool.isPluginEnabled('driver', 'typescript'),
});
