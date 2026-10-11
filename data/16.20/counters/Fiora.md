# Counters to Fiora (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 38 other champions with a simulator kit against Fiora: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Fiora wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Fiora --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 2 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 3 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 4 | Aatrox | +0.25 | +1.00 | +1.00 | −1.00 | −0.17 | – | −1.00 |
| 5 | Kayle | +0.23 | +0.47 | +0.47 | −1.00 | +0.96 | +1.00 | −1.00 |
| 6 | Zaahen | +0.09 | +0.05 | −0.10 | +0.77 | −0.10 | – | −0.83 |
| 7 | Quinn | +0.09 | +0.00 | +0.00 | +1.00 | +0.25 | −1.00 | −1.00 |
| 8 | Teemo | −0.53 | −1.00 | −1.00 | −1.00 | +0.47 | +1.00 | +0.00 |
| 9 | Darius | −0.62 | −0.57 | −0.57 | −1.00 | −0.13 | – | −1.00 |
| 10 | Malphite | −0.74 | −1.00 | −1.00 | −1.00 | +0.24 | – | +0.00 |
| 11 | Poppy | −0.74 | −1.00 | −1.00 | −1.00 | +0.38 | – | −0.49 |
| 12 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 13 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 14 | Aurora | −0.76 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | +0.00 |
| 15 | Riven | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | – | −0.50 |
| 16 | Dr. Mundo | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 17 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 18 | Ornn | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 19 | Yasuo | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 20 | Garen | −0.80 | −1.00 | −1.00 | −1.00 | +0.20 | – | −1.00 |
| 21 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 22 | Singed | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 23 | Irelia | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | – | −1.00 |
| 24 | Nasus | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 25 | Renekton | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | – | −1.00 |
| 26 | Sion | −0.82 | −1.00 | −1.00 | −1.00 | −0.27 | – | +0.00 |
| 27 | Sett | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | – | −1.00 |
| 28 | Yone | −0.85 | −1.00 | −1.00 | −1.00 | −0.24 | – | −0.53 |
| 29 | Volibear | −0.85 | −1.00 | −1.00 | −1.00 | −0.09 | – | −1.00 |
| 30 | Olaf | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | – | −1.00 |
| 31 | Urgot | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −1.00 |
| 32 | K'Sante | −0.86 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | +0.00 |
| 33 | Cho'Gath | −0.86 | −1.00 | −1.00 | −1.00 | −0.17 | – | −1.00 |
| 34 | Rumble | −0.87 | −1.00 | −1.00 | −1.00 | −0.19 | – | −1.00 |
| 35 | Mordekaiser | −0.88 | −1.00 | −1.00 | −1.00 | −0.27 | – | −1.00 |
| 36 | Camille | −0.89 | −1.00 | −1.00 | −1.00 | −0.36 | – | −1.00 |
| 37 | Akali | −0.90 | −1.00 | −1.00 | −1.00 | −0.40 | – | −1.00 |
| 38 | Gwen | −0.91 | −1.00 | −1.00 | −1.00 | −0.45 | – | −1.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Fiora's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fiora's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fiora` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.74)

- **0.44** range: Sivir's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range). Fiora closes the gap with Lunge. (Sivir basic attacks → Fiora basic attacks)
- **0.42** spell shield: Spell Shield's spell shield blocks Fiora's Riposte. Spell shield for 1.5 s, long enough to use ahead of Riposte. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fiora W Riposte)
- Watch out: Riposte cuts Sivir's attack speed by 25% for 2 s.

#### 2. Kayle (net +0.39)

- **0.36** range: Kayle's basic attacks reach 475 units farther than Fiora's (625 vs 150 attack range). Fiora closes the gap with Lunge. (Kayle basic attacks → Fiora basic attacks)
- **0.12** invulnerable: Divine Judgment makes Kayle invulnerable to Fiora's Riposte (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Riposte. (Kayle R Divine Judgment → Fiora W Riposte)
- Watch out: Riposte cuts Kayle's attack speed by 25% for 2 s.

#### 3. Twitch (net +0.33)

- **0.43** range: Twitch's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range). Fiora closes the gap with Lunge. (Twitch basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Twitch's attack speed by 25% for 2 s.

#### 4. Kai'Sa (net +0.27)

- **0.36** range: Kai'Sa's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range). Fiora closes the gap with Lunge. (Kai'Sa basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Kai'Sa's attack speed by 25% for 2 s.

#### 5. Yunara (net +0.27)

- **0.36** range: Yunara's basic attacks reach 425 units farther than Fiora's (575 vs 150 attack range). Fiora closes the gap with Lunge. (Yunara basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Yunara's attack speed by 25% for 2 s.

#### 6. Kindred (net +0.17)

- **0.44** range: Kindred's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range). Fiora closes the gap with Lunge. (Kindred basic attacks → Fiora basic attacks)
- **0.11** invulnerable: Lamb's Respite makes Kindred invulnerable to Fiora's Riposte (its crowd control still applies). Invulnerable for ?; Riposte takes 0.28 s to land, enough to react. (Kindred R Lamb's Respite → Fiora W Riposte)
- Watch out: Riposte parries Kindred's Mounting Dread.

#### 7. Yuumi (net +0.15)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Fiora's Riposte. Untargetable for ?; Riposte takes 0.28 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fiora W Riposte)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Fiora's (425 vs 150 attack range). Fiora closes the gap with Lunge. (Yuumi basic attacks → Fiora basic attacks)
- Watch out: Riposte parries Yuumi's Final Chapter.

#### 8. Vladimir (net +0.14)

- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fiora's Riposte. Untargetable for 2 s, long enough to use ahead of Riposte. (Vladimir W Sanguine Pool → Fiora W Riposte)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Fiora's (450 vs 150 attack range). Fiora closes the gap with Lunge. (Vladimir basic attacks → Fiora basic attacks)
- Watch out: Riposte parries Vladimir's Hemoplague.

#### 9. Aurora (net +0.06)

- **0.29** range: Aurora's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range). Fiora closes the gap with Lunge. (Aurora basic attacks → Fiora basic attacks)
- **0.22** untargetable: Between Worlds makes Aurora untargetable, dodging Fiora's Riposte. Untargetable for 0.4 s; Riposte takes 0.28 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fiora W Riposte)
- Watch out: Riposte parries Aurora's Between Worlds.

#### 10. Teemo (net +0.03)

- **0.43** blind: Blinding Dart's blind makes Fiora's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Fiora basic attacks)
- **0.32** range: Teemo's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range). Fiora closes the gap with Lunge. (Teemo basic attacks → Fiora basic attacks)
- Watch out: Riposte parries Teemo's Noxious Trap.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.74 | 0.86 | 0.12 |  |
| 2 | Kayle | +0.39 | 0.48 | 0.09 |  |
| 3 | Twitch | +0.33 | 0.43 | 0.10 |  |
| 4 | Kai'Sa | +0.27 | 0.36 | 0.09 |  |
| 5 | Yunara | +0.27 | 0.36 | 0.09 |  |
| 6 | Kindred | +0.17 | 0.55 | 0.38 |  |
| 7 | Yuumi | +0.15 | 0.75 | 0.60 |  |
| 8 | Vladimir | +0.14 | 0.61 | 0.47 |  |
| 9 | Aurora | +0.06 | 0.51 | 0.45 |  |
| 10 | Teemo | +0.03 | 0.75 | 0.72 | blind (Blinding Dart) |
| 11 | Samira | +0.03 | 0.66 | 0.63 |  |
| 12 | Nidalee | +0.02 | 0.28 | 0.26 |  |
| 13 | Singed | 0.00 | 0.81 | 0.81 |  |
| 14 | Xayah | 0.00 | 0.58 | 0.58 |  |
| 15 | Twisted Fate | -0.01 | 0.40 | 0.41 |  |
| 16 | Master Yi | -0.03 | 0.50 | 0.53 |  |
| 17 | Kog'Maw | -0.07 | 0.25 | 0.32 |  |
| 18 | Nasus | -0.08 | 0.33 | 0.41 |  |
| 19 | Dr. Mundo | -0.08 | 0.00 | 0.08 |  |
| 20 | Milio | -0.10 | 0.59 | 0.69 |  |
| 21 | Tryndamere | -0.10 | 0.00 | 0.10 |  |
| 22 | Olaf | -0.12 | 0.23 | 0.35 |  |
| 23 | Udyr | -0.16 | 0.45 | 0.61 |  |
| 24 | Zeri | -0.16 | 0.44 | 0.60 |  |
| 25 | Elise | -0.17 | 0.74 | 0.91 |  |
| 26 | Miss Fortune | -0.17 | 0.32 | 0.49 |  |
| 27 | Gwen | -0.18 | 0.42 | 0.60 |  |
| 28 | Lulu | -0.20 | 0.66 | 0.86 |  |
| 29 | Malzahar | -0.21 | 0.60 | 0.81 |  |
| 30 | Jinx | -0.21 | 0.57 | 0.78 |  |
| 31 | Vex | -0.21 | 0.52 | 0.73 |  |
| 32 | Katarina | -0.22 | 0.28 | 0.50 |  |
| 33 | Quinn | -0.25 | 0.36 | 0.61 |  |
| 34 | Ezreal | -0.27 | 0.32 | 0.59 |  |
| 35 | Akshan | -0.28 | 0.32 | 0.60 |  |
| 36 | Mel | -0.29 | 0.62 | 0.91 |  |
| 37 | Vayne | -0.32 | 0.43 | 0.75 |  |
| 38 | Kalista | -0.34 | 0.47 | 0.81 |  |
| 39 | Gangplank | -0.34 | 0.36 | 0.70 |  |
| 40 | Morgana | -0.36 | 0.63 | 0.99 |  |
| 41 | Lucian | -0.36 | 0.34 | 0.70 |  |
| 42 | Zed | -0.36 | 0.22 | 0.58 |  |
| 43 | Varus | -0.38 | 0.55 | 0.93 |  |
| 44 | Jax | -0.40 | 0.51 | 0.91 |  |
| 45 | Smolder | -0.40 | 0.32 | 0.72 |  |
| 46 | Karthus | -0.40 | 0.18 | 0.58 |  |
| 47 | Taric | -0.40 | 0.11 | 0.51 |  |
| 48 | LeBlanc | -0.41 | 0.21 | 0.62 |  |
| 49 | Zilean | -0.42 | 0.32 | 0.74 |  |
| 50 | Shen | -0.45 | 0.48 | 0.93 |  |
| 51 | Rengar | -0.47 | 0.36 | 0.83 |  |
| 52 | Zoe | -0.47 | 0.32 | 0.79 |  |
| 53 | Nilah | -0.49 | 0.51 | 1.00 |  |
| 54 | Braum | -0.49 | 0.45 | 0.94 | projectile block (Unbreakable) |
| 55 | Jayce | -0.49 | 0.28 | 0.77 |  |
| 56 | Viktor | -0.50 | 0.57 | 1.07 |  |
| 57 | Yorick | -0.51 | 0.00 | 0.51 |  |
| 58 | Graves | -0.52 | 0.22 | 0.74 |  |
| 59 | Garen | -0.52 | 0.21 | 0.73 |  |
| 60 | Kha'Zix | -0.52 | 0.00 | 0.52 |  |
| 61 | Sion | -0.53 | 0.25 | 0.78 |  |
| 62 | Ryze | -0.53 | 0.24 | 0.77 |  |
| 63 | Veigar | -0.54 | 0.50 | 1.04 |  |
| 64 | Sona | -0.54 | 0.41 | 0.95 |  |
| 65 | Kennen | -0.54 | 0.29 | 0.83 |  |
| 66 | Bard | -0.55 | 0.57 | 1.12 |  |
| 67 | Ahri | -0.56 | 0.50 | 1.06 |  |
| 68 | Soraka | -0.56 | 0.27 | 0.83 |  |
| 69 | Lissandra | -0.57 | 0.54 | 1.11 |  |
| 70 | Vel'Koz | -0.57 | 0.25 | 0.82 |  |
| 71 | Caitlyn | -0.58 | 0.36 | 0.94 |  |
| 72 | Pantheon | -0.58 | 0.21 | 0.79 |  |
| 73 | Cassiopeia | -0.59 | 0.60 | 1.19 |  |
| 74 | Ashe | -0.59 | 0.36 | 0.95 |  |
| 75 | Illaoi | -0.59 | 0.00 | 0.59 |  |
| 76 | Rumble | -0.59 | 0.00 | 0.59 |  |
| 77 | Xerath | -0.60 | 0.25 | 0.85 |  |
| 78 | Locke | -0.60 | 0.00 | 0.60 |  |
| 79 | Hwei | -0.63 | 0.53 | 1.16 |  |
| 80 | Corki | -0.63 | 0.30 | 0.93 |  |
| 81 | Yasuo | -0.64 | 0.43 | 1.07 | projectile block (Wind Wall) |
| 82 | Draven | -0.64 | 0.36 | 1.00 |  |
| 83 | Lux | -0.64 | 0.29 | 0.93 |  |
| 84 | Kassadin | -0.65 | 0.00 | 0.65 |  |
| 85 | Warwick | -0.68 | 0.33 | 1.01 |  |
| 86 | Kayn | -0.68 | 0.23 | 0.91 |  |
| 87 | Karma | -0.68 | 0.21 | 0.89 |  |
| 88 | Ivern | -0.68 | 0.18 | 0.86 |  |
| 89 | Nocturne | -0.69 | 0.45 | 1.14 |  |
| 90 | Brand | -0.69 | 0.22 | 0.91 |  |
| 91 | Talon | -0.69 | 0.00 | 0.69 |  |
| 92 | Annie | -0.70 | 0.22 | 0.92 |  |
| 93 | Shaco | -0.72 | 0.23 | 0.95 |  |
| 94 | Janna | -0.76 | 0.36 | 1.12 |  |
| 95 | Poppy | -0.77 | 0.50 | 1.27 | dash stop (Steadfast Presence) |
| 96 | Tristana | -0.77 | 0.36 | 1.13 |  |
| 97 | Senna | -0.77 | 0.32 | 1.09 |  |
| 98 | Heimerdinger | -0.77 | 0.25 | 1.02 |  |
| 99 | Wukong | -0.77 | 0.00 | 0.77 |  |
| 100 | Renekton | -0.77 | 0.00 | 0.77 |  |
| 101 | Jhin | -0.80 | 0.27 | 1.07 |  |
| 102 | Aatrox | -0.80 | 0.00 | 0.80 |  |
| 103 | Aphelios | -0.81 | 0.43 | 1.24 |  |
| 104 | Mordekaiser | -0.81 | 0.08 | 0.89 |  |
| 105 | Swain | -0.82 | 0.20 | 1.02 |  |
| 106 | Orianna | -0.83 | 0.25 | 1.08 |  |
| 107 | Lillia | -0.83 | 0.10 | 0.93 |  |
| 108 | Bel'Veth | -0.83 | 0.00 | 0.83 |  |
| 109 | Ziggs | -0.84 | 0.27 | 1.11 |  |
| 110 | Azir | -0.85 | 0.25 | 1.10 |  |
| 111 | Aurelion Sol | -0.85 | 0.22 | 1.07 |  |
| 112 | Fiddlesticks | -0.85 | 0.18 | 1.03 |  |
| 113 | Syndra | -0.88 | 0.22 | 1.10 |  |
| 114 | Gnar | -0.89 | 0.31 | 1.20 |  |
| 115 | Rek'Sai | -0.90 | 0.23 | 1.13 |  |
| 116 | Ekko | -0.91 | 0.27 | 1.18 |  |
| 117 | Cho'Gath | -0.91 | 0.00 | 0.91 |  |
| 118 | Shyvana | -0.92 | 0.00 | 0.92 |  |
| 119 | Lee Sin | -0.93 | 0.00 | 0.93 |  |
| 120 | Renata Glasc | -0.94 | 0.38 | 1.32 |  |
| 121 | Anivia | -0.94 | 0.24 | 1.18 |  |
| 122 | Akali | -0.94 | 0.00 | 0.94 |  |
| 123 | Naafiri | -0.94 | 0.00 | 0.94 |  |
| 124 | Alistar | -0.97 | 0.19 | 1.16 |  |
| 125 | Seraphine | -0.98 | 0.27 | 1.25 |  |
| 126 | Zyra | -1.01 | 0.24 | 1.25 |  |
| 127 | Neeko | -1.01 | 0.22 | 1.23 |  |
| 128 | Camille | -1.02 | 0.23 | 1.25 |  |
| 129 | Thresh | -1.02 | 0.18 | 1.20 |  |
| 130 | Maokai | -1.03 | 0.45 | 1.48 |  |
| 131 | Riven | -1.03 | 0.00 | 1.03 |  |
| 132 | Sett | -1.04 | 0.00 | 1.04 |  |
| 133 | Skarner | -1.05 | 0.06 | 1.11 |  |
| 134 | Irelia | -1.05 | 0.00 | 1.05 |  |
| 135 | Sylas | -1.05 | 0.00 | 1.05 |  |
| 136 | Nunu & Willump | -1.06 | 0.14 | 1.20 |  |
| 137 | Nami | -1.07 | 0.22 | 1.29 |  |
| 138 | Malphite | -1.07 | 0.21 | 1.28 |  |
| 139 | Fizz | -1.07 | 0.00 | 1.07 |  |
| 140 | Trundle | -1.07 | 0.00 | 1.07 |  |
| 141 | Kled | -1.09 | 0.32 | 1.41 |  |
| 142 | Darius | -1.10 | 0.00 | 1.10 |  |
| 143 | Zaahen | -1.12 | 0.23 | 1.35 |  |
| 144 | Rammus | -1.13 | 0.32 | 1.45 |  |
| 145 | Ambessa | -1.13 | 0.00 | 1.13 |  |
| 146 | Zac | -1.14 | 0.34 | 1.48 |  |
| 147 | Diana | -1.14 | 0.00 | 1.14 |  |
| 148 | Hecarim | -1.14 | 0.00 | 1.14 |  |
| 149 | Blitzcrank | -1.17 | 0.00 | 1.17 |  |
| 150 | Evelynn | -1.20 | 0.23 | 1.43 |  |
| 151 | Xin Zhao | -1.22 | 0.11 | 1.33 |  |
| 152 | Urgot | -1.23 | 0.13 | 1.36 |  |
| 153 | Amumu | -1.24 | 0.17 | 1.41 |  |
| 154 | Galio | -1.24 | 0.00 | 1.24 |  |
| 155 | Rakan | -1.25 | 0.11 | 1.36 |  |
| 156 | Yone | -1.26 | 0.18 | 1.44 |  |
| 157 | Volibear | -1.26 | 0.00 | 1.26 |  |
| 158 | Nautilus | -1.28 | 0.00 | 1.28 |  |
| 159 | Taliyah | -1.33 | 0.25 | 1.58 |  |
| 160 | Pyke | -1.35 | 0.00 | 1.35 |  |
| 161 | Leona | -1.36 | 0.00 | 1.36 |  |
| 162 | Qiyana | -1.36 | 0.00 | 1.36 |  |
| 163 | Vi | -1.36 | 0.00 | 1.36 |  |
| 164 | Tahm Kench | -1.40 | 0.00 | 1.40 |  |
| 165 | Gragas | -1.42 | 0.00 | 1.42 |  |
| 166 | Jarvan IV | -1.42 | 0.00 | 1.42 |  |
| 167 | Sejuani | -1.53 | 0.00 | 1.53 |  |
| 168 | Viego | -1.53 | 0.00 | 1.53 |  |
| 169 | Briar | -1.55 | 0.00 | 1.55 |  |
| 170 | Rell | -1.59 | 0.00 | 1.59 |  |
| 171 | Ornn | -1.64 | 0.00 | 1.64 |  |
| 172 | K'Sante | -1.69 | 0.00 | 1.69 |  |
