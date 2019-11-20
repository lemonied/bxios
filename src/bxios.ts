import { BxiosClassStatic, RequestConfig } from './types'
import {Bxios} from './core/Bxios'

function createInstance(config: RequestConfig): BxiosClassStatic {
  const context = new Bxios(config)
  const instance = Bxios.prototype.request.bind(context)
  return instance as BxiosClassStatic
}

export default createInstance
