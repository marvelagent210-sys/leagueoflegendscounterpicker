/** Everything the engine knows about one champion, with links to the wiki revisions it read. */
import { useMemo } from "react";
import type { AbilityRecord, PetRecord, RuneRecord } from "../../../engine/abilities";
import { FIELD_LABELS, KIND_LABELS, KIND_ORDER, amountAtMax, mechanicLine, wikiUrl } from "../../../engine/abilityText";
import { type CompiledKit, compileKit } from "../../../engine/kits/compile";
import { describeProfileAbility } from "../../../engine/profileText";
import { attackText, describeAbility } from "../../../engine/sim/describe";
import { TOP_LANE_MAX_LEVEL, statsAtLevel } from "../../../engine/stats";
import type { Champion } from "../../../engine/types";
import { KITS } from "../../../kits/champions/index";
import { ErrorBox, Loading } from "../components/common";
import { type AppData, findChampion, loadRecords } from "../data";
import { useAsync, useSettings } from "../hooks";
import { routeHash } from "../routes";
import { kitOptionsFor } from "../settings";

export function KitPage({ data, championId }: { data: AppData; championId: string }) {
  const champion = findChampion(data, championId);
  const records = useAsync(() => (champion ? loadRecords(data, champion.id) : Promise.reject(new Error(`No champion named ${championId}.`))), [champion?.id]);
  if (!champion) return <ErrorBox error={new Error(`No champion named ${championId}.`)} />;
  return (
    <>
      <div className="section">
        <p className="eyebrow">Kit · patch {data.patch}</p>
        <div className="title-row">
          <h2>
            {champion.name}, {champion.title}
          </h2>
          <span className={`tag ${KITS[champion.id] ? "full" : "partial"}`}>{KITS[champion.id] ? "Simulated" : "Ledger only"}</span>
        </div>
        <div className="row-links">
          <a href={routeHash({ page: "picker", enemy: champion.id })}>Counters to {champion.name}</a>
        </div>
      </div>
      <BaseStats champion={champion} />
      {records.error ? <ErrorBox error={records.error} /> : null}
      {!records.value && !records.error ? <Loading>Loading {champion.name}'s abilities…</Loading> : null}
      {records.value ? (
        <>
          {KITS[champion.id] ? <SimulatorKit champion={champion} records={records.value} pets={data.pets.get(champion.id) ?? []} runes={data.runes} /> : null}
          <FightProfile data={data} champion={champion} />
          <WikiAbilities records={records.value} />
        </>
      ) : null}
    </>
  );
}

function fixed(value: number, digits: number): string {
  return value.toFixed(digits).replace(/\.?0+$/, "");
}

function BaseStats({ champion }: { champion: Champion }) {
  return (
    <section className="section" aria-labelledby="base-head">
      <h3 id="base-head">Base stats at level 20</h3>
      <div className="table-wrap wide">
        <table>
          <thead>
            <tr>
              <th>Form</th>
              <th className="n">Health</th>
              <th className="n">Health regen</th>
              <th className="n">AD</th>
              <th className="n">Attack speed</th>
              <th className="n">Armor</th>
              <th className="n">Magic resist</th>
              <th className="n">Range</th>
              <th className="n">Move speed</th>
            </tr>
          </thead>
          <tbody>
            {champion.forms.map((form) => {
              const s = statsAtLevel(form.stats, TOP_LANE_MAX_LEVEL);
              return (
                <tr key={form.name}>
                  <td>{form.name}</td>
                  <td className="n">{fixed(s.hp, 1)}</td>
                  <td className="n">{fixed(s.hpRegen, 2)}</td>
                  <td className="n">{fixed(s.attackDamage, 1)}</td>
                  <td className="n">{fixed(s.attackSpeed, 3)}</td>
                  <td className="n">{fixed(s.armor, 1)}</td>
                  <td className="n">{fixed(s.magicResist, 1)}</td>
                  <td className="n">{s.attackRange}</td>
                  <td className="n">{s.moveSpeed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SimulatorKit({ champion, records, pets, runes }: { champion: Champion; records: AbilityRecord[]; pets: PetRecord[]; runes: RuneRecord[] }) {
  const { settings } = useSettings();
  const options = kitOptionsFor(settings, champion.id);
  const kit = useMemo<CompiledKit | Error>(() => {
    const module = KITS[champion.id];
    if (!module) return new Error(`${champion.name} has no simulator kit.`);
    try {
      return compileKit(champion, records, module, options, pets, runes);
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }, [champion, records, options, pets, runes]);
  if (kit instanceof Error) return <ErrorBox error={kit} />;
  const evidence = [...new Map(kit.evidence.map((e) => [JSON.stringify([e.ability, e.text, e.page, e.revid, e.url]), e])).values()];
  return (
    <section className="section" aria-labelledby="kit-head">
      <h3 id="kit-head">The simulator's kit</h3>
      <p className="note">
        Values come from pinned wiki and versioned game-data records at level 20. Interpretations and missing evidence are listed under assumptions.
      </p>
      <ul className="bullets">
        <li>Basic attack: {attackText(kit.spec.attack)}.</li>
        {kit.spec.extraGold ? <li>Stat budget: {kit.spec.extraGold} gold more than the enemy's.</li> : null}
        {Object.entries(kit.options).map(([key, value]) => (
          <li key={key}>
            {(KITS[champion.id]?.options?.[key]?.label ?? key)}: {value} (change it in Settings).
          </li>
        ))}
      </ul>
      <div className="table-wrap wide">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Ability</th>
              <th className="n">Cooldown</th>
              <th className="n">Cast</th>
              <th>Cost</th>
              <th>Delivery</th>
              <th>On the enemy</th>
              <th>On itself</th>
            </tr>
          </thead>
          <tbody>
            {kit.spec.abilities.map((ability) => {
              const d = describeAbility(ability);
              return (
                <tr key={d.key}>
                  <td>{d.key}</td>
                  <td>{d.name}</td>
                  <td className="n">{d.cooldown} s</td>
                  <td className="n">{d.castTime} s</td>
                  <td>{d.cost}</td>
                  <td>{d.delivery}</td>
                  <td>{d.onEnemy}</td>
                  <td>{d.onSelf}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h3>Assumptions</h3>
      <ul className="bullets">{kit.assumptions.length ? kit.assumptions.map((a) => <li key={a}>{a}</li>) : <li>None.</li>}</ul>
      <details>
        <summary>Every source value it read ({evidence.length})</summary>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ability</th>
                <th>Value</th>
                <th>Source version</th>
              </tr>
            </thead>
            <tbody>
              {evidence.map((e) => (
                <tr key={JSON.stringify([e.ability, e.text, e.page, e.revid, e.url])}>
                  <td>{e.ability}</td>
                  <td>{e.text}</td>
                  <td>
                    <a href={e.url ?? wikiUrl(e.page, e.revid)} target="_blank" rel="noreferrer">
                      {e.sourceVersion ?? e.revid}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

function FightProfile({ data, champion }: { data: AppData; champion: Champion }) {
  const profile = data.profiles.get(champion.id);
  if (!profile) return null;
  const list = (items: string[]) => (items.length ? items.join("; ") : "–");
  return (
    <section className="section" aria-labelledby="profile-head">
      <h3 id="profile-head">What the interaction ledger uses</h3>
      <p className="note">The wiki's interaction flags (yes, no, partly) and what each ability does in a fight. * marks an effect that applies only under a condition.</p>
      <div className="table-wrap wide">
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Ability</th>
              <th className="n">Cooldown</th>
              <th>Delivery</th>
              <th>Applies to the enemy</th>
              <th>Movement</th>
              <th>Gives itself</th>
            </tr>
          </thead>
          <tbody>
            {profile.abilities.map((ability) => {
              const d = describeProfileAbility(ability);
              return (
                <tr key={`${ability.kind}-${ability.name}`}>
                  <td>{ability.kind}</td>
                  <td>{ability.name}</td>
                  <td className="n">{ability.cooldown ?? "–"}</td>
                  <td>{list(d.delivery)}</td>
                  <td>{list(d.applies)}</td>
                  <td>{list(d.movement)}</td>
                  <td>{list(d.states)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function WikiAbilities({ records }: { records: AbilityRecord[] }) {
  const sorted = [...records].sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));
  return (
    <section className="section" aria-labelledby="wiki-head">
      <h3 id="wiki-head">Abilities on the wiki</h3>
      {sorted.map((record) => (
        <article key={`${record.kind}-${record.name}`} className="panel ability">
          <div className="title-row">
            <h3>
              {KIND_LABELS[record.kind] ?? record.kind}: {record.name}
            </h3>
            <a href={wikiUrl(record.page.title, record.page.revid)} target="_blank" rel="noreferrer">
              Wiki revision {record.page.revid}
            </a>
          </div>
          <Fields record={record} />
          <div className="ability-text">
            {record.parts.map((part, i) => (
              <div key={i} className="section">
                {part.text ? <p>{part.text.replace(/\n+/g, " ")}</p> : null}
                {part.leveling.length > 0 || part.mechanics.some((m) => !m.conditional) ? (
                  <ul className="bullets">
                    {part.leveling.map((stat) => (
                      <li key={stat.label}>
                        <strong>{stat.label}:</strong> {stat.amount.text} → at max rank, level 20: {amountAtMax(stat.amount, record.ranks)}
                      </li>
                    ))}
                    {part.mechanics.some((m) => !m.conditional) ? (
                      <li>
                        <strong>Mechanics:</strong>{" "}
                        {part.mechanics
                          .filter((m) => !m.conditional)
                          .map((m) => mechanicLine(m, record.ranks))
                          .join("; ")}
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            ))}
            {record.custom.map((c) => (
              <p key={c.label}>
                <strong>{c.label}:</strong> {c.text}
              </p>
            ))}
          </div>
          {record.notes.length > 0 ? (
            <details>
              <summary>Notes ({record.notes.length})</summary>
              <ul className="bullets">
                {record.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </details>
          ) : null}
        </article>
      ))}
    </section>
  );
}

function Fields({ record }: { record: AbilityRecord }) {
  const rows: Array<[string, string]> = [];
  for (const [key, label] of FIELD_LABELS) {
    const value = record.fields[key];
    if (!value || typeof value === "string") continue;
    rows.push([label, `${value.text}${key === "cost" && record.fields.costType ? ` ${record.fields.costType}` : ""}`]);
  }
  if (record.fields.cooldownStart) rows.push(["Cooldown starts", record.fields.cooldownStart]);
  const f = record.flags;
  const flags = [
    ["Targeting", f.targeting.join(", ") || "–"],
    ["Affects", f.affects.join(", ") || "–"],
    ["Damage type", f.damageType.join(", ") || "–"],
    ["Spell shield blocks it", f.spellShield ?? "–"],
    ["Projectile", f.projectile ?? "–"],
    ["Parry", f.parry ?? "–"],
  ];
  return (
    <div className="table-wrap">
      <table>
        <tbody>
          {[...rows, ...flags].map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
