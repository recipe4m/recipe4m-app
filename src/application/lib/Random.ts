export function getRandomId(): string {
  return `${Date.now()}`.slice(2, 11);
}
