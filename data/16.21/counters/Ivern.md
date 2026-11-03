# Counters to Ivern (patch 26.21)

Every champion ranked by what its kit does against Ivern's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ivern's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ivern` for the full ledger of a matchup, with sources.

## Top 10

### 1. Braum (net +1.03)

- **0.85** projectile block: Unbreakable blocks Ivern's Rootcaller, a projectile. Unbreakable for 4 s, long enough to use ahead of Rootcaller. (Braum E Unbreakable → Ivern Q Rootcaller)
- **0.31** projectile block: Unbreakable blocks Ivern's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Ivern basic attacks)
- **0.15** interrupt: Concussive Blows's stun interrupts Ivern's Friend of the Forest (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 350 units farther than Braum's (475 vs 125 attack range).

### 2. Yuumi (net +0.99)

- **0.85** untargetable: You and Me! makes Yuumi untargetable, dodging Ivern's Rootcaller. Untargetable for ?; Rootcaller takes 1.17 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ivern Q Rootcaller)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Ivern's Triggerseed. Untargetable for ?; Triggerseed lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ivern E Triggerseed)

### 3. Fizz (net +0.97)

- **0.85** untargetable: Playful makes Fizz untargetable, dodging Ivern's Rootcaller. Untargetable for 0.75 s; Rootcaller takes 1.17 s to land, enough to react. (Fizz E Playful → Ivern Q Rootcaller)
- **0.25** untargetable: Playful makes Fizz untargetable, dodging Ivern's Triggerseed. Untargetable for 0.75 s; Triggerseed lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Ivern E Triggerseed)
- **0.07** interrupt: Chum the Waters's airborne interrupts Ivern's Friend of the Forest (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 300 units farther than Fizz's (475 vs 175 attack range).

### 4. Maokai (net +0.92)

- **0.85** untargetable: Twisted Advance makes Maokai untargetable, dodging Ivern's Rootcaller. Untargetable for 1.4 s; Rootcaller takes 1.17 s to land, enough to react. (Maokai W Twisted Advance → Ivern Q Rootcaller)
- **0.22** untargetable: Twisted Advance makes Maokai untargetable, dodging Ivern's Triggerseed. Untargetable for 1.4 s; Triggerseed lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Ivern E Triggerseed)
- **0.15** interrupt: Bramble Smash's airborne interrupts Ivern's Friend of the Forest (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 350 units farther than Maokai's (475 vs 125 attack range).

### 5. Nocturne (net +0.89)

- **0.77** spell shield: Shroud of Darkness's spell shield blocks Ivern's Rootcaller. Spell shield for 1.5 s, long enough to use ahead of Rootcaller. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ivern Q Rootcaller)
- **0.34** spell shield: Shroud of Darkness's spell shield blocks Ivern's Triggerseed. Spell shield for 1.5 s, long enough to use ahead of Triggerseed. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ivern E Triggerseed)
- **0.14** interrupt: Unspeakable Horror's fear interrupts Ivern's Friend of the Forest (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 350 units farther than Nocturne's (475 vs 125 attack range).

### 6. Yasuo (net +0.89)

- **0.64** projectile block: Wind Wall blocks Ivern's Rootcaller, a projectile. Wind Wall for 4 s, long enough to use ahead of Rootcaller. (Yasuo W Wind Wall → Ivern Q Rootcaller)
- **0.24** projectile block: Wind Wall blocks Ivern's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Ivern basic attacks)
- **0.15** interrupt: Steel Tempest's airborne interrupts Ivern's Friend of the Forest (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Ivern I Friend of the Forest)
- Watch out: Ivern's basic attacks reach 300 units farther than Yasuo's (475 vs 175 attack range).

### 7. Malzahar (net +0.85)

- **0.43** cc immunity: Void Shift makes Malzahar immune to Ivern's Rootcaller (root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Ivern Q Rootcaller)
- **0.20** dash stop: Nether Grasp's knockdown can stop Ivern's Rootcaller mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Ivern Q Rootcaller)
- **0.15** interrupt: Call of the Void's silence interrupts Ivern's Friend of the Forest (normal channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Ivern I Friend of the Forest)

### 8. Vladimir (net +0.81)

- **0.66** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ivern's Rootcaller. Untargetable for 2 s, long enough to use ahead of Rootcaller. (Vladimir W Sanguine Pool → Ivern Q Rootcaller)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ivern's Triggerseed. Untargetable for 2 s, long enough to use ahead of Triggerseed. (Vladimir W Sanguine Pool → Ivern E Triggerseed)

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
| 1 | Braum | +1.03 | 1.22 | 0.19 | projectile block (Unbreakable) |
| 2 | Yuumi | +0.99 | 0.99 | 0.00 |  |
| 3 | Fizz | +0.97 | 1.05 | 0.08 |  |
| 4 | Maokai | +0.92 | 1.11 | 0.19 |  |
| 5 | Nocturne | +0.89 | 1.08 | 0.19 |  |
| 6 | Yasuo | +0.89 | 1.00 | 0.11 | projectile block (Wind Wall) |
| 7 | Malzahar | +0.85 | 0.85 | 0.00 |  |
| 8 | Vladimir | +0.81 | 0.81 | 0.00 |  |
| 9 | Udyr | +0.76 | 0.95 | 0.19 |  |
| 10 | Sivir | +0.76 | 0.76 | 0.00 |  |
| 11 | Morgana | +0.70 | 0.70 | 0.00 |  |
| 12 | Fiora | +0.68 | 0.86 | 0.18 |  |
| 13 | Mel | +0.68 | 0.68 | 0.00 | projectile block (Rebuttal) |
| 14 | Samira | +0.66 | 0.66 | 0.00 | projectile block (Blade Whirl) |
| 15 | Master Yi | +0.62 | 0.78 | 0.16 |  |
| 16 | Zaahen | +0.60 | 0.71 | 0.11 |  |
| 17 | Lissandra | +0.60 | 0.60 | 0.00 |  |
| 18 | Milio | +0.58 | 0.58 | 0.00 |  |
| 19 | Zac | +0.57 | 0.73 | 0.16 | dash stop (Stretching Strikes) |
| 20 | Rell | +0.56 | 0.67 | 0.11 |  |
| 21 | Warwick | +0.55 | 0.68 | 0.13 |  |
| 22 | Hwei | +0.55 | 0.55 | 0.00 | dash stop (Grim Visage) |
| 23 | Rek'Sai | +0.54 | 0.65 | 0.11 |  |
| 24 | Gwen | +0.53 | 0.71 | 0.18 |  |
| 25 | Camille | +0.53 | 0.63 | 0.10 |  |
| 26 | Kled | +0.52 | 0.58 | 0.06 |  |
| 27 | Bard | +0.52 | 0.52 | 0.00 |  |
| 28 | Viktor | +0.51 | 0.51 | 0.00 |  |
| 29 | Kayn | +0.50 | 0.61 | 0.11 |  |
| 30 | Aurora | +0.50 | 0.50 | 0.00 |  |
| 31 | Ahri | +0.49 | 0.49 | 0.00 |  |
| 32 | Xayah | +0.49 | 0.49 | 0.00 |  |
| 33 | Evelynn | +0.47 | 0.60 | 0.13 |  |
| 34 | Alistar | +0.45 | 0.64 | 0.19 |  |
| 35 | Shaco | +0.45 | 0.58 | 0.13 |  |
| 36 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 37 | Vex | +0.44 | 0.44 | 0.00 |  |
| 38 | Jinx | +0.43 | 0.43 | 0.00 | dash stop (Flame Chompers!) |
| 39 | Lulu | +0.41 | 0.41 | 0.00 |  |
| 40 | Kayle | +0.39 | 0.39 | 0.00 |  |
| 41 | Heimerdinger | +0.37 | 0.37 | 0.00 |  |
| 42 | Poppy | +0.36 | 0.55 | 0.19 | dash stop (Steadfast Presence) |
| 43 | Kalista | +0.36 | 0.36 | 0.00 |  |
| 44 | Rengar | +0.34 | 0.72 | 0.38 |  |
| 45 | Taliyah | +0.34 | 0.34 | 0.00 |  |
| 46 | Anivia | +0.33 | 0.33 | 0.00 |  |
| 47 | Rammus | +0.32 | 0.51 | 0.19 |  |
| 48 | Zed | +0.32 | 0.45 | 0.13 |  |
| 49 | Yone | +0.31 | 0.39 | 0.08 |  |
| 50 | Cassiopeia | +0.31 | 0.31 | 0.00 |  |
| 51 | Sion | +0.30 | 0.63 | 0.33 |  |
| 52 | Thresh | +0.30 | 0.30 | 0.00 |  |
| 53 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 54 | K'Sante | +0.28 | 0.37 | 0.09 |  |
| 55 | Fiddlesticks | +0.28 | 0.28 | 0.00 |  |
| 56 | Pantheon | +0.27 | 0.38 | 0.11 |  |
| 57 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 58 | Xin Zhao | +0.26 | 0.42 | 0.16 |  |
| 59 | Aurelion Sol | +0.26 | 0.26 | 0.00 |  |
| 60 | Janna | +0.26 | 0.26 | 0.00 |  |
| 61 | Nami | +0.26 | 0.26 | 0.00 |  |
| 62 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 63 | Shen | +0.24 | 0.37 | 0.13 |  |
| 64 | Gnar | +0.24 | 0.24 | 0.00 |  |
| 65 | Annie | +0.23 | 0.23 | 0.00 |  |
| 66 | Galio | +0.22 | 0.34 | 0.12 |  |
| 67 | Vayne | +0.22 | 0.22 | 0.00 |  |
| 68 | Gangplank | +0.21 | 0.59 | 0.38 |  |
| 69 | Tahm Kench | +0.21 | 0.37 | 0.16 |  |
| 70 | Draven | +0.21 | 0.21 | 0.00 |  |
| 71 | Elise | +0.21 | 0.21 | 0.00 |  |
| 72 | Seraphine | +0.21 | 0.21 | 0.00 |  |
| 73 | Zilean | +0.21 | 0.21 | 0.00 |  |
| 74 | Kennen | +0.20 | 0.20 | 0.00 |  |
| 75 | Amumu | +0.19 | 0.38 | 0.19 |  |
| 76 | Ashe | +0.19 | 0.19 | 0.00 |  |
| 77 | Brand | +0.19 | 0.19 | 0.00 |  |
| 78 | Ziggs | +0.19 | 0.19 | 0.00 |  |
| 79 | Sejuani | +0.18 | 0.36 | 0.18 |  |
| 80 | Zoe | +0.18 | 0.18 | 0.00 |  |
| 81 | Pyke | +0.17 | 0.29 | 0.12 |  |
| 82 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 83 | Rakan | +0.16 | 0.22 | 0.06 |  |
| 84 | Caitlyn | +0.16 | 0.16 | 0.00 |  |
| 85 | Syndra | +0.16 | 0.16 | 0.00 |  |
| 86 | Riven | +0.15 | 0.28 | 0.13 |  |
| 87 | Jayce | +0.15 | 0.15 | 0.00 |  |
| 88 | Quinn | +0.15 | 0.15 | 0.00 |  |
| 89 | Sona | +0.15 | 0.15 | 0.00 |  |
| 90 | Swain | +0.15 | 0.15 | 0.00 |  |
| 91 | Twisted Fate | +0.15 | 0.15 | 0.00 |  |
| 92 | Vel'Koz | +0.15 | 0.15 | 0.00 |  |
| 93 | Viego | +0.14 | 0.22 | 0.08 |  |
| 94 | Xerath | +0.14 | 0.14 | 0.00 |  |
| 95 | Nilah | +0.13 | 0.27 | 0.14 |  |
| 96 | Zyra | +0.13 | 0.13 | 0.00 |  |
| 97 | Jax | +0.12 | 0.31 | 0.19 |  |
| 98 | Urgot | +0.12 | 0.19 | 0.07 |  |
| 99 | Aphelios | +0.12 | 0.12 | 0.00 |  |
| 100 | Ornn | +0.11 | 0.22 | 0.11 |  |
| 101 | Neeko | +0.11 | 0.11 | 0.00 |  |
| 102 | Garen | +0.10 | 0.43 | 0.33 |  |
| 103 | Senna | +0.10 | 0.10 | 0.00 |  |
| 104 | Vi | +0.09 | 0.22 | 0.13 |  |
| 105 | Yunara | +0.09 | 0.09 | 0.00 |  |
| 106 | Twitch | +0.08 | 0.08 | 0.00 |  |
| 107 | Zeri | +0.08 | 0.08 | 0.00 |  |
| 108 | Sylas | +0.07 | 0.15 | 0.08 |  |
| 109 | Azir | +0.07 | 0.07 | 0.00 |  |
| 110 | Orianna | +0.07 | 0.07 | 0.00 |  |
| 111 | Varus | +0.07 | 0.07 | 0.00 |  |
| 112 | Corki | +0.06 | 0.06 | 0.00 |  |
| 113 | Ezreal | +0.06 | 0.06 | 0.00 |  |
| 114 | Miss Fortune | +0.06 | 0.06 | 0.00 |  |
| 115 | Smolder | +0.06 | 0.06 | 0.00 |  |
| 116 | Olaf | +0.05 | 0.43 | 0.38 |  |
| 117 | Jhin | +0.05 | 0.05 | 0.00 |  |
| 118 | Lux | +0.05 | 0.05 | 0.00 |  |
| 119 | Leona | +0.04 | 0.23 | 0.19 |  |
| 120 | Ryze | +0.04 | 0.04 | 0.00 |  |
| 121 | Sett | +0.03 | 0.22 | 0.19 |  |
| 122 | Bel'Veth | +0.03 | 0.15 | 0.12 |  |
| 123 | Volibear | +0.03 | 0.15 | 0.12 |  |
| 124 | Gragas | +0.02 | 0.21 | 0.19 |  |
| 125 | Malphite | +0.02 | 0.21 | 0.19 |  |
| 126 | Blitzcrank | 0.00 | 0.38 | 0.38 |  |
| 127 | Irelia | 0.00 | 0.15 | 0.15 |  |
| 128 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 129 | Graves | 0.00 | 0.00 | 0.00 |  |
| 130 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 131 | Karma | 0.00 | 0.00 | 0.00 |  |
| 132 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 133 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 134 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 135 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 136 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 137 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 138 | Aatrox | -0.01 | 0.15 | 0.16 |  |
| 139 | Jarvan IV | -0.01 | 0.07 | 0.08 |  |
| 140 | Lillia | -0.01 | 0.07 | 0.08 |  |
| 141 | Singed | -0.02 | 0.36 | 0.38 |  |
| 142 | Kassadin | -0.03 | 0.15 | 0.18 |  |
| 143 | Shyvana | -0.03 | 0.15 | 0.18 |  |
| 144 | Briar | -0.03 | 0.07 | 0.10 |  |
| 145 | Renekton | -0.04 | 0.15 | 0.19 |  |
| 146 | Hecarim | -0.04 | 0.07 | 0.11 |  |
| 147 | Wukong | -0.04 | 0.07 | 0.11 |  |
| 148 | Lee Sin | -0.05 | 0.08 | 0.13 |  |
| 149 | Qiyana | -0.05 | 0.07 | 0.12 |  |
| 150 | Ambessa | -0.06 | 0.07 | 0.13 |  |
| 151 | Cho'Gath | -0.08 | 0.30 | 0.38 |  |
| 152 | Nautilus | -0.09 | 0.07 | 0.16 |  |
| 153 | Naafiri | -0.10 | 0.00 | 0.10 |  |
| 154 | Diana | -0.11 | 0.07 | 0.18 |  |
| 155 | Mordekaiser | -0.13 | 0.20 | 0.33 |  |
| 156 | Akali | -0.13 | 0.00 | 0.13 |  |
| 157 | Ekko | -0.13 | 0.00 | 0.13 |  |
| 158 | Talon | -0.13 | 0.00 | 0.13 |  |
| 159 | Nasus | -0.16 | 0.22 | 0.38 |  |
| 160 | Tryndamere | -0.16 | 0.00 | 0.16 |  |
| 161 | Yorick | -0.19 | 0.14 | 0.33 |  |
| 162 | Illaoi | -0.19 | 0.00 | 0.19 |  |
| 163 | Katarina | -0.19 | 0.00 | 0.19 |  |
| 164 | Kha'Zix | -0.19 | 0.00 | 0.19 |  |
| 165 | Locke | -0.19 | 0.00 | 0.19 |  |
| 166 | Nunu & Willump | -0.20 | 0.18 | 0.38 |  |
| 167 | Darius | -0.21 | 0.12 | 0.33 |  |
| 168 | Trundle | -0.21 | 0.12 | 0.33 |  |
| 169 | Taric | -0.22 | 0.14 | 0.36 |  |
| 170 | Skarner | -0.23 | 0.13 | 0.36 |  |
| 171 | Dr. Mundo | -0.38 | 0.00 | 0.38 |  |
| 172 | Rumble | -0.38 | 0.00 | 0.38 |  |
