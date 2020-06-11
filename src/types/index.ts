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
  withCredentials?: boolean;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  paramsSerializer?: (params: any) => any;
  transformRequest?: Transformer | Transformer[];
  transformResponse?: Transformer | Transformer[];
  onUploadProgress?: (event: any) => void;
  onDownloadProgress?: (event: any) => void;
  validateStatus?: (status: number) => boolean;
  cancelToken?: CancelToken;
}

export type Transformer = (data: any, headers?: any) => any;

export interface Response<T=any> {
  data: T;
  status: number;
  statusText: string;
  headers: string;
  config: RequestConfig;
  request: any;
}

export interface BxiosPromise<T=any> extends Promise<Response<T>> {}

export interface BasicCredentials {
  username: string;
  password: string;
}

export type ResolvedFn<T> = (val: T) => T | Promise<T>;

export type RejectFn = (error: any) => any;

export type MiddleWare<T> = (ctx: T, next: () => Promise<any>) => void;

export interface MiddleWareManager<T> {
  middlewares: MiddleWare<T>[];
  use(middleware: MiddleWare<T>): number;
  eject(index: number): void;
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
  middlewares?: {
    request?: MiddleWareManager<RequestConfig>;
    response?: MiddleWareManager<Response>;
  };
  request(url: any, config: any): BxiosPromise;
}

export interface BxiosInstance extends Bxios {
  <T=any>(config: RequestConfig): BxiosPromise<T>;
  <T=any>(url: string, config?: RequestConfig): BxiosPromise<T>;
}

export type BxiosClassStatic = new (config: RequestConfig) => Bxios;

export interface BxiosStatic extends BxiosInstance {
  create(config?: RequestConfig): BxiosInstance;
  Bxios: BxiosClassStatic;
  CancelToken: CancelTokenStatic;
}

export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

export type Canceler = (message?: string) => void;

export type CancelExecutor = (canceler: Canceler) => void;

export interface CancelTokenSource {
  cancel: Canceler;
  token: CancelToken;
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): void;
  source(): CancelTokenSource;
}

export interface Cancel {
  message?: string;
}

export type CancelStatic = new (message?: string) => Cancel;
