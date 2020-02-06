import { getConfig } from '@rajzik/config-webpack';
import { getSettings } from '@rajzik/lumos-common';

const { srcFolder, react, entryPoint } = getSettings();

const { context } = process.beemo;

export = getConfig({
  analyzeBundle: !!process.env.WEBPACK_ANALYZE,
  port: process.env.PORT,
  react,
  sourceMaps: !!process.env.SOURCE_MAPS,
  srcFolder,
  entryPoint: (context.args.entryPoint as string) || entryPoint,
});
