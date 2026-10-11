# Counters to Kled (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 42 other champions with a simulator kit against Kled: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kled wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kled --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +1.00 |
| 2 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 3 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 4 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 5 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 6 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 7 | Gwen | +0.75 | +0.94 | +0.94 | +1.00 | +0.04 | – | +0.00 |
| 8 | Nasus | +0.66 | +1.00 | +0.55 | +1.00 | +0.03 | – | +0.00 |
| 9 | Fiora | +0.58 | +1.00 | +0.00 | +1.00 | +0.17 | – | +1.00 |
| 10 | Zaahen | +0.52 | +1.00 | +0.03 | +1.00 | +0.04 | – | +0.00 |
| 11 | Quinn | +0.38 | +0.57 | +0.42 | +0.74 | +0.07 | −0.26 | +0.00 |
| 12 | Dr. Mundo | +0.38 | +0.61 | +0.70 | +0.23 | −0.21 | – | +0.00 |
| 13 | Kennen | +0.27 | +0.93 | −1.00 | +0.99 | +0.15 | +0.71 | +0.00 |
| 14 | Mordekaiser | +0.25 | +0.87 | +0.03 | −0.03 | +0.02 | – | +0.00 |
| 15 | Trundle | +0.20 | +1.00 | −1.00 | +1.00 | −0.14 | – | +0.00 |
| 16 | Tahm Kench | −0.02 | +0.01 | +0.01 | −0.02 | −0.13 | – | +0.00 |
| 17 | Ornn | −0.19 | −0.28 | −0.28 | −0.23 | +0.08 | – | +0.00 |
| 18 | Malphite | −0.30 | −1.00 | −1.00 | +1.00 | +0.19 | – | +0.00 |
| 19 | Yone | −0.32 | −1.00 | −1.00 | +1.00 | +0.08 | – | +0.00 |
| 20 | Urgot | −0.39 | −1.00 | −1.00 | +0.92 | +0.16 | −1.00 | +0.00 |
| 21 | Jax | −0.50 | +0.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 22 | Sion | −0.53 | −0.54 | −0.54 | −1.00 | −0.05 | – | +0.00 |
| 23 | Aatrox | −0.56 | −1.00 | −1.00 | +0.00 | −0.01 | – | +0.00 |
| 24 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 25 | Irelia | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 26 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 27 | Garen | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 28 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 29 | Renekton | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 30 | Yasuo | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 31 | Singed | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 32 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 33 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 34 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 35 | Olaf | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 36 | Volibear | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 37 | Cho'Gath | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 38 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 39 | Tryndamere | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 40 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 41 | Aurora | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 42 | Camille | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Kled's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kled's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kled` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.38)

- **1.00** spell shield: Spell Shield's spell shield blocks Kled's Chaaaaaaaarge!!!. Spell shield for 1.5 s, long enough to use ahead of Chaaaaaaaarge!!!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kled R Chaaaaaaaarge!!!)
- **0.44** spell shield: Spell Shield's spell shield blocks Kled's Bear Trap on a Rope. Spell shield for 1.5 s, long enough to use ahead of Bear Trap on a Rope. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kled Q Bear Trap on a Rope)
- **0.16** range: Sivir's basic attacks reach 250 units farther than Kled's (500 vs 250 attack range). Kled closes the gap with Jousting, Pocket Pistol, Chaaaaaaaarge!!!. (Sivir basic attacks → Kled basic attacks)

#### 2. Vladimir (net +1.14)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 2 s, long enough to use ahead of Chaaaaaaaarge!!!. (Vladimir W Sanguine Pool → Kled R Chaaaaaaaarge!!!)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 2 s, long enough to use ahead of Bear Trap on a Rope. (Vladimir W Sanguine Pool → Kled Q Bear Trap on a Rope)
- **0.05** range: Vladimir's basic attacks reach 200 units farther than Kled's (450 vs 250 attack range). Kled closes the gap with Jousting, Pocket Pistol, Chaaaaaaaarge!!!. (Vladimir basic attacks → Kled basic attacks)
- Watch out: Bear Trap on a Rope's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Xayah (net +1.10)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 1.5 s, long enough to use ahead of Chaaaaaaaarge!!!. (Xayah R Featherstorm → Kled R Chaaaaaaaarge!!!)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 1.5 s, long enough to use ahead of Bear Trap on a Rope. (Xayah R Featherstorm → Kled Q Bear Trap on a Rope)
- **0.13** range: Xayah's basic attacks reach 275 units farther than Kled's (525 vs 250 attack range). Kled closes the gap with Jousting, Pocket Pistol, Chaaaaaaaarge!!!. (Xayah basic attacks → Kled basic attacks)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Xayah's Bladecaller (root).

