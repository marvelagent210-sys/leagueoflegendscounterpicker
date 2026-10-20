# Counters to Singed (patch 26.20)

## Simulated duels

The duel simulator played each of the 90 other champions with a simulator kit against Singed: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Singed wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Singed --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.88 | +1.00 | +1.00 | +1.00 | +0.54 | +1.00 | +0.00 |
| 2 | Teemo | +0.87 | +1.00 | +1.00 | +1.00 | +0.49 | +1.00 | +0.00 |
| 3 | Ashe | +0.87 | +1.00 | +1.00 | +1.00 | +0.49 | +1.00 | +0.00 |
| 4 | Kayle | +0.86 | +1.00 | +1.00 | +1.00 | +0.41 | +1.00 | +0.00 |
| 5 | Smolder | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 6 | Kog'Maw | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 7 | Corki | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 8 | Quinn | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 9 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 10 | Gnar | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 11 | Kalista | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 12 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 13 | Samira | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 14 | Sivir | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 15 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 16 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 17 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 18 | Ezreal | +0.80 | +1.00 | +0.99 | +0.95 | +0.07 | +1.00 | +0.00 |
| 19 | Darius | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 20 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 21 | Yone | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 22 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 23 | Morgana | +0.79 | +1.00 | +0.96 | +0.83 | +0.23 | +1.00 | +0.00 |
| 24 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 25 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 26 | Master Yi | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 27 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 28 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 29 | Yasuo | +0.78 | +0.98 | +0.98 | +1.00 | +0.08 | – | +0.00 |
| 30 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 31 | Fiora | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 32 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | +0.86 | +0.00 |
| 33 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 34 | Olaf | +0.76 | +0.95 | +0.99 | +0.89 | +0.12 | – | +0.00 |
| 35 | Dr. Mundo | +0.76 | +0.91 | +0.99 | +0.99 | +0.04 | – | +0.00 |
| 36 | Kennen | +0.71 | +0.74 | +0.91 | +0.99 | +0.00 | +1.00 | +0.00 |
| 37 | Illaoi | +0.68 | +0.71 | +0.96 | +0.99 | −0.01 | – | +0.00 |
| 38 | Jinx | +0.62 | +1.00 | +0.28 | +1.00 | +0.13 | +0.79 | +0.00 |
| 39 | Xayah | +0.62 | +1.00 | +1.00 | +0.00 | +0.12 | +1.00 | +0.00 |
| 40 | Sion | +0.59 | +0.65 | +0.82 | +0.82 | −0.00 | – | +0.00 |
| 41 | Heimerdinger | +0.57 | +0.04 | +1.00 | +1.00 | +0.13 | +0.92 | +0.00 |
| 42 | Draven | +0.43 | +1.00 | +1.00 | −1.00 | +0.17 | +1.00 | +0.00 |
| 43 | Aurora | +0.42 | +1.00 | +1.00 | −1.00 | +0.11 | +1.00 | +0.00 |
| 44 | Lux | +0.32 | +0.74 | +0.41 | −0.60 | +0.35 | +0.99 | +0.00 |
| 45 | Lucian | +0.32 | +1.00 | −1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 46 | Cho'Gath | +0.25 | −0.10 | +1.00 | −0.16 | +0.23 | – | +0.00 |
| 47 | Anivia | +0.11 | +0.21 | +0.15 | +0.05 | −0.06 | +0.26 | +0.00 |
| 48 | Renekton | +0.07 | +0.12 | +0.10 | +0.09 | −0.04 | – | +0.00 |
| 49 | Kassadin | +0.07 | +0.06 | +0.07 | +0.07 | +0.12 | – | +0.00 |
| 50 | Malphite | +0.07 | +0.07 | +0.06 | +0.06 | +0.14 | – | +0.00 |
| 51 | Ornn | +0.02 | +0.02 | +0.02 | −0.09 | +0.19 | – | +0.00 |
| 52 | Lissandra | −0.00 | −0.12 | −0.15 | −0.09 | +0.30 | +0.39 | +0.00 |
| 53 | Sett | −0.01 | −0.05 | −0.03 | +0.02 | +0.07 | – | +0.00 |
| 54 | Shen | −0.02 | +0.02 | −0.10 | −0.08 | +0.11 | – | +0.00 |
| 55 | Leona | −0.03 | +0.04 | −0.07 | −0.10 | −0.00 | – | +0.00 |
| 56 | Tahm Kench | −0.04 | −0.03 | −0.05 | −0.05 | −0.02 | – | +0.00 |
| 57 | Skarner | −0.04 | −0.06 | −0.08 | −0.09 | +0.10 | – | +0.00 |
| 58 | Zaahen | −0.04 | −0.02 | −0.11 | −0.11 | +0.10 | – | +0.00 |
| 59 | Jax | −0.06 | −0.05 | −0.09 | −0.09 | +0.01 | – | +0.00 |
| 60 | Mordekaiser | −0.07 | +0.01 | −0.18 | −0.17 | +0.07 | – | +0.00 |
| 61 | Rammus | −0.08 | −0.13 | −0.07 | −0.13 | +0.02 | – | +0.00 |
| 62 | Amumu | −0.08 | −0.10 | −0.09 | −0.13 | +0.00 | – | +0.00 |
| 63 | Volibear | −0.08 | −0.05 | −0.23 | −0.05 | +0.03 | – | +0.00 |
| 64 | Garen | −0.09 | −0.07 | −0.15 | −0.16 | +0.06 | – | +0.00 |
| 65 | Jhin | −0.10 | +1.00 | −1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 66 | Aatrox | −0.11 | −0.25 | −1.00 | +1.00 | +0.09 | – | +0.00 |
| 67 | Ambessa | −0.15 | +1.00 | −1.00 | −1.00 | +0.41 | – | +0.00 |
| 68 | Akali | −0.16 | −0.17 | −0.15 | −0.34 | +0.05 | – | +0.00 |
| 69 | Brand | −0.16 | +0.90 | −1.00 | −1.00 | +0.03 | +0.62 | +0.00 |
| 70 | Karthus | −0.22 | −0.32 | −0.24 | −0.27 | +0.04 | −0.26 | +0.00 |
| 71 | Nautilus | −0.25 | −0.16 | −0.26 | −0.26 | +0.05 | −1.00 | +0.00 |
| 72 | Tryndamere | −0.25 | −0.37 | −0.28 | −0.32 | +0.00 | – | +0.00 |
| 73 | Miss Fortune | −0.26 | +1.00 | −1.00 | −1.00 | +0.24 | −1.00 | +0.00 |
| 74 | Vel'Koz | −0.27 | +0.96 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 75 | Ziggs | −0.28 | +1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 76 | Annie | −0.30 | +0.04 | −1.00 | −0.55 | +0.23 | +0.20 | +0.00 |
| 77 | Pantheon | −0.32 | −1.00 | −1.00 | +1.00 | +0.06 | – | +0.00 |
| 78 | Gwen | −0.33 | −0.13 | −1.00 | −0.18 | +0.16 | – | +0.00 |
| 79 | Zyra | −0.46 | −0.06 | −1.00 | −1.00 | +0.11 | −0.08 | +0.00 |
| 80 | Ahri | −0.54 | −0.33 | −1.00 | −1.00 | +0.06 | −0.19 | +0.00 |
| 81 | Tristana | −0.59 | −1.00 | −1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 82 | Veigar | −0.65 | −0.74 | −1.00 | −1.00 | −0.04 | −0.09 | +0.00 |
| 83 | Cassiopeia | −0.76 | −0.86 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 84 | Xin Zhao | −0.77 | −1.00 | −1.00 | −0.93 | −0.04 | – | +0.00 |
| 85 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 86 | Malzahar | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 87 | Caitlyn | −0.78 | −0.91 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 88 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 89 | Kai'Sa | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 90 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Singed's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Singed's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Singed` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Xayah (net +1.19)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Singed's (525 vs 125 attack range). Singed has no dash or blink to close the gap. (Xayah basic attacks → Singed basic attacks)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Singed's Fling. Untargetable for 1.5 s, long enough to use ahead of Fling. (Xayah R Featherstorm → Singed E Fling)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Singed's Mega Adhesive. Untargetable for 1.5 s, long enough to use ahead of Mega Adhesive. (Xayah R Featherstorm → Singed W Mega Adhesive)

