# Counters to Talon (patch 26.20)

Every champion ranked by what its kit does against Talon's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Talon's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Talon` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +1.18)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Talon's Noxian Diplomacy. Untargetable for ?; Noxian Diplomacy takes 0.61 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Talon Q Noxian Diplomacy)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Talon's Shadow Assault. Untargetable for ?; Shadow Assault lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Talon R Shadow Assault)
- **0.21** range: Yuumi's basic attacks reach 300 units farther than Talon's (425 vs 125 attack range). Talon closes the gap with Assassin's Path, Noxian Diplomacy. (Yuumi basic attacks → Talon basic attacks)

### 2. Sivir (net +1.10)

- **0.55** spell shield: Spell Shield's spell shield blocks Talon's Shadow Assault. Spell shield for 1.5 s, long enough to use ahead of Shadow Assault. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Talon R Shadow Assault)
- **0.48** spell shield: Spell Shield's spell shield blocks Talon's Noxian Diplomacy. Spell shield for 1.5 s, long enough to use ahead of Noxian Diplomacy. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Talon Q Noxian Diplomacy)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Talon's (500 vs 125 attack range). Talon closes the gap with Assassin's Path, Noxian Diplomacy. (Sivir basic attacks → Talon basic attacks)

### 3. Singed (net +1.02)

- **0.44** grounding: Mega Adhesive grounds Talon, who then can't cast Assassin's Path. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Talon E Assassin's Path)
- **0.32** anti-heal: Insanity Potion's Grievous Wounds cuts Talon's healing from Noxian Diplomacy by 40%. (Singed R Insanity Potion → Talon Q Noxian Diplomacy)
- **0.20** grounding: Mega Adhesive grounds Talon, who then can't cast Noxian Diplomacy. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Talon Q Noxian Diplomacy)

### 4. Fizz (net +0.99)

- **0.68** untargetable: Playful makes Fizz untargetable, dodging Talon's Noxian Diplomacy. Untargetable for 0.75 s; Noxian Diplomacy takes 0.61 s to land, enough to react. (Fizz E Playful → Talon Q Noxian Diplomacy)
- **0.33** untargetable: Playful makes Fizz untargetable, dodging Talon's Shadow Assault. Untargetable for 0.75 s; Shadow Assault lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Talon R Shadow Assault)
- **0.14** reveal: Chum the Waters reveals Talon through Shadow Assault's stealth. (Fizz R Chum the Waters → Talon R Shadow Assault)

### 5. Vladimir (net +0.92)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Talon's Shadow Assault. Untargetable for 2 s, long enough to use ahead of Shadow Assault. (Vladimir W Sanguine Pool → Talon R Shadow Assault)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Talon's Noxian Diplomacy. Untargetable for 2 s, long enough to use ahead of Noxian Diplomacy. (Vladimir W Sanguine Pool → Talon Q Noxian Diplomacy)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Talon's (450 vs 125 attack range). Talon closes the gap with Assassin's Path, Noxian Diplomacy. (Vladimir basic attacks → Talon basic attacks)

### 6. Bard (net +0.89)

- **0.47** untargetable: Tempered Fate makes Bard untargetable, dodging Talon's Shadow Assault. Untargetable for 2.5 s, long enough to use ahead of Shadow Assault. (Bard R Tempered Fate → Talon R Shadow Assault)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Talon's Noxian Diplomacy. Untargetable for 2.5 s, long enough to use ahead of Noxian Diplomacy. (Bard R Tempered Fate → Talon Q Noxian Diplomacy)
- **0.24** range: Bard's basic attacks reach 375 units farther than Talon's (500 vs 125 attack range). Talon closes the gap with Assassin's Path, Noxian Diplomacy. (Bard basic attacks → Talon basic attacks)

### 7. Kayle (net +0.89)

- **0.47** invulnerable: Divine Judgment makes Kayle invulnerable to Talon's Shadow Assault. Invulnerable for 2.5 s, long enough to use ahead of Shadow Assault. (Kayle R Divine Judgment → Talon R Shadow Assault)
- **0.36** invulnerable: Divine Judgment makes Kayle invulnerable to Talon's Noxian Diplomacy. Invulnerable for 2.5 s, long enough to use ahead of Noxian Diplomacy. (Kayle R Divine Judgment → Talon Q Noxian Diplomacy)
- **0.24** range: Kayle's basic attacks reach 500 units farther than Talon's (625 vs 125 attack range). Talon closes the gap with Assassin's Path, Noxian Diplomacy. (Kayle basic attacks → Talon basic attacks)

### 8. Lissandra (net +0.87)

- **0.47** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Talon's Shadow Assault. Untargetable for 2.5 s, long enough to use ahead of Shadow Assault. (Lissandra R Frozen Tomb → Talon R Shadow Assault)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Talon's Noxian Diplomacy. Untargetable for 2.5 s, long enough to use ahead of Noxian Diplomacy. (Lissandra R Frozen Tomb → Talon Q Noxian Diplomacy)
- **0.19** dash stop: Frozen Tomb's knockdown can stop Talon's Assassin's Path mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Talon E Assassin's Path)

### 9. Xayah (net +0.86)

- **0.42** untargetable: Featherstorm makes Xayah untargetable, dodging Talon's Shadow Assault. Untargetable for 1.5 s, long enough to use ahead of Shadow Assault. (Xayah R Featherstorm → Talon R Shadow Assault)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Talon's Noxian Diplomacy. Untargetable for 1.5 s, long enough to use ahead of Noxian Diplomacy. (Xayah R Featherstorm → Talon Q Noxian Diplomacy)
- **0.26** range: Xayah's basic attacks reach 400 units farther than Talon's (525 vs 125 attack range). Talon closes the gap with Assassin's Path, Noxian Diplomacy. (Xayah basic attacks → Talon basic attacks)

### 10. Hwei (net +0.85)

- **0.30** dash stop: Grim Visage's knockdown can stop Talon's Noxian Diplomacy mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Talon Q Noxian Diplomacy)
- **0.23** dash stop: Grim Visage's knockdown can stop Talon's Assassin's Path mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Talon E Assassin's Path)
- **0.15** range: Hwei's basic attacks reach 425 units farther than Talon's (550 vs 125 attack range). Talon closes the gap with Assassin's Path, Noxian Diplomacy. (Hwei basic attacks → Talon basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +1.18 | 1.18 | 0.00 |  |
| 2 | Sivir | +1.10 | 1.10 | 0.00 |  |
| 3 | Singed | +1.02 | 1.02 | 0.00 | grounding (Mega Adhesive) |
| 4 | Fizz | +0.99 | 0.99 | 0.00 |  |
| 5 | Vladimir | +0.92 | 0.92 | 0.00 |  |
| 6 | Bard | +0.89 | 0.89 | 0.00 |  |
| 7 | Kayle | +0.89 | 0.89 | 0.00 |  |
| 8 | Lissandra | +0.87 | 0.87 | 0.00 |  |
| 9 | Xayah | +0.86 | 0.86 | 0.00 |  |
| 10 | Hwei | +0.85 | 0.85 | 0.00 |  |
| 11 | Nocturne | +0.84 | 0.84 | 0.00 |  |
| 12 | Yasuo | +0.84 | 0.84 | 0.00 | projectile block (Wind Wall) |
| 13 | Pantheon | +0.79 | 0.79 | 0.00 |  |
| 14 | Maokai | +0.78 | 0.78 | 0.00 |  |
| 15 | Braum | +0.76 | 0.76 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 16 | Lulu | +0.72 | 0.72 | 0.00 |  |
| 17 | Master Yi | +0.72 | 0.72 | 0.00 |  |
| 18 | Poppy | +0.72 | 0.72 | 0.00 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 19 | Fiora | +0.69 | 0.69 | 0.00 |  |
| 20 | Rek'Sai | +0.69 | 0.69 | 0.00 |  |
| 21 | Teemo | +0.69 | 0.69 | 0.00 | blind (Blinding Dart) |
| 22 | Cassiopeia | +0.68 | 0.68 | 0.00 | grounding (Miasma) |
| 23 | Vex | +0.68 | 0.68 | 0.00 |  |
| 24 | Aurora | +0.67 | 0.67 | 0.00 |  |
| 25 | Samira | +0.67 | 0.67 | 0.00 |  |
| 26 | Gwen | +0.65 | 0.65 | 0.00 |  |
| 27 | Mel | +0.64 | 0.64 | 0.00 |  |
| 28 | Jinx | +0.61 | 0.61 | 0.00 |  |
| 29 | Viktor | +0.60 | 0.60 | 0.00 |  |
| 30 | Xin Zhao | +0.60 | 0.60 | 0.00 |  |
| 31 | Ahri | +0.55 | 0.55 | 0.00 |  |
| 32 | Kayn | +0.54 | 0.54 | 0.00 |  |
| 33 | Kled | +0.54 | 0.54 | 0.00 |  |
| 34 | Veigar | +0.53 | 0.53 | 0.00 |  |
| 35 | Caitlyn | +0.52 | 0.52 | 0.00 |  |
| 36 | Malzahar | +0.52 | 0.52 | 0.00 |  |
| 37 | Evelynn | +0.50 | 0.50 | 0.00 |  |
| 38 | Shaco | +0.50 | 0.50 | 0.00 |  |
| 39 | Varus | +0.50 | 0.50 | 0.00 |  |
| 40 | Zac | +0.50 | 0.50 | 0.00 |  |
| 41 | Camille | +0.48 | 0.48 | 0.00 |  |
| 42 | Zed | +0.48 | 0.48 | 0.00 |  |
| 43 | Karma | +0.43 | 0.43 | 0.00 |  |
| 44 | Twisted Fate | +0.43 | 0.43 | 0.00 |  |
| 45 | Fiddlesticks | +0.41 | 0.41 | 0.00 |  |
| 46 | Nilah | +0.41 | 0.41 | 0.00 |  |
| 47 | Kai'Sa | +0.40 | 0.40 | 0.00 |  |
| 48 | Renata Glasc | +0.40 | 0.40 | 0.00 |  |
| 49 | Jax | +0.38 | 0.38 | 0.00 |  |
| 50 | Akshan | +0.36 | 0.36 | 0.00 |  |
| 51 | Elise | +0.36 | 0.36 | 0.00 |  |
| 52 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 53 | Rammus | +0.36 | 0.36 | 0.00 |  |
| 54 | Shen | +0.36 | 0.36 | 0.00 |  |
| 55 | Rengar | +0.35 | 0.35 | 0.00 |  |
| 56 | Morgana | +0.34 | 0.34 | 0.00 |  |
| 57 | Nidalee | +0.34 | 0.34 | 0.00 |  |
| 58 | Katarina | +0.32 | 0.32 | 0.00 |  |
| 59 | Milio | +0.32 | 0.32 | 0.00 |  |
| 60 | Warwick | +0.32 | 0.32 | 0.00 |  |
| 61 | Aphelios | +0.31 | 0.31 | 0.00 |  |
| 62 | Kindred | +0.31 | 0.31 | 0.00 |  |
| 63 | Skarner | +0.31 | 0.31 | 0.00 |  |
| 64 | Zyra | +0.30 | 0.30 | 0.00 |  |
| 65 | LeBlanc | +0.29 | 0.29 | 0.00 |  |
| 66 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 67 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 68 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 69 | Amumu | +0.28 | 0.28 | 0.00 |  |
| 70 | Lee Sin | +0.28 | 0.28 | 0.00 |  |
| 71 | Yone | +0.28 | 0.28 | 0.00 |  |
| 72 | Sona | +0.27 | 0.27 | 0.00 |  |
| 73 | Thresh | +0.27 | 0.27 | 0.00 |  |
| 74 | Kalista | +0.26 | 0.26 | 0.00 |  |
| 75 | Quinn | +0.26 | 0.26 | 0.00 |  |
| 76 | Garen | +0.25 | 0.25 | 0.00 |  |
| 77 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 78 | Draven | +0.24 | 0.24 | 0.00 |  |
| 79 | Janna | +0.24 | 0.24 | 0.00 |  |
| 80 | Lucian | +0.24 | 0.24 | 0.00 |  |
| 81 | Malphite | +0.24 | 0.24 | 0.00 |  |
| 82 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 83 | Urgot | +0.24 | 0.24 | 0.00 |  |
| 84 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 85 | Corki | +0.22 | 0.22 | 0.00 |  |
| 86 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 87 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 88 | Miss Fortune | +0.22 | 0.22 | 0.00 |  |
| 89 | Senna | +0.22 | 0.22 | 0.00 |  |
| 90 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 91 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 92 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 93 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 94 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 95 | Lux | +0.19 | 0.19 | 0.00 |  |
| 96 | Mordekaiser | +0.19 | 0.19 | 0.00 |  |
| 97 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 98 | Azir | +0.18 | 0.18 | 0.00 |  |
| 99 | Heimerdinger | +0.18 | 0.18 | 0.00 |  |
| 100 | Jhin | +0.18 | 0.18 | 0.00 |  |
| 101 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 102 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 103 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 104 | Taliyah | +0.18 | 0.18 | 0.00 |  |
| 105 | Vel'Koz | +0.18 | 0.18 | 0.00 |  |
| 106 | Xerath | +0.18 | 0.18 | 0.00 |  |
| 107 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 108 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 109 | Graves | +0.16 | 0.16 | 0.00 |  |
| 110 | Ryze | +0.16 | 0.16 | 0.00 |  |
| 111 | Annie | +0.15 | 0.15 | 0.00 |  |
| 112 | Aurelion Sol | +0.15 | 0.15 | 0.00 |  |
| 113 | Brand | +0.15 | 0.15 | 0.00 |  |
| 114 | Nami | +0.15 | 0.15 | 0.00 |  |
| 115 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 116 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 117 | Aatrox | +0.14 | 0.14 | 0.00 |  |
| 118 | Akali | +0.14 | 0.14 | 0.00 |  |
| 119 | Ambessa | +0.14 | 0.14 | 0.00 |  |
| 120 | Briar | +0.14 | 0.14 | 0.00 |  |
| 121 | Illaoi | +0.14 | 0.14 | 0.00 |  |
| 122 | Naafiri | +0.14 | 0.14 | 0.00 |  |
| 123 | Sett | +0.14 | 0.14 | 0.00 |  |
| 124 | Swain | +0.14 | 0.14 | 0.00 |  |
| 125 | Sylas | +0.14 | 0.14 | 0.00 |  |
| 126 | Vi | +0.14 | 0.14 | 0.00 |  |
| 127 | Ivern | +0.13 | 0.13 | 0.00 |  |
| 128 | Karthus | +0.13 | 0.13 | 0.00 |  |
| 129 | Nunu & Willump | +0.12 | 0.12 | 0.00 |  |
| 130 | Udyr | +0.11 | 0.11 | 0.00 |  |
| 131 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 132 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 133 | Gangplank | +0.06 | 0.06 | 0.00 |  |
| 134 | Viego | +0.06 | 0.06 | 0.00 |  |
| 135 | Olaf | +0.05 | 0.05 | 0.00 |  |
| 136 | Sion | +0.05 | 0.05 | 0.00 |  |
| 137 | Zaahen | +0.05 | 0.05 | 0.00 |  |
| 138 | Alistar | +0.04 | 0.04 | 0.00 |  |
| 139 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 140 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 141 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 142 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 143 | Darius | 0.00 | 0.00 | 0.00 |  |
| 144 | Diana | 0.00 | 0.00 | 0.00 |  |
| 145 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 146 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 147 | Galio | 0.00 | 0.00 | 0.00 |  |
| 148 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 149 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 150 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 151 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 152 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 153 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 154 | Leona | 0.00 | 0.00 | 0.00 |  |
| 155 | Locke | 0.00 | 0.00 | 0.00 |  |
| 156 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 157 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 158 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 159 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 160 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 161 | Rell | 0.00 | 0.00 | 0.00 |  |
| 162 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 163 | Riven | 0.00 | 0.00 | 0.00 |  |
| 164 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 165 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 166 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 167 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 168 | Taric | 0.00 | 0.00 | 0.00 |  |
| 169 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 170 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 171 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 172 | Yorick | 0.00 | 0.00 | 0.00 |  |
