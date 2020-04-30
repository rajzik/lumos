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
  nextOptions?: Partial<NextConfigObject>;
}

export function getConfig({
  analyzeBundle = false,
  root = WEBPACK_ROOT,
  buildFolder = '.next',
  target = 'server',
  srcFolder = 'src',
  aliasPattern,
  nextOptions = {},
}: NextOptions): NextConfig {
  const options: NextConfigObject = mergeConfig(
    {
      distDir: buildFolder,
      target,
      webpack: config => {
        return mergeConfig(config, {
          resolve: {
            alias: {
              [aliasPattern.replace(/[*/]/, '')]: path.join(root, srcFolder, '/'),
              ...getESMAliases(),
            },
          },
        });
      },
    },
    nextOptions,
  );

  if (analyzeBundle) {
    return bundleAnalyzer({
      enabled: analyzeBundle,
    })(options);
  }

  return options;
}
