# Counters to LeBlanc (patch 26.21)

Every champion ranked by what its kit does against LeBlanc's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in LeBlanc's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Leblanc` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +0.63)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging LeBlanc's Ethereal Chains. Untargetable for ?; Ethereal Chains takes 0.79 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → LeBlanc E Ethereal Chains)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging LeBlanc's Sigil of Malice. Untargetable for ?; Sigil of Malice takes 0.6 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → LeBlanc Q Sigil of Malice)
- Watch out: LeBlanc's basic attacks reach 100 units farther than Yuumi's (525 vs 425 attack range).

### 2. Fizz (net +0.62)

- **0.45** untargetable: Playful makes Fizz untargetable, dodging LeBlanc's Ethereal Chains. Untargetable for 0.75 s; Ethereal Chains takes 0.79 s to land, enough to react. (Fizz E Playful → LeBlanc E Ethereal Chains)
- **0.38** untargetable: Playful makes Fizz untargetable, dodging LeBlanc's Sigil of Malice. Untargetable for 0.75 s; Sigil of Malice takes 0.6 s to land, enough to react. (Fizz E Playful → LeBlanc Q Sigil of Malice)
- **0.08** reveal: Chum the Waters reveals LeBlanc through Mirror Image's stealth. (Fizz R Chum the Waters → LeBlanc I Mirror Image)
- Watch out: LeBlanc's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

### 3. Hwei (net +0.55)

- **0.30** dash stop: Grim Visage's knockdown can stop LeBlanc's Distortion mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. The wiki marks this dash's knockdown interaction as special. (Hwei Q Grim Visage → LeBlanc W Distortion)
- **0.18** dash stop: Grim Visage's knockdown can stop LeBlanc's Mimic mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. The wiki marks this dash's knockdown interaction as special. (Hwei Q Grim Visage → LeBlanc R Mimic)
- **0.08** reveal: Gaze of the Abyss reveals LeBlanc through Mirror Image's stealth. (Hwei W Gaze of the Abyss → LeBlanc I Mirror Image)

### 4. Braum (net +0.50)

- **0.45** projectile block: Unbreakable blocks LeBlanc's Ethereal Chains, a projectile. Unbreakable for 4 s, long enough to use ahead of Ethereal Chains. (Braum E Unbreakable → LeBlanc E Ethereal Chains)
- **0.38** projectile block: Unbreakable blocks LeBlanc's Sigil of Malice, a projectile. Unbreakable for 4 s, long enough to use ahead of Sigil of Malice. (Braum E Unbreakable → LeBlanc Q Sigil of Malice)
- **0.31** projectile block: Unbreakable blocks LeBlanc's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → LeBlanc basic attacks)
- Watch out: LeBlanc's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### 5. Yasuo (net +0.50)

- **0.35** projectile block: Wind Wall blocks LeBlanc's Ethereal Chains, a projectile. Wind Wall for 4 s, long enough to use ahead of Ethereal Chains. (Yasuo W Wind Wall → LeBlanc E Ethereal Chains)
- **0.28** projectile block: Wind Wall blocks LeBlanc's Sigil of Malice, a projectile. Wind Wall for 4 s, long enough to use ahead of Sigil of Malice. (Yasuo W Wind Wall → LeBlanc Q Sigil of Malice)
- **0.24** projectile block: Wind Wall blocks LeBlanc's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → LeBlanc basic attacks)
- Watch out: LeBlanc's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

### 6. Samira (net +0.49)

- **0.32** projectile block: Blade Whirl blocks LeBlanc's Ethereal Chains, a projectile. Blade Whirl for 0.75 s; Ethereal Chains takes 0.79 s to land, enough to react. (Samira W Blade Whirl → LeBlanc E Ethereal Chains)
- **0.25** projectile block: Blade Whirl blocks LeBlanc's Sigil of Malice, a projectile. Blade Whirl for 0.75 s; Sigil of Malice takes 0.6 s to land, enough to react. (Samira W Blade Whirl → LeBlanc Q Sigil of Malice)
- **0.19** projectile block: Blade Whirl blocks LeBlanc's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → LeBlanc basic attacks)

### 7. Mel (net +0.45)

- **0.29** projectile block: Rebuttal blocks LeBlanc's Ethereal Chains, a projectile. Rebuttal for 0.75 s; Ethereal Chains takes 0.79 s to land, enough to react. (Mel W Rebuttal → LeBlanc E Ethereal Chains)
- **0.24** projectile block: Rebuttal blocks LeBlanc's Sigil of Malice, a projectile. Rebuttal for 0.75 s; Sigil of Malice takes 0.6 s to land, enough to react. (Mel W Rebuttal → LeBlanc Q Sigil of Malice)
- **0.18** projectile block: Rebuttal blocks LeBlanc's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → LeBlanc basic attacks)

### 8. Malzahar (net +0.44)

- **0.23** cc immunity: Void Shift makes Malzahar immune to LeBlanc's Ethereal Chains (root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → LeBlanc E Ethereal Chains)
- **0.14** dash stop: Nether Grasp's knockdown can stop LeBlanc's Distortion mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. The wiki marks this dash's knockdown interaction as special. (Malzahar R Nether Grasp → LeBlanc W Distortion)
- **0.10** dash stop: Nether Grasp's knockdown can stop LeBlanc's Mimic mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. The wiki marks this dash's knockdown interaction as special. (Malzahar R Nether Grasp → LeBlanc R Mimic)

### 9. Vladimir (net +0.43)

- **0.37** untargetable: Sanguine Pool makes Vladimir untargetable, dodging LeBlanc's Ethereal Chains. Untargetable for 2 s, long enough to use ahead of Ethereal Chains. (Vladimir W Sanguine Pool → LeBlanc E Ethereal Chains)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging LeBlanc's Sigil of Malice. Untargetable for 2 s, long enough to use ahead of Sigil of Malice. (Vladimir W Sanguine Pool → LeBlanc Q Sigil of Malice)
- Watch out: LeBlanc's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

### 10. Fiora (net +0.41)

- **0.47** parry: Riposte parries LeBlanc's Ethereal Chains and stuns back. Parry for 0.75 s; Ethereal Chains takes 0.79 s to land, enough to react. Negating Ethereal Chains's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → LeBlanc E Ethereal Chains)
- **0.28** parry: Riposte parries LeBlanc's Sigil of Malice. Parry for 0.75 s; Sigil of Malice takes 0.6 s to land, enough to react. (Fiora W Riposte → LeBlanc Q Sigil of Malice)
- **0.05** attack speed slow: Riposte cuts LeBlanc's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → LeBlanc basic attacks)
- Watch out: LeBlanc's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.63 | 0.68 | 0.05 |  |
| 2 | Fizz | +0.62 | 0.72 | 0.10 |  |
| 3 | Hwei | +0.55 | 0.55 | 0.00 |  |
| 4 | Braum | +0.50 | 0.72 | 0.22 | projectile block (Unbreakable) |
| 5 | Yasuo | +0.50 | 0.63 | 0.13 |  |
| 6 | Samira | +0.49 | 0.49 | 0.00 |  |
| 7 | Mel | +0.45 | 0.45 | 0.00 |  |
| 8 | Malzahar | +0.44 | 0.44 | 0.00 |  |
| 9 | Vladimir | +0.43 | 0.51 | 0.08 |  |
| 10 | Fiora | +0.41 | 0.62 | 0.21 |  |
| 11 | Maokai | +0.40 | 0.62 | 0.22 |  |
| 12 | Vex | +0.40 | 0.40 | 0.00 |  |
| 13 | Jinx | +0.39 | 0.39 | 0.00 |  |
| 14 | Morgana | +0.37 | 0.45 | 0.08 |  |
| 15 | Lissandra | +0.37 | 0.37 | 0.00 |  |
| 16 | Ahri | +0.36 | 0.36 | 0.00 |  |
| 17 | Sivir | +0.36 | 0.36 | 0.00 |  |
| 18 | Kayle | +0.35 | 0.35 | 0.00 |  |
| 19 | Viktor | +0.35 | 0.35 | 0.00 |  |
| 20 | Veigar | +0.34 | 0.34 | 0.00 |  |
| 21 | Kled | +0.33 | 0.41 | 0.08 |  |
| 22 | Bard | +0.32 | 0.32 | 0.00 |  |
| 23 | Xayah | +0.31 | 0.31 | 0.00 |  |
| 24 | Master Yi | +0.30 | 0.49 | 0.19 |  |
| 25 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 26 | Lulu | +0.29 | 0.29 | 0.00 |  |
| 27 | Gwen | +0.28 | 0.49 | 0.21 |  |
| 28 | Caitlyn | +0.27 | 0.27 | 0.00 |  |
| 29 | Udyr | +0.23 | 0.45 | 0.22 |  |
| 30 | Pantheon | +0.23 | 0.36 | 0.13 |  |
| 31 | Zac | +0.22 | 0.41 | 0.19 |  |
| 32 | Milio | +0.22 | 0.22 | 0.00 |  |
| 33 | Nocturne | +0.21 | 0.43 | 0.22 |  |
| 34 | Poppy | +0.21 | 0.43 | 0.22 |  |
| 35 | Kayn | +0.21 | 0.34 | 0.13 |  |
| 36 | Rek'Sai | +0.21 | 0.34 | 0.13 |  |
| 37 | Teemo | +0.21 | 0.29 | 0.08 |  |
| 38 | Camille | +0.20 | 0.31 | 0.11 |  |
| 39 | Warwick | +0.18 | 0.33 | 0.15 |  |
| 40 | Aurora | +0.16 | 0.31 | 0.15 |  |
| 41 | Zed | +0.16 | 0.31 | 0.15 |  |
| 42 | Fiddlesticks | +0.16 | 0.16 | 0.00 |  |
| 43 | Kalista | +0.16 | 0.16 | 0.00 |  |
| 44 | Karma | +0.16 | 0.16 | 0.00 |  |
| 45 | Tristana | +0.16 | 0.16 | 0.00 |  |
| 46 | Evelynn | +0.09 | 0.32 | 0.23 |  |
| 47 | Zaahen | +0.09 | 0.22 | 0.13 |  |
| 48 | Yone | +0.09 | 0.19 | 0.10 |  |
| 49 | Elise | +0.08 | 0.08 | 0.00 |  |
| 50 | Nidalee | +0.08 | 0.08 | 0.00 |  |
| 51 | Renata Glasc | +0.08 | 0.08 | 0.00 |  |
| 52 | Twisted Fate | +0.08 | 0.08 | 0.00 |  |
| 53 | Zyra | +0.08 | 0.08 | 0.00 |  |
| 54 | Shen | +0.07 | 0.22 | 0.15 |  |
| 55 | Ashe | +0.07 | 0.07 | 0.00 |  |
| 56 | Xin Zhao | +0.06 | 0.25 | 0.19 |  |
| 57 | Thresh | +0.05 | 0.08 | 0.03 |  |
| 58 | Annie | +0.05 | 0.05 | 0.00 |  |
| 59 | Nilah | +0.04 | 0.20 | 0.16 |  |
| 60 | Anivia | +0.04 | 0.04 | 0.00 |  |
| 61 | Jax | +0.01 | 0.23 | 0.22 |  |
| 62 | Lee Sin | +0.01 | 0.16 | 0.15 |  |
| 63 | Rammus | 0.00 | 0.22 | 0.22 |  |
| 64 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 65 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 66 | Azir | 0.00 | 0.00 | 0.00 |  |
| 67 | Brand | 0.00 | 0.00 | 0.00 |  |
| 68 | Corki | 0.00 | 0.00 | 0.00 |  |
| 69 | Draven | 0.00 | 0.00 | 0.00 |  |
| 70 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 71 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 72 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 73 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 74 | Janna | 0.00 | 0.00 | 0.00 |  |
| 75 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 76 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 77 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 78 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 79 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 80 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 81 | Lux | 0.00 | 0.00 | 0.00 |  |
| 82 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 83 | Nami | 0.00 | 0.00 | 0.00 |  |
| 84 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 85 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 86 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 87 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 88 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 89 | Sona | 0.00 | 0.00 | 0.00 |  |
| 90 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 91 | Swain | 0.00 | 0.00 | 0.00 |  |
| 92 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 93 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 94 | Varus | 0.00 | 0.00 | 0.00 |  |
| 95 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 96 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 97 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 98 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 99 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 100 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 101 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 102 | Sylas | -0.02 | 0.08 | 0.10 |  |
| 103 | Urgot | -0.02 | 0.08 | 0.10 |  |
| 104 | Shaco | -0.03 | 0.32 | 0.35 |  |
| 105 | Amumu | -0.03 | 0.19 | 0.22 |  |
| 106 | Briar | -0.03 | 0.08 | 0.11 |  |
| 107 | Kai'Sa | -0.03 | 0.08 | 0.11 |  |
| 108 | Naafiri | -0.03 | 0.08 | 0.11 |  |
| 109 | Graves | -0.04 | 0.00 | 0.04 |  |
| 110 | Alistar | -0.05 | 0.17 | 0.22 |  |
| 111 | Senna | -0.05 | 0.06 | 0.11 |  |
| 112 | Rengar | -0.06 | 0.52 | 0.58 |  |
| 113 | Akshan | -0.06 | 0.08 | 0.14 |  |
| 114 | Ambessa | -0.07 | 0.08 | 0.15 |  |
| 115 | Vi | -0.07 | 0.08 | 0.15 |  |
| 116 | Malphite | -0.08 | 0.14 | 0.22 |  |
| 117 | Karthus | -0.08 | 0.00 | 0.08 |  |
| 118 | Rakan | -0.08 | 0.00 | 0.08 |  |
| 119 | Jarvan IV | -0.10 | 0.00 | 0.10 |  |
| 120 | K'Sante | -0.10 | 0.00 | 0.10 |  |
| 121 | Aatrox | -0.11 | 0.08 | 0.19 |  |
| 122 | Lillia | -0.11 | 0.00 | 0.11 |  |
| 123 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 124 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 125 | Gangplank | -0.13 | 0.31 | 0.44 |  |
| 126 | Hecarim | -0.13 | 0.00 | 0.13 |  |
| 127 | Ornn | -0.13 | 0.00 | 0.13 |  |
| 128 | Rell | -0.13 | 0.00 | 0.13 |  |
| 129 | Singed | -0.14 | 0.30 | 0.44 |  |
| 130 | Illaoi | -0.14 | 0.08 | 0.22 |  |
| 131 | Sett | -0.14 | 0.08 | 0.22 |  |
| 132 | Bel'Veth | -0.14 | 0.00 | 0.14 |  |
| 133 | Galio | -0.14 | 0.00 | 0.14 |  |
| 134 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 135 | Volibear | -0.14 | 0.00 | 0.14 |  |
| 136 | Sion | -0.15 | 0.23 | 0.38 |  |
| 137 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 138 | Riven | -0.15 | 0.00 | 0.15 |  |
| 139 | Garen | -0.18 | 0.20 | 0.38 |  |
| 140 | Akali | -0.18 | 0.08 | 0.26 |  |
| 141 | Irelia | -0.18 | 0.00 | 0.18 |  |
| 142 | Nautilus | -0.19 | 0.00 | 0.19 |  |
| 143 | Tahm Kench | -0.19 | 0.00 | 0.19 |  |
| 144 | Tryndamere | -0.19 | 0.00 | 0.19 |  |
| 145 | Viego | -0.20 | 0.00 | 0.20 |  |
| 146 | Diana | -0.21 | 0.00 | 0.21 |  |
| 147 | Kassadin | -0.21 | 0.00 | 0.21 |  |
| 148 | Sejuani | -0.21 | 0.00 | 0.21 |  |
| 149 | Shyvana | -0.21 | 0.00 | 0.21 |  |
| 150 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 151 | Olaf | -0.22 | 0.22 | 0.44 |  |
| 152 | Gragas | -0.22 | 0.00 | 0.22 |  |
| 153 | Katarina | -0.22 | 0.00 | 0.22 |  |
| 154 | Leona | -0.22 | 0.00 | 0.22 |  |
| 155 | Locke | -0.22 | 0.00 | 0.22 |  |
| 156 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 157 | Skarner | -0.25 | 0.16 | 0.41 |  |
| 158 | Pyke | -0.25 | 0.00 | 0.25 |  |
| 159 | Mordekaiser | -0.27 | 0.11 | 0.38 |  |
| 160 | Talon | -0.29 | 0.00 | 0.29 |  |
| 161 | Qiyana | -0.32 | 0.00 | 0.32 |  |
| 162 | Wukong | -0.33 | 0.00 | 0.33 |  |
| 163 | Darius | -0.38 | 0.00 | 0.38 |  |
| 164 | Trundle | -0.38 | 0.00 | 0.38 |  |
| 165 | Yorick | -0.38 | 0.00 | 0.38 |  |
| 166 | Taric | -0.41 | 0.00 | 0.41 |  |
| 167 | Kha'Zix | -0.43 | 0.00 | 0.43 |  |
| 168 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 169 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 170 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 171 | Nunu & Willump | -0.44 | 0.00 | 0.44 |  |
| 172 | Rumble | -0.44 | 0.00 | 0.44 |  |
