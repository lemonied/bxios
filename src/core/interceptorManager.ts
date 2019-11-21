import {ResolvedFn, RejectFn, RequestConfig, Response} from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>;
  rejected: RejectFn;
}

export class InterceptorManager<T=RequestConfig | Response> {
  private interceptors: (Interceptor<T> | null)[]

  constructor() {
    this.interceptors = []
  }

  forEach(fn: (val: Interceptor<T>) => void): void {
    this.interceptors.forEach(item => {
      if (item !== null) {
        fn(item)
      }
    })
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  eject(id: number): void {
    this.interceptors[id] = null
  }
}
