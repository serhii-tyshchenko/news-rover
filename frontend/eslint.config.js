import prettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  globalIgnores([
    'node_modules',
    'dist',
    'build',
    'storybook-static',
    'coverage',
    'public',
  ]),
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  prettier,
];
