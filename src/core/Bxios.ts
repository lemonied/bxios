import { RequestConfig, BxiosPromise, Response, MiddleWare } from '../types'
import {mergeConfig} from '../core/mergeConfig'
import { dispatchRequest } from './dispatchRequest'
import { compose } from './compose'
import {isCancel} from '../cancel/cancel'
import {createError} from '../helpers/error'
import {MiddleWareManager} from '../core/middlewareManager'

export class Bxios {

  defaults: RequestConfig
  middlewares: {
    request: MiddleWareManager<RequestConfig>;
    response: MiddleWareManager<Response>;
  }

  constructor(initConfig: RequestConfig) {
    this.defaults = initConfig
    this.middlewares = {
      request: new MiddleWareManager<RequestConfig>(),
      response: new MiddleWareManager<Response>()
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
    // defaults will merge with config
    config = mergeConfig(this.defaults, config)

    const filterMiddles = {
      request: this.middlewares.request.middlewares.filter(item => !!item),
      response: this.middlewares.response.middlewares.filter(item => !!item)
    }

    return new Promise((resolve, reject) => {
      let response: Response
      const chain: MiddleWare<any> = async (config: RequestConfig, next) => {
        response = await dispatchRequest(config)
        await next()
      }

      compose([...filterMiddles.request, chain])(config, (arg: any) => {
        if (!arg) {
          return compose(filterMiddles.response)(response, (arg: any) => {
            if (!arg) return resolve(response)
            handleError(arg)
          }, config.cancelToken)
        } 
        handleError(arg)
      }, config.cancelToken)

      function handleError(arg: any): void {
        if (isCancel(arg)) {
          reject(createError(
            arg.message,
            config,
            'ABORTED'
          ))
        } else {
          reject(createError(
            arg,
            config,
            'MIDDLEWAREERROR'
          ))
        }
      }
    })
  }
}