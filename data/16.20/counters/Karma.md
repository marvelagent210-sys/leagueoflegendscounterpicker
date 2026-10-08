# Counters to Karma (patch 26.20)

Every champion ranked by what its kit does against Karma's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Karma's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Karma` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +0.88)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Karma's Renewal. Untargetable for ?, timed to Renewal. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Karma W Renewal)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Karma's Focused Resolve. Untargetable for ?; Focused Resolve takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Karma W Focused Resolve)
- Watch out: Karma's basic attacks reach 100 units farther than Yuumi's (525 vs 425 attack range).

### 2. Udyr (net +0.74)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Karma's Renewal (root). Immune for 1.5 s, long enough to use ahead of Renewal. (Udyr E Blazing Stampede → Karma W Renewal)
- **0.45** cc immunity: Blazing Stampede makes Udyr immune to Karma's Focused Resolve (root). Immune for 1.5 s, long enough to use ahead of Focused Resolve. (Udyr E Blazing Stampede → Karma W Focused Resolve)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Karma's Soulflare (slow). Immune for 1.5 s, long enough to use ahead of Soulflare. (Udyr E Blazing Stampede → Karma Q Soulflare)
- Watch out: Karma's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range).

### 3. Maokai (net +0.71)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Karma's Renewal. Untargetable for 1.4 s, timed to Renewal. (Maokai W Twisted Advance → Karma W Renewal)
- **0.45** untargetable: Twisted Advance makes Maokai untargetable, dodging Karma's Focused Resolve. Untargetable for 1.4 s; Focused Resolve takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Karma W Focused Resolve)
- Watch out: Karma's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

### 4. Elise (net +0.69)

- **0.51** untargetable: Rappel makes Elise untargetable, dodging Karma's Renewal. Untargetable for 0.6 s, timed to Renewal. (Elise E Rappel → Karma W Renewal)
- **0.36** untargetable: Rappel makes Elise untargetable, dodging Karma's Focused Resolve. Untargetable for 0.6 s; Focused Resolve takes 0.25 s to land, enough to react. (Elise E Rappel → Karma W Focused Resolve)

### 5. Fiora (net +0.68)

- **0.64** parry: Riposte parries Karma's Renewal and stuns back. Parry for 0.75 s, timed to Renewal. Negating Renewal's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Karma W Renewal)
- **0.48** parry: Riposte parries Karma's Focused Resolve and stuns back. Parry for 0.75 s; Focused Resolve takes 0.25 s to land, enough to react. Negating Focused Resolve's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Karma W Focused Resolve)
- **0.05** attack speed slow: Riposte cuts Karma's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Karma basic attacks)
- Watch out: Karma's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

### 6. Morgana (net +0.68)

- **0.54** cc immunity: Black Shield makes Morgana immune to Karma's Renewal (root). Immune for 5 s, long enough to use ahead of Renewal. (Morgana E Black Shield → Karma W Renewal)
- **0.38** cc immunity: Black Shield makes Morgana immune to Karma's Focused Resolve (root). Immune for 5 s, long enough to use ahead of Focused Resolve. (Morgana E Black Shield → Karma W Focused Resolve)
- **0.09** cc immunity: Black Shield makes Morgana immune to Karma's Soulflare (slow). Immune for 5 s, long enough to use ahead of Soulflare. (Morgana E Black Shield → Karma Q Soulflare)
- Watch out: Karma's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range).

### 7. Vladimir (net +0.65)

- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Karma's Renewal. Untargetable for 2 s, long enough to use ahead of Renewal. (Vladimir W Sanguine Pool → Karma W Renewal)
- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Karma's Focused Resolve. Untargetable for 2 s, long enough to use ahead of Focused Resolve. (Vladimir W Sanguine Pool → Karma W Focused Resolve)
- Watch out: Karma's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

### 8. Master Yi (net +0.59)

- **0.51** untargetable: Alpha Strike makes Master Yi untargetable, dodging Karma's Renewal. Untargetable for ?, timed to Renewal. (Master Yi Q Alpha Strike → Karma W Renewal)
- **0.36** untargetable: Alpha Strike makes Master Yi untargetable, dodging Karma's Focused Resolve. Untargetable for ?; Focused Resolve takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Karma W Focused Resolve)
- **0.05** cc immunity: Highlander makes Master Yi immune to Karma's Inner Flame slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Karma Q Inner Flame)
- Watch out: Karma's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range).

### 9. Malzahar (net +0.49)

- **0.35** cc immunity: Void Shift makes Malzahar immune to Karma's Renewal (root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Karma W Renewal)
- **0.23** cc immunity: Void Shift makes Malzahar immune to Karma's Focused Resolve (root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Karma W Focused Resolve)
- **0.06** cc immunity: Void Shift makes Malzahar immune to Karma's Inner Flame (slow). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Karma Q Inner Flame)

### 10. Braum (net +0.48)

- **0.45** projectile block: Unbreakable blocks Karma's Soulflare, a projectile. Unbreakable for 4 s, long enough to use ahead of Soulflare. (Braum E Unbreakable → Karma Q Soulflare)
- **0.35** projectile block: Unbreakable blocks Karma's Inner Flame, a projectile. Unbreakable for 4 s, long enough to use ahead of Inner Flame. (Braum E Unbreakable → Karma Q Inner Flame)
- **0.31** projectile block: Unbreakable blocks Karma's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Karma basic attacks)
- Watch out: Karma's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.88 | 0.93 | 0.05 |  |
| 2 | Udyr | +0.74 | 0.96 | 0.22 |  |
| 3 | Maokai | +0.71 | 0.93 | 0.22 |  |
| 4 | Elise | +0.69 | 0.69 | 0.00 |  |
| 5 | Fiora | +0.68 | 0.89 | 0.21 |  |
| 6 | Morgana | +0.68 | 0.76 | 0.08 |  |
| 7 | Vladimir | +0.65 | 0.73 | 0.08 |  |
| 8 | Master Yi | +0.59 | 0.78 | 0.19 |  |
| 9 | Malzahar | +0.49 | 0.49 | 0.00 |  |
| 10 | Braum | +0.48 | 0.70 | 0.22 | projectile block (Unbreakable) |
| 11 | Gwen | +0.48 | 0.69 | 0.21 |  |
| 12 | Samira | +0.47 | 0.47 | 0.00 |  |
| 13 | Bard | +0.44 | 0.44 | 0.00 |  |
| 14 | Lissandra | +0.44 | 0.44 | 0.00 |  |
| 15 | Mel | +0.44 | 0.44 | 0.00 |  |
| 16 | Xayah | +0.43 | 0.43 | 0.00 |  |
| 17 | Kayle | +0.41 | 0.41 | 0.00 |  |
| 18 | Yasuo | +0.40 | 0.53 | 0.13 |  |
| 19 | Milio | +0.40 | 0.40 | 0.00 |  |
| 20 | Kled | +0.36 | 0.44 | 0.08 |  |
| 21 | Kalista | +0.35 | 0.35 | 0.00 |  |
| 22 | Sivir | +0.35 | 0.35 | 0.00 |  |
| 23 | Ekko | +0.33 | 0.48 | 0.15 |  |
| 24 | Zaahen | +0.33 | 0.46 | 0.13 |  |
| 25 | Camille | +0.33 | 0.44 | 0.11 |  |
| 26 | Warwick | +0.32 | 0.47 | 0.15 |  |
| 27 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 28 | Kayn | +0.31 | 0.44 | 0.13 |  |
| 29 | Rek'Sai | +0.31 | 0.44 | 0.13 |  |
| 30 | Aurora | +0.28 | 0.43 | 0.15 |  |
| 31 | Zed | +0.28 | 0.43 | 0.15 |  |
| 32 | Varus | +0.28 | 0.28 | 0.00 |  |
| 33 | Nocturne | +0.22 | 0.44 | 0.22 |  |
| 34 | Pantheon | +0.22 | 0.35 | 0.13 |  |
| 35 | Caitlyn | +0.22 | 0.22 | 0.00 |  |
| 36 | Gangplank | +0.21 | 0.65 | 0.44 |  |
| 37 | Evelynn | +0.21 | 0.44 | 0.23 |  |
| 38 | Teemo | +0.21 | 0.29 | 0.08 |  |
| 39 | Kindred | +0.21 | 0.21 | 0.00 |  |
| 40 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 41 | Rengar | +0.19 | 0.77 | 0.58 |  |
| 42 | Alistar | +0.16 | 0.38 | 0.22 |  |
| 43 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 44 | Sion | +0.11 | 0.49 | 0.38 |  |
| 45 | Annie | +0.11 | 0.11 | 0.00 |  |
| 46 | Shaco | +0.09 | 0.44 | 0.35 |  |
| 47 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 48 | Aphelios | +0.08 | 0.08 | 0.00 |  |
| 49 | Heimerdinger | +0.08 | 0.08 | 0.00 |  |
| 50 | Shen | +0.07 | 0.22 | 0.15 |  |
| 51 | Katarina | +0.06 | 0.28 | 0.22 |  |
| 52 | Nilah | +0.04 | 0.20 | 0.16 |  |
| 53 | Xin Zhao | +0.03 | 0.22 | 0.19 |  |
| 54 | Olaf | +0.02 | 0.46 | 0.44 |  |
| 55 | Jax | +0.01 | 0.23 | 0.22 |  |
| 56 | Senna | +0.01 | 0.12 | 0.11 |  |
| 57 | Garen | 0.00 | 0.38 | 0.38 |  |
| 58 | Rammus | 0.00 | 0.22 | 0.22 |  |
| 59 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 60 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 61 | Azir | 0.00 | 0.00 | 0.00 |  |
| 62 | Brand | 0.00 | 0.00 | 0.00 |  |
| 63 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 64 | Corki | 0.00 | 0.00 | 0.00 |  |
| 65 | Draven | 0.00 | 0.00 | 0.00 |  |
| 66 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 67 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 68 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 69 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 70 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 71 | Janna | 0.00 | 0.00 | 0.00 |  |
| 72 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 73 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 74 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 75 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 76 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 77 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 78 | Lux | 0.00 | 0.00 | 0.00 |  |
| 79 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 80 | Nami | 0.00 | 0.00 | 0.00 |  |
| 81 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 82 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 83 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 84 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 85 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 86 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 87 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 88 | Sona | 0.00 | 0.00 | 0.00 |  |
| 89 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 90 | Swain | 0.00 | 0.00 | 0.00 |  |
| 91 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 92 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 93 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 94 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 95 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 96 | Vex | 0.00 | 0.00 | 0.00 |  |
| 97 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 98 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 99 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 100 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 101 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 102 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 103 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 104 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 105 | Singed | -0.02 | 0.42 | 0.44 |  |
| 106 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 107 | Graves | -0.04 | 0.00 | 0.04 |  |
| 108 | Malphite | -0.08 | 0.14 | 0.22 |  |
| 109 | Karthus | -0.08 | 0.00 | 0.08 |  |
| 110 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 111 | Rakan | -0.08 | 0.00 | 0.08 |  |
| 112 | Fizz | -0.10 | 0.00 | 0.10 |  |
| 113 | Jarvan IV | -0.10 | 0.00 | 0.10 |  |
| 114 | K'Sante | -0.10 | 0.00 | 0.10 |  |
| 115 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 116 | Urgot | -0.10 | 0.00 | 0.10 |  |
| 117 | Yone | -0.10 | 0.00 | 0.10 |  |
| 118 | Briar | -0.11 | 0.00 | 0.11 |  |
| 119 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 120 | Lillia | -0.11 | 0.00 | 0.11 |  |
| 121 | Naafiri | -0.11 | 0.00 | 0.11 |  |
| 122 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 123 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 124 | Hecarim | -0.13 | 0.00 | 0.13 |  |
| 125 | Ornn | -0.13 | 0.00 | 0.13 |  |
| 126 | Rell | -0.13 | 0.00 | 0.13 |  |
| 127 | Akshan | -0.14 | 0.00 | 0.14 |  |
| 128 | Bel'Veth | -0.14 | 0.00 | 0.14 |  |
| 129 | Galio | -0.14 | 0.00 | 0.14 |  |
| 130 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 131 | Volibear | -0.14 | 0.00 | 0.14 |  |
| 132 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 133 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 134 | Riven | -0.15 | 0.00 | 0.15 |  |
| 135 | Vi | -0.15 | 0.00 | 0.15 |  |
| 136 | Irelia | -0.18 | 0.00 | 0.18 |  |
| 137 | Aatrox | -0.19 | 0.00 | 0.19 |  |
| 138 | Nautilus | -0.19 | 0.00 | 0.19 |  |
| 139 | Tahm Kench | -0.19 | 0.00 | 0.19 |  |
| 140 | Tryndamere | -0.19 | 0.00 | 0.19 |  |
| 141 | Zac | -0.19 | 0.00 | 0.19 |  |
| 142 | Taric | -0.20 | 0.21 | 0.41 |  |
| 143 | Viego | -0.20 | 0.00 | 0.20 |  |
| 144 | Diana | -0.21 | 0.00 | 0.21 |  |
| 145 | Kassadin | -0.21 | 0.00 | 0.21 |  |
| 146 | Sejuani | -0.21 | 0.00 | 0.21 |  |
| 147 | Shyvana | -0.21 | 0.00 | 0.21 |  |
| 148 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 149 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 150 | Gragas | -0.22 | 0.00 | 0.22 |  |
| 151 | Illaoi | -0.22 | 0.00 | 0.22 |  |
| 152 | Leona | -0.22 | 0.00 | 0.22 |  |
| 153 | Locke | -0.22 | 0.00 | 0.22 |  |
| 154 | Poppy | -0.22 | 0.00 | 0.22 |  |
| 155 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 156 | Sett | -0.22 | 0.00 | 0.22 |  |
| 157 | Pyke | -0.25 | 0.00 | 0.25 |  |
| 158 | Akali | -0.26 | 0.00 | 0.26 |  |
| 159 | Nunu & Willump | -0.28 | 0.16 | 0.44 |  |
| 160 | Talon | -0.29 | 0.00 | 0.29 |  |
| 161 | Skarner | -0.32 | 0.09 | 0.41 |  |
| 162 | Qiyana | -0.32 | 0.00 | 0.32 |  |
| 163 | Mordekaiser | -0.33 | 0.05 | 0.38 |  |
| 164 | Wukong | -0.33 | 0.00 | 0.33 |  |
| 165 | Darius | -0.38 | 0.00 | 0.38 |  |
| 166 | Trundle | -0.38 | 0.00 | 0.38 |  |
| 167 | Yorick | -0.38 | 0.00 | 0.38 |  |
| 168 | Kha'Zix | -0.43 | 0.00 | 0.43 |  |
| 169 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 170 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 171 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 172 | Rumble | -0.44 | 0.00 | 0.44 |  |
