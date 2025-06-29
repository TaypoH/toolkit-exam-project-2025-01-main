import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jestPlugin from 'eslint-plugin-jest';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // Эквивалент browser: true
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',

        // Эквивалент jest: true
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        test: 'readonly',

        // если используешь React без импорта
        React: 'writable',
      },
    },
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      jest: jestPlugin,
    },
    rules: {
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
      'import/no-unresolved': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
