# Counters to Gwen (patch 26.20)

## Simulated duels

The duel simulator played each of the 72 other champions with a simulator kit against Gwen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Gwen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Gwen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Master Yi | +0.86 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +1.00 |
| 2 | Teemo | +0.86 | +1.00 | +1.00 | +1.00 | +0.41 | +1.00 | +0.00 |
| 3 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.16 | – | +1.00 |
| 4 | Gnar | +0.86 | +1.00 | +1.00 | +1.00 | +0.39 | +1.00 | +0.00 |
| 5 | Jax | +0.86 | +1.00 | +1.00 | +1.00 | +0.47 | – | +0.00 |
| 6 | Vayne | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 7 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.02 | – | +1.00 |
| 8 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 9 | Morgana | +0.81 | +0.97 | +0.97 | +0.94 | +0.31 | +0.87 | +0.00 |
| 10 | Riven | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 11 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 12 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.05 |
| 13 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 14 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 15 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 16 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 17 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 18 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 19 | Garen | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 20 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 21 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 22 | Gangplank | +0.76 | +1.00 | +0.98 | +1.00 | −0.09 | – | +0.00 |
| 23 | Nasus | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 24 | Volibear | +0.72 | +0.96 | +0.96 | +0.96 | +0.14 | – | −1.00 |
| 25 | Anivia | +0.68 | +1.00 | +0.77 | +1.00 | −0.32 | +0.86 | +0.00 |
| 26 | Aurora | +0.61 | +1.00 | +1.00 | +1.00 | +0.07 | −1.00 | +0.00 |
| 27 | Yone | +0.58 | +1.00 | +1.00 | +0.08 | +0.04 | – | +0.04 |
| 28 | Quinn | +0.51 | +1.00 | +1.00 | −0.63 | +0.24 | +1.00 | +0.00 |
| 29 | Kayle | +0.49 | +1.00 | +1.00 | −0.89 | +0.44 | +1.00 | +0.00 |
| 30 | Mordekaiser | +0.44 | +0.83 | +0.97 | −0.11 | −0.23 | – | +0.00 |
| 31 | Sion | +0.40 | +0.70 | +0.70 | +0.00 | +0.10 | – | +0.00 |
| 32 | Singed | +0.33 | +1.00 | +0.13 | +0.18 | −0.16 | – | +0.00 |
| 33 | Camille | +0.31 | +1.00 | +1.00 | −1.00 | −0.15 | – | +0.00 |
| 34 | Ashe | +0.27 | +1.00 | +1.00 | −1.00 | +0.44 | −1.00 | +0.00 |
| 35 | Renekton | +0.20 | +1.00 | −1.00 | +1.00 | −0.14 | – | +0.00 |
| 36 | Brand | +0.12 | +0.84 | +0.83 | −1.00 | +0.00 | −1.00 | +0.00 |
| 37 | Jayce | +0.02 | +1.00 | −0.99 | −0.16 | +0.35 | – | +0.00 |
| 38 | Vel'Koz | −0.13 | +0.06 | +0.39 | −1.00 | +0.40 | −1.00 | +0.00 |
| 39 | Heimerdinger | −0.17 | −1.00 | −1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 40 | Olaf | −0.22 | −0.73 | −0.76 | +1.00 | −0.14 | – | +0.00 |
| 41 | Lux | −0.28 | +0.43 | −0.81 | −0.99 | +0.29 | −0.01 | −0.48 |
| 42 | Pantheon | −0.30 | −0.93 | −0.95 | +1.00 | +0.03 | – | +0.00 |
| 43 | Cassiopeia | −0.33 | −0.29 | −1.00 | −0.43 | +0.29 | +0.34 | +0.00 |
| 44 | Zyra | −0.39 | −0.46 | +0.03 | −1.00 | +0.14 | −1.00 | +0.00 |
| 45 | Ahri | −0.42 | −0.17 | −0.51 | −1.00 | +0.32 | −1.00 | +0.00 |
| 46 | Lissandra | −0.46 | +0.16 | −0.98 | −0.95 | +0.16 | −0.84 | +0.00 |
| 47 | Kled | −0.49 | −0.46 | −0.45 | −1.00 | −0.07 | – | +0.00 |
| 48 | Annie | −0.51 | −0.85 | −1.00 | +0.00 | +0.28 | −0.90 | +0.00 |
| 49 | Kennen | −0.66 | −1.00 | −0.95 | −1.00 | +0.20 | −0.03 | +0.00 |
| 50 | Ziggs | −0.73 | −1.00 | −0.97 | −1.00 | +0.41 | −1.00 | +0.00 |
| 51 | Sett | −0.75 | −1.00 | −1.00 | −0.89 | +0.05 | – | +0.00 |
| 52 | Ornn | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 53 | Cho'Gath | −0.75 | −1.00 | −0.93 | −1.00 | +0.03 | – | +0.00 |
| 54 | Skarner | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 55 | Tahm Kench | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 56 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 57 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 58 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 59 | Malphite | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 60 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 61 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 62 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 63 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 64 | Dr. Mundo | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 65 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.35 |
| 66 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 67 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 68 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 69 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 70 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 71 | Akali | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.00 |
| 72 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Gwen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Gwen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Gwen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.72)

