# Counters to Anivia (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Anivia: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Anivia wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Anivia --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.41 | +1.00 | +0.00 |
| 2 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 3 | Olaf | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 4 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 5 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 6 | Yorick | +0.78 | +0.95 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 7 | Master Yi | +0.55 | +0.38 | +1.00 | +0.48 | +0.09 | +1.00 | +0.00 |
| 8 | Swain | +0.27 | +0.31 | +0.32 | +0.32 | +0.12 | – | +0.00 |
| 9 | Darius | +0.26 | +0.02 | +0.18 | +1.00 | +0.13 | −0.07 | +0.00 |
| 10 | Udyr | +0.23 | +1.00 | −0.02 | +0.00 | +0.22 | −0.49 | +0.00 |
| 11 | Heimerdinger | +0.22 | +0.91 | +0.10 | −0.14 | +0.14 | −0.21 | +0.00 |
| 12 | Renekton | +0.21 | +0.27 | +0.26 | +0.21 | +0.08 | +0.26 | +0.00 |
| 13 | Dr. Mundo | +0.19 | +0.28 | +0.20 | +0.16 | +0.05 | +0.25 | +0.00 |
| 14 | Maokai | +0.16 | +0.16 | +0.43 | −0.08 | +0.17 | −0.01 | +0.00 |
| 15 | Galio | +0.15 | +0.26 | +0.18 | +0.01 | +0.14 | +0.19 | +0.00 |
| 16 | Diana | +0.14 | +0.08 | +0.28 | +0.08 | +0.15 | +0.11 | +0.00 |
| 17 | Nautilus | +0.12 | +0.11 | +0.16 | +0.11 | +0.08 | +0.17 | +0.00 |
| 18 | Camille | +0.12 | −0.23 | −0.04 | +1.00 | +0.05 | −0.23 | +0.00 |
| 19 | Lee Sin | +0.12 | +0.18 | +0.20 | −0.03 | +0.11 | +0.12 | +0.00 |
| 20 | Rakan | +0.11 | −0.00 | +0.15 | +0.23 | +0.09 | +0.12 | +0.00 |
| 21 | Zaahen | +0.09 | −0.06 | +0.07 | +0.08 | +0.19 | +0.40 | +0.00 |
| 22 | Ornn | +0.07 | +0.01 | +0.02 | +0.11 | +0.20 | +0.06 | +0.00 |
| 23 | Malphite | +0.06 | +0.11 | +0.14 | −0.06 | +0.11 | −0.03 | +0.00 |
| 24 | Alistar | +0.06 | +0.11 | −0.00 | +0.11 | +0.09 | −0.00 | +0.00 |
| 25 | Tahm Kench | +0.06 | +0.04 | +0.04 | +0.11 | +0.11 | +0.01 | +0.00 |
| 26 | Hwei | +0.06 | +0.05 | +0.04 | +0.11 | +0.06 | – | +0.00 |
| 27 | Leona | +0.05 | +0.03 | +0.02 | +0.11 | +0.05 | +0.13 | +0.00 |
| 28 | Braum | +0.05 | +0.00 | −0.01 | +0.19 | +0.11 | −0.02 | +0.00 |
| 29 | Yone | +0.05 | +0.46 | −0.04 | −0.30 | +0.15 | −0.17 | +0.00 |
| 30 | Jarvan IV | +0.05 | +0.09 | −0.01 | +0.04 | +0.14 | −0.01 | +0.00 |
| 31 | Nasus | +0.05 | −0.07 | +0.28 | −0.04 | +0.10 | −0.11 | +0.00 |
| 32 | Sejuani | +0.04 | +0.07 | +0.07 | −0.16 | +0.13 | +0.21 | +0.00 |
| 33 | Amumu | +0.04 | +0.03 | −0.05 | +0.12 | +0.09 | +0.10 | +0.00 |
| 34 | Shen | +0.03 | +0.04 | −0.02 | +0.13 | +0.07 | −0.10 | +0.00 |
| 35 | Rell | +0.02 | +0.01 | +0.03 | +0.01 | +0.13 | −0.06 | +0.00 |
| 36 | Xin Zhao | +0.02 | −0.09 | +0.12 | +0.04 | +0.12 | −0.11 | +0.00 |
| 37 | Nunu & Willump | +0.02 | +0.02 | −0.05 | +0.02 | +0.19 | −0.08 | +0.00 |
| 38 | Mordekaiser | +0.01 | +0.06 | −0.01 | −0.03 | +0.12 | −0.11 | +0.00 |
| 39 | Karma | +0.01 | −0.04 | −0.04 | +0.03 | +0.13 | – | +0.00 |
| 40 | Soraka | +0.01 | −0.02 | −0.05 | +0.08 | +0.04 | – | +0.00 |
| 41 | Skarner | +0.00 | −0.03 | −0.04 | +0.06 | +0.08 | −0.05 | +0.00 |
| 42 | Vel'Koz | +0.00 | +0.07 | +0.10 | −0.34 | +0.22 | −0.04 | +0.00 |
| 43 | Yasuo | +0.00 | +0.08 | −0.06 | −0.04 | +0.12 | −0.16 | +0.00 |
| 44 | Urgot | −0.00 | +0.01 | +0.02 | −0.17 | +0.12 | +0.07 | +0.00 |
| 45 | Naafiri | −0.00 | −0.07 | +0.00 | +0.02 | +0.12 | −0.08 | +0.00 |
| 46 | Gangplank | −0.01 | −0.09 | +0.01 | −0.07 | +0.27 | −0.11 | +0.00 |
| 47 | Orianna | −0.01 | +0.08 | +0.08 | −0.31 | +0.12 | – | +0.00 |
| 48 | Taric | −0.01 | +0.10 | −0.15 | −0.03 | +0.07 | −0.05 | +0.00 |
| 49 | Volibear | −0.01 | −0.08 | −0.13 | +0.04 | +0.07 | +0.22 | +0.00 |
| 50 | Kled | −0.02 | −0.22 | −0.22 | +0.27 | +0.05 | +0.34 | +0.00 |
| 51 | Xerath | −0.02 | −0.04 | −0.05 | −0.01 | +0.06 | −0.01 | +0.00 |
| 52 | Jax | −0.02 | −0.10 | −0.11 | +0.02 | +0.20 | −0.00 | +0.00 |
| 53 | Quinn | −0.02 | −0.07 | +0.01 | −0.05 | +0.05 | – | +0.00 |
| 54 | Akshan | −0.02 | −0.05 | −0.05 | +0.02 | +0.07 | −0.13 | +0.00 |
| 55 | Malzahar | −0.03 | −0.10 | −0.08 | +0.00 | +0.09 | +0.06 | +0.00 |
| 56 | Gragas | −0.03 | −0.17 | −0.18 | +0.26 | +0.15 | −0.17 | +0.00 |
| 57 | Evelynn | −0.03 | −0.06 | −0.07 | +0.00 | +0.05 | −0.05 | +0.00 |
| 58 | Akali | −0.03 | −0.04 | −0.08 | −0.03 | +0.04 | −0.01 | +0.00 |
| 59 | Cho'Gath | −0.03 | +0.00 | −0.04 | +0.01 | −0.00 | −0.22 | +0.00 |
| 60 | Poppy | −0.03 | −0.19 | +0.17 | −0.13 | +0.10 | −0.15 | +0.00 |
| 61 | Aurora | −0.03 | −0.06 | −0.12 | −0.01 | +0.10 | – | +0.00 |
| 62 | Sett | −0.04 | −0.07 | −0.03 | −0.02 | +0.06 | −0.18 | +0.00 |
| 63 | Garen | −0.04 | −0.01 | −0.07 | −0.14 | +0.15 | −0.14 | +0.00 |
| 64 | Illaoi | −0.04 | −0.13 | −0.08 | +0.02 | +0.11 | −0.09 | +0.00 |
| 65 | Teemo | −0.05 | −0.07 | −0.13 | +0.02 | +0.08 | −0.13 | +0.00 |
| 66 | Kha'Zix | −0.05 | −0.04 | −0.15 | −0.02 | +0.03 | −0.06 | +0.00 |
| 67 | Nami | −0.06 | −0.03 | −0.12 | −0.12 | +0.06 | – | +0.00 |
| 68 | Karthus | −0.06 | −0.12 | −0.13 | −0.09 | +0.10 | +0.02 | +0.00 |
| 69 | Ekko | −0.07 | −0.08 | −0.13 | +0.02 | +0.00 | −0.21 | +0.00 |
| 70 | Irelia | −0.07 | −0.15 | −0.06 | −0.14 | +0.10 | −0.04 | +0.00 |
| 71 | Hecarim | −0.07 | −0.12 | −0.13 | −0.08 | +0.12 | −0.08 | +0.00 |
| 72 | Lulu | −0.07 | −0.07 | −0.19 | −0.07 | +0.12 | – | +0.00 |
| 73 | Gnar | −0.07 | −0.18 | −0.08 | −0.09 | +0.15 | −0.10 | +0.00 |
| 74 | Tristana | −0.07 | −0.09 | −0.10 | −0.12 | +0.07 | −0.16 | +0.00 |
| 75 | Trundle | −0.08 | −0.08 | −0.22 | −0.07 | +0.03 | +0.09 | +0.00 |
| 76 | Veigar | −0.08 | −0.12 | −0.12 | −0.07 | +0.02 | −0.07 | +0.00 |
| 77 | Blitzcrank | −0.08 | −0.12 | −0.09 | −0.14 | +0.09 | −0.12 | +0.00 |
| 78 | Fizz | −0.09 | −0.13 | −0.05 | −0.21 | +0.10 | −0.16 | +0.00 |
| 79 | Aatrox | −0.10 | −0.06 | −0.14 | −0.08 | +0.00 | −0.33 | +0.00 |
| 80 | Brand | −0.10 | −0.02 | −0.03 | −0.38 | +0.04 | −0.19 | +0.00 |
| 81 | Vi | −0.10 | −0.05 | −0.31 | −0.05 | +0.03 | −0.06 | +0.00 |
| 82 | Singed | −0.11 | −0.15 | −0.21 | −0.05 | +0.06 | −0.26 | +0.00 |
| 83 | Samira | −0.11 | −0.33 | −0.21 | −0.08 | +0.23 | +0.01 | +0.00 |
| 84 | Wukong | −0.12 | −0.07 | −0.22 | −0.19 | +0.08 | −0.20 | +0.00 |
| 85 | Kennen | −0.13 | −0.19 | −0.19 | −0.16 | +0.09 | – | +0.00 |
| 86 | Tryndamere | −0.13 | −0.14 | −0.27 | +0.02 | +0.05 | −0.35 | +0.00 |
| 87 | Jayce | −0.13 | −0.28 | −0.00 | −0.21 | +0.11 | −0.32 | +0.00 |
| 88 | Zyra | −0.13 | −0.19 | −0.32 | −0.06 | +0.10 | −0.06 | +0.00 |
| 89 | Kindred | −0.13 | −0.22 | −0.06 | −0.35 | +0.19 | −0.21 | +0.00 |
| 90 | Vladimir | −0.14 | −0.16 | −0.14 | −0.11 | −0.04 | −0.32 | +0.00 |
| 91 | Jhin | −0.14 | −0.21 | −0.21 | −0.21 | +0.14 | – | +0.00 |
| 92 | Sion | −0.15 | −0.22 | −0.26 | −0.17 | +0.05 | −0.10 | +0.00 |
| 93 | Kassadin | −0.16 | −0.26 | −0.20 | −0.17 | +0.07 | −0.20 | +0.00 |
| 94 | Nocturne | −0.16 | −0.14 | −0.21 | −0.29 | +0.07 | −0.28 | +0.00 |
| 95 | Zoe | −0.16 | −0.38 | −0.31 | +0.11 | +0.11 | −0.32 | +0.00 |
| 96 | Graves | −0.17 | −0.33 | −0.25 | −0.15 | +0.12 | −0.16 | +0.00 |
| 97 | Neeko | −0.17 | −0.25 | −0.26 | −0.19 | +0.12 | −0.24 | +0.00 |
| 98 | Talon | −0.18 | −0.34 | −0.14 | −0.21 | +0.04 | −0.20 | +0.00 |
| 99 | Rumble | −0.18 | −0.04 | −0.02 | −0.79 | +0.08 | −0.19 | +0.00 |
| 100 | Rammus | −0.18 | −0.32 | −0.34 | −0.04 | +0.06 | −0.16 | +0.00 |
| 101 | Twisted Fate | −0.18 | −0.21 | −0.23 | −0.34 | +0.11 | – | +0.00 |
| 102 | Jinx | −0.18 | +0.02 | −0.38 | −0.44 | +0.11 | – | +0.00 |
| 103 | LeBlanc | −0.18 | −0.10 | −0.47 | −0.03 | +0.07 | −0.44 | +0.00 |
| 104 | Kog'Maw | −0.19 | −0.19 | −0.06 | −0.60 | +0.10 | −0.18 | +0.00 |
| 105 | Lux | −0.19 | +0.03 | +0.03 | −1.00 | +0.11 | – | +0.00 |
| 106 | Riven | −0.20 | −0.34 | −0.16 | −0.26 | +0.16 | −0.52 | +0.00 |
| 107 | Ziggs | −0.21 | −0.30 | −0.30 | −0.35 | +0.21 | – | +0.00 |
| 108 | Janna | −0.22 | −0.26 | −0.36 | −0.30 | +0.10 | – | +0.00 |
| 109 | Ambessa | −0.23 | −1.00 | +0.02 | −0.10 | +0.25 | −0.05 | +0.00 |
| 110 | Pantheon | −0.23 | −0.37 | −0.31 | −0.21 | +0.04 | −0.27 | +0.00 |
| 111 | Zed | −0.24 | −0.20 | +0.04 | −1.00 | +0.04 | −0.04 | +0.00 |
| 112 | Viktor | −0.24 | −0.01 | −0.09 | −1.00 | +0.05 | – | +0.00 |
| 113 | Taliyah | −0.25 | −0.10 | −0.07 | −1.00 | +0.10 | – | +0.00 |
| 114 | Kalista | −0.26 | −0.38 | −0.35 | −0.31 | +0.08 | – | +0.00 |
| 115 | Senna | −0.26 | −0.09 | −0.08 | −1.00 | +0.05 | – | +0.00 |
| 116 | Rengar | −0.26 | −0.21 | −0.21 | −1.00 | +0.37 | −0.15 | +0.00 |
| 117 | Aphelios | −0.27 | −0.00 | −0.28 | −1.00 | +0.17 | – | +0.00 |
| 118 | Xayah | −0.29 | +0.01 | −0.97 | −0.20 | +0.14 | – | +0.00 |
| 119 | Annie | −0.30 | −0.45 | −0.34 | −0.41 | +0.08 | – | +0.00 |
| 120 | Sivir | −0.32 | −0.21 | −0.21 | −1.00 | +0.05 | −0.21 | +0.00 |
| 121 | Syndra | −0.33 | −0.46 | +0.02 | −1.00 | +0.09 | – | +0.00 |
| 122 | Varus | −0.35 | −0.25 | −0.27 | −1.00 | +0.06 | – | +0.00 |
| 123 | Ezreal | −0.38 | −0.47 | −0.55 | −0.49 | +0.07 | – | +0.00 |
| 124 | Caitlyn | −0.39 | −0.32 | −0.35 | −1.00 | +0.09 | – | +0.00 |
| 125 | Draven | −0.39 | −0.53 | −0.15 | −1.00 | +0.09 | – | +0.00 |
| 126 | Morgana | −0.42 | −0.41 | −0.55 | −0.93 | +0.12 | −0.12 | +0.00 |
| 127 | Warwick | −0.42 | −1.00 | −0.05 | −1.00 | +0.21 | +0.14 | +0.00 |
| 128 | Kayle | −0.46 | −1.00 | +0.04 | −1.00 | +0.16 | – | +0.00 |
| 129 | Sona | −0.48 | −1.00 | +0.02 | −1.00 | +0.07 | – | +0.00 |
| 130 | Katarina | −0.50 | −1.00 | +0.01 | −1.00 | +0.05 | −0.60 | +0.00 |
| 131 | Twitch | −0.54 | −0.70 | −0.46 | −1.00 | +0.06 | – | +0.00 |
| 132 | Ryze | −0.55 | −0.35 | −1.00 | −1.00 | +0.17 | −0.36 | +0.00 |
| 133 | Lucian | −0.61 | −1.00 | −0.29 | −0.99 | +0.08 | −1.00 | +0.00 |
| 134 | Lissandra | −0.63 | −1.00 | −0.49 | −1.00 | +0.07 | – | +0.00 |
| 135 | Ahri | −0.65 | −0.76 | −1.00 | −0.75 | +0.03 | – | +0.00 |
| 136 | Gwen | −0.68 | −0.77 | −1.00 | −1.00 | +0.32 | −0.86 | +0.00 |
| 137 | Vex | −0.71 | −1.00 | −1.00 | −0.71 | +0.02 | – | +0.00 |
| 138 | Ashe | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 139 | Cassiopeia | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 140 | Smolder | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 141 | Miss Fortune | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 142 | Zeri | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 143 | Kai'Sa | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 144 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Anivia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Anivia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Anivia` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.03)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Anivia's Crystallize. Untargetable for 0.75 s; Crystallize takes 0.25 s to land, enough to react. (Fizz E Playful → Anivia W Crystallize)
- **0.65** untargetable: Playful makes Fizz untargetable, dodging Anivia's Flash Frost. Untargetable for 0.75 s; Flash Frost takes 1.41 s to land, enough to react. (Fizz E Playful → Anivia Q Flash Frost)
- **0.39** untargetable: Playful makes Fizz untargetable, dodging Anivia's Frostbite. Untargetable for 0.75 s; Frostbite takes 0.63 s to land, enough to react. (Fizz E Playful → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 425 units farther than Fizz's (600 vs 175 attack range).

