export function omit<T extends object, K extends keyof T>(
  o: T,
  ...keys: K[]
): Omit<T, K> {
  o = { ...o };
  for (let key of keys) {
    delete o[key];
  }
  return o;
}
