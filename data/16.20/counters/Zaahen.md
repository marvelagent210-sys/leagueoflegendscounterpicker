# Counters to Zaahen (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Zaahen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Zaahen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Zaahen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +1.00 |
| 2 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 3 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 4 | Aphelios | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 5 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 6 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 7 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 8 | Olaf | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 9 | Karma | +0.76 | +0.97 | +0.98 | +0.88 | −0.03 | +0.99 | +0.00 |
| 10 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 11 | Kayle | +0.60 | +0.59 | +1.00 | +0.54 | +0.20 | +0.61 | +0.00 |
| 12 | Nocturne | +0.53 | +0.19 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 13 | Trundle | +0.48 | +1.00 | +0.43 | +0.23 | −0.14 | – | +1.00 |
| 14 | Lulu | +0.45 | +0.65 | +1.00 | +0.56 | +0.18 | −1.00 | +0.00 |
| 15 | Jax | +0.32 | +0.16 | +1.00 | +0.00 | +0.01 | – | +0.00 |
| 16 | Zeri | +0.22 | +1.00 | +0.41 | −1.00 | −0.20 | +1.00 | +0.00 |
| 17 | Cassiopeia | +0.17 | +1.00 | +0.71 | −1.00 | +0.25 | −0.96 | +0.00 |
| 18 | Aurora | +0.15 | −1.00 | +0.61 | +1.00 | +0.19 | +0.24 | +0.00 |
| 19 | Wukong | +0.15 | +1.00 | −1.00 | +1.00 | −0.31 | – | −0.37 |
| 20 | Ashe | +0.07 | +1.00 | −0.27 | −1.00 | +0.25 | +0.49 | +0.00 |
| 21 | Singed | +0.04 | +0.11 | +0.02 | +0.11 | −0.10 | – | +0.00 |
| 22 | Morgana | +0.04 | +0.18 | +1.00 | −1.00 | −0.32 | −0.04 | +0.00 |
| 23 | Fiora | +0.02 | −0.01 | −0.20 | −0.02 | +0.19 | – | +1.00 |
| 24 | Gangplank | −0.02 | −1.00 | +0.10 | +1.00 | +0.06 | – | +0.00 |
| 25 | Darius | −0.03 | +1.00 | −0.53 | −0.73 | +0.01 | – | +0.00 |
| 26 | Kled | −0.04 | −0.04 | +0.73 | −1.00 | −0.06 | – | +0.00 |
| 27 | Neeko | −0.06 | +0.28 | +0.32 | −0.53 | −0.01 | −0.99 | +0.00 |
| 28 | Viktor | −0.06 | +0.52 | +0.52 | −1.00 | −0.12 | −1.00 | +0.00 |
| 29 | Kai'Sa | −0.08 | −0.21 | −0.33 | +0.46 | −0.10 | −0.17 | +0.00 |
| 30 | Anivia | −0.09 | −0.07 | +0.06 | −0.08 | −0.19 | −0.40 | +0.00 |
| 31 | Kalista | −0.11 | −0.39 | −0.04 | −0.62 | +0.13 | +1.00 | +0.00 |
| 32 | Zyra | −0.15 | +0.24 | +0.47 | −1.00 | −0.18 | −1.00 | +0.00 |
| 33 | Draven | −0.16 | +0.36 | +0.07 | −1.00 | +0.20 | −1.00 | +0.00 |
| 34 | Yorick | −0.16 | −1.00 | +1.00 | −1.00 | +0.04 | – | +0.93 |
| 35 | Brand | −0.19 | +0.09 | +0.33 | −1.00 | +0.02 | −1.00 | +0.00 |
| 36 | Jinx | −0.21 | −0.31 | −0.51 | +0.22 | −0.09 | −0.39 | +0.00 |
| 37 | Twisted Fate | −0.22 | −0.12 | −0.21 | −0.35 | −0.27 | −0.25 | +0.00 |
| 38 | Corki | −0.31 | −0.67 | +0.52 | −1.00 | +0.22 | −1.00 | +0.00 |
| 39 | Illaoi | −0.34 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 40 | Lux | −0.37 | −1.00 | +0.84 | −1.00 | −0.17 | −1.00 | +0.00 |
| 41 | Heimerdinger | −0.39 | −1.00 | −1.00 | +0.99 | +0.08 | −1.00 | +0.00 |
| 42 | Varus | −0.44 | +0.38 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 43 | Udyr | −0.45 | −1.00 | −0.01 | −1.00 | +0.01 | – | +1.00 |
| 44 | Vel'Koz | −0.45 | −0.52 | −0.21 | −1.00 | +0.21 | −1.00 | +0.00 |
| 45 | Annie | −0.45 | −1.00 | +0.28 | −1.00 | +0.19 | −1.00 | +0.00 |
| 46 | Kennen | −0.46 | −1.00 | −1.00 | +0.69 | −0.00 | −1.00 | +0.00 |
| 47 | Tristana | −0.48 | −1.00 | −1.00 | −0.60 | +0.25 | +1.00 | +0.00 |
| 48 | Kog'Maw | −0.58 | −1.00 | −0.27 | −1.00 | +0.24 | −1.00 | +0.00 |
| 49 | Vex | −0.59 | −1.00 | −1.00 | +0.00 | +0.06 | −1.00 | +0.00 |
| 50 | Riven | −0.60 | −0.76 | −1.00 | −0.66 | +0.23 | – | +0.00 |
| 51 | Gnar | −0.61 | −1.00 | −1.00 | −0.24 | +0.23 | −1.00 | +0.00 |
| 52 | Ambessa | −0.63 | −1.00 | −0.56 | −1.00 | +0.16 | – | +0.00 |
| 53 | Yone | −0.65 | −1.00 | −0.53 | −1.00 | −0.02 | – | +0.00 |
| 54 | Yasuo | −0.68 | −0.92 | −0.79 | −1.00 | +0.10 | – | +0.00 |
| 55 | Janna | −0.68 | −1.00 | −0.49 | −1.00 | −0.07 | −1.00 | +0.00 |
| 56 | Xin Zhao | −0.69 | −0.71 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 57 | Warwick | −0.69 | −0.84 | −0.84 | −1.00 | +0.00 | – | +0.00 |
| 58 | Master Yi | −0.72 | −1.00 | −1.00 | −1.00 | +0.03 | – | +1.00 |
| 59 | Poppy | −0.73 | −1.00 | −1.00 | −1.00 | +0.29 | – | +0.00 |
| 60 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.27 | – | +0.00 |
| 61 | Lucian | −0.74 | −1.00 | −0.85 | −1.00 | +0.14 | −1.00 | +0.00 |
| 62 | Cho'Gath | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 63 | Camille | −0.75 | −1.00 | −1.00 | −1.00 | −0.17 | – | +1.00 |
| 64 | Maokai | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 65 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 66 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 67 | Garen | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 68 | Jarvan IV | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 69 | Diana | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 70 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 71 | Pantheon | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 72 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 73 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 74 | Nami | −0.77 | −0.98 | −0.93 | −1.00 | +0.06 | −1.00 | +0.00 |
| 75 | Jhin | −0.77 | −1.00 | −0.94 | −1.00 | +0.10 | −1.00 | +0.00 |
| 76 | Caitlyn | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 77 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 78 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 79 | Taric | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 80 | Irelia | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 81 | Sion | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 82 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 83 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 84 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 85 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 86 | Mordekaiser | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 87 | Orianna | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 88 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 89 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 90 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 91 | Volibear | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 92 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 93 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 94 | Tahm Kench | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 95 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 96 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 97 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 98 | Braum | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 99 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 100 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 101 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 102 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 103 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 104 | Renekton | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 105 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 106 | Lee Sin | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 107 | Smolder | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 108 | Swain | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 109 | Hwei | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 110 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 111 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 112 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 113 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 114 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 115 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 116 | Ezreal | −0.79 | −1.00 | −0.99 | −1.00 | +0.02 | −1.00 | +0.00 |
| 117 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 118 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 119 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 120 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.22 |
| 121 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 122 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 123 | Gwen | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 124 | Lissandra | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 125 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 126 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 127 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 128 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 129 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 130 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 131 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 132 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 133 | Dr. Mundo | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 134 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 135 | Aatrox | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 136 | Tryndamere | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 137 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 138 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 139 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 140 | Gragas | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 141 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 142 | Graves | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 143 | Senna | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 144 | Thresh | −0.93 | −1.00 | −1.00 | −1.00 | −0.59 | −1.00 | −0.77 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Zaahen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zaahen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zaahen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Kayle (net +1.21)

