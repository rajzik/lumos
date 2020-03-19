# Jest Config

Factory functions for creating preset [Jest](https://jestjs.io/) configurations. Primarily used in
unison with the [Lumos](https://www.npmjs.com/package/@rajzik/lumos) CLI.

## Extending config

__Update package.json:__

```json
{
  "lumos": {
    "jest": {
      "setupFilesAfterEnv": [
        "@testing-library/jest-dom/extend-expect"
      ]
    }
  }
}
```

__Create file in configs folder:__

`configs/eslint.js`

```js
modules.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
```

## Settings

### Main settings

```ts
export interface JestOptions {
  graphql?: boolean;
  react?: boolean;
  node?: boolean;
  srcFolder: string;
  testsFolder: string;
  threshold?: number;
  workspaces?: string[];
  testingLibrary?: boolean;
}
```

### Default values

```ts
{
  graphql = false,
  react = false,
  node = false,
  srcFolder,
  testsFolder,
  threshold = 40,
  workspaces = [],
  testingLibrary = false,
}
```
