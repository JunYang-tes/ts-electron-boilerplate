import {app} from 'electron'
import {getDevPort, log} from 'utils'
import {client} from 'websocket'
interface IDevMessage {
  type: 'building' | 'other',
  status: 'done' | 'other',
}
export const notUsed = () => "hello"

export default () => {
  // webpack is a devDependency, will not be packed
  // when pack it as production. if import it directly
  // from the top scope, that require will throw exception
  // This function will not execute in production mode,
  // so let's require it here.
  const Client: typeof client = require('websocket').client
  const sc = new Client()
  sc.connect(`ws://127.0.0.1:${getDevPort()}`)
  sc.on('connect', (conn) => {
    conn.sendUTF(JSON.stringify({
      name: 'electron-main',
      type: 'login',
    }))
    conn.on('message', (msg) => {
      if (msg.utf8Data) {
        const data = JSON.parse(msg.utf8Data) as IDevMessage
        log(msg.utf8Data)
        if (data.type === 'building' && data.status === 'done') {
          app.relaunch()
          app.exit(0)
        }
      }
    })
  })
}
