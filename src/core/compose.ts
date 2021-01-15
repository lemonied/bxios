import { MiddleWare, CancelToken } from '../types'

export function compose<T>(middleWares: MiddleWare<T>[]) {
  return (ctx: T, next: (err: any, ctx?: T) => void, cancelToken?: CancelToken): void => {
    let index: number
    function dispatch(i: number): Promise<T> | any {
      if (cancelToken && cancelToken.reason) {
        return Promise.reject(cancelToken.reason)
      }
      index = i
      const fn = middleWares[i]
      if (!fn) return Promise.resolve(next(null, ctx))
      return Promise.resolve(fn(ctx, () => {
        return dispatch(index + 1)
      }))
    }
    dispatch(0).catch((err: any) => {
      next(err)
    })
  }
}
