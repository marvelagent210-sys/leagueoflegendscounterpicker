# Counters to Gwen (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 42 other champions with a simulator kit against Gwen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Gwen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Gwen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.92 | +1.00 | +0.99 | +1.00 | +0.84 | +1.00 | +0.00 |
| 2 | Fiora | +0.91 | +1.00 | +1.00 | +1.00 | +0.45 | – | +1.00 |
| 3 | Teemo | +0.86 | +1.00 | +1.00 | +1.00 | +0.37 | +1.00 | +0.00 |
| 4 | Jax | +0.85 | +1.00 | +1.00 | +1.00 | +0.41 | – | +0.00 |
| 5 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.31 | – | +0.00 |
| 6 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 7 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 8 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 9 | Garen | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 10 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 11 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 12 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 13 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 14 | Camille | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 15 | K'Sante | +0.75 | +1.00 | +1.00 | +1.00 | +0.18 | – | −1.00 |
| 16 | Yone | +0.62 | +1.00 | +1.00 | +0.08 | +0.25 | – | +0.00 |
| 17 | Riven | +0.58 | +1.00 | +1.00 | +0.00 | +0.14 | – | +0.00 |
| 18 | Quinn | +0.51 | +1.00 | +1.00 | −0.71 | +0.37 | +1.00 | +0.00 |
| 19 | Olaf | +0.37 | +0.35 | +0.25 | +1.00 | −0.11 | – | +0.00 |
| 20 | Singed | −0.03 | +0.13 | +0.07 | −0.33 | −0.11 | – | +0.00 |
| 21 | Kennen | −0.16 | −1.00 | −1.00 | +0.97 | +0.29 | +1.00 | +0.00 |
| 22 | Pantheon | −0.33 | −1.00 | −1.00 | +1.00 | +0.01 | – | +0.00 |
| 23 | Aurora | −0.35 | −0.68 | −0.68 | −0.77 | +0.33 | +1.00 | +0.00 |
| 24 | Sion | −0.38 | −0.30 | −0.30 | −1.00 | +0.05 | – | +0.00 |
| 25 | Ambessa | −0.72 | −1.00 | −0.88 | −1.00 | +0.14 | – | +0.00 |
| 26 | Gnar | −0.74 | −1.00 | −1.00 | −1.00 | +0.28 | −0.81 | +0.00 |
| 27 | Ornn | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 28 | Kled | −0.75 | −0.94 | −0.94 | −1.00 | −0.04 | – | +0.00 |
| 29 | Tahm Kench | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 30 | Volibear | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 31 | Skarner | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 32 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 33 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 34 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 35 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 36 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 37 | Cho'Gath | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 38 | Sett | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 39 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 40 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 41 | Dr. Mundo | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 42 | Mordekaiser | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |

## Interaction ledger (partial confidence)

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

#### 2. Kayle (net +0.64)

