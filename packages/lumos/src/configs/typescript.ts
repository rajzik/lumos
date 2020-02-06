import { getConfig, getConfigWithProjectRefs } from '@rajzik/config-typescript';
import { getSettings } from '@rajzik/lumos-common';

const { context } = process.beemo;
const { buildFolder, srcFolder, testFolder, typesFolder, node, react, library } = getSettings();

export = context.args.referenceWorkspaces
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
      emitDeclarationOnly: !!context.args.emitDeclarationOnly,
    });
