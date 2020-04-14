/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';

export const NUMBER_REGEX = /^(0-9)*/;

export const INVALID_CHARS = /([/@\-\W])/g;

export const POSTCSS_SETTING = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      postcssFlexbugsFixes,
      postcssPresetEnv({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
    ],
  },
};

export const POSTCSS_SETTING_PROD = {
  ...POSTCSS_SETTING,
  options: {
    ...POSTCSS_SETTING.options,
    cssnano: {},
  },
};
