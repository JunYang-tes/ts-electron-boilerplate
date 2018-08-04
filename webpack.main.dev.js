const merge = require('webpack-merge')
const base = require('./webpack.base.main')
const devBase = require('./webpack.dev')('main', process.env.MESSAGE_PORT || 9527)
const path = require('path')
const package = require('./package.json')
const externals = [
  ...(package.depedevDependencies||[]),
  ...(package.dependencies||[])
]

module.exports = merge(
  base,
  devBase,
  {
    devtool: 'cheap-eval-source-map',
    watch:true,
    // externals(id){
    //   console.log("is external",id)
    //   return externals.some(pkg=>id.startsWith(pkg))  
    // },
    watchOptions:{
      ignored:[
        'node_modules',
      ]
    }
  }
)