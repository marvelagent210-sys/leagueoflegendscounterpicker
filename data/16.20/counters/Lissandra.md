# Counters to Lissandra (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Lissandra: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Lissandra wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Lissandra --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.42 | +1.00 | +0.00 |
| 2 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 3 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 4 | Ryze | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 5 | Vi | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 6 | Heimerdinger | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 7 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 8 | Zoe | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 9 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 10 | Wukong | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 11 | Aphelios | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 12 | Galio | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 13 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 14 | Jarvan IV | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 15 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 16 | Neeko | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 17 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 18 | Vel'Koz | +0.80 | +0.99 | +1.00 | +1.00 | +0.00 | +0.98 | +0.00 |
| 19 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 20 | Brand | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 21 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 22 | Maokai | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 23 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 24 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 25 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +0.99 | +0.00 |
| 26 | Cassiopeia | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 27 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 28 | Nami | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 29 | Mordekaiser | +0.79 | +0.99 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 30 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 31 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 32 | Master Yi | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 33 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 34 | Soraka | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 35 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 36 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 37 | Sona | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 38 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 39 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 40 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 41 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 42 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 43 | Graves | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 44 | Twisted Fate | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 45 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 46 | Sion | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 47 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 48 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 49 | Sejuani | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 50 | Hwei | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 51 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 52 | Annie | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 53 | Ezreal | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 54 | Smolder | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 55 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 56 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 57 | Miss Fortune | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 58 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | +0.88 | +0.00 |
| 59 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 60 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 61 | Lux | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 62 | Lucian | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 63 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 64 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 65 | Janna | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 66 | Kayle | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 67 | Twitch | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 68 | Samira | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 69 | Akshan | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 70 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 71 | Ashe | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 72 | Syndra | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 73 | Karma | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 74 | Kindred | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 75 | Viktor | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 76 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 77 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 78 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 79 | Quinn | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 80 | Jhin | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 81 | Vayne | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 82 | Diana | +0.74 | +1.00 | +1.00 | +1.00 | +0.09 | +0.26 | +0.00 |
| 83 | Poppy | +0.72 | +1.00 | +1.00 | +1.00 | −0.01 | +0.26 | +0.00 |
| 84 | Rell | +0.72 | +1.00 | +1.00 | +1.00 | +0.07 | +0.13 | +0.00 |
| 85 | Darius | +0.70 | +1.00 | +1.00 | +1.00 | −0.07 | +0.16 | +0.00 |
| 86 | Garen | +0.70 | +1.00 | +1.00 | +1.00 | −0.00 | +0.04 | +0.00 |
| 87 | Nautilus | +0.70 | +0.98 | +0.98 | +0.57 | −0.01 | +0.96 | +0.00 |
| 88 | Urgot | +0.69 | +0.98 | +1.00 | +1.00 | −0.06 | +0.05 | +0.00 |
| 89 | Sett | +0.69 | +1.00 | +1.00 | +0.47 | −0.05 | +1.00 | +0.00 |
| 90 | Xin Zhao | +0.68 | +1.00 | +1.00 | +1.00 | −0.03 | −0.17 | +0.00 |
| 91 | Skarner | +0.68 | +1.00 | +1.00 | +1.00 | −0.17 | +0.02 | +0.00 |
| 92 | Illaoi | +0.67 | +0.95 | +1.00 | +0.97 | −0.08 | +0.01 | +0.00 |
| 93 | Anivia | +0.63 | +0.49 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 94 | Lee Sin | +0.62 | +1.00 | +1.00 | +1.00 | −0.05 | −0.71 | +0.00 |
| 95 | Gragas | +0.59 | +1.00 | +0.19 | +1.00 | −0.07 | +1.00 | +0.00 |
| 96 | Morgana | +0.59 | +0.65 | +1.00 | +0.98 | −0.05 | −0.16 | +0.00 |
| 97 | Warwick | +0.58 | +1.00 | +1.00 | +1.00 | −0.13 | −0.98 | +0.00 |
| 98 | Rakan | +0.58 | +1.00 | +1.00 | +1.00 | −0.21 | −0.88 | +0.00 |
| 99 | Pantheon | +0.57 | +1.00 | +1.00 | +1.00 | −0.19 | −1.00 | +0.00 |
| 100 | Irelia | +0.56 | +1.00 | +1.00 | +0.34 | −0.03 | −0.01 | +0.00 |
| 101 | Fizz | +0.54 | +0.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 102 | Ambessa | +0.51 | +1.00 | +1.00 | +0.52 | +0.05 | −1.00 | +0.00 |
| 103 | Akali | +0.50 | +0.99 | +0.39 | +0.68 | −0.02 | +0.25 | +0.00 |
| 104 | Yone | +0.48 | +1.00 | +1.00 | +0.47 | −0.10 | −0.97 | +0.00 |
| 105 | Rammus | +0.48 | +0.68 | +0.08 | +1.00 | −0.09 | +1.00 | +0.00 |
| 106 | Gwen | +0.46 | +0.98 | −0.16 | +0.95 | −0.16 | +0.84 | +0.00 |
| 107 | Leona | +0.44 | −0.04 | +0.85 | +0.85 | −0.03 | +0.75 | +0.00 |
| 108 | Evelynn | +0.41 | +1.00 | +1.00 | +0.00 | +0.06 | −0.95 | +0.00 |
| 109 | LeBlanc | +0.40 | +0.92 | −0.09 | +0.67 | −0.01 | +0.56 | +0.00 |
| 110 | Jinx | +0.35 | +1.00 | +0.24 | +0.00 | +0.04 | – | +0.00 |
| 111 | Alistar | +0.33 | +0.17 | +1.00 | +0.10 | +0.01 | +0.12 | +0.00 |
| 112 | Veigar | +0.31 | +0.17 | +0.61 | +0.16 | +0.01 | +0.83 | +0.00 |
| 113 | Ornn | +0.28 | +0.08 | +0.47 | +0.51 | −0.06 | +0.48 | +0.00 |
| 114 | Vladimir | +0.27 | +0.02 | +1.00 | +0.13 | −0.05 | −0.02 | +0.00 |
| 115 | Braum | +0.25 | +0.22 | +0.66 | +0.21 | −0.03 | −0.05 | +0.00 |
| 116 | Ziggs | +0.25 | +1.00 | −1.00 | +1.00 | +0.14 | – | +0.00 |
| 117 | Zyra | +0.23 | +0.02 | +0.06 | +1.00 | −0.02 | +0.14 | +0.00 |
| 118 | Shen | +0.19 | +0.10 | +0.19 | +0.59 | −0.08 | +0.08 | +0.00 |
| 119 | Tahm Kench | +0.14 | +0.18 | +0.17 | +0.25 | −0.10 | +0.17 | +0.00 |
| 120 | Nunu & Willump | +0.11 | +0.15 | +0.18 | +0.16 | −0.02 | −0.01 | +0.00 |
| 121 | Malphite | +0.10 | −0.08 | +0.09 | +0.49 | +0.03 | −0.01 | +0.00 |
| 122 | Ekko | +0.10 | +0.47 | +0.04 | +0.03 | −0.09 | −0.17 | +0.00 |
| 123 | Taric | +0.08 | +0.11 | +0.23 | +0.05 | −0.04 | −0.04 | +0.00 |
| 124 | Singed | +0.00 | +0.15 | +0.12 | +0.09 | −0.30 | −0.39 | +0.00 |
| 125 | Naafiri | −0.00 | −0.01 | +0.04 | −0.08 | +0.04 | +0.02 | +0.00 |
| 126 | Kha'Zix | −0.00 | +0.05 | +0.01 | +0.03 | −0.19 | +0.02 | +0.00 |
| 127 | Aatrox | −0.01 | +0.56 | +0.39 | −0.77 | −0.17 | −0.68 | +0.00 |
| 128 | Amumu | −0.01 | −0.01 | −0.01 | +0.07 | −0.11 | −0.02 | +0.00 |
| 129 | Caitlyn | −0.06 | +1.00 | −0.19 | −1.00 | −0.02 | −0.55 | +0.00 |
| 130 | Vex | −0.06 | −0.02 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 131 | Karthus | −0.08 | −0.10 | −0.11 | −0.15 | +0.09 | −0.16 | +0.00 |
| 132 | Xerath | −0.11 | −1.00 | +0.98 | −1.00 | −0.01 | +1.00 | +0.00 |
| 133 | Blitzcrank | −0.16 | −0.17 | −0.18 | −0.11 | −0.12 | −0.30 | +0.00 |
| 134 | Senna | −0.22 | −0.03 | −0.01 | −1.00 | +0.06 | – | +0.00 |
| 135 | Ahri | −0.31 | −0.91 | −0.97 | +1.00 | −0.06 | – | +0.00 |
| 136 | Nocturne | −0.38 | −1.00 | −0.27 | +0.25 | −0.14 | −0.97 | +0.00 |
| 137 | Zed | −0.56 | +0.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 138 | Malzahar | −0.57 | −0.30 | −0.95 | −1.00 | +0.02 | – | +0.00 |
| 139 | Taliyah | −0.67 | −0.56 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 140 | Hecarim | −0.72 | −1.00 | −1.00 | −1.00 | −0.17 | +0.00 | +0.00 |
| 141 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −0.93 | +0.00 |
| 142 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 143 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 144 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Lissandra's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lissandra's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lissandra` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.67)

- **0.47** spell shield: Spell Shield's spell shield blocks Lissandra's Ring of Frost. Spell shield for 1.5 s, long enough to use ahead of Ring of Frost. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lissandra W Ring of Frost)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Lissandra's Frozen Tomb. Spell shield for 1.5 s, long enough to use ahead of Frozen Tomb. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the single-targeted portion and the radiating ice damage, but will not stop it from spreading. (Sivir E Spell Shield → Lissandra R Frozen Tomb)

#### 2. Fiora (net +0.51)

- **0.90** parry: Riposte parries Lissandra's Frozen Tomb and stuns back. Parry for 0.75 s; Frozen Tomb takes 0.38 s to land, enough to react. Negating Frozen Tomb's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Lissandra R Frozen Tomb)
- **0.39** parry: Riposte parries Lissandra's Ring of Frost and stuns back. Parry for 0.75 s; Ring of Frost lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Ring of Frost's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Lissandra W Ring of Frost)
- **0.05** attack speed slow: Riposte cuts Lissandra's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Lissandra basic attacks)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Fiora's Riposte.

#### 3. Master Yi (net +0.46)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Lissandra's Frozen Tomb. Untargetable for ?; Frozen Tomb takes 0.38 s to land, enough to react. (Master Yi Q Alpha Strike → Lissandra R Frozen Tomb)
- **0.28** untargetable: Alpha Strike makes Master Yi untargetable, dodging Lissandra's Ring of Frost. Untargetable for ?; Ring of Frost lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Lissandra W Ring of Frost)
- **0.15** cleanse: Highlander cleanses Lissandra's Frozen Tomb (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove knockdown, stun. (Master Yi R Highlander → Lissandra R Frozen Tomb)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Master Yi's Alpha Strike.

#### 4. Udyr (net +0.39)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Lissandra's Frozen Tomb (knockdown, slow, stun). Immune for 1.5 s, long enough to use ahead of Frozen Tomb. (Udyr E Blazing Stampede → Lissandra R Frozen Tomb)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Lissandra's Ring of Frost (root). Immune for 1.5 s, long enough to use ahead of Ring of Frost. (Udyr E Blazing Stampede → Lissandra W Ring of Frost)
- **0.10** cc immunity: Blazing Stampede makes Udyr immune to Lissandra's Ice Shard (slow). Immune for 1.5 s, long enough to use ahead of Ice Shard. (Udyr E Blazing Stampede → Lissandra Q Ice Shard)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Udyr's Blazing Stampede.

#### 5. Milio (net +0.36)

- **0.49** cleanse: Breath of Life cleanses Lissandra's Frozen Tomb (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Milio R Breath of Life → Lissandra R Frozen Tomb)
- **0.24** cleanse: Breath of Life cleanses Lissandra's Ring of Frost (root) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Lissandra W Ring of Frost)
- **0.22** tenacity: Breath of Life's 65% tenacity shortens Lissandra's Frozen Tomb (slow, stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Lissandra R Frozen Tomb)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Milio's Ultra Mega Fire Kick.

#### 6. Kayle (net +0.35)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Lissandra's Frozen Tomb (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Frozen Tomb. (Kayle R Divine Judgment → Lissandra R Frozen Tomb)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Lissandra's Ring of Frost (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Ring of Frost. (Kayle R Divine Judgment → Lissandra W Ring of Frost)
- **0.07** range: Kayle's basic attacks reach 75 units farther than Lissandra's (625 vs 550 attack range). Lissandra closes the gap with Glacial Path. (Kayle basic attacks → Lissandra basic attacks)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Kayle's Starfire Spellblade.

#### 7. Olaf (net +0.34)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Lissandra's Frozen Tomb (knockdown, slow, stun). Immune for 3 s, long enough to use ahead of Frozen Tomb. (Olaf R Ragnarok → Lissandra R Frozen Tomb)
- **0.32** cc immunity: Ragnarok makes Olaf immune to Lissandra's Ring of Frost (root). Immune for 3 s, long enough to use ahead of Ring of Frost. (Olaf R Ragnarok → Lissandra W Ring of Frost)
- **0.06** cc immunity: Ragnarok makes Olaf immune to Lissandra's Ice Shard (slow). Immune for 3 s, long enough to use ahead of Ice Shard. (Olaf R Ragnarok → Lissandra Q Ice Shard)
- Watch out: Lissandra's basic attacks reach 425 units farther than Olaf's (550 vs 125 attack range).

#### 8. Vladimir (net +0.28)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lissandra's Frozen Tomb. Untargetable for 2 s, long enough to use ahead of Frozen Tomb. (Vladimir W Sanguine Pool → Lissandra R Frozen Tomb)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lissandra's Ring of Frost. Untargetable for 2 s, long enough to use ahead of Ring of Frost. (Vladimir W Sanguine Pool → Lissandra W Ring of Frost)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Vladimir's Hemoplague.

#### 9. Morgana (net +0.24)

- **0.80** cc immunity: Black Shield makes Morgana immune to Lissandra's Frozen Tomb (knockdown, slow, stun). Immune for 5 s, long enough to use ahead of Frozen Tomb. (Morgana E Black Shield → Lissandra R Frozen Tomb)
- **0.49** cc immunity: Black Shield makes Morgana immune to Lissandra's Ring of Frost (root). Immune for 5 s, long enough to use ahead of Ring of Frost. (Morgana E Black Shield → Lissandra W Ring of Frost)
- **0.07** cc immunity: Black Shield makes Morgana immune to Lissandra's Ice Shard (slow). Immune for 5 s, long enough to use ahead of Ice Shard. (Morgana E Black Shield → Lissandra Q Ice Shard)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Morgana's Soul Shackles.

#### 10. Yuumi (net +0.20)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Lissandra's Frozen Tomb. Untargetable for ?; Frozen Tomb takes 0.38 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Lissandra R Frozen Tomb)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Lissandra's Ring of Frost. Untargetable for ?; Ring of Frost lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Lissandra W Ring of Frost)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Yuumi's Final Chapter.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.67 | 0.67 | 0.00 |  |
| 2 | Fiora | +0.51 | 1.11 | 0.60 |  |
| 3 | Master Yi | +0.46 | 1.16 | 0.70 |  |
| 4 | Udyr | +0.39 | 1.18 | 0.79 |  |
| 5 | Milio | +0.36 | 0.69 | 0.33 |  |
| 6 | Kayle | +0.35 | 0.55 | 0.20 |  |
| 7 | Olaf | +0.34 | 0.98 | 0.64 |  |
| 8 | Vladimir | +0.28 | 1.05 | 0.77 |  |
| 9 | Morgana | +0.24 | 1.07 | 0.83 |  |
| 10 | Yuumi | +0.20 | 1.01 | 0.81 |  |
| 11 | Samira | +0.16 | 0.62 | 0.46 | projectile block (Blade Whirl) |
| 12 | Xayah | +0.15 | 0.86 | 0.71 |  |
| 13 | Shaco | +0.13 | 0.90 | 0.77 |  |
| 14 | Gwen | +0.07 | 0.94 | 0.87 |  |
| 15 | Bard | +0.05 | 0.96 | 0.91 |  |
| 16 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 17 | Aurora | -0.01 | 0.81 | 0.82 |  |
| 18 | Kayn | -0.02 | 0.90 | 0.92 |  |
| 19 | Alistar | -0.08 | 0.79 | 0.87 |  |
| 20 | Mel | -0.13 | 0.59 | 0.72 | projectile block (Rebuttal) |
| 21 | Teemo | -0.13 | 0.29 | 0.42 |  |
| 22 | Yunara | -0.14 | 0.00 | 0.14 |  |
| 23 | Fizz | -0.16 | 1.01 | 1.17 |  |
| 24 | Gangplank | -0.22 | 0.87 | 1.09 |  |
| 25 | Singed | -0.24 | 0.63 | 0.87 |  |
| 26 | Zed | -0.25 | 0.80 | 1.05 |  |
| 27 | Braum | -0.26 | 0.85 | 1.11 | projectile block (Unbreakable) |
| 28 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 29 | Sion | -0.28 | 0.99 | 1.27 |  |
| 30 | Rengar | -0.28 | 0.91 | 1.19 |  |
| 31 | Kindred | -0.28 | 0.00 | 0.28 |  |
| 32 | Zilean | -0.31 | 0.00 | 0.31 |  |
| 33 | Kai'Sa | -0.32 | 0.00 | 0.32 |  |
| 34 | Rek'Sai | -0.33 | 0.97 | 1.30 |  |
| 35 | Maokai | -0.35 | 0.99 | 1.34 |  |
| 36 | Zoe | -0.35 | 0.00 | 0.35 |  |
| 37 | Soraka | -0.36 | 0.00 | 0.36 |  |
| 38 | Yasuo | -0.37 | 0.69 | 1.06 | projectile block (Wind Wall) |
| 39 | LeBlanc | -0.37 | 0.00 | 0.37 |  |
| 40 | Corki | -0.38 | 0.00 | 0.38 |  |
| 41 | Zaahen | -0.39 | 0.92 | 1.31 |  |
| 42 | Varus | -0.39 | 0.32 | 0.71 |  |
| 43 | Heimerdinger | -0.39 | 0.12 | 0.51 |  |
| 44 | Tryndamere | -0.39 | 0.00 | 0.39 |  |
| 45 | Kalista | -0.40 | 0.65 | 1.05 |  |
| 46 | Nidalee | -0.40 | 0.00 | 0.40 |  |
| 47 | Karma | -0.44 | 0.00 | 0.44 |  |
| 48 | Evelynn | -0.46 | 0.90 | 1.36 |  |
| 49 | Katarina | -0.46 | 0.32 | 0.78 |  |
| 50 | Warwick | -0.48 | 0.97 | 1.45 |  |
| 51 | Nocturne | -0.48 | 0.81 | 1.29 |  |
| 52 | Malzahar | -0.48 | 0.60 | 1.08 |  |
| 53 | Twisted Fate | -0.51 | 0.00 | 0.51 |  |
| 54 | Vayne | -0.52 | 0.00 | 0.52 |  |
| 55 | Kled | -0.53 | 0.78 | 1.31 |  |
| 56 | Elise | -0.53 | 0.00 | 0.53 |  |
| 57 | Jayce | -0.53 | 0.00 | 0.53 |  |
| 58 | Garen | -0.54 | 0.52 | 1.06 |  |
| 59 | Nasus | -0.56 | 0.22 | 0.78 |  |
| 60 | Lux | -0.56 | 0.00 | 0.56 |  |
| 61 | Jinx | -0.57 | 0.00 | 0.57 |  |
| 62 | Ryze | -0.57 | 0.00 | 0.57 |  |
| 63 | Camille | -0.58 | 0.86 | 1.44 |  |
| 64 | Quinn | -0.59 | 0.00 | 0.59 |  |
| 65 | Zeri | -0.59 | 0.00 | 0.59 |  |
| 66 | Ivern | -0.60 | 0.00 | 0.60 |  |
| 67 | Kha'Zix | -0.62 | 0.00 | 0.62 |  |
| 68 | Anivia | -0.63 | 0.00 | 0.63 |  |
| 69 | Dr. Mundo | -0.64 | 0.00 | 0.64 |  |
| 70 | Vex | -0.65 | 0.05 | 0.70 |  |
| 71 | Veigar | -0.65 | 0.00 | 0.65 |  |
| 72 | Ezreal | -0.66 | 0.00 | 0.66 |  |
| 73 | Akshan | -0.67 | 0.00 | 0.67 |  |
| 74 | Smolder | -0.67 | 0.00 | 0.67 |  |
| 75 | Aatrox | -0.68 | 0.00 | 0.68 |  |
| 76 | Ashe | -0.68 | 0.00 | 0.68 |  |
| 77 | Kennen | -0.68 | 0.00 | 0.68 |  |
| 78 | Sylas | -0.68 | 0.00 | 0.68 |  |
| 79 | Caitlyn | -0.71 | 0.09 | 0.80 |  |
| 80 | Shen | -0.72 | 0.22 | 0.94 |  |
| 81 | Gnar | -0.72 | 0.00 | 0.72 |  |
| 82 | Annie | -0.73 | 0.04 | 0.77 |  |
| 83 | Shyvana | -0.75 | 0.05 | 0.80 |  |
| 84 | Miss Fortune | -0.75 | 0.00 | 0.75 |  |
| 85 | Lulu | -0.76 | 0.21 | 0.97 |  |
| 86 | Tristana | -0.76 | 0.14 | 0.90 |  |
| 87 | Brand | -0.76 | 0.00 | 0.76 |  |
| 88 | Lucian | -0.76 | 0.00 | 0.76 |  |
| 89 | Draven | -0.77 | 0.00 | 0.77 |  |
| 90 | Ziggs | -0.77 | 0.00 | 0.77 |  |
| 91 | Bel'Veth | -0.78 | 0.00 | 0.78 |  |
| 92 | Swain | -0.78 | 0.00 | 0.78 |  |
| 93 | Syndra | -0.78 | 0.00 | 0.78 |  |
| 94 | Taric | -0.78 | 0.00 | 0.78 |  |
| 95 | Viktor | -0.78 | 0.00 | 0.78 |  |
| 96 | Kassadin | -0.79 | 0.00 | 0.79 |  |
| 97 | Vel'Koz | -0.79 | 0.00 | 0.79 |  |
| 98 | Karthus | -0.80 | 0.00 | 0.80 |  |
| 99 | Senna | -0.80 | 0.00 | 0.80 |  |
| 100 | Xerath | -0.80 | 0.00 | 0.80 |  |
| 101 | Jhin | -0.82 | 0.00 | 0.82 |  |
| 102 | Cassiopeia | -0.83 | 0.14 | 0.97 |  |
| 103 | Jax | -0.84 | 0.23 | 1.07 |  |
| 104 | Graves | -0.84 | 0.00 | 0.84 |  |
| 105 | Hwei | -0.84 | 0.00 | 0.84 |  |
| 106 | Pantheon | -0.86 | 0.52 | 1.38 |  |
| 107 | Talon | -0.87 | 0.00 | 0.87 |  |
| 108 | Yorick | -0.87 | 0.00 | 0.87 |  |
| 109 | Xin Zhao | -0.88 | 0.43 | 1.31 |  |
| 110 | Aphelios | -0.88 | 0.12 | 1.00 |  |
| 111 | Illaoi | -0.90 | 0.05 | 0.95 |  |
| 112 | Thresh | -0.90 | 0.00 | 0.90 |  |
| 113 | Orianna | -0.91 | 0.00 | 0.91 |  |
| 114 | Sona | -0.91 | 0.00 | 0.91 |  |
| 115 | Riven | -0.92 | 0.00 | 0.92 |  |
| 116 | Ahri | -0.96 | 0.00 | 0.96 |  |
| 117 | Irelia | -0.97 | 0.00 | 0.97 |  |
| 118 | Lee Sin | -0.97 | 0.00 | 0.97 |  |
| 119 | Neeko | -0.97 | 0.00 | 0.97 |  |
| 120 | Seraphine | -0.97 | 0.00 | 0.97 |  |
| 121 | Zyra | -0.97 | 0.00 | 0.97 |  |
| 122 | Renata Glasc | -0.98 | 0.00 | 0.98 |  |
| 123 | Renekton | -0.98 | 0.00 | 0.98 |  |
| 124 | Blitzcrank | -0.99 | 0.00 | 0.99 |  |
| 125 | Lillia | -0.99 | 0.00 | 0.99 |  |
| 126 | Rumble | -0.99 | 0.00 | 0.99 |  |
| 127 | Azir | -1.00 | 0.00 | 1.00 |  |
| 128 | Fiddlesticks | -1.00 | 0.00 | 1.00 |  |
| 129 | Nunu & Willump | -1.01 | 0.29 | 1.30 |  |
| 130 | Locke | -1.01 | 0.00 | 1.01 |  |
| 131 | Nami | -1.01 | 0.00 | 1.01 |  |
| 132 | Nilah | -1.03 | 0.20 | 1.23 |  |
| 133 | Mordekaiser | -1.07 | 0.05 | 1.12 |  |
| 134 | Aurelion Sol | -1.07 | 0.00 | 1.07 |  |
| 135 | Ekko | -1.11 | 0.00 | 1.11 |  |
| 136 | Janna | -1.11 | 0.00 | 1.11 |  |
| 137 | Urgot | -1.12 | 0.00 | 1.12 |  |
| 138 | Cho'Gath | -1.15 | 0.00 | 1.15 |  |
| 139 | Akali | -1.16 | 0.00 | 1.16 |  |
| 140 | Rammus | -1.17 | 0.22 | 1.39 |  |
| 141 | Diana | -1.17 | 0.00 | 1.17 |  |
| 142 | Malphite | -1.19 | 0.19 | 1.38 |  |
| 143 | Darius | -1.19 | 0.00 | 1.19 |  |
| 144 | Trundle | -1.20 | 0.00 | 1.20 |  |
| 145 | Skarner | -1.21 | 0.15 | 1.36 |  |
| 146 | Wukong | -1.21 | 0.00 | 1.21 |  |
| 147 | Ambessa | -1.22 | 0.00 | 1.22 |  |
| 148 | Rakan | -1.22 | 0.00 | 1.22 |  |
| 149 | Leona | -1.23 | 0.00 | 1.23 |  |
| 150 | Nautilus | -1.25 | 0.00 | 1.25 |  |
| 151 | Qiyana | -1.25 | 0.00 | 1.25 |  |
| 152 | Poppy | -1.28 | 0.00 | 1.28 |  |
| 153 | Jarvan IV | -1.29 | 0.05 | 1.34 |  |
| 154 | Gragas | -1.30 | 0.00 | 1.30 |  |
| 155 | Volibear | -1.31 | 0.05 | 1.36 |  |
| 156 | Tahm Kench | -1.31 | 0.00 | 1.31 |  |
| 157 | Yone | -1.32 | 0.05 | 1.37 |  |
| 158 | Hecarim | -1.33 | 0.05 | 1.38 |  |
| 159 | Amumu | -1.33 | 0.00 | 1.33 |  |
| 160 | Pyke | -1.33 | 0.00 | 1.33 |  |
| 161 | Viego | -1.35 | 0.05 | 1.40 |  |
| 162 | K'Sante | -1.36 | 0.10 | 1.46 |  |
| 163 | Naafiri | -1.37 | 0.00 | 1.37 |  |
| 164 | Rell | -1.37 | 0.00 | 1.37 |  |
| 165 | Taliyah | -1.37 | 0.00 | 1.37 |  |
| 166 | Zac | -1.37 | 0.00 | 1.37 |  |
| 167 | Sejuani | -1.38 | 0.00 | 1.38 |  |
| 168 | Sett | -1.39 | 0.05 | 1.44 |  |
| 169 | Briar | -1.40 | 0.00 | 1.40 |  |
| 170 | Vi | -1.42 | 0.05 | 1.47 |  |
| 171 | Ornn | -1.49 | 0.05 | 1.54 |  |
| 172 | Galio | -1.57 | 0.00 | 1.57 |  |
