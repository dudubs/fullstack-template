export function* entries<T extends Record<string, any>>(
  obj: T
): IterableIterator<[any, T[string]]> {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      yield [key, obj[key]];
    }
  }
}
