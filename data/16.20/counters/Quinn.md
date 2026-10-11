# Counters to Quinn (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 42 other champions with a simulator kit against Quinn: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Quinn wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Quinn --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +1.00 |
| 2 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 3 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | +1.00 |
| 4 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 5 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | −0.32 | +1.00 | +1.00 |
| 6 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 7 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 8 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 9 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 10 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 11 | Kennen | +0.76 | +0.98 | +0.98 | +1.00 | −0.04 | – | +0.00 |
| 12 | Rumble | +0.68 | +0.59 | +0.98 | +0.97 | +0.02 | +0.87 | +0.00 |
| 13 | Volibear | +0.58 | +1.00 | +1.00 | +1.00 | −0.16 | −1.00 | +0.00 |
| 14 | Aurora | +0.36 | +1.00 | +1.00 | −0.92 | +0.07 | – | +0.00 |
| 15 | Sion | +0.31 | +0.07 | +0.07 | +1.00 | −0.20 | +1.00 | +0.00 |
| 16 | Irelia | +0.17 | −0.29 | −0.28 | +1.00 | +0.07 | +1.00 | +0.00 |
| 17 | Mordekaiser | +0.15 | +0.75 | +0.58 | −0.34 | −0.06 | −1.00 | +0.00 |
| 18 | Tahm Kench | +0.01 | +0.06 | +0.04 | +0.06 | −0.11 | −0.07 | +0.00 |
| 19 | Fiora | −0.09 | +0.00 | +0.00 | −1.00 | −0.25 | +1.00 | +1.00 |
| 20 | Tryndamere | −0.24 | −1.00 | −1.00 | +1.00 | −0.25 | +1.00 | +0.00 |
| 21 | Sett | −0.33 | −1.00 | −1.00 | +1.00 | +0.07 | −0.45 | +0.00 |
| 22 | Ornn | −0.34 | −0.18 | −0.22 | −0.69 | −0.01 | −1.00 | +0.00 |
| 23 | Kled | −0.38 | −0.42 | −0.57 | −0.74 | −0.07 | +0.26 | +0.00 |
| 24 | Yone | −0.40 | −1.00 | −1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 25 | Aatrox | −0.45 | −0.44 | −0.44 | −1.00 | −0.34 | +0.27 | +0.00 |
| 26 | Gwen | −0.51 | −1.00 | −1.00 | +0.71 | −0.37 | −1.00 | +0.00 |
| 27 | Ambessa | −0.61 | −1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.00 |
| 28 | Jax | −0.61 | −1.00 | −1.00 | −1.00 | −0.09 | +1.00 | +0.00 |
| 29 | Pantheon | −0.65 | −1.00 | −1.00 | −1.00 | −0.34 | +1.00 | +0.00 |
| 30 | Gnar | −0.67 | −0.75 | −0.75 | −1.00 | +0.04 | −1.00 | +0.00 |
| 31 | Darius | −0.70 | −0.48 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 32 | Garen | −0.75 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +1.00 |
| 33 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 34 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 35 | Yasuo | −0.80 | −1.00 | −1.00 | −0.85 | −0.21 | −1.00 | +0.00 |
| 36 | Riven | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 37 | Shen | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 38 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 39 | Olaf | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 40 | Zaahen | −0.83 | −1.00 | −1.00 | −0.86 | −0.37 | −1.00 | +0.00 |
| 41 | Cho'Gath | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 42 | Singed | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Quinn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Quinn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Quinn` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +0.82)

- **0.68** spell shield: Shroud of Darkness's spell shield blocks Quinn's Vault. Spell shield for 1.5 s, long enough to use ahead of Vault. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Quinn E Vault)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks Quinn's Skystrike. Spell shield for 1.5 s, long enough to use ahead of Skystrike. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Quinn R Skystrike)
- **0.18** interrupt: Unspeakable Horror's fear interrupts Quinn's Behind Enemy Lines (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 2. Sivir (net +0.77)

- **0.57** spell shield: Spell Shield's spell shield blocks Quinn's Vault. Spell shield for 1.5 s, long enough to use ahead of Vault. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Quinn E Vault)
- **0.40** spell shield: Spell Shield's spell shield blocks Quinn's Skystrike. Spell shield for 1.5 s, long enough to use ahead of Skystrike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Quinn R Skystrike)

