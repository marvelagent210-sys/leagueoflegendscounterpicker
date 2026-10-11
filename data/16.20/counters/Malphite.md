# Counters to Malphite (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 30 other champions with a simulator kit against Malphite: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Malphite wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Malphite --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 2 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 3 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 4 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 5 | Volibear | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 6 | Aatrox | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 7 | Mordekaiser | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 8 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.00 |
| 9 | Fiora | +0.74 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.00 |
| 10 | Jax | +0.68 | +1.00 | +1.00 | +1.00 | −0.11 | +0.00 | +0.00 |
| 11 | Dr. Mundo | +0.24 | +0.36 | +0.35 | +0.35 | −0.21 | – | +0.00 |
| 12 | Nasus | +0.05 | +0.11 | +0.08 | +0.07 | −0.11 | +0.10 | +0.00 |
| 13 | Poppy | +0.01 | −0.01 | +0.03 | +0.02 | −0.02 | – | +0.00 |
| 14 | Shen | −0.00 | +0.01 | −0.07 | +0.10 | −0.03 | – | +0.00 |
| 15 | Renekton | −0.08 | −0.08 | −0.08 | −0.08 | −0.11 | – | +0.00 |
| 16 | Ornn | −0.12 | −0.16 | −0.16 | −0.13 | −0.01 | – | +0.00 |
| 17 | Sett | −0.23 | −0.26 | −0.29 | −0.26 | −0.09 | – | +0.00 |
| 18 | Kayle | −0.73 | −1.00 | −1.00 | −1.00 | +0.45 | −1.00 | +0.00 |
| 19 | Teemo | −0.74 | −1.00 | −1.00 | −1.00 | +0.40 | −1.00 | +0.00 |
| 20 | Yasuo | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 21 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 22 | Yone | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 23 | Quinn | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 24 | Riven | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 25 | Camille | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 26 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 27 | Tryndamere | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 28 | Garen | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 29 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 30 | Kennen | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −0.99 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Malphite's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Malphite's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Malphite` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Elise (net +1.26)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Malphite's Unstoppable Force. Untargetable for 0.6 s; Unstoppable Force takes 0.67 s to land, enough to react. (Elise E Rappel → Malphite R Unstoppable Force)
- **0.32** range: Elise's basic attacks reach 425 units farther than Malphite's (550 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Elise basic attacks → Malphite basic attacks)
- **0.30** untargetable: Rappel makes Elise untargetable, dodging Malphite's Seismic Shard. Untargetable for 0.6 s; Seismic Shard takes 0.77 s to land, enough to react. (Elise E Rappel → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Elise's attack speed by 50% for 3 s.

#### 2. Aurora (net +1.25)

- **1.00** untargetable: Between Worlds makes Aurora untargetable, dodging Malphite's Unstoppable Force. Untargetable for 0.4 s; Unstoppable Force takes 0.67 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Malphite R Unstoppable Force)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Malphite's (550 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Aurora basic attacks → Malphite basic attacks)
- **0.20** cc immunity: Between Worlds is displacement immune, ignoring Malphite's Unstoppable Force (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Malphite R Unstoppable Force)
- Watch out: Ground Slam cuts Aurora's attack speed by 50% for 3 s.

#### 3. Xayah (net +1.23)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Malphite's Unstoppable Force. Untargetable for 1.5 s, long enough to use ahead of Unstoppable Force. (Xayah R Featherstorm → Malphite R Unstoppable Force)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Malphite's (525 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Xayah basic attacks → Malphite basic attacks)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Malphite's Seismic Shard. Untargetable for 1.5 s, long enough to use ahead of Seismic Shard. (Xayah R Featherstorm → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Xayah's attack speed by 50% for 3 s.

#### 4. Sivir (net +1.22)

- **1.00** spell shield: Spell Shield's spell shield blocks Malphite's Unstoppable Force. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Force. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Malphite R Unstoppable Force)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Malphite's (500 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Sivir basic attacks → Malphite basic attacks)
- **0.15** spell shield: Spell Shield's spell shield blocks part of Malphite's Seismic Shard. Spell shield for 1.5 s, long enough to use ahead of Seismic Shard. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Sivir's attack speed by 50% for 3 s.

#### 5. Vladimir (net +1.15)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malphite's Unstoppable Force. Untargetable for 2 s, long enough to use ahead of Unstoppable Force. (Vladimir W Sanguine Pool → Malphite R Unstoppable Force)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malphite's Seismic Shard. Untargetable for 2 s, long enough to use ahead of Seismic Shard. (Vladimir W Sanguine Pool → Malphite Q Seismic Shard)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Malphite's (450 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Vladimir basic attacks → Malphite basic attacks)
- Watch out: Ground Slam cuts Vladimir's attack speed by 50% for 3 s.

#### 6. Bard (net +1.14)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Malphite's Unstoppable Force. Untargetable for 2.5 s, long enough to use ahead of Unstoppable Force. (Bard R Tempered Fate → Malphite R Unstoppable Force)
- **0.36** range: Bard's basic attacks reach 375 units farther than Malphite's (500 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Bard basic attacks → Malphite basic attacks)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Malphite's Seismic Shard. Untargetable for 2.5 s, long enough to use ahead of Seismic Shard. (Bard R Tempered Fate → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Bard's attack speed by 50% for 3 s.

#### 7. Lissandra (net +1.14)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Malphite's Unstoppable Force. Untargetable for 2.5 s, long enough to use ahead of Unstoppable Force. (Lissandra R Frozen Tomb → Malphite R Unstoppable Force)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Malphite's (550 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Lissandra basic attacks → Malphite basic attacks)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Malphite's Seismic Shard. Untargetable for 2.5 s, long enough to use ahead of Seismic Shard. (Lissandra R Frozen Tomb → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Lissandra's attack speed by 50% for 3 s.

#### 8. Morgana (net +1.09)

- **1.00** cc immunity: Black Shield makes Morgana immune to Malphite's Unstoppable Force (airborne). Immune for 5 s, long enough to use ahead of Unstoppable Force. (Morgana E Black Shield → Malphite R Unstoppable Force)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Malphite's (450 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Morgana basic attacks → Malphite basic attacks)
- **0.08** cc immunity: Black Shield makes Morgana immune to Malphite's Seismic Shard (slow). Immune for 5 s, long enough to use ahead of Seismic Shard. (Morgana E Black Shield → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Morgana's attack speed by 50% for 3 s.

#### 9. Fiora (net +1.07)

- **1.10** parry: Riposte parries Malphite's Unstoppable Force and stuns back. Parry for 0.75 s; Unstoppable Force takes 0.67 s to land, enough to react. Negating Unstoppable Force's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Malphite R Unstoppable Force)
- **0.32** parry: Riposte parries Malphite's Seismic Shard. Parry for 0.75 s; Seismic Shard takes 0.77 s to land, enough to react. (Fiora W Riposte → Malphite Q Seismic Shard)
- **0.07** attack speed slow: Riposte cuts Malphite's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Malphite basic attacks)
- Watch out: Ground Slam cuts Fiora's attack speed by 50% for 3 s.

#### 10. Nocturne (net +1.04)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Malphite's Unstoppable Force. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Force. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Malphite R Unstoppable Force)
- **0.20** cc immunity: Paranoia is displacement immune, ignoring Malphite's Unstoppable Force (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Malphite R Unstoppable Force)
- **0.18** spell shield: Shroud of Darkness's spell shield blocks part of Malphite's Seismic Shard. Spell shield for 1.5 s, long enough to use ahead of Seismic Shard. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Nocturne's attack speed by 50% for 3 s.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.26 | 1.47 | 0.21 |  |
| 2 | Aurora | +1.25 | 1.44 | 0.19 |  |
| 3 | Xayah | +1.23 | 1.48 | 0.25 |  |
| 4 | Sivir | +1.22 | 1.55 | 0.33 |  |
| 5 | Vladimir | +1.15 | 1.34 | 0.19 |  |
| 6 | Bard | +1.14 | 1.47 | 0.33 |  |
| 7 | Lissandra | +1.14 | 1.33 | 0.19 |  |
| 8 | Morgana | +1.09 | 1.25 | 0.16 |  |
| 9 | Fiora | +1.07 | 1.28 | 0.21 |  |
| 10 | Nocturne | +1.04 | 1.29 | 0.25 |  |
| 11 | Maokai | +0.95 | 1.20 | 0.25 |  |
| 12 | Evelynn | +0.93 | 1.11 | 0.18 |  |
| 13 | Gwen | +0.91 | 1.15 | 0.24 |  |
| 14 | Zed | +0.91 | 1.10 | 0.19 |  |
| 15 | Ekko | +0.90 | 1.11 | 0.21 |  |
| 16 | Shaco | +0.90 | 1.11 | 0.21 |  |
| 17 | Yuumi | +0.89 | 1.55 | 0.66 |  |
| 18 | Master Yi | +0.89 | 1.24 | 0.35 |  |
| 19 | Udyr | +0.81 | 1.08 | 0.27 |  |
| 20 | Rek'Sai | +0.80 | 1.16 | 0.36 |  |
| 21 | Warwick | +0.79 | 1.23 | 0.44 |  |
| 22 | Olaf | +0.79 | 1.04 | 0.25 |  |
| 23 | Camille | +0.75 | 1.15 | 0.40 |  |
| 24 | Sion | +0.72 | 1.04 | 0.32 |  |
| 25 | Kalista | +0.67 | 1.07 | 0.40 |  |
| 26 | Kayle | +0.67 | 0.91 | 0.24 |  |
| 27 | Gangplank | +0.66 | 0.85 | 0.19 |  |
| 28 | Zaahen | +0.64 | 1.03 | 0.39 |  |
| 29 | Kindred | +0.64 | 0.97 | 0.33 |  |
| 30 | Rengar | +0.61 | 0.86 | 0.25 |  |
| 31 | Kled | +0.60 | 1.11 | 0.51 |  |
| 32 | Cassiopeia | +0.56 | 0.70 | 0.14 | grounding (Miasma) |
| 33 | Kayn | +0.51 | 1.11 | 0.60 |  |
| 34 | Alistar | +0.51 | 0.83 | 0.32 |  |
| 35 | Teemo | +0.48 | 0.72 | 0.24 |  |
| 36 | Mel | +0.35 | 0.53 | 0.18 |  |
| 37 | Lulu | +0.31 | 0.63 | 0.32 |  |
| 38 | Pantheon | +0.31 | 0.57 | 0.26 |  |
| 39 | Samira | +0.28 | 0.58 | 0.30 |  |
| 40 | Vex | +0.26 | 0.47 | 0.21 |  |
| 41 | Taric | +0.25 | 0.50 | 0.25 |  |
| 42 | Malzahar | +0.24 | 0.76 | 0.52 |  |
| 43 | Singed | +0.24 | 0.49 | 0.25 | grounding (Mega Adhesive) |
| 44 | Corki | +0.23 | 0.50 | 0.27 |  |
| 45 | Aphelios | +0.21 | 0.46 | 0.25 |  |
| 46 | Braum | +0.16 | 0.45 | 0.29 | projectile block (Unbreakable) |
| 47 | Zeri | +0.15 | 0.44 | 0.29 |  |
| 48 | Twitch | +0.15 | 0.43 | 0.28 |  |
| 49 | Heimerdinger | +0.15 | 0.28 | 0.13 |  |
| 50 | Sona | +0.14 | 0.41 | 0.27 |  |
| 51 | Milio | +0.13 | 0.45 | 0.32 |  |
| 52 | Kai'Sa | +0.13 | 0.38 | 0.25 |  |
| 53 | Ashe | +0.12 | 0.36 | 0.24 |  |
| 54 | Yunara | +0.12 | 0.36 | 0.24 |  |
| 55 | Ezreal | +0.11 | 0.32 | 0.21 |  |
| 56 | Senna | +0.11 | 0.32 | 0.21 |  |
| 57 | Smolder | +0.11 | 0.32 | 0.21 |  |
| 58 | Zilean | +0.11 | 0.32 | 0.21 |  |
| 59 | Jax | +0.10 | 0.31 | 0.21 |  |
| 60 | Nidalee | +0.10 | 0.30 | 0.20 |  |
| 61 | Kennen | +0.10 | 0.29 | 0.19 |  |
| 62 | Lux | +0.10 | 0.29 | 0.19 |  |
| 63 | Seraphine | +0.10 | 0.29 | 0.19 |  |
| 64 | Soraka | +0.09 | 0.27 | 0.18 |  |
| 65 | Xin Zhao | +0.08 | 0.55 | 0.47 |  |
| 66 | Vayne | +0.08 | 0.43 | 0.35 |  |
| 67 | Nasus | +0.08 | 0.29 | 0.21 |  |
| 68 | Kog'Maw | +0.08 | 0.27 | 0.19 |  |
| 69 | Annie | +0.08 | 0.22 | 0.14 |  |
| 70 | Brand | +0.08 | 0.22 | 0.14 |  |
| 71 | Karma | +0.08 | 0.22 | 0.14 |  |
| 72 | LeBlanc | +0.08 | 0.22 | 0.14 |  |
| 73 | Viktor | +0.07 | 0.32 | 0.25 |  |
| 74 | Renata Glasc | +0.06 | 0.38 | 0.32 |  |
| 75 | Jinx | +0.06 | 0.29 | 0.23 |  |
| 76 | Draven | +0.05 | 0.36 | 0.31 |  |
| 77 | Tristana | +0.04 | 0.36 | 0.32 |  |
| 78 | Zoe | +0.04 | 0.32 | 0.28 |  |
| 79 | Varus | +0.04 | 0.27 | 0.23 |  |
| 80 | Veigar | +0.04 | 0.24 | 0.20 |  |
| 81 | Ahri | +0.04 | 0.22 | 0.18 |  |
| 82 | Gnar | +0.03 | 0.33 | 0.30 |  |
| 83 | Graves | +0.03 | 0.24 | 0.21 |  |
| 84 | Jayce | +0.02 | 0.30 | 0.28 |  |
| 85 | Orianna | +0.01 | 0.27 | 0.26 |  |
| 86 | Hwei | +0.01 | 0.23 | 0.22 |  |
| 87 | Syndra | +0.01 | 0.22 | 0.21 |  |
| 88 | Illaoi | +0.01 | 0.20 | 0.19 |  |
| 89 | Shyvana | +0.01 | 0.20 | 0.19 |  |
| 90 | Neeko | 0.00 | 0.22 | 0.22 |  |
| 91 | Hecarim | 0.00 | 0.21 | 0.21 |  |
| 92 | Swain | 0.00 | 0.21 | 0.21 |  |
| 93 | Nilah | -0.01 | 0.40 | 0.41 |  |
| 94 | Volibear | -0.01 | 0.20 | 0.21 |  |
| 95 | Ivern | -0.02 | 0.19 | 0.21 |  |
| 96 | Aurelion Sol | -0.04 | 0.22 | 0.26 |  |
| 97 | K'Sante | -0.05 | 0.40 | 0.45 |  |
| 98 | Quinn | -0.06 | 0.38 | 0.44 |  |
| 99 | Anivia | -0.06 | 0.24 | 0.30 |  |
| 100 | Azir | -0.07 | 0.27 | 0.34 |  |
| 101 | Ziggs | -0.08 | 0.27 | 0.35 |  |
| 102 | Zyra | -0.08 | 0.24 | 0.32 |  |
| 103 | Sett | -0.08 | 0.20 | 0.28 |  |
| 104 | Nami | -0.10 | 0.22 | 0.32 |  |
| 105 | Thresh | -0.10 | 0.19 | 0.29 |  |
| 106 | Rammus | -0.11 | 0.29 | 0.40 |  |
| 107 | Lillia | -0.11 | 0.11 | 0.22 |  |
| 108 | Urgot | -0.12 | 0.15 | 0.27 |  |
| 109 | Skarner | -0.12 | 0.09 | 0.21 |  |
| 110 | Akshan | -0.13 | 0.34 | 0.47 |  |
| 111 | Irelia | -0.13 | 0.05 | 0.18 |  |
| 112 | Caitlyn | -0.14 | 0.36 | 0.50 |  |
| 113 | Ornn | -0.14 | 0.20 | 0.34 |  |
| 114 | Garen | -0.14 | 0.14 | 0.28 |  |
| 115 | Lucian | -0.15 | 0.36 | 0.51 |  |
| 116 | Yasuo | -0.16 | 0.31 | 0.47 |  |
| 117 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 118 | Kha'Zix | -0.16 | 0.00 | 0.16 |  |
| 119 | Miss Fortune | -0.17 | 0.32 | 0.49 |  |
| 120 | Jhin | -0.17 | 0.27 | 0.44 |  |
| 121 | Vel'Koz | -0.19 | 0.27 | 0.46 |  |
| 122 | Akali | -0.19 | 0.00 | 0.19 |  |
| 123 | Kassadin | -0.19 | 0.00 | 0.19 |  |
| 124 | Leona | -0.19 | 0.00 | 0.19 |  |
| 125 | Rumble | -0.19 | 0.00 | 0.19 |  |
| 126 | Twisted Fate | -0.20 | 0.43 | 0.63 |  |
| 127 | Viego | -0.20 | 0.29 | 0.49 |  |
| 128 | Dr. Mundo | -0.21 | 0.00 | 0.21 |  |
| 129 | Renekton | -0.21 | 0.00 | 0.21 |  |
| 130 | Xerath | -0.22 | 0.27 | 0.49 |  |
| 131 | Yone | -0.23 | 0.20 | 0.43 |  |
| 132 | Amumu | -0.23 | 0.00 | 0.23 |  |
| 133 | Talon | -0.24 | 0.00 | 0.24 |  |
| 134 | Karthus | -0.25 | 0.19 | 0.44 |  |
| 135 | Locke | -0.25 | 0.00 | 0.25 |  |
| 136 | Rakan | -0.26 | 0.13 | 0.39 |  |
| 137 | Cho'Gath | -0.26 | 0.00 | 0.26 |  |
| 138 | Diana | -0.26 | 0.00 | 0.26 |  |
| 139 | Fizz | -0.26 | 0.00 | 0.26 |  |
| 140 | Lee Sin | -0.26 | 0.00 | 0.26 |  |
| 141 | Ryze | -0.27 | 0.24 | 0.51 |  |
| 142 | Mordekaiser | -0.28 | 0.07 | 0.35 |  |
| 143 | Qiyana | -0.28 | 0.00 | 0.28 |  |
| 144 | Tryndamere | -0.28 | 0.00 | 0.28 |  |
| 145 | Sylas | -0.29 | 0.00 | 0.29 |  |
| 146 | Fiddlesticks | -0.30 | 0.20 | 0.50 |  |
| 147 | Briar | -0.31 | 0.00 | 0.31 |  |
| 148 | Darius | -0.31 | 0.00 | 0.31 |  |
| 149 | Pyke | -0.31 | 0.00 | 0.31 |  |
| 150 | Jarvan IV | -0.32 | 0.20 | 0.52 |  |
| 151 | Bel'Veth | -0.32 | 0.00 | 0.32 |  |
| 152 | Nautilus | -0.33 | 0.00 | 0.33 |  |
| 153 | Trundle | -0.34 | 0.00 | 0.34 |  |
| 154 | Vi | -0.39 | 0.20 | 0.59 |  |
| 155 | Nunu & Willump | -0.39 | 0.15 | 0.54 |  |
| 156 | Katarina | -0.39 | 0.00 | 0.39 |  |
| 157 | Yorick | -0.39 | 0.00 | 0.39 |  |
| 158 | Janna | -0.40 | 0.36 | 0.76 |  |
| 159 | Shen | -0.41 | 0.29 | 0.70 |  |
| 160 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 161 | Blitzcrank | -0.42 | 0.00 | 0.42 |  |
| 162 | Gragas | -0.43 | 0.00 | 0.43 |  |
| 163 | Riven | -0.45 | 0.00 | 0.45 |  |
| 164 | Sejuani | -0.45 | 0.00 | 0.45 |  |
| 165 | Rell | -0.47 | 0.00 | 0.47 |  |
| 166 | Poppy | -0.48 | 0.00 | 0.48 |  |
| 167 | Wukong | -0.49 | 0.00 | 0.49 |  |
| 168 | Galio | -0.50 | 0.00 | 0.50 |  |
| 169 | Zac | -0.50 | 0.00 | 0.50 |  |
| 170 | Tahm Kench | -0.52 | 0.00 | 0.52 |  |
| 171 | Taliyah | -0.53 | 0.27 | 0.80 |  |
| 172 | Naafiri | -0.59 | 0.00 | 0.59 |  |
