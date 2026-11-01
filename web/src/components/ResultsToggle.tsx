/** The switch between the duels with item builds and with plain stats, where the dataset has the builds. */
import { RESULTS_LABELS, RESULTS_MODES } from "../builds";
import { useResults } from "../hooks";

export function ResultsToggle() {
  const { wanted, setWanted } = useResults();
  return (
    <div className="tabs" role="group" aria-label="Duel results">
      {RESULTS_MODES.map((mode) => (
        <button key={mode} type="button" className="chip" aria-pressed={wanted === mode} onClick={() => setWanted(mode)}>
          {RESULTS_LABELS[mode]}
        </button>
      ))}
    </div>
  );
}
