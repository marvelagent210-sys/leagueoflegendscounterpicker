# Kit-Based Counter Picker: Plan

Status: planning. Data sources checked on 2026-10-08 against patch 26.20 (Data Dragon 16.20.1).

## 1. What we're building

A static web app for top lane. You pick the enemy champion, and it ranks every champion in the game by how well its **kit** beats the enemy's kit in a **1v1 at level 20**. Every result explains itself down to individual ability interactions.

### Ground rules (decided)

| Rule | Detail |
|---|---|
| Kits only | No win rates, matchup statistics, tier lists or meta. No runes or summoner spells. Correctness is checked with hand-written tests (§8), not statistics. |
| Level 20 | Completing the Top Lane Role Quest raises the level cap from 18 to 20, so both champions are level 20. Base stats keep growing through level 20. Skill points stop at 18, so basic abilities are rank 5 and the ultimate is rank 3. Effects that scale with champion level use the game's own formulas, which say whether they keep growing past 18 or cap there. |
| Pure 1v1 | No draft, teammates, jungler or lane phases, and no early-game power spikes. |
| Any champion | You can play every champion, so all 173 are candidates. The enemy can also be any champion; champions the client tags as top lane are listed first. |
| Static web app | No backend, accounts or API keys. |
| Open | The stat budget at level 20 (§10). |

## 2. How a counter is decided

Champion B counters champion A when B's kit wins the 1v1 situations that decide top lane:
- all-ins, whoever starts them;
- short trades;
- the spacing game, meaning who controls when a fight happens.

Two engines work together:

1. **Interaction ledger.** Lists every ability-vs-ability interaction between the two kits, built from per-ability data flags and the wiki's interaction notes. Examples: "Poppy W stops Riven's Q dashes"; "Yasuo W can't block Darius E (not a projectile)"; "Teemo's blind doesn't make Gangplank's Q miss".
2. **Duel simulator.** Plays the fights out with exact level-20 numbers: windups, missile speeds, cooldowns, crowd control (CC) durations, shields, heals and resource costs. For each scenario it returns win probability, HP left and time-to-kill, plus a timeline.

The simulator decides the score. The ledger explains it and flags hard counters. Until a champion's simulator behavior is verified, its matchups fall back to a ledger-only estimate marked **partial**.

## 3. Data sources (checked 2026-10-08)

