/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export const NUMBER_REGEX = /^(0-9)*/;

export const INVALID_CHARS = /([/@\-\W])/g;

export const POSTCSS_SETTING = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        [
          'postcss-preset-env',
          {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          },
        ],
      ],
    },
  },
};
