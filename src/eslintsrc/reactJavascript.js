module.exports = `module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:unicorn/recommended'
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'prettier',
    'jsx-a11y'
  ],
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
    ]
  }
}`
