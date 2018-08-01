/**
 * step 1 - start webpack for main process
 * step 2 - start webpack for render process
 */

const shell = require('shelljs')
const port = process.env.MESSAGE_PORT || 9527
const startMsgServer = require('./dev-server')
const {resolve} = require('path')
const mainConfig = resolve(`${__dirname}/../../webpack.main.dev.js`)
const renderConfig = resolve(`${__dirname}/../../webpack.render.dev.js`)
const mainPath = resolve(`${__dirname}/../../dist/main.js`)
const WSClient = require('websocket').client

startMsgServer(port)

const client = new WSClient()
let ready = 0
client.on('connect',conn=>{
  console.log(`start-up connected`)
  conn.sendUTF(JSON.stringify({
    type:'login',
    name:'start-up'
  }))
  conn.on(`message`,(e)=>{
    ready++
    console.log('ready',e.utf8Data)
    if(ready===2) {
      startElectron()
    }
  })
})
client.connect(`ws://127.0.0.1:${port}`)


shell.echo(`Start webpack for main process`)
shell.exec(`npx webpack-cli --config "${mainConfig}"`,{
  async:true
})
shell.echo(`Start webpack for render process`)
shell.exec(`npx webpack-cli --config "${renderConfig}"`,{
  async:true
})

function startElectron(){
  console.log(`Run electron, entry point ${mainPath}`)
  shell.exec(`npx electron "${mainPath}"`)
}