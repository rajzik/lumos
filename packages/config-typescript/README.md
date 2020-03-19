# TypeScript Config

Factory functions for creating preset [TypeScript](https://www.typescriptlang.org/) configurations.
Primarily used in unison with the [Lumos](https://www.npmjs.com/package/@rajzik/lumos) CLI.

## Extending config

__Update package.json:__

```json
{
  "lumos": {
    "typescript": {
      "allowSyntheticDefaultImports": true
    }
  }
}
```

__Create file in configs folder:__

`configs/typescript.js`

```js
modules.exports = {
  allowSyntheticDefaultImports: true,
};
```

## Settings

### Main settings

```ts
interface BabelOptions {
  library?: boolean;
  next?: boolean;
  node?: boolean;
  react?: boolean;
  emitDeclarationOnly?: boolean;
}
```

### Default values

```ts
{
  library = false,
  next = false,
  node = false,
  react = false,
  emitDeclarationOnly = false,
}
```
