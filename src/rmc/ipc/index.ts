import Channel from 'rmc/ipc/channel'
import {Caller, proxy} from 'rmc/proxy'
export const proxy2Render =  proxy(Caller, new Channel(
  'main',
  'render',
))
export const proxy2main = proxy(Caller, new Channel(
  'render',
  'main',
))
