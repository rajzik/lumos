// @ts-check

const { getConfig } = require('@rajzik/config-jest');
const { getSettings } = require('@rajzik/lumos-common');

const { coverage, graphql, react, srcFolder, testFolder, node } = getSettings();

module.exports = getConfig({
  srcFolder,
  testFolder,
  graphql,
  react,
  node,
  threshold: coverage,
  workspaces: process.beemo.tool.getWorkspacePaths({ relative: true }),
});
