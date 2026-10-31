# Counters to Thresh (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Thresh: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Thresh wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Thresh --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Zaahen | +0.93 | +1.00 | +1.00 | +1.00 | +0.59 | +1.00 | +0.77 |
| 2 | Rengar | +0.91 | +1.00 | +1.00 | +1.00 | +0.41 | +1.00 | +1.00 |
| 3 | Lee Sin | +0.90 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +1.00 |
| 4 | K'Sante | +0.90 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +1.00 |
| 5 | Jarvan IV | +0.90 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +1.00 |
| 6 | Pantheon | +0.89 | +1.00 | +1.00 | +1.00 | +0.40 | +1.00 | +0.50 |
| 7 | Master Yi | +0.88 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +1.00 |
| 8 | Irelia | +0.87 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.86 |
| 9 | Zeri | +0.87 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +1.00 |
| 10 | Gangplank | +0.87 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +1.00 |
| 11 | Zed | +0.86 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +1.00 |
| 12 | Aphelios | +0.86 | +1.00 | +1.00 | +1.00 | +0.42 | +1.00 | +0.00 |
| 13 | Urgot | +0.86 | +1.00 | +1.00 | +1.00 | +0.40 | +1.00 | +0.00 |
| 14 | Jax | +0.85 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.50 |
| 15 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.50 |
| 16 | Wukong | +0.85 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.50 |
| 17 | Camille | +0.85 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +1.00 |
| 18 | Ambessa | +0.85 | +1.00 | +1.00 | +1.00 | +0.32 | +1.00 | +0.00 |
| 19 | Poppy | +0.85 | +1.00 | +1.00 | +1.00 | +0.32 | +1.00 | +0.00 |
| 20 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 21 | Samira | +0.84 | +1.00 | +1.00 | +1.00 | +0.40 | – | +0.00 |
| 22 | Naafiri | +0.84 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.50 |
| 23 | Garen | +0.84 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.50 |
| 24 | Jhin | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 25 | Miss Fortune | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 26 | Neeko | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 27 | Sion | +0.84 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.50 |
| 28 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +1.00 |
| 29 | Twitch | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 30 | Vel'Koz | +0.84 | +1.00 | +1.00 | +1.00 | +0.36 | – | +0.00 |
| 31 | Anivia | +0.84 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +1.00 |
| 32 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +1.00 |
| 33 | Darius | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 34 | Yasuo | +0.83 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.91 |
| 35 | Nunu & Willump | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 36 | Diana | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 37 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 38 | Morgana | +0.83 | +1.00 | +1.00 | +1.00 | +0.32 | – | +0.00 |
| 39 | Gwen | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 40 | Kha'Zix | +0.83 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.50 |
| 41 | Caitlyn | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 42 | Illaoi | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 43 | Ziggs | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 44 | Cassiopeia | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 45 | Smolder | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 46 | Senna | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 47 | Jayce | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 48 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 49 | Janna | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 50 | Sejuani | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 51 | Sona | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 52 | Kindred | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 53 | Zyra | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 54 | Ryze | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 55 | Lucian | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 56 | Lux | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 57 | Heimerdinger | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 58 | Yone | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 59 | Malphite | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 60 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 61 | Xin Zhao | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 62 | Veigar | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 63 | Lulu | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 64 | Syndra | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 65 | Akshan | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 66 | Nami | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 67 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 68 | Draven | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 69 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 70 | Xayah | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 71 | Nautilus | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 72 | Jinx | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 73 | Zoe | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 74 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 75 | Hwei | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 76 | Lissandra | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 77 | Ezreal | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 78 | Soraka | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 79 | Varus | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 80 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 81 | Rell | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 82 | Cho'Gath | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 83 | Mordekaiser | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 84 | Tryndamere | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 85 | Alistar | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 86 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 87 | Galio | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 88 | Skarner | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 89 | Viktor | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 90 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 91 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 92 | Hecarim | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 93 | Brand | +0.81 | +0.98 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 94 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 95 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 96 | Amumu | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 97 | Shen | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 98 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 99 | Kennen | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 100 | Vex | +0.80 | +0.99 | +0.98 | +1.00 | +0.07 | +1.00 | +0.00 |
| 101 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 102 | Swain | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 103 | Leona | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 104 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 105 | Vi | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 106 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 107 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 108 | Tahm Kench | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 109 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 110 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 111 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 112 | Xerath | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 113 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 114 | Braum | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 115 | Rumble | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 116 | Karma | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 117 | Ekko | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 118 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 119 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 120 | LeBlanc | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 121 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 122 | Karthus | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 123 | Singed | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 124 | Talon | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 125 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 126 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 127 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 128 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 129 | Malzahar | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 130 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 131 | Sivir | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 132 | Kai'Sa | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 133 | Quinn | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 134 | Akali | +0.77 | +1.00 | +0.89 | +1.00 | +0.00 | +1.00 | +0.00 |
| 135 | Vladimir | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 136 | Ahri | +0.75 | +0.97 | +0.94 | +0.87 | +0.08 | +0.88 | +0.00 |
| 137 | Taric | +0.74 | +1.00 | +0.76 | +1.00 | +0.04 | +1.00 | +0.00 |
| 138 | Kalista | +0.73 | +1.00 | +1.00 | +0.68 | +0.16 | – | +0.00 |
| 139 | Katarina | +0.69 | +1.00 | +0.53 | +1.00 | +0.02 | +1.00 | +0.00 |
| 140 | Ornn | +0.63 | +0.62 | +0.64 | +1.00 | +0.10 | +1.00 | +0.00 |
| 141 | Blitzcrank | +0.41 | +0.21 | +0.21 | +1.00 | +0.05 | +1.00 | +0.00 |
| 142 | Taliyah | +0.35 | +0.98 | +0.98 | −1.00 | +0.18 | – | +0.00 |
| 143 | Rakan | +0.29 | +1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 144 | Evelynn | +0.15 | −0.45 | +0.93 | −0.51 | +0.23 | +1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Thresh's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Thresh's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Thresh` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.26)

- **0.85** untargetable: Playful makes Fizz untargetable, dodging Thresh's Death Sentence. Untargetable for 0.75 s; Death Sentence takes 1.08 s to land, enough to react. (Fizz E Playful → Thresh Q Death Sentence)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Thresh's Flay. Untargetable for 0.75 s; Flay takes 0.66 s to land, enough to react. (Fizz E Playful → Thresh E Flay)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Thresh's The Box. Untargetable for 0.75 s; The Box takes 0.45 s to land, enough to react. (Fizz E Playful → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 275 units farther than Fizz's (450 vs 175 attack range).

#### 2. Nocturne (net +1.11)

- **0.72** spell shield: Shroud of Darkness's spell shield blocks Thresh's Death Sentence. Spell shield for 1.5 s, long enough to use ahead of Death Sentence. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Thresh Q Death Sentence)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Thresh's Flay. Spell shield for 1.5 s, long enough to use ahead of Flay. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Thresh E Flay)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Thresh's The Box. Spell shield for 1.5 s, long enough to use ahead of The Box. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 325 units farther than Nocturne's (450 vs 125 attack range).

#### 3. Maokai (net +1.10)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Thresh's Death Sentence. Untargetable for 1.4 s; Death Sentence takes 1.08 s to land, enough to react. (Maokai W Twisted Advance → Thresh Q Death Sentence)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Thresh's Flay. Untargetable for 1.4 s; Flay takes 0.66 s to land, enough to react. (Maokai W Twisted Advance → Thresh E Flay)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Thresh's The Box. Untargetable for 1.4 s; The Box takes 0.45 s to land, enough to react. (Maokai W Twisted Advance → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 325 units farther than Maokai's (450 vs 125 attack range).

#### 4. Udyr (net +1.04)

- **0.85** cc immunity: Blazing Stampede makes Udyr immune to Thresh's Death Sentence (airborne, stun). Immune for 1.5 s, long enough to use ahead of Death Sentence. (Udyr E Blazing Stampede → Thresh Q Death Sentence)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Thresh's Flay (airborne, slow). Immune for 1.5 s, long enough to use ahead of Flay. (Udyr E Blazing Stampede → Thresh E Flay)
- **0.14** cc immunity: Blazing Stampede makes Udyr immune to Thresh's The Box (slow). Immune for 1.5 s, long enough to use ahead of The Box. (Udyr E Blazing Stampede → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 325 units farther than Udyr's (450 vs 125 attack range).

#### 5. Fiora (net +1.02)

- **0.73** parry: Riposte parries Thresh's Death Sentence and stuns back. Parry for 0.75 s; Death Sentence takes 1.08 s to land, enough to react. Negating Death Sentence's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Thresh Q Death Sentence)
- **0.64** parry: Riposte parries Thresh's Flay and stuns back. Parry for 0.75 s; Flay takes 0.66 s to land, enough to react. Negating Flay's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Thresh E Flay)
- **0.55** parry: Riposte parries Thresh's The Box. Parry for 0.75 s; The Box takes 0.45 s to land, enough to react. (Fiora W Riposte → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 300 units farther than Fiora's (450 vs 150 attack range).

#### 6. Sivir (net +1.00)

- **0.60** spell shield: Spell Shield's spell shield blocks Thresh's Death Sentence. Spell shield for 1.5 s, long enough to use ahead of Death Sentence. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Thresh Q Death Sentence)
- **0.55** spell shield: Spell Shield's spell shield blocks Thresh's The Box. Spell shield for 1.5 s, long enough to use ahead of The Box. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Thresh R The Box)
- **0.51** spell shield: Spell Shield's spell shield blocks Thresh's Flay. Spell shield for 1.5 s, long enough to use ahead of Flay. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Thresh E Flay)

#### 7. Morgana (net +0.94)

- **0.63** cc immunity: Black Shield makes Morgana immune to Thresh's Death Sentence (airborne, stun). Immune for 5 s, long enough to use ahead of Death Sentence. (Morgana E Black Shield → Thresh Q Death Sentence)
- **0.54** cc immunity: Black Shield makes Morgana immune to Thresh's Flay (airborne, slow). Immune for 5 s, long enough to use ahead of Flay. (Morgana E Black Shield → Thresh E Flay)
- **0.14** cc immunity: Black Shield makes Morgana immune to Thresh's The Box (slow). Immune for 5 s, long enough to use ahead of The Box. (Morgana E Black Shield → Thresh R The Box)

#### 8. Lissandra (net +0.90)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Thresh's The Box. Untargetable for 2.5 s, long enough to use ahead of The Box. (Lissandra R Frozen Tomb → Thresh R The Box)
- **0.40** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Thresh's Death Sentence. Untargetable for 2.5 s, long enough to use ahead of Death Sentence. (Lissandra R Frozen Tomb → Thresh Q Death Sentence)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Thresh's Flay. Untargetable for 2.5 s, long enough to use ahead of Flay. (Lissandra R Frozen Tomb → Thresh E Flay)

#### 9. Vladimir (net +0.88)

- **0.63** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Thresh's Death Sentence. Untargetable for 2 s, long enough to use ahead of Death Sentence. (Vladimir W Sanguine Pool → Thresh Q Death Sentence)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Thresh's The Box. Untargetable for 2 s, long enough to use ahead of The Box. (Vladimir W Sanguine Pool → Thresh R The Box)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Thresh's Flay. Untargetable for 2 s, long enough to use ahead of Flay. (Vladimir W Sanguine Pool → Thresh E Flay)
- Watch out: Death Sentence's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 10. Bard (net +0.83)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Thresh's The Box. Untargetable for 2.5 s, long enough to use ahead of The Box. (Bard R Tempered Fate → Thresh R The Box)
- **0.40** untargetable: Tempered Fate makes Bard untargetable, dodging Thresh's Death Sentence. Untargetable for 2.5 s, long enough to use ahead of Death Sentence. (Bard R Tempered Fate → Thresh Q Death Sentence)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Thresh's Flay. Untargetable for 2.5 s, long enough to use ahead of Flay. (Bard R Tempered Fate → Thresh E Flay)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.26 | 1.34 | 0.08 |  |
| 2 | Nocturne | +1.11 | 1.30 | 0.19 |  |
| 3 | Maokai | +1.10 | 1.29 | 0.19 |  |
| 4 | Udyr | +1.04 | 1.23 | 0.19 |  |
| 5 | Fiora | +1.02 | 1.20 | 0.18 |  |
| 6 | Sivir | +1.00 | 1.00 | 0.00 |  |
| 7 | Morgana | +0.94 | 0.94 | 0.00 |  |
| 8 | Lissandra | +0.90 | 0.90 | 0.00 |  |
| 9 | Vladimir | +0.88 | 1.04 | 0.16 |  |
| 10 | Bard | +0.83 | 0.83 | 0.00 |  |
| 11 | Gwen | +0.82 | 1.00 | 0.18 |  |
| 12 | Xayah | +0.81 | 0.81 | 0.00 |  |
| 13 | Rek'Sai | +0.74 | 0.85 | 0.11 |  |
| 14 | Camille | +0.70 | 0.80 | 0.10 |  |
| 15 | Aurora | +0.67 | 0.82 | 0.15 |  |
| 16 | Braum | +0.66 | 0.85 | 0.19 | projectile block (Unbreakable) |
| 17 | Zed | +0.63 | 0.76 | 0.13 |  |
| 18 | Evelynn | +0.62 | 0.83 | 0.21 |  |
| 19 | Master Yi | +0.56 | 1.18 | 0.62 |  |
| 20 | Mel | +0.56 | 0.56 | 0.00 | projectile block (Rebuttal) |
| 21 | Samira | +0.55 | 0.55 | 0.00 | projectile block (Blade Whirl) |
| 22 | Vex | +0.55 | 0.55 | 0.00 |  |
| 23 | Kayle | +0.53 | 0.53 | 0.00 |  |
| 24 | Yuumi | +0.52 | 1.34 | 0.82 |  |
| 25 | Hwei | +0.52 | 0.52 | 0.00 | dash stop (Grim Visage) |
| 26 | Jinx | +0.52 | 0.52 | 0.00 | dash stop (Flame Chompers!) |
| 27 | Kled | +0.51 | 0.57 | 0.06 |  |
| 28 | Shaco | +0.50 | 0.83 | 0.33 |  |
| 29 | Yasuo | +0.50 | 0.61 | 0.11 | projectile block (Wind Wall) |
| 30 | Milio | +0.50 | 0.50 | 0.00 |  |
| 31 | Zaahen | +0.49 | 0.60 | 0.11 |  |
| 32 | Kalista | +0.49 | 0.49 | 0.00 |  |
| 33 | Ahri | +0.48 | 0.48 | 0.00 |  |
| 34 | Viktor | +0.47 | 0.47 | 0.00 |  |
| 35 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 36 | Rengar | +0.42 | 0.95 | 0.53 |  |
| 37 | Gangplank | +0.40 | 0.79 | 0.39 |  |
| 38 | Alistar | +0.29 | 0.48 | 0.19 |  |
| 39 | Yone | +0.29 | 0.37 | 0.08 |  |
| 40 | Lulu | +0.28 | 0.28 | 0.00 |  |
| 41 | Cassiopeia | +0.24 | 0.24 | 0.00 |  |
| 42 | Teemo | +0.23 | 0.31 | 0.08 |  |
| 43 | Olaf | +0.21 | 0.60 | 0.39 |  |
| 44 | Xin Zhao | +0.21 | 0.37 | 0.16 |  |
| 45 | K'Sante | +0.16 | 0.25 | 0.09 |  |
| 46 | Aphelios | +0.16 | 0.16 | 0.00 |  |
| 47 | Tristana | +0.15 | 0.15 | 0.00 |  |
| 48 | Heimerdinger | +0.13 | 0.13 | 0.00 |  |
| 49 | Garen | +0.12 | 0.45 | 0.33 |  |
| 50 | Malphite | +0.10 | 0.29 | 0.19 |  |
| 51 | Nilah | +0.09 | 0.22 | 0.13 |  |
| 52 | Ashe | +0.09 | 0.09 | 0.00 |  |
| 53 | Sona | +0.07 | 0.07 | 0.00 |  |
| 54 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 55 | Zeri | +0.07 | 0.07 | 0.00 |  |
| 56 | Malzahar | +0.06 | 0.86 | 0.80 |  |
| 57 | Jax | +0.06 | 0.25 | 0.19 |  |
| 58 | Anivia | +0.06 | 0.06 | 0.00 |  |
| 59 | Annie | +0.06 | 0.06 | 0.00 |  |
| 60 | Draven | +0.06 | 0.06 | 0.00 |  |
| 61 | Renata Glasc | +0.06 | 0.06 | 0.00 |  |
| 62 | Jarvan IV | +0.05 | 0.13 | 0.08 |  |
| 63 | Corki | +0.05 | 0.05 | 0.00 |  |
| 64 | Elise | +0.05 | 0.05 | 0.00 |  |
| 65 | Ezreal | +0.05 | 0.05 | 0.00 |  |
| 66 | Kennen | +0.05 | 0.05 | 0.00 |  |
| 67 | Lux | +0.05 | 0.05 | 0.00 |  |
| 68 | Smolder | +0.05 | 0.05 | 0.00 |  |
| 69 | Zilean | +0.05 | 0.05 | 0.00 |  |
| 70 | Zoe | +0.05 | 0.05 | 0.00 |  |
| 71 | Zyra | +0.05 | 0.05 | 0.00 |  |
| 72 | Amumu | +0.04 | 0.23 | 0.19 |  |
| 73 | Brand | +0.04 | 0.04 | 0.00 |  |
| 74 | Nami | +0.04 | 0.04 | 0.00 |  |
| 75 | Nidalee | +0.04 | 0.04 | 0.00 |  |
| 76 | Seraphine | +0.04 | 0.04 | 0.00 |  |
| 77 | Soraka | +0.04 | 0.04 | 0.00 |  |
| 78 | Syndra | +0.04 | 0.04 | 0.00 |  |
| 79 | Ziggs | +0.04 | 0.04 | 0.00 |  |
| 80 | Sion | +0.03 | 0.63 | 0.60 |  |
| 81 | Azir | +0.03 | 0.03 | 0.00 |  |
| 82 | Karma | +0.03 | 0.03 | 0.00 |  |
| 83 | Orianna | +0.03 | 0.03 | 0.00 |  |
| 84 | Swain | +0.03 | 0.03 | 0.00 |  |
| 85 | Hecarim | +0.02 | 0.13 | 0.11 |  |
| 86 | Ornn | +0.02 | 0.13 | 0.11 |  |
| 87 | Volibear | +0.01 | 0.13 | 0.12 |  |
| 88 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 89 | Graves | 0.00 | 0.00 | 0.00 |  |
| 90 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 91 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 92 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 93 | Senna | -0.03 | 0.08 | 0.11 |  |
| 94 | Twitch | -0.04 | 0.07 | 0.11 |  |
| 95 | Shyvana | -0.05 | 0.13 | 0.18 |  |
| 96 | LeBlanc | -0.05 | 0.03 | 0.08 |  |
| 97 | Poppy | -0.06 | 0.53 | 0.59 | dash stop (Steadfast Presence) |
| 98 | Illaoi | -0.06 | 0.13 | 0.19 |  |
| 99 | Sett | -0.06 | 0.13 | 0.19 |  |
| 100 | Kai'Sa | -0.06 | 0.05 | 0.11 |  |
| 101 | Rakan | -0.06 | 0.00 | 0.06 |  |
| 102 | Urgot | -0.06 | 0.00 | 0.06 |  |
| 103 | Vayne | -0.07 | 0.07 | 0.14 |  |
| 104 | Neeko | -0.07 | 0.04 | 0.11 |  |
| 105 | Lillia | -0.07 | 0.00 | 0.07 |  |
| 106 | Sylas | -0.08 | 0.00 | 0.08 |  |
| 107 | Briar | -0.10 | 0.00 | 0.10 |  |
| 108 | Rell | -0.11 | 0.00 | 0.11 |  |
| 109 | Aurelion Sol | -0.12 | 0.04 | 0.16 |  |
| 110 | Bel'Veth | -0.12 | 0.00 | 0.12 |  |
| 111 | Ambessa | -0.13 | 0.00 | 0.13 |  |
| 112 | Ekko | -0.13 | 0.00 | 0.13 |  |
| 113 | Lee Sin | -0.13 | 0.00 | 0.13 |  |
| 114 | Riven | -0.13 | 0.00 | 0.13 |  |
| 115 | Nasus | -0.15 | 0.24 | 0.39 |  |
| 116 | Irelia | -0.15 | 0.00 | 0.15 |  |
| 117 | Varus | -0.16 | 0.06 | 0.22 |  |
| 118 | Aatrox | -0.16 | 0.00 | 0.16 |  |
| 119 | Nautilus | -0.16 | 0.00 | 0.16 |  |
| 120 | Tryndamere | -0.16 | 0.00 | 0.16 |  |
| 121 | Kayn | -0.18 | 0.83 | 1.01 |  |
| 122 | Singed | -0.18 | 0.21 | 0.39 |  |
| 123 | Diana | -0.18 | 0.00 | 0.18 |  |
| 124 | Kassadin | -0.18 | 0.00 | 0.18 |  |
| 125 | Sejuani | -0.18 | 0.00 | 0.18 |  |
| 126 | Leona | -0.19 | 0.00 | 0.19 |  |
| 127 | Locke | -0.19 | 0.00 | 0.19 |  |
| 128 | Renekton | -0.19 | 0.00 | 0.19 |  |
| 129 | Skarner | -0.23 | 0.13 | 0.36 |  |
| 130 | Akali | -0.24 | 0.00 | 0.24 |  |
| 131 | Mordekaiser | -0.27 | 0.06 | 0.33 |  |
| 132 | Talon | -0.27 | 0.00 | 0.27 |  |
| 133 | Ivern | -0.30 | 0.00 | 0.30 |  |
| 134 | Qiyana | -0.30 | 0.00 | 0.30 |  |
| 135 | Wukong | -0.31 | 0.00 | 0.31 |  |
| 136 | Darius | -0.33 | 0.00 | 0.33 |  |
| 137 | Trundle | -0.33 | 0.00 | 0.33 |  |
| 138 | Yorick | -0.33 | 0.00 | 0.33 |  |
| 139 | Quinn | -0.34 | 0.05 | 0.39 |  |
| 140 | Taric | -0.36 | 0.00 | 0.36 |  |
| 141 | Blitzcrank | -0.39 | 0.00 | 0.39 |  |
| 142 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 143 | Dr. Mundo | -0.39 | 0.00 | 0.39 |  |
| 144 | Rumble | -0.39 | 0.00 | 0.39 |  |
| 145 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 146 | Viego | -0.44 | 0.13 | 0.57 |  |
| 147 | Caitlyn | -0.44 | 0.12 | 0.56 |  |
| 148 | Pyke | -0.49 | 0.00 | 0.49 |  |
| 149 | Rammus | -0.50 | 0.24 | 0.74 |  |
| 150 | Miss Fortune | -0.51 | 0.05 | 0.56 |  |
| 151 | Jhin | -0.52 | 0.04 | 0.56 |  |
| 152 | Gragas | -0.52 | 0.00 | 0.52 |  |
| 153 | Vel'Koz | -0.53 | 0.03 | 0.56 |  |
| 154 | Karthus | -0.56 | 0.00 | 0.56 |  |
| 155 | Lucian | -0.56 | 0.00 | 0.56 |  |
| 156 | Pantheon | -0.61 | 0.51 | 1.12 |  |
| 157 | Xerath | -0.61 | 0.03 | 0.64 |  |
| 158 | Zac | -0.62 | 0.51 | 1.13 | dash stop (Stretching Strikes) |
| 159 | Akshan | -0.63 | 0.00 | 0.63 |  |
| 160 | Twisted Fate | -0.65 | 0.05 | 0.70 |  |
| 161 | Warwick | -0.66 | 0.78 | 1.44 |  |
| 162 | Ryze | -0.66 | 0.04 | 0.70 |  |
| 163 | Janna | -0.74 | 0.06 | 0.80 |  |
| 164 | Katarina | -0.75 | 0.00 | 0.75 |  |
| 165 | Vi | -0.78 | 0.13 | 0.91 |  |
| 166 | Shen | -0.79 | 0.24 | 1.03 |  |
| 167 | Fiddlesticks | -0.90 | 0.00 | 0.90 |  |
| 168 | Taliyah | -0.93 | 0.03 | 0.96 |  |
| 169 | Naafiri | -1.00 | 0.00 | 1.00 |  |
| 170 | Nunu & Willump | -1.13 | 0.24 | 1.37 |  |
| 171 | Tahm Kench | -1.16 | 0.00 | 1.16 |  |
| 172 | Galio | -1.30 | 0.00 | 1.30 |  |
