const webpackDevServer = require('webpack-dev-server');
const WebSocketServer = require('websocket').server
const webpackCfg = require('../../webpack.render.dev')
const webpack = require('webpack')
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};
webpackDevServer.addDevServerEntrypoints(webpackCfg, options);

module.exports = function start(port) {
  const compiler = webpack(webpackCfg)
  const server = new webpackDevServer(
    compiler,
    options
  )
  const wsServer = new WebSocketServer({
    httpServer: server.listeningApp
  })
  const connections = {} 
  server.listen(port,()=>{
    console.log(`Dev server running on ${port}`)
  })
  wsServer.on('request', req => {
    const conn = req.accept(null, req.origin)
    console.log(`Connected`)
    conn.on('message', msg => {

      const data = JSON.parse(
        msg.utf8Data
      )
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
            console.log(`Unreachable message to ${to}: `,body)
          }
          break
        default:
        console.log('Unexpected message')
        break
      }
    })
  })

}