# Counters to Xin Zhao (patch 26.20)

Every champion ranked by what its kit does against Xin Zhao's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Xin Zhao's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> XinZhao` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.57)

- **0.80** spell shield: Spell Shield's spell shield blocks Xin Zhao's Crescent Guard. Spell shield for 1.5 s, long enough to use ahead of Crescent Guard. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xin Zhao R Crescent Guard)
- **0.61** spell shield: Spell Shield's spell shield blocks Xin Zhao's Audacious Charge. Spell shield for 1.5 s, long enough to use ahead of Audacious Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xin Zhao E Audacious Charge)
- **0.41** range: Sivir's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Sivir basic attacks → Xin Zhao basic attacks)

### 2. Bard (net +1.28)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 2.5 s, long enough to use ahead of Crescent Guard. (Bard R Tempered Fate → Xin Zhao R Crescent Guard)
- **0.39** untargetable: Tempered Fate makes Bard untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 2.5 s, long enough to use ahead of Audacious Charge. (Bard R Tempered Fate → Xin Zhao E Audacious Charge)
- **0.31** range: Bard's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Bard basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Bard's Cosmic Binding (its crowd control still applies).

### 3. Fiora (net +1.22)

- **0.90** parry: Riposte parries Xin Zhao's Crescent Guard and stuns back. Parry for 0.75 s; Crescent Guard takes 0.35 s to land, enough to react. Negating Crescent Guard's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Xin Zhao R Crescent Guard)
- **0.65** parry: Riposte parries Xin Zhao's Audacious Charge. Parry for 0.75 s; Audacious Charge takes 0.26 s to land, enough to react. (Fiora W Riposte → Xin Zhao E Audacious Charge)
- **0.35** parry: Riposte parries Xin Zhao's Three Talon Strike and stuns back. Parry for 0.75 s; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Three Talon Strike's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Fiora's Riposte (its crowd control still applies).

### 4. Elise (net +1.11)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 0.6 s; Crescent Guard takes 0.35 s to land, enough to react. (Elise E Rappel → Xin Zhao R Crescent Guard)
- **0.61** untargetable: Rappel makes Elise untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 0.6 s; Audacious Charge takes 0.26 s to land, enough to react. (Elise E Rappel → Xin Zhao E Audacious Charge)
- **0.30** range: Elise's basic attacks reach 375 units farther than Xin Zhao's (550 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Elise basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Elise's Venomous Bite.

### 5. Udyr (net +1.06)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Crescent Guard (airborne, stun). Immune for 1.5 s, long enough to use ahead of Crescent Guard. (Udyr E Blazing Stampede → Xin Zhao R Crescent Guard)
- **0.63** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Three Talon Strike (airborne). Immune for 1.5 s, long enough to use ahead of Three Talon Strike. (Udyr E Blazing Stampede → Xin Zhao Q Three Talon Strike)
- **0.20** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Audacious Charge (slow). Immune for 1.5 s, long enough to use ahead of Audacious Charge. (Udyr E Blazing Stampede → Xin Zhao E Audacious Charge)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Udyr's Wingborne Storm (its crowd control still applies).

### 6. Aurora (net +0.97)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 0.4 s; Crescent Guard takes 0.35 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Xin Zhao R Crescent Guard)
- **0.37** untargetable: Between Worlds makes Aurora untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 0.4 s; Audacious Charge takes 0.26 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Xin Zhao E Audacious Charge)
- **0.27** range: Aurora's basic attacks reach 375 units farther than Xin Zhao's (550 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Aurora basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Aurora's Between Worlds (its crowd control still applies).

### 7. Kled (net +0.96)

- **0.76** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Crescent Guard (airborne, stun). Immune for ?; Crescent Guard takes 0.35 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Xin Zhao R Crescent Guard)
- **0.18** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Three Talon Strike (airborne). Immune for ?; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kled R Chaaaaaaaarge!!! → Xin Zhao Q Three Talon Strike)
- **0.09** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Audacious Charge (slow). Immune for ?; Audacious Charge takes 0.26 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Xin Zhao E Audacious Charge)

### 8. Gwen (net +0.93)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for ?; Crescent Guard takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao R Crescent Guard)
- **0.61** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for ?; Audacious Charge takes 0.26 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao E Audacious Charge)
- **0.24** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Three Talon Strike. Untargetable for ?; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Gwen's Needlework (its crowd control still applies).

### 9. Teemo (net +0.90)

- **0.58** blind: Blinding Dart's blind makes Xin Zhao's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Xin Zhao basic attacks)
- **0.46** blind: Blinding Dart's blind makes Xin Zhao's Three Talon Strike, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Xin Zhao Q Three Talon Strike)
- **0.29** range: Teemo's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Teemo basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Teemo's Noxious Trap (its crowd control still applies).

### 10. Nocturne (net +0.89)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Xin Zhao's Crescent Guard. Spell shield for 1.5 s, long enough to use ahead of Crescent Guard. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xin Zhao R Crescent Guard)
- **0.76** spell shield: Shroud of Darkness's spell shield blocks Xin Zhao's Audacious Charge. Spell shield for 1.5 s, long enough to use ahead of Audacious Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xin Zhao E Audacious Charge)
- **0.23** spell shield: Shroud of Darkness's spell shield blocks part of Xin Zhao's Three Talon Strike. Spell shield for 1.5 s, long enough to use ahead of Three Talon Strike. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the knock up. (Nocturne W Shroud of Darkness → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Nocturne's Paranoia (its crowd control still applies).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.57 | 1.57 | 0.00 |  |
| 2 | Bard | +1.28 | 1.38 | 0.10 |  |
| 3 | Fiora | +1.22 | 1.33 | 0.11 |  |
| 4 | Elise | +1.11 | 1.47 | 0.36 |  |
| 5 | Udyr | +1.06 | 1.18 | 0.12 |  |
| 6 | Aurora | +0.97 | 1.32 | 0.35 |  |
| 7 | Kled | +0.96 | 0.96 | 0.00 |  |
| 8 | Gwen | +0.93 | 1.17 | 0.24 |  |
| 9 | Teemo | +0.90 | 1.10 | 0.20 | blind (Blinding Dart), blind (Blinding Dart) |
| 10 | Nocturne | +0.89 | 1.42 | 0.53 |  |
| 11 | Kayle | +0.89 | 0.89 | 0.00 |  |
| 12 | Lissandra | +0.88 | 1.31 | 0.43 |  |
| 13 | Yuumi | +0.87 | 1.58 | 0.71 |  |
| 14 | Milio | +0.87 | 1.03 | 0.16 |  |
| 15 | Morgana | +0.86 | 1.22 | 0.36 |  |
| 16 | Kalista | +0.86 | 1.00 | 0.14 |  |
| 17 | Shaco | +0.82 | 1.04 | 0.22 |  |
| 18 | Olaf | +0.79 | 0.99 | 0.20 |  |
| 19 | Kindred | +0.78 | 0.88 | 0.10 |  |
| 20 | Xayah | +0.77 | 1.40 | 0.63 |  |
| 21 | Maokai | +0.74 | 1.27 | 0.53 |  |
| 22 | Master Yi | +0.67 | 1.31 | 0.64 |  |
| 23 | Lulu | +0.65 | 0.75 | 0.10 | disarm (Whimsy) |
| 24 | Vladimir | +0.62 | 1.38 | 0.76 |  |
| 25 | Singed | +0.59 | 0.75 | 0.16 |  |
| 26 | Rengar | +0.57 | 0.89 | 0.32 |  |
| 27 | Rek'Sai | +0.56 | 1.10 | 0.54 |  |
| 28 | Alistar | +0.49 | 0.79 | 0.30 |  |
| 29 | Camille | +0.47 | 1.06 | 0.59 |  |
| 30 | Gangplank | +0.47 | 0.85 | 0.38 |  |
| 31 | Nasus | +0.45 | 0.45 | 0.00 | attack speed slow (Wither) |
| 32 | Sion | +0.44 | 0.99 | 0.55 |  |
| 33 | Vex | +0.41 | 0.76 | 0.35 |  |
| 34 | Twitch | +0.40 | 0.40 | 0.00 |  |
| 35 | Ekko | +0.37 | 1.06 | 0.69 |  |
| 36 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 37 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 38 | Taric | +0.32 | 0.49 | 0.17 |  |
| 39 | Viktor | +0.30 | 0.64 | 0.34 |  |
| 40 | Hwei | +0.24 | 0.61 | 0.37 | dash stop (Grim Visage) |
| 41 | Vayne | +0.23 | 0.40 | 0.17 |  |
| 42 | Jinx | +0.20 | 0.65 | 0.45 | dash stop (Flame Chompers!) |
| 43 | Renata Glasc | +0.19 | 0.36 | 0.17 |  |
| 44 | Warwick | +0.15 | 1.14 | 0.99 |  |
| 45 | Veigar | +0.15 | 0.57 | 0.42 |  |
| 46 | Zilean | +0.14 | 0.30 | 0.16 |  |
| 47 | Zed | +0.13 | 1.03 | 0.90 |  |
| 48 | Zoe | +0.13 | 0.30 | 0.17 |  |
| 49 | Kayn | +0.11 | 1.04 | 0.93 |  |
| 50 | Garen | +0.11 | 0.45 | 0.34 |  |
| 51 | Malzahar | +0.10 | 0.98 | 0.88 |  |
| 52 | Cassiopeia | +0.10 | 0.59 | 0.49 |  |
| 53 | Varus | +0.10 | 0.51 | 0.41 |  |
| 54 | Corki | +0.09 | 0.46 | 0.37 |  |
| 55 | Soraka | +0.08 | 0.25 | 0.17 |  |
| 56 | Ashe | +0.06 | 0.36 | 0.30 |  |
| 57 | Heimerdinger | +0.06 | 0.30 | 0.24 |  |
| 58 | Nilah | +0.05 | 0.60 | 0.55 | attack dodge (Jubilant Veil) |
| 59 | Shen | +0.04 | 0.72 | 0.68 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 60 | Jayce | +0.03 | 0.26 | 0.23 |  |
| 61 | Zaahen | +0.01 | 0.92 | 0.91 |  |
| 62 | Jax | +0.01 | 0.75 | 0.74 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 63 | Nidalee | 0.00 | 0.26 | 0.26 |  |
| 64 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 65 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 66 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 67 | Evelynn | -0.01 | 1.04 | 1.05 |  |
| 68 | Aphelios | -0.01 | 0.47 | 0.48 |  |
| 69 | Sona | -0.01 | 0.39 | 0.40 |  |
| 70 | Gnar | -0.02 | 0.29 | 0.31 |  |
| 71 | Kog'Maw | -0.02 | 0.24 | 0.26 |  |
| 72 | Karma | -0.03 | 0.19 | 0.22 |  |
| 73 | Pantheon | -0.04 | 0.61 | 0.65 |  |
| 74 | Zeri | -0.04 | 0.41 | 0.45 |  |
| 75 | Shyvana | -0.05 | 0.18 | 0.23 |  |
| 76 | Mordekaiser | -0.05 | 0.11 | 0.16 |  |
| 77 | LeBlanc | -0.06 | 0.19 | 0.25 |  |
| 78 | Malphite | -0.08 | 0.47 | 0.55 |  |
| 79 | Anivia | -0.10 | 0.24 | 0.34 |  |
| 80 | Twisted Fate | -0.12 | 0.38 | 0.50 |  |
| 81 | Smolder | -0.14 | 0.30 | 0.44 |  |
| 82 | Samira | -0.14 | 0.26 | 0.40 |  |
| 83 | Tristana | -0.15 | 0.36 | 0.51 |  |
| 84 | Lux | -0.16 | 0.27 | 0.43 |  |
| 85 | Brand | -0.17 | 0.21 | 0.38 |  |
| 86 | Yone | -0.18 | 0.37 | 0.55 |  |
| 87 | Caitlyn | -0.18 | 0.36 | 0.54 |  |
| 88 | Ahri | -0.19 | 0.59 | 0.78 |  |
| 89 | Poppy | -0.19 | 0.50 | 0.69 | dash stop (Steadfast Presence) |
| 90 | Thresh | -0.21 | 0.16 | 0.37 |  |
| 91 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 92 | Ezreal | -0.22 | 0.30 | 0.52 |  |
| 93 | Akshan | -0.22 | 0.29 | 0.51 |  |
| 94 | Zyra | -0.22 | 0.24 | 0.46 |  |
| 95 | Orianna | -0.22 | 0.23 | 0.45 |  |
| 96 | Seraphine | -0.23 | 0.25 | 0.48 |  |
| 97 | K'Sante | -0.24 | 0.36 | 0.60 |  |
| 98 | Ivern | -0.24 | 0.16 | 0.40 |  |
| 99 | Rumble | -0.24 | 0.00 | 0.24 |  |
| 100 | Neeko | -0.25 | 0.21 | 0.46 |  |
| 101 | Quinn | -0.26 | 0.34 | 0.60 |  |
| 102 | Illaoi | -0.27 | 0.18 | 0.45 |  |
| 103 | Janna | -0.28 | 0.34 | 0.62 |  |
| 104 | Kennen | -0.28 | 0.27 | 0.55 |  |
| 105 | Bel'Veth | -0.28 | 0.00 | 0.28 |  |
| 106 | Blitzcrank | -0.28 | 0.00 | 0.28 |  |
| 107 | Ziggs | -0.30 | 0.25 | 0.55 |  |
| 108 | Azir | -0.30 | 0.23 | 0.53 |  |
| 109 | Lee Sin | -0.30 | 0.00 | 0.30 |  |
| 110 | Mel | -0.31 | 0.25 | 0.56 |  |
| 111 | Hecarim | -0.31 | 0.19 | 0.50 |  |
| 112 | Skarner | -0.31 | 0.13 | 0.44 |  |
| 113 | Urgot | -0.32 | 0.12 | 0.44 |  |
| 114 | Lillia | -0.32 | 0.08 | 0.40 |  |
| 115 | Katarina | -0.33 | 0.24 | 0.57 |  |
| 116 | Graves | -0.33 | 0.20 | 0.53 |  |
| 117 | Amumu | -0.33 | 0.19 | 0.52 |  |
| 118 | Nami | -0.34 | 0.21 | 0.55 |  |
| 119 | Sett | -0.34 | 0.18 | 0.52 |  |
| 120 | Kha'Zix | -0.34 | 0.00 | 0.34 |  |
| 121 | Senna | -0.36 | 0.32 | 0.68 |  |
| 122 | Vel'Koz | -0.37 | 0.23 | 0.60 |  |
| 123 | Jarvan IV | -0.37 | 0.18 | 0.55 |  |
| 124 | Draven | -0.38 | 0.34 | 0.72 |  |
| 125 | Braum | -0.40 | 0.00 | 0.40 |  |
| 126 | Rammus | -0.41 | 0.44 | 0.85 | attack reflect (Defensive Ball Curl) |
| 127 | Rakan | -0.41 | 0.09 | 0.50 |  |
| 128 | Riven | -0.41 | 0.00 | 0.41 |  |
| 129 | Taliyah | -0.42 | 0.23 | 0.65 |  |
| 130 | Volibear | -0.43 | 0.18 | 0.61 |  |
| 131 | Ryze | -0.44 | 0.22 | 0.66 |  |
| 132 | Aurelion Sol | -0.44 | 0.21 | 0.65 |  |
| 133 | Nautilus | -0.44 | 0.00 | 0.44 |  |
| 134 | Jhin | -0.45 | 0.25 | 0.70 |  |
| 135 | Ornn | -0.45 | 0.18 | 0.63 |  |
| 136 | Leona | -0.45 | 0.00 | 0.45 |  |
| 137 | Kassadin | -0.46 | 0.00 | 0.46 |  |
| 138 | Sylas | -0.47 | 0.00 | 0.47 |  |
| 139 | Swain | -0.48 | 0.18 | 0.66 |  |
| 140 | Darius | -0.48 | 0.00 | 0.48 |  |
| 141 | Trundle | -0.48 | 0.00 | 0.48 |  |
| 142 | Annie | -0.50 | 0.22 | 0.72 |  |
| 143 | Ambessa | -0.50 | 0.00 | 0.50 |  |
| 144 | Locke | -0.51 | 0.00 | 0.51 |  |
| 145 | Syndra | -0.52 | 0.21 | 0.73 |  |
| 146 | Cho'Gath | -0.52 | 0.00 | 0.52 |  |
| 147 | Fizz | -0.52 | 0.00 | 0.52 |  |
| 148 | Irelia | -0.52 | 0.00 | 0.52 |  |
| 149 | Sejuani | -0.54 | 0.00 | 0.54 |  |
| 150 | Wukong | -0.55 | 0.00 | 0.55 |  |
| 151 | Rell | -0.55 | 0.00 | 0.55 |  |
| 152 | Yasuo | -0.55 | 0.00 | 0.55 |  |
| 153 | Briar | -0.56 | 0.00 | 0.56 |  |
| 154 | Diana | -0.56 | 0.00 | 0.56 |  |
| 155 | Renekton | -0.56 | 0.00 | 0.56 |  |
| 156 | Lucian | -0.59 | 0.31 | 0.90 |  |
| 157 | Talon | -0.60 | 0.00 | 0.60 |  |
| 158 | Viego | -0.62 | 0.18 | 0.80 |  |
| 159 | Qiyana | -0.62 | 0.00 | 0.62 |  |
| 160 | Zac | -0.63 | 0.40 | 1.03 | dash stop (Stretching Strikes) |
| 161 | Nunu & Willump | -0.64 | 0.27 | 0.91 |  |
| 162 | Miss Fortune | -0.65 | 0.30 | 0.95 |  |
| 163 | Karthus | -0.67 | 0.16 | 0.83 |  |
| 164 | Akali | -0.68 | 0.00 | 0.68 |  |
| 165 | Gragas | -0.68 | 0.00 | 0.68 |  |
| 166 | Xerath | -0.74 | 0.23 | 0.97 |  |
| 167 | Tahm Kench | -0.75 | 0.00 | 0.75 |  |
| 168 | Galio | -0.83 | 0.00 | 0.83 |  |
| 169 | Naafiri | -0.85 | 0.00 | 0.85 |  |
| 170 | Vi | -0.90 | 0.18 | 1.08 |  |
| 171 | Fiddlesticks | -1.05 | 0.17 | 1.22 |  |
| 172 | Pyke | -1.29 | 0.00 | 1.29 |  |
