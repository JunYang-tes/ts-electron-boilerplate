const merge = require('webpack-merge')
const base = require('./webpack.base.render')
const baseProd = require('./webpack.base.prod')
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
  baseProd,
  /**
   * If we want hot reload feature for development time,
   * we must load scripts from http server (webpack-dev-server),
   * If we load scripts from http server by main.loadURL,
   * we cannot using require('xxx') to load some module which 
   * are out for default_app.asar and electron.asar from render
   * process (It must be require('electron').remote.require('xxxx'))
   * In order to enjoy with hot reload, we make webpack pack all
   * dependencies together for development time.
   */
  externals,

  {
    mode:'production',
    devtool: false,
  }
)