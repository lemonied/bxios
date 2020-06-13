import { RequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: RequestConfig = {
  method: 'get',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [(data, headers): any => {
    processHeaders(headers, data)
    return transformRequest(data, headers)
  }],
  transformResponse: [transformResponse],
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300 || status === 304
  }
}

export default defaults
