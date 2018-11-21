const merge = require('webpack-merge')
const base = require('./webpack.base.main')
const baseProd = require('./webpack.base.prod')

module.exports = merge(
  base,
  baseProd,
  {
    devtool: false,
    mode:'production',
  }
)