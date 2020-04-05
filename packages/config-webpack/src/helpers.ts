import { Path } from '@beemo/core';
import { getCommitHash, getPackage } from '@rajzik/lumos-common';
import glob from 'fast-glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack, { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { INVALID_CHARS, NUMBER_REGEX } from './constants';
import { InlineManifestPlugin } from './plugins';
import { WebpackOptions } from './types';

const { WEBPACK_ESM_SCOPES, WEBPACK_ESM_PACKAGES } = process.env;

export const ROOT = process.cwd();
export const PROD = process.env.NODE_ENV === 'production';
export const PORT = 3000;

const esmScopes = ['@ori'];
const esmPackages = ['@ori-*'];

if (WEBPACK_ESM_SCOPES) {
  esmScopes.push(...WEBPACK_ESM_SCOPES.split(','));
}

if (WEBPACK_ESM_PACKAGES) {
  esmPackages.push(...WEBPACK_ESM_PACKAGES.split(','));
}

export interface AliasMap {
  [key: string]: string;
}

export function getESMAliases(): AliasMap {
  const aliases: AliasMap = {};
  const pkg = getPackage();
  const buildTargets = ['lib', 'build', 'dist'];

  glob
    .sync([`node_modules/{${esmScopes.join(',')}}/*`, `node_modules/{${esmPackages.join(',')}}`], {
      absolute: true,
      cwd: ROOT,
      onlyDirectories: true,
      onlyFiles: false,
    })
    .forEach(modulePath => {
      const packageName = modulePath.split('/node_modules/')[1];
      const esLessName = packageName.replace(/-es$/, '');
      const esPath = new Path(modulePath, 'es');
      const esmPath = new Path(modulePath, 'esm');

      // ori-foo/lib -> ori-foo/esm
      // optimal/lib -> optimal/esm
      if (esPath.exists() || esmPath.exists()) {
        const aliasPath = esPath.exists() ? `${packageName}/es` : `${packageName}/esm`;
        const aliased = buildTargets.some(targetFolder => {
          if (new Path(modulePath, targetFolder).exists()) {
            aliases[`${packageName}/${targetFolder}`] = aliasPath;

            return true;
          }

          return false;
        });

        if (!aliased) {
          aliases[`${packageName}$`] = aliasPath;
        }

        // lodash -> lodash-es
      } else if (packageName.endsWith('-es') && pkg.dependencies && pkg.dependencies[esLessName]) {
        aliases[esLessName] = packageName;
      }
    });

  return aliases;
}

let favicon = '';

export function getFavIcon(srcPath: string): string {
  if (favicon) {
    return favicon;
  }

  const prodPath = new Path(srcPath, 'favicon.png');
  const devPath = new Path(srcPath, 'favicon-dev.png');

  if (!PROD && devPath.exists()) {
    favicon = devPath.path();
  } else if (prodPath.exists()) {
    favicon = prodPath.path();
  }

  return favicon;
}

export function getPlugins({
  analyzeBundle,
  srcFolder,
  entryPoint,
}: WebpackOptions): Configuration['plugins'] {
  const srcPath = path.join(ROOT, srcFolder);

  const plugins = [
    new webpack.NamedChunksPlugin(),
    new webpack.EnvironmentPlugin({
      LAZY_LOAD: false,
      RENDER_ENV: 'browser',
      SILENCE_POLYGLOT_WARNINGS: true,
      SENTRY_RELEASE: PROD ? getCommitHash() || 'production' : 'development',
      AMP: false,
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(!PROD),
    }),
  ];

  if (analyzeBundle) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (!PROD) {
    plugins.push(
      new HtmlWebpackPlugin({
        chunks: ['runtime', 'core'],
        chunksSortMode: 'auto', // 'none',
        template: `${srcFolder}/index.html`,
        filename: 'index.html',
        favicon: getFavIcon(srcPath),
      }),
      new webpack.HotModuleReplacementPlugin(),
    );
  }

  if (!entryPoint && PROD) {
    plugins.push(
      new HtmlWebpackPlugin({
        chunks: ['runtime', 'core'],
        chunksSortMode: 'auto', // 'none',
        template: `${srcFolder}/index.html`,
        filename: 'index.html',
        favicon: getFavIcon(srcPath),
      }),
      new InlineManifestPlugin(),
    );
  }
  return plugins;
}

export function getUniqueName() {
  const { name } = getPackage();
  return `_${name.replace(NUMBER_REGEX, '').replace(INVALID_CHARS, '')}`;
}

export function getParallelValue(value: boolean | string | number | undefined): boolean | number {
  if (value === undefined) {
    return true;
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false' || value === '') {
    return false;
  }

  return Number(value || 1);
}
