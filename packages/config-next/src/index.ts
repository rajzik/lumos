/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import bundleAnalyzer from '@next/bundle-analyzer';
import { getESMAliases, WEBPACK_ROOT } from '@rajzik/lumos-common';
import { NextConfig, NextConfigObject } from 'beemo-driver-next';
import path from 'path';
import { mergeConfig } from './helpers';

interface NextOptions {
  analyzeBundle?: boolean;
  buildFolder?: string;
  root?: string;
  target?: NextConfigObject['target'];
  srcFolder: string;
  aliasPattern: string;
}

export function getConfig({
  analyzeBundle = false,
  root = WEBPACK_ROOT,
  buildFolder = '.next',
  target = 'server',
  srcFolder = 'src',
  aliasPattern,
}: NextOptions): NextConfig {
  const options: NextConfigObject = {
    distDir: buildFolder,
    target,
    webpack: config => {
      return mergeConfig(config, {
        resolve: {
          alias: {
            [`${aliasPattern}`]: `${path.join(root, srcFolder, '/')}`,
            [`${aliasPattern}(.+)`]: `${path.join(root, srcFolder)}/\\1`,
            [`${aliasPattern}/(.+)`]: `${path.join(root, srcFolder)}/\\1`,
            ...getESMAliases(),
          },
        },
      });
    },
  };

  if (analyzeBundle) {
    return bundleAnalyzer({
      enabled: analyzeBundle,
    })(options);
  }

  return options;
}
