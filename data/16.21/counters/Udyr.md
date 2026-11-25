# Counters to Udyr (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Udyr: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Udyr wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Udyr --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.10 |
| 2 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.26 | – | −0.34 |
| 3 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | −0.97 |
| 4 | Twisted Fate | +0.78 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.62 |
| 5 | Vayne | +0.78 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | −0.79 |
| 6 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.22 | – | −0.71 |
| 7 | Taric | +0.77 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.22 |
| 8 | Fiora | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.02 |
| 9 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.09 |
| 10 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.96 |
| 11 | K'Sante | +0.76 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.83 |
| 12 | Nasus | +0.75 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.38 |
| 13 | Olaf | +0.75 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.50 |
| 14 | Trundle | +0.74 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.32 |
| 15 | Aatrox | +0.74 | +1.00 | +1.00 | +1.00 | +0.09 | – | −0.94 |
| 16 | Darius | +0.73 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.76 |
| 17 | Shyvana | +0.67 | +1.00 | +0.89 | +0.73 | +0.20 | – | −0.91 |
| 18 | Lulu | +0.60 | +1.00 | +1.00 | +1.00 | +0.07 | −1.00 | −0.23 |
| 19 | Warwick | +0.60 | +1.00 | +1.00 | +1.00 | +0.03 | −1.00 | −0.09 |
| 20 | Gnar | +0.59 | +1.00 | +0.73 | +0.39 | +0.14 | +1.00 | −0.79 |
| 21 | Kalista | +0.53 | +0.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.92 |
| 22 | Zaahen | +0.49 | +0.17 | +1.00 | +1.00 | −0.05 | – | −0.83 |
| 23 | Dr. Mundo | +0.43 | +0.30 | +0.57 | +0.93 | −0.04 | – | −0.27 |
| 24 | Illaoi | +0.40 | +0.26 | +0.63 | +0.91 | −0.16 | – | −0.44 |
| 25 | Jayce | +0.39 | +1.00 | +1.00 | −1.00 | +0.22 | +1.00 | −0.85 |
| 26 | Teemo | +0.30 | +1.00 | −1.00 | +1.00 | +0.11 | +1.00 | −0.30 |
| 27 | Garen | +0.29 | +1.00 | +1.00 | −1.00 | +0.02 | – | −0.86 |
| 28 | Bel'Veth | +0.27 | +1.00 | +1.00 | −1.00 | −0.12 | – | −0.76 |
| 29 | Tryndamere | +0.20 | +1.00 | −1.00 | +1.00 | +0.07 | – | −0.54 |
| 30 | Yone | +0.20 | +1.00 | −0.92 | +1.00 | +0.01 | – | −0.80 |
| 31 | Gangplank | +0.19 | −1.00 | +1.00 | +1.00 | +0.06 | – | −0.69 |
| 32 | Renekton | +0.19 | +1.00 | −1.00 | +1.00 | +0.00 | – | −0.61 |
| 33 | Yasuo | +0.19 | −1.00 | +1.00 | +0.90 | −0.05 | – | −0.07 |
| 34 | Ashe | +0.08 | +0.94 | −1.00 | +0.00 | +0.13 | +0.78 | −0.11 |
| 35 | Elise | +0.00 | +0.69 | −1.00 | +1.00 | +0.10 | −1.00 | −0.70 |
| 36 | Mordekaiser | +0.00 | −0.32 | +0.14 | +0.16 | +0.14 | +0.00 | −0.14 |
| 37 | Corki | −0.10 | −1.00 | +1.00 | −1.00 | +0.31 | +1.00 | −0.94 |
| 38 | Aphelios | −0.14 | +1.00 | −1.00 | −1.00 | +0.08 | +1.00 | −1.00 |
| 39 | Karma | −0.14 | +0.82 | −0.83 | −1.00 | +0.10 | +0.73 | −0.58 |
| 40 | Gwen | −0.23 | +1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 41 | Kayle | −0.23 | +0.56 | −1.00 | −1.00 | +0.40 | +0.58 | −0.87 |
| 42 | Vi | −0.26 | −1.00 | +1.00 | −1.00 | +0.06 | – | −0.87 |
| 43 | Camille | −0.28 | +1.00 | −1.00 | −1.00 | +0.01 | – | −0.97 |
| 44 | Annie | −0.28 | +1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.06 |
| 45 | Anivia | −0.34 | −0.28 | −1.00 | −0.03 | −0.20 | +0.05 | +0.21 |
| 46 | Viego | −0.37 | +0.65 | −1.00 | −1.00 | −0.08 | – | −0.76 |
| 47 | Heimerdinger | −0.43 | −1.00 | −1.00 | +0.89 | +0.17 | −1.00 | −0.74 |
| 48 | Ezreal | −0.43 | −0.97 | −0.86 | +0.47 | +0.06 | −0.45 | −0.67 |
| 49 | Zac | −0.46 | −0.37 | −0.66 | −0.79 | −0.00 | – | −0.00 |
| 50 | Irelia | −0.56 | −1.00 | −0.85 | −0.85 | +0.14 | +1.00 | −0.96 |
| 51 | Hwei | −0.62 | −1.00 | −1.00 | −0.11 | +0.06 | −1.00 | −0.18 |
| 52 | Volibear | −0.64 | −0.78 | −0.74 | −0.78 | +0.05 | – | −1.00 |
| 53 | Vel'Koz | −0.65 | −1.00 | −1.00 | −1.00 | +0.23 | +0.52 | −0.69 |
| 54 | Braum | −0.69 | −0.92 | −0.99 | −0.43 | −0.02 | −0.96 | −0.55 |
| 55 | Kennen | −0.71 | −1.00 | −1.00 | −1.00 | +0.17 | −0.31 | −0.01 |
| 56 | Sion | −0.74 | −0.93 | −0.95 | −1.00 | +0.05 | – | +0.02 |
| 57 | Jarvan IV | −0.74 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.48 |
| 58 | Brand | −0.74 | −1.00 | −1.00 | −1.00 | +0.10 | −0.07 | −1.00 |
| 59 | Rengar | −0.75 | −1.00 | −1.00 | −1.00 | +0.24 | – | −0.23 |
| 60 | Aurelion Sol | −0.75 | −1.00 | −1.00 | −1.00 | +0.33 | −1.00 | +0.00 |
| 61 | Yunara | −0.75 | −1.00 | −1.00 | −1.00 | +0.11 | −0.24 | −0.94 |
| 62 | Tahm Kench | −0.75 | −0.70 | −1.00 | −1.00 | −0.08 | −0.96 | −0.40 |
| 63 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.30 |
| 64 | Riven | −0.77 | −1.00 | −1.00 | −1.00 | +0.24 | – | −0.51 |
| 65 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.27 | −1.00 | −0.18 |
| 66 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.00 |
| 67 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.01 |
| 68 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.48 |
| 69 | Nocturne | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.06 |
| 70 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.35 |
| 71 | Xin Zhao | −0.79 | −0.82 | −1.00 | −1.00 | −0.13 | – | −0.62 |
| 72 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.05 |
| 73 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.14 |
| 74 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.23 |
| 75 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.01 |
| 76 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.14 |
| 77 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.07 |
| 78 | Sylas | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.47 |
| 79 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.07 |
| 80 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.10 |
| 81 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.06 |
| 82 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.03 |
| 83 | Neeko | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.19 |
| 84 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.35 |
| 85 | Singed | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.15 |
| 86 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.74 |
| 87 | Wukong | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.75 |
| 88 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.38 |
| 89 | Rakan | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.17 |
| 90 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.17 |
| 91 | Janna | −0.81 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.72 |
| 92 | Diana | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.52 |
| 93 | Master Yi | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.09 |
| 94 | Rell | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.55 |
| 95 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.20 |
| 96 | Syndra | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.59 |
| 97 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.35 |
| 98 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.35 |
| 99 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.55 |
| 100 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −0.93 |
| 101 | Senna | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.48 |
| 102 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.96 |
| 103 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.43 |
| 104 | Gragas | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.31 |
| 105 | Maokai | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.69 |
| 106 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.72 |
| 107 | Lux | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.54 |
| 108 | Nilah | −0.82 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.76 |
| 109 | Varus | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.30 |
| 110 | Smolder | −0.82 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −1.00 |
| 111 | Lee Sin | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.81 |
| 112 | Lissandra | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.07 |
| 113 | Orianna | −0.82 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.81 |
| 114 | Rumble | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.94 |
| 115 | Ornn | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.50 |
| 116 | Viktor | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.45 |
| 117 | Jhin | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.82 |
| 118 | Zeri | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.91 |
| 119 | Milio | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.91 |
| 120 | Amumu | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.44 |
| 121 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.48 |
| 122 | Shen | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.49 |
| 123 | Ryze | −0.82 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.80 |
| 124 | Soraka | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.55 |
| 125 | Kled | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.52 |
| 126 | Mel | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.69 |
| 127 | Nunu & Willump | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.98 |
| 128 | Kayn | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.68 |
| 129 | Lucian | −0.82 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.94 |
| 130 | Xerath | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.52 |
| 131 | Miss Fortune | −0.83 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.84 |
| 132 | Jinx | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.71 |
| 133 | Lillia | −0.83 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.27 |
| 134 | Galio | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.74 |
| 135 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.89 |
| 136 | Malzahar | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.70 |
| 137 | Twitch | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.85 |
| 138 | Fizz | −0.83 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.92 |
| 139 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.66 |
| 140 | Zoe | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.89 |
| 141 | Swain | −0.83 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.85 |
| 142 | Naafiri | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.93 |
| 143 | Draven | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.79 |
| 144 | Akshan | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.96 |
| 145 | Shaco | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.47 |
| 146 | Leona | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.44 |
| 147 | Quinn | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.99 |
| 148 | Xayah | −0.84 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.99 |
| 149 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.86 |
| 150 | Nami | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.67 |
| 151 | Graves | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.94 |
| 152 | Sona | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.93 |
| 153 | Ekko | −0.84 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.79 |
| 154 | Kindred | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.93 |
| 155 | Evelynn | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −1.00 |
| 156 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.70 |
| 157 | Fiddlesticks | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.99 |
| 158 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.98 |
| 159 | Kai'Sa | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 160 | Locke | −0.84 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.53 |
| 161 | LeBlanc | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 162 | Zed | −0.84 | −1.00 | −1.00 | −1.00 | −0.19 | – | −0.62 |
| 163 | Briar | −0.84 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.93 |
| 164 | Nidalee | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 165 | Rammus | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.57 |
| 166 | Tristana | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.97 |
| 167 | Sivir | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.99 |
| 168 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.84 |
| 169 | Skarner | −0.86 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.75 |
| 170 | Katarina | −0.86 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.88 |
| 171 | Qiyana | −0.86 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.60 |
| 172 | Samira | −0.88 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.99 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Udyr's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Udyr's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Udyr` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.07)

- **0.60** spell shield: Spell Shield's spell shield blocks Udyr's Blazing Stampede. Spell shield for 1.5 s, long enough to use ahead of Blazing Stampede. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Udyr E Blazing Stampede)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Udyr's (500 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Sivir basic attacks → Udyr basic attacks)

#### 2. Vladimir (net +0.79)

- **0.63** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Udyr's Blazing Stampede. Untargetable for 2 s, long enough to use ahead of Blazing Stampede. (Vladimir W Sanguine Pool → Udyr E Blazing Stampede)
- **0.34** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Udyr's Wingborne Storm. Untargetable for 2 s, long enough to use ahead of Wingborne Storm. (Vladimir W Sanguine Pool → Udyr R Wingborne Storm)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Udyr's (450 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Vladimir basic attacks → Udyr basic attacks)
- Watch out: Blazing Stampede makes Udyr immune to Vladimir's Sanguine Pool (slow).

#### 3. Yuumi (net +0.64)

- **0.60** untargetable: You and Me! makes Yuumi untargetable, dodging Udyr's Blazing Stampede. Untargetable for ?; Blazing Stampede lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Udyr E Blazing Stampede)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Udyr's Wingborne Storm. Untargetable for ?; Wingborne Storm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Udyr R Wingborne Storm)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Udyr's (425 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Yuumi basic attacks → Udyr basic attacks)
- Watch out: Blazing Stampede's stun interrupts Yuumi's Final Chapter (normal channel).

#### 4. Teemo (net +0.54)

- **0.54** blind: Blinding Dart's blind makes Udyr's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Udyr basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Udyr's (500 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Teemo basic attacks → Udyr basic attacks)
- Watch out: Blazing Stampede makes Udyr immune to Teemo's Blinding Dart (blind).

#### 5. Kai'Sa (net +0.38)

- **0.38** range: Kai'Sa's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Kai'Sa basic attacks → Udyr basic attacks)

#### 6. Gangplank (net +0.37)

- **0.53** cleanse: Remove Scurvy cleanses Udyr's Blazing Stampede (stun) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Udyr E Blazing Stampede)
- **0.07** cleanse: Remove Scurvy cleanses Udyr's Wingborne Storm (slow) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Udyr R Wingborne Storm)
- Watch out: Blazing Stampede makes Udyr immune to Gangplank's Cannon Barrage (slow).

#### 7. Kayle (net +0.37)

- **0.36** range: Kayle's basic attacks reach 500 units farther than Udyr's (625 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Kayle basic attacks → Udyr basic attacks)
- **0.12** invulnerable: Divine Judgment makes Kayle invulnerable to Udyr's Wingborne Storm (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Wingborne Storm. (Kayle R Divine Judgment → Udyr R Wingborne Storm)
- Watch out: Blazing Stampede makes Udyr immune to Kayle's Radiant Blast (slow).

#### 8. Olaf (net +0.37)

- **0.45** cc immunity: Ragnarok makes Olaf immune to Udyr's Blazing Stampede (stun). Immune for 3 s, long enough to use ahead of Blazing Stampede. (Olaf R Ragnarok → Udyr E Blazing Stampede)
- **0.06** cc immunity: Ragnarok makes Olaf immune to Udyr's Wingborne Storm (slow). Immune for 3 s, long enough to use ahead of Wingborne Storm. (Olaf R Ragnarok → Udyr R Wingborne Storm)
- Watch out: Blazing Stampede makes Udyr immune to Olaf's Undertow (slow).

#### 9. Aurora (net +0.36)

- **0.29** range: Aurora's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Aurora basic attacks → Udyr basic attacks)
- **0.26** untargetable: Between Worlds makes Aurora untargetable, dodging Udyr's Blazing Stampede. Untargetable for 0.4 s; Blazing Stampede lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Udyr E Blazing Stampede)
- **0.14** untargetable: Between Worlds makes Aurora untargetable, dodging Udyr's Wingborne Storm. Untargetable for 0.4 s; Wingborne Storm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Udyr R Wingborne Storm)
- Watch out: Blazing Stampede makes Udyr immune to Aurora's Between Worlds (slow).

#### 10. Kindred (net +0.36)

- **0.47** range: Kindred's basic attacks reach 375 units farther than Udyr's (500 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Kindred basic attacks → Udyr basic attacks)
- Watch out: Blazing Stampede makes Udyr immune to Kindred's Mounting Dread (slow).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.07 | 1.07 | 0.00 |  |
| 2 | Vladimir | +0.79 | 0.98 | 0.19 |  |
| 3 | Yuumi | +0.64 | 1.09 | 0.45 |  |
| 4 | Teemo | +0.54 | 0.88 | 0.34 | blind (Blinding Dart) |
| 5 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 6 | Gangplank | +0.37 | 0.57 | 0.20 |  |
| 7 | Kayle | +0.37 | 0.48 | 0.11 |  |
| 8 | Olaf | +0.37 | 0.48 | 0.11 |  |
| 9 | Aurora | +0.36 | 0.62 | 0.26 |  |
| 10 | Kindred | +0.36 | 0.47 | 0.11 |  |
| 11 | Zeri | +0.33 | 0.44 | 0.11 |  |
| 12 | Master Yi | +0.32 | 0.55 | 0.23 |  |
| 13 | Gwen | +0.32 | 0.46 | 0.14 |  |
| 14 | Twitch | +0.32 | 0.43 | 0.11 |  |
| 15 | Corki | +0.32 | 0.32 | 0.00 |  |
| 16 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 17 | Nasus | +0.31 | 0.42 | 0.11 | attack speed slow (Wither) |
| 18 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 19 | Xayah | +0.24 | 0.94 | 0.70 |  |
| 20 | Zed | +0.23 | 0.33 | 0.10 |  |
| 21 | Yunara | +0.19 | 0.36 | 0.17 |  |
| 22 | Milio | +0.17 | 0.87 | 0.70 |  |
| 23 | Rek'Sai | +0.17 | 0.57 | 0.40 |  |
| 24 | Kog'Maw | +0.16 | 0.27 | 0.11 |  |
| 25 | Graves | +0.13 | 0.24 | 0.11 |  |
| 26 | Smolder | +0.12 | 0.32 | 0.20 |  |
| 27 | Fiora | +0.10 | 0.61 | 0.51 |  |
| 28 | Garen | +0.10 | 0.37 | 0.27 |  |
| 29 | Lucian | +0.08 | 0.36 | 0.28 |  |
| 30 | Akshan | +0.06 | 0.34 | 0.28 |  |
| 31 | Jax | +0.05 | 0.75 | 0.70 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 32 | Samira | 0.00 | 0.45 | 0.45 |  |
| 33 | Miss Fortune | -0.02 | 0.32 | 0.34 |  |
| 34 | Rengar | -0.05 | 0.65 | 0.70 |  |
| 35 | Nilah | -0.07 | 0.73 | 0.80 |  |
| 36 | Akali | -0.08 | 0.00 | 0.08 |  |
| 37 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 38 | Morgana | -0.11 | 0.87 | 0.98 |  |
| 39 | Dr. Mundo | -0.11 | 0.00 | 0.11 |  |
| 40 | Illaoi | -0.11 | 0.00 | 0.11 |  |
| 41 | Talon | -0.11 | 0.00 | 0.11 |  |
| 42 | Tryndamere | -0.11 | 0.00 | 0.11 |  |
| 43 | Bard | -0.12 | 0.93 | 1.05 |  |
| 44 | Nocturne | -0.12 | 0.70 | 0.82 |  |
| 45 | Karthus | -0.15 | 0.19 | 0.34 |  |
| 46 | Kha'Zix | -0.15 | 0.00 | 0.15 |  |
| 47 | Locke | -0.20 | 0.00 | 0.20 |  |
| 48 | Rumble | -0.20 | 0.00 | 0.20 |  |
| 49 | Lulu | -0.21 | 0.75 | 0.96 |  |
| 50 | LeBlanc | -0.23 | 0.22 | 0.45 |  |
| 51 | Fizz | -0.25 | 0.65 | 0.90 |  |
| 52 | Kennen | -0.26 | 0.29 | 0.55 |  |
| 53 | Vayne | -0.27 | 0.43 | 0.70 |  |
| 54 | Mel | -0.28 | 0.42 | 0.70 |  |
| 55 | Kalista | -0.31 | 0.69 | 1.00 |  |
| 56 | Malzahar | -0.32 | 0.75 | 1.07 |  |
| 57 | Singed | -0.32 | 0.52 | 0.84 |  |
| 58 | Annie | -0.33 | 0.22 | 0.55 |  |
| 59 | Kassadin | -0.33 | 0.00 | 0.33 |  |
| 60 | Draven | -0.34 | 0.36 | 0.70 |  |
| 61 | Vex | -0.34 | 0.27 | 0.61 |  |
| 62 | Evelynn | -0.35 | 0.35 | 0.70 |  |
| 63 | Elise | -0.38 | 0.32 | 0.70 |  |
| 64 | Zoe | -0.38 | 0.32 | 0.70 |  |
| 65 | Lissandra | -0.39 | 0.79 | 1.18 |  |
| 66 | Sona | -0.39 | 0.41 | 0.80 |  |
| 67 | Shaco | -0.41 | 0.35 | 0.76 |  |
| 68 | Varus | -0.43 | 0.45 | 0.88 |  |
| 69 | Senna | -0.44 | 0.32 | 0.76 |  |
| 70 | Zilean | -0.44 | 0.32 | 0.76 |  |
| 71 | Twisted Fate | -0.45 | 0.43 | 0.88 |  |
| 72 | Veigar | -0.46 | 0.24 | 0.70 |  |
| 73 | Jayce | -0.47 | 0.30 | 0.77 |  |
| 74 | Jinx | -0.47 | 0.29 | 0.76 |  |
| 75 | Lux | -0.47 | 0.29 | 0.76 |  |
| 76 | Cassiopeia | -0.48 | 0.46 | 0.94 |  |
| 77 | Ashe | -0.48 | 0.36 | 0.84 |  |
| 78 | Ahri | -0.48 | 0.22 | 0.70 |  |
| 79 | Soraka | -0.49 | 0.27 | 0.76 |  |
| 80 | Ekko | -0.51 | 0.00 | 0.51 |  |
| 81 | Caitlyn | -0.52 | 0.36 | 0.88 |  |
| 82 | Tristana | -0.52 | 0.36 | 0.88 |  |
| 83 | Shen | -0.53 | 0.72 | 1.25 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 84 | Syndra | -0.54 | 0.22 | 0.76 |  |
| 85 | Viktor | -0.55 | 0.32 | 0.87 |  |
| 86 | Brand | -0.55 | 0.22 | 0.77 |  |
| 87 | Naafiri | -0.57 | 0.00 | 0.57 |  |
| 88 | Kayn | -0.58 | 0.35 | 0.93 |  |
| 89 | Azir | -0.59 | 0.27 | 0.86 |  |
| 90 | Orianna | -0.59 | 0.27 | 0.86 |  |
| 91 | Swain | -0.59 | 0.21 | 0.80 |  |
| 92 | Quinn | -0.61 | 0.38 | 0.99 |  |
| 93 | Xerath | -0.61 | 0.27 | 0.88 |  |
| 94 | Jhin | -0.62 | 0.27 | 0.89 |  |
| 95 | Vel'Koz | -0.62 | 0.27 | 0.89 |  |
| 96 | Ziggs | -0.64 | 0.27 | 0.91 |  |
| 97 | Ryze | -0.64 | 0.24 | 0.88 |  |
| 98 | Mordekaiser | -0.67 | 0.10 | 0.77 |  |
| 99 | Renekton | -0.70 | 0.00 | 0.70 |  |
| 100 | Taric | -0.70 | 0.00 | 0.70 |  |
| 101 | Sion | -0.72 | 0.49 | 1.21 |  |
| 102 | Braum | -0.72 | 0.38 | 1.10 |  |
| 103 | Irelia | -0.72 | 0.05 | 0.77 |  |
| 104 | Aphelios | -0.73 | 0.44 | 1.17 |  |
| 105 | Karma | -0.74 | 0.22 | 0.96 |  |
| 106 | Lillia | -0.75 | 0.11 | 0.86 |  |
| 107 | Darius | -0.75 | 0.00 | 0.75 |  |
| 108 | Trundle | -0.75 | 0.00 | 0.75 |  |
| 109 | Zaahen | -0.76 | 0.29 | 1.05 |  |
| 110 | Ivern | -0.76 | 0.19 | 0.95 |  |
| 111 | Bel'Veth | -0.76 | 0.00 | 0.76 |  |
| 112 | Yorick | -0.76 | 0.00 | 0.76 |  |
| 113 | Fiddlesticks | -0.77 | 0.20 | 0.97 |  |
| 114 | Heimerdinger | -0.79 | 0.26 | 1.05 |  |
| 115 | Renata Glasc | -0.80 | 0.38 | 1.18 |  |
| 116 | Diana | -0.80 | 0.00 | 0.80 |  |
| 117 | Wukong | -0.80 | 0.00 | 0.80 |  |
| 118 | Malphite | -0.81 | 0.27 | 1.08 |  |
| 119 | Anivia | -0.83 | 0.24 | 1.07 |  |
| 120 | Seraphine | -0.86 | 0.29 | 1.15 |  |
| 121 | Cho'Gath | -0.86 | 0.00 | 0.86 |  |
| 122 | Lee Sin | -0.86 | 0.00 | 0.86 |  |
| 123 | Gnar | -0.89 | 0.33 | 1.22 |  |
| 124 | Janna | -0.90 | 0.36 | 1.26 |  |
| 125 | Zyra | -0.91 | 0.24 | 1.15 |  |
| 126 | Nami | -0.93 | 0.22 | 1.15 |  |
| 127 | Neeko | -0.93 | 0.22 | 1.15 |  |
| 128 | Pantheon | -0.93 | 0.17 | 1.10 |  |
| 129 | Aatrox | -0.93 | 0.00 | 0.93 |  |
| 130 | Kled | -0.94 | 0.41 | 1.35 |  |
| 131 | Alistar | -0.94 | 0.39 | 1.33 |  |
| 132 | Hwei | -0.96 | 0.23 | 1.19 |  |
| 133 | Maokai | -0.98 | 0.59 | 1.57 |  |
| 134 | Skarner | -1.00 | 0.07 | 1.07 |  |
| 135 | Aurelion Sol | -1.02 | 0.22 | 1.24 |  |
| 136 | Nunu & Willump | -1.03 | 0.15 | 1.18 |  |
| 137 | Yasuo | -1.04 | 0.28 | 1.32 |  |
| 138 | Thresh | -1.04 | 0.19 | 1.23 |  |
| 139 | Rammus | -1.06 | 0.41 | 1.47 | attack reflect (Defensive Ball Curl) |
| 140 | Xin Zhao | -1.06 | 0.12 | 1.18 |  |
| 141 | Ambessa | -1.06 | 0.00 | 1.06 |  |
| 142 | Shyvana | -1.06 | 0.00 | 1.06 |  |
| 143 | Sylas | -1.06 | 0.00 | 1.06 |  |
| 144 | Blitzcrank | -1.10 | 0.00 | 1.10 |  |
| 145 | Urgot | -1.13 | 0.15 | 1.28 |  |
| 146 | Volibear | -1.14 | 0.00 | 1.14 |  |
| 147 | Qiyana | -1.15 | 0.00 | 1.15 |  |
| 148 | Camille | -1.19 | 0.34 | 1.53 |  |
| 149 | Warwick | -1.24 | 0.29 | 1.53 |  |
| 150 | Poppy | -1.26 | 0.00 | 1.26 |  |
| 151 | Taliyah | -1.27 | 0.27 | 1.54 |  |
| 152 | Rakan | -1.27 | 0.13 | 1.40 |  |
| 153 | Nautilus | -1.35 | 0.00 | 1.35 |  |
| 154 | Riven | -1.35 | 0.00 | 1.35 |  |
| 155 | Sett | -1.35 | 0.00 | 1.35 |  |
| 156 | Amumu | -1.40 | 0.00 | 1.40 |  |
| 157 | Hecarim | -1.40 | 0.00 | 1.40 |  |
| 158 | Pyke | -1.40 | 0.00 | 1.40 |  |
| 159 | Yone | -1.40 | 0.00 | 1.40 |  |
| 160 | Tahm Kench | -1.42 | 0.00 | 1.42 |  |
| 161 | Jarvan IV | -1.43 | 0.00 | 1.43 |  |
| 162 | Gragas | -1.46 | 0.00 | 1.46 |  |
| 163 | Viego | -1.47 | 0.09 | 1.56 |  |
| 164 | Briar | -1.51 | 0.00 | 1.51 |  |
| 165 | Sejuani | -1.52 | 0.00 | 1.52 |  |
| 166 | Leona | -1.56 | 0.00 | 1.56 |  |
| 167 | Ornn | -1.58 | 0.00 | 1.58 |  |
| 168 | Vi | -1.63 | 0.00 | 1.63 |  |
| 169 | Zac | -1.64 | 0.00 | 1.64 |  |
| 170 | K'Sante | -1.65 | 0.00 | 1.65 |  |
| 171 | Galio | -1.75 | 0.00 | 1.75 |  |
| 172 | Rell | -1.83 | 0.00 | 1.83 |  |
