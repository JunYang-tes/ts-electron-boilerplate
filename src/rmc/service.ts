import {IChannel, IRMCResult} from 'rmc/types'
export default class Services {
  private serices: {
    [id: string]: {
      [name: string]: any,
    },
  }
  constructor(private channel: IChannel) {
    this.serices = {}
    channel.onCall(
      async (msg) => {
        const service = this.serices[msg.serviceId]
        const resp: IRMCResult = {
          failed: false,
          seq: msg.seq,
        }
        if (service) {
          const fn: any = service[msg.name]
          if (fn instanceof Function) {
            try {
              resp.returned = fn.apply(this.serices[msg.serviceId], msg.args)
            } catch (e) {
              resp.failed = true
              resp.error = e.message
            }
          } else {
            resp.error = `${msg.name} is not a function`
          }
        } else {
          resp.error = `${msg.serviceId} not exists`
        }
        return resp
      },
    )
  }
  public register(id: string, service: {[name: string]: (...a: any[]) => any}) {
    this.serices[id] = service
  }
}
