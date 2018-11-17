const merge = require('webpack-merge')
const base = require('./webpack.base.main')

module.exports = merge(
  base,
  {
    devtool: false,
    mode:'production',
  }
)