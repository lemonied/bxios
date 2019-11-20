import { RequestConfig, BxiosPromise, Response, Interceptors, PromiseChain } from '../types'
import {InterceptorManager} from '../core/interceptorManager'
import {mergeConfig} from '../core/mergeConfig'
import { dispatchRequest } from './dispatchRequest'

export class Bxios {

  defaults: RequestConfig
  interceptors: Interceptors

  constructor(initConfig: RequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<RequestConfig>(),
      response: new InterceptorManager<Response>()
    }
  }

  request(url: any, config: any): BxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(config, this.defaults)
    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest
    }]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(iterceptor => {
      chain.push(iterceptor)
    })

    let promise = Promise.resolve(config)
    while (chain.length > 0) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }
}