/**
 * step 1 - start webpack for main process
 * step 2 - start webpack for render process
 */
const {getDevServerPort} = require('../utils')
const port = getDevServerPort()
const startDevServer = require('./dev-server')
const {resolve} = require('path')
const mainConfig = resolve(`${__dirname}/../../webpack.main.dev.js`)
const execa = require('execa')
startDevServer(port)
execa('npx',[`webpack-cli`, `--config` ,mainConfig],{
  stdio:"inherit"
})