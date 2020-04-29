# TypeScript Config

Factory functions for creating preset [TypeScript](https://www.typescriptlang.org/) configurations.
Primarily used in unison with the [Lumos](https://www.npmjs.com/package/@rajzik/lumos) CLI.

## Extending config

**Update package.json:**

```json
{
  "lumos": {
    "typescript": {
      "allowSyntheticDefaultImports": true
    }
  }
}
```

**Create file in configs folder:**

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
  aliasPattern?: string;
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
  aliasPattern = '~/*',
}
```

### CLI Options

- `--[no-]clean`
  - clean the target `outDir` before transpiling. Defaults to `true`.
- `--reference-workspaces` / `--reference-workspaces=<string>`
  - automatically generate project references based on workspace dependency graph. Defaults to
    `false`.
- `--emitDeclarationOnly`
  - emit d.ts files only
- `--noEmit`
  - include tests
- `--buildFolder=<string>`
  - sets build folder
- `--srcFolder=<string>`
  - sets src folder
- `--testsFolder=<string>`
  - sets tests folder
- `--typesFolder=<string>`
  - sets types folder

**Example:**

```bash
lumos typescript --emitDeclarationOnly --typesFolder=types
```

### [Beemo/typescript](https://milesj.gitbook.io/beemo/driver/typescript)
