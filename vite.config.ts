/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { Alias, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import * as tsconfig from './tsconfig.json';

function readAliasFromTsConfig(): Alias[] {
  const pathReplaceRegex = new RegExp(/\/\*$/, '');
  const root = path.resolve(__dirname, tsconfig.compilerOptions.baseUrl);
  return Object.entries(tsconfig.compilerOptions.paths).reduce(
    (aliases, [fromPaths, toPaths]) => {
      const find = fromPaths.replace(pathReplaceRegex, '');
      const toPath = root + '\\' + toPaths[0].replace(pathReplaceRegex, '');
      const replacement = path.resolve(__dirname, toPath);
      aliases.push({ find, replacement });
      return aliases;
    },
    [] as Alias[]
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: readAliasFromTsConfig(),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
  },
  server: {
    port: 3000,
    open: true,
  },
});
