# Counters to Tryndamere (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 24 other champions with a simulator kit against Tryndamere: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Tryndamere wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Tryndamere --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Teemo | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 2 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 3 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 4 | Urgot | −0.20 | −1.00 | −1.00 | +1.00 | +0.31 | +1.00 | −1.00 |
| 5 | Poppy | −0.67 | −1.00 | −1.00 | −1.00 | +0.68 | – | +0.00 |
| 6 | Ornn | −0.73 | −1.00 | −1.00 | −1.00 | +0.30 | – | +0.00 |
| 7 | Yone | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 8 | Camille | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 9 | Yasuo | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 10 | Jax | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 11 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.49 | – | −1.00 |
| 12 | Malphite | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 13 | Irelia | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 14 | Dr. Mundo | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 15 | Renekton | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 16 | Mordekaiser | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 17 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 18 | Fiora | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 19 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 20 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | +0.30 | – | −1.00 |
| 21 | Volibear | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 22 | Gwen | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 23 | Aatrox | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | – | −1.00 |
| 24 | Olaf | −0.83 | −1.00 | −1.00 | −1.00 | +0.00 | – | −1.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Tryndamere's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Tryndamere's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Tryndamere` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +0.86)

- **0.57** blind: Blinding Dart's blind makes Tryndamere's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Tryndamere basic attacks)
- **0.29** range: Teemo's basic attacks reach 325 units farther than Tryndamere's (500 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Teemo basic attacks → Tryndamere basic attacks)

#### 2. Lulu (net +0.74)

- **0.40** disarm: Whimsy disarms Tryndamere for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Tryndamere basic attacks)
- **0.34** range: Lulu's basic attacks reach 375 units farther than Tryndamere's (550 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Lulu basic attacks → Tryndamere basic attacks)

#### 3. Singed (net +0.66)

- **0.39** grounding: Mega Adhesive grounds Tryndamere, who then can't cast Spinning Slash. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Tryndamere E Spinning Slash)
- **0.18** anti-heal: Insanity Potion's Grievous Wounds cuts Tryndamere's healing from Bloodlust by 40%. (Singed R Insanity Potion → Tryndamere Q Bloodlust)
- **0.09** anti-heal: Poison Trail's Grievous Wounds cuts Tryndamere's healing from Bloodlust by 40%. while under the effects of. (Singed Q Poison Trail → Tryndamere Q Bloodlust)

#### 4. Jinx (net +0.60)

- **0.35** dash stop: Flame Chompers!'s knockdown can stop Tryndamere's Spinning Slash mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Jinx E Flame Chompers! → Tryndamere E Spinning Slash)
- **0.25** range: Jinx's basic attacks reach 350 units farther than Tryndamere's (525 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Jinx basic attacks → Tryndamere basic attacks)

#### 5. Cassiopeia (net +0.59)

- **0.38** grounding: Miasma grounds Tryndamere, who then can't cast Spinning Slash. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Tryndamere E Spinning Slash)
- **0.21** range: Cassiopeia's basic attacks reach 375 units farther than Tryndamere's (550 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Cassiopeia basic attacks → Tryndamere basic attacks)

#### 6. Viktor (net +0.59)

- **0.31** dash stop: Gravity Field's knockdown can stop Tryndamere's Spinning Slash mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Viktor W Gravity Field → Tryndamere E Spinning Slash)
- **0.28** range: Viktor's basic attacks reach 350 units farther than Tryndamere's (525 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Viktor basic attacks → Tryndamere basic attacks)

#### 7. Hwei (net +0.56)

- **0.35** dash stop: Grim Visage's knockdown can stop Tryndamere's Spinning Slash mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Tryndamere E Spinning Slash)
- **0.21** range: Hwei's basic attacks reach 375 units farther than Tryndamere's (550 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Hwei basic attacks → Tryndamere basic attacks)

#### 8. Ahri (net +0.53)

- **0.32** dash stop: Charm's knockdown can stop Tryndamere's Spinning Slash mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Ahri E Charm → Tryndamere E Spinning Slash)
- **0.21** range: Ahri's basic attacks reach 375 units farther than Tryndamere's (550 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Ahri basic attacks → Tryndamere basic attacks)

#### 9. Vex (net +0.53)

- **0.28** dash stop: Doom 'n Gloom's knockdown can stop Tryndamere's Spinning Slash mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Vex I Doom 'n Gloom → Tryndamere E Spinning Slash)
- **0.25** range: Vex's basic attacks reach 375 units farther than Tryndamere's (550 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Vex basic attacks → Tryndamere basic attacks)

#### 10. Veigar (net +0.52)

- **0.30** dash stop: Event Horizon's knockdown can stop Tryndamere's Spinning Slash mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Veigar E Event Horizon → Tryndamere E Spinning Slash)
- **0.22** range: Veigar's basic attacks reach 375 units farther than Tryndamere's (550 vs 175 attack range). Tryndamere closes the gap with Spinning Slash. (Veigar basic attacks → Tryndamere basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.86 | 0.86 | 0.00 | blind (Blinding Dart) |
| 2 | Lulu | +0.74 | 0.74 | 0.00 | disarm (Whimsy) |
| 3 | Singed | +0.66 | 0.66 | 0.00 |  |
| 4 | Jinx | +0.60 | 0.60 | 0.00 |  |
| 5 | Cassiopeia | +0.59 | 0.59 | 0.00 |  |
| 6 | Viktor | +0.59 | 0.59 | 0.00 |  |
| 7 | Hwei | +0.56 | 0.56 | 0.00 |  |
| 8 | Ahri | +0.53 | 0.53 | 0.00 |  |
| 9 | Vex | +0.53 | 0.53 | 0.00 |  |
| 10 | Veigar | +0.52 | 0.52 | 0.00 |  |
| 11 | Poppy | +0.50 | 0.50 | 0.00 | dash stop (Steadfast Presence) |
| 12 | Jax | +0.46 | 0.46 | 0.00 | attack dodge (Counter Strike) |
| 13 | Varus | +0.45 | 0.45 | 0.00 |  |
| 14 | Nasus | +0.43 | 0.43 | 0.00 | attack speed slow (Wither) |
| 15 | Rammus | +0.43 | 0.43 | 0.00 | attack reflect (Defensive Ball Curl) |
| 16 | Shen | +0.43 | 0.43 | 0.00 | attack block (Spirit's Refuge) |
| 17 | Malzahar | +0.42 | 0.42 | 0.00 |  |
| 18 | Aphelios | +0.41 | 0.41 | 0.00 |  |
| 19 | Kindred | +0.41 | 0.41 | 0.00 |  |
| 20 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 21 | Zeri | +0.41 | 0.41 | 0.00 |  |
| 22 | Milio | +0.40 | 0.40 | 0.00 |  |
| 23 | Nilah | +0.40 | 0.40 | 0.00 | attack dodge (Jubilant Veil) |
| 24 | Twitch | +0.40 | 0.40 | 0.00 |  |
| 25 | Vayne | +0.40 | 0.40 | 0.00 |  |
| 26 | Zac | +0.40 | 0.40 | 0.00 | dash stop (Stretching Strikes) |
| 27 | Lissandra | +0.39 | 0.39 | 0.00 |  |
| 28 | Sona | +0.39 | 0.39 | 0.00 |  |
| 29 | Twisted Fate | +0.38 | 0.38 | 0.00 |  |
| 30 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 31 | Caitlyn | +0.36 | 0.36 | 0.00 |  |
| 32 | Kayle | +0.36 | 0.36 | 0.00 |  |
| 33 | Renata Glasc | +0.36 | 0.36 | 0.00 |  |
| 34 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 35 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 36 | Janna | +0.34 | 0.34 | 0.00 |  |
| 37 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 38 | Quinn | +0.34 | 0.34 | 0.00 |  |
| 39 | Xayah | +0.34 | 0.34 | 0.00 |  |
| 40 | Kalista | +0.32 | 0.32 | 0.00 |  |
| 41 | Senna | +0.32 | 0.32 | 0.00 |  |
| 42 | Bard | +0.31 | 0.31 | 0.00 |  |
| 43 | Lucian | +0.31 | 0.31 | 0.00 |  |
| 44 | Elise | +0.30 | 0.30 | 0.00 |  |
| 45 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 46 | Miss Fortune | +0.30 | 0.30 | 0.00 |  |
| 47 | Zilean | +0.30 | 0.30 | 0.00 |  |
| 48 | Zoe | +0.30 | 0.30 | 0.00 |  |
| 49 | Akshan | +0.29 | 0.29 | 0.00 |  |
| 50 | Gnar | +0.29 | 0.29 | 0.00 |  |
| 51 | Corki | +0.28 | 0.28 | 0.00 |  |
| 52 | Malphite | +0.28 | 0.28 | 0.00 |  |
| 53 | Aurora | +0.27 | 0.27 | 0.00 |  |
| 54 | Kennen | +0.27 | 0.27 | 0.00 |  |
| 55 | Lux | +0.27 | 0.27 | 0.00 |  |
| 56 | Yuumi | +0.27 | 0.27 | 0.00 |  |
| 57 | Jayce | +0.26 | 0.26 | 0.00 |  |
| 58 | Morgana | +0.26 | 0.26 | 0.00 |  |
| 59 | Nidalee | +0.26 | 0.26 | 0.00 |  |
| 60 | Samira | +0.26 | 0.26 | 0.00 |  |
| 61 | Jhin | +0.25 | 0.25 | 0.00 |  |
| 62 | Mel | +0.25 | 0.25 | 0.00 |  |
| 63 | Seraphine | +0.25 | 0.25 | 0.00 |  |
| 64 | Soraka | +0.25 | 0.25 | 0.00 |  |
| 65 | Ziggs | +0.25 | 0.25 | 0.00 |  |
| 66 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 67 | Heimerdinger | +0.24 | 0.24 | 0.00 |  |
| 68 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 69 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 70 | Azir | +0.23 | 0.23 | 0.00 |  |
| 71 | Orianna | +0.23 | 0.23 | 0.00 |  |
| 72 | Taliyah | +0.23 | 0.23 | 0.00 |  |
| 73 | Vel'Koz | +0.23 | 0.23 | 0.00 |  |
| 74 | Xerath | +0.23 | 0.23 | 0.00 |  |
| 75 | Annie | +0.22 | 0.22 | 0.00 |  |
| 76 | Ryze | +0.22 | 0.22 | 0.00 |  |
| 77 | Warwick | +0.22 | 0.22 | 0.00 |  |
| 78 | Brand | +0.21 | 0.21 | 0.00 |  |
| 79 | Nami | +0.21 | 0.21 | 0.00 |  |
| 80 | Neeko | +0.21 | 0.21 | 0.00 |  |
| 81 | Graves | +0.20 | 0.20 | 0.00 |  |
| 82 | Karma | +0.19 | 0.19 | 0.00 |  |
| 83 | LeBlanc | +0.19 | 0.19 | 0.00 |  |
| 84 | Amumu | +0.18 | 0.18 | 0.00 |  |
| 85 | Katarina | +0.18 | 0.18 | 0.00 |  |
| 86 | Swain | +0.18 | 0.18 | 0.00 |  |
| 87 | Yone | +0.18 | 0.18 | 0.00 |  |
| 88 | Fiddlesticks | +0.17 | 0.17 | 0.00 |  |
| 89 | Ivern | +0.16 | 0.16 | 0.00 |  |
| 90 | Karthus | +0.16 | 0.16 | 0.00 |  |
| 91 | Thresh | +0.16 | 0.16 | 0.00 |  |
| 92 | Vladimir | +0.15 | 0.15 | 0.00 |  |
| 93 | Nunu & Willump | +0.14 | 0.14 | 0.00 |  |
| 94 | Kled | +0.13 | 0.13 | 0.00 |  |
| 95 | Garen | +0.12 | 0.12 | 0.00 |  |
| 96 | Urgot | +0.12 | 0.12 | 0.00 |  |
| 97 | Smolder | +0.11 | 0.30 | 0.19 |  |
| 98 | Udyr | +0.11 | 0.11 | 0.00 |  |
| 99 | Fiora | +0.10 | 0.10 | 0.00 |  |
| 100 | Mordekaiser | +0.10 | 0.10 | 0.00 |  |
| 101 | Gangplank | +0.09 | 0.09 | 0.00 |  |
| 102 | Rakan | +0.09 | 0.09 | 0.00 |  |
| 103 | Rengar | +0.09 | 0.09 | 0.00 |  |
| 104 | Lillia | +0.08 | 0.08 | 0.00 |  |
| 105 | Master Yi | +0.07 | 0.07 | 0.00 |  |
| 106 | Olaf | +0.06 | 0.06 | 0.00 |  |
| 107 | Sion | +0.06 | 0.06 | 0.00 |  |
| 108 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 109 | Zaahen | +0.06 | 0.06 | 0.00 |  |
| 110 | Alistar | +0.05 | 0.05 | 0.00 |  |
| 111 | Aurelion Sol | +0.03 | 0.21 | 0.18 |  |
| 112 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 113 | Akali | 0.00 | 0.00 | 0.00 |  |
| 114 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 115 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 116 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 117 | Braum | 0.00 | 0.00 | 0.00 |  |
| 118 | Briar | 0.00 | 0.00 | 0.00 |  |
| 119 | Camille | 0.00 | 0.00 | 0.00 |  |
| 120 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 121 | Darius | 0.00 | 0.00 | 0.00 |  |
| 122 | Diana | 0.00 | 0.00 | 0.00 |  |
| 123 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 124 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 125 | Evelynn | 0.00 | 0.00 | 0.00 |  |
| 126 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 127 | Galio | 0.00 | 0.00 | 0.00 |  |
| 128 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 129 | Gwen | 0.00 | 0.00 | 0.00 |  |
| 130 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 131 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 132 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 133 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 134 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 135 | Kayn | 0.00 | 0.00 | 0.00 |  |
| 136 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 137 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 138 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 139 | Leona | 0.00 | 0.00 | 0.00 |  |
| 140 | Maokai | 0.00 | 0.00 | 0.00 |  |
| 141 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 142 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 143 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 144 | Nocturne | 0.00 | 0.00 | 0.00 |  |
| 145 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 146 | Pantheon | 0.00 | 0.00 | 0.00 |  |
| 147 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 148 | Rek'Sai | 0.00 | 0.00 | 0.00 |  |
| 149 | Rell | 0.00 | 0.00 | 0.00 |  |
| 150 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 151 | Riven | 0.00 | 0.00 | 0.00 |  |
| 152 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 153 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 154 | Sett | 0.00 | 0.00 | 0.00 |  |
| 155 | Shaco | 0.00 | 0.00 | 0.00 |  |
| 156 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 157 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 158 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 159 | Talon | 0.00 | 0.00 | 0.00 |  |
| 160 | Taric | 0.00 | 0.00 | 0.00 |  |
| 161 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 162 | Vi | 0.00 | 0.00 | 0.00 |  |
| 163 | Viego | 0.00 | 0.00 | 0.00 |  |
| 164 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 165 | Xin Zhao | 0.00 | 0.00 | 0.00 |  |
| 166 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 167 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 168 | Zed | 0.00 | 0.00 | 0.00 |  |
| 169 | Draven | -0.10 | 0.34 | 0.44 |  |
| 170 | Syndra | -0.23 | 0.21 | 0.44 |  |
| 171 | Locke | -0.44 | 0.00 | 0.44 |  |
| 172 | Pyke | -0.67 | 0.00 | 0.67 |  |
