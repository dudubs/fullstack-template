export async function mapObjectAsync(obj: object, callback) {
  const m: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      m[key] = await callback(obj[key], key);
    }
  }
  return m;
}
