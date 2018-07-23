const merge = require('webpack-merge')
const base = require('./webpack.base.render')
const path = require('path')

module.exports = merge(
  base,
  {
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
  }
)