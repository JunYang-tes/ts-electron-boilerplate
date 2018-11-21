import {BrowserWindow} from 'electron'
import installExt from './install-extensions'
import reload from './reload'
type BF = (_: BrowserWindow) => void | Promise<void>
export default [
  installExt,
  reload,
] as BF[]