#### 2. Sivir (net +1.14)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Singed's (500 vs 125 attack range). Singed has no dash or blink to close the gap. (Sivir basic attacks → Singed basic attacks)
- **0.47** spell shield: Spell Shield's spell shield blocks Singed's Fling. Spell shield for 1.5 s, long enough to use ahead of Fling. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Singed E Fling)
- Watch out: Insanity Potion's Grievous Wounds cuts Sivir's healing from Spell Shield by 40%.

#### 3. Teemo (net +1.03)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Singed's (500 vs 125 attack range). Singed has no dash or blink to close the gap. (Teemo basic attacks → Singed basic attacks)
- **0.35** blind: Blinding Dart's blind makes Singed's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Singed basic attacks)

#### 4. Lulu (net +0.97)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Singed's (550 vs 125 attack range). Singed has no dash or blink to close the gap. (Lulu basic attacks → Singed basic attacks)
- **0.25** disarm: Whimsy disarms Singed for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Singed basic attacks)

#### 5. Kayle (net +0.88)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Singed's (625 vs 125 attack range). Singed has no dash or blink to close the gap. (Kayle basic attacks → Singed basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Singed's Fling (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Fling. (Kayle R Divine Judgment → Singed E Fling)

#### 6. Twitch (net +0.86)

