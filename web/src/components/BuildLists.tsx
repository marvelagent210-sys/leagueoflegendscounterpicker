/** Both sides' item builds, summoner spells and rune pages in a matchup, and the kit variants they played. */
import type { MatrixLoadout } from "../../../engine/sim/precomputed";
import { type BuildsMatchup, variantText } from "../builds";

/** A side's summoner spells and rune page: the keystone and its path's runes, the secondary path's two, and the shards. */
function LoadoutLines({ loadout }: { loadout: MatrixLoadout }) {
  const { page } = loadout;
  return (
    <dl className="loadout">
      <dt>Spells</dt>
      <dd>{loadout.spells.join(", ")}</dd>
      <dt>Keystone</dt>
      <dd>{page.keystone}</dd>
      <dt>Runes</dt>
      <dd>
        {page.primary.join(", ")}; {page.secondary.join(", ")}
      </dd>
      <dt>Shards</dt>
      <dd>{page.shards.join(", ")}</dd>
    </dl>
  );
}

/** The two builds side by side: yours, then the enemy's, each with its loadout. Each is the searches' best answer to the other. */
export function BuildLists({ names, builds, loadouts }: { names: [string, string]; builds: [string[], string[]]; loadouts?: BuildsMatchup["loadouts"] }) {
  return (
    <div className="builds">
      {builds.map((items, side) => {
        const loadout = loadouts?.[side];
        return (
          <div key={side} className="build">
            <span className="label">{names[side]}'s build</span>
            <ul className="items">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {loadout ? <LoadoutLines loadout={loadout} /> : null}
          </div>
        );
      })}
    </div>
  );
}

/** The kit variant each side played with its build, where its kit has variants (Udyr's rank splits). */
export function VariantNotes({ names, ids, variants }: { names: [string, string]; ids: [string, string]; variants: BuildsMatchup["variants"] | undefined }) {
  const lines = ([0, 1] as const).flatMap((side) => {
    const options = variants?.[side];
    const text = options ? variantText(ids[side], options) : "";
    return text ? [`${names[side]} played ${text}.`] : [];
  });
  return (
    <>
      {lines.map((line) => (
        <p key={line} className="note">
          {line}
        </p>
      ))}
    </>
  );
}
