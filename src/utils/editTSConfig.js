const fs = require('fs')
const { ESLINT_FILE_NAME } = require('../utils/constants')

const editTSConfig = () => {
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
