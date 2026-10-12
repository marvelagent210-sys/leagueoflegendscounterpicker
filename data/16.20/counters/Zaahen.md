# Counters to Zaahen (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 48 other champions with a simulator kit against Zaahen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Zaahen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Zaahen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Teemo | +0.86 | +1.00 | +1.00 | +1.00 | +0.42 | +1.00 | +0.00 |
| 2 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +1.00 |
| 3 | Quinn | +0.83 | +1.00 | +1.00 | +0.86 | +0.37 | +1.00 | +0.00 |
| 4 | Olaf | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 5 | Jax | +0.09 | +0.00 | +1.00 | −0.86 | +0.03 | – | +0.00 |
| 6 | Trundle | +0.06 | +0.46 | −0.55 | +0.23 | −0.11 | – | +1.00 |
| 7 | Gangplank | −0.01 | −1.00 | +0.10 | +1.00 | +0.10 | – | +0.00 |
| 8 | Aurora | −0.09 | −0.32 | −0.44 | +0.27 | +0.18 | +0.19 | +0.00 |
| 9 | Fiora | −0.09 | +0.10 | −0.05 | −0.77 | +0.10 | – | +0.83 |
| 10 | Kayle | −0.18 | −0.00 | +0.23 | −1.00 | +0.43 | −1.00 | +0.00 |
| 11 | Singed | −0.18 | −0.35 | −0.34 | +0.12 | −0.12 | – | +0.00 |
| 12 | Illaoi | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 13 | Darius | −0.44 | −0.56 | −0.53 | −0.54 | −0.10 | – | +0.00 |
| 14 | Kennen | −0.46 | −1.00 | −1.00 | +0.69 | +0.01 | −1.00 | +0.00 |
| 15 | Heimerdinger | −0.46 | −1.00 | −1.00 | +0.53 | +0.21 | −1.00 | +0.00 |
| 16 | Kled | −0.52 | −0.03 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 17 | Riven | −0.69 | −1.00 | −1.00 | −0.76 | +0.21 | – | +0.00 |
| 18 | Yorick | −0.70 | −1.00 | −0.93 | −1.00 | +0.03 | – | +0.93 |
| 19 | Poppy | −0.73 | −1.00 | −1.00 | −1.00 | +0.26 | – | +0.00 |
| 20 | Cho'Gath | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 21 | Garen | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 22 | Yasuo | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 23 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 24 | Pantheon | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 25 | Jayce | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 26 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 27 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 28 | Udyr | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 29 | Gnar | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 30 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 31 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 32 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 33 | Yone | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 34 | Sion | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 35 | Tahm Kench | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 36 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 37 | Mordekaiser | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 38 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 39 | Volibear | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 40 | Ambessa | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 41 | Nasus | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 42 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 43 | Camille | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 44 | Tryndamere | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 45 | Dr. Mundo | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 46 | Gwen | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 47 | Aatrox | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 48 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Zaahen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zaahen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zaahen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Vladimir (net +1.25)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 2 s, long enough to use ahead of Grim Deliverance. (Vladimir W Sanguine Pool → Zaahen R Grim Deliverance)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's Dreaded Return. Untargetable for 2 s, long enough to use ahead of Dreaded Return. (Vladimir W Sanguine Pool → Zaahen W Dreaded Return)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 2 s, long enough to use ahead of The Darkin Glaive. (Vladimir W Sanguine Pool → Zaahen Q The Darkin Glaive)
- Watch out: The Darkin Glaive's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 2. Kayle (net +1.21)

- **0.90** invulnerable: Divine Judgment makes Kayle invulnerable to Zaahen's Grim Deliverance. Invulnerable for 2.5 s, long enough to use ahead of Grim Deliverance. (Kayle R Divine Judgment → Zaahen R Grim Deliverance)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Zaahen's (625 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Kayle basic attacks → Zaahen basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Zaahen's Dreaded Return (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Dreaded Return. (Kayle R Divine Judgment → Zaahen W Dreaded Return)
- Watch out: Grim Deliverance makes Zaahen immune to Kayle's Radiant Blast (slow).

#### 3. Fiora (net +1.12)

- **0.90** parry: Riposte parries Zaahen's Grim Deliverance. Parry for 0.75 s; Grim Deliverance takes 0.5 s to land, enough to react. (Fiora W Riposte → Zaahen R Grim Deliverance)
- **0.70** parry: Riposte parries Zaahen's Dreaded Return and stuns back. Parry for 0.75 s; Dreaded Return takes 0.79 s to land, enough to react. Negating Dreaded Return's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zaahen W Dreaded Return)
- **0.36** parry: Riposte parries Zaahen's The Darkin Glaive and stuns back. Parry for 0.75 s; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating The Darkin Glaive's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Fiora's Riposte (cripple, slow, stun).