- **0.44** range: Sivir's basic attacks reach 350 units farther than Gwen's (500 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Sivir basic attacks → Gwen basic attacks)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Gwen's Needlework. Spell shield for 1.5 s, long enough to use ahead of Needlework. A spell shield blocks only the first enemy ability that reaches it. Spell shield blocks only one needle. (Sivir E Spell Shield → Gwen R Needlework)

#### 2. Kayle (net +0.48)

- **0.36** range: Kayle's basic attacks reach 475 units farther than Gwen's (625 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Kayle basic attacks → Gwen basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Gwen's Needlework (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Needlework. (Kayle R Divine Judgment → Gwen R Needlework)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Kayle's Starfire Spellblade.

#### 3. Twitch (net +0.43)

- **0.43** range: Twitch's basic attacks reach 400 units farther than Gwen's (550 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Twitch basic attacks → Gwen basic attacks)

#### 4. Xayah (net +0.37)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Gwen's Needlework. Untargetable for 1.5 s, long enough to use ahead of Needlework. (Xayah R Featherstorm → Gwen R Needlework)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Gwen's (525 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Xayah basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Xayah's Featherstorm.

#### 5. Kai'Sa (net +0.36)

- **0.36** range: Kai'Sa's basic attacks reach 375 units farther than Gwen's (525 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Kai'Sa basic attacks → Gwen basic attacks)

#### 6. Yunara (net +0.36)

- **0.36** range: Yunara's basic attacks reach 425 units farther than Gwen's (575 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Yunara basic attacks → Gwen basic attacks)

#### 7. Aurora (net +0.35)

- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Gwen's Needlework. Untargetable for 0.4 s; Needlework takes 0.31 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Gwen R Needlework)
- **0.29** range: Aurora's basic attacks reach 400 units farther than Gwen's (550 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Aurora basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Aurora's Between Worlds.

#### 8. Yuumi (net +0.30)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Gwen's Needlework. Untargetable for ?; Needlework takes 0.31 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Gwen R Needlework)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Gwen's (425 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Yuumi basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Yuumi's Final Chapter.

#### 9. Samira (net +0.26)

- **0.55** projectile block: Blade Whirl blocks Gwen's Needlework, a projectile. Blade Whirl for 0.75 s; Needlework takes 0.31 s to land, enough to react. (Samira W Blade Whirl → Gwen R Needlework)
- **0.28** range: Samira's basic attacks reach 350 units farther than Gwen's (500 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Samira basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Samira's Wild Rush.

#### 10. Vladimir (net +0.25)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gwen's Needlework. Untargetable for 2 s, long enough to use ahead of Needlework. (Vladimir W Sanguine Pool → Gwen R Needlework)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Gwen's (450 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Vladimir basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Vladimir's Hemoplague.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.72 | 0.72 | 0.00 |  |
| 2 | Kayle | +0.48 | 0.64 | 0.16 |  |
| 3 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 4 | Xayah | +0.37 | 0.84 | 0.47 |  |
| 5 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 6 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 7 | Aurora | +0.35 | 0.77 | 0.42 |  |
| 8 | Yuumi | +0.30 | 0.85 | 0.55 |  |
| 9 | Samira | +0.26 | 0.83 | 0.57 | projectile block (Blade Whirl) |
| 10 | Vladimir | +0.25 | 0.71 | 0.46 |  |
| 11 | Master Yi | +0.21 | 0.69 | 0.48 |  |
| 12 | Twisted Fate | +0.15 | 0.40 | 0.25 |  |
| 13 | Kindred | +0.14 | 0.44 | 0.30 |  |
| 14 | Teemo | +0.10 | 0.79 | 0.69 | blind (Blinding Dart) |
| 15 | Fiora | +0.09 | 0.60 | 0.51 |  |
| 16 | Bard | +0.02 | 0.89 | 0.87 |  |
| 17 | Mel | +0.02 | 0.82 | 0.80 | projectile block (Rebuttal) |
| 18 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 19 | Nidalee | -0.02 | 0.28 | 0.30 |  |
| 20 | Kog'Maw | -0.03 | 0.25 | 0.28 |  |
| 21 | Jinx | -0.04 | 0.67 | 0.71 | dash stop (Flame Chompers!) |
| 22 | Zilean | -0.04 | 0.32 | 0.36 |  |
| 23 | Lulu | -0.05 | 0.70 | 0.75 |  |
| 24 | Milio | -0.05 | 0.46 | 0.51 |  |
| 25 | Zed | -0.06 | 0.48 | 0.54 |  |
| 26 | Lissandra | -0.07 | 0.87 | 0.94 |  |
| 27 | Kayn | -0.08 | 0.55 | 0.63 |  |
| 28 | Nasus | -0.08 | 0.36 | 0.44 |  |
| 29 | Singed | -0.09 | 0.57 | 0.66 |  |
| 30 | Vex | -0.10 | 0.60 | 0.70 |  |
| 31 | Quinn | -0.10 | 0.36 | 0.46 |  |
| 32 | Zeri | -0.11 | 0.44 | 0.55 |  |
| 33 | Olaf | -0.14 | 0.14 | 0.28 |  |
| 34 | Miss Fortune | -0.15 | 0.32 | 0.47 |  |
| 35 | Dr. Mundo | -0.16 | 0.00 | 0.16 |  |
| 36 | Akshan | -0.23 | 0.32 | 0.55 |  |
| 37 | Malzahar | -0.24 | 0.45 | 0.69 |  |
| 38 | Braum | -0.25 | 0.55 | 0.80 | projectile block (Unbreakable) |
| 39 | Viktor | -0.26 | 0.66 | 0.92 |  |
| 40 | LeBlanc | -0.28 | 0.21 | 0.49 |  |
| 41 | Kalista | -0.29 | 0.39 | 0.68 |  |
| 42 | Zoe | -0.29 | 0.32 | 0.61 |  |
| 43 | Veigar | -0.30 | 0.59 | 0.89 |  |
| 44 | Vayne | -0.30 | 0.43 | 0.73 |  |
| 45 | Udyr | -0.32 | 0.14 | 0.46 |  |
| 46 | Shaco | -0.34 | 0.55 | 0.89 |  |
| 47 | Lucian | -0.34 | 0.34 | 0.68 |  |
| 48 | Taric | -0.34 | 0.00 | 0.34 |  |
| 49 | Yasuo | -0.35 | 0.55 | 0.90 | projectile block (Wind Wall) |
| 50 | Katarina | -0.35 | 0.12 | 0.47 |  |
| 51 | Hwei | -0.36 | 0.63 | 0.99 | dash stop (Grim Visage) |
| 52 | Smolder | -0.37 | 0.32 | 0.69 |  |
| 53 | Karthus | -0.37 | 0.18 | 0.55 |  |
| 54 | Ahri | -0.38 | 0.60 | 0.98 |  |
| 55 | Ezreal | -0.38 | 0.32 | 0.70 |  |
| 56 | Jayce | -0.38 | 0.28 | 0.66 |  |
| 57 | Soraka | -0.38 | 0.27 | 0.65 |  |
| 58 | Ryze | -0.39 | 0.24 | 0.63 |  |
| 59 | Varus | -0.41 | 0.39 | 0.80 |  |
| 60 | Pantheon | -0.43 | 0.28 | 0.71 |  |
| 61 | Vel'Koz | -0.43 | 0.25 | 0.68 |  |
| 62 | Yorick | -0.43 | 0.00 | 0.43 |  |
| 63 | Fizz | -0.44 | 0.55 | 0.99 |  |
| 64 | Ashe | -0.44 | 0.36 | 0.80 |  |
| 65 | Elise | -0.44 | 0.32 | 0.76 |  |
| 66 | Caitlyn | -0.45 | 0.36 | 0.81 |  |
| 67 | Shen | -0.45 | 0.36 | 0.81 |  |
| 68 | Nilah | -0.46 | 0.42 | 0.88 |  |
| 69 | Kennen | -0.46 | 0.29 | 0.75 |  |
| 70 | Xerath | -0.46 | 0.25 | 0.71 |  |
| 71 | Cassiopeia | -0.47 | 0.60 | 1.07 |  |
| 72 | Sion | -0.47 | 0.14 | 0.61 |  |
| 73 | Sona | -0.48 | 0.41 | 0.89 |  |
| 74 | Graves | -0.48 | 0.22 | 0.70 |  |
| 75 | Karma | -0.48 | 0.21 | 0.69 |  |
| 76 | Kha'Zix | -0.48 | 0.00 | 0.48 |  |
| 77 | Morgana | -0.49 | 0.32 | 0.81 |  |
| 78 | Jax | -0.50 | 0.38 | 0.88 |  |
| 79 | Corki | -0.51 | 0.30 | 0.81 |  |
| 80 | Draven | -0.52 | 0.36 | 0.88 |  |
| 81 | Lux | -0.52 | 0.29 | 0.81 |  |
| 82 | Sylas | -0.52 | 0.00 | 0.52 |  |
| 83 | Ivern | -0.53 | 0.18 | 0.71 |  |
| 84 | Garen | -0.53 | 0.15 | 0.68 |  |
| 85 | Camille | -0.54 | 0.51 | 1.05 |  |
| 86 | Tristana | -0.54 | 0.36 | 0.90 |  |
| 87 | Heimerdinger | -0.55 | 0.26 | 0.81 |  |
| 88 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 89 | Rek'Sai | -0.56 | 0.55 | 1.11 |  |
| 90 | Janna | -0.56 | 0.36 | 0.92 |  |
| 91 | Warwick | -0.56 | 0.27 | 0.83 |  |
| 92 | Gangplank | -0.57 | 0.11 | 0.68 |  |
| 93 | Rengar | -0.57 | 0.11 | 0.68 |  |
| 94 | Poppy | -0.60 | 0.50 | 1.10 | dash stop (Steadfast Presence) |
| 95 | Aatrox | -0.60 | 0.00 | 0.60 |  |
| 96 | Brand | -0.62 | 0.22 | 0.84 |  |
| 97 | Senna | -0.63 | 0.32 | 0.95 |  |
| 98 | Annie | -0.63 | 0.22 | 0.85 |  |
| 99 | Kassadin | -0.65 | 0.00 | 0.65 |  |
| 100 | Talon | -0.65 | 0.00 | 0.65 |  |
| 101 | Jhin | -0.66 | 0.27 | 0.93 |  |
| 102 | Aphelios | -0.67 | 0.44 | 1.11 |  |
| 103 | Aurelion Sol | -0.67 | 0.22 | 0.89 |  |
| 104 | Wukong | -0.67 | 0.00 | 0.67 |  |
| 105 | Ziggs | -0.69 | 0.27 | 0.96 |  |
| 106 | Bel'Veth | -0.69 | 0.00 | 0.69 |  |
| 107 | Renekton | -0.69 | 0.00 | 0.69 |  |
| 108 | Swain | -0.70 | 0.20 | 0.90 |  |
| 109 | Fiddlesticks | -0.70 | 0.18 | 0.88 |  |
| 110 | Lillia | -0.70 | 0.10 | 0.80 |  |
| 111 | Mordekaiser | -0.70 | 0.09 | 0.79 |  |
| 112 | Illaoi | -0.70 | 0.00 | 0.70 |  |
| 113 | Gnar | -0.71 | 0.31 | 1.02 |  |
| 114 | Orianna | -0.71 | 0.25 | 0.96 |  |
| 115 | Maokai | -0.72 | 0.55 | 1.27 |  |
| 116 | Azir | -0.72 | 0.25 | 0.97 |  |
| 117 | Syndra | -0.73 | 0.22 | 0.95 |  |
| 118 | Renata Glasc | -0.75 | 0.38 | 1.13 |  |
| 119 | Anivia | -0.76 | 0.24 | 1.00 |  |
| 120 | Nocturne | -0.78 | 0.28 | 1.06 |  |
| 121 | Seraphine | -0.80 | 0.27 | 1.07 |  |
| 122 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 123 | Alistar | -0.81 | 0.11 | 0.92 |  |
| 124 | Shyvana | -0.81 | 0.00 | 0.81 |  |
| 125 | Evelynn | -0.82 | 0.55 | 1.37 |  |
| 126 | Thresh | -0.82 | 0.18 | 1.00 |  |
| 127 | Nunu & Willump | -0.82 | 0.17 | 0.99 |  |
| 128 | Riven | -0.82 | 0.00 | 0.82 |  |
| 129 | Zyra | -0.83 | 0.24 | 1.07 |  |
| 130 | Neeko | -0.84 | 0.22 | 1.06 |  |
| 131 | Zac | -0.87 | 0.40 | 1.27 | dash stop (Stretching Strikes) |
| 132 | Skarner | -0.87 | 0.07 | 0.94 |  |
| 133 | Irelia | -0.87 | 0.00 | 0.87 |  |
| 134 | Locke | -0.87 | 0.00 | 0.87 |  |
| 135 | Rammus | -0.88 | 0.36 | 1.24 |  |
| 136 | Cho'Gath | -0.88 | 0.00 | 0.88 |  |
| 137 | Sett | -0.89 | 0.00 | 0.89 |  |
| 138 | Nami | -0.90 | 0.22 | 1.12 |  |
| 139 | Akali | -0.90 | 0.00 | 0.90 |  |
| 140 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 141 | Diana | -0.91 | 0.00 | 0.91 |  |
| 142 | Xin Zhao | -0.93 | 0.24 | 1.17 |  |
| 143 | Malphite | -0.95 | 0.24 | 1.19 |  |
| 144 | Trundle | -0.95 | 0.00 | 0.95 |  |
| 145 | Blitzcrank | -0.96 | 0.00 | 0.96 |  |
| 146 | Darius | -0.96 | 0.00 | 0.96 |  |
| 147 | Kled | -1.00 | 0.22 | 1.22 |  |
| 148 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 149 | Amumu | -1.01 | 0.19 | 1.20 |  |
| 150 | Galio | -1.02 | 0.00 | 1.02 |  |
| 151 | Urgot | -1.04 | 0.13 | 1.17 |  |
| 152 | Rakan | -1.06 | 0.11 | 1.17 |  |
| 153 | Yone | -1.08 | 0.19 | 1.27 |  |
| 154 | Zaahen | -1.10 | 0.14 | 1.24 |  |
| 155 | Nautilus | -1.10 | 0.00 | 1.10 |  |
| 156 | Taliyah | -1.12 | 0.25 | 1.37 |  |
| 157 | Leona | -1.16 | 0.00 | 1.16 |  |
| 158 | Ekko | -1.17 | 0.00 | 1.17 |  |
| 159 | Qiyana | -1.18 | 0.00 | 1.18 |  |
| 160 | Volibear | -1.19 | 0.00 | 1.19 |  |
| 161 | Tahm Kench | -1.20 | 0.00 | 1.20 |  |
| 162 | Vi | -1.22 | 0.00 | 1.22 |  |
| 163 | Hecarim | -1.23 | 0.00 | 1.23 |  |
| 164 | Gragas | -1.24 | 0.00 | 1.24 |  |
| 165 | Jarvan IV | -1.24 | 0.00 | 1.24 |  |
| 166 | Pyke | -1.25 | 0.00 | 1.25 |  |
| 167 | Sejuani | -1.29 | 0.00 | 1.29 |  |
| 168 | Viego | -1.34 | 0.00 | 1.34 |  |
| 169 | Rell | -1.36 | 0.00 | 1.36 |  |
| 170 | Briar | -1.37 | 0.00 | 1.37 |  |
| 171 | Ornn | -1.43 | 0.00 | 1.43 |  |
| 172 | K'Sante | -1.47 | 0.00 | 1.47 |  |
