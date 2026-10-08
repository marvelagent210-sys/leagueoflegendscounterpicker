# Counters to Nidalee (patch 26.20)

Every champion ranked by what its kit does against Nidalee's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nidalee's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nidalee` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayle (net +0.36)

- **0.27** invulnerable: Divine Judgment makes Kayle invulnerable to Nidalee's Pounce. Invulnerable for 2.5 s, long enough to use ahead of Pounce. (Kayle R Divine Judgment → Nidalee W Pounce)
- **0.09** range: Kayle's basic attacks reach 100 units farther than Nidalee's (625 vs 525 attack range). Nidalee closes the gap with Pounce. (Kayle basic attacks → Nidalee basic attacks)

### 2. Sivir (net +0.36)

- **0.36** spell shield: Spell Shield's spell shield blocks Nidalee's Pounce. Spell shield for 1.5 s, long enough to use ahead of Pounce. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nidalee W Pounce)

### 3. Lissandra (net +0.34)

- **0.27** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nidalee's Pounce. Untargetable for 2.5 s, long enough to use ahead of Pounce. (Lissandra R Frozen Tomb → Nidalee W Pounce)
- **0.13** dash stop: Frozen Tomb's knockdown can stop Nidalee's Pounce mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Nidalee W Pounce)

### 4. Samira (net +0.32)

- **0.25** projectile block: Blade Whirl blocks Nidalee's Javelin Toss, a projectile. Blade Whirl for 0.75 s; Javelin Toss takes 1.4 s to land, enough to react. (Samira W Blade Whirl → Nidalee Q Javelin Toss)
- **0.13** projectile block: Blade Whirl blocks Nidalee's basic attacks, which are projectiles (in Nidalee). Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Nidalee basic attacks)

### 5. Teemo (net +0.31)

- **0.39** blind: Blinding Dart's blind makes Nidalee's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Nidalee basic attacks)
- Watch out: Prowl reveals Teemo through Guerrilla Warfare's stealth.

### 6. Mel (net +0.31)

- **0.24** projectile block: Rebuttal blocks Nidalee's Javelin Toss, a projectile. Rebuttal for 0.75 s; Javelin Toss takes 1.4 s to land, enough to react. (Mel W Rebuttal → Nidalee Q Javelin Toss)
- **0.13** projectile block: Rebuttal blocks Nidalee's basic attacks, which are projectiles (in Nidalee). Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Nidalee basic attacks)

### 7. Cassiopeia (net +0.29)

- **0.29** grounding: Miasma grounds Nidalee, who then can't cast Pounce. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Nidalee W Pounce)

### 8. Yuumi (net +0.28)

- **0.36** untargetable: You and Me! makes Yuumi untargetable, dodging Nidalee's Pounce. Untargetable for ?; Pounce lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nidalee W Pounce)
- Watch out: Nidalee's basic attacks reach 100 units farther than Yuumi's (525 vs 425 attack range).

### 9. Lulu (net +0.28)

- **0.28** disarm: Whimsy disarms Nidalee for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Nidalee basic attacks)

### 10. Vladimir (net +0.27)

- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nidalee's Pounce. Untargetable for 2 s, long enough to use ahead of Pounce. (Vladimir W Sanguine Pool → Nidalee W Pounce)
- Watch out: Nidalee's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +0.36 | 0.36 | 0.00 |  |
| 2 | Sivir | +0.36 | 0.36 | 0.00 |  |
| 3 | Lissandra | +0.34 | 0.34 | 0.00 |  |
| 4 | Samira | +0.32 | 0.32 | 0.00 |  |
| 5 | Teemo | +0.31 | 0.39 | 0.08 |  |
| 6 | Mel | +0.31 | 0.31 | 0.00 |  |
| 7 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 8 | Yuumi | +0.28 | 0.36 | 0.08 |  |
| 9 | Lulu | +0.28 | 0.28 | 0.00 |  |
| 10 | Vladimir | +0.27 | 0.38 | 0.11 |  |
| 11 | Bard | +0.27 | 0.27 | 0.00 |  |
| 12 | Xayah | +0.26 | 0.26 | 0.00 |  |
| 13 | Hwei | +0.23 | 0.23 | 0.00 |  |
| 14 | Jinx | +0.23 | 0.23 | 0.00 |  |
| 15 | Elise | +0.22 | 0.22 | 0.00 |  |
| 16 | Ahri | +0.21 | 0.21 | 0.00 |  |
| 17 | Veigar | +0.20 | 0.20 | 0.00 |  |
| 18 | Viktor | +0.20 | 0.20 | 0.00 |  |
| 19 | Braum | +0.19 | 0.49 | 0.30 |  |
| 20 | Vex | +0.19 | 0.19 | 0.00 |  |
| 21 | Pantheon | +0.18 | 0.36 | 0.18 |  |
| 22 | Yasuo | +0.18 | 0.36 | 0.18 |  |
| 23 | Varus | +0.18 | 0.18 | 0.00 |  |
| 24 | Tristana | +0.16 | 0.16 | 0.00 |  |
| 25 | Kindred | +0.15 | 0.15 | 0.00 |  |
| 26 | Malzahar | +0.13 | 0.13 | 0.00 |  |
| 27 | Nocturne | +0.12 | 0.42 | 0.30 |  |
| 28 | Caitlyn | +0.11 | 0.11 | 0.00 |  |
| 29 | Shen | +0.10 | 0.30 | 0.20 |  |
| 30 | Rek'Sai | +0.09 | 0.27 | 0.18 |  |
| 31 | Poppy | +0.08 | 0.38 | 0.30 |  |
| 32 | Ashe | +0.07 | 0.07 | 0.00 |  |
| 33 | Nilah | +0.06 | 0.28 | 0.22 |  |
| 34 | Annie | +0.05 | 0.05 | 0.00 |  |
| 35 | Anivia | +0.04 | 0.04 | 0.00 |  |
| 36 | Jax | +0.02 | 0.32 | 0.30 |  |
| 37 | Aurora | +0.01 | 0.16 | 0.15 |  |
| 38 | Camille | +0.01 | 0.16 | 0.15 |  |
| 39 | Rammus | 0.00 | 0.30 | 0.30 |  |
| 40 | Xin Zhao | 0.00 | 0.26 | 0.26 |  |
| 41 | Zac | 0.00 | 0.26 | 0.26 |  |
| 42 | Yone | 0.00 | 0.13 | 0.13 |  |
| 43 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 44 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 45 | Azir | 0.00 | 0.00 | 0.00 |  |
| 46 | Brand | 0.00 | 0.00 | 0.00 |  |
| 47 | Corki | 0.00 | 0.00 | 0.00 |  |
| 48 | Draven | 0.00 | 0.00 | 0.00 |  |
| 49 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 50 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 51 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 52 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 53 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 54 | Janna | 0.00 | 0.00 | 0.00 |  |
| 55 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 56 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 57 | Kalista | 0.00 | 0.00 | 0.00 |  |
| 58 | Karma | 0.00 | 0.00 | 0.00 |  |
| 59 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 60 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 61 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 62 | Lux | 0.00 | 0.00 | 0.00 |  |
| 63 | Milio | 0.00 | 0.00 | 0.00 |  |
| 64 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 65 | Nami | 0.00 | 0.00 | 0.00 |  |
| 66 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 67 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 68 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 69 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 70 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 71 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 72 | Sona | 0.00 | 0.00 | 0.00 |  |
| 73 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 74 | Swain | 0.00 | 0.00 | 0.00 |  |
| 75 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 76 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 77 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 78 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 79 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 80 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 81 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 82 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 83 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 84 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 85 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 86 | Fiora | -0.02 | 0.26 | 0.28 |  |
| 87 | Kayn | -0.02 | 0.16 | 0.18 |  |
| 88 | Singed | -0.03 | 0.57 | 0.60 |  |
| 89 | Maokai | -0.03 | 0.27 | 0.30 |  |
| 90 | Ekko | -0.03 | 0.17 | 0.20 |  |
| 91 | Master Yi | -0.04 | 0.22 | 0.26 |  |
| 92 | Zed | -0.04 | 0.16 | 0.20 |  |
| 93 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 94 | Senna | -0.05 | 0.06 | 0.11 |  |
| 95 | Graves | -0.05 | 0.00 | 0.05 |  |
| 96 | Gwen | -0.06 | 0.22 | 0.28 |  |
| 97 | Warwick | -0.06 | 0.14 | 0.20 |  |
| 98 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 99 | Malphite | -0.10 | 0.20 | 0.30 |  |
| 100 | Kled | -0.10 | 0.00 | 0.10 |  |
| 101 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 102 | Karthus | -0.11 | 0.00 | 0.11 |  |
| 103 | Morgana | -0.11 | 0.00 | 0.11 |  |
| 104 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 105 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 106 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 107 | Katarina | -0.12 | 0.18 | 0.30 |  |
| 108 | Evelynn | -0.12 | 0.16 | 0.28 |  |
| 109 | Fizz | -0.13 | 0.00 | 0.13 |  |
| 110 | Jarvan IV | -0.13 | 0.00 | 0.13 |  |
| 111 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 112 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 113 | Akshan | -0.14 | 0.00 | 0.14 |  |
| 114 | K'Sante | -0.14 | 0.00 | 0.14 |  |
| 115 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 116 | Briar | -0.15 | 0.00 | 0.15 |  |
| 117 | Lillia | -0.15 | 0.00 | 0.15 |  |
| 118 | Naafiri | -0.15 | 0.00 | 0.15 |  |
| 119 | Amumu | -0.17 | 0.13 | 0.30 |  |
| 120 | Hecarim | -0.18 | 0.00 | 0.18 |  |
| 121 | Ornn | -0.18 | 0.00 | 0.18 |  |
| 122 | Rell | -0.18 | 0.00 | 0.18 |  |
| 123 | Zaahen | -0.18 | 0.00 | 0.18 |  |
| 124 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 125 | Galio | -0.19 | 0.00 | 0.19 |  |
| 126 | Volibear | -0.19 | 0.00 | 0.19 |  |
| 127 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 128 | Lee Sin | -0.20 | 0.00 | 0.20 |  |
| 129 | Riven | -0.20 | 0.00 | 0.20 |  |
| 130 | Vi | -0.20 | 0.00 | 0.20 |  |
| 131 | Viego | -0.23 | 0.00 | 0.23 |  |
| 132 | Shaco | -0.24 | 0.16 | 0.40 |  |
| 133 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 134 | Aatrox | -0.26 | 0.00 | 0.26 |  |
| 135 | Nautilus | -0.26 | 0.00 | 0.26 |  |
| 136 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 137 | Tryndamere | -0.26 | 0.00 | 0.26 |  |
| 138 | Diana | -0.28 | 0.00 | 0.28 |  |
| 139 | Kassadin | -0.28 | 0.00 | 0.28 |  |
| 140 | Sejuani | -0.28 | 0.00 | 0.28 |  |
| 141 | Shyvana | -0.28 | 0.00 | 0.28 |  |
| 142 | Nasus | -0.30 | 0.30 | 0.60 |  |
| 143 | Taric | -0.30 | 0.26 | 0.56 |  |
| 144 | Alistar | -0.30 | 0.00 | 0.30 |  |
| 145 | Gragas | -0.30 | 0.00 | 0.30 |  |
| 146 | Illaoi | -0.30 | 0.00 | 0.30 |  |
| 147 | Leona | -0.30 | 0.00 | 0.30 |  |
| 148 | Locke | -0.30 | 0.00 | 0.30 |  |
| 149 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 150 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 151 | Sett | -0.30 | 0.00 | 0.30 |  |
| 152 | Udyr | -0.30 | 0.00 | 0.30 |  |
| 153 | Akali | -0.31 | 0.00 | 0.31 |  |
| 154 | Talon | -0.34 | 0.00 | 0.34 |  |
| 155 | Qiyana | -0.37 | 0.00 | 0.37 |  |
| 156 | Wukong | -0.38 | 0.00 | 0.38 |  |
| 157 | Mordekaiser | -0.46 | 0.07 | 0.53 |  |
| 158 | Kha'Zix | -0.51 | 0.00 | 0.51 |  |
| 159 | Darius | -0.53 | 0.00 | 0.53 |  |
| 160 | Garen | -0.53 | 0.00 | 0.53 |  |
| 161 | Sion | -0.53 | 0.00 | 0.53 |  |
| 162 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 163 | Yorick | -0.53 | 0.00 | 0.53 |  |
| 164 | Skarner | -0.56 | 0.00 | 0.56 |  |
| 165 | Blitzcrank | -0.60 | 0.00 | 0.60 |  |
| 166 | Cho'Gath | -0.60 | 0.00 | 0.60 |  |
| 167 | Dr. Mundo | -0.60 | 0.00 | 0.60 |  |
| 168 | Gangplank | -0.60 | 0.00 | 0.60 |  |
| 169 | Nunu & Willump | -0.60 | 0.00 | 0.60 |  |
| 170 | Olaf | -0.60 | 0.00 | 0.60 |  |
| 171 | Rumble | -0.60 | 0.00 | 0.60 |  |
| 172 | Rengar | -0.74 | 0.00 | 0.74 |  |
