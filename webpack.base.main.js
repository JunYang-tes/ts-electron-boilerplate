const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')

module.exports = merge(
  base,
  {
    entry: path.resolve(__dirname,'src/main/index.ts'),
    mode:'development',
    target:'electron-main',
    node: {
      __dirname: false,
      __filename: false
    },
    output: {
      filename:'main.js'
    }
  }
)