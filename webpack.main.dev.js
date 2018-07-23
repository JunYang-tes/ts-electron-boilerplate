const merge = require('webpack-merge')
const base = require('./webpack.base.main')
const path = require('path')
const {ProgressPlugin} = require('webpack')
const ProgressHook = new ProgressPlugin((p,msg)=>{
  console.log(p,msg)
})

module.exports = merge(
  base,
  {
    devtool: 'cheap-eval-source-map',
    watch:true,
    watchOptions:{
      ignored:[
        'node_modules',
      ]
    },
    plugins:[
      ProgressHook
    ]
  }
)