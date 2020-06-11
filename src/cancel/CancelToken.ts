import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import { Cancel } from './cancel'

interface ResolvedPromise {
  (reason?: Cancel): void;
}

export class CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  constructor(executor: CancelExecutor) {
    let resolvedPromise: ResolvedPromise
    this.promise = new Promise((resolve: ResolvedPromise) => {
      resolvedPromise = resolve
    })
    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvedPromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel: Canceler
    const token = new CancelToken(function (c) {
      cancel = c
    })
    return {
      token,
      cancel
    }
  }
}
