import {RequestConfig, BxiosStatic } from './types'
import {Bxios} from './core/Bxios'
import defaults from './defaults'
import {extend} from './helpers/util'
import {mergeConfig} from './core/mergeConfig'

function createInstance(config: RequestConfig): BxiosStatic {
  const context = new Bxios(config)
  const instance = Bxios.prototype.request.bind(context)
  
  extend(instance, context)
  return instance as BxiosStatic
}

const bxios = createInstance(defaults)

bxios.create = function(config: RequestConfig): BxiosStatic {
  return createInstance(mergeConfig(defaults, config))
}

export default bxios
