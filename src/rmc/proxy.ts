import {IChannel} from 'rmc/types'

export interface ICallerCtor {
  new (serviceId: string, channel: IChannel): ICaller
}
export interface ICaller {
  callRemote(name: string, args: any[]): Promise<any>
}
export class Caller implements ICaller {
  private seq: number
  constructor(private serviceId: string, private channel: IChannel) {
    this.seq = 0
  }
  public async callRemote(name: string, args: any[]) {
    const ret = await this.channel.call({
      args,
      name,
      seq: this.seq++,
      serviceId: this.serviceId,
    })
    if (ret.failed) {
      throw new Error(`Failed to call ${name}.\n Service ID: ${this.serviceId} \n ${ret.error || 'Unknow reason'}`)
    }
    return ret.returned
  }
}

export const proxy = (callerCtor: ICallerCtor, channel: IChannel) => {
  function createCaller<T>(serviceId: string): T {
    const caller = new callerCtor(serviceId, channel)
    const proxiedFns = new Map()
    const p = new Proxy(caller, {
      get(target, prop) {
        if (!proxiedFns.has(prop)) {
          proxiedFns.set(prop, (...args: any[]) => target.callRemote(
            prop.toString(),
            args,
          ))
        }
        return proxiedFns.get(prop)
      },
    })
    return p as any
  }
  return createCaller
}
