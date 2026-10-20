# Anivia, Malzahar, Zyra: staged implementation blueprints

Read-only audit, 14 October 2026. These champions are **not implemented or counted as simulator coverage** by this document. No checkout files, kit registry, model inputs, tests, or generated results were changed. The current 61-kit refresh remained frozen.

The baseline is the committed `data/16.20` data for patch 26.20. Numbers below are maximum ability rank, champion level 20. AP, bonus AD and target maximum HP mean the simulator's current derived stats unless a snapshot is explicitly described. Damage formulas are raw, before resistances and other defenses.

## Evidence and reading conventions

Primary records: `data/16.20/abilities/{Anivia,Malzahar,Zyra}.json`, corresponding `profiles/`, `kits/`, `pets/{Malzahar,Zyra}.json`, `glossary.json`, `rules.json`, and `wiki-revisions.json`. Note and part indices below are zero based and address these JSON records. Generated kit pages are useful summaries, but are not reliable formula parsers: Malzahar W's flat rank bonus is one concrete counterexample.

Two small read-only requests retrieved **the exact already-pinned revisions**, rather than current wiki content, to recover omitted tables and article notes. Evidence is saved outside the checkout:

- `casters-pinned-raw-revisions.json`: Anivia Rebirth, Malzahar Nether Grasp, Zyra Garden of Thorns/Deadly Spines, and resurrection/cast-inhibiting CC tips.
- `casters-pinned-raw-revisions-extra.json`: Anivia Glacial Storm, Malzahar Void Shift/Void Swarm/Malefic Visions, Zyra Grasping Roots/Rampant Growth, and the Zyra article.

The raw evidence recovered important facts missing from the committed JSON: resurrection preserves existing cast times; Nether Grasp's first 0.5 seconds prevents voluntary movement cancellation; Zyra plants snapshot level/AP; the Malzahar passive has an exception for Zoe E trap drowsy. Those facts will need committed, fail-fast source reads before production implementation, not just hardcoded comments referring to this file.

Shared rule evidence:

| Rule | Pinned revision | Consequence |
|---|---:|---|
| Template:Rounded up to next game tick | 4060754 | `toTicks(t)` is `ceil(30t)`, with a small floating-point tolerance. |
| Types of Crowd Control/Summary | 4035704 | Silence/stun/root/slow use tenacity; suppression and airborne do not. |
| Types of Crowd Control/Sources | 4061740 | Classifies the specific CC sources below. |
| Template:Tip data/Cast-inhibiting crowd control | 4035713 | Airborne, forced actions, silence/polymorph, sleep, stasis, stun/suspension and suppression inhibit casts; root/ground inhibit movement spells only. Disrupt interrupts channels without itself being a CC status. |
| Template:Tip data/Resurrection | 4060644 | Most debuffs are dispelled; revival prevents a counted death; existing cast times are not cancelled; resurrection takes priority over zombie states. |
| Channel | 4002276 | Nether Grasp is a normal channel, not a walking channel. |
| Dash / true sight list | 4035700 / 3860444 | Nether Grasp has knockdown and reveal; Zyra W reveals stepped-on enemies. |
| Module:Gold value/data | 4060632 | Current `rules.json` stat-price inputs; the wiki's value check marker is V14.21. |

### Shared implementation constraints

`KitContext` already supports sourced field/label/quote reads, formulas, pet stats, and explicit assumptions. Capture all reads while building and seal them; do not read the context from runtime hooks. Its formula reader correctly supports target-HP/AP products, but rejects an `other:` ratio such as Malzahar W's **flat** +20. `PetData.stat()` uses the last source value when level 20 is absent and records that fallback as an assumption.

World copies clone `unit.memory`, pet memory, statuses, missiles, zones and terrain. Store mutable schedules and identifiers there. Never mutate shared `AbilitySpec`, `PetSpec`, effect arrays, or closure state during a duel. Existing `onAbilityContact` can substitute an impact-dependent packet without mutating its reusable template.

For quarter-second repeated effects, schedule the nth pulse at `startTick + ceil(n * 0.25 * 30)` or use channel `pulses` with the exact count. Repeating `toTicks(0.25) = 8` drifts: 16 pulses then take 128 ticks instead of 120. Current generic DoT repeats use that 8-tick interval; a Malzahar-specific ordinal scheduler or a general clock improvement is needed. Source statements alone do not settle refresh phase, snapshot policy, or whether the first tick is immediate.

Current real gaps that must be addressed or visibly assumed:

1. **Incoming CC attempts and refusal:** there is no target-side hook for CC negated by immunity, or for later applied pure CC. `applyCC()` returns before hooks when `ccImmune` is present. Malzahar cannot consume/refresh his passive correctly on a damage-free CC attempt using damage hooks alone.
2. **Targeted cast persistence:** `dropTargeting()` unconditionally cancels enemy unit-targeted casts when a target becomes untargetable/invisible. This violates Malzahar E's explicit exception; a per-ability policy is required. `cancelOnInvalidTarget` already provides the ordinary free cancellation needed by Anivia E.
3. **Revival lifecycle:** there is no typed attackable resurrection state or general tether cleanup event. `onLethal` can keep the champion alive, but Anivia's egg differs from Zaahen's invulnerable/untargetable revival. Existing cast actions must survive entry into resurrection even while future actions are locked; channels generally terminate. Source-specific Malzahar R tether exception must override Anivia's general tether-break note.
4. **Piercing/control-point projectiles:** the standard line missile disappears on its first connected champion hit. Anivia Q and Zyra E need continuing flight after champion contact, a single-hit ledger, and independent spatial secondary interactions. Do not reduce both to a targeted impact plus a free follow-up.
5. **Pet damage categories/statuses:** `damagePet` exposes raw/dealt/type/attack/ability, but not persistent/proc/AoE/single-target categories. `PetSpec.hitPoints` only implements one per attack and ignores spells, unlike Zyra's fixed damage table. Pets have no independent CC statuses, windups or general missile attacks. `petHit` checks target dodge/parry/block, but does not implement pet blindness/disarm, incoming champion on-hit notifications, or a target pet for reflected damage. Do not automatically attribute owner blindness, owner lifesteal, or retaliation onto the owner as a substitute.
6. **Vision/reveal:** `canSee()` recognizes invisibility/nearsight, but there is no reveal/true-sight status to expose an invisible target. Merely documenting the reveal while leaving targetability unchanged affects Malzahar R and Zyra W counterplay.
7. **Missing shapes/speeds:** Malzahar R pool radius and Zyra Q damage/seed dimensions are missing even in the archived templates. Anivia W displacement speed is explicitly pending. Plant attack windup/projectile speed and flurry shot spacing are absent. No familiar remembered constants should enter a kit as sourced numbers.

