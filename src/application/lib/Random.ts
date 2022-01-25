let randomIndex = 0;

export function getRandomId(): string {
  return (
    Math.floor(new Date().valueOf() / 100000) +
    `${+randomIndex}`.padStart(2, '0')
  );
}
