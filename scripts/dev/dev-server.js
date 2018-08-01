const WebSocketServer = require('websocket').server

module.exports = function start(port) {
  const http = require('http')
  const server = http.createServer((req, res) => {
    console.log(`${req.url}`)
  })
  const wsServer = new WebSocketServer({
    httpServer: server
  })
  const connections = {} 
  server.listen(port,()=>{
    console.log(`Messaging server running on ${port}`)
  })
  wsServer.on('request', req => {
    const conn = req.accept(null, req.origin)
    console.log(`Connected`)
    conn.on('message', msg => {

      const data = JSON.parse(
        msg.utf8Data
      )
      console.log('==========',data)
      switch (data.type) {
        case 'login':
          if (connections[data.name]) {
            connections[data.name].close()
          }
          connections[data.name] = conn
          break
        case 'message':
          const { to, body } = data
          if (to in connections) {
            const recv = connections[to]
            if (recv.connected) {
              recv.sendUTF(
                JSON.stringify(body||{})
              )
            } else {
              console.log(`${to} is not connected`)
            }
          } else {
            console.log(`Unreachable message to ${to}: ${body}`)
          }
          break
        default:
        console.log('Unexpected message')
        break
      }
    })
  })

}