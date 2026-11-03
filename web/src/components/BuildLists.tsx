/** Both sides' item builds in a matchup, and the kit variants they played. */
import { type BuildsMatchup, variantText } from "../builds";

/** The two builds side by side: yours, then the enemy's. Each is the search's best answer to the other. */
export function BuildLists({ names, builds }: { names: [string, string]; builds: [string[], string[]] }) {
  return (
    <div className="builds">
      {builds.map((items, side) => (
        <div key={side} className="build">
          <span className="label">{names[side]}'s build</span>
          <ul className="items">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
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