#### 4. Fiora (net +1.09)

- **1.10** parry: Riposte parries Kled's Chaaaaaaaarge!!! and stuns back. Parry for 0.75 s; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. Negating Chaaaaaaaarge!!!'s immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kled R Chaaaaaaaarge!!!)
- **0.56** parry: Riposte parries Kled's Bear Trap on a Rope and stuns back. Parry for 0.75 s; Bear Trap on a Rope takes 0.75 s to land, enough to react. Negating Bear Trap on a Rope's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kled Q Bear Trap on a Rope)
- **0.10** attack speed slow: Riposte cuts Kled's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Kled basic attacks)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Fiora's Riposte (cripple, slow, stun).

#### 5. Nocturne (net +1.06)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Kled's Chaaaaaaaarge!!!. Spell shield for 1.5 s, long enough to use ahead of Chaaaaaaaarge!!!. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Kled R Chaaaaaaaarge!!!)
- **0.52** spell shield: Shroud of Darkness's spell shield blocks Kled's Bear Trap on a Rope. Spell shield for 1.5 s, long enough to use ahead of Bear Trap on a Rope. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Kled Q Bear Trap on a Rope)
- **0.20** cc immunity: Paranoia is displacement immune, ignoring Kled's Chaaaaaaaarge!!! (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Kled R Chaaaaaaaarge!!!)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Nocturne's Paranoia (nearsight).

#### 6. Zed (net +1.04)

- **1.00** untargetable: Death Mark makes Zed untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 0.6 s; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. (Zed R Death Mark → Kled R Chaaaaaaaarge!!!)
- **0.31** untargetable: Death Mark makes Zed untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 0.6 s; Bear Trap on a Rope takes 0.75 s to land, enough to react. (Zed R Death Mark → Kled Q Bear Trap on a Rope)
- Watch out: Kled's basic attacks reach 125 units farther than Zed's (250 vs 125 attack range).

#### 7. Aurora (net +1.03)

- **1.00** untargetable: Between Worlds makes Aurora untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 0.4 s; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kled R Chaaaaaaaarge!!!)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 0.4 s; Bear Trap on a Rope takes 0.75 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kled Q Bear Trap on a Rope)
- **0.20** cc immunity: Between Worlds is displacement immune, ignoring Kled's Chaaaaaaaarge!!! (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Kled R Chaaaaaaaarge!!!)
- Watch out: Jousting reveals Aurora through Across the Veil's stealth.

#### 8. Elise (net +1.02)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for 0.6 s; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. (Elise E Rappel → Kled R Chaaaaaaaarge!!!)
- **0.44** untargetable: Rappel makes Elise untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for 0.6 s; Bear Trap on a Rope takes 0.75 s to land, enough to react. (Elise E Rappel → Kled Q Bear Trap on a Rope)
- **0.12** range: Elise's basic attacks reach 300 units farther than Kled's (550 vs 250 attack range). Kled closes the gap with Jousting, Pocket Pistol, Chaaaaaaaarge!!!. (Elise basic attacks → Kled basic attacks)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Elise's Cocoon (stun).

#### 9. Master Yi (net +1.02)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for ?; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. (Master Yi Q Alpha Strike → Kled R Chaaaaaaaarge!!!)
- **0.44** untargetable: Alpha Strike makes Master Yi untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for ?; Bear Trap on a Rope takes 0.75 s to land, enough to react. (Master Yi Q Alpha Strike → Kled Q Bear Trap on a Rope)
- **0.08** cc immunity: Highlander makes Master Yi immune to Kled's Bear Trap on a Rope slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Kled Q Bear Trap on a Rope)
- Watch out: Bear Trap on a Rope's airborne interrupts Master Yi's Meditate (normal channel).

#### 10. Gwen (net +1.00)

