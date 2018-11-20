import {BrowserWindow} from 'electron'
import installExt from './install-extensions'
type BF = (_: BrowserWindow) => void | Promise<void>
export default [
  installExt,
] as BF[]
