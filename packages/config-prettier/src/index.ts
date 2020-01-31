import { PrettierConfig } from '@beemo/driver-prettier';
import { IGNORE_PATHS } from '@rajzik/lumos-common';

export function getConfig(): PrettierConfig {
  return {
    arrowParens: 'avoid',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    printWidth: 100,
    proseWrap: 'always',
    requirePragma: false,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
  };
}

export function getIgnoreList(): string[] {
  return [
    ...IGNORE_PATHS,
    'lerna.json',
    'npm-shrinkwrap.json',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'tsconfig.eslint.json',
    'tsconfig.options.json',
    'azure-pipelines.yml',
    'CHANGELOG.md',
    'jest.config.js',
    'babel.config.js',
    'webpack.config.js',
  ];
}
