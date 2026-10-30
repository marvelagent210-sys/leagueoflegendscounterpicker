# Aphelios — batch 7

Implemented from all fifteen existing primary templates. Every numerical ability input and interaction rule is read before sealing through `KitContext`; runtime state lives in unit/pet memory or actual missiles and statuses. No source fetch, latest substitution, TLS bypass, global registration, profile, golden, timeout, branch budget or tolerance change is part of this handoff.

## Sources

The primary records remain pinned to these exact wiki revisions:

| Template | Revision |
| --- | ---: |
| Calibrum | 4034686 |
| Crescendum | 4064842 |
| Gravitum | 4064840 |
| Infernum | 4046493 |
| Severum | 4064839 |
| Weapon Queue System | 3998993 |
| The Hitman and the Seer | 4022691 |
| Binding Eclipse | 3983351 |
| Duskwave | 4064841 |
| Moonshot | 4064838 |
| Onslaught | 4064859 |
| Sentry | 4034689 |
| Weapons of the Faithful | 3963883 |
| Moonlight Vigil | 4052070 |
| Phase | 3970739 |

The unchanged Sentry pet record is separately attributed to Aphelios revision 4022591. Its exact raw page was independently fetched and verified with SHA-256 `ab69b3fdce2ccdfba2207d28a5eef76c858e2f5d6c75e87062a130930f133b06`; the actual Infobox/Pet confirms the 0.64 cadence, six health, fixed hit damage, radius and explicit Minion classification, and independently confirms the older damage formula conflict. The provided raw-template response is audited against each primary page/revision, with SHA-256 `3b4a42ffe01c415f6a61216d1bbd836537bf6bb18db178567e9ac23550bf2c95`.

Separately versioned game evidence comes only from:

- URL: `https://raw.communitydragon.org/16.20/game/data/characters/aphelios/aphelios.bin.json`
- Version: `16.20.8248524+branch.releases-16-20.content.release`
- SHA-256: `1c6c629c1af168cb9c88886bfebbc440b4cb09a5fb826c6997f3c88c914735bd`

`gameSources` retain the exact object paths and JSON excerpts for Calibrum/Gravitum/Infernum missile movement, the Calibrum attack override, and the R missile/critical calculation. Raw omitted Crescendum acceleration/return-speed and nonlinear-stack formulas, Severum's level-18 healing caps, the Skarner exception and R's critical/Infernum tooltip text are curated into their own primary records' notes without changing attribution.

## Finite starting policy

Root approved ten unordered pairs with full 50-Moonlight weapons. `startingWeapons: -1` searches these ten; specifying 0–9 pins one. The lower-index weapon starts main, Phase makes either held weapon usable, and the remaining three reserves retain canonical Calibrum → Severum → Gravitum → Infernum → Crescendum order.

| Index | Held weapons |
| --- | --- |
| 0 | Calibrum / Severum |
| 1 | Calibrum / Gravitum |
| 2 | Calibrum / Infernum |
| 3 | Calibrum / Crescendum |
| 4 | Severum / Gravitum |
| 5 | Severum / Infernum |
| 6 | Severum / Crescendum |
| 7 | Gravitum / Infernum |
| 8 | Gravitum / Crescendum |
| 9 | Infernum / Crescendum |

This is an explicit preduel preparation assumption, justified by the passive's usage-based rearrangement. It is not a claim that every prepared pair has the same full historical ammo and queue state in an arbitrary live game. There is no Cartesian search over ammunition/history and no preduel marks, shielding, summoned sentries or mirror Chakrams.

## Implemented behavior

All three six-rank stat tracks reach 24 AD, 54% bonus AS and 27 lethality. Basics spend source-defined ammunition at declaration; Q spends up to ten remaining Moonlight and sixty mana. Depletion appends the empty weapon to the reserve tail, assembles the head for one second and locks its Q until 1.5 seconds from assembly start. Phase uses a static 0.8-second cooldown and a 0.25-second switch while preserving declared commands. The five Q clocks are independent.

Calibrum supplies its ordinary range and target-specific 1800-range marks. Actual champion and pet marks are consumed together for one off-hand attack; this spends no ordinary on-attack ammo. Spell shields, attack guards and actual pet identities remain separate. Severum is nonprojectile, uncancellable, heals from post-mitigation damage and accumulates capped excess shielding. Its ordinary attacks, automatic replicas and R initial blast also heal from the actual contacted health pet or clone: local before/after damage snapshots supply this without changing shared champion-only damage hooks. Unclamped pet HP deltas preserve the same post-mitigation overkill basis as champion healing. Block, dodge, parry, spell shield and immunity retain their independent packet rules. Gravitum retains a debuff through ordinary slow immunity, decays its slow at 0.7 seconds, and expunges actual marked targets or empowers actual in-flight missiles. Skarner E's explicitly identified exception is retained.

Onslaught is a finite mobile channel, starts with the off hand, scales its attack count with bonus AS, alternates weapons, reduces attached on-hit damage to 25%, and suppresses pulses under disarming CC/attack lockouts. Its command range is 410 while automatic acquisition uses the pinned 550 radius. W/R remain locked, the cooldown starts after the channel, and intercepted Crescendum attacks retain the explicitly promised returned mirror. Duskwave checks real forward targets and projectile interception, then launches separately guarded off-hand attacks after 0.25 seconds. Its attack lock lasts through outstanding follow-up delivery.

