/** One matchup: its result with item builds, the plain-stats verdict with each scenario and its fight, the numbers, the ledger, and the assumptions. */
import { Fragment, useMemo, useState } from "react";
import { BUDGET_STATS, type BudgetStat } from "../../../engine/budget";
import { buildLedger, isHardCounter, type LedgerEntry } from "../../../engine/ledger/index";
import { SCENARIO_LABELS, SCENARIOS, type ScenarioId } from "../../../engine/sim/scenarios";
import { TOP_LANE_MAX_LEVEL, statsAtLevel } from "../../../engine/stats";
import type { Champion } from "../../../engine/types";
import { buildsMatchup, shownResults } from "../builds";
import { BuildLists, VariantNotes } from "../components/BuildLists";
import { ResultsToggle } from "../components/ResultsToggle";
import { Confidence, ErrorBox, Loading, Score, ScoreBar, percent, signed } from "../components/common";
import { type AppData, findChampion } from "../data";
import { useMatchupRun, useResults, useSettings } from "../hooks";
import { routeHash } from "../routes";
import { type AppSettings, DEFAULT_APP_SETTINGS, fightsChanged, swapShardSides, weightsChanged } from "../settings";
import type { MatchupRun, OutcomeSummary, StatLine } from "../sim/run";

export function MatchupPage({ data, youId, enemyId }: { data: AppData; youId: string; enemyId: string }) {
  const { settings, setSettings } = useSettings();
  const you = findChampion(data, youId);
  const enemy = findChampion(data, enemyId);
  if (!you || !enemy) return <ErrorBox error={new Error(`No champion named ${!you ? youId : enemyId}.`)} />;
  if (you.id === enemy.id) return <ErrorBox error={new Error("Pick two different champions.")} />;
  const simulated = data.kitIds.includes(you.id) && data.kitIds.includes(enemy.id);
  return (
    <>
      <div className="section">
        <p className="eyebrow">Matchup · level 20</p>
        <div className="versus">
          <h2>
            {you.name} vs {enemy.name}
          </h2>
          <Confidence full={simulated} />
        </div>
        <div className="row-links">
          <a href={routeHash({ page: "picker", enemy: enemy.id })}>All counters to {enemy.name}</a>
          <button type="button" className="button swap-sides" onClick={() => {
            setSettings(swapShardSides(settings));
            window.location.hash = routeHash({ page: "matchup", you: enemy.id, enemy: you.id });
          }}>Swap sides</button>
          <a href={routeHash({ page: "kit", champion: you.id })}>{you.name}'s kit</a>
          <a href={routeHash({ page: "kit", champion: enemy.id })}>{enemy.name}'s kit</a>
        </div>
        {simulated && data.builds ? <ResultsToggle /> : null}
      </div>
      {simulated ? (
        <>
          <BuildsResult data={data} you={you} enemy={enemy} />
          <Simulation data={data} you={you} enemy={enemy} />
        </>
      ) : (
        <p className="note">
          {[you, enemy]
            .filter((c) => !data.kitIds.includes(c.id))
            .map((c) => c.name)
            .join(" and ")}{" "}
          {data.kitIds.includes(you.id) || data.kitIds.includes(enemy.id) ? "has" : "have"} no simulator kit yet, so this matchup isn't simulated: only the ledger below
          speaks for it.
        </p>
      )}
      <Interactions data={data} you={you} enemy={enemy} />
    </>
  );
}

/** Which way a score goes, for the verdict: how many scenarios each side takes. */
function verdictLine(score: number, scenarios: Array<number | null>, you: string, enemy: string): string {
  const decided = scenarios.filter((s): s is number => s !== null);
  const won = decided.filter((s) => s > 0.05).length;
  const lost = decided.filter((s) => s < -0.05).length;
  return `${score > 0.05 ? `${you} wins` : score < -0.05 ? `${enemy} wins` : "Even"}: ${you} takes ${won} of ${decided.length} scenarios, ${enemy} ${lost}.`;
}

