import { getConfig, getConfigWithProjectRefs } from '@rajzik/config-typescript';
import { getSettings } from '@rajzik/lumos-common';

const { context } = process.beemo;
const { buildFolder, srcFolder, testsFolder, typesFolder, node, react, library } = getSettings();

export = context.args.referenceWorkspaces
  ? getConfigWithProjectRefs({
      node,
      react,
    })
  : getConfig({
      buildFolder: (context.args.buildFolder as string) || buildFolder,
      includeTests: !!context.args.noEmit,
      library,
      node,
      react,
      srcFolder: (context.args.srcFolder as string) || srcFolder,
      testsFolder: (context.args.testsFolder as string) || testsFolder,
      typesFolder: (context.args.typesFolder as string) || typesFolder,
      workspaces: context.workspaces,
      emitDeclarationOnly: !!context.args.emitDeclarationOnly,
    });
