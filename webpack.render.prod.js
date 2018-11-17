const merge = require('webpack-merge')
const base = require('./webpack.base.render')

module.exports = merge(
  base,
  {
    mode:'production',
    devtool: false,
  }
)