const ESLINT_FILE_NAME = '.eslintrc'

// * React JavaScript
const ESLINTRC_REACT_JAVASCRIPT = require('../eslintsrc/reactJavascript')
const PACKAGES_REACT_JAVASCRIPT = require('../commands/reactJavascript')

// * Node JavaScript
const ESLINTRC_NODE_JAVASCRIPT = require('../eslintsrc/nodeJavascript')
const PACKAGES_NODE_JAVASCRIPT = require('../commands/nodeJavascript')

// * React Typescript
const ESLINTRC_REACT_TYPESCRIPT = require('../eslintsrc/reactTypescript')
const PACKAGES_REACT_TYPESCRIPT = require('../commands/reactTypescript')

// * Node Typescript
const ESLINTRC_NODE_TYPESCRIPT = require('../eslintsrc/nodeTypescript')
const PACKAGES_NODE_TYPESCRIPT = require('../commands/nodeTypescript')

// * TEMPLATE
const TEMPLATE = `
  USAGE: 
        Linttier 
              -RJ    Prettier and ESLint config for React & Javascript
              -NJ    Prettier and ESLint config for Node & Javascript
              -RT    Prettier and ESLint config for React & Typescript
              -NT    Prettier and ESLint config for Node & Typescript
`

module.exports = {
  ESLINT_FILE_NAME,
  ESLINTRC_REACT_JAVASCRIPT,
  PACKAGES_REACT_JAVASCRIPT,
  ESLINTRC_NODE_JAVASCRIPT,
  PACKAGES_NODE_JAVASCRIPT,
  ESLINTRC_REACT_TYPESCRIPT,
  PACKAGES_REACT_TYPESCRIPT,
  ESLINTRC_NODE_TYPESCRIPT,
  PACKAGES_NODE_TYPESCRIPT,
  TEMPLATE
}
