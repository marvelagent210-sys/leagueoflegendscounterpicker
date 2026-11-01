# Counters to Akshan (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Akshan: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Akshan wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Akshan --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +1.00 |
| 2 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | +0.00 |
| 3 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 4 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 5 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 6 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +1.00 |
| 7 | Ashe | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 8 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +1.00 |
| 9 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +1.00 |
| 10 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 11 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 12 | Irelia | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 13 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 14 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 15 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 16 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 17 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 18 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 19 | Varus | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 20 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 21 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 22 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 23 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 24 | Gragas | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 25 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 26 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 27 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 28 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 29 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 30 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 31 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 32 | Skarner | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +0.92 | +0.00 |
| 33 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 34 | Sejuani | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 35 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 36 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 37 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 38 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 39 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 40 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 41 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 42 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 43 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 44 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 45 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 46 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 47 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 48 | Ambessa | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 49 | Twisted Fate | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 50 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 51 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 52 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 53 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 54 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 55 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 56 | Volibear | +0.77 | +1.00 | +0.99 | +1.00 | −0.12 | +0.96 | +0.00 |
| 57 | Kindred | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 58 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 59 | Nocturne | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 60 | Rumble | +0.77 | +0.95 | +0.95 | +1.00 | −0.06 | +1.00 | +0.00 |
| 61 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 62 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 63 | Wukong | +0.76 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 64 | Kennen | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 65 | Illaoi | +0.73 | +0.76 | +0.97 | +1.00 | −0.03 | +0.99 | +0.00 |
| 66 | Sion | +0.72 | +0.99 | +0.72 | +0.99 | −0.03 | +1.00 | +0.00 |
| 67 | Morgana | +0.65 | +0.80 | +0.80 | +1.00 | −0.12 | – | +0.00 |
| 68 | Gnar | +0.64 | +1.00 | +1.00 | +1.00 | +0.00 | −0.63 | +0.00 |
| 69 | Draven | +0.59 | +1.00 | +0.32 | +1.00 | +0.01 | – | +0.00 |
| 70 | Tahm Kench | +0.46 | +0.30 | +0.30 | +0.98 | +0.13 | +0.98 | +0.00 |
| 71 | Xin Zhao | +0.46 | +0.20 | +0.60 | +1.00 | +0.04 | +0.54 | +0.00 |
| 72 | Riven | +0.43 | +1.00 | +0.00 | +1.00 | −0.15 | +0.00 | +0.00 |
| 73 | Ziggs | +0.37 | +1.00 | +1.00 | −1.00 | +0.21 | – | +0.00 |
| 74 | Yone | +0.36 | +0.17 | +0.17 | +1.00 | −0.16 | +1.00 | +0.00 |
| 75 | Miss Fortune | +0.35 | +1.00 | +1.00 | −1.00 | +0.07 | – | +0.00 |
| 76 | Annie | +0.32 | +1.00 | −1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 77 | Sett | +0.29 | −1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 78 | Braum | +0.17 | +0.09 | +0.48 | +0.14 | −0.04 | +0.03 | +0.00 |
| 79 | Vi | +0.09 | −1.00 | +1.00 | +1.00 | −0.09 | −1.00 | +0.00 |
| 80 | Ekko | +0.09 | +1.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.00 |
| 81 | Leona | +0.07 | +0.01 | +0.01 | −0.02 | −0.02 | +0.71 | +0.00 |
| 82 | Swain | +0.06 | +0.07 | +0.03 | +0.08 | +0.10 | – | +0.00 |
| 83 | Anivia | +0.02 | +0.05 | +0.05 | −0.02 | −0.07 | +0.13 | +0.00 |
| 84 | Taric | −0.00 | +0.02 | −0.04 | +0.02 | −0.00 | +0.02 | +0.00 |
| 85 | Shen | −0.01 | −0.05 | −0.01 | +0.08 | −0.02 | −0.03 | +0.00 |
| 86 | Kassadin | −0.01 | −1.00 | +1.00 | +0.00 | −0.09 | +0.00 | +0.00 |
| 87 | Ornn | −0.02 | −0.01 | −0.02 | −0.01 | −0.05 | −0.00 | +0.00 |
| 88 | Soraka | −0.04 | +0.01 | −0.06 | −0.08 | −0.02 | – | +0.00 |
| 89 | Urgot | −0.07 | −0.09 | −0.09 | −0.09 | +0.01 | −0.05 | +0.00 |
| 90 | Karthus | −0.07 | −0.09 | −0.08 | −0.13 | +0.03 | – | +0.00 |
| 91 | Zyra | −0.07 | −0.10 | −0.11 | −0.10 | +0.04 | – | +0.00 |
| 92 | Pantheon | −0.21 | −1.00 | −1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 93 | Karma | −0.28 | +0.79 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 94 | Alistar | −0.30 | −1.00 | +1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 95 | Neeko | −0.32 | −1.00 | −0.99 | +1.00 | +0.07 | – | +0.00 |
| 96 | Graves | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 97 | Ryze | −0.32 | −1.00 | −1.00 | +1.00 | +0.05 | – | +0.00 |
| 98 | Kai'Sa | −0.34 | −1.00 | −1.00 | +1.00 | −0.05 | – | +0.00 |
| 99 | Lucian | −0.34 | −1.00 | −1.00 | +1.00 | −0.05 | – | +0.00 |
| 100 | Rengar | −0.34 | −1.00 | −1.00 | +1.00 | +0.37 | −1.00 | +0.00 |
| 101 | Singed | −0.38 | −1.00 | −0.07 | +0.00 | −0.07 | −1.00 | +0.00 |
| 102 | Senna | −0.39 | −0.19 | −0.19 | −1.00 | +0.05 | −1.00 | +0.00 |
| 103 | Zed | −0.42 | −1.00 | −1.00 | +1.00 | −0.12 | −1.00 | +0.00 |
| 104 | Ezreal | −0.43 | −0.88 | −0.88 | +0.25 | −0.01 | – | +0.00 |
| 105 | Lux | −0.44 | −1.00 | −1.00 | +0.50 | +0.03 | – | +0.00 |
| 106 | Rell | −0.55 | −1.00 | −0.07 | −1.00 | +0.10 | −1.00 | +0.00 |
| 107 | Jinx | −0.57 | −1.00 | −1.00 | −0.13 | +0.07 | – | +0.00 |
| 108 | Jarvan IV | −0.68 | −1.00 | −0.50 | −1.00 | −0.00 | −1.00 | +0.00 |
| 109 | Quinn | −0.68 | −1.00 | −1.00 | −0.51 | −0.09 | – | +0.00 |
| 110 | Caitlyn | −0.72 | −0.86 | −0.86 | −1.00 | +0.07 | −1.00 | +0.00 |
| 111 | Malzahar | −0.73 | −0.85 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 112 | Xerath | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 113 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 114 | Cassiopeia | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 115 | Janna | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 116 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 117 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 118 | Ahri | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 119 | Brand | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 120 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 121 | Hwei | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 122 | Zoe | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 123 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 124 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 125 | Twitch | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 126 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 127 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 128 | Sivir | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 129 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 130 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 131 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 132 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 133 | Vladimir | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 134 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 135 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 136 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 137 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 138 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 139 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 140 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 141 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 142 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 143 | Galio | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 144 | Rakan | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Akshan's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Akshan's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Akshan` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yasuo (net +1.37)

- **0.55** projectile block: Wind Wall blocks Akshan's Comeuppance, a projectile. Wind Wall for 4 s, long enough to use ahead of Comeuppance. (Yasuo W Wind Wall → Akshan R Comeuppance)
- **0.49** projectile block: Wind Wall blocks Akshan's Heroic Swing, a projectile. Wind Wall for 4 s, long enough to use ahead of Heroic Swing. (Yasuo W Wind Wall → Akshan E Heroic Swing)
- **0.39** projectile block: Wind Wall blocks Akshan's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Akshan basic attacks)
- Watch out: Akshan's basic attacks reach 325 units farther than Yasuo's (500 vs 175 attack range).

#### 2. Braum (net +1.21)

- **0.60** projectile block: Unbreakable blocks Akshan's Heroic Swing, a projectile. Unbreakable for 4 s, long enough to use ahead of Heroic Swing. (Braum E Unbreakable → Akshan E Heroic Swing)
- **0.55** projectile block: Unbreakable blocks Akshan's Comeuppance, a projectile. Unbreakable for 4 s, long enough to use ahead of Comeuppance. (Braum E Unbreakable → Akshan R Comeuppance)
- **0.50** projectile block: Unbreakable blocks Akshan's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Akshan basic attacks)
- Watch out: Akshan's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

#### 3. Rell (net +1.18)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Akshan's Comeuppance (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Akshan R Comeuppance)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Akshan's Comeuppance (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Akshan R Comeuppance)
- **0.28** interrupt: Full Tilt's stun interrupts Akshan's Comeuppance (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Akshan R Comeuppance)
- Watch out: Akshan's basic attacks reach 325 units farther than Rell's (500 vs 175 attack range).

#### 4. Samira (net +0.88)

- **0.55** projectile block: Blade Whirl blocks Akshan's Comeuppance, a projectile. Blade Whirl for 0.75 s; Comeuppance takes 0.78 s to land, enough to react. (Samira W Blade Whirl → Akshan R Comeuppance)
- **0.44** projectile block: Blade Whirl blocks Akshan's Heroic Swing, a projectile. Blade Whirl for 0.75 s; Heroic Swing takes 0.32 s to land, enough to react. (Samira W Blade Whirl → Akshan E Heroic Swing)
- **0.30** projectile block: Blade Whirl blocks Akshan's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Akshan basic attacks)

#### 5. Lulu (net +0.87)

- **0.34** disarm: Whimsy disarms Akshan for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Akshan basic attacks)
- **0.28** interrupt: Whimsy's polymorph interrupts Akshan's Comeuppance (normal channel). Whimsy must land during the channel. (Lulu W Whimsy → Akshan R Comeuppance)
- **0.25** interrupt: Wild Growth's airborne interrupts Akshan's Comeuppance (normal channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Akshan R Comeuppance)

#### 6. Mel (net +0.86)

- **0.55** projectile block: Rebuttal blocks Akshan's Comeuppance, a projectile. Rebuttal for 0.75 s; Comeuppance takes 0.78 s to land, enough to react. (Mel W Rebuttal → Akshan R Comeuppance)
- **0.41** projectile block: Rebuttal blocks Akshan's Heroic Swing, a projectile. Rebuttal for 0.75 s; Heroic Swing takes 0.32 s to land, enough to react. (Mel W Rebuttal → Akshan E Heroic Swing)
- **0.30** projectile block: Rebuttal blocks Akshan's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Akshan basic attacks)

#### 7. Shen (net +0.84)

- **0.60** attack block: Spirit's Refuge blocks Akshan's Heroic Swing, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. Spell shield will only block a single shot. (Shen W Spirit's Refuge → Akshan E Heroic Swing)
- **0.36** attack block: Spirit's Refuge blocks Akshan's basic attacks (with Dirty Fighting). Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Akshan basic attacks)
- **0.28** interrupt: Shadow Dash's taunt interrupts Akshan's Comeuppance (normal channel). Shadow Dash must land during the channel. (Shen E Shadow Dash → Akshan R Comeuppance)
- Watch out: Akshan's basic attacks reach 375 units farther than Shen's (500 vs 125 attack range).

#### 8. Fiddlesticks (net +0.84)

- **0.28** interrupt: Reap's silence interrupts Akshan's Comeuppance (normal channel). Reap must land during the channel. (Fiddlesticks E Reap → Akshan R Comeuppance)
- **0.28** interrupt: Terrify's fear interrupts Akshan's Comeuppance (normal channel). Terrify must land during the channel. (Fiddlesticks Q Terrify → Akshan R Comeuppance)
- **0.14** reveal: A Harmless Scarecrow reveals Akshan through Going Rogue's stealth. (Fiddlesticks I A Harmless Scarecrow → Akshan W Going Rogue)

#### 9. Taliyah (net +0.77)

- **0.28** interrupt: Seismic Shove's airborne interrupts Akshan's Comeuppance (normal channel). Seismic Shove must land during the channel. (Taliyah W Seismic Shove → Akshan R Comeuppance)
- **0.28** interrupt: Unraveled Earth's stun interrupts Akshan's Comeuppance (normal channel). Unraveled Earth must land during the channel. (Taliyah E Unraveled Earth → Akshan R Comeuppance)
- **0.21** interrupt: Weaver's Wall's airborne interrupts Akshan's Comeuppance (normal channel). Weaver's Wall must land during the channel. (Taliyah R Weaver's Wall → Akshan R Comeuppance)

#### 10. Fizz (net +0.72)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Akshan's Comeuppance. Untargetable for 0.75 s; Comeuppance takes 0.78 s to land, enough to react. (Fizz E Playful → Akshan R Comeuppance)
- **0.25** interrupt: Chum the Waters's airborne interrupts Akshan's Comeuppance (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Akshan R Comeuppance)
- **0.14** reveal: Chum the Waters reveals Akshan through Going Rogue's stealth. (Fizz R Chum the Waters → Akshan W Going Rogue)
- Watch out: Akshan's basic attacks reach 325 units farther than Fizz's (500 vs 175 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yasuo | +1.37 | 1.56 | 0.19 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 2 | Braum | +1.21 | 1.55 | 0.34 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Rell | +1.18 | 1.37 | 0.19 |  |
| 4 | Samira | +0.88 | 0.88 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 5 | Lulu | +0.87 | 0.87 | 0.00 |  |
| 6 | Mel | +0.86 | 0.86 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 7 | Shen | +0.84 | 1.06 | 0.22 | attack block (Spirit's Refuge) |
| 8 | Fiddlesticks | +0.84 | 0.84 | 0.00 |  |
| 9 | Taliyah | +0.77 | 0.77 | 0.00 |  |
| 10 | Fizz | +0.72 | 0.87 | 0.15 |  |
| 11 | Hwei | +0.72 | 0.72 | 0.00 |  |
| 12 | Zac | +0.71 | 1.00 | 0.29 |  |
| 13 | Camille | +0.71 | 0.88 | 0.17 |  |
| 14 | Viktor | +0.68 | 0.68 | 0.00 |  |
| 15 | Kayn | +0.67 | 0.86 | 0.19 |  |
| 16 | Rek'Sai | +0.67 | 0.86 | 0.19 |  |
| 17 | Kled | +0.67 | 0.78 | 0.11 |  |
| 18 | Lissandra | +0.67 | 0.67 | 0.00 |  |
| 19 | K'Sante | +0.65 | 0.81 | 0.16 |  |
| 20 | Bard | +0.64 | 0.64 | 0.00 |  |
| 21 | Malzahar | +0.64 | 0.64 | 0.00 |  |
| 22 | Thresh | +0.63 | 0.63 | 0.00 |  |
| 23 | Anivia | +0.62 | 0.62 | 0.00 |  |
| 24 | Nilah | +0.61 | 0.86 | 0.25 | attack dodge (Jubilant Veil) |
| 25 | Rammus | +0.58 | 0.92 | 0.34 |  |
| 26 | Renata Glasc | +0.57 | 0.57 | 0.00 |  |
| 27 | Gnar | +0.56 | 0.56 | 0.00 |  |
| 28 | Heimerdinger | +0.56 | 0.56 | 0.00 |  |
| 29 | Vex | +0.55 | 0.55 | 0.00 |  |
| 30 | Vladimir | +0.55 | 0.55 | 0.00 |  |
| 31 | Galio | +0.54 | 0.75 | 0.21 |  |
| 32 | Jax | +0.52 | 0.86 | 0.34 | attack dodge (Counter Strike) |
| 33 | Tahm Kench | +0.52 | 0.81 | 0.29 |  |
| 34 | Aurelion Sol | +0.51 | 0.51 | 0.00 |  |
| 35 | Janna | +0.51 | 0.51 | 0.00 |  |
| 36 | Nami | +0.51 | 0.51 | 0.00 |  |
| 37 | Maokai | +0.49 | 0.83 | 0.34 |  |
| 38 | Evelynn | +0.49 | 0.79 | 0.30 |  |
| 39 | Urgot | +0.49 | 0.63 | 0.14 |  |
| 40 | Seraphine | +0.49 | 0.49 | 0.00 |  |
| 41 | Sejuani | +0.48 | 0.80 | 0.32 |  |
| 42 | Yuumi | +0.48 | 0.55 | 0.07 |  |
| 43 | Yone | +0.46 | 0.61 | 0.15 |  |
| 44 | Warwick | +0.45 | 0.67 | 0.22 |  |
| 45 | Xayah | +0.45 | 0.45 | 0.00 |  |
| 46 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 47 | Caitlyn | +0.42 | 0.42 | 0.00 |  |
| 48 | Twisted Fate | +0.42 | 0.42 | 0.00 |  |
| 49 | Veigar | +0.42 | 0.42 | 0.00 |  |
| 50 | Zyra | +0.42 | 0.42 | 0.00 |  |
| 51 | Tristana | +0.41 | 0.41 | 0.00 |  |
| 52 | Rakan | +0.40 | 0.52 | 0.12 |  |
| 53 | Varus | +0.40 | 0.40 | 0.00 |  |
| 54 | Teemo | +0.39 | 0.47 | 0.08 | blind (Blinding Dart) |
| 55 | Cassiopeia | +0.39 | 0.39 | 0.00 |  |
| 56 | Shaco | +0.37 | 0.79 | 0.42 |  |
| 57 | Vi | +0.37 | 0.59 | 0.22 |  |
| 58 | Zaahen | +0.37 | 0.56 | 0.19 |  |
| 59 | Ashe | +0.37 | 0.37 | 0.00 |  |
| 60 | Kayle | +0.36 | 0.36 | 0.00 |  |
| 61 | Annie | +0.35 | 0.35 | 0.00 |  |
| 62 | Elise | +0.35 | 0.35 | 0.00 |  |
| 63 | Xin Zhao | +0.34 | 0.63 | 0.29 |  |
| 64 | Lee Sin | +0.34 | 0.56 | 0.22 |  |
| 65 | Riven | +0.34 | 0.56 | 0.22 |  |
| 66 | Ornn | +0.32 | 0.51 | 0.19 |  |
| 67 | Aurora | +0.30 | 0.45 | 0.15 |  |
| 68 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 69 | Singed | +0.28 | 0.96 | 0.68 |  |
| 70 | Fiora | +0.28 | 0.60 | 0.32 |  |
| 71 | Viego | +0.28 | 0.53 | 0.25 |  |
| 72 | Brand | +0.28 | 0.28 | 0.00 |  |
| 73 | Draven | +0.28 | 0.28 | 0.00 |  |
| 74 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 75 | Karma | +0.28 | 0.28 | 0.00 |  |
| 76 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 77 | Milio | +0.28 | 0.28 | 0.00 |  |
| 78 | Quinn | +0.28 | 0.28 | 0.00 |  |
| 79 | Sivir | +0.28 | 0.28 | 0.00 |  |
| 80 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 81 | Swain | +0.28 | 0.28 | 0.00 |  |
| 82 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 83 | Vel'Koz | +0.28 | 0.28 | 0.00 |  |
| 84 | Xerath | +0.28 | 0.28 | 0.00 |  |
| 85 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 86 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 87 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 88 | Sylas | +0.27 | 0.42 | 0.15 |  |
| 89 | Sett | +0.26 | 0.60 | 0.34 |  |
| 90 | Master Yi | +0.26 | 0.55 | 0.29 |  |
| 91 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 92 | Amumu | +0.24 | 0.58 | 0.34 |  |
| 93 | Pyke | +0.24 | 0.56 | 0.32 |  |
| 94 | Azir | +0.24 | 0.24 | 0.00 |  |
| 95 | Poppy | +0.23 | 0.57 | 0.34 |  |
| 96 | Gwen | +0.23 | 0.55 | 0.32 |  |
| 97 | Zed | +0.23 | 0.45 | 0.22 |  |
| 98 | Sona | +0.23 | 0.23 | 0.00 |  |
| 99 | Alistar | +0.22 | 0.56 | 0.34 |  |
| 100 | Gragas | +0.22 | 0.56 | 0.34 |  |
| 101 | Leona | +0.22 | 0.56 | 0.34 |  |
| 102 | Nocturne | +0.22 | 0.56 | 0.34 |  |
| 103 | Kalista | +0.21 | 0.21 | 0.00 |  |
| 104 | Blitzcrank | +0.16 | 0.84 | 0.68 |  |
| 105 | Briar | +0.15 | 0.32 | 0.17 |  |
| 106 | Vayne | +0.14 | 0.28 | 0.14 |  |
| 107 | Morgana | +0.14 | 0.14 | 0.00 |  |
| 108 | Nidalee | +0.14 | 0.14 | 0.00 |  |
| 109 | Malphite | +0.13 | 0.47 | 0.34 |  |
| 110 | Aatrox | +0.13 | 0.42 | 0.29 |  |
| 111 | Neeko | +0.13 | 0.24 | 0.11 |  |
| 112 | Pantheon | +0.09 | 0.28 | 0.19 |  |
| 113 | Jarvan IV | +0.09 | 0.24 | 0.15 |  |
| 114 | Ambessa | +0.08 | 0.30 | 0.22 |  |
| 115 | Bel'Veth | +0.07 | 0.28 | 0.21 |  |
| 116 | Volibear | +0.07 | 0.28 | 0.21 |  |
| 117 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 118 | Lillia | +0.06 | 0.22 | 0.16 |  |
| 119 | LeBlanc | +0.06 | 0.14 | 0.08 |  |
| 120 | Hecarim | +0.04 | 0.23 | 0.19 |  |
| 121 | Kai'Sa | +0.03 | 0.14 | 0.11 |  |
| 122 | Katarina | +0.01 | 0.35 | 0.34 |  |
| 123 | Irelia | +0.01 | 0.28 | 0.27 |  |
| 124 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 125 | Corki | 0.00 | 0.00 | 0.00 |  |
| 126 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 127 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 128 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 129 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 130 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 131 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 132 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 133 | Lux | 0.00 | 0.00 | 0.00 |  |
| 134 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 135 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 136 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 137 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 138 | Sion | -0.03 | 0.56 | 0.59 |  |
| 139 | Naafiri | -0.03 | 0.14 | 0.17 |  |
| 140 | Senna | -0.03 | 0.08 | 0.11 |  |
| 141 | Kassadin | -0.04 | 0.28 | 0.32 |  |
| 142 | Shyvana | -0.04 | 0.28 | 0.32 |  |
| 143 | Nautilus | -0.04 | 0.25 | 0.29 |  |
| 144 | Graves | -0.05 | 0.00 | 0.05 |  |
| 145 | Renekton | -0.06 | 0.28 | 0.34 |  |
| 146 | Udyr | -0.06 | 0.28 | 0.34 |  |
| 147 | Diana | -0.07 | 0.25 | 0.32 |  |
| 148 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 149 | Cho'Gath | -0.12 | 0.56 | 0.68 |  |
| 150 | Mordekaiser | -0.12 | 0.47 | 0.59 |  |
| 151 | Wukong | -0.15 | 0.24 | 0.39 |  |
| 152 | Garen | -0.17 | 0.42 | 0.59 |  |
| 153 | Skarner | -0.18 | 0.45 | 0.63 |  |
| 154 | Qiyana | -0.18 | 0.21 | 0.39 |  |
| 155 | Akali | -0.19 | 0.14 | 0.33 |  |
| 156 | Illaoi | -0.20 | 0.14 | 0.34 |  |
| 157 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 158 | Tryndamere | -0.29 | 0.00 | 0.29 |  |
| 159 | Darius | -0.31 | 0.28 | 0.59 |  |
| 160 | Trundle | -0.31 | 0.28 | 0.59 |  |
| 161 | Yorick | -0.31 | 0.28 | 0.59 |  |
| 162 | Nasus | -0.32 | 0.36 | 0.68 |  |
| 163 | Locke | -0.34 | 0.00 | 0.34 |  |
| 164 | Taric | -0.35 | 0.28 | 0.63 |  |
| 165 | Talon | -0.36 | 0.00 | 0.36 |  |
| 166 | Nunu & Willump | -0.40 | 0.28 | 0.68 |  |
| 167 | Rengar | -0.54 | 0.28 | 0.82 |  |
| 168 | Kha'Zix | -0.55 | 0.00 | 0.55 |  |
| 169 | Dr. Mundo | -0.68 | 0.00 | 0.68 |  |
| 170 | Gangplank | -0.68 | 0.00 | 0.68 |  |
| 171 | Olaf | -0.68 | 0.00 | 0.68 |  |
| 172 | Rumble | -0.68 | 0.00 | 0.68 |  |