#### 2. Fiora (net +0.94)

- **0.80** parry: Riposte parries Anivia's Crystallize and stuns back. Parry for 0.75 s; Crystallize takes 0.25 s to land, enough to react. Negating Crystallize's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Anivia W Crystallize)
- **0.56** parry: Riposte parries Anivia's Flash Frost and stuns back. Parry for 0.75 s; Flash Frost takes 1.41 s to land, enough to react. Negating Flash Frost's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Anivia Q Flash Frost)
- **0.30** parry: Riposte parries Anivia's Frostbite. Parry for 0.75 s; Frostbite takes 0.63 s to land, enough to react. (Fiora W Riposte → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 450 units farther than Fiora's (600 vs 150 attack range).

#### 3. Maokai (net +0.86)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Crystallize. Untargetable for 1.4 s; Crystallize takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Anivia W Crystallize)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Flash Frost. Untargetable for 1.4 s; Flash Frost takes 1.41 s to land, enough to react. (Maokai W Twisted Advance → Anivia Q Flash Frost)
- **0.35** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Frostbite. Untargetable for 1.4 s; Frostbite takes 0.63 s to land, enough to react. (Maokai W Twisted Advance → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 475 units farther than Maokai's (600 vs 125 attack range).

#### 4. Udyr (net +0.83)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Crystallize (airborne). Immune for 1.5 s, long enough to use ahead of Crystallize. (Udyr E Blazing Stampede → Anivia W Crystallize)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Flash Frost (slow, stun). Immune for 1.5 s, long enough to use ahead of Flash Frost. (Udyr E Blazing Stampede → Anivia Q Flash Frost)
- **0.10** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Glacial Storm (slow). Immune for 1.5 s, long enough to use ahead of Glacial Storm. (Udyr E Blazing Stampede → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 475 units farther than Udyr's (600 vs 125 attack range).

#### 5. Morgana (net +0.77)

- **0.70** cc immunity: Black Shield makes Morgana immune to Anivia's Crystallize (airborne). Immune for 5 s, long enough to use ahead of Crystallize. (Morgana E Black Shield → Anivia W Crystallize)
- **0.46** cc immunity: Black Shield makes Morgana immune to Anivia's Flash Frost (slow, stun). Immune for 5 s, long enough to use ahead of Flash Frost. (Morgana E Black Shield → Anivia Q Flash Frost)
- **0.08** cc immunity: Black Shield makes Morgana immune to Anivia's Glacial Storm (slow). Immune for 5 s, long enough to use ahead of Glacial Storm. (Morgana E Black Shield → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 150 units farther than Morgana's (600 vs 450 attack range).

#### 6. Gwen (net +0.76)

- **0.68** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Crystallize. Untargetable for ?; Crystallize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia W Crystallize)
- **0.44** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Flash Frost. Untargetable for ?; Flash Frost takes 1.41 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia Q Flash Frost)
- **0.29** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Frostbite. Untargetable for ?; Frostbite takes 0.63 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 450 units farther than Gwen's (600 vs 150 attack range).