Crescendum retains its exact nonlinear stack table, precise windup fractions, outbound deceleration, AS-scaled return speed, real 0.2-second linger, five-second stack lifetime, catch-based resets and cap. Outbound ordinary attacks bypass projectile walls as pinned; returns can be destroyed and clear mirrors. A mark attack with Crescendum off hand returns one new mirror. R returns six mirrors for the first actual target and one for each additional actual champion-class clone; avoided attacks grant none.

Sentries arm, activate, expire, become targetable and take fixed damage as real pets. Each snapshots its off hand at placement and targets the nearest visible actual enemy. Contact effects and healing use that actual target, with dodge/block guards and the pinned blindness exception. Launched sentry missiles keep their own source pet after the pet/owner dies; root's shared pending-missile lifecycle keeps the duel open through those contacts.

R snapshots the cast weapon, uses the initial blast centered at actual missile contact, ignores ordinary minion-class pets as illumination triggers and includes actual champion-class clones. Initial spell-shield denial does not cancel later lock-on. The follow-up starts from the illumination point, retains projectile and attack guards, ignores blindness and applies the versioned critical expression `1 + 0.3 × critChance × (critDamage − 1)`. Infernum's additional initial damage and actual 400-radius secondary explosions are separate; each actual secondary target receives at most one packet from each real overlapping explosion. A champion-initiated uncertain illumination carries its hit share into all delayed attacks, secondary initial blasts, flat Severum healing and Infernum explosions. A first collision with an actual pet/clone is deterministic under shared missile rules, so the whole illumination receives full share. Duskwave retains its actual contact transaction share. Sentry Calibrum marks require actual HP or shield damage; immunity and a later parried attack cannot reuse an earlier Severum packet to create effects. No imaginary allied hits or kill/farm stacks are awarded.

The reference budget excludes manual weapon abilities from generic terms to prevent double counting. It values ordinary weapon-averaged attacks, five averaged Q packets, one base R and Severum basic sustain. It grants no pre-existing mirror damage or guaranteed fan collateral; all real casts still pay mana, ammo, assembly and channel clocks.

## Source conflicts and limits

- Sentry's primary ability says `125 + 52% bonus AD + 50% AP` at the last level band; the older pet infobox says `100 + 60% bonus AD + 50% AP`. The primary ability wins.
- Severum's omitted raw formulas explicitly cap healing at level 18: 8% for ordinary attacks and 20% for ability attacks. Its shield table continues through level 20 and gives `160 + 6% max HP`.
- The client supplies a 0.3-second Calibrum override, while the primary says the cast shortens with proximity without specifying that formula. The model uses the conservative fixed 0.3 seconds and does not turn invalid-target firing into damage through untargetability.
- The R client movement says 2050 with a separate delay, whereas the pinned primary speed says 1000. The primary speed remains authoritative. Duskwave's client cone range also conflicts with the primary 650; the primary range wins. No server-script reconstruction is claimed.
- Infernum's ordinary multi-bolt fan lacks pinned transverse directions and a reliably attributable ordinary lesser-bolt range. Ordinary fan collateral is omitted; it is never replaced by a guaranteed cone hit. R's separately described circular explosion is modeled once per connected primary, not as fourteen or eighteen guaranteed packets.
- One-dimensional Duskwave uses the source axis and hitbox overlap. Its wave and Sentry placement have no invented additional travel speed. Sentry uses zero unpinned windup, snapshots its deployment weapon, and a melee champion basic destroys its six-health body; those details remain explicit modeling choices where the pinned records do not fully quantify server behavior.
- The uncertain Crescendum attack-speed-limit note is enforced with the shared engine cap. Swapping weapons invalidates a pending ordinary catch reset. Ordinary sight does not reveal invisible targets. Basic attacks and locked-on packets retain ordinary reflection/lifesteal rules.

## Validation

When the shared branch limit forces an uncertain contact into an expected-value
packet, its damage, healing and follow-up damage retain the contact share. Marks
and returned Chakram rewards remain discrete accepted-contact state. The model
does not maintain a probability distribution over later marks, stack counts and
their nonlinear damage table; those conditional future effects are approximate.
Ordinary branched hit/miss worlds keep their separate states.

`npx vitest run tests/kits/aphelios.test.ts --maxWorkers=1` exercises 86 focused tests: pinned evidence, all starting pairs, formulas/stat ranks, ammo/assembly/Phase clocks, channel counts/guards, source conflicts, actual summons and champion clones, mark consumption, nonlinear Chakram damage and returns, walls, postdeath R/Sentry missiles, finite nonduplicated budget and reflected combat health/damage at the existing `1e-10` tolerance.

Both TypeScript projects are checked with `npx tsc --noEmit` and `npx tsc --noEmit -p web`. No golden test, 180-second timeout, branch budget or score tolerance is changed.

The complete-matrix preflight exposed a target-lifetime regression: Duskwave's
initial damage could remove an actual pet before its contact hook queued the
off-hand attack. Follow-ups now require a surviving target still present in the
world. The regression checks both a lethal initial pet hit without a free Chakram
and a surviving pet's exact delayed damage and returned Chakram, plus the original
Infernum/Crescendum versus upgraded-rockets Heimerdinger matchup under production
settings. Already committed attacks may still outlive Aphelios.