#### 4. Elise (net +1.11)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 0.6 s; Grim Deliverance takes 0.5 s to land, enough to react. (Elise E Rappel → Zaahen R Grim Deliverance)
- **0.56** untargetable: Rappel makes Elise untargetable, dodging Zaahen's Dreaded Return. Untargetable for 0.6 s; Dreaded Return takes 0.79 s to land, enough to react. (Elise E Rappel → Zaahen W Dreaded Return)
- **0.25** untargetable: Rappel makes Elise untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 0.6 s; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Elise's Cocoon (stun).

#### 5. Sivir (net +1.11)

- **0.56** spell shield: Spell Shield's spell shield blocks Zaahen's Dreaded Return. Spell shield for 1.5 s, long enough to use ahead of Dreaded Return. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zaahen W Dreaded Return)
- **0.45** spell shield: Spell Shield's spell shield blocks part of Zaahen's Grim Deliverance. Spell shield for 1.5 s, long enough to use ahead of Grim Deliverance. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the damage but not the heal. (Sivir E Spell Shield → Zaahen R Grim Deliverance)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Zaahen's (500 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Sivir basic attacks → Zaahen basic attacks)

#### 6. Gwen (net +1.10)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's Grim Deliverance. Untargetable for ?; Grim Deliverance takes 0.5 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen R Grim Deliverance)
- **0.56** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's Dreaded Return. Untargetable for ?; Dreaded Return takes 0.79 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen W Dreaded Return)
- **0.25** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for ?; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Gwen's Needlework (slow).

#### 7. Xayah (net +1.06)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 1.5 s, long enough to use ahead of Grim Deliverance. (Xayah R Featherstorm → Zaahen R Grim Deliverance)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's Dreaded Return. Untargetable for 1.5 s, long enough to use ahead of Dreaded Return. (Xayah R Featherstorm → Zaahen W Dreaded Return)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 1.5 s, long enough to use ahead of The Darkin Glaive. (Xayah R Featherstorm → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Xayah's Bladecaller (root).

#### 8. Aurora (net +1.05)

- **0.79** untargetable: Between Worlds makes Aurora untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 0.4 s; Grim Deliverance takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zaahen R Grim Deliverance)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Zaahen's Dreaded Return. Untargetable for 0.4 s; Dreaded Return takes 0.79 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zaahen W Dreaded Return)
- **0.18** range: Aurora's basic attacks reach 375 units farther than Zaahen's (550 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Aurora basic attacks → Zaahen basic attacks)
- Watch out: Grim Deliverance makes Zaahen immune to Aurora's Between Worlds (slow).

#### 9. Kindred (net +1.04)

