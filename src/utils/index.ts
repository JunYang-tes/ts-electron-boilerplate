import * as electron from 'electron'
import {proxy2Render} from 'rmc/ipc'
const renderConsole = proxy2Render<Console>('console')
export const log = (...msg: any[]) => {
  if (isMainProcess) {
    renderConsole.log('[main]', ...msg)
  } else {
    // tslint:disable-next-line
    console.log(...msg)
  }
}
export const isMainProcess =  electron.ipcRenderer == null
export const getDevPort = () => +(process.env.DEV_PORT || 9527)
