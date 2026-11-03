/** The enemy picker: every champion ranked against the enemy, by simulated duels (with item builds or plain stats) and by the ledger. */
import { useEffect, useMemo, useState } from "react";
import { compareChampionIds } from "../../../engine/championOrder";
import { rankCounters } from "../../../engine/ledger/index";
import { SCENARIO_LABELS, SCENARIOS } from "../../../engine/sim/scenarios";
import type { Champion } from "../../../engine/types";
import { type BuildsMatchup, buildsMatchup, shownResults } from "../builds";
import { ChampionSearch } from "../components/ChampionSearch";
import { BuildLists, VariantNotes } from "../components/BuildLists";
import { ResultsToggle } from "../components/ResultsToggle";
import { Confidence, ErrorBox, Progress, ScaleHead, Score, ScoreBar } from "../components/common";
import { type AppData, findChampion } from "../data";
import { lastEnemy, rememberEnemy, useMatchupBatch, useResults, useSettings } from "../hooks";
import { routeHash } from "../routes";
import { needsSimulation } from "../sim/cache";

const DEFAULT_ENEMY = "Darius";

export function PickerPage({ data, enemyId }: { data: AppData; enemyId?: string }) {
  const enemy = findChampion(data, enemyId) ?? findChampion(data, lastEnemy()) ?? data.byId.get(DEFAULT_ENEMY) ?? data.champions[0];
  useEffect(() => {
    if (enemy) rememberEnemy(enemy.id);
  }, [enemy]);
  const simulated = useMemo(() => new Set(data.kitIds), [data]);
  if (!enemy) return <ErrorBox error={new Error("The champion list is empty.")} />;
  const pick = (champion: Champion) => {
    location.hash = routeHash({ page: "picker", enemy: champion.id });
  };
  const hasKit = simulated.has(enemy.id);
  return (
    <>
      <section className="panel" aria-label="Choose the enemy">
        <ChampionSearch label="Enemy top laner" champions={data.champions} value={enemy} simulated={simulated} onPick={pick} />
        <div className="field">
          <span className="eyebrow">Simulated champions</span>
          <div className="chips">
            {data.kitIds.map((id) => (
              <a key={id} className="chip" href={routeHash({ page: "picker", enemy: id })} aria-current={id === enemy.id ? "true" : undefined}>
                {data.byId.get(id)?.name ?? id}
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className="title-row">
        <h2>Counters to {enemy.name}</h2>
        <span className={`tag ${hasKit ? "full" : "partial"}`}>{hasKit ? "Simulated + ledger" : "Ledger only"}</span>
        <a href={routeHash({ page: "kit", champion: enemy.id })}>{enemy.name}'s kit</a>
      </div>
      <SimulatedSection data={data} enemy={enemy} hasKit={hasKit} />
      <LedgerSection data={data} enemy={enemy} />
    </>
  );
}

interface SimulatedRowData {
  id: string;
  scenarios: Array<number | null>;
  score: number;
  /** The matchup's item builds, when the duels shown are the build matrix's. */
  builds?: BuildsMatchup;
}

function SimulatedSection({ data, enemy, hasKit }: { data: AppData; enemy: Champion; hasKit: boolean }) {
  const { settings } = useSettings();
  const { wanted } = useResults();
  const others = useMemo(() => data.kitIds.filter((id) => id !== enemy.id), [data, enemy.id]);
  const builds = shownResults(data.builds, wanted, settings) === "builds" ? data.builds : undefined;
  const custom = hasKit && !builds && needsSimulation(settings, data.precomputedCompatible);
  const batch = useMatchupBatch(data, others, enemy.id, settings, custom);
  const rows = useMemo(() => {
    if (!hasKit) return [];
    return others
      .map((id): SimulatedRowData | undefined => {
        if (builds) {
          const matchup = buildsMatchup(builds, id, enemy.id, settings);
          return matchup ? { id, scenarios: matchup.scenarios, score: matchup.score, builds: matchup } : undefined;
        }
        const run = custom ? batch.runs.get(id) : undefined;
        const values = custom ? undefined : data.simulated.matchups[id]?.[enemy.id];
        const scenarios = custom ? run?.scenarios.map((s) => s.score) : values?.slice(1);
        const score = custom ? run?.score : values?.[0];
        return scenarios && typeof score === "number" ? { id, scenarios, score } : undefined;
      })
      .filter((row): row is SimulatedRowData => row !== undefined)
      .sort((a, b) => b.score - a.score || compareChampionIds(a.id, b.id));
  }, [hasKit, others, builds, custom, batch.runs, data, enemy.id, settings]);

  return (
    <section className="section" aria-labelledby="simulated-head">
      <div className="title-row">
        <h3 id="simulated-head">Simulated duels</h3>
        {hasKit ? <Confidence full /> : null}
        {hasKit && data.builds ? <ResultsToggle /> : null}
      </div>
      {!hasKit ? (
        <p className="note">
          {enemy.name} has no simulator kit yet, so there are no duel results. The {data.kitIds.length} simulated champions are the chips above; the rest come in
          milestone 7.
        </p>
      ) : (
        <>
          {builds ? (
            <p className="note">
              Each pick fought {enemy.name} through six scenarios, both at level 20 with six finished items: each side's build is the one the build search found to do
              best against the other's. The score runs from −1 ({enemy.name} wins every time) to +1 (the pick does). Open a row for the scenarios and both builds.
            </p>
          ) : (
            <p className="note">
              Each pick fought {enemy.name} through six scenarios, both at level 20 and each spending {settings.gold.toLocaleString("en-US")} gold of plain stats against the
              other. The score runs from −1 ({enemy.name} wins every time) to +1 (the pick does). Open a row for the scenarios.
              {data.builds && wanted === "builds" ? " The item builds were played at the default fight settings, so with yours the duels are plain stats." : ""}
            </p>
          )}
          {batch.error ? <ErrorBox error={batch.error} /> : custom && batch.done < batch.total ? (
            <div className="section" aria-live="polite">
              <p className="note">
                {data.precomputedCompatible ? "Running the duels with your settings" : "Updating the duel results"}: {batch.done} of {batch.total}.
              </p>
              <Progress done={batch.done} total={batch.total} />
            </div>
          ) : (
            <>
              <ScaleHead left={`${enemy.name} wins`} right="Pick wins" />
              <ol className="rows">
                {rows.map((row, i) => (
                  <SimulatedRow key={row.id} data={data} enemy={enemy} rank={i + 1} row={row} />
                ))}
              </ol>
            </>
          )}
        </>
      )}
    </section>
  );
}

function SimulatedRow({ data, enemy, rank, row }: { data: AppData; enemy: Champion; rank: number; row: SimulatedRowData }) {
  const [open, setOpen] = useState(false);
  const { settings } = useSettings();
  const name = data.byId.get(row.id)?.name ?? row.id;
  const variants = row.builds?.variants;
  return (
    <li className="row" data-open={open}>
      <button type="button" className="row-main cols" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="rank">{rank}</span>
        <span className="name">{name}</span>
        <ScoreBar value={row.score} />
        <Score value={row.score} />
        <span className="chev" aria-hidden="true">
          ›
        </span>
      </button>
      {open ? (
        <div className="detail">
          {SCENARIOS.map((id, i) => (
            <div key={id} className="scen">
              <span className="label">
                {SCENARIO_LABELS[id]} ({Math.round(settings.weights[id] * 100)}%)
              </span>
              <ScoreBar value={row.scenarios[i]} />
              <span className="val">{row.scenarios[i] === null ? "n/a" : <Score value={row.scenarios[i]} />}</span>
            </div>
          ))}
          {row.builds ? <BuildLists names={[name, enemy.name]} builds={row.builds.builds} /> : null}
          <VariantNotes names={[name, enemy.name]} ids={[row.id, enemy.id]} variants={variants} />
          <div className="row-links">
            <a href={routeHash({ page: "matchup", you: row.id, enemy: enemy.id })}>
              {name} vs {enemy.name}: fights and numbers
            </a>
            <a href={routeHash({ page: "kit", champion: row.id })}>{name}'s kit</a>
          </div>
        </div>
      ) : null}
    </li>
  );
}

const FIRST_ROWS = 20;
const OPEN_ROWS = 5;

function LedgerSection({ data, enemy }: { data: AppData; enemy: Champion }) {
  const ranking = useMemo(() => {
    const profile = data.profiles.get(enemy.id);
    return profile ? rankCounters(profile, [...data.profiles.values()], data.ledger) : undefined;
  }, [data, enemy.id]);
  const [all, setAll] = useState(false);
  useEffect(() => setAll(false), [enemy.id]);
  if (!ranking) return null;
  const rows = ranking.ranking;
  const max = Math.max(0.01, ...rows.map((r) => Math.abs(r.net)));
  return (
    <section className="section" aria-labelledby="ledger-head">
      <div className="title-row">
        <h3 id="ledger-head">Interaction ledger</h3>
        <Confidence full={false} />
      </div>
      <p className="note">
        Every champion, ranked by what its abilities do against {enemy.name}'s: projectile blocks, spell shields, parries, dash stops, crowd control and range. It weighs
        the interactions without playing the fight out. Green tags are hard counters.
      </p>
      <ScaleHead left={`Favors ${enemy.name}`} right="Favors the pick" />
      <ol className="rows">
        {rows.slice(0, all ? rows.length : FIRST_ROWS).map((row, i) => (
          <LedgerRow key={row.champion} data={data} enemy={enemy} rank={i + 1} row={row} max={max} startOpen={i < OPEN_ROWS && row.reasons.length > 0} />
        ))}
      </ol>
      {!all && rows.length > FIRST_ROWS ? (
        <button type="button" className="button" onClick={() => setAll(true)}>
          Show all {rows.length}
        </button>
      ) : null}
    </section>
  );
}

type RankingRow = ReturnType<typeof rankCounters>["ranking"][number];

function LedgerRow({ data, enemy, rank, row, max, startOpen }: { data: AppData; enemy: Champion; rank: number; row: RankingRow; max: number; startOpen: boolean }) {
  const [open, setOpen] = useState(startOpen);
  useEffect(() => setOpen(startOpen), [startOpen, enemy.id]);
  const name = data.byId.get(row.champion)?.name ?? row.champion;
  const checks = [...new Set(row.hardCounters.map((e) => e.check))];
  return (
    <li className="row" data-open={open}>
      <button type="button" className="row-main cols" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="rank">{rank}</span>
        <span className="name">{name}</span>
        <ScoreBar value={row.net} scale={max} />
        <Score value={row.net} />
        <span className="chev" aria-hidden="true">
          ›
        </span>
      </button>
      {open ? (
        <div className="detail">
          {checks.length > 0 ? (
            <div className="hc">
              {checks.map((check) => (
                <span key={check} className="tag hard">
                  {check}
                </span>
              ))}
            </div>
          ) : null}
          <ul className="reasons">
            {row.reasons.length === 0 ? <li className="muted">No interaction in {name}'s favor.</li> : null}
            {row.reasons.map((reason) => (
              <li key={`${reason.check}|${reason.by.name}|${reason.against.name}`} className="pro">
                <span className="sign">+</span>
                <span>{reason.summary}</span>
              </li>
            ))}
            {row.risks.slice(0, 1).map((risk) => (
              <li key={`${risk.check}|${risk.by.name}|${risk.against.name}`} className="con">
                <span className="sign">−</span>
                <span>{risk.summary}</span>
              </li>
            ))}
          </ul>
          <div className="row-links">
            <a href={routeHash({ page: "matchup", you: row.champion, enemy: enemy.id })}>
              {name} vs {enemy.name}: every interaction
            </a>
            <a href={routeHash({ page: "kit", champion: row.champion })}>{name}'s kit</a>
          </div>
        </div>
      ) : null}
    </li>
  );
}
