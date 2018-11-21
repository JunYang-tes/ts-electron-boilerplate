import {app} from 'electron'
import {getDevPort, log} from 'utils'
import {client} from 'websocket'
interface IDevMessage {
  type: 'building' | 'other',
  status: 'done' | 'other',
}
export const notUsed = () => "hello"

export default () => {
  const sc = new client()
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
