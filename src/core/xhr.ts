import {RequestConfig, BxiosPromise, Response} from '../types'
import {isNull} from '../helpers/util'
import {headersParser} from '../helpers/headers'

export function xhr(config: RequestConfig): BxiosPromise {
  return new Promise((resolve, reject) => {
    const {data = null, url, method = 'get', headers, responseType, timeout} = config

    const request = new XMLHttpRequest()
    if (responseType) request.responseType = responseType
    request.onreadystatechange = function(): void {
      if (this.readyState === 4) {
        handleResponse()
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

    function handleResponse(): void {
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = request.responseType !== 'text' ?
        request.response :
        request.responseText
      const response: Response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: headersParser(responseHeaders),
        config,
        request
      }
      resolve(response)
    }
  })
}
