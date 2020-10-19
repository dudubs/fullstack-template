export function mapArrayToObject<T, V>(
  arr: T[],
  callback: (value: T, index: number) => [string, V]
): Record<string, V> {
  const o = {};
  for (const [index, item] of arr.entries()) {
    const [key, value] = callback(item, index);
    o[key] = value;
  }
  return o;
}
