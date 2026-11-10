# Counters to Cassiopeia (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Cassiopeia: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Cassiopeia wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Cassiopeia --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Aurelion Sol | +0.85 | +1.00 | +1.00 | +1.00 | +0.46 | – | +0.00 |
| 2 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 3 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 4 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | – | +0.00 |
| 5 | Rell | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 6 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 7 | Zac | +0.81 | +1.00 | +1.00 | +0.99 | +0.09 | +0.98 | +0.00 |
| 8 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 9 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 10 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 11 | Ziggs | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 12 | Yasuo | +0.81 | +1.00 | +1.00 | +0.98 | +0.07 | +1.00 | +0.00 |
| 13 | Jhin | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 14 | Tahm Kench | +0.80 | +0.97 | +1.00 | +1.00 | +0.09 | +0.97 | +0.00 |
| 15 | Galio | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 16 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 17 | Aphelios | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 18 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 19 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 20 | Nautilus | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 21 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 22 | Heimerdinger | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 23 | Akali | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 24 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 25 | Maokai | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 26 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 27 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 28 | Sejuani | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 29 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 30 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 31 | Lillia | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 32 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 33 | Gnar | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 34 | Amumu | +0.79 | +1.00 | +1.00 | +0.98 | −0.06 | +1.00 | +0.00 |
| 35 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 36 | Skarner | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 37 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 38 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 39 | Zoe | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 40 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 41 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 42 | Swain | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 43 | Sylas | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 44 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 45 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 46 | Mordekaiser | +0.77 | +1.00 | +1.00 | +0.99 | −0.17 | +1.00 | +0.00 |
| 47 | Fiora | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.05 |
| 48 | Vladimir | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 49 | Malzahar | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 50 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 51 | Kassadin | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 52 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 53 | Malphite | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 54 | Shyvana | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 55 | Volibear | +0.77 | +1.00 | +0.99 | +1.00 | −0.13 | +0.88 | +0.00 |
| 56 | Akshan | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 57 | Master Yi | +0.76 | +1.00 | +0.88 | +1.00 | −0.05 | +1.00 | +0.00 |
| 58 | Kog'Maw | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 59 | Neeko | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 60 | Singed | +0.76 | +1.00 | +0.86 | +1.00 | −0.05 | +1.00 | +0.00 |
| 61 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 62 | Anivia | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 63 | Annie | +0.74 | +1.00 | +0.85 | +1.00 | +0.03 | – | +0.00 |
| 64 | Leona | +0.69 | +0.87 | +0.71 | +0.99 | −0.02 | +0.99 | +0.00 |
| 65 | Hwei | +0.62 | +0.94 | +1.00 | +0.35 | −0.02 | – | +0.00 |
| 66 | Illaoi | +0.60 | +0.33 | +0.94 | +1.00 | −0.08 | +1.00 | +0.00 |
| 67 | Warwick | +0.59 | +1.00 | +1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 68 | Azir | +0.55 | +1.00 | +1.00 | +0.00 | −0.01 | – | +0.00 |
| 69 | Ekko | +0.52 | +1.00 | −0.01 | +1.00 | −0.17 | +1.00 | +0.00 |
| 70 | Nidalee | +0.50 | +0.85 | +1.00 | +0.00 | −0.08 | – | +0.00 |
| 71 | Braum | +0.48 | +0.43 | +0.47 | +0.99 | −0.06 | +0.66 | +0.00 |
| 72 | Urgot | +0.45 | +0.07 | +0.95 | +0.65 | −0.14 | +0.84 | +0.00 |
| 73 | Kled | +0.42 | +1.00 | +1.00 | −0.75 | −0.17 | +1.00 | +0.00 |
| 74 | Lee Sin | +0.40 | +1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 75 | Camille | +0.39 | +1.00 | +1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 76 | Kennen | +0.35 | +1.00 | +1.00 | −1.00 | +0.08 | – | +0.00 |
| 77 | Ornn | +0.34 | +0.05 | +0.91 | +0.11 | −0.11 | +0.92 | +0.00 |
| 78 | Shaco | +0.33 | +1.00 | +0.85 | −1.00 | −0.19 | +1.00 | +0.00 |
| 79 | Gwen | +0.33 | +1.00 | +0.29 | +0.43 | −0.29 | −0.34 | +0.00 |
| 80 | Fiddlesticks | +0.33 | +1.00 | +1.00 | −1.00 | −0.04 | – | +0.00 |
| 81 | Zilean | +0.33 | +1.00 | +1.00 | −1.00 | −0.05 | – | +0.00 |
| 82 | Taric | +0.32 | +0.27 | +0.34 | +0.32 | −0.01 | +1.00 | +0.00 |
| 83 | Zyra | +0.31 | +0.91 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 84 | Locke | +0.29 | +1.00 | +1.00 | −0.96 | −0.22 | +0.13 | +0.00 |
| 85 | Brand | +0.27 | +0.08 | +0.14 | +1.00 | −0.04 | – | +0.00 |
| 86 | Trundle | +0.25 | −0.54 | +1.00 | +1.00 | −0.27 | −0.54 | +0.56 |
| 87 | Alistar | +0.25 | +0.22 | +0.23 | +0.22 | −0.06 | +1.00 | +0.00 |
| 88 | Nami | +0.17 | −0.01 | −0.03 | +0.77 | +0.03 | – | +0.00 |
| 89 | Ryze | +0.13 | +0.28 | +1.00 | −1.00 | −0.04 | – | +0.00 |
| 90 | Nunu & Willump | +0.10 | +0.23 | +0.04 | +0.18 | −0.06 | +0.11 | +0.00 |
| 91 | Shen | +0.10 | +0.05 | +0.15 | +0.21 | −0.01 | +0.07 | +0.00 |
| 92 | Xerath | −0.01 | +0.31 | +0.42 | −1.00 | +0.05 | – | +0.00 |
| 93 | Blitzcrank | −0.02 | −0.06 | −0.00 | +0.01 | −0.03 | −0.06 | +0.00 |
| 94 | Mel | −0.03 | +0.10 | −1.00 | +1.00 | +0.00 | – | +0.00 |
| 95 | Tristana | −0.07 | +1.00 | −1.00 | −1.00 | +0.17 | +1.00 | +0.00 |
| 96 | Yone | −0.08 | +0.06 | −0.88 | +0.56 | −0.30 | +0.56 | +0.00 |
| 97 | Xin Zhao | −0.10 | −1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 98 | Karthus | −0.13 | −0.17 | −0.12 | −0.23 | −0.02 | −0.14 | +0.00 |
| 99 | Zaahen | −0.17 | −0.71 | −1.00 | +1.00 | −0.25 | +0.96 | +0.00 |
| 100 | Irelia | −0.18 | +0.80 | −0.22 | −1.00 | −0.14 | −1.00 | +0.00 |
| 101 | Evelynn | −0.20 | −1.00 | +1.00 | −1.00 | −0.09 | +0.10 | +0.00 |
| 102 | Lux | −0.23 | +0.88 | −0.93 | −1.00 | +0.03 | – | +0.00 |
| 103 | Kayn | −0.24 | +0.66 | −0.90 | −1.00 | −0.32 | +0.66 | +0.00 |
| 104 | Twisted Fate | −0.27 | −0.10 | +0.00 | −1.00 | −0.10 | – | +0.00 |
| 105 | Olaf | −0.28 | −1.00 | −1.00 | +1.00 | −0.29 | +0.19 | +0.86 |
| 106 | Veigar | −0.30 | −0.11 | −0.15 | −1.00 | −0.05 | – | +0.00 |
| 107 | Kha'Zix | −0.32 | +0.04 | −0.45 | −1.00 | −0.09 | +0.01 | +0.00 |
| 108 | Bel'Veth | −0.33 | −1.00 | +1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 109 | Elise | −0.35 | −1.00 | −1.00 | +1.00 | −0.09 | – | +0.00 |
| 110 | Karma | −0.36 | −1.00 | +0.47 | −0.95 | −0.01 | – | +0.00 |
| 111 | Soraka | −0.36 | −0.98 | −0.38 | +0.12 | −0.07 | – | +0.00 |
| 112 | Jinx | −0.41 | +0.29 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 113 | Samira | −0.42 | −1.00 | −1.00 | +0.59 | +0.04 | – | +0.00 |
| 114 | Viego | −0.44 | −1.00 | −1.00 | +1.00 | −0.24 | −1.00 | +0.00 |
| 115 | Varus | −0.51 | −0.04 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 116 | Rengar | −0.51 | −0.62 | −0.51 | −0.71 | −0.13 | −0.71 | +0.00 |
| 117 | Naafiri | −0.57 | −0.17 | −0.92 | −1.00 | +0.01 | −1.00 | +0.00 |
| 118 | Twitch | −0.66 | −0.88 | −0.63 | −1.00 | −0.09 | – | +0.00 |
| 119 | Briar | −0.67 | −0.98 | −1.00 | −0.09 | −0.37 | −1.00 | +0.00 |
| 120 | Draven | −0.69 | −0.91 | −0.75 | −1.00 | −0.06 | – | +0.00 |
| 121 | Ashe | −0.70 | −1.00 | −0.73 | −1.00 | +0.02 | – | +0.00 |
| 122 | Nocturne | −0.71 | −0.84 | −0.84 | −0.83 | −0.22 | −0.84 | +0.00 |
| 123 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 124 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 125 | Zeri | −0.77 | −1.00 | −0.99 | −1.00 | +0.05 | – | +0.00 |
| 126 | Milio | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 127 | Corki | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 128 | Yunara | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 129 | Xayah | −0.78 | −1.00 | −1.00 | −0.95 | −0.05 | – | +0.00 |
| 130 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 131 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 132 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 133 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 134 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 135 | Teemo | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 136 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 137 | Graves | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 138 | Ezreal | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 139 | Jarvan IV | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 140 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 141 | Quinn | −0.79 | −0.99 | −0.99 | −1.00 | −0.11 | – | +0.00 |
| 142 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 143 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 144 | Smolder | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 145 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 146 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 147 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 148 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 149 | Kalista | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 150 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 151 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 152 | Kai'Sa | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 153 | Nilah | −0.81 | −1.00 | −0.95 | −1.00 | −0.14 | −1.00 | +0.00 |
| 154 | Rakan | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 155 | Bard | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 156 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 157 | Aatrox | −0.81 | −1.00 | −1.00 | −0.82 | −0.41 | −0.86 | +0.00 |
| 158 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 159 | Tryndamere | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 160 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 161 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 162 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 163 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 164 | Riven | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 165 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 166 | Wukong | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 167 | Pantheon | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 168 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 169 | Zed | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 170 | Ambessa | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 171 | Vi | −0.85 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | +0.00 |
| 172 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Cassiopeia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Cassiopeia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Cassiopeia` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Vladimir (net +0.93)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 2 s, long enough to use ahead of Petrifying Gaze. (Vladimir W Sanguine Pool → Cassiopeia R Petrifying Gaze)
- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cassiopeia's Miasma. Untargetable for 2 s, long enough to use ahead of Miasma. (Vladimir W Sanguine Pool → Cassiopeia W Miasma)
- **0.24** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 2 s, long enough to use ahead of Twin Fang. (Vladimir W Sanguine Pool → Cassiopeia E Twin Fang)
- Watch out: Cassiopeia's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 2. Sivir (net +0.92)

- **0.80** spell shield: Spell Shield's spell shield blocks Cassiopeia's Petrifying Gaze. Spell shield for 1.5 s, long enough to use ahead of Petrifying Gaze. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Cassiopeia R Petrifying Gaze)
- **0.23** spell shield: Spell Shield's spell shield blocks Cassiopeia's Twin Fang. Spell shield for 1.5 s, long enough to use ahead of Twin Fang. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Cassiopeia E Twin Fang)

#### 3. Xayah (net +0.87)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 1.5 s, long enough to use ahead of Petrifying Gaze. (Xayah R Featherstorm → Cassiopeia R Petrifying Gaze)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Cassiopeia's Miasma. Untargetable for 1.5 s, long enough to use ahead of Miasma. (Xayah R Featherstorm → Cassiopeia W Miasma)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 1.5 s, long enough to use ahead of Twin Fang. (Xayah R Featherstorm → Cassiopeia E Twin Fang)

#### 4. Bard (net +0.83)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 2.5 s, long enough to use ahead of Petrifying Gaze. (Bard R Tempered Fate → Cassiopeia R Petrifying Gaze)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Cassiopeia's Miasma. Untargetable for 2.5 s, long enough to use ahead of Miasma. (Bard R Tempered Fate → Cassiopeia W Miasma)
- **0.22** untargetable: Tempered Fate makes Bard untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 2.5 s, long enough to use ahead of Twin Fang. (Bard R Tempered Fate → Cassiopeia E Twin Fang)
- Watch out: Miasma grounds Bard, who then can't cast Magical Journey.

#### 5. Lissandra (net +0.83)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for 2.5 s, long enough to use ahead of Petrifying Gaze. (Lissandra R Frozen Tomb → Cassiopeia R Petrifying Gaze)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cassiopeia's Miasma. Untargetable for 2.5 s, long enough to use ahead of Miasma. (Lissandra R Frozen Tomb → Cassiopeia W Miasma)
- **0.22** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cassiopeia's Twin Fang. Untargetable for 2.5 s, long enough to use ahead of Twin Fang. (Lissandra R Frozen Tomb → Cassiopeia E Twin Fang)
- Watch out: Miasma grounds Lissandra, who then can't cast Glacial Path.

#### 6. Morgana (net +0.83)

- **0.80** cc immunity: Black Shield makes Morgana immune to Cassiopeia's Petrifying Gaze (slow, stun). Immune for 5 s, long enough to use ahead of Petrifying Gaze. (Morgana E Black Shield → Cassiopeia R Petrifying Gaze)
- **0.27** cc immunity: Black Shield makes Morgana immune to Cassiopeia's Miasma (ground, slow). Immune for 5 s, long enough to use ahead of Miasma. (Morgana E Black Shield → Cassiopeia W Miasma)
- Watch out: Cassiopeia's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

#### 7. Kayle (net +0.68)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Cassiopeia's Petrifying Gaze (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Petrifying Gaze. (Kayle R Divine Judgment → Cassiopeia R Petrifying Gaze)
- **0.22** invulnerable: Divine Judgment makes Kayle invulnerable to Cassiopeia's Twin Fang. Invulnerable for 2.5 s, long enough to use ahead of Twin Fang. (Kayle R Divine Judgment → Cassiopeia E Twin Fang)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Cassiopeia's (625 vs 550 attack range). Cassiopeia has no dash or blink to close the gap. (Kayle basic attacks → Cassiopeia basic attacks)

#### 8. Milio (net +0.62)

- **0.49** cleanse: Breath of Life cleanses Cassiopeia's Petrifying Gaze (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Cassiopeia R Petrifying Gaze)
- **0.22** tenacity: Breath of Life's 65% tenacity shortens Cassiopeia's Petrifying Gaze (slow, stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Cassiopeia R Petrifying Gaze)
- **0.07** tenacity: Breath of Life's 65% tenacity shortens Cassiopeia's Miasma (ground, slow). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Cassiopeia W Miasma)

#### 9. Fiora (net +0.59)

- **0.90** parry: Riposte parries Cassiopeia's Petrifying Gaze and stuns back. Parry for 0.75 s; Petrifying Gaze takes 0.5 s to land, enough to react. Negating Petrifying Gaze's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Cassiopeia R Petrifying Gaze)
- **0.45** parry: Riposte parries Cassiopeia's Miasma. Parry for 0.75 s; Miasma takes 0.48 s to land, enough to react. (Fiora W Riposte → Cassiopeia W Miasma)
- **0.24** parry: Riposte parries Cassiopeia's Twin Fang. Parry for 0.75 s; Twin Fang takes 0.41 s to land, enough to react. (Fiora W Riposte → Cassiopeia E Twin Fang)
- Watch out: Miasma grounds Fiora, who then can't cast Lunge.

#### 10. Master Yi (net +0.57)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Cassiopeia's Petrifying Gaze. Untargetable for ?; Petrifying Gaze takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Cassiopeia R Petrifying Gaze)
- **0.42** untargetable: Alpha Strike makes Master Yi untargetable, dodging Cassiopeia's Miasma. Untargetable for ?; Miasma takes 0.48 s to land, enough to react. (Master Yi Q Alpha Strike → Cassiopeia W Miasma)
- **0.23** untargetable: Alpha Strike makes Master Yi untargetable, dodging Cassiopeia's Twin Fang. Untargetable for ?; Twin Fang takes 0.41 s to land, enough to react. (Master Yi Q Alpha Strike → Cassiopeia E Twin Fang)
- Watch out: Miasma grounds Master Yi, who then can't cast Alpha Strike.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.93 | 1.09 | 0.16 |  |
| 2 | Sivir | +0.92 | 0.92 | 0.00 |  |
| 3 | Xayah | +0.87 | 0.87 | 0.00 |  |
| 4 | Bard | +0.83 | 0.97 | 0.14 |  |
| 5 | Lissandra | +0.83 | 0.97 | 0.14 |  |
| 6 | Morgana | +0.83 | 0.94 | 0.11 |  |
| 7 | Kayle | +0.68 | 0.68 | 0.00 |  |
| 8 | Milio | +0.62 | 0.62 | 0.00 |  |
| 9 | Fiora | +0.59 | 1.19 | 0.60 |  |
| 10 | Master Yi | +0.57 | 1.27 | 0.70 |  |
| 11 | Mel | +0.51 | 0.51 | 0.00 |  |
| 12 | Nocturne | +0.49 | 0.92 | 0.43 |  |
| 13 | Udyr | +0.48 | 0.94 | 0.46 |  |
| 14 | Gwen | +0.47 | 1.07 | 0.60 |  |
| 15 | Aurora | +0.46 | 0.87 | 0.41 |  |
| 16 | Shaco | +0.44 | 0.97 | 0.53 |  |
| 17 | Olaf | +0.43 | 0.87 | 0.44 |  |
| 18 | Yuumi | +0.41 | 1.19 | 0.78 |  |
| 19 | Maokai | +0.39 | 1.09 | 0.70 |  |
| 20 | Fizz | +0.32 | 1.09 | 0.77 |  |
| 21 | Kalista | +0.30 | 0.51 | 0.21 |  |
| 22 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 23 | Rek'Sai | +0.21 | 0.97 | 0.76 |  |
| 24 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 25 | Evelynn | +0.20 | 0.97 | 0.77 |  |
| 26 | Gangplank | +0.20 | 0.64 | 0.44 |  |
| 27 | Zed | +0.19 | 0.87 | 0.68 |  |
| 28 | Samira | +0.19 | 0.54 | 0.35 |  |
| 29 | Camille | +0.16 | 0.92 | 0.76 |  |
| 30 | Varus | +0.16 | 0.22 | 0.06 |  |
| 31 | Zaahen | +0.11 | 0.87 | 0.76 |  |
| 32 | Aphelios | +0.11 | 0.11 | 0.00 |  |
| 33 | Heimerdinger | +0.11 | 0.11 | 0.00 |  |
| 34 | Annie | +0.08 | 0.08 | 0.00 |  |
| 35 | Braum | +0.07 | 0.67 | 0.60 | projectile block (Unbreakable) |
| 36 | Malzahar | +0.07 | 0.47 | 0.40 |  |
| 37 | Rengar | +0.05 | 0.64 | 0.59 |  |
| 38 | Alistar | +0.04 | 0.64 | 0.60 |  |
| 39 | Sion | +0.01 | 0.88 | 0.87 |  |
| 40 | Garen | 0.00 | 0.41 | 0.41 |  |
| 41 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 42 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 43 | Brand | 0.00 | 0.00 | 0.00 |  |
| 44 | Draven | 0.00 | 0.00 | 0.00 |  |
| 45 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 46 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 47 | Karma | 0.00 | 0.00 | 0.00 |  |
| 48 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 49 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 50 | Lux | 0.00 | 0.00 | 0.00 |  |
| 51 | Nami | 0.00 | 0.00 | 0.00 |  |
| 52 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 53 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 54 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 55 | Senna | 0.00 | 0.00 | 0.00 |  |
| 56 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 57 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 58 | Sona | 0.00 | 0.00 | 0.00 |  |
| 59 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 60 | Swain | 0.00 | 0.00 | 0.00 |  |
| 61 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 62 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 63 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 64 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 65 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 66 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 67 | Tristana | -0.02 | 0.27 | 0.29 |  |
| 68 | Kled | -0.06 | 0.74 | 0.80 |  |
| 69 | Xin Zhao | -0.10 | 0.49 | 0.59 |  |
| 70 | Singed | -0.11 | 0.33 | 0.44 |  |
| 71 | Vex | -0.17 | 0.00 | 0.17 |  |
| 72 | Ziggs | -0.20 | 0.00 | 0.20 |  |
| 73 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 74 | Yasuo | -0.23 | 0.61 | 0.84 | projectile block (Wind Wall) |
| 75 | Kayn | -0.24 | 0.97 | 1.21 |  |
| 76 | Thresh | -0.24 | 0.00 | 0.24 |  |
| 77 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 78 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 79 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 80 | Azir | -0.29 | 0.00 | 0.29 |  |
| 81 | Corki | -0.29 | 0.00 | 0.29 |  |
| 82 | Ezreal | -0.29 | 0.00 | 0.29 |  |
| 83 | Jayce | -0.29 | 0.00 | 0.29 |  |
| 84 | Kindred | -0.29 | 0.00 | 0.29 |  |
| 85 | LeBlanc | -0.29 | 0.00 | 0.29 |  |
| 86 | Nidalee | -0.29 | 0.00 | 0.29 |  |
| 87 | Yunara | -0.29 | 0.00 | 0.29 |  |
| 88 | Zeri | -0.29 | 0.00 | 0.29 |  |
| 89 | Skarner | -0.31 | 0.13 | 0.44 |  |
| 90 | Ivern | -0.31 | 0.00 | 0.31 |  |
| 91 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 92 | Ahri | -0.33 | 0.00 | 0.33 |  |
| 93 | Kai'Sa | -0.33 | 0.00 | 0.33 |  |
| 94 | Vayne | -0.33 | 0.00 | 0.33 |  |
| 95 | Zoe | -0.33 | 0.00 | 0.33 |  |
| 96 | Aurelion Sol | -0.35 | 0.00 | 0.35 |  |
| 97 | Nilah | -0.36 | 0.20 | 0.56 |  |
| 98 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 99 | Jax | -0.37 | 0.23 | 0.60 |  |
| 100 | Warwick | -0.39 | 0.88 | 1.27 |  |
| 101 | Caitlyn | -0.39 | 0.18 | 0.57 |  |
| 102 | Akshan | -0.39 | 0.00 | 0.39 |  |
| 103 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 104 | Janna | -0.40 | 0.00 | 0.40 |  |
| 105 | Lillia | -0.41 | 0.00 | 0.41 |  |
| 106 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 107 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 108 | Elise | -0.43 | 0.00 | 0.43 |  |
| 109 | Gnar | -0.43 | 0.00 | 0.43 |  |
| 110 | Graves | -0.43 | 0.00 | 0.43 |  |
| 111 | Illaoi | -0.43 | 0.00 | 0.43 |  |
| 112 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 113 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 114 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 115 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 116 | Taric | -0.44 | 0.00 | 0.44 |  |
| 117 | Urgot | -0.51 | 0.00 | 0.51 |  |
| 118 | Twisted Fate | -0.52 | 0.00 | 0.52 |  |
| 119 | Nunu & Willump | -0.54 | 0.27 | 0.81 |  |
| 120 | Quinn | -0.54 | 0.00 | 0.54 |  |
| 121 | Malphite | -0.56 | 0.14 | 0.70 |  |
| 122 | Irelia | -0.57 | 0.00 | 0.57 |  |
| 123 | Lucian | -0.57 | 0.00 | 0.57 |  |
| 124 | Katarina | -0.58 | 0.22 | 0.80 |  |
| 125 | Jarvan IV | -0.58 | 0.00 | 0.58 |  |
| 126 | Volibear | -0.58 | 0.00 | 0.58 |  |
| 127 | Rammus | -0.59 | 0.22 | 0.81 |  |
| 128 | Aatrox | -0.59 | 0.00 | 0.59 |  |
| 129 | Nautilus | -0.59 | 0.00 | 0.59 |  |
| 130 | Tryndamere | -0.59 | 0.00 | 0.59 |  |
| 131 | Diana | -0.60 | 0.00 | 0.60 |  |
| 132 | Kha'Zix | -0.60 | 0.00 | 0.60 |  |
| 133 | Locke | -0.60 | 0.00 | 0.60 |  |
| 134 | Renekton | -0.60 | 0.00 | 0.60 |  |
| 135 | Rell | -0.62 | 0.00 | 0.62 |  |
| 136 | Ornn | -0.64 | 0.00 | 0.64 |  |
| 137 | Pantheon | -0.66 | 0.57 | 1.23 |  |
| 138 | Darius | -0.67 | 0.00 | 0.67 |  |
| 139 | Ryze | -0.68 | 0.00 | 0.68 |  |
| 140 | Talon | -0.68 | 0.00 | 0.68 |  |
| 141 | Amumu | -0.70 | 0.00 | 0.70 |  |
| 142 | Kassadin | -0.70 | 0.00 | 0.70 |  |
| 143 | Leona | -0.70 | 0.00 | 0.70 |  |
| 144 | Sejuani | -0.70 | 0.00 | 0.70 |  |
| 145 | Sett | -0.70 | 0.00 | 0.70 |  |
| 146 | Shyvana | -0.70 | 0.00 | 0.70 |  |
| 147 | Wukong | -0.71 | 0.00 | 0.71 |  |
| 148 | Taliyah | -0.71 | 0.00 | 0.71 |  |
| 149 | Hecarim | -0.72 | 0.00 | 0.72 |  |
| 150 | Lee Sin | -0.72 | 0.00 | 0.72 |  |
| 151 | Qiyana | -0.72 | 0.00 | 0.72 |  |
| 152 | Fiddlesticks | -0.73 | 0.00 | 0.73 |  |
| 153 | Rakan | -0.76 | 0.00 | 0.76 |  |
| 154 | Akali | -0.77 | 0.00 | 0.77 |  |
| 155 | Ekko | -0.77 | 0.00 | 0.77 |  |
| 156 | Ambessa | -0.79 | 0.00 | 0.79 |  |
| 157 | Gragas | -0.80 | 0.00 | 0.80 |  |
| 158 | Poppy | -0.80 | 0.00 | 0.80 |  |
| 159 | Riven | -0.82 | 0.00 | 0.82 |  |
| 160 | Yone | -0.83 | 0.00 | 0.83 |  |
| 161 | K'Sante | -0.84 | 0.00 | 0.84 |  |
| 162 | Bel'Veth | -0.85 | 0.00 | 0.85 |  |
| 163 | Sylas | -0.86 | 0.00 | 0.86 |  |
| 164 | Briar | -0.87 | 0.00 | 0.87 |  |
| 165 | Zac | -0.92 | 0.00 | 0.92 |  |
| 166 | Pyke | -0.93 | 0.00 | 0.93 |  |
| 167 | Viego | -0.94 | 0.00 | 0.94 |  |
| 168 | Tahm Kench | -0.95 | 0.00 | 0.95 |  |
| 169 | Shen | -1.08 | 0.22 | 1.30 |  |
| 170 | Vi | -1.09 | 0.00 | 1.09 |  |
| 171 | Naafiri | -1.18 | 0.00 | 1.18 |  |
| 172 | Galio | -1.41 | 0.00 | 1.41 |  |
