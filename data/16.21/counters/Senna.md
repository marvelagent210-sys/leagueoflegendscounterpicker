# Counters to Senna (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Senna: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Senna wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Senna --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.89 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +1.00 |
| 2 | Gangplank | +0.87 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +1.00 |
| 3 | Warwick | +0.86 | +1.00 | +1.00 | +1.00 | +0.39 | +1.00 | +0.00 |
| 4 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +1.00 |
| 5 | Graves | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 6 | Tristana | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 7 | Sylas | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 8 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 9 | Vel'Koz | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 10 | Rengar | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 11 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 12 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 13 | Zaahen | +0.80 | +0.96 | +0.97 | +1.00 | +0.14 | +1.00 | +0.00 |
| 14 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 15 | Yasuo | +0.80 | +1.00 | +0.99 | +1.00 | +0.05 | +0.94 | +0.00 |
| 16 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 17 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 18 | Vi | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 19 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 20 | Swain | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 21 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 22 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 23 | Ziggs | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 24 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 25 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 26 | Akshan | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 27 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 28 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 29 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 30 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 31 | Briar | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 32 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 33 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 34 | Caitlyn | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 35 | Jinx | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 36 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 37 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 38 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 39 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 40 | Mel | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 41 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 42 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 43 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 44 | Smolder | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 45 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 46 | Fiddlesticks | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 47 | Zed | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 48 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 49 | Zeri | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 50 | Bel'Veth | +0.78 | +1.00 | +0.97 | +1.00 | −0.07 | +1.00 | +0.00 |
| 51 | Zoe | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 52 | Shaco | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 53 | Kayn | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 54 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 55 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 56 | Wukong | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 57 | Sona | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 58 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 59 | Syndra | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 60 | Ryze | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 61 | Janna | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 62 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 63 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 64 | Miss Fortune | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 65 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 66 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 67 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 68 | Corki | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 69 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 70 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 71 | Twitch | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 72 | Varus | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 73 | Lissandra | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 74 | Cassiopeia | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 75 | Nocturne | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 76 | Ashe | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 77 | Yunara | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 78 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 79 | Ambessa | +0.76 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 80 | Neeko | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 81 | Gwen | +0.76 | +1.00 | +1.00 | +0.94 | −0.17 | +1.00 | +0.00 |
| 82 | Kennen | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 83 | Zilean | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 84 | Lux | +0.76 | +0.97 | +0.97 | +1.00 | −0.03 | – | +0.00 |
| 85 | Cho'Gath | +0.75 | +0.95 | +0.97 | +1.00 | −0.10 | +0.91 | +0.00 |
| 86 | Viego | +0.75 | +0.81 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 87 | Lucian | +0.74 | +0.79 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 88 | Kindred | +0.74 | +0.83 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 89 | Ahri | +0.70 | +1.00 | +0.98 | +0.75 | −0.11 | – | +0.00 |
| 90 | Xin Zhao | +0.68 | +1.00 | +1.00 | +1.00 | −0.10 | −0.06 | +0.00 |
| 91 | Teemo | +0.68 | +0.54 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 92 | Milio | +0.62 | +0.67 | +0.67 | +1.00 | +0.14 | – | +0.00 |
| 93 | Skarner | +0.58 | +1.00 | +1.00 | +0.02 | −0.15 | +1.00 | +0.00 |
| 94 | Nautilus | +0.55 | +0.57 | +0.57 | +0.89 | +0.01 | +0.84 | +0.00 |
| 95 | Yone | +0.55 | +1.00 | +1.00 | −0.13 | −0.18 | +1.00 | +0.00 |
| 96 | Malzahar | +0.52 | +1.00 | −0.07 | +1.00 | −0.06 | +1.00 | +0.00 |
| 97 | Sivir | +0.49 | +0.91 | +0.69 | +0.81 | −0.12 | −0.49 | +0.00 |
| 98 | Volibear | +0.49 | +1.00 | +0.52 | +0.35 | −0.10 | +0.52 | +0.00 |
| 99 | Leona | +0.42 | +0.41 | +0.41 | +0.79 | −0.04 | +0.68 | +0.00 |
| 100 | Rakan | +0.40 | +1.00 | −0.60 | +1.00 | +0.02 | +1.00 | +0.00 |
| 101 | Sejuani | +0.38 | +0.17 | +0.96 | +0.05 | −0.06 | +1.00 | +0.00 |
| 102 | Jarvan IV | +0.37 | +1.00 | +0.03 | +1.00 | +0.06 | −0.93 | +0.00 |
| 103 | Diana | +0.36 | +1.00 | +0.14 | +0.20 | +0.12 | +0.17 | +0.00 |
| 104 | Ekko | +0.34 | +1.00 | −0.29 | +1.00 | −0.04 | −0.33 | +0.00 |
| 105 | Naafiri | +0.31 | −0.94 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 106 | Nami | +0.30 | +0.15 | +0.15 | +0.99 | +0.00 | – | +0.00 |
| 107 | Maokai | +0.30 | +0.12 | +0.48 | +0.27 | −0.02 | +1.00 | +0.00 |
| 108 | Malphite | +0.28 | +0.23 | +0.23 | +0.25 | +0.14 | +1.00 | +0.00 |
| 109 | Anivia | +0.28 | +0.13 | +0.13 | +1.00 | −0.05 | – | +0.00 |
| 110 | Lee Sin | +0.28 | −0.01 | −0.03 | +1.00 | −0.08 | +1.00 | +0.00 |
| 111 | Evelynn | +0.28 | −0.05 | −0.05 | +1.00 | +0.01 | +1.00 | +0.00 |
| 112 | Gnar | +0.27 | +0.86 | +0.92 | −0.48 | −0.07 | −0.68 | +0.00 |
| 113 | Xerath | +0.25 | +0.47 | −0.34 | +1.00 | −0.01 | – | +0.00 |
| 114 | Hwei | +0.25 | +0.13 | +0.13 | +0.83 | −0.05 | – | +0.00 |
| 115 | Soraka | +0.24 | +0.02 | +0.01 | +1.00 | +0.07 | – | +0.00 |
| 116 | Xayah | +0.24 | +1.00 | −0.91 | +1.00 | −0.04 | – | +0.00 |
| 117 | Annie | +0.23 | +0.01 | −0.01 | +1.00 | +0.05 | – | +0.00 |
| 118 | Akali | +0.20 | +0.87 | −0.10 | −0.15 | −0.04 | +0.46 | +0.00 |
| 119 | Master Yi | +0.20 | +0.44 | −0.12 | +0.44 | −0.04 | −0.14 | +1.00 |
| 120 | Alistar | +0.19 | −0.15 | +1.00 | −0.15 | −0.01 | +0.07 | +0.00 |
| 121 | Irelia | +0.18 | −0.45 | −0.07 | +1.00 | +0.04 | +1.00 | +0.00 |
| 122 | Renekton | +0.18 | +0.24 | +0.23 | +0.20 | −0.02 | +0.22 | +0.00 |
| 123 | Garen | +0.16 | +1.00 | −0.79 | +1.00 | −0.07 | −0.86 | +0.00 |
| 124 | Amumu | +0.14 | −0.07 | −0.07 | +0.62 | −0.07 | +0.63 | +0.00 |
| 125 | Zac | +0.14 | +0.13 | +0.13 | +0.21 | +0.11 | +0.10 | +0.00 |
| 126 | Brand | +0.12 | −0.05 | −0.30 | +1.00 | −0.03 | – | +0.00 |
| 127 | Urgot | +0.12 | −0.10 | −0.10 | +0.89 | −0.05 | −0.02 | +0.00 |
| 128 | Tahm Kench | +0.12 | +0.18 | +0.18 | +0.20 | −0.09 | +0.04 | +0.00 |
| 129 | Vladimir | +0.11 | +0.22 | −0.73 | +1.00 | −0.16 | +0.63 | +0.00 |
| 130 | Darius | +0.11 | −0.09 | −0.17 | +1.00 | −0.05 | −0.18 | +0.00 |
| 131 | Mordekaiser | +0.11 | −0.07 | −0.04 | +0.73 | −0.09 | +0.06 | +0.00 |
| 132 | Aurelion Sol | +0.11 | +0.14 | +0.13 | +0.14 | +0.01 | – | +0.00 |
| 133 | Katarina | +0.09 | +1.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.00 |
| 134 | Vex | +0.06 | −0.28 | −0.28 | +1.00 | −0.06 | – | +0.00 |
| 135 | LeBlanc | +0.04 | −0.60 | +0.13 | +0.79 | −0.05 | – | +0.00 |
| 136 | Rell | +0.04 | +0.02 | +0.01 | −0.01 | +0.12 | +0.14 | +0.00 |
| 137 | Rek'Sai | +0.03 | +1.00 | −0.87 | +0.01 | −0.04 | +0.01 | +0.00 |
| 138 | Taric | +0.01 | +0.18 | −0.14 | +0.10 | +0.01 | −0.16 | +0.00 |
| 139 | Nunu & Willump | −0.00 | −0.01 | −0.13 | −0.00 | +0.26 | −0.04 | +0.00 |
| 140 | Zyra | −0.00 | −0.03 | −0.02 | +0.07 | −0.03 | – | +0.00 |
| 141 | Shen | −0.01 | −0.06 | −0.04 | +0.03 | +0.12 | −0.06 | +0.00 |
| 142 | Singed | −0.04 | +0.07 | −0.14 | +0.05 | −0.20 | −0.05 | +0.00 |
| 143 | Sett | −0.06 | −0.19 | +0.07 | −0.15 | −0.05 | +0.12 | +0.00 |
| 144 | Veigar | −0.07 | −0.11 | −0.09 | −0.01 | −0.06 | – | +0.00 |
| 145 | Ornn | −0.07 | −0.08 | −0.14 | +0.04 | −0.06 | −0.13 | +0.00 |
| 146 | Braum | −0.11 | −0.19 | −0.21 | +0.04 | −0.04 | −0.07 | +0.00 |
| 147 | Karthus | −0.14 | −0.25 | −0.23 | +0.01 | −0.05 | −0.18 | +0.00 |
| 148 | Elise | −0.15 | −0.67 | −0.66 | +1.00 | −0.01 | – | +0.00 |
| 149 | Talon | −0.18 | +0.02 | −0.98 | +0.02 | −0.10 | +0.71 | +0.00 |
| 150 | Blitzcrank | −0.19 | −0.25 | −0.25 | −0.25 | +0.01 | −0.14 | +0.00 |
| 151 | Illaoi | −0.19 | −0.69 | −0.31 | +0.80 | −0.09 | −0.87 | +0.00 |
| 152 | Galio | −0.22 | +0.00 | +0.00 | −1.00 | −0.15 | +0.00 | +0.00 |
| 153 | Karma | −0.29 | −0.40 | −0.62 | −0.02 | −0.01 | – | +0.00 |
| 154 | Renata Glasc | −0.34 | −0.21 | −0.21 | −1.00 | −0.01 | – | +0.00 |
| 155 | Kha'Zix | −0.34 | +0.00 | −0.96 | +0.00 | −0.06 | −0.96 | +0.00 |
| 156 | Morgana | −0.40 | −0.99 | −0.99 | +1.00 | −0.09 | −0.99 | +0.00 |
| 157 | Nidalee | −0.41 | −0.39 | −0.39 | −0.82 | −0.08 | – | +0.00 |
| 158 | Bard | −0.42 | −0.79 | −0.14 | −0.94 | −0.19 | +0.32 | +0.00 |
| 159 | Nilah | −0.45 | −0.27 | −0.53 | −1.00 | −0.12 | −0.27 | +0.00 |
| 160 | Ezreal | −0.50 | −0.76 | −0.76 | −0.32 | −0.06 | – | +0.00 |
| 161 | Locke | −0.59 | −0.94 | −0.78 | −0.30 | −0.11 | −0.86 | +0.00 |
| 162 | Quinn | −0.62 | −1.00 | −1.00 | −0.17 | −0.15 | – | +0.00 |
| 163 | Samira | −0.68 | −1.00 | −1.00 | −0.40 | −0.02 | −1.00 | +0.00 |
| 164 | Seraphine | −0.69 | −0.86 | −0.85 | −0.87 | −0.11 | – | +0.00 |
| 165 | Qiyana | −0.75 | −0.94 | −0.94 | −0.94 | −0.04 | −0.80 | +0.00 |
| 166 | Hecarim | −0.77 | −0.95 | −0.95 | −0.95 | −0.06 | −0.95 | +0.00 |
| 167 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 168 | Aatrox | −0.78 | −0.96 | −0.96 | −0.90 | −0.16 | −0.96 | +0.00 |
| 169 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 170 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 171 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Senna's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Senna's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Senna` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.08)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Senna's Last Embrace. Untargetable for 0.75 s; Last Embrace takes 1.33 s to land, enough to react. (Fizz E Playful → Senna W Last Embrace)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Senna's Dawning Shadow. Untargetable for 0.75 s; Dawning Shadow takes 1 s to land, enough to react. (Fizz E Playful → Senna R Dawning Shadow)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Senna's Piercing Darkness. Untargetable for 0.75 s; Piercing Darkness takes 80 s to land, enough to react. (Fizz E Playful → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 425 units farther than Fizz's (600 vs 175 attack range).

#### 2. Yuumi (net +0.99)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Senna's Last Embrace. Untargetable for ?; Last Embrace takes 1.33 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Senna W Last Embrace)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Senna's Dawning Shadow. Untargetable for ?; Dawning Shadow takes 1 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Senna R Dawning Shadow)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Senna's Piercing Darkness. Untargetable for ?; Piercing Darkness takes 80 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 175 units farther than Yuumi's (600 vs 425 attack range).

#### 3. Maokai (net +0.81)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Senna's Last Embrace. Untargetable for 1.4 s; Last Embrace takes 1.33 s to land, enough to react. (Maokai W Twisted Advance → Senna W Last Embrace)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Senna's Dawning Shadow. Untargetable for 1.4 s; Dawning Shadow takes 1 s to land, enough to react. (Maokai W Twisted Advance → Senna R Dawning Shadow)
- **0.45** untargetable: Twisted Advance makes Maokai untargetable, dodging Senna's Piercing Darkness. Untargetable for 1.4 s; Piercing Darkness takes 80 s to land, enough to react. (Maokai W Twisted Advance → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 475 units farther than Maokai's (600 vs 125 attack range).

#### 4. Lissandra (net +0.80)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Senna's Dawning Shadow. Untargetable for 2.5 s, long enough to use ahead of Dawning Shadow. (Lissandra R Frozen Tomb → Senna R Dawning Shadow)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Senna's Last Embrace. Untargetable for 2.5 s, long enough to use ahead of Last Embrace. (Lissandra R Frozen Tomb → Senna W Last Embrace)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Senna's Piercing Darkness. Untargetable for 2.5 s, long enough to use ahead of Piercing Darkness. (Lissandra R Frozen Tomb → Senna Q Piercing Darkness)

#### 5. Aurora (net +0.79)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Senna's Dawning Shadow. Untargetable for 0.4 s; Dawning Shadow takes 1 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Senna R Dawning Shadow)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Senna's Last Embrace. Untargetable for 0.4 s; Last Embrace takes 1.33 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Senna W Last Embrace)
- **0.22** untargetable: Between Worlds makes Aurora untargetable, dodging Senna's Piercing Darkness. Untargetable for 0.4 s; Piercing Darkness takes 80 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Senna Q Piercing Darkness)

#### 6. Mel (net +0.78)

- **0.55** projectile block: Rebuttal blocks Senna's Dawning Shadow, a projectile. Rebuttal for 0.75 s; Dawning Shadow takes 1 s to land, enough to react. (Mel W Rebuttal → Senna R Dawning Shadow)
- **0.46** projectile block: Rebuttal blocks Senna's Last Embrace, a projectile. Rebuttal for 0.75 s; Last Embrace takes 1.33 s to land, enough to react. (Mel W Rebuttal → Senna W Last Embrace)

#### 7. Fiora (net +0.77)

- **0.67** parry: Riposte parries Senna's Last Embrace and stuns back. Parry for 0.75 s; Last Embrace takes 1.33 s to land, enough to react. Negating Last Embrace's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Senna W Last Embrace)
- **0.55** parry: Riposte parries Senna's Dawning Shadow. Parry for 0.75 s; Dawning Shadow takes 1 s to land, enough to react. (Fiora W Riposte → Senna R Dawning Shadow)
- **0.43** parry: Riposte parries Senna's Piercing Darkness. Parry for 0.75 s; Piercing Darkness takes 80 s to land, enough to react. (Fiora W Riposte → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 450 units farther than Fiora's (600 vs 150 attack range).

#### 8. Samira (net +0.75)

- **0.55** projectile block: Blade Whirl blocks Senna's Dawning Shadow, a projectile. Blade Whirl for 0.75 s; Dawning Shadow takes 1 s to land, enough to react. (Samira W Blade Whirl → Senna R Dawning Shadow)
- **0.49** projectile block: Blade Whirl blocks Senna's Last Embrace, a projectile. Blade Whirl for 0.75 s; Last Embrace takes 1.33 s to land, enough to react. (Samira W Blade Whirl → Senna W Last Embrace)
- Watch out: Senna's basic attacks reach 100 units farther than Samira's (600 vs 500 attack range).

#### 9. Vladimir (net +0.74)

- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Senna's Last Embrace. Untargetable for 2 s, long enough to use ahead of Last Embrace. (Vladimir W Sanguine Pool → Senna W Last Embrace)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Senna's Dawning Shadow. Untargetable for 2 s, long enough to use ahead of Dawning Shadow. (Vladimir W Sanguine Pool → Senna R Dawning Shadow)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Senna's Piercing Darkness. Untargetable for 2 s, long enough to use ahead of Piercing Darkness. (Vladimir W Sanguine Pool → Senna Q Piercing Darkness)
- Watch out: Senna's basic attacks reach 150 units farther than Vladimir's (600 vs 450 attack range).

#### 10. Yasuo (net +0.72)

- **0.55** projectile block: Wind Wall blocks Senna's Dawning Shadow, a projectile. Wind Wall for 4 s, long enough to use ahead of Dawning Shadow. (Yasuo W Wind Wall → Senna R Dawning Shadow)
- **0.55** projectile block: Wind Wall blocks Senna's Last Embrace, a projectile. Wind Wall for 4 s, long enough to use ahead of Last Embrace. (Yasuo W Wind Wall → Senna W Last Embrace)
- **0.11** reveal: Last Breath reveals Senna through Curse of the Black Mist's stealth. (Yasuo R Last Breath → Senna E Curse of the Black Mist)
- Watch out: Senna's basic attacks reach 425 units farther than Yasuo's (600 vs 175 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.08 | 1.24 | 0.16 |  |
| 2 | Yuumi | +0.99 | 1.13 | 0.14 |  |
| 3 | Maokai | +0.81 | 1.13 | 0.32 |  |
| 4 | Lissandra | +0.80 | 0.80 | 0.00 |  |
| 5 | Aurora | +0.79 | 0.79 | 0.00 |  |
| 6 | Mel | +0.78 | 0.78 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 7 | Fiora | +0.77 | 1.09 | 0.32 |  |
| 8 | Samira | +0.75 | 0.80 | 0.05 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 9 | Vladimir | +0.74 | 0.98 | 0.24 |  |
| 10 | Yasuo | +0.72 | 0.94 | 0.22 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 11 | Bard | +0.72 | 0.80 | 0.08 |  |
| 12 | Sivir | +0.71 | 0.87 | 0.16 |  |
| 13 | Master Yi | +0.70 | 1.02 | 0.32 |  |
| 14 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 15 | Nocturne | +0.67 | 0.99 | 0.32 |  |
| 16 | Xayah | +0.67 | 0.79 | 0.12 |  |
| 17 | Braum | +0.66 | 0.98 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 18 | Gwen | +0.63 | 0.95 | 0.32 |  |
| 19 | Camille | +0.63 | 0.79 | 0.16 |  |
| 20 | Evelynn | +0.58 | 0.80 | 0.22 |  |
| 21 | Kayn | +0.58 | 0.80 | 0.22 |  |
| 22 | Rek'Sai | +0.58 | 0.80 | 0.22 |  |
| 23 | Shaco | +0.58 | 0.80 | 0.22 |  |
| 24 | Zed | +0.57 | 0.79 | 0.22 |  |
| 25 | Pantheon | +0.55 | 0.77 | 0.22 |  |
| 26 | Morgana | +0.50 | 0.74 | 0.24 |  |
| 27 | Kled | +0.47 | 0.61 | 0.14 |  |
| 28 | Udyr | +0.44 | 0.76 | 0.32 |  |
| 29 | Lulu | +0.41 | 0.41 | 0.00 |  |
| 30 | Xin Zhao | +0.36 | 0.68 | 0.32 |  |
| 31 | Malzahar | +0.33 | 0.49 | 0.16 |  |
| 32 | Teemo | +0.27 | 0.43 | 0.16 | blind (Blinding Dart) |
| 33 | Shen | +0.26 | 0.48 | 0.22 |  |
| 34 | Milio | +0.24 | 0.36 | 0.12 |  |
| 35 | Varus | +0.24 | 0.24 | 0.00 |  |
| 36 | Kalista | +0.23 | 0.27 | 0.04 |  |
| 37 | Caitlyn | +0.22 | 0.22 | 0.00 |  |
| 38 | Hwei | +0.22 | 0.22 | 0.00 |  |
| 39 | Warwick | +0.20 | 0.42 | 0.22 |  |
| 40 | Rengar | +0.18 | 0.83 | 0.65 |  |
| 41 | Jax | +0.18 | 0.50 | 0.32 |  |
| 42 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 43 | Fiddlesticks | +0.16 | 0.22 | 0.06 |  |
| 44 | Zaahen | +0.15 | 0.37 | 0.22 |  |
| 45 | Elise | +0.11 | 0.11 | 0.00 |  |
| 46 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 47 | Vex | +0.11 | 0.11 | 0.00 |  |
| 48 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 49 | Nilah | +0.10 | 0.40 | 0.30 |  |
| 50 | Karma | +0.10 | 0.22 | 0.12 |  |
| 51 | Kai'Sa | +0.05 | 0.11 | 0.06 |  |
| 52 | LeBlanc | +0.05 | 0.11 | 0.06 |  |
| 53 | Nidalee | +0.05 | 0.11 | 0.06 |  |
| 54 | Twisted Fate | +0.05 | 0.11 | 0.06 |  |
| 55 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 56 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 57 | Akshan | +0.03 | 0.11 | 0.08 |  |
| 58 | Thresh | +0.03 | 0.11 | 0.08 |  |
| 59 | Rammus | 0.00 | 0.32 | 0.32 |  |
| 60 | Lee Sin | 0.00 | 0.22 | 0.22 |  |
| 61 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 62 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 63 | Annie | 0.00 | 0.00 | 0.00 |  |
| 64 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 65 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 66 | Brand | 0.00 | 0.00 | 0.00 |  |
| 67 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 68 | Corki | 0.00 | 0.00 | 0.00 |  |
| 69 | Draven | 0.00 | 0.00 | 0.00 |  |
| 70 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 71 | Janna | 0.00 | 0.00 | 0.00 |  |
| 72 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 73 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 74 | Lux | 0.00 | 0.00 | 0.00 |  |
| 75 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 76 | Nami | 0.00 | 0.00 | 0.00 |  |
| 77 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 78 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 79 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 80 | Sona | 0.00 | 0.00 | 0.00 |  |
| 81 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 82 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 83 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 84 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 85 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 86 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 87 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 88 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 89 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 90 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 91 | Alistar | -0.02 | 0.30 | 0.32 |  |
| 92 | Azir | -0.04 | 0.00 | 0.04 |  |
| 93 | Briar | -0.05 | 0.11 | 0.16 |  |
| 94 | Naafiri | -0.05 | 0.11 | 0.16 |  |
| 95 | Sylas | -0.05 | 0.11 | 0.16 |  |
| 96 | Gnar | -0.05 | 0.00 | 0.05 |  |
| 97 | Quinn | -0.06 | 0.00 | 0.06 |  |
| 98 | Taliyah | -0.06 | 0.00 | 0.06 |  |
| 99 | Katarina | -0.08 | 0.24 | 0.32 |  |
| 100 | Jayce | -0.08 | 0.00 | 0.08 |  |
| 101 | Kindred | -0.08 | 0.00 | 0.08 |  |
| 102 | Lucian | -0.08 | 0.00 | 0.08 |  |
| 103 | Urgot | -0.09 | 0.11 | 0.20 |  |
| 104 | Graves | -0.09 | 0.00 | 0.09 |  |
| 105 | Ivern | -0.10 | 0.00 | 0.10 |  |
| 106 | Gangplank | -0.11 | 0.54 | 0.65 |  |
| 107 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 108 | Akali | -0.11 | 0.11 | 0.22 |  |
| 109 | Ambessa | -0.11 | 0.11 | 0.22 |  |
| 110 | Vi | -0.11 | 0.11 | 0.22 |  |
| 111 | Jinx | -0.12 | 0.00 | 0.12 |  |
| 112 | Orianna | -0.12 | 0.00 | 0.12 |  |
| 113 | Seraphine | -0.12 | 0.00 | 0.12 |  |
| 114 | Swain | -0.12 | 0.00 | 0.12 |  |
| 115 | Vel'Koz | -0.12 | 0.00 | 0.12 |  |
| 116 | Viktor | -0.12 | 0.00 | 0.12 |  |
| 117 | Xerath | -0.12 | 0.00 | 0.12 |  |
| 118 | Jarvan IV | -0.16 | 0.00 | 0.16 |  |
| 119 | Kog'Maw | -0.16 | 0.00 | 0.16 |  |
| 120 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 121 | Rakan | -0.16 | 0.00 | 0.16 |  |
| 122 | Viego | -0.16 | 0.00 | 0.16 |  |
| 123 | Yone | -0.16 | 0.00 | 0.16 |  |
| 124 | Aatrox | -0.21 | 0.11 | 0.32 |  |
| 125 | Illaoi | -0.21 | 0.11 | 0.32 |  |
| 126 | Sett | -0.21 | 0.11 | 0.32 |  |
| 127 | Zac | -0.21 | 0.11 | 0.32 |  |
| 128 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 129 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 130 | Galio | -0.22 | 0.00 | 0.22 |  |
| 131 | Hecarim | -0.22 | 0.00 | 0.22 |  |
| 132 | Lillia | -0.22 | 0.00 | 0.22 |  |
| 133 | Wukong | -0.22 | 0.00 | 0.22 |  |
| 134 | Ornn | -0.22 | 0.00 | 0.22 |  |
| 135 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 136 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 137 | Rell | -0.22 | 0.00 | 0.22 |  |
| 138 | Riven | -0.22 | 0.00 | 0.22 |  |
| 139 | Talon | -0.22 | 0.00 | 0.22 |  |
| 140 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 141 | Karthus | -0.24 | 0.00 | 0.24 |  |
| 142 | Garen | -0.25 | 0.40 | 0.65 |  |
| 143 | Sion | -0.26 | 0.39 | 0.65 |  |
| 144 | Olaf | -0.28 | 0.37 | 0.65 |  |
| 145 | Singed | -0.29 | 0.36 | 0.65 |  |
| 146 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 147 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 148 | Diana | -0.32 | 0.00 | 0.32 |  |
| 149 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 150 | Irelia | -0.32 | 0.00 | 0.32 |  |
| 151 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 152 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 153 | Leona | -0.32 | 0.00 | 0.32 |  |
| 154 | Locke | -0.32 | 0.00 | 0.32 |  |
| 155 | Nautilus | -0.32 | 0.00 | 0.32 |  |
| 156 | Poppy | -0.32 | 0.00 | 0.32 |  |
| 157 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 158 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 159 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 160 | Tahm Kench | -0.32 | 0.00 | 0.32 |  |
| 161 | Tryndamere | -0.32 | 0.00 | 0.32 |  |
| 162 | Skarner | -0.40 | 0.25 | 0.65 |  |
| 163 | Mordekaiser | -0.50 | 0.15 | 0.65 |  |
| 164 | Nunu & Willump | -0.51 | 0.14 | 0.65 |  |
| 165 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 166 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 167 | Darius | -0.65 | 0.00 | 0.65 |  |
| 168 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 169 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 170 | Taric | -0.65 | 0.00 | 0.65 |  |
| 171 | Trundle | -0.65 | 0.00 | 0.65 |  |
| 172 | Yorick | -0.65 | 0.00 | 0.65 |  |
