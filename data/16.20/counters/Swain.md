# Counters to Swain (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Swain: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Swain wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Swain --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Nasus | +0.83 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +1.00 |
| 2 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +1.00 |
| 3 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +1.00 |
| 4 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.62 |
| 5 | Sylas | +0.81 | +1.00 | +0.95 | +0.99 | +0.22 | +0.95 | +0.00 |
| 6 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 7 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 8 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 9 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 10 | Lee Sin | +0.80 | +0.98 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 11 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 12 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 13 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 14 | Kayle | +0.79 | +0.98 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 15 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 16 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 17 | Mordekaiser | +0.79 | +1.00 | +0.97 | +0.98 | −0.01 | +0.97 | +0.00 |
| 18 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 19 | Gangplank | +0.78 | +0.99 | +0.96 | +1.00 | +0.01 | +0.96 | +0.00 |
| 20 | Darius | +0.78 | +1.00 | +1.00 | +0.94 | −0.07 | +1.00 | +0.00 |
| 21 | Sett | +0.78 | +0.95 | +1.00 | +0.98 | −0.04 | +1.00 | +0.00 |
| 22 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 23 | Corki | +0.77 | +1.00 | +1.00 | +0.84 | +0.19 | – | +0.00 |
| 24 | Poppy | +0.77 | +1.00 | +1.00 | +0.78 | +0.12 | +1.00 | +0.00 |
| 25 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 26 | Lulu | +0.77 | +0.97 | +0.97 | +1.00 | +0.02 | – | +0.00 |
| 27 | Wukong | +0.77 | +1.00 | +0.92 | +1.00 | −0.03 | +0.92 | +0.00 |
| 28 | Zeri | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 29 | Fizz | +0.76 | +0.91 | +0.95 | +1.00 | +0.02 | +0.95 | +0.00 |
| 30 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 31 | Vi | +0.76 | +1.00 | +1.00 | +0.93 | −0.19 | +1.00 | +0.00 |
| 32 | Rumble | +0.75 | +0.92 | +0.96 | +1.00 | −0.08 | +0.96 | +0.00 |
| 33 | Ambessa | +0.74 | +0.94 | +0.95 | +0.95 | −0.10 | +0.95 | +0.00 |
| 34 | Aphelios | +0.74 | +1.00 | +1.00 | +0.88 | −0.07 | – | +0.00 |
| 35 | Teemo | +0.73 | +0.92 | +0.93 | +1.00 | −0.05 | – | +0.00 |
| 36 | Yorick | +0.68 | +0.53 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 37 | Master Yi | +0.66 | +0.61 | +1.00 | +0.61 | −0.03 | +1.00 | +0.81 |
| 38 | Jayce | +0.62 | +1.00 | +1.00 | +1.00 | −0.04 | −0.75 | +0.00 |
| 39 | Cho'Gath | +0.61 | +0.63 | +0.78 | +0.99 | −0.10 | +0.78 | +0.00 |
| 40 | Gnar | +0.56 | +0.67 | +0.91 | +1.00 | −0.13 | −0.15 | +0.00 |
| 41 | Smolder | +0.55 | +0.53 | +0.78 | +0.79 | +0.08 | – | +0.00 |
| 42 | Aatrox | +0.54 | +0.66 | +0.66 | +0.90 | −0.21 | +0.66 | +0.00 |
| 43 | Warwick | +0.53 | +0.92 | +0.94 | −0.04 | −0.15 | +0.94 | +0.00 |
| 44 | Xin Zhao | +0.52 | +0.68 | +0.41 | +1.00 | +0.04 | +0.41 | +0.00 |
| 45 | Yunara | +0.52 | +0.35 | +0.83 | +0.92 | −0.11 | – | +0.00 |
| 46 | Viego | +0.51 | −0.10 | +0.99 | +1.00 | −0.08 | +0.99 | +0.00 |
| 47 | Malphite | +0.48 | +0.71 | +0.51 | +0.66 | −0.07 | +0.51 | +0.00 |
| 48 | Bel'Veth | +0.46 | +1.00 | +0.07 | +1.00 | −0.07 | +0.07 | +0.00 |
| 49 | Gwen | +0.46 | −0.27 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 50 | Renekton | +0.45 | +0.49 | +0.49 | +0.86 | −0.12 | +0.49 | +0.00 |
| 51 | Riven | +0.41 | +0.93 | −0.00 | +1.00 | −0.13 | −0.00 | +0.00 |
| 52 | Kled | +0.40 | +1.00 | +0.99 | −0.98 | −0.03 | +0.99 | +0.00 |
| 53 | Olaf | +0.30 | +1.00 | −0.38 | +1.00 | −0.09 | −0.38 | +0.00 |
| 54 | Sejuani | +0.28 | +0.23 | +0.93 | −0.49 | −0.03 | +0.93 | +0.00 |
| 55 | Kayn | +0.28 | +0.23 | +0.26 | +0.80 | −0.19 | +0.26 | +0.00 |
| 56 | Briar | +0.27 | −1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 57 | Quinn | +0.25 | +0.15 | +0.49 | +0.39 | −0.06 | – | +0.00 |
| 58 | Aurora | +0.24 | −0.33 | +0.49 | +0.89 | −0.01 | – | +0.00 |
| 59 | Twisted Fate | +0.23 | −0.59 | +0.69 | +1.00 | −0.09 | – | +0.00 |
| 60 | Kog'Maw | +0.23 | +0.15 | −0.04 | +0.98 | −0.10 | – | +0.00 |
| 61 | Graves | +0.22 | +0.62 | −0.00 | +0.30 | −0.00 | −0.00 | +0.00 |
| 62 | Varus | +0.17 | −0.80 | +0.70 | +0.99 | −0.11 | – | +0.00 |
| 63 | Sion | +0.15 | +0.85 | −0.04 | −0.18 | −0.09 | −0.04 | +0.00 |
| 64 | Draven | +0.14 | −0.77 | +0.52 | +1.00 | −0.10 | – | +0.00 |
| 65 | Orianna | +0.13 | +0.64 | +0.64 | −1.00 | −0.04 | – | +0.00 |
| 66 | Irelia | +0.13 | +0.90 | −0.19 | −0.16 | +0.00 | −0.19 | +0.00 |
| 67 | Diana | +0.08 | +0.09 | +0.09 | +0.09 | +0.05 | +0.09 | +0.00 |
| 68 | Jhin | +0.05 | +0.21 | −0.88 | +1.00 | +0.06 | – | +0.00 |
| 69 | Xayah | +0.03 | +0.24 | +0.71 | −0.99 | −0.07 | – | +0.00 |
| 70 | Singed | +0.00 | −0.01 | −0.00 | +0.04 | −0.02 | −0.00 | +0.00 |
| 71 | Gragas | −0.02 | +0.04 | +0.04 | −0.10 | −0.13 | +0.04 | +0.00 |
| 72 | Ashe | −0.05 | −0.49 | −0.23 | +0.75 | −0.12 | – | +0.00 |
| 73 | Kai'Sa | −0.06 | −1.00 | +0.04 | +1.00 | −0.09 | – | +0.00 |
| 74 | Annie | −0.06 | −0.11 | −0.06 | −0.02 | −0.03 | −0.09 | +0.00 |
| 75 | Akshan | −0.06 | −0.03 | −0.07 | −0.08 | −0.10 | – | +0.00 |
| 76 | Rek'Sai | −0.07 | −0.08 | −0.09 | −0.08 | −0.04 | −0.09 | +0.00 |
| 77 | Zac | −0.08 | −0.02 | −0.15 | +0.02 | −0.15 | −0.15 | +0.00 |
| 78 | Tahm Kench | −0.08 | −0.12 | −0.12 | −0.02 | −0.04 | −0.12 | +0.00 |
| 79 | Braum | −0.09 | −0.12 | −0.12 | −0.06 | −0.06 | −0.12 | +0.00 |
| 80 | Rell | −0.11 | −0.13 | −0.19 | −0.11 | +0.10 | −0.19 | +0.00 |
| 81 | Nilah | −0.11 | +0.19 | +0.16 | −0.96 | −0.16 | +0.16 | +0.00 |
| 82 | Shen | −0.13 | −0.21 | −0.16 | −0.05 | −0.06 | −0.16 | +0.00 |
| 83 | Amumu | −0.13 | −0.14 | −0.15 | −0.22 | −0.01 | −0.15 | +0.00 |
| 84 | Urgot | −0.13 | −0.25 | −0.16 | −0.03 | −0.04 | −0.16 | +0.00 |
| 85 | Leona | −0.13 | −0.16 | −0.16 | −0.14 | −0.06 | −0.16 | +0.00 |
| 86 | Taric | −0.14 | −0.14 | −0.19 | −0.20 | +0.02 | −0.19 | +0.00 |
| 87 | Akali | −0.16 | −0.21 | −0.12 | −0.26 | −0.07 | −0.12 | +0.00 |
| 88 | Kennen | −0.17 | −0.30 | −0.99 | +0.88 | −0.03 | – | +0.00 |
| 89 | Yone | −0.19 | +1.00 | −0.81 | −0.67 | −0.12 | −0.81 | +0.00 |
| 90 | Nunu & Willump | −0.21 | −0.21 | −0.32 | −0.26 | +0.07 | −0.32 | +0.00 |
| 91 | Ornn | −0.22 | −0.28 | −0.29 | −0.19 | −0.05 | −0.29 | +0.00 |
| 92 | Tristana | −0.24 | −0.43 | −0.27 | −0.86 | +0.02 | +1.00 | +0.00 |
| 93 | Rengar | −0.26 | −0.98 | −1.00 | +0.52 | +0.25 | +0.95 | +0.00 |
| 94 | Anivia | −0.27 | −0.32 | −0.31 | −0.32 | −0.12 | – | +0.00 |
| 95 | Nocturne | −0.27 | +1.00 | −0.90 | −0.91 | −0.14 | −0.90 | +0.00 |
| 96 | Alistar | −0.29 | −0.41 | −0.31 | −0.41 | +0.02 | −0.31 | +0.00 |
| 97 | Lillia | −0.29 | −0.33 | −1.00 | +0.78 | −0.11 | −1.00 | +0.00 |
| 98 | Skarner | −0.31 | +0.76 | −0.98 | −0.74 | −0.10 | −0.98 | +0.00 |
| 99 | Heimerdinger | −0.32 | −1.00 | −1.00 | +1.00 | +0.08 | – | +0.00 |
| 100 | Samira | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 101 | Kindred | −0.34 | −1.00 | −0.94 | +1.00 | −0.14 | – | +0.00 |
| 102 | Karthus | −0.38 | −0.47 | −0.48 | −0.46 | −0.06 | – | +0.00 |
| 103 | Kha'Zix | −0.38 | −0.47 | −0.48 | −0.47 | −0.01 | −0.48 | +0.00 |
| 104 | Kalista | −0.39 | −0.25 | −0.41 | −0.88 | −0.08 | – | +0.00 |
| 105 | Illaoi | −0.40 | −0.78 | −1.00 | +0.80 | −0.11 | −1.00 | +0.00 |
| 106 | Vladimir | −0.45 | −0.44 | −0.41 | −0.85 | −0.12 | – | +0.00 |
| 107 | Galio | −0.45 | +0.36 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 108 | Milio | −0.58 | −0.89 | −1.00 | −0.30 | +0.08 | – | +0.00 |
| 109 | Seraphine | −0.58 | −0.51 | −0.74 | −1.00 | −0.07 | – | +0.00 |
| 110 | Rakan | −0.61 | −1.00 | −1.00 | −0.12 | +0.10 | −1.00 | +0.00 |
| 111 | Zoe | −0.65 | −0.77 | −0.76 | −1.00 | −0.02 | – | +0.00 |
| 112 | Lucian | −0.67 | −0.55 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 113 | Hwei | −0.68 | −0.71 | −0.96 | −0.92 | −0.07 | – | +0.00 |
| 114 | Ekko | −0.70 | −1.00 | −0.67 | −1.00 | −0.07 | −0.67 | +0.00 |
| 115 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.28 | – | +0.00 |
| 116 | Zilean | −0.75 | −0.92 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 117 | Neeko | −0.76 | −0.93 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 118 | Vel'Koz | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 119 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 120 | Malzahar | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 121 | Soraka | −0.78 | −0.95 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 122 | Elise | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 123 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 124 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 125 | Twitch | −0.78 | −1.00 | −0.94 | −1.00 | −0.11 | – | +0.00 |
| 126 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 127 | Sona | −0.78 | −1.00 | −0.98 | −1.00 | −0.05 | – | +0.00 |
| 128 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 129 | Azir | −0.78 | −1.00 | −1.00 | −0.96 | −0.08 | – | +0.00 |
| 130 | Morgana | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 131 | Kassadin | −0.78 | −1.00 | −1.00 | −0.84 | −0.11 | −1.00 | +0.00 |
| 132 | Ezreal | −0.78 | −1.00 | −0.99 | −1.00 | −0.05 | – | +0.00 |
| 133 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 134 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 135 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 136 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 137 | Jinx | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 138 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 139 | Karma | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 140 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 141 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 142 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 143 | Brand | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 144 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 145 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 146 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 147 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 148 | Caitlyn | −0.79 | −1.00 | −0.95 | −1.00 | −0.05 | −1.00 | +0.00 |
| 149 | Nidalee | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 150 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 151 | Rammus | −0.80 | −0.96 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 152 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 153 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 154 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 155 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 156 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 157 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 158 | Miss Fortune | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 159 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 160 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 161 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 162 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 163 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 164 | Jarvan IV | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 165 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 166 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 167 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 168 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 169 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 170 | Zed | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 171 | Pantheon | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
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
