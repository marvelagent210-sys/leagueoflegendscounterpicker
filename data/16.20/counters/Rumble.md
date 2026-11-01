# Counters to Rumble (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Rumble: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Rumble wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Rumble --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.88 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +1.00 |
| 2 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.12 | – | +1.00 |
| 3 | Nasus | +0.85 | +1.00 | +1.00 | +1.00 | +0.08 | – | +1.00 |
| 4 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | +0.01 | – | +1.00 |
| 5 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | – | +1.00 |
| 6 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | −0.09 | – | +1.00 |
| 7 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 8 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 9 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.00 |
| 10 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 11 | Ashe | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 12 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 13 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 14 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 15 | Lulu | +0.81 | +1.00 | +1.00 | +1.00 | +0.11 | +0.92 | +0.00 |
| 16 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 17 | Diana | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 18 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 19 | Samira | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | +0.91 | +0.00 |
| 20 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 21 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 22 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 23 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 24 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 25 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 26 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 27 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 28 | Xin Zhao | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 29 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 30 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 31 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 32 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 33 | Alistar | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 34 | Leona | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 35 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 36 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 37 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 38 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 39 | Morgana | +0.77 | +0.95 | +0.95 | +0.89 | +0.16 | +0.94 | +0.00 |
| 40 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 41 | Ezreal | +0.76 | +0.94 | +0.94 | +0.89 | +0.10 | +1.00 | +0.00 |
| 42 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 43 | Illaoi | +0.75 | +0.85 | +0.99 | +1.00 | +0.12 | – | +0.00 |
| 44 | Mordekaiser | +0.74 | +1.00 | +1.00 | +0.83 | +0.01 | – | +0.00 |
| 45 | Sett | +0.72 | +0.78 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 46 | Xayah | +0.72 | +1.00 | +0.60 | +1.00 | +0.13 | +1.00 | +0.00 |
| 47 | Renekton | +0.68 | +1.00 | +0.65 | +1.00 | +0.02 | – | +0.00 |
| 48 | Quinn | +0.66 | +0.62 | +1.00 | +1.00 | +0.00 | +0.59 | +0.00 |
| 49 | Irelia | +0.64 | +0.93 | +0.52 | +1.00 | +0.07 | – | +0.00 |
| 50 | Kennen | +0.61 | +1.00 | +0.21 | +1.00 | +0.06 | +1.00 | +0.00 |
| 51 | Gragas | +0.60 | +1.00 | +1.00 | +1.00 | +0.02 | −1.00 | +0.00 |
| 52 | Gnar | +0.53 | +0.84 | +0.84 | +0.11 | +0.16 | +0.67 | +0.00 |
| 53 | Sion | +0.51 | +0.85 | +1.00 | +0.00 | +0.00 | – | +0.00 |
| 54 | Rakan | +0.46 | +1.00 | −0.40 | +1.00 | +0.08 | +1.00 | +0.00 |
| 55 | Twisted Fate | +0.43 | +1.00 | +1.00 | −0.88 | +0.07 | +1.00 | +0.00 |
| 56 | Kayle | +0.43 | +1.00 | +1.00 | −1.00 | +0.19 | +1.00 | +0.00 |
| 57 | Rengar | +0.42 | +1.00 | +1.00 | −0.92 | +0.40 | – | +0.00 |
| 58 | Nocturne | +0.37 | +1.00 | +1.00 | −0.83 | −0.00 | – | +0.00 |
| 59 | Jarvan IV | +0.36 | +1.00 | +1.00 | −1.00 | +0.15 | – | +0.00 |
| 60 | Udyr | +0.34 | +1.00 | +1.00 | −0.93 | −0.07 | – | +0.00 |
| 61 | Kassadin | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 62 | Vi | +0.34 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 63 | Tahm Kench | +0.30 | +0.47 | +0.47 | +0.12 | +0.10 | – | +0.00 |
| 64 | Aatrox | +0.28 | +1.00 | +0.71 | −0.89 | +0.00 | – | +0.00 |
| 65 | Karma | +0.25 | −0.06 | −0.14 | +1.00 | +0.08 | +0.86 | +0.00 |
| 66 | Smolder | +0.24 | +1.00 | +1.00 | −0.94 | +0.11 | −0.91 | +0.00 |
| 67 | Anivia | +0.18 | +0.02 | +0.04 | +0.79 | −0.08 | +0.19 | +0.00 |
| 68 | Lucian | +0.12 | −0.12 | +1.00 | −1.00 | +0.03 | +1.00 | +0.00 |
| 69 | Olaf | +0.12 | +0.63 | +0.61 | −1.00 | −0.02 | – | +0.00 |
| 70 | Braum | +0.10 | +0.59 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 71 | Orianna | +0.03 | −0.95 | +0.43 | +1.00 | +0.07 | −0.50 | +0.00 |
| 72 | Wukong | −0.01 | +1.00 | −1.00 | +0.00 | −0.05 | – | +0.00 |
| 73 | Tristana | −0.10 | +0.07 | +0.07 | −1.00 | −0.00 | +0.65 | +0.00 |
| 74 | Zeri | −0.11 | −0.45 | +1.00 | −1.00 | +0.01 | −0.45 | +0.00 |
| 75 | Ornn | −0.14 | −0.65 | +0.88 | −1.00 | +0.10 | – | +0.00 |
| 76 | Graves | −0.17 | +1.00 | −0.83 | −0.86 | +0.01 | −0.43 | +0.00 |
| 77 | Fizz | −0.18 | +1.00 | −0.95 | −0.91 | +0.02 | – | +0.00 |
| 78 | Pantheon | −0.21 | −0.54 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 79 | Sivir | −0.23 | −0.04 | −0.08 | −0.74 | +0.03 | −0.58 | +0.00 |
| 80 | Heimerdinger | −0.24 | −1.00 | −1.00 | +1.00 | +0.09 | +0.49 | +0.00 |
| 81 | Hwei | −0.37 | −1.00 | −1.00 | +1.00 | +0.07 | −0.82 | +0.00 |
| 82 | Lux | −0.40 | −1.00 | −1.00 | −0.05 | +0.14 | +0.87 | +0.00 |
| 83 | Kindred | −0.43 | −1.00 | +0.42 | −1.00 | +0.09 | −1.00 | +0.00 |
| 84 | Neeko | −0.45 | −0.92 | −0.71 | −0.07 | +0.07 | −0.34 | +0.00 |
| 85 | Annie | −0.47 | −0.87 | −0.98 | +0.01 | +0.13 | −0.26 | +0.00 |
| 86 | Aurora | −0.49 | −0.66 | −0.88 | −0.63 | +0.09 | +0.08 | +0.00 |
| 87 | Zed | −0.50 | +0.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 88 | Jhin | −0.53 | −0.52 | −0.52 | −1.00 | +0.15 | −0.99 | +0.00 |
| 89 | Skarner | −0.54 | −1.00 | −1.00 | +0.00 | +0.12 | – | +0.00 |
| 90 | Rell | −0.58 | −1.00 | −0.98 | −1.00 | +0.10 | +1.00 | +0.00 |
| 91 | Ziggs | −0.60 | −0.32 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 92 | Kalista | −0.62 | −0.84 | −0.84 | −0.69 | +0.04 | −0.71 | +0.00 |
| 93 | Draven | −0.71 | −1.00 | −1.00 | −1.00 | +0.06 | −0.18 | +0.00 |
| 94 | Janna | −0.71 | −0.92 | −0.88 | −1.00 | +0.13 | −0.82 | +0.00 |
| 95 | Urgot | −0.73 | −0.88 | −0.88 | −1.00 | +0.07 | −1.00 | +0.00 |
| 96 | Twitch | −0.73 | −0.98 | −1.00 | −1.00 | +0.15 | −0.56 | +0.00 |
| 97 | Ekko | −0.73 | −0.75 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 98 | Galio | −0.74 | −1.00 | −0.94 | −1.00 | +0.14 | – | +0.00 |
| 99 | Varus | −0.75 | −1.00 | −1.00 | −1.00 | +0.07 | −0.60 | +0.00 |
| 100 | Swain | −0.75 | −0.96 | −0.92 | −1.00 | +0.08 | −0.96 | +0.00 |
| 101 | Jinx | −0.75 | −0.99 | −0.99 | −1.00 | +0.10 | −0.73 | +0.00 |
| 102 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 103 | Vel'Koz | −0.76 | −0.99 | −0.99 | −1.00 | +0.16 | −0.92 | +0.00 |
| 104 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 105 | Akshan | −0.77 | −0.95 | −0.95 | −1.00 | +0.06 | −1.00 | +0.00 |
| 106 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 107 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 108 | Viktor | −0.77 | −1.00 | −0.95 | −1.00 | +0.06 | −0.93 | +0.00 |
| 109 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 110 | Kai'Sa | −0.77 | −0.96 | −0.96 | −1.00 | +0.04 | −1.00 | +0.00 |
| 111 | Amumu | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 112 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 113 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 114 | Rammus | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 115 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 116 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 117 | Akali | −0.78 | −1.00 | −1.00 | −0.99 | −0.04 | – | +0.00 |
| 118 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 119 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 120 | Caitlyn | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 121 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 122 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 123 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 124 | Brand | −0.79 | −1.00 | −1.00 | −0.96 | +0.02 | −0.99 | +0.00 |
| 125 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 126 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 127 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 128 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 129 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 130 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 131 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 132 | Syndra | −0.79 | −1.00 | −0.99 | −1.00 | +0.05 | −1.00 | +0.00 |
| 133 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 134 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 135 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 136 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −0.99 | +0.00 |
| 137 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 138 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 139 | Vex | −0.80 | −1.00 | −1.00 | −0.98 | −0.00 | −1.00 | +0.00 |
| 140 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 141 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 142 | Soraka | −0.80 | −1.00 | −1.00 | −0.99 | +0.00 | −1.00 | +0.00 |
| 143 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 144 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Rumble's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rumble's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rumble` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Bard (net +1.27)

- **0.72** range: Bard's basic attacks reach 375 units farther than Rumble's (500 vs 125 attack range). Rumble has no dash or blink to close the gap. (Bard basic attacks → Rumble basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Rumble's The Equalizer. Untargetable for 2.5 s, long enough to use ahead of The Equalizer. (Bard R Tempered Fate → Rumble R The Equalizer)

#### 2. Xayah (net +1.25)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Rumble's (525 vs 125 attack range). Rumble has no dash or blink to close the gap. (Xayah basic attacks → Rumble basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Rumble's The Equalizer. Untargetable for 1.5 s, long enough to use ahead of The Equalizer. (Xayah R Featherstorm → Rumble R The Equalizer)

#### 3. Yuumi (net +1.19)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Rumble's (425 vs 125 attack range). Rumble has no dash or blink to close the gap. (Yuumi basic attacks → Rumble basic attacks)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Rumble's The Equalizer. Untargetable for ?; The Equalizer takes 1.65 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rumble R The Equalizer)

#### 4. Aurora (net +1.06)

- **0.58** range: Aurora's basic attacks reach 425 units farther than Rumble's (550 vs 125 attack range). Rumble has no dash or blink to close the gap. (Aurora basic attacks → Rumble basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Rumble's The Equalizer. Untargetable for 0.4 s; The Equalizer takes 1.65 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Rumble R The Equalizer)

#### 5. Teemo (net +1.06)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Rumble's (500 vs 125 attack range). Rumble has no dash or blink to close the gap. (Teemo basic attacks → Rumble basic attacks)
- **0.38** blind: Blinding Dart's blind makes Rumble's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Rumble basic attacks)

#### 6. Kayle (net +1.00)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Rumble's (625 vs 125 attack range). Rumble has no dash or blink to close the gap. (Kayle basic attacks → Rumble basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Rumble's The Equalizer (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of The Equalizer. (Kayle R Divine Judgment → Rumble R The Equalizer)

#### 7. Lissandra (net +0.99)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rumble's The Equalizer. Untargetable for 2.5 s, long enough to use ahead of The Equalizer. (Lissandra R Frozen Tomb → Rumble R The Equalizer)
- **0.44** range: Lissandra's basic attacks reach 425 units farther than Rumble's (550 vs 125 attack range). Rumble has no dash or blink to close the gap. (Lissandra basic attacks → Rumble basic attacks)

#### 8. Lulu (net +0.99)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Rumble's (550 vs 125 attack range). Rumble has no dash or blink to close the gap. (Lulu basic attacks → Rumble basic attacks)
- **0.27** disarm: Whimsy disarms Rumble for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Rumble basic attacks)

#### 9. Kindred (net +0.94)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Rumble's (500 vs 125 attack range). Rumble has no dash or blink to close the gap. (Kindred basic attacks → Rumble basic attacks)

#### 10. Sivir (net +0.94)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Rumble's (500 vs 125 attack range). Rumble has no dash or blink to close the gap. (Sivir basic attacks → Rumble basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Bard | +1.27 | 1.27 | 0.00 | range (attacks) |
| 2 | Xayah | +1.25 | 1.25 | 0.00 | range (attacks) |
| 3 | Yuumi | +1.19 | 1.19 | 0.00 | range (attacks) |
| 4 | Aurora | +1.06 | 1.06 | 0.00 | range (attacks) |
| 5 | Teemo | +1.06 | 1.06 | 0.00 | range (attacks) |
| 6 | Kayle | +1.00 | 1.00 | 0.00 | range (attacks) |
| 7 | Lissandra | +0.99 | 0.99 | 0.00 |  |
| 8 | Lulu | +0.99 | 0.99 | 0.00 | range (attacks) |
| 9 | Kindred | +0.94 | 0.94 | 0.00 | range (attacks) |
| 10 | Sivir | +0.94 | 0.94 | 0.00 | range (attacks) |
| 11 | Vladimir | +0.91 | 0.91 | 0.00 |  |
| 12 | Milio | +0.88 | 0.88 | 0.00 | range (attacks) |
| 13 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 14 | Aphelios | +0.86 | 0.86 | 0.00 | range (attacks) |
| 15 | Samira | +0.86 | 0.86 | 0.00 | range (attacks) |
| 16 | Twisted Fate | +0.86 | 0.86 | 0.00 | range (attacks) |
| 17 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 18 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 19 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 20 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 21 | Mel | +0.77 | 0.77 | 0.00 | range (attacks) |
| 22 | Quinn | +0.77 | 0.77 | 0.00 | range (attacks) |
| 23 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 24 | Kalista | +0.76 | 0.76 | 0.00 | range (attacks) |
| 25 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 26 | Caitlyn | +0.72 | 0.72 | 0.00 | range (attacks) |
| 27 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 28 | Janna | +0.72 | 0.72 | 0.00 | range (attacks) |
| 29 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 30 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 31 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 32 | Master Yi | +0.71 | 0.71 | 0.00 |  |
| 33 | Akshan | +0.68 | 0.68 | 0.00 | range (attacks) |
| 34 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 35 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 36 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 37 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 38 | Miss Fortune | +0.65 | 0.65 | 0.00 | range (attacks) |
| 39 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 40 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 42 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 44 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 45 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 46 | Fiora | +0.59 | 0.59 | 0.00 |  |
| 47 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 48 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 49 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 50 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 51 | Morgana | +0.57 | 0.57 | 0.00 |  |
| 52 | Evelynn | +0.55 | 0.55 | 0.00 |  |
| 53 | Fizz | +0.55 | 0.55 | 0.00 |  |
| 54 | Gwen | +0.55 | 0.55 | 0.00 |  |
| 55 | Kayn | +0.55 | 0.55 | 0.00 |  |
| 56 | Maokai | +0.55 | 0.55 | 0.00 |  |
| 57 | Rek'Sai | +0.55 | 0.55 | 0.00 |  |
| 58 | Shaco | +0.55 | 0.55 | 0.00 |  |
| 59 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 60 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 61 | Jhin | +0.53 | 0.53 | 0.00 | range (attacks) |
| 62 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 63 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 64 | Taliyah | +0.53 | 0.53 | 0.00 | range (attacks) |
| 65 | Varus | +0.53 | 0.53 | 0.00 | range (attacks) |
| 66 | Vel'Koz | +0.53 | 0.53 | 0.00 | range (attacks) |
| 67 | Vex | +0.53 | 0.53 | 0.00 | range (attacks) |
| 68 | Xerath | +0.53 | 0.53 | 0.00 | range (attacks) |
| 69 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 70 | Nilah | +0.52 | 0.52 | 0.00 |  |
| 71 | Camille | +0.51 | 0.51 | 0.00 |  |
| 72 | Malzahar | +0.51 | 0.51 | 0.00 |  |
| 73 | Graves | +0.49 | 0.49 | 0.00 |  |
| 74 | Heimerdinger | +0.49 | 0.49 | 0.00 |  |
| 75 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 76 | Ryze | +0.48 | 0.48 | 0.00 |  |
| 77 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 78 | Zed | +0.48 | 0.48 | 0.00 |  |
| 79 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 80 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 81 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 82 | Annie | +0.44 | 0.44 | 0.00 |  |
| 83 | Aurelion Sol | +0.44 | 0.44 | 0.00 |  |
| 84 | Brand | +0.44 | 0.44 | 0.00 |  |
| 85 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 86 | Karma | +0.44 | 0.44 | 0.00 |  |
| 87 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 88 | Nami | +0.44 | 0.44 | 0.00 |  |
| 89 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 90 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 91 | Swain | +0.42 | 0.42 | 0.00 |  |
| 92 | Kled | +0.41 | 0.41 | 0.00 |  |
| 93 | Fiddlesticks | +0.39 | 0.39 | 0.00 |  |
| 94 | Karthus | +0.39 | 0.39 | 0.00 |  |
| 95 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 96 | Braum | +0.38 | 0.38 | 0.00 |  |
| 97 | Ivern | +0.38 | 0.38 | 0.00 |  |
| 98 | Jax | +0.31 | 0.31 | 0.00 |  |
| 99 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 100 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 101 | Rammus | +0.29 | 0.29 | 0.00 |  |
| 102 | Shen | +0.29 | 0.29 | 0.00 |  |
| 103 | Pantheon | +0.28 | 0.28 | 0.00 |  |
| 104 | Yasuo | +0.28 | 0.28 | 0.00 |  |
| 105 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 106 | Xin Zhao | +0.24 | 0.24 | 0.00 |  |
| 107 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 108 | Garen | +0.21 | 0.21 | 0.00 |  |
| 109 | Nunu & Willump | +0.20 | 0.20 | 0.00 |  |
| 110 | Udyr | +0.20 | 0.20 | 0.00 |  |
| 111 | Malphite | +0.19 | 0.19 | 0.00 |  |
| 112 | Viego | +0.19 | 0.19 | 0.00 |  |
| 113 | Olaf | +0.17 | 0.17 | 0.00 |  |
| 114 | Sion | +0.17 | 0.17 | 0.00 |  |
| 115 | Warwick | +0.17 | 0.17 | 0.00 |  |
| 116 | Zaahen | +0.17 | 0.17 | 0.00 |  |
| 117 | Rengar | +0.15 | 0.15 | 0.00 |  |
| 118 | Gangplank | +0.14 | 0.14 | 0.00 |  |
| 119 | Alistar | +0.13 | 0.13 | 0.00 |  |
| 120 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 121 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 122 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 123 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 124 | Akali | 0.00 | 0.00 | 0.00 |  |
| 125 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 126 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 127 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 128 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 129 | Briar | 0.00 | 0.00 | 0.00 |  |
| 130 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 131 | Darius | 0.00 | 0.00 | 0.00 |  |
| 132 | Diana | 0.00 | 0.00 | 0.00 |  |
| 133 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 134 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 135 | Galio | 0.00 | 0.00 | 0.00 |  |
| 136 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 137 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 138 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 139 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 140 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 141 | Katarina | 0.00 | 0.00 | 0.00 |  |
| 142 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 143 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 144 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 145 | Leona | 0.00 | 0.00 | 0.00 |  |
| 146 | Locke | 0.00 | 0.00 | 0.00 |  |
| 147 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 148 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 149 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 150 | Nocturne | 0.00 | 0.00 | 0.00 |  |
| 151 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 152 | Poppy | 0.00 | 0.00 | 0.00 |  |
| 153 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 154 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 155 | Rell | 0.00 | 0.00 | 0.00 |  |
| 156 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 157 | Riven | 0.00 | 0.00 | 0.00 |  |
| 158 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 159 | Sett | 0.00 | 0.00 | 0.00 |  |
| 160 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 161 | Singed | 0.00 | 0.00 | 0.00 |  |
| 162 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 163 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 164 | Talon | 0.00 | 0.00 | 0.00 |  |
| 165 | Taric | 0.00 | 0.00 | 0.00 |  |
| 166 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 167 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 168 | Vi | 0.00 | 0.00 | 0.00 |  |
| 169 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 170 | Yone | 0.00 | 0.00 | 0.00 |  |
| 171 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 172 | Zac | 0.00 | 0.00 | 0.00 |  |
