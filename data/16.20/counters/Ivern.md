# Counters to Ivern (patch 26.20)

Every champion ranked by what its kit does against Ivern's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ivern's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ivern` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +0.99)

- **0.85** untargetable: You and Me! makes Yuumi untargetable, dodging Ivern's Rootcaller. Untargetable for ?; Rootcaller takes 1.17 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ivern Q Rootcaller)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Ivern's Triggerseed. Untargetable for ?; Triggerseed lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ivern E Triggerseed)

### 2. Braum (net +0.96)

- **0.85** projectile block: Unbreakable blocks Ivern's Rootcaller, a projectile. Unbreakable for 4 s, long enough to use ahead of Rootcaller. (Braum E Unbreakable → Ivern Q Rootcaller)
- **0.31** projectile block: Unbreakable blocks Ivern's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Ivern basic attacks)
- **0.15** interrupt: Concussive Blows's stun interrupts Ivern's Friend of the Forest (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 350 units farther than Braum's (475 vs 125 attack range).

### 3. Maokai (net +0.92)

- **0.85** untargetable: Twisted Advance makes Maokai untargetable, dodging Ivern's Rootcaller. Untargetable for 1.4 s; Rootcaller takes 1.17 s to land, enough to react. (Maokai W Twisted Advance → Ivern Q Rootcaller)
- **0.22** untargetable: Twisted Advance makes Maokai untargetable, dodging Ivern's Triggerseed. Untargetable for 1.4 s; Triggerseed lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Ivern E Triggerseed)
- **0.15** interrupt: Bramble Smash's airborne interrupts Ivern's Friend of the Forest (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 350 units farther than Maokai's (475 vs 125 attack range).

### 4. Elise (net +0.92)

- **0.62** untargetable: Rappel makes Elise untargetable, dodging Ivern's Rootcaller. Untargetable for 0.6 s; Rootcaller takes 1.17 s to land, enough to react. (Elise E Rappel → Ivern Q Rootcaller)
- **0.17** untargetable: Rappel makes Elise untargetable, dodging Ivern's Triggerseed. Untargetable for 0.6 s; Triggerseed lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Ivern E Triggerseed)
- **0.15** interrupt: Cocoon's stun interrupts Ivern's Friend of the Forest (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Ivern I Friend of the Forest)

### 5. Nocturne (net +0.89)

- **0.77** spell shield: Shroud of Darkness's spell shield blocks Ivern's Rootcaller. Spell shield for 1.5 s, long enough to use ahead of Rootcaller. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ivern Q Rootcaller)
- **0.34** spell shield: Shroud of Darkness's spell shield blocks Ivern's Triggerseed. Spell shield for 1.5 s, long enough to use ahead of Triggerseed. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ivern E Triggerseed)
- **0.14** interrupt: Unspeakable Horror's fear interrupts Ivern's Friend of the Forest (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 350 units farther than Nocturne's (475 vs 125 attack range).

### 6. Malzahar (net +0.81)

- **0.43** cc immunity: Void Shift makes Malzahar immune to Ivern's Rootcaller (root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Ivern Q Rootcaller)
- **0.20** dash stop: Nether Grasp's knockdown can stop Ivern's Rootcaller mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Ivern Q Rootcaller)
- **0.15** interrupt: Call of the Void's silence interrupts Ivern's Friend of the Forest (normal channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Ivern I Friend of the Forest)

### 7. Vladimir (net +0.81)

- **0.66** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ivern's Rootcaller. Untargetable for 2 s, long enough to use ahead of Rootcaller. (Vladimir W Sanguine Pool → Ivern Q Rootcaller)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ivern's Triggerseed. Untargetable for 2 s, long enough to use ahead of Triggerseed. (Vladimir W Sanguine Pool → Ivern E Triggerseed)

### 8. Yasuo (net +0.80)

- **0.64** projectile block: Wind Wall blocks Ivern's Rootcaller, a projectile. Wind Wall for 4 s, long enough to use ahead of Rootcaller. (Yasuo W Wind Wall → Ivern Q Rootcaller)
- **0.24** projectile block: Wind Wall blocks Ivern's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Ivern basic attacks)
- **0.15** interrupt: Steel Tempest's airborne interrupts Ivern's Friend of the Forest (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 300 units farther than Yasuo's (475 vs 175 attack range).

### 9. Udyr (net +0.76)

- **0.85** cc immunity: Blazing Stampede makes Udyr immune to Ivern's Rootcaller (root). Immune for 1.5 s, long enough to use ahead of Rootcaller. (Udyr E Blazing Stampede → Ivern Q Rootcaller)
- **0.15** interrupt: Blazing Stampede's stun interrupts Ivern's Friend of the Forest (normal channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Ivern I Friend of the Forest)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Ivern's Triggerseed (slow). Immune for 1.5 s, long enough to use ahead of Triggerseed. (Udyr E Blazing Stampede → Ivern E Triggerseed)
- Watch out: Ivern's basic attacks reach 350 units farther than Udyr's (475 vs 125 attack range).

### 10. Sivir (net +0.76)

- **0.62** spell shield: Spell Shield's spell shield blocks Ivern's Rootcaller. Spell shield for 1.5 s, long enough to use ahead of Rootcaller. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ivern Q Rootcaller)
- **0.28** spell shield: Spell Shield's spell shield blocks Ivern's Triggerseed. Spell shield for 1.5 s, long enough to use ahead of Triggerseed. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ivern E Triggerseed)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.99 | 0.99 | 0.00 |  |
| 2 | Braum | +0.96 | 1.15 | 0.19 | projectile block (Unbreakable) |
| 3 | Maokai | +0.92 | 1.11 | 0.19 |  |
| 4 | Elise | +0.92 | 0.92 | 0.00 |  |
| 5 | Nocturne | +0.89 | 1.08 | 0.19 |  |
| 6 | Malzahar | +0.81 | 0.81 | 0.00 |  |
| 7 | Vladimir | +0.81 | 0.81 | 0.00 |  |
| 8 | Yasuo | +0.80 | 0.91 | 0.11 | projectile block (Wind Wall) |
| 9 | Udyr | +0.76 | 0.95 | 0.19 |  |
| 10 | Sivir | +0.76 | 0.76 | 0.00 |  |
| 11 | Morgana | +0.70 | 0.70 | 0.00 |  |
| 12 | Fiora | +0.68 | 0.86 | 0.18 |  |
| 13 | Mel | +0.68 | 0.68 | 0.00 | projectile block (Rebuttal) |
| 14 | Samira | +0.66 | 0.66 | 0.00 | projectile block (Blade Whirl) |
| 15 | Master Yi | +0.62 | 0.78 | 0.16 |  |
| 16 | Lissandra | +0.60 | 0.60 | 0.00 |  |
| 17 | Milio | +0.58 | 0.58 | 0.00 |  |
| 18 | Hwei | +0.55 | 0.55 | 0.00 | dash stop (Grim Visage) |
| 19 | Rek'Sai | +0.54 | 0.65 | 0.11 |  |
| 20 | Gwen | +0.53 | 0.71 | 0.18 |  |
| 21 | Warwick | +0.53 | 0.66 | 0.13 |  |
| 22 | Bard | +0.52 | 0.52 | 0.00 |  |
| 23 | Camille | +0.51 | 0.61 | 0.10 |  |
| 24 | Kayn | +0.50 | 0.61 | 0.11 |  |
| 25 | Kled | +0.50 | 0.56 | 0.06 |  |
| 26 | Aurora | +0.50 | 0.50 | 0.00 |  |
| 27 | Ahri | +0.49 | 0.49 | 0.00 |  |
| 28 | Xayah | +0.49 | 0.49 | 0.00 |  |
| 29 | Evelynn | +0.47 | 0.60 | 0.13 |  |
| 30 | Zaahen | +0.46 | 0.57 | 0.11 |  |
| 31 | Shaco | +0.45 | 0.58 | 0.13 |  |
| 32 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 33 | Vex | +0.44 | 0.44 | 0.00 |  |
| 34 | Viktor | +0.44 | 0.44 | 0.00 |  |
| 35 | Jinx | +0.43 | 0.43 | 0.00 | dash stop (Flame Chompers!) |
| 36 | Zac | +0.42 | 0.58 | 0.16 | dash stop (Stretching Strikes) |
| 37 | Kayle | +0.39 | 0.39 | 0.00 |  |
| 38 | Ekko | +0.38 | 0.51 | 0.13 |  |
| 39 | Poppy | +0.36 | 0.55 | 0.19 | dash stop (Steadfast Presence) |
| 40 | Kalista | +0.36 | 0.36 | 0.00 |  |
| 41 | Lulu | +0.35 | 0.35 | 0.00 |  |
| 42 | Rengar | +0.34 | 0.72 | 0.38 |  |
| 43 | Zed | +0.32 | 0.45 | 0.13 |  |
| 44 | Cassiopeia | +0.31 | 0.31 | 0.00 |  |
| 45 | Alistar | +0.30 | 0.49 | 0.19 |  |
| 46 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 47 | Sion | +0.28 | 0.61 | 0.33 |  |
| 48 | Pantheon | +0.27 | 0.38 | 0.11 |  |
| 49 | Yone | +0.27 | 0.35 | 0.08 |  |
| 50 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 51 | Xin Zhao | +0.24 | 0.40 | 0.16 |  |
| 52 | Shen | +0.24 | 0.37 | 0.13 |  |
| 53 | Annie | +0.23 | 0.23 | 0.00 |  |
| 54 | Heimerdinger | +0.23 | 0.23 | 0.00 |  |
| 55 | Anivia | +0.22 | 0.22 | 0.00 |  |
| 56 | Kindred | +0.22 | 0.22 | 0.00 |  |
| 57 | Vayne | +0.22 | 0.22 | 0.00 |  |
| 58 | Gangplank | +0.21 | 0.59 | 0.38 |  |
| 59 | Corki | +0.21 | 0.21 | 0.00 |  |
| 60 | Draven | +0.21 | 0.21 | 0.00 |  |
| 61 | Zilean | +0.21 | 0.21 | 0.00 |  |
| 62 | Kennen | +0.20 | 0.20 | 0.00 |  |
| 63 | Ashe | +0.19 | 0.19 | 0.00 |  |
| 64 | Brand | +0.19 | 0.19 | 0.00 |  |
| 65 | Janna | +0.19 | 0.19 | 0.00 |  |
| 66 | Nami | +0.19 | 0.19 | 0.00 |  |
| 67 | Renata Glasc | +0.19 | 0.19 | 0.00 |  |
| 68 | Ziggs | +0.19 | 0.19 | 0.00 |  |
| 69 | Zoe | +0.18 | 0.18 | 0.00 |  |
| 70 | Rammus | +0.17 | 0.36 | 0.19 |  |
| 71 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 72 | Caitlyn | +0.16 | 0.16 | 0.00 |  |
| 73 | Syndra | +0.16 | 0.16 | 0.00 |  |
| 74 | Amumu | +0.15 | 0.34 | 0.19 |  |
| 75 | Fiddlesticks | +0.15 | 0.15 | 0.00 |  |
| 76 | Jayce | +0.15 | 0.15 | 0.00 |  |
| 77 | Quinn | +0.15 | 0.15 | 0.00 |  |
| 78 | Sona | +0.15 | 0.15 | 0.00 |  |
| 79 | Swain | +0.15 | 0.15 | 0.00 |  |
| 80 | Thresh | +0.15 | 0.15 | 0.00 |  |
| 81 | Twisted Fate | +0.15 | 0.15 | 0.00 |  |
| 82 | Vel'Koz | +0.15 | 0.15 | 0.00 |  |
| 83 | Seraphine | +0.14 | 0.14 | 0.00 |  |
| 84 | Xerath | +0.14 | 0.14 | 0.00 |  |
| 85 | Nilah | +0.13 | 0.27 | 0.14 |  |
| 86 | Zyra | +0.13 | 0.13 | 0.00 |  |
| 87 | Jax | +0.12 | 0.31 | 0.19 |  |
| 88 | Aphelios | +0.12 | 0.12 | 0.00 |  |
| 89 | Taliyah | +0.12 | 0.12 | 0.00 |  |
| 90 | Aurelion Sol | +0.11 | 0.11 | 0.00 |  |
| 91 | Neeko | +0.11 | 0.11 | 0.00 |  |
| 92 | Garen | +0.10 | 0.43 | 0.33 |  |
| 93 | Senna | +0.10 | 0.10 | 0.00 |  |
| 94 | Gnar | +0.09 | 0.09 | 0.00 |  |
| 95 | Yunara | +0.09 | 0.09 | 0.00 |  |
| 96 | Twitch | +0.08 | 0.08 | 0.00 |  |
| 97 | Zeri | +0.08 | 0.08 | 0.00 |  |
| 98 | Sylas | +0.07 | 0.15 | 0.08 |  |
| 99 | Azir | +0.07 | 0.07 | 0.00 |  |
| 100 | Orianna | +0.07 | 0.07 | 0.00 |  |
| 101 | Varus | +0.07 | 0.07 | 0.00 |  |
| 102 | K'Sante | +0.06 | 0.15 | 0.09 |  |
| 103 | Ezreal | +0.06 | 0.06 | 0.00 |  |
| 104 | Miss Fortune | +0.06 | 0.06 | 0.00 |  |
| 105 | Smolder | +0.06 | 0.06 | 0.00 |  |
| 106 | Olaf | +0.05 | 0.43 | 0.38 |  |
| 107 | Urgot | +0.05 | 0.12 | 0.07 |  |
| 108 | Jhin | +0.05 | 0.05 | 0.00 |  |
| 109 | Lux | +0.05 | 0.05 | 0.00 |  |
| 110 | Ornn | +0.04 | 0.15 | 0.11 |  |
| 111 | Rell | +0.04 | 0.15 | 0.11 |  |
| 112 | Ryze | +0.04 | 0.04 | 0.00 |  |
| 113 | Bel'Veth | +0.03 | 0.15 | 0.12 |  |
| 114 | Galio | +0.03 | 0.15 | 0.12 |  |
| 115 | Volibear | +0.03 | 0.15 | 0.12 |  |
| 116 | Taric | +0.02 | 0.38 | 0.36 |  |
| 117 | Malphite | +0.02 | 0.21 | 0.19 |  |
| 118 | Vi | +0.02 | 0.15 | 0.13 |  |
| 119 | Pyke | +0.02 | 0.14 | 0.12 |  |
| 120 | Rakan | +0.01 | 0.07 | 0.06 |  |
| 121 | Irelia | 0.00 | 0.15 | 0.15 |  |
| 122 | Riven | 0.00 | 0.13 | 0.13 |  |
| 123 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 124 | Graves | 0.00 | 0.00 | 0.00 |  |
| 125 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 126 | Karma | 0.00 | 0.00 | 0.00 |  |
| 127 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 128 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 129 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 130 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 131 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 132 | Aatrox | -0.01 | 0.15 | 0.16 |  |
| 133 | Tahm Kench | -0.01 | 0.15 | 0.16 |  |
| 134 | Fizz | -0.01 | 0.07 | 0.08 |  |
| 135 | Jarvan IV | -0.01 | 0.07 | 0.08 |  |
| 136 | Lillia | -0.01 | 0.07 | 0.08 |  |
| 137 | Viego | -0.01 | 0.07 | 0.08 |  |
| 138 | Singed | -0.02 | 0.36 | 0.38 |  |
| 139 | Kassadin | -0.03 | 0.15 | 0.18 |  |
| 140 | Sejuani | -0.03 | 0.15 | 0.18 |  |
| 141 | Shyvana | -0.03 | 0.15 | 0.18 |  |
| 142 | Briar | -0.03 | 0.07 | 0.10 |  |
| 143 | Leona | -0.04 | 0.15 | 0.19 |  |
| 144 | Renekton | -0.04 | 0.15 | 0.19 |  |
| 145 | Sett | -0.04 | 0.15 | 0.19 |  |
| 146 | Hecarim | -0.04 | 0.07 | 0.11 |  |
| 147 | Wukong | -0.04 | 0.07 | 0.11 |  |
| 148 | Gragas | -0.05 | 0.14 | 0.19 |  |
| 149 | Lee Sin | -0.05 | 0.08 | 0.13 |  |
| 150 | Qiyana | -0.05 | 0.07 | 0.12 |  |
| 151 | Ambessa | -0.06 | 0.07 | 0.13 |  |
| 152 | Nautilus | -0.09 | 0.07 | 0.16 |  |
| 153 | Naafiri | -0.10 | 0.00 | 0.10 |  |
| 154 | Diana | -0.11 | 0.07 | 0.18 |  |
| 155 | Mordekaiser | -0.13 | 0.20 | 0.33 |  |
| 156 | Akali | -0.13 | 0.00 | 0.13 |  |
| 157 | Talon | -0.13 | 0.00 | 0.13 |  |
| 158 | Nasus | -0.16 | 0.22 | 0.38 |  |
| 159 | Tryndamere | -0.16 | 0.00 | 0.16 |  |
| 160 | Yorick | -0.19 | 0.14 | 0.33 |  |
| 161 | Illaoi | -0.19 | 0.00 | 0.19 |  |
| 162 | Katarina | -0.19 | 0.00 | 0.19 |  |
| 163 | Kha'Zix | -0.19 | 0.00 | 0.19 |  |
| 164 | Locke | -0.19 | 0.00 | 0.19 |  |
| 165 | Nunu & Willump | -0.20 | 0.18 | 0.38 |  |
| 166 | Darius | -0.21 | 0.12 | 0.33 |  |
| 167 | Trundle | -0.21 | 0.12 | 0.33 |  |
| 168 | Blitzcrank | -0.23 | 0.15 | 0.38 |  |
| 169 | Cho'Gath | -0.23 | 0.15 | 0.38 |  |
| 170 | Skarner | -0.23 | 0.13 | 0.36 |  |
| 171 | Dr. Mundo | -0.38 | 0.00 | 0.38 |  |
| 172 | Rumble | -0.38 | 0.00 | 0.38 |  |
