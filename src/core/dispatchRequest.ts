import {RequestConfig, BxiosPromise, Response} from '../types'
import {xhr} from './xhr'
import {transform} from './transform'
import {compineUrl, buildUrl} from '../helpers/url'
import {transformHeaders} from '../helpers/headers'

export function dispatchRequest(config: RequestConfig): BxiosPromise {
  processConfig(config)
  return xhr(config).then(transformResponseData)
}

function processConfig(config: RequestConfig): void {
  // format requestConfig before request
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = transformHeaders(config.headers)
}

function transformUrl(config: RequestConfig): string {
  const {baseURL, params} = config
  let {url} = config
  url = compineUrl(baseURL, url)
  return buildUrl(url, params)
}

function transformResponseData(res: Response): Response {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
