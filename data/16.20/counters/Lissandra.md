# Counters to Lissandra (patch 26.20)

Every champion ranked by what its kit does against Lissandra's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lissandra's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lissandra` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.67)

- **0.47** spell shield: Spell Shield's spell shield blocks Lissandra's Ring of Frost. Spell shield for 1.5 s, long enough to use ahead of Ring of Frost. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Lissandra W Ring of Frost)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Lissandra's Frozen Tomb. Spell shield for 1.5 s, long enough to use ahead of Frozen Tomb. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the single-targeted portion and the radiating ice damage, but will not stop it from spreading. (Sivir E Spell Shield → Lissandra R Frozen Tomb)

### 2. Fiora (net +0.57)

- **0.90** parry: Riposte parries Lissandra's Frozen Tomb and stuns back. Parry for 0.75 s; Frozen Tomb takes 0.38 s to land, enough to react. Negating Frozen Tomb's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Lissandra R Frozen Tomb)
- **0.39** parry: Riposte parries Lissandra's Ring of Frost and stuns back. Parry for 0.75 s; Ring of Frost lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Ring of Frost's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Lissandra W Ring of Frost)
- **0.05** attack speed slow: Riposte cuts Lissandra's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Lissandra basic attacks)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Fiora's Riposte.

### 3. Kayle (net +0.55)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Lissandra's Frozen Tomb (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Frozen Tomb. (Kayle R Divine Judgment → Lissandra R Frozen Tomb)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Lissandra's Ring of Frost (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Ring of Frost. (Kayle R Divine Judgment → Lissandra W Ring of Frost)
- **0.07** range: Kayle's basic attacks reach 75 units farther than Lissandra's (625 vs 550 attack range). Lissandra closes the gap with Glacial Path. (Kayle basic attacks → Lissandra basic attacks)

### 4. Master Yi (net +0.46)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Lissandra's Frozen Tomb. Untargetable for ?; Frozen Tomb takes 0.38 s to land, enough to react. (Master Yi Q Alpha Strike → Lissandra R Frozen Tomb)
- **0.28** untargetable: Alpha Strike makes Master Yi untargetable, dodging Lissandra's Ring of Frost. Untargetable for ?; Ring of Frost lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Lissandra W Ring of Frost)
- **0.15** cleanse: Highlander cleanses Lissandra's Frozen Tomb (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove knockdown, stun. (Master Yi R Highlander → Lissandra R Frozen Tomb)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Master Yi's Alpha Strike.

### 5. Elise (net +0.41)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Lissandra's Frozen Tomb. Untargetable for 0.6 s; Frozen Tomb takes 0.38 s to land, enough to react. (Elise E Rappel → Lissandra R Frozen Tomb)
- **0.28** untargetable: Rappel makes Elise untargetable, dodging Lissandra's Ring of Frost. Untargetable for 0.6 s; Ring of Frost lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Lissandra W Ring of Frost)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Elise's Cocoon.

### 6. Udyr (net +0.39)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Lissandra's Frozen Tomb (knockdown, slow, stun). Immune for 1.5 s, long enough to use ahead of Frozen Tomb. (Udyr E Blazing Stampede → Lissandra R Frozen Tomb)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Lissandra's Ring of Frost (root). Immune for 1.5 s, long enough to use ahead of Ring of Frost. (Udyr E Blazing Stampede → Lissandra W Ring of Frost)
- **0.10** cc immunity: Blazing Stampede makes Udyr immune to Lissandra's Ice Shard (slow). Immune for 1.5 s, long enough to use ahead of Ice Shard. (Udyr E Blazing Stampede → Lissandra Q Ice Shard)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Udyr's Blazing Stampede.

### 7. Milio (net +0.36)

- **0.49** cleanse: Breath of Life cleanses Lissandra's Frozen Tomb (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Milio R Breath of Life → Lissandra R Frozen Tomb)
- **0.24** cleanse: Breath of Life cleanses Lissandra's Ring of Frost (root) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Lissandra W Ring of Frost)
- **0.22** tenacity: Breath of Life's 65% tenacity shortens Lissandra's Frozen Tomb (slow, stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Lissandra R Frozen Tomb)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Milio's Ultra Mega Fire Kick.

### 8. Olaf (net +0.34)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Lissandra's Frozen Tomb (knockdown, slow, stun). Immune for 3 s, long enough to use ahead of Frozen Tomb. (Olaf R Ragnarok → Lissandra R Frozen Tomb)
- **0.32** cc immunity: Ragnarok makes Olaf immune to Lissandra's Ring of Frost (root). Immune for 3 s, long enough to use ahead of Ring of Frost. (Olaf R Ragnarok → Lissandra W Ring of Frost)
- **0.06** cc immunity: Ragnarok makes Olaf immune to Lissandra's Ice Shard (slow). Immune for 3 s, long enough to use ahead of Ice Shard. (Olaf R Ragnarok → Lissandra Q Ice Shard)
- Watch out: Lissandra's basic attacks reach 425 units farther than Olaf's (550 vs 125 attack range).

### 9. Vladimir (net +0.28)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lissandra's Frozen Tomb. Untargetable for 2 s, long enough to use ahead of Frozen Tomb. (Vladimir W Sanguine Pool → Lissandra R Frozen Tomb)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Lissandra's Ring of Frost. Untargetable for 2 s, long enough to use ahead of Ring of Frost. (Vladimir W Sanguine Pool → Lissandra W Ring of Frost)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Vladimir's Hemoplague.

### 10. Shaco (net +0.28)

- **0.80** untargetable: Hallucinate makes Shaco untargetable, dodging Lissandra's Frozen Tomb. Untargetable for 0.5 s; Frozen Tomb takes 0.38 s to land, enough to react. (Shaco R Hallucinate → Lissandra R Frozen Tomb)
- **0.19** untargetable: Hallucinate makes Shaco untargetable, dodging Lissandra's Ring of Frost. Untargetable for 0.5 s; Ring of Frost lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Shaco R Hallucinate → Lissandra W Ring of Frost)
- Watch out: Frozen Tomb makes Lissandra untargetable, dodging Shaco's Jack in the Box.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.67 | 0.67 | 0.00 |  |
| 2 | Fiora | +0.57 | 1.11 | 0.54 |  |
| 3 | Kayle | +0.55 | 0.55 | 0.00 |  |
| 4 | Master Yi | +0.46 | 1.16 | 0.70 |  |
| 5 | Elise | +0.41 | 0.94 | 0.53 |  |
| 6 | Udyr | +0.39 | 1.18 | 0.79 |  |
| 7 | Milio | +0.36 | 0.69 | 0.33 |  |
| 8 | Olaf | +0.34 | 0.98 | 0.64 |  |
| 9 | Vladimir | +0.28 | 1.05 | 0.77 |  |
| 10 | Shaco | +0.28 | 0.90 | 0.62 |  |
| 11 | Morgana | +0.24 | 1.07 | 0.83 |  |
| 12 | Yuumi | +0.20 | 1.01 | 0.81 |  |
| 13 | Samira | +0.16 | 0.62 | 0.46 | projectile block (Blade Whirl) |
| 14 | Xayah | +0.15 | 0.86 | 0.71 |  |
| 15 | Kindred | +0.09 | 0.37 | 0.28 |  |
| 16 | Gwen | +0.07 | 0.94 | 0.87 |  |
| 17 | Bard | +0.02 | 0.96 | 0.94 |  |
| 18 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 19 | Aurora | -0.01 | 0.81 | 0.82 |  |
| 20 | Alistar | -0.08 | 0.79 | 0.87 |  |
| 21 | Ekko | -0.10 | 0.91 | 1.01 |  |
| 22 | Mel | -0.13 | 0.59 | 0.72 | projectile block (Rebuttal) |
| 23 | Teemo | -0.13 | 0.29 | 0.42 |  |
| 24 | Yunara | -0.14 | 0.00 | 0.14 |  |
| 25 | Gangplank | -0.22 | 0.87 | 1.09 |  |
| 26 | Singed | -0.24 | 0.63 | 0.87 |  |
| 27 | Zed | -0.25 | 0.80 | 1.05 |  |
| 28 | Braum | -0.26 | 0.85 | 1.11 | projectile block (Unbreakable) |
| 29 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 30 | Sion | -0.28 | 0.99 | 1.27 |  |
| 31 | Rengar | -0.28 | 0.91 | 1.19 |  |
| 32 | Rek'Sai | -0.31 | 0.97 | 1.28 |  |
| 33 | Kai'Sa | -0.32 | 0.00 | 0.32 |  |
| 34 | Nidalee | -0.34 | 0.00 | 0.34 |  |
| 35 | Maokai | -0.35 | 0.99 | 1.34 |  |
| 36 | Zoe | -0.35 | 0.00 | 0.35 |  |
| 37 | Soraka | -0.36 | 0.00 | 0.36 |  |
| 38 | Yasuo | -0.37 | 0.69 | 1.06 | projectile block (Wind Wall) |
| 39 | LeBlanc | -0.37 | 0.00 | 0.37 |  |
| 40 | Taric | -0.38 | 0.40 | 0.78 |  |
| 41 | Zaahen | -0.39 | 0.92 | 1.31 |  |
| 42 | Varus | -0.39 | 0.32 | 0.71 |  |
| 43 | Heimerdinger | -0.39 | 0.12 | 0.51 |  |
| 44 | Tryndamere | -0.39 | 0.00 | 0.39 |  |
| 45 | Warwick | -0.40 | 0.97 | 1.37 |  |
| 46 | Kalista | -0.40 | 0.65 | 1.05 |  |
| 47 | Vayne | -0.42 | 0.00 | 0.42 |  |
| 48 | Nasus | -0.44 | 0.22 | 0.66 |  |
| 49 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 50 | Karma | -0.44 | 0.00 | 0.44 |  |
| 51 | Zilean | -0.44 | 0.00 | 0.44 |  |
| 52 | Evelynn | -0.46 | 0.90 | 1.36 |  |
| 53 | Katarina | -0.46 | 0.32 | 0.78 |  |
| 54 | Kayn | -0.47 | 0.90 | 1.37 |  |
| 55 | Corki | -0.47 | 0.05 | 0.52 |  |
| 56 | Nocturne | -0.48 | 0.81 | 1.29 |  |
| 57 | Malzahar | -0.48 | 0.60 | 1.08 |  |
| 58 | Jayce | -0.50 | 0.00 | 0.50 |  |
| 59 | Twisted Fate | -0.51 | 0.00 | 0.51 |  |
| 60 | Kled | -0.53 | 0.78 | 1.31 |  |
| 61 | Ezreal | -0.55 | 0.00 | 0.55 |  |
| 62 | Lux | -0.56 | 0.00 | 0.56 |  |
| 63 | Jinx | -0.57 | 0.00 | 0.57 |  |
| 64 | Ryze | -0.57 | 0.00 | 0.57 |  |
| 65 | Camille | -0.58 | 0.86 | 1.44 |  |
| 66 | Garen | -0.58 | 0.52 | 1.10 |  |
| 67 | Quinn | -0.59 | 0.00 | 0.59 |  |
| 68 | Zeri | -0.59 | 0.00 | 0.59 |  |
| 69 | Ivern | -0.60 | 0.00 | 0.60 |  |
| 70 | Kha'Zix | -0.62 | 0.00 | 0.62 |  |
| 71 | Anivia | -0.63 | 0.00 | 0.63 |  |
| 72 | Shyvana | -0.65 | 0.05 | 0.70 |  |
| 73 | Vex | -0.65 | 0.05 | 0.70 |  |
| 74 | Veigar | -0.65 | 0.00 | 0.65 |  |
| 75 | Akshan | -0.67 | 0.00 | 0.67 |  |
| 76 | Smolder | -0.67 | 0.00 | 0.67 |  |
| 77 | Aatrox | -0.68 | 0.00 | 0.68 |  |
| 78 | Ashe | -0.68 | 0.00 | 0.68 |  |
| 79 | Kennen | -0.68 | 0.00 | 0.68 |  |
| 80 | Shen | -0.69 | 0.22 | 0.91 |  |
| 81 | Caitlyn | -0.71 | 0.09 | 0.80 |  |
| 82 | Draven | -0.72 | 0.00 | 0.72 |  |
| 83 | Gnar | -0.72 | 0.00 | 0.72 |  |
| 84 | Illaoi | -0.73 | 0.05 | 0.78 |  |
| 85 | Annie | -0.73 | 0.04 | 0.77 |  |
| 86 | Kassadin | -0.74 | 0.00 | 0.74 |  |
| 87 | Miss Fortune | -0.75 | 0.00 | 0.75 |  |
| 88 | Yorick | -0.75 | 0.00 | 0.75 |  |
| 89 | Pantheon | -0.76 | 0.52 | 1.28 |  |
| 90 | Lulu | -0.76 | 0.21 | 0.97 |  |
| 91 | Brand | -0.76 | 0.00 | 0.76 |  |
| 92 | Lucian | -0.76 | 0.00 | 0.76 |  |
| 93 | Ziggs | -0.77 | 0.00 | 0.77 |  |
| 94 | Bel'Veth | -0.78 | 0.00 | 0.78 |  |
| 95 | Swain | -0.78 | 0.00 | 0.78 |  |
| 96 | Syndra | -0.78 | 0.00 | 0.78 |  |
| 97 | Viktor | -0.78 | 0.00 | 0.78 |  |
| 98 | Vel'Koz | -0.79 | 0.00 | 0.79 |  |
| 99 | Karthus | -0.80 | 0.00 | 0.80 |  |
| 100 | Senna | -0.80 | 0.00 | 0.80 |  |
| 101 | Sona | -0.80 | 0.00 | 0.80 |  |
| 102 | Xerath | -0.80 | 0.00 | 0.80 |  |
| 103 | Tristana | -0.81 | 0.14 | 0.95 |  |
| 104 | Hwei | -0.82 | 0.00 | 0.82 |  |
| 105 | Jhin | -0.82 | 0.00 | 0.82 |  |
| 106 | Jax | -0.83 | 0.23 | 1.06 |  |
| 107 | Cassiopeia | -0.83 | 0.14 | 0.97 |  |
| 108 | Graves | -0.84 | 0.00 | 0.84 |  |
| 109 | Aphelios | -0.85 | 0.12 | 0.97 |  |
| 110 | Sylas | -0.86 | 0.00 | 0.86 |  |
| 111 | Locke | -0.87 | 0.00 | 0.87 |  |
| 112 | Talon | -0.87 | 0.00 | 0.87 |  |
| 113 | Xin Zhao | -0.88 | 0.43 | 1.31 |  |
| 114 | Thresh | -0.90 | 0.00 | 0.90 |  |
| 115 | Orianna | -0.91 | 0.00 | 0.91 |  |
| 116 | Riven | -0.92 | 0.00 | 0.92 |  |
| 117 | Ahri | -0.96 | 0.00 | 0.96 |  |
| 118 | Lee Sin | -0.97 | 0.00 | 0.97 |  |
| 119 | Neeko | -0.97 | 0.00 | 0.97 |  |
| 120 | Seraphine | -0.97 | 0.00 | 0.97 |  |
| 121 | Zyra | -0.97 | 0.00 | 0.97 |  |
| 122 | Renata Glasc | -0.98 | 0.00 | 0.98 |  |
| 123 | Renekton | -0.98 | 0.00 | 0.98 |  |
| 124 | Lillia | -0.99 | 0.00 | 0.99 |  |
| 125 | Rumble | -0.99 | 0.00 | 0.99 |  |
| 126 | Azir | -1.00 | 0.00 | 1.00 |  |
| 127 | Fiddlesticks | -1.00 | 0.00 | 1.00 |  |
| 128 | Nunu & Willump | -1.01 | 0.29 | 1.30 |  |
| 129 | Nami | -1.01 | 0.00 | 1.01 |  |
| 130 | Irelia | -1.02 | 0.00 | 1.02 |  |
| 131 | Nilah | -1.03 | 0.20 | 1.23 |  |
| 132 | Blitzcrank | -1.03 | 0.00 | 1.03 |  |
| 133 | Mordekaiser | -1.07 | 0.05 | 1.12 |  |
| 134 | Aurelion Sol | -1.07 | 0.00 | 1.07 |  |
| 135 | Janna | -1.11 | 0.00 | 1.11 |  |
| 136 | Cho'Gath | -1.12 | 0.00 | 1.12 |  |
| 137 | Urgot | -1.12 | 0.00 | 1.12 |  |
| 138 | Malphite | -1.14 | 0.19 | 1.33 |  |
| 139 | Hecarim | -1.14 | 0.05 | 1.19 |  |
| 140 | Darius | -1.14 | 0.00 | 1.14 |  |
| 141 | Trundle | -1.14 | 0.00 | 1.14 |  |
| 142 | Fizz | -1.15 | 0.00 | 1.15 |  |
| 143 | Akali | -1.16 | 0.00 | 1.16 |  |
| 144 | Rammus | -1.17 | 0.22 | 1.39 |  |
| 145 | Wukong | -1.19 | 0.00 | 1.19 |  |
| 146 | Skarner | -1.21 | 0.15 | 1.36 |  |
| 147 | Ambessa | -1.22 | 0.00 | 1.22 |  |
| 148 | Rakan | -1.22 | 0.00 | 1.22 |  |
| 149 | Leona | -1.23 | 0.00 | 1.23 |  |
| 150 | Nautilus | -1.25 | 0.00 | 1.25 |  |
| 151 | Qiyana | -1.25 | 0.00 | 1.25 |  |
| 152 | Diana | -1.27 | 0.00 | 1.27 |  |
| 153 | Gragas | -1.28 | 0.00 | 1.28 |  |
| 154 | Poppy | -1.28 | 0.00 | 1.28 |  |
| 155 | Jarvan IV | -1.29 | 0.05 | 1.34 |  |
| 156 | Volibear | -1.31 | 0.05 | 1.36 |  |
| 157 | Tahm Kench | -1.31 | 0.00 | 1.31 |  |
| 158 | Yone | -1.32 | 0.05 | 1.37 |  |
| 159 | Amumu | -1.33 | 0.00 | 1.33 |  |
| 160 | Pyke | -1.33 | 0.00 | 1.33 |  |
| 161 | Sett | -1.34 | 0.05 | 1.39 |  |
| 162 | Viego | -1.35 | 0.05 | 1.40 |  |
| 163 | K'Sante | -1.36 | 0.10 | 1.46 |  |
| 164 | Naafiri | -1.37 | 0.00 | 1.37 |  |
| 165 | Rell | -1.37 | 0.00 | 1.37 |  |
| 166 | Taliyah | -1.37 | 0.00 | 1.37 |  |
| 167 | Zac | -1.37 | 0.00 | 1.37 |  |
| 168 | Sejuani | -1.38 | 0.00 | 1.38 |  |
| 169 | Briar | -1.39 | 0.00 | 1.39 |  |
| 170 | Vi | -1.41 | 0.05 | 1.46 |  |
| 171 | Galio | -1.48 | 0.00 | 1.48 |  |
| 172 | Ornn | -1.49 | 0.05 | 1.54 |  |