| Source | What we use | Notes |
|---|---|---|
| LoL Wiki `Module:ChampionData/data` | Base stats and growth; attack windup parameters (`as_ratio`, `windup_modifier`, `attack_delay_offset`); pathing and selection radius; client positions | Current. Each entry records its last-changed patch (up to V26.20). |
| LoL Wiki ability data, `Template:Data <Champion>/<Ability>` | Values per rank and ratios; cooldown, cost, range, width, missile speed, cast time; flags `targeting`, `projectile`, `spellshield`, `parry`, `grounded`, `knockdown`; **notes** with edge-case interactions | 2,251 pages covering every form and variant (Mini and Mega Gnar, Hwei's 10 spells, Aphelios's weapons, Udyr's awakened stances, and so on). Fetched through the MediaWiki API at 50 pages per request and pinned by revision ID. |
| CommunityDragon game files (16.20) | Authoritative numbers and formulas: spell calculations (including the level-scaling formulas that decide behavior past level 18), cast times, windup cancel rules, missile data, collision radius | Cross-checks the wiki and wins when the wiki lags behind a patch. |
| Data Dragon 16.20.1 | Champion and ability icons; a third cross-check for stats and cooldowns | Tooltip text isn't used because it's partly unfilled placeholders. |
| Wiki page "List of champions/Statistics at level 20" | Test oracle for our level-20 stat math | |
| Meraki Analytics | Not used | Stale since about mid-2025 and missing Zaahen and Locke. |

The pipeline runs these stages:
1. `fetch`: cache raw files per patch.
2. `parse`: turn wiki markup into JSON.
3. `normalize`: map everything to one schema.
4. `crosscheck`: compare wiki values with game files and report mismatches.

The result goes into `data/<patch>/`, committed to the repo along with a per-patch diff report.

## 4. Kit model

### 4.1 Champion at level 20

- **Stats.** A stat at level *n* = base + growth × (*n* − 1) × (0.7025 + 0.0175 × (*n* − 1)). At level 20 that is 19.665 × growth, compared with 17 × growth at level 18.
- **Attack speed and windup.** Attack speed growth is bonus attack speed, scaled by the champion's attack-speed ratio. Attack windup comes from the windup parameters.
- **Other basics.** Collision radius (which affects skillshot hit chance), movement speed, health and resource regeneration, and resource pool.
- **Forms and states.** Mini/Mega Gnar, Kayle's evolutions, Nidalee/Jayce/Elise forms, Udyr's stances and awakenings, Shyvana's dragon form, and others.
- **Stack assumptions.** Some kits grow with game time: Nasus Q, Sion W health, Cho'Gath R, Smolder Q, Gangplank's ultimate upgrades and others. The default is "typical by the time a top laner reaches level 20", adjustable per champion.

### 4.2 Ability record

There is one record per ability per form:

- **Numbers at max rank.** Each effect is a base value plus ratios: AD, bonus AD, AP, max or bonus HP, armor, magic resist (MR), attack speed, and the target's max, current or missing HP.
- **Timing.** Cooldown; cast time and whether attack speed shortens it; channel or charge time; recast windows; charges and recharge; lockouts.
- **Geometry.** Range (measured from center or edge), width or radius, missile speed, dash speed and distance.
- **Delivery flags:**
  - targeting type;
  - projectile (can be intercepted);
  - blocked by spell shields;
  - how parries, dodges and blinds treat it;
  - usable while grounded or knocked down;
  - needs a unit, wall or brush.
- **Effects** (typed):
  - **Offense:** damage, empowered attack, auto-attack reset, on-hit, execute threshold, anti-heal.
  - **Control:** each CC type with its duration.
  - **Movement:** dash and blink.
  - **Defense:** shield, heal, damage reduction, untargetable, invulnerable, stasis, CC immunity, unstoppable, cleanse, tenacity, death prevention, revive.
  - **Vision:** stealth, camouflage, reveal.
  - **Other:** stat buff or steal, summons, terrain or zones, transformation, resource gain and spend.
- **Exceptions from the wiki notes.** For example: "Blinding Dart does not make on-hit abilities (Parrrley, Mystic Shot) miss."
- **Evidence.** Every value and effect links back to the wiki revision or game file it came from.

### 4.3 Global game rules

These are encoded once and unit-tested:
- **Damage:** armor and MR multipliers including negative values; the order of reduction and penetration.
- **Defense:** shield order; healing modifiers.
- **Crits.**
- **CC rules:** CC categories, what tenacity reduces, what can be cleansed.
- **Movement:** slow stacking (only the strongest slow applies); movement-speed soft caps; what interrupts a dash.
- **Attacks and casting:** attack timer, windup and cancel rules, spell buffering.
- **Range:** edge-to-edge versus center measurement.
- **Timing:** the server's 30 ticks per second.

### 4.4 Behaviors

Each champion has a behavior that tells the simulator how to play the kit:
- an **all-in** rotation;
- a **short-trade** pattern;
- a **spacing** preference;
- **reactions** to enemy casts.

A default behavior is generated from the ability data: close the gap when out of range, lead with CC, use damage on cooldown, and use defensive tools in response to big threats. Unusual kits get small hand-written TypeScript modules on top. Examples:
- Sylas R steals the enemy's ultimate, so in a 1v1 he gets *your* ultimate.
- Mordekaiser R steals stats.
- Gnar has a rage cycle.
- Riven has animation cancels and a Q chain.
- Fiora's vitals depend on positioning.
- Yasuo R needs an airborne target.
- Illaoi has tentacles; Yorick has ghouls and the Maiden; Heimerdinger has turrets; Gangplank has barrels.
- Sion, Zac and Anivia have revive passives.
- Hwei, Aphelios and Viego have unique kits.

## 5. Interaction ledger

For every ordered pair (your ability, enemy ability), including basic attacks and passives, the ledger runs these checks:

| Check | Examples and edge cases |
|---|---|
| Projectile interception | Yasuo W, Samira W and Braum E against abilities flagged as projectiles. Yasuo's Q3 whirlwind is a missile and can be intercepted. |
| Spell shields | Sivir E and Nocturne W against abilities flagged as spell-shieldable. Partial cases too: a spell shield removes only the silence from Garen Q. |
| Parries and dodges | Fiora W, Jax E and Shen W against attacks and abilities. Riposte stuns back only if Riposte itself negates an immobilizing effect. Lifesteal from a parried hit still heals the attacker. |
| Anti-dash | Poppy W against dashes. It doesn't stop dashes by CC-immune, displacement-immune, untargetable or spell-shielded units, such as Malphite R, Volibear R or Zed R. |
| Grounding | Cassiopeia W and Singed W against movement abilities. |
| Blind, disarm, attack-speed slow | Against basic attacks and attack-based abilities, with the listed exceptions. |
| Untargetable, invulnerable, stasis | Against targeted abilities, when the ability's cast time leaves enough time to react. |
| CC immunity, cleanse, tenacity | Against each CC effect. |
| Interrupts | Hard CC against channels and charge-ups. |
| Death prevention | Against executes. |
| Damage reflection | Against attackers. |
| Reveal; anti-heal | Reveal against stealth; anti-heal against healing. |
| Range | Range measured from center or from edge. Teemo's Q out-ranges his own basic attack by 45–70 units against champions. |

Each entry stores the direction, severity, timing condition and evidence.

## 6. Duel simulator

### Model

- **One dimension.** The simulator tracks the distance between the two champions. 2D effects such as side-stepping, cones and facing enter through the hit model.
- **Event timing.** Events are quantized to the server's 30 ticks per second. Tracked state includes:
  - attack timers, windups and cancels;
  - cast times and missiles in flight;
  - CC, buffs and debuffs;
  - shields and heals;
  - cooldowns, resources, stacks and forms.
- **Skillshot hit model.** Compares two times:
  - the time until impact (cast time plus travel);
  - the time the target needs to leave the hit area, based on movement speed and collision radius, plus reaction time (default 0.25 s) and any dash available.
- **Probabilities.** The simulator branches on the few skillshots that decide a fight (hit or miss) and averages the minor ones. That gives exact win probabilities and is fast enough to precompute every pairing at build time.
- **Skill level.** Both sides play perfectly within human reaction time, including reactions such as:
  - Fiora W into a telegraphed stun;
  - Jax E as attacks come in;
  - Yasuo W into projectiles;
  - untargetable abilities saved for executes.

### Scenarios

Every scenario starts at level 20 with full HP and resource and everything off cooldown.

1. **You engage:** all-in from your best engage range.
2. **The enemy engages.**
3. **Brawl:** fight from melee range.
4. **Short trade:** your best trade, then disengage. The result is the net HP exchanged.
5. **Spacing:** can the longer-ranged or faster side keep its distance and win, or can the other side force contact?
6. **Escape:** can whoever loses the all-in get away?

### Environment toggles (defaults in brackets)

- Minion wave present [on]: dash targets for Yasuo and Irelia; graves for Yorick.
- Walls nearby [on]: Camille E; Poppy and Vayne wall stuns; Illaoi tentacles.
- Brush nearby [on]: Rengar.
- Lane setup [on]: Heimerdinger turrets and Teemo mushrooms placed in advance.

## 7. Scoring and output

- **Counter score.** A weighted blend of the scenario results; the weights live in one config file.
- **Hard-counter badges.** Taken from the ledger.
- **Confidence.** "Full" when both kits are simulated, "partial" when the result is ledger-only.

### Pages

1. **Enemy picker.** A ranked list of all champions with score bars and the top three reasons for each.
2. **Matchup page.** Verdict, scenario results, key interactions, fight timelines, side-by-side level-20 numbers, and the assumptions used.
3. **Kit page.** Everything the engine knows about one champion, with evidence links, so you can audit it.
4. **Settings.** Stat budget, environment toggles, reaction time, stack assumptions and scenario weights.

Every pairing (173 × 172) is precomputed for the default settings at build time. When you change settings, the selected enemy's list is recomputed in a background Web Worker.

## 8. Validation without statistics

1. **Math tests.** Level-20 stats against the wiki's level-20 table; damage, penetration, tenacity and slow stacking.
2. **Interaction tests.** For example:
   - Yasuo W blocks the Q3 whirlwind but not Darius E.
   - Poppy W doesn't stop Malphite R.
   - Teemo's blind doesn't make Gangplank Q miss.
   - Riposte stuns back only under the right conditions.
3. **Golden matchups.** About 60 kit-driven top-lane matchups, written together with you as the domain expert. Each states the expected winner and a rough margin. Draft examples to confirm:
   - Poppy beats Riven, Irelia and Yasuo (W stops their dashes).
   - Teemo beats Tryndamere (blind).
   - Jax beats Tryndamere (E dodges his attacks).

   A failing test blocks a release.
4. **Kit audits.** You skim the kit pages for anything wrong, and each correction becomes a test.

## 9. Build order

| # | Milestone | Done when |
|---|---|---|
| M1 | Data pipeline and level-20 stat math | All 173 champions are fetched and parsed, and their stats match the wiki's level-20 table. |
| M2 | Ability records for every champion, plus kit pages | Every ability is parsed with numbers, flags and evidence, and mismatches with the game files are listed. |
| M3 | Interaction ledger and interaction tests | The ledger works for any pair, and the first usable ranking exists (ledger-only, marked "partial"). |
| M4 | Simulator core and global rules | Generic mechanics pass unit tests on synthetic kits. |
| M5 | Behavior wave 1 (about 25 top laners you choose, e.g. the ones you face most) and golden matchups | Golden tests pass and you've reviewed the results. |
| M6 | Web app on GitHub Pages | Picker, matchup page, kit page and settings are live. |
| M7 | Behavior waves 2 and 3 | All remaining top-lane champions, then all 173, are simulated. |
| M8 | Patch automation | A scheduled job refetches the data, rebuilds, runs the tests, and opens a PR with a diff report. |

## 10. Open decision: the stat budget at level 20

With zero items, ability ratios (AP, bonus AD, bonus HP) add nothing at level 20, so a large part of many kits is never measured.

- **(a) Pure kit, no items.** The strictest reading of "kits only". Champions whose kits scale through ratios (for example Kayle and Vladimir) look weaker than they are, and champions with big base numbers look stronger.
- **(b) Equal raw-stat budget (recommended).** Everyone gets the same gold. It's spent on plain stats only (no item passives), allocated by the champion's own ratios, with defensive stats split against the opponent's damage type. A slider runs from 0 gold (option a) up to a full build.

## 11. Tech and layout

The whole project is TypeScript: Node scripts for the pipeline, Vitest for tests, Vite + React for the UI, and GitHub Pages deployed through GitHub Actions.

```
pipeline/   fetch, parse, normalize, crosscheck
data/       generated kit data per patch (committed)
engine/     game rules, interaction ledger, duel simulator, scoring
kits/       per-champion behaviors and overrides
tests/      math, interaction and golden-matchup tests
web/        the app
```

## 12. Risks

- **Behavior work is the bulk of the project.** There are 173 champions and 2,251 ability pages including variants. It's done in waves, and the ledger-only fallback keeps the app useful in the meantime.
- **Wiki errors or lag after a patch.** Mitigated by cross-checking against the game files and pinning revisions.
- **The 1D simplification.** Side-stepping, cones and facing are approximated by the hit model.
- **Assumptions shape the results.** Reaction time, environment, stacks and behaviors are all explicit, adjustable and shown on every matchup page.
- **Legal.** The app needs Riot's fan-project disclaimer and attribution under the wiki's license.
