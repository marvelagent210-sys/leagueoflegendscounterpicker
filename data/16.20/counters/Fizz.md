# Counters to Fizz (patch 26.20)

Every champion ranked by what its kit does against Fizz's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fizz's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fizz` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.95)

- **0.48** spell shield: Spell Shield's spell shield blocks Fizz's Urchin Strike. Spell shield for 1.5 s, long enough to use ahead of Urchin Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fizz Q Urchin Strike)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Fizz's Chum the Waters. Spell shield for 1.5 s, long enough to use ahead of Chum the Waters. A spell shield blocks only the first enemy ability that reaches it. Chum the Waters will not attach the lure to an enemy champion if they have a spell shield as well as against an enemy Malzahar with his Void Shift active (mitigation effect is consumed in both cases).
  - The area of effect for the eruption will be at the target's location at the time of the attachment being blocked; the target will intercept the lure without getting attached to it. (Sivir E Spell Shield → Fizz R Chum the Waters)
- **0.28** spell shield: Spell Shield's spell shield blocks Fizz's Seastone Trident. Spell shield for 1.5 s, long enough to use ahead of Seastone Trident. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fizz W Seastone Trident)

### 2. Vladimir (net +0.64)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Chum the Waters. Untargetable for 2 s, long enough to use ahead of Chum the Waters. (Vladimir W Sanguine Pool → Fizz R Chum the Waters)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Urchin Strike. Untargetable for 2 s, long enough to use ahead of Urchin Strike. (Vladimir W Sanguine Pool → Fizz Q Urchin Strike)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Seastone Trident. Untargetable for 2 s, long enough to use ahead of Seastone Trident. (Vladimir W Sanguine Pool → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Vladimir's Transfusion.

### 3. Master Yi (net +0.62)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. (Master Yi Q Alpha Strike → Fizz R Chum the Waters)
- **0.29** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Fizz Q Urchin Strike)
- **0.17** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Master Yi's Alpha Strike.

### 4. Kayle (net +0.59)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Chum the Waters (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Chum the Waters. (Kayle R Divine Judgment → Fizz R Chum the Waters)
- **0.36** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Urchin Strike. Invulnerable for 2.5 s, long enough to use ahead of Urchin Strike. (Kayle R Divine Judgment → Fizz Q Urchin Strike)
- **0.23** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Seastone Trident. Invulnerable for 2.5 s, long enough to use ahead of Seastone Trident. (Kayle R Divine Judgment → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Kayle's Starfire Spellblade.

### 5. Fiora (net +0.53)

- **0.90** parry: Riposte parries Fizz's Chum the Waters and stuns back. Parry for 0.75 s; Chum the Waters takes 1.25 s to land, enough to react. Negating Chum the Waters's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Fizz R Chum the Waters)
- **0.30** parry: Riposte parries Fizz's Urchin Strike. Parry for 0.75 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Fizz Q Urchin Strike)
- **0.17** parry: Riposte parries Fizz's Seastone Trident. Parry for 0.75 s; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Fiora's Riposte.

### 6. Xayah (net +0.51)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Chum the Waters. Untargetable for 1.5 s, long enough to use ahead of Chum the Waters. (Xayah R Featherstorm → Fizz R Chum the Waters)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Urchin Strike. Untargetable for 1.5 s, long enough to use ahead of Urchin Strike. (Xayah R Featherstorm → Fizz Q Urchin Strike)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Seastone Trident. Untargetable for 1.5 s, long enough to use ahead of Seastone Trident. (Xayah R Featherstorm → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Xayah's Bladecaller.

### 7. Gwen (net +0.44)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz R Chum the Waters)
- **0.29** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz Q Urchin Strike)
- **0.17** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Gwen's Needlework.

### 8. Olaf (net +0.43)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Fizz's Chum the Waters (airborne, slow). Immune for 3 s, long enough to use ahead of Chum the Waters. (Olaf R Ragnarok → Fizz R Chum the Waters)
- **0.09** cc immunity: Ragnarok makes Olaf immune to Fizz's Playful (slow). Immune for 3 s, long enough to use ahead of Playful. (Olaf R Ragnarok → Fizz E Playful)
- Watch out: Playful makes Fizz untargetable, dodging Olaf's Reckless Swing.

### 9. Aurora (net +0.42)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Fizz's Chum the Waters. Untargetable for 0.4 s; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fizz R Chum the Waters)
- **0.21** untargetable: Between Worlds makes Aurora untargetable, dodging Fizz's Urchin Strike. Untargetable for 0.4 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fizz Q Urchin Strike)
- **0.14** range: Aurora's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range). Fizz closes the gap with Playful, Trickster, Urchin Strike. (Aurora basic attacks → Fizz basic attacks)
- Watch out: Playful makes Fizz untargetable, dodging Aurora's Between Worlds.

### 10. Yuumi (net +0.32)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz R Chum the Waters)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz Q Urchin Strike)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Yuumi's Final Chapter.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.95 | 0.95 | 0.00 |  |
| 2 | Vladimir | +0.64 | 1.20 | 0.56 |  |
| 3 | Master Yi | +0.62 | 1.21 | 0.59 |  |
| 4 | Kayle | +0.59 | 0.82 | 0.23 |  |
| 5 | Fiora | +0.53 | 1.10 | 0.57 |  |
| 6 | Xayah | +0.51 | 1.10 | 0.59 |  |
| 7 | Gwen | +0.44 | 0.99 | 0.55 |  |
| 8 | Olaf | +0.43 | 0.85 | 0.42 |  |
| 9 | Aurora | +0.42 | 0.99 | 0.57 |  |
| 10 | Yuumi | +0.32 | 1.25 | 0.93 |  |
| 11 | Zed | +0.30 | 0.84 | 0.54 |  |
| 12 | Bard | +0.29 | 1.20 | 0.91 |  |
| 13 | Udyr | +0.25 | 0.90 | 0.65 |  |
| 14 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 15 | Lissandra | +0.16 | 1.17 | 1.01 |  |
| 16 | Sion | +0.11 | 0.85 | 0.74 |  |
| 17 | Twitch | +0.09 | 0.20 | 0.11 |  |
| 18 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 19 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 20 | Gangplank | -0.02 | 0.70 | 0.72 |  |
| 21 | Morgana | -0.03 | 0.95 | 0.98 |  |
| 22 | Kalista | -0.03 | 0.69 | 0.72 |  |
| 23 | Vex | -0.06 | 0.64 | 0.70 |  |
| 24 | Jinx | -0.08 | 0.68 | 0.76 | dash stop (Flame Chompers!) |
| 25 | Rek'Sai | -0.12 | 1.05 | 1.17 |  |
| 26 | Kog'Maw | -0.19 | 0.12 | 0.31 |  |
| 27 | Nocturne | -0.20 | 0.91 | 1.11 |  |
| 28 | Samira | -0.20 | 0.53 | 0.73 | projectile block (Blade Whirl) |
| 29 | Dr. Mundo | -0.23 | 0.00 | 0.23 |  |
| 30 | Singed | -0.25 | 0.68 | 0.93 |  |
| 31 | Teemo | -0.25 | 0.59 | 0.84 |  |
| 32 | Kindred | -0.25 | 0.20 | 0.45 |  |
| 33 | Jax | -0.27 | 0.82 | 1.09 | attack dodge (Counter Strike) |
| 34 | Rengar | -0.29 | 0.71 | 1.00 |  |
| 35 | Nasus | -0.29 | 0.27 | 0.56 |  |
| 36 | Nidalee | -0.30 | 0.13 | 0.43 |  |
| 37 | Shaco | -0.31 | 0.94 | 1.25 |  |
| 38 | Cassiopeia | -0.32 | 0.77 | 1.09 |  |
| 39 | Zeri | -0.34 | 0.21 | 0.55 |  |
| 40 | Zilean | -0.34 | 0.15 | 0.49 |  |
| 41 | Kayn | -0.35 | 0.94 | 1.29 |  |
| 42 | Lulu | -0.35 | 0.42 | 0.77 |  |
| 43 | Milio | -0.36 | 0.34 | 0.70 |  |
| 44 | Malzahar | -0.37 | 0.82 | 1.19 |  |
| 45 | Braum | -0.40 | 0.40 | 0.80 | projectile block (Unbreakable) |
| 46 | Veigar | -0.41 | 0.57 | 0.98 |  |
| 47 | Garen | -0.42 | 0.32 | 0.74 |  |
| 48 | Taric | -0.42 | 0.00 | 0.42 |  |
| 49 | Warwick | -0.43 | 1.03 | 1.46 |  |
| 50 | Camille | -0.43 | 0.90 | 1.33 |  |
| 51 | Nilah | -0.43 | 0.61 | 1.04 | attack dodge (Jubilant Veil) |
| 52 | Viktor | -0.44 | 0.62 | 1.06 |  |
| 53 | Ahri | -0.45 | 0.60 | 1.05 |  |
| 54 | Mel | -0.45 | 0.53 | 0.98 | projectile block (Rebuttal) |
| 55 | Pantheon | -0.50 | 0.75 | 1.25 |  |
| 56 | Maokai | -0.51 | 1.03 | 1.54 |  |
| 57 | Zaahen | -0.51 | 0.83 | 1.34 |  |
| 58 | Twisted Fate | -0.52 | 0.19 | 0.71 |  |
| 59 | Yorick | -0.54 | 0.00 | 0.54 |  |
| 60 | Zoe | -0.55 | 0.15 | 0.70 |  |
| 61 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 62 | Alistar | -0.57 | 0.68 | 1.25 |  |
| 63 | Yasuo | -0.57 | 0.40 | 0.97 | projectile block (Wind Wall) |
| 64 | Soraka | -0.57 | 0.13 | 0.70 |  |
| 65 | Smolder | -0.58 | 0.15 | 0.73 |  |
| 66 | Kled | -0.59 | 0.74 | 1.33 |  |
| 67 | Hwei | -0.60 | 0.66 | 1.26 | dash stop (Grim Visage) |
| 68 | Graves | -0.60 | 0.10 | 0.70 |  |
| 69 | Ashe | -0.62 | 0.18 | 0.80 |  |
| 70 | LeBlanc | -0.62 | 0.10 | 0.72 |  |
| 71 | Ezreal | -0.63 | 0.15 | 0.78 |  |
| 72 | Miss Fortune | -0.64 | 0.15 | 0.79 |  |
| 73 | Quinn | -0.65 | 0.17 | 0.82 |  |
| 74 | Illaoi | -0.66 | 0.08 | 0.74 |  |
| 75 | Evelynn | -0.67 | 0.94 | 1.61 |  |
| 76 | Kennen | -0.69 | 0.14 | 0.83 |  |
| 77 | Xin Zhao | -0.70 | 0.58 | 1.28 |  |
| 78 | Poppy | -0.71 | 0.69 | 1.40 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 79 | Sylas | -0.71 | 0.00 | 0.71 |  |
| 80 | Akshan | -0.72 | 0.15 | 0.87 |  |
| 81 | Varus | -0.73 | 0.13 | 0.86 |  |
| 82 | Tristana | -0.74 | 0.18 | 0.92 |  |
| 83 | Sona | -0.75 | 0.19 | 0.94 |  |
| 84 | Karthus | -0.75 | 0.08 | 0.83 |  |
| 85 | Lillia | -0.76 | 0.04 | 0.80 |  |
| 86 | Renekton | -0.76 | 0.00 | 0.76 |  |
| 87 | Shen | -0.77 | 0.79 | 1.56 | attack block (Spirit's Refuge) |
| 88 | Jayce | -0.78 | 0.13 | 0.91 |  |
| 89 | Katarina | -0.78 | 0.00 | 0.78 |  |
| 90 | Skarner | -0.79 | 0.15 | 0.94 |  |
| 91 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 92 | Kassadin | -0.82 | 0.00 | 0.82 |  |
| 93 | Karma | -0.83 | 0.10 | 0.93 |  |
| 94 | Aatrox | -0.83 | 0.00 | 0.83 |  |
| 95 | Heimerdinger | -0.84 | 0.21 | 1.05 |  |
| 96 | Vayne | -0.84 | 0.20 | 1.04 |  |
| 97 | Corki | -0.84 | 0.14 | 0.98 |  |
| 98 | Lux | -0.84 | 0.14 | 0.98 |  |
| 99 | Lucian | -0.85 | 0.16 | 1.01 |  |
| 100 | Annie | -0.85 | 0.11 | 0.96 |  |
| 101 | Azir | -0.86 | 0.12 | 0.98 |  |
| 102 | Kha'Zix | -0.86 | 0.00 | 0.86 |  |
| 103 | Draven | -0.87 | 0.17 | 1.04 |  |
| 104 | Brand | -0.89 | 0.10 | 0.99 |  |
| 105 | Elise | -0.90 | 0.15 | 1.05 |  |
| 106 | Orianna | -0.91 | 0.12 | 1.03 |  |
| 107 | Aphelios | -0.92 | 0.30 | 1.22 |  |
| 108 | Mordekaiser | -0.92 | 0.06 | 0.98 |  |
| 109 | Diana | -0.92 | 0.00 | 0.92 |  |
| 110 | Syndra | -0.94 | 0.10 | 1.04 |  |
| 111 | Bel'Veth | -0.94 | 0.00 | 0.94 |  |
| 112 | Wukong | -0.96 | 0.00 | 0.96 |  |
| 113 | Renata Glasc | -0.97 | 0.18 | 1.15 |  |
| 114 | Ivern | -0.97 | 0.08 | 1.05 |  |
| 115 | Sett | -0.97 | 0.08 | 1.05 |  |
| 116 | Yone | -0.99 | 0.36 | 1.35 |  |
| 117 | Gnar | -0.99 | 0.14 | 1.13 |  |
| 118 | Talon | -0.99 | 0.00 | 0.99 |  |
| 119 | Ziggs | -1.00 | 0.13 | 1.13 |  |
| 120 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 121 | Akali | -1.01 | 0.00 | 1.01 |  |
| 122 | Blitzcrank | -1.01 | 0.00 | 1.01 |  |
| 123 | Seraphine | -1.02 | 0.13 | 1.15 |  |
| 124 | Swain | -1.02 | 0.09 | 1.11 |  |
| 125 | Malphite | -1.03 | 0.26 | 1.29 |  |
| 126 | Anivia | -1.03 | 0.12 | 1.15 |  |
| 127 | Vel'Koz | -1.03 | 0.12 | 1.15 |  |
| 128 | Zyra | -1.03 | 0.12 | 1.15 |  |
| 129 | Darius | -1.03 | 0.00 | 1.03 |  |
| 130 | Trundle | -1.03 | 0.00 | 1.03 |  |
| 131 | Shyvana | -1.04 | 0.08 | 1.12 |  |
| 132 | Cho'Gath | -1.04 | 0.00 | 1.04 |  |
| 133 | Xerath | -1.05 | 0.12 | 1.17 |  |
| 134 | Irelia | -1.06 | 0.00 | 1.06 |  |
| 135 | Caitlyn | -1.07 | 0.18 | 1.25 |  |
| 136 | Aurelion Sol | -1.07 | 0.10 | 1.17 |  |
| 137 | Senna | -1.08 | 0.16 | 1.24 |  |
| 138 | Locke | -1.08 | 0.00 | 1.08 |  |
| 139 | Riven | -1.09 | 0.00 | 1.09 |  |
| 140 | Ryze | -1.10 | 0.11 | 1.21 |  |
| 141 | Amumu | -1.13 | 0.27 | 1.40 |  |
| 142 | Nami | -1.16 | 0.10 | 1.26 |  |
| 143 | Neeko | -1.16 | 0.10 | 1.26 |  |
| 144 | Hecarim | -1.16 | 0.08 | 1.24 |  |
| 145 | Urgot | -1.19 | 0.06 | 1.25 |  |
| 146 | Nautilus | -1.20 | 0.00 | 1.20 |  |
| 147 | Volibear | -1.21 | 0.08 | 1.29 |  |
| 148 | Rammus | -1.23 | 0.27 | 1.50 |  |
| 149 | Zac | -1.24 | 0.57 | 1.81 | dash stop (Stretching Strikes) |
| 150 | Ekko | -1.24 | 0.00 | 1.24 |  |
| 151 | Jhin | -1.25 | 0.13 | 1.38 |  |
| 152 | Nunu & Willump | -1.26 | 0.31 | 1.57 |  |
| 153 | Jarvan IV | -1.26 | 0.08 | 1.34 |  |
| 154 | Thresh | -1.26 | 0.08 | 1.34 |  |
| 155 | Janna | -1.27 | 0.17 | 1.44 |  |
| 156 | Leona | -1.33 | 0.00 | 1.33 |  |
| 157 | Rakan | -1.35 | 0.05 | 1.40 |  |
| 158 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 159 | Fiddlesticks | -1.36 | 0.08 | 1.44 |  |
| 160 | Vi | -1.46 | 0.08 | 1.54 |  |
| 161 | K'Sante | -1.47 | 0.16 | 1.63 |  |
| 162 | Ornn | -1.48 | 0.08 | 1.56 |  |
| 163 | Briar | -1.50 | 0.00 | 1.50 |  |
| 164 | Sejuani | -1.50 | 0.00 | 1.50 |  |
| 165 | Qiyana | -1.53 | 0.00 | 1.53 |  |
| 166 | Gragas | -1.55 | 0.00 | 1.55 |  |
| 167 | Pyke | -1.55 | 0.00 | 1.55 |  |
| 168 | Viego | -1.60 | 0.08 | 1.68 |  |
| 169 | Tahm Kench | -1.60 | 0.00 | 1.60 |  |
| 170 | Rell | -1.68 | 0.00 | 1.68 |  |
| 171 | Taliyah | -1.83 | 0.12 | 1.95 |  |
| 172 | Galio | -1.88 | 0.00 | 1.88 |  |
