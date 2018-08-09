const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const package = require('./package.json')
const externals = [
  ...(Object.keys(package.devDependencies||{})),
  ...(Object.keys(package.dependencies||{}))
].reduce((ret,next)=>{
  ret[next]="commonjs "+next
  return ret
},{})

module.exports = merge(
  base,
  {
    entry: path.resolve(__dirname,'src/main/index.ts'),
    mode:'development',
    target:'electron-main',
    node: false,
    externals,
    output: {
      filename:'main.js'
    }
  }
)