- **0.72** invulnerable: Lamb's Respite makes Kindred invulnerable to Zaahen's Grim Deliverance. Invulnerable for ?; Grim Deliverance takes 0.5 s to land, enough to react. (Kindred R Lamb's Respite → Zaahen R Grim Deliverance)
- **0.27** range: Kindred's basic attacks reach 325 units farther than Zaahen's (500 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Kindred basic attacks → Zaahen basic attacks)
- **0.16** invulnerable: Lamb's Respite makes Kindred invulnerable to Zaahen's Dreaded Return (its crowd control still applies). Invulnerable for ?; Dreaded Return takes 0.79 s to land, enough to react. (Kindred R Lamb's Respite → Zaahen W Dreaded Return)
- Watch out: Grim Deliverance makes Zaahen immune to Kindred's Mounting Dread (slow).

#### 10. Master Yi (net +1.01)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Zaahen's Grim Deliverance. Untargetable for ?; Grim Deliverance takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Zaahen R Grim Deliverance)
- **0.56** untargetable: Alpha Strike makes Master Yi untargetable, dodging Zaahen's Dreaded Return. Untargetable for ?; Dreaded Return takes 0.79 s to land, enough to react. (Master Yi Q Alpha Strike → Zaahen W Dreaded Return)
- **0.25** untargetable: Alpha Strike makes Master Yi untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for ?; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Zaahen Q The Darkin Glaive)
- Watch out: The Darkin Glaive's airborne interrupts Master Yi's Meditate (normal channel).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +1.25 | 1.41 | 0.16 |  |
| 2 | Kayle | +1.21 | 1.26 | 0.05 |  |
| 3 | Fiora | +1.12 | 1.35 | 0.23 |  |
| 4 | Elise | +1.11 | 1.44 | 0.33 |  |
| 5 | Sivir | +1.11 | 1.11 | 0.00 |  |
| 6 | Gwen | +1.10 | 1.24 | 0.14 |  |
| 7 | Xayah | +1.06 | 1.25 | 0.19 |  |
| 8 | Aurora | +1.05 | 1.20 | 0.15 |  |
| 9 | Kindred | +1.04 | 1.09 | 0.05 |  |
| 10 | Master Yi | +1.01 | 1.24 | 0.23 |  |
| 11 | Singed | +1.00 | 1.39 | 0.39 | grounding (Mega Adhesive) |
| 12 | Rek'Sai | +0.97 | 1.17 | 0.20 |  |
| 13 | Zed | +0.97 | 1.00 | 0.03 |  |
| 14 | Yuumi | +0.94 | 1.54 | 0.60 |  |
| 15 | Ekko | +0.88 | 1.14 | 0.26 |  |
| 16 | Nocturne | +0.83 | 1.16 | 0.33 |  |
| 17 | Evelynn | +0.78 | 1.12 | 0.34 |  |
| 18 | Udyr | +0.76 | 1.05 | 0.29 |  |
| 19 | Shaco | +0.73 | 1.12 | 0.39 |  |
| 20 | Teemo | +0.71 | 0.87 | 0.16 | blind (Blinding Dart), blind (Blinding Dart) |
| 21 | Pantheon | +0.69 | 1.09 | 0.40 |  |
| 22 | Taric | +0.63 | 0.84 | 0.21 |  |
| 23 | Jax | +0.54 | 0.74 | 0.20 | attack dodge (Counter Strike) |
| 24 | Gangplank | +0.53 | 0.70 | 0.17 |  |
| 25 | Samira | +0.48 | 0.69 | 0.21 | projectile block (Blade Whirl) |
| 26 | Rengar | +0.45 | 0.78 | 0.33 |  |
| 27 | Olaf | +0.45 | 0.50 | 0.05 |  |
| 28 | Bard | +0.44 | 1.36 | 0.92 |  |
| 29 | Lissandra | +0.39 | 1.31 | 0.92 |  |
| 30 | Kayn | +0.34 | 1.12 | 0.78 |  |
| 31 | Mel | +0.31 | 0.64 | 0.33 | projectile block (Rebuttal) |
| 32 | Vex | +0.31 | 0.63 | 0.32 |  |
| 33 | Jinx | +0.29 | 0.52 | 0.23 |  |
| 34 | Nasus | +0.28 | 0.33 | 0.05 |  |
| 35 | Milio | +0.24 | 0.57 | 0.33 |  |
| 36 | Camille | +0.23 | 1.08 | 0.85 |  |
| 37 | Zeri | +0.23 | 0.28 | 0.05 |  |
| 38 | Katarina | +0.22 | 0.50 | 0.28 |  |
| 39 | Twitch | +0.22 | 0.27 | 0.05 |  |
| 40 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 41 | Morgana | +0.21 | 0.93 | 0.72 |  |
| 42 | Maokai | +0.20 | 1.33 | 1.13 |  |
| 43 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 44 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 45 | Yunara | +0.16 | 0.24 | 0.08 |  |
| 46 | Ahri | +0.12 | 0.46 | 0.34 |  |
| 47 | Illaoi | +0.12 | 0.18 | 0.06 |  |
| 48 | Garen | +0.11 | 0.18 | 0.07 |  |
| 49 | Veigar | +0.10 | 0.45 | 0.35 |  |
| 50 | Kog'Maw | +0.10 | 0.16 | 0.06 |  |
| 51 | Graves | +0.08 | 0.14 | 0.06 |  |
| 52 | Nilah | +0.06 | 0.54 | 0.48 |  |
| 53 | Corki | +0.04 | 0.37 | 0.33 |  |
| 54 | Yasuo | +0.03 | 0.58 | 0.55 | projectile block (Wind Wall) |
| 55 | Xin Zhao | -0.01 | 0.91 | 0.92 |  |
| 56 | Viktor | -0.02 | 0.50 | 0.52 |  |
| 57 | Kalista | -0.03 | 0.57 | 0.60 |  |
| 58 | Akali | -0.03 | 0.00 | 0.03 |  |
| 59 | Lulu | -0.04 | 0.52 | 0.56 |  |
| 60 | Talon | -0.05 | 0.00 | 0.05 |  |
| 61 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 62 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 63 | Vayne | -0.07 | 0.27 | 0.34 |  |
| 64 | Lucian | -0.07 | 0.21 | 0.28 |  |
| 65 | Kha'Zix | -0.07 | 0.00 | 0.07 |  |
| 66 | Hwei | -0.08 | 0.49 | 0.57 |  |
| 67 | Kennen | -0.08 | 0.18 | 0.26 |  |
| 68 | Akshan | -0.09 | 0.19 | 0.28 |  |
| 69 | LeBlanc | -0.09 | 0.13 | 0.22 |  |
| 70 | Cassiopeia | -0.11 | 0.76 | 0.87 | grounding (Miasma) |
| 71 | Annie | -0.11 | 0.15 | 0.26 |  |
| 72 | Malzahar | -0.12 | 0.82 | 0.94 |  |
| 73 | Varus | -0.13 | 0.68 | 0.81 |  |
| 74 | Miss Fortune | -0.14 | 0.20 | 0.34 |  |
| 75 | Zilean | -0.14 | 0.20 | 0.34 |  |
| 76 | Senna | -0.15 | 0.22 | 0.37 |  |
| 77 | Zoe | -0.15 | 0.20 | 0.35 |  |
| 78 | Kassadin | -0.15 | 0.00 | 0.15 |  |
| 79 | Jayce | -0.17 | 0.18 | 0.35 |  |
| 80 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 81 | Sion | -0.18 | 0.52 | 0.70 |  |
| 82 | Lux | -0.18 | 0.18 | 0.36 |  |
| 83 | Renekton | -0.19 | 0.00 | 0.19 |  |
| 84 | Alistar | -0.20 | 0.40 | 0.60 |  |
| 85 | Soraka | -0.22 | 0.17 | 0.39 |  |
| 86 | Karthus | -0.23 | 0.11 | 0.34 |  |
| 87 | Braum | -0.24 | 0.70 | 0.94 | projectile block (Unbreakable) |
| 88 | Smolder | -0.24 | 0.20 | 0.44 |  |
| 89 | Volibear | -0.24 | 0.18 | 0.42 |  |
| 90 | Brand | -0.24 | 0.14 | 0.38 |  |
| 91 | Yorick | -0.24 | 0.00 | 0.24 |  |
| 92 | Shen | -0.25 | 0.70 | 0.95 | attack block (Spirit's Refuge) |
| 93 | Swain | -0.26 | 0.12 | 0.38 |  |
| 94 | Quinn | -0.27 | 0.22 | 0.49 |  |
| 95 | Ziggs | -0.28 | 0.17 | 0.45 |  |
| 96 | Twisted Fate | -0.29 | 0.25 | 0.54 |  |
| 97 | Mordekaiser | -0.31 | 0.08 | 0.39 |  |
| 98 | Shyvana | -0.33 | 0.18 | 0.51 |  |
| 99 | Karma | -0.33 | 0.13 | 0.46 |  |
| 100 | Bel'Veth | -0.37 | 0.00 | 0.37 |  |
| 101 | Anivia | -0.38 | 0.16 | 0.54 |  |
| 102 | Darius | -0.38 | 0.00 | 0.38 |  |
| 103 | Trundle | -0.38 | 0.00 | 0.38 |  |
| 104 | Warwick | -0.39 | 0.67 | 1.06 |  |
| 105 | Heimerdinger | -0.39 | 0.12 | 0.51 |  |
| 106 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 107 | Irelia | -0.40 | 0.00 | 0.40 |  |
| 108 | Caitlyn | -0.41 | 0.24 | 0.65 |  |
| 109 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 110 | Ashe | -0.46 | 0.24 | 0.70 |  |
| 111 | Ivern | -0.46 | 0.11 | 0.57 |  |
| 112 | Riven | -0.47 | 0.00 | 0.47 |  |
| 113 | Wukong | -0.48 | 0.00 | 0.48 |  |
| 114 | Gnar | -0.49 | 0.19 | 0.68 |  |
| 115 | Thresh | -0.49 | 0.11 | 0.60 |  |
| 116 | Blitzcrank | -0.49 | 0.00 | 0.49 |  |
| 117 | Vel'Koz | -0.50 | 0.16 | 0.66 |  |
| 118 | Sylas | -0.51 | 0.00 | 0.51 |  |
| 119 | Ryze | -0.53 | 0.15 | 0.68 |  |
| 120 | Sona | -0.54 | 0.26 | 0.80 |  |
| 121 | Jhin | -0.54 | 0.17 | 0.71 |  |
| 122 | Xerath | -0.54 | 0.16 | 0.70 |  |
| 123 | Draven | -0.56 | 0.22 | 0.78 |  |
| 124 | Sett | -0.59 | 0.18 | 0.77 |  |
| 125 | Tristana | -0.60 | 0.24 | 0.84 |  |
| 126 | Locke | -0.61 | 0.00 | 0.61 |  |
| 127 | Poppy | -0.63 | 0.57 | 1.20 | dash stop (Steadfast Presence) |
| 128 | Malphite | -0.64 | 0.39 | 1.03 |  |
| 129 | Orianna | -0.66 | 0.16 | 0.82 |  |
| 130 | Azir | -0.67 | 0.16 | 0.83 |  |
| 131 | Syndra | -0.68 | 0.14 | 0.82 |  |
| 132 | Naafiri | -0.68 | 0.00 | 0.68 |  |
| 133 | Kled | -0.69 | 0.47 | 1.16 |  |
| 134 | Lee Sin | -0.70 | 0.00 | 0.70 |  |
| 135 | Aphelios | -0.74 | 0.24 | 0.98 |  |
| 136 | Renata Glasc | -0.75 | 0.24 | 0.99 |  |
| 137 | Fiddlesticks | -0.77 | 0.11 | 0.88 |  |
| 138 | Lillia | -0.78 | 0.05 | 0.83 |  |
| 139 | Seraphine | -0.80 | 0.17 | 0.97 |  |
| 140 | Diana | -0.80 | 0.00 | 0.80 |  |
| 141 | Hecarim | -0.81 | 0.19 | 1.00 |  |
| 142 | Zyra | -0.81 | 0.16 | 0.97 |  |
| 143 | Nami | -0.82 | 0.14 | 0.96 |  |
| 144 | Neeko | -0.83 | 0.14 | 0.97 |  |
| 145 | Fizz | -0.83 | 0.00 | 0.83 |  |
| 146 | Janna | -0.85 | 0.22 | 1.07 |  |
| 147 | Yone | -0.86 | 0.36 | 1.22 |  |
| 148 | Amumu | -0.87 | 0.18 | 1.05 |  |
| 149 | Urgot | -0.89 | 0.08 | 0.97 |  |
| 150 | Skarner | -0.89 | 0.00 | 0.89 |  |
| 151 | Leona | -0.95 | 0.00 | 0.95 |  |
| 152 | Qiyana | -0.97 | 0.00 | 0.97 |  |
| 153 | K'Sante | -0.98 | 0.35 | 1.33 |  |
| 154 | Rakan | -0.98 | 0.06 | 1.04 |  |
| 155 | Aurelion Sol | -1.00 | 0.14 | 1.14 |  |
| 156 | Jarvan IV | -1.01 | 0.18 | 1.19 |  |
| 157 | Ambessa | -1.01 | 0.00 | 1.01 |  |
| 158 | Nunu & Willump | -1.02 | 0.00 | 1.02 |  |
| 159 | Galio | -1.06 | 0.00 | 1.06 |  |
| 160 | Nautilus | -1.06 | 0.00 | 1.06 |  |
| 161 | Ornn | -1.10 | 0.18 | 1.28 |  |
| 162 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 163 | Rammus | -1.15 | 0.32 | 1.47 |  |
| 164 | Rell | -1.17 | 0.00 | 1.17 |  |
| 165 | Gragas | -1.20 | 0.00 | 1.20 |  |
| 166 | Zac | -1.22 | 0.40 | 1.62 | dash stop (Stretching Strikes) |
| 167 | Briar | -1.22 | 0.00 | 1.22 |  |
| 168 | Viego | -1.30 | 0.18 | 1.48 |  |
| 169 | Pyke | -1.37 | 0.00 | 1.37 |  |
| 170 | Vi | -1.46 | 0.18 | 1.64 |  |
| 171 | Taliyah | -1.53 | 0.16 | 1.69 |  |
| 172 | Tahm Kench | -1.57 | 0.00 | 1.57 |  |