#### 7. Vladimir (net +0.72)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Crystallize. Untargetable for 2 s, long enough to use ahead of Crystallize. (Vladimir W Sanguine Pool → Anivia W Crystallize)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Flash Frost. Untargetable for 2 s, long enough to use ahead of Flash Frost. (Vladimir W Sanguine Pool → Anivia Q Flash Frost)
- **0.31** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Glacial Storm. Untargetable for 2 s, long enough to use ahead of Glacial Storm. (Vladimir W Sanguine Pool → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 150 units farther than Vladimir's (600 vs 450 attack range).

#### 8. Braum (net +0.69)

- **0.65** projectile block: Unbreakable blocks Anivia's Flash Frost, a projectile. Unbreakable for 4 s, long enough to use ahead of Flash Frost. (Braum E Unbreakable → Anivia Q Flash Frost)
- **0.39** projectile block: Unbreakable blocks Anivia's Frostbite, a projectile. Unbreakable for 4 s, long enough to use ahead of Frostbite. (Braum E Unbreakable → Anivia E Frostbite)
- **0.33** projectile block: Unbreakable blocks Anivia's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Anivia basic attacks)
- Watch out: Anivia's basic attacks reach 475 units farther than Braum's (600 vs 125 attack range).

#### 9. Lissandra (net +0.63)

- **0.37** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Crystallize. Untargetable for 2.5 s, long enough to use ahead of Crystallize. (Lissandra R Frozen Tomb → Anivia W Crystallize)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Flash Frost. Untargetable for 2.5 s, long enough to use ahead of Flash Frost. (Lissandra R Frozen Tomb → Anivia Q Flash Frost)
- **0.27** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Glacial Storm. Untargetable for 2.5 s, long enough to use ahead of Glacial Storm. (Lissandra R Frozen Tomb → Anivia R Glacial Storm)

#### 10. Aurora (net +0.59)

- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Crystallize. Untargetable for 0.4 s; Crystallize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia W Crystallize)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Flash Frost. Untargetable for 0.4 s; Flash Frost takes 1.41 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia Q Flash Frost)
- **0.23** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Frostbite. Untargetable for 0.4 s; Frostbite takes 0.63 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia E Frostbite)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.03 | 1.15 | 0.12 |  |
| 2 | Fiora | +0.94 | 1.18 | 0.24 |  |
| 3 | Maokai | +0.86 | 1.10 | 0.24 |  |
| 4 | Udyr | +0.83 | 1.07 | 0.24 |  |
| 5 | Morgana | +0.77 | 0.95 | 0.18 |  |
| 6 | Gwen | +0.76 | 1.00 | 0.24 |  |
| 7 | Vladimir | +0.72 | 1.05 | 0.33 |  |
| 8 | Braum | +0.69 | 0.93 | 0.24 | projectile block (Unbreakable) |
| 9 | Lissandra | +0.63 | 0.63 | 0.00 |  |
| 10 | Aurora | +0.59 | 0.59 | 0.00 |  |
| 11 | Mel | +0.58 | 0.58 | 0.00 |  |
| 12 | Bard | +0.57 | 0.63 | 0.06 |  |
| 13 | Samira | +0.56 | 0.60 | 0.04 | projectile block (Blade Whirl) |
| 14 | Yasuo | +0.51 | 0.67 | 0.16 | projectile block (Wind Wall) |
| 15 | Xayah | +0.51 | 0.60 | 0.09 |  |
| 16 | Master Yi | +0.49 | 1.13 | 0.64 |  |
| 17 | Rek'Sai | +0.48 | 0.64 | 0.16 |  |
| 18 | Camille | +0.48 | 0.60 | 0.12 |  |
| 19 | Evelynn | +0.45 | 0.61 | 0.16 |  |
| 20 | Shaco | +0.45 | 0.61 | 0.16 |  |
| 21 | Zed | +0.42 | 0.58 | 0.16 |  |
| 22 | Kled | +0.41 | 0.51 | 0.10 |  |
| 23 | Zaahen | +0.38 | 0.54 | 0.16 |  |
| 24 | Kalista | +0.37 | 0.40 | 0.03 |  |
| 25 | Nocturne | +0.36 | 0.60 | 0.24 |  |
| 26 | Kayle | +0.35 | 0.35 | 0.00 |  |
| 27 | Yuumi | +0.33 | 1.24 | 0.91 |  |
| 28 | Rengar | +0.33 | 0.81 | 0.48 |  |
| 29 | Gangplank | +0.29 | 0.77 | 0.48 |  |
| 30 | Sivir | +0.28 | 0.40 | 0.12 |  |
| 31 | Milio | +0.26 | 0.35 | 0.09 |  |
| 32 | Lulu | +0.22 | 0.22 | 0.00 |  |
| 33 | Alistar | +0.20 | 0.44 | 0.24 |  |
| 34 | Teemo | +0.19 | 0.31 | 0.12 |  |
| 35 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 36 | K'Sante | +0.16 | 0.28 | 0.12 |  |
| 37 | Vex | +0.14 | 0.14 | 0.00 |  |
| 38 | Aphelios | +0.11 | 0.11 | 0.00 |  |
| 39 | Heimerdinger | +0.11 | 0.11 | 0.00 |  |
| 40 | Xin Zhao | +0.10 | 0.34 | 0.24 |  |
| 41 | Olaf | +0.07 | 0.55 | 0.48 |  |
| 42 | Malphite | +0.06 | 0.30 | 0.24 |  |
| 43 | Jarvan IV | +0.02 | 0.14 | 0.12 |  |
| 44 | Yone | +0.02 | 0.14 | 0.12 |  |
| 45 | Jax | +0.01 | 0.25 | 0.24 |  |
| 46 | Nilah | 0.00 | 0.22 | 0.22 |  |
| 47 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 48 | Annie | 0.00 | 0.00 | 0.00 |  |
| 49 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 50 | Brand | 0.00 | 0.00 | 0.00 |  |
| 51 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 52 | Corki | 0.00 | 0.00 | 0.00 |  |
| 53 | Elise | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 56 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 57 | Lux | 0.00 | 0.00 | 0.00 |  |
| 58 | Nami | 0.00 | 0.00 | 0.00 |  |
| 59 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 60 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 61 | Senna | 0.00 | 0.00 | 0.00 |  |
| 62 | Sona | 0.00 | 0.00 | 0.00 |  |
| 63 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 64 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 65 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 66 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 67 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 68 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 69 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 70 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 71 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 72 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 73 | Hecarim | -0.01 | 0.15 | 0.16 |  |
| 74 | Ornn | -0.02 | 0.14 | 0.16 |  |
| 75 | Volibear | -0.02 | 0.14 | 0.16 |  |
| 76 | Azir | -0.03 | 0.00 | 0.03 |  |
| 77 | Gnar | -0.03 | 0.00 | 0.03 |  |
| 78 | Kai'Sa | -0.04 | 0.00 | 0.04 |  |
| 79 | LeBlanc | -0.04 | 0.00 | 0.04 |  |
| 80 | Nidalee | -0.04 | 0.00 | 0.04 |  |
| 81 | Jayce | -0.06 | 0.00 | 0.06 |  |
| 82 | Kindred | -0.06 | 0.00 | 0.06 |  |
| 83 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 84 | Graves | -0.07 | 0.00 | 0.07 |  |
| 85 | Jinx | -0.09 | 0.00 | 0.09 |  |
| 86 | Karma | -0.09 | 0.00 | 0.09 |  |
| 87 | Orianna | -0.09 | 0.00 | 0.09 |  |
| 88 | Seraphine | -0.09 | 0.00 | 0.09 |  |
| 89 | Swain | -0.09 | 0.00 | 0.09 |  |
| 90 | Viktor | -0.09 | 0.00 | 0.09 |  |
| 91 | Illaoi | -0.10 | 0.14 | 0.24 |  |
| 92 | Sett | -0.10 | 0.14 | 0.24 |  |
| 93 | Shyvana | -0.10 | 0.14 | 0.24 |  |
| 94 | Garen | -0.11 | 0.37 | 0.48 |  |
| 95 | Briar | -0.12 | 0.00 | 0.12 |  |
| 96 | Kog'Maw | -0.12 | 0.00 | 0.12 |  |
| 97 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 98 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 99 | Urgot | -0.15 | 0.00 | 0.15 |  |
| 100 | Akali | -0.16 | 0.00 | 0.16 |  |
| 101 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 102 | Bel'Veth | -0.16 | 0.00 | 0.16 |  |
| 103 | Ekko | -0.16 | 0.00 | 0.16 |  |
| 104 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 105 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 106 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 107 | Qiyana | -0.16 | 0.00 | 0.16 |  |
| 108 | Rell | -0.16 | 0.00 | 0.16 |  |
| 109 | Riven | -0.16 | 0.00 | 0.16 |  |
| 110 | Talon | -0.16 | 0.00 | 0.16 |  |
| 111 | Sion | -0.17 | 0.58 | 0.75 |  |
| 112 | Smolder | -0.18 | 0.00 | 0.18 |  |
| 113 | Varus | -0.20 | 0.00 | 0.20 |  |
| 114 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 115 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 116 | Amumu | -0.24 | 0.00 | 0.24 |  |
| 117 | Diana | -0.24 | 0.00 | 0.24 |  |
| 118 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 119 | Kassadin | -0.24 | 0.00 | 0.24 |  |
| 120 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 121 | Leona | -0.24 | 0.00 | 0.24 |  |
| 122 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 123 | Renekton | -0.24 | 0.00 | 0.24 |  |
| 124 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 125 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 126 | Draven | -0.26 | 0.00 | 0.26 |  |
| 127 | Syndra | -0.26 | 0.00 | 0.26 |  |
| 128 | Aurelion Sol | -0.31 | 0.00 | 0.31 |  |
| 129 | Ivern | -0.33 | 0.00 | 0.33 |  |
| 130 | Skarner | -0.35 | 0.13 | 0.48 |  |
| 131 | Malzahar | -0.38 | 0.54 | 0.92 |  |
| 132 | Viego | -0.40 | 0.14 | 0.54 |  |
| 133 | Quinn | -0.41 | 0.00 | 0.41 |  |
| 134 | Mordekaiser | -0.42 | 0.06 | 0.48 |  |
| 135 | Kayn | -0.45 | 0.61 | 1.06 |  |
| 136 | Blitzcrank | -0.48 | 0.00 | 0.48 |  |
| 137 | Cho'Gath | -0.48 | 0.00 | 0.48 |  |
| 138 | Darius | -0.48 | 0.00 | 0.48 |  |
| 139 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 140 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 141 | Singed | -0.48 | 0.00 | 0.48 |  |
| 142 | Taric | -0.48 | 0.00 | 0.48 |  |
| 143 | Trundle | -0.48 | 0.00 | 0.48 |  |
| 144 | Yorick | -0.48 | 0.00 | 0.48 |  |
| 145 | Locke | -0.50 | 0.00 | 0.50 |  |
| 146 | Rammus | -0.53 | 0.24 | 0.77 |  |
| 147 | Caitlyn | -0.56 | 0.00 | 0.56 |  |
| 148 | Gragas | -0.56 | 0.00 | 0.56 |  |
| 149 | Jhin | -0.56 | 0.00 | 0.56 |  |
| 150 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 151 | Akshan | -0.62 | 0.00 | 0.62 |  |
| 152 | Lucian | -0.62 | 0.00 | 0.62 |  |
| 153 | Poppy | -0.64 | 0.00 | 0.64 |  |
| 154 | Vel'Koz | -0.65 | 0.00 | 0.65 |  |
| 155 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 156 | Pantheon | -0.72 | 0.44 | 1.16 |  |
| 157 | Xerath | -0.73 | 0.00 | 0.73 |  |
| 158 | Karthus | -0.74 | 0.00 | 0.74 |  |
| 159 | Twisted Fate | -0.74 | 0.00 | 0.74 |  |
| 160 | Warwick | -0.78 | 0.69 | 1.47 |  |
| 161 | Vi | -0.79 | 0.14 | 0.93 |  |
| 162 | Janna | -0.80 | 0.00 | 0.80 |  |
| 163 | Katarina | -0.80 | 0.00 | 0.80 |  |
| 164 | Shen | -0.82 | 0.24 | 1.06 |  |
| 165 | Pyke | -0.87 | 0.00 | 0.87 |  |
| 166 | Fiddlesticks | -0.94 | 0.00 | 0.94 |  |
| 167 | Taliyah | -1.00 | 0.00 | 1.00 |  |
| 168 | Naafiri | -1.02 | 0.00 | 1.02 |  |
| 169 | Zac | -1.10 | 0.00 | 1.10 |  |
| 170 | Nunu & Willump | -1.18 | 0.24 | 1.42 |  |
| 171 | Tahm Kench | -1.24 | 0.00 | 1.24 |  |
| 172 | Galio | -1.33 | 0.00 | 1.33 |  |
