import { TypeScriptConfig } from '@beemo/driver-typescript';
// Keep in sync with the `tsconfig.options.json` file in this package.
export interface TypeScriptOptions {
  buildFolder: string;
  includeTests?: boolean;
  library?: boolean;
  next?: boolean;
  node?: boolean;
  react?: boolean;
  srcFolder: string;
  testFolder: string;
  typesFolder: string;
  workspaces?: string[];
}

export function getCompilerOptions({
  library = false,
  next = false,
  node = false,
  react = false,
}: Partial<TypeScriptOptions>) {
  const options: TypeScriptConfig['compilerOptions'] = {
    allowSyntheticDefaultImports: true,
    declaration: library,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    isolatedModules: next && !library,
    jsx: 'preserve',
    lib: ['dom', 'esnext'],
    module: node ? 'commonjs' : 'esnext',
    moduleResolution: 'node',
    noEmitOnError: true,
    noImplicitReturns: true,
    noUnusedLocals: true,
    // We want to resolve json modules
    resolveJsonModule: true,
    pretty: true,
    removeComments: false,
    strict: true,
    target: next || node ? 'es2018' : 'es2015',
    // Use define in development for spec accuracy,
    // but omit in production for smaller file sizes.
    useDefineForClassFields: next && process.env.NODE_ENV === 'development',
  };

  if (react) {
    options.jsx = 'react';
  }

  return options;
}

export function getConfig(options: TypeScriptOptions): TypeScriptConfig {
  const config = {
    compilerOptions: getCompilerOptions(options),
    include: [`./${options.srcFolder}/**/*`, `./${options.typesFolder}/**/*`],
    exclude: ['**/node_modules/*'],
  };

  if (options.includeTests) {
    config.include.push(`./${options.testFolder}/**/*`);
  }

  if (options.library) {
    config.compilerOptions.declarationDir = `./${options.buildFolder}`;
  }

  config.compilerOptions.outDir = `./${options.buildFolder}`;

  return config;
}

export function getConfigWithProjectRefs(options: Partial<TypeScriptOptions>): TypeScriptConfig {
  const config = {
    compilerOptions: getCompilerOptions(options),
    files: [],
    references: [],
  };

  config.compilerOptions.composite = true;
  config.compilerOptions.declarationMap = true;

  return config;
}