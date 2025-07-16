/** @type {import("eslint").FlatConfig[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
        Sequelize: 'readonly',
      },
    },
    rules: {
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      'comma-spacing': ['error', { before: false, after: true }],
      'eol-last': ['error', 'always'],
      indent: ['error', 2, { MemberExpression: 1 }],
      'no-multiple-empty-lines': ['error'],
      'no-new-symbol': 'error',
      'no-trailing-spaces': ['error'],
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'object-curly-spacing': ['error', 'always'],
      'object-shorthand': 'error',
      'prefer-const': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      strict: ['error', 'never'],
    },
  },
];
