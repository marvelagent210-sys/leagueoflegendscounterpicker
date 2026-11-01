# Counters to Viktor (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Viktor: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Viktor wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Viktor --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.41 | +1.00 | +0.00 |
| 2 | Zeri | +0.86 | +1.00 | +1.00 | +1.00 | +0.14 | – | +1.00 |
| 3 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +1.00 |
| 4 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +1.00 |
| 5 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 6 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 7 | Sylas | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 8 | Vel'Koz | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.00 |
| 9 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 10 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | −0.02 | – | +1.00 |
| 11 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 12 | Ziggs | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 13 | Annie | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 14 | Xin Zhao | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 15 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 16 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 17 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 18 | Lee Sin | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 19 | Riven | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 20 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 21 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 22 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 23 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +0.99 | +0.00 |
| 24 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 25 | Jhin | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 26 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 27 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 28 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 29 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 30 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 31 | Senna | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 32 | Bel'Veth | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 33 | Smolder | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 34 | Swain | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 35 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 36 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 37 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 38 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 39 | Cassiopeia | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 40 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 41 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 42 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 43 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 44 | Milio | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 45 | Lux | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 46 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 47 | Jinx | +0.79 | +1.00 | +1.00 | +0.99 | +0.08 | – | +0.00 |
| 48 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 49 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 50 | Ryze | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 51 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 52 | Yunara | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 53 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 54 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 55 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 56 | Karma | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 57 | Azir | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 58 | Aurora | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 59 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 60 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 61 | Neeko | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 62 | Hwei | +0.78 | +1.00 | +1.00 | +0.99 | +0.04 | – | +0.00 |
| 63 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 64 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 65 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 66 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 67 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 68 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 69 | Akshan | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 70 | Draven | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 71 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 72 | Kindred | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 73 | Ezreal | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 74 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 75 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 76 | Rumble | +0.77 | +0.95 | +1.00 | +1.00 | −0.06 | +0.93 | +0.00 |
| 77 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 78 | Volibear | +0.76 | +1.00 | +1.00 | +0.63 | −0.01 | +1.00 | +0.81 |
| 79 | Kai'Sa | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 80 | Quinn | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 81 | Sion | +0.73 | +0.88 | +0.93 | +0.92 | −0.02 | +1.00 | +0.00 |
| 82 | Graves | +0.71 | +1.00 | +1.00 | +1.00 | +0.08 | +0.00 | +0.00 |
| 83 | Rek'Sai | +0.71 | +1.00 | +1.00 | +1.00 | −0.04 | +0.13 | +0.00 |
| 84 | Aatrox | +0.70 | +0.95 | +0.85 | +0.84 | −0.12 | +0.93 | +0.00 |
| 85 | Rammus | +0.69 | +1.00 | +1.00 | +0.50 | −0.08 | +1.00 | +0.00 |
| 86 | Briar | +0.67 | +1.00 | +1.00 | +1.00 | +0.03 | −0.36 | +0.00 |
| 87 | Rell | +0.64 | +1.00 | +1.00 | +0.08 | +0.15 | +1.00 | +0.00 |
| 88 | Gragas | +0.61 | +1.00 | +1.00 | +0.06 | +0.01 | +1.00 | +0.00 |
| 89 | Irelia | +0.59 | +1.00 | +1.00 | −0.09 | +0.04 | +1.00 | +0.00 |
| 90 | Rakan | +0.57 | +1.00 | +0.06 | +1.00 | +0.03 | +1.00 | +0.00 |
| 91 | Kayn | +0.53 | +0.82 | +0.82 | +1.00 | +0.01 | −0.84 | +0.00 |
| 92 | Mordekaiser | +0.47 | +0.34 | +0.56 | +0.97 | −0.04 | +0.54 | +0.00 |
| 93 | Yone | +0.42 | +1.00 | +1.00 | −1.00 | −0.07 | +1.00 | +0.55 |
| 94 | Aurelion Sol | +0.42 | +1.00 | +1.00 | −1.00 | +0.50 | – | +0.00 |
| 95 | Ambessa | +0.41 | +1.00 | +1.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 96 | Caitlyn | +0.41 | +1.00 | +1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 97 | Viego | +0.40 | +1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 98 | Vi | +0.40 | +1.00 | +1.00 | −1.00 | +0.00 | +1.00 | +0.00 |
| 99 | Pantheon | +0.40 | +1.00 | +1.00 | −1.00 | +0.00 | +1.00 | +0.00 |
| 100 | Nilah | +0.40 | +1.00 | +1.00 | −1.00 | −0.01 | +1.00 | +0.00 |
| 101 | Cho'Gath | +0.39 | +1.00 | +1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 102 | Janna | +0.36 | +1.00 | +1.00 | −1.00 | +0.13 | – | +0.00 |
| 103 | Syndra | +0.35 | +1.00 | +1.00 | −1.00 | +0.11 | – | +0.00 |
| 104 | Miss Fortune | +0.35 | +1.00 | +1.00 | −1.00 | +0.09 | – | +0.00 |
| 105 | Zoe | +0.35 | +1.00 | +1.00 | −1.00 | +0.07 | – | +0.00 |
| 106 | Mel | +0.34 | +1.00 | +1.00 | −1.00 | +0.07 | – | +0.00 |
| 107 | Sona | +0.34 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.00 |
| 108 | Twitch | +0.34 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.00 |
| 109 | Xerath | +0.34 | +1.00 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 110 | Fiddlesticks | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 111 | Soraka | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 112 | Malzahar | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 113 | Nami | +0.34 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 114 | Zyra | +0.33 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 115 | Veigar | +0.33 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.00 |
| 116 | Nidalee | +0.33 | +1.00 | +1.00 | −1.00 | −0.00 | – | +0.00 |
| 117 | Brand | +0.33 | +1.00 | +1.00 | −1.00 | −0.00 | – | +0.00 |
| 118 | Alistar | +0.33 | −0.08 | +1.00 | −0.00 | −0.02 | +1.00 | +0.00 |
| 119 | Zilean | +0.33 | +1.00 | +1.00 | −1.00 | −0.04 | – | +0.00 |
| 120 | Bard | +0.33 | +1.00 | +1.00 | −1.00 | −0.04 | – | +0.00 |
| 121 | Sivir | +0.33 | +1.00 | +1.00 | −1.00 | −0.05 | – | +0.00 |
| 122 | Garen | +0.32 | +1.00 | −1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 123 | Sejuani | +0.30 | −1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 124 | Renata Glasc | +0.27 | +0.82 | +0.90 | −1.00 | +0.08 | – | +0.00 |
| 125 | Sett | +0.24 | +0.00 | +1.00 | −0.01 | −0.06 | +0.03 | +0.00 |
| 126 | Anivia | +0.24 | +0.09 | +0.01 | +1.00 | −0.05 | – | +0.00 |
| 127 | Akali | +0.23 | +0.93 | +0.95 | −0.82 | −0.02 | −0.68 | +0.00 |
| 128 | Skarner | +0.22 | +0.05 | +0.02 | +0.94 | +0.11 | −0.00 | +0.00 |
| 129 | Diana | +0.16 | +0.04 | +0.09 | +0.04 | +0.15 | +1.00 | +0.00 |
| 130 | Galio | +0.15 | +0.50 | +0.50 | −1.00 | +0.03 | +1.00 | +0.00 |
| 131 | Zac | +0.15 | +0.20 | +0.35 | −0.03 | +0.08 | +0.06 | +0.00 |
| 132 | Wukong | +0.13 | +1.00 | +0.00 | −1.00 | −0.14 | +1.00 | +0.00 |
| 133 | Singed | +0.09 | +1.00 | −1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 134 | Braum | +0.08 | −0.00 | +0.05 | +0.41 | −0.02 | −0.11 | +0.00 |
| 135 | Tahm Kench | +0.07 | +0.02 | +0.05 | +0.06 | +0.17 | +0.12 | +0.00 |
| 136 | Zaahen | +0.06 | −0.52 | −0.52 | +1.00 | +0.12 | +1.00 | +0.00 |
| 137 | Amumu | +0.02 | −0.09 | −0.12 | +0.45 | −0.01 | −0.17 | +0.00 |
| 138 | Urgot | −0.04 | −0.06 | −0.05 | −0.03 | −0.02 | −0.07 | +0.00 |
| 139 | Nunu & Willump | −0.08 | −0.04 | −0.15 | −0.12 | +0.17 | −0.29 | +0.00 |
| 140 | Jarvan IV | −0.08 | −1.00 | +1.00 | −1.00 | +0.16 | +1.00 | +0.00 |
| 141 | Shen | −0.08 | −0.11 | −0.12 | −0.08 | +0.05 | −0.11 | +0.00 |
| 142 | Ornn | −0.09 | −0.11 | −0.10 | −0.13 | −0.05 | −0.07 | +0.00 |
| 143 | Shaco | −0.11 | −1.00 | +1.00 | −1.00 | −0.09 | +1.00 | +0.00 |
| 144 | Taric | −0.12 | −0.15 | −0.17 | −0.12 | −0.02 | −0.14 | +0.00 |
| 145 | Karthus | −0.14 | −0.20 | −0.21 | −0.12 | +0.00 | – | +0.00 |
| 146 | Illaoi | −0.22 | −0.88 | −0.74 | +0.86 | −0.02 | +0.21 | +0.00 |
| 147 | Ekko | −0.24 | −0.14 | −0.27 | −0.13 | −0.04 | −1.00 | +0.00 |
| 148 | Lucian | −0.24 | −1.00 | +1.00 | −1.00 | −0.09 | – | +0.00 |
| 149 | Talon | −0.31 | −1.00 | +1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 150 | Morgana | −0.31 | +0.30 | −1.00 | −0.50 | −0.01 | – | +0.00 |
| 151 | Zed | −0.31 | +1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 152 | Locke | −0.31 | −1.00 | +1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 153 | Hecarim | −0.35 | −1.00 | +0.00 | −1.00 | −0.02 | +1.00 | +0.00 |
| 154 | LeBlanc | −0.39 | −1.00 | +0.39 | −1.00 | −0.01 | – | +0.00 |
| 155 | Leona | −0.47 | +0.33 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 156 | Elise | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 157 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 158 | Ahri | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 159 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 160 | Vex | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 161 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 162 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 163 | Vladimir | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 164 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 165 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 166 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 167 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 168 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 169 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 170 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 171 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Viktor's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Viktor's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Viktor` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Lissandra (net +0.78)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Viktor's Arcane Storm. Untargetable for 2.5 s, long enough to use ahead of Arcane Storm. (Lissandra R Frozen Tomb → Viktor R Arcane Storm)
- **0.35** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Viktor's Gravity Field. Untargetable for 2.5 s, long enough to use ahead of Gravity Field. (Lissandra R Frozen Tomb → Viktor W Gravity Field)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Viktor's Siphon Power. Untargetable for 2.5 s, long enough to use ahead of Siphon Power. (Lissandra R Frozen Tomb → Viktor Q Siphon Power)

#### 2. Sivir (net +0.78)

- **0.58** spell shield: Spell Shield's spell shield blocks Viktor's Gravity Field. Spell shield for 1.5 s, long enough to use ahead of Gravity Field. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Viktor W Gravity Field)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Viktor's Arcane Storm. Spell shield for 1.5 s, long enough to use ahead of Arcane Storm. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the initial damage. {{{{{1<noinclude>|Ability data</noinclude>}}}|Arcane Storm|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Viktor
|skill        = R
|icon         = Arcane Storm.png
|description  = {{sbc|Active:}} '''Viktor''' conjures an arcane singularity at the target location, dealing {{as|magic damage}} to enemies within the area and {{tip|disrupt|disrupting}} their {{tip|channel|channeled abilities}}.
|leveling     = {{st|Magic Damage|{{ap|100 to 250}} {{as|(+ 50% AP)}}}}
|icon2        = Viktor Arcane Storm chase indicator.png
|description2 = The singularity then remains active as a moving storm for {{fd|6.5}} seconds, striking a bolt of electricity onto enemies within it every second to deal {{as|magic damage}}, as well as granting {{tip|sight}} of the area within its radius and the {{tt|surrounding area|If radius is below 700 units}}. The singularity will target the nearest champion hit by its initial damage and will follow them. The singularity moves faster based on its proximity to '''Viktor'''.
|leveling2    = {{st|Magic Damage Per Tick|{{ap|65 to 145}} {{as|(+ 35% AP)}}|Total Magic Damage|{{ap|100+65*6 to 250+145*6}} {{as|(+ {{ap|50+35*6}}% AP)}}}}
|description3 = ''Arcane Storm'' can be recast at any time while the singularity is active.
|icon4        = Arcane Storm 2.png
|description4 = {{sbc|Recast:}} '''Viktor''' directs the singularity to the target location, or to follow the target enemy champion or himself for its remaining duration.
|icon5        = Glorious Evolution 5.png
|description5 = {{Anchor|Augment: Perfect Storm}}{{sbc|{{ai|Glorious Evolution|Viktor|Augment: Perfect Storm}} — }} The singularity moves 25% faster. Additionally, whenever an enemy champion is {{tip|takedown|taken down}} after being damaged by ''Arcane Storm'', the storm's size is increased by 40% and its duration is extended by 3 seconds. The storm's radius can be increased up to 6 times and the duration can be extended only up to the original duration.
|description6 = ''Arcane Storm's recast can be used while affected by {{tip|cast-inhibiting crowd control}}.''
|target range = 700
|effect radius= {{tt|325|Storm radius}}
|customlabel  = Perfect Storm Radius
|custominfo   = {{pp|325 to 1105|0;1;2;3;4;5;6|type=number of takedowns|formula=325 + (325 × 0.4 × takedowns)}}
|customlabel2 = Storm Sight Radius
|custominfo2  = {{tip|Sight|icononly=true}}{{tt|700|Standard sight radius}} or {{tt|Storm radius|If the radius of the storm is above 700 units (for Perfect Storm)}}
|customlabel3 = Storm Speed
|custominfo3  = {{pp|200 to 300|900 to 300 by 50|label=Speed|label1=Distance|showtype=false|formula=NON-AUGMENTED — Maximum speed of 300 achieved at or below 300 units away from Viktor; minimum speed of 200 achieved at or above 900 units from Viktor. Then, linearly interpolate.}}
|customlabel4 = Perfect Storm Speed
|custominfo4  = {{pp|200*1.25 to 300*1.25|900 to 300 by 50|label=Speed|label1=Distance|showtype=false|formula=PERFECT STORM — Maximum speed of 200 × 125% achieved at or below 300 units away from Viktor; minimum speed of 300 × 125% achieved at or above 900 units from Viktor. Then, linearly interpolate.}}
|cooldown     = {{ap|120 to 80}}
|cdstart      = post-effect
|cast time    = {{fd|0.25}}
|cost         = 100
|costtype     = mana
|targeting    = {{dv|[[Location-targeted|Location]]|[[Unit-targeted|Unit]]}}
|affects      = Enemies
|damagetype   = Magic
|spelleffects = spellaoe
|spellshield  = special
|projectile   = 
|knockdown    = 
|grounded     = 
|outofrange   = Walk in range of the target location to cast (first cast)
|notes        = 
* '''Viktor''' can command the singularity regardless of how far away he is from it.
* The singularity will remain active even if '''Viktor''' dies and will automatically follow the nearest enemy champion in range at the time of his death, if it wasn't locked on already.
** The singularity will only be issued to automatically follow a nearby champion once; it will not lock on to a new target if its current target becomes invalid.
** Any commands it was issued prior to his death will not be interrupted.
* {{tip|Spell shield}} will only block the initial damage.
* If ''Perfect Storm's'' singularity scores the killing blow on an enemy champion with the initial damage, it will spawn with the increased size.
** If multiple champions are dealt the killing blow by the initial hit, the singularity will spawn with the increased size respective to the number of champions killed.
* The base duration allows for 7 strikes (including the initial one).
* The storm will follow its target even if they are not {{tip|sight|visible}}, effectively giving away their position.
* ''Arcane Storm'' is not obstructed by terrain.
* The {{tip|disrupt}} is 'wrapped' into a status effect that causes affected champions to display the "{{tip|silence|Silenced}}" UI on their [[Health bar#Disabled state|health bar]] for {{fd|0.25}} seconds, without actually applying the disabling effects of the {{tip|silence}} crowd control type (functions as an indicator of the target becoming ''disrupted''). This however ensures that the ''disrupt'' is also prevented by effects that would negate {{tip|silence|silences}} (such as {{tip|cc-immune|crowd control immunity}}).
* After becoming augmented, an [[File:Viktor Arcane Storm 3.png|20px|border]] alternate icon is used for the recast of ''Arcane Storm''.
* The champion that ''Arcane Storm'' is following will have an overhead indicator.
<!-- Blurb -->
|blurbicon    = Arcane Storm.png
|blurb        = {{sbc|Active:}} {{ci|Viktor}} conjures an arcane singularity at the target location that deals {{as|magic damage}} to enemies within and {{tip|disrupt|disrupts}} their channeled abilities. The singularity then remains for a duration, continually dealing {{as|magic damage}} to enemies within the area. If the initial hit has struck at least one enemy {{tip|champion}}, it will automatically follow the nearest one hit.
|blurb2       = ''Arcane Storm'' can be recast at any time while the singularity is active.
|blurb3       = {{sbc|Recast:}} '''Viktor''' directs the singularity to the target location or to follow the targeted enemy champion.
|blurb4       = {{sbc|{{ai|Glorious Evolution|Viktor|Augment}}:}} The singularity moves faster. Scoring a champion {{tip|takedown}} (up to 6) after the storm damages them will increase the singularity's size and duration.
}}. (Sivir E Spell Shield → Viktor R Arcane Storm)
- **0.26** spell shield: Spell Shield's spell shield blocks Viktor's Siphon Power. Spell shield for 1.5 s, long enough to use ahead of Siphon Power. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Viktor Q Siphon Power)

#### 3. Maokai (net +0.74)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Viktor's Gravity Field. Untargetable for 1.4 s; Gravity Field takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Viktor W Gravity Field)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Viktor's Arcane Storm. Untargetable for 1.4 s; Arcane Storm takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Viktor R Arcane Storm)
- **0.32** untargetable: Twisted Advance makes Maokai untargetable, dodging Viktor's Siphon Power. Untargetable for 1.4 s; Siphon Power takes 0.55 s to land, enough to react. (Maokai W Twisted Advance → Viktor Q Siphon Power)
- Watch out: Viktor's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

#### 4. Vladimir (net +0.72)

- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Viktor's Gravity Field. Untargetable for 2 s, long enough to use ahead of Gravity Field. (Vladimir W Sanguine Pool → Viktor W Gravity Field)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Viktor's Arcane Storm. Untargetable for 2 s, long enough to use ahead of Arcane Storm. (Vladimir W Sanguine Pool → Viktor R Arcane Storm)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Viktor's Siphon Power. Untargetable for 2 s, long enough to use ahead of Siphon Power. (Vladimir W Sanguine Pool → Viktor Q Siphon Power)
- Watch out: Viktor's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 5. Xayah (net +0.69)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Viktor's Arcane Storm. Untargetable for 1.5 s, long enough to use ahead of Arcane Storm. (Xayah R Featherstorm → Viktor R Arcane Storm)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Viktor's Gravity Field. Untargetable for 1.5 s, long enough to use ahead of Gravity Field. (Xayah R Featherstorm → Viktor W Gravity Field)
- **0.19** untargetable: Featherstorm makes Xayah untargetable, dodging Viktor's Siphon Power. Untargetable for 1.5 s, long enough to use ahead of Siphon Power. (Xayah R Featherstorm → Viktor Q Siphon Power)

#### 6. Morgana (net +0.67)

- **0.62** cc immunity: Black Shield makes Morgana immune to Viktor's Gravity Field (knockdown, slow, stun). Immune for 5 s, long enough to use ahead of Gravity Field. (Morgana E Black Shield → Viktor W Gravity Field)
- **0.33** cc immunity: Black Shield makes Morgana immune to Viktor's Arcane Storm (disrupt). Immune for 5 s, long enough to use ahead of Arcane Storm. (Morgana E Black Shield → Viktor R Arcane Storm)
- Watch out: Viktor's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range).

#### 7. Nocturne (net +0.64)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Viktor's Gravity Field. Spell shield for 1.5 s, long enough to use ahead of Gravity Field. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Viktor W Gravity Field)
- **0.29** spell shield: Shroud of Darkness's spell shield blocks Viktor's Siphon Power. Spell shield for 1.5 s, long enough to use ahead of Siphon Power. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Viktor Q Siphon Power)
- **0.28** spell shield: Shroud of Darkness's spell shield blocks part of Viktor's Arcane Storm. Spell shield for 1.5 s, long enough to use ahead of Arcane Storm. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the initial damage. {{{{{1<noinclude>|Ability data</noinclude>}}}|Arcane Storm|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Viktor
|skill        = R
|icon         = Arcane Storm.png
|description  = {{sbc|Active:}} '''Viktor''' conjures an arcane singularity at the target location, dealing {{as|magic damage}} to enemies within the area and {{tip|disrupt|disrupting}} their {{tip|channel|channeled abilities}}.
|leveling     = {{st|Magic Damage|{{ap|100 to 250}} {{as|(+ 50% AP)}}}}
|icon2        = Viktor Arcane Storm chase indicator.png
|description2 = The singularity then remains active as a moving storm for {{fd|6.5}} seconds, striking a bolt of electricity onto enemies within it every second to deal {{as|magic damage}}, as well as granting {{tip|sight}} of the area within its radius and the {{tt|surrounding area|If radius is below 700 units}}. The singularity will target the nearest champion hit by its initial damage and will follow them. The singularity moves faster based on its proximity to '''Viktor'''.
|leveling2    = {{st|Magic Damage Per Tick|{{ap|65 to 145}} {{as|(+ 35% AP)}}|Total Magic Damage|{{ap|100+65*6 to 250+145*6}} {{as|(+ {{ap|50+35*6}}% AP)}}}}
|description3 = ''Arcane Storm'' can be recast at any time while the singularity is active.
|icon4        = Arcane Storm 2.png
|description4 = {{sbc|Recast:}} '''Viktor''' directs the singularity to the target location, or to follow the target enemy champion or himself for its remaining duration.
|icon5        = Glorious Evolution 5.png
|description5 = {{Anchor|Augment: Perfect Storm}}{{sbc|{{ai|Glorious Evolution|Viktor|Augment: Perfect Storm}} — }} The singularity moves 25% faster. Additionally, whenever an enemy champion is {{tip|takedown|taken down}} after being damaged by ''Arcane Storm'', the storm's size is increased by 40% and its duration is extended by 3 seconds. The storm's radius can be increased up to 6 times and the duration can be extended only up to the original duration.
|description6 = ''Arcane Storm's recast can be used while affected by {{tip|cast-inhibiting crowd control}}.''
|target range = 700
|effect radius= {{tt|325|Storm radius}}
|customlabel  = Perfect Storm Radius
|custominfo   = {{pp|325 to 1105|0;1;2;3;4;5;6|type=number of takedowns|formula=325 + (325 × 0.4 × takedowns)}}
|customlabel2 = Storm Sight Radius
|custominfo2  = {{tip|Sight|icononly=true}}{{tt|700|Standard sight radius}} or {{tt|Storm radius|If the radius of the storm is above 700 units (for Perfect Storm)}}
|customlabel3 = Storm Speed
|custominfo3  = {{pp|200 to 300|900 to 300 by 50|label=Speed|label1=Distance|showtype=false|formula=NON-AUGMENTED — Maximum speed of 300 achieved at or below 300 units away from Viktor; minimum speed of 200 achieved at or above 900 units from Viktor. Then, linearly interpolate.}}
|customlabel4 = Perfect Storm Speed
|custominfo4  = {{pp|200*1.25 to 300*1.25|900 to 300 by 50|label=Speed|label1=Distance|showtype=false|formula=PERFECT STORM — Maximum speed of 200 × 125% achieved at or below 300 units away from Viktor; minimum speed of 300 × 125% achieved at or above 900 units from Viktor. Then, linearly interpolate.}}
|cooldown     = {{ap|120 to 80}}
|cdstart      = post-effect
|cast time    = {{fd|0.25}}
|cost         = 100
|costtype     = mana
|targeting    = {{dv|[[Location-targeted|Location]]|[[Unit-targeted|Unit]]}}
|affects      = Enemies
|damagetype   = Magic
|spelleffects = spellaoe
|spellshield  = special
|projectile   = 
|knockdown    = 
|grounded     = 
|outofrange   = Walk in range of the target location to cast (first cast)
|notes        = 
* '''Viktor''' can command the singularity regardless of how far away he is from it.
* The singularity will remain active even if '''Viktor''' dies and will automatically follow the nearest enemy champion in range at the time of his death, if it wasn't locked on already.
** The singularity will only be issued to automatically follow a nearby champion once; it will not lock on to a new target if its current target becomes invalid.
** Any commands it was issued prior to his death will not be interrupted.
* {{tip|Spell shield}} will only block the initial damage.
* If ''Perfect Storm's'' singularity scores the killing blow on an enemy champion with the initial damage, it will spawn with the increased size.
** If multiple champions are dealt the killing blow by the initial hit, the singularity will spawn with the increased size respective to the number of champions killed.
* The base duration allows for 7 strikes (including the initial one).
* The storm will follow its target even if they are not {{tip|sight|visible}}, effectively giving away their position.
* ''Arcane Storm'' is not obstructed by terrain.
* The {{tip|disrupt}} is 'wrapped' into a status effect that causes affected champions to display the "{{tip|silence|Silenced}}" UI on their [[Health bar#Disabled state|health bar]] for {{fd|0.25}} seconds, without actually applying the disabling effects of the {{tip|silence}} crowd control type (functions as an indicator of the target becoming ''disrupted''). This however ensures that the ''disrupt'' is also prevented by effects that would negate {{tip|silence|silences}} (such as {{tip|cc-immune|crowd control immunity}}).
* After becoming augmented, an [[File:Viktor Arcane Storm 3.png|20px|border]] alternate icon is used for the recast of ''Arcane Storm''.
* The champion that ''Arcane Storm'' is following will have an overhead indicator.
<!-- Blurb -->
|blurbicon    = Arcane Storm.png
|blurb        = {{sbc|Active:}} {{ci|Viktor}} conjures an arcane singularity at the target location that deals {{as|magic damage}} to enemies within and {{tip|disrupt|disrupts}} their channeled abilities. The singularity then remains for a duration, continually dealing {{as|magic damage}} to enemies within the area. If the initial hit has struck at least one enemy {{tip|champion}}, it will automatically follow the nearest one hit.
|blurb2       = ''Arcane Storm'' can be recast at any time while the singularity is active.
|blurb3       = {{sbc|Recast:}} '''Viktor''' directs the singularity to the target location or to follow the targeted enemy champion.
|blurb4       = {{sbc|{{ai|Glorious Evolution|Viktor|Augment}}:}} The singularity moves faster. Scoring a champion {{tip|takedown}} (up to 6) after the storm damages them will increase the singularity's size and duration.
}}. (Nocturne W Shroud of Darkness → Viktor R Arcane Storm)
- Watch out: Viktor's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 8. Teemo (net +0.58)

- **0.43** blind: Blinding Dart's blind makes Viktor's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Viktor basic attacks)
- **0.30** blind: Blinding Dart's blind makes Viktor's Siphon Power, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Viktor Q Siphon Power)

#### 9. Shaco (net +0.56)

- **0.55** untargetable: Hallucinate makes Shaco untargetable, dodging Viktor's Arcane Storm. Untargetable for 0.5 s; Arcane Storm takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Viktor R Arcane Storm)
- **0.35** untargetable: Hallucinate makes Shaco untargetable, dodging Viktor's Gravity Field. Untargetable for 0.5 s; Gravity Field takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Viktor W Gravity Field)
- **0.20** untargetable: Hallucinate makes Shaco untargetable, dodging Viktor's Siphon Power. Untargetable for 0.5 s; Siphon Power takes 0.55 s to land, enough to react. (Shaco R Hallucinate → Viktor Q Siphon Power)
- Watch out: Viktor's basic attacks reach 400 units farther than Shaco's (525 vs 125 attack range).

#### 10. Kayle (net +0.56)

- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Viktor's Arcane Storm (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Arcane Storm. (Kayle R Divine Judgment → Viktor R Arcane Storm)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Viktor's Siphon Power. Invulnerable for 2.5 s, long enough to use ahead of Siphon Power. (Kayle R Divine Judgment → Viktor Q Siphon Power)
- **0.18** range: Kayle's basic attacks reach 100 units farther than Viktor's (625 vs 525 attack range). Viktor has no dash or blink to close the gap. (Kayle basic attacks → Viktor basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 2 | Sivir | +0.78 | 0.78 | 0.00 |  |
| 3 | Maokai | +0.74 | 1.06 | 0.32 |  |
| 4 | Vladimir | +0.72 | 0.96 | 0.24 |  |
| 5 | Xayah | +0.69 | 0.69 | 0.00 |  |
| 6 | Morgana | +0.67 | 0.79 | 0.12 |  |
| 7 | Nocturne | +0.64 | 0.96 | 0.32 |  |
| 8 | Teemo | +0.58 | 0.58 | 0.00 | blind (Blinding Dart) |
| 9 | Shaco | +0.56 | 0.78 | 0.22 |  |
| 10 | Kayle | +0.56 | 0.56 | 0.00 |  |
| 11 | Udyr | +0.55 | 0.87 | 0.32 |  |
| 12 | Fiora | +0.50 | 1.07 | 0.57 |  |
| 13 | Bard | +0.48 | 0.78 | 0.30 |  |
| 14 | Zed | +0.47 | 0.69 | 0.22 |  |
| 15 | Master Yi | +0.45 | 1.03 | 0.58 |  |
| 16 | Fizz | +0.44 | 1.06 | 0.62 |  |
| 17 | Mel | +0.43 | 0.43 | 0.00 |  |
| 18 | Milio | +0.36 | 0.36 | 0.00 |  |
| 19 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 20 | Gwen | +0.26 | 0.92 | 0.66 |  |
| 21 | Aurora | +0.26 | 0.70 | 0.44 |  |
| 22 | Yuumi | +0.24 | 1.09 | 0.85 |  |
| 23 | Evelynn | +0.22 | 0.78 | 0.56 |  |
| 24 | Rek'Sai | +0.19 | 0.78 | 0.59 |  |
| 25 | Yasuo | +0.17 | 0.54 | 0.37 |  |
| 26 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 27 | Senna | +0.12 | 0.12 | 0.00 |  |
| 28 | Annie | +0.11 | 0.11 | 0.00 |  |
| 29 | Braum | +0.09 | 0.72 | 0.63 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 30 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 31 | Kalista | +0.07 | 0.26 | 0.19 |  |
| 32 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 33 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 34 | Samira | +0.06 | 0.45 | 0.39 |  |
| 35 | Vex | +0.04 | 0.04 | 0.00 |  |
| 36 | Zaahen | +0.02 | 0.52 | 0.50 |  |
| 37 | Tristana | +0.02 | 0.32 | 0.30 |  |
| 38 | Brand | 0.00 | 0.00 | 0.00 |  |
| 39 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 40 | Draven | 0.00 | 0.00 | 0.00 |  |
| 41 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 42 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 43 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 44 | Karma | 0.00 | 0.00 | 0.00 |  |
| 45 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 46 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 47 | Lux | 0.00 | 0.00 | 0.00 |  |
| 48 | Nami | 0.00 | 0.00 | 0.00 |  |
| 49 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 50 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 51 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 52 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 53 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 54 | Sona | 0.00 | 0.00 | 0.00 |  |
| 55 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 56 | Swain | 0.00 | 0.00 | 0.00 |  |
| 57 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 58 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 59 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 60 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 61 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 62 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 63 | Camille | -0.04 | 0.74 | 0.78 |  |
| 64 | Jax | -0.07 | 0.52 | 0.59 |  |
| 65 | Malphite | -0.07 | 0.25 | 0.32 |  |
| 66 | Gangplank | -0.11 | 0.54 | 0.65 |  |
| 67 | Olaf | -0.13 | 0.52 | 0.65 |  |
| 68 | Kled | -0.15 | 0.47 | 0.62 |  |
| 69 | Varus | -0.17 | 0.00 | 0.17 |  |
| 70 | Vayne | -0.17 | 0.00 | 0.17 |  |
| 71 | Nilah | -0.20 | 0.42 | 0.62 |  |
| 72 | Elise | -0.20 | 0.00 | 0.20 |  |
| 73 | Jayce | -0.20 | 0.00 | 0.20 |  |
| 74 | Nidalee | -0.20 | 0.00 | 0.20 |  |
| 75 | Sion | -0.23 | 0.54 | 0.77 |  |
| 76 | Kindred | -0.24 | 0.00 | 0.24 |  |
| 77 | Yunara | -0.24 | 0.00 | 0.24 |  |
| 78 | Garen | -0.25 | 0.32 | 0.57 |  |
| 79 | Shyvana | -0.26 | 0.04 | 0.30 |  |
| 80 | Sett | -0.28 | 0.04 | 0.32 |  |
| 81 | Corki | -0.29 | 0.00 | 0.29 |  |
| 82 | Xin Zhao | -0.30 | 0.34 | 0.64 |  |
| 83 | Kassadin | -0.30 | 0.00 | 0.30 |  |
| 84 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 85 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 86 | Hecarim | -0.35 | 0.04 | 0.39 |  |
| 87 | Ahri | -0.35 | 0.00 | 0.35 |  |
| 88 | Azir | -0.35 | 0.00 | 0.35 |  |
| 89 | Kai'Sa | -0.35 | 0.00 | 0.35 |  |
| 90 | LeBlanc | -0.35 | 0.00 | 0.35 |  |
| 91 | Malzahar | -0.36 | 0.44 | 0.80 |  |
| 92 | Rengar | -0.37 | 0.56 | 0.93 |  |
| 93 | Alistar | -0.38 | 0.28 | 0.66 |  |
| 94 | K'Sante | -0.38 | 0.08 | 0.46 |  |
| 95 | Volibear | -0.38 | 0.04 | 0.42 |  |
| 96 | Yone | -0.39 | 0.04 | 0.43 |  |
| 97 | Aurelion Sol | -0.39 | 0.00 | 0.39 |  |
| 98 | Rammus | -0.40 | 0.32 | 0.72 |  |
| 99 | Illaoi | -0.41 | 0.04 | 0.45 |  |
| 100 | Ziggs | -0.41 | 0.00 | 0.41 |  |
| 101 | Lillia | -0.42 | 0.00 | 0.42 |  |
| 102 | Kayn | -0.43 | 0.78 | 1.21 |  |
| 103 | Gnar | -0.43 | 0.00 | 0.43 |  |
| 104 | Caitlyn | -0.46 | 0.22 | 0.68 |  |
| 105 | Jarvan IV | -0.46 | 0.04 | 0.50 |  |
| 106 | Bel'Veth | -0.46 | 0.00 | 0.46 |  |
| 107 | Thresh | -0.47 | 0.00 | 0.47 |  |
| 108 | Mordekaiser | -0.49 | 0.08 | 0.57 |  |
| 109 | Ambessa | -0.50 | 0.00 | 0.50 |  |
| 110 | Ekko | -0.51 | 0.00 | 0.51 |  |
| 111 | Ivern | -0.51 | 0.00 | 0.51 |  |
| 112 | Skarner | -0.52 | 0.09 | 0.61 |  |
| 113 | Aatrox | -0.53 | 0.00 | 0.53 |  |
| 114 | Irelia | -0.53 | 0.00 | 0.53 |  |
| 115 | Graves | -0.55 | 0.00 | 0.55 |  |
| 116 | Jhin | -0.56 | 0.00 | 0.56 |  |
| 117 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 118 | Quinn | -0.56 | 0.00 | 0.56 |  |
| 119 | Vel'Koz | -0.56 | 0.00 | 0.56 |  |
| 120 | Darius | -0.57 | 0.00 | 0.57 |  |
| 121 | Trundle | -0.57 | 0.00 | 0.57 |  |
| 122 | Urgot | -0.57 | 0.00 | 0.57 |  |
| 123 | Yorick | -0.57 | 0.00 | 0.57 |  |
| 124 | Tryndamere | -0.59 | 0.00 | 0.59 |  |
| 125 | Talon | -0.60 | 0.00 | 0.60 |  |
| 126 | Taric | -0.61 | 0.00 | 0.61 |  |
| 127 | Nautilus | -0.62 | 0.00 | 0.62 |  |
| 128 | Xerath | -0.62 | 0.00 | 0.62 |  |
| 129 | Qiyana | -0.64 | 0.00 | 0.64 |  |
| 130 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 131 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 132 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 133 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 134 | Singed | -0.65 | 0.00 | 0.65 |  |
| 135 | Leona | -0.66 | 0.00 | 0.66 |  |
| 136 | Locke | -0.66 | 0.00 | 0.66 |  |
| 137 | Renekton | -0.66 | 0.00 | 0.66 |  |
| 138 | Briar | -0.67 | 0.00 | 0.67 |  |
| 139 | Akshan | -0.68 | 0.00 | 0.68 |  |
| 140 | Karthus | -0.68 | 0.00 | 0.68 |  |
| 141 | Viego | -0.69 | 0.04 | 0.73 |  |
| 142 | Diana | -0.70 | 0.00 | 0.70 |  |
| 143 | Kha'Zix | -0.70 | 0.00 | 0.70 |  |
| 144 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 145 | Twisted Fate | -0.70 | 0.00 | 0.70 |  |
| 146 | Lee Sin | -0.71 | 0.00 | 0.71 |  |
| 147 | Lucian | -0.72 | 0.00 | 0.72 |  |
| 148 | Rell | -0.73 | 0.00 | 0.73 |  |
| 149 | Wukong | -0.74 | 0.00 | 0.74 |  |
| 150 | Rakan | -0.74 | 0.00 | 0.74 |  |
| 151 | Sejuani | -0.78 | 0.00 | 0.78 |  |
| 152 | Amumu | -0.80 | 0.00 | 0.80 |  |
| 153 | Janna | -0.80 | 0.00 | 0.80 |  |
| 154 | Katarina | -0.80 | 0.00 | 0.80 |  |
| 155 | Pyke | -0.80 | 0.00 | 0.80 |  |
| 156 | Sylas | -0.80 | 0.00 | 0.80 |  |
| 157 | Warwick | -0.84 | 0.57 | 1.41 |  |
| 158 | Ornn | -0.84 | 0.04 | 0.88 |  |
| 159 | Akali | -0.84 | 0.00 | 0.84 |  |
| 160 | Fiddlesticks | -0.84 | 0.00 | 0.84 |  |
| 161 | Shen | -0.85 | 0.49 | 1.34 |  |
| 162 | Riven | -0.86 | 0.00 | 0.86 |  |
| 163 | Pantheon | -0.89 | 0.41 | 1.30 |  |
| 164 | Vi | -0.91 | 0.04 | 0.95 |  |
| 165 | Poppy | -0.96 | 0.00 | 0.96 |  |
| 166 | Gragas | -0.97 | 0.00 | 0.97 |  |
| 167 | Tahm Kench | -1.04 | 0.00 | 1.04 |  |
| 168 | Zac | -1.13 | 0.00 | 1.13 |  |
| 169 | Taliyah | -1.20 | 0.00 | 1.20 |  |
| 170 | Nunu & Willump | -1.30 | 0.21 | 1.51 |  |
| 171 | Naafiri | -1.36 | 0.00 | 1.36 |  |
| 172 | Galio | -1.38 | 0.00 | 1.38 |  |
