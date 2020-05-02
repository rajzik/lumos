# Next Config

Factory functions for creating preset [Next](https://nextjs.org/) configurations. Primarily used in
unison with the [Lumos](https://www.npmjs.com/package/@rajzik/lumos) CLI.

## Extending config

**Update package.json:**

```json
{
  "lumos": {
    "next": {
      "target": "serverless"
    }
  }
}
```

**Create file in configs folder:**

`configs/next.js`

```js
// TBD
modules.exports = {
  target: 'serverless',
};
```

`configs/next.js`

```js
modules.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    };
  }

  return {
    /* config options for all phases except development here */
  };
};
```

## Settings

### Main settings

```ts
interface NextOptions {
  analyzeBundle?: boolean;
  buildFolder?: string;
  root?: string;
  target?: 'server' | 'serverless' | 'experimental-serverless-trace';
  srcFolder: string;
  aliasPattern: string;
}
```

### Default values

```ts
{
  analyzeBundle = false,
  root = WEBPACK_ROOT,
  buildFolder = '.next',
  target = 'server',
  srcFolder = 'src',
  aliasPattern = '~/*',
  nextOptions = {},
}
```

### ENV Options

- `LUMOS_BUILD_FOLDER=<string>`

  - define build folder for current build

  ```sh
  cross-env LUMOS_BUILD_FOLDER = 'build' lumos next build
  ```

- `LUMOS_SRC_FOLDER=<string>`

  - define src folder for current build

  ```sh
  cross-env LUMOS_SRC_FOLDER='src' lumos next build
  ```

- `LUMOS_TARGET=<server|serverless|experimental-serverless-trace>`

  - Define target for current build

  ```sh
    cross-env LUMOS_TARGET='server' lumos next build
  ```
