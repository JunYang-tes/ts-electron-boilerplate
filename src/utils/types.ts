export type WithFunctions = {
  [name: string]: (...args: any[]) => any,
} & any
export type PromiseIfNotPromise<T> = T extends Promise<any> ? T : Promise<T>

export type RPCProxy<T extends WithFunctions>
  = {
    // tslint:disable-next-line
    [K in keyof T]: T[K] extends Function ?
    (...args: Parameters<T[K]>) => PromiseIfNotPromise<ReturnType<T[K]>>
    : never
  }