/** The matchup with item builds, from the build matrix, when the app shows builds. */
function BuildsResult({ data, you, enemy }: { data: AppData; you: Champion; enemy: Champion }) {
  const { settings } = useSettings();
  const { wanted } = useResults();
  if (!data.builds) return null;
  if (shownResults(data.builds, wanted, settings) !== "builds") {
    return wanted === "builds" ? <p className="note">The item builds were played at the default fight settings, so with yours this page shows plain stats only.</p> : null;
  }
  const matchup = buildsMatchup(data.builds, you.id, enemy.id, settings);
  if (!matchup) return null;
  const { score, scenarios, variants } = matchup;
  return (
    <section className="panel" aria-labelledby="builds-head">
      <div className="verdict">
        <div>
          <p className="eyebrow" id="builds-head">
            Counter score for {you.name} with item builds
          </p>
          <p>{verdictLine(score, scenarios, you.name, enemy.name)}</p>
        </div>
        <span className={`big ${score > 0 ? "score win" : score < 0 ? "score lose" : "score"}`}>{signed(score)}</span>
        <ScoreBar value={score} />
      </div>
      <BuildLists names={[you.name, enemy.name]} builds={matchup.builds} loadouts={matchup.loadouts} />
      <div className="scenario-list">
        {SCENARIOS.map((id, i) => (
          <div key={id} className="scen">
            <span className="label">
              {SCENARIO_LABELS[id]} ({Math.round(settings.weights[id] * 100)}%)
            </span>
            <ScoreBar value={scenarios[i]} />
            <span className="val">{scenarios[i] === null ? "n/a" : <Score value={scenarios[i]} />}</span>
          </div>
        ))}
      </div>
      <VariantNotes names={[you.name, enemy.name]} ids={[you.id, enemy.id]} variants={variants} />
      <p className="note">
        Level 20, six finished items each, with two summoner spells and a rune page, in a typical 30-minute game. Each build is the one the build search found to do best
        against the other's, settled by fights between each side's best routes; then each side's keystone and second summoner spell were fought for against the other's,
        and the rest of its rune page chosen by the build search's estimate. The searches are too slow for the browser, so these results were computed in advance at the
        default fight settings
        {weightsChanged(settings) ? ", and the scenarios are reweighed by your weights (the builds were searched with the default ones)" : ""}. The fights below, which you
        can watch tick by tick, are the plain-stats duels.
      </p>
    </section>
  );
}

function Simulation({ data, you, enemy }: { data: AppData; you: Champion; enemy: Champion }) {
  const { settings } = useSettings();
  const { wanted } = useResults();
  const run = useMatchupRun(data, you.id, enemy.id, settings, true);
  if (run.error) return <ErrorBox error={run.error} />;
  if (!run.value) return <Loading>Playing out the six scenarios…</Loading>;
  return <Results you={you} enemy={enemy} run={run.value} settings={settings} plain={shownResults(data.builds, wanted, settings) === "builds"} />;
}

const OUTCOME_LABELS: Partial<Record<ScenarioId, [string, string]>> = {
  shortTrade: ["Your trade", "Their trade"],
  escape: ["You run", "They run"],
};

function outcomeText(o: OutcomeSummary, you: string, enemy: string): string {
  const parts = [`${you} wins ${percent(o.win[0])}`, `${enemy} wins ${percent(o.win[1])}`];
  if (o.draw > 0.005) parts.push(`draw ${percent(o.draw)}`);
  if (o.timeout > 0.005) parts.push(`time runs out ${percent(o.timeout)}`);
  if (o.escaped > 0.005) parts.push(`escaped ${percent(o.escaped)}`);
  if (o.disengaged > 0.005) parts.push(`backed off ${percent(o.disengaged)}`);
  parts.push(`health left ${percent(o.hp[0])} vs ${percent(o.hp[1])}`, `${o.seconds.toFixed(1)} s`);
  if (o.branches > 1) parts.push(`${o.branches} branches`);
  return parts.join(", ");
}