- **0.90** invulnerable: Divine Judgment makes Kayle invulnerable to Zaahen's Grim Deliverance. Invulnerable for 2.5 s, long enough to use ahead of Grim Deliverance. (Kayle R Divine Judgment → Zaahen R Grim Deliverance)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Zaahen's (625 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Kayle basic attacks → Zaahen basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Zaahen's Dreaded Return (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Dreaded Return. (Kayle R Divine Judgment → Zaahen W Dreaded Return)
- Watch out: Grim Deliverance makes Zaahen immune to Kayle's Radiant Blast (slow).

#### 2. Vladimir (net +1.18)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 2 s, long enough to use ahead of Grim Deliverance. (Vladimir W Sanguine Pool → Zaahen R Grim Deliverance)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's Dreaded Return. Untargetable for 2 s, long enough to use ahead of Dreaded Return. (Vladimir W Sanguine Pool → Zaahen W Dreaded Return)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 2 s, long enough to use ahead of The Darkin Glaive. (Vladimir W Sanguine Pool → Zaahen Q The Darkin Glaive)
- Watch out: The Darkin Glaive's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Sivir (net +1.11)

- **0.56** spell shield: Spell Shield's spell shield blocks Zaahen's Dreaded Return. Spell shield for 1.5 s, long enough to use ahead of Dreaded Return. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zaahen W Dreaded Return)
- **0.45** spell shield: Spell Shield's spell shield blocks part of Zaahen's Grim Deliverance. Spell shield for 1.5 s, long enough to use ahead of Grim Deliverance. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the damage but not the heal. (Sivir E Spell Shield → Zaahen R Grim Deliverance)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Zaahen's (500 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Sivir basic attacks → Zaahen basic attacks)

