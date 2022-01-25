let randomIndex = 0;

export function getRandomId(): string {
  return new Date().valueOf() + (++randomIndex).toString().padStart(4, '0');
}
