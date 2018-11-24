import Channel from 'rmc/ipc/channel'
import Service from 'rmc/service'
const server = new Service(
  new Channel(
    'render',
    'main',
  ),
)
server.register('console', {
  alert(msg: string ) {
    alert(msg)
  },
  log(...args: any[]) {
    // tslint:disable-next-line
    console.log(...args)
  },
})

export const register = server.register.bind(server)