#### 4. Fiora (net +1.10)

- **0.90** parry: Riposte parries Zaahen's Grim Deliverance. Parry for 0.75 s; Grim Deliverance takes 0.5 s to land, enough to react. (Fiora W Riposte → Zaahen R Grim Deliverance)
- **0.70** parry: Riposte parries Zaahen's Dreaded Return and stuns back. Parry for 0.75 s; Dreaded Return takes 0.79 s to land, enough to react. Negating Dreaded Return's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zaahen W Dreaded Return)
- **0.36** parry: Riposte parries Zaahen's The Darkin Glaive and stuns back. Parry for 0.75 s; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating The Darkin Glaive's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Fiora's Riposte (cripple, slow, stun).

#### 5. Gwen (net +1.10)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's Grim Deliverance. Untargetable for ?; Grim Deliverance takes 0.5 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen R Grim Deliverance)
- **0.56** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's Dreaded Return. Untargetable for ?; Dreaded Return takes 0.79 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen W Dreaded Return)
- **0.25** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for ?; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Gwen's Needlework (slow).

#### 6. Xayah (net +1.06)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 1.5 s, long enough to use ahead of Grim Deliverance. (Xayah R Featherstorm → Zaahen R Grim Deliverance)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's Dreaded Return. Untargetable for 1.5 s, long enough to use ahead of Dreaded Return. (Xayah R Featherstorm → Zaahen W Dreaded Return)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 1.5 s, long enough to use ahead of The Darkin Glaive. (Xayah R Featherstorm → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Xayah's Bladecaller (root).

