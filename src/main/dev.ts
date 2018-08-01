import {app} from 'electron'
function reload() {
  const WSClient:any = require('websocket').client
  const client = new WSClient()
  const port = process.env.MESSAGE || 9527

  client.on('connect',(conn:any)=>{
    conn.on('message',(msg:any)=>{
      const data:{type:string,status:string} = JSON.parse(msg.utf8Data || '{}')
      console.log(data)
      if(data.type==='building' && data.status === 'done') {
        app.relaunch()
      }
    })
  })
  client.connect(`ws://127.0.0.1:${port}`)
}
export default function setup(){
  if(process.env.NODE_ENV==='development') {
    console.log('setup reload')
    
    reload()
  }
}