import {isPlainObject, deepMerge} from './util'
import {Headers} from '../types'

function normalizeHeaderName(headers: Headers, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(key => {
    if (key !== normalizedName && key.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[key]
      delete headers[key]
    }
  })
}

export function processHeaders(headers: Headers, data: any): Headers {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function transformHeaders(headers: Headers): Headers {
  headers = deepMerge(headers.common, headers)
  const deleteOptions = ['common']
  deleteOptions.forEach(item => {
    delete headers[item]
  })
  return headers
}

export function headersParser(str: string): any {
  const headers = Object.create(null)
  if (typeof str !== 'string' || !str) return headers
  str.split('\r\n').forEach(line => {
    const [key, ...vals] = line.split(':')
    if (!key) return
    const name = key.trim().toLowerCase()
    const val = vals.join(':').trim()
    headers[name] = val
  })
  return headers
}
