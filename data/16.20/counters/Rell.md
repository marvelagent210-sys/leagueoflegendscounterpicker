# Counters to Rell (patch 26.20)

Every champion ranked by what its kit does against Rell's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rell's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rell` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.84)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Rell's Ferromancy: Crash Down. Spell shield for 1.5 s, long enough to use ahead of Ferromancy: Crash Down. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rell W Ferromancy: Crash Down)
- **0.90** spell shield: Shroud of Darkness's spell shield blocks Rell's Ferromancy: Mount Up. Spell shield for 1.5 s, long enough to use ahead of Ferromancy: Mount Up. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rell W Ferromancy: Mount Up)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Rell's Full Tilt. Spell shield for 1.5 s, long enough to use ahead of Full Tilt. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rell E Full Tilt)

### 2. Udyr (net +1.83)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Rell's Ferromancy: Crash Down (airborne, stun). Immune for 1.5 s, long enough to use ahead of Ferromancy: Crash Down. (Udyr E Blazing Stampede → Rell W Ferromancy: Crash Down)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Rell's Ferromancy: Mount Up (airborne, stun). Immune for 1.5 s, long enough to use ahead of Ferromancy: Mount Up. (Udyr E Blazing Stampede → Rell W Ferromancy: Mount Up)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Rell's Magnet Storm (airborne, kinematics). Immune for 1.5 s, long enough to use ahead of Magnet Storm. (Udyr E Blazing Stampede → Rell R Magnet Storm)

### 3. Maokai (net +1.67)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Rell's Ferromancy: Crash Down. Untargetable for 1.4 s; Ferromancy: Crash Down takes 0.63 s to land, enough to react. (Maokai W Twisted Advance → Rell W Ferromancy: Crash Down)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Rell's Magnet Storm. Untargetable for 1.4 s; Magnet Storm takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Rell R Magnet Storm)
- **0.66** untargetable: Twisted Advance makes Maokai untargetable, dodging Rell's Shattering Strike. Untargetable for 1.4 s; Shattering Strike takes 0.4 s to land, enough to react. (Maokai W Twisted Advance → Rell Q Shattering Strike)

### 4. Morgana (net +1.60)

- **0.80** cc immunity: Black Shield makes Morgana immune to Rell's Magnet Storm (airborne, kinematics). Immune for 5 s, long enough to use ahead of Magnet Storm. (Morgana E Black Shield → Rell R Magnet Storm)
- **0.78** cc immunity: Black Shield makes Morgana immune to Rell's Ferromancy: Crash Down (airborne, stun). Immune for 5 s, long enough to use ahead of Ferromancy: Crash Down. (Morgana E Black Shield → Rell W Ferromancy: Crash Down)
- **0.78** cc immunity: Black Shield makes Morgana immune to Rell's Ferromancy: Mount Up (airborne, stun). Immune for 5 s, long enough to use ahead of Ferromancy: Mount Up. (Morgana E Black Shield → Rell W Ferromancy: Mount Up)

### 5. Fiora (net +1.59)

- **0.90** parry: Riposte parries Rell's Magnet Storm and stuns back. Parry for 0.75 s; Magnet Storm takes 0.25 s to land, enough to react. Negating Magnet Storm's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rell R Magnet Storm)
- **0.88** parry: Riposte parries Rell's Ferromancy: Crash Down and stuns back. Parry for 0.75 s; Ferromancy: Crash Down takes 0.63 s to land, enough to react. Negating Ferromancy: Crash Down's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rell W Ferromancy: Crash Down)
- **0.62** parry: Riposte parries Rell's Shattering Strike and stuns back. Parry for 0.75 s; Shattering Strike takes 0.4 s to land, enough to react. Negating Shattering Strike's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rell Q Shattering Strike)

### 6. Sivir (net +1.58)

- **0.73** spell shield: Spell Shield's spell shield blocks Rell's Ferromancy: Crash Down. Spell shield for 1.5 s, long enough to use ahead of Ferromancy: Crash Down. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rell W Ferromancy: Crash Down)
- **0.73** spell shield: Spell Shield's spell shield blocks Rell's Ferromancy: Mount Up. Spell shield for 1.5 s, long enough to use ahead of Ferromancy: Mount Up. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rell W Ferromancy: Mount Up)
- **0.51** spell shield: Spell Shield's spell shield blocks Rell's Full Tilt. Spell shield for 1.5 s, long enough to use ahead of Full Tilt. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rell E Full Tilt)

### 7. Elise (net +1.56)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Rell's Magnet Storm. Untargetable for 0.6 s; Magnet Storm takes 0.25 s to land, enough to react. (Elise E Rappel → Rell R Magnet Storm)
- **0.73** untargetable: Rappel makes Elise untargetable, dodging Rell's Ferromancy: Crash Down. Untargetable for 0.6 s; Ferromancy: Crash Down takes 0.63 s to land, enough to react. (Elise E Rappel → Rell W Ferromancy: Crash Down)
- **0.49** untargetable: Rappel makes Elise untargetable, dodging Rell's Shattering Strike. Untargetable for 0.6 s; Shattering Strike takes 0.4 s to land, enough to react. (Elise E Rappel → Rell Q Shattering Strike)

### 8. Vladimir (net +1.51)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rell's Magnet Storm. Untargetable for 2 s, long enough to use ahead of Magnet Storm. (Vladimir W Sanguine Pool → Rell R Magnet Storm)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rell's Ferromancy: Crash Down. Untargetable for 2 s, long enough to use ahead of Ferromancy: Crash Down. (Vladimir W Sanguine Pool → Rell W Ferromancy: Crash Down)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rell's Ferromancy: Mount Up. Untargetable for 2 s, long enough to use ahead of Ferromancy: Mount Up. (Vladimir W Sanguine Pool → Rell W Ferromancy: Mount Up)
- Watch out: Full Tilt's stun interrupts Vladimir's Tides of Blood (charge-up).

### 9. Rengar (net +1.46)

- **0.80** cleanse: Battle Roar cleanses Rell's Ferromancy: Crash Down (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Rell W Ferromancy: Crash Down)
- **0.80** cleanse: Battle Roar cleanses Rell's Ferromancy: Mount Up (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Rell W Ferromancy: Mount Up)
- **0.64** cleanse: Battle Roar cleanses Rell's Magnet Storm (airborne) after it lands. 10 s cooldown; usable while crowd controlled. Doesn't remove kinematics. (Rengar W Battle Roar → Rell R Magnet Storm)

### 10. Yuumi (net +1.45)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Rell's Ferromancy: Crash Down. Untargetable for ?; Ferromancy: Crash Down takes 0.63 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rell W Ferromancy: Crash Down)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Rell's Magnet Storm. Untargetable for ?; Magnet Storm takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rell R Magnet Storm)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Rell's Shattering Strike. Untargetable for ?; Shattering Strike takes 0.4 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rell Q Shattering Strike)
- Watch out: Full Tilt's stun interrupts Yuumi's Final Chapter (normal channel).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.84 | 1.84 | 0.00 |  |
| 2 | Udyr | +1.83 | 1.83 | 0.00 |  |
| 3 | Maokai | +1.67 | 1.67 | 0.00 |  |
| 4 | Morgana | +1.60 | 1.60 | 0.00 |  |
| 5 | Fiora | +1.59 | 1.59 | 0.00 |  |
| 6 | Sivir | +1.58 | 1.58 | 0.00 |  |
| 7 | Elise | +1.56 | 1.56 | 0.00 |  |
| 8 | Vladimir | +1.51 | 1.59 | 0.08 |  |
| 9 | Rengar | +1.46 | 1.46 | 0.00 |  |
| 10 | Yuumi | +1.45 | 1.86 | 0.41 |  |
| 11 | Bard | +1.43 | 1.43 | 0.00 |  |
| 12 | Lissandra | +1.37 | 1.37 | 0.00 |  |
| 13 | Gwen | +1.36 | 1.36 | 0.00 |  |
| 14 | Xayah | +1.33 | 1.33 | 0.00 |  |
| 15 | Aurora | +1.24 | 1.24 | 0.00 |  |
| 16 | Gangplank | +1.24 | 1.24 | 0.00 |  |
| 17 | Rek'Sai | +1.23 | 1.23 | 0.00 |  |
| 18 | Olaf | +1.22 | 1.22 | 0.00 |  |
| 19 | Ekko | +1.20 | 1.20 | 0.00 |  |
| 20 | Jax | +1.19 | 1.19 | 0.00 | attack dodge (Counter Strike) |
| 21 | Evelynn | +1.17 | 1.17 | 0.00 |  |
| 22 | Shaco | +1.17 | 1.17 | 0.00 |  |
| 23 | Zaahen | +1.17 | 1.17 | 0.00 |  |
| 24 | Master Yi | +1.13 | 1.36 | 0.23 |  |
| 25 | Warwick | +1.12 | 1.42 | 0.30 |  |
| 26 | Camille | +1.12 | 1.12 | 0.00 |  |
| 27 | Sion | +1.11 | 1.24 | 0.13 |  |
| 28 | Teemo | +1.08 | 1.08 | 0.00 | blind (Blinding Dart), blind (Blinding Dart) |
| 29 | Kled | +1.07 | 1.07 | 0.00 |  |
| 30 | Zed | +1.06 | 1.06 | 0.00 |  |
| 31 | Kalista | +1.02 | 1.02 | 0.00 |  |
| 32 | Alistar | +0.98 | 0.98 | 0.00 |  |
| 33 | Malzahar | +0.94 | 1.34 | 0.40 |  |
| 34 | Milio | +0.89 | 0.89 | 0.00 |  |
| 35 | Vex | +0.89 | 0.89 | 0.00 |  |
| 36 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 37 | Nilah | +0.83 | 0.83 | 0.00 | attack dodge (Jubilant Veil) |
| 38 | Jinx | +0.80 | 0.80 | 0.00 | dash stop (Flame Chompers!) |
| 39 | Hwei | +0.77 | 0.77 | 0.00 | dash stop (Grim Visage) |
| 40 | Kindred | +0.77 | 0.77 | 0.00 |  |
| 41 | Shen | +0.73 | 1.18 | 0.45 | attack block (Spirit's Refuge) |
| 42 | Viktor | +0.73 | 0.73 | 0.00 | dash stop (Gravity Field) |
| 43 | Kayn | +0.72 | 1.17 | 0.45 |  |
| 44 | Ahri | +0.71 | 0.71 | 0.00 | dash stop (Charm) |
| 45 | Veigar | +0.67 | 0.67 | 0.00 | dash stop (Event Horizon) |
| 46 | Pantheon | +0.63 | 0.73 | 0.10 |  |
| 47 | Cassiopeia | +0.62 | 0.62 | 0.00 | grounding (Miasma) |
| 48 | Lulu | +0.55 | 0.55 | 0.00 |  |
| 49 | Xin Zhao | +0.55 | 0.55 | 0.00 |  |
| 50 | Yone | +0.54 | 0.54 | 0.00 |  |
| 51 | Taric | +0.52 | 0.52 | 0.00 |  |
| 52 | Poppy | +0.49 | 0.69 | 0.20 | dash stop (Steadfast Presence) |
| 53 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 54 | K'Sante | +0.47 | 0.47 | 0.00 |  |
| 55 | Malphite | +0.47 | 0.47 | 0.00 |  |
| 56 | Garen | +0.46 | 0.46 | 0.00 |  |
| 57 | Corki | +0.43 | 0.43 | 0.00 |  |
| 58 | Nasus | +0.35 | 0.35 | 0.00 |  |
| 59 | Amumu | +0.29 | 0.29 | 0.00 |  |
| 60 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 61 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 62 | Vayne | +0.27 | 0.27 | 0.00 |  |
| 63 | Sona | +0.26 | 0.26 | 0.00 |  |
| 64 | Hecarim | +0.25 | 0.25 | 0.00 |  |
| 65 | Aphelios | +0.24 | 0.24 | 0.00 |  |
| 66 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 67 | Illaoi | +0.24 | 0.24 | 0.00 |  |
| 68 | Jarvan IV | +0.24 | 0.24 | 0.00 |  |
| 69 | Ornn | +0.24 | 0.24 | 0.00 |  |
| 70 | Renata Glasc | +0.24 | 0.24 | 0.00 |  |
| 71 | Sett | +0.24 | 0.24 | 0.00 |  |
| 72 | Shyvana | +0.24 | 0.24 | 0.00 |  |
| 73 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 74 | Volibear | +0.24 | 0.24 | 0.00 |  |
| 75 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 76 | Draven | +0.22 | 0.22 | 0.00 |  |
| 77 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 78 | Senna | +0.22 | 0.22 | 0.00 |  |
| 79 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 80 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 81 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 82 | Zoe | +0.20 | 0.20 | 0.00 |  |
| 83 | Gnar | +0.19 | 0.19 | 0.00 |  |
| 84 | Jayce | +0.18 | 0.18 | 0.00 |  |
| 85 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 86 | Lux | +0.18 | 0.18 | 0.00 |  |
| 87 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 88 | Samira | +0.18 | 0.18 | 0.00 |  |
| 89 | Mel | +0.17 | 0.17 | 0.00 |  |
| 90 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 91 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 92 | Ziggs | +0.17 | 0.17 | 0.00 |  |
| 93 | Zac | +0.16 | 0.63 | 0.47 | dash stop (Stretching Strikes) |
| 94 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 95 | Azir | +0.16 | 0.16 | 0.00 |  |
| 96 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 97 | Orianna | +0.16 | 0.16 | 0.00 |  |
| 98 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 99 | Annie | +0.15 | 0.15 | 0.00 |  |
| 100 | Brand | +0.14 | 0.14 | 0.00 |  |
| 101 | Graves | +0.14 | 0.14 | 0.00 |  |
| 102 | Nami | +0.14 | 0.14 | 0.00 |  |
| 103 | Neeko | +0.14 | 0.14 | 0.00 |  |
| 104 | Syndra | +0.14 | 0.14 | 0.00 |  |
| 105 | Karma | +0.13 | 0.13 | 0.00 |  |
| 106 | LeBlanc | +0.13 | 0.13 | 0.00 |  |
| 107 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 108 | Swain | +0.12 | 0.12 | 0.00 |  |
| 109 | Thresh | +0.11 | 0.11 | 0.00 |  |
| 110 | Rammus | +0.08 | 0.35 | 0.27 |  |
| 111 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 112 | Urgot | +0.08 | 0.08 | 0.00 |  |
| 113 | Varus | +0.07 | 0.18 | 0.11 |  |
| 114 | Aurelion Sol | +0.06 | 0.14 | 0.08 |  |
| 115 | Rakan | +0.06 | 0.06 | 0.00 |  |
| 116 | Lillia | +0.05 | 0.05 | 0.00 |  |
| 117 | Quinn | +0.03 | 0.22 | 0.19 |  |
| 118 | Viego | +0.02 | 0.24 | 0.22 |  |
| 119 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 120 | Akali | 0.00 | 0.00 | 0.00 |  |
| 121 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 122 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 123 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 124 | Braum | 0.00 | 0.00 | 0.00 |  |
| 125 | Briar | 0.00 | 0.00 | 0.00 |  |
| 126 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 127 | Darius | 0.00 | 0.00 | 0.00 |  |
| 128 | Diana | 0.00 | 0.00 | 0.00 |  |
| 129 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 130 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 131 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 132 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 133 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 134 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 135 | Leona | 0.00 | 0.00 | 0.00 |  |
| 136 | Locke | 0.00 | 0.00 | 0.00 |  |
| 137 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 138 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 139 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 140 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 141 | Riven | 0.00 | 0.00 | 0.00 |  |
| 142 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 143 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 144 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 145 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 146 | Talon | 0.00 | 0.00 | 0.00 |  |
| 147 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 148 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 149 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 150 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 151 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 152 | Ivern | -0.04 | 0.11 | 0.15 |  |
| 153 | Lucian | -0.07 | 0.21 | 0.28 |  |
| 154 | Miss Fortune | -0.08 | 0.20 | 0.28 |  |
| 155 | Akshan | -0.09 | 0.19 | 0.28 |  |
| 156 | Twisted Fate | -0.10 | 0.25 | 0.35 |  |
| 157 | Jhin | -0.11 | 0.17 | 0.28 |  |
| 158 | Vel'Koz | -0.12 | 0.16 | 0.28 |  |
| 159 | Vi | -0.14 | 0.24 | 0.38 |  |
| 160 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 161 | Xerath | -0.16 | 0.16 | 0.32 |  |
| 162 | Gragas | -0.16 | 0.00 | 0.16 |  |
| 163 | Karthus | -0.17 | 0.11 | 0.28 |  |
| 164 | Janna | -0.18 | 0.22 | 0.40 |  |
| 165 | Galio | -0.18 | 0.00 | 0.18 |  |
| 166 | Ryze | -0.20 | 0.15 | 0.35 |  |
| 167 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 168 | Taliyah | -0.32 | 0.16 | 0.48 |  |
| 169 | Fiddlesticks | -0.34 | 0.11 | 0.45 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Nunu & Willump | -0.49 | 0.00 | 0.49 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
