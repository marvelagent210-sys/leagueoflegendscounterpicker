# Counters to Nidalee (patch 26.20)

Every champion ranked by what its kit does against Nidalee's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nidalee's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nidalee` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.50)

- **0.36** spell shield: Spell Shield's spell shield blocks Nidalee's Pounce. Spell shield for 1.5 s, long enough to use ahead of Pounce. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nidalee W Pounce)
- **0.27** spell shield: Spell Shield's spell shield blocks Nidalee's Takedown. Spell shield for 1.5 s, long enough to use ahead of Takedown. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nidalee Q Takedown)

### 2. Kayle (net +0.46)

- **0.27** invulnerable: Divine Judgment makes Kayle invulnerable to Nidalee's Pounce. Invulnerable for 2.5 s, long enough to use ahead of Pounce. (Kayle R Divine Judgment → Nidalee W Pounce)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Nidalee's Takedown. Invulnerable for 2.5 s, long enough to use ahead of Takedown. (Kayle R Divine Judgment → Nidalee Q Takedown)
- **0.09** range: Kayle's basic attacks reach 100 units farther than Nidalee's (625 vs 525 attack range). Nidalee closes the gap with Pounce. (Kayle basic attacks → Nidalee basic attacks)

### 3. Yuumi (net +0.42)

- **0.36** untargetable: You and Me! makes Yuumi untargetable, dodging Nidalee's Pounce. Untargetable for ?; Pounce lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nidalee W Pounce)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Nidalee's Takedown. Untargetable for ?; Takedown lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nidalee Q Takedown)
- Watch out: Nidalee's basic attacks reach 100 units farther than Yuumi's (525 vs 425 attack range).

### 4. Vladimir (net +0.41)

- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nidalee's Pounce. Untargetable for 2 s, long enough to use ahead of Pounce. (Vladimir W Sanguine Pool → Nidalee W Pounce)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nidalee's Takedown. Untargetable for 2 s, long enough to use ahead of Takedown. (Vladimir W Sanguine Pool → Nidalee Q Takedown)
- Watch out: Nidalee's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

### 5. Lissandra (net +0.40)

- **0.27** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nidalee's Pounce. Untargetable for 2.5 s, long enough to use ahead of Pounce. (Lissandra R Frozen Tomb → Nidalee W Pounce)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nidalee's Takedown. Untargetable for 2.5 s, long enough to use ahead of Takedown. (Lissandra R Frozen Tomb → Nidalee Q Takedown)
- **0.13** dash stop: Frozen Tomb's knockdown can stop Nidalee's Pounce mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Nidalee W Pounce)

### 6. Bard (net +0.37)

- **0.27** untargetable: Tempered Fate makes Bard untargetable, dodging Nidalee's Pounce. Untargetable for 2.5 s, long enough to use ahead of Pounce. (Bard R Tempered Fate → Nidalee W Pounce)
- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Nidalee's Takedown. Untargetable for 2.5 s, long enough to use ahead of Takedown. (Bard R Tempered Fate → Nidalee Q Takedown)

### 7. Xayah (net +0.36)

- **0.26** untargetable: Featherstorm makes Xayah untargetable, dodging Nidalee's Pounce. Untargetable for 1.5 s, long enough to use ahead of Pounce. (Xayah R Featherstorm → Nidalee W Pounce)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Nidalee's Takedown. Untargetable for 1.5 s, long enough to use ahead of Takedown. (Xayah R Featherstorm → Nidalee Q Takedown)

### 8. Pantheon (net +0.32)

- **0.36** invulnerable: Aegis Assault makes Pantheon invulnerable to Nidalee's Pounce. Invulnerable for 1.5 s, long enough to use ahead of Pounce. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Nidalee W Pounce)
- **0.27** invulnerable: Aegis Assault makes Pantheon invulnerable to Nidalee's Takedown. Invulnerable for 1.5 s, long enough to use ahead of Takedown. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Nidalee Q Takedown)
- Watch out: Nidalee's basic attacks reach 350 units farther than Pantheon's (525 vs 175 attack range).

### 9. Samira (net +0.32)

- **0.25** projectile block: Blade Whirl blocks Nidalee's Javelin Toss, a projectile. Blade Whirl for 0.75 s; Javelin Toss takes 1.4 s to land, enough to react. (Samira W Blade Whirl → Nidalee Q Javelin Toss)
- **0.13** projectile block: Blade Whirl blocks Nidalee's basic attacks, which are projectiles (in Nidalee). Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Nidalee basic attacks)

### 10. Teemo (net +0.31)

- **0.39** blind: Blinding Dart's blind makes Nidalee's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Nidalee basic attacks)
- Watch out: Prowl reveals Teemo through Guerrilla Warfare's stealth.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.50 | 0.50 | 0.00 |  |
| 2 | Kayle | +0.46 | 0.46 | 0.00 |  |
| 3 | Yuumi | +0.42 | 0.50 | 0.08 |  |
| 4 | Vladimir | +0.41 | 0.52 | 0.11 |  |
| 5 | Lissandra | +0.40 | 0.40 | 0.00 |  |
| 6 | Bard | +0.37 | 0.37 | 0.00 |  |
| 7 | Xayah | +0.36 | 0.36 | 0.00 |  |
| 8 | Pantheon | +0.32 | 0.50 | 0.18 |  |
| 9 | Samira | +0.32 | 0.32 | 0.00 |  |
| 10 | Teemo | +0.31 | 0.39 | 0.08 |  |
| 11 | Mel | +0.31 | 0.31 | 0.00 |  |
| 12 | Fizz | +0.30 | 0.43 | 0.13 |  |
| 13 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 14 | Nocturne | +0.28 | 0.58 | 0.30 |  |
| 15 | Lulu | +0.28 | 0.28 | 0.00 |  |
| 16 | Hwei | +0.23 | 0.23 | 0.00 |  |
| 17 | Jinx | +0.23 | 0.23 | 0.00 |  |
| 18 | Ahri | +0.21 | 0.21 | 0.00 |  |
| 19 | Veigar | +0.20 | 0.20 | 0.00 |  |
| 20 | Viktor | +0.20 | 0.20 | 0.00 |  |
| 21 | Braum | +0.19 | 0.49 | 0.30 |  |
| 22 | Rek'Sai | +0.19 | 0.37 | 0.18 |  |
| 23 | Vex | +0.19 | 0.19 | 0.00 |  |
| 24 | Yasuo | +0.18 | 0.36 | 0.18 |  |
| 25 | Varus | +0.18 | 0.18 | 0.00 |  |
| 26 | Tristana | +0.16 | 0.16 | 0.00 |  |
| 27 | Malzahar | +0.13 | 0.13 | 0.00 |  |
| 28 | Caitlyn | +0.11 | 0.11 | 0.00 |  |
| 29 | Xin Zhao | +0.10 | 0.36 | 0.26 |  |
| 30 | Shen | +0.10 | 0.30 | 0.20 |  |
| 31 | Maokai | +0.08 | 0.38 | 0.30 |  |
| 32 | Poppy | +0.08 | 0.38 | 0.30 |  |
| 33 | Aurora | +0.07 | 0.22 | 0.15 |  |
| 34 | Camille | +0.07 | 0.22 | 0.15 |  |
| 35 | Ashe | +0.07 | 0.07 | 0.00 |  |
| 36 | Nilah | +0.06 | 0.28 | 0.22 |  |
| 37 | Annie | +0.05 | 0.05 | 0.00 |  |
| 38 | Fiora | +0.04 | 0.32 | 0.28 |  |
| 39 | Master Yi | +0.04 | 0.30 | 0.26 |  |
| 40 | Kayn | +0.04 | 0.22 | 0.18 |  |
| 41 | Anivia | +0.04 | 0.04 | 0.00 |  |
| 42 | Jax | +0.02 | 0.32 | 0.30 |  |
| 43 | Gwen | +0.02 | 0.30 | 0.28 |  |
| 44 | Zed | +0.02 | 0.22 | 0.20 |  |
| 45 | Rammus | 0.00 | 0.30 | 0.30 |  |
| 46 | Zac | 0.00 | 0.26 | 0.26 |  |
| 47 | Yone | 0.00 | 0.13 | 0.13 |  |
| 48 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 49 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 50 | Azir | 0.00 | 0.00 | 0.00 |  |
| 51 | Brand | 0.00 | 0.00 | 0.00 |  |
| 52 | Corki | 0.00 | 0.00 | 0.00 |  |
| 53 | Draven | 0.00 | 0.00 | 0.00 |  |
| 54 | Elise | 0.00 | 0.00 | 0.00 |  |
| 55 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 56 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 57 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 58 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 59 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 60 | Janna | 0.00 | 0.00 | 0.00 |  |
| 61 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 62 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 63 | Kalista | 0.00 | 0.00 | 0.00 |  |
| 64 | Karma | 0.00 | 0.00 | 0.00 |  |
| 65 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 66 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 67 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 68 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 69 | Lux | 0.00 | 0.00 | 0.00 |  |
| 70 | Milio | 0.00 | 0.00 | 0.00 |  |
| 71 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 72 | Nami | 0.00 | 0.00 | 0.00 |  |
| 73 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 74 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 75 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 76 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 77 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 78 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 79 | Sona | 0.00 | 0.00 | 0.00 |  |
| 80 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 81 | Swain | 0.00 | 0.00 | 0.00 |  |
| 82 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 83 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 84 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 85 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 86 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 87 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 88 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 89 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 90 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 91 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 92 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 93 | Singed | -0.03 | 0.57 | 0.60 |  |
| 94 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 95 | Senna | -0.05 | 0.06 | 0.11 |  |
| 96 | Graves | -0.05 | 0.00 | 0.05 |  |
| 97 | Evelynn | -0.06 | 0.22 | 0.28 |  |
| 98 | Warwick | -0.06 | 0.14 | 0.20 |  |
| 99 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 100 | Malphite | -0.10 | 0.20 | 0.30 |  |
| 101 | Kled | -0.10 | 0.00 | 0.10 |  |
| 102 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 103 | Karthus | -0.11 | 0.00 | 0.11 |  |
| 104 | Morgana | -0.11 | 0.00 | 0.11 |  |
| 105 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 106 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 107 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 108 | Katarina | -0.12 | 0.18 | 0.30 |  |
| 109 | Jarvan IV | -0.13 | 0.00 | 0.13 |  |
| 110 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 111 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 112 | Akshan | -0.14 | 0.00 | 0.14 |  |
| 113 | K'Sante | -0.14 | 0.00 | 0.14 |  |
| 114 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 115 | Briar | -0.15 | 0.00 | 0.15 |  |
| 116 | Lillia | -0.15 | 0.00 | 0.15 |  |
| 117 | Naafiri | -0.15 | 0.00 | 0.15 |  |
| 118 | Amumu | -0.17 | 0.13 | 0.30 |  |
| 119 | Shaco | -0.18 | 0.22 | 0.40 |  |
| 120 | Hecarim | -0.18 | 0.00 | 0.18 |  |
| 121 | Ornn | -0.18 | 0.00 | 0.18 |  |
| 122 | Rell | -0.18 | 0.00 | 0.18 |  |
| 123 | Zaahen | -0.18 | 0.00 | 0.18 |  |
| 124 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 125 | Galio | -0.19 | 0.00 | 0.19 |  |
| 126 | Volibear | -0.19 | 0.00 | 0.19 |  |
| 127 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 128 | Ekko | -0.20 | 0.00 | 0.20 |  |
| 129 | Lee Sin | -0.20 | 0.00 | 0.20 |  |
| 130 | Riven | -0.20 | 0.00 | 0.20 |  |
| 131 | Vi | -0.20 | 0.00 | 0.20 |  |
| 132 | Viego | -0.23 | 0.00 | 0.23 |  |
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
| 143 | Alistar | -0.30 | 0.00 | 0.30 |  |
| 144 | Gragas | -0.30 | 0.00 | 0.30 |  |
| 145 | Illaoi | -0.30 | 0.00 | 0.30 |  |
| 146 | Leona | -0.30 | 0.00 | 0.30 |  |
| 147 | Locke | -0.30 | 0.00 | 0.30 |  |
| 148 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 149 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 150 | Sett | -0.30 | 0.00 | 0.30 |  |
| 151 | Udyr | -0.30 | 0.00 | 0.30 |  |
| 152 | Akali | -0.31 | 0.00 | 0.31 |  |
| 153 | Talon | -0.34 | 0.00 | 0.34 |  |
| 154 | Qiyana | -0.37 | 0.00 | 0.37 |  |
| 155 | Wukong | -0.38 | 0.00 | 0.38 |  |
| 156 | Mordekaiser | -0.46 | 0.07 | 0.53 |  |
| 157 | Kha'Zix | -0.51 | 0.00 | 0.51 |  |
| 158 | Darius | -0.53 | 0.00 | 0.53 |  |
| 159 | Garen | -0.53 | 0.00 | 0.53 |  |
| 160 | Sion | -0.53 | 0.00 | 0.53 |  |
| 161 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 162 | Yorick | -0.53 | 0.00 | 0.53 |  |
| 163 | Skarner | -0.56 | 0.00 | 0.56 |  |
| 164 | Taric | -0.56 | 0.00 | 0.56 |  |
| 165 | Blitzcrank | -0.60 | 0.00 | 0.60 |  |
| 166 | Cho'Gath | -0.60 | 0.00 | 0.60 |  |
| 167 | Dr. Mundo | -0.60 | 0.00 | 0.60 |  |
| 168 | Gangplank | -0.60 | 0.00 | 0.60 |  |
| 169 | Nunu & Willump | -0.60 | 0.00 | 0.60 |  |
| 170 | Olaf | -0.60 | 0.00 | 0.60 |  |
| 171 | Rumble | -0.60 | 0.00 | 0.60 |  |
| 172 | Rengar | -0.74 | 0.00 | 0.74 |  |
