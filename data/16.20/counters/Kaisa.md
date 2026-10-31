# Counters to Kai'Sa (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Kai'Sa: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kai'Sa wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kaisa --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.88 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +1.00 |
| 2 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +1.00 |
| 3 | Master Yi | +0.87 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +1.00 |
| 4 | Gangplank | +0.86 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +1.00 |
| 5 | Udyr | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 6 | Camille | +0.84 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +1.00 |
| 7 | Urgot | +0.84 | +1.00 | +1.00 | +1.00 | +0.30 | +0.94 | +0.00 |
| 8 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +1.00 |
| 9 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +1.00 |
| 10 | Maokai | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 11 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +1.00 |
| 12 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 13 | Warwick | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 14 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 15 | Gragas | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 16 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 17 | Volibear | +0.82 | +1.00 | +1.00 | +1.00 | −0.09 | +0.99 | +0.76 |
| 18 | Riven | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 19 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 20 | Malphite | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 21 | Cho'Gath | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 22 | Jarvan IV | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 23 | Tahm Kench | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 24 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 25 | Amumu | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 26 | Sett | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 27 | Xin Zhao | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 28 | Cassiopeia | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 29 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 30 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 31 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 32 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 33 | Irelia | +0.80 | +0.89 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 34 | Miss Fortune | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 35 | Kennen | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 36 | Singed | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 37 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 38 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 39 | Neeko | +0.80 | +1.00 | +0.93 | +1.00 | +0.23 | – | +0.00 |
| 40 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 41 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 42 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 43 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 44 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 45 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 46 | Braum | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +0.93 | +0.00 |
| 47 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 48 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 49 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 50 | Rumble | +0.77 | +0.96 | +0.96 | +1.00 | −0.04 | +1.00 | +0.00 |
| 51 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 52 | Malzahar | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 53 | Wukong | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 54 | Samira | +0.77 | +0.99 | +0.95 | +1.00 | +0.04 | – | +0.00 |
| 55 | Corki | +0.77 | +0.93 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 56 | Anivia | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 57 | Hwei | +0.75 | +0.90 | +0.92 | +1.00 | +0.12 | – | +0.00 |
| 58 | Lucian | +0.73 | +0.85 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 59 | Mordekaiser | +0.73 | +0.94 | +0.96 | +0.88 | +0.02 | +0.73 | +0.00 |
| 60 | Karma | +0.72 | +0.98 | +0.82 | +1.00 | +0.01 | – | +0.00 |
| 61 | Yasuo | +0.72 | +0.83 | +0.84 | +0.97 | +0.16 | +0.83 | +0.00 |
| 62 | Sion | +0.68 | +0.93 | +0.65 | +1.00 | −0.06 | +0.98 | +0.00 |
| 63 | Zeri | +0.65 | +0.57 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 64 | Gwen | +0.61 | +0.36 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 65 | Gnar | +0.60 | +1.00 | +1.00 | +1.00 | +0.01 | −1.00 | +0.00 |
| 66 | Kled | +0.59 | +1.00 | +1.00 | +1.00 | −0.05 | −1.00 | +0.00 |
| 67 | Darius | +0.59 | +1.00 | +1.00 | +1.00 | −0.08 | −1.00 | +0.00 |
| 68 | Lux | +0.52 | +0.90 | +0.90 | +0.00 | +0.11 | – | +0.00 |
| 69 | Kalista | +0.51 | +0.07 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 70 | Yone | +0.48 | +0.55 | +0.11 | +1.00 | +0.05 | +0.77 | +0.55 |
| 71 | Fizz | +0.45 | +0.00 | +1.00 | +1.00 | +0.02 | +0.00 | +0.00 |
| 72 | Morgana | +0.45 | +0.96 | +1.00 | −0.52 | +0.13 | – | +0.00 |
| 73 | Illaoi | +0.43 | +0.35 | +0.94 | +1.00 | +0.03 | −1.00 | +0.00 |
| 74 | Graves | +0.41 | +1.00 | +1.00 | −1.00 | +0.05 | +1.00 | +0.00 |
| 75 | Rammus | +0.40 | +1.00 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 76 | Smolder | +0.37 | +1.00 | +1.00 | −1.00 | +0.23 | – | +0.00 |
| 77 | Akshan | +0.34 | +1.00 | +1.00 | −1.00 | +0.05 | – | +0.00 |
| 78 | Ambessa | +0.33 | +1.00 | +1.00 | −1.00 | +0.17 | +0.00 | +0.00 |
| 79 | Tristana | +0.30 | +0.00 | +0.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 80 | Galio | +0.29 | +0.29 | +1.00 | +0.00 | +0.09 | −0.50 | +0.00 |
| 81 | Kassadin | +0.28 | −1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 82 | Ziggs | +0.26 | +0.58 | +1.00 | −1.00 | +0.24 | – | +0.00 |
| 83 | Twitch | +0.23 | +0.00 | +0.77 | +0.00 | +0.11 | – | +0.00 |
| 84 | Xayah | +0.22 | +1.00 | −1.00 | +1.00 | +0.00 | – | +0.00 |
| 85 | Garen | +0.21 | −1.00 | +1.00 | +1.00 | +0.21 | −0.21 | +0.00 |
| 86 | Jinx | +0.13 | +0.54 | +0.54 | −0.84 | +0.12 | – | +0.00 |
| 87 | Zaahen | +0.08 | +0.33 | +0.21 | −0.46 | +0.10 | +0.17 | +0.00 |
| 88 | Olaf | +0.07 | −0.39 | +0.29 | +1.00 | −0.02 | −1.00 | +0.00 |
| 89 | Swain | +0.06 | −0.04 | +1.00 | −1.00 | +0.09 | – | +0.00 |
| 90 | Varus | −0.02 | +0.33 | +0.33 | −1.00 | +0.09 | – | +0.00 |
| 91 | Brand | −0.09 | +0.47 | −0.12 | −0.83 | +0.00 | – | +0.00 |
| 92 | Nautilus | −0.09 | +0.50 | +0.25 | −1.00 | +0.15 | −1.00 | +0.00 |
| 93 | Karthus | −0.12 | −0.45 | +0.00 | +0.00 | +0.00 | – | +0.00 |
| 94 | Vel'Koz | −0.15 | +0.05 | +0.05 | −1.00 | +0.28 | – | +0.00 |
| 95 | Draven | −0.15 | −0.38 | −1.00 | +1.00 | +0.08 | – | +0.00 |
| 96 | Kindred | −0.21 | −1.00 | +1.00 | −1.00 | +0.06 | – | +0.00 |
| 97 | Shen | −0.28 | −1.00 | +1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 98 | Vi | −0.31 | −1.00 | +1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 99 | Zyra | −0.32 | −1.00 | −1.00 | +1.00 | +0.08 | – | +0.00 |
| 100 | Taric | −0.34 | +0.00 | −1.00 | +0.00 | +0.07 | −1.00 | +0.00 |
| 101 | Aurora | −0.40 | −0.04 | −0.64 | −1.00 | +0.09 | – | +0.00 |
| 102 | Aatrox | −0.42 | −1.00 | −1.00 | +1.00 | −0.15 | −1.00 | +0.00 |
| 103 | Akali | −0.47 | −0.32 | −0.66 | −1.00 | −0.06 | −0.18 | +0.00 |
| 104 | Zed | −0.48 | −0.50 | −1.00 | +0.00 | −0.02 | −1.00 | +0.00 |
| 105 | Ornn | −0.58 | −1.00 | −0.35 | −1.00 | +0.06 | −0.53 | +0.00 |
| 106 | Leona | −0.58 | −0.56 | −0.56 | −1.00 | −0.02 | −1.00 | +0.00 |
| 107 | Naafiri | −0.59 | −1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.00 |
| 108 | Pantheon | −0.60 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 109 | Ekko | −0.62 | −1.00 | −1.00 | −1.00 | −0.13 | +1.00 | +0.00 |
| 110 | Ryze | −0.64 | −0.68 | −0.91 | −1.00 | +0.17 | – | +0.00 |
| 111 | Skarner | −0.69 | −1.00 | −1.00 | −1.00 | +0.11 | −0.01 | +0.00 |
| 112 | Senna | −0.71 | −0.88 | −0.88 | −1.00 | +0.03 | – | +0.00 |
| 113 | Rengar | −0.74 | −1.00 | −1.00 | −1.00 | +0.38 | −1.00 | +0.00 |
| 114 | Caitlyn | −0.75 | −0.95 | −0.89 | −1.00 | +0.03 | −1.00 | +0.00 |
| 115 | Janna | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 116 | Viktor | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 117 | Ezreal | −0.76 | −0.98 | −0.98 | −1.00 | +0.00 | – | +0.00 |
| 118 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 119 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 120 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 121 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 122 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 123 | Veigar | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 124 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 125 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 126 | Rell | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 127 | Zoe | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 128 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 129 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 130 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 131 | Thresh | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 132 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 133 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 134 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 135 | Quinn | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 136 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 137 | Vladimir | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 138 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 139 | Rakan | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 140 | Sejuani | −0.80 | −1.00 | −0.97 | −1.00 | −0.03 | −1.00 | +0.00 |
| 141 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 142 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 143 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 144 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kai'Sa's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kai'Sa's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kaisa` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yasuo (net +0.57)

- **0.41** projectile block: Wind Wall blocks Kai'Sa's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Kai'Sa basic attacks)
- **0.40** projectile block: Wind Wall blocks Kai'Sa's Void Seeker, a projectile. Wind Wall for 4 s, long enough to use ahead of Void Seeker. (Yasuo W Wind Wall → Kai'Sa W Void Seeker)
- **0.28** projectile block: Wind Wall blocks Kai'Sa's Icathian Rain, a projectile. Wind Wall for 4 s, long enough to use ahead of Icathian Rain. (Yasuo W Wind Wall → Kai'Sa Q Icathian Rain)
- Watch out: Kai'Sa's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 2. Hwei (net +0.57)

- **0.35** dash stop: Grim Visage's knockdown can stop Kai'Sa's Killer Instinct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Kai'Sa R Killer Instinct)
- **0.11** reveal: Gaze of the Abyss reveals Kai'Sa through Supercharge's stealth. (Hwei W Gaze of the Abyss → Kai'Sa E Supercharge)
- **0.11** reveal: Spiraling Despair reveals Kai'Sa through Supercharge's stealth. (Hwei R Spiraling Despair → Kai'Sa E Supercharge)

#### 3. Samira (net +0.55)

- **0.35** projectile block: Blade Whirl blocks Kai'Sa's Void Seeker, a projectile. Blade Whirl for 0.75 s; Void Seeker takes 2.11 s to land, enough to react. (Samira W Blade Whirl → Kai'Sa W Void Seeker)
- **0.32** projectile block: Blade Whirl blocks Kai'Sa's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kai'Sa basic attacks)
- **0.15** projectile block: Blade Whirl blocks Kai'Sa's Icathian Rain, a projectile. Blade Whirl for 0.75 s; Icathian Rain lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Kai'Sa Q Icathian Rain)

#### 4. Mel (net +0.53)

- **0.33** projectile block: Rebuttal blocks Kai'Sa's Void Seeker, a projectile. Rebuttal for 0.75 s; Void Seeker takes 2.11 s to land, enough to react. (Mel W Rebuttal → Kai'Sa W Void Seeker)
- **0.32** projectile block: Rebuttal blocks Kai'Sa's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Kai'Sa basic attacks)
- **0.15** projectile block: Rebuttal blocks Kai'Sa's Icathian Rain, a projectile. Rebuttal for 0.75 s; Icathian Rain lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Mel W Rebuttal → Kai'Sa Q Icathian Rain)

#### 5. Braum (net +0.48)

- **0.54** projectile block: Unbreakable blocks Kai'Sa's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kai'Sa basic attacks)
- **0.45** projectile block: Unbreakable blocks Kai'Sa's Void Seeker, a projectile. Unbreakable for 4 s, long enough to use ahead of Void Seeker. (Braum E Unbreakable → Kai'Sa W Void Seeker)
- **0.38** projectile block: Unbreakable blocks Kai'Sa's Icathian Rain, a projectile. Unbreakable for 4 s, long enough to use ahead of Icathian Rain. (Braum E Unbreakable → Kai'Sa Q Icathian Rain)
- Watch out: Kai'Sa's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 6. Lulu (net +0.47)

- **0.36** disarm: Whimsy disarms Kai'Sa for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kai'Sa basic attacks)
- **0.11** reveal: Help, Pix! reveals Kai'Sa through Supercharge's stealth. (Lulu E Help, Pix! → Kai'Sa E Supercharge)

#### 7. Vex (net +0.46)

- **0.35** dash stop: Doom 'n Gloom's knockdown can stop Kai'Sa's Killer Instinct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Vex I Doom 'n Gloom → Kai'Sa R Killer Instinct)
- **0.11** reveal: Shadow Surge reveals Kai'Sa through Supercharge's stealth. (Vex R Shadow Surge → Kai'Sa E Supercharge)

#### 8. Teemo (net +0.42)

- **0.50** blind: Blinding Dart's blind makes Kai'Sa's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kai'Sa basic attacks)
- Watch out: Void Seeker reveals Teemo through Guerrilla Warfare's stealth.

#### 9. Malzahar (net +0.38)

- **0.32** dash stop: Nether Grasp's knockdown can stop Kai'Sa's Killer Instinct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Kai'Sa R Killer Instinct)
- **0.11** reveal: Nether Grasp reveals Kai'Sa through Supercharge's stealth. (Malzahar R Nether Grasp → Kai'Sa E Supercharge)

#### 10. Ahri (net +0.35)

- **0.35** dash stop: Charm's knockdown can stop Kai'Sa's Killer Instinct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Ahri E Charm → Kai'Sa R Killer Instinct)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yasuo | +0.57 | 0.79 | 0.22 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 2 | Hwei | +0.57 | 0.57 | 0.00 |  |
| 3 | Samira | +0.55 | 0.55 | 0.00 |  |
| 4 | Mel | +0.53 | 0.53 | 0.00 |  |
| 5 | Braum | +0.48 | 0.86 | 0.38 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 6 | Lulu | +0.47 | 0.47 | 0.00 |  |
| 7 | Vex | +0.46 | 0.46 | 0.00 |  |
| 8 | Teemo | +0.42 | 0.50 | 0.08 | blind (Blinding Dart) |
| 9 | Malzahar | +0.38 | 0.38 | 0.00 |  |
| 10 | Ahri | +0.35 | 0.35 | 0.00 |  |
| 11 | Jinx | +0.35 | 0.35 | 0.00 |  |
| 12 | Veigar | +0.35 | 0.35 | 0.00 |  |
| 13 | Viktor | +0.35 | 0.35 | 0.00 |  |
| 14 | Caitlyn | +0.33 | 0.33 | 0.00 |  |
| 15 | Cassiopeia | +0.33 | 0.33 | 0.00 |  |
| 16 | Lissandra | +0.32 | 0.32 | 0.00 |  |
| 17 | Fiddlesticks | +0.22 | 0.22 | 0.00 |  |
| 18 | Karma | +0.22 | 0.22 | 0.00 |  |
| 19 | Kled | +0.20 | 0.33 | 0.13 |  |
| 20 | Tristana | +0.16 | 0.16 | 0.00 |  |
| 21 | Warwick | +0.15 | 0.41 | 0.26 |  |
| 22 | Yone | +0.15 | 0.32 | 0.17 |  |
| 23 | Shen | +0.13 | 0.39 | 0.26 |  |
| 24 | Elise | +0.11 | 0.11 | 0.00 |  |
| 25 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 26 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 27 | Twisted Fate | +0.11 | 0.11 | 0.00 |  |
| 28 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 29 | Kayle | +0.09 | 0.09 | 0.00 |  |
| 30 | Zac | +0.07 | 0.41 | 0.34 |  |
| 31 | Ashe | +0.07 | 0.07 | 0.00 |  |
| 32 | Poppy | +0.06 | 0.44 | 0.38 |  |
| 33 | Nilah | +0.06 | 0.35 | 0.29 |  |
| 34 | Thresh | +0.06 | 0.11 | 0.05 |  |
| 35 | Annie | +0.05 | 0.05 | 0.00 |  |
| 36 | Anivia | +0.04 | 0.04 | 0.00 |  |
| 37 | Jax | +0.03 | 0.41 | 0.38 | attack dodge (Counter Strike) |
| 38 | LeBlanc | +0.03 | 0.11 | 0.08 |  |
| 39 | Rammus | 0.00 | 0.38 | 0.38 |  |
| 40 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 41 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 42 | Azir | 0.00 | 0.00 | 0.00 |  |
| 43 | Bard | 0.00 | 0.00 | 0.00 |  |
| 44 | Brand | 0.00 | 0.00 | 0.00 |  |
| 45 | Corki | 0.00 | 0.00 | 0.00 |  |
| 46 | Draven | 0.00 | 0.00 | 0.00 |  |
| 47 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 48 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 49 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 50 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 51 | Janna | 0.00 | 0.00 | 0.00 |  |
| 52 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 53 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 54 | Kalista | 0.00 | 0.00 | 0.00 |  |
| 55 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 56 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 57 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 58 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 59 | Lux | 0.00 | 0.00 | 0.00 |  |
| 60 | Milio | 0.00 | 0.00 | 0.00 |  |
| 61 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 62 | Nami | 0.00 | 0.00 | 0.00 |  |
| 63 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 64 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 65 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 66 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 67 | Sivir | 0.00 | 0.00 | 0.00 |  |
| 68 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 69 | Sona | 0.00 | 0.00 | 0.00 |  |
| 70 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 71 | Swain | 0.00 | 0.00 | 0.00 |  |
| 72 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 73 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 74 | Varus | 0.00 | 0.00 | 0.00 |  |
| 75 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 76 | Xayah | 0.00 | 0.00 | 0.00 |  |
| 77 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 78 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 79 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 80 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 81 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 82 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 83 | Akshan | -0.03 | 0.11 | 0.14 |  |
| 84 | Morgana | -0.03 | 0.11 | 0.14 |  |
| 85 | Lee Sin | -0.04 | 0.22 | 0.26 |  |
| 86 | Senna | -0.05 | 0.06 | 0.11 |  |
| 87 | Fizz | -0.06 | 0.11 | 0.17 |  |
| 88 | Sylas | -0.06 | 0.11 | 0.17 |  |
| 89 | Urgot | -0.06 | 0.11 | 0.17 |  |
| 90 | Graves | -0.06 | 0.00 | 0.06 |  |
| 91 | Briar | -0.08 | 0.11 | 0.19 |  |
| 92 | Naafiri | -0.08 | 0.11 | 0.19 |  |
| 93 | Amumu | -0.09 | 0.29 | 0.38 |  |
| 94 | Yuumi | -0.10 | 0.00 | 0.10 |  |
| 95 | Kayn | -0.11 | 0.11 | 0.22 |  |
| 96 | Rek'Sai | -0.11 | 0.11 | 0.22 |  |
| 97 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 98 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 99 | Malphite | -0.13 | 0.25 | 0.38 |  |
| 100 | Karthus | -0.14 | 0.00 | 0.14 |  |
| 101 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 102 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 103 | Vladimir | -0.14 | 0.00 | 0.14 |  |
| 104 | Ambessa | -0.15 | 0.11 | 0.26 |  |
| 105 | Vi | -0.15 | 0.11 | 0.26 |  |
| 106 | Aurora | -0.15 | 0.00 | 0.15 |  |
| 107 | Jarvan IV | -0.17 | 0.00 | 0.17 |  |
| 108 | K'Sante | -0.18 | 0.00 | 0.18 |  |
| 109 | Camille | -0.19 | 0.00 | 0.19 |  |
| 110 | Lillia | -0.19 | 0.00 | 0.19 |  |
| 111 | Hecarim | -0.22 | 0.00 | 0.22 |  |
| 112 | Ornn | -0.22 | 0.00 | 0.22 |  |
| 113 | Pantheon | -0.22 | 0.00 | 0.22 |  |
| 114 | Rell | -0.22 | 0.00 | 0.22 |  |
| 115 | Zaahen | -0.22 | 0.00 | 0.22 |  |
| 116 | Aatrox | -0.23 | 0.11 | 0.34 |  |
| 117 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 118 | Galio | -0.24 | 0.00 | 0.24 |  |
| 119 | Volibear | -0.24 | 0.00 | 0.24 |  |
| 120 | Akali | -0.26 | 0.11 | 0.37 |  |
| 121 | Ekko | -0.26 | 0.00 | 0.26 |  |
| 122 | Riven | -0.26 | 0.00 | 0.26 |  |
| 123 | Zed | -0.26 | 0.00 | 0.26 |  |
| 124 | Illaoi | -0.27 | 0.11 | 0.38 |  |
| 125 | Sett | -0.27 | 0.11 | 0.38 |  |
| 126 | Fiora | -0.27 | 0.09 | 0.36 |  |
| 127 | Viego | -0.27 | 0.00 | 0.27 |  |
| 128 | Irelia | -0.31 | 0.00 | 0.31 |  |
| 129 | Evelynn | -0.34 | 0.00 | 0.34 |  |
| 130 | Master Yi | -0.34 | 0.00 | 0.34 |  |
| 131 | Nautilus | -0.34 | 0.00 | 0.34 |  |
| 132 | Tahm Kench | -0.34 | 0.00 | 0.34 |  |
| 133 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 134 | Xin Zhao | -0.34 | 0.00 | 0.34 |  |
| 135 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 136 | Diana | -0.36 | 0.00 | 0.36 |  |
| 137 | Gwen | -0.36 | 0.00 | 0.36 |  |
| 138 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 139 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 140 | Shyvana | -0.36 | 0.00 | 0.36 |  |
| 141 | Nasus | -0.38 | 0.39 | 0.77 |  |
| 142 | Alistar | -0.38 | 0.00 | 0.38 |  |
| 143 | Gragas | -0.38 | 0.00 | 0.38 |  |
| 144 | Katarina | -0.38 | 0.00 | 0.38 |  |
| 145 | Leona | -0.38 | 0.00 | 0.38 |  |
| 146 | Locke | -0.38 | 0.00 | 0.38 |  |
| 147 | Maokai | -0.38 | 0.00 | 0.38 |  |
| 148 | Nocturne | -0.38 | 0.00 | 0.38 |  |
| 149 | Renekton | -0.38 | 0.00 | 0.38 |  |
| 150 | Udyr | -0.38 | 0.00 | 0.38 |  |
| 151 | Talon | -0.40 | 0.00 | 0.40 |  |
| 152 | Wukong | -0.42 | 0.00 | 0.42 |  |
| 153 | Qiyana | -0.42 | 0.00 | 0.42 |  |
| 154 | Singed | -0.43 | 0.34 | 0.77 |  |
| 155 | Shaco | -0.46 | 0.00 | 0.46 |  |
| 156 | Skarner | -0.50 | 0.22 | 0.72 |  |
| 157 | Mordekaiser | -0.51 | 0.16 | 0.67 |  |
| 158 | Garen | -0.56 | 0.11 | 0.67 |  |
| 159 | Kha'Zix | -0.59 | 0.00 | 0.59 |  |
| 160 | Darius | -0.67 | 0.00 | 0.67 |  |
| 161 | Sion | -0.67 | 0.00 | 0.67 |  |
| 162 | Trundle | -0.67 | 0.00 | 0.67 |  |
| 163 | Yorick | -0.67 | 0.00 | 0.67 |  |
| 164 | Rengar | -0.69 | 0.22 | 0.91 |  |
| 165 | Taric | -0.72 | 0.00 | 0.72 |  |
| 166 | Blitzcrank | -0.77 | 0.00 | 0.77 |  |
| 167 | Cho'Gath | -0.77 | 0.00 | 0.77 |  |
| 168 | Dr. Mundo | -0.77 | 0.00 | 0.77 |  |
| 169 | Gangplank | -0.77 | 0.00 | 0.77 |  |
| 170 | Nunu & Willump | -0.77 | 0.00 | 0.77 |  |
| 171 | Olaf | -0.77 | 0.00 | 0.77 |  |
| 172 | Rumble | -0.77 | 0.00 | 0.77 |  |
