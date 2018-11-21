export const log = (...msg: any[]) => {
  // tslint:disable-next-line
  console.log(...msg)
}

export const getDevPort = () => +(process.env.DEV_PORT || 9527)
