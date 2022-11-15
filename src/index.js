#!/usr/bin/env node
const program = require('commander')
const exec = require('child_process').exec
const fs = require('fs')
const {
  ESLINT_FILE_NAME,
  ESLINTRC_REACT_JAVASCRIPT,
  PACKAGES_REACT_JAVASCRIPT,
  ESLINTRC_NODE_JAVASCRIPT,
  PACKAGES_NODE_JAVASCRIPT,
  ESLINTRC_REACT_TYPESCRIPT,
  PACKAGES_REACT_TYPESCRIPT,
  PACKAGES_NODE_TYPESCRIPT,
  ESLINTRC_NODE_TYPESCRIPT,
  TEMPLATE
} = require('./utils/constants')
const editTSConfig = require('./utils/editTSConfig')

program.version('1.0.0', '-v, --version', 'output the current version')
program
  .option(
    '-RT, --reactTypescript',
    'ESLint & Prettier Config For React & Typescript'
  )
  .option(
    '-RJ, --reactJavascript',
    'ESLint & Prettier Config For React & Javascript'
  )
  .option(
    '-NT, --nodeTypescript',
    'ESLint & Prettier Config For Node & Typescript'
  )
  .option(
    '-NJ, --nodeJavascript',
    'ESLint & Prettier Config For Node & Javascript'
  )

program.parse(process.argv)

const options = program.opts()

let packagesToInstall = ''
let eslintrc = ''
let action = false

if (options.reactJavascript) {
  packagesToInstall = PACKAGES_REACT_JAVASCRIPT
  eslintrc = ESLINTRC_REACT_JAVASCRIPT
  action = true
} else if (options.nodeJavascript) {
  packagesToInstall = PACKAGES_NODE_JAVASCRIPT
  eslintrc = ESLINTRC_NODE_JAVASCRIPT
  action = true
} else if (options.reactTypescript) {
  packagesToInstall = PACKAGES_REACT_TYPESCRIPT
  eslintrc = ESLINTRC_REACT_TYPESCRIPT
  editTSConfig()
  action = true
} else if (options.nodeTypescript) {
  packagesToInstall = PACKAGES_NODE_TYPESCRIPT
  eslintrc = ESLINTRC_NODE_TYPESCRIPT
  action = true
} else {
  console.error(TEMPLATE)
  action = false
}
if (action) {
  exec(packagesToInstall, (error, stdout, stderr) => {
    if (error) return console.error(`Error: ${error}`)
    if (stderr) return console.error(`Stderr: ${stderr}`)
    console.log(`Created succesfully 🔥`)
  })
  fs.writeFile(ESLINT_FILE_NAME, eslintrc, (err) => {
    if (err) console.error(`Error: ${err}`)
  })
}
