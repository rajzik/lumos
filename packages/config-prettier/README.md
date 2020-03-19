# Prettier Config

Factory functions for creating preset [Prettier](https://prettier.io/) configurations. Primarily
used in unison with the [Lumos](https://www.npmjs.com/package/@rajzik/lumos) CLI.

## Extending config

__Update package.json:__

```json
{
  "lumos": {
    "prettier": {
      "arrowParens": "avoid"
    }
  }
}
```

__Create file in configs folder:__

`configs/prettier.js`

```js
modules.exports = {
  arrowParens: 'avoid',
};
```

## Default config

```js
{
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
}
```
