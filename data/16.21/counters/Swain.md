# Counters to Swain (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Swain: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Swain wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Swain --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 2 | Nasus | +0.83 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +1.00 |
| 3 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +1.00 |
| 4 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +1.00 |
| 5 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 6 | Xin Zhao | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 7 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 8 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 9 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 10 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 11 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 12 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 13 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 14 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 15 | Sylas | +0.80 | +1.00 | +0.97 | +1.00 | +0.07 | +0.97 | +0.00 |
| 16 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 17 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 18 | Wukong | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 19 | Viego | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 20 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 21 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 22 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 23 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 24 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 25 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 26 | Sett | +0.79 | +0.98 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 27 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +0.99 | +0.00 |
| 28 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 29 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 30 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 31 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 32 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 33 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 34 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 35 | Vi | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 36 | Ambessa | +0.77 | +0.96 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 37 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 38 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 39 | Aatrox | +0.77 | +0.99 | +1.00 | +0.98 | −0.19 | +1.00 | +0.00 |
| 40 | Lulu | +0.76 | +0.97 | +0.97 | +1.00 | +0.01 | – | +0.00 |
| 41 | Zeri | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 42 | Teemo | +0.75 | +0.97 | +0.97 | +1.00 | −0.04 | – | +0.00 |
| 43 | Master Yi | +0.75 | +0.81 | +1.00 | +0.81 | −0.03 | +1.00 | +0.81 |
| 44 | Yorick | +0.75 | +0.78 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 45 | Riven | +0.74 | +1.00 | +0.90 | +1.00 | −0.16 | +0.90 | +0.00 |
| 46 | Warwick | +0.74 | +0.95 | +0.95 | +0.95 | −0.15 | +0.95 | +0.00 |
| 47 | Renekton | +0.73 | +0.94 | +0.94 | +0.91 | −0.09 | +0.94 | +0.00 |
| 48 | Ashe | +0.71 | +0.80 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 49 | Rumble | +0.71 | +0.92 | +0.84 | +1.00 | −0.11 | +0.84 | +0.00 |
| 50 | Yunara | +0.69 | +0.75 | +0.98 | +0.99 | −0.07 | – | +0.00 |
| 51 | Gnar | +0.68 | +0.99 | +0.99 | +1.00 | −0.10 | +0.01 | +0.00 |
| 52 | Sejuani | +0.67 | +0.88 | +0.91 | +0.67 | −0.03 | +0.91 | +0.00 |
| 53 | Kai'Sa | +0.64 | +0.56 | +0.97 | +1.00 | −0.05 | – | +0.00 |
| 54 | Malphite | +0.62 | +0.61 | +0.97 | +0.67 | −0.02 | +0.97 | +0.00 |
| 55 | Twisted Fate | +0.62 | +0.80 | +0.69 | +1.00 | −0.08 | – | +0.00 |
| 56 | Smolder | +0.62 | +0.60 | +0.78 | +1.00 | +0.08 | – | +0.00 |
| 57 | Irelia | +0.56 | +1.00 | +0.32 | +0.96 | +0.00 | +0.32 | +0.00 |
| 58 | Cho'Gath | +0.51 | +1.00 | +0.22 | +1.00 | −0.09 | +0.22 | +0.00 |
| 59 | Quinn | +0.49 | +0.56 | +0.51 | +0.88 | +0.00 | – | +0.00 |
| 60 | Draven | +0.47 | +0.07 | +0.86 | +1.00 | −0.07 | – | +0.00 |
| 61 | Bel'Veth | +0.47 | +1.00 | +0.07 | +1.00 | −0.06 | +0.07 | +0.05 |
| 62 | Sion | +0.46 | +1.00 | +0.70 | −0.09 | −0.11 | +0.70 | +0.00 |
| 63 | Yone | +0.44 | +1.00 | +0.00 | +1.00 | −0.04 | +0.00 | +0.00 |
| 64 | Graves | +0.43 | +1.00 | +0.12 | +0.58 | +0.12 | +0.12 | +0.00 |
| 65 | Briar | +0.42 | −0.40 | +1.00 | +1.00 | −0.24 | +1.00 | +0.00 |
| 66 | Kled | +0.39 | +1.00 | +1.00 | −1.00 | −0.04 | +1.00 | +0.00 |
| 67 | Orianna | +0.32 | +0.65 | +0.65 | −0.16 | −0.04 | – | +0.00 |
| 68 | Aurora | +0.30 | −0.26 | +0.63 | +0.89 | +0.02 | – | +0.00 |
| 69 | Kalista | +0.27 | +0.86 | −0.16 | +0.40 | −0.06 | – | +0.00 |
| 70 | Nilah | +0.27 | +0.79 | +0.79 | −0.96 | −0.10 | +0.79 | +0.00 |
| 71 | Xayah | +0.24 | +0.78 | +0.77 | −0.80 | −0.09 | – | +0.00 |
| 72 | Diana | +0.17 | +0.17 | +0.23 | +0.17 | +0.08 | +0.23 | +0.00 |
| 73 | Varus | +0.15 | −0.39 | +0.91 | +0.08 | −0.05 | – | +0.00 |
| 74 | Zac | +0.12 | +0.16 | +0.14 | +0.21 | −0.09 | +0.14 | +0.00 |
| 75 | Skarner | +0.10 | +0.99 | −0.90 | +0.85 | −0.04 | −0.90 | +0.00 |
| 76 | Braum | +0.08 | −0.01 | +0.22 | +0.08 | −0.06 | +0.22 | +0.00 |
| 77 | Caitlyn | +0.02 | +0.97 | −0.41 | −0.91 | −0.00 | +0.61 | +0.00 |
| 78 | Gragas | +0.01 | +0.04 | +0.07 | −0.03 | −0.13 | +0.07 | +0.00 |
| 79 | Kennen | +0.00 | +0.13 | −0.42 | +0.35 | +0.04 | – | +0.00 |
| 80 | Singed | +0.00 | −0.02 | +0.01 | +0.05 | −0.02 | +0.01 | +0.00 |
| 81 | Kayn | −0.01 | −0.64 | −0.02 | +0.91 | −0.19 | −0.02 | +0.00 |
| 82 | Jhin | −0.02 | +0.19 | −0.43 | +0.15 | +0.11 | – | +0.00 |
| 83 | Taric | −0.02 | −0.04 | −0.03 | −0.00 | +0.02 | −0.03 | +0.00 |
| 84 | Rek'Sai | −0.02 | −0.03 | −0.02 | −0.03 | −0.04 | −0.02 | +0.00 |
| 85 | Rakan | −0.04 | −0.99 | +0.61 | −0.13 | +0.10 | +0.61 | +0.00 |
| 86 | Tahm Kench | −0.05 | −0.06 | −0.08 | −0.01 | −0.04 | −0.08 | +0.00 |
| 87 | Akshan | −0.06 | −0.03 | −0.07 | −0.08 | −0.08 | – | +0.00 |
| 88 | Rell | −0.07 | −0.08 | −0.14 | −0.10 | +0.12 | −0.14 | +0.00 |
| 89 | Urgot | −0.08 | −0.19 | −0.09 | +0.04 | −0.04 | −0.09 | +0.00 |
| 90 | Pantheon | −0.08 | +0.26 | −0.94 | +1.00 | −0.13 | −0.94 | +0.00 |
| 91 | Leona | −0.09 | −0.07 | −0.12 | −0.11 | −0.05 | −0.12 | +0.00 |
| 92 | Shen | −0.12 | −0.16 | −0.15 | −0.11 | −0.04 | −0.15 | +0.00 |
| 93 | Alistar | −0.14 | −0.26 | −0.10 | −0.19 | +0.02 | −0.10 | +0.00 |
| 94 | Ornn | −0.14 | −0.11 | −0.20 | −0.12 | −0.10 | −0.20 | +0.00 |
| 95 | Akali | −0.15 | −0.23 | −0.10 | −0.26 | −0.07 | −0.10 | +0.00 |
| 96 | Nunu & Willump | −0.18 | −0.16 | −0.27 | −0.20 | −0.06 | −0.27 | +0.00 |
| 97 | Annie | −0.24 | −0.51 | −0.15 | −0.19 | +0.01 | −0.41 | +0.00 |
| 98 | Illaoi | −0.25 | −0.28 | −1.00 | +0.89 | −0.06 | −1.00 | +0.00 |
| 99 | Rengar | −0.25 | −0.98 | −1.00 | +0.52 | +0.29 | +0.95 | +0.00 |
| 100 | Anivia | −0.27 | −0.30 | −0.32 | −0.34 | −0.12 | – | +0.00 |
| 101 | Amumu | −0.27 | −0.08 | −0.63 | −0.17 | −0.00 | −0.63 | +0.00 |
| 102 | Lillia | −0.28 | −0.31 | −1.00 | +0.79 | −0.07 | −1.00 | +0.00 |
| 103 | Kindred | −0.33 | −1.00 | −0.94 | +1.00 | −0.09 | – | +0.00 |
| 104 | Samira | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 105 | Tristana | −0.34 | −0.41 | −0.68 | −0.65 | +0.18 | +0.34 | +0.00 |
| 106 | Karthus | −0.35 | −0.48 | −0.43 | −0.43 | −0.03 | – | +0.00 |
| 107 | Twitch | −0.48 | −0.35 | −0.72 | −0.78 | −0.03 | – | +0.00 |
| 108 | Neeko | −0.50 | −0.79 | −0.24 | −1.00 | +0.02 | – | +0.00 |
| 109 | Heimerdinger | −0.54 | −1.00 | −1.00 | +0.03 | +0.08 | – | +0.00 |
| 110 | Rammus | −0.55 | −0.01 | −0.96 | −1.00 | −0.05 | −0.96 | +0.00 |
| 111 | Milio | −0.57 | −0.87 | −1.00 | −0.27 | +0.07 | – | +0.00 |
| 112 | Ezreal | −0.59 | −0.59 | −0.83 | −0.88 | −0.02 | – | +0.00 |
| 113 | Vladimir | −0.62 | −0.86 | −0.53 | −0.98 | −0.10 | – | +0.00 |
| 114 | Zilean | −0.63 | −0.92 | −0.58 | −1.00 | +0.04 | – | +0.00 |
| 115 | Lucian | −0.67 | −0.55 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 116 | Hwei | −0.68 | −0.71 | −0.94 | −0.92 | −0.07 | – | +0.00 |
| 117 | Ekko | −0.68 | −1.00 | −0.62 | −1.00 | −0.07 | −0.62 | +0.00 |
| 118 | Zoe | −0.69 | −0.85 | −0.83 | −1.00 | −0.02 | – | +0.00 |
| 119 | Azir | −0.70 | −1.00 | −1.00 | −0.61 | −0.06 | – | +0.00 |
| 120 | Seraphine | −0.72 | −1.00 | −0.75 | −1.00 | −0.06 | – | +0.00 |
| 121 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.28 | – | +0.00 |
| 122 | Elise | −0.76 | −0.96 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 123 | Vel'Koz | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 124 | Kha'Zix | −0.76 | −0.98 | −0.92 | −0.98 | −0.01 | −0.92 | +0.00 |
| 125 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 126 | Soraka | −0.77 | −0.95 | −0.97 | −1.00 | −0.09 | – | +0.00 |
| 127 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 128 | Malzahar | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 129 | Karma | −0.77 | −1.00 | −0.95 | −1.00 | −0.07 | – | +0.00 |
| 130 | Jinx | −0.78 | −0.98 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 131 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 132 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 133 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 134 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 135 | Brand | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 136 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 137 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 138 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 139 | Morgana | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 140 | Sona | −0.79 | −1.00 | −0.98 | −1.00 | −0.08 | – | +0.00 |
| 141 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 142 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 143 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 144 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 145 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 146 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 147 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 148 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 149 | Fiddlesticks | −0.79 | −1.00 | −0.99 | −1.00 | −0.10 | – | +0.00 |
| 150 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 151 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 152 | Miss Fortune | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 153 | Nidalee | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 154 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 155 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 156 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 157 | Bard | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 158 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 159 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 160 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 161 | Shaco | −0.80 | −1.00 | −0.97 | −1.00 | −0.10 | −0.97 | +0.00 |
| 162 | Blitzcrank | −0.80 | −0.99 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 163 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 164 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 165 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 166 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 167 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 168 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 169 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 170 | Kassadin | −0.81 | −1.00 | −0.98 | −1.00 | −0.14 | −0.98 | +0.00 |
| 171 | Zed | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Swain's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Swain's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Swain` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.02)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Swain's Nevermove. Untargetable for 0.75 s; Nevermove takes 1.01 s to land, enough to react. (Fizz E Playful → Swain E Nevermove)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Swain's Demonflare. Untargetable for 0.75 s; Demonflare takes 0.25 s to land, enough to react. (Fizz E Playful → Swain R Demonflare)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Swain's Demonic Ascension. Untargetable for 0.75 s; Demonic Ascension takes 0.5 s to land, enough to react. (Fizz E Playful → Swain R Demonic Ascension)
- Watch out: Swain's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 2. Maokai (net +0.89)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Swain's Nevermove. Untargetable for 1.4 s; Nevermove takes 1.01 s to land, enough to react. (Maokai W Twisted Advance → Swain E Nevermove)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Swain's Demonic Ascension. Untargetable for 1.4 s; Demonic Ascension takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Swain R Demonic Ascension)
- **0.48** untargetable: Twisted Advance makes Maokai untargetable, dodging Swain's Demonflare. Untargetable for 1.4 s; Demonflare takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Swain R Demonflare)
- Watch out: Swain's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

#### 3. Kayle (net +0.85)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Swain's Demonic Ascension. Invulnerable for 2.5 s, long enough to use ahead of Demonic Ascension. (Kayle R Divine Judgment → Swain R Demonic Ascension)
- **0.18** range: Kayle's basic attacks reach 100 units farther than Swain's (625 vs 525 attack range). Swain has no dash or blink to close the gap. (Kayle basic attacks → Swain basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Swain's Nevermove (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Nevermove. (Kayle R Divine Judgment → Swain E Nevermove)

#### 4. Braum (net +0.84)

- **0.70** projectile block: Unbreakable blocks Swain's Nevermove, a projectile. Unbreakable for 4 s, long enough to use ahead of Nevermove. (Braum E Unbreakable → Swain E Nevermove)
- **0.55** projectile block: Unbreakable blocks Swain's Demonflare, a projectile. Unbreakable for 4 s, long enough to use ahead of Demonflare. (Braum E Unbreakable → Swain R Demonflare)
- **0.29** projectile block: Unbreakable blocks Swain's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Swain basic attacks)
- Watch out: Swain's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 5. Fiora (net +0.82)

- **0.64** parry: Riposte parries Swain's Nevermove and stuns back. Parry for 0.75 s; Nevermove takes 1.01 s to land, enough to react. Negating Nevermove's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Swain E Nevermove)
- **0.55** parry: Riposte parries Swain's Demonic Ascension. Parry for 0.75 s; Demonic Ascension takes 0.5 s to land, enough to react. (Fiora W Riposte → Swain R Demonic Ascension)
- **0.39** parry: Riposte parries Swain's Demonflare. Parry for 0.75 s; Demonflare takes 0.25 s to land, enough to react. (Fiora W Riposte → Swain R Demonflare)
- Watch out: Swain's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

#### 6. Aurora (net +0.78)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Swain's Demonic Ascension. Untargetable for 0.4 s; Demonic Ascension takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Swain R Demonic Ascension)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Swain's Nevermove. Untargetable for 0.4 s; Nevermove takes 1.01 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Swain E Nevermove)
- **0.25** untargetable: Between Worlds makes Aurora untargetable, dodging Swain's Demonflare. Untargetable for 0.4 s; Demonflare takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Swain R Demonflare)

#### 7. Bard (net +0.78)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Swain's Demonic Ascension. Untargetable for 2.5 s, long enough to use ahead of Demonic Ascension. (Bard R Tempered Fate → Swain R Demonic Ascension)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Swain's Nevermove. Untargetable for 2.5 s, long enough to use ahead of Nevermove. (Bard R Tempered Fate → Swain E Nevermove)
- **0.25** untargetable: Tempered Fate makes Bard untargetable, dodging Swain's Demonflare. Untargetable for 2.5 s, long enough to use ahead of Demonflare. (Bard R Tempered Fate → Swain R Demonflare)

#### 8. Lissandra (net +0.78)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Swain's Demonic Ascension. Untargetable for 2.5 s, long enough to use ahead of Demonic Ascension. (Lissandra R Frozen Tomb → Swain R Demonic Ascension)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Swain's Nevermove. Untargetable for 2.5 s, long enough to use ahead of Nevermove. (Lissandra R Frozen Tomb → Swain E Nevermove)
- **0.25** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Swain's Demonflare. Untargetable for 2.5 s, long enough to use ahead of Demonflare. (Lissandra R Frozen Tomb → Swain R Demonflare)

#### 9. Xayah (net +0.77)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Swain's Demonic Ascension. Untargetable for 1.5 s, long enough to use ahead of Demonic Ascension. (Xayah R Featherstorm → Swain R Demonic Ascension)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Swain's Nevermove. Untargetable for 1.5 s, long enough to use ahead of Nevermove. (Xayah R Featherstorm → Swain E Nevermove)
- **0.25** untargetable: Featherstorm makes Xayah untargetable, dodging Swain's Demonflare. Untargetable for 1.5 s, long enough to use ahead of Demonflare. (Xayah R Featherstorm → Swain R Demonflare)

#### 10. Vladimir (net +0.76)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Swain's Demonic Ascension. Untargetable for 2 s, long enough to use ahead of Demonic Ascension. (Vladimir W Sanguine Pool → Swain R Demonic Ascension)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Swain's Nevermove. Untargetable for 2 s, long enough to use ahead of Nevermove. (Vladimir W Sanguine Pool → Swain E Nevermove)
- **0.39** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Swain's Demonflare. Untargetable for 2 s, long enough to use ahead of Demonflare. (Vladimir W Sanguine Pool → Swain R Demonflare)
- Watch out: Nevermove's airborne interrupts Vladimir's Tides of Blood (charge-up).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.02 | 1.11 | 0.09 |  |
| 2 | Maokai | +0.89 | 1.10 | 0.21 |  |
| 3 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 4 | Braum | +0.84 | 1.05 | 0.21 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Fiora | +0.82 | 1.02 | 0.20 |  |
| 6 | Aurora | +0.78 | 0.78 | 0.00 |  |
| 7 | Bard | +0.78 | 0.78 | 0.00 |  |
| 8 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 9 | Xayah | +0.77 | 0.77 | 0.00 |  |
| 10 | Vladimir | +0.76 | 0.92 | 0.16 |  |
| 11 | Gwen | +0.70 | 0.90 | 0.20 |  |
| 12 | Camille | +0.69 | 0.79 | 0.10 |  |
| 13 | Samira | +0.69 | 0.69 | 0.00 | projectile block (Blade Whirl) |
| 14 | Rek'Sai | +0.67 | 0.79 | 0.12 |  |
| 15 | Yasuo | +0.66 | 0.78 | 0.12 | projectile block (Wind Wall) |
| 16 | Yuumi | +0.65 | 1.11 | 0.46 |  |
| 17 | Evelynn | +0.64 | 0.78 | 0.14 |  |
| 18 | Shaco | +0.64 | 0.78 | 0.14 |  |
| 19 | Mel | +0.64 | 0.64 | 0.00 | projectile block (Rebuttal) |
| 20 | Zed | +0.63 | 0.77 | 0.14 |  |
| 21 | Master Yi | +0.59 | 1.00 | 0.41 |  |
| 22 | Udyr | +0.59 | 0.80 | 0.21 |  |
| 23 | Morgana | +0.54 | 0.62 | 0.08 |  |
| 24 | Sivir | +0.50 | 0.50 | 0.00 |  |
| 25 | Xin Zhao | +0.48 | 0.66 | 0.18 |  |
| 26 | Nocturne | +0.46 | 0.67 | 0.21 |  |
| 27 | Milio | +0.37 | 0.37 | 0.00 |  |
| 28 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 29 | Kled | +0.29 | 0.36 | 0.07 |  |
| 30 | Kalista | +0.29 | 0.29 | 0.00 |  |
| 31 | Teemo | +0.27 | 0.27 | 0.00 |  |
| 32 | Zaahen | +0.26 | 0.38 | 0.12 |  |
| 33 | Kayn | +0.21 | 0.78 | 0.57 |  |
| 34 | Rengar | +0.21 | 0.63 | 0.42 |  |
| 35 | Lulu | +0.19 | 0.19 | 0.00 |  |
| 36 | Varus | +0.17 | 0.28 | 0.11 |  |
| 37 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 38 | Senna | +0.12 | 0.12 | 0.00 |  |
| 39 | Pantheon | +0.11 | 0.73 | 0.62 |  |
| 40 | Gangplank | +0.11 | 0.53 | 0.42 |  |
| 41 | Annie | +0.11 | 0.11 | 0.00 |  |
| 42 | Alistar | +0.10 | 0.31 | 0.21 |  |
| 43 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 44 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 45 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 46 | Vex | +0.07 | 0.07 | 0.00 |  |
| 47 | K'Sante | +0.04 | 0.14 | 0.10 |  |
| 48 | Nilah | +0.03 | 0.19 | 0.16 |  |
| 49 | Jax | +0.01 | 0.22 | 0.21 |  |
| 50 | Singed | 0.00 | 0.42 | 0.42 |  |
| 51 | Malzahar | 0.00 | 0.40 | 0.40 |  |
| 52 | Garen | 0.00 | 0.36 | 0.36 |  |
| 53 | Malphite | 0.00 | 0.21 | 0.21 |  |
| 54 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 55 | Azir | 0.00 | 0.00 | 0.00 |  |
| 56 | Brand | 0.00 | 0.00 | 0.00 |  |
| 57 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 58 | Corki | 0.00 | 0.00 | 0.00 |  |
| 59 | Draven | 0.00 | 0.00 | 0.00 |  |
| 60 | Elise | 0.00 | 0.00 | 0.00 |  |
| 61 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 62 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 63 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 64 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 65 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 66 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 67 | Karma | 0.00 | 0.00 | 0.00 |  |
| 68 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 69 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 70 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 71 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 72 | Lux | 0.00 | 0.00 | 0.00 |  |
| 73 | Nami | 0.00 | 0.00 | 0.00 |  |
| 74 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 75 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 76 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 77 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 78 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 79 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 80 | Sona | 0.00 | 0.00 | 0.00 |  |
| 81 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 82 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 83 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 84 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 85 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 86 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 87 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 88 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 89 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 90 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 91 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 92 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 93 | Jarvan IV | -0.02 | 0.07 | 0.09 |  |
| 94 | Yone | -0.02 | 0.07 | 0.09 |  |
| 95 | Graves | -0.03 | 0.00 | 0.03 |  |
| 96 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 97 | Olaf | -0.04 | 0.38 | 0.42 |  |
| 98 | Hecarim | -0.05 | 0.07 | 0.12 |  |
| 99 | Ornn | -0.05 | 0.07 | 0.12 |  |
| 100 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 101 | Volibear | -0.06 | 0.07 | 0.13 |  |
| 102 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 103 | Rakan | -0.08 | 0.00 | 0.08 |  |
| 104 | Sion | -0.09 | 0.40 | 0.49 |  |
| 105 | Sylas | -0.09 | 0.00 | 0.09 |  |
| 106 | Urgot | -0.09 | 0.00 | 0.09 |  |
| 107 | Briar | -0.10 | 0.00 | 0.10 |  |
| 108 | Lillia | -0.10 | 0.00 | 0.10 |  |
| 109 | Wukong | -0.12 | 0.00 | 0.12 |  |
| 110 | Rell | -0.12 | 0.00 | 0.12 |  |
| 111 | Shyvana | -0.13 | 0.07 | 0.20 |  |
| 112 | Bel'Veth | -0.13 | 0.00 | 0.13 |  |
| 113 | Qiyana | -0.13 | 0.00 | 0.13 |  |
| 114 | Illaoi | -0.14 | 0.07 | 0.21 |  |
| 115 | Sett | -0.14 | 0.07 | 0.21 |  |
| 116 | Akali | -0.14 | 0.00 | 0.14 |  |
| 117 | Ambessa | -0.14 | 0.00 | 0.14 |  |
| 118 | Ekko | -0.14 | 0.00 | 0.14 |  |
| 119 | Lee Sin | -0.14 | 0.00 | 0.14 |  |
| 120 | Riven | -0.14 | 0.00 | 0.14 |  |
| 121 | Talon | -0.14 | 0.00 | 0.14 |  |
| 122 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 123 | Irelia | -0.17 | 0.00 | 0.17 |  |
| 124 | Aatrox | -0.18 | 0.00 | 0.18 |  |
| 125 | Nautilus | -0.18 | 0.00 | 0.18 |  |
| 126 | Tryndamere | -0.18 | 0.00 | 0.18 |  |
| 127 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 128 | Diana | -0.20 | 0.00 | 0.20 |  |
| 129 | Kassadin | -0.20 | 0.00 | 0.20 |  |
| 130 | Sejuani | -0.20 | 0.00 | 0.20 |  |
| 131 | Katarina | -0.21 | 0.28 | 0.49 |  |
| 132 | Nasus | -0.21 | 0.21 | 0.42 |  |
| 133 | Amumu | -0.21 | 0.00 | 0.21 |  |
| 134 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 135 | Leona | -0.21 | 0.00 | 0.21 |  |
| 136 | Locke | -0.21 | 0.00 | 0.21 |  |
| 137 | Renekton | -0.21 | 0.00 | 0.21 |  |
| 138 | Viego | -0.23 | 0.07 | 0.30 |  |
| 139 | Rammus | -0.27 | 0.21 | 0.48 |  |
| 140 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 141 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 142 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 143 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 144 | Pyke | -0.28 | 0.00 | 0.28 |  |
| 145 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 146 | Skarner | -0.29 | 0.10 | 0.39 |  |
| 147 | Mordekaiser | -0.31 | 0.05 | 0.36 |  |
| 148 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 149 | Warwick | -0.33 | 0.46 | 0.79 |  |
| 150 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 151 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 152 | Darius | -0.36 | 0.00 | 0.36 |  |
| 153 | Karthus | -0.36 | 0.00 | 0.36 |  |
| 154 | Trundle | -0.36 | 0.00 | 0.36 |  |
| 155 | Yorick | -0.36 | 0.00 | 0.36 |  |
| 156 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 157 | Shen | -0.38 | 0.21 | 0.59 |  |
| 158 | Taric | -0.39 | 0.00 | 0.39 |  |
| 159 | Janna | -0.40 | 0.00 | 0.40 |  |
| 160 | Poppy | -0.41 | 0.00 | 0.41 |  |
| 161 | Blitzcrank | -0.42 | 0.00 | 0.42 |  |
| 162 | Cho'Gath | -0.42 | 0.00 | 0.42 |  |
| 163 | Dr. Mundo | -0.42 | 0.00 | 0.42 |  |
| 164 | Rumble | -0.42 | 0.00 | 0.42 |  |
| 165 | Vi | -0.45 | 0.07 | 0.52 |  |
| 166 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 167 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 168 | Naafiri | -0.55 | 0.00 | 0.55 |  |
| 169 | Zac | -0.65 | 0.00 | 0.65 |  |
| 170 | Tahm Kench | -0.68 | 0.00 | 0.68 |  |
| 171 | Nunu & Willump | -0.72 | 0.19 | 0.91 |  |
| 172 | Galio | -0.72 | 0.00 | 0.72 |  |
