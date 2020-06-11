import { RequestConfig, Response } from '../types'

export class BxiosError extends Error {

  isBxiosError: boolean
  config: RequestConfig
  code?: string | null | number
  request?: any
  response?: Response

  constructor(
    message: string,
    config: RequestConfig,
    code: string | null | number,
    request?: any,
    response?: Response
  ) {
    super(message)
    this.isBxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response
  }
}

export function createError(
  message: any,
  config: RequestConfig,
  code: string | null | number,
  request?: any, response?: Response
): BxiosError {
  if (message instanceof Error) {
    message = message.message
  }
  return new BxiosError(message, config, code, request, response)
}
