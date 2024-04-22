export default function convertObjectToArray(obj: { [x: string]: any }) {
  const result = new Array(Object.keys(obj).length).fill("");

  for (const key in obj) {
    result[parseInt(key)] = obj[key];
  }

  return result;
}
