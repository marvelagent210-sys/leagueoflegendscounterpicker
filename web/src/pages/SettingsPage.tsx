/** The settings a visitor can change; the precomputed results use the defaults. */
import { SCENARIO_LABELS, SCENARIOS } from "../../../engine/sim/scenarios";
import { ResultsToggle } from "../components/ResultsToggle";
import type { AppData } from "../data";
import { useSettings } from "../hooks";
import { type AppSettings, DEFAULT_APP_SETTINGS, GOLD_RANGE, KIT_OPTIONS, REACTION_RANGE } from "../settings";

const ENVIRONMENT: Array<{ key: keyof AppSettings["environment"]; label: string; effect: string }> = [
  {
    key: "walls",
    label: "Walls nearby",
    effect: "Camille's Hookshot and Wall Dive, Poppy's Heroic Charge stun, Ornn's Searing Charge shockwave, Gnar's GNAR! stun, Skarner's Ixtal's Impact stun.",
  },
  { key: "minions", label: "A minion wave", effect: "Yasuo's Sweeping Blade through minions." },
  {
    key: "laneSetup",
    label: "The lane set up in advance",
    effect: "A Noxious Trap of Teemo's waiting between the two, a Tentacle beside Illaoi, Yorick's graves and Heimerdinger's turrets.",
  },
  { key: "brush", label: "Brush nearby", effect: "No simulated champion uses it yet." },
];

export function SettingsPage({ data }: { data: AppData }) {
  const { settings, setSettings } = useSettings();
  const update = (change: Partial<AppSettings>) => setSettings({ ...settings, ...change });
  const totalWeight = SCENARIOS.reduce((sum, id) => sum + settings.weights[id], 0);
  return (
    <>
      <div className="section">
        <p className="eyebrow">Settings</p>
        <h2>How the duels are played</h2>
        <p className="note">
          The rankings use these defaults. Change a setting and the duels against the enemy you pick run again in your browser. Scenario weights also affect which kit
          variants a champion chooses. Settings stay in this browser.
        </p>
        <div>
          <button type="button" className="button" onClick={() => setSettings(DEFAULT_APP_SETTINGS)}>
            Reset to defaults
          </button>
        </div>
      </div>

      {data.builds ? (
        <section className="panel" aria-labelledby="results-head">
          <h3 id="results-head">Duel results</h3>
          <ResultsToggle />
          <p className="note">
            Item builds: each side has the six finished items the build search found to do best against the other's. They were computed in advance at the default fight
            settings: of the settings below, only the scenario weights apply to them, and changing any other but the gold shows plain stats instead. Plain stats: each side
            spends the gold below on plain stats, and the duels run again in your browser when you change a setting.
          </p>
        </section>
      ) : null}

      <section className="panel" aria-labelledby="budget-head">
        <h3 id="budget-head">Stat budget</h3>
        <div className="field">
          <label htmlFor="gold">Gold each champion spends on plain stats</label>
          <div className="field-row">
            <input
              id="gold"
              type="range"
              min={GOLD_RANGE.min}
              max={GOLD_RANGE.max}
              step={GOLD_RANGE.step}
              value={settings.gold}
              onChange={(e) => update({ gold: Number(e.target.value) })}
            />
            <span className="num">{settings.gold.toLocaleString("en-US")} gold</span>
          </div>
          <p className="note">
            0 is the bare kits; {DEFAULT_APP_SETTINGS.gold.toLocaleString("en-US")} is about what a top laner has when the role quest takes it to level 20. Each side spends its gold
            by its own ratios against the other's build, at the stats' gold values from the wiki, with penetration capped near what items give.
            {data.builds ? " The item builds buy their own items, so the gold applies to plain stats only." : ""}
          </p>
        </div>
      </section>

      <section className="panel" aria-labelledby="reaction-head">
        <h3 id="reaction-head">Reactions</h3>
        <div className="field">
          <label htmlFor="reaction">Reaction time</label>
          <div className="field-row">
            <input
              id="reaction"
              type="range"
              min={REACTION_RANGE.min}
              max={REACTION_RANGE.max}
              step={REACTION_RANGE.step}
              value={settings.reactionTime}
              onChange={(e) => update({ reactionTime: Number(e.target.value) })}
            />
            <span className="num">{settings.reactionTime.toFixed(2)} s</span>
          </div>
          <p className="note">How long both champions take to respond to what the other starts: dodging skillshots, parrying, shielding.</p>
        </div>
      </section>

      <section className="panel" aria-labelledby="environment-head">
        <h3 id="environment-head">Lane surroundings</h3>
        {ENVIRONMENT.map((item) => (
          <label key={item.key} className="check">
            <input
              type="checkbox"
              id={`env-${item.key}`}
              checked={settings.environment[item.key]}
              onChange={(e) => update({ environment: { ...settings.environment, [item.key]: e.target.checked } })}
            />
            <span>
              <strong>{item.label}</strong>
              <br />
              <span className="muted">{item.effect}</span>
            </span>
          </label>
        ))}
      </section>

      <section className="panel" aria-labelledby="weights-head">
        <h3 id="weights-head">Scenario weights</h3>
        <p className="note">How much each scenario counts in the counter score. They are normalized, so only their proportions matter.</p>
        <div className="weights">
          {SCENARIOS.map((id) => (
            <div key={id} className="field">
              <label htmlFor={`weight-${id}`}>{SCENARIO_LABELS[id]}</label>
              <div className="field-row">
                <input
                  id={`weight-${id}`}
                  type="range"
                  min={0}
                  max={0.5}
                  step={0.05}
                  value={settings.weights[id]}
                  onChange={(e) => update({ weights: { ...settings.weights, [id]: Number(e.target.value) } })}
                />
                <span className="num">{totalWeight > 0 ? Math.round((100 * settings.weights[id]) / totalWeight) : 0}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="kits-head">
        <h3 id="kits-head">Kit assumptions</h3>
        <p className="note">What a kit can't read from the wiki. These change only that champion's duels.</p>
        {KIT_OPTIONS.map((option) => {
          const value = settings.kitOptions[option.champion]?.[option.key] ?? option.default;
          const name = data.byId.get(option.champion)?.name ?? option.champion;
          const id = `kit-${option.champion}-${option.key}`;
          const set = (next: number) => {
            const forChampion = { ...settings.kitOptions[option.champion], [option.key]: next };
            update({ kitOptions: { ...settings.kitOptions, [option.champion]: forChampion } });
          };
          return (
            <div key={id} className="field">
              <label htmlFor={id}>
                {name}: {option.label}
              </label>
              <div className="field-row">
                <input id={id} type="number" min={0} step={1} value={value} onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))} />
                {value !== option.default ? <span className="muted">default {option.default}</span> : null}
              </div>
            </div>
          );
        })}
        <p className="note">
          Udyr's ranks: leave all four at 0 to play the best split in each matchup (the precomputed one), or set all four to pin one. Triple Tonic's Elixir of Skill gives him 21 skill points; without it he has 20.
        </p>
      </section>
    </>
  );
}
