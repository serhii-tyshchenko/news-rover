/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    coverage: {
      exclude: [
        '.husky/',
        '.vscode/',
        'build/',
        'coverage/',
        'node_modules/',
        'public/',
        'dist/',
        'src/setupTests.ts',
        '**/*.config.{js,ts,mjs,mts}',
        '**/*.d.{ts,tsx}',
        '**/*.stories.{js,jsx,ts,tsx}',
      ],
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
});
