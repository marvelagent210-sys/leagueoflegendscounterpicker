# Counters to Vel'Koz (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Vel'Koz: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Vel'Koz wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Velkoz --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +1.00 |
| 2 | Rengar | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 3 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +1.00 |
| 4 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 5 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 6 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.30 | +1.00 | +1.00 |
| 7 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 8 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 9 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 10 | Vayne | +0.79 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.56 |
| 11 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 12 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 13 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 14 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 15 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 16 | Dr. Mundo | +0.78 | +1.00 | +0.99 | +1.00 | −0.14 | +1.00 | +0.00 |
| 17 | Orianna | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 18 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 19 | Swain | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 20 | Master Yi | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 21 | Zeri | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 22 | Jhin | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 23 | Heimerdinger | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 24 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 25 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | +0.00 |
| 26 | Rumble | +0.76 | +0.99 | +0.99 | +1.00 | −0.16 | +0.92 | +0.00 |
| 27 | Nocturne | +0.76 | +1.00 | +1.00 | +1.00 | −0.26 | +1.00 | +0.00 |
| 28 | Ashe | +0.76 | +1.00 | +1.00 | +1.00 | −0.28 | +1.00 | +0.00 |
| 29 | Yasuo | +0.76 | +0.98 | +1.00 | +1.00 | +0.01 | +0.60 | +0.00 |
| 30 | Smolder | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 31 | Lulu | +0.75 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.00 |
| 32 | Varus | +0.74 | +1.00 | +1.00 | +1.00 | −0.22 | – | +0.00 |
| 33 | Gnar | +0.73 | +1.00 | +1.00 | +0.76 | −0.11 | +1.00 | +0.00 |
| 34 | Kog'Maw | +0.73 | +1.00 | +1.00 | +1.00 | −0.27 | – | +0.00 |
| 35 | Twisted Fate | +0.73 | +1.00 | +1.00 | +1.00 | −0.29 | – | +0.00 |
| 36 | Sion | +0.70 | +0.94 | +0.83 | +1.00 | −0.16 | +0.84 | +0.00 |
| 37 | Maokai | +0.68 | +1.00 | +0.62 | +1.00 | −0.14 | +1.00 | +0.00 |
| 38 | Warwick | +0.64 | +1.00 | +1.00 | +1.00 | +0.21 | −0.95 | +0.00 |
| 39 | Darius | +0.62 | +0.64 | +0.97 | +1.00 | −0.30 | +0.62 | +0.00 |
| 40 | Aphelios | +0.62 | +1.00 | +1.00 | +1.00 | −0.32 | −0.34 | +0.00 |
| 41 | Malzahar | +0.61 | +0.45 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 42 | Mordekaiser | +0.59 | +0.79 | +0.57 | +1.00 | −0.22 | +0.84 | +0.00 |
| 43 | Gragas | +0.58 | +0.59 | +0.59 | +1.00 | −0.11 | +1.00 | +0.00 |
| 44 | Sejuani | +0.58 | +1.00 | +0.19 | +1.00 | −0.13 | +1.00 | +0.00 |
| 45 | Garen | +0.56 | +1.00 | +0.13 | +1.00 | −0.13 | +1.00 | +0.00 |
| 46 | Volibear | +0.53 | +1.00 | +0.09 | +1.00 | −0.25 | +0.98 | +0.00 |
| 47 | Gangplank | +0.52 | +0.34 | +0.34 | +1.00 | +0.03 | +1.00 | +1.00 |
| 48 | Wukong | +0.50 | +1.00 | +0.30 | +1.00 | −0.15 | +0.01 | +0.00 |
| 49 | Aatrox | +0.49 | +1.00 | +0.10 | +1.00 | −0.40 | +0.76 | +0.00 |
| 50 | Graves | +0.47 | −0.00 | +1.00 | +1.00 | −0.02 | +0.19 | +0.00 |
| 51 | Akali | +0.46 | +1.00 | +0.29 | +0.29 | −0.08 | +0.92 | +0.00 |
| 52 | Zaahen | +0.45 | +0.21 | +0.52 | +1.00 | −0.21 | +1.00 | +0.00 |
| 53 | Fizz | +0.44 | +1.00 | −0.36 | +1.00 | −0.12 | +1.00 | +0.00 |
| 54 | Ekko | +0.39 | +1.00 | −0.04 | +1.00 | −0.22 | −0.15 | +0.00 |
| 55 | Lee Sin | +0.36 | +1.00 | −0.60 | +1.00 | −0.28 | +1.00 | +0.00 |
| 56 | Renekton | +0.34 | +0.60 | +0.07 | +0.61 | −0.10 | +0.60 | +0.00 |
| 57 | Lucian | +0.32 | −0.59 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 58 | Annie | +0.32 | −0.05 | +1.00 | +0.02 | −0.18 | +1.00 | +0.00 |
| 59 | Jinx | +0.30 | +1.00 | +1.00 | −1.00 | −0.22 | +0.32 | +0.00 |
| 60 | Teemo | +0.30 | +1.00 | +1.00 | −1.00 | −0.22 | – | +0.00 |
| 61 | Draven | +0.29 | +1.00 | +1.00 | −1.00 | −0.24 | – | +0.00 |
| 62 | Singed | +0.27 | +1.00 | −0.96 | +1.00 | −0.23 | +1.00 | +0.00 |
| 63 | Vi | +0.27 | +1.00 | −0.91 | +1.00 | −0.34 | +1.00 | +0.00 |
| 64 | Skarner | +0.23 | +0.13 | +0.13 | +0.83 | −0.09 | +0.11 | +0.00 |
| 65 | Rakan | +0.19 | +1.00 | −0.66 | +0.12 | −0.09 | +1.00 | +0.00 |
| 66 | Shen | +0.17 | +0.02 | −0.11 | +1.00 | −0.02 | +0.02 | +0.00 |
| 67 | Miss Fortune | +0.17 | +1.00 | +1.00 | −1.00 | −0.24 | −0.93 | +0.00 |
| 68 | Illaoi | +0.16 | −0.32 | +0.02 | +1.00 | −0.26 | +0.75 | +0.00 |
| 69 | Riven | +0.16 | −0.36 | −0.10 | +1.00 | −0.19 | +1.00 | +0.00 |
| 70 | Kai'Sa | +0.15 | −0.05 | −0.05 | +1.00 | −0.28 | – | +0.00 |
| 71 | Diana | +0.14 | +0.16 | +0.11 | +0.15 | +0.10 | +0.24 | +0.00 |
| 72 | Gwen | +0.13 | −0.39 | −0.06 | +1.00 | −0.40 | +1.00 | +0.00 |
| 73 | Tahm Kench | +0.13 | +0.18 | +0.18 | +0.13 | +0.03 | +0.05 | +0.00 |
| 74 | Ornn | +0.12 | +0.13 | −0.00 | +0.09 | −0.15 | +0.93 | +0.00 |
| 75 | Ziggs | +0.12 | +1.00 | −0.55 | −0.39 | −0.10 | +1.00 | +0.00 |
| 76 | Sett | +0.09 | +0.15 | −0.01 | +0.34 | −0.20 | +0.17 | +0.00 |
| 77 | Caitlyn | +0.09 | +0.14 | +0.14 | +0.75 | −0.24 | −1.00 | +0.00 |
| 78 | Xayah | +0.08 | +1.00 | +0.00 | −0.93 | +0.05 | – | +0.00 |
| 79 | Janna | +0.07 | +0.83 | −1.00 | +0.30 | −0.25 | +0.89 | +0.00 |
| 80 | Nautilus | +0.07 | +0.14 | +0.03 | +0.13 | −0.08 | +0.10 | +0.00 |
| 81 | Hwei | +0.04 | −0.21 | −0.01 | +0.64 | −0.22 | – | +0.00 |
| 82 | Xin Zhao | +0.02 | −0.90 | −0.13 | +1.00 | −0.18 | +1.00 | +0.00 |
| 83 | Taric | +0.01 | +0.08 | −0.09 | +0.09 | −0.05 | +0.02 | +0.00 |
| 84 | Anivia | −0.00 | −0.10 | −0.07 | +0.34 | −0.22 | +0.04 | +0.00 |
| 85 | Nunu & Willump | −0.00 | +0.02 | −0.08 | −0.01 | +0.04 | +0.05 | +0.00 |
| 86 | Urgot | −0.03 | −0.01 | −0.01 | +0.03 | −0.18 | −0.03 | +0.00 |
| 87 | Alistar | −0.03 | +0.04 | −0.11 | −0.03 | −0.11 | +0.08 | +0.00 |
| 88 | Cho'Gath | −0.04 | −0.21 | −0.28 | +0.39 | −0.23 | +0.43 | +0.00 |
| 89 | Amumu | −0.04 | +0.89 | −0.99 | −0.42 | −0.10 | +0.86 | +0.00 |
| 90 | Leona | −0.07 | −0.13 | −0.13 | +0.10 | −0.16 | +0.01 | +0.00 |
| 91 | Soraka | −0.08 | +0.05 | −0.48 | +0.18 | −0.06 | +0.07 | +0.00 |
| 92 | Olaf | −0.09 | −1.00 | +0.34 | +1.00 | −0.18 | −1.00 | +0.00 |
| 93 | Braum | −0.10 | −0.13 | −0.28 | +0.06 | −0.08 | +0.03 | +0.00 |
| 94 | Zoe | −0.10 | +0.56 | −0.05 | −1.00 | −0.12 | – | +0.00 |
| 95 | Ezreal | −0.14 | +0.20 | +0.20 | −0.74 | −0.14 | −0.77 | +0.00 |
| 96 | Nami | −0.16 | −0.15 | −0.15 | −0.16 | −0.21 | – | +0.00 |
| 97 | Malphite | −0.17 | +0.15 | +0.15 | −1.00 | +0.12 | −0.64 | +0.00 |
| 98 | Aurora | −0.25 | +0.98 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 99 | Udyr | −0.26 | +0.05 | +0.03 | −0.69 | −0.25 | −1.00 | +0.00 |
| 100 | Kalista | −0.26 | −0.82 | +0.27 | −0.31 | −0.23 | – | +0.00 |
| 101 | Twitch | −0.27 | +1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 102 | Galio | −0.29 | −0.99 | −0.97 | +1.00 | −0.12 | +0.16 | +0.00 |
| 103 | Kennen | −0.29 | −0.77 | −0.98 | +1.00 | −0.17 | – | +0.00 |
| 104 | Pantheon | −0.29 | −0.95 | +1.00 | −0.96 | −0.13 | −0.95 | +0.00 |
| 105 | Senna | −0.30 | −0.09 | −0.09 | −1.00 | −0.19 | – | +0.00 |
| 106 | Samira | −0.32 | −0.95 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 107 | Zyra | −0.35 | −0.12 | −1.00 | −0.00 | −0.21 | – | +0.00 |
| 108 | Karthus | −0.35 | −0.22 | −0.15 | −1.00 | −0.14 | – | +0.00 |
| 109 | Blitzcrank | −0.35 | −0.16 | −0.29 | −1.00 | −0.14 | −0.20 | +0.00 |
| 110 | Brand | −0.37 | −1.00 | −1.00 | +1.00 | −0.20 | – | +0.00 |
| 111 | Morgana | −0.42 | −0.74 | −0.55 | −0.20 | −0.07 | – | +0.00 |
| 112 | Karma | −0.43 | −0.74 | +0.13 | −1.00 | −0.25 | – | +0.00 |
| 113 | Sivir | −0.50 | +0.05 | −0.94 | −0.99 | −0.19 | – | +0.00 |
| 114 | Rell | −0.52 | −0.99 | −0.99 | −0.45 | +0.05 | +0.57 | +0.00 |
| 115 | Zed | −0.52 | −0.79 | −0.43 | −1.00 | −0.29 | +0.25 | +0.00 |
| 116 | Irelia | −0.54 | −1.00 | −0.98 | −0.10 | −0.16 | −0.02 | +0.00 |
| 117 | Kindred | −0.61 | −0.95 | −0.36 | −1.00 | −0.25 | −0.41 | +0.00 |
| 118 | Ambessa | −0.66 | −1.00 | −1.00 | −0.95 | −0.50 | +1.00 | +0.00 |
| 119 | Quinn | −0.68 | −0.57 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 120 | Vladimir | −0.68 | −0.88 | −0.98 | −0.56 | −0.27 | – | +0.00 |
| 121 | Jarvan IV | −0.70 | −1.00 | −0.92 | −1.00 | −0.01 | −0.16 | +0.00 |
| 122 | Rammus | −0.70 | −1.00 | −1.00 | −1.00 | −0.20 | +0.29 | +0.00 |
| 123 | Naafiri | −0.74 | −1.00 | −1.00 | −0.67 | −0.02 | −1.00 | +0.00 |
| 124 | Ahri | −0.76 | −1.00 | −0.93 | −1.00 | −0.02 | – | +0.00 |
| 125 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 126 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 127 | Lissandra | −0.80 | −1.00 | −0.99 | −1.00 | −0.00 | −0.98 | +0.00 |
| 128 | Kha'Zix | −0.80 | −0.97 | −1.00 | −1.00 | −0.14 | −0.83 | +0.00 |
| 129 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 130 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 131 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 132 | Ryze | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 133 | Neeko | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 134 | Cassiopeia | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.00 |
| 135 | Veigar | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 136 | Lux | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 137 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 138 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 139 | Vex | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 140 | Sona | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 141 | Viktor | −0.83 | −1.00 | −1.00 | −1.00 | −0.34 | – | +0.00 |
| 142 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.36 | – | +0.00 |
| 143 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 144 | Hecarim | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Vel'Koz's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vel'Koz's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Velkoz` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.24)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Full Tilt's stun interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 350 units farther than Rell's (525 vs 175 attack range).

#### 2. Fizz (net +1.03)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 0.75 s; Tectonic Disruption takes 0.25 s to land, enough to react. (Fizz E Playful → Vel'Koz E Tectonic Disruption)
- **0.33** untargetable: Playful makes Fizz untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 0.75 s; Life Form Disintegration Ray lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Chum the Waters's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 3. Braum (net +0.90)

- **0.42** projectile block: Unbreakable blocks Vel'Koz's Plasma Fission, a projectile. Unbreakable for 4 s, long enough to use ahead of Plasma Fission. (Braum E Unbreakable → Vel'Koz Q Plasma Fission)
- **0.35** projectile block: Unbreakable blocks part of Vel'Koz's Tectonic Disruption, a projectile. Unbreakable for 4 s, long enough to use ahead of Tectonic Disruption. Only part of the ability is a projectile. While the effect is fully prevented by blocking the missile (e.g. with Unbreakable and Wind Wall), the missile may not be destroyed visually. The area of effect indicator appears at the end of the cast time.
  - It will persist even if the cast cancels (e.g. Vel'Koz dies before cast time completes) despite the projectile not firing. (Braum E Unbreakable → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Concussive Blows's stun interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 4. Maokai (net +0.88)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 1.4 s; Tectonic Disruption takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Vel'Koz E Tectonic Disruption)
- **0.33** untargetable: Twisted Advance makes Maokai untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 1.4 s; Life Form Disintegration Ray lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Bramble Smash's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

#### 5. Yasuo (net +0.87)

- **0.29** projectile block: Wind Wall blocks Vel'Koz's Plasma Fission, a projectile. Wind Wall for 4 s, long enough to use ahead of Plasma Fission. (Yasuo W Wind Wall → Vel'Koz Q Plasma Fission)
- **0.28** interrupt: Last Breath's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Last Breath must land during the channel. (Yasuo R Last Breath → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Steel Tempest's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 6. Rek'Sai (net +0.85)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 1.5 s, long enough to use ahead of Life Form Disintegration Ray. (Rek'Sai R Void Rush → Vel'Koz R Life Form Disintegration Ray)
- **0.33** untargetable: Void Rush makes Rek'Sai untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 1.5 s, long enough to use ahead of Tectonic Disruption. (Rek'Sai R Void Rush → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Unburrow's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

#### 7. Bard (net +0.79)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 2.5 s, long enough to use ahead of Life Form Disintegration Ray. (Bard R Tempered Fate → Vel'Koz R Life Form Disintegration Ray)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 2.5 s, long enough to use ahead of Tectonic Disruption. (Bard R Tempered Fate → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Tempered Fate's stasis interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Vel'Koz R Life Form Disintegration Ray)

#### 8. Lissandra (net +0.79)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 2.5 s, long enough to use ahead of Life Form Disintegration Ray. (Lissandra R Frozen Tomb → Vel'Koz R Life Form Disintegration Ray)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 2.5 s, long enough to use ahead of Tectonic Disruption. (Lissandra R Frozen Tomb → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Frozen Tomb's stun interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Vel'Koz R Life Form Disintegration Ray)

#### 9. Zaahen (net +0.78)

- **0.33** cc immunity: Grim Deliverance makes Zaahen immune to Vel'Koz's Tectonic Disruption (airborne, stun). Immune for ?; Tectonic Disruption takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Dreaded Return's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: The Darkin Glaive's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 350 units farther than Zaahen's (525 vs 175 attack range).

#### 10. K'Sante (net +0.78)

- **0.28** interrupt: All Out's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). All Out must land during the channel. (K'Sante R All Out → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Ntofo Strikes's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Path Maker's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Path Maker must land during the channel. (K'Sante W Path Maker → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 375 units farther than K'Sante's (525 vs 150 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.24 | 1.40 | 0.16 |  |
| 2 | Fizz | +1.03 | 1.15 | 0.12 |  |
| 3 | Braum | +0.90 | 1.17 | 0.27 | projectile block (Unbreakable) |
| 4 | Maokai | +0.88 | 1.15 | 0.27 |  |
| 5 | Yasuo | +0.87 | 1.03 | 0.16 |  |
| 6 | Rek'Sai | +0.85 | 1.01 | 0.16 |  |
| 7 | Bard | +0.79 | 0.79 | 0.00 |  |
| 8 | Lissandra | +0.79 | 0.79 | 0.00 |  |
| 9 | Zaahen | +0.78 | 0.94 | 0.16 |  |
| 10 | K'Sante | +0.78 | 0.91 | 0.13 |  |
| 11 | Nocturne | +0.71 | 0.98 | 0.27 |  |
| 12 | Camille | +0.71 | 0.84 | 0.13 |  |
| 13 | Lulu | +0.69 | 0.69 | 0.00 |  |
| 14 | Kled | +0.65 | 0.74 | 0.09 |  |
| 15 | Anivia | +0.65 | 0.65 | 0.00 |  |
| 16 | Heimerdinger | +0.65 | 0.65 | 0.00 |  |
| 17 | Milio | +0.65 | 0.65 | 0.00 |  |
| 18 | Vladimir | +0.64 | 0.82 | 0.18 |  |
| 19 | Xayah | +0.64 | 0.64 | 0.00 |  |
| 20 | Alistar | +0.63 | 0.90 | 0.27 |  |
| 21 | Udyr | +0.62 | 0.89 | 0.27 |  |
| 22 | Evelynn | +0.60 | 0.78 | 0.18 |  |
| 23 | Shaco | +0.60 | 0.78 | 0.18 |  |
| 24 | Fiora | +0.57 | 0.82 | 0.25 |  |
| 25 | Sejuani | +0.57 | 0.82 | 0.25 |  |
| 26 | Malzahar | +0.56 | 0.96 | 0.40 |  |
| 27 | Gnar | +0.56 | 0.56 | 0.00 |  |
| 28 | Tristana | +0.56 | 0.56 | 0.00 |  |
| 29 | Viktor | +0.56 | 0.56 | 0.00 |  |
| 30 | Kayle | +0.55 | 0.55 | 0.00 |  |
| 31 | Morgana | +0.53 | 0.63 | 0.10 |  |
| 32 | Thresh | +0.53 | 0.56 | 0.03 |  |
| 33 | Nami | +0.52 | 0.52 | 0.00 |  |
| 34 | Yone | +0.51 | 0.63 | 0.12 |  |
| 35 | Renata Glasc | +0.51 | 0.51 | 0.00 |  |
| 36 | Sivir | +0.51 | 0.51 | 0.00 |  |
| 37 | Seraphine | +0.50 | 0.50 | 0.00 |  |
| 38 | Aurora | +0.48 | 0.48 | 0.00 |  |
| 39 | Xin Zhao | +0.45 | 0.68 | 0.23 |  |
| 40 | Urgot | +0.44 | 0.56 | 0.12 |  |
| 41 | Rakan | +0.44 | 0.54 | 0.10 |  |
| 42 | Aurelion Sol | +0.44 | 0.52 | 0.08 |  |
| 43 | Samira | +0.44 | 0.44 | 0.00 |  |
| 44 | Gwen | +0.43 | 0.68 | 0.25 |  |
| 45 | Ornn | +0.43 | 0.59 | 0.16 |  |
| 46 | Ashe | +0.42 | 0.42 | 0.00 |  |
| 47 | Mel | +0.40 | 0.40 | 0.00 |  |
| 48 | Yuumi | +0.39 | 0.87 | 0.48 |  |
| 49 | Annie | +0.39 | 0.39 | 0.00 |  |
| 50 | Kalista | +0.39 | 0.39 | 0.00 |  |
| 51 | Riven | +0.38 | 0.56 | 0.18 |  |
| 52 | Master Yi | +0.37 | 0.83 | 0.46 |  |
| 53 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 54 | Vex | +0.35 | 0.35 | 0.00 |  |
| 55 | Sett | +0.33 | 0.60 | 0.27 |  |
| 56 | Nilah | +0.33 | 0.53 | 0.20 |  |
| 57 | Blitzcrank | +0.31 | 0.84 | 0.53 |  |
| 58 | Taliyah | +0.30 | 0.78 | 0.48 |  |
| 59 | Rammus | +0.29 | 0.83 | 0.54 |  |
| 60 | Leona | +0.29 | 0.56 | 0.27 |  |
| 61 | Zed | +0.29 | 0.47 | 0.18 |  |
| 62 | Ahri | +0.28 | 0.28 | 0.00 |  |
| 63 | Brand | +0.28 | 0.28 | 0.00 |  |
| 64 | Cassiopeia | +0.28 | 0.28 | 0.00 |  |
| 65 | Draven | +0.28 | 0.28 | 0.00 |  |
| 66 | Elise | +0.28 | 0.28 | 0.00 |  |
| 67 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 68 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 69 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 70 | Orianna | +0.28 | 0.28 | 0.00 |  |
| 71 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 72 | Swain | +0.28 | 0.28 | 0.00 |  |
| 73 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 74 | Vayne | +0.28 | 0.28 | 0.00 |  |
| 75 | Veigar | +0.28 | 0.28 | 0.00 |  |
| 76 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 77 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 78 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 79 | Viego | +0.27 | 0.60 | 0.33 |  |
| 80 | Azir | +0.26 | 0.26 | 0.00 |  |
| 81 | Neeko | +0.26 | 0.26 | 0.00 |  |
| 82 | Zyra | +0.26 | 0.26 | 0.00 |  |
| 83 | Amumu | +0.25 | 0.52 | 0.27 |  |
| 84 | Pyke | +0.24 | 0.56 | 0.32 |  |
| 85 | Sona | +0.24 | 0.24 | 0.00 |  |
| 86 | Sion | +0.21 | 0.81 | 0.60 |  |
| 87 | Malphite | +0.19 | 0.46 | 0.27 |  |
| 88 | Volibear | +0.18 | 0.35 | 0.17 |  |
| 89 | Jarvan IV | +0.18 | 0.30 | 0.12 |  |
| 90 | Kayn | +0.17 | 0.78 | 0.61 |  |
| 91 | Sylas | +0.16 | 0.28 | 0.12 |  |
| 92 | Jax | +0.15 | 0.42 | 0.27 |  |
| 93 | Briar | +0.15 | 0.28 | 0.13 |  |
| 94 | Gragas | +0.13 | 0.56 | 0.43 |  |
| 95 | Zac | +0.12 | 0.82 | 0.70 |  |
| 96 | Janna | +0.12 | 0.52 | 0.40 |  |
| 97 | Hecarim | +0.12 | 0.28 | 0.16 |  |
| 98 | Senna | +0.12 | 0.12 | 0.00 |  |
| 99 | Tahm Kench | +0.11 | 0.84 | 0.73 |  |
| 100 | Fiddlesticks | +0.11 | 0.56 | 0.45 |  |
| 101 | Bel'Veth | +0.11 | 0.28 | 0.17 |  |
| 102 | Rengar | +0.10 | 0.63 | 0.53 |  |
| 103 | Lee Sin | +0.10 | 0.28 | 0.18 |  |
| 104 | Wukong | +0.10 | 0.26 | 0.16 |  |
| 105 | Lillia | +0.10 | 0.23 | 0.13 |  |
| 106 | Garen | +0.09 | 0.56 | 0.47 |  |
| 107 | Quinn | +0.09 | 0.28 | 0.19 |  |
| 108 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 109 | Shyvana | +0.07 | 0.32 | 0.25 |  |
| 110 | Irelia | +0.06 | 0.28 | 0.22 |  |
| 111 | Ambessa | +0.06 | 0.24 | 0.18 |  |
| 112 | Aatrox | +0.05 | 0.28 | 0.23 |  |
| 113 | Nautilus | +0.05 | 0.28 | 0.23 |  |
| 114 | Qiyana | +0.05 | 0.22 | 0.17 |  |
| 115 | Warwick | +0.03 | 0.86 | 0.83 |  |
| 116 | Cho'Gath | +0.03 | 0.56 | 0.53 |  |
| 117 | Diana | +0.03 | 0.28 | 0.25 |  |
| 118 | Kassadin | +0.03 | 0.28 | 0.25 |  |
| 119 | Vi | +0.02 | 0.58 | 0.56 |  |
| 120 | Renekton | +0.01 | 0.28 | 0.27 |  |
| 121 | Galio | 0.00 | 0.76 | 0.76 |  |
| 122 | Gangplank | 0.00 | 0.53 | 0.53 |  |
| 123 | Corki | 0.00 | 0.00 | 0.00 |  |
| 124 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 125 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 126 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 127 | Karma | 0.00 | 0.00 | 0.00 |  |
| 128 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 129 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 130 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 131 | Lux | 0.00 | 0.00 | 0.00 |  |
| 132 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 133 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 134 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 135 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 136 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 137 | Xerath | -0.04 | 0.28 | 0.32 |  |
| 138 | Graves | -0.04 | 0.00 | 0.04 |  |
| 139 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 140 | Twisted Fate | -0.07 | 0.28 | 0.35 |  |
| 141 | Shen | -0.08 | 0.55 | 0.63 |  |
| 142 | Varus | -0.11 | 0.00 | 0.11 |  |
| 143 | Olaf | -0.12 | 0.41 | 0.53 |  |
| 144 | Mordekaiser | -0.13 | 0.34 | 0.47 |  |
| 145 | Skarner | -0.14 | 0.36 | 0.50 |  |
| 146 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 147 | Akali | -0.18 | 0.00 | 0.18 |  |
| 148 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 149 | Talon | -0.18 | 0.00 | 0.18 |  |
| 150 | Darius | -0.19 | 0.28 | 0.47 |  |
| 151 | Trundle | -0.19 | 0.28 | 0.47 |  |
| 152 | Yorick | -0.19 | 0.28 | 0.47 |  |
| 153 | Illaoi | -0.20 | 0.07 | 0.27 |  |
| 154 | Taric | -0.22 | 0.28 | 0.50 |  |
| 155 | Poppy | -0.23 | 0.24 | 0.47 |  |
| 156 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 157 | Pantheon | -0.25 | 0.41 | 0.66 |  |
| 158 | Singed | -0.25 | 0.28 | 0.53 |  |
| 159 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 160 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 161 | Locke | -0.27 | 0.00 | 0.27 |  |
| 162 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 163 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 164 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 165 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 166 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 167 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 168 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 169 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 170 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 171 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 172 | Nunu & Willump | -0.64 | 0.38 | 1.02 |  |
