# Counters to Kai'Sa (patch 26.20)

Every champion ranked by what its kit does against Kai'Sa's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kai'Sa's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kaisa` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yasuo (net +0.57)

- **0.41** projectile block: Wind Wall blocks Kai'Sa's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Kai'Sa basic attacks)
- **0.40** projectile block: Wind Wall blocks Kai'Sa's Void Seeker, a projectile. Wind Wall for 4 s, long enough to use ahead of Void Seeker. (Yasuo W Wind Wall → Kai'Sa W Void Seeker)
- **0.28** projectile block: Wind Wall blocks Kai'Sa's Icathian Rain, a projectile. Wind Wall for 4 s, long enough to use ahead of Icathian Rain. (Yasuo W Wind Wall → Kai'Sa Q Icathian Rain)
- Watch out: Kai'Sa's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

### 2. Samira (net +0.55)

- **0.35** projectile block: Blade Whirl blocks Kai'Sa's Void Seeker, a projectile. Blade Whirl for 0.75 s; Void Seeker takes 2.11 s to land, enough to react. (Samira W Blade Whirl → Kai'Sa W Void Seeker)
- **0.32** projectile block: Blade Whirl blocks Kai'Sa's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kai'Sa basic attacks)
- **0.15** projectile block: Blade Whirl blocks Kai'Sa's Icathian Rain, a projectile. Blade Whirl for 0.75 s; Icathian Rain lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Kai'Sa Q Icathian Rain)

### 3. Mel (net +0.53)

- **0.33** projectile block: Rebuttal blocks Kai'Sa's Void Seeker, a projectile. Rebuttal for 0.75 s; Void Seeker takes 2.11 s to land, enough to react. (Mel W Rebuttal → Kai'Sa W Void Seeker)
- **0.32** projectile block: Rebuttal blocks Kai'Sa's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Kai'Sa basic attacks)
- **0.15** projectile block: Rebuttal blocks Kai'Sa's Icathian Rain, a projectile. Rebuttal for 0.75 s; Icathian Rain lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Mel W Rebuttal → Kai'Sa Q Icathian Rain)

### 4. Braum (net +0.48)

- **0.54** projectile block: Unbreakable blocks Kai'Sa's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kai'Sa basic attacks)
- **0.45** projectile block: Unbreakable blocks Kai'Sa's Void Seeker, a projectile. Unbreakable for 4 s, long enough to use ahead of Void Seeker. (Braum E Unbreakable → Kai'Sa W Void Seeker)
- **0.38** projectile block: Unbreakable blocks Kai'Sa's Icathian Rain, a projectile. Unbreakable for 4 s, long enough to use ahead of Icathian Rain. (Braum E Unbreakable → Kai'Sa Q Icathian Rain)
- Watch out: Kai'Sa's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### 5. Lulu (net +0.47)

- **0.36** disarm: Whimsy disarms Kai'Sa for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kai'Sa basic attacks)
- **0.11** reveal: Help, Pix! reveals Kai'Sa through Supercharge's stealth. (Lulu E Help, Pix! → Kai'Sa E Supercharge)

### 6. Hwei (net +0.46)

- **0.35** dash stop: Grim Visage's knockdown can stop Kai'Sa's Killer Instinct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Kai'Sa R Killer Instinct)
- **0.11** reveal: Spiraling Despair reveals Kai'Sa through Supercharge's stealth. (Hwei R Spiraling Despair → Kai'Sa E Supercharge)

### 7. Vex (net +0.46)

- **0.35** dash stop: Doom 'n Gloom's knockdown can stop Kai'Sa's Killer Instinct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Vex I Doom 'n Gloom → Kai'Sa R Killer Instinct)
- **0.11** reveal: Shadow Surge reveals Kai'Sa through Supercharge's stealth. (Vex R Shadow Surge → Kai'Sa E Supercharge)

### 8. Teemo (net +0.42)

- **0.50** blind: Blinding Dart's blind makes Kai'Sa's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kai'Sa basic attacks)
- Watch out: Void Seeker reveals Teemo through Guerrilla Warfare's stealth.

### 9. Malzahar (net +0.38)

- **0.32** dash stop: Nether Grasp's knockdown can stop Kai'Sa's Killer Instinct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Kai'Sa R Killer Instinct)
- **0.11** reveal: Nether Grasp reveals Kai'Sa through Supercharge's stealth. (Malzahar R Nether Grasp → Kai'Sa E Supercharge)

### 10. Ahri (net +0.35)

- **0.35** dash stop: Charm's knockdown can stop Kai'Sa's Killer Instinct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Ahri E Charm → Kai'Sa R Killer Instinct)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yasuo | +0.57 | 0.79 | 0.22 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 2 | Samira | +0.55 | 0.55 | 0.00 |  |
| 3 | Mel | +0.53 | 0.53 | 0.00 |  |
| 4 | Braum | +0.48 | 0.86 | 0.38 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Lulu | +0.47 | 0.47 | 0.00 |  |
| 6 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 7 | Vex | +0.46 | 0.46 | 0.00 |  |
| 8 | Teemo | +0.42 | 0.50 | 0.08 | blind (Blinding Dart) |
| 9 | Malzahar | +0.38 | 0.38 | 0.00 |  |
| 10 | Ahri | +0.35 | 0.35 | 0.00 |  |
| 11 | Jinx | +0.35 | 0.35 | 0.00 |  |
| 12 | Veigar | +0.35 | 0.35 | 0.00 |  |
| 13 | Viktor | +0.35 | 0.35 | 0.00 |  |
| 14 | Cassiopeia | +0.33 | 0.33 | 0.00 |  |
| 15 | Lissandra | +0.32 | 0.32 | 0.00 |  |
| 16 | Caitlyn | +0.22 | 0.22 | 0.00 |  |
| 17 | Tristana | +0.16 | 0.16 | 0.00 |  |
| 18 | Warwick | +0.15 | 0.41 | 0.26 |  |
| 19 | Yone | +0.15 | 0.32 | 0.17 |  |
| 20 | Shen | +0.13 | 0.39 | 0.26 |  |
| 21 | Elise | +0.11 | 0.11 | 0.00 |  |
| 22 | Fiddlesticks | +0.11 | 0.11 | 0.00 |  |
| 23 | Karma | +0.11 | 0.11 | 0.00 |  |
| 24 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 25 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 26 | Twisted Fate | +0.11 | 0.11 | 0.00 |  |
| 27 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 28 | Kayle | +0.09 | 0.09 | 0.00 |  |
| 29 | Zac | +0.07 | 0.41 | 0.34 |  |
| 30 | Ashe | +0.07 | 0.07 | 0.00 |  |
| 31 | Poppy | +0.06 | 0.44 | 0.38 |  |
| 32 | Nilah | +0.06 | 0.35 | 0.29 |  |
| 33 | Thresh | +0.06 | 0.11 | 0.05 |  |
| 34 | Annie | +0.05 | 0.05 | 0.00 |  |
| 35 | Anivia | +0.04 | 0.04 | 0.00 |  |
| 36 | Jax | +0.03 | 0.41 | 0.38 | attack dodge (Counter Strike) |
| 37 | LeBlanc | +0.03 | 0.11 | 0.08 |  |
| 38 | Rammus | 0.00 | 0.38 | 0.38 |  |
| 39 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 40 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 41 | Azir | 0.00 | 0.00 | 0.00 |  |
| 42 | Bard | 0.00 | 0.00 | 0.00 |  |
| 43 | Brand | 0.00 | 0.00 | 0.00 |  |
| 44 | Corki | 0.00 | 0.00 | 0.00 |  |
| 45 | Draven | 0.00 | 0.00 | 0.00 |  |
| 46 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 47 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 48 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 49 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 50 | Janna | 0.00 | 0.00 | 0.00 |  |
| 51 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 52 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 53 | Kalista | 0.00 | 0.00 | 0.00 |  |
| 54 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 55 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 56 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 57 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 58 | Lux | 0.00 | 0.00 | 0.00 |  |
| 59 | Milio | 0.00 | 0.00 | 0.00 |  |
| 60 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 61 | Nami | 0.00 | 0.00 | 0.00 |  |
| 62 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 63 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 64 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 65 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 66 | Sivir | 0.00 | 0.00 | 0.00 |  |
| 67 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 68 | Sona | 0.00 | 0.00 | 0.00 |  |
| 69 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 70 | Swain | 0.00 | 0.00 | 0.00 |  |
| 71 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 72 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 73 | Varus | 0.00 | 0.00 | 0.00 |  |
| 74 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 75 | Xayah | 0.00 | 0.00 | 0.00 |  |
| 76 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 77 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 78 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 79 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 80 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 81 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 82 | Kled | -0.02 | 0.11 | 0.13 |  |
| 83 | Akshan | -0.03 | 0.11 | 0.14 |  |
| 84 | Morgana | -0.03 | 0.11 | 0.14 |  |
| 85 | Senna | -0.05 | 0.06 | 0.11 |  |
| 86 | Fizz | -0.06 | 0.11 | 0.17 |  |
| 87 | Sylas | -0.06 | 0.11 | 0.17 |  |
| 88 | Urgot | -0.06 | 0.11 | 0.17 |  |
| 89 | Graves | -0.06 | 0.00 | 0.06 |  |
| 90 | Briar | -0.08 | 0.11 | 0.19 |  |
| 91 | Naafiri | -0.08 | 0.11 | 0.19 |  |
| 92 | Amumu | -0.09 | 0.29 | 0.38 |  |
| 93 | Yuumi | -0.10 | 0.00 | 0.10 |  |
| 94 | Kayn | -0.11 | 0.11 | 0.22 |  |
| 95 | Rek'Sai | -0.11 | 0.11 | 0.22 |  |
| 96 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 97 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 98 | Malphite | -0.13 | 0.25 | 0.38 |  |
| 99 | Karthus | -0.14 | 0.00 | 0.14 |  |
| 100 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 101 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 102 | Vladimir | -0.14 | 0.00 | 0.14 |  |
| 103 | Ambessa | -0.15 | 0.11 | 0.26 |  |
| 104 | Lee Sin | -0.15 | 0.11 | 0.26 |  |
| 105 | Vi | -0.15 | 0.11 | 0.26 |  |
| 106 | Aurora | -0.15 | 0.00 | 0.15 |  |
| 107 | Jarvan IV | -0.17 | 0.00 | 0.17 |  |
| 108 | K'Sante | -0.18 | 0.00 | 0.18 |  |
| 109 | Camille | -0.19 | 0.00 | 0.19 |  |
| 110 | Lillia | -0.19 | 0.00 | 0.19 |  |
| 111 | Hecarim | -0.22 | 0.00 | 0.22 |  |
| 112 | Ornn | -0.22 | 0.00 | 0.22 |  |
| 113 | Pantheon | -0.22 | 0.00 | 0.22 |  |
| 114 | Rell | -0.22 | 0.00 | 0.22 |  |
| 115 | Zaahen | -0.22 | 0.00 | 0.22 |  |
| 116 | Aatrox | -0.23 | 0.11 | 0.34 |  |
| 117 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 118 | Galio | -0.24 | 0.00 | 0.24 |  |
| 119 | Volibear | -0.24 | 0.00 | 0.24 |  |
| 120 | Akali | -0.26 | 0.11 | 0.37 |  |
| 121 | Ekko | -0.26 | 0.00 | 0.26 |  |
| 122 | Riven | -0.26 | 0.00 | 0.26 |  |
| 123 | Zed | -0.26 | 0.00 | 0.26 |  |
| 124 | Illaoi | -0.27 | 0.11 | 0.38 |  |
| 125 | Sett | -0.27 | 0.11 | 0.38 |  |
| 126 | Fiora | -0.27 | 0.09 | 0.36 |  |
| 127 | Viego | -0.27 | 0.00 | 0.27 |  |
| 128 | Irelia | -0.31 | 0.00 | 0.31 |  |
| 129 | Evelynn | -0.34 | 0.00 | 0.34 |  |
| 130 | Master Yi | -0.34 | 0.00 | 0.34 |  |
| 131 | Nautilus | -0.34 | 0.00 | 0.34 |  |
| 132 | Tahm Kench | -0.34 | 0.00 | 0.34 |  |
| 133 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 134 | Xin Zhao | -0.34 | 0.00 | 0.34 |  |
| 135 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 136 | Diana | -0.36 | 0.00 | 0.36 |  |
| 137 | Gwen | -0.36 | 0.00 | 0.36 |  |
| 138 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 139 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 140 | Shyvana | -0.36 | 0.00 | 0.36 |  |
| 141 | Nasus | -0.38 | 0.39 | 0.77 |  |
| 142 | Alistar | -0.38 | 0.00 | 0.38 |  |
| 143 | Gragas | -0.38 | 0.00 | 0.38 |  |
| 144 | Katarina | -0.38 | 0.00 | 0.38 |  |
| 145 | Leona | -0.38 | 0.00 | 0.38 |  |
| 146 | Locke | -0.38 | 0.00 | 0.38 |  |
| 147 | Maokai | -0.38 | 0.00 | 0.38 |  |
| 148 | Nocturne | -0.38 | 0.00 | 0.38 |  |
| 149 | Renekton | -0.38 | 0.00 | 0.38 |  |
| 150 | Udyr | -0.38 | 0.00 | 0.38 |  |
| 151 | Talon | -0.40 | 0.00 | 0.40 |  |
| 152 | Wukong | -0.42 | 0.00 | 0.42 |  |
| 153 | Qiyana | -0.42 | 0.00 | 0.42 |  |
| 154 | Singed | -0.43 | 0.34 | 0.77 |  |
| 155 | Shaco | -0.46 | 0.00 | 0.46 |  |
| 156 | Mordekaiser | -0.51 | 0.16 | 0.67 |  |
| 157 | Garen | -0.56 | 0.11 | 0.67 |  |
| 158 | Kha'Zix | -0.59 | 0.00 | 0.59 |  |
| 159 | Skarner | -0.61 | 0.11 | 0.72 |  |
| 160 | Darius | -0.67 | 0.00 | 0.67 |  |
| 161 | Sion | -0.67 | 0.00 | 0.67 |  |
| 162 | Trundle | -0.67 | 0.00 | 0.67 |  |
| 163 | Yorick | -0.67 | 0.00 | 0.67 |  |
| 164 | Taric | -0.72 | 0.00 | 0.72 |  |
| 165 | Blitzcrank | -0.77 | 0.00 | 0.77 |  |
| 166 | Cho'Gath | -0.77 | 0.00 | 0.77 |  |
| 167 | Dr. Mundo | -0.77 | 0.00 | 0.77 |  |
| 168 | Gangplank | -0.77 | 0.00 | 0.77 |  |
| 169 | Nunu & Willump | -0.77 | 0.00 | 0.77 |  |
| 170 | Olaf | -0.77 | 0.00 | 0.77 |  |
| 171 | Rumble | -0.77 | 0.00 | 0.77 |  |
| 172 | Rengar | -0.80 | 0.11 | 0.91 |  |
