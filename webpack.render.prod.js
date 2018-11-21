const merge = require('webpack-merge')
const base = require('./webpack.base.render')
const baseProd = require('./webpack.base.prod')

module.exports = merge(
  base,
  baseProd,
  {
    mode:'production',
    devtool: false,
  }
)