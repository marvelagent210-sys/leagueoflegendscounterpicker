# Counters to Alistar (patch 26.20)

Every champion ranked by what its kit does against Alistar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Alistar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Alistar` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.38)

- **0.59** spell shield: Spell Shield's spell shield blocks Alistar's Headbutt. Spell shield for 1.5 s, long enough to use ahead of Headbutt. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Alistar W Headbutt)
- **0.51** spell shield: Spell Shield's spell shield blocks Alistar's Pulverize. Spell shield for 1.5 s, long enough to use ahead of Pulverize. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Alistar Q Pulverize)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Alistar's (500 vs 125 attack range). Alistar closes the gap with Headbutt. (Sivir basic attacks → Alistar basic attacks)

### 2. Vladimir (net +1.05)

- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Alistar's Headbutt. Untargetable for 2 s, long enough to use ahead of Headbutt. (Vladimir W Sanguine Pool → Alistar W Headbutt)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Alistar's Trample. Untargetable for 2 s, long enough to use ahead of Trample. (Vladimir W Sanguine Pool → Alistar E Trample)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Alistar's Pulverize. Untargetable for 2 s, long enough to use ahead of Pulverize. (Vladimir W Sanguine Pool → Alistar Q Pulverize)
- Watch out: Trample's stun interrupts Vladimir's Tides of Blood (charge-up).

### 3. Yuumi (net +1.04)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Alistar's Headbutt. Untargetable for ?; Headbutt takes 0.54 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Alistar W Headbutt)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Alistar's Pulverize. Untargetable for ?; Pulverize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Alistar Q Pulverize)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Alistar's Trample. Untargetable for ?; Trample lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Alistar E Trample)
- Watch out: Trample's stun interrupts Yuumi's Final Chapter (normal channel).

### 4. Elise (net +0.97)

- **0.59** untargetable: Rappel makes Elise untargetable, dodging Alistar's Headbutt. Untargetable for 0.6 s; Headbutt takes 0.54 s to land, enough to react. (Elise E Rappel → Alistar W Headbutt)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Alistar's Pulverize. Untargetable for 0.6 s; Pulverize takes 0.25 s to land, enough to react. (Elise E Rappel → Alistar Q Pulverize)
- **0.32** range: Elise's basic attacks reach 425 units farther than Alistar's (550 vs 125 attack range). Alistar closes the gap with Headbutt. (Elise basic attacks → Alistar basic attacks)
- Watch out: Unbreakable Will cleanses Elise's Cocoon (stun) after it lands.

### 5. Fiora (net +0.97)

- **0.72** parry: Riposte parries Alistar's Headbutt and stuns back. Parry for 0.75 s; Headbutt takes 0.54 s to land, enough to react. Negating Headbutt's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Alistar W Headbutt)
- **0.64** parry: Riposte parries Alistar's Pulverize and stuns back. Parry for 0.75 s; Pulverize takes 0.25 s to land, enough to react. Negating Pulverize's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Alistar Q Pulverize)
- **0.43** parry: Riposte parries Alistar's Trample and stuns back. Parry for 0.75 s; Trample lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Trample's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Fiora's Riposte (cripple, slow, stun) after it lands.

### 6. Udyr (net +0.94)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Alistar's Headbutt (airborne, stun). Immune for 1.5 s, long enough to use ahead of Headbutt. (Udyr E Blazing Stampede → Alistar W Headbutt)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Alistar's Trample (stun). Immune for 1.5 s, long enough to use ahead of Trample. (Udyr E Blazing Stampede → Alistar E Trample)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Alistar's Pulverize (airborne, stun). Immune for 1.5 s, long enough to use ahead of Pulverize. (Udyr E Blazing Stampede → Alistar Q Pulverize)
- Watch out: Unbreakable Will cleanses Udyr's Blazing Stampede (stun) after it lands.

### 7. Nocturne (net +0.87)

- **0.72** spell shield: Shroud of Darkness's spell shield blocks Alistar's Headbutt. Spell shield for 1.5 s, long enough to use ahead of Headbutt. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Alistar W Headbutt)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Alistar's Pulverize. Spell shield for 1.5 s, long enough to use ahead of Pulverize. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Alistar Q Pulverize)
- **0.32** spell shield: Shroud of Darkness's spell shield blocks part of Alistar's Trample. Spell shield for 1.5 s, long enough to use ahead of Trample. A spell shield blocks only the first enemy ability that reaches it. The on-hit effect can be blocked by spell shield, but the attack cannot. (Nocturne W Shroud of Darkness → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Nocturne's Unspeakable Horror (fear, slow) after it lands.

### 8. Gwen (net +0.81)

- **0.59** untargetable: Hallowed Mist makes Gwen untargetable, dodging Alistar's Headbutt. Untargetable for ?; Headbutt takes 0.54 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Alistar W Headbutt)
- **0.51** untargetable: Hallowed Mist makes Gwen untargetable, dodging Alistar's Pulverize. Untargetable for ?; Pulverize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Alistar Q Pulverize)
- **0.31** untargetable: Hallowed Mist makes Gwen untargetable, dodging Alistar's Trample. Untargetable for ?; Trample lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Gwen's Needlework (slow) after it lands.

### 9. Rengar (net +0.79)

- **0.64** cleanse: Battle Roar cleanses Alistar's Headbutt (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Alistar W Headbutt)
- **0.56** cleanse: Battle Roar cleanses Alistar's Trample (stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Alistar E Trample)
- **0.56** cleanse: Battle Roar cleanses Alistar's Pulverize (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Alistar Q Pulverize)
- Watch out: Unbreakable Will cleanses Rengar's Bola Strike (slow, root) after it lands.

### 10. Teemo (net +0.76)

- **0.43** blind: Blinding Dart's blind makes Alistar's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Alistar basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Alistar's (500 vs 125 attack range). Alistar closes the gap with Headbutt. (Teemo basic attacks → Alistar basic attacks)
- **0.23** blind: Blinding Dart's blind makes Alistar's Trample, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Teemo's Blinding Dart (blind) after it lands.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.38 | 1.38 | 0.00 |  |
| 2 | Vladimir | +1.05 | 1.20 | 0.15 |  |
| 3 | Yuumi | +1.04 | 1.58 | 0.54 |  |
| 4 | Elise | +0.97 | 1.24 | 0.27 |  |
| 5 | Fiora | +0.97 | 1.16 | 0.19 |  |
| 6 | Udyr | +0.94 | 1.33 | 0.39 |  |
| 7 | Nocturne | +0.87 | 1.23 | 0.36 |  |
| 8 | Gwen | +0.81 | 0.92 | 0.11 |  |
| 9 | Rengar | +0.79 | 1.06 | 0.27 |  |
| 10 | Teemo | +0.76 | 0.89 | 0.13 | blind (Blinding Dart) |
| 11 | Gangplank | +0.75 | 0.88 | 0.13 |  |
| 12 | Xayah | +0.73 | 0.99 | 0.26 |  |
| 13 | Aurora | +0.71 | 0.88 | 0.17 |  |
| 14 | Kindred | +0.71 | 0.75 | 0.04 |  |
| 15 | Master Yi | +0.69 | 0.92 | 0.23 |  |
| 16 | Morgana | +0.64 | 1.21 | 0.57 |  |
| 17 | Kayle | +0.64 | 0.68 | 0.04 |  |
| 18 | Milio | +0.63 | 0.90 | 0.27 |  |
| 19 | Olaf | +0.59 | 0.63 | 0.04 |  |
| 20 | Zed | +0.53 | 0.58 | 0.05 |  |
| 21 | Ekko | +0.46 | 0.66 | 0.20 |  |
| 22 | Vex | +0.45 | 0.70 | 0.25 |  |
| 23 | Zeri | +0.40 | 0.44 | 0.04 |  |
| 24 | Jinx | +0.39 | 0.69 | 0.30 | dash stop (Flame Chompers!) |
| 25 | Twitch | +0.39 | 0.43 | 0.04 |  |
| 26 | Viktor | +0.38 | 0.66 | 0.28 |  |
| 27 | Rek'Sai | +0.38 | 0.64 | 0.26 |  |
| 28 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 29 | Maokai | +0.35 | 1.25 | 0.90 |  |
| 30 | Evelynn | +0.33 | 0.60 | 0.27 |  |
| 31 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 32 | Singed | +0.31 | 0.63 | 0.32 |  |
| 33 | Ahri | +0.31 | 0.58 | 0.27 |  |
| 34 | Yunara | +0.30 | 0.36 | 0.06 |  |
| 35 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 36 | Shaco | +0.29 | 0.60 | 0.31 |  |
| 37 | Veigar | +0.29 | 0.57 | 0.28 |  |
| 38 | Nasus | +0.29 | 0.33 | 0.04 |  |
| 39 | Bard | +0.26 | 0.99 | 0.73 |  |
| 40 | Jax | +0.26 | 0.52 | 0.26 |  |
| 41 | Garen | +0.25 | 0.35 | 0.10 |  |
| 42 | Kog'Maw | +0.23 | 0.27 | 0.04 |  |
| 43 | Zaahen | +0.20 | 0.60 | 0.40 |  |
| 44 | Smolder | +0.19 | 0.32 | 0.13 |  |
| 45 | Graves | +0.19 | 0.24 | 0.05 |  |
| 46 | Hwei | +0.17 | 0.63 | 0.46 | dash stop (Grim Visage) |
| 47 | Vayne | +0.16 | 0.43 | 0.27 |  |
| 48 | Corki | +0.15 | 0.42 | 0.27 |  |
| 49 | Samira | +0.13 | 0.30 | 0.17 |  |
| 50 | Draven | +0.09 | 0.36 | 0.27 |  |
| 51 | Lissandra | +0.08 | 0.87 | 0.79 |  |
| 52 | Lucian | +0.08 | 0.36 | 0.28 |  |
| 53 | Kennen | +0.08 | 0.29 | 0.21 |  |
| 54 | Illaoi | +0.08 | 0.12 | 0.04 |  |
| 55 | Akshan | +0.06 | 0.34 | 0.28 |  |
| 56 | LeBlanc | +0.05 | 0.22 | 0.17 |  |
| 57 | Zoe | +0.04 | 0.32 | 0.28 |  |
| 58 | Zilean | +0.03 | 0.32 | 0.29 |  |
| 59 | Taric | +0.03 | 0.30 | 0.27 |  |
| 60 | Kalista | +0.02 | 0.80 | 0.78 |  |
| 61 | Senna | +0.02 | 0.32 | 0.30 |  |
| 62 | Mel | +0.01 | 0.27 | 0.26 |  |
| 63 | Annie | +0.01 | 0.22 | 0.21 |  |
| 64 | Pantheon | 0.00 | 0.49 | 0.49 |  |
| 65 | Jayce | 0.00 | 0.30 | 0.30 |  |
| 66 | Lux | 0.00 | 0.29 | 0.29 |  |
| 67 | Miss Fortune | -0.01 | 0.32 | 0.33 |  |
| 68 | Malzahar | -0.03 | 1.06 | 1.09 |  |
| 69 | Talon | -0.04 | 0.00 | 0.04 |  |
| 70 | Lulu | -0.05 | 0.66 | 0.71 |  |
| 71 | Soraka | -0.05 | 0.27 | 0.32 |  |
| 72 | Akali | -0.05 | 0.00 | 0.05 |  |
| 73 | Dr. Mundo | -0.05 | 0.00 | 0.05 |  |
| 74 | Kassadin | -0.05 | 0.00 | 0.05 |  |
| 75 | Tryndamere | -0.05 | 0.00 | 0.05 |  |
| 76 | Kha'Zix | -0.06 | 0.00 | 0.06 |  |
| 77 | Nilah | -0.09 | 0.55 | 0.64 |  |
| 78 | Ziggs | -0.09 | 0.27 | 0.36 |  |
| 79 | Brand | -0.09 | 0.22 | 0.31 |  |
| 80 | Syndra | -0.09 | 0.22 | 0.31 |  |
| 81 | Cassiopeia | -0.10 | 0.60 | 0.70 |  |
| 82 | Swain | -0.10 | 0.21 | 0.31 |  |
| 83 | Kayn | -0.11 | 0.60 | 0.71 |  |
| 84 | Katarina | -0.12 | 0.16 | 0.28 |  |
| 85 | Locke | -0.13 | 0.00 | 0.13 |  |
| 86 | Rumble | -0.13 | 0.00 | 0.13 |  |
| 87 | Quinn | -0.14 | 0.38 | 0.52 |  |
| 88 | Karthus | -0.14 | 0.19 | 0.33 |  |
| 89 | Sion | -0.15 | 0.66 | 0.81 |  |
| 90 | Karma | -0.16 | 0.22 | 0.38 |  |
| 91 | Twisted Fate | -0.17 | 0.43 | 0.60 |  |
| 92 | Ashe | -0.20 | 0.36 | 0.56 |  |
| 93 | Anivia | -0.20 | 0.24 | 0.44 |  |
| 94 | Heimerdinger | -0.21 | 0.20 | 0.41 |  |
| 95 | Caitlyn | -0.22 | 0.36 | 0.58 |  |
| 96 | Gnar | -0.22 | 0.33 | 0.55 |  |
| 97 | Kled | -0.23 | 0.70 | 0.93 |  |
| 98 | Sona | -0.23 | 0.41 | 0.64 |  |
| 99 | Varus | -0.24 | 0.43 | 0.67 |  |
| 100 | Mordekaiser | -0.24 | 0.08 | 0.32 |  |
| 101 | Renekton | -0.26 | 0.00 | 0.26 |  |
| 102 | Shyvana | -0.28 | 0.12 | 0.40 |  |
| 103 | Irelia | -0.28 | 0.05 | 0.33 |  |
| 104 | Thresh | -0.29 | 0.19 | 0.48 |  |
| 105 | Yorick | -0.29 | 0.00 | 0.29 |  |
| 106 | Ivern | -0.30 | 0.19 | 0.49 |  |
| 107 | Bel'Veth | -0.30 | 0.00 | 0.30 |  |
| 108 | Tristana | -0.31 | 0.36 | 0.67 |  |
| 109 | Cho'Gath | -0.31 | 0.00 | 0.31 |  |
| 110 | Darius | -0.31 | 0.00 | 0.31 |  |
| 111 | Trundle | -0.32 | 0.00 | 0.32 |  |
| 112 | Shen | -0.33 | 0.52 | 0.85 |  |
| 113 | Xerath | -0.34 | 0.27 | 0.61 |  |
| 114 | Aatrox | -0.34 | 0.00 | 0.34 |  |
| 115 | Jhin | -0.35 | 0.27 | 0.62 |  |
| 116 | Vel'Koz | -0.35 | 0.27 | 0.62 |  |
| 117 | Volibear | -0.36 | 0.12 | 0.48 |  |
| 118 | Ryze | -0.37 | 0.24 | 0.61 |  |
| 119 | Azir | -0.39 | 0.27 | 0.66 |  |
| 120 | Orianna | -0.39 | 0.27 | 0.66 |  |
| 121 | Camille | -0.40 | 0.60 | 1.00 |  |
| 122 | Aphelios | -0.40 | 0.38 | 0.78 |  |
| 123 | Sylas | -0.40 | 0.00 | 0.40 |  |
| 124 | Renata Glasc | -0.42 | 0.38 | 0.80 |  |
| 125 | Warwick | -0.43 | 0.75 | 1.18 |  |
| 126 | Blitzcrank | -0.45 | 0.00 | 0.45 |  |
| 127 | Xin Zhao | -0.49 | 0.30 | 0.79 |  |
| 128 | Seraphine | -0.49 | 0.29 | 0.78 |  |
| 129 | Poppy | -0.50 | 0.50 | 1.00 | dash stop (Steadfast Presence) |
| 130 | Malphite | -0.51 | 0.32 | 0.83 |  |
| 131 | Riven | -0.53 | 0.00 | 0.53 |  |
| 132 | Zyra | -0.54 | 0.24 | 0.78 |  |
| 133 | Nami | -0.55 | 0.22 | 0.77 |  |
| 134 | Lillia | -0.55 | 0.11 | 0.66 |  |
| 135 | Neeko | -0.56 | 0.22 | 0.78 |  |
| 136 | Lee Sin | -0.56 | 0.00 | 0.56 |  |
| 137 | Fiddlesticks | -0.58 | 0.20 | 0.78 |  |
| 138 | Urgot | -0.62 | 0.15 | 0.77 |  |
| 139 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 140 | Diana | -0.64 | 0.00 | 0.64 |  |
| 141 | Wukong | -0.64 | 0.00 | 0.64 |  |
| 142 | Yasuo | -0.64 | 0.00 | 0.64 |  |
| 143 | Aurelion Sol | -0.65 | 0.22 | 0.87 |  |
| 144 | Yone | -0.66 | 0.31 | 0.97 |  |
| 145 | Amumu | -0.66 | 0.18 | 0.84 |  |
| 146 | Pyke | -0.67 | 0.00 | 0.67 |  |
| 147 | Hecarim | -0.68 | 0.12 | 0.80 |  |
| 148 | Fizz | -0.68 | 0.00 | 0.68 |  |
| 149 | Rakan | -0.70 | 0.13 | 0.83 |  |
| 150 | Skarner | -0.75 | 0.00 | 0.75 |  |
| 151 | Braum | -0.76 | 0.00 | 0.76 |  |
| 152 | Leona | -0.78 | 0.00 | 0.78 |  |
| 153 | Qiyana | -0.78 | 0.00 | 0.78 |  |
| 154 | Sett | -0.82 | 0.12 | 0.94 |  |
| 155 | Ambessa | -0.82 | 0.00 | 0.82 |  |
| 156 | Janna | -0.83 | 0.36 | 1.19 |  |
| 157 | K'Sante | -0.83 | 0.23 | 1.06 |  |
| 158 | Jarvan IV | -0.83 | 0.12 | 0.95 |  |
| 159 | Nautilus | -0.85 | 0.00 | 0.85 |  |
| 160 | Rammus | -0.87 | 0.32 | 1.19 |  |
| 161 | Ornn | -0.90 | 0.12 | 1.02 |  |
| 162 | Sejuani | -0.90 | 0.00 | 0.90 |  |
| 163 | Nunu & Willump | -0.93 | 0.00 | 0.93 |  |
| 164 | Zac | -0.96 | 0.40 | 1.36 | dash stop (Stretching Strikes) |
| 165 | Gragas | -0.96 | 0.00 | 0.96 |  |
| 166 | Rell | -0.98 | 0.00 | 0.98 |  |
| 167 | Viego | -1.00 | 0.21 | 1.21 |  |
| 168 | Briar | -1.00 | 0.00 | 1.00 |  |
| 169 | Taliyah | -1.18 | 0.27 | 1.45 |  |
| 170 | Galio | -1.23 | 0.00 | 1.23 |  |
| 171 | Vi | -1.24 | 0.12 | 1.36 |  |
| 172 | Tahm Kench | -1.35 | 0.00 | 1.35 |  |
