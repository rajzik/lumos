# Lumos

Centralized CLI for JavaScript and TypeScript dev tools.
[Built on and powered by Beemo](https://github.com/beemojs/beemo).

## Usage

### Prerequisites

- package.json
- install @rajzik/lumos

Setup initial project with this package.

```bash
npx lumos-setup
```

## Eject files

This will eject files and remove dependency of this package.

```bash
npx lumos-eject
```

## Scaffold dotfile

```bash
npx lumos scaffold project dotfiles
```

## Create configs

```bash
npx lumos create-config
```

## Supported drivers

- babel
- prettier
- eslint
- typescript
- webpack
- jest

### Set drivers manually

```json
{

  "lumos": {
    "drivers": [
      "babel",
      "eslint"
    ]
  }
}
```

## Supported settings

```ts
export interface LumosSettings {
  buildFolder: string;
  coverage: number;
  docsFolder: string;
  env: LumosEnvSetting;
  graphql: boolean;
  library: boolean;
  next: boolean;
  node: boolean;
  testingLibrary: boolean;
  react: boolean;
  srcFolder: string;
  testsFolder: string;
  typesFolder: string;
  entryPoint?: string;
}
```

### Default values

```ts
{
  buildFolder: 'lib',
  coverage: 75,
  docsFolder: 'docs',
  env: {},
  graphql: false,
  library: false,
  next: false,
  node: false,
  react: false,
  testingLibrary: false,
  srcFolder: 'src',
  testsFolder: 'tests',
  typesFolder: 'types',
}
```

### Edit this settings

in package json

```json
{
  "lumos": {
    "settings": {
      "buildFolder": "lib",
      "coverage": 75
    }
  }
}

```

## Modifying configs

### Modify package.json

```json
{
  "lumos": {
    "eslint": { // name of the driver
      "rules": {
        "import/prefer-default-export": "off"
      }
    }
  }
}
```

### Create file in `configs` folder

Create javascript file inside this folder with name of driver.
For example: `configs/eslint.js`

```js
module.exports = {
  rules: {
    'import/prefer-default-export': 'off',
  },
};
```

## Rest of documentation

[Beemo docs](https://milesj.gitbook.io/beemo/)