- **0.36** range: Kayle's basic attacks reach 475 units farther than Gwen's (625 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Kayle basic attacks → Gwen basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Gwen's Needlework (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Needlework. (Kayle R Divine Judgment → Gwen R Needlework)

#### 3. Twitch (net +0.43)

- **0.43** range: Twitch's basic attacks reach 400 units farther than Gwen's (550 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Twitch basic attacks → Gwen basic attacks)

#### 4. Xayah (net +0.37)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Gwen's Needlework. Untargetable for 1.5 s, long enough to use ahead of Needlework. (Xayah R Featherstorm → Gwen R Needlework)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Gwen's (525 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Xayah basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Xayah's Featherstorm.

#### 5. Kindred (net +0.36)

- **0.44** range: Kindred's basic attacks reach 350 units farther than Gwen's (500 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Kindred basic attacks → Gwen basic attacks)
- **0.22** invulnerable: Lamb's Respite makes Kindred invulnerable to Gwen's Needlework (its crowd control still applies). Invulnerable for ?; Needlework takes 0.31 s to land, enough to react. (Kindred R Lamb's Respite → Gwen R Needlework)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Kindred's Mounting Dread.

#### 6. Kai'Sa (net +0.36)

- **0.36** range: Kai'Sa's basic attacks reach 375 units farther than Gwen's (525 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Kai'Sa basic attacks → Gwen basic attacks)

#### 7. Yunara (net +0.36)

- **0.36** range: Yunara's basic attacks reach 425 units farther than Gwen's (575 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Yunara basic attacks → Gwen basic attacks)

#### 8. Aurora (net +0.35)

- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Gwen's Needlework. Untargetable for 0.4 s; Needlework takes 0.31 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Gwen R Needlework)
- **0.29** range: Aurora's basic attacks reach 400 units farther than Gwen's (550 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Aurora basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Aurora's Between Worlds.

#### 9. Yuumi (net +0.30)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Gwen's Needlework. Untargetable for ?; Needlework takes 0.31 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Gwen R Needlework)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Gwen's (425 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Yuumi basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Yuumi's Final Chapter.

#### 10. Samira (net +0.26)

- **0.55** projectile block: Blade Whirl blocks Gwen's Needlework, a projectile. Blade Whirl for 0.75 s; Needlework takes 0.31 s to land, enough to react. (Samira W Blade Whirl → Gwen R Needlework)
- **0.28** range: Samira's basic attacks reach 350 units farther than Gwen's (500 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Samira basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Samira's Wild Rush.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.72 | 0.72 | 0.00 |  |
| 2 | Kayle | +0.64 | 0.64 | 0.00 |  |
| 3 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 4 | Xayah | +0.37 | 0.84 | 0.47 |  |
| 5 | Kindred | +0.36 | 0.66 | 0.30 |  |
| 6 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 7 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 8 | Aurora | +0.35 | 0.77 | 0.42 |  |
| 9 | Yuumi | +0.30 | 0.85 | 0.55 |  |
| 10 | Samira | +0.26 | 0.83 | 0.57 | projectile block (Blade Whirl) |
| 11 | Vladimir | +0.25 | 0.71 | 0.46 |  |
| 12 | Master Yi | +0.21 | 0.69 | 0.48 |  |
| 13 | Fiora | +0.18 | 0.60 | 0.42 |  |
| 14 | Twisted Fate | +0.15 | 0.40 | 0.25 |  |
| 15 | Elise | +0.11 | 0.87 | 0.76 |  |
| 16 | Teemo | +0.10 | 0.79 | 0.69 | blind (Blinding Dart) |
| 17 | Nidalee | +0.06 | 0.28 | 0.22 |  |
| 18 | Mel | +0.02 | 0.82 | 0.80 | projectile block (Rebuttal) |
| 19 | Nasus | +0.01 | 0.36 | 0.35 |  |
| 20 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 21 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 22 | Kog'Maw | -0.03 | 0.25 | 0.28 |  |
| 23 | Jinx | -0.04 | 0.67 | 0.71 | dash stop (Flame Chompers!) |
| 24 | Bard | -0.05 | 0.89 | 0.94 |  |
| 25 | Lulu | -0.05 | 0.70 | 0.75 |  |
| 26 | Milio | -0.05 | 0.46 | 0.51 |  |
| 27 | Zed | -0.06 | 0.48 | 0.54 |  |
| 28 | Lissandra | -0.07 | 0.87 | 0.94 |  |
| 29 | Singed | -0.09 | 0.57 | 0.66 |  |
| 30 | Vex | -0.10 | 0.60 | 0.70 |  |
| 31 | Quinn | -0.10 | 0.36 | 0.46 |  |
| 32 | Zeri | -0.11 | 0.44 | 0.55 |  |
| 33 | Taric | -0.12 | 0.22 | 0.34 |  |
| 34 | Vayne | -0.13 | 0.43 | 0.56 |  |
| 35 | Olaf | -0.14 | 0.14 | 0.28 |  |
| 36 | Miss Fortune | -0.15 | 0.32 | 0.47 |  |
| 37 | Shaco | -0.23 | 0.55 | 0.78 |  |
| 38 | Akshan | -0.23 | 0.32 | 0.55 |  |
| 39 | Ezreal | -0.23 | 0.32 | 0.55 |  |
| 40 | Kayn | -0.24 | 0.55 | 0.79 |  |
| 41 | Malzahar | -0.24 | 0.45 | 0.69 |  |
| 42 | Braum | -0.25 | 0.55 | 0.80 | projectile block (Unbreakable) |
| 43 | Viktor | -0.26 | 0.66 | 0.92 |  |
| 44 | Zilean | -0.27 | 0.32 | 0.59 |  |
| 45 | LeBlanc | -0.28 | 0.21 | 0.49 |  |
| 46 | Kalista | -0.29 | 0.39 | 0.68 |  |
| 47 | Zoe | -0.29 | 0.32 | 0.61 |  |
| 48 | Veigar | -0.30 | 0.59 | 0.89 |  |
| 49 | Udyr | -0.32 | 0.14 | 0.46 |  |
| 50 | Hwei | -0.34 | 0.63 | 0.97 | dash stop (Grim Visage) |
| 51 | Lucian | -0.34 | 0.34 | 0.68 |  |
| 52 | Jayce | -0.34 | 0.28 | 0.62 |  |
| 53 | Yorick | -0.34 | 0.00 | 0.34 |  |
| 54 | Yasuo | -0.35 | 0.55 | 0.90 | projectile block (Wind Wall) |
| 55 | Katarina | -0.35 | 0.12 | 0.47 |  |
| 56 | Shen | -0.37 | 0.36 | 0.73 |  |
| 57 | Smolder | -0.37 | 0.32 | 0.69 |  |
| 58 | Karthus | -0.37 | 0.18 | 0.55 |  |
| 59 | Ahri | -0.38 | 0.60 | 0.98 |  |
| 60 | Soraka | -0.38 | 0.27 | 0.65 |  |
| 61 | Sona | -0.39 | 0.41 | 0.80 |  |
| 62 | Ryze | -0.39 | 0.24 | 0.63 |  |
| 63 | Varus | -0.41 | 0.39 | 0.80 |  |
| 64 | Pantheon | -0.43 | 0.28 | 0.71 |  |
| 65 | Vel'Koz | -0.43 | 0.25 | 0.68 |  |
| 66 | Ashe | -0.44 | 0.36 | 0.80 |  |
| 67 | Caitlyn | -0.45 | 0.36 | 0.81 |  |
| 68 | Nilah | -0.46 | 0.42 | 0.88 |  |
| 69 | Kennen | -0.46 | 0.29 | 0.75 |  |
| 70 | Xerath | -0.46 | 0.25 | 0.71 |  |
| 71 | Cassiopeia | -0.47 | 0.60 | 1.07 |  |
| 72 | Sion | -0.47 | 0.14 | 0.61 |  |
| 73 | Jax | -0.48 | 0.38 | 0.86 |  |
| 74 | Draven | -0.48 | 0.36 | 0.84 |  |
| 75 | Graves | -0.48 | 0.22 | 0.70 |  |
| 76 | Karma | -0.48 | 0.21 | 0.69 |  |
| 77 | Kha'Zix | -0.48 | 0.00 | 0.48 |  |
| 78 | Morgana | -0.49 | 0.32 | 0.81 |  |
| 79 | Corki | -0.51 | 0.30 | 0.81 |  |
| 80 | Camille | -0.52 | 0.51 | 1.03 |  |
| 81 | Lux | -0.52 | 0.29 | 0.81 |  |
| 82 | Ivern | -0.53 | 0.18 | 0.71 |  |
| 83 | Rek'Sai | -0.54 | 0.55 | 1.09 |  |
| 84 | Ekko | -0.55 | 0.55 | 1.10 |  |
| 85 | Heimerdinger | -0.55 | 0.26 | 0.81 |  |
| 86 | Illaoi | -0.55 | 0.00 | 0.55 |  |
| 87 | Locke | -0.55 | 0.00 | 0.55 |  |
| 88 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 89 | Janna | -0.56 | 0.36 | 0.92 |  |
| 90 | Warwick | -0.56 | 0.27 | 0.83 |  |
| 91 | Garen | -0.56 | 0.15 | 0.71 |  |
| 92 | Gangplank | -0.57 | 0.11 | 0.68 |  |
| 93 | Rengar | -0.57 | 0.11 | 0.68 |  |
| 94 | Poppy | -0.60 | 0.50 | 1.10 | dash stop (Steadfast Presence) |
| 95 | Aatrox | -0.60 | 0.00 | 0.60 |  |
| 96 | Kassadin | -0.61 | 0.00 | 0.61 |  |
| 97 | Aphelios | -0.62 | 0.44 | 1.06 |  |
| 98 | Brand | -0.62 | 0.22 | 0.84 |  |
| 99 | Senna | -0.63 | 0.32 | 0.95 |  |
| 100 | Annie | -0.63 | 0.22 | 0.85 |  |
| 101 | Wukong | -0.63 | 0.00 | 0.63 |  |
| 102 | Tristana | -0.64 | 0.36 | 1.00 |  |
| 103 | Talon | -0.65 | 0.00 | 0.65 |  |
| 104 | Jhin | -0.66 | 0.27 | 0.93 |  |
| 105 | Aurelion Sol | -0.67 | 0.22 | 0.89 |  |
| 106 | Ziggs | -0.69 | 0.27 | 0.96 |  |
| 107 | Bel'Veth | -0.69 | 0.00 | 0.69 |  |
| 108 | Renekton | -0.69 | 0.00 | 0.69 |  |
| 109 | Swain | -0.70 | 0.20 | 0.90 |  |
| 110 | Fiddlesticks | -0.70 | 0.18 | 0.88 |  |
| 111 | Lillia | -0.70 | 0.10 | 0.80 |  |
| 112 | Mordekaiser | -0.70 | 0.09 | 0.79 |  |
| 113 | Gnar | -0.71 | 0.31 | 1.02 |  |
| 114 | Orianna | -0.71 | 0.25 | 0.96 |  |
| 115 | Maokai | -0.72 | 0.55 | 1.27 |  |
| 116 | Azir | -0.72 | 0.25 | 0.97 |  |
| 117 | Syndra | -0.73 | 0.22 | 0.95 |  |
| 118 | Shyvana | -0.73 | 0.00 | 0.73 |  |
| 119 | Renata Glasc | -0.75 | 0.38 | 1.13 |  |
| 120 | Anivia | -0.76 | 0.24 | 1.00 |  |
| 121 | Nocturne | -0.78 | 0.28 | 1.06 |  |
| 122 | Seraphine | -0.80 | 0.27 | 1.07 |  |
| 123 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 124 | Alistar | -0.81 | 0.11 | 0.92 |  |
| 125 | Evelynn | -0.82 | 0.55 | 1.37 |  |
| 126 | Thresh | -0.82 | 0.18 | 1.00 |  |
| 127 | Nunu & Willump | -0.82 | 0.17 | 0.99 |  |
| 128 | Riven | -0.82 | 0.00 | 0.82 |  |
| 129 | Zyra | -0.83 | 0.24 | 1.07 |  |
| 130 | Neeko | -0.84 | 0.22 | 1.06 |  |
| 131 | Cho'Gath | -0.84 | 0.00 | 0.84 |  |
| 132 | Sett | -0.86 | 0.00 | 0.86 |  |
| 133 | Zac | -0.87 | 0.40 | 1.27 | dash stop (Stretching Strikes) |
| 134 | Skarner | -0.87 | 0.07 | 0.94 |  |
| 135 | Rammus | -0.88 | 0.36 | 1.24 |  |
| 136 | Sylas | -0.88 | 0.00 | 0.88 |  |
| 137 | Nami | -0.90 | 0.22 | 1.12 |  |
| 138 | Akali | -0.90 | 0.00 | 0.90 |  |
| 139 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 140 | Malphite | -0.91 | 0.24 | 1.15 |  |
| 141 | Trundle | -0.91 | 0.00 | 0.91 |  |
| 142 | Xin Zhao | -0.93 | 0.24 | 1.17 |  |
| 143 | Darius | -0.93 | 0.00 | 0.93 |  |
| 144 | Irelia | -0.93 | 0.00 | 0.93 |  |
| 145 | Fizz | -0.95 | 0.00 | 0.95 |  |
| 146 | Blitzcrank | -0.99 | 0.00 | 0.99 |  |
| 147 | Kled | -1.00 | 0.22 | 1.22 |  |
| 148 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 149 | Hecarim | -1.00 | 0.00 | 1.00 |  |
| 150 | Amumu | -1.01 | 0.19 | 1.20 |  |
| 151 | Diana | -1.01 | 0.00 | 1.01 |  |
| 152 | Galio | -1.02 | 0.00 | 1.02 |  |
| 153 | Urgot | -1.04 | 0.13 | 1.17 |  |
| 154 | Rakan | -1.06 | 0.11 | 1.17 |  |
| 155 | Yone | -1.08 | 0.19 | 1.27 |  |
| 156 | Zaahen | -1.10 | 0.14 | 1.24 |  |
| 157 | Nautilus | -1.10 | 0.00 | 1.10 |  |
| 158 | Taliyah | -1.12 | 0.25 | 1.37 |  |
| 159 | Leona | -1.16 | 0.00 | 1.16 |  |
| 160 | Qiyana | -1.18 | 0.00 | 1.18 |  |
| 161 | Vi | -1.18 | 0.00 | 1.18 |  |
| 162 | Volibear | -1.19 | 0.00 | 1.19 |  |
| 163 | Gragas | -1.20 | 0.00 | 1.20 |  |
| 164 | Tahm Kench | -1.20 | 0.00 | 1.20 |  |
| 165 | Jarvan IV | -1.24 | 0.00 | 1.24 |  |
| 166 | Pyke | -1.25 | 0.00 | 1.25 |  |
| 167 | Sejuani | -1.29 | 0.00 | 1.29 |  |
| 168 | Briar | -1.34 | 0.00 | 1.34 |  |
| 169 | Viego | -1.34 | 0.00 | 1.34 |  |
| 170 | Rell | -1.36 | 0.00 | 1.36 |  |
| 171 | Ornn | -1.43 | 0.00 | 1.43 |  |
| 172 | K'Sante | -1.47 | 0.00 | 1.47 |  |
