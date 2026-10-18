# Counters to Galio (patch 26.20)

Every champion ranked by what its kit does against Galio's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Galio's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Galio` for the full ledger of a matchup, with sources.

## Top 10

### 1. Rell (net +2.91)

- **0.50** interrupt: Ferromancy: Crash Down's airborne interrupts Galio's Hero's Entrance (movement channel). Ferromancy: Crash Down must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Rell W Ferromancy: Crash Down → Galio R Hero's Entrance)
- **0.50** interrupt: Ferromancy: Mount Up's airborne interrupts Galio's Hero's Entrance (movement channel). Ferromancy: Mount Up must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Rell W Ferromancy: Mount Up → Galio R Hero's Entrance)
- **0.50** interrupt: Full Tilt's stun interrupts Galio's Hero's Entrance (movement channel). Full Tilt must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Rell E Full Tilt → Galio R Hero's Entrance)

### 2. Nocturne (net +2.24)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Galio's Hero's Entrance. Spell shield for 1.5 s, long enough to use ahead of Hero's Entrance. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Galio R Hero's Entrance)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Galio's Shield of Durand. Spell shield for 1.5 s, long enough to use ahead of Shield of Durand. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Galio W Shield of Durand)
- **0.50** interrupt: Unspeakable Horror's fear interrupts Galio's Hero's Entrance (movement channel). Unspeakable Horror must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Nocturne E Unspeakable Horror → Galio R Hero's Entrance)

### 3. Alistar (net +2.23)

- **0.80** cleanse: Unbreakable Will cleanses Galio's Hero's Entrance (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Galio R Hero's Entrance)
- **0.50** interrupt: Pulverize's airborne interrupts Galio's Hero's Entrance (movement channel). Pulverize must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Alistar Q Pulverize → Galio R Hero's Entrance)
- **0.50** interrupt: Trample's stun interrupts Galio's Hero's Entrance (movement channel). Trample must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Alistar E Trample → Galio R Hero's Entrance)

### 4. Zaahen (net +2.06)

- **0.60** cc immunity: Grim Deliverance makes Zaahen immune to Galio's Hero's Entrance (airborne). Immune for ?; Hero's Entrance lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Galio R Hero's Entrance)
- **0.50** interrupt: Dreaded Return's airborne interrupts Galio's Hero's Entrance (movement channel). Dreaded Return must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Zaahen W Dreaded Return → Galio R Hero's Entrance)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Galio's Hero's Entrance (movement channel). The Darkin Glaive must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Zaahen Q The Darkin Glaive → Galio R Hero's Entrance)

### 5. Rek'Sai (net +1.94)

- **1.00** untargetable: Void Rush makes Rek'Sai untargetable, dodging Galio's Hero's Entrance. Untargetable for 1.5 s, long enough to use ahead of Hero's Entrance. (Rek'Sai R Void Rush → Galio R Hero's Entrance)
- **0.50** interrupt: Unburrow's airborne interrupts Galio's Hero's Entrance (movement channel). Unburrow must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Rek'Sai W Unburrow → Galio R Hero's Entrance)
- **0.45** untargetable: Void Rush makes Rek'Sai untargetable, dodging Galio's Justice Punch. Untargetable for 1.5 s, long enough to use ahead of Justice Punch. (Rek'Sai R Void Rush → Galio E Justice Punch)

### 6. K'Sante (net +1.92)

- **0.50** interrupt: All Out's airborne interrupts Galio's Hero's Entrance (movement channel). All Out must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (K'Sante R All Out → Galio R Hero's Entrance)
- **0.50** interrupt: Ntofo Strikes's airborne interrupts Galio's Hero's Entrance (movement channel). Ntofo Strikes must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (K'Sante Q Ntofo Strikes → Galio R Hero's Entrance)
- **0.50** interrupt: Path Maker's airborne interrupts Galio's Hero's Entrance (movement channel). Path Maker must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (K'Sante W Path Maker → Galio R Hero's Entrance)

### 7. Fizz (net +1.88)

- **0.93** untargetable: Playful makes Fizz untargetable, dodging Galio's Justice Punch. Untargetable for 0.75 s; Justice Punch takes 0.51 s to land, enough to react. (Fizz E Playful → Galio E Justice Punch)
- **0.60** untargetable: Playful makes Fizz untargetable, dodging Galio's Hero's Entrance. Untargetable for 0.75 s; Hero's Entrance lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Galio R Hero's Entrance)
- **0.50** interrupt: Chum the Waters's airborne interrupts Galio's Hero's Entrance (movement channel). Chum the Waters must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Fizz R Chum the Waters → Galio R Hero's Entrance)

### 8. Maokai (net +1.82)

- **0.82** untargetable: Twisted Advance makes Maokai untargetable, dodging Galio's Justice Punch. Untargetable for 1.4 s; Justice Punch takes 0.51 s to land, enough to react. (Maokai W Twisted Advance → Galio E Justice Punch)
- **0.60** untargetable: Twisted Advance makes Maokai untargetable, dodging Galio's Hero's Entrance. Untargetable for 1.4 s; Hero's Entrance lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Galio R Hero's Entrance)
- **0.50** interrupt: Bramble Smash's airborne interrupts Galio's Hero's Entrance (movement channel). Bramble Smash must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Maokai Q Bramble Smash → Galio R Hero's Entrance)

### 9. Udyr (net +1.75)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Galio's Hero's Entrance (airborne). Immune for 1.5 s, long enough to use ahead of Hero's Entrance. (Udyr E Blazing Stampede → Galio R Hero's Entrance)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Galio's Justice Punch (airborne). Immune for 1.5 s, long enough to use ahead of Justice Punch. (Udyr E Blazing Stampede → Galio E Justice Punch)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Galio's Shield of Durand (taunt, slow). Immune for 1.5 s, long enough to use ahead of Shield of Durand. (Udyr E Blazing Stampede → Galio W Shield of Durand)

### 10. Blitzcrank (net +1.74)

- **0.50** interrupt: Power Fist's airborne interrupts Galio's Hero's Entrance (movement channel). Power Fist must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Blitzcrank E Power Fist → Galio R Hero's Entrance)
- **0.50** interrupt: Rocket Grab's airborne interrupts Galio's Hero's Entrance (movement channel). Rocket Grab must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Blitzcrank Q Rocket Grab → Galio R Hero's Entrance)
- **0.50** interrupt: Static Field's silence interrupts Galio's Hero's Entrance (movement channel). Static Field must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Blitzcrank R Static Field → Galio R Hero's Entrance)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +2.91 | 2.91 | 0.00 |  |
| 2 | Nocturne | +2.24 | 2.24 | 0.00 |  |
| 3 | Alistar | +2.23 | 2.23 | 0.00 |  |
| 4 | Zaahen | +2.06 | 2.06 | 0.00 |  |
| 5 | Rek'Sai | +1.94 | 1.94 | 0.00 |  |
| 6 | K'Sante | +1.92 | 1.92 | 0.00 |  |
| 7 | Fizz | +1.88 | 1.88 | 0.00 |  |
| 8 | Maokai | +1.82 | 1.82 | 0.00 |  |
| 9 | Udyr | +1.75 | 1.75 | 0.00 |  |
| 10 | Blitzcrank | +1.74 | 1.74 | 0.00 |  |
| 11 | Sejuani | +1.73 | 1.73 | 0.00 |  |
| 12 | Sion | +1.66 | 2.01 | 0.35 |  |
| 13 | Kled | +1.65 | 1.65 | 0.00 |  |
| 14 | Bard | +1.63 | 1.63 | 0.00 |  |
| 15 | Morgana | +1.61 | 1.61 | 0.00 |  |
| 16 | Camille | +1.60 | 1.60 | 0.00 |  |
| 17 | Sivir | +1.60 | 1.60 | 0.00 |  |
| 18 | Lissandra | +1.57 | 1.57 | 0.00 |  |
| 19 | Braum | +1.55 | 1.55 | 0.00 | projectile block (Unbreakable) |
| 20 | Xayah | +1.55 | 1.55 | 0.00 |  |
| 21 | Evelynn | +1.47 | 1.47 | 0.00 |  |
| 22 | Yone | +1.47 | 1.47 | 0.00 |  |
| 23 | Shaco | +1.46 | 1.46 | 0.00 |  |
| 24 | Lulu | +1.45 | 1.45 | 0.00 |  |
| 25 | Yasuo | +1.44 | 1.44 | 0.00 |  |
| 26 | Ornn | +1.43 | 1.43 | 0.00 |  |
| 27 | Xin Zhao | +1.42 | 1.42 | 0.00 |  |
| 28 | Cassiopeia | +1.41 | 1.41 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 29 | Vladimir | +1.39 | 1.60 | 0.21 |  |
| 30 | Heimerdinger | +1.38 | 1.38 | 0.00 |  |
| 31 | Renata Glasc | +1.38 | 1.38 | 0.00 |  |
| 32 | Viktor | +1.38 | 1.38 | 0.00 |  |
| 33 | Kalista | +1.37 | 1.37 | 0.00 |  |
| 34 | Gnar | +1.36 | 1.36 | 0.00 |  |
| 35 | Anivia | +1.33 | 1.33 | 0.00 |  |
| 36 | Singed | +1.33 | 1.33 | 0.00 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 37 | Olaf | +1.31 | 1.31 | 0.00 |  |
| 38 | Seraphine | +1.31 | 1.31 | 0.00 |  |
| 39 | Thresh | +1.30 | 1.30 | 0.00 |  |
| 40 | Nami | +1.28 | 1.28 | 0.00 |  |
| 41 | Rengar | +1.27 | 1.27 | 0.00 |  |
| 42 | Sett | +1.25 | 1.25 | 0.00 |  |
| 43 | Fiora | +1.24 | 1.24 | 0.00 |  |
| 44 | Gangplank | +1.22 | 1.22 | 0.00 |  |
| 45 | Urgot | +1.22 | 1.22 | 0.00 |  |
| 46 | Rakan | +1.20 | 1.20 | 0.00 |  |
| 47 | Milio | +1.19 | 1.19 | 0.00 |  |
| 48 | Cho'Gath | +1.18 | 1.18 | 0.00 |  |
| 49 | Riven | +1.18 | 1.18 | 0.00 |  |
| 50 | Amumu | +1.16 | 1.16 | 0.00 |  |
| 51 | Leona | +1.13 | 1.13 | 0.00 |  |
| 52 | Vex | +1.11 | 1.11 | 0.00 |  |
| 53 | Aurora | +1.10 | 1.10 | 0.00 |  |
| 54 | Aurelion Sol | +1.06 | 1.28 | 0.22 |  |
| 55 | Malzahar | +1.03 | 2.13 | 1.10 |  |
| 56 | Gwen | +1.02 | 1.02 | 0.00 |  |
| 57 | Kayle | +0.90 | 0.90 | 0.00 |  |
| 58 | Mordekaiser | +0.89 | 0.89 | 0.00 |  |
| 59 | Volibear | +0.89 | 0.89 | 0.00 |  |
| 60 | Vayne | +0.88 | 0.88 | 0.00 |  |
| 61 | Zed | +0.87 | 0.87 | 0.00 |  |
| 62 | Nilah | +0.86 | 0.86 | 0.00 |  |
| 63 | Malphite | +0.84 | 0.84 | 0.00 |  |
| 64 | Draven | +0.83 | 0.83 | 0.00 |  |
| 65 | Elise | +0.81 | 0.81 | 0.00 |  |
| 66 | Garen | +0.81 | 0.81 | 0.00 |  |
| 67 | Sona | +0.81 | 0.81 | 0.00 |  |
| 68 | Zilean | +0.81 | 0.81 | 0.00 |  |
| 69 | Zoe | +0.81 | 0.81 | 0.00 |  |
| 70 | Hwei | +0.80 | 0.80 | 0.00 |  |
| 71 | Veigar | +0.80 | 0.80 | 0.00 |  |
| 72 | Pyke | +0.79 | 1.18 | 0.39 |  |
| 73 | Ahri | +0.79 | 0.79 | 0.00 |  |
| 74 | Ashe | +0.79 | 0.79 | 0.00 |  |
| 75 | Corki | +0.79 | 0.79 | 0.00 |  |
| 76 | Jayce | +0.78 | 0.78 | 0.00 |  |
| 77 | Kennen | +0.78 | 0.78 | 0.00 |  |
| 78 | Tristana | +0.78 | 0.78 | 0.00 |  |
| 79 | Ziggs | +0.77 | 0.77 | 0.00 |  |
| 80 | Soraka | +0.76 | 0.76 | 0.00 |  |
| 81 | Rammus | +0.75 | 1.45 | 0.70 |  |
| 82 | Annie | +0.74 | 0.74 | 0.00 |  |
| 83 | Brand | +0.74 | 0.74 | 0.00 |  |
| 84 | Syndra | +0.74 | 0.74 | 0.00 |  |
| 85 | Azir | +0.72 | 0.72 | 0.00 |  |
| 86 | Orianna | +0.72 | 0.72 | 0.00 |  |
| 87 | Swain | +0.72 | 0.72 | 0.00 |  |
| 88 | Gragas | +0.71 | 1.13 | 0.42 |  |
| 89 | Zyra | +0.71 | 0.71 | 0.00 |  |
| 90 | Viego | +0.70 | 1.25 | 0.55 |  |
| 91 | Neeko | +0.70 | 0.70 | 0.00 |  |
| 92 | Jax | +0.69 | 0.69 | 0.00 |  |
| 93 | Zac | +0.68 | 1.79 | 1.11 |  |
| 94 | Hecarim | +0.67 | 0.67 | 0.00 |  |
| 95 | Shyvana | +0.67 | 0.67 | 0.00 |  |
| 96 | Jarvan IV | +0.66 | 0.66 | 0.00 |  |
| 97 | Skarner | +0.64 | 0.64 | 0.00 |  |
| 98 | Master Yi | +0.62 | 1.14 | 0.52 |  |
| 99 | Lillia | +0.60 | 0.60 | 0.00 |  |
| 100 | Aatrox | +0.59 | 0.59 | 0.00 |  |
| 101 | Bel'Veth | +0.59 | 0.59 | 0.00 |  |
| 102 | Irelia | +0.59 | 0.59 | 0.00 |  |
| 103 | Kassadin | +0.59 | 0.59 | 0.00 |  |
| 104 | Renekton | +0.59 | 0.59 | 0.00 |  |
| 105 | Sylas | +0.59 | 0.59 | 0.00 |  |
| 106 | Taric | +0.59 | 0.59 | 0.00 |  |
| 107 | Trundle | +0.59 | 0.59 | 0.00 |  |
| 108 | Yorick | +0.59 | 0.59 | 0.00 |  |
| 109 | Darius | +0.58 | 0.58 | 0.00 |  |
| 110 | Teemo | +0.56 | 0.56 | 0.00 |  |
| 111 | Briar | +0.55 | 0.55 | 0.00 |  |
| 112 | Diana | +0.55 | 0.55 | 0.00 |  |
| 113 | Lee Sin | +0.55 | 0.55 | 0.00 |  |
| 114 | Wukong | +0.55 | 0.55 | 0.00 |  |
| 115 | Nautilus | +0.55 | 0.55 | 0.00 |  |
| 116 | Ambessa | +0.54 | 0.54 | 0.00 |  |
| 117 | Qiyana | +0.54 | 0.54 | 0.00 |  |
| 118 | Taliyah | +0.50 | 1.89 | 1.39 |  |
| 119 | Tahm Kench | +0.49 | 1.73 | 1.24 |  |
| 120 | Yuumi | +0.47 | 1.61 | 1.14 |  |
| 121 | Samira | +0.46 | 0.46 | 0.00 |  |
| 122 | Mel | +0.43 | 0.43 | 0.00 |  |
| 123 | Poppy | +0.41 | 0.98 | 0.57 |  |
| 124 | Jinx | +0.39 | 0.39 | 0.00 |  |
| 125 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 126 | Quinn | +0.32 | 0.83 | 0.51 |  |
| 127 | Illaoi | +0.30 | 0.30 | 0.00 |  |
| 128 | Kindred | +0.29 | 0.29 | 0.00 |  |
| 129 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 130 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 131 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 132 | Vi | +0.25 | 1.25 | 1.00 |  |
| 133 | Kayn | +0.24 | 1.47 | 1.23 |  |
| 134 | Janna | +0.24 | 1.37 | 1.13 |  |
| 135 | Kai'Sa | +0.24 | 0.24 | 0.00 |  |
| 136 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 137 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 138 | Senna | +0.22 | 0.22 | 0.00 |  |
| 139 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 140 | Lux | +0.19 | 0.19 | 0.00 |  |
| 141 | Nidalee | +0.19 | 0.19 | 0.00 |  |
| 142 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 143 | Graves | +0.15 | 0.15 | 0.00 |  |
| 144 | Warwick | +0.14 | 1.89 | 1.75 |  |
| 145 | Karma | +0.14 | 0.14 | 0.00 |  |
| 146 | LeBlanc | +0.14 | 0.14 | 0.00 |  |
| 147 | Fiddlesticks | +0.09 | 1.30 | 1.21 |  |
| 148 | Vel'Koz | 0.00 | 0.76 | 0.76 |  |
| 149 | Akali | 0.00 | 0.00 | 0.00 |  |
| 150 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 151 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 152 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 153 | Locke | 0.00 | 0.00 | 0.00 |  |
| 154 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 155 | Talon | 0.00 | 0.00 | 0.00 |  |
| 156 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 157 | Varus | -0.08 | 0.18 | 0.26 |  |
| 158 | Xerath | -0.14 | 0.76 | 0.90 |  |
| 159 | Twisted Fate | -0.15 | 0.86 | 1.01 |  |
| 160 | Ivern | -0.22 | 0.12 | 0.34 |  |
| 161 | Shen | -0.49 | 0.86 | 1.35 |  |
| 162 | Caitlyn | -0.54 | 0.24 | 0.78 |  |
| 163 | Akshan | -0.54 | 0.21 | 0.75 |  |
| 164 | Lucian | -0.56 | 0.22 | 0.78 |  |
| 165 | Miss Fortune | -0.57 | 0.22 | 0.79 |  |
| 166 | Jhin | -0.60 | 0.18 | 0.78 |  |
| 167 | Nunu & Willump | -0.64 | 0.64 | 1.28 |  |
| 168 | Karthus | -0.72 | 0.12 | 0.84 |  |
| 169 | Katarina | -0.72 | 0.00 | 0.72 |  |
| 170 | Pantheon | -0.73 | 0.74 | 1.47 |  |
| 171 | Ryze | -0.89 | 0.16 | 1.05 |  |
| 172 | Naafiri | -1.23 | 0.00 | 1.23 |  |