## Anivia

Pinned sources:

| Slot | Page | Revision |
|---|---|---:|
| I | [Rebirth](https://wiki.leagueoflegends.com/en-us/Template:Data_Anivia/Rebirth?oldid=3906517) | 3906517 |
| Q | [Flash Frost](https://wiki.leagueoflegends.com/en-us/Template:Data_Anivia/Flash_Frost?oldid=4026612) | 4026612 |
| W | [Crystallize](https://wiki.leagueoflegends.com/en-us/Template:Data_Anivia/Crystallize?oldid=4007565) | 4007565 |
| E | [Frostbite](https://wiki.leagueoflegends.com/en-us/Template:Data_Anivia/Frostbite?oldid=4057862) | 4057862 |
| R | [Glacial Storm](https://wiki.leagueoflegends.com/en-us/Template:Data_Anivia/Glacial_Storm?oldid=4006729) | 4006729 |

The generated base-stat summary gives approximately 2359.2 HP, 1379.9 mana, 113.9 AD, 0.864 attacks/s, 0.231-second attack windup, 99.6 armor, 55.6 MR, 325 movement speed, and 600 attack range. Attacks are ranged projectiles at 1600 units/s. Use the exact compiler base stats, not these rounded summary numbers.

### Passive: attackable egg

- Static cooldown 240 seconds. Fatal damage restores all maximum health and enters a six-second revival lockout. At level 20, bonus armor and bonus MR are both **+20**, sourced by `levelValue("While under resurrection")` or its level-band series. The game file `RebirthMarker.BonusResists` confirms +20 at levels 18–20.
- Further fatal damage during those six seconds is final. Survival revives with **current** egg HP, not another full heal. No counted death occurs if revival succeeds; do not set `fallen` as Sion does.
- Implement with `onLethal`, direct HP restoration, a one-use/cooldown memory guard, transient sourced resistance buffs, `noMovement`, `noAttacks`, and explicit future-cast gates/custom behavior. Do not use a six-second stun that tenacity or cleanse can shorten. Do not add untargetability or invulnerability.
- Rebirth note 0 breaks tethers; note 2 interrupts all channels except Teleport. The archived `{{ct}}` table forbids move/cast/attack/items/consumables/summoner spells and lists death as the interrupt. The general resurrection tip says **existing cast times are preserved** and most debuffs dispelled. Therefore clearing every action/status by copying Sion's death code is wrong. Capture the preserved cast before applying egg action locks; terminate only channels that the source says terminate.
- Source does not enumerate "most debuffs," the exact treatment of every existing empowerment or persistent buff, or the passive cooldown origin within the revival. Those require a sourced shared revival policy or specific assumptions. No item/rune revival priorities need combat support in the current plain-stat environment, but the hierarchy should stay documented.

### Q: flight, pass-through and manual explosion

| Property | Level-20 maximum-rank value |
|---|---|
| Cost / cooldown | 100 mana / 7 seconds, cooldown starts post-effect |
| Cast / range / speed | 0.25 seconds / 1100 / 950 units/s |
| Width / explosion radius | 220 / 225 |
| Pass-through magic damage | `130 + 0.25 AP` |
| Explosion magic damage | `200 + 0.45 AP` |
| Both packets | `330 + 0.70 AP` |
| Slow | 40% for 3 seconds at R rank 3 |
| Explosion stun | 1.5 seconds; also refreshes the slow |

Read pass-through damage as `q.formula("Magic Damage", 0)` and explosion as occurrence 1; the total label is a check, not another packet. The Q slow source series is keyed by **R rank**, so a level-20 kit must select rank 3 rather than treating it as a champion-level series. The profile's displayed 20% Q slow is only the extractor's first band, not the max-rank result.

Q note 1 fixes launch origin at cast **start**; use `castOrigin: "start"` and preserve its declared direction. At full range, nominal flight is `1100 / 950 = 1.1578947368` seconds after the quantized cast. The manual recast is available after the cast while the projectile is flying; full-range expiration automatically explodes. Recast must use the projectile's current position, not Anivia's center, the target's current center, or its initial position.

Q note 2 says spell shield can block the first or second packet but cannot block both when the first consumes it. Keep independent defense resolution for the two packets. The projectile is blocked by projectile walls; do not leave a free explosion at the target after the missile is destroyed. A single target must not repeatedly take the pass-through packet while its hitbox overlaps successive ticks. Explosion can hit a target that dodged the pass-through if the actual explosion geometry reaches it. The main missile also must not vanish merely because the initial packet was spell-shielded.

E's passive says Flash Frost hits apply Iced for 3 seconds; the source does not explicitly settle whether Iced survives a spell-shielded/parried Q. Guarded packet marking is the conservative implementation choice, but must be stated as an assumption until an exact interaction source exists. Normal parry rules should resolve each packet separately; no Q-specific parry exception is recorded.

### W: real terrain, not a damage spell

Cost 70 mana, cooldown 17 seconds, cast time 0.25 seconds, wall-center range **100–1000**. Wall remains five seconds and knocks **all units** away, without knocking through terrain. Champion displacement is 120 units to either side of a segment; non-champions are pushed 250. Damage is **0 proc true damage** for combat/proc flags, not a positive true-damage hit. Spell shield does not block it.

At rank 5: perpendicular width 1000, eight ice segments, outermost segment-center spacing 800, adjacent-center spacing approximately 114.29. Each segment's gameplay and pathing radii are 100. Its width is perpendicular to the duel axis; using 1000 as longitudinal blockage would be a major geometry error. A one-dimensional wall slab/plane is an explicit spatial reduction. Existing `world.terrain` and `terrainLimit` support a blocking interval affecting both sides and expiring after five seconds. They do not support eight two-dimensional circles or walking around a finite perpendicular wall.

Choose displacement direction from the wall segment, not blindly from caster to enemy. The wall may also push Anivia or enemy pets if placed on them. Honor existing terrain limits. Note 2 literally asks "Knockback speed?"; a fabricated displacement duration cannot be called exact. The source also says the wall does not block sight, so it must not hide targeted opponents or consume projectiles. Terrain must interact meaningfully with Camille/Poppy/Vayne wall effects and ordinary dashes.

### E: impact-dependent doubled damage

Cost 50 mana, cooldown 4 seconds, cast 0.25 seconds, unit-targeted center range 600, homing missile speed 1600. Normal magic damage `155 + 0.55 AP`; against Iced, `310 + 1.10 AP`. Iced lasts three seconds and is refreshed by Flash Frost or **fully formed** R hits.

E note 0 explicitly calculates the bonus **on impact**; use `onAbilityContact` or a pure `amountFor` that examines the target mark at resolution. E cast while unmarked can be doubled if Q/R marks before arrival, and E cast while marked can become ordinary if the mark expires in flight. A partial-growth R does not qualify.

E note 2 cancels invalid casts with no cost/cooldown if the target becomes untargetable/dead/out of range/out of sight **during cast**. Existing `cancelOnInvalidTarget: true` plus ordinary targeting loss is appropriate here. Once its homing missile is launched, target invisibility and actual untargetability retain their separate generic behaviors. Spell shield and projectile walls block the missile; a blocked E should not produce bonus damage through a hook.

### R: independent persistent toggle clocks

- Initial cost 60 mana; ongoing cost **55 mana/s** at rank 3. Cast is instant, target range 750; storm remains at its chosen location. Owner-center distance beyond 1000 deactivates it. Full cooldown is two seconds **after disappearance**, affected by haste. A separate static one-second field exists, but the archived template does not explain which toggle transition it gates. Do not mistakenly make the full two-second cooldown immune to haste or silently assert a precise minimum-on rule without further evidence.
- Radius source points: 200 at 0; then +25 at 0.1875, 0.375, 0.5625, 0.75, 0.9375, 1.125, 1.3125; 400 at 1.5 and afterwards. A continuous interpolation between these points is an explicit assumption; the notes' startup pulse radii 200/267/333 are consistent with an interpolated ramp.
- Nominal normal damage label is `30 + 0.0625 AP` per 0.5 seconds. **R note 2 specifies three half ticks during growth**, totaling `45 + 0.09375 AP`, before empowered damage. Do not deal three full normal ticks. A candidate schedule is startup pulses at 0/0.5/1.0 seconds with half that formula, then empowered pulses from 1.5 seconds; the exact initial phase is inferred from the radius note, not directly specified.
- Empowered damage is `90 + 0.1875 AP` every 0.5 seconds: steady raw DPS `180 + 0.375 AP`. Normal slow 40%, one-second duration refreshed every 0.5 seconds. Mature slow 60%, 1.5-second duration refreshed every **0.25 seconds**. Damage and mature-slow clocks must be separate; four slow pulses per second are not four damage pulses.
- Toggle-off deals a final damage tick and starts cooldown. Automatic off happens on insufficient mana, too much owner distance, or cast-inhibiting CC. The exact final packet during partial growth/mana failure needs an assumption or extra evidence. Ordinary root/ground do not automatically cancel this nonmovement toggle.
- R note 3 exempts **self stasis via Zhonya**, while Devour interrupts it. General hostile stasis is included in cast-inhibiting CC. Existing stasis state/CC distinction can represent this scope; unconditional "any stasis ends R" is wrong. Source damage is persistent area damage; spell shields explicitly do not block it. Deal damage to enemy pets in the area using proper categories.
- A walking persistent toggle is not a conventional channel: channeling R would prevent Q/W/E/attacks. Implement its variable radius, mana, tether, CC shutdown and independent pulse schedules in world/owner memory with a field or kit-managed zones. Final pulse should occur once, including overlapping nominal pulse/off boundaries.

### Proposed behavior and budget checks

Behavior: apply the egg lock first; Q should aim with the ordinary hit model and explode only when its traveling control point reaches a useful position. Prefer E when its **arrival** is expected to be Iced, without waiting forever for an absent Q/R. Place R where the enemy can plausibly remain through maturation and mana can support it; shut it off when it is no longer useful. Wall placement should confine the enemy to the storm or interrupt an approach, with an explicit 1D placement policy, instead of spending W on cooldown far from anyone. Keep ordinary kiting/attacks through `defaultBehavior` when no special command is appropriate. These are model policies, not source assertions.

Budget: avoid counting the Q total plus its component packets. Include its post-flight cooldown wait. E must value ordinary/enhanced damage according to a stated Iced occupancy assumption. Hook-only R DPS needs a hint for its mature `180 + 0.375 AP`, with startup, occupancy and mana limits explicitly acknowledged; do not put its sustained DPS onto a two-second burst cooldown. A revive cannot be treated as guaranteed full HP healing if the enemy can kill the egg. The +20 egg resistances are temporary, not permanent stat multipliers. Test the heuristic's assumptions separately from actual combat formulas.

Meaningful tests:

1. Rebirth restores maximum HP once; remains targetable/damageable; gives +20/+20 only for six seconds; revives current HP; a second lethal egg hit is final; successful resurrection never marks a counted death.
2. Egg ignores tenacity/cleanse attempts to unlock it; existing cast completion survives, ordinary channel terminates, future move/attack/cast declarations are denied; clone one world during egg and prove independent timers.
3. Anivia/Morgana tether break and **Anivia/Malzahar override**; generic resurrection debuff policy is checked against specific exceptions.
4. Q pass and explosion independent raw formulas; only one pass hit; shield first still permits explosion; shield applied between packets blocks explosion; wall destroys flight and prevents free secondary damage; true full-range explosion and cooldown origin.
5. Q uses start origin despite caster displacement; explosion geometry uses live missile point and fixed direction.
6. E Iced acquired/lost during flight; partial/mature R distinction; invalid cast costs nothing, valid delivery normal shield/wall behavior.
7. R three half startup pulses and mature pulses; separate 0.25-second slow clock; no drift; radius boundaries; mana exhaustion/distance/CC off; self-stasis exemption; final pulse exactly once; no duplicate fields.
8. W minimum/maximum placement, self/enemy/pet displacement, five-second expiry, visibility unchanged, wall-dash/wall-stun interactions; document unknown displacement-speed fixture instead of creating a source claim.
9. Ordinary fight/kite/trade/flee actually use the intended Q/E/R/W policies without cast starvation; budget never values revive invulnerability or permanent +20 defenses.

## Malzahar

| Slot | Pinned page | Revision |
|---|---|---:|
| I | [Void Shift](https://wiki.leagueoflegends.com/en-us/Template:Data_Malzahar/Void_Shift?oldid=4035856) | 4035856 |
| Q | [Call of the Void](https://wiki.leagueoflegends.com/en-us/Template:Data_Malzahar/Call_of_the_Void?oldid=3906985) | 3906985 |
| W | [Void Swarm](https://wiki.leagueoflegends.com/en-us/Template:Data_Malzahar/Void_Swarm?oldid=4041818) | 4041818 |
| E | [Malefic Visions](https://wiki.leagueoflegends.com/en-us/Template:Data_Malzahar/Malefic_Visions?oldid=4015185) | 4015185 |
| R | [Nether Grasp](https://wiki.leagueoflegends.com/en-us/Template:Data_Malzahar/Nether_Grasp?oldid=4015186) | 4015186 |
| Pet | [Malzahar article, Voidling](https://wiki.leagueoflegends.com/en-us/Malzahar?oldid=4058496) | 4058496 |

Base summary: approximately 2566.2 HP, 925.6 mana, 114 AD, 0.809 attacks/s, 0.235-second windup, 110.4 armor, 55.6 MR, 335 movement speed, 500 attack range, attack missile speed 2000. Exact values come from the compiler.

### Passive: priority, linger and rearm

Level-20 static cooldown 12 seconds (`MalzaharPassive.ShieldCooldown` confirms it). Once available, Void Shift grants CC immunity and **90% nontrue damage reduction** until a qualifying non-minion damage/negated-CC event, then lingers **0.25 seconds** before expiration. Further damage/CC refreshes the **rearm cooldown**, not necessarily that fixed linger window. A plain permanently refreshed 0.25-second immunity would be wrong. Observe accepted triggers both before and after protection expires, and rearm only after twelve seconds without one.

Important precise notes:

- I note 1: true damage is unmitigated but consumes the passive. Nexus Obelisk is a source exception outside this duel.
- I note 2: normal shields take priority, but Void Shift is consumed even if a shield fully absorbs damage. A **spell-shield-present**, otherwise unnegated hit fully absorbed by a shield is the explicit consumption exception. The source calls the normal-shield behavior a bug. The wording does not fully quantify damage-reduction-vs-shield arithmetic order; record/test the priority interpretation with extra evidence rather than assuming a regular global DR state is sufficient.
- I note 3: spell shield takes priority for CC-bearing spells. A completely spell-shielded packet should not consume the passive merely because the attacker declared it.
- I note 0: allied CC is neither resisted nor a consumption event. This matters when source-side ownership is introduced beyond two opposing champions.
- I notes 4–5: Honeyfruit/Frozen Heart aura do not consume it; Chum the Waters/Death Sentence specifically cannot attach.
- Archived unexpected-effect block **missing from JSON**: Void Shift does not prevent **Zoe E trap drowsy**, marked as a bug with estimated origin V9.6. This is not a general exception for all drowsy or all Zoe E packets. Commit its exact evidence before claiming support for that future matchup.

Use incoming damage metadata and an incoming CC-result hook; inspection of current CC statuses cannot observe negated effects. Distinguish pet/minion classifications rather than treating every owner-attributed pet hit as non-minion champion damage without a policy. Standard true-damage rules already ignore DR. `beforeDamageTaken`/`onDamageTaken` see shield-absorbed damage, useful for consumption, but cannot currently distinguish every special priority outcome without snapshots/new metadata.

### Q: delayed damage/silence and E removal on shield

80 mana, six-second cooldown, 0.25-second cast, range 900, recorded effect radius 200, then a **0.4-second** post-placement delay. Magic damage `210 + 0.55 AP`; silence two seconds. It is a location effect, not a projectile; projectile walls must not stop it. Portals and their sight exist before damage; invisibility and reveal policy require care.

Damage refreshes an existing E, but Q note 0 says spell shield **both prevents that refresh and removes the E debuff**. This cleanup must run at defended contact, not only `onAbilityHit`. Do not apply generic `onAbilityContact` mutation to every shielded spell. A parried Q should not refresh E through an unconditional hook; the source states no separate parry cleanup exception.

The geometry between two portals is not fully described by the radius field alone; a circle/1D interval is a declared spatial reduction. Store a fixed location through the delay instead of following the target when it walks away.

### W: delayed summons and correct flat rank bonus

60 mana, eight-second cooldown, no cast time, target location within 150. Casting **another** ability adds a Zz'Rot stack, maximum two. W consumes all of them: one Voidling at +0.5 seconds, and one more per consumed stack at +1.0/+1.5 seconds. Each survives ten seconds from its own spawn. There is no sourced requirement for two stacks before W can be cast.

W note 1 says stacks are granted **per cast**, even if an E fails before completion. Use `onCastStart`, not only successful `onCast`/`onAbilityHit`; W does not stack itself. Note 0 clears stacks on counted death. Revival that prevents death must not be mistaken for it.

Correct attack formula at rank 5/level 20:

`5 + 3.5 * 19 * (0.7025 + 0.0175 * 19) + 20 + 0.40 bonusAD + 0.20 AP`

`= 93.8275 + 0.40 bonusAD + 0.20 AP` magic damage.

The game extension gives the **73.8275** level base at 20; the rank bonus is **+20 flat**. The ability parser stores the latter as `other:` and the generated Markdown renders it incorrectly as a percentage. `w.formula("Magic Damage")` therefore cannot be used directly. Read the level base, source/assert the `(+ 12 / 14 / 16 / 18 / 20)` flat term, and AP/bonus-AD ratios separately; assert the 93.8275 result at zero bonus stats. Never drop +20 or read it as +20% AD.

Voidling source stats: HP 65–201, armor 16–50, MR 8–25, attack speed 0.665–0.8911 all stop at **level 18** in committed pet data. The current API would explicitly clamp those to 201/50/25/0.8911 at 20, interval `1 / 0.8911 = 1.1222085…` seconds. Do not extrapolate their familiar growth curves silently. Move speed 400; attack reach 100, gameplay radius 10, pathing radius 20. Champion basic attacks kill them regardless of health; implement that separately from ordinary spell damage/armor/MR.

Their magic attacks are pet/proc/basic damage, apply spell effects, and are mitigated by block/dodge/blind and stopped by disarm. They prioritize Nether Grasp target, then E-infected enemies (champions over minions), then nearest. In the current two-champion world that mostly selects the enemy, but enemy pets and targetability still matter. All Voidling attacks belong to the same **cast instance**; preserve the W cast identifier across its staggered summons. Live Voidlings update level bonuses on owner level-up (fixed-level setup makes this moot), while AP/bonus-AD snapshot policy is not explicitly stated by the pinned pet text.

Minion/monster modifiers are not ordinary champion modifiers: +200% against E-infected enemy minions, -50% against epic monsters. Enemy summons can be classified minions, so those mechanics are not automatically irrelevant to every 1v1. Champion attack auto-kill, pet blind/disarm, reflect target and pet E targeting expose shared pet API gaps. First-attack windup and autonomous lifespan after owner death are not specified; current `advancePets` instantly removes all pets on owner death, an assumption to review.

### E: persistent cast completion and four-second DOT

100 mana, seven-second cooldown, 0.25-second cast, range 650; nonprojectile. Sixteen quarter-second pulses, each `13.75 + 0.05 AP`, total `220 + 0.80 AP` over four seconds. Damage is persistent and indirect. Q or R **damage** refreshes the duration; simply attempting a blocked Q/R does not. A refresh should not add a second parallel E from the same cast owner. Refresh tick phase and damage snapshot policy need explicit assumptions because the source only states that the duration refreshes.

E note 1 overrides ordinary targeted-cast cancellation: target untargetability/death/range/vision loss during cast does **not** cancel the cost/cooldown/cast or the W stack. If the target is still untargetable at completion, it receives no debuff. A target that vanishes then returns before completion can receive it. This requires changing `dropTargeting` policy, not just omitting `cancelOnInvalidTarget`.

If an infected target dies, restore **2% maximum mana** and spread to the closest enemy within 500. Champion resurrection is not death; Sion zombie entry is. Pet bounce/execute targets need a typed target abstraction absent from current champion-only ability delivery. The wiki E execute series ends at 30 with level bands through 11, while game `MalzaharE.MinionExecuteThreshold` reports 44 at 18 and **48 at 20**. That is a real source discrepancy; do not extend the wiki expression to 48 without recording the game choice. This only executes minions, not champions.

### R: four separate lifecycles

100 mana, eighty-second cooldown, cast time **0.005 seconds** (one simulator tick), center range 700. Cooldown begins **on cast start**. Tether range 1250. Channel/suppression lasts up to 2.5 seconds; suppression is not reduced by tenacity. Initial knockdown stops interruptible displacement. Source note 5 says the caster also lands and stops his own displacement upon starting channel.

1. **Channel/action:** stationary channel with its own start/end. A spell shield still leaves Malzahar channeling. The archived action table locks voluntary movement for the first **0.5 seconds**; movement interrupts afterwards. Attacking the R target is disabled; attacks on other targets can interrupt after that half second. Other casts interrupt. The standard immobile channel never permits voluntary cancellation by a move command, so normal policy needs a supported cancellation route if this counterplay is modeled.
2. **Tether/suppression/reveal:** tether creation suppresses and reveals the target; caster is revealed too. Removing suppression removes target reveal, **but does not itself stop channeling** while tether remains. Leaving tether radius breaks it and interrupts the channel. The target entering zombie state or resurrection does **not** break this specific tether (R note 2).
3. **Tether damage schedule:** ten quarter-second persistent pulses of `27.5 + 0.08 AP`, total `275 + 0.80 AP`. R note 3, explicitly marked bug in archived source, preserves remaining damage after an early tether break as long as the target is within 1250. Outside range suppresses a scheduled pulse; reentering before the original 2.5-second deadline permits later pulses. **Do not store these pulses only on the channel action**, because interrupting the action would discard them and contradict the note. Do not reset the duration on reentry. Whether every kind of caster death/untargetability falls under "regardless of how" requires careful evidence scope; do not invent immunity-piercing damage from that sentence.
4. **Null Zone:** fixed center at target's location at cast time; lasts five seconds; ten 0.5-second persistent-area/indirect packets, each `(0.02 + 0.000025 AP) * targetMaxHP`, total `(0.20 + 0.00025 AP) * targetMaxHP`. Zone survives channel interruption. It must not follow the target or disappear with tether. **No pool radius is present in the JSON or archived template**; obtain pinned game evidence or expose an assumption before shipping. Minion/monster damage cap is 120 per tick.

R note 1: initial spell shield prevents **both tether and pool**, but not the empty channel action. Use an initial defended-contact gate; later DOT packets must not consume newly granted spell shields as if each were a fresh cast. A parry/immunity at initial contact needs an explicit source-backed policy separating damage protection from tether/pool creation. Suppression immune targets may still take damage; do not treat every failed CC as no damage. Every real R/Q damage refreshes existing E; prevent recursive E refresh when E itself deals damage.

The source creates a deliberate cross-champion exception: Anivia Rebirth normally breaks tethers, but this R specifically survives resurrection. Prefer the narrower R rule. The general resurrection tip dispels most debuffs, so preserve only sourced R behavior rather than discarding/keeping all tethers globally.

### Proposed behavior and budget checks

Behavior: E/Q establish infection and stacks; W should often use two stacks but must have a valid zero/one-stack fallback when timing or danger makes waiting poor. Cast E before W/R where useful, not an unconditional endless setup sequence. R can hold a target in the pool and near Voidlings; keep it for fights, meaningful catches, or an actual kill rather than opening every hold/trade scenario with a forced channel. The same default policy should continue to attack/kite when spells are unavailable. A channel cancellation policy must respect its first 0.5-second lock. All sequence preferences must be recorded as model assumptions.

Budget: Q is one packet per `(6 / haste + cast)`. E is a total per cycle, with separately documented refresh uptime; repeated quarter-second packets must not be counted as sixteen full total damages. R's champion DPS terms are tether total plus the separately valued **target-max-HP/AP product**, not a fixed AP-only burst. W hook DPS includes number of staggered living pets, travel/reach, duration, and the correct flat +20. Do not multiply by three on every cast without acknowledging stack/survival assumptions. Include AP and bonus AD pet scaling so the allocator can value both. Void Shift is a short initial protection window/rearm mechanic, not permanent 90% DR in the reference. The budget's hooks are intentionally suppressed during initialization, so explicit hints or an acknowledged omission are required for hook-only pets/passive.

Meaningful tests:

1. Passive first damage reduction, true damage bypass/consume, exact linger expiry, continuous damage prevents rearm, rearm twelve seconds after last trigger; pure negated CC consumes it; pure later CC refreshes rearm; spell shield priority; normal shield full absorption; special spell-shield-present full absorption exception.
2. Q fixed delayed area, silence tenacity, nonprojectile wall immunity, normal E refresh, spell-shielded Q removes E rather than refreshing it; parry has no accidental shield-specific removal.
3. W +20 flat formula at no bonuses and separate AP/bonus-AD deltas; staggered spawn/individual expiry; zero/one/two stacks; failed E cast still generates a stack; W itself does not; clone independent summon schedules/cast IDs.
4. Voidling champion attack auto-kill versus ordinary AoE spell damage; block/dodge/blind/disarm; attacker-side CC independent of owner; Rammus reflect must hit the attacking pet; Amumu refunds from the proper basic attack event.
5. E sixteen ordinal pulses/total/end time, refresh without duplicate DOT, correct resource/cooldown despite invalid target, disappearance/reappearance before completion, no debuff if untargetable at completion; death/refund/bounce versus resurrection/no refund.
6. R one-tick cast, cooldown at start, exact ten pulses, non-tenacity suppression, cleanse preserves channel, tether break interrupts action but preserves in-range damage bug, exit/reentry pulses, independent persistent pool, shielded empty channel, cast-start center, no repeat initial shield handling.
7. Cross Anivia/Sion/Zaahen life phases, CC-immune/Black Shield suppression cases, revealing an invisible target, caster displacement interrupted at channel creation.
8. Ordinary fight/kite/hold/trade/flee smoke scenarios use E/Q/W/R without deadlock; finite resource/pet counts; budget independently detects pet AP/AD gains and R HP/AP-product scaling.

## Zyra

| Slot | Pinned page | Revision |
|---|---|---:|
| I | [Garden of Thorns](https://wiki.leagueoflegends.com/en-us/Template:Data_Zyra/Garden_of_Thorns?oldid=3986877) | 3986877 |
| Q | [Deadly Spines](https://wiki.leagueoflegends.com/en-us/Template:Data_Zyra/Deadly_Spines?oldid=4013461) | 4013461 |
| W | [Rampant Growth](https://wiki.leagueoflegends.com/en-us/Template:Data_Zyra/Rampant_Growth?oldid=4044057) | 4044057 |
| E | [Grasping Roots](https://wiki.leagueoflegends.com/en-us/Template:Data_Zyra/Grasping_Roots?oldid=4013460) | 4013460 |
| R | [Stranglethorns](https://wiki.leagueoflegends.com/en-us/Template:Data_Zyra/Stranglethorns?oldid=3945317) | 3945317 |
| Pets/general notes | [Zyra article](https://wiki.leagueoflegends.com/en-us/Zyra?oldid=4002566) | 4002566 |

Base summary: approximately 2402.8 HP, 909.6 mana, 115.9 AD, 0.940 attacks/s, 0.155-second windup, 111.6 armor, 55.6 MR, 340 move speed, 575 attack range, attack missile speed 1700. Use exact compiler stats.

### Passive: seeds, stochastic placement and hidden size

Static cadence at level 20 is **8.51470588235294 seconds**, from `13.6 - (13.6 - 9.05) * (20 - 1) / 17`. Wiki and game `ZyraP.SeedCooldown` both extend beyond 18. Every trigger creates **one or two** seeds within 900; they last thirty seconds, grant one second of sight, and can be stepped on after one second. Total planted-seed cap is eight, preserving W seeds over passive seeds.

I note 0 expressly marks the one-vs-two probability/pattern **pending for test** in archived source. There is no sourced 50/50 distribution or guaranteed two-seed start. Placement preferences include brush, enemy proximity, distinct angles, jungle entrances and fountain exclusions; several are marked pending. The 1D duel has no full brush/fountain/jungle map. Start with an explicit configurable initial seed count/cadence phase and a deterministic or branched placement/count policy, clearly exposed as assumptions. Do not quietly frontload eight seeds and call it natural passive behavior.

Use typed seed identity in pet/world memory: source P/W, creation/expiry tick, step-on eligibility, fixed position, and consumed state. Seeds are untargetable, **not invulnerable attackable low-HP pets**. Passive/W seeds expire differently and have different step immunity windows. Apply cap/priority before insertion; the source does not settle all tie-breaking when all eight are W seeds.

I note 13 gives a **10% increased size** for **33 seconds after Sunlight is applied**, with the 33 seconds explicitly **estimated** in archived source. Leona can apply Sunlight even though she lacks an ally to consume it in a 1v1; this hidden Zyra interaction is consequently relevant. The current Leona kit omits ally-only passive damage, but an explicit Sunlight-application mark/event may still be needed. Do not infer application from any damage named Leona, and do not assume a visual size buff necessarily maps to a precise gameplay-radius multiplier without the size rule's evidence. This affects hitboxes, not a damage bonus.

### Q: delayed shape and sprouting

55 mana, five-second cooldown, 0.25-second cast, target range 800. Damage `220 + 0.65 AP`, nonprojectile, spell-shieldable. Spines appear after **0.625 seconds**; the natural implementation is a fixed location at completion plus that delay, with its timing origin explicitly documented. A hit seed becomes a Thorn Spitter for eight seconds independently of whether the champion damage was spell-shielded. Plant growth must not require successful champion damage.

**No damage rectangle width/length/radius, and no distinct seed-sprout dimensions, appear in either committed record or archived template.** Do not invent a circle radius or familiar rectangle constant from memory. Fetch pinned game geometry before implementation, or expose a visible spatial assumption that affects scores. Normal hit chance must account for cast plus delay and fixed placement.

### W: ammunition, not mana

Two maximum charges, rank-5 recharge ten seconds (haste behavior should follow the existing recharge rules unless extra source says static). Cost is **one seed**, not one mana. No cast time; location range 850. W seeds last sixty seconds; stepping becomes possible at **1.5 seconds**, and stepping reveals the enemy for two seconds. Initial learn grants two charges; at level 20, two full starting charges are justified under the full-availability setup.

Killing an enemy grants 35% seed charge, increased to 100% for large enemies or champion takedowns. Enemy minion-class pets may supply the 35% event; a champion resurrecting without a counted death must not give a takedown refill. Existing `refund` cannot directly model partial ammo progress/instant restock in every recharge state, so use explicit charge-clock handling or a tested shared charge refill API. W has no mana subtraction; `charges` represents consumption and resource cost should be zero.

Source does not explicitly authorize overlays during Q/E casts or channels. An implementation that puts W after Q's cast before spines land is plausible without bypassing generic action rules. Any during-cast overlay or immediate planting under an enemy is a policy assumption. No seed collision radius is sourced here, so a step-on threshold needs evidence/assumption rather than adopting the adult plant radius.

### E: two different traveling footprints

90 mana, eleven-second cooldown, 0.25-second cast. Magic damage `200 + 0.60 AP`; root two seconds, reduced by tenacity. Projectile velocity 1150. **Damaging missile** range 1100, width 140; **seed sprout** range 1200, width **560 explicitly estimated**. Do not use the larger footprint to damage/root champions or the narrower one to determine all seed sprouts.

E note 0 uses caster position at **cast end**, unlike Anivia Q. The declared direction should be captured consistently rather than homing after launch. E note 1 adds **0.15 seconds of action lock after casting**; the missile has already launched during that lock. Use non-CC attack/move/cast gates with a clear distinction between this lock and the prior cast time, not a delayed launch. Grasping Roots can sprout seeds behind/around its narrow champion hit corridor, and keeps traveling beyond the champion it roots. A projectile wall must block whichever portion of the actual traveling source remains; the wider sprout interaction cannot become a free global transform after destruction.

### R: expansion damage, delayed knock-up and plant enrage

100 mana, ninety-second cooldown, 0.25-second cast, ground target range 700, radius 560. One magic-damage packet `400 + 0.70 AP` as the thicket expands; a **separate** knock-up after two seconds, lasting one second. The expansion's exact radial travel curve is not specified, so immediate full-area damage plus delayed displacement is a stated reduction, not a certified expansion model. The knock-up uses actual fixed-zone geometry at its later time; a target can leave or enter after the initial packet.

Existing plants inside the thicket, and plants grown during the two seconds before displacement (R note 0), become enraged. For each newly enraged plant: maximum HP +50% (8 → 12), **restore 50% of current health**, refresh duration, size +25%, and attacks become two-shot flurries for 150% total damage. If a normal plant has two HP, it gets one HP back, not six or fifty percent of missing HP. Clarify whether repeated thicket overlap re-enrages an already buffed plant; multiplicative repeated HP stacking is not sourced.

R note 1 refreshes already-grown plants' duration; note 2 gives an enrage buff duration ten seconds even though plants normally die after eight. A plant newly grown at thicket +1.9 seconds can therefore live eight seconds from growth/enrage, beyond the knock-up; do not remove every affected plant exactly eight seconds after R cast. First enrage should set `endTick` relative to that event. The two shots are distinct damage events if represented, nominally 75% each; shot spacing and basic/on-hit notification count are not provided. Do not present a remembered flurry interval as pinned evidence.

R is spell-shieldable, but enemy spell shield is not a shield for Zyra's plants. Initial damage, later knock-up and enrage must not be conflated into a single target-delayed effect. The source does not explicitly state whether one shield blocks both separate champion stages or how later shield acquisition interacts; add this to the evidence queue/assumptions and tests.

### Plants: formulas, target priority and fixed damage taken

Both plants last eight seconds without a refresh, remain stationary, attack at **0.8 attacks/s** (1.25-second nominal interval), gameplay radius 20, pathing radius 8.5, and ordinary max HP 8. Level-20 raw magic attack damage is:

`15 + (75 - 15) * 19 / 17 + 0.20 AP = 82.0588235294118 + 0.20 AP`.

Thorn Spitter range 575; Vine Lasher range 400. Vine attacks slow 30% for two seconds; slows from **two different Vine Lashers** add to a maximum 60%. Repeated attacks from one Lasher must not count as two plants. Preserve source pet identity when aggregating/expiring slow contributions. Plants resist airborne, cripple, and silence, but blindness/disarm/block/dodge need actual per-pet interaction support.

Source text says a plant that is **not the first plant to attack its target** deals 50% damage. The pinned wording does not establish an expiry window, reset rule, or how Spitter/Lasher families share that first-plant identity. A primary-plant/secondary-plant model must be explicitly assumed, and tested after first-plant death, target switching and mixed-family attacks; do not assert an arbitrary time window. With n identical plants, the illustrative unsuppressed reference DPS is `0.8 * D * (1 + 0.5 * (n - 1))`; an enraged set multiplies its stated damage by 1.5. This is a budget illustration, not a full collision/survival policy.

**Snapshot detail missing from committed pets JSON:** the archived Zyra article's `=== General ===` says plant damage does **not** update when Zyra levels or changes AP. It also says **in-air attack damage updates when a plant is hit by Stranglethorns or when the buffed plant dies**. Ordinary plant attacks therefore need spawn-snapshotted AP/damage, plus a specifically scoped flurry/missile update rule. Current pet attack formulas always read the owner's live stats and instantly hit; this is a genuine simulator/API gap. Extend pet evidence parsing to include that exact article note and support projectile ownership/plant identifiers before certifying the exception.

Fixed incoming damage from the pet infobox is independent of ordinary mitigated raw damage:

| Champion-origin damage category | Thorn Spitter HP lost | Vine Lasher HP lost |
|---|---:|---:|
| Proc-damage abilities | 0 | 0 |
| Damage-over-time abilities | 1 | 1 |
| Area-of-effect abilities | 3 | 3 |
| Ranged basic attacks | **4** | **5** |
| Melee basic attacks | 8 | 8 |
| Single-target abilities | 8 | 8 |

Other source categories: minions/monsters 1, large minion/monster attacks 2, epic monsters 4, Smite 8, turrets 12. They are absent as ordinary map units, but pet/minion source classification may matter. Do not homogenize the ranged attack difference: two ranged attacks kill an ordinary Spitter (4+4), and an ordinary Lasher also dies on its second hit (5+5), but an enraged 12-HP Spitter requires three, while an enraged Lasher also requires three with a different remainder. Minimum raw damage/crit/armor must not change fixed HP loss. No pet armor/MR fields are provided; typed fixed HP damage should bypass the need to invent them.

Targeting priority: taunt sources even if out of range; latest owner-applied high-priority champion mark (refreshes, lasts three seconds); nearest plant-applied lower-priority mark (nonrefreshing, lasts three seconds); nonchampions most recently attacked by Zyra; closest in-range unit. The current 1v1 mostly collapses it to the enemy champion, but invisibility/reveal, other pets and taunts remain relevant. Source spell effects tag both plant attack families as area damage even though they function as basic attacks; preserve distinct tags instead of reducing everything to `attackLike`.

Non-epic-monster bonus damage is `50 + (100 - 50) * 19 / 17 = 105.882352941176` at level 20; it is not champion damage. Plant attack windups, missile speed, owner-death continuation, blind/disarm timing, flurry shot gaps, and several shield/slow interactions remain unsupported by the pinned infobox. Record the limits if shipping reduced versions.

### Proposed behavior and budget checks

Behavior: place W seeds inside the **future Q/E sprout footprint**, then cast the matching spell or place W after a cast while its effect is still pending when generic rules permit. Do not put every seed exactly at the enemy center after seeing whether a skillshot landed. Prefer E to root an approach and allow plant range/slow to matter; use Q to create Spitters at useful distance. R should catch the enemy or enrage existing/about-to-grow plants, with ordinary ultimate restrictions in hold/trade. Use default kiting/attacks outside these bounded policies. Seed count/phase/location and first-plant identification need declared assumptions/sensitivity runs because source probabilities are not known.

Budget: direct Q/E/R formulas are ordinary per-cycle damage. Hook-only plants need AP-sensitive damage hints using the **82.0588** level base and correct damage snapshots, conservative live-plant occupancy, secondary 50% reduction, and enrage duration/probability. W contributes ammo-enabled plant creation rather than mana damage. Do not double-count a plant once via Q, once via W, and again as passive DPS. The budget cannot model the exact fixed pet-destruction response without a pet survival policy; label that limitation rather than treating every plant as invulnerable full-duration DPS. R's buff should not grant all plants permanent 150% DPS in the reference.

Meaningful tests:

1. Passive exact extended cadence, one/two count policy explicitly identified, thirty-second expiry, one-second step immunity; eight-seed cap preserves W seeds; clone seed/timer independence.
2. W has two charges, ten-second recharge, spends no mana; sixty-second expiry, 1.5-second step immunity and two-second reveal; correct 35%/100% refill; counted death versus revival.
3. Q damage delay and fixed placement; sprouts seeds without champion damage/through target spell shield; missing shape assumption is exposed instead of a source claim.
4. E damage versus wider/longer seed footprint; starts from cast-end caster position; continues after champion hit; root tenacity; 0.15-second postlaunch lock; projectile wall prevents downstream sprouts.
5. R fixed center, one damage stage, independently timed late knock-up, target enters/exits between them, existing and newly grown plant enrage, duration refresh from actual enrage time, current-HP restoration, no infinite HP stacking, enemy shield does not block owner pet buffs.
6. Plant damage at AP 0 and AP change after spawn; correct static ranges, 0.8 attack cadence, sourced missing projectile assumption; 50% secondary policy with first plant death/mixed kinds; enrage two-packet versus aggregate damage and in-flight snapshot exceptions.
7. Fixed pet damage table: proc 0/DOT 1/AoE 3/targeted 8; ranged **4 vs 5**, melee 8; crit/AP/AD/resists do not change these losses; normal/enraged 8/12 HP.
8. Vine slow one plant stays 30%, two distinct plants reaches 60%, death/expiry removes only that source's contribution; block/dodge/parry/blind/disarm behavior and immunity to airborne/cripple/silence.
9. Leona applies Sunlight → explicit estimated-duration size behavior without ally-only damage proc; source event is distinct from arbitrary Leona damage.
10. Ordinary fight/kite/trade/hold/flee scenarios create plants and use R without seed/cast deadlocks; no free eight-seed opening or unseen prepositioning; budget reacts to AP and destruction policy without double-counting.

## Recommended implementation sequence

1. Commit and test missing source parsing for revival tip/action tables, Zyra general pet notes, and unexpected-effect blocks. Obtain pinned game geometry for Malzahar R and Zyra Q, plus Anivia W speed where available. Unresolved evidence should be assumptions visible on the generated kit page.
2. Add small, reusable and independently tested policies for incoming CC outcomes, per-ability targeting-loss cancellation, life-state/tether distinctions, and piercing projectile/control-point callbacks. Avoid edits during the current refresh.
3. Implement Anivia's egg/Q/E and independent R/W spatial controls; Malzahar passive/E and four R lifecycles; Zyra's typed seeds and plant damage/status/projectile semantics. Do not register a champion merely because direct damage buttons compile.
4. Finish focused counterplay/normal-policy/budget tests before a joint suite or refreshed matrix. Preserve existing benchmark margins and show residual assumptions. These notes are a queue for that next work, not evidence of implemented coverage.
