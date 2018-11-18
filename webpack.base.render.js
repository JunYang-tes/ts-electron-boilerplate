const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
    entry: path.resolve(__dirname,'src/render/index.ts'),
    target:'electron-renderer',
    output: {
      filename:'render.js'
    },
    externals,
    plugins:[
      new HtmlWebpackPlugin({
        template: path.resolve(
          __dirname,
          './src/render/index.html'
        )
      })
    ]
  }
)