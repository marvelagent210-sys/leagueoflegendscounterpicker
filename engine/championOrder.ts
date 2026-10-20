/** Stable rank ties use canonical IDs, independent of display names and UI locale. */
export function compareChampionIds(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
