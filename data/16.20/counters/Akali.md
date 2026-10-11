# Counters to Akali (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 38 other champions with a simulator kit against Akali: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Akali wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Akali --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.90 | +1.00 | +1.00 | +1.00 | +0.40 | – | +1.00 |
| 2 | Kayle | +0.88 | +1.00 | +1.00 | +1.00 | +0.55 | +1.00 | +0.00 |
| 3 | Teemo | +0.88 | +1.00 | +1.00 | +1.00 | +0.50 | +1.00 | +0.00 |
| 4 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 5 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 6 | Yasuo | +0.83 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 7 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 8 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.11 | – | +1.00 |
| 9 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 10 | Kennen | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | +0.95 | +0.00 |
| 11 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 12 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 13 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 14 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 15 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 16 | Yone | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 17 | Quinn | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 18 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 19 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 20 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 21 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 22 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 23 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 24 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 25 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 26 | Sett | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 27 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 28 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 29 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 30 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 31 | Sion | +0.69 | +0.83 | +0.83 | +1.00 | +0.01 | – | +0.00 |
| 32 | Irelia | +0.56 | +0.61 | +0.55 | +1.00 | +0.07 | – | +0.00 |
| 33 | Ambessa | +0.48 | +1.00 | −0.05 | +1.00 | −0.03 | – | +0.00 |
| 34 | Aurora | +0.24 | −0.06 | −0.06 | +0.61 | +0.31 | +1.00 | +0.00 |
| 35 | Shen | +0.19 | +0.04 | +0.04 | +0.71 | +0.06 | – | +0.00 |
| 36 | Ornn | +0.12 | +0.11 | +0.11 | +0.12 | +0.16 | – | +0.00 |
| 37 | Singed | +0.07 | +0.11 | +0.11 | +0.07 | −0.05 | – | +0.00 |
| 38 | Pantheon | −0.24 | −0.37 | −0.34 | −0.34 | +0.19 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Akali's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Akali's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Akali` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Elise (net +1.23)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Akali's Perfect Execution. Untargetable for 0.6 s; Perfect Execution takes 0.7 s to land, enough to react. (Elise E Rappel → Akali R Perfect Execution)
- **0.22** range: Elise's basic attacks reach 425 units farther than Akali's (550 vs 125 attack range). Akali closes the gap with Shuriken Flip, Perfect Execution. (Elise basic attacks → Akali basic attacks)
- **0.11** reveal: Cocoon reveals Akali through Twilight Shroud's stealth. (Elise E Cocoon → Akali W Twilight Shroud)

#### 2. Sivir (net +1.21)

- **0.90** spell shield: Spell Shield's spell shield blocks Akali's Perfect Execution. Spell shield for 1.5 s, long enough to use ahead of Perfect Execution. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Akali R Perfect Execution)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Akali's (500 vs 125 attack range). Akali closes the gap with Shuriken Flip, Perfect Execution. (Sivir basic attacks → Akali basic attacks)

#### 3. Lissandra (net +1.16)

- **0.77** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Akali's Perfect Execution. Untargetable for 2.5 s, long enough to use ahead of Perfect Execution. (Lissandra R Frozen Tomb → Akali R Perfect Execution)
- **0.38** dash stop: Frozen Tomb's knockdown can stop Akali's Perfect Execution mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Akali R Perfect Execution)
- **0.19** dash stop: Frozen Tomb's knockdown can stop Akali's Shuriken Flip mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Akali E Shuriken Flip)

#### 4. Yuumi (net +1.11)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Akali's Perfect Execution. Untargetable for ?; Perfect Execution takes 0.7 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Akali R Perfect Execution)
- **0.21** range: Yuumi's basic attacks reach 300 units farther than Akali's (425 vs 125 attack range). Akali closes the gap with Shuriken Flip, Perfect Execution. (Yuumi basic attacks → Akali basic attacks)

#### 5. Vladimir (net +1.02)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Akali's Perfect Execution. Untargetable for 2 s, long enough to use ahead of Perfect Execution. (Vladimir W Sanguine Pool → Akali R Perfect Execution)
- **0.12** range: Vladimir's basic attacks reach 325 units farther than Akali's (450 vs 125 attack range). Akali closes the gap with Shuriken Flip, Perfect Execution. (Vladimir basic attacks → Akali basic attacks)

#### 6. Bard (net +1.01)

- **0.77** untargetable: Tempered Fate makes Bard untargetable, dodging Akali's Perfect Execution. Untargetable for 2.5 s, long enough to use ahead of Perfect Execution. (Bard R Tempered Fate → Akali R Perfect Execution)
- **0.24** range: Bard's basic attacks reach 375 units farther than Akali's (500 vs 125 attack range). Akali closes the gap with Shuriken Flip, Perfect Execution. (Bard basic attacks → Akali basic attacks)

#### 7. Kayle (net +1.01)

- **0.77** invulnerable: Divine Judgment makes Kayle invulnerable to Akali's Perfect Execution. Invulnerable for 2.5 s, long enough to use ahead of Perfect Execution. (Kayle R Divine Judgment → Akali R Perfect Execution)
- **0.24** range: Kayle's basic attacks reach 500 units farther than Akali's (625 vs 125 attack range). Akali closes the gap with Shuriken Flip, Perfect Execution. (Kayle basic attacks → Akali basic attacks)

#### 8. Master Yi (net +0.99)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Akali's Perfect Execution. Untargetable for ?; Perfect Execution takes 0.7 s to land, enough to react. (Master Yi Q Alpha Strike → Akali R Perfect Execution)
- **0.06** cc immunity: Highlander makes Master Yi immune to Akali's Five Point Strike slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Akali Q Five Point Strike)
- **0.05** cleanse: Highlander cleanses Akali's Five Point Strike (slow) after it lands. 85 s cooldown; usable while crowd controlled. (Master Yi R Highlander → Akali Q Five Point Strike)

#### 9. Braum (net +0.94)

- **0.80** projectile block: Unbreakable blocks Akali's Shuriken Flip, a projectile. Unbreakable for 4 s, long enough to use ahead of Shuriken Flip. (Braum E Unbreakable → Akali E Shuriken Flip)
- **0.28** projectile block: Unbreakable blocks Akali's Five Point Strike, a projectile. Unbreakable for 4 s, long enough to use ahead of Five Point Strike. (Braum E Unbreakable → Akali Q Five Point Strike)

#### 10. Fiora (net +0.94)

- **0.90** parry: Riposte parries Akali's Perfect Execution. Parry for 0.75 s; Perfect Execution takes 0.7 s to land, enough to react. (Fiora W Riposte → Akali R Perfect Execution)
- **0.07** attack speed slow: Riposte cuts Akali's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Akali basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.23 | 1.23 | 0.00 |  |
| 2 | Sivir | +1.21 | 1.21 | 0.00 |  |
| 3 | Lissandra | +1.16 | 1.16 | 0.00 |  |
| 4 | Yuumi | +1.11 | 1.11 | 0.00 |  |
| 5 | Vladimir | +1.02 | 1.02 | 0.00 |  |
| 6 | Bard | +1.01 | 1.01 | 0.00 |  |
| 7 | Kayle | +1.01 | 1.01 | 0.00 |  |
| 8 | Master Yi | +0.99 | 0.99 | 0.00 |  |
| 9 | Braum | +0.94 | 0.94 | 0.00 | projectile block (Unbreakable) |
| 10 | Fiora | +0.94 | 0.94 | 0.00 |  |
| 11 | Kindred | +0.94 | 0.94 | 0.00 |  |
| 12 | Xayah | +0.94 | 0.94 | 0.00 |  |
| 13 | Hwei | +0.91 | 0.91 | 0.00 | dash stop (Grim Visage), dash stop (Grim Visage) |
| 14 | Ekko | +0.90 | 0.90 | 0.00 |  |
| 15 | Gwen | +0.90 | 0.90 | 0.00 |  |
| 16 | Maokai | +0.90 | 0.90 | 0.00 |  |
| 17 | Nocturne | +0.90 | 0.90 | 0.00 |  |
| 18 | Pantheon | +0.90 | 0.90 | 0.00 |  |
| 19 | Vex | +0.89 | 0.89 | 0.00 | dash stop (Doom 'n Gloom) |
| 20 | Jinx | +0.84 | 0.84 | 0.00 | dash stop (Flame Chompers!), dash stop (Flame Chompers!) |
| 21 | Viktor | +0.84 | 0.84 | 0.00 | dash stop (Gravity Field) |
| 22 | Yasuo | +0.84 | 0.84 | 0.00 | projectile block (Wind Wall) |
| 23 | Kayn | +0.83 | 0.83 | 0.00 |  |
| 24 | Rek'Sai | +0.83 | 0.83 | 0.00 |  |
| 25 | Samira | +0.82 | 0.82 | 0.00 | projectile block (Blade Whirl) |
| 26 | Ahri | +0.78 | 0.78 | 0.00 | dash stop (Charm) |
| 27 | Veigar | +0.78 | 0.78 | 0.00 | dash stop (Event Horizon) |
| 28 | Cassiopeia | +0.77 | 0.77 | 0.00 | grounding (Miasma) |
| 29 | Mel | +0.75 | 0.75 | 0.00 | projectile block (Rebuttal) |
| 30 | Poppy | +0.73 | 0.73 | 0.00 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 31 | Aurora | +0.72 | 0.87 | 0.15 |  |
| 32 | Camille | +0.72 | 0.72 | 0.00 |  |
| 33 | Malzahar | +0.71 | 0.71 | 0.00 |  |
| 34 | Evelynn | +0.69 | 0.77 | 0.08 |  |
| 35 | Xin Zhao | +0.68 | 0.68 | 0.00 |  |
| 36 | Zac | +0.68 | 0.68 | 0.00 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 37 | Zed | +0.68 | 0.68 | 0.00 |  |
| 38 | Singed | +0.64 | 0.64 | 0.00 | grounding (Mega Adhesive) |
| 39 | Taric | +0.63 | 0.63 | 0.00 |  |
| 40 | Lulu | +0.62 | 0.62 | 0.00 |  |
| 41 | Shaco | +0.57 | 0.77 | 0.20 |  |
| 42 | Warwick | +0.54 | 0.54 | 0.00 | dash stop (Infinite Duress) |
| 43 | Teemo | +0.52 | 0.60 | 0.08 |  |
| 44 | Yone | +0.48 | 0.48 | 0.00 |  |
| 45 | Amumu | +0.43 | 0.43 | 0.00 |  |
| 46 | Twisted Fate | +0.40 | 0.40 | 0.00 |  |
| 47 | Renata Glasc | +0.37 | 0.37 | 0.00 |  |
| 48 | Caitlyn | +0.35 | 0.35 | 0.00 |  |
| 49 | Nilah | +0.35 | 0.35 | 0.00 |  |
| 50 | Aphelios | +0.32 | 0.32 | 0.00 |  |
| 51 | Milio | +0.32 | 0.32 | 0.00 |  |
| 52 | Jax | +0.31 | 0.31 | 0.00 |  |
| 53 | Nidalee | +0.31 | 0.31 | 0.00 |  |
| 54 | Morgana | +0.30 | 0.30 | 0.00 |  |
| 55 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 56 | Rammus | +0.29 | 0.29 | 0.00 |  |
| 57 | Shen | +0.29 | 0.29 | 0.00 |  |
| 58 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 59 | Sona | +0.27 | 0.27 | 0.00 |  |
| 60 | Zyra | +0.27 | 0.27 | 0.00 |  |
| 61 | Kai'Sa | +0.26 | 0.37 | 0.11 |  |
| 62 | Kalista | +0.26 | 0.26 | 0.00 |  |
| 63 | Karma | +0.26 | 0.26 | 0.00 |  |
| 64 | Quinn | +0.26 | 0.26 | 0.00 |  |
| 65 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 66 | Draven | +0.24 | 0.24 | 0.00 |  |
| 67 | Fiddlesticks | +0.24 | 0.24 | 0.00 |  |
| 68 | Janna | +0.24 | 0.24 | 0.00 |  |
| 69 | Lucian | +0.24 | 0.24 | 0.00 |  |
| 70 | Thresh | +0.24 | 0.24 | 0.00 |  |
| 71 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 72 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 73 | Kled | +0.23 | 0.23 | 0.00 |  |
| 74 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 75 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 76 | Miss Fortune | +0.22 | 0.22 | 0.00 |  |
| 77 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 78 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 79 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 80 | Garen | +0.21 | 0.21 | 0.00 |  |
| 81 | Urgot | +0.21 | 0.21 | 0.00 |  |
| 82 | Corki | +0.20 | 0.20 | 0.00 |  |
| 83 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 84 | Akshan | +0.19 | 0.33 | 0.14 |  |
| 85 | Heimerdinger | +0.19 | 0.19 | 0.00 |  |
| 86 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 87 | Lux | +0.19 | 0.19 | 0.00 |  |
| 88 | Malphite | +0.19 | 0.19 | 0.00 |  |
| 89 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 90 | Twitch | +0.18 | 0.29 | 0.11 |  |
| 91 | LeBlanc | +0.18 | 0.26 | 0.08 |  |
| 92 | Azir | +0.18 | 0.18 | 0.00 |  |
| 93 | Jhin | +0.18 | 0.18 | 0.00 |  |
| 94 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 95 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 96 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 97 | Taliyah | +0.18 | 0.18 | 0.00 |  |
| 98 | Varus | +0.18 | 0.18 | 0.00 |  |
| 99 | Vel'Koz | +0.18 | 0.18 | 0.00 |  |
| 100 | Xerath | +0.18 | 0.18 | 0.00 |  |
| 101 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 102 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 103 | Graves | +0.16 | 0.16 | 0.00 |  |
| 104 | Ryze | +0.16 | 0.16 | 0.00 |  |
| 105 | Vayne | +0.15 | 0.29 | 0.14 |  |
| 106 | Annie | +0.15 | 0.15 | 0.00 |  |
| 107 | Aurelion Sol | +0.15 | 0.15 | 0.00 |  |
| 108 | Brand | +0.15 | 0.15 | 0.00 |  |
| 109 | Mordekaiser | +0.15 | 0.15 | 0.00 |  |
| 110 | Nami | +0.15 | 0.15 | 0.00 |  |
| 111 | Skarner | +0.15 | 0.15 | 0.00 |  |
| 112 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 113 | Nunu & Willump | +0.14 | 0.14 | 0.00 |  |
| 114 | Swain | +0.14 | 0.14 | 0.00 |  |
| 115 | Ivern | +0.13 | 0.13 | 0.00 |  |
| 116 | Karthus | +0.13 | 0.13 | 0.00 |  |
| 117 | Senna | +0.11 | 0.22 | 0.11 |  |
| 118 | Aatrox | +0.11 | 0.11 | 0.00 |  |
| 119 | Ambessa | +0.11 | 0.11 | 0.00 |  |
| 120 | Briar | +0.11 | 0.11 | 0.00 |  |
| 121 | Fizz | +0.11 | 0.11 | 0.00 |  |
| 122 | Illaoi | +0.11 | 0.11 | 0.00 |  |
| 123 | Lee Sin | +0.11 | 0.11 | 0.00 |  |
| 124 | Naafiri | +0.11 | 0.11 | 0.00 |  |
| 125 | Sett | +0.11 | 0.11 | 0.00 |  |
| 126 | Sylas | +0.11 | 0.11 | 0.00 |  |
| 127 | Vi | +0.11 | 0.11 | 0.00 |  |
| 128 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 129 | Udyr | +0.08 | 0.08 | 0.00 |  |
| 130 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 131 | Olaf | +0.06 | 0.06 | 0.00 |  |
| 132 | Sion | +0.06 | 0.06 | 0.00 |  |
| 133 | Alistar | +0.05 | 0.05 | 0.00 |  |
| 134 | Gangplank | +0.05 | 0.05 | 0.00 |  |
| 135 | Neeko | +0.04 | 0.15 | 0.11 |  |
| 136 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 137 | Zaahen | +0.03 | 0.03 | 0.00 |  |
| 138 | Rengar | +0.02 | 0.16 | 0.14 |  |
| 139 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 140 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 141 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 142 | Darius | 0.00 | 0.00 | 0.00 |  |
| 143 | Diana | 0.00 | 0.00 | 0.00 |  |
| 144 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 145 | Galio | 0.00 | 0.00 | 0.00 |  |
| 146 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 147 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 148 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 149 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 150 | Katarina | 0.00 | 0.00 | 0.00 |  |
| 151 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 152 | Leona | 0.00 | 0.00 | 0.00 |  |
| 153 | Locke | 0.00 | 0.00 | 0.00 |  |
| 154 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 155 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 156 | Rell | 0.00 | 0.00 | 0.00 |  |
| 157 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 158 | Riven | 0.00 | 0.00 | 0.00 |  |
| 159 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 160 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 161 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 162 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 163 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 164 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 165 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 166 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 167 | Viego | -0.05 | 0.06 | 0.11 |  |
| 168 | Pyke | -0.11 | 0.00 | 0.11 |  |
| 169 | Talon | -0.14 | 0.00 | 0.14 |  |
| 170 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 171 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 172 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