- **1.00** untargetable: Hallowed Mist makes Gwen untargetable, dodging Kled's Chaaaaaaaarge!!!. Untargetable for ?; Chaaaaaaaarge!!! takes 4.5 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Kled R Chaaaaaaaarge!!!)
- **0.44** untargetable: Hallowed Mist makes Gwen untargetable, dodging Kled's Bear Trap on a Rope. Untargetable for ?; Bear Trap on a Rope takes 0.75 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Kled Q Bear Trap on a Rope)
- Watch out: Chaaaaaaaarge!!! makes Kled immune to Gwen's Needlework (slow).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.38 | 1.38 | 0.00 |  |
| 2 | Vladimir | +1.14 | 1.28 | 0.14 |  |
| 3 | Xayah | +1.10 | 1.29 | 0.19 |  |
| 4 | Fiora | +1.09 | 1.41 | 0.32 |  |
| 5 | Nocturne | +1.06 | 1.50 | 0.44 |  |
| 6 | Zed | +1.04 | 1.16 | 0.12 |  |
| 7 | Aurora | +1.03 | 1.32 | 0.29 |  |
| 8 | Elise | +1.02 | 1.34 | 0.32 |  |
| 9 | Master Yi | +1.02 | 1.33 | 0.31 |  |
| 10 | Gwen | +1.00 | 1.22 | 0.22 |  |
| 11 | Rek'Sai | +0.98 | 1.22 | 0.24 |  |
| 12 | Udyr | +0.94 | 1.35 | 0.41 |  |
| 13 | Yuumi | +0.86 | 1.44 | 0.58 |  |
| 14 | Ekko | +0.85 | 1.17 | 0.32 |  |
| 15 | Olaf | +0.85 | 1.16 | 0.31 |  |
| 16 | Zaahen | +0.69 | 1.16 | 0.47 |  |
| 17 | Evelynn | +0.67 | 1.16 | 0.49 |  |
| 18 | Samira | +0.65 | 0.85 | 0.20 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 19 | Morgana | +0.61 | 1.29 | 0.68 |  |
| 20 | Gangplank | +0.57 | 1.00 | 0.43 |  |
| 21 | Lissandra | +0.53 | 1.31 | 0.78 |  |
| 22 | Bard | +0.50 | 1.28 | 0.78 |  |
| 23 | Shaco | +0.50 | 1.16 | 0.66 |  |
| 24 | Vex | +0.50 | 0.80 | 0.30 |  |
| 25 | Mel | +0.49 | 0.80 | 0.31 | projectile block (Rebuttal) |
| 26 | Jinx | +0.47 | 0.69 | 0.22 | dash stop (Flame Chompers!) |
| 27 | Warwick | +0.45 | 1.47 | 1.02 |  |
| 28 | Sion | +0.41 | 1.17 | 0.76 |  |
| 29 | Teemo | +0.41 | 0.65 | 0.24 | blind (Blinding Dart) |
| 30 | Camille | +0.39 | 1.21 | 0.82 |  |
| 31 | Kalista | +0.39 | 0.99 | 0.60 |  |
| 32 | Kayn | +0.35 | 1.16 | 0.81 |  |
| 33 | Rengar | +0.31 | 1.03 | 0.72 |  |
| 34 | Singed | +0.28 | 0.92 | 0.64 | grounding (Mega Adhesive) |
| 35 | Ahri | +0.28 | 0.61 | 0.33 |  |
| 36 | Yasuo | +0.27 | 0.83 | 0.56 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 37 | Veigar | +0.24 | 0.57 | 0.33 |  |
| 38 | Alistar | +0.23 | 0.93 | 0.70 |  |
| 39 | Malzahar | +0.17 | 1.03 | 0.86 |  |
| 40 | Viktor | +0.15 | 0.62 | 0.47 |  |
| 41 | Maokai | +0.14 | 1.29 | 1.15 |  |
| 42 | Hwei | +0.13 | 0.68 | 0.55 | dash stop (Grim Visage) |
| 43 | Jax | +0.12 | 0.44 | 0.32 | attack dodge (Counter Strike) |
| 44 | Kayle | +0.12 | 0.17 | 0.05 |  |
| 45 | Zeri | +0.12 | 0.17 | 0.05 |  |
| 46 | Ezreal | +0.12 | 0.12 | 0.00 |  |
| 47 | Nasus | +0.11 | 0.42 | 0.31 | attack speed slow (Wither) |
| 48 | Kindred | +0.11 | 0.16 | 0.05 |  |
| 49 | Braum | +0.10 | 1.13 | 1.03 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 50 | Nidalee | +0.10 | 0.10 | 0.00 |  |
| 51 | Yunara | +0.07 | 0.15 | 0.08 |  |
| 52 | Cassiopeia | +0.06 | 0.80 | 0.74 | grounding (Miasma) |
| 53 | Illaoi | +0.06 | 0.24 | 0.18 |  |
| 54 | Lulu | +0.05 | 0.53 | 0.48 |  |
| 55 | Kog'Maw | +0.04 | 0.09 | 0.05 |  |
| 56 | Corki | +0.03 | 0.35 | 0.32 |  |
| 57 | Kai'Sa | +0.02 | 0.13 | 0.11 |  |
| 58 | Graves | +0.01 | 0.07 | 0.06 |  |
| 59 | Twitch | 0.00 | 0.16 | 0.16 |  |
| 60 | Nilah | -0.02 | 0.38 | 0.40 |  |
| 61 | Garen | -0.04 | 0.18 | 0.22 |  |
| 62 | Smolder | -0.04 | 0.12 | 0.16 |  |
| 63 | Milio | -0.10 | 0.22 | 0.32 |  |
| 64 | Tryndamere | -0.13 | 0.00 | 0.13 |  |
| 65 | Kennen | -0.14 | 0.11 | 0.25 |  |
| 66 | Annie | -0.15 | 0.10 | 0.25 |  |
| 67 | Lucian | -0.16 | 0.12 | 0.28 |  |
| 68 | Draven | -0.19 | 0.14 | 0.33 |  |
| 69 | Miss Fortune | -0.21 | 0.12 | 0.33 |  |
| 70 | Zilean | -0.21 | 0.12 | 0.33 |  |
| 71 | Zoe | -0.21 | 0.12 | 0.33 |  |
| 72 | LeBlanc | -0.21 | 0.08 | 0.29 |  |
| 73 | Volibear | -0.22 | 0.24 | 0.46 |  |
| 74 | Akali | -0.23 | 0.00 | 0.23 |  |
| 75 | Lux | -0.24 | 0.11 | 0.35 |  |
| 76 | Jayce | -0.24 | 0.10 | 0.34 |  |
| 77 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 78 | Soraka | -0.27 | 0.10 | 0.37 |  |
| 79 | Karthus | -0.27 | 0.06 | 0.33 |  |
| 80 | Brand | -0.28 | 0.08 | 0.36 |  |
| 81 | Syndra | -0.28 | 0.08 | 0.36 |  |
| 82 | Locke | -0.28 | 0.00 | 0.28 |  |
| 83 | Talon | -0.28 | 0.00 | 0.28 |  |
| 84 | Katarina | -0.29 | 0.12 | 0.41 |  |
| 85 | Swain | -0.29 | 0.07 | 0.36 |  |
| 86 | Vayne | -0.31 | 0.16 | 0.47 |  |
| 87 | Akshan | -0.31 | 0.11 | 0.42 |  |
| 88 | Senna | -0.32 | 0.14 | 0.46 |  |
| 89 | Dr. Mundo | -0.32 | 0.00 | 0.32 |  |
| 90 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 91 | Heimerdinger | -0.33 | 0.15 | 0.48 |  |
| 92 | Ziggs | -0.33 | 0.10 | 0.43 |  |
| 93 | Shyvana | -0.34 | 0.24 | 0.58 |  |
| 94 | Quinn | -0.34 | 0.13 | 0.47 |  |
| 95 | Karma | -0.36 | 0.08 | 0.44 |  |
| 96 | Twisted Fate | -0.38 | 0.15 | 0.53 |  |
| 97 | Irelia | -0.38 | 0.00 | 0.38 |  |
| 98 | Yorick | -0.38 | 0.00 | 0.38 |  |
| 99 | Anivia | -0.41 | 0.10 | 0.51 |  |
| 100 | Kha'Zix | -0.41 | 0.00 | 0.41 |  |
| 101 | Rumble | -0.41 | 0.00 | 0.41 |  |
| 102 | Taric | -0.41 | 0.00 | 0.41 |  |
| 103 | Mordekaiser | -0.43 | 0.10 | 0.53 |  |
| 104 | Bel'Veth | -0.43 | 0.00 | 0.43 |  |
| 105 | Ashe | -0.44 | 0.16 | 0.60 |  |
| 106 | Pantheon | -0.45 | 0.00 | 0.45 |  |
| 107 | Caitlyn | -0.46 | 0.18 | 0.64 |  |
| 108 | Varus | -0.48 | 0.23 | 0.71 |  |
| 109 | Aatrox | -0.49 | 0.00 | 0.49 |  |
| 110 | Ivern | -0.50 | 0.06 | 0.56 |  |
| 111 | Thresh | -0.51 | 0.06 | 0.57 |  |
| 112 | Darius | -0.51 | 0.00 | 0.51 |  |
| 113 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 114 | Gnar | -0.52 | 0.11 | 0.63 |  |
| 115 | Sylas | -0.52 | 0.00 | 0.52 |  |
| 116 | Riven | -0.54 | 0.00 | 0.54 |  |
| 117 | Sett | -0.55 | 0.24 | 0.79 |  |
| 118 | Vel'Koz | -0.56 | 0.09 | 0.65 |  |
| 119 | Yone | -0.57 | 0.52 | 1.09 |  |
| 120 | Ryze | -0.57 | 0.09 | 0.66 |  |
| 121 | Jhin | -0.58 | 0.10 | 0.68 |  |
| 122 | Xerath | -0.58 | 0.09 | 0.67 |  |
| 123 | Shen | -0.59 | 0.42 | 1.01 | attack block (Spirit's Refuge) |
| 124 | Poppy | -0.60 | 0.69 | 1.29 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 125 | Malphite | -0.60 | 0.51 | 1.11 |  |
| 126 | Orianna | -0.60 | 0.09 | 0.69 |  |
| 127 | Sona | -0.61 | 0.15 | 0.76 |  |
| 128 | Tristana | -0.62 | 0.18 | 0.80 |  |
| 129 | Cho'Gath | -0.64 | 0.00 | 0.64 |  |
| 130 | Azir | -0.65 | 0.09 | 0.74 |  |
| 131 | Aurelion Sol | -0.65 | 0.08 | 0.73 |  |
| 132 | Wukong | -0.68 | 0.00 | 0.68 |  |
| 133 | Lee Sin | -0.69 | 0.00 | 0.69 |  |
| 134 | Naafiri | -0.70 | 0.00 | 0.70 |  |
| 135 | Aphelios | -0.72 | 0.21 | 0.93 |  |
| 136 | K'Sante | -0.73 | 0.47 | 1.20 |  |
| 137 | Blitzcrank | -0.73 | 0.00 | 0.73 |  |
| 138 | Fizz | -0.74 | 0.00 | 0.74 |  |
| 139 | Hecarim | -0.75 | 0.25 | 1.00 |  |
| 140 | Zyra | -0.77 | 0.10 | 0.87 |  |
| 141 | Diana | -0.77 | 0.00 | 0.77 |  |
| 142 | Fiddlesticks | -0.80 | 0.06 | 0.86 |  |
| 143 | Urgot | -0.81 | 0.03 | 0.84 |  |
| 144 | Lillia | -0.81 | 0.02 | 0.83 |  |
| 145 | Pyke | -0.81 | 0.00 | 0.81 |  |
| 146 | Renata Glasc | -0.84 | 0.14 | 0.98 |  |
| 147 | Nami | -0.84 | 0.08 | 0.92 |  |
| 148 | Amumu | -0.86 | 0.27 | 1.13 |  |
| 149 | Seraphine | -0.86 | 0.10 | 0.96 |  |
| 150 | Jarvan IV | -0.87 | 0.24 | 1.11 |  |
| 151 | Janna | -0.89 | 0.14 | 1.03 |  |
| 152 | Neeko | -0.90 | 0.08 | 0.98 |  |
| 153 | Skarner | -0.92 | 0.09 | 1.01 |  |
| 154 | Rakan | -0.94 | 0.00 | 0.94 |  |
| 155 | Xin Zhao | -0.96 | 0.00 | 0.96 |  |
| 156 | Leona | -0.97 | 0.00 | 0.97 |  |
| 157 | Zac | -0.99 | 0.60 | 1.59 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 158 | Nautilus | -1.00 | 0.00 | 1.00 |  |
| 159 | Ornn | -1.02 | 0.24 | 1.26 |  |
| 160 | Rammus | -1.05 | 0.41 | 1.46 | attack reflect (Defensive Ball Curl) |
| 161 | Ambessa | -1.06 | 0.00 | 1.06 |  |
| 162 | Nunu & Willump | -1.07 | 0.19 | 1.26 |  |
| 163 | Rell | -1.07 | 0.00 | 1.07 |  |
| 164 | Briar | -1.11 | 0.00 | 1.11 |  |
| 165 | Galio | -1.12 | 0.00 | 1.12 |  |
| 166 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 167 | Viego | -1.18 | 0.24 | 1.42 |  |
| 168 | Gragas | -1.20 | 0.00 | 1.20 |  |
| 169 | Qiyana | -1.21 | 0.00 | 1.21 |  |
| 170 | Vi | -1.33 | 0.24 | 1.57 |  |
| 171 | Tahm Kench | -1.51 | 0.00 | 1.51 |  |
| 172 | Taliyah | -1.59 | 0.09 | 1.68 |  |
