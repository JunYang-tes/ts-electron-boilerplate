const merge = require('webpack-merge')
const base = require('./webpack.base.render')
const webpack = require('webpack')

module.exports = merge(
  base,
  {
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin()
    ],
  }
)