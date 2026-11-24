# Counters to Lucian (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Lucian: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Lucian wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Lucian --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Master Yi | +0.86 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +1.00 |
| 2 | Nilah | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 3 | Ashe | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 4 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 5 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +1.00 |
| 6 | Udyr | +0.83 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +1.00 |
| 7 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +1.00 |
| 8 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 9 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 10 | Pantheon | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 11 | Yasuo | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 12 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 13 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 14 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 15 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 16 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 17 | Ziggs | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 18 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 19 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 20 | Ambessa | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 21 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 22 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 23 | Heimerdinger | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 24 | Xayah | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 25 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 26 | Darius | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 27 | Cassiopeia | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 28 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 29 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 30 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 31 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 32 | Twisted Fate | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 33 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 34 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 35 | Miss Fortune | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 36 | Sion | +0.79 | +1.00 | +1.00 | +0.99 | −0.05 | +1.00 | +0.00 |
| 37 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 38 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 39 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 40 | Samira | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 41 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 42 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 43 | Gragas | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 44 | Elise | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 45 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 46 | Vayne | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 47 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 48 | Kassadin | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 49 | Kai'Sa | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 50 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 51 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 52 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 53 | Azir | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 54 | Zed | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 55 | Graves | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 56 | Malzahar | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 57 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 58 | Fiddlesticks | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 59 | Kennen | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 60 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 61 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 62 | Wukong | +0.67 | +1.00 | +1.00 | +1.00 | −0.21 | +0.00 | +0.00 |
| 63 | Swain | +0.67 | +1.00 | +0.55 | +1.00 | +0.09 | – | +0.00 |
| 64 | Viego | +0.65 | +1.00 | +1.00 | +1.00 | −0.03 | −0.49 | +0.00 |
| 65 | Riven | +0.62 | +1.00 | +1.00 | +1.00 | +0.15 | −1.00 | +0.00 |
| 66 | Kled | +0.62 | +1.00 | +1.00 | +1.00 | +0.10 | −1.00 | +0.00 |
| 67 | Zac | +0.59 | +0.80 | +0.95 | +0.92 | −0.17 | −0.03 | +0.00 |
| 68 | Anivia | +0.59 | +0.30 | +1.00 | +0.90 | −0.08 | +1.00 | +0.00 |
| 69 | Vi | +0.59 | +1.00 | +1.00 | +1.00 | −0.05 | −1.00 | +0.00 |
| 70 | Volibear | +0.58 | +1.00 | +1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 71 | Olaf | +0.57 | +1.00 | +1.00 | +1.00 | −0.20 | −1.00 | +0.00 |
| 72 | Mordekaiser | +0.56 | +0.09 | +1.00 | +0.98 | +0.00 | +0.87 | +0.00 |
| 73 | Braum | +0.54 | +0.80 | +0.94 | +0.87 | −0.05 | −0.66 | +0.00 |
| 74 | Kalista | +0.50 | +0.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 75 | Sylas | +0.43 | +1.00 | +1.00 | −1.00 | +0.18 | +1.00 | +0.00 |
| 76 | Maokai | +0.39 | +0.00 | +1.00 | +0.00 | +0.26 | +1.00 | +0.00 |
| 77 | Yunara | +0.35 | +1.00 | +1.00 | −1.00 | +0.09 | – | +0.00 |
| 78 | Akshan | +0.34 | +1.00 | +1.00 | −1.00 | +0.05 | – | +0.00 |
| 79 | Varus | +0.34 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 80 | Kindred | +0.34 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 81 | Quinn | +0.32 | +1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 82 | Brand | +0.32 | +0.34 | +0.13 | +0.82 | +0.04 | – | +0.00 |
| 83 | Lee Sin | +0.29 | −1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 84 | Tahm Kench | +0.28 | +0.01 | +0.01 | +0.91 | +0.11 | +0.80 | +0.00 |
| 85 | Warwick | +0.24 | +1.00 | −1.00 | +1.00 | −0.39 | +1.00 | +0.00 |
| 86 | Viktor | +0.24 | −1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 87 | Zilean | +0.23 | −1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 88 | Kayn | +0.22 | −1.00 | +1.00 | +0.82 | −0.15 | +0.82 | +0.00 |
| 89 | Xin Zhao | +0.20 | −0.10 | −0.14 | +1.00 | −0.01 | +0.63 | +0.00 |
| 90 | Urgot | +0.19 | −0.07 | +0.36 | +0.98 | +0.14 | −1.00 | +0.00 |
| 91 | Rakan | +0.18 | +1.00 | +1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 92 | Lillia | +0.15 | +0.14 | +0.39 | +0.49 | +0.09 | −1.00 | +0.00 |
| 93 | Sett | +0.11 | +1.00 | −1.00 | +1.00 | +0.04 | −1.00 | +0.00 |
| 94 | Shen | +0.10 | −1.00 | +1.00 | +1.00 | −0.00 | −1.00 | +0.00 |
| 95 | Rek'Sai | +0.09 | +1.00 | −1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 96 | Cho'Gath | +0.08 | +1.00 | −1.00 | +1.00 | −0.11 | −1.00 | +0.00 |
| 97 | Karthus | +0.02 | +0.00 | +0.00 | +0.00 | +0.11 | – | +0.00 |
| 98 | Illaoi | +0.00 | −0.27 | −0.60 | +1.00 | −0.05 | +0.30 | +0.00 |
| 99 | Skarner | +0.00 | +0.55 | −1.00 | +1.00 | +0.12 | −1.00 | +0.00 |
| 100 | Taric | −0.00 | +0.02 | −0.03 | +0.03 | +0.02 | −0.11 | +0.00 |
| 101 | Irelia | −0.03 | +0.20 | −1.00 | +0.65 | +0.06 | +0.33 | +0.00 |
| 102 | Jarvan IV | −0.07 | −1.00 | +1.00 | −1.00 | +0.18 | +1.00 | +0.00 |
| 103 | Ornn | −0.08 | +0.29 | +0.41 | −1.00 | −0.03 | −0.52 | +0.00 |
| 104 | Garen | −0.09 | +1.00 | −1.00 | −1.00 | +0.05 | +1.00 | +0.00 |
| 105 | Rumble | −0.12 | −1.00 | +0.15 | +1.00 | −0.03 | −1.00 | +0.00 |
| 106 | Aatrox | −0.18 | −1.00 | −0.02 | +1.00 | −0.19 | −1.00 | +0.00 |
| 107 | Naafiri | −0.18 | −1.00 | −1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 108 | Caitlyn | −0.23 | −0.03 | +0.27 | −1.00 | +0.04 | −1.00 | +0.00 |
| 109 | Milio | −0.25 | −0.16 | −1.00 | +0.35 | −0.01 | – | +0.00 |
| 110 | Smolder | −0.25 | −1.00 | +0.00 | +0.00 | +0.16 | – | +0.00 |
| 111 | Alistar | −0.30 | −1.00 | +1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 112 | Sejuani | −0.30 | −1.00 | +1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 113 | Vel'Koz | −0.32 | −1.00 | +0.59 | −1.00 | +0.08 | – | +0.00 |
| 114 | Jhin | −0.32 | −1.00 | −1.00 | +1.00 | +0.05 | – | +0.00 |
| 115 | Draven | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 116 | Yone | −0.39 | −1.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.56 |
| 117 | Senna | −0.40 | +0.58 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 118 | Gnar | −0.40 | −1.00 | +0.17 | −0.50 | +0.04 | −1.00 | +0.00 |
| 119 | Aurelion Sol | −0.42 | −1.00 | +0.00 | −1.00 | +0.50 | – | +0.00 |
| 120 | Leona | −0.45 | −1.00 | −1.00 | +0.81 | −0.08 | −1.00 | +0.00 |
| 121 | Akali | −0.48 | −0.50 | −0.99 | −0.32 | −0.05 | −0.41 | +0.00 |
| 122 | Twitch | −0.49 | +0.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 123 | Rengar | −0.49 | −1.00 | +0.00 | −1.00 | +0.39 | −1.00 | +0.00 |
| 124 | Janna | −0.52 | −0.15 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 125 | Bard | −0.53 | −0.37 | −0.74 | −1.00 | +0.02 | – | +0.00 |
| 126 | Nidalee | −0.57 | −1.00 | −0.23 | −1.00 | −0.03 | – | +0.00 |
| 127 | Zoe | −0.59 | −0.43 | −0.93 | −1.00 | +0.04 | – | +0.00 |
| 128 | Shaco | −0.61 | −1.00 | −1.00 | +0.00 | −0.05 | −1.00 | +0.00 |
| 129 | Briar | −0.65 | −1.00 | −1.00 | −1.00 | −0.36 | +1.00 | +0.00 |
| 130 | Hwei | −0.73 | −1.00 | −0.85 | −1.00 | +0.01 | – | +0.00 |
| 131 | Ryze | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 132 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 133 | Lux | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 134 | Jinx | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 135 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 136 | Zyra | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 137 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 138 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 139 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 140 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 141 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 142 | Seraphine | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 143 | Aurora | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 144 | Ezreal | −0.78 | −1.00 | −0.99 | −1.00 | −0.01 | – | +0.00 |
| 145 | Karma | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 146 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 147 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 148 | Yuumi | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 149 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 150 | Vladimir | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 151 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 152 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 153 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 154 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 155 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 156 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 157 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 158 | Morgana | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 159 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 160 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 161 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 162 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 163 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 164 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 165 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 166 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 167 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 168 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 169 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 170 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 171 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 172 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Lucian's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lucian's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lucian` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.19)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Lucian's The Culling (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Lucian R The Culling)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Lucian's The Culling (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Lucian R The Culling)
- **0.28** interrupt: Full Tilt's stun interrupts Lucian's The Culling (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Lucian R The Culling)
- Watch out: Lucian's basic attacks reach 325 units farther than Rell's (500 vs 175 attack range).

#### 2. Yasuo (net +1.19)

- **0.55** projectile block: Wind Wall blocks Lucian's The Culling, a projectile. Wind Wall for 4 s, long enough to use ahead of The Culling. (Yasuo W Wind Wall → Lucian R The Culling)
- **0.41** projectile block: Wind Wall blocks Lucian's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Lucian basic attacks)
- **0.34** projectile block: Wind Wall blocks Lucian's Ardent Blaze, a projectile. Wind Wall for 4 s, long enough to use ahead of Ardent Blaze. (Yasuo W Wind Wall → Lucian W Ardent Blaze)
- Watch out: Lucian's basic attacks reach 325 units farther than Yasuo's (500 vs 175 attack range).

#### 3. Braum (net +1.11)

- **0.55** projectile block: Unbreakable blocks Lucian's The Culling, a projectile. Unbreakable for 4 s, long enough to use ahead of The Culling. (Braum E Unbreakable → Lucian R The Culling)
- **0.54** projectile block: Unbreakable blocks Lucian's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Lucian basic attacks)
- **0.45** projectile block: Unbreakable blocks Lucian's Ardent Blaze, a projectile. Unbreakable for 4 s, long enough to use ahead of Ardent Blaze. (Braum E Unbreakable → Lucian W Ardent Blaze)
- Watch out: Lucian's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

#### 4. Fizz (net +0.85)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Lucian's The Culling. Untargetable for 0.75 s; The Culling takes 0.43 s to land, enough to react. (Fizz E Playful → Lucian R The Culling)
- **0.35** untargetable: Playful makes Fizz untargetable, dodging Lucian's Piercing Light. Untargetable for 0.75 s; Piercing Light takes 0.25 s to land, enough to react. (Fizz E Playful → Lucian Q Piercing Light)
- **0.28** interrupt: Chum the Waters's airborne interrupts Lucian's The Culling (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Lucian R The Culling)
- Watch out: Lucian's basic attacks reach 325 units farther than Fizz's (500 vs 175 attack range).

#### 5. Camille (net +0.84)

- **0.55** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Lucian's The Culling. Untargetable for 0.5 s; The Culling takes 0.43 s to land, enough to react. (Camille R The Hextech Ultimatum → Lucian R The Culling)
- **0.28** interrupt: The Hextech Ultimatum's airborne interrupts Lucian's The Culling (normal channel). The Hextech Ultimatum must land during the channel. (Camille R The Hextech Ultimatum → Lucian R The Culling)
- **0.28** interrupt: Wall Dive's airborne interrupts Lucian's The Culling (normal channel). Wall Dive must land during the channel. (Camille E Wall Dive → Lucian R The Culling)
- Watch out: Lucian's basic attacks reach 375 units farther than Camille's (500 vs 125 attack range).

#### 6. Samira (net +0.79)

- **0.55** projectile block: Blade Whirl blocks Lucian's The Culling, a projectile. Blade Whirl for 0.75 s; The Culling takes 0.43 s to land, enough to react. (Samira W Blade Whirl → Lucian R The Culling)
- **0.32** projectile block: Blade Whirl blocks Lucian's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Lucian basic attacks)
- **0.30** projectile block: Blade Whirl blocks Lucian's Ardent Blaze, a projectile. Blade Whirl for 0.75 s; Ardent Blaze takes 0.81 s to land, enough to react. (Samira W Blade Whirl → Lucian W Ardent Blaze)

#### 7. Taliyah (net +0.79)

- **0.28** interrupt: Seismic Shove's airborne interrupts Lucian's The Culling (normal channel). Seismic Shove must land during the channel. (Taliyah W Seismic Shove → Lucian R The Culling)
- **0.28** interrupt: Unraveled Earth's stun interrupts Lucian's The Culling (normal channel). Unraveled Earth must land during the channel. (Taliyah E Unraveled Earth → Lucian R The Culling)
- **0.23** interrupt: Weaver's Wall's airborne interrupts Lucian's The Culling (normal channel). Weaver's Wall must land during the channel. (Taliyah R Weaver's Wall → Lucian R The Culling)

#### 8. Lulu (net +0.78)

- **0.36** disarm: Whimsy disarms Lucian for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Lucian basic attacks)
- **0.28** interrupt: Whimsy's polymorph interrupts Lucian's The Culling (normal channel). Whimsy must land during the channel. (Lulu W Whimsy → Lucian R The Culling)
- **0.28** interrupt: Wild Growth's airborne interrupts Lucian's The Culling (normal channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Lucian R The Culling)

#### 9. Mel (net +0.78)

- **0.55** projectile block: Rebuttal blocks Lucian's The Culling, a projectile. Rebuttal for 0.75 s; The Culling takes 0.43 s to land, enough to react. (Mel W Rebuttal → Lucian R The Culling)
- **0.32** projectile block: Rebuttal blocks Lucian's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Lucian basic attacks)
- **0.28** projectile block: Rebuttal blocks Lucian's Ardent Blaze, a projectile. Rebuttal for 0.75 s; Ardent Blaze takes 0.81 s to land, enough to react. (Mel W Rebuttal → Lucian W Ardent Blaze)

#### 10. Kayle (net +0.76)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Lucian's The Culling. Invulnerable for 2.5 s, long enough to use ahead of The Culling. (Kayle R Divine Judgment → Lucian R The Culling)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Lucian's Piercing Light. Invulnerable for 2.5 s, long enough to use ahead of Piercing Light. (Kayle R Divine Judgment → Lucian Q Piercing Light)
- **0.11** range: Kayle's basic attacks reach 125 units farther than Lucian's (625 vs 500 attack range). Lucian closes the gap with Relentless Pursuit. (Kayle basic attacks → Lucian basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.19 | 1.40 | 0.21 |  |
| 2 | Yasuo | +1.19 | 1.40 | 0.21 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 3 | Braum | +1.11 | 1.47 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Fizz | +0.85 | 1.01 | 0.16 |  |
| 5 | Camille | +0.84 | 1.02 | 0.18 |  |
| 6 | Samira | +0.79 | 0.79 | 0.00 | projectile block (Blade Whirl) |
| 7 | Taliyah | +0.79 | 0.79 | 0.00 |  |
| 8 | Lulu | +0.78 | 0.78 | 0.00 |  |
| 9 | Mel | +0.78 | 0.78 | 0.00 | projectile block (Rebuttal) |
| 10 | Kayle | +0.76 | 0.76 | 0.00 |  |
| 11 | Lissandra | +0.76 | 0.76 | 0.00 |  |
| 12 | Bard | +0.74 | 0.74 | 0.00 |  |
| 13 | Kayn | +0.72 | 0.93 | 0.21 |  |
| 14 | Rek'Sai | +0.72 | 0.93 | 0.21 |  |
| 15 | Viktor | +0.72 | 0.72 | 0.00 |  |
| 16 | Yuumi | +0.71 | 0.78 | 0.07 |  |
| 17 | Zac | +0.69 | 1.00 | 0.31 |  |
| 18 | Evelynn | +0.69 | 0.93 | 0.24 |  |
| 19 | Shaco | +0.69 | 0.93 | 0.24 |  |
| 20 | Vladimir | +0.68 | 0.68 | 0.00 |  |
| 21 | Xin Zhao | +0.67 | 0.98 | 0.31 |  |
| 22 | K'Sante | +0.67 | 0.84 | 0.17 |  |
| 23 | Malzahar | +0.64 | 0.64 | 0.00 |  |
| 24 | Maokai | +0.63 | 0.99 | 0.36 |  |
| 25 | Anivia | +0.62 | 0.62 | 0.00 |  |
| 26 | Aurora | +0.62 | 0.62 | 0.00 |  |
| 27 | Xayah | +0.62 | 0.62 | 0.00 |  |
| 28 | Rammus | +0.58 | 0.94 | 0.36 |  |
| 29 | Cassiopeia | +0.57 | 0.57 | 0.00 |  |
| 30 | Galio | +0.56 | 0.78 | 0.22 |  |
| 31 | Fiddlesticks | +0.56 | 0.56 | 0.00 |  |
| 32 | Gnar | +0.56 | 0.56 | 0.00 |  |
| 33 | Heimerdinger | +0.56 | 0.56 | 0.00 |  |
| 34 | Thresh | +0.56 | 0.56 | 0.00 |  |
| 35 | Aurelion Sol | +0.54 | 0.54 | 0.00 |  |
| 36 | Janna | +0.54 | 0.54 | 0.00 |  |
| 37 | Nami | +0.54 | 0.54 | 0.00 |  |
| 38 | Tahm Kench | +0.53 | 0.84 | 0.31 |  |
| 39 | Renata Glasc | +0.53 | 0.53 | 0.00 |  |
| 40 | Seraphine | +0.51 | 0.51 | 0.00 |  |
| 41 | Sejuani | +0.50 | 0.84 | 0.34 |  |
| 42 | Teemo | +0.50 | 0.50 | 0.00 | blind (Blinding Dart) |
| 43 | Yone | +0.48 | 0.64 | 0.16 |  |
| 44 | Pantheon | +0.47 | 0.68 | 0.21 |  |
| 45 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 46 | Hwei | +0.44 | 0.44 | 0.00 |  |
| 47 | Tristana | +0.44 | 0.44 | 0.00 |  |
| 48 | Veigar | +0.44 | 0.44 | 0.00 |  |
| 49 | Shen | +0.43 | 0.67 | 0.24 |  |
| 50 | Rakan | +0.43 | 0.56 | 0.13 |  |
| 51 | Urgot | +0.42 | 0.56 | 0.14 |  |
| 52 | Viego | +0.42 | 0.56 | 0.14 |  |
| 53 | Vex | +0.42 | 0.42 | 0.00 |  |
| 54 | Kled | +0.41 | 0.53 | 0.12 |  |
| 55 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 56 | Warwick | +0.40 | 0.64 | 0.24 |  |
| 57 | Zed | +0.38 | 0.62 | 0.24 |  |
| 58 | Master Yi | +0.37 | 0.68 | 0.31 |  |
| 59 | Nilah | +0.37 | 0.63 | 0.26 |  |
| 60 | Ashe | +0.37 | 0.37 | 0.00 |  |
| 61 | Fiora | +0.36 | 0.70 | 0.34 |  |
| 62 | Nocturne | +0.35 | 0.71 | 0.36 |  |
| 63 | Zaahen | +0.35 | 0.56 | 0.21 |  |
| 64 | Annie | +0.35 | 0.35 | 0.00 |  |
| 65 | Gwen | +0.34 | 0.68 | 0.34 |  |
| 66 | Pyke | +0.34 | 0.56 | 0.22 |  |
| 67 | Ornn | +0.33 | 0.54 | 0.21 |  |
| 68 | Riven | +0.32 | 0.56 | 0.24 |  |
| 69 | Vi | +0.32 | 0.56 | 0.24 |  |
| 70 | Zyra | +0.32 | 0.32 | 0.00 |  |
| 71 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 72 | Poppy | +0.28 | 0.64 | 0.36 |  |
| 73 | Azir | +0.28 | 0.28 | 0.00 |  |
| 74 | Brand | +0.28 | 0.28 | 0.00 |  |
| 75 | Draven | +0.28 | 0.28 | 0.00 |  |
| 76 | Elise | +0.28 | 0.28 | 0.00 |  |
| 77 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 78 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 79 | Milio | +0.28 | 0.28 | 0.00 |  |
| 80 | Neeko | +0.28 | 0.28 | 0.00 |  |
| 81 | Orianna | +0.28 | 0.28 | 0.00 |  |
| 82 | Quinn | +0.28 | 0.28 | 0.00 |  |
| 83 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 84 | Swain | +0.28 | 0.28 | 0.00 |  |
| 85 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 86 | Twisted Fate | +0.28 | 0.28 | 0.00 |  |
| 87 | Vayne | +0.28 | 0.28 | 0.00 |  |
| 88 | Vel'Koz | +0.28 | 0.28 | 0.00 |  |
| 89 | Xerath | +0.28 | 0.28 | 0.00 |  |
| 90 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 91 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 92 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 93 | Amumu | +0.26 | 0.62 | 0.36 |  |
| 94 | Sona | +0.26 | 0.26 | 0.00 |  |
| 95 | Kalista | +0.23 | 0.23 | 0.00 |  |
| 96 | Alistar | +0.20 | 0.56 | 0.36 |  |
| 97 | Gragas | +0.20 | 0.56 | 0.36 |  |
| 98 | Leona | +0.20 | 0.56 | 0.36 |  |
| 99 | Sett | +0.20 | 0.56 | 0.36 |  |
| 100 | Jax | +0.19 | 0.55 | 0.36 | attack dodge (Counter Strike) |
| 101 | Varus | +0.17 | 0.17 | 0.00 |  |
| 102 | Malphite | +0.15 | 0.51 | 0.36 |  |
| 103 | Caitlyn | +0.14 | 0.14 | 0.00 |  |
| 104 | Blitzcrank | +0.12 | 0.84 | 0.72 |  |
| 105 | Jarvan IV | +0.12 | 0.28 | 0.16 |  |
| 106 | Sylas | +0.12 | 0.28 | 0.16 |  |
| 107 | Briar | +0.10 | 0.28 | 0.18 |  |
| 108 | Lillia | +0.08 | 0.25 | 0.17 |  |
| 109 | Senna | +0.08 | 0.08 | 0.00 |  |
| 110 | Wukong | +0.07 | 0.28 | 0.21 |  |
| 111 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 112 | Bel'Veth | +0.06 | 0.28 | 0.22 |  |
| 113 | Volibear | +0.06 | 0.28 | 0.22 |  |
| 114 | Hecarim | +0.05 | 0.26 | 0.21 |  |
| 115 | Singed | +0.04 | 0.76 | 0.72 |  |
| 116 | Lee Sin | +0.04 | 0.28 | 0.24 |  |
| 117 | Ambessa | +0.02 | 0.26 | 0.24 |  |
| 118 | Qiyana | +0.01 | 0.23 | 0.22 |  |
| 119 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 120 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 121 | Corki | 0.00 | 0.00 | 0.00 |  |
| 122 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 123 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 124 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 125 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 126 | Karma | 0.00 | 0.00 | 0.00 |  |
| 127 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 128 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 129 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 130 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 131 | Lux | 0.00 | 0.00 | 0.00 |  |
| 132 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 133 | Morgana | 0.00 | 0.00 | 0.00 |  |
| 134 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 135 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 136 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 137 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 138 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 139 | Irelia | -0.01 | 0.28 | 0.29 |  |
| 140 | Aatrox | -0.03 | 0.28 | 0.31 |  |
| 141 | Nautilus | -0.03 | 0.28 | 0.31 |  |
| 142 | Graves | -0.05 | 0.00 | 0.05 |  |
| 143 | Sion | -0.06 | 0.56 | 0.62 |  |
| 144 | Diana | -0.06 | 0.28 | 0.34 |  |
| 145 | Kassadin | -0.06 | 0.28 | 0.34 |  |
| 146 | Shyvana | -0.06 | 0.28 | 0.34 |  |
| 147 | Renekton | -0.08 | 0.28 | 0.36 |  |
| 148 | Udyr | -0.08 | 0.28 | 0.36 |  |
| 149 | Cho'Gath | -0.16 | 0.56 | 0.72 |  |
| 150 | Naafiri | -0.18 | 0.00 | 0.18 |  |
| 151 | Katarina | -0.24 | 0.12 | 0.36 |  |
| 152 | Akali | -0.24 | 0.00 | 0.24 |  |
| 153 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 154 | Talon | -0.24 | 0.00 | 0.24 |  |
| 155 | Mordekaiser | -0.25 | 0.37 | 0.62 |  |
| 156 | Tryndamere | -0.31 | 0.00 | 0.31 |  |
| 157 | Nasus | -0.33 | 0.39 | 0.72 |  |
| 158 | Darius | -0.34 | 0.28 | 0.62 |  |
| 159 | Garen | -0.34 | 0.28 | 0.62 |  |
| 160 | Trundle | -0.34 | 0.28 | 0.62 |  |
| 161 | Yorick | -0.34 | 0.28 | 0.62 |  |
| 162 | Illaoi | -0.36 | 0.00 | 0.36 |  |
| 163 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 164 | Locke | -0.36 | 0.00 | 0.36 |  |
| 165 | Skarner | -0.39 | 0.28 | 0.67 |  |
| 166 | Taric | -0.39 | 0.28 | 0.67 |  |
| 167 | Nunu & Willump | -0.44 | 0.28 | 0.72 |  |
| 168 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 169 | Gangplank | -0.72 | 0.00 | 0.72 |  |
| 170 | Olaf | -0.72 | 0.00 | 0.72 |  |
| 171 | Rengar | -0.72 | 0.00 | 0.72 |  |
| 172 | Rumble | -0.72 | 0.00 | 0.72 |  |
