# Rune mechanics that still need resolution

Source and runtime review, 6 November 2026. These findings explain why adding a
numeric rune bonus alone is insufficient. No in-game measurements were performed
for this audit. The sources below are pinned Wiki revisions; code observations
describe the current model, not a complete specification of live-game behavior.

## Separate amplifier packets

[Damage modifier, revision 4050138](https://wiki.leagueoflegends.com/en-us/?oldid=4050138)
and [V26.09, revision 4050133](https://wiki.leagueoflegends.com/en-us/?oldid=4050133)
state that outgoing modifiers stack additively, received modifiers still
multiply, and damage amplifiers are dealt as separate instances. The modifier
article is marked outdated and leaves post-26.09 exceptions pending testing.
It does not establish a complete global packet algorithm.

The current health-rune adapter shares the aggregate outgoing-damage bucket. It
does not emit separate amplifier instances. It also restricts recipients to the
actual champion body. These limits remain in the [manual-effect audit](README.md).
Two sources show why a future packet implementation needs more than a total
damage multiplier:

- [Zed's Death Mark, revision 4050166](https://wiki.leagueoflegends.com/en-us/?oldid=4050166)
  stores pre-mitigation physical and magic damage from Zed and his shadows,
  including item and rune damage; true damage does not contribute. Separate
  amplifier packets therefore need source, category and storage provenance.
- The complete [Illaoi Test of Spirit revision 4089280](https://wiki.leagueoflegends.com/en-us/?oldid=4089280)
  includes an unexpected-interaction block absent from the parsed notes. It
  specifies pre-mitigation Spirit damage, the echo ratio, a cap at current Spirit
  health, then Vessel modifiers. It also says Last Stand can amplify Spirit and
  Vessel independently and can amplify its own echoed bonus. This is an
  explicitly unsupported recipient interaction in the current body-only adapter.
  Preventing recursion within one parent packet must not suppress every valid
  new echo event. The same block gives different proc orders for different
  effects; it does not support a universal source-before-target rule.

The unresolved contract includes:

1. Whether amplifiers create one combined child or multiple children, and their
   order relative to the base packet and each other.
2. Whether threshold health is captured once or reevaluated when child damage
   crosses a threshold.
3. Source/owner identity and inheritance of lifesteal, omnivamp, on-hit, spell
   and damage-event properties. [Life steal 4060425](https://wiki.leagueoflegends.com/en-us/?oldid=4060425)
   itself leaves modifier eligibility as an open question; [Vamp 4089668](https://wiki.leagueoflegends.com/en-us/?oldid=4089668)
   distinguishes damage properties rather than only visible labels.
4. Reductions, nonpositive outgoing factors, critical averaging, flat reduction,
   shields, health floors and overkill across base and child instances.
5. Callback order, same-event recursion prevention, and independently eligible
   reflected, stored or transferred events.
6. Recipient eligibility beyond specifically established cases; a clone tagged
   as a champion is not proof that every rune applies to it.

The [official patch 26.9 notes](https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-26-9-notes/)
do not supply this algorithm. Fetching those notes and the Wiki is source
research, not an in-game measurement. Next work needs explicit packet provenance
and fixture ledgers for stable-health Zed/Last Stand and Illaoi/Last Stand,
followed by threshold, cap, shield, true-damage and echo-recursion cases.

## Conditioning: classification, timing and recursion

[Conditioning template 3825864](https://wiki.leagueoflegends.com/en-us/?oldid=3825864)
and the 16.21 client agree on 8 armor and 8 magic resistance after 12 minutes,
then a 3% increase to total resistances. Level 20 does not establish elapsed game
time. A future implementation needs an explicit game clock or a declared frozen
pre-fight state, with threshold-crossing behavior stated.

The [full article 3980942](https://wiki.leagueoflegends.com/en-us/?oldid=3980942)
says the increase to base resistance does not count as bonus resistance, without
establishing that it truly becomes base resistance. Current derived stats split
resistance into base and bonus and put total-percentage gains into bonus.
Adding ordinary 3% resistance statuses would therefore affect bonus-resistance
ratios and penetration incorrectly.

[Armor 4073057](https://wiki.leagueoflegends.com/en-us/?oldid=4073057) and
[Magic resistance 4073058](https://wiki.leagueoflegends.com/en-us/?oldid=4073058)
multiply Conditioning by other total multipliers in worked examples; the
current engine sums those percentage statuses. [Recursion 4060420](https://wiki.leagueoflegends.com/en-us/?oldid=4060420)
also explicitly lists Conditioning with Poppy and Malphite, using coupled
multipliers with a `1 - A × B` denominator. The worked resistance examples do
not show that denominator. This disagreement needs source comparison or
controlled measurement rather than selecting the easier formula.

Poppy's health threshold, Malphite's shield state and Rammus W can change the
relevant multipliers during combat. A start-only snapshot misses those changes;
a compensating per-tick flat grant can be stale inside synchronous effects.
Ornn also needs source-qualified rune stats before innate initialization.
Conditioning remains unimplemented until resistance classes, ordering and
pair-specific recursion are supported and verified.

## Unflinching: damage and crowd-control phases

[Unflinching 4053306](https://wiki.leagueoflegends.com/en-us/?oldid=4053306), its
[template 3958701](https://wiki.leagueoflegends.com/en-us/?oldid=3958701) and the
current client agree on 10 bonus armor and magic resistance while affected by
hostile champion crowd control and for two seconds afterward. The article
includes all crowd control except kinematics/disruption, and explicitly puts
simultaneous damage before activation of the resistance buff.

Installing the buff immediately in `onCCApplied` can incorrectly reduce damage
that follows in the same ability payload. Deferring a whole tick can wrongly
omit resistance against other same-tick packets. The two-second tail must also
follow actual cleanse or early termination rather than the originally scheduled
expiry. A source-qualified event-phase contract and CC-removal notification are
needed. Unflinching remains unimplemented.

## Legend runes and Garen attack-speed eligibility

The retained [Alacrity template 3958705](https://wiki.leagueoflegends.com/en-us/?oldid=3958705)
and [article 3980881](https://wiki.leagueoflegends.com/en-us/?oldid=3980881) agree
with the client on 3% bonus attack speed plus 1.5% per stack, at most ten stacks.
[Bloodline template 3971359](https://wiki.leagueoflegends.com/en-us/?oldid=3971359)
and [article 4021767](https://wiki.leagueoflegends.com/en-us/?oldid=4021767) give
0.45% lifesteal per stack, at most fifteen stacks, and 85 bonus health only at the
cap. These values do not establish a match's earned history. Explicit declared
stacks could support a frozen pre-fight model; runtime progression needs the
actual point and takedown history.

Neither rune is implemented. Before equipping them, the shared initialization
path must distinguish rune and item origins and support pre-kit stat grants.
Bloodline health must exist before Ornn's innate setup and initial health-based
shields. Alacrity must affect combat attack speed and Kai'Sa E timing without
qualifying for Living Weapon evolutions.

The known **Garen attack-speed shard defect is corrected** in the follow-up to
the Absorb Life batch:
[Judgment revision 4009435](https://wiki.leagueoflegends.com/en-us/?oldid=4009435)
limits spin scaling to item attack speed and level growth. The
[Garen kit](../../kits/champions/Garen.ts) now subtracts the recorded
`rune-shards:attackSpeed` contribution when calculating Judgment pulses. The
shard still improves basic attacks. A shared channel pulse-count callback is
used by actual cast scheduling and budget estimates; ordinary formula and
interval channels retain their existing path.

This is a narrow correction for an already recorded rune origin. It is not a
complete source classifier for every attack-speed status, and it does not
implement Legend: Alacrity. A future Alacrity implementation must exclude its
own rune-origin contribution as well.

Existing item-passive behavior is preserved. [Garen's patch history,
revision 4051881](https://wiki.leagueoflegends.com/en-us/?oldid=4051881), explicitly
records a V11.2 fix making Trinity Force's former Mythic passive count toward
spins, so a blanket exclusion of all item passives would be unsupported.
The current [Guinsoo's Rageblade revision 4065931](https://wiki.leagueoflegends.com/en-us/?oldid=4065931)
does not establish whether temporary Seething Strike attack speed qualifies.
That eligibility remains unverified. Capturing the count once at cast also
retains the simulator's timing assumption; the full checked sources do not
establish live-game snapshot or mid-channel update timing.

The [full refresh](https://github.com/marvelagent210-sys/leagueoflegendscounterpicker/actions/runs/42225042960)
computed all 14,878 unordered pairings in each default matrix. All 22 jobs
succeeded, including the combined TypeScript checks and full test suite. Default
scores, scenarios, builds, variants and spending match the previous baseline;
the new calculation keys and provenance identify the corrected runtime. The
[accuracy log](../../ACCURACY.md) records refresh and release validation.

These gaps keep step 1 of the [roadmap](../IMPROVEMENT_ROADMAP.md) in progress.
They do not change the current manual inventory or claim that deferred runes
are ineffective in the game.
