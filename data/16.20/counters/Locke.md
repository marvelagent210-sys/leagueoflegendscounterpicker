# Counters to Locke (patch 26.20)

Every champion ranked by what its kit does against Locke's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Locke's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Locke` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +1.40)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Locke's Ashen Pursuit. Untargetable for ?; Ashen Pursuit takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Locke E Ashen Pursuit)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Locke's Purgatory. Untargetable for ?; Purgatory takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Locke R Purgatory)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Locke's (425 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Yuumi basic attacks → Locke basic attacks)

### 2. Bard (net +1.10)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Locke's Purgatory. Untargetable for 2.5 s, long enough to use ahead of Purgatory. (Bard R Tempered Fate → Locke R Purgatory)
- **0.38** untargetable: Tempered Fate makes Bard untargetable, dodging Locke's Ashen Pursuit. Untargetable for 2.5 s, long enough to use ahead of Ashen Pursuit. (Bard R Tempered Fate → Locke E Ashen Pursuit)
- **0.36** range: Bard's basic attacks reach 375 units farther than Locke's (500 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Bard basic attacks → Locke basic attacks)

### 3. Fizz (net +1.08)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Locke's Ashen Pursuit. Untargetable for 0.75 s; Ashen Pursuit takes 0.5 s to land, enough to react. (Fizz E Playful → Locke E Ashen Pursuit)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Locke's Purgatory. Untargetable for 0.75 s; Purgatory takes 0.5 s to land, enough to react. (Fizz E Playful → Locke R Purgatory)

### 4. Maokai (net +1.08)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Locke's Ashen Pursuit. Untargetable for 1.4 s; Ashen Pursuit takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Locke E Ashen Pursuit)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Locke's Purgatory. Untargetable for 1.4 s; Purgatory takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Locke R Purgatory)

### 5. Vladimir (net +1.08)

- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Locke's Ashen Pursuit. Untargetable for 2 s, long enough to use ahead of Ashen Pursuit. (Vladimir W Sanguine Pool → Locke E Ashen Pursuit)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Locke's Purgatory. Untargetable for 2 s, long enough to use ahead of Purgatory. (Vladimir W Sanguine Pool → Locke R Purgatory)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Locke's (450 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Vladimir basic attacks → Locke basic attacks)

### 6. Kayle (net +1.06)

- **0.44** death prevention: Locke's Purgatory can't execute Kayle during Divine Judgment (invulnerable). Divine Judgment lasts 2.5 s on a 80 s cooldown. (Kayle R Divine Judgment → Locke R Purgatory)
- **0.38** invulnerable: Divine Judgment makes Kayle invulnerable to Locke's Ashen Pursuit. Invulnerable for 2.5 s, long enough to use ahead of Ashen Pursuit. (Kayle R Divine Judgment → Locke E Ashen Pursuit)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Locke's (625 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Kayle basic attacks → Locke basic attacks)

### 7. Xayah (net +1.05)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Locke's Purgatory. Untargetable for 1.5 s, long enough to use ahead of Purgatory. (Xayah R Featherstorm → Locke R Purgatory)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Locke's (525 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Xayah basic attacks → Locke basic attacks)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Locke's Ashen Pursuit. Untargetable for 1.5 s, long enough to use ahead of Ashen Pursuit. (Xayah R Featherstorm → Locke E Ashen Pursuit)

### 8. Master Yi (net +1.02)

- **0.59** untargetable: Alpha Strike makes Master Yi untargetable, dodging Locke's Ashen Pursuit. Untargetable for ?; Ashen Pursuit takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Locke E Ashen Pursuit)
- **0.55** untargetable: Alpha Strike makes Master Yi untargetable, dodging Locke's Purgatory. Untargetable for ?; Purgatory takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Locke R Purgatory)
- **0.11** cleanse: Highlander cleanses Locke's Purgatory (slow) after it lands. 85 s cooldown; usable while crowd controlled. (Master Yi R Highlander → Locke R Purgatory)

### 9. Lissandra (net +1.01)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Locke's Purgatory. Untargetable for 2.5 s, long enough to use ahead of Purgatory. (Lissandra R Frozen Tomb → Locke R Purgatory)
- **0.38** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Locke's Ashen Pursuit. Untargetable for 2.5 s, long enough to use ahead of Ashen Pursuit. (Lissandra R Frozen Tomb → Locke E Ashen Pursuit)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Locke's (550 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Lissandra basic attacks → Locke basic attacks)

### 10. Teemo (net +0.97)

- **0.50** blind: Blinding Dart's blind makes Locke's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Locke basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Locke's (500 vs 125 attack range). Locke closes the gap with Ashen Pursuit. (Teemo basic attacks → Locke basic attacks)
- **0.26** blind: Blinding Dart's blind makes Locke's Ashen Pursuit, an empowered attack, miss. Blind for 3 s. Ashen's Pursuit's dash:
  - Does not count as a basic attack and will not trigger any basic attack-specific interactions (e.g. on-attack effects, basic attack timer, etc) unless it is special cased to do so.
    - It is special cased to not deal damage to the primary target if Locke is blinded or if the target was under the effect of a spell that granted them dodging or blocking effects.
  - Travels a fixed distance towards the target except in cases where Locke would dash through the target and beyond his attack range. If such cases would occur, it will instead dash him to 125 units beyond their location (within attack range of the target).
  - Is disabled if Locke is affected by any immobilizing crowd control or if he is grounded.
    - He loses the bonus attack range and is also completely unable to perform the empowered attack. If he can attack a target under this circumstance, he will basic attack them normally without consuming the empowered attack.
    - For the former case, the only exceptions are berserk and taunt. These crowd control types will force Locke to perform the dash ability against the source of the disable.
  - Can dash through terrain, provided the primary target is on the other side.
    - It will however fail to cast if the target is at the very edge of Locke's attack range and is over terrain (no terrain grace).
  - Orders Locke to attack the primary target at its end.
  - Cannot be performed while Locke is disarmed, though he retains the bonus attack range. Spell shield can block either the blink damage or the dash damage, but not both. (Teemo Q Blinding Dart → Locke E Ashen Pursuit)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +1.40 | 1.40 | 0.00 |  |
| 2 | Bard | +1.10 | 1.10 | 0.00 |  |
| 3 | Fizz | +1.08 | 1.08 | 0.00 |  |
| 4 | Maokai | +1.08 | 1.08 | 0.00 |  |
| 5 | Vladimir | +1.08 | 1.08 | 0.00 |  |
| 6 | Kayle | +1.06 | 1.06 | 0.00 |  |
| 7 | Xayah | +1.05 | 1.05 | 0.00 |  |
| 8 | Master Yi | +1.02 | 1.02 | 0.00 |  |
| 9 | Lissandra | +1.01 | 1.01 | 0.00 |  |
| 10 | Teemo | +0.97 | 0.97 | 0.00 | blind (Blinding Dart) |
| 11 | Aurora | +0.96 | 0.96 | 0.00 |  |
| 12 | Fiora | +0.92 | 0.92 | 0.00 |  |
| 13 | Sivir | +0.90 | 0.90 | 0.00 |  |
| 14 | Pantheon | +0.88 | 0.88 | 0.00 |  |
| 15 | Gwen | +0.87 | 0.87 | 0.00 |  |
| 16 | Kindred | +0.82 | 0.82 | 0.00 |  |
| 17 | Zilean | +0.76 | 0.76 | 0.00 |  |
| 18 | Evelynn | +0.74 | 0.74 | 0.00 |  |
| 19 | Kayn | +0.74 | 0.74 | 0.00 |  |
| 20 | Rek'Sai | +0.74 | 0.74 | 0.00 |  |
| 21 | Shaco | +0.74 | 0.74 | 0.00 |  |
| 22 | Lulu | +0.72 | 0.72 | 0.00 |  |
| 23 | Samira | +0.71 | 0.71 | 0.00 |  |
| 24 | Camille | +0.70 | 0.70 | 0.00 |  |
| 25 | Jinx | +0.69 | 0.69 | 0.00 | dash stop (Flame Chompers!) |
| 26 | Mel | +0.67 | 0.67 | 0.00 |  |
| 27 | Zed | +0.67 | 0.67 | 0.00 |  |
| 28 | Singed | +0.66 | 0.66 | 0.00 |  |
| 29 | Viktor | +0.66 | 0.66 | 0.00 |  |
| 30 | Zac | +0.65 | 0.65 | 0.00 | dash stop (Stretching Strikes) |
| 31 | Xin Zhao | +0.64 | 0.64 | 0.00 |  |
| 32 | Hwei | +0.63 | 0.63 | 0.00 | dash stop (Grim Visage) |
| 33 | Nilah | +0.62 | 0.62 | 0.00 |  |
| 34 | Jax | +0.61 | 0.61 | 0.00 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 35 | Zaahen | +0.61 | 0.61 | 0.00 |  |
| 36 | Cassiopeia | +0.60 | 0.60 | 0.00 |  |
| 37 | Shen | +0.60 | 0.60 | 0.00 | attack block (Spirit's Refuge) |
| 38 | Ahri | +0.58 | 0.58 | 0.00 |  |
| 39 | Vex | +0.58 | 0.58 | 0.00 |  |
| 40 | Veigar | +0.57 | 0.57 | 0.00 |  |
| 41 | Braum | +0.52 | 0.52 | 0.00 |  |
| 42 | Anivia | +0.50 | 0.50 | 0.00 |  |
| 43 | Malzahar | +0.50 | 0.50 | 0.00 |  |
| 44 | Nocturne | +0.50 | 0.50 | 0.00 |  |
| 45 | Poppy | +0.50 | 0.50 | 0.00 | dash stop (Steadfast Presence) |
| 46 | Milio | +0.49 | 0.49 | 0.00 |  |
| 47 | Aphelios | +0.47 | 0.47 | 0.00 |  |
| 48 | Varus | +0.45 | 0.45 | 0.00 |  |
| 49 | Tryndamere | +0.44 | 0.44 | 0.00 |  |
| 50 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 51 | Kalista | +0.43 | 0.43 | 0.00 |  |
| 52 | Twisted Fate | +0.43 | 0.43 | 0.00 |  |
| 53 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 54 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 55 | Yasuo | +0.42 | 0.42 | 0.00 |  |
| 56 | Sona | +0.41 | 0.41 | 0.00 |  |
| 57 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 58 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 59 | Quinn | +0.38 | 0.38 | 0.00 |  |
| 60 | Rammus | +0.38 | 0.38 | 0.00 |  |
| 61 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 62 | Morgana | +0.37 | 0.37 | 0.00 |  |
| 63 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 64 | Caitlyn | +0.36 | 0.36 | 0.00 |  |
| 65 | Draven | +0.36 | 0.36 | 0.00 |  |
| 66 | Janna | +0.36 | 0.36 | 0.00 |  |
| 67 | Lucian | +0.36 | 0.36 | 0.00 |  |
| 68 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 69 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 70 | Akshan | +0.34 | 0.34 | 0.00 |  |
| 71 | Gnar | +0.33 | 0.33 | 0.00 |  |
| 72 | Corki | +0.32 | 0.32 | 0.00 |  |
| 73 | Elise | +0.32 | 0.32 | 0.00 |  |
| 74 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 75 | Miss Fortune | +0.32 | 0.32 | 0.00 |  |
| 76 | Senna | +0.32 | 0.32 | 0.00 |  |
| 77 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 78 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 79 | Jayce | +0.30 | 0.30 | 0.00 |  |
| 80 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 81 | Heimerdinger | +0.29 | 0.29 | 0.00 |  |
| 82 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 83 | Lux | +0.29 | 0.29 | 0.00 |  |
| 84 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 85 | Kled | +0.28 | 0.28 | 0.00 |  |
| 86 | Azir | +0.27 | 0.27 | 0.00 |  |
| 87 | Jhin | +0.27 | 0.27 | 0.00 |  |
| 88 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 89 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 90 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 91 | Taliyah | +0.27 | 0.27 | 0.00 |  |
| 92 | Vel'Koz | +0.27 | 0.27 | 0.00 |  |
| 93 | Warwick | +0.27 | 0.27 | 0.00 |  |
| 94 | Xerath | +0.27 | 0.27 | 0.00 |  |
| 95 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 96 | Malphite | +0.25 | 0.25 | 0.00 |  |
| 97 | Graves | +0.24 | 0.24 | 0.00 |  |
| 98 | Ryze | +0.24 | 0.24 | 0.00 |  |
| 99 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 100 | Annie | +0.22 | 0.22 | 0.00 |  |
| 101 | Aurelion Sol | +0.22 | 0.22 | 0.00 |  |
| 102 | Brand | +0.22 | 0.22 | 0.00 |  |
| 103 | Karma | +0.22 | 0.22 | 0.00 |  |
| 104 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 105 | Nami | +0.22 | 0.22 | 0.00 |  |
| 106 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 107 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 108 | Garen | +0.21 | 0.21 | 0.00 |  |
| 109 | Swain | +0.21 | 0.21 | 0.00 |  |
| 110 | Fiddlesticks | +0.20 | 0.20 | 0.00 |  |
| 111 | Nunu & Willump | +0.20 | 0.20 | 0.00 |  |
| 112 | Udyr | +0.20 | 0.20 | 0.00 |  |
| 113 | Ivern | +0.19 | 0.19 | 0.00 |  |
| 114 | Karthus | +0.19 | 0.19 | 0.00 |  |
| 115 | Thresh | +0.19 | 0.19 | 0.00 |  |
| 116 | Yone | +0.19 | 0.19 | 0.00 |  |
| 117 | Amumu | +0.18 | 0.18 | 0.00 |  |
| 118 | Katarina | +0.18 | 0.18 | 0.00 |  |
| 119 | Olaf | +0.17 | 0.17 | 0.00 |  |
| 120 | Sion | +0.17 | 0.17 | 0.00 |  |
| 121 | Rengar | +0.15 | 0.15 | 0.00 |  |
| 122 | Urgot | +0.15 | 0.15 | 0.00 |  |
| 123 | Gangplank | +0.14 | 0.14 | 0.00 |  |
| 124 | Alistar | +0.13 | 0.13 | 0.00 |  |
| 125 | Rakan | +0.13 | 0.13 | 0.00 |  |
| 126 | Lillia | +0.11 | 0.11 | 0.00 |  |
| 127 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 128 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 129 | Viego | +0.09 | 0.09 | 0.00 |  |
| 130 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 131 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 132 | Akali | 0.00 | 0.00 | 0.00 |  |
| 133 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 134 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 135 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 136 | Briar | 0.00 | 0.00 | 0.00 |  |
| 137 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 138 | Darius | 0.00 | 0.00 | 0.00 |  |
| 139 | Diana | 0.00 | 0.00 | 0.00 |  |
| 140 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 141 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 142 | Galio | 0.00 | 0.00 | 0.00 |  |
| 143 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 144 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 145 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 146 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 147 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 148 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 149 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 150 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 151 | Leona | 0.00 | 0.00 | 0.00 |  |
| 152 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 153 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 154 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 155 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 156 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 157 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 158 | Rell | 0.00 | 0.00 | 0.00 |  |
| 159 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 160 | Riven | 0.00 | 0.00 | 0.00 |  |
| 161 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 162 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 163 | Sett | 0.00 | 0.00 | 0.00 |  |
| 164 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 165 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 166 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 167 | Talon | 0.00 | 0.00 | 0.00 |  |
| 168 | Taric | 0.00 | 0.00 | 0.00 |  |
| 169 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 170 | Vi | 0.00 | 0.00 | 0.00 |  |
| 171 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 172 | Yorick | 0.00 | 0.00 | 0.00 |  |
