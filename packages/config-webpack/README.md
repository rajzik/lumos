# Webpack Config

Provides Webpack dependencies and configuration. Primarily used in unison with the
[Lumos](https://www.npmjs.com/package/@rajzik/lumos) CLI.

## Extending config

__Create file in configs folder:__

`configs/babel.js`

```js
modules.exports = {
  plugins: [
    new webpack.NamedChunksPlugin(),
  ],
};
```

## Settings

### Main settings

```ts
interface WebpackOptions {
  analyzeBundle?: boolean;
  buildFolder?: string;
  port?: string | number;
  react?: boolean;
  sourceMaps?: boolean;
  srcFolder: string;
  entryPoint?: string;
}
```

### Default values

```ts
{
  analyzeBundle = false,
  buildFolder = 'build',
  port = 3000,
  react = false,
  sourceMaps = false,
  srcFolder = 'src',
}
```

### Options

- analyzeBundle
  - Enable/Disable bundle analyze
- buildFolder
  - Defines build folder
- port
  - Defines port
- react
  - Enable/Disable react usage
- sourceMaps
  - Enable/Disable source map generation
- srcFolder
  - Defines source code folder
- entryPoint
  - Defines file which will be acting as entry point instead of index.html
