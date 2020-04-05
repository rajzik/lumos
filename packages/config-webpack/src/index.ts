/* eslint-disable no-nested-ternary */
import { WebpackConfig } from '@beemo/driver-webpack';
import { ASSET_EXT_PATTERN, EXTS, GQL_EXT_PATTERN, TJSX_EXT_PATTERN } from '@rajzik/lumos-common';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import {
  getESMAliases,
  getParallelValue,
  getPlugins,
  getUniqueName,
  PORT,
  PROD,
  ROOT,
} from './helpers';
import { WebpackOptions } from './types';

export function getConfig({
  analyzeBundle = false,
  buildFolder = 'build',
  port = PORT,
  react = false,
  sourceMaps = false,
  parallel = true,
  root = ROOT,
  publicPath,
  srcFolder,
  entryPoint,
}: WebpackOptions): WebpackConfig {
  const srcPath = path.join(root, srcFolder);
  const internalPublicPath = publicPath ?? path.join(root, buildFolder);
  let entryFiles: Configuration['entry'] = {
    core: [srcPath],
  };
  let output: Configuration['output'] = {
    path: internalPublicPath,
    publicPath: '/',
    filename: PROD ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
    chunkFilename: PROD ? 'assets/[name].[contenthash].chunk.js' : 'assets/[name].[id].js',
    sourceMapFilename: '[file].map',
  };
  const plugins = getPlugins({
    analyzeBundle,
    buildFolder,
    port,
    react,
    sourceMaps,
    entryPoint,
    srcFolder,
  });

  if (entryPoint && PROD) {
    entryFiles = path.join(root, srcFolder, entryPoint);
    output = {
      path: internalPublicPath,
      filename: 'index.js',
      chunkFilename: '[name].[contenthash].chunk.js',
      sourceMapFilename: '[file].map',
      jsonpFunction: getUniqueName(),
    };
  } else if (entryPoint) {
    entryFiles = {
      core: [path.join(root, srcFolder, entryPoint)],
    };
  }

  return {
    mode: PROD ? 'production' : 'development',

    bail: PROD,

    entry: entryFiles,

    context: root,

    plugins,

    module: {
      rules: [
        {
          test: TJSX_EXT_PATTERN,
          include: [srcPath],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              configFile: true,
            },
          },
        },
        {
          test: ASSET_EXT_PATTERN,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'assets/[name].[ext]?[hash:7]',
              publicPath: '/',
            },
          },
        },
        {
          test: GQL_EXT_PATTERN,
          use: {
            loader: 'webpack-graphql-loader',
            options: {
              output: 'document',
              removeUnusedFragments: true,
            },
          },
        },
      ],
    },

    resolve: {
      alias: getESMAliases(),
      extensions: ['.wasm', '.mjs', ...EXTS],
    },

    output,

    devtool: PROD ? (sourceMaps ? 'source-map' : false) : 'cheap-module-source-map',

    // @ts-ignore
    devServer: {
      compress: true,
      contentBase: internalPublicPath,
      disableHostCheck: true,
      headers: {
        'Service-Worker-Allowed': '/',
      },
      historyApiFallback: true,
      hot: true,
      port, // This can be a unix socket path so a string is valid
      watchOptions: {
        ignored: /node_modules/,
      },
    },

    optimization: {
      runtimeChunk: entryPoint && PROD ? false : 'single',
      minimize: PROD,
      minimizer: [
        new TerserPlugin({
          sourceMap: sourceMaps,
          parallel: getParallelValue(parallel),
        }),
      ],
    },

    performance: false,

    stats: !PROD,
  };
}
