/**
 *
 * @param hex #FFCCAA or #FFCCAAFF
 * @param alpha 0 to 1
 */
export function convertHexToRGBA(hex: string, alpha?: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  let a: number | undefined;
  if (hex.length === 9) a = parseInt(hex.slice(7, 9), 16);
  else if (alpha) {
    if (alpha > 1 || alpha < 0)
      throw new Error('alpha must be a number between 0 and 1.');
    a = alpha;
  }

  return a ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
}
