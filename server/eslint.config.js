/** @type {import("eslint").FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: "module",
      globals: {
        window: true,
        document: true,
      },
    },
    rules: {
      // Твои правила:
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": ["error", { before: false, after: true }],
      "eol-last": ["error", "always"],
      indent: ["error", 2, { MemberExpression: 1 }],
      "no-multiple-empty-lines": ["error"],
      "no-new-symbol": "error",
      "no-trailing-spaces": ["error"],
      "no-undef": "error",
      "no-unused-vars": "warn",
      "object-curly-spacing": ["error", "always"],
      "object-shorthand": "error",
      "prefer-const": "error",
      quotes: ["error", "single"], // двойные кавычки
      semi: ["error", "always"],
      "space-in-parens": ["error", "never"],
      strict: ["error", "never"],
    },
  },
];
