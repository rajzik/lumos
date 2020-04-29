import { getConfig } from '@rajzik/config-jest';
import { getSettings } from '@rajzik/lumos-common';

const {
  coverage,
  graphql,
  react,
  srcFolder,
  testsFolder,
  node,
  testingLibrary,
  aliasPattern,
} = getSettings();

export = getConfig({
  srcFolder,
  testsFolder,
  graphql,
  react,
  node,
  threshold: coverage,
  workspaces: process.beemo.tool.getWorkspacePaths({ relative: true }),
  testingLibrary,
  aliasPattern,
});
