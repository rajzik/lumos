import { getConfig } from '@rajzik/config-next';
import { getSettings } from '@rajzik/lumos-common';

const { context } = process.beemo;
const { srcFolder, root, aliasPattern, buildFolder, nextTarget, nextOptions } = getSettings();

export = getConfig({
  buildFolder: (context.args.buildFolder as string) || buildFolder,
  analyzeBundle: !!process.env.ANALYZE,
  srcFolder: (context.args.srcFolder as string) || srcFolder,
  target: (context.args.target as typeof nextTarget) || nextTarget,
  root,
  aliasPattern,
  nextOptions,
});
