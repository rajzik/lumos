import './test.css';

import mod from './test.module.css';

// eslint-disable-next-line no-console
console.log(mod);

// eslint-disable-next-line no-console
console.log('Webpack build test!');

import('./module').then(module => module.default());

// eslint-disable-next-line no-undef
document.getElementById('test').classList.add(mod.another);

const test = {
  test: '1234',
  asfg: 1234,
};

const c = { ...test, ...{ sup: 'mate' } };

// eslint-disable-next-line no-console
console.log(c);
