export function queryString(string) {
  const params = new URLSearchParams(string);
  let obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
}
