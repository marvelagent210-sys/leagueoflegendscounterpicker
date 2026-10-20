# Counters to Olaf (patch 26.20)

## Simulated duels

The duel simulator played each of the 75 other champions with a simulator kit against Olaf: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Olaf wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Olaf --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.87 | +1.00 | +1.00 | +1.00 | +0.50 | +1.00 | +0.00 |
| 2 | Teemo | +0.86 | +1.00 | +1.00 | +1.00 | +0.37 | +1.00 | +0.00 |
| 3 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.08 | – | +1.00 |
| 4 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | – | +1.00 |
| 5 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 6 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | – | +1.00 |
| 7 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 8 | Aurora | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 9 | Cho'Gath | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 10 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 11 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 12 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 13 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 14 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 15 | Jayce | +0.73 | +1.00 | +0.57 | +1.00 | +0.24 | +1.00 | +0.00 |
| 16 | Dr. Mundo | +0.68 | +0.65 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 17 | Illaoi | +0.61 | +0.68 | +0.68 | +1.00 | +0.08 | – | +0.00 |
| 18 | Irelia | +0.57 | +1.00 | +1.00 | +0.29 | +0.11 | −0.04 | +0.00 |
| 19 | Volibear | +0.49 | +1.00 | −0.04 | +1.00 | +0.03 | – | +0.00 |
| 20 | Annie | +0.41 | +1.00 | +1.00 | −1.00 | +0.10 | +1.00 | +0.00 |
| 21 | Morgana | +0.41 | +1.00 | +1.00 | −1.00 | +0.10 | +1.00 | +0.00 |
| 22 | Cassiopeia | +0.28 | +1.00 | +1.00 | −1.00 | +0.29 | −0.19 | −0.86 |
| 23 | Gangplank | +0.23 | +0.37 | +1.00 | −1.00 | +0.10 | – | +1.00 |
| 24 | Gwen | +0.22 | +0.76 | +0.73 | −1.00 | +0.14 | – | +0.00 |
| 25 | Heimerdinger | +0.12 | −0.99 | +0.98 | +1.00 | +0.11 | −0.93 | +0.00 |
| 26 | Vel'Koz | +0.09 | −0.34 | +1.00 | −1.00 | +0.18 | +1.00 | +0.00 |
| 27 | Aatrox | +0.08 | +0.49 | +0.54 | −1.00 | +0.07 | – | +0.00 |
| 28 | Ashe | −0.10 | +1.00 | −0.16 | −1.00 | +0.29 | −1.00 | −1.00 |
| 29 | Rumble | −0.12 | −0.61 | −0.63 | +1.00 | +0.02 | – | +0.00 |
| 30 | Jax | −0.28 | −0.50 | −0.50 | +0.00 | −0.02 | – | +0.00 |
| 31 | Karthus | −0.43 | −1.00 | +0.00 | −1.00 | +0.11 | +0.00 | +0.00 |
| 32 | Sion | −0.44 | −0.59 | −0.53 | −0.57 | +0.02 | – | +0.00 |
| 33 | Mordekaiser | −0.45 | +0.38 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 34 | Zyra | −0.54 | −0.51 | −0.50 | −1.00 | +0.05 | −1.00 | +0.00 |
| 35 | Kennen | −0.60 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 36 | Akali | −0.63 | −1.00 | −0.56 | −0.94 | +0.08 | – | +0.00 |
| 37 | Master Yi | −0.71 | −1.00 | −1.00 | −1.00 | +0.05 | – | +1.00 |
| 38 | Ambessa | −0.72 | −1.00 | −1.00 | −1.00 | +0.50 | −1.00 | +0.00 |
| 39 | Yasuo | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 40 | Wukong | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 41 | Singed | −0.76 | −0.99 | −0.95 | −0.89 | −0.12 | – | +0.00 |
| 42 | Zaahen | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 43 | Ahri | −0.76 | −1.00 | −1.00 | −1.00 | +0.04 | −0.67 | +0.00 |
| 44 | Yone | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 45 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 46 | Gnar | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 47 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 48 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 49 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 50 | Udyr | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 51 | Camille | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 52 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 53 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 54 | Poppy | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 55 | Xin Zhao | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 56 | Urgot | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 57 | Riven | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 58 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 59 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.49 |
| 60 | Kassadin | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 61 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 62 | Brand | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 63 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 64 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 65 | Tahm Kench | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 66 | Warwick | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 67 | Gragas | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 68 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 69 | Anivia | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 70 | Rammus | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 71 | Malzahar | −0.84 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 72 | K'Sante | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 73 | Nautilus | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −1.00 |
| 74 | Leona | −0.85 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.98 |
| 75 | Amumu | −0.87 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Olaf's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Olaf's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Olaf` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.22)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Sivir basic attacks → Olaf basic attacks)
- **0.28** spell shield: Spell Shield's spell shield blocks Olaf's Reckless Swing. Spell shield for 1.5 s, long enough to use ahead of Reckless Swing. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Olaf E Reckless Swing)

#### 2. Teemo (net +1.02)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Teemo basic attacks → Olaf basic attacks)
- **0.50** blind: Blinding Dart's blind makes Olaf's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Olaf basic attacks)
- Watch out: Ragnarok makes Olaf immune to Teemo's Blinding Dart (blind).

#### 3. Yuumi (net +0.92)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Olaf's (425 vs 125 attack range). Olaf has no dash or blink to close the gap. (Yuumi basic attacks → Olaf basic attacks)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Olaf's Reckless Swing. Untargetable for ?; Reckless Swing takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Olaf E Reckless Swing)
- Watch out: Ragnarok makes Olaf immune to Yuumi's Final Chapter (slow).

#### 4. Kindred (net +0.89)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Kindred basic attacks → Olaf basic attacks)
- Watch out: Ragnarok makes Olaf immune to Kindred's Mounting Dread (slow).

#### 5. Kayle (net +0.87)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Olaf's (625 vs 125 attack range). Olaf has no dash or blink to close the gap. (Kayle basic attacks → Olaf basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Olaf's Reckless Swing. Invulnerable for 2.5 s, long enough to use ahead of Reckless Swing. (Kayle R Divine Judgment → Olaf E Reckless Swing)
- Watch out: Ragnarok makes Olaf immune to Kayle's Radiant Blast (slow).

#### 6. Zeri (net +0.83)

- **0.88** range: Zeri's basic attacks reach 425 units farther than Olaf's (550 vs 125 attack range). Olaf has no dash or blink to close the gap. (Zeri basic attacks → Olaf basic attacks)
- Watch out: Ragnarok makes Olaf immune to Zeri's Ultrashock Laser (slow).

#### 7. Twitch (net +0.81)

- **0.86** range: Twitch's basic attacks reach 425 units farther than Olaf's (550 vs 125 attack range). Olaf has no dash or blink to close the gap. (Twitch basic attacks → Olaf basic attacks)
- Watch out: Ragnarok makes Olaf immune to Twitch's Venom Cask (slow).

#### 8. Kai'Sa (net +0.77)

- **0.77** range: Kai'Sa's basic attacks reach 400 units farther than Olaf's (525 vs 125 attack range). Olaf has no dash or blink to close the gap. (Kai'Sa basic attacks → Olaf basic attacks)

#### 9. Lucian (net +0.72)

- **0.72** range: Lucian's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Lucian basic attacks → Olaf basic attacks)

#### 10. Akshan (net +0.68)

- **0.68** range: Akshan's basic attacks reach 375 units farther than Olaf's (500 vs 125 attack range). Olaf has no dash or blink to close the gap. (Akshan basic attacks → Olaf basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.22 | 1.22 | 0.00 | range (attacks) |
| 2 | Teemo | +1.02 | 1.18 | 0.16 | range (attacks), blind (Blinding Dart) |
| 3 | Yuumi | +0.92 | 1.09 | 0.17 | range (attacks) |
| 4 | Kindred | +0.89 | 0.94 | 0.05 | range (attacks) |
| 5 | Kayle | +0.87 | 0.92 | 0.05 | range (attacks) |
| 6 | Zeri | +0.83 | 0.88 | 0.05 | range (attacks) |
| 7 | Twitch | +0.81 | 0.86 | 0.05 | range (attacks) |
| 8 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 9 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 10 | Akshan | +0.68 | 0.68 | 0.00 | range (attacks) |
| 11 | Xayah | +0.65 | 0.97 | 0.32 | range (attacks) |
| 12 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 13 | Yunara | +0.64 | 0.72 | 0.08 | range (attacks) |
| 14 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 15 | Miss Fortune | +0.59 | 0.65 | 0.06 | range (attacks) |
| 16 | Vladimir | +0.57 | 0.66 | 0.09 |  |
| 17 | Aurora | +0.56 | 0.78 | 0.22 | range (attacks) |
| 18 | Twisted Fate | +0.55 | 0.86 | 0.31 | range (attacks) |
| 19 | Samira | +0.55 | 0.76 | 0.21 | range (attacks) |
| 20 | Vayne | +0.52 | 0.86 | 0.34 | range (attacks) |
| 21 | Milio | +0.50 | 0.83 | 0.33 | range (attacks) |
| 22 | Smolder | +0.48 | 0.65 | 0.17 | range (attacks) |
| 23 | Kog'Maw | +0.48 | 0.54 | 0.06 | range (attacks) |
| 24 | Graves | +0.43 | 0.49 | 0.06 |  |
| 25 | Draven | +0.38 | 0.72 | 0.34 | range (attacks) |
| 26 | Quinn | +0.35 | 0.77 | 0.42 | range (attacks) |
| 27 | Caitlyn | +0.35 | 0.72 | 0.37 | range (attacks) |
| 28 | Master Yi | +0.35 | 0.35 | 0.00 |  |
| 29 | Mel | +0.34 | 0.67 | 0.33 | range (attacks) |
| 30 | Nasus | +0.34 | 0.39 | 0.05 |  |
| 31 | Karthus | +0.33 | 0.39 | 0.06 |  |
| 32 | Elise | +0.32 | 0.65 | 0.33 | range (attacks) |
| 33 | Kennen | +0.32 | 0.58 | 0.26 | range (attacks) |
| 34 | Zilean | +0.30 | 0.65 | 0.35 | range (attacks) |
| 35 | Zoe | +0.30 | 0.65 | 0.35 | range (attacks) |
| 36 | Senna | +0.28 | 0.65 | 0.37 | range (attacks) |
| 37 | Corki | +0.27 | 0.60 | 0.33 | range (attacks) |
| 38 | Jayce | +0.24 | 0.61 | 0.37 | range (attacks) |
| 39 | Jinx | +0.22 | 0.58 | 0.36 | range (attacks) |
| 40 | Lux | +0.22 | 0.58 | 0.36 | range (attacks) |
| 41 | LeBlanc | +0.22 | 0.44 | 0.22 |  |
| 42 | Vex | +0.21 | 0.53 | 0.32 | range (attacks) |
| 43 | Lulu | +0.20 | 1.08 | 0.88 | range (attacks) |
| 44 | Annie | +0.18 | 0.44 | 0.26 |  |
| 45 | Katarina | +0.18 | 0.18 | 0.00 |  |
| 46 | Xerath | +0.16 | 0.53 | 0.37 | range (attacks) |
| 47 | Ryze | +0.15 | 0.48 | 0.33 |  |
| 48 | Soraka | +0.14 | 0.53 | 0.39 | range (attacks) |
| 49 | Gwen | +0.14 | 0.28 | 0.14 |  |
| 50 | Zed | +0.14 | 0.20 | 0.06 |  |
| 51 | Viktor | +0.13 | 0.65 | 0.52 | range (attacks) |
| 52 | Veigar | +0.13 | 0.48 | 0.35 |  |
| 53 | Vel'Koz | +0.12 | 0.53 | 0.41 | range (attacks) |
| 54 | Jhin | +0.10 | 0.53 | 0.43 | range (attacks) |
| 55 | Ahri | +0.10 | 0.44 | 0.34 |  |
| 56 | Fiora | +0.09 | 0.35 | 0.26 |  |
| 57 | Ziggs | +0.08 | 0.53 | 0.45 | range (attacks) |
| 58 | Jax | +0.08 | 0.41 | 0.33 | attack dodge (Counter Strike) |
| 59 | Brand | +0.06 | 0.44 | 0.38 |  |
| 60 | Syndra | +0.05 | 0.44 | 0.39 |  |
| 61 | Swain | +0.04 | 0.42 | 0.38 |  |
| 62 | Sona | +0.03 | 0.83 | 0.80 | range (attacks) |
| 63 | Ashe | +0.02 | 0.72 | 0.70 | range (attacks) |
| 64 | Bard | 0.00 | 0.92 | 0.92 | range (attacks) |
| 65 | Varus | 0.00 | 0.71 | 0.71 | range (attacks) |
| 66 | Garen | 0.00 | 0.12 | 0.12 |  |
| 67 | Karma | -0.02 | 0.44 | 0.46 |  |
| 68 | Fiddlesticks | -0.02 | 0.39 | 0.41 |  |
| 69 | Gnar | -0.03 | 0.66 | 0.69 | range (attacks) |
| 70 | Ivern | -0.05 | 0.38 | 0.43 |  |
| 71 | Talon | -0.05 | 0.00 | 0.05 |  |
| 72 | Heimerdinger | -0.06 | 0.45 | 0.51 |  |
| 73 | Akali | -0.06 | 0.00 | 0.06 |  |
| 74 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 75 | Illaoi | -0.06 | 0.00 | 0.06 |  |
| 76 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 77 | Anivia | -0.07 | 0.48 | 0.55 |  |
| 78 | Kha'Zix | -0.07 | 0.00 | 0.07 |  |
| 79 | Gangplank | -0.10 | 0.07 | 0.17 |  |
| 80 | Hwei | -0.11 | 0.46 | 0.57 |  |
| 81 | Tristana | -0.12 | 0.72 | 0.84 | range (attacks) |
| 82 | Shen | -0.12 | 0.39 | 0.51 |  |
| 83 | Nocturne | -0.12 | 0.34 | 0.46 |  |
| 84 | Singed | -0.12 | 0.27 | 0.39 |  |
| 85 | Kayn | -0.13 | 0.20 | 0.33 |  |
| 86 | Rek'Sai | -0.13 | 0.20 | 0.33 |  |
| 87 | Evelynn | -0.14 | 0.20 | 0.34 |  |
| 88 | Kassadin | -0.15 | 0.00 | 0.15 |  |
| 89 | Aphelios | -0.16 | 0.82 | 0.98 | range (attacks) |
| 90 | Locke | -0.17 | 0.00 | 0.17 |  |
| 91 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 92 | Shaco | -0.19 | 0.20 | 0.39 |  |
| 93 | Nilah | -0.20 | 0.60 | 0.80 |  |
| 94 | Thresh | -0.21 | 0.39 | 0.60 |  |
| 95 | Pantheon | -0.21 | 0.28 | 0.49 |  |
| 96 | Renata Glasc | -0.22 | 0.77 | 0.99 | range (attacks) |
| 97 | Naafiri | -0.23 | 0.00 | 0.23 |  |
| 98 | Morgana | -0.25 | 0.47 | 0.72 |  |
| 99 | Rengar | -0.25 | 0.08 | 0.33 |  |
| 100 | Ekko | -0.26 | 0.00 | 0.26 |  |
| 101 | Janna | -0.27 | 0.72 | 0.99 | range (attacks) |
| 102 | Kalista | -0.29 | 0.69 | 0.98 | range (attacks) |
| 103 | Azir | -0.30 | 0.53 | 0.83 | range (attacks) |
| 104 | Orianna | -0.30 | 0.53 | 0.83 | range (attacks) |
| 105 | Irelia | -0.30 | 0.10 | 0.40 |  |
| 106 | Mordekaiser | -0.30 | 0.09 | 0.39 |  |
| 107 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 108 | Lissandra | -0.34 | 0.64 | 0.98 |  |
| 109 | Taric | -0.34 | 0.00 | 0.34 |  |
| 110 | Udyr | -0.37 | 0.11 | 0.48 |  |
| 111 | Bel'Veth | -0.37 | 0.00 | 0.37 |  |
| 112 | Yorick | -0.37 | 0.00 | 0.37 |  |
| 113 | Seraphine | -0.39 | 0.58 | 0.97 | range (attacks) |
| 114 | Malzahar | -0.39 | 0.47 | 0.86 |  |
| 115 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 116 | Darius | -0.39 | 0.00 | 0.39 |  |
| 117 | Trundle | -0.39 | 0.00 | 0.39 |  |
| 118 | Nunu & Willump | -0.42 | 0.13 | 0.55 |  |
| 119 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 120 | Cassiopeia | -0.43 | 0.44 | 0.87 |  |
| 121 | Fizz | -0.43 | 0.42 | 0.85 |  |
| 122 | Zaahen | -0.45 | 0.05 | 0.50 |  |
| 123 | Zyra | -0.49 | 0.48 | 0.97 |  |
| 124 | Shyvana | -0.51 | 0.00 | 0.51 |  |
| 125 | Sylas | -0.51 | 0.00 | 0.51 |  |
| 126 | Nami | -0.52 | 0.44 | 0.96 |  |
| 127 | Neeko | -0.53 | 0.44 | 0.97 |  |
| 128 | Aurelion Sol | -0.56 | 0.44 | 1.00 |  |
| 129 | Blitzcrank | -0.56 | 0.00 | 0.56 |  |
| 130 | Alistar | -0.59 | 0.04 | 0.63 |  |
| 131 | Lillia | -0.61 | 0.22 | 0.83 |  |
| 132 | Volibear | -0.61 | 0.00 | 0.61 |  |
| 133 | Yasuo | -0.64 | 0.16 | 0.80 |  |
| 134 | Pyke | -0.64 | 0.00 | 0.64 |  |
| 135 | Riven | -0.66 | 0.00 | 0.66 |  |
| 136 | Urgot | -0.67 | 0.30 | 0.97 |  |
| 137 | Taliyah | -0.68 | 0.53 | 1.21 | range (attacks) |
| 138 | Braum | -0.71 | 0.23 | 0.94 |  |
| 139 | Lee Sin | -0.71 | 0.00 | 0.71 |  |
| 140 | Maokai | -0.76 | 0.37 | 1.13 |  |
| 141 | Rammus | -0.77 | 0.38 | 1.15 |  |
| 142 | Malphite | -0.79 | 0.25 | 1.04 |  |
| 143 | Rakan | -0.79 | 0.25 | 1.04 |  |
| 144 | Xin Zhao | -0.79 | 0.20 | 0.99 |  |
| 145 | Sion | -0.79 | 0.06 | 0.85 |  |
| 146 | Diana | -0.80 | 0.00 | 0.80 |  |
| 147 | Wukong | -0.80 | 0.00 | 0.80 |  |
| 148 | Kled | -0.85 | 0.31 | 1.16 |  |
| 149 | Skarner | -0.88 | 0.06 | 0.94 |  |
| 150 | Qiyana | -0.97 | 0.00 | 0.97 |  |
| 151 | Leona | -0.98 | 0.00 | 0.98 |  |
| 152 | Gragas | -1.00 | 0.00 | 1.00 |  |
| 153 | Poppy | -1.00 | 0.00 | 1.00 |  |
| 154 | Ambessa | -1.02 | 0.00 | 1.02 |  |
| 155 | Viego | -1.04 | 0.19 | 1.23 |  |
| 156 | Camille | -1.05 | 0.20 | 1.25 |  |
| 157 | Warwick | -1.05 | 0.05 | 1.10 |  |
| 158 | Amumu | -1.05 | 0.00 | 1.05 |  |
| 159 | Nautilus | -1.06 | 0.00 | 1.06 |  |
| 160 | Tahm Kench | -1.07 | 0.00 | 1.07 |  |
| 161 | Zac | -1.12 | 0.00 | 1.12 |  |
| 162 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 163 | Sett | -1.17 | 0.00 | 1.17 |  |
| 164 | Jarvan IV | -1.19 | 0.00 | 1.19 |  |
| 165 | Hecarim | -1.21 | 0.00 | 1.21 |  |
| 166 | Rell | -1.22 | 0.00 | 1.22 |  |
| 167 | Yone | -1.22 | 0.00 | 1.22 |  |
| 168 | Vi | -1.23 | 0.00 | 1.23 |  |
| 169 | Briar | -1.24 | 0.00 | 1.24 |  |
| 170 | Ornn | -1.28 | 0.00 | 1.28 |  |
| 171 | Galio | -1.31 | 0.00 | 1.31 |  |
| 172 | K'Sante | -1.33 | 0.00 | 1.33 |  |
