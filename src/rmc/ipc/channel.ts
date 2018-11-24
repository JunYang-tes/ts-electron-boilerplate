import * as electron from 'electron'
import {IChannel, IRMCCall, IRMCResult} from 'rmc/types'
const ipcMain = (electron.ipcMain || electron.remote.ipcMain)
const isMain = electron.ipcMain != null
export default class IPCChannel implements IChannel {
  private ready = Promise.resolve(true)
  constructor(private channelId: string, private remoteChannelId: string) {
    if (isMain) {
      this.ready = new Promise(
        (res) => {
          ipcMain.on(`ipc-ready`, () => {
            res(true)
          })
        },
      )
    }
  }
  public onCall(handler: (data: IRMCCall) => Promise<IRMCResult>): void {
    ipcMain.on(`ipc-call-${this.channelId}`, async (arg: IRMCCall) => {
      const ret = await handler(arg)
      ipcMain.emit(`ipc-return-${this.remoteChannelId}-${arg.seq}`, ret)
    })
    if (!isMain) {
      ipcMain.emit('ipc-ready')
    }
  }

  public async call(msg: IRMCCall): Promise<IRMCResult> {
    await this.ready
    ipcMain.emit(`ipc-call-${this.remoteChannelId}`, msg)

    return new Promise<IRMCResult>((res) => {
      ipcMain.once(`ipc-return-${this.channelId}-${msg.seq}`, (ret: IRMCResult) => {
        res(ret)
      })
    })
  }
}
