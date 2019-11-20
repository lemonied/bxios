const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// plainObject
// for example {[prop: string]: any}
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

type twoArr = [any, any]
export function obj2Array(val: any): twoArr[] {
  const arr: twoArr[] = []
  if (isPlainObject(val)) {
    Object.keys(val).forEach(key => {
      arr.push([key, val[key]])
    })
  }
  return arr
}

// null or undefined
export function isNull(val: any): val is null {
  return val === undefined || val === null
}

export function deepMerge(...args: any[]): any {
  const ret = Object.create(null)
  args.forEach(obj => {
    if (isPlainObject(obj)) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(ret[key])) {
            ret[key] = deepMerge(ret[key], val)
          } else {
            ret[key] = deepMerge(val)
          }
        }
        ret[key] = val
      })
    }
  })
  return ret
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
