import { MiddleWare } from '../types'

export class MiddleWareManager<T> {

  middlewares: MiddleWare<T>[]

  constructor() {
    this.middlewares = []
  }

  use(middleware: MiddleWare<T>): number {
    this.middlewares.push(middleware)
    return this.middlewares.length - 1
  }

  eject(index: number): void {
    this.middlewares[index] = null
  }

}
