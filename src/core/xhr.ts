import { RequestConfig, BxiosPromise, Response } from '../types'
import { isNull, isUrlSameOrigin } from '../helpers/util'
import { headersParser } from '../helpers/headers'
import { cookie } from '../helpers/cookie'
import { createError } from '../helpers/error'

export function xhr(config: RequestConfig): BxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      withCredentials,
      onDownloadProgress,
      onUploadProgress
    } = config

    const request = new XMLHttpRequest()
    request.onprogress = onDownloadProgress
    request.upload.onprogress = onUploadProgress
    request.onreadystatechange = function (): void {
      if (this.readyState === 4 && request.status !== 0) {
        handleResponse()
      }
    }
    // only network error
    request.onerror = (): void => {
      reject(createError(`NetWork Error`, config, null, request))
    }
    // timeout error
    request.ontimeout = (): void => {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
    }

    request.open(method.toUpperCase(), url, true)

    configureRequest()
    processHeaders()
    processCancel()
    request.send(data)

    function configureRequest(): void {
      if (responseType) request.responseType = responseType
      if (timeout) request.timeout = timeout
      /*
      * withCredentials
      * Is a Boolean that indicates whether or not cross-site
      * Access-Control requests should be made using credentials such as cookies or authorization headers
      */
      if (withCredentials) request.withCredentials = withCredentials
    }

    function processHeaders(): void {
      /*
      * Cross Site Request Forgerydetected Defense
      * if request withCredentials=true or same origin policy
      * headers[xsrfCookieName]=xsrfValue when name and value exist
      */
      const {xsrfCookieName, xsrfHeaderName} = config
      if ((withCredentials || isUrlSameOrigin(url)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfHeaderName && xsrfValue) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      const {auth} = config
      if (auth) {
        // base64 encode
        headers.Authorization = `Basic ${btoa(`${auth.username} : ${auth.password}`)}`
      }

      // delete header content-type when data is empty
      Object.keys(headers).forEach(key => {
        if (isNull(data) && key.toLowerCase() === 'content-type') {
          delete headers[key]
        } else {
          request.setRequestHeader(key, headers[key])
        }
      })
    }

    function handleResponse(): void {
      const {validateStatus} = config
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
      if (validateStatus(request.status)) {
        resolve(response)
      } else {
        reject(createError(
          `Request failed with status code ${request.status}`,
          config,
          request.status,
          request,
          response
        ))
      }
    }

    function processCancel(): void {
      const {cancelToken} = config
      if (cancelToken) {
        cancelToken.promise.then((reason) => {
          request.abort()
          reject(reason)
        })
      }
    }
  })
}
