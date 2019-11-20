import { InterceptorManager } from "../core/interceptorManager"

type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

type ResponseType = '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text'

export interface Headers {
  'Content-Type'?: string;
  [prop: string]: any;
}

export interface RequestConfig {
  baseURL?: string;
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: Headers;
  responseType?: ResponseType;
  timeout?: number;
  auth?: BasicCredentials;
  paramsSerializer?: (params: any) => any;
  transformRequest?: Transformer | Transformer[];
  transformResponse?: Transformer | Transformer[];
}

export interface Transformer {
  (data: any, headers?: any): any;
}

export interface Response<T=any> {
  data: T;
  status: number;
  statusText: string;
  headers: string;
  config: RequestConfig;
  request: any;
}

export interface BxiosPromise<T=any> extends Promise<Response<T>> {
  
}

export interface BasicCredentials {
  username: string;
  password: string;
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>;
}

export interface RejectFn {
  (error: any): any;
}

export interface BxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected: RejectFn): number;
  eject(id: number): void;
}

export interface PromiseChain<T> {
  resolved: ResolvedFn<T>;
  rejected?: RejectFn;
}

export interface Interceptors {
  request: InterceptorManager<RequestConfig>;
  response: InterceptorManager<Response>;
}

export interface Bxios {
  defaults: RequestConfig;
  interceptors: Interceptors;
  request(url: any, config: any): BxiosPromise;
}

export interface BxiosInstance extends Bxios {
  <T=any>(config: RequestConfig): BxiosPromise<T>;
  <T=any>(url: string, config?: RequestConfig): BxiosPromise<T>;
}

export interface BxiosClassStatic {
  new (config: RequestConfig): Bxios;
}

export interface BxiosStatic extends BxiosInstance {
  create(config?: RequestConfig): BxiosInstance;
  Bxios: BxiosClassStatic;
}
