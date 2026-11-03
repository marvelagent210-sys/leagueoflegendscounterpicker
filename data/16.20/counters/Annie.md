# Counters to Annie (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Annie: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Annie wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Annie --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Aurelion Sol | +0.86 | +1.00 | +1.00 | +1.00 | +0.46 | – | +0.00 |
| 2 | Rengar | +0.85 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.00 |
| 3 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 4 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 5 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 6 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.50 |
| 7 | Azir | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 8 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 9 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 10 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 11 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 12 | Yasuo | +0.79 | +1.00 | +0.99 | +1.00 | −0.04 | +0.95 | +0.00 |
| 13 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 14 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 15 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 16 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 17 | Tristana | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 18 | Dr. Mundo | +0.77 | +0.99 | +0.93 | +1.00 | −0.10 | +1.00 | +0.00 |
| 19 | Lillia | +0.76 | +1.00 | +1.00 | +1.00 | −0.06 | +0.73 | +0.00 |
| 20 | Vayne | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 21 | Sejuani | +0.69 | +0.77 | +0.86 | +1.00 | −0.09 | +1.00 | +0.00 |
| 22 | Rek'Sai | +0.69 | +1.00 | +1.00 | +1.00 | −0.14 | +0.06 | +0.00 |
| 23 | Xin Zhao | +0.68 | +1.00 | +1.00 | +0.87 | −0.18 | +0.29 | +0.00 |
| 24 | Graves | +0.60 | +1.00 | +1.00 | +0.00 | +0.03 | +1.00 | +0.00 |
| 25 | Kayle | +0.60 | +1.00 | +1.00 | −0.01 | +0.30 | – | +0.00 |
| 26 | K'Sante | +0.60 | +1.00 | +1.00 | +1.00 | −0.03 | −1.00 | +0.00 |
| 27 | Ivern | +0.55 | +1.00 | +0.08 | +1.00 | −0.13 | +1.00 | +0.00 |
| 28 | Varus | +0.55 | +1.00 | +1.00 | +0.00 | −0.05 | – | +0.00 |
| 29 | Fizz | +0.53 | +1.00 | +0.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 30 | Gwen | +0.51 | +1.00 | +0.85 | −0.00 | −0.28 | +0.90 | +0.00 |
| 31 | Camille | +0.49 | +1.00 | +1.00 | +0.50 | −0.09 | −1.00 | +0.00 |
| 32 | Rumble | +0.47 | +0.98 | +0.87 | −0.01 | −0.13 | +0.26 | +0.00 |
| 33 | Zaahen | +0.45 | −0.28 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 34 | Shyvana | +0.42 | +0.72 | +1.00 | −0.35 | −0.20 | +0.88 | +0.00 |
| 35 | Sion | +0.41 | −0.03 | +0.66 | +0.99 | −0.12 | +0.73 | +0.00 |
| 36 | Jinx | +0.40 | +1.00 | +1.00 | −1.00 | −0.01 | +1.00 | +0.00 |
| 37 | Garen | +0.39 | +1.00 | +1.00 | +0.00 | −0.09 | −1.00 | +0.00 |
| 38 | Nocturne | +0.38 | +1.00 | +1.00 | +0.00 | −0.15 | −1.00 | +0.00 |
| 39 | Diana | +0.36 | +0.57 | +0.05 | +1.00 | +0.04 | +0.03 | +0.00 |
| 40 | Galio | +0.35 | +0.11 | +0.12 | +1.00 | −0.01 | +1.00 | +0.00 |
| 41 | Caitlyn | +0.35 | +1.00 | +1.00 | −1.00 | +0.11 | – | +0.00 |
| 42 | Aphelios | +0.35 | +1.00 | +1.00 | −1.00 | +0.08 | – | +0.00 |
| 43 | Zac | +0.35 | +0.01 | +1.00 | +0.12 | −0.18 | +1.00 | +0.00 |
| 44 | Ashe | +0.32 | +1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 45 | Anivia | +0.30 | +0.34 | +0.46 | +0.41 | −0.08 | – | +0.00 |
| 46 | Singed | +0.30 | +1.00 | −0.04 | +0.55 | −0.23 | −0.20 | +0.00 |
| 47 | Tryndamere | +0.27 | +1.00 | −1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 48 | Jayce | +0.25 | +0.00 | +0.04 | +1.00 | −0.04 | +0.48 | +0.00 |
| 49 | Tahm Kench | +0.21 | +0.45 | +0.37 | −0.02 | +0.03 | +0.11 | +0.00 |
| 50 | Darius | +0.14 | −0.12 | +0.00 | +1.00 | −0.13 | −0.08 | +0.00 |
| 51 | Maokai | +0.14 | +0.22 | +0.23 | +0.11 | −0.13 | +0.23 | +0.00 |
| 52 | Gnar | +0.12 | +0.09 | −0.52 | +0.99 | −0.06 | +0.38 | +0.00 |
| 53 | Renekton | +0.11 | +0.08 | +0.07 | +0.50 | −0.08 | −0.13 | +0.00 |
| 54 | Rammus | +0.10 | +1.00 | −0.94 | +0.00 | −0.13 | +1.00 | +0.00 |
| 55 | Gragas | +0.08 | +0.03 | +0.02 | +0.12 | −0.13 | +0.65 | +0.00 |
| 56 | Yunara | +0.06 | +0.08 | +0.27 | −0.11 | −0.06 | – | +0.00 |
| 57 | Swain | +0.06 | +0.06 | +0.11 | +0.02 | +0.03 | +0.09 | +0.00 |
| 58 | Sett | +0.05 | −0.01 | −0.10 | +0.54 | −0.10 | −0.14 | +0.00 |
| 59 | Fiddlesticks | −0.00 | −0.17 | +1.00 | −1.00 | −0.01 | −0.11 | +0.00 |
| 60 | Taric | −0.02 | −0.01 | −0.07 | +0.05 | −0.02 | −0.03 | +0.00 |
| 61 | Lulu | −0.03 | −0.09 | +0.08 | −0.11 | −0.01 | – | +0.00 |
| 62 | Nunu & Willump | −0.06 | −0.09 | −0.12 | +0.04 | −0.02 | −0.14 | +0.00 |
| 63 | Master Yi | −0.06 | −1.00 | +1.00 | +0.00 | −0.09 | −1.00 | +1.00 |
| 64 | Shen | −0.07 | −0.05 | −0.17 | −0.11 | −0.03 | +0.07 | +0.00 |
| 65 | Malphite | −0.09 | −0.16 | −0.30 | +0.33 | −0.04 | −0.32 | +0.00 |
| 66 | Alistar | −0.10 | −0.05 | −0.20 | −0.05 | −0.05 | −0.21 | +0.00 |
| 67 | Urgot | −0.10 | −0.14 | −0.07 | −0.11 | −0.04 | −0.21 | +0.00 |
| 68 | Nautilus | −0.12 | −0.24 | −0.05 | +0.31 | −0.02 | −1.00 | +0.00 |
| 69 | Ambessa | −0.12 | −1.00 | +1.00 | +0.00 | −0.13 | −1.00 | +0.00 |
| 70 | Riven | −0.13 | +1.00 | −1.00 | +0.00 | −0.19 | −1.00 | +0.00 |
| 71 | Vladimir | −0.13 | −0.16 | −0.12 | −0.07 | −0.16 | −0.19 | +0.00 |
| 72 | Ornn | −0.14 | −0.14 | −0.20 | −0.13 | −0.06 | −0.22 | +0.00 |
| 73 | Rell | −0.16 | −0.08 | −0.08 | −0.07 | −0.00 | −1.00 | +0.00 |
| 74 | Braum | −0.17 | −0.29 | −0.18 | −0.11 | −0.03 | −0.25 | +0.00 |
| 75 | Bel'Veth | −0.18 | +0.94 | −1.00 | −0.21 | −0.16 | −1.00 | +0.00 |
| 76 | Karthus | −0.18 | −0.23 | −0.17 | −0.25 | −0.06 | −0.24 | +0.00 |
| 77 | Jhin | −0.21 | −0.65 | −0.16 | +0.02 | +0.05 | – | +0.00 |
| 78 | Zyra | −0.22 | −0.03 | +0.06 | −1.00 | −0.01 | – | +0.00 |
| 79 | Zeri | −0.22 | −1.00 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 80 | Heimerdinger | −0.22 | −1.00 | −0.64 | +1.00 | +0.09 | – | +0.00 |
| 81 | Twitch | −0.23 | −1.00 | +1.00 | −1.00 | −0.05 | – | +0.00 |
| 82 | Leona | −0.25 | −0.33 | +0.41 | −1.00 | −0.04 | −0.63 | +0.00 |
| 83 | Senna | −0.25 | −0.06 | −0.01 | −1.00 | −0.05 | – | +0.00 |
| 84 | Mordekaiser | −0.28 | −0.30 | −0.26 | −0.40 | −0.11 | −0.39 | +0.00 |
| 85 | Zoe | −0.30 | −0.40 | −0.35 | −0.39 | −0.04 | – | +0.00 |
| 86 | Vel'Koz | −0.32 | −1.00 | +0.05 | −0.02 | +0.18 | −1.00 | +0.00 |
| 87 | Akshan | −0.32 | +1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 88 | Kennen | −0.33 | −0.45 | +0.14 | −1.00 | −0.17 | – | +0.00 |
| 89 | Briar | −0.35 | −1.00 | −0.71 | +1.00 | −0.14 | −1.00 | +0.00 |
| 90 | Ezreal | −0.35 | −0.31 | −0.22 | −0.91 | −0.02 | – | +0.00 |
| 91 | Wukong | −0.38 | +0.00 | −1.00 | +0.00 | −0.21 | −1.00 | +0.00 |
| 92 | Kalista | −0.39 | +0.69 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 93 | Elise | −0.41 | −1.00 | −1.00 | +0.74 | −0.10 | – | +0.00 |
| 94 | Olaf | −0.41 | −1.00 | −1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 95 | Udyr | −0.43 | −1.00 | −1.00 | +1.00 | −0.17 | −1.00 | +0.00 |
| 96 | Irelia | −0.44 | −0.88 | −0.29 | −0.59 | −0.01 | −0.33 | +0.00 |
| 97 | Illaoi | −0.49 | −0.73 | −0.73 | −0.11 | −0.08 | −0.85 | +0.00 |
| 98 | Hwei | −0.50 | −0.33 | −0.69 | −0.94 | −0.04 | – | +0.00 |
| 99 | Blitzcrank | −0.57 | −0.90 | −0.98 | −0.27 | −0.06 | −0.39 | +0.00 |
| 100 | Rakan | −0.58 | −0.89 | −1.00 | +0.00 | −0.08 | −1.00 | +0.00 |
| 101 | Brand | −0.60 | −0.37 | −0.94 | −1.00 | −0.07 | – | +0.00 |
| 102 | Yone | −0.60 | −1.00 | −0.14 | −1.00 | −0.12 | −1.00 | +0.00 |
| 103 | Vi | −0.61 | −1.00 | −1.00 | +0.00 | −0.05 | −1.00 | +0.00 |
| 104 | Shaco | −0.61 | −1.00 | −1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 105 | Cho'Gath | −0.61 | −1.00 | −1.00 | +0.00 | −0.09 | −1.00 | +0.00 |
| 106 | Kled | −0.62 | −1.00 | −1.00 | +0.00 | −0.16 | −1.00 | +0.00 |
| 107 | Twisted Fate | −0.64 | −1.00 | −0.34 | −1.00 | −0.06 | −1.00 | +0.00 |
| 108 | Corki | −0.66 | −1.00 | −1.00 | −0.51 | +0.03 | – | +0.00 |
| 109 | Skarner | −0.73 | −1.00 | −1.00 | −0.53 | −0.14 | −1.00 | +0.00 |
| 110 | Cassiopeia | −0.74 | −0.85 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 111 | Ziggs | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 112 | Samira | −0.77 | −1.00 | −1.00 | −0.78 | −0.07 | −1.00 | +0.00 |
| 113 | Draven | −0.77 | −1.00 | −0.93 | −1.00 | −0.07 | – | +0.00 |
| 114 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 115 | Volibear | −0.77 | −1.00 | −1.00 | −0.74 | −0.18 | −1.00 | +0.00 |
| 116 | Karma | −0.77 | −1.00 | −0.98 | −0.89 | −0.01 | −1.00 | +0.00 |
| 117 | Soraka | −0.78 | −0.99 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 118 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 119 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 120 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 121 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 122 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 123 | Zilean | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 124 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 125 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 126 | Mel | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 127 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 128 | Milio | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 129 | Janna | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 130 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 131 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 132 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 133 | Neeko | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 134 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 135 | Akali | −0.80 | −1.00 | −0.99 | −0.97 | −0.07 | −1.00 | +0.00 |
| 136 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 137 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 138 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 139 | Orianna | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 140 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 141 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 142 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 143 | Teemo | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 144 | Jarvan IV | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 145 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 146 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 147 | Nidalee | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 148 | Viego | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 149 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 150 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 151 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 152 | Nilah | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 153 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 154 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 155 | Xayah | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 156 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 157 | Quinn | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 158 | Sivir | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 159 | Lucian | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 160 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 161 | Seraphine | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 162 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 163 | Zed | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 164 | Kayn | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 165 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 166 | Pantheon | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 167 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 168 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 169 | Hecarim | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 170 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 171 | Aatrox | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 172 | Bard | −0.84 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Annie's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Annie's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Annie` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +0.85)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Annie's Pyromania. Untargetable for 0.75 s, timed to Pyromania. (Fizz E Playful → Annie I Pyromania)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Annie's Summon: Tibbers. Untargetable for 0.75 s; Summon: Tibbers takes 0.25 s to land, enough to react. (Fizz E Playful → Annie R Summon: Tibbers)
- **0.39** untargetable: Playful makes Fizz untargetable, dodging Annie's Disintegrate. Untargetable for 0.75 s; Disintegrate takes 0.7 s to land, enough to react. (Fizz E Playful → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 450 units farther than Fizz's (625 vs 175 attack range).

#### 2. Maokai (net +0.73)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Annie's Pyromania. Untargetable for 1.4 s, timed to Pyromania. (Maokai W Twisted Advance → Annie I Pyromania)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Annie's Summon: Tibbers. Untargetable for 1.4 s; Summon: Tibbers takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Annie R Summon: Tibbers)
- **0.35** untargetable: Twisted Advance makes Maokai untargetable, dodging Annie's Disintegrate. Untargetable for 1.4 s; Disintegrate takes 0.7 s to land, enough to react. (Maokai W Twisted Advance → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 500 units farther than Maokai's (625 vs 125 attack range).

#### 3. Lissandra (net +0.73)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Annie's Summon: Tibbers. Untargetable for 2.5 s, long enough to use ahead of Summon: Tibbers. (Lissandra R Frozen Tomb → Annie R Summon: Tibbers)
- **0.26** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Annie's Pyromania. Untargetable for 2.5 s, long enough to use ahead of Pyromania. (Lissandra R Frozen Tomb → Annie I Pyromania)
- **0.24** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Annie's Disintegrate. Untargetable for 2.5 s, long enough to use ahead of Disintegrate. (Lissandra R Frozen Tomb → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 75 units farther than Lissandra's (625 vs 550 attack range).

#### 4. Aurora (net +0.73)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Annie's Summon: Tibbers. Untargetable for 0.4 s; Summon: Tibbers takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Annie R Summon: Tibbers)
- **0.25** untargetable: Between Worlds makes Aurora untargetable, dodging Annie's Pyromania. Untargetable for 0.4 s, timed to Pyromania. Does not destroy inbound projectiles. (Aurora R Between Worlds → Annie I Pyromania)
- **0.23** untargetable: Between Worlds makes Aurora untargetable, dodging Annie's Disintegrate. Untargetable for 0.4 s; Disintegrate takes 0.7 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 75 units farther than Aurora's (625 vs 550 attack range).

#### 5. Kayle (net +0.72)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Annie's Summon: Tibbers. Invulnerable for 2.5 s, long enough to use ahead of Summon: Tibbers. (Kayle R Divine Judgment → Annie R Summon: Tibbers)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Annie's Disintegrate. Invulnerable for 2.5 s, long enough to use ahead of Disintegrate. (Kayle R Divine Judgment → Annie Q Disintegrate)
- **0.21** invulnerable: Divine Judgment makes Kayle invulnerable to Annie's Molten Shield. Invulnerable for 2.5 s, long enough to use ahead of Molten Shield. (Kayle R Divine Judgment → Annie E Molten Shield)

#### 6. Fiora (net +0.70)

- **0.55** parry: Riposte parries Annie's Summon: Tibbers. Parry for 0.75 s; Summon: Tibbers takes 0.25 s to land, enough to react. (Fiora W Riposte → Annie R Summon: Tibbers)
- **0.53** parry: Riposte parries Annie's Pyromania and stuns back. Parry for 0.75 s, timed to Pyromania. Negating Pyromania's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Annie I Pyromania)
- **0.30** parry: Riposte parries Annie's Disintegrate. Parry for 0.75 s; Disintegrate takes 0.7 s to land, enough to react. (Fiora W Riposte → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 475 units farther than Fiora's (625 vs 150 attack range).

#### 7. Bard (net +0.70)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Annie's Summon: Tibbers. Untargetable for 2.5 s, long enough to use ahead of Summon: Tibbers. (Bard R Tempered Fate → Annie R Summon: Tibbers)
- **0.26** untargetable: Tempered Fate makes Bard untargetable, dodging Annie's Pyromania. Untargetable for 2.5 s, long enough to use ahead of Pyromania. (Bard R Tempered Fate → Annie I Pyromania)
- **0.24** untargetable: Tempered Fate makes Bard untargetable, dodging Annie's Disintegrate. Untargetable for 2.5 s, long enough to use ahead of Disintegrate. (Bard R Tempered Fate → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 125 units farther than Bard's (625 vs 500 attack range).

#### 8. Sivir (net +0.68)

- **0.55** spell shield: Spell Shield's spell shield blocks Annie's Summon: Tibbers. Spell shield for 1.5 s, long enough to use ahead of Summon: Tibbers. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Annie R Summon: Tibbers)
- **0.40** spell shield: Spell Shield's spell shield blocks Annie's Pyromania. Spell shield for 1.5 s, long enough to use ahead of Pyromania. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Annie I Pyromania)
- **0.29** spell shield: Spell Shield's spell shield blocks Annie's Disintegrate. Spell shield for 1.5 s, long enough to use ahead of Disintegrate. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 125 units farther than Sivir's (625 vs 500 attack range).

#### 9. Nocturne (net +0.66)

- **0.55** spell shield: Shroud of Darkness's spell shield blocks Annie's Summon: Tibbers. Spell shield for 1.5 s, long enough to use ahead of Summon: Tibbers. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Annie R Summon: Tibbers)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks Annie's Pyromania. Spell shield for 1.5 s, long enough to use ahead of Pyromania. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Annie I Pyromania)
- **0.33** spell shield: Shroud of Darkness's spell shield blocks Annie's Disintegrate. Spell shield for 1.5 s, long enough to use ahead of Disintegrate. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 500 units farther than Nocturne's (625 vs 125 attack range).

#### 10. Xayah (net +0.65)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Annie's Summon: Tibbers. Untargetable for 1.5 s, long enough to use ahead of Summon: Tibbers. (Xayah R Featherstorm → Annie R Summon: Tibbers)
- **0.25** untargetable: Featherstorm makes Xayah untargetable, dodging Annie's Pyromania. Untargetable for 1.5 s, long enough to use ahead of Pyromania. (Xayah R Featherstorm → Annie I Pyromania)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Annie's Disintegrate. Untargetable for 1.5 s, long enough to use ahead of Disintegrate. (Xayah R Featherstorm → Annie Q Disintegrate)
- Watch out: Annie's basic attacks reach 100 units farther than Xayah's (625 vs 525 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +0.85 | 0.96 | 0.11 |  |
| 2 | Maokai | +0.73 | 0.95 | 0.22 |  |
| 3 | Lissandra | +0.73 | 0.77 | 0.04 |  |
| 4 | Aurora | +0.73 | 0.75 | 0.02 |  |
| 5 | Kayle | +0.72 | 0.72 | 0.00 |  |
| 6 | Fiora | +0.70 | 0.92 | 0.22 |  |
| 7 | Bard | +0.70 | 0.77 | 0.07 |  |
| 8 | Sivir | +0.68 | 0.82 | 0.14 |  |
| 9 | Nocturne | +0.66 | 0.88 | 0.22 |  |
| 10 | Xayah | +0.65 | 0.76 | 0.11 |  |
| 11 | Camille | +0.64 | 0.75 | 0.11 |  |
| 12 | Gwen | +0.63 | 0.85 | 0.22 |  |
| 13 | Vladimir | +0.62 | 0.89 | 0.27 |  |
| 14 | Rek'Sai | +0.62 | 0.77 | 0.15 |  |
| 15 | Evelynn | +0.61 | 0.76 | 0.15 |  |
| 16 | Shaco | +0.61 | 0.76 | 0.15 |  |
| 17 | Zed | +0.60 | 0.75 | 0.15 |  |
| 18 | Xin Zhao | +0.50 | 0.72 | 0.22 |  |
| 19 | Yuumi | +0.48 | 1.00 | 0.52 |  |
| 20 | Master Yi | +0.40 | 0.85 | 0.45 |  |
| 21 | Braum | +0.33 | 0.55 | 0.22 |  |
| 22 | Udyr | +0.33 | 0.55 | 0.22 |  |
| 23 | Samira | +0.33 | 0.38 | 0.05 |  |
| 24 | Mel | +0.28 | 0.36 | 0.08 |  |
| 25 | Yasuo | +0.27 | 0.42 | 0.15 |  |
| 26 | Morgana | +0.24 | 0.43 | 0.19 |  |
| 27 | Milio | +0.17 | 0.28 | 0.11 |  |
| 28 | Kayn | +0.16 | 0.76 | 0.60 |  |
| 29 | Kalista | +0.16 | 0.20 | 0.04 |  |
| 30 | Teemo | +0.15 | 0.29 | 0.14 |  |
| 31 | Kled | +0.15 | 0.25 | 0.10 |  |
| 32 | Pantheon | +0.14 | 0.79 | 0.65 |  |
| 33 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 34 | Lulu | +0.13 | 0.21 | 0.08 |  |
| 35 | Zaahen | +0.11 | 0.26 | 0.15 |  |
| 36 | Jax | +0.01 | 0.23 | 0.22 |  |
| 37 | Rengar | 0.00 | 0.44 | 0.44 |  |
| 38 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 39 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 40 | Senna | 0.00 | 0.00 | 0.00 |  |
| 41 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 42 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 43 | Alistar | -0.01 | 0.21 | 0.22 |  |
| 44 | Nilah | -0.02 | 0.20 | 0.22 |  |
| 45 | Elise | -0.03 | 0.00 | 0.03 |  |
| 46 | Ahri | -0.04 | 0.00 | 0.04 |  |
| 47 | Azir | -0.04 | 0.00 | 0.04 |  |
| 48 | Corki | -0.04 | 0.00 | 0.04 |  |
| 49 | Ezreal | -0.04 | 0.00 | 0.04 |  |
| 50 | Gnar | -0.04 | 0.00 | 0.04 |  |
| 51 | Neeko | -0.04 | 0.00 | 0.04 |  |
| 52 | Vayne | -0.04 | 0.00 | 0.04 |  |
| 53 | Vex | -0.04 | 0.00 | 0.04 |  |
| 54 | Zeri | -0.04 | 0.00 | 0.04 |  |
| 55 | Ziggs | -0.04 | 0.00 | 0.04 |  |
| 56 | Zoe | -0.04 | 0.00 | 0.04 |  |
| 57 | Kai'Sa | -0.05 | 0.00 | 0.05 |  |
| 58 | LeBlanc | -0.05 | 0.00 | 0.05 |  |
| 59 | Nidalee | -0.05 | 0.00 | 0.05 |  |
| 60 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 61 | Graves | -0.07 | 0.00 | 0.07 |  |
| 62 | Jayce | -0.07 | 0.00 | 0.07 |  |
| 63 | Kindred | -0.07 | 0.00 | 0.07 |  |
| 64 | Gangplank | -0.08 | 0.36 | 0.44 |  |
| 65 | Malphite | -0.08 | 0.14 | 0.22 |  |
| 66 | Aphelios | -0.08 | 0.00 | 0.08 |  |
| 67 | Brand | -0.08 | 0.00 | 0.08 |  |
| 68 | Cassiopeia | -0.08 | 0.00 | 0.08 |  |
| 69 | Draven | -0.08 | 0.00 | 0.08 |  |
| 70 | Heimerdinger | -0.08 | 0.00 | 0.08 |  |
| 71 | Hwei | -0.08 | 0.00 | 0.08 |  |
| 72 | Kennen | -0.08 | 0.00 | 0.08 |  |
| 73 | Lux | -0.08 | 0.00 | 0.08 |  |
| 74 | Nami | -0.08 | 0.00 | 0.08 |  |
| 75 | Renata Glasc | -0.08 | 0.00 | 0.08 |  |
| 76 | Smolder | -0.08 | 0.00 | 0.08 |  |
| 77 | Sona | -0.08 | 0.00 | 0.08 |  |
| 78 | Soraka | -0.08 | 0.00 | 0.08 |  |
| 79 | Syndra | -0.08 | 0.00 | 0.08 |  |
| 80 | Twitch | -0.08 | 0.00 | 0.08 |  |
| 81 | Veigar | -0.08 | 0.00 | 0.08 |  |
| 82 | Zilean | -0.08 | 0.00 | 0.08 |  |
| 83 | Briar | -0.11 | 0.00 | 0.11 |  |
| 84 | Jarvan IV | -0.11 | 0.00 | 0.11 |  |
| 85 | Jinx | -0.11 | 0.00 | 0.11 |  |
| 86 | Karma | -0.11 | 0.00 | 0.11 |  |
| 87 | K'Sante | -0.11 | 0.00 | 0.11 |  |
| 88 | Orianna | -0.11 | 0.00 | 0.11 |  |
| 89 | Seraphine | -0.11 | 0.00 | 0.11 |  |
| 90 | Swain | -0.11 | 0.00 | 0.11 |  |
| 91 | Sylas | -0.11 | 0.00 | 0.11 |  |
| 92 | Varus | -0.11 | 0.00 | 0.11 |  |
| 93 | Viktor | -0.11 | 0.00 | 0.11 |  |
| 94 | Yone | -0.11 | 0.00 | 0.11 |  |
| 95 | Aurelion Sol | -0.12 | 0.00 | 0.12 |  |
| 96 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 97 | Kog'Maw | -0.14 | 0.00 | 0.14 |  |
| 98 | Akali | -0.15 | 0.00 | 0.15 |  |
| 99 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 100 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 101 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 102 | Hecarim | -0.15 | 0.00 | 0.15 |  |
| 103 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 104 | Wukong | -0.15 | 0.00 | 0.15 |  |
| 105 | Ornn | -0.15 | 0.00 | 0.15 |  |
| 106 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 107 | Rell | -0.15 | 0.00 | 0.15 |  |
| 108 | Riven | -0.15 | 0.00 | 0.15 |  |
| 109 | Talon | -0.15 | 0.00 | 0.15 |  |
| 110 | Urgot | -0.15 | 0.00 | 0.15 |  |
| 111 | Volibear | -0.15 | 0.00 | 0.15 |  |
| 112 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 113 | Olaf | -0.18 | 0.26 | 0.44 |  |
| 114 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 115 | Aatrox | -0.22 | 0.00 | 0.22 |  |
| 116 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 117 | Diana | -0.22 | 0.00 | 0.22 |  |
| 118 | Illaoi | -0.22 | 0.00 | 0.22 |  |
| 119 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 120 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 121 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 122 | Leona | -0.22 | 0.00 | 0.22 |  |
| 123 | Locke | -0.22 | 0.00 | 0.22 |  |
| 124 | Nautilus | -0.22 | 0.00 | 0.22 |  |
| 125 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 126 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 127 | Sett | -0.22 | 0.00 | 0.22 |  |
| 128 | Shyvana | -0.22 | 0.00 | 0.22 |  |
| 129 | Tryndamere | -0.22 | 0.00 | 0.22 |  |
| 130 | Ivern | -0.23 | 0.00 | 0.23 |  |
| 131 | Quinn | -0.24 | 0.00 | 0.24 |  |
| 132 | Malzahar | -0.26 | 0.28 | 0.54 |  |
| 133 | Rammus | -0.27 | 0.22 | 0.49 |  |
| 134 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 135 | Sion | -0.29 | 0.28 | 0.57 |  |
| 136 | Garen | -0.30 | 0.14 | 0.44 |  |
| 137 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 138 | Viego | -0.33 | 0.00 | 0.33 |  |
| 139 | Akshan | -0.35 | 0.00 | 0.35 |  |
| 140 | Lucian | -0.35 | 0.00 | 0.35 |  |
| 141 | Jhin | -0.36 | 0.00 | 0.36 |  |
| 142 | Miss Fortune | -0.36 | 0.00 | 0.36 |  |
| 143 | Shen | -0.38 | 0.22 | 0.60 |  |
| 144 | Gragas | -0.38 | 0.00 | 0.38 |  |
| 145 | Mordekaiser | -0.39 | 0.05 | 0.44 |  |
| 146 | Ryze | -0.39 | 0.00 | 0.39 |  |
| 147 | Vel'Koz | -0.39 | 0.00 | 0.39 |  |
| 148 | Twisted Fate | -0.40 | 0.00 | 0.40 |  |
| 149 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 150 | Xerath | -0.43 | 0.00 | 0.43 |  |
| 151 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 152 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 153 | Darius | -0.44 | 0.00 | 0.44 |  |
| 154 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 155 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 156 | Singed | -0.44 | 0.00 | 0.44 |  |
| 157 | Skarner | -0.44 | 0.00 | 0.44 |  |
| 158 | Taric | -0.44 | 0.00 | 0.44 |  |
| 159 | Trundle | -0.44 | 0.00 | 0.44 |  |
| 160 | Yorick | -0.44 | 0.00 | 0.44 |  |
| 161 | Karthus | -0.47 | 0.00 | 0.47 |  |
| 162 | Janna | -0.48 | 0.00 | 0.48 |  |
| 163 | Fiddlesticks | -0.50 | 0.00 | 0.50 |  |
| 164 | Katarina | -0.50 | 0.00 | 0.50 |  |
| 165 | Warwick | -0.53 | 0.27 | 0.80 |  |
| 166 | Taliyah | -0.53 | 0.00 | 0.53 |  |
| 167 | Vi | -0.53 | 0.00 | 0.53 |  |
| 168 | Naafiri | -0.56 | 0.00 | 0.56 |  |
| 169 | Zac | -0.69 | 0.00 | 0.69 |  |
| 170 | Tahm Kench | -0.72 | 0.00 | 0.72 |  |
| 171 | Galio | -0.74 | 0.00 | 0.74 |  |
| 172 | Nunu & Willump | -0.93 | 0.00 | 0.93 |  |
