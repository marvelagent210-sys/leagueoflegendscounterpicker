/** Small pieces shared by the pages. */
import type { ReactNode } from "react";

export function signed(value: number | null | undefined): string {
  if (value === null || value === undefined) return "–";
  const rounded = Math.round(value * 100) / 100;
  return `${rounded > 0 ? "+" : rounded < 0 ? "−" : ""}${Math.abs(rounded).toFixed(2)}`;
}

export function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/** A bar from a center line: right for values above zero, left below, scaled to `scale`. */
export function ScoreBar({ value, scale = 1 }: { value: number | null | undefined; scale?: number }) {
  const width = value ? Math.min(50, (Math.abs(value) / scale) * 50) : 0;
  return (
    <span className="bar" aria-hidden="true">
      {value ? <span className={`fill ${value > 0 ? "win" : "lose"}`} style={{ width: `${width}%` }} /> : null}
    </span>
  );
}

export function Score({ value }: { value: number | null | undefined }) {
  const tone = value && Math.abs(value) >= 0.005 ? (value > 0 ? "win" : "lose") : "";
  return <span className={`score ${tone}`}>{signed(value)}</span>;
}

export function Confidence({ full }: { full: boolean }) {
  return <span className={`tag ${full ? "full" : "partial"}`} title={full ? "Fights modeled under the displayed settings and assumptions." : "Estimated from documented ability interactions."}>{full ? "Simulated" : "Interaction estimate"}</span>;
}

export function ErrorBox({ error }: { error: Error }) {
  return (
    <div className="error" role="alert">
      <strong>Something went wrong.</strong> {error.message}
    </div>
  );
}

export function Loading({ children }: { children: ReactNode }) {
  return <p className="loading">{children}</p>;
}

export function Progress({ done, total }: { done: number; total: number }) {
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
      <span style={{ width: `${total ? (100 * done) / total : 0}%` }} />
    </div>
  );
}

/** The column heads above a ranked list: who a bar's left and right halves favor. */
export function ScaleHead({ left, right }: { left: string; right: string }) {
  return (
    <div className="cols scale" aria-hidden="true">
      <span />
      <span />
      <span className="ends">
        <span>{left}</span>
        <span>{right}</span>
      </span>
      <span />
      <span />
    </div>
  );
}
