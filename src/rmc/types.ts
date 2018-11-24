export interface IRMCResult {
  seq: number,
  failed: boolean,
  error?: string,
  returned?: any
}
export interface IRMCCall {
  seq: number,
  name: string,
  serviceId: string,
  args: any[]
}
export interface IMessage {
  seq: number
}

export interface IChannel {
  onCall(handler: (data: IRMCCall) => Promise<IRMCResult>): void
  call(msg: IRMCCall): Promise<IRMCResult>
}
