# Counters to Kayn (patch 26.20)

Every champion ranked by what its kit does against Kayn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kayn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kayn` for the full ledger of a matchup, with sources.

## Top 10

### 1. Singed (net +1.37)

- **0.45** interrupt: Fling's airborne interrupts Kayn's Umbral Trespass (movement channel). Fling must land during the channel. (Singed E Fling → Kayn R Umbral Trespass)
- **0.44** grounding: Mega Adhesive grounds Kayn, who then can't cast Umbral Trespass. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Kayn R Umbral Trespass)
- **0.39** grounding: Mega Adhesive grounds Kayn, who then can't cast Reaping Slash. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Kayn Q Reaping Slash)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Singed's Fling.

### 2. Rell (net +1.08)

- **0.45** interrupt: Ferromancy: Crash Down's airborne interrupts Kayn's Umbral Trespass (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Kayn R Umbral Trespass)
- **0.45** interrupt: Ferromancy: Mount Up's airborne interrupts Kayn's Umbral Trespass (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Kayn R Umbral Trespass)
- **0.45** interrupt: Full Tilt's stun interrupts Kayn's Umbral Trespass (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Rell's Magnet Storm.

### 3. Sivir (net +0.99)

- **0.49** spell shield: Spell Shield's spell shield blocks Kayn's Blade's Reach. Spell shield for 1.5 s, long enough to use ahead of Blade's Reach. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kayn W Blade's Reach)
- **0.45** spell shield: Spell Shield's spell shield blocks part of Kayn's Umbral Trespass. Spell shield for 1.5 s, long enough to use ahead of Umbral Trespass. A spell shield blocks only the first enemy ability that reaches it. If Umbral Trespass is targeted on an enemy with a spell shield or a Fiora with her Riposte active, the ability will fail to cast entirely, being placed on full cooldown without triggering the active's effects (as well as on-cast effects).
  - Spell shield will not block the damage from the recast. (Sivir E Spell Shield → Kayn R Umbral Trespass)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Kayn's (500 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Sivir basic attacks → Kayn basic attacks)

### 4. Blitzcrank (net +0.82)

- **0.45** interrupt: Power Fist's airborne interrupts Kayn's Umbral Trespass (movement channel). Power Fist must land during the channel. (Blitzcrank E Power Fist → Kayn R Umbral Trespass)
- **0.45** interrupt: Rocket Grab's airborne interrupts Kayn's Umbral Trespass (movement channel). Rocket Grab must land during the channel. (Blitzcrank Q Rocket Grab → Kayn R Umbral Trespass)
- **0.45** interrupt: Static Field's silence interrupts Kayn's Umbral Trespass (movement channel). Static Field must land during the channel. (Blitzcrank R Static Field → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Blitzcrank's Rocket Grab.

### 5. Kayle (net +0.65)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Kayn's Umbral Trespass (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Umbral Trespass. (Kayle R Divine Judgment → Kayn R Umbral Trespass)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Kayn's (625 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Kayle basic attacks → Kayn basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Kayn's Blade's Reach (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Blade's Reach. (Kayle R Divine Judgment → Kayn W Blade's Reach)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Kayle's Starfire Spellblade.

### 6. Fiora (net +0.62)

- **0.62** parry: Riposte parries Kayn's Blade's Reach and stuns back. Parry for 0.75 s; Blade's Reach takes 0.55 s to land, enough to react. Negating Blade's Reach's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kayn W Blade's Reach)
- **0.54** parry: Riposte parries Kayn's Umbral Trespass. Parry for 0.75 s; Umbral Trespass lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Kayn R Umbral Trespass)
- **0.06** attack speed slow: Riposte cuts Kayn's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Fiora's Riposte.

### 7. Lulu (net +0.60)

- **0.45** interrupt: Whimsy's polymorph interrupts Kayn's Umbral Trespass (movement channel). Whimsy must land during the channel. (Lulu W Whimsy → Kayn R Umbral Trespass)
- **0.45** interrupt: Wild Growth's airborne interrupts Kayn's Umbral Trespass (movement channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Kayn R Umbral Trespass)
- **0.22** disarm: Whimsy disarms Kayn for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Lulu's Wild Growth.

### 8. Heimerdinger (net +0.58)

- **0.45** interrupt: CH-2 Electron Storm Grenade's stun interrupts Kayn's Umbral Trespass (movement channel). CH-2 Electron Storm Grenade must land during the channel. (Heimerdinger E CH-2 Electron Storm Grenade → Kayn R Umbral Trespass)
- **0.45** interrupt: CH-3X Lightning Grenade's stun interrupts Kayn's Umbral Trespass (movement channel). CH-3X Lightning Grenade must land during the channel. (Heimerdinger E CH-3X Lightning Grenade → Kayn R Umbral Trespass)
- **0.12** range: Heimerdinger's basic attacks reach 375 units farther than Kayn's (550 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Heimerdinger basic attacks → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Heimerdinger's CH-2 Electron Storm Grenade.

### 9. Udyr (net +0.58)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Kayn's Blade's Reach (airborne, slow). Immune for 1.5 s, long enough to use ahead of Blade's Reach. (Udyr E Blazing Stampede → Kayn W Blade's Reach)
- **0.45** interrupt: Blazing Stampede's stun interrupts Kayn's Umbral Trespass (movement channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Udyr's Blazing Stampede.

### 10. Alistar (net +0.56)

- **0.45** interrupt: Pulverize's airborne interrupts Kayn's Umbral Trespass (movement channel). Pulverize must land during the channel. (Alistar Q Pulverize → Kayn R Umbral Trespass)
- **0.45** interrupt: Trample's stun interrupts Kayn's Umbral Trespass (movement channel). Trample must land during the channel. (Alistar E Trample → Kayn R Umbral Trespass)
- **0.26** cleanse: Unbreakable Will cleanses Kayn's Blade's Reach (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Kayn W Blade's Reach)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Alistar's Headbutt.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.37 | 1.80 | 0.43 | grounding (Mega Adhesive) |
| 2 | Rell | +1.08 | 2.25 | 1.17 |  |
| 3 | Sivir | +0.99 | 0.99 | 0.00 |  |
| 4 | Blitzcrank | +0.82 | 1.35 | 0.53 |  |
| 5 | Kayle | +0.65 | 0.77 | 0.12 |  |
| 6 | Fiora | +0.62 | 0.91 | 0.29 |  |
| 7 | Lulu | +0.60 | 1.23 | 0.63 |  |
| 8 | Heimerdinger | +0.58 | 1.09 | 0.51 |  |
| 9 | Udyr | +0.58 | 0.93 | 0.35 |  |
| 10 | Alistar | +0.56 | 1.16 | 0.60 |  |
| 11 | Anivia | +0.45 | 1.06 | 0.61 |  |
| 12 | Malzahar | +0.43 | 1.46 | 1.03 |  |
| 13 | Viktor | +0.43 | 1.21 | 0.78 |  |
| 14 | Gnar | +0.43 | 1.09 | 0.66 |  |
| 15 | Milio | +0.43 | 0.76 | 0.33 |  |
| 16 | Sion | +0.42 | 1.07 | 0.65 |  |
| 17 | Zilean | +0.42 | 0.65 | 0.23 |  |
| 18 | Shaco | +0.37 | 0.92 | 0.55 |  |
| 19 | Riven | +0.37 | 0.90 | 0.53 |  |
| 20 | Nocturne | +0.35 | 1.35 | 1.00 |  |
| 21 | Fizz | +0.35 | 1.29 | 0.94 |  |
| 22 | Xayah | +0.35 | 0.78 | 0.43 |  |
| 23 | Vladimir | +0.34 | 0.85 | 0.51 |  |
| 24 | Zoe | +0.30 | 0.65 | 0.35 |  |
| 25 | Soraka | +0.26 | 0.62 | 0.36 |  |
| 26 | Yasuo | +0.25 | 0.90 | 0.65 |  |
| 27 | Master Yi | +0.25 | 0.74 | 0.49 |  |
| 28 | Cassiopeia | +0.24 | 1.21 | 0.97 | grounding (Miasma) |
| 29 | Camille | +0.24 | 1.10 | 0.86 |  |
| 30 | Taric | +0.24 | 0.45 | 0.21 |  |
| 31 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 32 | Aurelion Sol | +0.21 | 0.99 | 0.78 |  |
| 33 | Vayne | +0.20 | 0.72 | 0.52 |  |
| 34 | Sejuani | +0.19 | 1.32 | 1.13 |  |
| 35 | Cho'Gath | +0.19 | 0.90 | 0.71 |  |
| 36 | Jayce | +0.19 | 0.63 | 0.44 |  |
| 37 | Thresh | +0.18 | 1.01 | 0.83 |  |
| 38 | Yorick | +0.17 | 0.45 | 0.28 |  |
| 39 | Twisted Fate | +0.16 | 0.70 | 0.54 |  |
| 40 | Quinn | +0.16 | 0.67 | 0.51 |  |
| 41 | Corki | +0.16 | 0.64 | 0.48 |  |
| 42 | Twitch | +0.16 | 0.27 | 0.11 |  |
| 43 | Sett | +0.14 | 0.94 | 0.80 |  |
| 44 | Aurora | +0.14 | 0.64 | 0.50 |  |
| 45 | Maokai | +0.13 | 1.25 | 1.12 |  |
| 46 | Elise | +0.13 | 0.65 | 0.52 |  |
| 47 | Olaf | +0.13 | 0.33 | 0.20 |  |
| 48 | Bard | +0.12 | 0.97 | 0.85 |  |
| 49 | Zaahen | +0.11 | 1.23 | 1.12 |  |
| 50 | Vex | +0.11 | 0.81 | 0.70 |  |
| 51 | Kai'Sa | +0.11 | 0.22 | 0.11 |  |
| 52 | Sylas | +0.10 | 0.45 | 0.35 |  |
| 53 | K'Sante | +0.09 | 1.42 | 1.33 |  |
| 54 | Renata Glasc | +0.09 | 1.07 | 0.98 |  |
| 55 | Veigar | +0.08 | 0.73 | 0.65 |  |
| 56 | Gwen | +0.08 | 0.63 | 0.55 |  |
| 57 | Teemo | +0.06 | 0.50 | 0.44 |  |
| 58 | Kindred | +0.06 | 0.27 | 0.21 |  |
| 59 | Xin Zhao | +0.05 | 1.09 | 1.04 |  |
| 60 | Yuumi | +0.05 | 1.01 | 0.96 |  |
| 61 | Braum | +0.05 | 0.85 | 0.80 |  |
| 62 | Kalista | +0.04 | 0.68 | 0.64 |  |
| 63 | Aatrox | +0.03 | 0.45 | 0.42 |  |
| 64 | Urgot | +0.02 | 0.98 | 0.96 |  |
| 65 | Lissandra | +0.02 | 0.92 | 0.90 |  |
| 66 | Rek'Sai | +0.01 | 1.08 | 1.07 |  |
| 67 | Seraphine | +0.01 | 0.98 | 0.97 |  |
| 68 | Ashe | +0.01 | 0.69 | 0.68 |  |
| 69 | Rengar | 0.00 | 0.53 | 0.53 |  |
| 70 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 71 | Nilah | -0.01 | 0.67 | 0.68 |  |
| 72 | Nami | -0.02 | 0.99 | 1.01 |  |
| 73 | Janna | -0.04 | 1.07 | 1.11 |  |
| 74 | Nidalee | -0.04 | 0.18 | 0.22 |  |
| 75 | Leona | -0.05 | 0.90 | 0.95 |  |
| 76 | Kennen | -0.05 | 0.63 | 0.68 |  |
| 77 | Shyvana | -0.05 | 0.49 | 0.54 |  |
| 78 | Nasus | -0.05 | 0.24 | 0.29 |  |
| 79 | Jinx | -0.06 | 0.45 | 0.51 |  |
| 80 | Garen | -0.07 | 0.57 | 0.64 |  |
| 81 | Draven | -0.08 | 0.67 | 0.75 |  |
| 82 | Morgana | -0.09 | 0.63 | 0.72 |  |
| 83 | Hwei | -0.10 | 0.73 | 0.83 |  |
| 84 | Ziggs | -0.10 | 0.62 | 0.72 |  |
| 85 | Kassadin | -0.10 | 0.45 | 0.55 |  |
| 86 | Zed | -0.10 | 0.44 | 0.54 |  |
| 87 | Kog'Maw | -0.10 | 0.16 | 0.26 |  |
| 88 | Fiddlesticks | -0.11 | 1.01 | 1.12 |  |
| 89 | Amumu | -0.11 | 0.94 | 1.05 |  |
| 90 | Rakan | -0.11 | 0.93 | 1.04 |  |
| 91 | Kled | -0.12 | 1.04 | 1.16 |  |
| 92 | Bel'Veth | -0.12 | 0.45 | 0.57 |  |
| 93 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 94 | Varus | -0.13 | 0.66 | 0.79 |  |
| 95 | Zac | -0.14 | 1.48 | 1.62 |  |
| 96 | Katarina | -0.14 | 0.48 | 0.62 |  |
| 97 | Ahri | -0.15 | 0.72 | 0.87 |  |
| 98 | Yone | -0.16 | 1.06 | 1.22 |  |
| 99 | Annie | -0.16 | 0.60 | 0.76 |  |
| 100 | Vel'Koz | -0.17 | 0.61 | 0.78 |  |
| 101 | Brand | -0.17 | 0.59 | 0.76 |  |
| 102 | Syndra | -0.17 | 0.59 | 0.76 |  |
| 103 | Samira | -0.18 | 0.18 | 0.36 |  |
| 104 | Warwick | -0.20 | 1.18 | 1.38 |  |
| 105 | Sona | -0.20 | 0.66 | 0.86 |  |
| 106 | Mordekaiser | -0.20 | 0.51 | 0.71 |  |
| 107 | Renekton | -0.20 | 0.45 | 0.65 |  |
| 108 | Swain | -0.21 | 0.57 | 0.78 |  |
| 109 | Gangplank | -0.21 | 0.44 | 0.65 |  |
| 110 | LeBlanc | -0.21 | 0.13 | 0.34 |  |
| 111 | Tahm Kench | -0.22 | 1.35 | 1.57 |  |
| 112 | Poppy | -0.22 | 0.97 | 1.19 | dash stop (Steadfast Presence) |
| 113 | Tristana | -0.22 | 0.64 | 0.86 |  |
| 114 | Xerath | -0.22 | 0.61 | 0.83 |  |
| 115 | Jax | -0.23 | 0.57 | 0.80 |  |
| 116 | Lee Sin | -0.23 | 0.45 | 0.68 |  |
| 117 | Zeri | -0.23 | 0.28 | 0.51 |  |
| 118 | Galio | -0.24 | 1.23 | 1.47 |  |
| 119 | Wukong | -0.24 | 0.42 | 0.66 |  |
| 120 | Rammus | -0.26 | 1.14 | 1.40 |  |
| 121 | Taliyah | -0.27 | 1.42 | 1.69 |  |
| 122 | Gragas | -0.28 | 0.90 | 1.18 |  |
| 123 | Evelynn | -0.29 | 0.92 | 1.21 |  |
| 124 | Shen | -0.30 | 0.69 | 0.99 |  |
| 125 | Orianna | -0.30 | 0.61 | 0.91 |  |
| 126 | Darius | -0.31 | 0.45 | 0.76 |  |
| 127 | Irelia | -0.31 | 0.45 | 0.76 |  |
| 128 | Karma | -0.31 | 0.13 | 0.44 |  |
| 129 | Azir | -0.32 | 0.58 | 0.90 |  |
| 130 | Trundle | -0.32 | 0.45 | 0.77 |  |
| 131 | Pyke | -0.34 | 0.90 | 1.24 |  |
| 132 | Ornn | -0.36 | 0.92 | 1.28 |  |
| 133 | Skarner | -0.36 | 0.51 | 0.87 |  |
| 134 | Lillia | -0.37 | 0.43 | 0.80 |  |
| 135 | Lux | -0.38 | 0.18 | 0.56 |  |
| 136 | Zyra | -0.39 | 0.58 | 0.97 |  |
| 137 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 138 | Diana | -0.41 | 0.45 | 0.86 |  |
| 139 | Neeko | -0.43 | 0.56 | 0.99 |  |
| 140 | Ezreal | -0.46 | 0.20 | 0.66 |  |
| 141 | Graves | -0.46 | 0.14 | 0.60 |  |
| 142 | Smolder | -0.47 | 0.20 | 0.67 |  |
| 143 | Ivern | -0.50 | 0.11 | 0.61 |  |
| 144 | Miss Fortune | -0.53 | 0.20 | 0.73 |  |
| 145 | Malphite | -0.54 | 0.60 | 1.14 |  |
| 146 | Nautilus | -0.54 | 0.45 | 0.99 |  |
| 147 | Talon | -0.54 | 0.00 | 0.54 |  |
| 148 | Viego | -0.55 | 0.94 | 1.49 |  |
| 149 | Mel | -0.55 | 0.17 | 0.72 |  |
| 150 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 151 | Nunu & Willump | -0.56 | 0.55 | 1.11 |  |
| 152 | Illaoi | -0.56 | 0.07 | 0.63 |  |
| 153 | Volibear | -0.58 | 0.52 | 1.10 |  |
| 154 | Senna | -0.58 | 0.22 | 0.80 |  |
| 155 | Pantheon | -0.59 | 0.57 | 1.16 |  |
| 156 | Ambessa | -0.60 | 0.40 | 1.00 |  |
| 157 | Ryze | -0.65 | 0.15 | 0.80 |  |
| 158 | Vi | -0.66 | 0.91 | 1.57 |  |
| 159 | Akshan | -0.67 | 0.19 | 0.86 |  |
| 160 | Hecarim | -0.69 | 0.44 | 1.13 |  |
| 161 | Aphelios | -0.69 | 0.31 | 1.00 |  |
| 162 | Lucian | -0.72 | 0.21 | 0.93 |  |
| 163 | Karthus | -0.72 | 0.11 | 0.83 |  |
| 164 | Jarvan IV | -0.73 | 0.45 | 1.18 |  |
| 165 | Qiyana | -0.73 | 0.36 | 1.09 |  |
| 166 | Locke | -0.74 | 0.00 | 0.74 |  |
| 167 | Caitlyn | -0.76 | 0.24 | 1.00 |  |
| 168 | Briar | -0.79 | 0.45 | 1.24 |  |
| 169 | Akali | -0.83 | 0.00 | 0.83 |  |
| 170 | Ekko | -0.87 | 0.00 | 0.87 |  |
| 171 | Jhin | -0.90 | 0.17 | 1.07 |  |
| 172 | Naafiri | -1.35 | 0.00 | 1.35 |  |
