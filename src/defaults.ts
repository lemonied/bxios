import {RequestConfig} from './types'
import {processHeaders} from './helpers/headers'
import {transfromRequest, transformResponse} from './helpers/data'

const defaults: RequestConfig = {
  baseURL: '',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [(data, headers): any => {
    processHeaders(headers, data)
    return transfromRequest(data, headers)
  }],
  transformResponse: [transformResponse]
}

export default defaults
