export interface WebpackOptions {
  analyzeBundle?: boolean;
  buildFolder?: string;
  port?: string | number;
  react?: boolean;
  sourceMaps?: boolean;
  srcFolder: string;
  entryPoint?: string;
}
