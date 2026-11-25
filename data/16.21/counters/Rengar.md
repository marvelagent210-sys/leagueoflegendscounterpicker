# Counters to Rengar (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Rengar: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Rengar wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Rengar --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | −0.09 |
| 2 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.44 |
| 3 | Nilah | +0.82 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.05 |
| 4 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.58 |
| 5 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.05 |
| 6 | Graves | +0.79 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.56 |
| 7 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.61 |
| 8 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.34 |
| 9 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.02 |
| 10 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | −0.77 |
| 11 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.06 |
| 12 | Tahm Kench | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.11 |
| 13 | Xin Zhao | +0.76 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.38 |
| 14 | Teemo | +0.75 | +1.00 | +1.00 | +1.00 | −0.32 | +1.00 | +0.03 |
| 15 | Udyr | +0.75 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.23 |
| 16 | Ashe | +0.75 | +1.00 | +1.00 | +1.00 | −0.32 | +1.00 | −0.05 |
| 17 | Kog'Maw | +0.75 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | −0.31 |
| 18 | Jax | +0.75 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.06 |
| 19 | Nasus | +0.74 | +1.00 | +1.00 | +1.00 | −0.27 | – | +0.22 |
| 20 | Quinn | +0.74 | +1.00 | +1.00 | +1.00 | +0.12 | +0.59 | −0.68 |
| 21 | Volibear | +0.74 | +1.00 | +1.00 | +1.00 | −0.27 | – | +0.15 |
| 22 | Twisted Fate | +0.74 | +1.00 | +1.00 | +1.00 | −0.37 | +1.00 | −0.05 |
| 23 | Aphelios | +0.74 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | −0.43 |
| 24 | Taric | +0.74 | +1.00 | +1.00 | +1.00 | −0.19 | – | −0.11 |
| 25 | Zeri | +0.74 | +1.00 | +1.00 | +1.00 | −0.46 | +1.00 | +0.17 |
| 26 | Renekton | +0.74 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.14 |
| 27 | Fiora | +0.74 | +1.00 | +1.00 | +1.00 | −0.32 | – | +0.27 |
| 28 | Kennen | +0.74 | +1.00 | +1.00 | +1.00 | −0.32 | +0.94 | −0.17 |
| 29 | Riven | +0.73 | +1.00 | +1.00 | +1.00 | −0.21 | – | −0.15 |
| 30 | Master Yi | +0.73 | +1.00 | +1.00 | +1.00 | −0.36 | – | +0.29 |
| 31 | Gangplank | +0.73 | +1.00 | +1.00 | +1.00 | −0.18 | – | −0.24 |
| 32 | Shyvana | +0.73 | +1.00 | +1.00 | +1.00 | −0.30 | – | +0.09 |
| 33 | Kayle | +0.73 | +1.00 | +1.00 | +1.00 | −0.26 | +1.00 | −0.57 |
| 34 | Gwen | +0.73 | +1.00 | +1.00 | +1.00 | −0.17 | – | −0.32 |
| 35 | Malzahar | +0.73 | +1.00 | +1.00 | +1.00 | −0.40 | +1.00 | −0.19 |
| 36 | Pantheon | +0.73 | +1.00 | +1.00 | +1.00 | −0.38 | – | +0.27 |
| 37 | Trundle | +0.73 | +1.00 | +1.00 | +1.00 | −0.42 | – | +0.39 |
| 38 | Garen | +0.73 | +1.00 | +1.00 | +1.00 | −0.12 | – | −0.53 |
| 39 | Sion | +0.73 | +1.00 | +1.00 | +1.00 | −0.32 | – | +0.04 |
| 40 | Jarvan IV | +0.72 | +1.00 | +1.00 | +1.00 | −0.32 | – | −0.03 |
| 41 | Ambessa | +0.72 | +1.00 | +1.00 | +1.00 | −0.25 | – | −0.23 |
| 42 | Maokai | +0.72 | +1.00 | +1.00 | +1.00 | −0.25 | – | −0.25 |
| 43 | Lulu | +0.72 | +1.00 | +1.00 | +1.00 | −0.40 | +1.00 | −0.38 |
| 44 | Orianna | +0.72 | +1.00 | +1.00 | +1.00 | −0.41 | +1.00 | −0.35 |
| 45 | Skarner | +0.72 | +1.00 | +1.00 | +1.00 | −0.27 | – | −0.24 |
| 46 | Diana | +0.72 | +1.00 | +1.00 | +1.00 | −0.34 | – | −0.06 |
| 47 | Yasuo | +0.72 | +1.00 | +1.00 | +1.00 | −0.36 | – | +0.00 |
| 48 | Wukong | +0.72 | +1.00 | +1.00 | +1.00 | −0.29 | – | −0.25 |
| 49 | Camille | +0.72 | +1.00 | +1.00 | +1.00 | −0.45 | – | +0.21 |
| 50 | Alistar | +0.72 | +1.00 | +1.00 | +1.00 | −0.27 | – | −0.31 |
| 51 | Samira | +0.71 | +1.00 | +1.00 | +1.00 | −0.41 | +1.00 | −0.49 |
| 52 | Kassadin | +0.71 | +1.00 | +1.00 | +1.00 | −0.40 | – | +0.06 |
| 53 | Bel'Veth | +0.71 | +1.00 | +1.00 | +1.00 | −0.17 | – | −0.65 |
| 54 | Irelia | +0.71 | +1.00 | +1.00 | +1.00 | −0.32 | – | −0.23 |
| 55 | Ivern | +0.71 | +1.00 | +1.00 | +1.00 | −0.39 | +1.00 | −0.61 |
| 56 | Viego | +0.71 | +1.00 | +1.00 | +1.00 | −0.34 | – | −0.19 |
| 57 | Mordekaiser | +0.71 | +1.00 | +1.00 | +1.00 | −0.42 | – | +0.06 |
| 58 | Braum | +0.71 | +1.00 | +1.00 | +1.00 | −0.41 | – | +0.02 |
| 59 | Lee Sin | +0.71 | +1.00 | +1.00 | +1.00 | −0.34 | – | −0.23 |
| 60 | Darius | +0.71 | +1.00 | +1.00 | +1.00 | −0.39 | – | −0.11 |
| 61 | Kai'Sa | +0.70 | +1.00 | +1.00 | +1.00 | −0.38 | +1.00 | −0.76 |
| 62 | Yone | +0.70 | +1.00 | +1.00 | +1.00 | −0.36 | – | −0.23 |
| 63 | Zaahen | +0.70 | +1.00 | +1.00 | +1.00 | −0.26 | – | −0.53 |
| 64 | Warwick | +0.70 | +1.00 | +1.00 | +1.00 | −0.28 | – | −0.49 |
| 65 | Kled | +0.70 | +1.00 | +1.00 | +1.00 | −0.47 | – | +0.03 |
| 66 | Vi | +0.70 | +1.00 | +1.00 | +1.00 | −0.42 | – | −0.12 |
| 67 | Illaoi | +0.70 | +1.00 | +1.00 | +1.00 | −0.39 | – | −0.24 |
| 68 | Olaf | +0.70 | +1.00 | +1.00 | +1.00 | −0.34 | – | −0.46 |
| 69 | Tryndamere | +0.69 | +1.00 | +1.00 | +1.00 | −0.44 | – | −0.20 |
| 70 | Cho'Gath | +0.69 | +1.00 | +1.00 | +1.00 | −0.38 | – | −0.40 |
| 71 | Rek'Sai | +0.67 | +1.00 | +1.00 | +1.00 | −0.41 | – | −0.69 |
| 72 | Zac | +0.67 | +0.93 | +0.90 | +1.00 | −0.28 | – | −0.26 |
| 73 | Aatrox | +0.65 | +1.00 | +1.00 | +1.00 | −0.48 | – | −0.83 |
| 74 | Gnar | +0.59 | +1.00 | +1.00 | +1.00 | −0.34 | −0.50 | −0.29 |
| 75 | Amumu | +0.57 | +0.71 | +0.73 | +1.00 | −0.36 | – | +0.16 |
| 76 | Elise | +0.56 | +1.00 | +1.00 | +1.00 | −0.12 | −1.00 | −0.46 |
| 77 | Fiddlesticks | +0.56 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | −0.44 |
| 78 | Jhin | +0.55 | +1.00 | +1.00 | +1.00 | −0.24 | −1.00 | −0.34 |
| 79 | Heimerdinger | +0.54 | +1.00 | +1.00 | +1.00 | −0.29 | −1.00 | −0.34 |
| 80 | Kindred | +0.54 | +1.00 | +1.00 | +1.00 | −0.35 | −1.00 | −0.20 |
| 81 | Neeko | +0.53 | +1.00 | +1.00 | −0.01 | −0.27 | +0.90 | −0.38 |
| 82 | Rell | +0.51 | +0.03 | +1.00 | +1.00 | −0.26 | +1.00 | −0.22 |
| 83 | Cassiopeia | +0.48 | +0.51 | +0.30 | +1.00 | +0.13 | +0.71 | −0.28 |
| 84 | Lucian | +0.48 | +0.00 | +1.00 | +1.00 | −0.39 | +1.00 | −0.26 |
| 85 | Yunara | +0.35 | +0.25 | +0.25 | +1.00 | −0.38 | +1.00 | −0.42 |
| 86 | Brand | +0.33 | +0.66 | +0.68 | +0.13 | −0.41 | +0.55 | −0.43 |
| 87 | Akshan | +0.32 | +1.00 | +1.00 | −1.00 | −0.37 | +1.00 | −0.40 |
| 88 | Jayce | +0.28 | +1.00 | −0.64 | +1.00 | −0.28 | – | +0.12 |
| 89 | Malphite | +0.26 | +0.04 | +0.05 | +0.97 | +0.03 | – | +0.30 |
| 90 | Anivia | +0.26 | +0.21 | +0.21 | +1.00 | −0.37 | +0.15 | −0.04 |
| 91 | Rakan | +0.26 | −0.95 | +1.00 | +1.00 | −0.32 | +1.00 | −0.03 |
| 92 | Swain | +0.24 | +1.00 | +0.98 | −0.52 | −0.29 | −0.95 | −0.16 |
| 93 | Varus | +0.24 | −1.00 | +1.00 | +1.00 | −0.30 | +1.00 | −0.22 |
| 94 | Ornn | +0.24 | −0.02 | +0.04 | +1.00 | +0.06 | – | −0.03 |
| 95 | Smolder | +0.22 | +1.00 | −1.00 | +1.00 | −0.35 | +1.00 | −0.46 |
| 96 | Sett | +0.18 | +1.00 | −1.00 | +1.00 | −0.21 | – | −0.10 |
| 97 | Sejuani | +0.16 | −1.00 | +1.00 | +1.00 | −0.33 | – | −0.06 |
| 98 | Hecarim | +0.13 | −1.00 | +1.00 | +1.00 | −0.29 | – | −0.70 |
| 99 | Azir | +0.13 | +1.00 | +1.00 | −1.00 | −0.44 | −1.00 | −0.12 |
| 100 | Vex | +0.01 | +0.45 | −0.86 | +0.98 | −0.45 | −0.07 | −0.13 |
| 101 | Karma | −0.05 | +0.32 | −1.00 | +1.00 | −0.09 | −0.54 | −0.28 |
| 102 | Kayn | −0.05 | −0.13 | −0.13 | +0.48 | −0.41 | – | −0.39 |
| 103 | Akali | −0.18 | −1.00 | +0.85 | −0.32 | −0.29 | – | −0.32 |
| 104 | Tristana | −0.24 | −1.00 | −1.00 | +1.00 | −0.16 | +1.00 | −0.27 |
| 105 | Miss Fortune | −0.27 | −1.00 | −1.00 | +1.00 | −0.39 | +1.00 | −0.20 |
| 106 | Fizz | −0.30 | −1.00 | +1.00 | −1.00 | −0.39 | – | −0.15 |
| 107 | Sylas | −0.37 | +0.63 | −1.00 | −1.00 | −0.26 | – | +0.04 |
| 108 | Ezreal | −0.38 | −0.93 | −0.98 | +0.22 | +0.03 | +0.82 | −0.65 |
| 109 | Nocturne | −0.38 | −1.00 | −1.00 | +1.00 | −0.46 | – | +0.54 |
| 110 | Zilean | −0.39 | −1.00 | −1.00 | +1.00 | −0.45 | +0.00 | −0.52 |
| 111 | Morgana | −0.40 | −1.00 | −1.00 | +1.00 | +0.06 | −0.96 | −0.33 |
| 112 | Shaco | −0.41 | −1.00 | −1.00 | +1.00 | −0.34 | – | −0.34 |
| 113 | Vel'Koz | −0.41 | −1.00 | −1.00 | +0.77 | −0.20 | −0.32 | −0.10 |
| 114 | Rumble | −0.44 | −1.00 | −1.00 | +0.92 | −0.40 | – | −0.34 |
| 115 | Draven | −0.45 | −1.00 | −1.00 | +1.00 | −0.20 | −1.00 | −0.38 |
| 116 | Caitlyn | −0.64 | −0.07 | −1.00 | −1.00 | −0.37 | −0.91 | −0.51 |
| 117 | Jinx | −0.68 | −1.00 | −1.00 | −0.77 | −0.37 | +0.61 | −0.56 |
| 118 | Kalista | −0.74 | −0.97 | −0.89 | −1.00 | −0.35 | +0.01 | −0.45 |
| 119 | Singed | −0.75 | −1.00 | −0.84 | −1.00 | +0.03 | – | −0.29 |
| 120 | Aurelion Sol | −0.75 | −1.00 | −1.00 | −1.00 | +0.46 | −1.00 | −0.43 |
| 121 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.17 |
| 122 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.23 |
| 123 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.10 |
| 124 | Milio | −0.80 | −1.00 | −1.00 | −1.00 | +0.19 | −0.98 | −0.65 |
| 125 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.20 |
| 126 | Zoe | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.40 |
| 127 | Senna | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.35 |
| 128 | Nidalee | −0.83 | −1.00 | −1.00 | −0.73 | −0.35 | −1.00 | −0.56 |
| 129 | Blitzcrank | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.11 |
| 130 | LeBlanc | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.52 |
| 131 | Ahri | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.10 |
| 132 | Nunu & Willump | −0.84 | −1.00 | −1.00 | −1.00 | −0.34 | – | −0.04 |
| 133 | Kha'Zix | −0.85 | −1.00 | −1.00 | −1.00 | −0.47 | – | +0.17 |
| 134 | Ziggs | −0.85 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.32 |
| 135 | Naafiri | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | – | −0.18 |
| 136 | Lillia | −0.85 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.31 |
| 137 | Locke | −0.85 | −1.00 | −1.00 | −1.00 | −0.45 | – | −0.02 |
| 138 | Leona | −0.85 | −1.00 | −1.00 | −1.00 | −0.39 | – | −0.21 |
| 139 | Nautilus | −0.86 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | −0.12 |
| 140 | Taliyah | −0.86 | −1.00 | −1.00 | −1.00 | −0.32 | −1.00 | −0.19 |
| 141 | Karthus | −0.86 | −1.00 | −1.00 | −1.00 | −0.32 | −1.00 | −0.22 |
| 142 | Twitch | −0.86 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | −0.32 |
| 143 | Hwei | −0.86 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | −0.22 |
| 144 | Qiyana | −0.86 | −1.00 | −1.00 | −1.00 | −0.38 | – | −0.34 |
| 145 | Annie | −0.86 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | −0.17 |
| 146 | Evelynn | −0.86 | −1.00 | −1.00 | −1.00 | −0.34 | – | −0.48 |
| 147 | Mel | −0.86 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | −0.08 |
| 148 | Galio | −0.86 | −1.00 | −1.00 | −1.00 | −0.36 | – | −0.47 |
| 149 | Briar | −0.86 | −1.00 | −1.00 | −1.00 | −0.36 | – | −0.49 |
| 150 | Zyra | −0.86 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | −0.28 |
| 151 | Xayah | −0.87 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | −0.13 |
| 152 | Ryze | −0.87 | −1.00 | −1.00 | −1.00 | −0.40 | −1.00 | −0.13 |
| 153 | Talon | −0.87 | −1.00 | −1.00 | −1.00 | −0.45 | – | −0.23 |
| 154 | Zed | −0.87 | −1.00 | −1.00 | −1.00 | −0.48 | – | −0.19 |
| 155 | Vladimir | −0.87 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | −0.27 |
| 156 | Lissandra | −0.87 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | −0.12 |
| 157 | Viktor | −0.88 | −1.00 | −1.00 | −1.00 | −0.41 | −1.00 | −0.29 |
| 158 | Sona | −0.88 | −1.00 | −1.00 | −1.00 | −0.42 | −1.00 | −0.28 |
| 159 | Nami | −0.88 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | −0.45 |
| 160 | Janna | −0.88 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | −0.76 |
| 161 | Katarina | −0.88 | −1.00 | −1.00 | −1.00 | −0.48 | – | −0.39 |
| 162 | Lux | −0.88 | −1.00 | −1.00 | −1.00 | −0.40 | −1.00 | −0.39 |
| 163 | Aurora | −0.88 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | −0.31 |
| 164 | Ekko | −0.88 | −1.00 | −1.00 | −1.00 | −0.43 | – | −0.57 |
| 165 | Bard | −0.88 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | −0.60 |
| 166 | Sivir | −0.89 | −1.00 | −1.00 | −1.00 | −0.46 | −1.00 | −0.35 |
| 167 | Renata Glasc | −0.89 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | −0.60 |
| 168 | Seraphine | −0.89 | −1.00 | −1.00 | −1.00 | −0.42 | −1.00 | −0.59 |
| 169 | Soraka | −0.90 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | −0.41 |
| 170 | Thresh | −0.91 | −1.00 | −1.00 | −1.00 | −0.41 | −1.00 | −0.91 |
| 171 | Yuumi | −0.91 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | −0.71 |
| 172 | Pyke | −0.92 | −1.00 | −1.00 | −1.00 | −0.51 | −1.00 | −0.84 |

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
