// @ts-check

export const EXTS = ['.ts', '.tsx', '.js', '.jsx', '.json'];

export const EXTS_GROUP = '{ts,tsx,js,jsx}';

export const TJSX_EXT_PATTERN = /\.m?(t|j)sx?$/;

export const ASSET_EXT_PATTERN = /\.(ttf|eot|otf|svg|woff|woff2|mp3|png|jpg|jpeg|gif|ico|css|scss)$/;

export const GQL_EXT_PATTERN = /\.(gql|graphql)$/;

export const IGNORE_PATHS = [
  'coverage/',
  'node_modules/',
  'public/',
  'esm/',
  'lib/',
  'tmp/',
  'dist/',
  'build/',
  'configs/',
  '*.d.ts',
];

export const NODE_VERSION = '12.16';

export const NODE_TARGET = { node: NODE_VERSION };

export const WEB_TARGET = { ie: 11 };

export const TESTING_LIBRARY_DEPS = ['@testing-library/jest-dom', '@testing-library/react'];

export const SCAFFOLD_DEPS = [
  '@rajzik/conventional-changelog-lint-config-beemo',
  '@commitlint/cli',
  'husky',
];
