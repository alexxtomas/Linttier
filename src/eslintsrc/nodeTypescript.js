module.exports = `
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": ["standard-with-typescript", "prettier"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "prettier/prettier": 2,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-misused-promises": 0
  }
}
`
