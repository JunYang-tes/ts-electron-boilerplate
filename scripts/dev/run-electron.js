const WSClient = require('websocket').client
const execa = require('execa')
const {resolve} = require('path')
const port = process.env.MESSAGE_PORT || 9527

function run(){
  return execa('npx',['electron',resolve(`${__dirname}/../../dist/main.js`)],{
    stdio:'inherit'
  })
}

function onConnect(conn) {
  let cp = run()
  conn.sendUTF(JSON.stringify({
      type:'login',
      name:'electron-main'
    }))
  conn.on('message',(msg)=>{
    const data= JSON.parse(msg.utf8Data || '{}')
    console.log(data)
    if(data.type==='building' && data.status === 'done') {
      console.log('relaunch')
      process.kill(cp.pid)
      cp = run()
    }
  })
  conn.on('close',()=>{
    console.log("===== close")
  })
}

function start() {
  const client = new WSClient()
  client.on('connect', onConnect)
  client.connect(`ws://127.0.0.1:${port}`)
}

start()