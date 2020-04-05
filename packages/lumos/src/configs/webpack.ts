import { getConfig } from '@rajzik/config-webpack';
import { getSettings } from '@rajzik/lumos-common';

const { srcFolder, react, entryPoint, publicPath, root, buildFolder } = getSettings();

export = getConfig({
  analyzeBundle: !!process.env.WEBPACK_ANALYZE,
  parallel: process.env.WEBPACK_PARALLEL,
  port: process.env.PORT,
  react,
  sourceMaps: !!process.env.SOURCE_MAPS,
  buildFolder,
  srcFolder,
  entryPoint,
  publicPath,
  root,
});
