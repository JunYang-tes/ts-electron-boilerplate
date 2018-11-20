import { BrowserWindow } from 'electron'
import {resolve} from 'path'
function getDevPort() {
  return +(process.env.DEV_PORT || 9527)
}
export default (main: BrowserWindow) => {
  if (process.env.NODE_ENV === 'development') {
    main.loadURL(`http://localhost:${getDevPort()}`)
  } else {
    main.loadFile(resolve(__dirname, 'index.html'))
  }
}
