# Counters to Garen (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 24 other champions with a simulator kit against Garen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Garen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Garen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | – | +1.00 |
| 2 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.30 | – | +1.00 |
| 3 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 4 | Riven | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 5 | Fiora | +0.70 | +1.00 | +1.00 | +1.00 | −0.49 | – | +0.00 |
| 6 | Olaf | +0.52 | +0.32 | +1.00 | +1.00 | −0.40 | – | −0.05 |
| 7 | Urgot | +0.11 | −1.00 | +1.00 | +1.00 | +0.07 | −1.00 | −0.04 |
| 8 | Teemo | −0.03 | +1.00 | −1.00 | −1.00 | +0.79 | +1.00 | −1.00 |
| 9 | Darius | −0.04 | +1.00 | +0.00 | −1.00 | −0.25 | – | −1.00 |
| 10 | Malphite | −0.21 | +1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 11 | Jax | −0.29 | +0.00 | +0.00 | −1.00 | −0.39 | – | +0.00 |
| 12 | Poppy | −0.70 | −1.00 | −1.00 | −1.00 | +0.12 | – | +1.00 |
| 13 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 14 | Gwen | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 15 | Yasuo | −0.81 | −1.00 | −1.00 | −1.00 | −0.27 | – | +0.26 |
| 16 | Volibear | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.23 |
| 17 | Sett | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | – | −1.00 |
| 18 | Yone | −0.82 | −0.77 | −1.00 | −1.00 | −0.51 | – | −0.48 |
| 19 | Irelia | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | – | −1.00 |
| 20 | Camille | −0.86 | −1.00 | −1.00 | −1.00 | −0.49 | – | +0.00 |
| 21 | Mordekaiser | −0.87 | −1.00 | −1.00 | −1.00 | −0.24 | – | −1.00 |
| 22 | Shen | −0.88 | −1.00 | −1.00 | −1.00 | −0.30 | – | −1.00 |
| 23 | Aatrox | −0.89 | −1.00 | −1.00 | −1.00 | −0.33 | – | −1.00 |
| 24 | Renekton | −0.89 | −1.00 | −1.00 | −1.00 | −0.33 | – | −1.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Garen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Garen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Garen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.44)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Garen's (500 vs 175 attack range). Garen has no dash or blink to close the gap. (Sivir basic attacks → Garen basic attacks)
- **0.55** spell shield: Spell Shield's spell shield blocks Garen's Demacian Justice. Spell shield for 1.5 s, long enough to use ahead of Demacian Justice. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Garen R Demacian Justice)
- **0.15** spell shield: Spell Shield's spell shield blocks part of Garen's Decisive Strike. Spell shield for 1.5 s, long enough to use ahead of Decisive Strike. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only negate the silence. (Sivir E Spell Shield → Garen Q Decisive Strike)

#### 2. Elise (net +1.14)

- **0.61** range: Elise's basic attacks reach 375 units farther than Garen's (550 vs 175 attack range). Garen has no dash or blink to close the gap. (Elise basic attacks → Garen basic attacks)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Garen's Demacian Justice. Untargetable for 0.6 s; Demacian Justice takes 0.43 s to land, enough to react. (Elise E Rappel → Garen R Demacian Justice)
- **0.22** untargetable: Rappel makes Elise untargetable, dodging Garen's Basic Attack. Untargetable for 0.6 s, timed to Basic Attack. (Elise E Rappel → Garen basic attacks)
- Watch out: Courage's 60% tenacity shortens Elise's Cocoon (stun).

#### 3. Xayah (net +1.11)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Garen's (525 vs 175 attack range). Garen has no dash or blink to close the gap. (Xayah basic attacks → Garen basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Garen's Demacian Justice. Untargetable for 1.5 s, long enough to use ahead of Demacian Justice. (Xayah R Featherstorm → Garen R Demacian Justice)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Garen's Decisive Strike. Untargetable for 1.5 s, long enough to use ahead of Decisive Strike. (Xayah R Featherstorm → Garen Q Decisive Strike)
- Watch out: Courage's 60% tenacity shortens Xayah's Bladecaller (root).

#### 4. Teemo (net +1.03)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Garen's (500 vs 175 attack range). Garen has no dash or blink to close the gap. (Teemo basic attacks → Garen basic attacks)
- **0.57** blind: Blinding Dart's blind makes Garen's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Garen basic attacks)
- **0.30** blind: Blinding Dart's blind makes Garen's Decisive Strike, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Garen Q Decisive Strike)
- Watch out: Decisive Strike cleanses Teemo's Noxious Trap (slow) after it lands.

