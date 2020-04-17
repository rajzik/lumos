import { BabelConfig } from '@beemo/driver-babel';
import { IGNORE_PATHS, LumosEnvSetting, NODE_TARGET, WEB_TARGET } from '@rajzik/lumos-common';

interface BabelOptions {
  env?: LumosEnvSetting;
  esm?: boolean;
  graphql?: boolean;
  library?: boolean;
  next?: boolean;
  node?: boolean;
  react?: boolean;
  typescript?: boolean;
  empty?: boolean;
}

export function getConfig({
  env = {},
  esm = false,
  graphql = false,
  library = false,
  next = false,
  node = false,
  react = false,
  typescript = false,
  empty = false,
}: BabelOptions): BabelConfig {
  if (empty) {
    return {};
  }

  const envOptions = {
    loose: true,
    modules: esm ? false : 'commonjs',
    shippedProposals: next,
    targets: node ? NODE_TARGET : WEB_TARGET,
    ...env,
  };
  const presets: NonNullable<BabelConfig['presets']> = [['@babel/preset-env', envOptions]];
  const plugins: NonNullable<BabelConfig['plugins']> = [
    ['babel-plugin-transform-dev', { evaluate: false }],
    '@babel/plugin-transform-runtime',
  ];

  // Flags
  let useNext = next;
  let removePropTypes = false;

  switch (process.env.NODE_ENV) {
    case 'test': {
      envOptions.modules = 'commonjs';
      envOptions.targets = { node: 'current' };
      plugins.push('babel-plugin-dynamic-import-node');
      break;
    }

    case 'development': {
      if (react) {
        plugins.push(
          '@babel/plugin-transform-react-jsx-source',
          '@babel/plugin-transform-react-jsx-self',
        );
      }
      break;
    }

    case 'production':
    default: {
      if (!library && react) {
        plugins.push([
          'babel-plugin-transform-react-remove-prop-types',
          {
            mode: 'remove',
            removeImport: true,
            additionalLibraries: ['airbnb-prop-types'],
            ignoreFilenames: ['node_modules'],
          },
        ]);

        removePropTypes = true;
      }
      break;
    }
  }

  if (graphql) {
    plugins.push('babel-plugin-graphql-tag');
  }

  if (react) {
    presets.push('@babel/preset-react');
  }

  if (typescript) {
    useNext = true;
    presets.push('@babel/preset-typescript');

    if (!removePropTypes) {
      plugins.push('babel-plugin-typescript-to-proptypes');
    }
  }

  if (useNext) {
    plugins.push(
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-namespace-from',
    );
  }

  return {
    ignore: [...IGNORE_PATHS, '__tests__', '__mocks__'],
    plugins,
    presets,
  };
}
