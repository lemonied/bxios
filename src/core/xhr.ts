import {RequestConfig, BxiosPromise, Response} from '../types'
import {isNull} from '../helpers/util'

export function xhr(config: RequestConfig): BxiosPromise {
  return new Promise((resolve, reject) => {
    const {data = null, url, method = 'get', headers, responseType, timeout} = config

    const request = new XMLHttpRequest()
    if (responseType) request.responseType = responseType
    request.onreadystatechange = function(): void {
      if (this.readyState === 4 && this.status >= 200 && this.status < 300 || this.status === 304) {
        resolve(onLoadingSuccess(this, config))
      }
    }
    request.onerror = reject
    request.ontimeout = reject
    request.onabort = reject
    request.open(method.toUpperCase(), url, true)

    if (timeout) request.timeout = timeout

    Object.keys(headers).forEach(key => {
      if (isNull(data) && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    })
    request.send(data)
  })
}

function onLoadingSuccess(request: XMLHttpRequest, config: RequestConfig): Response<any> {
  const responseHeaders = request.getAllResponseHeaders()
  const responseData = request.responseType !== 'text' ?
    request.response :
    request.responseText
  return {
    data: responseData,
    status: request.status,
    statusText: request.statusText,
    headers: responseHeaders,
    config,
    request
  }
}
