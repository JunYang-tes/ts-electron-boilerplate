/**
 * step 1 - start webpack for main process
 * step 2 - start webpack for render process
 */

const port = process.env.MESSAGE_PORT || 9527
const startMsgServer = require('./dev-server')
const {resolve} = require('path')
const mainConfig = resolve(`${__dirname}/../../webpack.main.dev.js`)
const renderConfig = resolve(`${__dirname}/../../webpack.render.dev.js`)
const mainPath = resolve(`${__dirname}/../../dist/main.js`)
const WSClient = require('websocket').client
const execa = require('execa')

startMsgServer(port)

execa('npx',[`webpack-cli`, `--config` ,mainConfig],{
  stdio:"inherit"
})
execa('npx',[`webpack-cli`, `--config` ,renderConfig],{
  stdio:"inherit"
})
