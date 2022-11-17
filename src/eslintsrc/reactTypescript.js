module.exports = `module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  overrides: [],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'jsx-a11y'],
  rules: {
    'unicorn/prefer-top-level-await': 'none'
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        jsxSingleQuote: true,
        semi: false,
        trailingComma: 'none'
      }
    ],
    'jsx-a11y/rule-name': 2
  }
}`
