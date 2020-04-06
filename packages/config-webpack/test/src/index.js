import './test.css';

import mod from './test.module.css';

// eslint-disable-next-line no-console
console.log(mod);

// eslint-disable-next-line no-console
console.log('Webpack build test!');

import('./module').then(module => module.default());
