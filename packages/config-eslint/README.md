# ESLint Config

Factory functions for creating preset [ESLint](https://eslint.org) configurations. Primarily used in
unison with the [Lumos](https://www.npmjs.com/package/@rajzik/lumos) CLI.

## Extending config

__Update package.json:__

```json
{
  "lumos": {
    "eslint": {
      "rules": {
        "react-hooks/exhaustive-deps": "off"
      }
    }
  }
}
```

__Create file in configs folder:__

`configs/eslint.js`

```js
modules.exports = {
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
};
```

## Settings

### Main settings

```ts
export interface ESLintOptions {
  next?: boolean;
  node?: boolean;
  prettier?: boolean;
  typescript?: boolean;
}
```

### Default values

```ts
{
  next = false,
  node = false,
  prettier = false,
  typescript = false,
}
```