- **0.86** range: Twitch's basic attacks reach 425 units farther than Singed's (550 vs 125 attack range). Singed has no dash or blink to close the gap. (Twitch basic attacks → Singed basic attacks)

#### 7. Mel (net +0.85)

- **0.53** range: Mel's basic attacks reach 425 units farther than Singed's (550 vs 125 attack range). Singed has no dash or blink to close the gap. (Mel basic attacks → Singed basic attacks)
- **0.32** projectile block: Rebuttal blocks Singed's Mega Adhesive, a projectile. Rebuttal for 0.75 s; Mega Adhesive takes 0.25 s to land, enough to react. (Mel W Rebuttal → Singed W Mega Adhesive)

#### 8. Morgana (net +0.82)

- **0.49** cc immunity: Black Shield makes Morgana immune to Singed's Fling (airborne, root). Immune for 5 s, long enough to use ahead of Fling. (Morgana E Black Shield → Singed E Fling)
- **0.39** range: Morgana's basic attacks reach 325 units farther than Singed's (450 vs 125 attack range). Singed has no dash or blink to close the gap. (Morgana basic attacks → Singed basic attacks)
- **0.24** cc immunity: Black Shield makes Morgana immune to Singed's Mega Adhesive (ground, slow). Immune for 5 s, long enough to use ahead of Mega Adhesive. (Morgana E Black Shield → Singed W Mega Adhesive)
- Watch out: Insanity Potion's Grievous Wounds cuts Morgana's healing from Soul Siphon by 40%.

#### 9. Milio (net +0.79)

- **0.77** range: Milio's basic attacks reach 400 units farther than Singed's (525 vs 125 attack range). Singed has no dash or blink to close the gap. (Milio basic attacks → Singed basic attacks)
- **0.24** cleanse: Breath of Life cleanses Singed's Fling (root) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Singed E Fling)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Singed's Fling (root). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Singed E Fling)
- Watch out: Insanity Potion's Grievous Wounds cuts Milio's healing from Breath of Life by 40%.

#### 10. Renata Glasc (net +0.77)

