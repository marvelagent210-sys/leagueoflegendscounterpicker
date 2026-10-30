# Akshan — batch 7

Implemented in `kits/champions/Akshan.ts`; source records remain in `data/16.20/abilities/Akshan.json`. Tests compile that module directly so registration can be reviewed independently.

## Pinned evidence

| Ability | Exact wiki template revision |
| --- | --- |
| Dirty Fighting | `Template:Data Akshan/Dirty Fighting`, 4074628 |
| Avengerang | `Template:Data Akshan/Avengerang`, 4074638 |
| Going Rogue | `Template:Data Akshan/Going Rogue`, 3989407 |
| Heroic Swing | `Template:Data Akshan/Heroic Swing`, 4074661 |
| Comeuppance | `Template:Data Akshan/Comeuppance`, 4074717 |

Supplemental game evidence is solely `https://raw.communitydragon.org/16.20/game/data/characters/akshan/akshan.bin.json`, exact version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `1110fe2b5c8eac649768b6c08b662bd7d85fd3947b593a30d7394485926ca128`. Each curated game excerpt retains its object path, URL, version and SHA. No latest fetch or replacement dataset was used. Numeric inputs, formulas, timings, and rule checks flow through `KitContext` ability APIs.

The original normalizer omitted the shield's stat-progression expression and static-cooldown origin, attack/passive damage order, E critical-damage modifier and on-attack exception, R critical-scaling template and CC-table restrictions. Those pinned-template omissions are retained under their original ability revision; game-only wall proximity, second-basic timing data, R firing cadence and E3 range retain distinct game attribution.

## Combat behavior

Dirty Fighting's second basic is an independent missile with its own critical expectation, full on-hits and life steal. Its ordinary attack cooldown starts at the second launch. Minion-class actual summons receive the sourced full-AD second attack; champion-class and unclassified summons retain half AD. A dead initial target can redirect the second shot to the visible champion, then a low-health actual summon within the sourced acquisition extension. Moving or casting cancels the pending second shot, preserves the original first-shot attack timer, and grants the level-20, bonus-AS-scaled linear movement decay. The ordinary fight policy preserves the second shot unless its defensive choice requires cancellation.

Three-hit marks are local to each actual victim, refresh for five seconds, and consume before basic/E damage or after Q/R damage. The level-20 shield uses `40 + (240/17) × 19 × (0.7025 + 0.0175 × 19) + 0.35 bonus AD`; its four-second static cooldown starts when destroyed or expired. Explicitly champion-class clones grant champion-only shield/Q contact effects; minion-class and unclassified summons do not. No summon or clone can reset E. Blocked, dodged, blinded and parried basics do not accrue marks.

Q follows an actual outbound path and then homes to the caster's current position. Each real target is contacted once per pass. Outbound contacts extend the remaining flight to at least 500 units beyond that contact, including a spell-shielded contact; non-champion actual summons receive 80% damage. A projectile wall can remove the outgoing or returning flight. The cooldown waits for return or destruction. Connected champion contacts reveal and grant the AP-scaled decaying movement buff.

W camouflage refreshes near a real terrain interval within the pinned game's 175-unit proximity or the scenario's brush flag; otherwise it ends after two seconds. The living rival detects Akshan within 800 units. During an ordinary flee, the policy prepares W where real terrain or brush sustains it, or beyond detection where it immediately conceals. It preserves reactive defensive casts and keeps retreating during W's mobile cast. Preparing W does not hide Akshan while he remains inside detection, and open ground grants no extra duration. Attack windup and ability declaration break camouflage. The one-enemy duel has no allied champion deaths, so Scoundrels, bonus gold, trails, chase movement, missing-mana regeneration and ally resurrection are explicitly unavailable. Akshan's own death does not create a Scoundrel.

E first selects a real live terrain interval within 800 units and waits for hook travel at 2500 units/second. Preparation cancels on actual movement, terrain disappearance, timeout, immobilization, ground or polymorph. Its swing uses a source-derived 1200-unit/second circular projection and stops on terrain or an enemy champion with the sourced 50-unit collision radius. Immediate, periodic, and dismount shots select a visible actual enemy; marked champions have priority. Shots use `(40 + 0.25 AD) × (1 + 0.3 bonus AS)`, 25% on-hit damage, modified critical damage, life steal, and individual spell shields. Each shot snapshots blindness at launch: cleansing cannot rescue an already missed shot, and a later blind cannot cancel a previously valid projectile. They respect dodge, block, parry and projectile interception. They do not create additional on-attack declarations. Third cast requires 0.5 seconds, clips its game-sourced 350-unit displacement to terrain, and fires a final shot. A real enemy-champion takedown sets current or post-effect E cooldown to 0.5 seconds; clones do not reset it. Q/W are unavailable during preparation and swing; R can overlay E, retains its absolute channel clock and suppresses further E shots.

