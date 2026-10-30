# Soraka: batch 13 source audit

This audit covers the level-20, maximum-rank kit pinned to patch 26.20 / Data Dragon 16.20.1. The registered implementation reads every numeric mechanic through `KitContext`; it does not create a teammate, minion wave, farm history, item, rune, or extra realm.

| Ability | Exact wiki revision | Maximum-rank behavior |
|---|---:|---|
| Salvation | 3681502 | 90% bonus movement while facing a real allied champion below 40% HP within 2,500 |
| Starcall | 3953362 | 225 + 35% AP magic damage; 30% slow for 1.5 seconds; 800 range, 265 center radius |
| Astral Infusion | 4007066 | 170 + 50% AP ally heal; 60 mana plus 10% maximum HP; 2-second cooldown |
| Equinox | 3907153 | 170 + 40% AP on each of two phases; 1.5-second silence field; 2-second final root |
| Wish | 3907154 | 350 + 50% AP global ally/self heal, increased to 525 + 75% AP strictly below 40% HP |

The exact full raw ability templates remain in the authored records, alongside 15 exact versioned game-object excerpts from the retained Soraka binary. The return missile's 1,400 speed and maximum-rank W mana payment are read from the exact binary, not supplied as unexplained constants. The primary values override incompatible client metadata: Q uses its primary 265 radius and range-dependent landing delay rather than the binary missile's 210 radius and 1,100 speed; Equinox uses primary 925 cast range rather than binary 875. Game source version, URL, object path and SHA-256 remain attached to each excerpt.

## Starcall and Rejuvenation

A cast takes 0.25 seconds, then the star travels for the primary 0.25-to-1-second delay, interpolated from the pinned 50-to-800 range series and clamped to the declared destination. The cast produces a decisive skillshot branch for its actual dormant area; a miss cannot earn a conditional regeneration benefit. The unknown vertical star trajectory is projected onto the declared ground axis using that exact flight time. This is an explicit one-dimensional geometry assumption, not a claim that the binary missile speed gives the server flight clock. Projectile walls, destruction auras and real interception cancel or redirect the actual committed flight and its landing.

At least one real enemy Champion-class contact creates one returning dust projectile per star. An actual spell-shielded hit still qualifies; the same spell shield blocks damage and slow. Parry, stasis, untargetability, a destroyed flight and a nonchampion pet do not supply a fabricated champion contact. Ordinary invulnerability preserves contact without inventing damage. Returning dust follows Soraka's current center at the exact sourced 1,400 speed and can be destroyed or intercepted independently. Self Rejuvenation and its W health-cost reduction begin only on arrival. A released star may finish after Soraka dies, but it cannot regenerate a dead or resurrecting Soraka or arm a later life.

Rejuvenation lasts 2.5 seconds, provides a linearly decaying 30% movement bonus, and heals in 12 pulses at 0.2-second intervals. The retained raw note specifies approximately four 15% pulses, four 5.5% pulses, and four 4.5% pulses. The implementation retains those weights and exactly conserves the primary total 120 + 30% AP. The equal `Heal per Tick` table conflicts with that distribution; it is retained rather than silently blended. Each actual recipient has its own replaceable clock. The heal amount snapshots current Soraka AP when that recipient receives the buff; recipient modifiers are read on each pulse. The server AP snapshot moment is unpublished and this grant-time choice remains an explicit assumption. An already shared ally buff can finish after Soraka's death. A resurrection cancels old self benefits.

The primary note also permits W to share Rejuvenation immediately after champion contact, before the return reaches Soraka. The arena allows that early sharing window for one sourced buff duration and refreshes it when self Rejuvenation arrives. The server duration of a separate pre-arrival sharing flag is unpublished; this boundary is an explicit assumption.

## Actual allies, health costs and Wish

Salvation uses actual allied Champion-class bodies, current HP and Soraka's facing, with exact center-distance and strict health thresholds. Unknown pets and enemies never become allies by proximity. Coincident bodies supply no direction. Ordinary movement soft caps still apply.

Astral Infusion requires a real eligible allied champion or decoy within 550. The 175 forgiveness note is retained as evidence; it does not extend initial declaration range. W consumes its mana and health and heals its declared ally before the 0.25-second cast lock. At exactly 5% maximum HP, Soraka can cast even if she cannot pay the nominal 10% health cost; payment clamps at 1 HP. Below 5%, the cast is unavailable. Maximum-rank W reduces that health cost by 100% only while actual self Rejuvenation has arrived. An absent teammate is never replaced by a self heal. Target healing uses that target's own modifiers and Grievous Wounds.

Wish pays mana and heals on declaration before its 0.25-second cast lock. It reaches self and all actual living allied Champion-class bodies regardless of distance, including untargetable bodies. Each recipient independently uses the strict 40% threshold, local healing modifiers and Grievous Wounds. No unsourced Grievous Wounds cleanse is added. The reported respawn-frame bug and separate-realm interactions cannot be reproduced without arena metadata for those states and remain unsupported.

## Equinox and counterplay

Initial damage resolves at the ground point; the field continuously silences for 1.5 seconds, then a separate eruption deals damage and roots. Initial and eruption damage/root require actual enemy Champion-class bodies. Silence can affect other actual enemy bodies and is non-dispellable by ordinary cleanses. A cleanse that grants immunity can remove it through the engine's explicit sticky-cleanse rule. Spell shields block the damage/root packets and are consumed by those actual packets, while silence bypasses spell shields. CC immunity, Black Shield, parry, untargetability and real pet mitigation retain their own rules.

The primary 260 radius is center-based. The note says the true damage/root radius is slightly smaller than the silence radius without giving an exact value. The arena uses the retained 260 boundary for both and records that uncertainty; no smaller radius is invented. Centered field checks preserve that center boundary for both champions and actual pets. Completed fields and eruptions can finish after caster death.

## Behavior, allocation and regressions

Fight mode may use Wish for a full useful self heal; hold and trade reserve it. A completed trade retreats before optional casts. Flee may peel with Q or E, without inventing a W ally. W's ordinary policy requires a useful wounded actual ally and protects Soraka's own health. Idle supplies no free ability or regeneration.

The reference stat allocation prices Q, both Equinox damage phases, source-total conditional Q self regeneration and ordinary self Wish healing. It includes no imaginary ally heal, ally stats, Salvation uptime or donated health. Runtime fights still require missing health, resources, real contacts and surviving returns. All source values used by allocation are captured before the evidence context seals.

The focused tests exercise exact source accounting, solo invariants, facing and health boundaries, variable flight clocks, actual decisive branches, initial and return projectile destruction, weighted regeneration, refresh/branch/death/resurrection lifecycle, before-cast W/R payments and heals, actual decoys, recipient-local wounds/modifiers, spell-shield/cleanse/immunity counterplay, centered fields and ordinary mode policy. Batch-wide matrix, reflection, full-suite, browser and private-delivery validation are tracked separately by the release controller.
