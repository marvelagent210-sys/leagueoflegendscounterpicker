# Counters to Mordekaiser (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 24 other champions with a simulator kit against Mordekaiser: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Mordekaiser wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Mordekaiser --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.89 | +1.00 | +1.00 | +1.00 | +0.33 | – | +1.00 |
| 2 | Poppy | +0.89 | +1.00 | +1.00 | +1.00 | +0.49 | – | +0.50 |
| 3 | Garen | +0.87 | +1.00 | +1.00 | +1.00 | +0.24 | – | +1.00 |
| 4 | Riven | +0.85 | +1.00 | +1.00 | +1.00 | +0.43 | – | +0.00 |
| 5 | Yasuo | +0.84 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.63 |
| 6 | Yone | +0.83 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.60 |
| 7 | Gwen | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 8 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 9 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 10 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 11 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 12 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 13 | Olaf | +0.74 | +1.00 | +0.80 | +1.00 | −0.04 | +1.00 | +0.00 |
| 14 | Teemo | +0.53 | +0.62 | +0.70 | +0.46 | +0.30 | +0.60 | +0.00 |
| 15 | Urgot | +0.38 | −1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +1.00 |
| 16 | Renekton | +0.23 | +1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 17 | Darius | +0.14 | +0.19 | +0.23 | +0.19 | −0.10 | – | +0.00 |
| 18 | Camille | −0.13 | −0.70 | −0.70 | +1.00 | +0.19 | – | +0.00 |
| 19 | Dr. Mundo | −0.33 | −1.00 | −0.12 | −0.04 | −0.03 | – | +0.00 |
| 20 | Malphite | −0.58 | −0.84 | −0.72 | −0.86 | +0.24 | – | +0.00 |
| 21 | Irelia | −0.75 | −1.00 | −1.00 | −0.97 | +0.15 | – | +0.00 |
| 22 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 23 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 24 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Mordekaiser's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Mordekaiser's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Mordekaiser` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Elise (net +1.32)

- **0.61** range: Elise's basic attacks reach 375 units farther than Mordekaiser's (550 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Elise basic attacks → Mordekaiser basic attacks)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Mordekaiser's Realm of Death. Untargetable for 0.6 s; Realm of Death takes 0.5 s to land, enough to react. (Elise E Rappel → Mordekaiser R Realm of Death)
- **0.47** untargetable: Rappel makes Elise untargetable, dodging Mordekaiser's Death's Grasp. Untargetable for 0.6 s; Death's Grasp takes 0.48 s to land, enough to react. (Elise E Rappel → Mordekaiser E Death's Grasp)
- Watch out: Realm of Death cuts Elise's attack speed by 30%.

#### 2. Sivir (net +1.30)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Mordekaiser's (500 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Sivir basic attacks → Mordekaiser basic attacks)
- **0.47** spell shield: Spell Shield's spell shield blocks Mordekaiser's Death's Grasp. Spell shield for 1.5 s, long enough to use ahead of Death's Grasp. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Mordekaiser E Death's Grasp)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Mordekaiser's Realm of Death. Spell shield for 1.5 s, long enough to use ahead of Realm of Death. A spell shield blocks only the first enemy ability that reaches it. Realm of Death will cancel and go on cooldown after its cast time if:
  - The target is displacement immune, crowd control immune or protected by a spell shield.
    - Note that all of the above are ineffective if they are applied after the target has been banished.
  - The target is a clone or Sion when his Glory in Death is active. Spell shield will not block the initial slow. (Sivir E Spell Shield → Mordekaiser R Realm of Death)
- Watch out: Realm of Death cuts Sivir's attack speed by 30%.

#### 3. Xayah (net +1.29)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Mordekaiser's (525 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Xayah basic attacks → Mordekaiser basic attacks)
- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Mordekaiser's Realm of Death. Untargetable for 1.5 s, long enough to use ahead of Realm of Death. (Xayah R Featherstorm → Mordekaiser R Realm of Death)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Mordekaiser's Death's Grasp. Untargetable for 1.5 s, long enough to use ahead of Death's Grasp. (Xayah R Featherstorm → Mordekaiser E Death's Grasp)
- Watch out: Realm of Death cuts Xayah's attack speed by 30%.

#### 4. Bard (net +1.24)

- **0.62** range: Bard's basic attacks reach 325 units farther than Mordekaiser's (500 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Bard basic attacks → Mordekaiser basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Mordekaiser's Realm of Death. Untargetable for 2.5 s, long enough to use ahead of Realm of Death. (Bard R Tempered Fate → Mordekaiser R Realm of Death)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Mordekaiser's Death's Grasp. Untargetable for 2.5 s, long enough to use ahead of Death's Grasp. (Bard R Tempered Fate → Mordekaiser E Death's Grasp)
- Watch out: Realm of Death cuts Bard's attack speed by 30%.

#### 5. Aurora (net +1.09)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Mordekaiser's Realm of Death. Untargetable for 0.4 s; Realm of Death takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Mordekaiser R Realm of Death)
- **0.54** range: Aurora's basic attacks reach 375 units farther than Mordekaiser's (550 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Aurora basic attacks → Mordekaiser basic attacks)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Mordekaiser's Death's Grasp. Untargetable for 0.4 s; Death's Grasp takes 0.48 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Mordekaiser E Death's Grasp)
- Watch out: Realm of Death reveals Aurora through Across the Veil's stealth.

#### 6. Lissandra (net +1.07)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Mordekaiser's Realm of Death. Untargetable for 2.5 s, long enough to use ahead of Realm of Death. (Lissandra R Frozen Tomb → Mordekaiser R Realm of Death)
- **0.41** range: Lissandra's basic attacks reach 375 units farther than Mordekaiser's (550 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Lissandra basic attacks → Mordekaiser basic attacks)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Mordekaiser's Death's Grasp. Untargetable for 2.5 s, long enough to use ahead of Death's Grasp. (Lissandra R Frozen Tomb → Mordekaiser E Death's Grasp)
- Watch out: Realm of Death cuts Lissandra's attack speed by 30%.

#### 7. Yuumi (net +1.00)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Mordekaiser's Death's Grasp. Untargetable for ?; Death's Grasp takes 0.48 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Mordekaiser E Death's Grasp)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Mordekaiser's Realm of Death. Untargetable for ?; Realm of Death takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Mordekaiser R Realm of Death)
- **0.54** range: Yuumi's basic attacks reach 250 units farther than Mordekaiser's (425 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Yuumi basic attacks → Mordekaiser basic attacks)
- Watch out: Death's Grasp's airborne interrupts Yuumi's Final Chapter (normal channel).

#### 8. Vladimir (net +0.96)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Mordekaiser's Realm of Death. Untargetable for 2 s, long enough to use ahead of Realm of Death. (Vladimir W Sanguine Pool → Mordekaiser R Realm of Death)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Mordekaiser's Death's Grasp. Untargetable for 2 s, long enough to use ahead of Death's Grasp. (Vladimir W Sanguine Pool → Mordekaiser E Death's Grasp)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Mordekaiser's (450 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Vladimir basic attacks → Mordekaiser basic attacks)
- Watch out: Death's Grasp's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 9. Teemo (net +0.89)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Mordekaiser's (500 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Teemo basic attacks → Mordekaiser basic attacks)
- **0.43** blind: Blinding Dart's blind makes Mordekaiser's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Mordekaiser basic attacks)
- Watch out: Realm of Death cuts Teemo's attack speed by 30%.

#### 10. Lulu (net +0.89)

- **0.68** range: Lulu's basic attacks reach 375 units farther than Mordekaiser's (550 vs 175 attack range). Mordekaiser has no dash or blink to close the gap. (Lulu basic attacks → Mordekaiser basic attacks)
- **0.30** disarm: Whimsy disarms Mordekaiser for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Mordekaiser basic attacks)
- Watch out: Realm of Death cuts Lulu's attack speed by 30%.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.32 | 1.40 | 0.08 | range (attacks) |
| 2 | Sivir | +1.30 | 1.42 | 0.12 | range (attacks) |
| 3 | Xayah | +1.29 | 1.38 | 0.09 | range (attacks) |
| 4 | Bard | +1.24 | 1.33 | 0.09 | range (attacks) |
| 5 | Aurora | +1.09 | 1.28 | 0.19 | range (attacks) |
| 6 | Lissandra | +1.07 | 1.12 | 0.05 |  |
| 7 | Yuumi | +1.00 | 1.52 | 0.52 | range (attacks) |
| 8 | Vladimir | +0.96 | 1.10 | 0.14 |  |
| 9 | Teemo | +0.89 | 1.02 | 0.13 | range (attacks), blind (Blinding Dart) |
| 10 | Lulu | +0.89 | 0.98 | 0.09 | range (attacks) |
| 11 | Kindred | +0.84 | 0.96 | 0.12 | range (attacks) |
| 12 | Maokai | +0.84 | 0.90 | 0.06 |  |
| 13 | Morgana | +0.83 | 0.89 | 0.06 |  |
| 14 | Fiora | +0.81 | 0.89 | 0.08 |  |
| 15 | Kayle | +0.79 | 0.88 | 0.09 | range (attacks) |
| 16 | Kalista | +0.79 | 0.87 | 0.08 | range (attacks) |
| 17 | Zeri | +0.72 | 0.83 | 0.11 | range (attacks) |
| 18 | Gwen | +0.70 | 0.79 | 0.09 |  |
| 19 | Aphelios | +0.69 | 0.78 | 0.09 | range (attacks) |
| 20 | Milio | +0.69 | 0.78 | 0.09 | range (attacks) |
| 21 | Rek'Sai | +0.68 | 0.75 | 0.07 |  |
| 22 | Varus | +0.67 | 0.84 | 0.17 | range (attacks) |
| 23 | Sona | +0.67 | 0.77 | 0.10 | range (attacks) |
| 24 | Udyr | +0.67 | 0.77 | 0.10 |  |
| 25 | Camille | +0.66 | 0.75 | 0.09 |  |
| 26 | Twitch | +0.65 | 0.81 | 0.16 | range (attacks) |
| 27 | Ekko | +0.65 | 0.73 | 0.08 |  |
| 28 | Zed | +0.64 | 0.71 | 0.07 |  |
| 29 | Ashe | +0.63 | 0.72 | 0.09 | range (attacks) |
| 30 | Tristana | +0.63 | 0.72 | 0.09 | range (attacks) |
| 31 | Yunara | +0.63 | 0.72 | 0.09 | range (attacks) |
| 32 | Corki | +0.63 | 0.70 | 0.07 | range (attacks) |
| 33 | Vayne | +0.62 | 0.81 | 0.19 | range (attacks) |
| 34 | Master Yi | +0.61 | 0.93 | 0.32 |  |
| 35 | Draven | +0.59 | 0.68 | 0.09 | range (attacks) |
| 36 | Nocturne | +0.53 | 0.84 | 0.31 |  |
| 37 | Ezreal | +0.53 | 0.61 | 0.08 | range (attacks) |
| 38 | Smolder | +0.53 | 0.61 | 0.08 | range (attacks) |
| 39 | Zilean | +0.53 | 0.61 | 0.08 | range (attacks) |
| 40 | Zoe | +0.53 | 0.61 | 0.08 | range (attacks) |
| 41 | Kai'Sa | +0.51 | 0.67 | 0.16 | range (attacks) |
| 42 | Senna | +0.50 | 0.65 | 0.15 | range (attacks) |
| 43 | Gnar | +0.49 | 0.57 | 0.08 | range (attacks) |
| 44 | Viktor | +0.49 | 0.57 | 0.08 | range (attacks) |
| 45 | Kennen | +0.47 | 0.54 | 0.07 | range (attacks) |
| 46 | Lux | +0.47 | 0.54 | 0.07 | range (attacks) |
| 47 | Nidalee | +0.46 | 0.53 | 0.07 | range (attacks) |
| 48 | Jayce | +0.45 | 0.53 | 0.08 | range (attacks) |
| 49 | Samira | +0.45 | 0.53 | 0.08 | range (attacks) |
| 50 | Jinx | +0.44 | 0.51 | 0.07 | range (attacks) |
| 51 | Mel | +0.44 | 0.50 | 0.06 | range (attacks) |
| 52 | Soraka | +0.44 | 0.50 | 0.06 | range (attacks) |
| 53 | Ziggs | +0.44 | 0.50 | 0.06 | range (attacks) |
| 54 | Kled | +0.43 | 0.53 | 0.10 |  |
| 55 | Anivia | +0.42 | 0.48 | 0.06 |  |
| 56 | Zyra | +0.42 | 0.48 | 0.06 |  |
| 57 | Gangplank | +0.41 | 0.48 | 0.07 |  |
| 58 | Azir | +0.41 | 0.47 | 0.06 |  |
| 59 | Orianna | +0.41 | 0.47 | 0.06 |  |
| 60 | Singed | +0.41 | 0.47 | 0.06 |  |
| 61 | Kog'Maw | +0.40 | 0.47 | 0.07 |  |
| 62 | Evelynn | +0.39 | 0.71 | 0.32 |  |
| 63 | Vex | +0.39 | 0.64 | 0.25 | range (attacks) |
| 64 | Veigar | +0.39 | 0.45 | 0.06 |  |
| 65 | Annie | +0.39 | 0.44 | 0.05 |  |
| 66 | Quinn | +0.38 | 0.67 | 0.29 | range (attacks) |
| 67 | Heimerdinger | +0.38 | 0.43 | 0.05 |  |
| 68 | Rengar | +0.36 | 0.55 | 0.19 |  |
| 69 | Brand | +0.36 | 0.41 | 0.05 |  |
| 70 | Cassiopeia | +0.36 | 0.41 | 0.05 |  |
| 71 | Nami | +0.36 | 0.41 | 0.05 |  |
| 72 | Syndra | +0.36 | 0.41 | 0.05 |  |
| 73 | Caitlyn | +0.35 | 0.72 | 0.37 | range (attacks) |
| 74 | Graves | +0.33 | 0.41 | 0.08 |  |
| 75 | Karma | +0.33 | 0.38 | 0.05 |  |
| 76 | Shaco | +0.32 | 0.71 | 0.39 |  |
| 77 | Zaahen | +0.31 | 0.39 | 0.08 |  |
| 78 | Swain | +0.31 | 0.36 | 0.05 |  |
| 79 | Malzahar | +0.30 | 0.75 | 0.45 |  |
| 80 | Twisted Fate | +0.30 | 0.75 | 0.45 | range (attacks) |
| 81 | Olaf | +0.30 | 0.39 | 0.09 |  |
| 82 | Malphite | +0.28 | 0.35 | 0.07 |  |
| 83 | Aurelion Sol | +0.27 | 0.41 | 0.14 |  |
| 84 | Neeko | +0.27 | 0.41 | 0.14 |  |
| 85 | LeBlanc | +0.27 | 0.38 | 0.11 |  |
| 86 | Jax | +0.27 | 0.35 | 0.08 |  |
| 87 | Thresh | +0.27 | 0.33 | 0.06 |  |
| 88 | Lucian | +0.25 | 0.62 | 0.37 | range (attacks) |
| 89 | Miss Fortune | +0.25 | 0.61 | 0.36 | range (attacks) |
| 90 | Nasus | +0.25 | 0.33 | 0.08 |  |
| 91 | Alistar | +0.24 | 0.32 | 0.08 |  |
| 92 | Kayn | +0.20 | 0.71 | 0.51 |  |
| 93 | Sion | +0.20 | 0.41 | 0.21 |  |
| 94 | Janna | +0.19 | 0.68 | 0.49 | range (attacks) |
| 95 | Nilah | +0.18 | 0.30 | 0.12 |  |
| 96 | K'Sante | +0.18 | 0.28 | 0.10 |  |
| 97 | Jhin | +0.16 | 0.50 | 0.34 | range (attacks) |
| 98 | Hwei | +0.14 | 0.43 | 0.29 |  |
| 99 | Vel'Koz | +0.13 | 0.47 | 0.34 |  |
| 100 | Ivern | +0.13 | 0.33 | 0.20 |  |
| 101 | Akshan | +0.12 | 0.59 | 0.47 | range (attacks) |
| 102 | Ahri | +0.12 | 0.41 | 0.29 |  |
| 103 | Lillia | +0.11 | 0.16 | 0.05 |  |
| 104 | Xerath | +0.08 | 0.47 | 0.39 |  |
| 105 | Ornn | +0.08 | 0.14 | 0.06 |  |
| 106 | Yone | +0.08 | 0.14 | 0.06 |  |
| 107 | Illaoi | +0.07 | 0.14 | 0.07 |  |
| 108 | Taric | +0.06 | 0.15 | 0.09 |  |
| 109 | Sett | +0.06 | 0.14 | 0.08 |  |
| 110 | Volibear | +0.06 | 0.14 | 0.08 |  |
| 111 | Xin Zhao | +0.05 | 0.16 | 0.11 |  |
| 112 | Garen | +0.05 | 0.15 | 0.10 |  |
| 113 | Jarvan IV | +0.05 | 0.14 | 0.09 |  |
| 114 | Ryze | +0.04 | 0.45 | 0.41 |  |
| 115 | Pantheon | +0.04 | 0.23 | 0.19 |  |
| 116 | Renata Glasc | +0.03 | 0.72 | 0.69 | range (attacks) |
| 117 | Karthus | -0.01 | 0.33 | 0.34 |  |
| 118 | Skarner | -0.01 | 0.07 | 0.08 |  |
| 119 | Katarina | -0.05 | 0.31 | 0.36 |  |
| 120 | Ambessa | -0.06 | 0.00 | 0.06 |  |
| 121 | Amumu | -0.06 | 0.00 | 0.06 |  |
| 122 | Diana | -0.06 | 0.00 | 0.06 |  |
| 123 | Fizz | -0.06 | 0.00 | 0.06 |  |
| 124 | Irelia | -0.06 | 0.00 | 0.06 |  |
| 125 | Lee Sin | -0.06 | 0.00 | 0.06 |  |
| 126 | Taliyah | -0.07 | 0.47 | 0.54 |  |
| 127 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 128 | Kassadin | -0.07 | 0.00 | 0.07 |  |
| 129 | Leona | -0.07 | 0.00 | 0.07 |  |
| 130 | Rumble | -0.07 | 0.00 | 0.07 |  |
| 131 | Sylas | -0.07 | 0.00 | 0.07 |  |
| 132 | Yasuo | -0.07 | 0.00 | 0.07 |  |
| 133 | Braum | -0.08 | 0.00 | 0.08 |  |
| 134 | Dr. Mundo | -0.08 | 0.00 | 0.08 |  |
| 135 | Nautilus | -0.08 | 0.00 | 0.08 |  |
| 136 | Rell | -0.08 | 0.00 | 0.08 |  |
| 137 | Renekton | -0.08 | 0.00 | 0.08 |  |
| 138 | Sejuani | -0.08 | 0.00 | 0.08 |  |
| 139 | Aatrox | -0.09 | 0.00 | 0.09 |  |
| 140 | Bel'Veth | -0.09 | 0.00 | 0.09 |  |
| 141 | Blitzcrank | -0.09 | 0.00 | 0.09 |  |
| 142 | Darius | -0.09 | 0.00 | 0.09 |  |
| 143 | Locke | -0.09 | 0.00 | 0.09 |  |
| 144 | Riven | -0.09 | 0.00 | 0.09 |  |
| 145 | Yorick | -0.09 | 0.00 | 0.09 |  |
| 146 | Trundle | -0.10 | 0.00 | 0.10 |  |
| 147 | Tryndamere | -0.10 | 0.00 | 0.10 |  |
| 148 | Warwick | -0.11 | 0.54 | 0.65 |  |
| 149 | Akali | -0.15 | 0.00 | 0.15 |  |
| 150 | Seraphine | -0.17 | 0.51 | 0.68 | range (attacks) |
| 151 | Talon | -0.19 | 0.00 | 0.19 |  |
| 152 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 153 | Kha'Zix | -0.23 | 0.00 | 0.23 |  |
| 154 | Gragas | -0.24 | 0.00 | 0.24 |  |
| 155 | Wukong | -0.26 | 0.00 | 0.26 |  |
| 156 | Poppy | -0.26 | 0.00 | 0.26 |  |
| 157 | Shyvana | -0.27 | 0.14 | 0.41 |  |
| 158 | Rammus | -0.28 | 0.32 | 0.60 |  |
| 159 | Viego | -0.29 | 0.14 | 0.43 |  |
| 160 | Urgot | -0.32 | 0.23 | 0.55 |  |
| 161 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 162 | Nunu & Willump | -0.38 | 0.17 | 0.55 |  |
| 163 | Vi | -0.38 | 0.14 | 0.52 |  |
| 164 | Fiddlesticks | -0.42 | 0.34 | 0.76 |  |
| 165 | Rakan | -0.46 | 0.18 | 0.64 |  |
| 166 | Galio | -0.48 | 0.00 | 0.48 |  |
| 167 | Naafiri | -0.52 | 0.00 | 0.52 |  |
| 168 | Shen | -0.54 | 0.33 | 0.87 |  |
| 169 | Tahm Kench | -0.57 | 0.00 | 0.57 |  |
| 170 | Zac | -0.57 | 0.00 | 0.57 |  |
| 171 | Hecarim | -0.69 | 0.15 | 0.84 |  |
| 172 | Briar | -0.75 | 0.00 | 0.75 |  |
