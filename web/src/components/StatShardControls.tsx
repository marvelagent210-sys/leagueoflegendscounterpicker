import { type StatShardData, shardEffectLabel } from "../../../runes/shardData";
import type { ShardSelection } from "../../../runes/shards";
import { type AppSettings, type ShardSettings, shardSelections, shardsSelected } from "../settings";

const DEFAULT_SELECTION: ShardSelection = [5005, 5001, 5001];
const ROW_NAMES = ["Offense", "Flex", "Defense"];
const SIDES = [{ key: "you", label: "Your champions" }, { key: "enemy", label: "Enemy champion" }] as const;

export function StatShardControls({ data, settings, onChange }: {
  data: StatShardData | undefined;
  settings: AppSettings;
  onChange(shards: ShardSettings): void;
}) {
  const selections = shardSelections(settings);
  return (
    <section className="panel" aria-labelledby="shards-head">
      <h3 id="shards-head">Stat shards</h3>
      {!data ? (
        <>
          <p className="note">Stat-shard choices are unavailable for this dataset.</p>
          {shardsSelected(settings) ? <button type="button" className="button" onClick={() => onChange({ you: null, enemy: null })}>Clear stat shards</button> : null}
        </>
      ) : (
        <>
          <p className="note">
            Choose three shards for either side. Your choices apply to each counter candidate; the enemy choices apply to the champion you face.
            Selected shards run fresh plain-stat duels in your browser. Full rune-page effects and item-build results are separate.
          </p>
          <div className="shard-controls">
            {SIDES.map(({ key, label }) => {
              const chosen = selections[key];
              const shown = chosen ?? DEFAULT_SELECTION;
              const set = (next: ShardSelection | null) => onChange({ ...selections, [key]: next });
              return (
                <fieldset className="shard-side" key={key}>
                  <legend>{label}</legend>
                  <label className="check" htmlFor={`shards-${key}-enabled`}>
                    <input id={`shards-${key}-enabled`} type="checkbox" checked={chosen !== null}
                      onChange={(event) => set(event.target.checked ? [...DEFAULT_SELECTION] : null)} />
                    <span>Use stat shards for {key === "you" ? "your champions" : "the enemy"}</span>
                  </label>
                  {data.catalog.shardSlots.map((row, index) => (
                    <div className="field" key={index}>
                      <label htmlFor={`shards-${key}-${index}`}>{label}: {ROW_NAMES[index]}</label>
                      <select id={`shards-${key}-${index}`} disabled={chosen === null} value={shown[index]}
                        onChange={(event) => {
                          const next: ShardSelection = [...shown];
                          next[index] = Number(event.target.value);
                          set(next);
                        }}>
                        {row.map((id) => (
                          <option key={id} value={id}>{data.catalog.shards.find((shard) => shard.id === id)!.name} — {shardEffectLabel(id, data)}</option>
                        ))}
                      </select>
                      <span className="muted">{shardEffectLabel(shown[index]!, data)}</span>
                    </div>
                  ))}
                </fieldset>
              );
            })}
          </div>
          <p className="note">
            Shards are free bonuses added after the current plain-stat allocation; that allocation is not optimized around them.
            Scaling health gives 200 health per choice at level 20. Movement-speed shards affect movement during fights; spacing eligibility still uses base speeds.
          </p>
        </>
      )}
    </section>
  );
}
