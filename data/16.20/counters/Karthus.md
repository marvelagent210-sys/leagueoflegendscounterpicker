# Counters to Karthus (patch 26.20)

## Simulated duels

The duel simulator played each of the 75 other champions with a simulator kit against Karthus: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Karthus wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Karthus --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Skarner | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 2 | Master Yi | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 3 | Gwen | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 4 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 5 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 6 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 7 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 8 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 9 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 10 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 11 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 12 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 13 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 14 | Irelia | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 15 | Pantheon | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 16 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 17 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 18 | Xin Zhao | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 19 | Yone | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 20 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 21 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 22 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 23 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 24 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 25 | Heimerdinger | +0.79 | +0.97 | +0.97 | +1.00 | +0.04 | +1.00 | +0.00 |
| 26 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 27 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 28 | Sion | +0.79 | +0.99 | +0.99 | +1.00 | −0.04 | +1.00 | +0.00 |
| 29 | Fiora | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 30 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 31 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 32 | Wukong | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 33 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 34 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 35 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 36 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 37 | Quinn | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 38 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 39 | Gnar | +0.75 | +1.00 | +1.00 | +1.00 | +0.02 | +0.51 | +0.00 |
| 40 | Kennen | +0.73 | +1.00 | +1.00 | +1.00 | +0.07 | +0.21 | +0.00 |
| 41 | Aurora | +0.71 | +1.00 | +1.00 | +0.58 | −0.05 | +1.00 | +0.00 |
| 42 | Volibear | +0.66 | +0.87 | +1.00 | +0.87 | −0.06 | +0.32 | +0.00 |
| 43 | Rammus | +0.63 | +1.00 | +1.00 | +0.15 | −0.01 | +1.00 | +0.00 |
| 44 | Urgot | +0.61 | +0.18 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 45 | Riven | +0.53 | +1.00 | +0.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 46 | Akali | +0.53 | +0.45 | +0.67 | +1.00 | −0.06 | +0.62 | +0.00 |
| 47 | Amumu | +0.53 | +0.00 | +0.97 | +1.00 | −0.05 | +0.95 | +0.00 |
| 48 | Ziggs | +0.52 | +0.13 | +1.00 | +1.00 | +0.16 | +0.14 | +0.00 |
| 49 | Poppy | +0.49 | +0.65 | +0.31 | +1.00 | +0.11 | +0.32 | +0.00 |
| 50 | Olaf | +0.43 | +0.00 | +1.00 | +1.00 | −0.11 | +0.00 | +0.00 |
| 51 | Ashe | +0.35 | +0.00 | +1.00 | +0.00 | −0.01 | +1.00 | +0.00 |
| 52 | Vel'Koz | +0.35 | +0.15 | +0.22 | +1.00 | +0.14 | – | +0.00 |
| 53 | Gragas | +0.29 | +0.31 | +0.37 | +0.37 | +0.05 | +0.40 | +0.00 |
| 54 | Nautilus | +0.25 | +0.33 | +0.30 | +0.31 | +0.04 | +0.25 | +0.00 |
| 55 | Ornn | +0.22 | +0.27 | +0.29 | +0.27 | −0.04 | +0.27 | +0.00 |
| 56 | Singed | +0.22 | +0.24 | +0.32 | +0.27 | −0.04 | +0.26 | +0.00 |
| 57 | Malphite | +0.21 | +0.27 | +0.29 | +0.25 | −0.05 | +0.27 | +0.00 |
| 58 | Illaoi | +0.20 | +0.15 | +0.14 | +0.15 | −0.02 | +0.99 | +0.00 |
| 59 | Shen | +0.20 | +0.22 | +0.21 | +0.29 | +0.03 | +0.28 | +0.00 |
| 60 | Leona | +0.20 | +0.20 | +0.24 | +0.29 | +0.01 | +0.29 | +0.00 |
| 61 | Annie | +0.18 | +0.16 | +0.23 | +0.25 | +0.06 | +0.24 | +0.00 |
| 62 | Morgana | +0.18 | +0.00 | +0.11 | +0.62 | +0.06 | – | +0.00 |
| 63 | Brand | +0.17 | +0.21 | +0.19 | +0.23 | +0.00 | +0.23 | +0.00 |
| 64 | Tahm Kench | +0.17 | +0.00 | +0.30 | +0.29 | +0.03 | +0.29 | +0.00 |
| 65 | Lux | +0.15 | +0.15 | +0.20 | +0.24 | +0.02 | +0.15 | +0.00 |
| 66 | Sett | +0.15 | +0.19 | +0.21 | +0.20 | −0.08 | +0.20 | +0.00 |
| 67 | Cassiopeia | +0.13 | +0.12 | +0.17 | +0.23 | +0.02 | +0.13 | +0.00 |
| 68 | Lissandra | +0.08 | +0.11 | +0.10 | +0.15 | −0.09 | +0.16 | +0.00 |
| 69 | Ahri | +0.07 | +0.15 | +0.06 | +0.09 | −0.08 | +0.06 | +0.00 |
| 70 | Anivia | +0.06 | +0.13 | +0.12 | +0.09 | −0.10 | −0.02 | +0.00 |
| 71 | Veigar | +0.03 | +0.06 | +0.05 | +0.00 | +0.01 | +0.05 | +0.00 |
| 72 | Vladimir | −0.01 | −0.04 | +0.02 | +0.05 | −0.08 | – | +0.00 |
| 73 | Ambessa | −0.01 | +0.00 | +0.00 | +0.00 | −0.06 | +0.00 | +0.00 |
| 74 | Zyra | −0.02 | −0.02 | −0.03 | +0.04 | −0.05 | −0.05 | +0.00 |
| 75 | Malzahar | −0.02 | −0.03 | −0.05 | −0.01 | +0.00 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Karthus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Karthus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Karthus` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.29)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Karthus's Requiem (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Karthus R Requiem)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Karthus's Requiem (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Karthus R Requiem)
- **0.28** interrupt: Full Tilt's stun interrupts Karthus's Requiem (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 275 units farther than Rell's (450 vs 175 attack range).

#### 2. Taliyah (net +0.94)

- **0.28** interrupt: Seismic Shove's airborne interrupts Karthus's Requiem (normal channel). Seismic Shove must land during the channel. (Taliyah W Seismic Shove → Karthus R Requiem)
- **0.28** interrupt: Unraveled Earth's stun interrupts Karthus's Requiem (normal channel). Unraveled Earth must land during the channel. (Taliyah E Unraveled Earth → Karthus R Requiem)
- **0.28** interrupt: Weaver's Wall's airborne interrupts Karthus's Requiem (normal channel). Weaver's Wall must land during the channel. (Taliyah R Weaver's Wall → Karthus R Requiem)

#### 3. Camille (net +0.87)

- **0.55** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Karthus's Requiem. Untargetable for 0.5 s; Requiem takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Karthus R Requiem)
- **0.28** interrupt: The Hextech Ultimatum's airborne interrupts Karthus's Requiem (normal channel). The Hextech Ultimatum must land during the channel. (Camille R The Hextech Ultimatum → Karthus R Requiem)
- **0.28** interrupt: Wall Dive's airborne interrupts Karthus's Requiem (normal channel). Wall Dive must land during the channel. (Camille E Wall Dive → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 325 units farther than Camille's (450 vs 125 attack range).

#### 4. Kayle (net +0.87)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Karthus's Requiem. Invulnerable for 2.5 s, long enough to use ahead of Requiem. (Kayle R Divine Judgment → Karthus R Requiem)
- **0.32** range: Kayle's basic attacks reach 175 units farther than Karthus's (625 vs 450 attack range). Karthus has no dash or blink to close the gap. (Kayle basic attacks → Karthus basic attacks)

#### 5. Lulu (net +0.85)

- **0.28** interrupt: Whimsy's polymorph interrupts Karthus's Requiem (normal channel). Whimsy must land during the channel. (Lulu W Whimsy → Karthus R Requiem)
- **0.28** interrupt: Wild Growth's airborne interrupts Karthus's Requiem (normal channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Karthus R Requiem)
- **0.22** disarm: Whimsy disarms Karthus for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Karthus basic attacks)

#### 6. Xin Zhao (net +0.81)

- **0.55** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Karthus's Requiem. Invulnerable for 4 s, long enough to use ahead of Requiem. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Karthus R Requiem)
- **0.28** interrupt: Crescent Guard's airborne interrupts Karthus's Requiem (normal channel). Crescent Guard must land during the channel. (Xin Zhao R Crescent Guard → Karthus R Requiem)
- **0.28** interrupt: Three Talon Strike's airborne interrupts Karthus's Requiem (normal channel). Three Talon Strike must land during the channel. (Xin Zhao Q Three Talon Strike → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 275 units farther than Xin Zhao's (450 vs 175 attack range).

#### 7. Lissandra (net +0.80)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Karthus's Requiem. Untargetable for 2.5 s, long enough to use ahead of Requiem. (Lissandra R Frozen Tomb → Karthus R Requiem)
- **0.28** interrupt: Frozen Tomb's stun interrupts Karthus's Requiem (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Karthus R Requiem)
- **0.11** range: Lissandra's basic attacks reach 100 units farther than Karthus's (550 vs 450 attack range). Karthus has no dash or blink to close the gap. (Lissandra basic attacks → Karthus basic attacks)

#### 8. K'Sante (net +0.75)

- **0.28** interrupt: All Out's airborne interrupts Karthus's Requiem (normal channel). All Out must land during the channel. (K'Sante R All Out → Karthus R Requiem)
- **0.28** interrupt: Ntofo Strikes's airborne interrupts Karthus's Requiem (normal channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Karthus R Requiem)
- **0.28** interrupt: Path Maker's airborne interrupts Karthus's Requiem (normal channel). Path Maker must land during the channel. (K'Sante W Path Maker → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 300 units farther than K'Sante's (450 vs 150 attack range).

#### 9. Fizz (net +0.75)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Karthus's Requiem. Untargetable for 0.75 s; Requiem takes 0.25 s to land, enough to react. (Fizz E Playful → Karthus R Requiem)
- **0.28** interrupt: Chum the Waters's airborne interrupts Karthus's Requiem (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 275 units farther than Fizz's (450 vs 175 attack range).

#### 10. Renata Glasc (net +0.75)

- **0.28** interrupt: Handshake's airborne interrupts Karthus's Requiem (normal channel). Handshake must land during the channel. (Renata Glasc Q Handshake → Karthus R Requiem)
- **0.28** interrupt: Hostile Takeover's berserk interrupts Karthus's Requiem (normal channel). Hostile Takeover must land during the channel. (Renata Glasc R Hostile Takeover → Karthus R Requiem)
- **0.19** range: Renata Glasc's basic attacks reach 100 units farther than Karthus's (550 vs 450 attack range). Karthus has no dash or blink to close the gap. (Renata Glasc basic attacks → Karthus basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.29 | 1.40 | 0.11 |  |
| 2 | Taliyah | +0.94 | 0.94 | 0.00 |  |
| 3 | Camille | +0.87 | 0.97 | 0.10 |  |
| 4 | Kayle | +0.87 | 0.87 | 0.00 |  |
| 5 | Lulu | +0.85 | 0.85 | 0.00 |  |
| 6 | Xin Zhao | +0.81 | 0.97 | 0.16 |  |
| 7 | Lissandra | +0.80 | 0.80 | 0.00 |  |
| 8 | K'Sante | +0.75 | 0.84 | 0.09 |  |
| 9 | Fizz | +0.75 | 0.83 | 0.08 |  |
| 10 | Renata Glasc | +0.75 | 0.75 | 0.00 |  |
| 11 | Anivia | +0.74 | 0.74 | 0.00 |  |
| 12 | Janna | +0.74 | 0.74 | 0.00 |  |
| 13 | Tristana | +0.73 | 0.73 | 0.00 |  |
| 14 | Galio | +0.72 | 0.84 | 0.12 |  |
| 15 | Kayn | +0.72 | 0.83 | 0.11 |  |
| 16 | Rek'Sai | +0.72 | 0.83 | 0.11 |  |
| 17 | Yasuo | +0.71 | 0.82 | 0.11 |  |
| 18 | Heimerdinger | +0.71 | 0.71 | 0.00 |  |
| 19 | Braum | +0.70 | 0.89 | 0.19 |  |
| 20 | Evelynn | +0.70 | 0.83 | 0.13 |  |
| 21 | Shaco | +0.70 | 0.83 | 0.13 |  |
| 22 | Aurora | +0.69 | 0.69 | 0.00 |  |
| 23 | Bard | +0.69 | 0.69 | 0.00 |  |
| 24 | Xayah | +0.69 | 0.69 | 0.00 |  |
| 25 | Tahm Kench | +0.68 | 0.84 | 0.16 |  |
| 26 | Zac | +0.68 | 0.84 | 0.16 |  |
| 27 | Viktor | +0.68 | 0.68 | 0.00 |  |
| 28 | Aurelion Sol | +0.67 | 0.67 | 0.00 |  |
| 29 | Nami | +0.67 | 0.67 | 0.00 |  |
| 30 | Seraphine | +0.67 | 0.67 | 0.00 |  |
| 31 | Sejuani | +0.66 | 0.84 | 0.18 |  |
| 32 | Maokai | +0.64 | 0.83 | 0.19 |  |
| 33 | Nocturne | +0.64 | 0.83 | 0.19 |  |
| 34 | Malzahar | +0.62 | 0.62 | 0.00 |  |
| 35 | Rammus | +0.61 | 0.80 | 0.19 |  |
| 36 | Fiddlesticks | +0.56 | 0.56 | 0.00 |  |
| 37 | Gnar | +0.56 | 0.56 | 0.00 |  |
| 38 | Thresh | +0.56 | 0.56 | 0.00 |  |
| 39 | Ashe | +0.55 | 0.55 | 0.00 |  |
| 40 | Sivir | +0.55 | 0.55 | 0.00 |  |
| 41 | Vladimir | +0.55 | 0.55 | 0.00 |  |
| 42 | Yuumi | +0.55 | 0.55 | 0.00 |  |
| 43 | Kled | +0.53 | 0.59 | 0.06 |  |
| 44 | Zaahen | +0.51 | 0.62 | 0.11 |  |
| 45 | Rakan | +0.50 | 0.56 | 0.06 |  |
| 46 | Urgot | +0.50 | 0.56 | 0.06 |  |
| 47 | Viego | +0.49 | 0.56 | 0.07 |  |
| 48 | Sona | +0.49 | 0.49 | 0.00 |  |
| 49 | Vayne | +0.49 | 0.49 | 0.00 |  |
| 50 | Yone | +0.48 | 0.56 | 0.08 |  |
| 51 | Milio | +0.48 | 0.48 | 0.00 |  |
| 52 | Master Yi | +0.47 | 0.63 | 0.16 |  |
| 53 | Annie | +0.47 | 0.47 | 0.00 |  |
| 54 | Warwick | +0.46 | 0.59 | 0.13 |  |
| 55 | Draven | +0.46 | 0.46 | 0.00 |  |
| 56 | Blitzcrank | +0.45 | 0.84 | 0.39 |  |
| 57 | Ornn | +0.45 | 0.56 | 0.11 |  |
| 58 | Pyke | +0.44 | 0.56 | 0.12 |  |
| 59 | Pantheon | +0.44 | 0.55 | 0.11 |  |
| 60 | Elise | +0.44 | 0.44 | 0.00 |  |
| 61 | Twisted Fate | +0.44 | 0.44 | 0.00 |  |
| 62 | Zilean | +0.44 | 0.44 | 0.00 |  |
| 63 | Zoe | +0.44 | 0.44 | 0.00 |  |
| 64 | Riven | +0.43 | 0.56 | 0.13 |  |
| 65 | Vi | +0.43 | 0.56 | 0.13 |  |
| 66 | Corki | +0.43 | 0.43 | 0.00 |  |
| 67 | Zyra | +0.43 | 0.43 | 0.00 |  |
| 68 | Alistar | +0.42 | 0.61 | 0.19 |  |
| 69 | Zed | +0.42 | 0.55 | 0.13 |  |
| 70 | Kalista | +0.42 | 0.42 | 0.00 |  |
| 71 | Kennen | +0.42 | 0.42 | 0.00 |  |
| 72 | Quinn | +0.42 | 0.42 | 0.00 |  |
| 73 | Soraka | +0.41 | 0.41 | 0.00 |  |
| 74 | Vex | +0.41 | 0.41 | 0.00 |  |
| 75 | Ziggs | +0.41 | 0.41 | 0.00 |  |
| 76 | Fiora | +0.40 | 0.58 | 0.18 |  |
| 77 | Veigar | +0.40 | 0.40 | 0.00 |  |
| 78 | Shen | +0.39 | 0.52 | 0.13 |  |
| 79 | Ahri | +0.39 | 0.39 | 0.00 |  |
| 80 | Brand | +0.39 | 0.39 | 0.00 |  |
| 81 | Cassiopeia | +0.39 | 0.39 | 0.00 |  |
| 82 | Hwei | +0.39 | 0.39 | 0.00 |  |
| 83 | Neeko | +0.39 | 0.39 | 0.00 |  |
| 84 | Syndra | +0.39 | 0.39 | 0.00 |  |
| 85 | Azir | +0.38 | 0.38 | 0.00 |  |
| 86 | Orianna | +0.38 | 0.38 | 0.00 |  |
| 87 | Vel'Koz | +0.38 | 0.38 | 0.00 |  |
| 88 | Xerath | +0.38 | 0.38 | 0.00 |  |
| 89 | Amumu | +0.37 | 0.56 | 0.19 |  |
| 90 | Gragas | +0.37 | 0.56 | 0.19 |  |
| 91 | Leona | +0.37 | 0.56 | 0.19 |  |
| 92 | Sett | +0.37 | 0.56 | 0.19 |  |
| 93 | Gwen | +0.37 | 0.55 | 0.18 |  |
| 94 | Nilah | +0.37 | 0.50 | 0.13 |  |
| 95 | Caitlyn | +0.36 | 0.36 | 0.00 |  |
| 96 | Swain | +0.36 | 0.36 | 0.00 |  |
| 97 | Mel | +0.33 | 0.33 | 0.00 |  |
| 98 | Teemo | +0.31 | 0.31 | 0.00 |  |
| 99 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 100 | Sion | +0.26 | 0.59 | 0.33 |  |
| 101 | Malphite | +0.25 | 0.44 | 0.19 |  |
| 102 | Aphelios | +0.24 | 0.24 | 0.00 |  |
| 103 | Senna | +0.24 | 0.24 | 0.00 |  |
| 104 | Jax | +0.22 | 0.41 | 0.19 |  |
| 105 | Yunara | +0.22 | 0.22 | 0.00 |  |
| 106 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 107 | Lillia | +0.21 | 0.28 | 0.07 |  |
| 108 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 109 | Jarvan IV | +0.20 | 0.28 | 0.08 |  |
| 110 | Sylas | +0.20 | 0.28 | 0.08 |  |
| 111 | Samira | +0.20 | 0.20 | 0.00 |  |
| 112 | Briar | +0.18 | 0.28 | 0.10 |  |
| 113 | Cho'Gath | +0.17 | 0.56 | 0.39 |  |
| 114 | Hecarim | +0.17 | 0.28 | 0.11 |  |
| 115 | Wukong | +0.17 | 0.28 | 0.11 |  |
| 116 | Varus | +0.17 | 0.17 | 0.00 |  |
| 117 | Bel'Veth | +0.16 | 0.28 | 0.12 |  |
| 118 | Qiyana | +0.16 | 0.28 | 0.12 |  |
| 119 | Volibear | +0.16 | 0.28 | 0.12 |  |
| 120 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 121 | Miss Fortune | +0.16 | 0.16 | 0.00 |  |
| 122 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 123 | Udyr | +0.15 | 0.34 | 0.19 |  |
| 124 | Ambessa | +0.15 | 0.28 | 0.13 |  |
| 125 | Lee Sin | +0.15 | 0.28 | 0.13 |  |
| 126 | Kai'Sa | +0.14 | 0.14 | 0.00 |  |
| 127 | Lux | +0.14 | 0.14 | 0.00 |  |
| 128 | Irelia | +0.13 | 0.28 | 0.15 |  |
| 129 | Jhin | +0.13 | 0.13 | 0.00 |  |
| 130 | Aatrox | +0.12 | 0.28 | 0.16 |  |
| 131 | Nautilus | +0.12 | 0.28 | 0.16 |  |
| 132 | Ryze | +0.12 | 0.12 | 0.00 |  |
| 133 | Jinx | +0.11 | 0.11 | 0.00 |  |
| 134 | Morgana | +0.11 | 0.11 | 0.00 |  |
| 135 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 136 | Diana | +0.10 | 0.28 | 0.18 |  |
| 137 | Kassadin | +0.10 | 0.28 | 0.18 |  |
| 138 | Shyvana | +0.10 | 0.28 | 0.18 |  |
| 139 | Poppy | +0.09 | 0.28 | 0.19 |  |
| 140 | Renekton | +0.09 | 0.28 | 0.19 |  |
| 141 | Karma | +0.08 | 0.08 | 0.00 |  |
| 142 | LeBlanc | +0.08 | 0.08 | 0.00 |  |
| 143 | Garen | +0.03 | 0.36 | 0.33 |  |
| 144 | Mordekaiser | +0.01 | 0.34 | 0.33 |  |
| 145 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 146 | Graves | 0.00 | 0.00 | 0.00 |  |
| 147 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 148 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 149 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 150 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 151 | Skarner | -0.02 | 0.34 | 0.36 |  |
| 152 | Nunu & Willump | -0.04 | 0.35 | 0.39 |  |
| 153 | Darius | -0.05 | 0.28 | 0.33 |  |
| 154 | Trundle | -0.05 | 0.28 | 0.33 |  |
| 155 | Yorick | -0.05 | 0.28 | 0.33 |  |
| 156 | Taric | -0.08 | 0.28 | 0.36 |  |
| 157 | Naafiri | -0.10 | 0.00 | 0.10 |  |
| 158 | Singed | -0.11 | 0.28 | 0.39 |  |
| 159 | Akali | -0.13 | 0.00 | 0.13 |  |
| 160 | Ekko | -0.13 | 0.00 | 0.13 |  |
| 161 | Talon | -0.13 | 0.00 | 0.13 |  |
| 162 | Nasus | -0.15 | 0.24 | 0.39 |  |
| 163 | Tryndamere | -0.16 | 0.00 | 0.16 |  |
| 164 | Illaoi | -0.19 | 0.00 | 0.19 |  |
| 165 | Katarina | -0.19 | 0.00 | 0.19 |  |
| 166 | Kha'Zix | -0.19 | 0.00 | 0.19 |  |
| 167 | Locke | -0.19 | 0.00 | 0.19 |  |
| 168 | Gangplank | -0.30 | 0.09 | 0.39 |  |
| 169 | Rengar | -0.30 | 0.09 | 0.39 |  |
| 170 | Olaf | -0.33 | 0.06 | 0.39 |  |
| 171 | Dr. Mundo | -0.39 | 0.00 | 0.39 |  |
| 172 | Rumble | -0.39 | 0.00 | 0.39 |  |
