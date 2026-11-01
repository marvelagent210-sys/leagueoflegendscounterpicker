# Counters to Karma (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Karma: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Karma wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Karma --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +1.00 |
| 2 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 3 | Aphelios | +0.80 | +0.98 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 4 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 5 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 6 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 7 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 8 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 9 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 10 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 11 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 12 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 13 | Annie | +0.77 | +0.98 | +1.00 | +0.89 | +0.01 | +1.00 | +0.00 |
| 14 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 15 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 16 | Yasuo | +0.75 | +0.91 | +0.99 | +0.94 | −0.05 | +0.91 | +0.00 |
| 17 | Twisted Fate | +0.72 | +0.99 | +0.83 | +1.00 | −0.04 | – | +0.00 |
| 18 | Tristana | +0.70 | +0.88 | +0.87 | +0.75 | +0.05 | +1.00 | +0.00 |
| 19 | Jhin | +0.67 | +1.00 | +0.62 | +1.00 | −0.00 | – | +0.00 |
| 20 | Jayce | +0.63 | +1.00 | +0.95 | +1.00 | +0.02 | −0.61 | +0.00 |
| 21 | Smolder | +0.60 | +0.33 | +0.98 | +1.00 | +0.08 | – | +0.00 |
| 22 | Aurora | +0.58 | +1.00 | +0.47 | +0.78 | +0.02 | – | +0.00 |
| 23 | Senna | +0.51 | +0.88 | +0.81 | +0.16 | +0.01 | – | +0.00 |
| 24 | Xayah | +0.48 | +0.86 | +0.88 | +0.00 | −0.00 | – | +0.00 |
| 25 | Vel'Koz | +0.43 | −0.13 | +0.74 | +1.00 | +0.25 | – | +0.00 |
| 26 | Olaf | +0.42 | +0.39 | +0.27 | +1.00 | −0.03 | +0.61 | +0.00 |
| 27 | Gangplank | +0.41 | +1.00 | +1.00 | −0.83 | +0.13 | +0.49 | +0.24 |
| 28 | Lucian | +0.41 | −0.33 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 29 | Nasus | +0.37 | +0.59 | +0.12 | +1.00 | −0.09 | +0.09 | +0.00 |
| 30 | Dr. Mundo | +0.36 | +0.39 | +0.60 | +0.46 | −0.07 | +0.32 | +0.00 |
| 31 | Cassiopeia | +0.36 | −0.47 | +1.00 | +0.95 | +0.01 | – | +0.00 |
| 32 | Akshan | +0.28 | +1.00 | −0.79 | +1.00 | −0.04 | – | +0.00 |
| 33 | Teemo | +0.26 | +0.79 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 34 | Miss Fortune | +0.24 | +0.77 | +0.10 | +0.00 | +0.01 | – | +0.00 |
| 35 | Poppy | +0.16 | +1.00 | −0.91 | +1.00 | +0.26 | −0.97 | +0.00 |
| 36 | Ezreal | +0.12 | +0.17 | +0.70 | −0.53 | +0.01 | – | +0.00 |
| 37 | Riven | +0.12 | +1.00 | −1.00 | +1.00 | −0.06 | −0.71 | +0.00 |
| 38 | Ziggs | +0.10 | −0.23 | +0.46 | +0.08 | +0.12 | – | +0.00 |
| 39 | Rengar | +0.06 | +1.00 | −0.23 | −1.00 | +0.09 | +0.54 | +0.00 |
| 40 | Gragas | +0.03 | +0.39 | −0.10 | −0.05 | −0.07 | −0.19 | +0.00 |
| 41 | Tahm Kench | +0.01 | −0.07 | +0.06 | −0.06 | +0.14 | +0.03 | +0.00 |
| 42 | Anivia | −0.01 | +0.04 | +0.04 | −0.03 | −0.13 | – | +0.00 |
| 43 | Sion | −0.04 | −0.22 | −0.21 | −0.26 | +0.09 | +1.00 | +0.00 |
| 44 | Galio | −0.06 | −0.04 | −0.06 | −0.11 | +0.00 | −0.14 | +0.00 |
| 45 | Maokai | −0.08 | −0.03 | −0.14 | −0.12 | −0.01 | −0.11 | +0.00 |
| 46 | Zoe | −0.10 | −0.11 | −0.10 | −0.18 | −0.02 | – | +0.00 |
| 47 | Mordekaiser | −0.11 | −0.07 | −0.11 | −0.18 | −0.12 | −0.11 | +0.00 |
| 48 | Draven | −0.13 | +0.36 | −0.00 | −1.00 | −0.02 | – | +0.00 |
| 49 | Gwen | −0.13 | −0.07 | −0.91 | +0.20 | −0.16 | +1.00 | +0.00 |
| 50 | Quinn | −0.14 | −0.31 | −0.15 | −0.05 | −0.01 | – | +0.00 |
| 51 | Varus | −0.16 | −0.80 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 52 | Taric | −0.17 | −0.20 | −0.23 | −0.20 | −0.04 | −0.19 | +0.00 |
| 53 | Ornn | −0.20 | −0.26 | −0.22 | −0.24 | −0.05 | −0.26 | +0.00 |
| 54 | Urgot | −0.21 | −0.27 | −0.24 | −0.25 | −0.04 | −0.23 | +0.00 |
| 55 | Karthus | −0.22 | −0.27 | −0.25 | −0.32 | −0.02 | – | +0.00 |
| 56 | Zyra | −0.23 | +0.95 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 57 | Shen | −0.24 | −0.37 | −0.42 | −0.03 | −0.02 | −0.36 | +0.00 |
| 58 | Rumble | −0.25 | +0.14 | +0.06 | −1.00 | −0.08 | −0.86 | +0.00 |
| 59 | Kalista | −0.27 | −0.19 | −0.06 | −0.83 | −0.10 | – | +0.00 |
| 60 | Kled | −0.27 | −0.22 | −0.11 | −0.59 | +0.06 | −0.79 | +0.00 |
| 61 | Trundle | −0.29 | −0.86 | −0.72 | +1.00 | −0.08 | −0.84 | +0.00 |
| 62 | Kindred | −0.32 | −0.92 | −1.00 | +1.00 | −0.05 | – | +0.00 |
| 63 | Samira | −0.34 | −1.00 | −1.00 | +1.00 | −0.04 | – | +0.00 |
| 64 | Twitch | −0.34 | −0.06 | −0.39 | −1.00 | +0.03 | – | +0.00 |
| 65 | Hwei | −0.34 | −0.09 | −0.73 | −0.53 | +0.00 | – | +0.00 |
| 66 | Malzahar | −0.35 | −0.25 | −0.20 | −1.00 | −0.02 | – | +0.00 |
| 67 | Malphite | −0.35 | −0.47 | −0.62 | −0.30 | +0.27 | −0.61 | +0.00 |
| 68 | Kennen | −0.36 | −0.99 | −0.94 | +0.87 | −0.09 | – | +0.00 |
| 69 | Braum | −0.36 | −0.41 | −0.42 | −0.27 | −0.04 | −0.97 | +0.00 |
| 70 | Renekton | −0.49 | −0.95 | −0.43 | −0.19 | −0.07 | −0.95 | +0.00 |
| 71 | Gnar | −0.52 | −0.95 | +0.03 | −0.98 | −0.02 | −0.88 | +0.00 |
| 72 | Syndra | −0.53 | −0.43 | −0.67 | −1.00 | +0.00 | – | +0.00 |
| 73 | Sett | −0.53 | −0.82 | −0.51 | −0.64 | −0.03 | −0.69 | +0.00 |
| 74 | Kassadin | −0.55 | −1.00 | −0.80 | −1.00 | +0.01 | +1.00 | +0.00 |
| 75 | Udyr | −0.57 | −0.93 | −0.23 | −0.96 | −0.07 | −0.72 | +0.00 |
| 76 | Master Yi | −0.58 | −0.98 | −1.00 | +0.01 | +0.03 | −0.92 | +0.00 |
| 77 | Jax | −0.58 | −1.00 | −0.13 | −1.00 | +0.01 | −1.00 | +0.00 |
| 78 | Vi | −0.59 | −1.00 | −0.17 | −1.00 | +0.03 | −1.00 | +0.00 |
| 79 | Ryze | −0.61 | −0.68 | −0.74 | −1.00 | +0.04 | – | +0.00 |
| 80 | Jinx | −0.65 | −0.93 | −0.60 | −1.00 | −0.02 | – | +0.00 |
| 81 | Nocturne | −0.65 | −0.90 | −0.69 | −1.00 | −0.10 | −0.41 | +0.00 |
| 82 | Diana | −0.67 | −0.94 | −0.64 | −0.94 | +0.10 | −0.95 | +0.00 |
| 83 | Neeko | −0.67 | −0.90 | −0.74 | −1.00 | +0.02 | – | +0.00 |
| 84 | Akali | −0.68 | −0.74 | −0.87 | −0.96 | −0.01 | −0.82 | +0.00 |
| 85 | Graves | −0.72 | −1.00 | −1.00 | −0.72 | +0.07 | −0.85 | +0.00 |
| 86 | Kai'Sa | −0.72 | −0.82 | −0.98 | −1.00 | −0.01 | – | +0.00 |
| 87 | Nautilus | −0.73 | −0.78 | −1.00 | −1.00 | +0.08 | −0.99 | +0.00 |
| 88 | Sona | −0.74 | −0.92 | −0.93 | −1.00 | −0.01 | – | +0.00 |
| 89 | Nunu & Willump | −0.75 | −1.00 | −1.00 | −0.70 | −0.08 | −1.00 | +0.00 |
| 90 | Janna | −0.76 | −0.92 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 91 | Garen | −0.76 | −0.80 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 92 | Zaahen | −0.76 | −0.98 | −0.97 | −0.88 | +0.03 | −0.99 | +0.00 |
| 93 | Warwick | −0.76 | −1.00 | −1.00 | −1.00 | +0.26 | −1.00 | +0.00 |
| 94 | Brand | −0.76 | −0.95 | −0.98 | −1.00 | −0.02 | – | +0.00 |
| 95 | Lee Sin | −0.76 | −0.82 | −0.99 | −1.00 | −0.07 | −1.00 | +0.00 |
| 96 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 97 | Lux | −0.77 | −1.00 | −0.99 | −1.00 | +0.04 | – | +0.00 |
| 98 | Ahri | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 99 | Irelia | −0.77 | −0.95 | −0.96 | −1.00 | +0.02 | −0.96 | +0.00 |
| 100 | Skarner | −0.77 | −0.96 | −0.97 | −1.00 | +0.08 | −1.00 | +0.00 |
| 101 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 102 | Xin Zhao | −0.78 | −0.99 | −0.99 | −1.00 | +0.12 | −1.00 | +0.00 |
| 103 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 104 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 105 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 106 | Morgana | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 107 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 108 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 109 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 110 | Rammus | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 111 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 112 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 113 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 114 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 115 | Evelynn | −0.79 | −1.00 | −0.96 | −1.00 | +0.03 | −1.00 | +0.00 |
| 116 | Darius | −0.79 | −0.95 | −1.00 | −0.94 | −0.08 | −0.98 | +0.00 |
| 117 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 118 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 119 | Camille | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 120 | Alistar | −0.79 | −1.00 | −0.98 | −1.00 | +0.02 | −1.00 | +0.00 |
| 121 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 122 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 123 | Cho'Gath | −0.80 | −0.97 | −0.97 | −1.00 | −0.10 | −1.00 | +0.00 |
| 124 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 125 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 126 | Vladimir | −0.80 | −1.00 | −0.99 | −1.00 | −0.17 | – | +0.00 |
| 127 | Rakan | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 128 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 129 | Volibear | −0.80 | −0.99 | −1.00 | −1.00 | −0.06 | −0.96 | +0.00 |
| 130 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 131 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 132 | Illaoi | −0.81 | −0.99 | −0.99 | −1.00 | −0.09 | −1.00 | +0.00 |
| 133 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 134 | Yone | −0.81 | −0.98 | −0.98 | −1.00 | −0.13 | −1.00 | +0.00 |
| 135 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 136 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 137 | Ekko | −0.81 | −1.00 | −0.99 | −1.00 | −0.11 | −0.99 | +0.00 |
| 138 | Zed | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 139 | Aatrox | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 140 | Sejuani | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 141 | Wukong | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 142 | Tryndamere | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 143 | Ambessa | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 144 | Singed | −0.84 | −0.98 | −1.00 | −0.96 | −0.37 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Karma's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Karma's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Karma` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yuumi (net +0.88)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Karma's Renewal. Untargetable for ?, timed to Renewal. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Karma W Renewal)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Karma's Focused Resolve. Untargetable for ?; Focused Resolve takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Karma W Focused Resolve)
- Watch out: Karma's basic attacks reach 100 units farther than Yuumi's (525 vs 425 attack range).

#### 2. Fizz (net +0.83)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Karma's Renewal. Untargetable for 0.75 s, timed to Renewal. (Fizz E Playful → Karma W Renewal)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Karma's Focused Resolve. Untargetable for 0.75 s; Focused Resolve takes 0.25 s to land, enough to react. (Fizz E Playful → Karma W Focused Resolve)
- Watch out: Karma's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 3. Udyr (net +0.74)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Karma's Renewal (root). Immune for 1.5 s, long enough to use ahead of Renewal. (Udyr E Blazing Stampede → Karma W Renewal)
- **0.45** cc immunity: Blazing Stampede makes Udyr immune to Karma's Focused Resolve (root). Immune for 1.5 s, long enough to use ahead of Focused Resolve. (Udyr E Blazing Stampede → Karma W Focused Resolve)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Karma's Soulflare (slow). Immune for 1.5 s, long enough to use ahead of Soulflare. (Udyr E Blazing Stampede → Karma Q Soulflare)
- Watch out: Karma's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range).

#### 4. Maokai (net +0.71)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Karma's Renewal. Untargetable for 1.4 s, timed to Renewal. (Maokai W Twisted Advance → Karma W Renewal)
- **0.45** untargetable: Twisted Advance makes Maokai untargetable, dodging Karma's Focused Resolve. Untargetable for 1.4 s; Focused Resolve takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Karma W Focused Resolve)
- Watch out: Karma's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

#### 5. Fiora (net +0.68)

- **0.64** parry: Riposte parries Karma's Renewal and stuns back. Parry for 0.75 s, timed to Renewal. Negating Renewal's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Karma W Renewal)
- **0.48** parry: Riposte parries Karma's Focused Resolve and stuns back. Parry for 0.75 s; Focused Resolve takes 0.25 s to land, enough to react. Negating Focused Resolve's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Karma W Focused Resolve)
- **0.05** attack speed slow: Riposte cuts Karma's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Karma basic attacks)
- Watch out: Karma's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

#### 6. Morgana (net +0.68)

- **0.54** cc immunity: Black Shield makes Morgana immune to Karma's Renewal (root). Immune for 5 s, long enough to use ahead of Renewal. (Morgana E Black Shield → Karma W Renewal)
- **0.38** cc immunity: Black Shield makes Morgana immune to Karma's Focused Resolve (root). Immune for 5 s, long enough to use ahead of Focused Resolve. (Morgana E Black Shield → Karma W Focused Resolve)
- **0.09** cc immunity: Black Shield makes Morgana immune to Karma's Soulflare (slow). Immune for 5 s, long enough to use ahead of Soulflare. (Morgana E Black Shield → Karma Q Soulflare)
- Watch out: Karma's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range).

#### 7. Vladimir (net +0.65)

- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Karma's Renewal. Untargetable for 2 s, long enough to use ahead of Renewal. (Vladimir W Sanguine Pool → Karma W Renewal)
- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Karma's Focused Resolve. Untargetable for 2 s, long enough to use ahead of Focused Resolve. (Vladimir W Sanguine Pool → Karma W Focused Resolve)
- Watch out: Karma's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 8. Master Yi (net +0.59)

- **0.51** untargetable: Alpha Strike makes Master Yi untargetable, dodging Karma's Renewal. Untargetable for ?, timed to Renewal. (Master Yi Q Alpha Strike → Karma W Renewal)
- **0.36** untargetable: Alpha Strike makes Master Yi untargetable, dodging Karma's Focused Resolve. Untargetable for ?; Focused Resolve takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Karma W Focused Resolve)
- **0.05** cc immunity: Highlander makes Master Yi immune to Karma's Inner Flame (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Karma Q Inner Flame)
- Watch out: Karma's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range).

#### 9. Malzahar (net +0.49)

- **0.35** cc immunity: Void Shift makes Malzahar immune to Karma's Renewal (root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Karma W Renewal)
- **0.23** cc immunity: Void Shift makes Malzahar immune to Karma's Focused Resolve (root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Karma W Focused Resolve)
- **0.06** cc immunity: Void Shift makes Malzahar immune to Karma's Inner Flame (slow). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Karma Q Inner Flame)

#### 10. Braum (net +0.48)

- **0.45** projectile block: Unbreakable blocks Karma's Soulflare, a projectile. Unbreakable for 4 s, long enough to use ahead of Soulflare. (Braum E Unbreakable → Karma Q Soulflare)
- **0.35** projectile block: Unbreakable blocks Karma's Inner Flame, a projectile. Unbreakable for 4 s, long enough to use ahead of Inner Flame. (Braum E Unbreakable → Karma Q Inner Flame)
- **0.31** projectile block: Unbreakable blocks Karma's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Karma basic attacks)
- Watch out: Karma's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.88 | 0.93 | 0.05 |  |
| 2 | Fizz | +0.83 | 0.93 | 0.10 |  |
| 3 | Udyr | +0.74 | 0.96 | 0.22 |  |
| 4 | Maokai | +0.71 | 0.93 | 0.22 |  |
| 5 | Fiora | +0.68 | 0.89 | 0.21 |  |
| 6 | Morgana | +0.68 | 0.76 | 0.08 |  |
| 7 | Vladimir | +0.65 | 0.73 | 0.08 |  |
| 8 | Master Yi | +0.59 | 0.78 | 0.19 |  |
| 9 | Malzahar | +0.49 | 0.49 | 0.00 |  |
| 10 | Braum | +0.48 | 0.70 | 0.22 | projectile block (Unbreakable) |
| 11 | Gwen | +0.48 | 0.69 | 0.21 |  |
| 12 | Samira | +0.47 | 0.47 | 0.00 |  |
| 13 | Bard | +0.44 | 0.44 | 0.00 |  |
| 14 | Lissandra | +0.44 | 0.44 | 0.00 |  |
| 15 | Mel | +0.44 | 0.44 | 0.00 |  |
| 16 | Xayah | +0.43 | 0.43 | 0.00 |  |
| 17 | Kayle | +0.41 | 0.41 | 0.00 |  |
| 18 | Yasuo | +0.40 | 0.53 | 0.13 |  |
| 19 | Milio | +0.40 | 0.40 | 0.00 |  |
| 20 | Kled | +0.36 | 0.44 | 0.08 |  |
| 21 | Kalista | +0.35 | 0.35 | 0.00 |  |
| 22 | Sivir | +0.35 | 0.35 | 0.00 |  |
| 23 | Zaahen | +0.33 | 0.46 | 0.13 |  |
| 24 | Camille | +0.33 | 0.44 | 0.11 |  |
| 25 | Warwick | +0.32 | 0.47 | 0.15 |  |
| 26 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 27 | Kayn | +0.31 | 0.44 | 0.13 |  |
| 28 | Rek'Sai | +0.31 | 0.44 | 0.13 |  |
| 29 | Zed | +0.28 | 0.43 | 0.15 |  |
| 30 | Varus | +0.28 | 0.28 | 0.00 |  |
| 31 | Nocturne | +0.22 | 0.44 | 0.22 |  |
| 32 | Pantheon | +0.22 | 0.35 | 0.13 |  |
| 33 | Caitlyn | +0.22 | 0.22 | 0.00 |  |
| 34 | Gangplank | +0.21 | 0.65 | 0.44 |  |
| 35 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 36 | Alistar | +0.16 | 0.38 | 0.22 |  |
| 37 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 38 | Evelynn | +0.13 | 0.44 | 0.31 |  |
| 39 | Aurora | +0.13 | 0.43 | 0.30 |  |
| 40 | Teemo | +0.13 | 0.29 | 0.16 |  |
| 41 | Sion | +0.11 | 0.49 | 0.38 |  |
| 42 | Annie | +0.11 | 0.11 | 0.00 |  |
| 43 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 44 | Aphelios | +0.08 | 0.08 | 0.00 |  |
| 45 | Heimerdinger | +0.08 | 0.08 | 0.00 |  |
| 46 | Shen | +0.07 | 0.22 | 0.15 |  |
| 47 | Katarina | +0.06 | 0.28 | 0.22 |  |
| 48 | Rengar | +0.05 | 0.77 | 0.72 |  |
| 49 | Nilah | +0.04 | 0.20 | 0.16 |  |
| 50 | Xin Zhao | +0.03 | 0.22 | 0.19 |  |
| 51 | Olaf | +0.02 | 0.46 | 0.44 |  |
| 52 | Jax | +0.01 | 0.23 | 0.22 |  |
| 53 | Garen | 0.00 | 0.38 | 0.38 |  |
| 54 | Rammus | 0.00 | 0.22 | 0.22 |  |
| 55 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 56 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 57 | Azir | 0.00 | 0.00 | 0.00 |  |
| 58 | Brand | 0.00 | 0.00 | 0.00 |  |
| 59 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 60 | Corki | 0.00 | 0.00 | 0.00 |  |
| 61 | Draven | 0.00 | 0.00 | 0.00 |  |
| 62 | Elise | 0.00 | 0.00 | 0.00 |  |
| 63 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 64 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 65 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 66 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 67 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 68 | Janna | 0.00 | 0.00 | 0.00 |  |
| 69 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 70 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 71 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 72 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 73 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 74 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 75 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 76 | Lux | 0.00 | 0.00 | 0.00 |  |
| 77 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 78 | Nami | 0.00 | 0.00 | 0.00 |  |
| 79 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 80 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 81 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 82 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 83 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 84 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 85 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 86 | Sona | 0.00 | 0.00 | 0.00 |  |
| 87 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 88 | Swain | 0.00 | 0.00 | 0.00 |  |
| 89 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 90 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 91 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 92 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 93 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 94 | Vex | 0.00 | 0.00 | 0.00 |  |
| 95 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 96 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 97 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 98 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 99 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 100 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 101 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 102 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 103 | Singed | -0.02 | 0.42 | 0.44 |  |
| 104 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 105 | Graves | -0.04 | 0.00 | 0.04 |  |
| 106 | Malphite | -0.08 | 0.14 | 0.22 |  |
| 107 | Karthus | -0.08 | 0.00 | 0.08 |  |
| 108 | Rakan | -0.08 | 0.00 | 0.08 |  |
| 109 | Senna | -0.10 | 0.12 | 0.22 |  |
| 110 | Jarvan IV | -0.10 | 0.00 | 0.10 |  |
| 111 | K'Sante | -0.10 | 0.00 | 0.10 |  |
| 112 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 113 | Urgot | -0.10 | 0.00 | 0.10 |  |
| 114 | Yone | -0.10 | 0.00 | 0.10 |  |
| 115 | Shaco | -0.11 | 0.44 | 0.55 |  |
| 116 | Briar | -0.11 | 0.00 | 0.11 |  |
| 117 | Lillia | -0.11 | 0.00 | 0.11 |  |
| 118 | Naafiri | -0.11 | 0.00 | 0.11 |  |
| 119 | Hecarim | -0.13 | 0.00 | 0.13 |  |
| 120 | Ornn | -0.13 | 0.00 | 0.13 |  |
| 121 | Rell | -0.13 | 0.00 | 0.13 |  |
| 122 | Bel'Veth | -0.14 | 0.00 | 0.14 |  |
| 123 | Galio | -0.14 | 0.00 | 0.14 |  |
| 124 | Volibear | -0.14 | 0.00 | 0.14 |  |
| 125 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 126 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 127 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 128 | Riven | -0.15 | 0.00 | 0.15 |  |
| 129 | Vi | -0.15 | 0.00 | 0.15 |  |
| 130 | LeBlanc | -0.16 | 0.00 | 0.16 |  |
| 131 | Irelia | -0.18 | 0.00 | 0.18 |  |
| 132 | Aatrox | -0.19 | 0.00 | 0.19 |  |
| 133 | Nautilus | -0.19 | 0.00 | 0.19 |  |
| 134 | Tahm Kench | -0.19 | 0.00 | 0.19 |  |
| 135 | Tryndamere | -0.19 | 0.00 | 0.19 |  |
| 136 | Zac | -0.19 | 0.00 | 0.19 |  |
| 137 | Diana | -0.21 | 0.00 | 0.21 |  |
| 138 | Kassadin | -0.21 | 0.00 | 0.21 |  |
| 139 | Sejuani | -0.21 | 0.00 | 0.21 |  |
| 140 | Shyvana | -0.21 | 0.00 | 0.21 |  |
| 141 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 142 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 143 | Gragas | -0.22 | 0.00 | 0.22 |  |
| 144 | Illaoi | -0.22 | 0.00 | 0.22 |  |
| 145 | Kai'Sa | -0.22 | 0.00 | 0.22 |  |
| 146 | Leona | -0.22 | 0.00 | 0.22 |  |
| 147 | Locke | -0.22 | 0.00 | 0.22 |  |
| 148 | Neeko | -0.22 | 0.00 | 0.22 |  |
| 149 | Poppy | -0.22 | 0.00 | 0.22 |  |
| 150 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 151 | Sett | -0.22 | 0.00 | 0.22 |  |
| 152 | Twitch | -0.22 | 0.00 | 0.22 |  |
| 153 | Nunu & Willump | -0.28 | 0.16 | 0.44 |  |
| 154 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 155 | Vayne | -0.28 | 0.00 | 0.28 |  |
| 156 | Viego | -0.31 | 0.00 | 0.31 |  |
| 157 | Skarner | -0.32 | 0.09 | 0.41 |  |
| 158 | Mordekaiser | -0.33 | 0.05 | 0.38 |  |
| 159 | Pyke | -0.36 | 0.00 | 0.36 |  |
| 160 | Akali | -0.37 | 0.00 | 0.37 |  |
| 161 | Darius | -0.38 | 0.00 | 0.38 |  |
| 162 | Trundle | -0.38 | 0.00 | 0.38 |  |
| 163 | Yorick | -0.38 | 0.00 | 0.38 |  |
| 164 | Taric | -0.41 | 0.00 | 0.41 |  |
| 165 | Talon | -0.43 | 0.00 | 0.43 |  |
| 166 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 167 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 168 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 169 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 170 | Qiyana | -0.50 | 0.00 | 0.50 |  |
| 171 | Wukong | -0.53 | 0.00 | 0.53 |  |
| 172 | Kha'Zix | -0.64 | 0.00 | 0.64 |  |
