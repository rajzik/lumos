import { ESLintConfig } from '@beemo/driver-eslint';

const config: ESLintConfig = {
  extends: ['plugin:testing-library/react'],
  plugins: ['testing-library'],
};

export = config;