/** The live plain-stats duels; `plain` says so in the verdict, beside the item builds' results. */
function Results({ you, enemy, run, settings, plain }: { you: Champion; enemy: Champion; run: MatchupRun; settings: AppSettings; plain: boolean }) {
  const score = run.score;
  const fights = run.scenarios.flatMap((s) =>
    s.outcomes.map((o, i) => ({ key: `${s.id}-${i}`, label: s.outcomes.length > 1 ? (OUTCOME_LABELS[s.id]?.[i] ?? `${SCENARIO_LABELS[s.id]} ${i + 1}`) : SCENARIO_LABELS[s.id], outcome: o })),
  );
  const [fight, setFight] = useState(fights[0]?.key);
  const shown = fights.find((f) => f.key === fight) ?? fights[0];
  return (
    <>
      <section className="panel" aria-label="Verdict">
        <div className="verdict">
          <div>
            <p className="eyebrow">Counter score for {you.name}{plain ? " with plain stats" : ""}</p>
            <p>{verdictLine(score, run.scenarios.map((s) => s.score), you.name, enemy.name)}</p>
          </div>
          <span className={`big ${score > 0 ? "score win" : score < 0 ? "score lose" : "score"}`}>{signed(score)}</span>
          <ScoreBar value={score} />
        </div>
        <p className="note">
          −1 means {enemy.name} wins every time, +1 that {you.name} does. Level 20, {settings.gold.toLocaleString("en-US")} gold of plain stats each, reaction time{" "}
          {settings.reactionTime} s{fightsChanged(settings) ? " (your settings)" : ""}.
        </p>
      </section>

      <section className="section" aria-labelledby="scenarios-head">
        <h3 id="scenarios-head">Scenarios</h3>
        <div className="scenario-list">
          {run.scenarios.map((s) => (
            <div key={s.id} className="scenario">
              <div className="scen">
                <span className="label">
                  {SCENARIO_LABELS[s.id]} ({Math.round(settings.weights[s.id] * 100)}%)
                </span>
                <ScoreBar value={s.score} />
                <span className="val">{s.score === null ? "n/a" : <Score value={s.score} />}</span>
              </div>
              <p className="outcome">{s.note}</p>
              {s.outcomes.map((o, i) => (
                <p key={i} className="outcome">
                  {s.outcomes.length > 1 ? `${OUTCOME_LABELS[s.id]?.[i] ?? i + 1}: ` : ""}
                  {outcomeText(o, you.name, enemy.name)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="timeline-head">
        <h3 id="timeline-head">Fights</h3>
        <p className="note">The most likely course of each fight, tick by tick. Uncertain skillshots split a fight into branches; this is the likeliest one.</p>
        <div className="tabs" role="group" aria-label="Fight to show">
          {fights.map((f) => (
            <button key={f.key} type="button" className="chip" aria-pressed={f.key === shown?.key} onClick={() => setFight(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        {shown ? <Timeline entries={shown.outcome.timeline} you={you.name} enemy={enemy.name} /> : null}
      </section>

      <CombatNumbers you={you} enemy={enemy} run={run} />
      <Assumptions you={you} enemy={enemy} run={run} settings={settings} />
    </>
  );
}

function Timeline({ entries, you, enemy }: { entries: OutcomeSummary["timeline"]; you: string; enemy: string }) {
  if (entries.length === 0) return <p className="note">Nothing happened in this fight.</p>;
  return (
    <ol className="timeline">
      {entries.map((e, i) => (
        <li key={i} className={`side${e.side}`}>
          <span className="t">{(e.tick / 30).toFixed(2)} s</span>
          <span className="who">{e.side === 0 ? you : enemy}</span>
          <span className="what">{e.text}</span>
        </li>
      ))}
    </ol>
  );
}

const STAT_ROWS: Array<[keyof StatLine, string, (v: number) => string]> = [
  ["maxHp", "Health", (v) => Math.round(v).toLocaleString("en-US")],
  ["ad", "Attack damage", (v) => Math.round(v).toString()],
  ["ap", "Ability power", (v) => Math.round(v).toString()],
  ["attackSpeed", "Attack speed", (v) => v.toFixed(2)],
  ["critChance", "Crit chance", (v) => percent(v)],
  ["armor", "Armor", (v) => Math.round(v).toString()],
  ["mr", "Magic resistance", (v) => Math.round(v).toString()],
  ["abilityHaste", "Ability haste", (v) => Math.round(v).toString()],
  ["lethality", "Lethality", (v) => Math.round(v).toString()],
  ["armorPen", "Armor penetration", (v) => percent(v)],
  ["magicPen", "Flat magic penetration", (v) => Math.round(v).toString()],
  ["magicPenPercent", "Magic penetration", (v) => percent(v)],
  ["moveSpeed", "Movement speed", (v) => Math.round(v).toString()],
  ["attackRange", "Attack range", (v) => Math.round(v).toString()],
];

const STAT_NAMES: Record<BudgetStat, string> = {
  ad: "Attack damage",
  ap: "Ability power",
  as: "Attack speed",
  crit: "Crit chance",
  ah: "Ability haste",
  lethality: "Lethality",
  armpen: "Armor penetration",
  mpenflat: "Flat magic penetration",
  mpen: "Magic penetration",
  hp: "Health",
  armor: "Armor",
  mr: "Magic resistance",
};

export function CombatNumbers({ you, enemy, run }: { you: Champion; enemy: Champion; run: MatchupRun }) {
  const base = [you, enemy].map((c) => (c.forms[0] ? statsAtLevel(c.forms[0].stats, TOP_LANE_MAX_LEVEL) : undefined));
  const bought = BUDGET_STATS.filter((stat) => run.spent[0][stat] > 0 || run.spent[1][stat] > 0);
  return (
    <section className="section" aria-labelledby="numbers-head">
      <h3 id="numbers-head">Level-20 combat stats</h3>
      <p className="note">
        Equipped includes the selected kit and purchased stats. Fight setup includes selected stat shards and initial kit effects in the You engage scenario, before the first passive tick.
        Passives and temporary buffs can change these values during the fight.
      </p>
      {you.id === "Poppy" || enemy.id === "Poppy" ? <p className="note">Poppy's resistance bonus and buckler empowerment begin on the first passive tick and are not included in this setup snapshot.</p> : null}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th rowSpan={2} scope="col">Stat</th>
              <th className="n" colSpan={3} scope="colgroup">{you.name}</th>
              <th className="n" colSpan={3} scope="colgroup">{enemy.name}</th>
            </tr>
            <tr>
              {[you, enemy].map((champion) => (
                <Fragment key={champion.id}>
                  <th className="n" scope="col">Base record</th>
                  <th className="n" scope="col">Equipped</th>
                  <th className="n" scope="col">Fight setup</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {STAT_ROWS.map(([key, label, format]) => {
              const baseValue = (i: number) => {
                const b = base[i];
                if (!b) return "–";
                if (key === "maxHp") return format(b.hp);
                if (key === "ad") return format(b.attackDamage);
                if (key === "attackSpeed") return format(b.attackSpeed);
                if (key === "armor") return format(b.armor);
                if (key === "mr") return format(b.magicResist);
                if (key === "moveSpeed") return format([you, enemy][i]?.forms[0]?.stats.moveSpeed ?? 0);
                if (key === "attackRange") return format([you, enemy][i]?.forms[0]?.stats.attackRange ?? 0);
                return format(0);
              };
              return (
                <tr key={key}>
                  <td>{label}</td>
                  <td className="n">{baseValue(0)}</td>
                  <td className="n">{format(run.stats[0][key])}</td>
                  <td className="n">{format(run.openingStats[0][key])}</td>
                  <td className="n">{baseValue(1)}</td>
                  <td className="n">{format(run.stats[1][key])}</td>
                  <td className="n">{format(run.openingStats[1][key])}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Gold spent on</th>
              <th className="n">{you.name}</th>
              <th className="n">{enemy.name}</th>
            </tr>
          </thead>
          <tbody>
            {bought.map((stat) => (
              <tr key={stat}>
                <td>{STAT_NAMES[stat]}</td>
                <td className="n">{Math.round(run.spent[0][stat]).toLocaleString("en-US")}</td>
                <td className="n">{Math.round(run.spent[1][stat]).toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">
        The stat budget buys plain stats at their gold value from the wiki, each side answering the other's build; penetration is capped near what items give.
        {you.id === "Ornn" || enemy.id === "Ornn" ? " Ornn's Masterwork adds gold of its own." : ""}
      </p>
    </section>
  );
}

function Assumptions({ you, enemy, run, settings }: { you: Champion; enemy: Champion; run: MatchupRun; settings: AppSettings }) {
  const env = settings.environment;
  const scene = [
    `Level 20, every ability at max rank, ${settings.gold.toLocaleString("en-US")} gold of plain stats each.`,
    `Reaction time ${settings.reactionTime} s${settings.reactionTime === DEFAULT_APP_SETTINGS.reactionTime ? "" : " (your setting)"}.`,
    `Walls nearby: ${env.walls ? "yes" : "no"}. Minion wave: ${env.minions ? "yes" : "no"}. Lane set up in advance: ${env.laneSetup ? "yes" : "no"}.`,
  ];
  return (
    <section className="section" aria-labelledby="assumptions-head">
      <h3 id="assumptions-head">Assumptions</h3>
      <ul className="bullets">
        {scene.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="two">
        {[you, enemy].map((c, i) => (
          <div key={c.id} className="section">
            <h3>{c.name}'s kit</h3>
            <ul className="bullets">
              {run.assumptions[i]?.length ? run.assumptions[i]?.map((a) => <li key={a}>{a}</li>) : <li>None.</li>}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Interactions({ data, you, enemy }: { data: AppData; you: Champion; enemy: Champion }) {
  const ledger = useMemo(() => {
    const a = data.profiles.get(you.id);
    const b = data.profiles.get(enemy.id);
    return a && b ? buildLedger(a, b, data.ledger) : undefined;
  }, [data, you.id, enemy.id]);
  if (!ledger) return null;
  const sides: Array<[Champion, LedgerEntry[]]> = [
    [you, ledger.entries.filter((e) => e.favors === you.id)],
    [enemy, ledger.entries.filter((e) => e.favors === enemy.id)],
  ];
  return (
    <section className="section" aria-labelledby="ledger-head">
      <div className="title-row">
        <h3 id="ledger-head">Key interactions</h3>
        <Confidence full={false} />
      </div>
      <p className="note">
        What each kit does against the other's, from the interaction ledger, most important first. Net {signed(ledger.score.net)} for {you.name} ({ledger.score.you.toFixed(2)}{" "}
        for, {ledger.score.enemy.toFixed(2)} against).
      </p>
      <div className="two">
        {sides.map(([champion, entries]) => (
          <div key={champion.id} className="section">
            <h3>In {champion.name}'s favor</h3>
            {entries.length === 0 ? <p className="note">None.</p> : null}
            <ul className="entries">
              {entries.map((e) => (
                <li key={`${e.check}|${e.by.name}|${e.against.name}`}>
                  <span>{e.summary}</span>
                  <span className="meta">
                    <span>{e.check}</span>
                    <span>impact {e.impact.toFixed(2)}</span>
                    {isHardCounter(e) ? <span className="tag hard">hard counter</span> : null}
                    {e.timing ? <span>{e.timing}</span> : null}
                  </span>
                  {e.conditions.length > 0 ? <span className="meta">{e.conditions.join(" · ")}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
