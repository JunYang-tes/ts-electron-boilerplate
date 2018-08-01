const merge = require('webpack-merge')
const base = require('./webpack.base.render')
const devBase = require('./webpack.dev')('webpack-render', process.env.MESSAGE_PORT || 9527)

module.exports = merge(
  base,
  devBase,
  {
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
  }
)