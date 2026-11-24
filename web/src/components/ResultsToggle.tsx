/** The switch between the duels with each build format and with plain stats, where the dataset has build matrices. */
import { type BuildMatrices, RESULTS_LABELS, availableModes } from "../builds";
import { useResults } from "../hooks";

export function ResultsToggle({ matrices }: { matrices: BuildMatrices }) {
  const { wanted, setWanted } = useResults();
  return (
    <div className="tabs" role="group" aria-label="Duel results">
      {availableModes(matrices).map((mode) => (
        <button key={mode} type="button" className="chip" aria-pressed={wanted === mode} onClick={() => setWanted(mode)}>
          {RESULTS_LABELS[mode]}
        </button>
      ))}
    </div>
  );
}