R reveals its target through charging and for two seconds after release, stores up to seven bullets, and supports release after 0.5 seconds. Bullets fire independently every game-sourced 0.15 seconds. Charging and firing permit walking and E while suppressing basics and Q/W. Silence/polymorph cancel; root alone preserves the channel. Target death or untargetability cancels charging; invisibility does not defeat the reveal. Cancellation gives the sourced five-second cooldown, while caster death retains the normal cooldown. Each bullet homes toward the champion but can hit the first actual enemy summon along its corridor. Damage reads that actual victim's current missing health and the caster's critical stats at impact; bullets apply life steal. Only explicitly minion-class summons execute. Spell shields block one bullet and projectile walls intercept actual flight.

## Explicit source and geometry limits

- Second-basic delay is not exposed as a complete script formula. The implementation interprets `AkshanPassiveAttack.mUseAutoattackCastTimeData`'s value of 2 as twice normal attack speed, with that spell's 0.1-second pre-cast lockout as a lower bound. This is a documented timing interpretation, not a claim that the export supplies a verified script delay.
- Wiki I says five-second marks; the same pinned bin retains a conflicting 4.5-second `DebuffDuration`. The implementation follows the pinned wiki lifetime. W also retains a conflicting/orphan `PassiveSecondAutoRatio` calculation; the passive's own bin ratio and pinned wiki agree on 50%, which this kit uses.
- The wiki's `rutngt` next-game-tick rendering gives 0.231-second E spacing; the bin script parameter is 0.2. The rendered wiki interval is used, with cumulative tick rounding.
- Pinned two-dimensional terrain geometry is absent. The abstract scenario `walls` flag supplies no anchor and cannot enable E. For an actual interval, the supported conservative trajectory is `x = anchor + (startX-anchor) cos(speed × elapsed / radius)`, stopped by actual intervals and champion contacts. Clockwise/counterclockwise share that one-axis projection. This can undercount lateral swing opportunities and never guarantees an orbit's shots. The policy chooses its first legal dismount.
- E3 range is sourced as 350 from its exact game object. Dismount speed is explicitly pending in the wiki and absent from that export, so displacement is conservatively instantaneous and terrain-clipped. No invented travel speed is assigned.
- The engine's reveal state does not distinguish ordinary sight from true sight. Map sight bubbles, structures, neutral units and ally resurrection are absent. E uses an explicit shared basic-attack pet packet for real hit-count props, preserving their fixed hit points and ordinary defenses; props receive no Dirty Fighting marks. Q's two passes use independent shared sideways hit estimates.
- R starts with one stored bullet and schedules its first bullet one firing interval after release; those phase choices are explicit interpretations of the storage interval and game firing parameter.

The reference budget includes the double-basic cycle, Q's two passes, passive mark consumption, one charged R per full cooldown/channel/firing cycle, and shielding over duration plus static cooldown. It assigns zero guaranteed E damage because anchor availability and contacts are scenario-dependent. It contains no matchup score tuning.

## Validation

`npx vitest run tests/kits/akshan.test.ts --maxWorkers=1`: **69 passing**. Tests cover source failure, exact shield/attack/E/R formulas, clock origins, mark and pending-missile clone isolation, real summons and classification, Q return/collateral/shield/interception, W detection/refresh/solo restrictions and an ordinary mobile retreat that prepares camouflage once, E anchors/collision/recast/interrupt/defenses/R overlay/takedowns, R storage/release/cancel/death/visibility/missing-health/life-steal/body blocking, ordinary policy and finite budgets. Reflected projectile and terrain trajectories are compared at `1e-10` without tolerance relaxation. The unchanged `wave1.test.ts` Akshan checks also pass: **2 passing**, using `-t 'Akshan kit' --maxWorkers=1`.

Both typechecks pass: `npx tsc --noEmit` and `npx tsc --noEmit -p web`. Audit logs are `/workspace/counter-next-wave/batch7-audit/akshan-tests.log`, `akshan-typecheck.log`, and `akshan-typecheck-web.log`.
