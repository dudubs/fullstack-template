export function pick<T extends object, K extends keyof T>(
  o: T,
  ...keys: K[]
): Pick<T, K> {
  const no: any = {};
  for (let key of keys) {
    no[key] = o[key];
  }
  return no;
}
