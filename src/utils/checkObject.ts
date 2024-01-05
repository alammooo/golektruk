export function checkObjectKeys(obj: Record<string, any>): boolean {
  // Get all keys of the object
  const keys = Object.keys(obj)

  // Check if every key has a value that is not undefined or null
  return keys.every((key) => obj[key] !== undefined && obj[key] !== null)
}
