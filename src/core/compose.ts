import { MiddleWare, CancelToken } from '../types'

export function compose<T>(middleWares: MiddleWare<T>[]): any {
  return function (ctx: T, next?: (err?: any, ctx?: T) => void, cancelToken?: CancelToken): void {
    let index: number
    dispatch(0).catch((err: any) => {
      next(err)
    })

    function dispatch(i: number): Promise<T> | any {
      if (cancelToken && cancelToken.reason) {
        return Promise.reject(cancelToken.reason)
      }
      index = i
      const fn = middleWares[i]
      if (index >= middleWares.length) return Promise.resolve(next(null, ctx))
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(ctx, function () {
        return dispatch(index + 1)
      }))
    }
  }
}