#### 7. Aurora (net +1.05)

- **0.79** untargetable: Between Worlds makes Aurora untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 0.4 s; Grim Deliverance takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zaahen R Grim Deliverance)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Zaahen's Dreaded Return. Untargetable for 0.4 s; Dreaded Return takes 0.79 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zaahen W Dreaded Return)
- **0.18** range: Aurora's basic attacks reach 375 units farther than Zaahen's (550 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Aurora basic attacks → Zaahen basic attacks)
- Watch out: Grim Deliverance makes Zaahen immune to Aurora's Between Worlds (slow).

#### 8. Singed (net +1.00)

- **0.44** grounding: Mega Adhesive grounds Zaahen, who then can't cast Grim Deliverance. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Zaahen R Grim Deliverance)
- **0.39** grounding: Mega Adhesive grounds Zaahen, who then can't cast Aureate Rush. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Zaahen E Aureate Rush)
- **0.36** anti-heal: Insanity Potion's Grievous Wounds cuts Zaahen's healing from Grim Deliverance by 40%. (Singed R Insanity Potion → Zaahen R Grim Deliverance)
- Watch out: Grim Deliverance makes Zaahen immune to Singed's Fling (airborne, root).

#### 9. Rek'Sai (net +0.97)

- **0.90** untargetable: Void Rush makes Rek'Sai untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 1.5 s, long enough to use ahead of Grim Deliverance. (Rek'Sai R Void Rush → Zaahen R Grim Deliverance)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Zaahen's Dreaded Return. Untargetable for 1.5 s, long enough to use ahead of Dreaded Return. (Rek'Sai R Void Rush → Zaahen W Dreaded Return)
- **0.31** untargetable: Void Rush makes Rek'Sai untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 1.5 s, long enough to use ahead of The Darkin Glaive. (Rek'Sai R Void Rush → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Rek'Sai's Unburrow (airborne).

#### 10. Zed (net +0.97)

