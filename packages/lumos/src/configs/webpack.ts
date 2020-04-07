/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { getConfig } from '@rajzik/config-webpack';
import { getSettings } from '@rajzik/lumos-common';

const { srcFolder, react, entryPoint, publicPath, root, buildFolder } = getSettings();

export = getConfig({
  analyzeBundle: !!process.env.WEBPACK_ANALYZE,
  parallel: process.env.WEBPACK_PARALLEL,
  port: process.env.PORT,
  react,
  sourceMaps: !!process.env.SOURCE_MAPS,
  buildFolder: process.env.LUMOS_BUILD_FOLDER || buildFolder,
  srcFolder,
  entryPoint: process.env.LUMOS_ENTRY_POINT || entryPoint,
  publicPath,
  root,
});
