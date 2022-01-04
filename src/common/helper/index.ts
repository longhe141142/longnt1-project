export function checkArrayIsEmptyOrNull(arr: Array<any>) {
  if (!arr) return false;
  if (arr.length == 0) return false;
  return true;
}
