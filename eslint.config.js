import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(js.configs.recommended, tseslint.configs.recommended, {
  files: ['gulpfile.js', '*.config.js', 'updater.js', 'constants/**/*.js'],
  languageOptions: {
    sourceType: 'commonjs',
    globals: {
      require: 'readonly',
      module: 'writable',
      exports: 'writable',
      process: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
      console: 'readonly',
      Buffer: 'readonly',
    },
  },
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
  },
});
