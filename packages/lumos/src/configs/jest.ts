import { getConfig } from '@rajzik/config-jest';
import { getSettings } from '@rajzik/lumos-common';

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
