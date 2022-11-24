const fs = require('fs')
const { ESLINT_FILE_NAME } = require('../utils/constants')
const tsConfig = require('../tsconfigs/node')

const editTSConfig = (FOR) => {
  if (FOR === 'node') {
    fs.writeFile('./tsconfig.json', tsConfig, (err) => {
      if (err) console.error(err)
    })
    return
  }
  fs.readFile('./tsconfig.json', (err, data) => {
    if (err) return console.error(`Error: ${err}`)
    const tsconfig = JSON.parse(data.toString())
    if (!tsconfig.include) tsconfig.include = [ESLINT_FILE_NAME]
    else tsconfig.include = [...tsconfig.include, ESLINT_FILE_NAME]

    fs.writeFile('./tsconfig.json', JSON.stringify(tsconfig), (err) => {
      console.error(`Error: ${err}`)
    })
  })
}

module.exports = editTSConfig
