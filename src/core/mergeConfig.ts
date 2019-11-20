import {RequestConfig} from '../types'
import {deepMerge, isPlainObject} from '../helpers/util'

export function mergeConfig(config1: RequestConfig, config2: RequestConfig): RequestConfig {

  let merged = Object.create(null)
  const mergeStratOption = ['headers', 'auth']

  if (isPlainObject(config1)) {
    if (isPlainObject(config2)) {
      Object.keys(config1).forEach(key => {
        type keyType = keyof  RequestConfig
        if (key in mergeStratOption) {
          merged[key] = deepMerge(config1, config2)
        } else if (typeof config2[key as keyType] === 'undefined') {
          merged[key] = config1[key as keyType]
        }
      })
    } else {
      merged = deepMerge(config1)
    }
  } else if (isPlainObject(config2)) {
    merged = deepMerge(config2)
  }

  return merged as RequestConfig
}