- **0.79** untargetable: Death Mark makes Zed untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 0.6 s; Grim Deliverance takes 0.5 s to land, enough to react. (Zed R Death Mark → Zaahen R Grim Deliverance)
- **0.33** untargetable: Death Mark makes Zed untargetable, dodging Zaahen's Dreaded Return. Untargetable for 0.6 s; Dreaded Return takes 0.79 s to land, enough to react. (Zed R Death Mark → Zaahen W Dreaded Return)
- **0.18** untargetable: Death Mark makes Zed untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 0.6 s; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zed R Death Mark → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Zed's Shadow Slash (slow).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +1.21 | 1.26 | 0.05 |  |
| 2 | Vladimir | +1.18 | 1.41 | 0.23 |  |
| 3 | Sivir | +1.11 | 1.11 | 0.00 |  |
| 4 | Fiora | +1.10 | 1.35 | 0.25 |  |
| 5 | Gwen | +1.10 | 1.24 | 0.14 |  |
| 6 | Xayah | +1.06 | 1.25 | 0.19 |  |
| 7 | Aurora | +1.05 | 1.20 | 0.15 |  |
| 8 | Singed | +1.00 | 1.39 | 0.39 | grounding (Mega Adhesive) |
| 9 | Rek'Sai | +0.97 | 1.17 | 0.20 |  |
| 10 | Zed | +0.97 | 1.00 | 0.03 |  |
| 11 | Nocturne | +0.83 | 1.16 | 0.33 |  |
| 12 | Master Yi | +0.81 | 1.24 | 0.43 |  |
| 13 | Evelynn | +0.78 | 1.12 | 0.34 |  |
| 14 | Udyr | +0.76 | 1.05 | 0.29 |  |
| 15 | Shaco | +0.73 | 1.12 | 0.39 |  |
| 16 | Teemo | +0.71 | 0.87 | 0.16 | blind (Blinding Dart), blind (Blinding Dart) |
| 17 | Yuumi | +0.55 | 1.54 | 0.99 |  |
| 18 | Jax | +0.54 | 0.74 | 0.20 | attack dodge (Counter Strike) |
| 19 | Gangplank | +0.53 | 0.70 | 0.17 |  |
| 20 | Fizz | +0.51 | 1.34 | 0.83 |  |
| 21 | Samira | +0.48 | 0.69 | 0.21 | projectile block (Blade Whirl) |
| 22 | Rengar | +0.45 | 0.78 | 0.33 |  |
| 23 | Olaf | +0.45 | 0.50 | 0.05 |  |
| 24 | Bard | +0.44 | 1.36 | 0.92 |  |
| 25 | Lissandra | +0.39 | 1.31 | 0.92 |  |
| 26 | Mel | +0.31 | 0.64 | 0.33 | projectile block (Rebuttal) |
| 27 | Vex | +0.31 | 0.63 | 0.32 |  |
| 28 | Jinx | +0.29 | 0.52 | 0.23 |  |
| 29 | Nasus | +0.28 | 0.33 | 0.05 |  |
| 30 | Milio | +0.24 | 0.57 | 0.33 |  |
| 31 | Camille | +0.23 | 1.08 | 0.85 |  |
| 32 | Zeri | +0.23 | 0.28 | 0.05 |  |
| 33 | Kindred | +0.22 | 0.27 | 0.05 |  |
| 34 | Twitch | +0.22 | 0.27 | 0.05 |  |
| 35 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 36 | Morgana | +0.21 | 0.93 | 0.72 |  |
| 37 | Maokai | +0.20 | 1.33 | 1.13 |  |
| 38 | Corki | +0.20 | 0.20 | 0.00 |  |
| 39 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 40 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 41 | Yunara | +0.16 | 0.24 | 0.08 |  |
| 42 | Ahri | +0.12 | 0.46 | 0.34 |  |
| 43 | Illaoi | +0.12 | 0.18 | 0.06 |  |
| 44 | Garen | +0.11 | 0.18 | 0.07 |  |
| 45 | Veigar | +0.10 | 0.45 | 0.35 |  |
| 46 | Kog'Maw | +0.10 | 0.16 | 0.06 |  |
| 47 | Graves | +0.08 | 0.14 | 0.06 |  |
| 48 | Nilah | +0.06 | 0.54 | 0.48 |  |
| 49 | Yasuo | +0.03 | 0.58 | 0.55 | projectile block (Wind Wall) |
| 50 | Xin Zhao | -0.01 | 0.91 | 0.92 |  |
| 51 | Viktor | -0.02 | 0.50 | 0.52 |  |
| 52 | Kalista | -0.03 | 0.57 | 0.60 |  |
| 53 | Akali | -0.03 | 0.00 | 0.03 |  |
| 54 | Lulu | -0.04 | 0.52 | 0.56 |  |
| 55 | Talon | -0.05 | 0.00 | 0.05 |  |
| 56 | Katarina | -0.06 | 0.50 | 0.56 |  |
| 57 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 58 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 59 | Vayne | -0.07 | 0.27 | 0.34 |  |
| 60 | Kha'Zix | -0.07 | 0.00 | 0.07 |  |
| 61 | Hwei | -0.08 | 0.49 | 0.57 |  |
| 62 | Kennen | -0.08 | 0.18 | 0.26 |  |
| 63 | LeBlanc | -0.09 | 0.13 | 0.22 |  |
| 64 | Kayn | -0.11 | 1.12 | 1.23 |  |
| 65 | Cassiopeia | -0.11 | 0.76 | 0.87 | grounding (Miasma) |
| 66 | Annie | -0.11 | 0.15 | 0.26 |  |
| 67 | Elise | -0.13 | 0.20 | 0.33 |  |
| 68 | Zilean | -0.14 | 0.20 | 0.34 |  |
| 69 | Senna | -0.15 | 0.22 | 0.37 |  |
| 70 | Zoe | -0.15 | 0.20 | 0.35 |  |
| 71 | Kassadin | -0.15 | 0.00 | 0.15 |  |
| 72 | Jayce | -0.17 | 0.18 | 0.35 |  |
| 73 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 74 | Lux | -0.18 | 0.18 | 0.36 |  |
| 75 | Renekton | -0.19 | 0.00 | 0.19 |  |
| 76 | Pantheon | -0.20 | 1.09 | 1.29 |  |
| 77 | Alistar | -0.20 | 0.40 | 0.60 |  |
| 78 | Taric | -0.21 | 0.00 | 0.21 |  |
| 79 | Soraka | -0.22 | 0.17 | 0.39 |  |
| 80 | Braum | -0.24 | 0.70 | 0.94 | projectile block (Unbreakable) |
| 81 | Varus | -0.24 | 0.68 | 0.92 |  |
| 82 | Smolder | -0.24 | 0.20 | 0.44 |  |
| 83 | Volibear | -0.24 | 0.18 | 0.42 |  |
| 84 | Brand | -0.24 | 0.14 | 0.38 |  |
| 85 | Yorick | -0.24 | 0.00 | 0.24 |  |
| 86 | Swain | -0.26 | 0.12 | 0.38 |  |
| 87 | Ekko | -0.26 | 0.00 | 0.26 |  |
| 88 | Ziggs | -0.28 | 0.17 | 0.45 |  |
| 89 | Sion | -0.30 | 0.52 | 0.82 |  |
| 90 | Mordekaiser | -0.31 | 0.08 | 0.39 |  |
| 91 | Shyvana | -0.33 | 0.18 | 0.51 |  |
| 92 | Karma | -0.33 | 0.13 | 0.46 |  |
| 93 | Lucian | -0.35 | 0.21 | 0.56 |  |
| 94 | Akshan | -0.37 | 0.19 | 0.56 |  |
| 95 | Bel'Veth | -0.37 | 0.00 | 0.37 |  |
| 96 | Anivia | -0.38 | 0.16 | 0.54 |  |
| 97 | Darius | -0.38 | 0.00 | 0.38 |  |
| 98 | Trundle | -0.38 | 0.00 | 0.38 |  |
| 99 | Heimerdinger | -0.39 | 0.12 | 0.51 |  |
| 100 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 101 | Irelia | -0.40 | 0.00 | 0.40 |  |
| 102 | Miss Fortune | -0.42 | 0.20 | 0.62 |  |
| 103 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 104 | Quinn | -0.45 | 0.22 | 0.67 |  |
| 105 | Ashe | -0.46 | 0.24 | 0.70 |  |
| 106 | Riven | -0.47 | 0.00 | 0.47 |  |
| 107 | Wukong | -0.48 | 0.00 | 0.48 |  |
| 108 | Gnar | -0.49 | 0.19 | 0.68 |  |
| 109 | Thresh | -0.49 | 0.11 | 0.60 |  |
| 110 | Blitzcrank | -0.49 | 0.00 | 0.49 |  |
| 111 | Karthus | -0.51 | 0.11 | 0.62 |  |
| 112 | Sylas | -0.51 | 0.00 | 0.51 |  |
| 113 | Malzahar | -0.52 | 0.82 | 1.34 |  |
| 114 | Sona | -0.54 | 0.26 | 0.80 |  |
| 115 | Draven | -0.56 | 0.22 | 0.78 |  |
| 116 | Sett | -0.59 | 0.18 | 0.77 |  |
| 117 | Tristana | -0.60 | 0.24 | 0.84 |  |
| 118 | Ivern | -0.60 | 0.11 | 0.71 |  |
| 119 | Locke | -0.61 | 0.00 | 0.61 |  |
| 120 | Malphite | -0.64 | 0.39 | 1.03 |  |
| 121 | Twisted Fate | -0.64 | 0.25 | 0.89 |  |
| 122 | Orianna | -0.66 | 0.16 | 0.82 |  |
| 123 | Azir | -0.67 | 0.16 | 0.83 |  |
| 124 | Syndra | -0.68 | 0.14 | 0.82 |  |
| 125 | Kled | -0.69 | 0.47 | 1.16 |  |
| 126 | Caitlyn | -0.69 | 0.24 | 0.93 |  |
| 127 | Shen | -0.70 | 0.70 | 1.40 | attack block (Spirit's Refuge) |
| 128 | Lee Sin | -0.70 | 0.00 | 0.70 |  |
| 129 | Aphelios | -0.74 | 0.24 | 0.98 |  |
| 130 | Renata Glasc | -0.75 | 0.24 | 0.99 |  |
| 131 | Vel'Koz | -0.78 | 0.16 | 0.94 |  |
| 132 | Lillia | -0.78 | 0.05 | 0.83 |  |
| 133 | Seraphine | -0.80 | 0.17 | 0.97 |  |
| 134 | Diana | -0.80 | 0.00 | 0.80 |  |
| 135 | Zyra | -0.81 | 0.16 | 0.97 |  |
| 136 | Jhin | -0.82 | 0.17 | 0.99 |  |
| 137 | Nami | -0.82 | 0.14 | 0.96 |  |
| 138 | Poppy | -0.83 | 0.57 | 1.40 | dash stop (Steadfast Presence) |
| 139 | Neeko | -0.83 | 0.14 | 0.97 |  |
| 140 | Xerath | -0.85 | 0.16 | 1.01 |  |
| 141 | Yone | -0.86 | 0.36 | 1.22 |  |
| 142 | Amumu | -0.87 | 0.18 | 1.05 |  |
| 143 | Ryze | -0.88 | 0.15 | 1.03 |  |
| 144 | Urgot | -0.89 | 0.08 | 0.97 |  |
| 145 | Skarner | -0.89 | 0.00 | 0.89 |  |
| 146 | Hecarim | -0.94 | 0.19 | 1.13 |  |
| 147 | Leona | -0.95 | 0.00 | 0.95 |  |
| 148 | Qiyana | -0.97 | 0.00 | 0.97 |  |
| 149 | K'Sante | -0.98 | 0.35 | 1.33 |  |
| 150 | Rakan | -0.98 | 0.06 | 1.04 |  |
| 151 | Jarvan IV | -1.01 | 0.18 | 1.19 |  |
| 152 | Ambessa | -1.01 | 0.00 | 1.01 |  |
| 153 | Nautilus | -1.06 | 0.00 | 1.06 |  |
| 154 | Aurelion Sol | -1.08 | 0.14 | 1.22 |  |
| 155 | Ornn | -1.10 | 0.18 | 1.28 |  |
| 156 | Naafiri | -1.13 | 0.00 | 1.13 |  |
| 157 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 158 | Rell | -1.17 | 0.00 | 1.17 |  |
| 159 | Fiddlesticks | -1.21 | 0.11 | 1.32 |  |
| 160 | Briar | -1.22 | 0.00 | 1.22 |  |
| 161 | Janna | -1.25 | 0.22 | 1.47 |  |
| 162 | Warwick | -1.33 | 0.67 | 2.00 |  |
| 163 | Gragas | -1.35 | 0.00 | 1.35 |  |
| 164 | Rammus | -1.39 | 0.32 | 1.71 |  |
| 165 | Viego | -1.50 | 0.18 | 1.68 |  |
| 166 | Pyke | -1.51 | 0.00 | 1.51 |  |
| 167 | Nunu & Willump | -1.52 | 0.00 | 1.52 |  |
| 168 | Zac | -1.65 | 0.40 | 2.05 | dash stop (Stretching Strikes) |
| 169 | Vi | -1.81 | 0.18 | 1.99 |  |
| 170 | Taliyah | -2.01 | 0.16 | 2.17 |  |
| 171 | Galio | -2.06 | 0.00 | 2.06 |  |
| 172 | Tahm Kench | -2.07 | 0.00 | 2.07 |  |
