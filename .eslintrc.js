module.exports = {
  "extends": [
    "./packages/config-eslint/lib/presets/base.js",
    "./packages/config-eslint/lib/presets/typescript.js",
    "./packages/config-eslint/lib/presets/node.js",
    "./packages/config-eslint/lib/presets/prettier.js",
    "prettier/@typescript-eslint"
  ],
  "env": {
    "node": true
  },
  "rules": {
    "import/prefer-default-export": "off",
    "@typescript-eslint/interface-name-prefix": "off"
  }
};