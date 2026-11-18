/** Each fighter supplies the starting history required by their selected runes. */
export interface RuneEquipOptions {
  legendPoints?: number;
  /** Explicit pre-duel Energized history for Fleet Footwork, from 0 through 100. */
  energizedCharges?: number;
}
