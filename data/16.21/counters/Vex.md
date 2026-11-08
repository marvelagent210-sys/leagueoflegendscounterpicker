# Counters to Vex (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Vex: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Vex wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Vex --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Aurelion Sol | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.00 |
| 2 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 3 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 4 | Master Yi | +0.83 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.50 |
| 5 | Vel'Koz | +0.83 | +1.00 | +1.00 | +1.00 | +0.30 | – | +0.00 |
| 6 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | −0.04 | – | +1.00 |
| 7 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 8 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 9 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 10 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 11 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 12 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 13 | Galio | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 14 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 15 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 16 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 17 | Yasuo | +0.80 | +1.00 | +1.00 | +0.98 | +0.07 | +0.97 | +0.00 |
| 18 | Rammus | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 19 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 20 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 21 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 22 | Milio | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 23 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 24 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 25 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 26 | Gwen | +0.80 | +1.00 | +1.00 | +0.95 | +0.05 | +1.00 | +0.00 |
| 27 | Nocturne | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 28 | Rumble | +0.80 | +1.00 | +1.00 | +0.97 | +0.00 | +1.00 | +0.00 |
| 29 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 30 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 31 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 32 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 33 | Shaco | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 34 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 35 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 36 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 37 | Miss Fortune | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 38 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 39 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 40 | Sejuani | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 41 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 42 | Twitch | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 43 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 44 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 45 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 46 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 47 | Viego | +0.79 | +1.00 | +0.96 | +1.00 | −0.03 | +1.00 | +0.00 |
| 48 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 49 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 50 | Draven | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 51 | Annie | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 52 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 53 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 54 | Cassiopeia | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 55 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 56 | Zeri | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 57 | Sona | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 58 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 59 | Syndra | +0.78 | +1.00 | +1.00 | +0.97 | +0.08 | – | +0.00 |
| 60 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 61 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 62 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 63 | Ryze | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 64 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 65 | Akshan | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 66 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 67 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 68 | Olaf | +0.78 | +0.95 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 69 | Lucian | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 70 | Twisted Fate | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 71 | Azir | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 72 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 73 | Karma | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 74 | Kai'Sa | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 75 | Hwei | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 76 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 77 | Mel | +0.78 | +1.00 | +1.00 | +0.95 | +0.06 | – | +0.00 |
| 78 | Janna | +0.78 | +1.00 | +1.00 | +0.99 | −0.00 | – | +0.00 |
| 79 | Quinn | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 80 | Ivern | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 81 | Xin Zhao | +0.77 | +1.00 | +0.82 | +1.00 | +0.13 | +1.00 | +0.00 |
| 82 | Zoe | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 83 | Kindred | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 84 | Ziggs | +0.74 | +0.79 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 85 | Jinx | +0.74 | +1.00 | +1.00 | +0.76 | +0.07 | – | +0.00 |
| 86 | Diana | +0.73 | +1.00 | +1.00 | +0.59 | +0.09 | +1.00 | +0.00 |
| 87 | Lux | +0.72 | +1.00 | +1.00 | +0.72 | +0.03 | – | +0.00 |
| 88 | Ekko | +0.71 | +1.00 | +0.72 | +1.00 | −0.10 | +1.00 | +0.00 |
| 89 | Anivia | +0.71 | +1.00 | +1.00 | +0.71 | −0.02 | – | +0.00 |
| 90 | Malphite | +0.71 | +1.00 | +1.00 | +0.53 | +0.03 | +1.00 | +0.00 |
| 91 | Mordekaiser | +0.70 | +0.99 | +0.83 | +0.80 | −0.06 | +0.93 | +0.00 |
| 92 | Brand | +0.69 | +0.99 | +0.70 | +1.00 | +0.01 | – | +0.00 |
| 93 | Fiddlesticks | +0.67 | +1.00 | +1.00 | +0.50 | +0.01 | – | +0.00 |
| 94 | Skarner | +0.67 | +0.77 | +0.77 | +0.81 | +0.13 | +1.00 | +0.00 |
| 95 | Zyra | +0.67 | +0.84 | +0.80 | +0.89 | +0.07 | – | +0.00 |
| 96 | Viktor | +0.66 | +1.00 | +1.00 | +0.50 | −0.02 | – | +0.00 |
| 97 | Singed | +0.62 | +1.00 | +0.31 | +1.00 | −0.06 | +1.00 | +0.00 |
| 98 | Urgot | +0.62 | +0.84 | +0.84 | +0.49 | +0.00 | +1.00 | +0.00 |
| 99 | Sett | +0.62 | +1.00 | +0.30 | +1.00 | −0.05 | +1.00 | +0.00 |
| 100 | Nami | +0.62 | +1.00 | +1.00 | +0.23 | +0.06 | – | +0.00 |
| 101 | Lee Sin | +0.62 | +0.99 | +1.00 | +0.10 | −0.02 | +1.00 | +0.00 |
| 102 | Rell | +0.61 | +0.55 | +1.00 | +0.55 | +0.11 | +1.00 | +0.00 |
| 103 | Warwick | +0.61 | +1.00 | +1.00 | +0.01 | +0.02 | +1.00 | +0.00 |
| 104 | Rakan | +0.60 | +1.00 | +1.00 | +0.00 | −0.01 | +1.00 | +0.00 |
| 105 | Rek'Sai | +0.59 | +0.52 | +1.00 | +0.56 | −0.00 | +1.00 | +0.00 |
| 106 | Zaahen | +0.59 | +1.00 | +1.00 | +0.00 | −0.06 | +1.00 | +0.00 |
| 107 | Graves | +0.58 | +0.55 | +1.00 | +0.38 | +0.10 | +1.00 | +0.00 |
| 108 | Jarvan IV | +0.57 | +0.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 109 | Irelia | +0.56 | +0.95 | +0.68 | +1.00 | +0.06 | −0.53 | +0.00 |
| 110 | Bard | +0.55 | +1.00 | +1.00 | +0.00 | −0.04 | – | +0.00 |
| 111 | Nautilus | +0.54 | +0.93 | +0.11 | +0.94 | +0.07 | +0.78 | +0.00 |
| 112 | Seraphine | +0.53 | +0.48 | +0.62 | +1.00 | +0.03 | – | +0.00 |
| 113 | Illaoi | +0.51 | +1.00 | +0.66 | +0.23 | +0.01 | +0.49 | +0.00 |
| 114 | Ezreal | +0.49 | +0.80 | +0.80 | +0.21 | +0.00 | – | +0.00 |
| 115 | Yone | +0.49 | +1.00 | +0.24 | +0.43 | −0.07 | +1.00 | +0.00 |
| 116 | Riven | +0.48 | +0.00 | +1.00 | +0.68 | −0.02 | +1.00 | +0.00 |
| 117 | Nidalee | +0.46 | +1.00 | +1.00 | −0.43 | +0.00 | – | +0.00 |
| 118 | Gragas | +0.45 | +0.31 | +0.31 | +1.00 | −0.05 | +1.00 | +0.00 |
| 119 | Zac | +0.43 | +0.43 | +0.43 | +0.53 | +0.07 | +0.98 | +0.00 |
| 120 | Nilah | +0.41 | +1.00 | +0.99 | −0.95 | +0.01 | +1.00 | +0.00 |
| 121 | Camille | +0.41 | +1.00 | −0.59 | +1.00 | +0.04 | +1.00 | +0.00 |
| 122 | Braum | +0.40 | +0.17 | +0.63 | +0.95 | −0.01 | +0.13 | +0.00 |
| 123 | Fizz | +0.39 | +1.00 | +1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 124 | Vi | +0.39 | +1.00 | +1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 125 | Soraka | +0.37 | +0.98 | +0.27 | +0.12 | +0.01 | – | +0.00 |
| 126 | Leona | +0.37 | +0.31 | +0.31 | +0.69 | −0.00 | +0.71 | +0.00 |
| 127 | Akali | +0.36 | +0.49 | +0.07 | +0.60 | +0.00 | +0.96 | +0.00 |
| 128 | Evelynn | +0.34 | +1.00 | +1.00 | −1.00 | +0.19 | +0.17 | +0.00 |
| 129 | Xerath | +0.34 | +1.00 | +1.00 | −0.98 | +0.01 | – | +0.00 |
| 130 | Elise | +0.32 | +0.96 | +0.23 | −0.03 | −0.00 | – | +0.00 |
| 131 | Nunu & Willump | +0.31 | +0.08 | +1.00 | +0.07 | +0.11 | +0.07 | +0.00 |
| 132 | Caitlyn | +0.30 | +0.99 | +0.97 | −0.64 | +0.04 | −0.67 | +0.00 |
| 133 | Locke | +0.30 | +0.95 | +0.90 | −1.00 | −0.04 | +0.42 | +0.00 |
| 134 | Amumu | +0.28 | +0.90 | +0.54 | −0.88 | +0.00 | +0.98 | +0.00 |
| 135 | Pantheon | +0.26 | +1.00 | −0.34 | +0.00 | −0.01 | +1.00 | +0.00 |
| 136 | Kayn | +0.25 | +0.89 | −0.13 | +0.00 | −0.08 | +0.74 | +0.00 |
| 137 | Wukong | +0.23 | +1.00 | −0.41 | +0.00 | −0.14 | +1.00 | +0.00 |
| 138 | Bel'Veth | +0.23 | −0.04 | +0.94 | −0.00 | +0.01 | −0.04 | +0.00 |
| 139 | Morgana | +0.21 | +0.00 | +0.06 | +0.69 | −0.01 | +0.57 | +0.00 |
| 140 | Tahm Kench | +0.19 | +0.26 | +0.26 | +0.10 | +0.14 | +0.23 | +0.00 |
| 141 | Sivir | +0.19 | +0.66 | +0.83 | −1.00 | −0.03 | – | +0.00 |
| 142 | Zilean | +0.18 | +0.41 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 143 | Briar | +0.16 | +0.40 | +0.40 | −0.58 | −0.18 | +1.00 | +0.00 |
| 144 | Rengar | +0.15 | +0.86 | −0.45 | +0.00 | +0.45 | −0.16 | +0.00 |
| 145 | Ornn | +0.14 | +0.07 | +0.08 | +0.06 | −0.01 | +0.88 | +0.00 |
| 146 | Renata Glasc | +0.12 | +0.58 | +0.58 | −1.00 | +0.13 | – | +0.00 |
| 147 | Zed | +0.09 | +1.00 | −1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 148 | Naafiri | +0.08 | +0.27 | +1.00 | −1.00 | +0.01 | −0.36 | +0.00 |
| 149 | Alistar | +0.08 | +0.08 | +0.10 | +0.11 | +0.01 | +0.07 | +0.00 |
| 150 | Lissandra | +0.06 | +1.00 | +0.02 | −1.00 | +0.01 | – | +0.00 |
| 151 | Shen | +0.04 | −0.03 | +0.04 | +0.14 | −0.02 | +0.09 | +0.00 |
| 152 | Taric | +0.03 | +0.03 | +0.05 | +0.03 | −0.00 | +0.08 | +0.00 |
| 153 | Ahri | −0.00 | −0.03 | +0.83 | −0.99 | −0.02 | – | +0.00 |
| 154 | Vladimir | −0.05 | −0.07 | +0.01 | −0.07 | −0.07 | −0.06 | +0.00 |
| 155 | Karthus | −0.05 | −0.03 | −0.05 | −0.13 | +0.03 | −0.08 | +0.00 |
| 156 | Blitzcrank | −0.07 | −0.06 | −0.10 | −0.11 | +0.05 | −0.21 | +0.00 |
| 157 | Veigar | −0.08 | +0.28 | +0.17 | −0.91 | +0.01 | – | +0.00 |
| 158 | Ambessa | −0.17 | −0.92 | −1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 159 | Kalista | −0.36 | −0.83 | +0.37 | −1.00 | −0.04 | – | +0.00 |
| 160 | Taliyah | −0.38 | −0.54 | −0.10 | −1.00 | +0.13 | – | +0.00 |
| 161 | Aatrox | −0.40 | −0.01 | −0.31 | −1.00 | −0.09 | −1.00 | +0.00 |
| 162 | Malzahar | −0.44 | −0.14 | −0.66 | −1.00 | +0.01 | – | +0.00 |
| 163 | Katarina | −0.45 | −1.00 | +0.02 | −1.00 | −0.01 | +0.00 | +0.00 |
| 164 | Yuumi | −0.56 | −0.82 | −0.23 | −1.00 | −0.02 | −1.00 | +0.00 |
| 165 | LeBlanc | −0.75 | −0.92 | −0.95 | −1.00 | −0.06 | – | +0.00 |
| 166 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 167 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 168 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 169 | Thresh | −0.80 | −0.98 | −0.99 | −1.00 | −0.07 | −1.00 | +0.00 |
| 170 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 171 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Vex's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vex's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Vex` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Mel (net +0.95)

- **0.70** projectile block: Rebuttal blocks Vex's Shadow Surge, a projectile. Rebuttal for 0.75 s; Shadow Surge takes 2.13 s to land, enough to react. (Mel W Rebuttal → Vex R Shadow Surge)
- **0.30** projectile block: Rebuttal blocks Vex's Looming Darkness, a projectile. Rebuttal for 0.75 s; Looming Darkness takes 0.87 s to land, enough to react. (Mel W Rebuttal → Vex E Looming Darkness)
- **0.27** projectile block: Rebuttal blocks Vex's Mistral Bolt, a projectile. Rebuttal for 0.75 s; Mistral Bolt takes 2.15 s to land, enough to react. (Mel W Rebuttal → Vex Q Mistral Bolt)

#### 2. Sivir (net +0.70)

- **0.70** spell shield: Spell Shield's spell shield blocks Vex's Shadow Surge. Spell shield for 1.5 s, long enough to use ahead of Shadow Surge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vex R Shadow Surge)

#### 3. Xayah (net +0.70)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Vex's Shadow Surge. Untargetable for 1.5 s, long enough to use ahead of Shadow Surge. (Xayah R Featherstorm → Vex R Shadow Surge)

#### 4. Lissandra (net +0.65)

- **0.70** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Vex's Shadow Surge. Untargetable for 2.5 s, long enough to use ahead of Shadow Surge. (Lissandra R Frozen Tomb → Vex R Shadow Surge)
- Watch out: Shadow Surge is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 5. Samira (net +0.52)

- **0.70** projectile block: Blade Whirl blocks Vex's Shadow Surge, a projectile. Blade Whirl for 0.75 s; Shadow Surge takes 2.13 s to land, enough to react. (Samira W Blade Whirl → Vex R Shadow Surge)
- **0.33** projectile block: Blade Whirl blocks Vex's Looming Darkness, a projectile. Blade Whirl for 0.75 s; Looming Darkness takes 0.87 s to land, enough to react. (Samira W Blade Whirl → Vex E Looming Darkness)
- **0.28** projectile block: Blade Whirl blocks Vex's Mistral Bolt, a projectile. Blade Whirl for 0.75 s; Mistral Bolt takes 2.15 s to land, enough to react. (Samira W Blade Whirl → Vex Q Mistral Bolt)
- Watch out: Doom 'n Gloom's knockdown can stop Samira's Wild Rush mid-dash.

#### 6. Zed (net +0.52)

- **0.70** untargetable: Death Mark makes Zed untargetable, dodging Vex's Shadow Surge. Untargetable for 0.6 s; Shadow Surge takes 2.13 s to land, enough to react. (Zed R Death Mark → Vex R Shadow Surge)
- Watch out: Vex's basic attacks reach 425 units farther than Zed's (550 vs 125 attack range).

#### 7. Vladimir (net +0.50)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Vex's Shadow Surge. Untargetable for 2 s, long enough to use ahead of Shadow Surge. (Vladimir W Sanguine Pool → Vex R Shadow Surge)
- Watch out: Vex's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 8. Morgana (net +0.47)

- **0.55** cc immunity: Black Shield makes Morgana immune to Vex's Doom 'n Gloom (fear, knockdown, slow). Immune for 5 s, long enough to use ahead of Doom 'n Gloom. (Morgana E Black Shield → Vex I Doom 'n Gloom)
- **0.10** cc immunity: Black Shield makes Morgana immune to Vex's Looming Darkness (slow). Immune for 5 s, long enough to use ahead of Looming Darkness. (Morgana E Black Shield → Vex E Looming Darkness)
- Watch out: Vex's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

#### 9. Nocturne (net +0.46)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Vex's Shadow Surge. Spell shield for 1.5 s, long enough to use ahead of Shadow Surge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Vex R Shadow Surge)
- **0.03** cc immunity: Paranoia is displacement immune, ignoring Vex's Doom 'n Gloom (knockdown) during it. Only during Paranoia. (Nocturne R Paranoia → Vex I Doom 'n Gloom)
- Watch out: Vex's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

#### 10. Braum (net +0.44)

- **0.70** projectile block: Unbreakable blocks Vex's Shadow Surge, a projectile. Unbreakable for 4 s, long enough to use ahead of Shadow Surge. (Braum E Unbreakable → Vex R Shadow Surge)
- **0.45** projectile block: Unbreakable blocks Vex's Looming Darkness, a projectile. Unbreakable for 4 s, long enough to use ahead of Looming Darkness. (Braum E Unbreakable → Vex E Looming Darkness)
- **0.39** projectile block: Unbreakable blocks Vex's Mistral Bolt, a projectile. Unbreakable for 4 s, long enough to use ahead of Mistral Bolt. (Braum E Unbreakable → Vex Q Mistral Bolt)
- Watch out: Doom 'n Gloom's knockdown can stop Braum's Stand Behind Me mid-dash.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +0.95 | 0.95 | 0.00 | projectile block (Rebuttal) |
| 2 | Sivir | +0.70 | 0.70 | 0.00 |  |
| 3 | Xayah | +0.70 | 0.70 | 0.00 |  |
| 4 | Lissandra | +0.65 | 0.70 | 0.05 |  |
| 5 | Samira | +0.52 | 0.96 | 0.44 | projectile block (Blade Whirl) |
| 6 | Zed | +0.52 | 0.70 | 0.18 |  |
| 7 | Vladimir | +0.50 | 0.70 | 0.20 |  |
| 8 | Morgana | +0.47 | 0.60 | 0.13 |  |
| 9 | Nocturne | +0.46 | 0.73 | 0.27 |  |
| 10 | Braum | +0.44 | 1.07 | 0.63 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 11 | Kayle | +0.42 | 0.42 | 0.00 |  |
| 12 | Master Yi | +0.39 | 0.81 | 0.42 |  |
| 13 | Yasuo | +0.37 | 1.00 | 0.63 | projectile block (Wind Wall) |
| 14 | Maokai | +0.36 | 0.70 | 0.34 |  |
| 15 | Udyr | +0.34 | 0.61 | 0.27 |  |
| 16 | Bard | +0.32 | 0.70 | 0.38 |  |
| 17 | Shaco | +0.32 | 0.70 | 0.38 |  |
| 18 | Teemo | +0.27 | 0.35 | 0.08 |  |
| 19 | Yuumi | +0.23 | 0.70 | 0.47 |  |
| 20 | Milio | +0.23 | 0.30 | 0.07 |  |
| 21 | Fiora | +0.21 | 0.73 | 0.52 |  |
| 22 | Lulu | +0.17 | 0.25 | 0.08 |  |
| 23 | Cassiopeia | +0.17 | 0.17 | 0.00 |  |
| 24 | Aurora | +0.15 | 0.72 | 0.57 |  |
| 25 | Evelynn | +0.13 | 0.70 | 0.57 |  |
| 26 | Gwen | +0.10 | 0.70 | 0.60 |  |
| 27 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 28 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 29 | Fizz | +0.06 | 0.70 | 0.64 |  |
| 30 | Annie | +0.04 | 0.04 | 0.00 |  |
| 31 | Rek'Sai | +0.02 | 0.72 | 0.70 |  |
| 32 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 33 | Brand | 0.00 | 0.00 | 0.00 |  |
| 34 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 35 | Karma | 0.00 | 0.00 | 0.00 |  |
| 36 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 37 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 38 | Lux | 0.00 | 0.00 | 0.00 |  |
| 39 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 40 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 41 | Sona | 0.00 | 0.00 | 0.00 |  |
| 42 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 43 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 44 | Jinx | -0.04 | 0.00 | 0.04 |  |
| 45 | Veigar | -0.04 | 0.00 | 0.04 |  |
| 46 | Viktor | -0.04 | 0.00 | 0.04 |  |
| 47 | Gangplank | -0.05 | 0.48 | 0.53 |  |
| 48 | Draven | -0.07 | 0.00 | 0.07 |  |
| 49 | Hwei | -0.07 | 0.00 | 0.07 |  |
| 50 | Renata Glasc | -0.07 | 0.00 | 0.07 |  |
| 51 | Swain | -0.07 | 0.00 | 0.07 |  |
| 52 | Syndra | -0.07 | 0.00 | 0.07 |  |
| 53 | Zoe | -0.07 | 0.00 | 0.07 |  |
| 54 | Orianna | -0.08 | 0.00 | 0.08 |  |
| 55 | Varus | -0.10 | 0.00 | 0.10 |  |
| 56 | Kayn | -0.11 | 0.70 | 0.81 |  |
| 57 | Senna | -0.11 | 0.00 | 0.11 |  |
| 58 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 59 | Camille | -0.12 | 0.72 | 0.84 |  |
| 60 | Kalista | -0.13 | 0.23 | 0.36 |  |
| 61 | Malzahar | -0.14 | 0.31 | 0.45 |  |
| 62 | Anivia | -0.14 | 0.00 | 0.14 |  |
| 63 | Neeko | -0.15 | 0.00 | 0.15 |  |
| 64 | Zyra | -0.16 | 0.00 | 0.16 |  |
| 65 | Nami | -0.18 | 0.00 | 0.18 |  |
| 66 | Garen | -0.19 | 0.31 | 0.50 |  |
| 67 | Elise | -0.19 | 0.00 | 0.19 |  |
| 68 | Nidalee | -0.19 | 0.00 | 0.19 |  |
| 69 | Olaf | -0.21 | 0.32 | 0.53 |  |
| 70 | Tristana | -0.22 | 0.14 | 0.36 |  |
| 71 | Kindred | -0.22 | 0.00 | 0.22 |  |
| 72 | Yunara | -0.22 | 0.00 | 0.22 |  |
| 73 | Jax | -0.24 | 0.28 | 0.52 |  |
| 74 | Shyvana | -0.24 | 0.03 | 0.27 |  |
| 75 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 76 | Malphite | -0.26 | 0.21 | 0.47 |  |
| 77 | Corki | -0.26 | 0.00 | 0.26 |  |
| 78 | Jayce | -0.26 | 0.00 | 0.26 |  |
| 79 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 80 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 81 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 82 | Caitlyn | -0.30 | 0.09 | 0.39 |  |
| 83 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 84 | Zaahen | -0.31 | 0.32 | 0.63 |  |
| 85 | Sett | -0.31 | 0.03 | 0.34 |  |
| 86 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 87 | Volibear | -0.34 | 0.03 | 0.37 |  |
| 88 | Rammus | -0.35 | 0.27 | 0.62 |  |
| 89 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 90 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 91 | Vayne | -0.35 | 0.00 | 0.35 |  |
| 92 | Vel'Koz | -0.35 | 0.00 | 0.35 |  |
| 93 | Illaoi | -0.36 | 0.03 | 0.39 |  |
| 94 | Sion | -0.39 | 0.34 | 0.73 |  |
| 95 | Mordekaiser | -0.39 | 0.25 | 0.64 |  |
| 96 | Nilah | -0.39 | 0.25 | 0.64 |  |
| 97 | Ahri | -0.39 | 0.00 | 0.39 |  |
| 98 | LeBlanc | -0.40 | 0.00 | 0.40 |  |
| 99 | Xin Zhao | -0.41 | 0.35 | 0.76 |  |
| 100 | Aurelion Sol | -0.41 | 0.00 | 0.41 |  |
| 101 | Karthus | -0.41 | 0.00 | 0.41 |  |
| 102 | Hecarim | -0.42 | 0.03 | 0.45 |  |
| 103 | Lucian | -0.42 | 0.00 | 0.42 |  |
| 104 | Rengar | -0.43 | 0.49 | 0.92 |  |
| 105 | Singed | -0.43 | 0.17 | 0.60 |  |
| 106 | Skarner | -0.43 | 0.10 | 0.53 |  |
| 107 | Ambessa | -0.43 | 0.00 | 0.43 |  |
| 108 | Fiddlesticks | -0.43 | 0.00 | 0.43 |  |
| 109 | Pantheon | -0.44 | 0.35 | 0.79 |  |
| 110 | Ivern | -0.44 | 0.00 | 0.44 |  |
| 111 | Alistar | -0.45 | 0.25 | 0.70 |  |
| 112 | Ekko | -0.45 | 0.00 | 0.45 |  |
| 113 | Kai'Sa | -0.46 | 0.00 | 0.46 |  |
| 114 | Lillia | -0.46 | 0.00 | 0.46 |  |
| 115 | Gnar | -0.47 | 0.00 | 0.47 |  |
| 116 | Irelia | -0.48 | 0.00 | 0.48 |  |
| 117 | Quinn | -0.48 | 0.00 | 0.48 |  |
| 118 | Kled | -0.50 | 0.30 | 0.80 |  |
| 119 | Warwick | -0.51 | 0.36 | 0.87 |  |
| 120 | Azir | -0.51 | 0.00 | 0.51 |  |
| 121 | Bel'Veth | -0.51 | 0.00 | 0.51 |  |
| 122 | K'Sante | -0.52 | 0.06 | 0.58 |  |
| 123 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 124 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 125 | Taric | -0.53 | 0.00 | 0.53 |  |
| 126 | Tryndamere | -0.53 | 0.00 | 0.53 |  |
| 127 | Ziggs | -0.53 | 0.00 | 0.53 |  |
| 128 | Graves | -0.54 | 0.00 | 0.54 |  |
| 129 | Akshan | -0.55 | 0.00 | 0.55 |  |
| 130 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 131 | Thresh | -0.55 | 0.00 | 0.55 |  |
| 132 | Shen | -0.56 | 0.27 | 0.83 |  |
| 133 | Darius | -0.57 | 0.00 | 0.57 |  |
| 134 | Trundle | -0.57 | 0.00 | 0.57 |  |
| 135 | Leona | -0.58 | 0.00 | 0.58 |  |
| 136 | Locke | -0.58 | 0.00 | 0.58 |  |
| 137 | Renekton | -0.58 | 0.00 | 0.58 |  |
| 138 | Cho'Gath | -0.60 | 0.00 | 0.60 |  |
| 139 | Urgot | -0.61 | 0.00 | 0.61 |  |
| 140 | Yone | -0.63 | 0.03 | 0.66 |  |
| 141 | Janna | -0.63 | 0.00 | 0.63 |  |
| 142 | Briar | -0.64 | 0.00 | 0.64 |  |
| 143 | Yorick | -0.64 | 0.00 | 0.64 |  |
| 144 | Aatrox | -0.66 | 0.00 | 0.66 |  |
| 145 | Nautilus | -0.68 | 0.00 | 0.68 |  |
| 146 | Talon | -0.68 | 0.00 | 0.68 |  |
| 147 | Viego | -0.69 | 0.03 | 0.72 |  |
| 148 | Jarvan IV | -0.71 | 0.03 | 0.74 |  |
| 149 | Blitzcrank | -0.71 | 0.00 | 0.71 |  |
| 150 | Lee Sin | -0.71 | 0.00 | 0.71 |  |
| 151 | Diana | -0.72 | 0.00 | 0.72 |  |
| 152 | Amumu | -0.75 | 0.00 | 0.75 |  |
| 153 | Pyke | -0.80 | 0.00 | 0.80 |  |
| 154 | Qiyana | -0.81 | 0.00 | 0.81 |  |
| 155 | Kha'Zix | -0.82 | 0.00 | 0.82 |  |
| 156 | Sylas | -0.83 | 0.00 | 0.83 |  |
| 157 | Nunu & Willump | -0.86 | 0.20 | 1.06 |  |
| 158 | Vi | -0.87 | 0.03 | 0.90 |  |
| 159 | Naafiri | -0.87 | 0.00 | 0.87 |  |
| 160 | Rakan | -0.87 | 0.00 | 0.87 |  |
| 161 | Poppy | -0.88 | 0.00 | 0.88 |  |
| 162 | Akali | -0.89 | 0.00 | 0.89 |  |
| 163 | Rell | -0.89 | 0.00 | 0.89 |  |
| 164 | Tahm Kench | -0.91 | 0.00 | 0.91 |  |
| 165 | Riven | -0.94 | 0.00 | 0.94 |  |
| 166 | Sejuani | -0.94 | 0.00 | 0.94 |  |
| 167 | Zac | -0.96 | 0.00 | 0.96 |  |
| 168 | Ornn | -0.97 | 0.03 | 1.00 |  |
| 169 | Gragas | -0.98 | 0.00 | 0.98 |  |
| 170 | Wukong | -0.99 | 0.00 | 0.99 |  |
| 171 | Taliyah | -1.00 | 0.00 | 1.00 |  |
| 172 | Galio | -1.11 | 0.00 | 1.11 |  |
