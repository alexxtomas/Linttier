module.exports = `
{
  "env": {
    "node": true,
    "es2021": true
  },
  "extends": [
    "plugin:prettier/recommended",
    "standard"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "prettier",
  ],
  "rules": {
    "prettier/prettier": 2
  }
}`
