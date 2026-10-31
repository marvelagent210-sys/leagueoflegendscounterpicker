# Counters to Vayne (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Vayne: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Vayne wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Vayne --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.90 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +1.00 |
| 2 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.40 | – | +0.00 |
| 3 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 4 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 5 | Heimerdinger | +0.72 | +1.00 | +0.74 | +1.00 | +0.08 | – | +0.00 |
| 6 | Kog'Maw | +0.30 | +1.00 | +0.00 | +0.00 | +0.14 | – | +0.00 |
| 7 | Yorick | −0.13 | −0.82 | +0.00 | +1.00 | −0.15 | −1.00 | +0.00 |
| 8 | Gangplank | −0.33 | +1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 9 | Nasus | −0.42 | −1.00 | −1.00 | +1.00 | −0.12 | −1.00 | +0.00 |
| 10 | Twisted Fate | −0.50 | +0.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 11 | Yasuo | −0.57 | −1.00 | −1.00 | +0.13 | +0.04 | −1.00 | +0.00 |
| 12 | Jayce | −0.62 | −1.00 | −1.00 | +0.00 | −0.11 | −1.00 | +0.00 |
| 13 | Sion | −0.72 | −0.64 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 14 | Lissandra | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 15 | Xayah | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 16 | Aphelios | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 17 | Malzahar | −0.76 | −1.00 | −0.97 | −1.00 | +0.07 | – | +0.00 |
| 18 | Ziggs | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 19 | Annie | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 20 | Zeri | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 21 | Samira | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 22 | Corki | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 23 | Sivir | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 24 | Orianna | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 25 | Warwick | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 26 | Swain | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 27 | Akshan | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 28 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.02 |
| 29 | Jinx | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 30 | Aurora | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 31 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 32 | Zyra | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 33 | Lulu | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.01 |
| 34 | Zoe | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 35 | Hwei | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 36 | Karma | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 37 | Ezreal | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 38 | Soraka | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 39 | Lux | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.07 |
| 40 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 41 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 42 | Draven | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 43 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 44 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 45 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 46 | Morgana | −0.78 | −0.94 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 47 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 48 | Poppy | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 49 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 50 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.05 |
| 51 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 52 | Varus | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 53 | Neeko | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 54 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 55 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 56 | Maokai | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 57 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.39 |
| 58 | Vel'Koz | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.56 |
| 59 | Rengar | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.11 |
| 60 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 61 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 62 | Brand | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 63 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 64 | Kai'Sa | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 65 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 66 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 67 | Ambessa | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 68 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.50 |
| 69 | Rakan | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 70 | Kalista | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 71 | Lee Sin | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 72 | Taric | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 73 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 74 | Zaahen | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 75 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 76 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 77 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 78 | Jarvan IV | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 79 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 80 | Dr. Mundo | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 81 | Anivia | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 82 | Master Yi | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 83 | Mordekaiser | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 84 | Irelia | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 85 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 86 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 87 | Kennen | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 88 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 89 | Ornn | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 90 | Leona | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 91 | Udyr | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 92 | Quinn | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.56 |
| 93 | Naafiri | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 94 | Nocturne | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 95 | Kassadin | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 96 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 97 | Jhin | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | – | −1.00 |
| 98 | Nami | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.88 |
| 99 | Sejuani | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 100 | Malphite | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 101 | Tryndamere | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 102 | Tahm Kench | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 103 | Rammus | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 104 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 105 | Xin Zhao | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 106 | Nunu & Willump | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 107 | Miss Fortune | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 108 | Urgot | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.07 |
| 109 | Darius | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 110 | Vex | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | – | −1.00 |
| 111 | Ashe | −0.83 | −1.00 | −1.00 | −1.00 | +0.03 | – | −1.00 |
| 112 | Sett | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 113 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 114 | Camille | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 115 | Olaf | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 116 | Viktor | −0.83 | −1.00 | −1.00 | −1.00 | +0.02 | – | −1.00 |
| 117 | Jax | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 118 | Garen | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 119 | Volibear | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 120 | Shen | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 121 | Kindred | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | – | −1.00 |
| 122 | Amumu | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 123 | Galio | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 124 | Skarner | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 125 | Wukong | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 126 | Kled | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 127 | Alistar | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 128 | Trundle | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 129 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 130 | Vi | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 131 | Kha'Zix | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 132 | Riven | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 133 | Renekton | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 134 | Caitlyn | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −1.00 |
| 135 | Katarina | −0.85 | −1.00 | −1.00 | −1.00 | −0.32 | −1.00 | +0.00 |
| 136 | Graves | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −1.00 |
| 137 | Gwen | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | +0.00 |
| 138 | Tristana | −0.86 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −1.00 |
| 139 | Diana | −0.88 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −1.00 |
| 140 | Aatrox | −0.88 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −1.00 |
| 141 | Singed | −0.88 | −1.00 | −1.00 | −1.00 | −0.54 | −1.00 | +0.00 |
| 142 | Rell | −0.88 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −1.00 |
| 143 | Talon | −0.90 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | −1.00 |
| 144 | Yone | −0.90 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Vayne's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vayne's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Vayne` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +0.84)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Vayne's Condemn. Untargetable for 0.75 s; Condemn takes 0.5 s to land, enough to react. (Fizz E Playful → Vayne E Condemn)
- **0.39** untargetable: Playful makes Fizz untargetable, dodging Vayne's Tumble. Untargetable for 0.75 s; Tumble takes 0.6 s to land, enough to react. (Fizz E Playful → Vayne Q Tumble)
- **0.14** reveal: Chum the Waters reveals Vayne through Final Hour's stealth. (Fizz R Chum the Waters → Vayne R Final Hour)
- Watch out: Vayne's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 2. Teemo (net +0.80)

- **0.57** blind: Blinding Dart's blind makes Vayne's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Vayne basic attacks)
- **0.46** blind: Blinding Dart's blind makes Vayne's Tumble, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Vayne Q Tumble)

#### 3. Yasuo (net +0.69)

- **0.58** projectile block: Wind Wall blocks Vayne's Condemn, a projectile. Wind Wall for 4 s, long enough to use ahead of Condemn. (Yasuo W Wind Wall → Vayne E Condemn)
- **0.47** projectile block: Wind Wall blocks Vayne's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Vayne basic attacks)
- **0.14** reveal: Last Breath reveals Vayne through Final Hour's stealth. (Yasuo R Last Breath → Vayne R Final Hour)
- Watch out: Vayne's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 4. Samira (net +0.69)

- **0.51** projectile block: Blade Whirl blocks Vayne's Condemn, a projectile. Blade Whirl for 0.75 s; Condemn takes 0.5 s to land, enough to react. (Samira W Blade Whirl → Vayne E Condemn)
- **0.36** projectile block: Blade Whirl blocks Vayne's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Vayne basic attacks)

#### 5. Mel (net +0.65)

- **0.47** projectile block: Rebuttal blocks Vayne's Condemn, a projectile. Rebuttal for 0.75 s; Condemn takes 0.5 s to land, enough to react. (Mel W Rebuttal → Vayne E Condemn)
- **0.36** projectile block: Rebuttal blocks Vayne's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Vayne basic attacks)

#### 6. Braum (net +0.57)

- **0.70** projectile block: Unbreakable blocks Vayne's Condemn, a projectile. Unbreakable for 4 s, long enough to use ahead of Condemn. (Braum E Unbreakable → Vayne E Condemn)
- **0.60** projectile block: Unbreakable blocks Vayne's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Vayne basic attacks)
- Watch out: Vayne's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 7. Sivir (net +0.56)

- **0.56** spell shield: Spell Shield's spell shield blocks Vayne's Condemn. Spell shield for 1.5 s, long enough to use ahead of Condemn. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vayne E Condemn)

#### 8. Lulu (net +0.54)

- **0.40** disarm: Whimsy disarms Vayne for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Vayne basic attacks)
- **0.14** reveal: Help, Pix! reveals Vayne through Final Hour's stealth. (Lulu E Help, Pix! → Vayne R Final Hour)

#### 9. Morgana (net +0.53)

- **0.60** cc immunity: Black Shield makes Morgana immune to Vayne's Condemn (airborne, stun). Immune for 5 s, long enough to use ahead of Condemn. (Morgana E Black Shield → Vayne E Condemn)
- **0.14** reveal: Soul Shackles reveals Vayne through Final Hour's stealth. (Morgana R Soul Shackles → Vayne R Final Hour)
- Watch out: Vayne's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

#### 10. Yuumi (net +0.52)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Vayne's Condemn. Untargetable for ?; Condemn takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Vayne E Condemn)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Vayne's Tumble. Untargetable for ?; Tumble takes 0.6 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Vayne Q Tumble)
- Watch out: Condemn's airborne interrupts Yuumi's Final Chapter (normal channel).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +0.84 | 1.04 | 0.20 |  |
| 2 | Teemo | +0.80 | 0.80 | 0.00 | blind (Blinding Dart), blind (Blinding Dart) |
| 3 | Yasuo | +0.69 | 0.96 | 0.27 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Samira | +0.69 | 0.69 | 0.00 | projectile block (Blade Whirl) |
| 5 | Mel | +0.65 | 0.65 | 0.00 | projectile block (Rebuttal) |
| 6 | Braum | +0.57 | 1.00 | 0.43 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Sivir | +0.56 | 0.56 | 0.00 |  |
| 8 | Lulu | +0.54 | 0.54 | 0.00 | disarm (Whimsy) |
| 9 | Morgana | +0.53 | 0.74 | 0.21 |  |
| 10 | Yuumi | +0.52 | 1.05 | 0.53 |  |
| 11 | Kled | +0.52 | 0.68 | 0.16 |  |
| 12 | Lissandra | +0.52 | 0.52 | 0.00 |  |
| 13 | Vladimir | +0.49 | 0.77 | 0.28 |  |
| 14 | Aurora | +0.49 | 0.49 | 0.00 |  |
| 15 | Bard | +0.49 | 0.49 | 0.00 |  |
| 16 | Xayah | +0.48 | 0.48 | 0.00 |  |
| 17 | Fiora | +0.46 | 0.89 | 0.43 |  |
| 18 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 19 | Maokai | +0.45 | 0.88 | 0.43 |  |
| 20 | Kayle | +0.45 | 0.45 | 0.00 |  |
| 21 | Milio | +0.36 | 0.36 | 0.00 |  |
| 22 | Vex | +0.35 | 0.35 | 0.00 |  |
| 23 | Nocturne | +0.34 | 0.77 | 0.43 |  |
| 24 | Cassiopeia | +0.33 | 0.33 | 0.00 |  |
| 25 | Gwen | +0.30 | 0.73 | 0.43 |  |
| 26 | Camille | +0.29 | 0.50 | 0.21 |  |
| 27 | Karma | +0.28 | 0.28 | 0.00 |  |
| 28 | Udyr | +0.27 | 0.70 | 0.43 |  |
| 29 | Rek'Sai | +0.26 | 0.53 | 0.27 |  |
| 30 | Kalista | +0.26 | 0.26 | 0.00 |  |
| 31 | Jax | +0.22 | 0.65 | 0.43 | attack dodge (Counter Strike) |
| 32 | Nilah | +0.21 | 0.56 | 0.35 | attack dodge (Jubilant Veil) |
| 33 | Evelynn | +0.20 | 0.49 | 0.29 |  |
| 34 | Shaco | +0.20 | 0.49 | 0.29 |  |
| 35 | Zed | +0.19 | 0.48 | 0.29 |  |
| 36 | Ahri | +0.18 | 0.18 | 0.00 |  |
| 37 | Jinx | +0.18 | 0.18 | 0.00 |  |
| 38 | Malzahar | +0.17 | 0.57 | 0.40 |  |
| 39 | Veigar | +0.17 | 0.17 | 0.00 |  |
| 40 | Viktor | +0.17 | 0.17 | 0.00 |  |
| 41 | Elise | +0.14 | 0.14 | 0.00 |  |
| 42 | Kai'Sa | +0.14 | 0.14 | 0.00 |  |
| 43 | LeBlanc | +0.14 | 0.14 | 0.00 |  |
| 44 | Nidalee | +0.14 | 0.14 | 0.00 |  |
| 45 | Renata Glasc | +0.14 | 0.14 | 0.00 |  |
| 46 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 47 | Zyra | +0.14 | 0.14 | 0.00 |  |
| 48 | Master Yi | +0.13 | 0.73 | 0.60 |  |
| 49 | Caitlyn | +0.09 | 0.37 | 0.28 |  |
| 50 | Zaahen | +0.07 | 0.34 | 0.27 |  |
| 51 | Thresh | +0.07 | 0.14 | 0.07 |  |
| 52 | Annie | +0.04 | 0.04 | 0.00 |  |
| 53 | Yone | +0.02 | 0.22 | 0.20 |  |
| 54 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 55 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 56 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 57 | Azir | 0.00 | 0.00 | 0.00 |  |
| 58 | Brand | 0.00 | 0.00 | 0.00 |  |
| 59 | Corki | 0.00 | 0.00 | 0.00 |  |
| 60 | Draven | 0.00 | 0.00 | 0.00 |  |
| 61 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 62 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 63 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 64 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 65 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 66 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 67 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 68 | Lux | 0.00 | 0.00 | 0.00 |  |
| 69 | Nami | 0.00 | 0.00 | 0.00 |  |
| 70 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 71 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 72 | Senna | 0.00 | 0.00 | 0.00 |  |
| 73 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 74 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 75 | Sona | 0.00 | 0.00 | 0.00 |  |
| 76 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 77 | Swain | 0.00 | 0.00 | 0.00 |  |
| 78 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 79 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 80 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 81 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 82 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 83 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 84 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 85 | Lee Sin | -0.01 | 0.28 | 0.29 |  |
| 86 | Rengar | -0.02 | 0.84 | 0.86 |  |
| 87 | Xin Zhao | -0.02 | 0.38 | 0.40 |  |
| 88 | Sylas | -0.06 | 0.14 | 0.20 |  |
| 89 | Briar | -0.07 | 0.14 | 0.21 |  |
| 90 | K'Sante | -0.07 | 0.14 | 0.21 |  |
| 91 | Urgot | -0.07 | 0.14 | 0.21 |  |
| 92 | Malphite | -0.08 | 0.35 | 0.43 |  |
| 93 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 94 | Graves | -0.09 | 0.00 | 0.09 |  |
| 95 | Varus | -0.11 | 0.00 | 0.11 |  |
| 96 | Shen | -0.13 | 0.61 | 0.74 | attack block (Spirit's Refuge) |
| 97 | Jarvan IV | -0.13 | 0.07 | 0.20 |  |
| 98 | Akshan | -0.14 | 0.14 | 0.28 |  |
| 99 | Akali | -0.15 | 0.14 | 0.29 |  |
| 100 | Ambessa | -0.15 | 0.14 | 0.29 |  |
| 101 | Fiddlesticks | -0.16 | 0.28 | 0.44 |  |
| 102 | Alistar | -0.16 | 0.27 | 0.43 |  |
| 103 | Quinn | -0.18 | 0.00 | 0.18 |  |
| 104 | Rakan | -0.18 | 0.00 | 0.18 |  |
| 105 | Poppy | -0.19 | 0.44 | 0.63 |  |
| 106 | Kayn | -0.20 | 0.52 | 0.72 |  |
| 107 | Hecarim | -0.20 | 0.07 | 0.27 |  |
| 108 | Ornn | -0.20 | 0.07 | 0.27 |  |
| 109 | Twisted Fate | -0.21 | 0.14 | 0.35 |  |
| 110 | Illaoi | -0.22 | 0.21 | 0.43 |  |
| 111 | Volibear | -0.22 | 0.07 | 0.29 |  |
| 112 | Ivern | -0.22 | 0.00 | 0.22 |  |
| 113 | Rammus | -0.24 | 0.43 | 0.67 | attack reflect (Defensive Ball Curl) |
| 114 | Lillia | -0.24 | 0.00 | 0.24 |  |
| 115 | Sett | -0.25 | 0.18 | 0.43 |  |
| 116 | Aatrox | -0.26 | 0.14 | 0.40 |  |
| 117 | Wukong | -0.27 | 0.00 | 0.27 |  |
| 118 | Rell | -0.27 | 0.00 | 0.27 |  |
| 119 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 120 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 121 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 122 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 123 | Amumu | -0.29 | 0.14 | 0.43 |  |
| 124 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 125 | Ekko | -0.29 | 0.00 | 0.29 |  |
| 126 | Qiyana | -0.29 | 0.00 | 0.29 |  |
| 127 | Riven | -0.29 | 0.00 | 0.29 |  |
| 128 | Talon | -0.29 | 0.00 | 0.29 |  |
| 129 | Pantheon | -0.30 | 0.47 | 0.77 |  |
| 130 | Viego | -0.32 | 0.07 | 0.39 |  |
| 131 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 132 | Gangplank | -0.35 | 0.51 | 0.86 |  |
| 133 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 134 | Shyvana | -0.36 | 0.07 | 0.43 |  |
| 135 | Irelia | -0.38 | 0.00 | 0.38 |  |
| 136 | Warwick | -0.40 | 0.53 | 0.93 |  |
| 137 | Janna | -0.40 | 0.00 | 0.40 |  |
| 138 | Nautilus | -0.40 | 0.00 | 0.40 |  |
| 139 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 140 | Nasus | -0.43 | 0.43 | 0.86 | attack speed slow (Wither) |
| 141 | Diana | -0.43 | 0.00 | 0.43 |  |
| 142 | Kassadin | -0.43 | 0.00 | 0.43 |  |
| 143 | Kha'Zix | -0.43 | 0.00 | 0.43 |  |
| 144 | Leona | -0.43 | 0.00 | 0.43 |  |
| 145 | Locke | -0.43 | 0.00 | 0.43 |  |
| 146 | Pyke | -0.43 | 0.00 | 0.43 |  |
| 147 | Renekton | -0.43 | 0.00 | 0.43 |  |
| 148 | Sejuani | -0.43 | 0.00 | 0.43 |  |
| 149 | Vi | -0.46 | 0.18 | 0.64 |  |
| 150 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 151 | Garen | -0.49 | 0.32 | 0.81 |  |
| 152 | Karthus | -0.49 | 0.00 | 0.49 |  |
| 153 | Olaf | -0.52 | 0.34 | 0.86 |  |
| 154 | Singed | -0.52 | 0.34 | 0.86 |  |
| 155 | Naafiri | -0.52 | 0.14 | 0.66 |  |
| 156 | Sion | -0.57 | 0.36 | 0.93 |  |
| 157 | Zac | -0.57 | 0.26 | 0.83 |  |
| 158 | Skarner | -0.58 | 0.28 | 0.86 |  |
| 159 | Gragas | -0.58 | 0.00 | 0.58 |  |
| 160 | Mordekaiser | -0.62 | 0.19 | 0.81 |  |
| 161 | Katarina | -0.71 | 0.00 | 0.71 |  |
| 162 | Darius | -0.81 | 0.00 | 0.81 |  |
| 163 | Trundle | -0.81 | 0.00 | 0.81 |  |
| 164 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 165 | Blitzcrank | -0.86 | 0.00 | 0.86 |  |
| 166 | Cho'Gath | -0.86 | 0.00 | 0.86 |  |
| 167 | Dr. Mundo | -0.86 | 0.00 | 0.86 |  |
| 168 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 169 | Taric | -0.86 | 0.00 | 0.86 |  |
| 170 | Galio | -0.88 | 0.00 | 0.88 |  |
| 171 | Tahm Kench | -0.90 | 0.00 | 0.90 |  |
| 172 | Nunu & Willump | -1.35 | 0.00 | 1.35 |  |
