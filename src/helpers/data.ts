import { isPlainObject } from './util'
import { Headers } from '../types'
import { queryString } from './query'

// browser request body types: Blob, BufferSource, FormData, URLSearchParams, ReadableStream、USVString
export function transformRequest(data: any, headers: Headers): any {
  if (isPlainObject(data)) {
    const contentType = headers['Content-Type']
    if (/application\/x-www-form-urlencoded/i.test(contentType)) {
      return queryString(data)
    }
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (err) {
      // do something
    }
  }
  return data
}
