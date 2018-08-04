const WSClient = require('websocket').client
const {ProgressPlugin} = require('webpack')
module.exports = function createDevConfig(role,port) {
  const client = new WSClient()
  let conn = null
  client.on('connect',(connection)=>{
    conn = connection
    conn.sendJSON = function(msg){
      conn.sendUTF(JSON.stringify({
        from:role,
        ...msg
      }))
    }
    conn.sendMsg = function(msg){
      conn.sendJSON({
        type:'message',
        ...msg
      })
    }
    conn.sendJSON({
      type:'login',
      name:role
    })
  })
  client.connect(
    `ws://127.0.0.1:${port}`
  )
  let isFirstTime = true
  const ProgressHook = new ProgressPlugin((p, msg) => {
    if(p===1 && conn) {
      if(isFirstTime) {
        conn.sendMsg({
          to:`start-up`,
          body:{
            who:role
          }
        })
        isFirstTime = false
      } else {
        conn.sendMsg({
          to: `electron-${role}`,
          body: {
            type: 'building',
            status: 'done'
          }
        })
      }
    }
  })
  return {
    watch:true,
    plugins:[
      ProgressHook
    ]
  }
}