# Webpack Config

Provides Webpack dependencies and configuration. Primarily used in unison with the
[Lumos](https://www.npmjs.com/package/@rajzik/lumos) CLI.

## Extending config

**Create file in configs folder:**

`configs/babel.js`

```js
modules.exports = {
  plugins: [new webpack.NamedChunksPlugin()],
};
```

## Settings

### Main settings

```ts
export interface WebpackOptions {
  analyzeBundle?: boolean;
  buildFolder?: string;
  port?: string | number;
  parallel?: boolean | string | number;
  root?: string;
  react?: boolean;
  sourceMaps?: boolean;
  publicPath?: string;
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
  publicPath = '/',
  root = process.cwd(),
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
- publicPath
  - Defined path where to get scripts
  - useful values: '/', './'
- parallel
  - Settings for terser plugin
  - fast AF boii

### [Beemo/webpack](https://milesj.gitbook.io/beemo/driver/webpack)
