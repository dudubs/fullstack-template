export function mapObject(obj: object, callback) {
  const m: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      m[key] = callback(obj[key], key);
    }
  }
  return m;
}
