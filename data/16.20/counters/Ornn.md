# Counters to Ornn (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 24 other champions with a simulator kit against Ornn: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Ornn wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Ornn --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.08 |
| 2 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 3 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 4 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 5 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 6 | Irelia | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 7 | Camille | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 8 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 9 | Gwen | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 10 | Garen | +0.74 | +1.00 | +1.00 | +1.00 | −0.22 | – | +0.00 |
| 11 | Tryndamere | +0.73 | +1.00 | +1.00 | +1.00 | −0.27 | – | +0.00 |
| 12 | Volibear | +0.61 | +1.00 | +0.46 | +1.00 | −0.08 | – | +0.00 |
| 13 | Dr. Mundo | +0.28 | +0.39 | +0.40 | +0.38 | −0.12 | – | +0.00 |
| 14 | Poppy | +0.25 | +0.30 | +0.31 | +0.31 | +0.10 | – | +0.00 |
| 15 | Mordekaiser | +0.25 | +0.34 | +0.33 | +0.36 | −0.10 | – | +0.00 |
| 16 | Yasuo | +0.21 | +0.02 | +0.02 | +1.00 | −0.14 | – | +0.00 |
| 17 | Nasus | +0.18 | +0.23 | +0.24 | +0.25 | −0.13 | +0.26 | +0.00 |
| 18 | Teemo | +0.13 | +0.15 | +0.12 | +0.10 | +0.15 | +0.24 | +0.00 |
| 19 | Malphite | +0.12 | +0.16 | +0.16 | +0.13 | +0.01 | – | +0.00 |
| 20 | Renekton | +0.06 | +0.09 | +0.09 | +0.11 | −0.11 | – | +0.00 |
| 21 | Sett | +0.01 | +0.02 | +0.00 | +0.04 | −0.03 | – | +0.00 |
| 22 | Urgot | −0.00 | +0.01 | +0.01 | +0.01 | −0.03 | −0.03 | +0.00 |
| 23 | Shen | −0.07 | −0.10 | −0.12 | −0.04 | −0.00 | – | +0.00 |
| 24 | Riven | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Ornn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ornn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ornn` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fiora (net +1.64)

- **1.10** parry: Riposte parries Ornn's Call of the Forge God and stuns back. Parry for 0.75 s; Call of the Forge God takes 0.69 s to land, enough to react. Negating Call of the Forge God's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ornn R Call of the Forge God)
- **0.78** parry: Riposte parries Ornn's Searing Charge and stuns back. Parry for 0.75 s; Searing Charge takes 0.85 s to land, enough to react. Negating Searing Charge's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ornn E Searing Charge)
- **0.56** parry: Riposte parries Ornn's Volcanic Rupture and stuns back. Parry for 0.75 s; Volcanic Rupture takes 0.67 s to land, enough to react. Negating Volcanic Rupture's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ornn Q Volcanic Rupture)

#### 2. Elise (net +1.63)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Ornn's Call of the Forge God. Untargetable for 0.6 s; Call of the Forge God takes 0.69 s to land, enough to react. (Elise E Rappel → Ornn R Call of the Forge God)
- **0.64** untargetable: Rappel makes Elise untargetable, dodging Ornn's Searing Charge. Untargetable for 0.6 s; Searing Charge takes 0.85 s to land, enough to react. (Elise E Rappel → Ornn E Searing Charge)
- **0.44** untargetable: Rappel makes Elise untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 0.6 s; Volcanic Rupture takes 0.67 s to land, enough to react. (Elise E Rappel → Ornn Q Volcanic Rupture)

#### 3. Udyr (net +1.58)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Ornn's Call of the Forge God (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Call of the Forge God. (Udyr E Blazing Stampede → Ornn R Call of the Forge God)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Ornn's Searing Charge (airborne, stun). Immune for 1.5 s, long enough to use ahead of Searing Charge. (Udyr E Blazing Stampede → Ornn E Searing Charge)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Ornn's Volcanic Rupture (airborne, slow). Immune for 1.5 s, long enough to use ahead of Volcanic Rupture. (Udyr E Blazing Stampede → Ornn Q Volcanic Rupture)

#### 4. Morgana (net +1.57)

- **1.00** cc immunity: Black Shield makes Morgana immune to Ornn's Call of the Forge God (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Call of the Forge God. (Morgana E Black Shield → Ornn R Call of the Forge God)
- **0.68** cc immunity: Black Shield makes Morgana immune to Ornn's Searing Charge (airborne, stun). Immune for 5 s, long enough to use ahead of Searing Charge. (Morgana E Black Shield → Ornn E Searing Charge)
- **0.46** cc immunity: Black Shield makes Morgana immune to Ornn's Volcanic Rupture (airborne, slow). Immune for 5 s, long enough to use ahead of Volcanic Rupture. (Morgana E Black Shield → Ornn Q Volcanic Rupture)

#### 5. Lissandra (net +1.49)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ornn's Call of the Forge God. Untargetable for 2.5 s, long enough to use ahead of Call of the Forge God. (Lissandra R Frozen Tomb → Ornn R Call of the Forge God)
- **0.50** dash stop: Frozen Tomb's knockdown can stop Ornn's Call of the Forge God mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Ornn R Call of the Forge God)
- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ornn's Searing Charge. Untargetable for 2.5 s, long enough to use ahead of Searing Charge. (Lissandra R Frozen Tomb → Ornn E Searing Charge)
- Watch out: Bellows Breath is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 6. Xayah (net +1.49)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Ornn's Call of the Forge God. Untargetable for 1.5 s, long enough to use ahead of Call of the Forge God. (Xayah R Featherstorm → Ornn R Call of the Forge God)
- **0.38** untargetable: Featherstorm makes Xayah untargetable, dodging Ornn's Searing Charge. Untargetable for 1.5 s, long enough to use ahead of Searing Charge. (Xayah R Featherstorm → Ornn E Searing Charge)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 1.5 s, long enough to use ahead of Volcanic Rupture. (Xayah R Featherstorm → Ornn Q Volcanic Rupture)

#### 7. Master Yi (net +1.48)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Ornn's Call of the Forge God. Untargetable for ?; Call of the Forge God takes 0.69 s to land, enough to react. (Master Yi Q Alpha Strike → Ornn R Call of the Forge God)
- **0.64** untargetable: Alpha Strike makes Master Yi untargetable, dodging Ornn's Searing Charge. Untargetable for ?; Searing Charge takes 0.85 s to land, enough to react. (Master Yi Q Alpha Strike → Ornn E Searing Charge)
- **0.44** untargetable: Alpha Strike makes Master Yi untargetable, dodging Ornn's Volcanic Rupture. Untargetable for ?; Volcanic Rupture takes 0.67 s to land, enough to react. (Master Yi Q Alpha Strike → Ornn Q Volcanic Rupture)
- Watch out: Volcanic Rupture's airborne interrupts Master Yi's Meditate (normal channel).

#### 8. Vladimir (net +1.47)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ornn's Call of the Forge God. Untargetable for 2 s, long enough to use ahead of Call of the Forge God. (Vladimir W Sanguine Pool → Ornn R Call of the Forge God)
- **0.68** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ornn's Searing Charge. Untargetable for 2 s, long enough to use ahead of Searing Charge. (Vladimir W Sanguine Pool → Ornn E Searing Charge)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 2 s, long enough to use ahead of Volcanic Rupture. (Vladimir W Sanguine Pool → Ornn Q Volcanic Rupture)
- Watch out: Volcanic Rupture's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 9. Maokai (net +1.47)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Ornn's Call of the Forge God. Untargetable for 1.4 s; Call of the Forge God takes 0.69 s to land, enough to react. (Maokai W Twisted Advance → Ornn R Call of the Forge God)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Ornn's Searing Charge. Untargetable for 1.4 s; Searing Charge takes 0.85 s to land, enough to react. (Maokai W Twisted Advance → Ornn E Searing Charge)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 1.4 s; Volcanic Rupture takes 0.67 s to land, enough to react. (Maokai W Twisted Advance → Ornn Q Volcanic Rupture)
- Watch out: Bellows Breath is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

#### 10. Aurora (net +1.47)

- **1.00** untargetable: Between Worlds makes Aurora untargetable, dodging Ornn's Call of the Forge God. Untargetable for 0.4 s; Call of the Forge God takes 0.69 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ornn R Call of the Forge God)
- **0.38** untargetable: Between Worlds makes Aurora untargetable, dodging Ornn's Searing Charge. Untargetable for 0.4 s; Searing Charge takes 0.85 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ornn E Searing Charge)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 0.4 s; Volcanic Rupture takes 0.67 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ornn Q Volcanic Rupture)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fiora | +1.64 | 1.64 | 0.00 |  |
| 2 | Elise | +1.63 | 1.63 | 0.00 |  |
| 3 | Udyr | +1.58 | 1.58 | 0.00 |  |
| 4 | Morgana | +1.57 | 1.57 | 0.00 |  |
| 5 | Lissandra | +1.49 | 1.54 | 0.05 | dash stop (Frozen Tomb) |
| 6 | Xayah | +1.49 | 1.49 | 0.00 |  |
| 7 | Master Yi | +1.48 | 1.71 | 0.23 |  |
| 8 | Vladimir | +1.47 | 1.56 | 0.09 |  |
| 9 | Maokai | +1.47 | 1.54 | 0.07 |  |
| 10 | Aurora | +1.47 | 1.47 | 0.00 |  |
| 11 | Gwen | +1.43 | 1.43 | 0.00 |  |
| 12 | Bard | +1.41 | 1.49 | 0.08 |  |
| 13 | Mel | +1.37 | 1.37 | 0.00 | projectile block (Rebuttal) |
| 14 | Yuumi | +1.33 | 1.76 | 0.43 |  |
| 15 | Ekko | +1.31 | 1.31 | 0.00 |  |
| 16 | Samira | +1.30 | 1.39 | 0.09 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 17 | Evelynn | +1.28 | 1.28 | 0.00 |  |
| 18 | Olaf | +1.28 | 1.28 | 0.00 |  |
| 19 | Shaco | +1.28 | 1.28 | 0.00 |  |
| 20 | Nocturne | +1.27 | 1.27 | 0.00 |  |
| 21 | Zed | +1.27 | 1.27 | 0.00 |  |
| 22 | Braum | +1.25 | 1.33 | 0.08 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 23 | Rengar | +1.24 | 1.24 | 0.00 |  |
| 24 | Sivir | +1.22 | 1.22 | 0.00 |  |
| 25 | Gangplank | +1.19 | 1.19 | 0.00 |  |
| 26 | Camille | +1.14 | 1.29 | 0.15 |  |
| 27 | Warwick | +1.13 | 1.56 | 0.43 | dash stop (Infinite Duress) |
| 28 | Rek'Sai | +1.13 | 1.29 | 0.16 |  |
| 29 | Zaahen | +1.10 | 1.28 | 0.18 |  |
| 30 | Milio | +1.09 | 1.16 | 0.07 |  |
| 31 | Malzahar | +1.06 | 1.51 | 0.45 | dash stop (Nether Grasp) |
| 32 | Kled | +1.02 | 1.26 | 0.24 |  |
| 33 | Sion | +1.01 | 1.29 | 0.28 |  |
| 34 | Vex | +0.97 | 1.00 | 0.03 | dash stop (Doom 'n Gloom) |
| 35 | Yasuo | +0.95 | 1.23 | 0.28 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 36 | Kalista | +0.93 | 1.12 | 0.19 |  |
| 37 | Alistar | +0.90 | 1.02 | 0.12 |  |
| 38 | Kayle | +0.88 | 0.88 | 0.00 |  |
| 39 | Kindred | +0.85 | 0.85 | 0.00 |  |
| 40 | Viktor | +0.84 | 0.88 | 0.04 | dash stop (Gravity Field) |
| 41 | Jinx | +0.83 | 0.87 | 0.04 | dash stop (Flame Chompers!), dash stop (Flame Chompers!) |
| 42 | Ahri | +0.80 | 0.84 | 0.04 | dash stop (Charm), dash stop (Charm) |
| 43 | Veigar | +0.80 | 0.84 | 0.04 | dash stop (Event Horizon) |
| 44 | Hwei | +0.77 | 0.84 | 0.07 | dash stop (Grim Visage), dash stop (Grim Visage) |
| 45 | Kayn | +0.76 | 1.28 | 0.52 |  |
| 46 | Cassiopeia | +0.64 | 0.64 | 0.00 |  |
| 47 | Garen | +0.64 | 0.64 | 0.00 |  |
| 48 | Pantheon | +0.61 | 0.72 | 0.11 |  |
| 49 | Taric | +0.58 | 0.58 | 0.00 |  |
| 50 | Amumu | +0.55 | 0.60 | 0.05 | dash stop (Curse of the Sad Mummy) |
| 51 | Teemo | +0.54 | 0.54 | 0.00 |  |
| 52 | Yone | +0.51 | 0.76 | 0.25 | dash stop (Fate Sealed) |
| 53 | Xin Zhao | +0.45 | 0.63 | 0.18 |  |
| 54 | Singed | +0.45 | 0.52 | 0.07 |  |
| 55 | Lulu | +0.39 | 0.47 | 0.08 |  |
| 56 | Aphelios | +0.38 | 0.38 | 0.00 |  |
| 57 | Poppy | +0.37 | 0.77 | 0.40 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 58 | Corki | +0.28 | 0.35 | 0.07 |  |
| 59 | Jax | +0.28 | 0.28 | 0.00 |  |
| 60 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 61 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 62 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 63 | Heimerdinger | +0.26 | 0.26 | 0.00 |  |
| 64 | Sona | +0.26 | 0.26 | 0.00 |  |
| 65 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 66 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 67 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 68 | Senna | +0.22 | 0.22 | 0.00 |  |
| 69 | Vayne | +0.20 | 0.27 | 0.07 |  |
| 70 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 71 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 72 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 73 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 74 | Lux | +0.18 | 0.18 | 0.00 |  |
| 75 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 76 | Nilah | +0.17 | 0.25 | 0.08 |  |
| 77 | Renata Glasc | +0.17 | 0.24 | 0.07 |  |
| 78 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 79 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 80 | Tristana | +0.16 | 0.24 | 0.08 |  |
| 81 | Hecarim | +0.16 | 0.16 | 0.00 |  |
| 82 | Illaoi | +0.16 | 0.16 | 0.00 |  |
| 83 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 84 | Shyvana | +0.16 | 0.16 | 0.00 |  |
| 85 | Skarner | +0.16 | 0.16 | 0.00 |  |
| 86 | Volibear | +0.16 | 0.16 | 0.00 |  |
| 87 | K'Sante | +0.15 | 0.32 | 0.17 |  |
| 88 | Draven | +0.15 | 0.22 | 0.07 |  |
| 89 | Annie | +0.15 | 0.15 | 0.00 |  |
| 90 | Malphite | +0.14 | 0.34 | 0.20 |  |
| 91 | Brand | +0.14 | 0.14 | 0.00 |  |
| 92 | Graves | +0.14 | 0.14 | 0.00 |  |
| 93 | Zoe | +0.13 | 0.20 | 0.07 |  |
| 94 | Karma | +0.13 | 0.13 | 0.00 |  |
| 95 | LeBlanc | +0.13 | 0.13 | 0.00 |  |
| 96 | Gnar | +0.11 | 0.19 | 0.08 |  |
| 97 | Jayce | +0.11 | 0.18 | 0.07 |  |
| 98 | Sett | +0.09 | 0.16 | 0.07 |  |
| 99 | Orianna | +0.08 | 0.16 | 0.08 |  |
| 100 | Varus | +0.07 | 0.18 | 0.11 |  |
| 101 | Syndra | +0.07 | 0.14 | 0.07 |  |
| 102 | Neeko | +0.06 | 0.14 | 0.08 |  |
| 103 | Swain | +0.05 | 0.12 | 0.07 |  |
| 104 | Zac | +0.04 | 0.70 | 0.66 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 105 | Anivia | +0.02 | 0.16 | 0.14 |  |
| 106 | Ziggs | 0.00 | 0.17 | 0.17 |  |
| 107 | Azir | 0.00 | 0.16 | 0.16 |  |
| 108 | Zyra | 0.00 | 0.16 | 0.16 |  |
| 109 | Akali | 0.00 | 0.00 | 0.00 |  |
| 110 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 111 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 112 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 113 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 114 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 115 | Leona | 0.00 | 0.00 | 0.00 |  |
| 116 | Locke | 0.00 | 0.00 | 0.00 |  |
| 117 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 118 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 119 | Talon | 0.00 | 0.00 | 0.00 |  |
| 120 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 121 | Urgot | -0.01 | 0.08 | 0.09 |  |
| 122 | Thresh | -0.02 | 0.11 | 0.13 |  |
| 123 | Lillia | -0.03 | 0.05 | 0.08 |  |
| 124 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 125 | Aurelion Sol | -0.04 | 0.14 | 0.18 |  |
| 126 | Nami | -0.04 | 0.14 | 0.18 |  |
| 127 | Ivern | -0.04 | 0.11 | 0.15 |  |
| 128 | Briar | -0.05 | 0.00 | 0.05 |  |
| 129 | Lucian | -0.07 | 0.21 | 0.28 |  |
| 130 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 131 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 132 | Darius | -0.07 | 0.00 | 0.07 |  |
| 133 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 134 | Quinn | -0.08 | 0.22 | 0.30 |  |
| 135 | Miss Fortune | -0.08 | 0.20 | 0.28 |  |
| 136 | Mordekaiser | -0.08 | 0.06 | 0.14 |  |
| 137 | Diana | -0.08 | 0.00 | 0.08 |  |
| 138 | Fizz | -0.08 | 0.00 | 0.08 |  |
| 139 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 140 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 141 | Akshan | -0.09 | 0.19 | 0.28 |  |
| 142 | Twisted Fate | -0.10 | 0.25 | 0.35 |  |
| 143 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 144 | Jhin | -0.11 | 0.17 | 0.28 |  |
| 145 | Jarvan IV | -0.12 | 0.16 | 0.28 |  |
| 146 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 147 | Rakan | -0.14 | 0.06 | 0.20 |  |
| 148 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 149 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 150 | Xerath | -0.17 | 0.16 | 0.33 |  |
| 151 | Karthus | -0.17 | 0.11 | 0.28 |  |
| 152 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 153 | Rammus | -0.18 | 0.27 | 0.45 |  |
| 154 | Shen | -0.18 | 0.27 | 0.45 |  |
| 155 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 156 | Vel'Koz | -0.19 | 0.16 | 0.35 |  |
| 157 | Viego | -0.19 | 0.16 | 0.35 |  |
| 158 | Nunu & Willump | -0.20 | 0.36 | 0.56 |  |
| 159 | Ryze | -0.20 | 0.15 | 0.35 |  |
| 160 | Riven | -0.20 | 0.00 | 0.20 |  |
| 161 | Rell | -0.24 | 0.00 | 0.24 |  |
| 162 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 163 | Pyke | -0.25 | 0.00 | 0.25 |  |
| 164 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 165 | Fiddlesticks | -0.36 | 0.11 | 0.47 |  |
| 166 | Gragas | -0.40 | 0.00 | 0.40 |  |
| 167 | Janna | -0.41 | 0.22 | 0.63 |  |
| 168 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 169 | Galio | -0.48 | 0.00 | 0.48 |  |
| 170 | Vi | -0.55 | 0.16 | 0.71 |  |
| 171 | Taliyah | -0.60 | 0.16 | 0.76 |  |
| 172 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
