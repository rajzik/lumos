/* eslint-disable no-nested-ternary */
import { WebpackConfig } from '@beemo/driver-webpack';
import {
  ASSET_EXT_PATTERN,
  EXTS,
  getCommitHash,
  GQL_EXT_PATTERN,
  TJSX_EXT_PATTERN,
} from '@rajzik/lumos-common';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// @ts-ignore Not typed
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack, { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { getESMAliases, getFavIcon, PORT, PROD, ROOT } from './helpers';

export interface WebpackOptions {
  analyzeBundle?: boolean;
  buildFolder?: string;
  port?: string | number;
  react?: boolean;
  sourceMaps?: boolean;
  srcFolder: string;
  entry?: string;
}

export function getConfig({
  analyzeBundle = false,
  buildFolder = 'build',
  port = PORT,
  react = false,
  sourceMaps = false,
  entry = 'index.tsx',
  srcFolder,
}: WebpackOptions): WebpackConfig {
  const srcPath = path.join(ROOT, srcFolder);
  const publicPath = path.join(ROOT, buildFolder);
  let entryFiles: Configuration['entry'] = {
    core: [srcPath],
  };
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
  ].filter(Boolean);

  if (analyzeBundle) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (!PROD) {
    plugins.push(
      new HtmlWebpackPlugin({
        chunks: ['runtime', 'core'],
        chunksSortMode: 'none',
        template: `${srcFolder}/index.html`,
        filename: 'index.html',
        favicon: getFavIcon(srcPath),
      }),
    );
  }

  if (PROD) {
    plugins.push(
      // Inline the runtime chunk to enable long-term caching
      new InlineManifestWebpackPlugin(),
    );
    entryFiles = path.join(ROOT, srcFolder, entry);
  } else if (react) {
    plugins.push(
      // Enable hot module replacement
      new webpack.HotModuleReplacementPlugin(),
    );
  }

  return {
    mode: PROD ? 'production' : 'development',

    bail: PROD,

    entry: entryFiles,

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

    output: {
      path: publicPath,
      filename: PROD ? '[name].js' : 'assets/[name].js',
      chunkFilename: PROD ? '[name].[contenthash].chunk.js' : 'assets/[name].[id].js',
      sourceMapFilename: '[file].map',
    },

    devtool: PROD ? (sourceMaps ? 'source-map' : false) : 'cheap-module-source-map',

    // @ts-ignore
    devServer: {
      compress: true,
      contentBase: publicPath,
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
      runtimeChunk: 'single',
      minimize: PROD,
      minimizer: [
        new TerserPlugin({
          sourceMap: sourceMaps,
        }),
      ],
    },

    performance: false,

    stats: !PROD,
  };
}
