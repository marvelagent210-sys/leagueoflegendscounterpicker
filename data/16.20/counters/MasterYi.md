# Counters to Master Yi (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Master Yi: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Master Yi wins every time) to +1 (the champion does). Run `npm run duel -- <champion> MasterYi --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 2 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 3 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 4 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 5 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 6 | Udyr | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 7 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 8 | Tahm Kench | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 9 | Riven | +0.78 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | −1.00 |
| 10 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 11 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 12 | Garen | +0.78 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −1.00 |
| 13 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 14 | Kennen | +0.77 | +1.00 | +0.96 | +1.00 | −0.12 | +1.00 | +0.00 |
| 15 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 16 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 17 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 18 | Aphelios | +0.76 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −1.00 |
| 19 | Xin Zhao | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 20 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | −1.00 |
| 21 | Kalista | +0.75 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −1.00 |
| 22 | Volibear | +0.74 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | −1.00 |
| 23 | Gangplank | +0.73 | +1.00 | +1.00 | +1.00 | +0.04 | – | −1.00 |
| 24 | Poppy | +0.73 | +1.00 | +1.00 | +1.00 | +0.02 | – | −1.00 |
| 25 | Fiora | +0.72 | +1.00 | +1.00 | +1.00 | +0.01 | – | −1.00 |
| 26 | Nasus | +0.72 | +1.00 | +1.00 | +1.00 | −0.01 | – | −1.00 |
| 27 | Zaahen | +0.72 | +1.00 | +1.00 | +1.00 | −0.03 | – | −1.00 |
| 28 | Olaf | +0.71 | +1.00 | +1.00 | +1.00 | −0.05 | – | −1.00 |
| 29 | Trundle | +0.71 | +1.00 | +1.00 | +1.00 | −0.06 | – | −1.00 |
| 30 | Sett | +0.71 | +1.00 | +1.00 | +1.00 | +0.05 | +0.00 | +0.00 |
| 31 | Kled | +0.70 | +1.00 | +1.00 | +1.00 | −0.15 | – | −1.00 |
| 32 | Taric | +0.63 | +1.00 | +1.00 | +1.00 | +0.18 | −1.00 | +0.00 |
| 33 | Warwick | +0.62 | +1.00 | +1.00 | +1.00 | +0.12 | −1.00 | +0.00 |
| 34 | Alistar | +0.60 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 35 | Rakan | +0.58 | +1.00 | +1.00 | +0.00 | −0.12 | +1.00 | +0.00 |
| 36 | Karma | +0.58 | +1.00 | +0.98 | −0.01 | −0.03 | +0.92 | +0.00 |
| 37 | Maokai | +0.58 | +1.00 | +1.00 | +1.00 | +0.17 | −1.00 | −1.00 |
| 38 | Braum | +0.54 | +1.00 | +1.00 | +1.00 | −0.09 | −1.00 | −1.00 |
| 39 | Lee Sin | +0.48 | +1.00 | +1.00 | +0.00 | −0.10 | – | −1.00 |
| 40 | Aatrox | +0.42 | +1.00 | +0.00 | +1.00 | −0.15 | – | −1.00 |
| 41 | Sion | +0.41 | +0.50 | +0.50 | +0.50 | +0.13 | – | +0.00 |
| 42 | Jayce | +0.31 | +1.00 | +0.00 | +0.00 | +0.08 | +1.00 | −1.00 |
| 43 | Camille | +0.28 | +1.00 | +0.00 | +0.00 | −0.12 | +1.00 | −1.00 |
| 44 | Fizz | +0.13 | +1.00 | +1.00 | −1.00 | −0.10 | −1.00 | −1.00 |
| 45 | Gnar | +0.11 | +0.37 | +0.69 | +0.00 | −0.02 | −1.00 | −1.00 |
| 46 | Kog'Maw | +0.11 | +0.00 | +0.00 | +0.50 | +0.07 | +0.00 | +0.00 |
| 47 | Lulu | +0.10 | +1.00 | +0.00 | +0.00 | +0.01 | −1.00 | −1.00 |
| 48 | Annie | +0.06 | −1.00 | +1.00 | +0.00 | +0.09 | +1.00 | −1.00 |
| 49 | Mordekaiser | +0.05 | −0.53 | −0.06 | +1.00 | +0.00 | −0.06 | +0.00 |
| 50 | Vi | +0.04 | +1.00 | −1.00 | +1.00 | −0.04 | −1.00 | −1.00 |
| 51 | Corki | +0.01 | +0.82 | −1.00 | +1.00 | +0.01 | −1.00 | −1.00 |
| 52 | Yone | −0.07 | +0.00 | +0.00 | +0.00 | −0.10 | – | −1.00 |
| 53 | Neeko | −0.08 | +1.00 | −1.00 | +0.00 | +0.15 | −1.00 | +0.00 |
| 54 | Ashe | −0.12 | −0.02 | +0.00 | +0.00 | +0.25 | −1.00 | −1.00 |
| 55 | Graves | −0.12 | +1.00 | −1.00 | −1.00 | +0.20 | +1.00 | −1.00 |
| 56 | Xayah | −0.19 | −1.00 | +0.00 | +0.00 | +0.06 | +1.00 | −1.00 |
| 57 | Skarner | −0.34 | −1.00 | +0.00 | +0.00 | +0.09 | −1.00 | +0.00 |
| 58 | Malzahar | −0.35 | −1.00 | +0.00 | +0.00 | +0.00 | −1.00 | +0.00 |
| 59 | Amumu | −0.36 | −1.00 | +0.00 | +0.00 | −0.06 | −1.00 | −0.06 |
| 60 | Heimerdinger | −0.43 | −1.00 | −1.00 | +1.00 | +0.11 | −1.00 | −1.00 |
| 61 | Irelia | −0.46 | −1.00 | −1.00 | +1.00 | −0.07 | −1.00 | −1.00 |
| 62 | Senna | −0.48 | −1.00 | −0.44 | −0.44 | +0.04 | +0.13 | −1.00 |
| 63 | Shen | −0.54 | −1.00 | +0.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 64 | Anivia | −0.55 | −1.00 | −0.38 | −0.48 | −0.09 | −1.00 | +0.00 |
| 65 | Nautilus | −0.59 | −1.00 | −1.00 | +0.00 | +0.07 | −1.00 | +0.00 |
| 66 | Caitlyn | −0.60 | −1.00 | −1.00 | +0.00 | +0.00 | −1.00 | +0.00 |
| 67 | Varus | −0.65 | −1.00 | −1.00 | +0.00 | +0.00 | −1.00 | −1.00 |
| 68 | Swain | −0.66 | −1.00 | −0.61 | −0.61 | +0.03 | −1.00 | −0.81 |
| 69 | Quinn | −0.69 | −1.00 | −1.00 | −0.14 | −0.10 | −1.00 | −1.00 |
| 70 | Veigar | −0.72 | −1.00 | −1.00 | −0.57 | −0.05 | −1.00 | +0.00 |
| 71 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.31 | −1.00 | +0.00 |
| 72 | Cassiopeia | −0.76 | −0.88 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 73 | Vel'Koz | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 74 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 75 | Rengar | −0.77 | −1.00 | −1.00 | −1.00 | +0.36 | – | −1.00 |
| 76 | Malphite | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 77 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 78 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 79 | Singed | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 80 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 81 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 82 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 83 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 84 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 85 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 86 | Hwei | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 87 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 88 | Kayle | −0.80 | −1.00 | −1.00 | −1.00 | +0.35 | −1.00 | −1.00 |
| 89 | Jinx | −0.80 | −1.00 | −1.00 | −0.78 | +0.03 | −1.00 | −1.00 |
| 90 | Jhin | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.50 |
| 91 | Kassadin | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 92 | Sejuani | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 93 | Aurora | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 94 | Rammus | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 95 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 96 | Wukong | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 97 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 98 | Nocturne | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.50 |
| 99 | Nunu & Willump | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 100 | Ziggs | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 101 | Rell | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 102 | Diana | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 103 | Smolder | −0.83 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −1.00 |
| 104 | Vex | −0.83 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.50 |
| 105 | Rumble | −0.84 | −1.00 | −1.00 | −1.00 | −0.01 | – | −1.00 |
| 106 | Zeri | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −1.00 |
| 107 | Akali | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 108 | Akshan | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −1.00 |
| 109 | Miss Fortune | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −1.00 |
| 110 | Lux | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | −0.86 | −1.00 |
| 111 | Twitch | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −1.00 |
| 112 | Tristana | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 113 | Soraka | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 114 | Zyra | −0.84 | −1.00 | −1.00 | −0.99 | +0.03 | −1.00 | −1.00 |
| 115 | Janna | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 116 | Orianna | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 117 | Syndra | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 118 | Gragas | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 119 | Kindred | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −1.00 |
| 120 | Nami | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −1.00 |
| 121 | Sona | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −1.00 |
| 122 | Hecarim | −0.85 | −1.00 | −1.00 | −1.00 | −0.09 | – | −1.00 |
| 123 | Brand | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −1.00 |
| 124 | Viktor | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −1.00 |
| 125 | LeBlanc | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −1.00 |
| 126 | Zed | −0.85 | −1.00 | −1.00 | −1.00 | −0.10 | – | −1.00 |
| 127 | Jarvan IV | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −1.00 |
| 128 | Katarina | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −1.00 |
| 129 | Sivir | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −1.00 |
| 130 | Xerath | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −1.00 |
| 131 | Draven | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −1.00 |
| 132 | Lucian | −0.86 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −1.00 |
| 133 | Samira | −0.86 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −1.00 |
| 134 | Leona | −0.86 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −1.00 |
| 135 | Evelynn | −0.86 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −1.00 |
| 136 | Talon | −0.86 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −1.00 |
| 137 | Galio | −0.86 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −1.00 |
| 138 | Naafiri | −0.86 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −1.00 |
| 139 | Gwen | −0.86 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −1.00 |
| 140 | Ezreal | −0.86 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −1.00 |
| 141 | Kai'Sa | −0.87 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −1.00 |
| 142 | Ekko | −0.87 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −1.00 |
| 143 | Morgana | −0.87 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −1.00 |
| 144 | Thresh | −0.88 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Master Yi's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Master Yi's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> MasterYi` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.81)

- **0.41** range: Sivir's basic attacks reach 325 units farther than Master Yi's (500 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Sivir basic attacks → Master Yi basic attacks)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Master Yi's Alpha Strike. Spell shield for 1.5 s, long enough to use ahead of Alpha Strike. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block a single instance of damage. (Sivir E Spell Shield → Master Yi Q Alpha Strike)

#### 2. Kayle (net +0.56)

- **0.43** invulnerable: Divine Judgment makes Kayle invulnerable to Master Yi's Alpha Strike. Invulnerable for 2.5 s, long enough to use ahead of Alpha Strike. (Kayle R Divine Judgment → Master Yi Q Alpha Strike)
- **0.36** range: Kayle's basic attacks reach 450 units farther than Master Yi's (625 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Kayle basic attacks → Master Yi basic attacks)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Kayle's Starfire Spellblade.

#### 3. Vladimir (net +0.40)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Master Yi's Alpha Strike. Untargetable for 2 s, long enough to use ahead of Alpha Strike. (Vladimir W Sanguine Pool → Master Yi Q Alpha Strike)
- **0.15** range: Vladimir's basic attacks reach 275 units farther than Master Yi's (450 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Vladimir basic attacks → Master Yi basic attacks)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Vladimir's Hemoplague.

#### 4. Kai'Sa (net +0.34)

- **0.34** range: Kai'Sa's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Kai'Sa basic attacks → Master Yi basic attacks)

#### 5. Twitch (net +0.33)

- **0.40** range: Twitch's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Twitch basic attacks → Master Yi basic attacks)
- Watch out: Highlander makes Master Yi immune to Twitch's Venom Cask (slow).

#### 6. Xayah (net +0.28)

- **0.41** untargetable: Featherstorm makes Xayah untargetable, dodging Master Yi's Alpha Strike. Untargetable for 1.5 s, long enough to use ahead of Alpha Strike. (Xayah R Featherstorm → Master Yi Q Alpha Strike)
- **0.34** range: Xayah's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Xayah basic attacks → Master Yi basic attacks)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Xayah's Featherstorm.

#### 7. Yunara (net +0.27)

- **0.36** range: Yunara's basic attacks reach 400 units farther than Master Yi's (575 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Yunara basic attacks → Master Yi basic attacks)
- Watch out: Highlander makes Master Yi immune to Yunara's Arc of Judgment (slow).

#### 8. Twisted Fate (net +0.25)

- **0.38** range: Twisted Fate's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Twisted Fate basic attacks → Master Yi basic attacks)
- **0.23** interrupt: Pick a Card's stun interrupts Master Yi's Meditate (normal channel). Pick a Card must land during the channel. (Twisted Fate W Pick a Card → Master Yi W Meditate)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Twisted Fate's Pick a Card.

#### 9. Singed (net +0.18)

- **0.39** grounding: Mega Adhesive grounds Master Yi, who then can't cast Alpha Strike. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Master Yi Q Alpha Strike)
- **0.23** interrupt: Fling's airborne interrupts Master Yi's Meditate (normal channel). Fling must land during the channel. (Singed E Fling → Master Yi W Meditate)
- **0.18** anti-heal: Insanity Potion's Grievous Wounds cuts Master Yi's healing from Meditate by 40%. (Singed R Insanity Potion → Master Yi W Meditate)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Singed's Fling.

#### 10. Zilean (net +0.10)

- **0.30** range: Zilean's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range). Master Yi closes the gap with Alpha Strike. (Zilean basic attacks → Master Yi basic attacks)
- **0.23** interrupt: Time Bomb's stun interrupts Master Yi's Meditate (normal channel). Time Bomb must land during the channel. (Zilean Q Time Bomb → Master Yi W Meditate)
- Watch out: Alpha Strike makes Master Yi untargetable, dodging Zilean's Time Warp.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.81 | 0.81 | 0.00 |  |
| 2 | Kayle | +0.56 | 0.79 | 0.23 |  |
| 3 | Vladimir | +0.40 | 0.95 | 0.55 |  |
| 4 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 5 | Twitch | +0.33 | 0.40 | 0.07 |  |
| 6 | Xayah | +0.28 | 0.75 | 0.47 |  |
| 7 | Yunara | +0.27 | 0.36 | 0.09 |  |
| 8 | Twisted Fate | +0.25 | 0.61 | 0.36 |  |
| 9 | Singed | +0.18 | 0.89 | 0.71 |  |
| 10 | Zilean | +0.10 | 0.53 | 0.43 |  |
| 11 | Yuumi | +0.04 | 0.75 | 0.71 |  |
| 12 | Kindred | +0.04 | 0.41 | 0.37 |  |
| 13 | Teemo | +0.01 | 0.79 | 0.78 | blind (Blinding Dart) |
| 14 | Quinn | -0.03 | 0.57 | 0.60 |  |
| 15 | Nidalee | -0.04 | 0.26 | 0.30 |  |
| 16 | Shen | -0.05 | 0.83 | 0.88 | attack block (Spirit's Refuge) |
| 17 | Milio | -0.06 | 0.57 | 0.63 |  |
| 18 | Lulu | -0.07 | 0.90 | 0.97 |  |
| 19 | Fiora | -0.07 | 0.53 | 0.60 |  |
| 20 | Tryndamere | -0.07 | 0.00 | 0.07 |  |
| 21 | Kog'Maw | -0.11 | 0.24 | 0.35 |  |
| 22 | Aurora | -0.12 | 0.51 | 0.63 |  |
| 23 | Nasus | -0.12 | 0.39 | 0.51 |  |
| 24 | Vayne | -0.13 | 0.60 | 0.73 |  |
| 25 | Pantheon | -0.14 | 0.80 | 0.94 |  |
| 26 | Taric | -0.14 | 0.20 | 0.34 |  |
| 27 | Bard | -0.16 | 0.80 | 0.96 |  |
| 28 | Malzahar | -0.17 | 0.52 | 0.69 |  |
| 29 | Jax | -0.21 | 0.67 | 0.88 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 30 | Gwen | -0.21 | 0.48 | 0.69 |  |
| 31 | Zeri | -0.21 | 0.41 | 0.62 |  |
| 32 | Elise | -0.23 | 0.53 | 0.76 |  |
| 33 | Zoe | -0.24 | 0.49 | 0.73 |  |
| 34 | Miss Fortune | -0.24 | 0.30 | 0.54 |  |
| 35 | Kennen | -0.25 | 0.50 | 0.75 |  |
| 36 | Kayn | -0.25 | 0.49 | 0.74 |  |
| 37 | Corki | -0.25 | 0.30 | 0.55 |  |
| 38 | Dr. Mundo | -0.25 | 0.00 | 0.25 |  |
| 39 | Jayce | -0.26 | 0.49 | 0.75 |  |
| 40 | Akshan | -0.26 | 0.29 | 0.55 |  |
| 41 | Katarina | -0.29 | 0.18 | 0.47 |  |
| 42 | Yorick | -0.30 | 0.20 | 0.50 |  |
| 43 | LeBlanc | -0.30 | 0.19 | 0.49 |  |
| 44 | Samira | -0.31 | 0.26 | 0.57 |  |
| 45 | Soraka | -0.32 | 0.42 | 0.74 |  |
| 46 | Udyr | -0.32 | 0.23 | 0.55 |  |
| 47 | Rell | -0.33 | 1.03 | 1.36 |  |
| 48 | Xerath | -0.34 | 0.44 | 0.78 |  |
| 49 | Heimerdinger | -0.35 | 0.61 | 0.96 |  |
| 50 | Olaf | -0.35 | 0.00 | 0.35 |  |
| 51 | Janna | -0.36 | 0.63 | 0.99 |  |
| 52 | Sylas | -0.36 | 0.23 | 0.59 |  |
| 53 | Vel'Koz | -0.37 | 0.46 | 0.83 |  |
| 54 | Kalista | -0.37 | 0.38 | 0.75 |  |
| 55 | Lucian | -0.37 | 0.31 | 0.68 |  |
| 56 | Ashe | -0.38 | 0.47 | 0.85 |  |
| 57 | Vex | -0.39 | 0.42 | 0.81 |  |
| 58 | Zed | -0.39 | 0.24 | 0.63 |  |
| 59 | Blitzcrank | -0.40 | 0.56 | 0.96 |  |
| 60 | Sona | -0.40 | 0.49 | 0.89 |  |
| 61 | Annie | -0.40 | 0.45 | 0.85 |  |
| 62 | Riven | -0.40 | 0.42 | 0.82 |  |
| 63 | Ezreal | -0.40 | 0.30 | 0.70 |  |
| 64 | Varus | -0.42 | 0.45 | 0.87 |  |
| 65 | Fiddlesticks | -0.43 | 0.59 | 1.02 |  |
| 66 | Nilah | -0.44 | 0.64 | 1.08 |  |
| 67 | Aatrox | -0.44 | 0.23 | 0.67 |  |
| 68 | Rek'Sai | -0.45 | 0.66 | 1.11 |  |
| 69 | Viktor | -0.45 | 0.58 | 1.03 |  |
| 70 | Garen | -0.45 | 0.23 | 0.68 |  |
| 71 | Lissandra | -0.46 | 0.70 | 1.16 |  |
| 72 | Draven | -0.46 | 0.54 | 1.00 |  |
| 73 | Alistar | -0.46 | 0.46 | 0.92 |  |
| 74 | Renekton | -0.46 | 0.23 | 0.69 |  |
| 75 | Aurelion Sol | -0.47 | 0.54 | 1.01 |  |
| 76 | Sion | -0.47 | 0.34 | 0.81 |  |
| 77 | Karthus | -0.47 | 0.16 | 0.63 |  |
| 78 | Veigar | -0.48 | 0.41 | 0.89 |  |
| 79 | Anivia | -0.49 | 0.64 | 1.13 |  |
| 80 | Kassadin | -0.50 | 0.23 | 0.73 |  |
| 81 | Ryze | -0.52 | 0.22 | 0.74 |  |
| 82 | Yasuo | -0.53 | 0.37 | 0.90 |  |
| 83 | Gnar | -0.54 | 0.66 | 1.20 |  |
| 84 | Tristana | -0.54 | 0.46 | 1.00 |  |
| 85 | Brand | -0.54 | 0.44 | 0.98 |  |
| 86 | Caitlyn | -0.54 | 0.36 | 0.90 |  |
| 87 | Jinx | -0.54 | 0.25 | 0.79 |  |
| 88 | Cho'Gath | -0.55 | 0.46 | 1.01 |  |
| 89 | Smolder | -0.55 | 0.30 | 0.85 |  |
| 90 | Thresh | -0.56 | 0.62 | 1.18 |  |
| 91 | Wukong | -0.56 | 0.11 | 0.67 |  |
| 92 | Kha'Zix | -0.56 | 0.00 | 0.56 |  |
| 93 | Cassiopeia | -0.57 | 0.70 | 1.27 |  |
| 94 | Renata Glasc | -0.57 | 0.63 | 1.20 |  |
| 95 | Nocturne | -0.57 | 0.61 | 1.18 |  |
| 96 | Camille | -0.58 | 0.54 | 1.12 |  |
| 97 | Ziggs | -0.58 | 0.45 | 1.03 |  |
| 98 | Shaco | -0.58 | 0.44 | 1.02 |  |
| 99 | Graves | -0.58 | 0.20 | 0.78 |  |
| 100 | Swain | -0.59 | 0.41 | 1.00 |  |
| 101 | Karma | -0.59 | 0.19 | 0.78 |  |
| 102 | Mordekaiser | -0.61 | 0.32 | 0.93 |  |
| 103 | Lux | -0.61 | 0.27 | 0.88 |  |
| 104 | Xin Zhao | -0.62 | 0.69 | 1.31 |  |
| 105 | Fizz | -0.62 | 0.59 | 1.21 |  |
| 106 | Galio | -0.62 | 0.52 | 1.14 |  |
| 107 | Ivern | -0.62 | 0.16 | 0.78 |  |
| 108 | Warwick | -0.63 | 0.32 | 0.95 |  |
| 109 | Bel'Veth | -0.63 | 0.23 | 0.86 |  |
| 110 | Mel | -0.66 | 0.25 | 0.91 |  |
| 111 | Maokai | -0.68 | 0.71 | 1.39 |  |
| 112 | Rammus | -0.69 | 0.81 | 1.50 |  |
| 113 | Ahri | -0.69 | 0.41 | 1.10 |  |
| 114 | Syndra | -0.69 | 0.39 | 1.08 |  |
| 115 | Orianna | -0.69 | 0.34 | 1.03 |  |
| 116 | Braum | -0.69 | 0.33 | 1.02 |  |
| 117 | Azir | -0.70 | 0.34 | 1.04 |  |
| 118 | Senna | -0.70 | 0.32 | 1.02 |  |
| 119 | Rumble | -0.71 | 0.00 | 0.71 |  |
| 120 | Zyra | -0.72 | 0.35 | 1.07 |  |
| 121 | Talon | -0.72 | 0.00 | 0.72 |  |
| 122 | Hwei | -0.73 | 0.44 | 1.17 |  |
| 123 | Tahm Kench | -0.74 | 0.57 | 1.31 |  |
| 124 | Seraphine | -0.74 | 0.56 | 1.30 |  |
| 125 | Neeko | -0.74 | 0.32 | 1.06 |  |
| 126 | Shyvana | -0.75 | 0.23 | 0.98 |  |
| 127 | Taliyah | -0.76 | 0.75 | 1.51 |  |
| 128 | Lee Sin | -0.76 | 0.11 | 0.87 |  |
| 129 | Irelia | -0.77 | 0.23 | 1.00 |  |
| 130 | Illaoi | -0.77 | 0.00 | 0.77 |  |
| 131 | Nami | -0.78 | 0.54 | 1.32 |  |
| 132 | Morgana | -0.79 | 0.16 | 0.95 |  |
| 133 | Rengar | -0.79 | 0.00 | 0.79 |  |
| 134 | Zaahen | -0.81 | 0.43 | 1.24 |  |
| 135 | Sett | -0.83 | 0.34 | 1.17 |  |
| 136 | Gangplank | -0.83 | 0.00 | 0.83 |  |
| 137 | Jhin | -0.84 | 0.25 | 1.09 |  |
| 138 | Lillia | -0.84 | 0.18 | 1.02 |  |
| 139 | Vi | -0.88 | 0.34 | 1.22 |  |
| 140 | Amumu | -0.90 | 0.30 | 1.20 |  |
| 141 | Trundle | -0.90 | 0.18 | 1.08 |  |
| 142 | Pyke | -0.92 | 0.44 | 1.36 |  |
| 143 | Kled | -0.92 | 0.41 | 1.33 |  |
| 144 | Darius | -0.92 | 0.17 | 1.09 |  |
| 145 | Zac | -0.93 | 0.57 | 1.50 |  |
| 146 | Malphite | -0.93 | 0.35 | 1.28 |  |
| 147 | Yone | -0.93 | 0.34 | 1.27 |  |
| 148 | Skarner | -0.93 | 0.11 | 1.04 |  |
| 149 | Rakan | -0.94 | 0.43 | 1.37 |  |
| 150 | Urgot | -0.95 | 0.42 | 1.37 |  |
| 151 | Sejuani | -0.97 | 0.54 | 1.51 |  |
| 152 | Nunu & Willump | -0.97 | 0.19 | 1.16 |  |
| 153 | Ambessa | -0.97 | 0.10 | 1.07 |  |
| 154 | Aphelios | -0.99 | 0.36 | 1.35 |  |
| 155 | Diana | -0.99 | 0.11 | 1.10 |  |
| 156 | Akali | -0.99 | 0.00 | 0.99 |  |
| 157 | Leona | -1.00 | 0.34 | 1.34 |  |
| 158 | Gragas | -1.00 | 0.31 | 1.31 |  |
| 159 | Evelynn | -1.01 | 0.47 | 1.48 |  |
| 160 | K'Sante | -1.02 | 0.57 | 1.59 |  |
| 161 | Locke | -1.02 | 0.00 | 1.02 |  |
| 162 | Nautilus | -1.06 | 0.11 | 1.17 |  |
| 163 | Poppy | -1.08 | 0.10 | 1.18 |  |
| 164 | Naafiri | -1.12 | 0.00 | 1.12 |  |
| 165 | Volibear | -1.20 | 0.23 | 1.43 |  |
| 166 | Jarvan IV | -1.20 | 0.11 | 1.31 |  |
| 167 | Qiyana | -1.20 | 0.10 | 1.30 |  |
| 168 | Viego | -1.24 | 0.34 | 1.58 |  |
| 169 | Ekko | -1.26 | 0.00 | 1.26 |  |
| 170 | Ornn | -1.38 | 0.33 | 1.71 |  |
| 171 | Hecarim | -1.38 | 0.10 | 1.48 |  |
| 172 | Briar | -1.52 | 0.11 | 1.63 |  |