#### 5. Kindred (net +1.00)

- **0.81** range: Kindred's basic attacks reach 325 units farther than Garen's (500 vs 175 attack range). Garen has no dash or blink to close the gap. (Kindred basic attacks → Garen basic attacks)
- **0.22** invulnerable: Lamb's Respite makes Kindred invulnerable to Garen's Demacian Justice (its crowd control still applies). Invulnerable for ?; Demacian Justice takes 0.43 s to land, enough to react. (Kindred R Lamb's Respite → Garen R Demacian Justice)
- **0.14** invulnerable: Lamb's Respite makes Kindred invulnerable to Garen's Basic Attack. Invulnerable for ?, timed to Basic Attack. (Kindred R Lamb's Respite → Garen basic attacks)
- Watch out: Decisive Strike cleanses Kindred's Mounting Dread (slow) after it lands.

#### 6. Kayle (net +0.98)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Garen's (625 vs 175 attack range). Garen has no dash or blink to close the gap. (Kayle basic attacks → Garen basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Garen's Demacian Justice (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Demacian Justice. (Kayle R Divine Judgment → Garen R Demacian Justice)
- **0.14** invulnerable: Divine Judgment makes Kayle invulnerable to Garen's Basic Attack. Invulnerable for 2.5 s, long enough to use ahead of Basic Attack. (Kayle R Divine Judgment → Garen basic attacks)
- Watch out: Decisive Strike cleanses Kayle's Radiant Blast (slow) after it lands.

#### 7. Bard (net +0.92)

- **0.62** range: Bard's basic attacks reach 325 units farther than Garen's (500 vs 175 attack range). Garen has no dash or blink to close the gap. (Bard basic attacks → Garen basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Garen's Demacian Justice. Untargetable for 2.5 s, long enough to use ahead of Demacian Justice. (Bard R Tempered Fate → Garen R Demacian Justice)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Garen's Decisive Strike. Untargetable for 2.5 s, long enough to use ahead of Decisive Strike. (Bard R Tempered Fate → Garen Q Decisive Strike)
- Watch out: Courage's 60% tenacity shortens Bard's Tempered Fate (stun).

#### 8. Vladimir (net +0.87)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Garen's Demacian Justice. Untargetable for 2 s, long enough to use ahead of Demacian Justice. (Vladimir W Sanguine Pool → Garen R Demacian Justice)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Garen's Decisive Strike. Untargetable for 2 s, long enough to use ahead of Decisive Strike. (Vladimir W Sanguine Pool → Garen Q Decisive Strike)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Garen's (450 vs 175 attack range). Garen has no dash or blink to close the gap. (Vladimir basic attacks → Garen basic attacks)
- Watch out: Decisive Strike cleanses Vladimir's Sanguine Pool (slow) after it lands.

#### 9. Yuumi (net +0.82)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Garen's Demacian Justice. Untargetable for ?; Demacian Justice takes 0.43 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Garen R Demacian Justice)
- **0.54** range: Yuumi's basic attacks reach 250 units farther than Garen's (425 vs 175 attack range). Garen has no dash or blink to close the gap. (Yuumi basic attacks → Garen basic attacks)
- **0.30** untargetable: You and Me! makes Yuumi untargetable, dodging Garen's Basic Attack. Untargetable for ?, timed to Basic Attack. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Garen basic attacks)
- Watch out: Decisive Strike's silence interrupts Yuumi's Final Chapter (normal channel).

#### 10. Lulu (net +0.75)

- **0.68** range: Lulu's basic attacks reach 375 units farther than Garen's (550 vs 175 attack range). Garen has no dash or blink to close the gap. (Lulu basic attacks → Garen basic attacks)
- **0.40** disarm: Whimsy disarms Garen for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Garen basic attacks)
- Watch out: Decisive Strike cleanses Lulu's Wild Growth (slow) after it lands.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.44 | 1.44 | 0.00 | range (attacks) |
| 2 | Elise | +1.14 | 1.32 | 0.18 | range (attacks) |
| 3 | Xayah | +1.11 | 1.29 | 0.18 | range (attacks) |
| 4 | Teemo | +1.03 | 1.31 | 0.28 | range (attacks), blind (Blinding Dart) |
| 5 | Kindred | +1.00 | 1.12 | 0.12 | range (attacks) |
| 6 | Kayle | +0.98 | 1.10 | 0.12 | range (attacks) |
| 7 | Bard | +0.92 | 1.31 | 0.39 | range (attacks) |
| 8 | Vladimir | +0.87 | 1.07 | 0.20 |  |
| 9 | Yuumi | +0.82 | 1.31 | 0.49 | range (attacks) |
| 10 | Lulu | +0.75 | 1.08 | 0.33 | range (attacks), disarm (Whimsy) |
| 11 | Zeri | +0.71 | 0.83 | 0.12 | range (attacks) |
| 12 | Aurora | +0.70 | 1.12 | 0.42 | range (attacks) |
| 13 | Rek'Sai | +0.69 | 0.69 | 0.00 |  |
| 14 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 15 | Lissandra | +0.58 | 1.10 | 0.52 |  |
| 16 | Twitch | +0.58 | 0.81 | 0.23 | range (attacks) |
| 17 | Sona | +0.56 | 0.77 | 0.21 | range (attacks) |
| 18 | Gwen | +0.56 | 0.71 | 0.15 |  |
| 19 | Kai'Sa | +0.56 | 0.67 | 0.11 | range (attacks) |
| 20 | Kalista | +0.55 | 0.67 | 0.12 | range (attacks) |
| 21 | Yunara | +0.54 | 0.72 | 0.18 | range (attacks) |
| 22 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 23 | Samira | +0.53 | 0.53 | 0.00 | range (attacks) |
| 24 | Fiora | +0.52 | 0.73 | 0.21 |  |
| 25 | Vayne | +0.49 | 0.81 | 0.32 | range (attacks) |
| 26 | Draven | +0.49 | 0.68 | 0.19 | range (attacks) |
| 27 | Jax | +0.49 | 0.67 | 0.18 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 28 | Milio | +0.48 | 0.80 | 0.32 | range (attacks) |
| 29 | Master Yi | +0.48 | 0.71 | 0.23 |  |
| 30 | Zed | +0.47 | 0.58 | 0.11 |  |
| 31 | Ashe | +0.44 | 0.72 | 0.28 | range (attacks) |
| 32 | Smolder | +0.40 | 0.61 | 0.21 | range (attacks) |
| 33 | Kennen | +0.40 | 0.54 | 0.14 | range (attacks) |
| 34 | Ekko | +0.39 | 0.66 | 0.27 |  |
| 35 | Ziggs | +0.38 | 0.50 | 0.12 | range (attacks) |
| 36 | Tristana | +0.37 | 0.72 | 0.35 | range (attacks) |
| 37 | Corki | +0.37 | 0.56 | 0.19 | range (attacks) |
| 38 | Azir | +0.36 | 0.47 | 0.11 |  |
| 39 | Kog'Maw | +0.35 | 0.47 | 0.12 |  |
| 40 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 41 | Nilah | +0.33 | 0.54 | 0.21 | attack dodge (Jubilant Veil) |
| 42 | Renata Glasc | +0.32 | 0.72 | 0.40 | range (attacks) |
| 43 | Quinn | +0.32 | 0.67 | 0.35 | range (attacks) |
| 44 | Nocturne | +0.32 | 0.64 | 0.32 |  |
| 45 | Zilean | +0.32 | 0.61 | 0.29 | range (attacks) |
| 46 | Nasus | +0.31 | 0.43 | 0.12 | attack speed slow (Wither) |
| 47 | Zyra | +0.30 | 0.48 | 0.18 |  |
| 48 | Annie | +0.30 | 0.44 | 0.14 |  |
| 49 | Zoe | +0.29 | 0.61 | 0.32 | range (attacks) |
| 50 | Graves | +0.29 | 0.41 | 0.12 |  |
| 51 | Varus | +0.27 | 0.65 | 0.38 | range (attacks) |
| 52 | Veigar | +0.27 | 0.45 | 0.18 |  |
| 53 | Evelynn | +0.25 | 0.65 | 0.40 |  |
| 54 | Senna | +0.25 | 0.65 | 0.40 | range (attacks) |
| 55 | Miss Fortune | +0.25 | 0.61 | 0.36 | range (attacks) |
| 56 | Viktor | +0.25 | 0.57 | 0.32 | range (attacks) |
| 57 | Lux | +0.25 | 0.54 | 0.29 | range (attacks) |
| 58 | Camille | +0.24 | 0.61 | 0.37 |  |
| 59 | Jayce | +0.23 | 0.53 | 0.30 | range (attacks) |
| 60 | Jinx | +0.23 | 0.51 | 0.28 | range (attacks) |
| 61 | Soraka | +0.22 | 0.50 | 0.28 | range (attacks) |
| 62 | Janna | +0.21 | 0.68 | 0.47 | range (attacks) |
| 63 | Maokai | +0.19 | 0.76 | 0.57 |  |
| 64 | Vex | +0.19 | 0.50 | 0.31 | range (attacks) |
| 65 | Caitlyn | +0.18 | 0.72 | 0.54 | range (attacks) |
| 66 | Mel | +0.18 | 0.50 | 0.32 | range (attacks) |
| 67 | LeBlanc | +0.18 | 0.38 | 0.20 |  |
| 68 | Aphelios | +0.17 | 0.72 | 0.55 | range (attacks) |
| 69 | Akshan | +0.17 | 0.59 | 0.42 | range (attacks) |
| 70 | Twisted Fate | +0.16 | 0.75 | 0.59 | range (attacks) |
| 71 | Morgana | +0.16 | 0.52 | 0.36 |  |
| 72 | Orianna | +0.16 | 0.47 | 0.31 |  |
| 73 | Taric | +0.14 | 0.32 | 0.18 |  |
| 74 | Malphite | +0.14 | 0.28 | 0.14 |  |
| 75 | Anivia | +0.11 | 0.48 | 0.37 |  |
| 76 | Brand | +0.10 | 0.41 | 0.31 |  |
| 77 | Ahri | +0.09 | 0.41 | 0.32 |  |
| 78 | Kayn | +0.08 | 0.65 | 0.57 |  |
| 79 | Shaco | +0.07 | 0.65 | 0.58 |  |
| 80 | Nami | +0.04 | 0.41 | 0.37 |  |
| 81 | Kled | +0.04 | 0.22 | 0.18 |  |
| 82 | Malzahar | +0.03 | 0.50 | 0.47 |  |
| 83 | Syndra | +0.03 | 0.41 | 0.38 |  |
| 84 | Neeko | 0.00 | 0.41 | 0.41 |  |
| 85 | Karma | 0.00 | 0.38 | 0.38 |  |
| 86 | Swain | 0.00 | 0.36 | 0.36 |  |
| 87 | Olaf | 0.00 | 0.12 | 0.12 |  |
| 88 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 89 | Gnar | -0.01 | 0.57 | 0.58 | range (attacks) |
| 90 | Seraphine | -0.02 | 0.51 | 0.53 | range (attacks) |
| 91 | Aurelion Sol | -0.03 | 0.41 | 0.44 |  |
| 92 | Karthus | -0.03 | 0.33 | 0.36 |  |
| 93 | Cassiopeia | -0.04 | 0.41 | 0.45 |  |
| 94 | Pantheon | -0.05 | 0.43 | 0.48 |  |
| 95 | Gangplank | -0.05 | 0.16 | 0.21 |  |
| 96 | Mordekaiser | -0.05 | 0.10 | 0.15 |  |
| 97 | Jhin | -0.07 | 0.50 | 0.57 | range (attacks) |
| 98 | Xerath | -0.07 | 0.47 | 0.54 |  |
| 99 | Hwei | -0.08 | 0.43 | 0.51 |  |
| 100 | Vel'Koz | -0.09 | 0.47 | 0.56 |  |
| 101 | Ivern | -0.10 | 0.33 | 0.43 |  |
| 102 | Udyr | -0.10 | 0.27 | 0.37 |  |
| 103 | Heimerdinger | -0.11 | 0.37 | 0.48 |  |
| 104 | Xin Zhao | -0.11 | 0.34 | 0.45 |  |
| 105 | Zaahen | -0.11 | 0.07 | 0.18 |  |
| 106 | Thresh | -0.12 | 0.33 | 0.45 |  |
| 107 | Aatrox | -0.12 | 0.00 | 0.12 |  |
| 108 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 109 | Illaoi | -0.12 | 0.00 | 0.12 |  |
| 110 | Jarvan IV | -0.12 | 0.00 | 0.12 |  |
| 111 | Kassadin | -0.12 | 0.00 | 0.12 |  |
| 112 | Tryndamere | -0.12 | 0.00 | 0.12 |  |
| 113 | Yorick | -0.12 | 0.00 | 0.12 |  |
| 114 | Shen | -0.13 | 0.63 | 0.76 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 115 | Singed | -0.13 | 0.18 | 0.31 |  |
| 116 | Ryze | -0.15 | 0.45 | 0.60 |  |
| 117 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 118 | Renekton | -0.18 | 0.00 | 0.18 |  |
| 119 | Riven | -0.18 | 0.00 | 0.18 |  |
| 120 | Rakan | -0.19 | 0.18 | 0.37 |  |
| 121 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 122 | Akali | -0.21 | 0.00 | 0.21 |  |
| 123 | Diana | -0.21 | 0.00 | 0.21 |  |
| 124 | Locke | -0.21 | 0.00 | 0.21 |  |
| 125 | Rumble | -0.21 | 0.00 | 0.21 |  |
| 126 | Blitzcrank | -0.22 | 0.00 | 0.22 |  |
| 127 | Darius | -0.24 | 0.00 | 0.24 |  |
| 128 | Alistar | -0.25 | 0.10 | 0.35 |  |
| 129 | Talon | -0.25 | 0.00 | 0.25 |  |
| 130 | Trundle | -0.25 | 0.00 | 0.25 |  |
| 131 | Yone | -0.26 | 0.00 | 0.26 |  |
| 132 | Rengar | -0.27 | 0.19 | 0.46 |  |
| 133 | Lillia | -0.27 | 0.16 | 0.43 |  |
| 134 | Cho'Gath | -0.27 | 0.00 | 0.27 |  |
| 135 | Rammus | -0.28 | 0.43 | 0.71 | attack reflect (Defensive Ball Curl) |
| 136 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 137 | Taliyah | -0.30 | 0.47 | 0.77 |  |
| 138 | Skarner | -0.30 | 0.00 | 0.30 |  |
| 139 | Urgot | -0.31 | 0.23 | 0.54 |  |
| 140 | Irelia | -0.31 | 0.00 | 0.31 |  |
| 141 | Lee Sin | -0.31 | 0.00 | 0.31 |  |
| 142 | Fizz | -0.32 | 0.00 | 0.32 |  |
| 143 | Sylas | -0.36 | 0.00 | 0.36 |  |
| 144 | Ambessa | -0.37 | 0.00 | 0.37 |  |
| 145 | Amumu | -0.37 | 0.00 | 0.37 |  |
| 146 | Braum | -0.37 | 0.00 | 0.37 |  |
| 147 | Kha'Zix | -0.37 | 0.00 | 0.37 |  |
| 148 | Fiddlesticks | -0.39 | 0.34 | 0.73 |  |
| 149 | Nautilus | -0.42 | 0.00 | 0.42 |  |
| 150 | Galio | -0.43 | 0.00 | 0.43 |  |
| 151 | Sion | -0.45 | 0.13 | 0.58 |  |
| 152 | Hecarim | -0.46 | 0.00 | 0.46 |  |
| 153 | Rell | -0.46 | 0.00 | 0.46 |  |
| 154 | Poppy | -0.47 | 0.00 | 0.47 |  |
| 155 | Gragas | -0.49 | 0.00 | 0.49 |  |
| 156 | Sett | -0.49 | 0.00 | 0.49 |  |
| 157 | Warwick | -0.51 | 0.08 | 0.59 |  |
| 158 | Sejuani | -0.52 | 0.00 | 0.52 |  |
| 159 | Shyvana | -0.52 | 0.00 | 0.52 |  |
| 160 | Volibear | -0.52 | 0.00 | 0.52 |  |
| 161 | K'Sante | -0.55 | 0.00 | 0.55 |  |
| 162 | Leona | -0.57 | 0.00 | 0.57 |  |
| 163 | Naafiri | -0.60 | 0.00 | 0.60 |  |
| 164 | Qiyana | -0.62 | 0.00 | 0.62 |  |
| 165 | Briar | -0.64 | 0.00 | 0.64 |  |
| 166 | Ornn | -0.64 | 0.00 | 0.64 |  |
| 167 | Pyke | -0.65 | 0.00 | 0.65 |  |
| 168 | Vi | -0.69 | 0.00 | 0.69 |  |
| 169 | Tahm Kench | -0.74 | 0.00 | 0.74 |  |
| 170 | Viego | -0.76 | 0.00 | 0.76 |  |
| 171 | Nunu & Willump | -0.82 | 0.00 | 0.82 |  |
| 172 | Zac | -0.98 | 0.00 | 0.98 |  |
