import { BrowserWindow } from 'electron'
import {resolve} from 'path'
import {getDevPort} from 'utils'
export default (main: BrowserWindow) => {
  if (process.env.NODE_ENV === 'development') {
    main.loadURL(`http://localhost:${getDevPort()}`)
  } else {
    main.loadFile(resolve(__dirname, 'index.html'))
  }
}
