module.exports = `
  "env": {
    "browser": true,
    "es2021": true
  },
  ext"ends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  "overrides": [],
  "parserOptions": {
    "project": "tsconfig.json",
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "prettier", "jsx-a11y"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": 2
  }
`
