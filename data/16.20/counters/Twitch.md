# Counters to Twitch (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Twitch: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Twitch wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Twitch --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.85 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.00 |
| 2 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 3 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 4 | Skarner | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 5 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +1.00 |
| 6 | Diana | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 7 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 8 | Xin Zhao | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 9 | Jarvan IV | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 10 | Tahm Kench | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 11 | Rell | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 12 | Yasuo | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 13 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 14 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 15 | Ambessa | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 16 | Gragas | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 17 | Nautilus | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 18 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 19 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 20 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 21 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 22 | Sejuani | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 23 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 24 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 25 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 26 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 27 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +0.91 | +0.00 |
| 28 | Urgot | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | +0.94 | +0.00 |
| 29 | Zeri | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 30 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 31 | Rakan | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 32 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 33 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 34 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 35 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 36 | Aatrox | +0.79 | +1.00 | +0.98 | +1.00 | −0.00 | +1.00 | +0.00 |
| 37 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 38 | Miss Fortune | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 39 | Singed | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 40 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 41 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 42 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 43 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 44 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 45 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 46 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 47 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 48 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 49 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 50 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 51 | Vi | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 52 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 53 | Vayne | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 54 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 55 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 56 | Wukong | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 57 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 58 | Kindred | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 59 | Swain | +0.78 | +0.94 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 60 | Akshan | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 61 | Kassadin | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 62 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 63 | Lucian | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 64 | Jinx | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 65 | Riven | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 66 | Mordekaiser | +0.77 | +0.97 | +1.00 | +1.00 | −0.14 | +0.93 | +0.00 |
| 67 | Twisted Fate | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 68 | Samira | +0.76 | +0.92 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 69 | Zed | +0.74 | +1.00 | +1.00 | +1.00 | −0.08 | +0.50 | +0.00 |
| 70 | Rumble | +0.73 | +1.00 | +0.98 | +1.00 | −0.15 | +0.56 | +0.00 |
| 71 | Ashe | +0.72 | +0.74 | +0.98 | +1.00 | +0.12 | – | +0.00 |
| 72 | Leona | +0.70 | +0.78 | +0.94 | +1.00 | +0.00 | +0.65 | +0.00 |
| 73 | Cassiopeia | +0.66 | +0.63 | +0.88 | +1.00 | +0.09 | – | +0.00 |
| 74 | Braum | +0.66 | +0.95 | +0.95 | +1.00 | −0.09 | −0.05 | +0.00 |
| 75 | Aphelios | +0.58 | +1.00 | +1.00 | +0.00 | +0.16 | – | +0.00 |
| 76 | Cho'Gath | +0.54 | +1.00 | +0.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 77 | Anivia | +0.54 | +0.46 | +0.70 | +1.00 | −0.06 | – | +0.00 |
| 78 | Gnar | +0.48 | +0.97 | +0.61 | +1.00 | −0.08 | −1.00 | +0.00 |
| 79 | Kalista | +0.48 | +0.98 | +0.84 | −0.04 | −0.10 | – | +0.00 |
| 80 | Irelia | +0.41 | +0.93 | −0.55 | +1.00 | +0.11 | +1.00 | +0.00 |
| 81 | Corki | +0.41 | +0.63 | +0.00 | +1.00 | +0.08 | – | +0.00 |
| 82 | Aurora | +0.41 | +0.00 | +0.64 | +1.00 | +0.06 | – | +0.00 |
| 83 | Graves | +0.41 | +1.00 | +1.00 | −1.00 | +0.04 | +1.00 | +0.00 |
| 84 | Xayah | +0.36 | +1.00 | −0.50 | +1.00 | −0.02 | – | +0.00 |
| 85 | Karma | +0.34 | +0.39 | +0.06 | +1.00 | −0.03 | – | +0.00 |
| 86 | Ziggs | +0.31 | +0.00 | +1.00 | +0.00 | +0.19 | – | +0.00 |
| 87 | Yone | +0.30 | +0.17 | +0.17 | +1.00 | −0.05 | +0.17 | +0.00 |
| 88 | Amumu | +0.29 | +0.04 | +0.02 | +1.00 | +0.03 | +0.74 | +0.00 |
| 89 | Hecarim | +0.29 | +0.00 | +0.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 90 | Vel'Koz | +0.27 | +1.00 | −1.00 | +1.00 | +0.26 | – | +0.00 |
| 91 | Jhin | +0.25 | +1.00 | −0.93 | +1.00 | +0.03 | – | +0.00 |
| 92 | Quinn | +0.23 | +0.22 | +0.00 | +0.76 | −0.00 | – | +0.00 |
| 93 | Annie | +0.23 | −1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 94 | Smolder | +0.22 | +0.00 | +0.00 | +1.00 | −0.03 | – | +0.00 |
| 95 | Ekko | +0.09 | +1.00 | −1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 96 | Varus | +0.08 | −0.24 | −0.31 | +1.00 | +0.06 | – | +0.00 |
| 97 | Olaf | +0.01 | +0.10 | −1.00 | +1.00 | −0.12 | +0.56 | +0.00 |
| 98 | Caitlyn | +0.01 | +0.00 | +0.00 | +0.49 | +0.07 | −1.00 | +0.00 |
| 99 | Nunu & Willump | −0.01 | −0.11 | +0.02 | +0.02 | +0.08 | −0.05 | +0.00 |
| 100 | Draven | −0.04 | −0.68 | −0.31 | +1.00 | +0.10 | – | +0.00 |
| 101 | Janna | −0.04 | +0.00 | −1.00 | +1.00 | +0.10 | – | +0.00 |
| 102 | Illaoi | −0.04 | −0.06 | −0.64 | +1.00 | −0.05 | −0.60 | +0.00 |
| 103 | Galio | −0.05 | +0.00 | −1.00 | +1.00 | −0.02 | +0.00 | +0.00 |
| 104 | Malzahar | −0.06 | −0.01 | −1.00 | +1.00 | +0.00 | – | +0.00 |
| 105 | Ornn | −0.10 | −0.57 | −0.07 | +0.79 | −0.02 | −1.00 | +0.00 |
| 106 | Alistar | −0.11 | −1.00 | +1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 107 | Kha'Zix | −0.16 | +0.00 | −1.00 | +0.00 | −0.07 | +1.00 | +0.00 |
| 108 | Shen | −0.19 | −1.00 | −1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 109 | Talon | −0.19 | −0.50 | +0.00 | +0.00 | −0.08 | −0.50 | +0.00 |
| 110 | Akali | −0.22 | −0.91 | −0.01 | −0.36 | −0.02 | +0.88 | +0.00 |
| 111 | Kai'Sa | −0.23 | −0.77 | +0.00 | +0.00 | −0.11 | – | +0.00 |
| 112 | Zoe | −0.26 | −0.80 | −0.46 | +0.36 | +0.08 | – | +0.00 |
| 113 | Neeko | −0.30 | −1.00 | −0.92 | +1.00 | +0.05 | – | +0.00 |
| 114 | Heimerdinger | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 115 | Viktor | −0.34 | −1.00 | −1.00 | +1.00 | −0.06 | – | +0.00 |
| 116 | Karthus | −0.35 | +0.00 | −1.00 | +0.00 | +0.00 | −1.00 | +0.00 |
| 117 | Ryze | −0.37 | −0.87 | −0.95 | +0.51 | +0.12 | – | +0.00 |
| 118 | Brand | −0.54 | −1.00 | −1.00 | +0.09 | −0.05 | – | +0.00 |
| 119 | Taric | −0.56 | −1.00 | −0.18 | −1.00 | −0.04 | −0.58 | +0.00 |
| 120 | Lux | −0.57 | −1.00 | −1.00 | −0.06 | −0.02 | – | +0.00 |
| 121 | Hwei | −0.61 | −1.00 | −1.00 | −0.25 | −0.03 | – | +0.00 |
| 122 | Taliyah | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 123 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 124 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 125 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 126 | Veigar | −0.77 | −1.00 | −1.00 | −0.95 | −0.02 | – | +0.00 |
| 127 | Soraka | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 128 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 129 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 130 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 131 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 132 | Zyra | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 133 | Naafiri | −0.78 | −1.00 | −0.95 | −1.00 | +0.05 | −1.00 | +0.00 |
| 134 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 135 | Ezreal | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 136 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 137 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 138 | Morgana | −0.79 | −1.00 | −0.99 | −0.99 | +0.02 | −1.00 | +0.00 |
| 139 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 140 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 141 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 142 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 143 | Darius | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 144 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Twitch's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Twitch's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Twitch` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +0.57)

- **0.57** blind: Blinding Dart's blind makes Twitch's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Twitch basic attacks)

#### 2. Lulu (net +0.51)

- **0.40** disarm: Whimsy disarms Twitch for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Twitch basic attacks)
- **0.11** reveal: Help, Pix! reveals Twitch through Ambush's stealth. (Lulu E Help, Pix! → Twitch Q Ambush)

#### 3. Samira (net +0.51)

- **0.36** projectile block: Blade Whirl blocks Twitch's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Twitch basic attacks)
- **0.29** projectile block: Blade Whirl blocks Twitch's Venom Cask, a projectile. Blade Whirl for 0.75 s; Venom Cask takes 0.93 s to land, enough to react. (Samira W Blade Whirl → Twitch W Venom Cask)

#### 4. Mel (net +0.50)

- **0.36** projectile block: Rebuttal blocks Twitch's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Twitch basic attacks)
- **0.27** projectile block: Rebuttal blocks Twitch's Venom Cask, a projectile. Rebuttal for 0.75 s; Venom Cask takes 0.93 s to land, enough to react. (Mel W Rebuttal → Twitch W Venom Cask)

#### 5. Yasuo (net +0.47)

- **0.47** projectile block: Wind Wall blocks Twitch's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Twitch basic attacks)
- **0.32** projectile block: Wind Wall blocks Twitch's Venom Cask, a projectile. Wind Wall for 4 s, long enough to use ahead of Venom Cask. (Yasuo W Wind Wall → Twitch W Venom Cask)
- **0.11** reveal: Last Breath reveals Twitch through Ambush's stealth. (Yasuo R Last Breath → Twitch Q Ambush)
- Watch out: Twitch's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 6. Braum (net +0.40)

- **0.60** projectile block: Unbreakable blocks Twitch's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Twitch basic attacks)
- **0.45** projectile block: Unbreakable blocks Twitch's Venom Cask, a projectile. Unbreakable for 4 s, long enough to use ahead of Venom Cask. (Braum E Unbreakable → Twitch W Venom Cask)
- Watch out: Twitch's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 7. Caitlyn (net +0.40)

- **0.18** range: Caitlyn's basic attacks reach 100 units farther than Twitch's (650 vs 550 attack range). Twitch has no dash or blink to close the gap. (Caitlyn basic attacks → Twitch basic attacks)
- **0.11** reveal: Ace in the Hole reveals Twitch through Ambush's stealth. (Caitlyn R Ace in the Hole → Twitch Q Ambush)
- **0.11** reveal: Yordle Snap Trap reveals Twitch through Ambush's stealth. (Caitlyn W Yordle Snap Trap → Twitch Q Ambush)

#### 8. Tristana (net +0.27)

- **0.27** range: Tristana's basic attacks reach 150 units farther than Twitch's (700 vs 550 attack range). Twitch has no dash or blink to close the gap. (Tristana basic attacks → Twitch basic attacks)

#### 9. Fiddlesticks (net +0.22)

- **0.11** reveal: A Harmless Scarecrow reveals Twitch through Ambush's stealth. (Fiddlesticks I A Harmless Scarecrow → Twitch Q Ambush)
- **0.11** reveal: Bountiful Harvest reveals Twitch through Ambush's stealth. (Fiddlesticks W Bountiful Harvest → Twitch Q Ambush)

#### 10. Hwei (net +0.22)

- **0.11** reveal: Gaze of the Abyss reveals Twitch through Ambush's stealth. (Hwei W Gaze of the Abyss → Twitch Q Ambush)
- **0.11** reveal: Spiraling Despair reveals Twitch through Ambush's stealth. (Hwei R Spiraling Despair → Twitch Q Ambush)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.57 | 0.57 | 0.00 | blind (Blinding Dart) |
| 2 | Lulu | +0.51 | 0.51 | 0.00 | disarm (Whimsy) |
| 3 | Samira | +0.51 | 0.51 | 0.00 |  |
| 4 | Mel | +0.50 | 0.50 | 0.00 |  |
| 5 | Yasuo | +0.47 | 0.74 | 0.27 | projectile block (Wind Wall) |
| 6 | Braum | +0.40 | 0.83 | 0.43 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Caitlyn | +0.40 | 0.40 | 0.00 |  |
| 8 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 9 | Fiddlesticks | +0.22 | 0.22 | 0.00 |  |
| 10 | Hwei | +0.22 | 0.22 | 0.00 |  |
| 11 | Karma | +0.22 | 0.22 | 0.00 |  |
| 12 | Kled | +0.20 | 0.36 | 0.16 |  |
| 13 | Malzahar | +0.17 | 0.17 | 0.00 |  |
| 14 | Shen | +0.14 | 0.43 | 0.29 | attack block (Spirit's Refuge) |
| 15 | Kayle | +0.14 | 0.14 | 0.00 |  |
| 16 | Akshan | +0.11 | 0.11 | 0.00 |  |
| 17 | Elise | +0.11 | 0.11 | 0.00 |  |
| 18 | Kai'Sa | +0.11 | 0.11 | 0.00 |  |
| 19 | LeBlanc | +0.11 | 0.11 | 0.00 |  |
| 20 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 21 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 22 | Twisted Fate | +0.11 | 0.11 | 0.00 |  |
| 23 | Vex | +0.11 | 0.11 | 0.00 |  |
| 24 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 25 | Annie | +0.08 | 0.08 | 0.00 |  |
| 26 | Milio | +0.06 | 0.06 | 0.00 |  |
| 27 | Nilah | +0.05 | 0.40 | 0.35 | attack dodge (Jubilant Veil) |
| 28 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 29 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 30 | Thresh | +0.04 | 0.11 | 0.07 |  |
| 31 | Kalista | +0.04 | 0.04 | 0.00 |  |
| 32 | Jax | +0.03 | 0.46 | 0.43 | attack dodge (Counter Strike) |
| 33 | Rammus | 0.00 | 0.43 | 0.43 | attack reflect (Defensive Ball Curl) |
| 34 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 35 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 36 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 37 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 38 | Aurora | 0.00 | 0.00 | 0.00 |  |
| 39 | Azir | 0.00 | 0.00 | 0.00 |  |
| 40 | Bard | 0.00 | 0.00 | 0.00 |  |
| 41 | Brand | 0.00 | 0.00 | 0.00 |  |
| 42 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 43 | Corki | 0.00 | 0.00 | 0.00 |  |
| 44 | Draven | 0.00 | 0.00 | 0.00 |  |
| 45 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 46 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 47 | Janna | 0.00 | 0.00 | 0.00 |  |
| 48 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 49 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 50 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 51 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 52 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 53 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 54 | Lissandra | 0.00 | 0.00 | 0.00 |  |
| 55 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 56 | Lux | 0.00 | 0.00 | 0.00 |  |
| 57 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 58 | Nami | 0.00 | 0.00 | 0.00 |  |
| 59 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 60 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 61 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 62 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 63 | Senna | 0.00 | 0.00 | 0.00 |  |
| 64 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 65 | Sivir | 0.00 | 0.00 | 0.00 |  |
| 66 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 67 | Sona | 0.00 | 0.00 | 0.00 |  |
| 68 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 69 | Swain | 0.00 | 0.00 | 0.00 |  |
| 70 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 71 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 72 | Varus | 0.00 | 0.00 | 0.00 |  |
| 73 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 74 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 75 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 76 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 77 | Xayah | 0.00 | 0.00 | 0.00 |  |
| 78 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 79 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 80 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 81 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 82 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 83 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 84 | Morgana | -0.02 | 0.19 | 0.21 |  |
| 85 | Lee Sin | -0.07 | 0.22 | 0.29 |  |
| 86 | Ivern | -0.08 | 0.00 | 0.08 |  |
| 87 | Fizz | -0.09 | 0.11 | 0.20 |  |
| 88 | Sylas | -0.09 | 0.11 | 0.20 |  |
| 89 | Graves | -0.09 | 0.00 | 0.09 |  |
| 90 | Briar | -0.10 | 0.11 | 0.21 |  |
| 91 | Naafiri | -0.10 | 0.11 | 0.21 |  |
| 92 | Urgot | -0.10 | 0.11 | 0.21 |  |
| 93 | Yuumi | -0.13 | 0.00 | 0.13 |  |
| 94 | Malphite | -0.15 | 0.28 | 0.43 |  |
| 95 | Warwick | -0.15 | 0.14 | 0.29 |  |
| 96 | Kayn | -0.16 | 0.11 | 0.27 |  |
| 97 | Rek'Sai | -0.16 | 0.11 | 0.27 |  |
| 98 | Akali | -0.18 | 0.11 | 0.29 |  |
| 99 | Ambessa | -0.18 | 0.11 | 0.29 |  |
| 100 | Vi | -0.18 | 0.11 | 0.29 |  |
| 101 | Rakan | -0.18 | 0.00 | 0.18 |  |
| 102 | Viego | -0.19 | 0.00 | 0.19 |  |
| 103 | Jarvan IV | -0.20 | 0.00 | 0.20 |  |
| 104 | Yone | -0.20 | 0.00 | 0.20 |  |
| 105 | Camille | -0.21 | 0.00 | 0.21 |  |
| 106 | Karthus | -0.21 | 0.00 | 0.21 |  |
| 107 | K'Sante | -0.21 | 0.00 | 0.21 |  |
| 108 | Vladimir | -0.21 | 0.00 | 0.21 |  |
| 109 | Zaahen | -0.22 | 0.05 | 0.27 |  |
| 110 | Lillia | -0.24 | 0.00 | 0.24 |  |
| 111 | Hecarim | -0.27 | 0.00 | 0.27 |  |
| 112 | Wukong | -0.27 | 0.00 | 0.27 |  |
| 113 | Ornn | -0.27 | 0.00 | 0.27 |  |
| 114 | Pantheon | -0.27 | 0.00 | 0.27 |  |
| 115 | Rell | -0.27 | 0.00 | 0.27 |  |
| 116 | Aatrox | -0.29 | 0.11 | 0.40 |  |
| 117 | Zac | -0.29 | 0.11 | 0.40 |  |
| 118 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 119 | Ekko | -0.29 | 0.00 | 0.29 |  |
| 120 | Evelynn | -0.29 | 0.00 | 0.29 |  |
| 121 | Galio | -0.29 | 0.00 | 0.29 |  |
| 122 | Pyke | -0.29 | 0.00 | 0.29 |  |
| 123 | Qiyana | -0.29 | 0.00 | 0.29 |  |
| 124 | Riven | -0.29 | 0.00 | 0.29 |  |
| 125 | Shaco | -0.29 | 0.00 | 0.29 |  |
| 126 | Talon | -0.29 | 0.00 | 0.29 |  |
| 127 | Volibear | -0.29 | 0.00 | 0.29 |  |
| 128 | Zed | -0.29 | 0.00 | 0.29 |  |
| 129 | Illaoi | -0.32 | 0.11 | 0.43 |  |
| 130 | Sett | -0.32 | 0.11 | 0.43 |  |
| 131 | Udyr | -0.32 | 0.11 | 0.43 |  |
| 132 | Fiora | -0.33 | 0.10 | 0.43 |  |
| 133 | Master Yi | -0.33 | 0.07 | 0.40 |  |
| 134 | Irelia | -0.38 | 0.00 | 0.38 |  |
| 135 | Alistar | -0.39 | 0.04 | 0.43 |  |
| 136 | Nautilus | -0.40 | 0.00 | 0.40 |  |
| 137 | Tahm Kench | -0.40 | 0.00 | 0.40 |  |
| 138 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 139 | Xin Zhao | -0.40 | 0.00 | 0.40 |  |
| 140 | Nasus | -0.43 | 0.43 | 0.86 | attack speed slow (Wither) |
| 141 | Amumu | -0.43 | 0.00 | 0.43 |  |
| 142 | Diana | -0.43 | 0.00 | 0.43 |  |
| 143 | Gragas | -0.43 | 0.00 | 0.43 |  |
| 144 | Gwen | -0.43 | 0.00 | 0.43 |  |
| 145 | Kassadin | -0.43 | 0.00 | 0.43 |  |
| 146 | Katarina | -0.43 | 0.00 | 0.43 |  |
| 147 | Kha'Zix | -0.43 | 0.00 | 0.43 |  |
| 148 | Leona | -0.43 | 0.00 | 0.43 |  |
| 149 | Locke | -0.43 | 0.00 | 0.43 |  |
| 150 | Maokai | -0.43 | 0.00 | 0.43 |  |
| 151 | Nocturne | -0.43 | 0.00 | 0.43 |  |
| 152 | Poppy | -0.43 | 0.00 | 0.43 |  |
| 153 | Renekton | -0.43 | 0.00 | 0.43 |  |
| 154 | Sejuani | -0.43 | 0.00 | 0.43 |  |
| 155 | Shyvana | -0.43 | 0.00 | 0.43 |  |
| 156 | Rengar | -0.56 | 0.30 | 0.86 |  |
| 157 | Garen | -0.58 | 0.23 | 0.81 |  |
| 158 | Skarner | -0.61 | 0.25 | 0.86 |  |
| 159 | Mordekaiser | -0.65 | 0.16 | 0.81 |  |
| 160 | Nunu & Willump | -0.73 | 0.13 | 0.86 |  |
| 161 | Sion | -0.75 | 0.06 | 0.81 |  |
| 162 | Gangplank | -0.79 | 0.07 | 0.86 |  |
| 163 | Olaf | -0.81 | 0.05 | 0.86 |  |
| 164 | Darius | -0.81 | 0.00 | 0.81 |  |
| 165 | Trundle | -0.81 | 0.00 | 0.81 |  |
| 166 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 167 | Blitzcrank | -0.86 | 0.00 | 0.86 |  |
| 168 | Cho'Gath | -0.86 | 0.00 | 0.86 |  |
| 169 | Dr. Mundo | -0.86 | 0.00 | 0.86 |  |
| 170 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 171 | Singed | -0.86 | 0.00 | 0.86 |  |
| 172 | Taric | -0.86 | 0.00 | 0.86 |  |
