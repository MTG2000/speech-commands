export function trim(str, len, addPoints = true) {
  return str.slice(0, len) + (str.length > len && addPoints ? "..." : "");
}
