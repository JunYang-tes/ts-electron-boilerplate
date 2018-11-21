const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(
  base,
  {
    entry: path.resolve(__dirname,'src/render/index.ts'),
    target:'electron-renderer',
    output: {
      filename:'render.js'
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: path.resolve(
          __dirname,
          './src/render/index.html'
        )
      })
    ]
  }
)