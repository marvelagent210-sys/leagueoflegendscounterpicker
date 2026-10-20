# Counters to Ornn (patch 26.20)

## Simulated duels

The duel simulator played each of the 94 other champions with a simulator kit against Ornn: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Ornn wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Ornn --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.10 | – | +1.00 |
| 2 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 3 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 4 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 5 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 6 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 7 | Xayah | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 8 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 9 | Ezreal | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 10 | Ashe | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 11 | Smolder | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 12 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 13 | Quinn | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 14 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 15 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 16 | Master Yi | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 17 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 18 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 19 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 20 | Ambessa | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 21 | Poppy | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 22 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 23 | Pantheon | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 24 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 25 | Gangplank | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 26 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 27 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 28 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 29 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 30 | Zaahen | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 31 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 32 | Skarner | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 33 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 34 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 35 | Mordekaiser | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 36 | Cho'Gath | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 37 | Irelia | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 38 | Yasuo | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 39 | Aatrox | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 40 | Gwen | +0.75 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.00 |
| 41 | Darius | +0.74 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.00 |
| 42 | Garen | +0.74 | +1.00 | +1.00 | +1.00 | −0.22 | – | +0.00 |
| 43 | Xin Zhao | +0.74 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.00 |
| 44 | Tryndamere | +0.73 | +1.00 | +1.00 | +1.00 | −0.26 | – | +0.00 |
| 45 | Wukong | +0.73 | +1.00 | +1.00 | +1.00 | −0.26 | – | +0.00 |
| 46 | Kog'Maw | +0.72 | +1.00 | +1.00 | +0.50 | +0.15 | +1.00 | +0.00 |
| 47 | Kalista | +0.71 | +1.00 | +1.00 | +1.00 | −0.14 | +0.34 | +0.00 |
| 48 | Kai'Sa | +0.58 | +0.35 | +1.00 | +1.00 | −0.06 | +0.53 | +0.00 |
| 49 | Jinx | +0.31 | +0.14 | +0.57 | +0.31 | +0.05 | +0.62 | +0.00 |
| 50 | Sett | +0.28 | +0.13 | +0.11 | +1.00 | −0.06 | – | +0.00 |
| 51 | Sivir | +0.25 | +0.31 | +0.32 | +0.25 | +0.06 | +0.33 | +0.00 |
| 52 | Heimerdinger | +0.23 | +0.17 | +0.07 | +0.62 | +0.16 | +0.29 | +0.00 |
| 53 | Rammus | +0.21 | +0.06 | +0.02 | +1.00 | −0.20 | – | +0.00 |
| 54 | Lucian | +0.19 | −0.05 | −0.09 | +1.00 | +0.03 | +0.25 | +0.00 |
| 55 | Samira | +0.19 | −0.53 | +0.12 | +1.00 | −0.06 | +1.00 | +0.00 |
| 56 | Kennen | +0.17 | −0.28 | +0.06 | +1.00 | −0.14 | +0.45 | +0.00 |
| 57 | Rumble | +0.14 | −0.88 | +0.65 | +1.00 | −0.10 | – | +0.00 |
| 58 | Morgana | +0.14 | +0.15 | +0.21 | +0.16 | +0.07 | +0.09 | +0.00 |
| 59 | Annie | +0.14 | +0.20 | +0.14 | +0.13 | +0.06 | +0.22 | +0.00 |
| 60 | Twitch | +0.10 | +0.07 | +0.57 | −0.79 | +0.02 | +1.00 | +0.00 |
| 61 | Renekton | +0.10 | +0.15 | +0.19 | +0.12 | −0.13 | – | +0.00 |
| 62 | Lux | +0.09 | +0.11 | +0.13 | +0.03 | +0.09 | +0.08 | +0.00 |
| 63 | Malphite | +0.08 | +0.12 | +0.09 | +0.10 | −0.02 | – | +0.00 |
| 64 | Tahm Kench | +0.04 | +0.03 | +0.06 | +0.05 | +0.04 | – | +0.00 |
| 65 | Gragas | +0.03 | +0.05 | +0.06 | −0.00 | −0.02 | – | +0.00 |
| 66 | Draven | +0.01 | +0.16 | −0.01 | +0.04 | +0.02 | −0.36 | +0.00 |
| 67 | Sion | +0.01 | +0.02 | −0.02 | +0.10 | −0.09 | – | +0.00 |
| 68 | Zyra | −0.01 | +0.00 | −0.05 | −0.00 | +0.04 | +0.03 | +0.00 |
| 69 | Brand | −0.01 | +0.02 | −0.01 | −0.07 | +0.05 | −0.02 | +0.00 |
| 70 | Singed | −0.02 | −0.02 | −0.02 | +0.09 | −0.19 | – | +0.00 |
| 71 | Veigar | −0.03 | −0.01 | −0.03 | −0.03 | +0.04 | −0.16 | +0.00 |
| 72 | Nautilus | −0.05 | −0.02 | −0.07 | −0.07 | −0.05 | – | +0.00 |
| 73 | Urgot | −0.07 | +0.03 | +0.05 | +0.07 | +0.02 | −1.00 | +0.00 |
| 74 | Anivia | −0.07 | −0.02 | −0.01 | −0.11 | −0.20 | −0.06 | +0.00 |
| 75 | Ahri | −0.08 | −0.11 | −0.13 | −0.04 | +0.06 | −0.15 | +0.00 |
| 76 | Amumu | −0.08 | −0.44 | +1.00 | −0.96 | −0.11 | – | +0.00 |
| 77 | Tristana | −0.09 | −0.94 | −0.56 | +1.00 | −0.10 | +1.00 | +0.00 |
| 78 | Leona | −0.09 | −0.08 | −0.11 | −0.11 | −0.08 | – | +0.00 |
| 79 | Shen | −0.12 | −0.17 | −0.18 | −0.06 | −0.02 | – | +0.00 |
| 80 | Vel'Koz | −0.12 | +0.00 | −0.13 | −0.09 | +0.15 | −0.93 | +0.00 |
| 81 | Vladimir | −0.13 | −0.16 | −0.14 | −0.14 | −0.07 | −0.13 | +0.00 |
| 82 | Varus | −0.14 | +0.81 | −0.99 | −1.00 | +0.04 | +1.00 | +0.00 |
| 83 | Karthus | −0.22 | −0.29 | −0.27 | −0.27 | +0.04 | −0.27 | +0.00 |
| 84 | Lissandra | −0.28 | −0.47 | −0.08 | −0.51 | +0.06 | −0.48 | +0.00 |
| 85 | Ziggs | −0.31 | −0.30 | −0.83 | −0.12 | +0.09 | −0.12 | +0.00 |
| 86 | Cassiopeia | −0.34 | −0.91 | −0.05 | −0.11 | +0.11 | −0.92 | +0.00 |
| 87 | Jhin | −0.34 | −0.42 | −0.02 | −1.00 | +0.20 | −0.63 | +0.00 |
| 88 | Malzahar | −0.54 | −0.05 | −0.96 | −1.00 | +0.03 | −0.94 | +0.00 |
| 89 | Akali | −0.58 | −1.00 | −0.17 | −1.00 | −0.19 | – | +0.00 |
| 90 | Riven | −0.59 | −1.00 | −1.00 | +0.00 | −0.18 | – | +0.00 |
| 91 | Miss Fortune | −0.61 | −0.31 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 92 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 93 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 94 | Caitlyn | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Ornn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ornn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ornn` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Udyr (net +1.58)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Ornn's Call of the Forge God (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Call of the Forge God. (Udyr E Blazing Stampede → Ornn R Call of the Forge God)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Ornn's Searing Charge (airborne, stun). Immune for 1.5 s, long enough to use ahead of Searing Charge. (Udyr E Blazing Stampede → Ornn E Searing Charge)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Ornn's Volcanic Rupture (airborne, slow). Immune for 1.5 s, long enough to use ahead of Volcanic Rupture. (Udyr E Blazing Stampede → Ornn Q Volcanic Rupture)

#### 2. Morgana (net +1.57)

- **1.00** cc immunity: Black Shield makes Morgana immune to Ornn's Call of the Forge God (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Call of the Forge God. (Morgana E Black Shield → Ornn R Call of the Forge God)
- **0.68** cc immunity: Black Shield makes Morgana immune to Ornn's Searing Charge (airborne, stun). Immune for 5 s, long enough to use ahead of Searing Charge. (Morgana E Black Shield → Ornn E Searing Charge)
- **0.46** cc immunity: Black Shield makes Morgana immune to Ornn's Volcanic Rupture (airborne, slow). Immune for 5 s, long enough to use ahead of Volcanic Rupture. (Morgana E Black Shield → Ornn Q Volcanic Rupture)

#### 3. Fiora (net +1.54)

- **1.00** parry: Riposte parries Ornn's Call of the Forge God and stuns back. Parry for 0.75 s; Call of the Forge God takes 0.69 s to land, enough to react. Negating Call of the Forge God's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ornn R Call of the Forge God)
- **0.78** parry: Riposte parries Ornn's Searing Charge and stuns back. Parry for 0.75 s; Searing Charge takes 0.85 s to land, enough to react. Negating Searing Charge's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ornn E Searing Charge)
- **0.56** parry: Riposte parries Ornn's Volcanic Rupture and stuns back. Parry for 0.75 s; Volcanic Rupture takes 0.67 s to land, enough to react. Negating Volcanic Rupture's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ornn Q Volcanic Rupture)

#### 4. Lissandra (net +1.49)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ornn's Call of the Forge God. Untargetable for 2.5 s, long enough to use ahead of Call of the Forge God. (Lissandra R Frozen Tomb → Ornn R Call of the Forge God)
- **0.50** dash stop: Frozen Tomb's knockdown can stop Ornn's Call of the Forge God mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Ornn R Call of the Forge God)
- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ornn's Searing Charge. Untargetable for 2.5 s, long enough to use ahead of Searing Charge. (Lissandra R Frozen Tomb → Ornn E Searing Charge)
- Watch out: Bellows Breath is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 5. Xayah (net +1.49)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Ornn's Call of the Forge God. Untargetable for 1.5 s, long enough to use ahead of Call of the Forge God. (Xayah R Featherstorm → Ornn R Call of the Forge God)
- **0.38** untargetable: Featherstorm makes Xayah untargetable, dodging Ornn's Searing Charge. Untargetable for 1.5 s, long enough to use ahead of Searing Charge. (Xayah R Featherstorm → Ornn E Searing Charge)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 1.5 s, long enough to use ahead of Volcanic Rupture. (Xayah R Featherstorm → Ornn Q Volcanic Rupture)

#### 6. Fizz (net +1.48)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Ornn's Call of the Forge God. Untargetable for 0.75 s; Call of the Forge God takes 0.69 s to land, enough to react. (Fizz E Playful → Ornn R Call of the Forge God)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Ornn's Searing Charge. Untargetable for 0.75 s; Searing Charge takes 0.85 s to land, enough to react. (Fizz E Playful → Ornn E Searing Charge)
- **0.65** untargetable: Playful makes Fizz untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 0.75 s; Volcanic Rupture takes 0.67 s to land, enough to react. (Fizz E Playful → Ornn Q Volcanic Rupture)
- Watch out: Bellows Breath is displacement immune, ignoring Fizz's Chum the Waters (airborne) during it.

#### 7. Maokai (net +1.47)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Ornn's Call of the Forge God. Untargetable for 1.4 s; Call of the Forge God takes 0.69 s to land, enough to react. (Maokai W Twisted Advance → Ornn R Call of the Forge God)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Ornn's Searing Charge. Untargetable for 1.4 s; Searing Charge takes 0.85 s to land, enough to react. (Maokai W Twisted Advance → Ornn E Searing Charge)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 1.4 s; Volcanic Rupture takes 0.67 s to land, enough to react. (Maokai W Twisted Advance → Ornn Q Volcanic Rupture)
- Watch out: Bellows Breath is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

#### 8. Aurora (net +1.47)

- **1.00** untargetable: Between Worlds makes Aurora untargetable, dodging Ornn's Call of the Forge God. Untargetable for 0.4 s; Call of the Forge God takes 0.69 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ornn R Call of the Forge God)
- **0.38** untargetable: Between Worlds makes Aurora untargetable, dodging Ornn's Searing Charge. Untargetable for 0.4 s; Searing Charge takes 0.85 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ornn E Searing Charge)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 0.4 s; Volcanic Rupture takes 0.67 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ornn Q Volcanic Rupture)

#### 9. Gwen (net +1.43)

- **1.00** untargetable: Hallowed Mist makes Gwen untargetable, dodging Ornn's Call of the Forge God. Untargetable for ?; Call of the Forge God takes 0.69 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Ornn R Call of the Forge God)
- **0.64** untargetable: Hallowed Mist makes Gwen untargetable, dodging Ornn's Searing Charge. Untargetable for ?; Searing Charge takes 0.85 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Ornn E Searing Charge)
- **0.44** untargetable: Hallowed Mist makes Gwen untargetable, dodging Ornn's Volcanic Rupture. Untargetable for ?; Volcanic Rupture takes 0.67 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Ornn Q Volcanic Rupture)

#### 10. Vladimir (net +1.42)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ornn's Call of the Forge God. Untargetable for 2 s, long enough to use ahead of Call of the Forge God. (Vladimir W Sanguine Pool → Ornn R Call of the Forge God)
- **0.68** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ornn's Searing Charge. Untargetable for 2 s, long enough to use ahead of Searing Charge. (Vladimir W Sanguine Pool → Ornn E Searing Charge)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ornn's Volcanic Rupture. Untargetable for 2 s, long enough to use ahead of Volcanic Rupture. (Vladimir W Sanguine Pool → Ornn Q Volcanic Rupture)
- Watch out: Volcanic Rupture's airborne interrupts Vladimir's Tides of Blood (charge-up).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Udyr | +1.58 | 1.58 | 0.00 |  |
| 2 | Morgana | +1.57 | 1.57 | 0.00 |  |
| 3 | Fiora | +1.54 | 1.54 | 0.00 |  |
| 4 | Lissandra | +1.49 | 1.54 | 0.05 | dash stop (Frozen Tomb) |
| 5 | Xayah | +1.49 | 1.49 | 0.00 |  |
| 6 | Fizz | +1.48 | 1.56 | 0.08 |  |
| 7 | Maokai | +1.47 | 1.54 | 0.07 |  |
| 8 | Aurora | +1.47 | 1.47 | 0.00 |  |
| 9 | Gwen | +1.43 | 1.43 | 0.00 |  |
| 10 | Vladimir | +1.42 | 1.56 | 0.14 |  |
| 11 | Bard | +1.41 | 1.49 | 0.08 |  |
| 12 | Master Yi | +1.38 | 1.71 | 0.33 |  |
| 13 | Mel | +1.37 | 1.37 | 0.00 | projectile block (Rebuttal) |
| 14 | Samira | +1.30 | 1.39 | 0.09 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 15 | Evelynn | +1.28 | 1.28 | 0.00 |  |
| 16 | Olaf | +1.28 | 1.28 | 0.00 |  |
| 17 | Shaco | +1.28 | 1.28 | 0.00 |  |
| 18 | Nocturne | +1.27 | 1.27 | 0.00 |  |
| 19 | Zed | +1.27 | 1.27 | 0.00 |  |
| 20 | Braum | +1.25 | 1.33 | 0.08 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 21 | Rengar | +1.24 | 1.24 | 0.00 |  |
| 22 | Sivir | +1.22 | 1.22 | 0.00 |  |
| 23 | Gangplank | +1.19 | 1.19 | 0.00 |  |
| 24 | Camille | +1.14 | 1.29 | 0.15 |  |
| 25 | Rek'Sai | +1.13 | 1.29 | 0.16 |  |
| 26 | Zaahen | +1.10 | 1.28 | 0.18 |  |
| 27 | Milio | +1.09 | 1.16 | 0.07 |  |
| 28 | Kled | +1.02 | 1.26 | 0.24 |  |
| 29 | Vex | +0.97 | 1.00 | 0.03 | dash stop (Doom 'n Gloom) |
| 30 | Yuumi | +0.96 | 1.76 | 0.80 |  |
| 31 | Yasuo | +0.95 | 1.23 | 0.28 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 32 | Sion | +0.93 | 1.29 | 0.36 |  |
| 33 | Kalista | +0.93 | 1.12 | 0.19 |  |
| 34 | Alistar | +0.90 | 1.02 | 0.12 |  |
| 35 | Kayle | +0.88 | 0.88 | 0.00 |  |
| 36 | Viktor | +0.84 | 0.88 | 0.04 | dash stop (Gravity Field) |
| 37 | Jinx | +0.83 | 0.87 | 0.04 | dash stop (Flame Chompers!), dash stop (Flame Chompers!) |
| 38 | Ahri | +0.80 | 0.84 | 0.04 | dash stop (Charm), dash stop (Charm) |
| 39 | Veigar | +0.80 | 0.84 | 0.04 | dash stop (Event Horizon) |
| 40 | Hwei | +0.77 | 0.84 | 0.07 | dash stop (Grim Visage), dash stop (Grim Visage) |
| 41 | Malzahar | +0.71 | 1.51 | 0.80 | dash stop (Nether Grasp) |
| 42 | Cassiopeia | +0.64 | 0.64 | 0.00 |  |
| 43 | Garen | +0.64 | 0.64 | 0.00 |  |
| 44 | Amumu | +0.55 | 0.60 | 0.05 | dash stop (Curse of the Sad Mummy) |
| 45 | Teemo | +0.54 | 0.54 | 0.00 |  |
| 46 | Yone | +0.51 | 0.76 | 0.25 | dash stop (Fate Sealed) |
| 47 | Xin Zhao | +0.45 | 0.63 | 0.18 |  |
| 48 | Singed | +0.45 | 0.52 | 0.07 |  |
| 49 | Lulu | +0.39 | 0.47 | 0.08 |  |
| 50 | Aphelios | +0.38 | 0.38 | 0.00 |  |
| 51 | Kayn | +0.36 | 1.28 | 0.92 |  |
| 52 | Warwick | +0.32 | 1.56 | 1.24 | dash stop (Infinite Duress) |
| 53 | Jax | +0.28 | 0.28 | 0.00 |  |
| 54 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 55 | Kindred | +0.27 | 0.27 | 0.00 |  |
| 56 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 57 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 58 | Heimerdinger | +0.26 | 0.26 | 0.00 |  |
| 59 | Sona | +0.26 | 0.26 | 0.00 |  |
| 60 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 61 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 62 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 63 | Senna | +0.22 | 0.22 | 0.00 |  |
| 64 | Vayne | +0.20 | 0.27 | 0.07 |  |
| 65 | Corki | +0.20 | 0.20 | 0.00 |  |
| 66 | Elise | +0.20 | 0.20 | 0.00 |  |
| 67 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 68 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 69 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 70 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 71 | Lux | +0.18 | 0.18 | 0.00 |  |
| 72 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 73 | Poppy | +0.17 | 0.77 | 0.60 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 74 | Nilah | +0.17 | 0.25 | 0.08 |  |
| 75 | Renata Glasc | +0.17 | 0.24 | 0.07 |  |
| 76 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 77 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 78 | Tristana | +0.16 | 0.24 | 0.08 |  |
| 79 | Illaoi | +0.16 | 0.16 | 0.00 |  |
| 80 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 81 | Shyvana | +0.16 | 0.16 | 0.00 |  |
| 82 | Skarner | +0.16 | 0.16 | 0.00 |  |
| 83 | Volibear | +0.16 | 0.16 | 0.00 |  |
| 84 | K'Sante | +0.15 | 0.32 | 0.17 |  |
| 85 | Draven | +0.15 | 0.22 | 0.07 |  |
| 86 | Annie | +0.15 | 0.15 | 0.00 |  |
| 87 | Malphite | +0.14 | 0.34 | 0.20 |  |
| 88 | Brand | +0.14 | 0.14 | 0.00 |  |
| 89 | Graves | +0.14 | 0.14 | 0.00 |  |
| 90 | Zoe | +0.13 | 0.20 | 0.07 |  |
| 91 | Karma | +0.13 | 0.13 | 0.00 |  |
| 92 | LeBlanc | +0.13 | 0.13 | 0.00 |  |
| 93 | Gnar | +0.11 | 0.19 | 0.08 |  |
| 94 | Jayce | +0.11 | 0.18 | 0.07 |  |
| 95 | Sett | +0.09 | 0.16 | 0.07 |  |
| 96 | Hecarim | +0.08 | 0.16 | 0.08 |  |
| 97 | Orianna | +0.08 | 0.16 | 0.08 |  |
| 98 | Syndra | +0.07 | 0.14 | 0.07 |  |
| 99 | Neeko | +0.06 | 0.14 | 0.08 |  |
| 100 | Swain | +0.05 | 0.12 | 0.07 |  |
| 101 | Varus | +0.02 | 0.18 | 0.16 |  |
| 102 | Anivia | +0.02 | 0.16 | 0.14 |  |
| 103 | Ziggs | 0.00 | 0.17 | 0.17 |  |
| 104 | Azir | 0.00 | 0.16 | 0.16 |  |
| 105 | Zyra | 0.00 | 0.16 | 0.16 |  |
| 106 | Akali | 0.00 | 0.00 | 0.00 |  |
| 107 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 108 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 109 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 110 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 111 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 112 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 113 | Leona | 0.00 | 0.00 | 0.00 |  |
| 114 | Locke | 0.00 | 0.00 | 0.00 |  |
| 115 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 116 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 117 | Talon | 0.00 | 0.00 | 0.00 |  |
| 118 | Taric | 0.00 | 0.00 | 0.00 |  |
| 119 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 120 | Urgot | -0.01 | 0.08 | 0.09 |  |
| 121 | Thresh | -0.02 | 0.11 | 0.13 |  |
| 122 | Lillia | -0.03 | 0.05 | 0.08 |  |
| 123 | Nami | -0.04 | 0.14 | 0.18 |  |
| 124 | Briar | -0.05 | 0.00 | 0.05 |  |
| 125 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 126 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 127 | Darius | -0.07 | 0.00 | 0.07 |  |
| 128 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 129 | Mordekaiser | -0.08 | 0.06 | 0.14 |  |
| 130 | Diana | -0.08 | 0.00 | 0.08 |  |
| 131 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 132 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 133 | Aurelion Sol | -0.10 | 0.14 | 0.24 |  |
| 134 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 135 | Ivern | -0.11 | 0.11 | 0.22 |  |
| 136 | Jarvan IV | -0.12 | 0.16 | 0.28 |  |
| 137 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 138 | Rakan | -0.14 | 0.06 | 0.20 |  |
| 139 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 140 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 141 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 142 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 143 | Zac | -0.19 | 0.70 | 0.89 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 144 | Riven | -0.20 | 0.00 | 0.20 |  |
| 145 | Quinn | -0.22 | 0.22 | 0.44 |  |
| 146 | Rell | -0.24 | 0.00 | 0.24 |  |
| 147 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 148 | Pantheon | -0.26 | 0.72 | 0.98 |  |
| 149 | Caitlyn | -0.30 | 0.24 | 0.54 |  |
| 150 | Viego | -0.30 | 0.16 | 0.46 |  |
| 151 | Akshan | -0.32 | 0.19 | 0.51 |  |
| 152 | Rammus | -0.33 | 0.27 | 0.60 |  |
| 153 | Lucian | -0.33 | 0.21 | 0.54 |  |
| 154 | Pyke | -0.33 | 0.00 | 0.33 |  |
| 155 | Miss Fortune | -0.36 | 0.20 | 0.56 |  |
| 156 | Jhin | -0.37 | 0.17 | 0.54 |  |
| 157 | Vel'Koz | -0.43 | 0.16 | 0.59 |  |
| 158 | Twisted Fate | -0.45 | 0.25 | 0.70 |  |
| 159 | Karthus | -0.45 | 0.11 | 0.56 |  |
| 160 | Katarina | -0.46 | 0.00 | 0.46 |  |
| 161 | Xerath | -0.47 | 0.16 | 0.63 |  |
| 162 | Gragas | -0.50 | 0.00 | 0.50 |  |
| 163 | Nunu & Willump | -0.55 | 0.36 | 0.91 |  |
| 164 | Ryze | -0.55 | 0.15 | 0.70 |  |
| 165 | Shen | -0.63 | 0.27 | 0.90 |  |
| 166 | Fiddlesticks | -0.72 | 0.11 | 0.83 |  |
| 167 | Vi | -0.77 | 0.16 | 0.93 |  |
| 168 | Janna | -0.81 | 0.22 | 1.03 |  |
| 169 | Naafiri | -0.85 | 0.00 | 0.85 |  |
| 170 | Tahm Kench | -0.91 | 0.00 | 0.91 |  |
| 171 | Taliyah | -1.08 | 0.16 | 1.24 |  |
| 172 | Galio | -1.43 | 0.00 | 1.43 |  |
