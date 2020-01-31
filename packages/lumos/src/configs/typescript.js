// @ts-check

const { getConfig, getConfigWithProjectRefs } = require('@rajzik/config-typescript');
const { getSettings } = require('@rajzik/lumos-common');

const { context } = process.beemo;
const { buildFolder, srcFolder, testFolder, typesFolder, node, react, library } = getSettings();

module.exports = context.args.referenceWorkspaces
  ? getConfigWithProjectRefs({
      node,
      react,
    })
  : getConfig({
      buildFolder,
      includeTests: !!context.args.noEmit,
      library,
      node,
      react,
      srcFolder,
      testFolder,
      typesFolder,
      workspaces: context.workspaces,
    });
