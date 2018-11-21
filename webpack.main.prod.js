const merge = require('webpack-merge')
const base = require('./webpack.base.main')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(
  base,
  {
    devtool: false,
    plugins:[new UglifyJSPlugin()],
    mode:'production',
  }
)