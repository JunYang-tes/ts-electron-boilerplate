const merge = require('webpack-merge')
const base = require('./webpack.base.main')
const devBase = require('./webpack.dev')('webpack-main', process.MESSAGE_PORT || 9527)
const path = require('path')

module.exports = merge(
  base,
  devBase,
  {
    devtool: 'cheap-eval-source-map',
    watch:true,
    watchOptions:{
      ignored:[
        'node_modules',
      ]
    }
  }
)