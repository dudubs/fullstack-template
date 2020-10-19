export function hasKeys(obj: object) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}
