# Counters to Varus (patch 26.20)

Every champion ranked by what its kit does against Varus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Varus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Varus` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yasuo (net +1.04)

- **0.80** projectile block: Wind Wall blocks Varus's Chain of Corruption, a projectile. Wind Wall for 4 s, long enough to use ahead of Chain of Corruption. (Yasuo W Wind Wall → Varus R Chain of Corruption)
- **0.37** projectile block: Wind Wall blocks Varus's Piercing Arrow, a projectile. Wind Wall for 4 s, long enough to use ahead of Piercing Arrow. (Yasuo W Wind Wall → Varus Q Piercing Arrow)
- **0.34** projectile block: Wind Wall blocks Varus's Hail of Arrows, a projectile. Wind Wall for 4 s, long enough to use ahead of Hail of Arrows. (Yasuo W Wind Wall → Varus E Hail of Arrows)
- Watch out: Varus's basic attacks reach 400 units farther than Yasuo's (575 vs 175 attack range).

### 2. Mel (net +1.03)

- **0.80** projectile block: Rebuttal blocks Varus's Chain of Corruption, a projectile. Rebuttal for 0.75 s; Chain of Corruption takes 1.16 s to land, enough to react. (Mel W Rebuttal → Varus R Chain of Corruption)
- **0.30** projectile block: Rebuttal blocks Varus's Piercing Arrow, a projectile. Rebuttal for 0.75 s; Piercing Arrow takes 0.47 s to land, enough to react. (Mel W Rebuttal → Varus Q Piercing Arrow)
- **0.22** projectile block: Rebuttal blocks Varus's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Varus basic attacks)

### 3. Braum (net +1.02)

- **0.80** projectile block: Unbreakable blocks Varus's Chain of Corruption, a projectile. Unbreakable for 4 s, long enough to use ahead of Chain of Corruption. (Braum E Unbreakable → Varus R Chain of Corruption)
- **0.45** projectile block: Unbreakable blocks Varus's Hail of Arrows, a projectile. Unbreakable for 4 s, long enough to use ahead of Hail of Arrows. (Braum E Unbreakable → Varus E Hail of Arrows)
- **0.45** projectile block: Unbreakable blocks Varus's Piercing Arrow, a projectile. Unbreakable for 4 s, long enough to use ahead of Piercing Arrow. (Braum E Unbreakable → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 450 units farther than Braum's (575 vs 125 attack range).

### 4. Samira (net +0.63)

- **0.80** projectile block: Blade Whirl blocks Varus's Chain of Corruption, a projectile. Blade Whirl for 0.75 s; Chain of Corruption takes 1.16 s to land, enough to react. (Samira W Blade Whirl → Varus R Chain of Corruption)
- **0.33** projectile block: Blade Whirl blocks Varus's Piercing Arrow, a projectile. Blade Whirl for 0.75 s; Piercing Arrow takes 0.47 s to land, enough to react. (Samira W Blade Whirl → Varus Q Piercing Arrow)
- **0.22** projectile block: Blade Whirl blocks Varus's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Varus basic attacks)
- Watch out: Hail of Arrows's Grievous Wounds cuts Samira's healing from Flair by 40%.

### 5. Xayah (net +0.61)

- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Varus's Chain of Corruption. Untargetable for 1.5 s, long enough to use ahead of Chain of Corruption. (Xayah R Featherstorm → Varus R Chain of Corruption)

### 6. Shaco (net +0.60)

- **0.68** untargetable: Hallucinate makes Shaco untargetable, dodging Varus's Chain of Corruption. Untargetable for 0.5 s; Chain of Corruption takes 1.16 s to land, enough to react. (Shaco R Hallucinate → Varus R Chain of Corruption)
- **0.10** interrupt: Jack in the Box's fear interrupts Varus's Piercing Arrow (charge-up). Jack in the Box must land during the charge-up. Varus can release Piercing Arrow early instead of charging it fully. (Shaco W Jack in the Box → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 450 units farther than Shaco's (575 vs 125 attack range).

### 7. Elise (net +0.59)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Varus's Chain of Corruption. Untargetable for 0.6 s; Chain of Corruption takes 1.16 s to land, enough to react. (Elise E Rappel → Varus R Chain of Corruption)
- **0.11** interrupt: Cocoon's stun interrupts Varus's Piercing Arrow (charge-up). Cocoon must land during the charge-up. Varus can release Piercing Arrow early instead of charging it fully. (Elise E Cocoon → Varus Q Piercing Arrow)
- Watch out: Hail of Arrows's Grievous Wounds cuts Elise's healing from Spider Form / Human Form by 40%.

### 8. Morgana (net +0.56)

- **0.80** cc immunity: Black Shield makes Morgana immune to Varus's Chain of Corruption (root). Immune for 5 s, long enough to use ahead of Chain of Corruption. (Morgana E Black Shield → Varus R Chain of Corruption)
- **0.09** cc immunity: Black Shield makes Morgana immune to Varus's Hail of Arrows (slow). Immune for 5 s, long enough to use ahead of Hail of Arrows. (Morgana E Black Shield → Varus E Hail of Arrows)
- Watch out: Varus's basic attacks reach 125 units farther than Morgana's (575 vs 450 attack range).

### 9. Maokai (net +0.52)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Varus's Chain of Corruption. Untargetable for 1.4 s; Chain of Corruption takes 1.16 s to land, enough to react. (Maokai W Twisted Advance → Varus R Chain of Corruption)
- **0.11** interrupt: Bramble Smash's airborne interrupts Varus's Piercing Arrow (charge-up). Bramble Smash must land during the charge-up. Varus can release Piercing Arrow early instead of charging it fully. (Maokai Q Bramble Smash → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 450 units farther than Maokai's (575 vs 125 attack range).

### 10. Nocturne (net +0.52)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Varus's Chain of Corruption. Spell shield for 1.5 s, long enough to use ahead of Chain of Corruption. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Varus R Chain of Corruption)
- **0.11** interrupt: Unspeakable Horror's fear interrupts Varus's Piercing Arrow (charge-up). Unspeakable Horror must land during the charge-up. Varus can release Piercing Arrow early instead of charging it fully. (Nocturne E Unspeakable Horror → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 450 units farther than Nocturne's (575 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yasuo | +1.04 | 1.22 | 0.18 | projectile block (Wind Wall) |
| 2 | Mel | +1.03 | 1.03 | 0.00 | projectile block (Rebuttal) |
| 3 | Braum | +1.02 | 1.29 | 0.27 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Samira | +0.63 | 1.04 | 0.41 | projectile block (Blade Whirl) |
| 5 | Xayah | +0.61 | 0.61 | 0.00 |  |
| 6 | Shaco | +0.60 | 0.78 | 0.18 |  |
| 7 | Elise | +0.59 | 0.91 | 0.32 |  |
| 8 | Morgana | +0.56 | 0.85 | 0.29 |  |
| 9 | Maokai | +0.52 | 0.91 | 0.39 |  |
| 10 | Nocturne | +0.52 | 0.91 | 0.39 |  |
| 11 | Sivir | +0.52 | 0.80 | 0.28 |  |
| 12 | Shen | +0.52 | 0.70 | 0.18 | attack block (Spirit's Refuge) |
| 13 | Evelynn | +0.49 | 0.79 | 0.30 |  |
| 14 | Rek'Sai | +0.49 | 0.79 | 0.30 |  |
| 15 | Aurora | +0.49 | 0.61 | 0.12 |  |
| 16 | Kalista | +0.49 | 0.49 | 0.00 |  |
| 17 | Bard | +0.48 | 0.71 | 0.23 |  |
| 18 | Kled | +0.48 | 0.71 | 0.23 |  |
| 19 | Camille | +0.44 | 0.75 | 0.31 |  |
| 20 | Milio | +0.44 | 0.66 | 0.22 |  |
| 21 | Malzahar | +0.44 | 0.54 | 0.10 |  |
| 22 | Udyr | +0.43 | 0.88 | 0.45 |  |
| 23 | Zed | +0.43 | 0.61 | 0.18 |  |
| 24 | Master Yi | +0.42 | 0.87 | 0.45 |  |
| 25 | Gwen | +0.41 | 0.80 | 0.39 |  |
| 26 | Lissandra | +0.39 | 0.71 | 0.32 |  |
| 27 | Fiora | +0.38 | 0.93 | 0.55 |  |
| 28 | Yuumi | +0.36 | 0.80 | 0.44 |  |
| 29 | Jax | +0.35 | 0.62 | 0.27 | attack dodge (Counter Strike) |
| 30 | Kayle | +0.34 | 0.34 | 0.00 |  |
| 31 | Lulu | +0.31 | 0.31 | 0.00 |  |
| 32 | Sion | +0.29 | 0.94 | 0.65 |  |
| 33 | Vladimir | +0.27 | 0.80 | 0.53 |  |
| 34 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 35 | Ekko | +0.26 | 0.80 | 0.54 |  |
| 36 | Teemo | +0.25 | 0.35 | 0.10 |  |
| 37 | Alistar | +0.24 | 0.67 | 0.43 |  |
| 38 | Pantheon | +0.22 | 0.40 | 0.18 |  |
| 39 | Heimerdinger | +0.16 | 0.16 | 0.00 |  |
| 40 | Gangplank | +0.15 | 0.68 | 0.53 |  |
| 41 | Caitlyn | +0.14 | 0.14 | 0.00 |  |
| 42 | Zaahen | +0.13 | 0.81 | 0.68 |  |
| 43 | Kayn | +0.13 | 0.79 | 0.66 |  |
| 44 | Rammus | +0.11 | 0.38 | 0.27 |  |
| 45 | Anivia | +0.11 | 0.11 | 0.00 |  |
| 46 | Annie | +0.11 | 0.11 | 0.00 |  |
| 47 | Brand | +0.11 | 0.11 | 0.00 |  |
| 48 | Corki | +0.11 | 0.11 | 0.00 |  |
| 49 | Draven | +0.11 | 0.11 | 0.00 |  |
| 50 | Hwei | +0.11 | 0.11 | 0.00 |  |
| 51 | Kennen | +0.11 | 0.11 | 0.00 |  |
| 52 | Quinn | +0.11 | 0.11 | 0.00 |  |
| 53 | Twisted Fate | +0.11 | 0.11 | 0.00 |  |
| 54 | Vayne | +0.11 | 0.11 | 0.00 |  |
| 55 | Vel'Koz | +0.11 | 0.11 | 0.00 |  |
| 56 | Xerath | +0.11 | 0.11 | 0.00 |  |
| 57 | Ziggs | +0.11 | 0.11 | 0.00 |  |
| 58 | Renata Glasc | +0.10 | 0.10 | 0.00 |  |
| 59 | Syndra | +0.10 | 0.10 | 0.00 |  |
| 60 | Taliyah | +0.10 | 0.10 | 0.00 |  |
| 61 | Veigar | +0.10 | 0.10 | 0.00 |  |
| 62 | Vex | +0.10 | 0.10 | 0.00 |  |
| 63 | Zoe | +0.10 | 0.10 | 0.00 |  |
| 64 | Gnar | +0.07 | 0.07 | 0.00 |  |
| 65 | Warwick | +0.06 | 0.86 | 0.80 |  |
| 66 | Jayce | +0.06 | 0.11 | 0.05 |  |
| 67 | Orianna | +0.06 | 0.06 | 0.00 |  |
| 68 | Viktor | +0.06 | 0.06 | 0.00 |  |
| 69 | Thresh | +0.05 | 0.11 | 0.06 |  |
| 70 | Aurelion Sol | +0.05 | 0.05 | 0.00 |  |
| 71 | Azir | +0.05 | 0.05 | 0.00 |  |
| 72 | Neeko | +0.05 | 0.05 | 0.00 |  |
| 73 | Zyra | +0.05 | 0.05 | 0.00 |  |
| 74 | Olaf | 0.00 | 0.71 | 0.71 |  |
| 75 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 76 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 77 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 78 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 79 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 80 | Lux | 0.00 | 0.00 | 0.00 |  |
| 81 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 82 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 83 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 84 | Ahri | -0.01 | 0.11 | 0.12 |  |
| 85 | Rengar | -0.02 | 0.69 | 0.71 |  |
| 86 | K'Sante | -0.02 | 0.11 | 0.13 |  |
| 87 | Yone | -0.02 | 0.11 | 0.13 |  |
| 88 | Malphite | -0.04 | 0.23 | 0.27 |  |
| 89 | Nilah | -0.05 | 0.64 | 0.69 | attack dodge (Jubilant Veil) |
| 90 | Urgot | -0.05 | 0.10 | 0.15 |  |
| 91 | Galio | -0.07 | 0.11 | 0.18 |  |
| 92 | Nami | -0.07 | 0.11 | 0.18 |  |
| 93 | Ornn | -0.07 | 0.11 | 0.18 |  |
| 94 | Rell | -0.07 | 0.11 | 0.18 |  |
| 95 | Seraphine | -0.07 | 0.11 | 0.18 |  |
| 96 | Vi | -0.07 | 0.11 | 0.18 |  |
| 97 | Fizz | -0.07 | 0.06 | 0.13 |  |
| 98 | Ivern | -0.07 | 0.00 | 0.07 |  |
| 99 | Kindred | -0.08 | 0.28 | 0.36 |  |
| 100 | Jarvan IV | -0.08 | 0.05 | 0.13 |  |
| 101 | Xin Zhao | -0.10 | 0.41 | 0.51 |  |
| 102 | Kog'Maw | -0.10 | 0.00 | 0.10 |  |
| 103 | Fiddlesticks | -0.11 | 0.11 | 0.22 |  |
| 104 | Zilean | -0.11 | 0.11 | 0.22 |  |
| 105 | Ashe | -0.12 | 0.06 | 0.18 |  |
| 106 | Qiyana | -0.13 | 0.05 | 0.18 |  |
| 107 | Sona | -0.13 | 0.05 | 0.18 |  |
| 108 | Amumu | -0.16 | 0.11 | 0.27 |  |
| 109 | Kassadin | -0.16 | 0.11 | 0.27 |  |
| 110 | Leona | -0.16 | 0.11 | 0.27 |  |
| 111 | Sejuani | -0.16 | 0.11 | 0.27 |  |
| 112 | Cassiopeia | -0.16 | 0.06 | 0.22 |  |
| 113 | Swain | -0.17 | 0.11 | 0.28 |  |
| 114 | Karthus | -0.17 | 0.00 | 0.17 |  |
| 115 | Lucian | -0.17 | 0.00 | 0.17 |  |
| 116 | Akali | -0.18 | 0.00 | 0.18 |  |
| 117 | Nidalee | -0.18 | 0.00 | 0.18 |  |
| 118 | Yunara | -0.18 | 0.00 | 0.18 |  |
| 119 | Pyke | -0.19 | 0.11 | 0.30 |  |
| 120 | Riven | -0.19 | 0.11 | 0.30 |  |
| 121 | Graves | -0.19 | 0.00 | 0.19 |  |
| 122 | Diana | -0.21 | 0.06 | 0.27 |  |
| 123 | Nautilus | -0.21 | 0.06 | 0.27 |  |
| 124 | Janna | -0.22 | 0.10 | 0.32 |  |
| 125 | Poppy | -0.22 | 0.05 | 0.27 |  |
| 126 | Lillia | -0.24 | 0.05 | 0.29 |  |
| 127 | Senna | -0.24 | 0.00 | 0.24 |  |
| 128 | Zeri | -0.24 | 0.00 | 0.24 |  |
| 129 | Wukong | -0.25 | 0.05 | 0.30 |  |
| 130 | Rakan | -0.25 | 0.05 | 0.30 |  |
| 131 | Garen | -0.27 | 0.38 | 0.65 |  |
| 132 | Katarina | -0.27 | 0.00 | 0.27 |  |
| 133 | Gragas | -0.28 | 0.11 | 0.39 |  |
| 134 | Sett | -0.28 | 0.11 | 0.39 |  |
| 135 | Zac | -0.28 | 0.11 | 0.39 |  |
| 136 | Karma | -0.28 | 0.00 | 0.28 |  |
| 137 | Soraka | -0.29 | 0.10 | 0.39 |  |
| 138 | Lee Sin | -0.30 | 0.06 | 0.36 |  |
| 139 | Hecarim | -0.31 | 0.05 | 0.36 |  |
| 140 | Taric | -0.32 | 0.39 | 0.71 |  |
| 141 | Aphelios | -0.33 | 0.05 | 0.38 |  |
| 142 | Smolder | -0.33 | 0.00 | 0.33 |  |
| 143 | Renekton | -0.34 | 0.11 | 0.45 |  |
| 144 | Shyvana | -0.34 | 0.11 | 0.45 |  |
| 145 | Sylas | -0.34 | 0.11 | 0.45 |  |
| 146 | Nasus | -0.38 | 0.27 | 0.65 |  |
| 147 | Illaoi | -0.39 | 0.00 | 0.39 |  |
| 148 | Akshan | -0.40 | 0.00 | 0.40 |  |
| 149 | Blitzcrank | -0.42 | 0.11 | 0.53 |  |
| 150 | Singed | -0.42 | 0.11 | 0.53 |  |
| 151 | Skarner | -0.42 | 0.11 | 0.53 |  |
| 152 | Viego | -0.44 | 0.06 | 0.50 |  |
| 153 | Kha'Zix | -0.45 | 0.00 | 0.45 |  |
| 154 | Locke | -0.45 | 0.00 | 0.45 |  |
| 155 | Tryndamere | -0.45 | 0.00 | 0.45 |  |
| 156 | Irelia | -0.46 | 0.11 | 0.57 |  |
| 157 | Talon | -0.50 | 0.00 | 0.50 |  |
| 158 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 159 | Cho'Gath | -0.54 | 0.11 | 0.65 |  |
| 160 | Naafiri | -0.54 | 0.00 | 0.54 |  |
| 161 | Nunu & Willump | -0.55 | 0.16 | 0.71 |  |
| 162 | Tahm Kench | -0.55 | 0.11 | 0.66 |  |
| 163 | Volibear | -0.56 | 0.11 | 0.67 |  |
| 164 | Darius | -0.61 | 0.10 | 0.71 |  |
| 165 | Aatrox | -0.62 | 0.11 | 0.73 |  |
| 166 | Briar | -0.62 | 0.06 | 0.68 |  |
| 167 | Yorick | -0.64 | 0.11 | 0.75 |  |
| 168 | Ambessa | -0.66 | 0.05 | 0.71 |  |
| 169 | Mordekaiser | -0.67 | 0.17 | 0.84 |  |
| 170 | Bel'Veth | -0.70 | 0.11 | 0.81 |  |
| 171 | Trundle | -0.77 | 0.10 | 0.87 |  |
| 172 | Dr. Mundo | -0.87 | 0.00 | 0.87 |  |