#### 3. Rek'Sai (net +0.65)

- **0.39** untargetable: Void Rush makes Rek'Sai untargetable, dodging Quinn's Vault. Untargetable for 1.5 s, long enough to use ahead of Vault. (Rek'Sai R Void Rush → Quinn E Vault)
- **0.33** interrupt: Unburrow's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Quinn R Behind Enemy Lines)
- **0.26** untargetable: Void Rush makes Rek'Sai untargetable, dodging Quinn's Skystrike. Untargetable for 1.5 s, long enough to use ahead of Skystrike. (Rek'Sai R Void Rush → Quinn R Skystrike)
- Watch out: Quinn's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

#### 4. Elise (net +0.65)

- **0.34** untargetable: Rappel makes Elise untargetable, dodging Quinn's Vault. Untargetable for 0.6 s; Vault lands within 0.24 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Quinn E Vault)
- **0.24** untargetable: Rappel makes Elise untargetable, dodging Quinn's Skystrike. Untargetable for 0.6 s; Skystrike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Quinn R Skystrike)
- **0.19** interrupt: Cocoon's stun interrupts Quinn's Behind Enemy Lines (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Quinn R Behind Enemy Lines)

#### 5. Yasuo (net +0.63)

- **0.41** projectile block: Wind Wall blocks Quinn's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Quinn basic attacks)
- **0.32** projectile block: Wind Wall blocks Quinn's Blinding Assault, a projectile. Wind Wall for 4 s, long enough to use ahead of Blinding Assault. (Yasuo W Wind Wall → Quinn Q Blinding Assault)
- **0.28** interrupt: Steel Tempest's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 6. Udyr (net +0.61)

- **0.85** cc immunity: Blazing Stampede makes Udyr immune to Quinn's Vault (airborne, slow). Immune for 1.5 s, long enough to use ahead of Vault. (Udyr E Blazing Stampede → Quinn E Vault)
- **0.23** interrupt: Blazing Stampede's stun interrupts Quinn's Behind Enemy Lines (normal channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Quinn R Behind Enemy Lines)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Quinn's Blinding Assault (nearsight). Immune for 1.5 s, long enough to use ahead of Blinding Assault. (Udyr E Blazing Stampede → Quinn Q Blinding Assault)
- Watch out: Quinn's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range).

#### 7. Vladimir (net +0.59)

- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Quinn's Vault. Untargetable for 2 s, long enough to use ahead of Vault. (Vladimir W Sanguine Pool → Quinn E Vault)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Quinn's Skystrike. Untargetable for 2 s, long enough to use ahead of Skystrike. (Vladimir W Sanguine Pool → Quinn R Skystrike)
- Watch out: Quinn's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 8. Lissandra (net +0.59)

- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Quinn's Vault. Untargetable for 2.5 s, long enough to use ahead of Vault. (Lissandra R Frozen Tomb → Quinn E Vault)
- **0.26** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Quinn's Skystrike. Untargetable for 2.5 s, long enough to use ahead of Skystrike. (Lissandra R Frozen Tomb → Quinn R Skystrike)
- **0.20** dash stop: Frozen Tomb's knockdown can stop Quinn's Vault mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Quinn E Vault)

#### 9. Braum (net +0.58)

- **0.54** projectile block: Unbreakable blocks Quinn's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Quinn basic attacks)
- **0.45** projectile block: Unbreakable blocks Quinn's Blinding Assault, a projectile. Unbreakable for 4 s, long enough to use ahead of Blinding Assault. (Braum E Unbreakable → Quinn Q Blinding Assault)
- **0.19** interrupt: Concussive Blows's stun interrupts Quinn's Behind Enemy Lines (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 10. Bard (net +0.56)

- **0.39** untargetable: Tempered Fate makes Bard untargetable, dodging Quinn's Vault. Untargetable for 2.5 s, long enough to use ahead of Vault. (Bard R Tempered Fate → Quinn E Vault)
- **0.26** untargetable: Tempered Fate makes Bard untargetable, dodging Quinn's Skystrike. Untargetable for 2.5 s, long enough to use ahead of Skystrike. (Bard R Tempered Fate → Quinn R Skystrike)
- **0.14** interrupt: Tempered Fate's stasis interrupts Quinn's Behind Enemy Lines (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Quinn R Behind Enemy Lines)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +0.82 | 1.20 | 0.38 |  |
| 2 | Sivir | +0.77 | 0.77 | 0.00 |  |
| 3 | Rek'Sai | +0.65 | 0.87 | 0.22 |  |
| 4 | Elise | +0.65 | 0.65 | 0.00 |  |
| 5 | Yasuo | +0.63 | 0.85 | 0.22 | projectile block (Wind Wall) |
| 6 | Udyr | +0.61 | 0.99 | 0.38 |  |
| 7 | Vladimir | +0.59 | 0.82 | 0.23 |  |
| 8 | Lissandra | +0.59 | 0.59 | 0.00 |  |
| 9 | Braum | +0.58 | 0.96 | 0.38 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 10 | Bard | +0.56 | 0.56 | 0.00 |  |
| 11 | Cassiopeia | +0.54 | 0.54 | 0.00 | grounding (Miasma) |
| 12 | Xayah | +0.51 | 0.51 | 0.00 |  |
| 13 | Morgana | +0.50 | 0.64 | 0.14 |  |
| 14 | Lulu | +0.50 | 0.50 | 0.00 |  |
| 15 | Teemo | +0.50 | 0.50 | 0.00 | blind (Blinding Dart) |
| 16 | Malzahar | +0.49 | 0.89 | 0.40 |  |
| 17 | Maokai | +0.49 | 0.87 | 0.38 |  |
| 18 | Vex | +0.48 | 0.48 | 0.00 |  |
| 19 | Hwei | +0.47 | 0.47 | 0.00 |  |
| 20 | Samira | +0.47 | 0.47 | 0.00 |  |
| 21 | Viktor | +0.47 | 0.47 | 0.00 |  |
| 22 | Mel | +0.46 | 0.46 | 0.00 |  |
| 23 | Kayle | +0.45 | 0.45 | 0.00 |  |
| 24 | Ahri | +0.43 | 0.43 | 0.00 |  |
| 25 | Veigar | +0.41 | 0.41 | 0.00 |  |
| 26 | Yone | +0.40 | 0.57 | 0.17 |  |
| 27 | Kalista | +0.38 | 0.38 | 0.00 |  |
| 28 | Jinx | +0.37 | 0.37 | 0.00 |  |
| 29 | Kled | +0.34 | 0.47 | 0.13 |  |
| 30 | Camille | +0.33 | 0.52 | 0.19 |  |
| 31 | Aurora | +0.33 | 0.33 | 0.00 |  |
| 32 | K'Sante | +0.30 | 0.48 | 0.18 |  |
| 33 | Milio | +0.30 | 0.30 | 0.00 |  |
| 34 | Tristana | +0.30 | 0.30 | 0.00 |  |
| 35 | Zaahen | +0.27 | 0.49 | 0.22 |  |
| 36 | Heimerdinger | +0.27 | 0.27 | 0.00 |  |
| 37 | Xin Zhao | +0.26 | 0.60 | 0.34 |  |
| 38 | Fiora | +0.25 | 0.61 | 0.36 |  |
| 39 | Anivia | +0.25 | 0.25 | 0.00 |  |
| 40 | Annie | +0.24 | 0.24 | 0.00 |  |
| 41 | Corki | +0.24 | 0.24 | 0.00 |  |
| 42 | Evelynn | +0.23 | 0.49 | 0.26 |  |
| 43 | Brand | +0.23 | 0.23 | 0.00 |  |
| 44 | Shaco | +0.22 | 0.48 | 0.26 |  |
| 45 | Pantheon | +0.21 | 0.54 | 0.33 |  |
| 46 | Ashe | +0.21 | 0.21 | 0.00 |  |
| 47 | Kindred | +0.21 | 0.21 | 0.00 |  |
| 48 | Nilah | +0.20 | 0.49 | 0.29 |  |
| 49 | Nami | +0.20 | 0.20 | 0.00 |  |
| 50 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 51 | Jayce | +0.19 | 0.19 | 0.00 |  |
| 52 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 53 | Swain | +0.19 | 0.19 | 0.00 |  |
| 54 | Draven | +0.18 | 0.18 | 0.00 |  |
| 55 | Seraphine | +0.18 | 0.18 | 0.00 |  |
| 56 | Vayne | +0.18 | 0.18 | 0.00 |  |
| 57 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 58 | Renata Glasc | +0.17 | 0.17 | 0.00 |  |
| 59 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 60 | Syndra | +0.17 | 0.17 | 0.00 |  |
| 61 | Zoe | +0.17 | 0.17 | 0.00 |  |
| 62 | Yuumi | +0.16 | 0.68 | 0.52 |  |
| 63 | Gnar | +0.15 | 0.15 | 0.00 |  |
| 64 | Alistar | +0.14 | 0.52 | 0.38 |  |
| 65 | Thresh | +0.14 | 0.19 | 0.05 |  |
| 66 | Azir | +0.14 | 0.14 | 0.00 |  |
| 67 | Neeko | +0.14 | 0.14 | 0.00 |  |
| 68 | Orianna | +0.14 | 0.14 | 0.00 |  |
| 69 | Sona | +0.14 | 0.14 | 0.00 |  |
| 70 | Zyra | +0.14 | 0.14 | 0.00 |  |
| 71 | Jax | +0.13 | 0.51 | 0.38 | attack dodge (Counter Strike) |
| 72 | Poppy | +0.10 | 0.68 | 0.58 | dash stop (Steadfast Presence) |
| 73 | Gwen | +0.10 | 0.46 | 0.36 |  |
| 74 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 75 | Ekko | +0.08 | 0.34 | 0.26 |  |
| 76 | Ornn | +0.08 | 0.30 | 0.22 |  |
| 77 | Malphite | +0.06 | 0.44 | 0.38 |  |
| 78 | Senna | +0.06 | 0.06 | 0.00 |  |
| 79 | Zed | +0.05 | 0.31 | 0.26 |  |
| 80 | Aurelion Sol | +0.05 | 0.14 | 0.09 |  |
| 81 | Volibear | +0.04 | 0.28 | 0.24 |  |
| 82 | Master Yi | +0.03 | 0.60 | 0.57 |  |
| 83 | Warwick | +0.02 | 0.62 | 0.60 |  |
| 84 | Jarvan IV | +0.02 | 0.19 | 0.17 |  |
| 85 | Sylas | +0.02 | 0.19 | 0.17 |  |
| 86 | Urgot | 0.00 | 0.17 | 0.17 |  |
| 87 | Rakan | 0.00 | 0.14 | 0.14 |  |
| 88 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 89 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 90 | Karma | 0.00 | 0.00 | 0.00 |  |
| 91 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 92 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 93 | Lux | 0.00 | 0.00 | 0.00 |  |
| 94 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 95 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 96 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 97 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 98 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 99 | Amumu | -0.01 | 0.37 | 0.38 |  |
| 100 | Sejuani | -0.03 | 0.33 | 0.36 |  |
| 101 | Hecarim | -0.03 | 0.19 | 0.22 |  |
| 102 | Rell | -0.03 | 0.19 | 0.22 |  |
| 103 | Fizz | -0.03 | 0.14 | 0.17 |  |
| 104 | Bel'Veth | -0.04 | 0.20 | 0.24 |  |
| 105 | Briar | -0.05 | 0.14 | 0.19 |  |
| 106 | Lillia | -0.05 | 0.14 | 0.19 |  |
| 107 | Graves | -0.06 | 0.00 | 0.06 |  |
| 108 | Riven | -0.08 | 0.18 | 0.26 |  |
| 109 | Wukong | -0.08 | 0.14 | 0.22 |  |
| 110 | Vel'Koz | -0.09 | 0.19 | 0.28 |  |
| 111 | Sett | -0.10 | 0.28 | 0.38 |  |
| 112 | Aatrox | -0.11 | 0.23 | 0.34 |  |
| 113 | Qiyana | -0.11 | 0.13 | 0.24 |  |
| 114 | Varus | -0.11 | 0.00 | 0.11 |  |
| 115 | Rammus | -0.12 | 0.56 | 0.68 |  |
| 116 | Shyvana | -0.12 | 0.24 | 0.36 |  |
| 117 | Twisted Fate | -0.12 | 0.23 | 0.35 |  |
| 118 | Irelia | -0.12 | 0.19 | 0.31 |  |
| 119 | Ambessa | -0.12 | 0.14 | 0.26 |  |
| 120 | Lee Sin | -0.12 | 0.14 | 0.26 |  |
| 121 | Rengar | -0.13 | 0.64 | 0.77 |  |
| 122 | Shen | -0.13 | 0.58 | 0.71 |  |
| 123 | Leona | -0.13 | 0.25 | 0.38 |  |
| 124 | Sion | -0.15 | 0.67 | 0.82 |  |
| 125 | Singed | -0.15 | 0.62 | 0.77 | grounding (Mega Adhesive) |
| 126 | Kassadin | -0.15 | 0.21 | 0.36 |  |
| 127 | Xerath | -0.15 | 0.18 | 0.33 |  |
| 128 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 129 | Kayn | -0.16 | 0.51 | 0.67 |  |
| 130 | Caitlyn | -0.17 | 0.11 | 0.28 |  |
| 131 | Renekton | -0.18 | 0.20 | 0.38 |  |
| 132 | Taric | -0.20 | 0.52 | 0.72 |  |
| 133 | Nautilus | -0.20 | 0.14 | 0.34 |  |
| 134 | Zac | -0.21 | 0.63 | 0.84 | dash stop (Stretching Strikes) |
| 135 | Galio | -0.21 | 0.21 | 0.42 |  |
| 136 | Gangplank | -0.22 | 0.55 | 0.77 |  |
| 137 | Viego | -0.22 | 0.19 | 0.41 |  |
| 138 | Diana | -0.22 | 0.14 | 0.36 |  |
| 139 | Janna | -0.23 | 0.17 | 0.40 |  |
| 140 | Fiddlesticks | -0.24 | 0.23 | 0.47 |  |
| 141 | Pyke | -0.24 | 0.18 | 0.42 |  |
| 142 | Akali | -0.26 | 0.00 | 0.26 |  |
| 143 | Talon | -0.26 | 0.00 | 0.26 |  |
| 144 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 145 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 146 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 147 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 148 | Illaoi | -0.29 | 0.09 | 0.38 |  |
| 149 | Taliyah | -0.31 | 0.17 | 0.48 |  |
| 150 | Garen | -0.32 | 0.35 | 0.67 |  |
| 151 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 152 | Olaf | -0.35 | 0.42 | 0.77 |  |
| 153 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 154 | Vi | -0.37 | 0.32 | 0.69 |  |
| 155 | Gragas | -0.37 | 0.18 | 0.55 |  |
| 156 | Nasus | -0.38 | 0.39 | 0.77 |  |
| 157 | Mordekaiser | -0.38 | 0.29 | 0.67 |  |
| 158 | Kha'Zix | -0.38 | 0.00 | 0.38 |  |
| 159 | Locke | -0.38 | 0.00 | 0.38 |  |
| 160 | Karthus | -0.42 | 0.00 | 0.42 |  |
| 161 | Skarner | -0.48 | 0.24 | 0.72 |  |
| 162 | Yorick | -0.49 | 0.18 | 0.67 |  |
| 163 | Darius | -0.50 | 0.17 | 0.67 |  |
| 164 | Trundle | -0.50 | 0.17 | 0.67 |  |
| 165 | Blitzcrank | -0.52 | 0.25 | 0.77 |  |
| 166 | Cho'Gath | -0.54 | 0.23 | 0.77 |  |
| 167 | Tahm Kench | -0.59 | 0.25 | 0.84 |  |
| 168 | Naafiri | -0.64 | 0.00 | 0.64 |  |
| 169 | Katarina | -0.66 | 0.00 | 0.66 |  |
| 170 | Dr. Mundo | -0.77 | 0.00 | 0.77 |  |
| 171 | Rumble | -0.77 | 0.00 | 0.77 |  |
| 172 | Nunu & Willump | -0.96 | 0.30 | 1.26 |  |
