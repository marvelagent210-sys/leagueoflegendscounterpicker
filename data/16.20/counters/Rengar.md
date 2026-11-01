# Counters to Rengar (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Rengar: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Rengar wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Rengar --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +1.00 |
| 2 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 3 | Graves | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 4 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 5 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 6 | Vayne | +0.79 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.11 |
| 7 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 8 | Gragas | +0.78 | +1.00 | +1.00 | +0.94 | −0.04 | +1.00 | +0.00 |
| 9 | Fiora | +0.78 | +1.00 | +1.00 | +1.00 | −0.32 | – | +1.00 |
| 10 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 11 | Quinn | +0.78 | +1.00 | +1.00 | +1.00 | +0.12 | +0.59 | +0.00 |
| 12 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 13 | Master Yi | +0.77 | +1.00 | +1.00 | +1.00 | −0.36 | – | +1.00 |
| 14 | Poppy | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 15 | Jhin | +0.76 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | +0.00 |
| 16 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.42 | – | +1.00 |
| 17 | Kog'Maw | +0.76 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | +0.00 |
| 18 | Kayle | +0.76 | +1.00 | +1.00 | +1.00 | −0.26 | +1.00 | +0.00 |
| 19 | Garen | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 20 | Yorick | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 21 | Aphelios | +0.76 | +1.00 | +1.00 | +1.00 | −0.29 | +1.00 | +0.00 |
| 22 | Tahm Kench | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 23 | Ashe | +0.75 | +1.00 | +1.00 | +1.00 | −0.32 | +1.00 | +0.00 |
| 24 | Teemo | +0.75 | +1.00 | +1.00 | +1.00 | −0.32 | +1.00 | +0.00 |
| 25 | Gwen | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 26 | Ivern | +0.75 | +1.00 | +1.00 | +1.00 | −0.34 | +1.00 | +0.00 |
| 27 | Bel'Veth | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 28 | Kennen | +0.75 | +1.00 | +1.00 | +1.00 | −0.32 | +0.94 | +0.00 |
| 29 | Taric | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 30 | Gangplank | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 31 | Twisted Fate | +0.74 | +1.00 | +1.00 | +1.00 | −0.37 | +1.00 | +0.00 |
| 32 | Riven | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 33 | Sett | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 34 | Kai'Sa | +0.74 | +1.00 | +1.00 | +1.00 | −0.38 | +1.00 | +0.00 |
| 35 | Jax | +0.74 | +1.00 | +1.00 | +1.00 | −0.22 | – | +0.00 |
| 36 | Malzahar | +0.74 | +1.00 | +1.00 | +1.00 | −0.40 | +1.00 | +0.00 |
| 37 | Lulu | +0.74 | +1.00 | +1.00 | +1.00 | −0.40 | +1.00 | +0.00 |
| 38 | Samira | +0.74 | +1.00 | +1.00 | +1.00 | −0.41 | +1.00 | +0.00 |
| 39 | Ambessa | +0.74 | +1.00 | +1.00 | +1.00 | −0.25 | – | +0.00 |
| 40 | Orianna | +0.74 | +1.00 | +1.00 | +1.00 | −0.43 | +1.00 | +0.00 |
| 41 | Volibear | +0.74 | +1.00 | +1.00 | +1.00 | −0.25 | – | +0.00 |
| 42 | Nasus | +0.73 | +1.00 | +1.00 | +1.00 | −0.27 | – | +0.00 |
| 43 | Zaahen | +0.73 | +1.00 | +1.00 | +1.00 | −0.27 | – | +0.00 |
| 44 | Skarner | +0.73 | +1.00 | +1.00 | +1.00 | −0.27 | – | +0.00 |
| 45 | Renekton | +0.73 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.00 |
| 46 | Zeri | +0.73 | +1.00 | +1.00 | +1.00 | −0.46 | +1.00 | +0.00 |
| 47 | Warwick | +0.73 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.00 |
| 48 | Maokai | +0.73 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.00 |
| 49 | Wukong | +0.73 | +1.00 | +1.00 | +1.00 | −0.29 | – | +0.00 |
| 50 | Shyvana | +0.73 | +1.00 | +1.00 | +1.00 | −0.30 | – | +0.00 |
| 51 | Jarvan IV | +0.73 | +1.00 | +1.00 | +1.00 | −0.31 | – | +0.00 |
| 52 | Irelia | +0.72 | +1.00 | +1.00 | +1.00 | −0.32 | – | +0.00 |
| 53 | Udyr | +0.72 | +1.00 | +1.00 | +1.00 | −0.32 | – | +0.00 |
| 54 | Diana | +0.72 | +1.00 | +1.00 | +1.00 | −0.34 | – | +0.00 |
| 55 | Viego | +0.72 | +1.00 | +1.00 | +1.00 | −0.34 | – | +0.00 |
| 56 | Sion | +0.72 | +1.00 | +1.00 | +1.00 | −0.34 | – | +0.00 |
| 57 | Olaf | +0.72 | +1.00 | +1.00 | +1.00 | −0.34 | – | +0.00 |
| 58 | Lee Sin | +0.72 | +1.00 | +1.00 | +1.00 | −0.34 | – | +0.00 |
| 59 | Yasuo | +0.72 | +1.00 | +1.00 | +1.00 | −0.36 | – | +0.00 |
| 60 | Yone | +0.72 | +1.00 | +1.00 | +1.00 | −0.36 | – | +0.00 |
| 61 | Cho'Gath | +0.71 | +1.00 | +1.00 | +1.00 | −0.38 | – | +0.00 |
| 62 | Darius | +0.71 | +1.00 | +1.00 | +1.00 | −0.39 | – | +0.00 |
| 63 | Illaoi | +0.71 | +1.00 | +1.00 | +1.00 | −0.39 | – | +0.00 |
| 64 | Pantheon | +0.71 | +1.00 | +1.00 | +1.00 | −0.40 | – | +0.00 |
| 65 | Kassadin | +0.71 | +1.00 | +1.00 | +1.00 | −0.40 | – | +0.00 |
| 66 | Rek'Sai | +0.71 | +1.00 | +1.00 | +1.00 | −0.41 | – | +0.00 |
| 67 | Braum | +0.71 | +1.00 | +1.00 | +1.00 | −0.41 | – | +0.00 |
| 68 | Alistar | +0.71 | +1.00 | +1.00 | +1.00 | −0.42 | – | +0.00 |
| 69 | Vi | +0.71 | +1.00 | +1.00 | +1.00 | −0.42 | – | +0.00 |
| 70 | Mordekaiser | +0.71 | +1.00 | +1.00 | +1.00 | −0.42 | – | +0.00 |
| 71 | Tryndamere | +0.70 | +1.00 | +1.00 | +1.00 | −0.44 | – | +0.00 |
| 72 | Camille | +0.70 | +1.00 | +1.00 | +1.00 | −0.45 | – | +0.00 |
| 73 | Kled | +0.70 | +1.00 | +1.00 | +1.00 | −0.47 | – | +0.00 |
| 74 | Zac | +0.70 | +1.00 | +0.88 | +1.00 | −0.28 | – | +0.00 |
| 75 | Aatrox | +0.70 | +1.00 | +1.00 | +1.00 | −0.48 | – | +0.00 |
| 76 | Amumu | +0.61 | +0.69 | +0.91 | +1.00 | −0.36 | – | +0.00 |
| 77 | Elise | +0.58 | +1.00 | +1.00 | +1.00 | −0.12 | −1.00 | +0.00 |
| 78 | Fiddlesticks | +0.58 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | +0.00 |
| 79 | Gnar | +0.56 | +1.00 | +1.00 | +1.00 | −0.34 | −0.93 | +0.00 |
| 80 | Heimerdinger | +0.56 | +1.00 | +1.00 | +1.00 | −0.29 | −1.00 | +0.00 |
| 81 | Kindred | +0.55 | +1.00 | +1.00 | +1.00 | −0.35 | −1.00 | +0.00 |
| 82 | Cassiopeia | +0.51 | +0.50 | +0.62 | +0.71 | +0.13 | +0.71 | +0.00 |
| 83 | Neeko | +0.51 | +1.00 | +1.00 | −0.01 | −0.27 | +0.54 | +0.00 |
| 84 | Lucian | +0.49 | +0.00 | +1.00 | +1.00 | −0.39 | +1.00 | +0.00 |
| 85 | Yunara | +0.37 | +0.25 | +0.25 | +1.00 | −0.38 | +1.00 | +0.00 |
| 86 | Brand | +0.35 | +0.66 | +0.68 | +0.13 | −0.41 | +0.55 | +0.00 |
| 87 | Akshan | +0.34 | +1.00 | +1.00 | −1.00 | −0.37 | +1.00 | +0.00 |
| 88 | Rell | +0.28 | −0.94 | +1.00 | +1.00 | −0.26 | +1.00 | +0.00 |
| 89 | Jayce | +0.27 | +1.00 | −0.64 | +1.00 | −0.28 | – | +0.00 |
| 90 | Anivia | +0.26 | +0.21 | +0.21 | +1.00 | −0.37 | +0.15 | +0.00 |
| 91 | Rakan | +0.26 | −0.95 | +1.00 | +1.00 | −0.32 | +1.00 | +0.00 |
| 92 | Swain | +0.26 | +1.00 | +0.98 | −0.52 | −0.25 | −0.95 | +0.00 |
| 93 | Malphite | +0.26 | +0.04 | +0.06 | +1.00 | +0.03 | – | +0.00 |
| 94 | Smolder | +0.25 | +1.00 | −1.00 | +1.00 | −0.35 | +1.00 | +0.00 |
| 95 | Ornn | +0.24 | −0.01 | +0.05 | +0.99 | +0.06 | – | +0.00 |
| 96 | Varus | +0.24 | −1.00 | +0.93 | +1.00 | −0.30 | +1.00 | +0.00 |
| 97 | Sejuani | +0.17 | −1.00 | +1.00 | +1.00 | −0.33 | – | +0.00 |
| 98 | Azir | +0.13 | +1.00 | +1.00 | −1.00 | −0.44 | −1.00 | +0.00 |
| 99 | Akali | −0.02 | −1.00 | +1.00 | +0.12 | −0.30 | – | +0.00 |
| 100 | Sylas | −0.05 | +0.63 | −0.17 | −0.60 | −0.26 | – | +0.00 |
| 101 | Karma | −0.06 | +0.23 | −1.00 | +1.00 | −0.09 | −0.54 | +0.00 |
| 102 | Vex | −0.15 | +0.45 | −0.86 | +0.00 | −0.45 | +0.16 | +0.00 |
| 103 | Kayn | −0.17 | −0.13 | −0.13 | −0.13 | −0.41 | – | +0.00 |
| 104 | Tristana | −0.22 | −1.00 | −1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 105 | Ezreal | −0.26 | −1.00 | +0.63 | −0.67 | +0.03 | −0.41 | +0.00 |
| 106 | Fizz | −0.29 | −1.00 | +1.00 | −1.00 | −0.39 | – | +0.00 |
| 107 | Zed | −0.30 | −1.00 | +1.00 | −1.00 | −0.48 | – | +0.00 |
| 108 | Hecarim | −0.38 | −1.00 | −1.00 | +1.00 | −0.29 | – | +0.00 |
| 109 | Morgana | −0.39 | −1.00 | −1.00 | +1.00 | +0.04 | −0.96 | +0.00 |
| 110 | Shaco | −0.39 | −1.00 | −1.00 | +1.00 | −0.34 | – | +0.00 |
| 111 | Nocturne | −0.41 | −1.00 | −1.00 | +1.00 | −0.46 | – | +0.00 |
| 112 | Rumble | −0.42 | −1.00 | −1.00 | +0.92 | −0.40 | – | +0.00 |
| 113 | Draven | −0.43 | −1.00 | −1.00 | +1.00 | −0.20 | −1.00 | +0.00 |
| 114 | Leona | −0.44 | −1.00 | −1.00 | +0.82 | −0.39 | – | +0.00 |
| 115 | Miss Fortune | −0.46 | −1.00 | −1.00 | +1.00 | −0.39 | −1.00 | +0.00 |
| 116 | Zilean | −0.57 | −1.00 | −1.00 | +0.00 | −0.45 | +0.00 | +0.00 |
| 117 | Jinx | −0.71 | −1.00 | −1.00 | −0.75 | −0.37 | −0.04 | +0.00 |
| 118 | Kalista | −0.72 | −0.97 | −0.89 | −1.00 | −0.36 | +0.01 | +0.00 |
| 119 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.46 | −1.00 | +0.00 |
| 120 | Ryze | −0.74 | −1.00 | −1.00 | −1.00 | −0.39 | +0.17 | +0.00 |
| 121 | Nunu & Willump | −0.76 | −0.97 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 122 | Singed | −0.76 | −1.00 | −0.97 | −1.00 | +0.03 | – | +0.00 |
| 123 | Milio | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 124 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 125 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 126 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 127 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 128 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 129 | Senna | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 130 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 131 | Nautilus | −0.82 | −1.00 | −1.00 | −1.00 | −0.33 | −0.71 | +0.00 |
| 132 | Blitzcrank | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 133 | Ziggs | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 134 | Vel'Koz | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 135 | Caitlyn | −0.84 | −1.00 | −1.00 | −0.99 | −0.33 | −0.87 | +0.00 |
| 136 | Evelynn | −0.84 | −1.00 | −1.00 | −1.00 | −0.34 | – | +0.00 |
| 137 | Briar | −0.84 | −1.00 | −1.00 | −1.00 | −0.34 | – | +0.00 |
| 138 | Galio | −0.84 | −1.00 | −1.00 | −1.00 | −0.36 | – | +0.00 |
| 139 | Naafiri | −0.84 | −1.00 | −1.00 | −1.00 | −0.37 | – | +0.00 |
| 140 | Ahri | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 141 | Janna | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 142 | Qiyana | −0.84 | −1.00 | −1.00 | −1.00 | −0.38 | – | +0.00 |
| 143 | Zyra | −0.85 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.00 |
| 144 | Taliyah | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 145 | Karthus | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 146 | Nidalee | −0.85 | −1.00 | −1.00 | −1.00 | −0.32 | −1.00 | +0.00 |
| 147 | Ekko | −0.85 | −1.00 | −1.00 | −1.00 | −0.43 | – | +0.00 |
| 148 | Lux | −0.85 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | +0.00 |
| 149 | Annie | −0.85 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.00 |
| 150 | Locke | −0.85 | −1.00 | −1.00 | −1.00 | −0.45 | – | +0.00 |
| 151 | Bard | −0.85 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.00 |
| 152 | Twitch | −0.85 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.00 |
| 153 | Talon | −0.85 | −1.00 | −1.00 | −1.00 | −0.45 | – | +0.00 |
| 154 | Kha'Zix | −0.85 | −1.00 | −1.00 | −1.00 | −0.45 | – | +0.00 |
| 155 | Hwei | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | +0.00 |
| 156 | Nami | −0.86 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | +0.00 |
| 157 | Vladimir | −0.86 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | +0.00 |
| 158 | Mel | −0.86 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | +0.00 |
| 159 | Katarina | −0.86 | −1.00 | −1.00 | −1.00 | −0.48 | – | +0.00 |
| 160 | Xayah | −0.86 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | +0.00 |
| 161 | Viktor | −0.86 | −1.00 | −1.00 | −1.00 | −0.41 | −1.00 | +0.00 |
| 162 | Lissandra | −0.86 | −1.00 | −1.00 | −1.00 | −0.42 | −1.00 | +0.00 |
| 163 | Sona | −0.86 | −1.00 | −1.00 | −1.00 | −0.42 | −1.00 | +0.00 |
| 164 | Seraphine | −0.86 | −1.00 | −1.00 | −1.00 | −0.42 | −1.00 | +0.00 |
| 165 | Aurora | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |
| 166 | Lillia | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |
| 167 | Renata Glasc | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |
| 168 | Sivir | −0.87 | −1.00 | −1.00 | −1.00 | −0.46 | −1.00 | +0.00 |
| 169 | Yuumi | −0.87 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | +0.00 |
| 170 | Soraka | −0.88 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | +0.00 |
| 171 | Pyke | −0.88 | −1.00 | −1.00 | −1.00 | −0.51 | −1.00 | +0.00 |
| 172 | Thresh | −0.91 | −1.00 | −1.00 | −1.00 | −0.41 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Rengar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rengar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rengar` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.45)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Rengar's (500 vs 125 attack range). Rengar has no dash or blink to close the gap. (Sivir basic attacks → Rengar basic attacks)
- **0.51** spell shield: Spell Shield's spell shield blocks Rengar's Bola Strike. Spell shield for 1.5 s, long enough to use ahead of Bola Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rengar E Bola Strike)

#### 2. Yuumi (net +1.36)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Rengar's Bola Strike. Untargetable for ?; Bola Strike takes 0.92 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rengar E Bola Strike)
- **0.64** range: Yuumi's basic attacks reach 300 units farther than Rengar's (425 vs 125 attack range). Rengar has no dash or blink to close the gap. (Yuumi basic attacks → Rengar basic attacks)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Rengar's Thrill of the Hunt. Untargetable for ?; Thrill of the Hunt lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rengar R Thrill of the Hunt)
- Watch out: Battle Roar cleanses Yuumi's Final Chapter (slow) after it lands.

#### 3. Vladimir (net +1.06)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rengar's Thrill of the Hunt. Untargetable for 2 s, long enough to use ahead of Thrill of the Hunt. (Vladimir W Sanguine Pool → Rengar R Thrill of the Hunt)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rengar's Bola Strike. Untargetable for 2 s, long enough to use ahead of Bola Strike. (Vladimir W Sanguine Pool → Rengar E Bola Strike)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Rengar's (450 vs 125 attack range). Rengar has no dash or blink to close the gap. (Vladimir basic attacks → Rengar basic attacks)
- Watch out: Battle Roar cleanses Vladimir's Sanguine Pool (slow) after it lands.

#### 4. Kayle (net +1.01)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Rengar's (625 vs 125 attack range). Rengar has no dash or blink to close the gap. (Kayle basic attacks → Rengar basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Rengar's Thrill of the Hunt (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Thrill of the Hunt. (Kayle R Divine Judgment → Rengar R Thrill of the Hunt)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Rengar's Bola Strike (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Bola Strike. (Kayle R Divine Judgment → Rengar E Bola Strike)
- Watch out: Battle Roar cleanses Kayle's Radiant Blast (slow) after it lands.

#### 5. Teemo (net +0.96)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Rengar's (500 vs 125 attack range). Rengar has no dash or blink to close the gap. (Teemo basic attacks → Rengar basic attacks)
- **0.50** blind: Blinding Dart's blind makes Rengar's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Rengar basic attacks)
- **0.36** blind: Blinding Dart's blind makes Rengar's Thrill of the Hunt, an empowered attack, miss. Blind for 3 s. The ability applies a mark on the target at the start of attack windup that is successively consumed when the basic attack hits to apply the effect.
  - If the attack is prevented or blocked (e.g. by knocking down Rengar when leaping) then the effect will not be applied.
    - The mark will however still linger for a very short period after that, allowing Rengar to consume it with a quick basic attack. [https://github.com/ArdaSenyurek/Rengar-Bugs/issues/108]. (Teemo Q Blinding Dart → Rengar R Thrill of the Hunt)
- Watch out: Battle Roar cleanses Teemo's Blinding Dart (blind) after it lands.

#### 6. Xayah (net +0.92)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Rengar's (525 vs 125 attack range). Rengar has no dash or blink to close the gap. (Xayah basic attacks → Rengar basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Rengar's Thrill of the Hunt. Untargetable for 1.5 s, long enough to use ahead of Thrill of the Hunt. (Xayah R Featherstorm → Rengar R Thrill of the Hunt)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Rengar's Bola Strike. Untargetable for 1.5 s, long enough to use ahead of Bola Strike. (Xayah R Featherstorm → Rengar E Bola Strike)
- Watch out: Battle Roar cleanses Xayah's Bladecaller (root) after it lands.

#### 7. Kindred (net +0.86)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Rengar's (500 vs 125 attack range). Rengar has no dash or blink to close the gap. (Kindred basic attacks → Rengar basic attacks)
- Watch out: Battle Roar cleanses Kindred's Mounting Dread (slow) after it lands.

#### 8. Zeri (net +0.80)

- **0.88** range: Zeri's basic attacks reach 425 units farther than Rengar's (550 vs 125 attack range). Rengar has no dash or blink to close the gap. (Zeri basic attacks → Rengar basic attacks)
- Watch out: Battle Roar cleanses Zeri's Ultrashock Laser (slow) after it lands.

#### 9. Master Yi (net +0.79)

- **0.51** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rengar's Bola Strike. Untargetable for ?; Bola Strike takes 0.92 s to land, enough to react. (Master Yi Q Alpha Strike → Rengar E Bola Strike)
- **0.33** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rengar's Thrill of the Hunt. Untargetable for ?; Thrill of the Hunt lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Rengar R Thrill of the Hunt)
- **0.08** cc immunity: Highlander makes Master Yi immune to Rengar's Bola Strike (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Rengar E Bola Strike)

#### 10. Nidalee (net +0.74)

- **0.60** range: Nidalee's basic attacks reach 400 units farther than Rengar's (525 vs 125 attack range). Rengar has no dash or blink to close the gap. (Nidalee basic attacks → Rengar basic attacks)
- **0.14** reveal: Prowl reveals Rengar through Thrill of the Hunt's stealth. (Nidalee I Prowl → Rengar R Thrill of the Hunt)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.45 | 1.45 | 0.00 | range (attacks) |
| 2 | Yuumi | +1.36 | 1.51 | 0.15 | range (attacks) |
| 3 | Vladimir | +1.06 | 1.18 | 0.12 |  |
| 4 | Kayle | +1.01 | 1.09 | 0.08 | range (attacks) |
| 5 | Teemo | +0.96 | 1.36 | 0.40 | range (attacks), blind (Blinding Dart) |
| 6 | Xayah | +0.92 | 1.41 | 0.49 | range (attacks) |
| 7 | Kindred | +0.86 | 0.94 | 0.08 | range (attacks) |
| 8 | Zeri | +0.80 | 0.88 | 0.08 | range (attacks) |
| 9 | Master Yi | +0.79 | 0.79 | 0.00 |  |
| 10 | Nidalee | +0.74 | 0.74 | 0.00 | range (attacks) |
| 11 | Samira | +0.72 | 1.08 | 0.36 | range (attacks), projectile block (Blade Whirl) |
| 12 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 13 | Kai'Sa | +0.69 | 0.91 | 0.22 | range (attacks) |
| 14 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 15 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 16 | Bard | +0.63 | 1.44 | 0.81 | range (attacks) |
| 17 | Yunara | +0.58 | 0.72 | 0.14 | range (attacks) |
| 18 | Twisted Fate | +0.57 | 1.00 | 0.43 | range (attacks) |
| 19 | Gwen | +0.57 | 0.68 | 0.11 |  |
| 20 | Milio | +0.56 | 1.12 | 0.56 | range (attacks) |
| 21 | Twitch | +0.56 | 0.86 | 0.30 | range (attacks) |
| 22 | Miss Fortune | +0.56 | 0.65 | 0.09 | range (attacks) |
| 23 | Aurora | +0.55 | 1.05 | 0.50 | range (attacks) |
| 24 | Akshan | +0.54 | 0.82 | 0.28 | range (attacks) |
| 25 | Smolder | +0.49 | 0.65 | 0.16 | range (attacks) |
| 26 | Rek'Sai | +0.46 | 0.75 | 0.29 |  |
| 27 | Lulu | +0.45 | 1.22 | 0.77 | range (attacks) |
| 28 | Kog'Maw | +0.45 | 0.54 | 0.09 | range (attacks) |
| 29 | Mel | +0.44 | 0.97 | 0.53 | range (attacks), projectile block (Rebuttal) |
| 30 | Vex | +0.43 | 0.92 | 0.49 | range (attacks) |
| 31 | Fiora | +0.43 | 0.83 | 0.40 |  |
| 32 | Zed | +0.41 | 0.47 | 0.06 |  |
| 33 | Graves | +0.40 | 0.49 | 0.09 |  |
| 34 | Caitlyn | +0.38 | 1.00 | 0.62 | range (attacks) |
| 35 | Viktor | +0.37 | 0.93 | 0.56 | range (attacks) |
| 36 | Nilah | +0.34 | 0.98 | 0.64 | attack dodge (Jubilant Veil) |
| 37 | Jinx | +0.30 | 0.90 | 0.60 | range (attacks) |
| 38 | Gangplank | +0.30 | 0.46 | 0.16 |  |
| 39 | Karthus | +0.30 | 0.39 | 0.09 |  |
| 40 | Nasus | +0.30 | 0.39 | 0.09 |  |
| 41 | Morgana | +0.29 | 1.07 | 0.78 |  |
| 42 | Fizz | +0.29 | 1.00 | 0.71 |  |
| 43 | Lissandra | +0.28 | 1.19 | 0.91 |  |
| 44 | Garen | +0.27 | 0.46 | 0.19 |  |
| 45 | Malzahar | +0.26 | 0.98 | 0.72 |  |
| 46 | Olaf | +0.25 | 0.33 | 0.08 |  |
| 47 | Elise | +0.23 | 0.79 | 0.56 | range (attacks) |
| 48 | Jax | +0.23 | 0.76 | 0.53 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 49 | Sona | +0.19 | 0.83 | 0.64 | range (attacks) |
| 50 | Veigar | +0.19 | 0.75 | 0.56 |  |
| 51 | Katarina | +0.18 | 0.18 | 0.00 |  |
| 52 | Ahri | +0.17 | 0.73 | 0.56 |  |
| 53 | Draven | +0.16 | 0.72 | 0.56 | range (attacks) |
| 54 | Kennen | +0.14 | 0.58 | 0.44 | range (attacks) |
| 55 | Quinn | +0.13 | 0.77 | 0.64 | range (attacks) |
| 56 | Hwei | +0.11 | 1.06 | 0.95 |  |
| 57 | Zilean | +0.11 | 0.65 | 0.54 | range (attacks) |
| 58 | Kalista | +0.10 | 0.90 | 0.80 | range (attacks) |
| 59 | Zoe | +0.09 | 0.65 | 0.56 | range (attacks) |
| 60 | LeBlanc | +0.06 | 0.58 | 0.52 |  |
| 61 | Ashe | +0.05 | 0.72 | 0.67 | range (attacks) |
| 62 | Udyr | +0.05 | 0.70 | 0.65 |  |
| 63 | Illaoi | +0.05 | 0.14 | 0.09 |  |
| 64 | Fiddlesticks | +0.03 | 0.67 | 0.64 |  |
| 65 | Vayne | +0.02 | 0.86 | 0.84 | range (attacks) |
| 66 | Tristana | +0.02 | 0.72 | 0.70 | range (attacks) |
| 67 | Varus | +0.02 | 0.71 | 0.69 | range (attacks) |
| 68 | Jayce | 0.00 | 0.61 | 0.61 | range (attacks) |
| 69 | Kayn | 0.00 | 0.53 | 0.53 |  |
| 70 | Annie | 0.00 | 0.44 | 0.44 |  |
| 71 | Nocturne | -0.02 | 0.63 | 0.65 |  |
| 72 | Lux | -0.02 | 0.58 | 0.60 | range (attacks) |
| 73 | Renata Glasc | -0.03 | 0.91 | 0.94 | range (attacks) |
| 74 | Naafiri | -0.04 | 0.14 | 0.18 |  |
| 75 | Karma | -0.05 | 0.72 | 0.77 |  |
| 76 | Cassiopeia | -0.05 | 0.59 | 0.64 |  |
| 77 | Ryze | -0.05 | 0.48 | 0.53 |  |
| 78 | Brand | -0.05 | 0.44 | 0.49 |  |
| 79 | Singed | -0.06 | 0.43 | 0.49 |  |
| 80 | Soraka | -0.07 | 0.53 | 0.60 | range (attacks) |
| 81 | Dr. Mundo | -0.07 | 0.00 | 0.07 |  |
| 82 | Shen | -0.08 | 0.75 | 0.83 | attack block (Spirit's Refuge) |
| 83 | Xerath | -0.08 | 0.53 | 0.61 | range (attacks) |
| 84 | Kassadin | -0.09 | 0.00 | 0.09 |  |
| 85 | Tryndamere | -0.09 | 0.00 | 0.09 |  |
| 86 | Kled | -0.10 | 0.93 | 1.03 |  |
| 87 | Aphelios | -0.10 | 0.84 | 0.94 | range (attacks) |
| 88 | Vel'Koz | -0.10 | 0.53 | 0.63 | range (attacks) |
| 89 | Jhin | -0.11 | 0.53 | 0.64 | range (attacks) |
| 90 | Akali | -0.13 | 0.14 | 0.27 |  |
| 91 | Azir | -0.15 | 0.53 | 0.68 | range (attacks) |
| 92 | Orianna | -0.15 | 0.53 | 0.68 | range (attacks) |
| 93 | Locke | -0.15 | 0.00 | 0.15 |  |
| 94 | Rumble | -0.15 | 0.00 | 0.15 |  |
| 95 | Syndra | -0.16 | 0.44 | 0.60 |  |
| 96 | Braum | -0.18 | 0.70 | 0.88 | projectile block (Unbreakable) |
| 97 | Senna | -0.18 | 0.65 | 0.83 | range (attacks) |
| 98 | Ziggs | -0.20 | 0.53 | 0.73 | range (attacks) |
| 99 | Swain | -0.21 | 0.42 | 0.63 |  |
| 100 | Janna | -0.22 | 0.72 | 0.94 | range (attacks) |
| 101 | Evelynn | -0.22 | 0.50 | 0.72 |  |
| 102 | Gnar | -0.26 | 0.66 | 0.92 | range (attacks) |
| 103 | Pantheon | -0.28 | 0.41 | 0.69 |  |
| 104 | Zyra | -0.30 | 0.62 | 0.92 |  |
| 105 | Anivia | -0.33 | 0.48 | 0.81 |  |
| 106 | Yasuo | -0.34 | 0.67 | 1.01 | projectile block (Wind Wall) |
| 107 | Seraphine | -0.34 | 0.58 | 0.92 | range (attacks) |
| 108 | Ivern | -0.34 | 0.38 | 0.72 |  |
| 109 | Talon | -0.35 | 0.00 | 0.35 |  |
| 110 | Maokai | -0.36 | 0.87 | 1.23 |  |
| 111 | Mordekaiser | -0.36 | 0.19 | 0.55 |  |
| 112 | Heimerdinger | -0.37 | 0.47 | 0.84 |  |
| 113 | Ekko | -0.40 | 0.00 | 0.40 |  |
| 114 | Lee Sin | -0.41 | 0.28 | 0.69 |  |
| 115 | Thresh | -0.42 | 0.53 | 0.95 |  |
| 116 | Nami | -0.45 | 0.44 | 0.89 |  |
| 117 | Zaahen | -0.45 | 0.33 | 0.78 |  |
| 118 | Lillia | -0.47 | 0.22 | 0.69 |  |
| 119 | Aatrox | -0.47 | 0.14 | 0.61 |  |
| 120 | Renekton | -0.49 | 0.00 | 0.49 |  |
| 121 | Shaco | -0.50 | 0.50 | 1.00 |  |
| 122 | Aurelion Sol | -0.52 | 0.44 | 0.96 |  |
| 123 | Irelia | -0.52 | 0.10 | 0.62 |  |
| 124 | Sion | -0.53 | 0.35 | 0.88 |  |
| 125 | Skarner | -0.53 | 0.33 | 0.86 |  |
| 126 | Bel'Veth | -0.54 | 0.00 | 0.54 |  |
| 127 | Kha'Zix | -0.54 | 0.00 | 0.54 |  |
| 128 | Cho'Gath | -0.55 | 0.00 | 0.55 |  |
| 129 | Taric | -0.56 | 0.00 | 0.56 |  |
| 130 | Xin Zhao | -0.57 | 0.32 | 0.89 |  |
| 131 | Urgot | -0.58 | 0.44 | 1.02 |  |
| 132 | Darius | -0.59 | 0.00 | 0.59 |  |
| 133 | Trundle | -0.60 | 0.00 | 0.60 |  |
| 134 | Yorick | -0.60 | 0.00 | 0.60 |  |
| 135 | Malphite | -0.61 | 0.25 | 0.86 |  |
| 136 | Warwick | -0.62 | 0.46 | 1.08 |  |
| 137 | Poppy | -0.62 | 0.36 | 0.98 |  |
| 138 | Taliyah | -0.64 | 0.53 | 1.17 | range (attacks) |
| 139 | Diana | -0.64 | 0.00 | 0.64 |  |
| 140 | Nunu & Willump | -0.67 | 0.20 | 0.87 |  |
| 141 | Neeko | -0.70 | 0.44 | 1.14 |  |
| 142 | Ambessa | -0.70 | 0.14 | 0.84 |  |
| 143 | Sylas | -0.70 | 0.14 | 0.84 |  |
| 144 | Camille | -0.73 | 0.49 | 1.22 |  |
| 145 | Rammus | -0.73 | 0.38 | 1.11 |  |
| 146 | Alistar | -0.79 | 0.27 | 1.06 |  |
| 147 | Zac | -0.80 | 0.39 | 1.19 |  |
| 148 | Blitzcrank | -0.82 | 0.00 | 0.82 |  |
| 149 | Shyvana | -0.84 | 0.00 | 0.84 |  |
| 150 | Rakan | -0.87 | 0.25 | 1.12 |  |
| 151 | Yone | -0.91 | 0.15 | 1.06 |  |
| 152 | Volibear | -0.91 | 0.00 | 0.91 |  |
| 153 | Sett | -0.94 | 0.14 | 1.08 |  |
| 154 | Amumu | -0.97 | 0.15 | 1.12 |  |
| 155 | Vi | -0.97 | 0.14 | 1.11 |  |
| 156 | Riven | -1.03 | 0.00 | 1.03 |  |
| 157 | Leona | -1.04 | 0.00 | 1.04 |  |
| 158 | Wukong | -1.04 | 0.00 | 1.04 |  |
| 159 | Briar | -1.05 | 0.14 | 1.19 |  |
| 160 | Tahm Kench | -1.06 | 0.00 | 1.06 |  |
| 161 | Jarvan IV | -1.07 | 0.00 | 1.07 |  |
| 162 | Nautilus | -1.08 | 0.00 | 1.08 |  |
| 163 | Hecarim | -1.12 | 0.00 | 1.12 |  |
| 164 | Gragas | -1.14 | 0.00 | 1.14 |  |
| 165 | Viego | -1.18 | 0.19 | 1.37 |  |
| 166 | Sejuani | -1.21 | 0.00 | 1.21 |  |
| 167 | Ornn | -1.24 | 0.00 | 1.24 |  |
| 168 | Galio | -1.27 | 0.00 | 1.27 |  |
| 169 | Pyke | -1.27 | 0.00 | 1.27 |  |
| 170 | Qiyana | -1.28 | 0.00 | 1.28 |  |
| 171 | K'Sante | -1.30 | 0.00 | 1.30 |  |
| 172 | Rell | -1.46 | 0.00 | 1.46 |  |