- **0.77** range: Renata Glasc's basic attacks reach 425 units farther than Singed's (550 vs 125 attack range). Singed has no dash or blink to close the gap. (Renata Glasc basic attacks → Singed basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Xayah | +1.19 | 1.19 | 0.00 | range (attacks) |
| 2 | Sivir | +1.14 | 1.41 | 0.27 | range (attacks) |
| 3 | Teemo | +1.03 | 1.03 | 0.00 | range (attacks) |
| 4 | Lulu | +0.97 | 0.97 | 0.00 | range (attacks) |
| 5 | Kayle | +0.88 | 0.88 | 0.00 | range (attacks) |
| 6 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 7 | Mel | +0.85 | 0.85 | 0.00 | range (attacks) |
| 8 | Morgana | +0.82 | 1.00 | 0.18 |  |
| 9 | Milio | +0.79 | 1.12 | 0.33 | range (attacks) |
| 10 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 11 | Bard | +0.73 | 1.15 | 0.42 | range (attacks) |
| 12 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 13 | Kalista | +0.68 | 0.90 | 0.22 | range (attacks) |
| 14 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 15 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 16 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 17 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 18 | Sona | +0.56 | 0.83 | 0.27 | range (attacks) |
| 19 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 20 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 21 | Vayne | +0.52 | 0.86 | 0.34 | range (attacks) |
| 22 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 23 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 24 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 25 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 26 | Ashe | +0.45 | 0.72 | 0.27 | range (attacks) |
| 27 | Heimerdinger | +0.45 | 0.45 | 0.00 |  |
| 28 | Annie | +0.44 | 0.44 | 0.00 |  |
| 29 | Brand | +0.44 | 0.44 | 0.00 |  |
| 30 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 31 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 32 | Vladimir | +0.43 | 1.05 | 0.62 |  |
| 33 | Malzahar | +0.43 | 0.83 | 0.40 |  |
| 34 | Kai'Sa | +0.43 | 0.77 | 0.34 | range (attacks) |
| 35 | Vex | +0.43 | 0.60 | 0.17 | range (attacks) |
| 36 | Aurora | +0.42 | 1.02 | 0.60 | range (attacks) |
| 37 | Tristana | +0.42 | 0.72 | 0.30 | range (attacks) |
| 38 | Varus | +0.42 | 0.53 | 0.11 | range (attacks) |
| 39 | Gangplank | +0.42 | 0.42 | 0.00 |  |
| 40 | Miss Fortune | +0.37 | 0.65 | 0.28 | range (attacks) |
| 41 | Corki | +0.35 | 0.65 | 0.30 | range (attacks) |
| 42 | Ezreal | +0.35 | 0.65 | 0.30 | range (attacks) |
| 43 | Twisted Fate | +0.34 | 0.86 | 0.52 | range (attacks) |
| 44 | Udyr | +0.32 | 0.84 | 0.52 |  |
| 45 | Zilean | +0.32 | 0.65 | 0.33 | range (attacks) |
| 46 | Ziggs | +0.32 | 0.53 | 0.21 | range (attacks) |
| 47 | Zoe | +0.31 | 0.65 | 0.34 | range (attacks) |
| 48 | Jayce | +0.31 | 0.61 | 0.30 | range (attacks) |
| 49 | Seraphine | +0.31 | 0.58 | 0.27 | range (attacks) |
| 50 | Yuumi | +0.30 | 1.57 | 1.27 | range (attacks) |
| 51 | Senna | +0.29 | 0.65 | 0.36 | range (attacks) |
| 52 | Fizz | +0.25 | 0.93 | 0.68 |  |
| 53 | Aphelios | +0.25 | 0.82 | 0.57 | range (attacks) |
| 54 | Jhin | +0.25 | 0.53 | 0.28 | range (attacks) |
| 55 | Vel'Koz | +0.25 | 0.53 | 0.28 | range (attacks) |
| 56 | Lissandra | +0.24 | 0.87 | 0.63 |  |
| 57 | Nocturne | +0.23 | 0.63 | 0.40 |  |
| 58 | Azir | +0.23 | 0.53 | 0.30 | range (attacks) |
| 59 | Zeri | +0.22 | 0.88 | 0.66 | range (attacks) |
| 60 | Gnar | +0.21 | 0.66 | 0.45 | range (attacks) |
| 61 | Xerath | +0.20 | 0.53 | 0.33 | range (attacks) |
| 62 | Maokai | +0.18 | 0.85 | 0.67 |  |
| 63 | Thresh | +0.18 | 0.39 | 0.21 |  |
| 64 | Kindred | +0.17 | 0.94 | 0.77 | range (attacks) |
| 65 | Nami | +0.17 | 0.44 | 0.27 |  |
| 66 | Quinn | +0.15 | 0.77 | 0.62 | range (attacks) |
| 67 | Yunara | +0.15 | 0.72 | 0.57 | range (attacks) |
| 68 | Smolder | +0.15 | 0.65 | 0.50 | range (attacks) |
| 69 | Caitlyn | +0.14 | 0.72 | 0.58 | range (attacks) |
| 70 | LeBlanc | +0.14 | 0.44 | 0.30 |  |
| 71 | Olaf | +0.12 | 0.39 | 0.27 |  |
| 72 | Cassiopeia | +0.11 | 0.44 | 0.33 |  |
| 73 | Karthus | +0.11 | 0.39 | 0.28 |  |
| 74 | Gwen | +0.09 | 0.66 | 0.57 |  |
| 75 | Nasus | +0.09 | 0.27 | 0.18 |  |
| 76 | Rengar | +0.06 | 0.49 | 0.43 |  |
| 77 | Braum | +0.06 | 0.45 | 0.39 | projectile block (Unbreakable) |
| 78 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 79 | Aurelion Sol | +0.05 | 0.44 | 0.39 |  |
| 80 | Shaco | +0.04 | 0.43 | 0.39 |  |
| 81 | Garen | +0.04 | 0.22 | 0.18 |  |
| 82 | Samira | +0.03 | 0.95 | 0.92 | range (attacks) |
| 83 | Nidalee | +0.03 | 0.60 | 0.57 | range (attacks) |
| 84 | Karma | +0.02 | 0.44 | 0.42 |  |
| 85 | Ivern | +0.02 | 0.38 | 0.36 |  |
| 86 | Fiora | 0.00 | 0.81 | 0.81 |  |
| 87 | Swain | 0.00 | 0.42 | 0.42 |  |
| 88 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 89 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 90 | Lucian | -0.04 | 0.72 | 0.76 | range (attacks) |
| 91 | Soraka | -0.05 | 0.53 | 0.58 | range (attacks) |
| 92 | Graves | -0.07 | 0.49 | 0.56 |  |
| 93 | Ahri | -0.08 | 0.44 | 0.52 |  |
| 94 | Jax | -0.11 | 0.28 | 0.39 |  |
| 95 | Zed | -0.12 | 0.42 | 0.54 |  |
| 96 | Urgot | -0.12 | 0.30 | 0.42 |  |
| 97 | Janna | -0.16 | 0.72 | 0.88 | range (attacks) |
| 98 | Master Yi | -0.18 | 0.71 | 0.89 |  |
| 99 | Taliyah | -0.18 | 0.53 | 0.71 | range (attacks) |
| 100 | Cho'Gath | -0.18 | 0.00 | 0.18 |  |
| 101 | Ryze | -0.21 | 0.48 | 0.69 |  |
| 102 | Malphite | -0.24 | 0.25 | 0.49 |  |
| 103 | Lillia | -0.26 | 0.22 | 0.48 |  |
| 104 | Taric | -0.27 | 0.00 | 0.27 |  |
| 105 | Akshan | -0.28 | 0.68 | 0.96 | range (attacks) |
| 106 | Elise | -0.28 | 0.65 | 0.93 | range (attacks) |
| 107 | Kled | -0.28 | 0.64 | 0.92 |  |
| 108 | Sion | -0.31 | 0.41 | 0.72 |  |
| 109 | Yasuo | -0.32 | 0.39 | 0.71 |  |
| 110 | Illaoi | -0.33 | 0.07 | 0.40 |  |
| 111 | Yorick | -0.33 | 0.00 | 0.33 |  |
| 112 | Rek'Sai | -0.37 | 0.45 | 0.82 |  |
| 113 | Alistar | -0.37 | 0.26 | 0.63 |  |
| 114 | Evelynn | -0.39 | 0.43 | 0.82 |  |
| 115 | Diana | -0.39 | 0.00 | 0.39 |  |
| 116 | Nautilus | -0.39 | 0.00 | 0.39 |  |
| 117 | Mordekaiser | -0.41 | 0.06 | 0.47 |  |
| 118 | Jarvan IV | -0.42 | 0.07 | 0.49 |  |
| 119 | Ornn | -0.45 | 0.07 | 0.52 |  |
| 120 | Rammus | -0.47 | 0.27 | 0.74 |  |
| 121 | Camille | -0.49 | 0.45 | 0.94 |  |
| 122 | Amumu | -0.49 | 0.00 | 0.49 |  |
| 123 | Kassadin | -0.49 | 0.00 | 0.49 |  |
| 124 | Leona | -0.49 | 0.00 | 0.49 |  |
| 125 | Rell | -0.49 | 0.00 | 0.49 |  |
| 126 | Sejuani | -0.49 | 0.00 | 0.49 |  |
| 127 | Dr. Mundo | -0.51 | 0.00 | 0.51 |  |
| 128 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 129 | Darius | -0.54 | 0.00 | 0.54 |  |
| 130 | Nilah | -0.58 | 0.50 | 1.08 |  |
| 131 | Xin Zhao | -0.59 | 0.16 | 0.75 |  |
| 132 | Poppy | -0.59 | 0.00 | 0.59 |  |
| 133 | Qiyana | -0.59 | 0.00 | 0.59 |  |
| 134 | Sett | -0.60 | 0.07 | 0.67 |  |
| 135 | K'Sante | -0.61 | 0.14 | 0.75 |  |
| 136 | Akali | -0.64 | 0.00 | 0.64 |  |
| 137 | Kha'Zix | -0.66 | 0.00 | 0.66 |  |
| 138 | Locke | -0.66 | 0.00 | 0.66 |  |
| 139 | Renekton | -0.66 | 0.00 | 0.66 |  |
| 140 | Tryndamere | -0.66 | 0.00 | 0.66 |  |
| 141 | Nunu & Willump | -0.67 | 0.09 | 0.76 |  |
| 142 | Katarina | -0.67 | 0.00 | 0.67 |  |
| 143 | Yone | -0.68 | 0.07 | 0.75 |  |
| 144 | Fiddlesticks | -0.69 | 0.39 | 1.08 |  |
| 145 | Shyvana | -0.69 | 0.07 | 0.76 |  |
| 146 | Rakan | -0.71 | 0.25 | 0.96 |  |
| 147 | Wukong | -0.76 | 0.00 | 0.76 |  |
| 148 | Irelia | -0.77 | 0.10 | 0.87 |  |
| 149 | Hecarim | -0.79 | 0.07 | 0.86 |  |
| 150 | Gragas | -0.84 | 0.00 | 0.84 |  |
| 151 | Lee Sin | -0.85 | 0.00 | 0.85 |  |
| 152 | Riven | -0.87 | 0.00 | 0.87 |  |
| 153 | Shen | -0.89 | 0.27 | 1.16 |  |
| 154 | Pantheon | -0.91 | 0.23 | 1.14 |  |
| 155 | Zaahen | -1.00 | 0.39 | 1.39 |  |
| 156 | Talon | -1.02 | 0.00 | 1.02 |  |
| 157 | Pyke | -1.07 | 0.00 | 1.07 |  |
| 158 | Aatrox | -1.08 | 0.00 | 1.08 |  |
| 159 | Vi | -1.10 | 0.07 | 1.17 |  |
| 160 | Volibear | -1.11 | 0.07 | 1.18 |  |
| 161 | Zac | -1.17 | 0.00 | 1.17 |  |
| 162 | Ekko | -1.18 | 0.00 | 1.18 |  |
| 163 | Sylas | -1.26 | 0.00 | 1.26 |  |
| 164 | Viego | -1.28 | 0.26 | 1.54 |  |
| 165 | Galio | -1.33 | 0.00 | 1.33 |  |
| 166 | Kayn | -1.37 | 0.43 | 1.80 |  |
| 167 | Ambessa | -1.45 | 0.00 | 1.45 |  |
| 168 | Tahm Kench | -1.58 | 0.00 | 1.58 |  |
| 169 | Briar | -1.61 | 0.00 | 1.61 |  |
| 170 | Bel'Veth | -1.65 | 0.00 | 1.65 |  |
| 171 | Naafiri | -1.70 | 0.00 | 1.70 |  |
| 172 | Warwick | -1.72 | 0.47 | 2.19 |  |
