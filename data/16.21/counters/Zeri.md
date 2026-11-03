# Counters to Zeri (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Zeri: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Zeri wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Zeri --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +1.00 |
| 2 | Nasus | +0.85 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 3 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 4 | Camille | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 5 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 6 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +1.00 |
| 7 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +1.00 |
| 8 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 9 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 10 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 11 | Yorick | +0.79 | +0.73 | +1.00 | +1.00 | +0.04 | +1.00 | +1.00 |
| 12 | Gwen | +0.79 | +0.95 | +0.99 | +1.00 | +0.02 | +0.99 | +0.00 |
| 13 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 14 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 15 | Samira | +0.78 | +1.00 | +1.00 | +0.99 | +0.01 | – | +0.00 |
| 16 | Lulu | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 17 | Cassiopeia | +0.77 | +0.99 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 18 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 19 | Xayah | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 20 | Kog'Maw | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 21 | Vayne | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 22 | Anivia | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 23 | Azir | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 24 | Nilah | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | −0.50 |
| 25 | Twisted Fate | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 26 | Aphelios | +0.62 | +0.50 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 27 | Ashe | +0.47 | +0.33 | +0.72 | +1.00 | −0.08 | – | −0.50 |
| 28 | Shyvana | +0.44 | +1.00 | +1.00 | −1.00 | −0.04 | +1.00 | +1.00 |
| 29 | Shaco | +0.39 | +1.00 | +1.00 | −1.00 | −0.07 | +1.00 | +0.00 |
| 30 | Sion | +0.37 | +0.05 | +0.50 | +0.84 | +0.05 | +0.50 | +0.00 |
| 31 | Teemo | +0.32 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 32 | Tryndamere | +0.30 | −1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 33 | Yone | +0.29 | −1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 34 | Heimerdinger | +0.26 | −1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 35 | Annie | +0.22 | −1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 36 | Fizz | +0.15 | +0.00 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 37 | Kalista | +0.15 | −1.00 | +0.71 | +1.00 | +0.01 | – | +0.00 |
| 38 | Wukong | +0.12 | +1.00 | −1.00 | +1.00 | +0.14 | −1.00 | +0.00 |
| 39 | Rumble | +0.11 | −1.00 | +0.45 | +1.00 | −0.01 | +0.45 | +0.00 |
| 40 | Tahm Kench | +0.11 | +0.03 | +0.24 | +0.10 | −0.03 | +0.24 | +0.00 |
| 41 | Jayce | +0.10 | +1.00 | −1.00 | +1.00 | +0.00 | −1.00 | +0.00 |
| 42 | Maokai | +0.09 | +1.00 | −1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 43 | Zed | +0.09 | +1.00 | −1.00 | +1.00 | −0.07 | −1.00 | +0.00 |
| 44 | Dr. Mundo | −0.03 | +0.09 | −0.29 | +0.23 | +0.01 | −0.29 | +0.00 |
| 45 | Yasuo | −0.03 | +0.04 | +0.03 | −0.34 | +0.10 | +0.03 | +0.00 |
| 46 | Kayle | −0.04 | +1.00 | −0.33 | −1.00 | −0.05 | – | +0.00 |
| 47 | Udyr | −0.08 | −1.00 | +1.00 | −1.00 | −0.18 | +1.00 | +1.00 |
| 48 | Shen | −0.09 | −1.00 | +1.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 49 | Tristana | −0.13 | −1.00 | +0.00 | +0.00 | +0.12 | +1.00 | +0.00 |
| 50 | Xin Zhao | −0.16 | −0.61 | −0.66 | +1.00 | +0.17 | −0.66 | +0.00 |
| 51 | Hwei | −0.18 | −1.00 | −0.41 | +1.00 | −0.06 | – | +0.00 |
| 52 | Zaahen | −0.22 | −0.41 | −1.00 | +1.00 | +0.20 | −1.00 | +0.00 |
| 53 | Vel'Koz | −0.24 | −1.00 | −0.70 | +1.00 | +0.09 | – | +0.00 |
| 54 | Smolder | −0.27 | −1.00 | +0.00 | +0.00 | +0.04 | – | +0.00 |
| 55 | Miss Fortune | −0.28 | +1.00 | −1.00 | −1.00 | −0.04 | – | −1.00 |
| 56 | Renekton | −0.31 | +1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 57 | Nocturne | −0.32 | +1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 58 | Corki | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 59 | Elise | −0.36 | −1.00 | −1.00 | +0.57 | +0.39 | – | +0.00 |
| 60 | Gragas | −0.37 | −1.00 | −1.00 | +1.00 | +0.18 | −1.00 | +0.00 |
| 61 | Bel'Veth | −0.40 | −1.00 | −1.00 | +1.00 | +0.03 | −1.00 | +0.00 |
| 62 | Darius | −0.41 | −1.00 | −1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 63 | Zac | −0.41 | −0.84 | −0.10 | −0.75 | −0.10 | −0.10 | +0.00 |
| 64 | Graves | −0.44 | −1.00 | +0.00 | −1.00 | +0.05 | +0.00 | +0.00 |
| 65 | Olaf | −0.46 | −1.00 | −1.00 | +0.79 | −0.04 | −1.00 | −0.20 |
| 66 | Taric | −0.47 | −0.50 | −1.00 | −0.00 | +0.01 | −1.00 | +0.00 |
| 67 | Kennen | −0.51 | −1.00 | −1.00 | +0.13 | +0.08 | – | +0.00 |
| 68 | Kayn | −0.54 | −1.00 | −0.52 | −0.52 | −0.06 | −0.52 | +0.00 |
| 69 | Mordekaiser | −0.58 | −1.00 | −0.84 | −0.18 | −0.01 | −0.84 | +0.00 |
| 70 | Volibear | −0.60 | −0.82 | −0.64 | −0.82 | −0.04 | −0.64 | +0.00 |
| 71 | Warwick | −0.62 | −1.00 | −1.00 | +0.00 | −0.12 | −1.00 | +0.00 |
| 72 | Kai'Sa | −0.65 | −1.00 | −0.57 | −1.00 | +0.03 | – | +0.00 |
| 73 | Briar | −0.68 | −1.00 | −0.82 | −0.73 | +0.03 | −0.82 | +0.00 |
| 74 | Braum | −0.69 | −1.00 | −1.00 | −0.41 | −0.04 | −1.00 | +0.00 |
| 75 | Aurelion Sol | −0.72 | −1.00 | −1.00 | −1.00 | +0.36 | – | +0.00 |
| 76 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.46 | −1.00 | +0.00 |
| 77 | Urgot | −0.75 | −1.00 | −1.00 | −1.00 | +0.36 | −1.00 | +0.00 |
| 78 | Ziggs | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 79 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 80 | Milio | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 81 | Swain | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 82 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 83 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 84 | Malzahar | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 85 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 86 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 87 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 88 | Neeko | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 89 | Rakan | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 90 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 91 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 92 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 93 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 94 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 95 | Brand | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 96 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 97 | Cho'Gath | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 98 | Kindred | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 99 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 100 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 101 | Varus | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 102 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 103 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 104 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 105 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 106 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 107 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 108 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 109 | Jinx | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 110 | Draven | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 111 | Diana | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 112 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 113 | Orianna | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 114 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 115 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 116 | Gangplank | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 117 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 118 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 119 | Karma | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 120 | Kled | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 121 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 122 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 123 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 124 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 125 | Ornn | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 126 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 127 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 128 | Illaoi | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 129 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 130 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 131 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 132 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 133 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 134 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 135 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 136 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 137 | Gnar | −0.80 | −1.00 | −0.94 | −1.00 | −0.13 | −1.00 | +0.00 |
| 138 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 139 | Zilean | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 140 | Sivir | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 141 | Lillia | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 142 | Ambessa | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 143 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 144 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 145 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 146 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 147 | Viego | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 148 | Rek'Sai | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 149 | Vi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 150 | Singed | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 151 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 152 | Kassadin | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 153 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 154 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 155 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 156 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 157 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 158 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 159 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 160 | Sylas | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 161 | Janna | −0.84 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.89 |
| 162 | Soraka | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.73 |
| 163 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | −0.05 | – | −1.00 |
| 164 | Yunara | −0.84 | −1.00 | −1.00 | −1.00 | −0.06 | – | −1.00 |
| 165 | Fiddlesticks | −0.84 | −1.00 | −1.00 | −1.00 | −0.06 | – | −1.00 |
| 166 | Quinn | −0.85 | −1.00 | −1.00 | −1.00 | −0.08 | – | −1.00 |
| 167 | Viktor | −0.86 | −1.00 | −1.00 | −1.00 | −0.14 | – | −1.00 |
| 168 | Caitlyn | −0.86 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −1.00 |
| 169 | Aatrox | −0.86 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −1.00 |
| 170 | Talon | −0.86 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −1.00 |
| 171 | Hecarim | −0.86 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −1.00 |
| 172 | Thresh | −0.87 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Zeri's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zeri's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zeri` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Lissandra (net +0.59)

- **0.51** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zeri's Lightning Crash. Untargetable for 2.5 s, long enough to use ahead of Lightning Crash. (Lissandra R Frozen Tomb → Zeri R Lightning Crash)
- **0.16** dash stop: Frozen Tomb's knockdown can stop Zeri's Spark Surge mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Zeri E Spark Surge)

#### 2. Kayle (net +0.58)

- **0.51** invulnerable: Divine Judgment makes Kayle invulnerable to Zeri's Lightning Crash. Invulnerable for 2.5 s, long enough to use ahead of Lightning Crash. (Kayle R Divine Judgment → Zeri R Lightning Crash)
- **0.07** range: Kayle's basic attacks reach 75 units farther than Zeri's (625 vs 550 attack range). Zeri closes the gap with Spark Surge. (Kayle basic attacks → Zeri basic attacks)

#### 3. Teemo (net +0.58)

- **0.58** blind: Blinding Dart's blind makes Zeri's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Zeri basic attacks)

#### 4. Shen (net +0.57)

- **0.60** attack block: Spirit's Refuge blocks Zeri's Spark Surge, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Zeri E Spark Surge)
- **0.45** attack block: Spirit's Refuge blocks Zeri's basic attacks (with Living Battery). Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Zeri basic attacks)
- **0.13** attack block: Spirit's Refuge blocks Zeri's Burst Fire, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. Burst Fire is parried by dodge and block.
  - Blind causes Burst Fire to cast in a random direction. The rounds will still deal damage to enemies hit. (Shen W Spirit's Refuge → Zeri Q Burst Fire)
- Watch out: Zeri's basic attacks reach 425 units farther than Shen's (550 vs 125 attack range).

#### 5. Bard (net +0.51)

- **0.51** untargetable: Tempered Fate makes Bard untargetable, dodging Zeri's Lightning Crash. Untargetable for 2.5 s, long enough to use ahead of Lightning Crash. (Bard R Tempered Fate → Zeri R Lightning Crash)

#### 6. Aurora (net +0.45)

- **0.45** untargetable: Between Worlds makes Aurora untargetable, dodging Zeri's Lightning Crash. Untargetable for 0.4 s; Lightning Crash takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zeri R Lightning Crash)

#### 7. Xayah (net +0.45)

- **0.45** untargetable: Featherstorm makes Xayah untargetable, dodging Zeri's Lightning Crash. Untargetable for 1.5 s, long enough to use ahead of Lightning Crash. (Xayah R Featherstorm → Zeri R Lightning Crash)

#### 8. Jax (net +0.43)

- **0.60** attack dodge: Counter Strike dodges Zeri's Spark Surge, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Zeri E Spark Surge)
- **0.47** attack dodge: Counter Strike dodges Zeri's basic attacks (with Living Battery). Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Zeri basic attacks)
- **0.13** attack dodge: Counter Strike dodges Zeri's Burst Fire, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. Burst Fire is parried by dodge and block.
  - Blind causes Burst Fire to cast in a random direction. The rounds will still deal damage to enemies hit. (Jax E Counter Strike → Zeri Q Burst Fire)
- Watch out: Zeri's basic attacks reach 425 units farther than Jax's (550 vs 125 attack range).

#### 9. Nilah (net +0.41)

- **0.53** attack dodge: Jubilant Veil dodges Zeri's Spark Surge, which applies on-hit effects. Jubilant Veil lasts 2.25 s on a 22 s cooldown. (Nilah W Jubilant Veil → Zeri E Spark Surge)
- **0.41** attack dodge: Jubilant Veil dodges Zeri's basic attacks (with Living Battery). Jubilant Veil lasts 2.25 s on a 22 s cooldown. (Nilah W Jubilant Veil → Zeri basic attacks)
- **0.12** attack dodge: Jubilant Veil dodges Zeri's Burst Fire, which applies on-hit effects. Jubilant Veil lasts 2.25 s on a 22 s cooldown. Burst Fire is parried by dodge and block.
  - Blind causes Burst Fire to cast in a random direction. The rounds will still deal damage to enemies hit. (Nilah W Jubilant Veil → Zeri Q Burst Fire)
- Watch out: Zeri's basic attacks reach 325 units farther than Nilah's (550 vs 225 attack range).

#### 10. Yuumi (net +0.41)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Zeri's Lightning Crash. Untargetable for ?; Lightning Crash takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Zeri R Lightning Crash)
- Watch out: Zeri's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +0.59 | 0.59 | 0.00 |  |
| 2 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 3 | Teemo | +0.58 | 0.58 | 0.00 | blind (Blinding Dart) |
| 4 | Shen | +0.57 | 0.86 | 0.29 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 5 | Bard | +0.51 | 0.51 | 0.00 |  |
| 6 | Aurora | +0.45 | 0.45 | 0.00 |  |
| 7 | Xayah | +0.45 | 0.45 | 0.00 |  |
| 8 | Jax | +0.43 | 0.87 | 0.44 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 9 | Nilah | +0.41 | 0.77 | 0.36 | attack dodge (Jubilant Veil), attack dodge (Jubilant Veil) |
| 10 | Yuumi | +0.41 | 0.55 | 0.14 |  |
| 11 | Lulu | +0.41 | 0.41 | 0.00 | disarm (Whimsy) |
| 12 | Fizz | +0.34 | 0.55 | 0.21 |  |
| 13 | Vladimir | +0.33 | 0.55 | 0.22 |  |
| 14 | Samira | +0.31 | 0.31 | 0.00 |  |
| 15 | Ahri | +0.30 | 0.30 | 0.00 |  |
| 16 | Hwei | +0.30 | 0.30 | 0.00 |  |
| 17 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 18 | Mel | +0.30 | 0.30 | 0.00 |  |
| 19 | Veigar | +0.30 | 0.30 | 0.00 |  |
| 20 | Vex | +0.30 | 0.30 | 0.00 |  |
| 21 | Viktor | +0.30 | 0.30 | 0.00 |  |
| 22 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 23 | Sivir | +0.28 | 0.28 | 0.00 |  |
| 24 | Pantheon | +0.27 | 0.55 | 0.28 |  |
| 25 | Camille | +0.26 | 0.48 | 0.22 |  |
| 26 | Varus | +0.24 | 0.24 | 0.00 |  |
| 27 | Kayn | +0.23 | 0.51 | 0.28 |  |
| 28 | Rek'Sai | +0.23 | 0.51 | 0.28 |  |
| 29 | Evelynn | +0.22 | 0.51 | 0.29 |  |
| 30 | Shaco | +0.22 | 0.51 | 0.29 |  |
| 31 | Malzahar | +0.22 | 0.22 | 0.00 |  |
| 32 | Master Yi | +0.21 | 0.62 | 0.41 |  |
| 33 | Fiora | +0.16 | 0.60 | 0.44 |  |
| 34 | Zed | +0.16 | 0.45 | 0.29 |  |
| 35 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 36 | Gwen | +0.11 | 0.55 | 0.44 |  |
| 37 | Maokai | +0.11 | 0.55 | 0.44 |  |
| 38 | Caitlyn | +0.09 | 0.09 | 0.00 |  |
| 39 | Milio | +0.06 | 0.06 | 0.00 |  |
| 40 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 41 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 42 | Xin Zhao | +0.04 | 0.45 | 0.41 |  |
| 43 | Yasuo | +0.04 | 0.32 | 0.28 |  |
| 44 | Annie | +0.04 | 0.04 | 0.00 |  |
| 45 | Kalista | +0.04 | 0.04 | 0.00 |  |
| 46 | Rammus | 0.00 | 0.44 | 0.44 | attack reflect (Defensive Ball Curl) |
| 47 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 48 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 49 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 50 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 51 | Azir | 0.00 | 0.00 | 0.00 |  |
| 52 | Brand | 0.00 | 0.00 | 0.00 |  |
| 53 | Corki | 0.00 | 0.00 | 0.00 |  |
| 54 | Draven | 0.00 | 0.00 | 0.00 |  |
| 55 | Elise | 0.00 | 0.00 | 0.00 |  |
| 56 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 57 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 58 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 59 | Janna | 0.00 | 0.00 | 0.00 |  |
| 60 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 61 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 62 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 63 | Karma | 0.00 | 0.00 | 0.00 |  |
| 64 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 65 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 66 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 67 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 68 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 69 | Lux | 0.00 | 0.00 | 0.00 |  |
| 70 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 71 | Nami | 0.00 | 0.00 | 0.00 |  |
| 72 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 73 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 74 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 75 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 76 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 77 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 78 | Senna | 0.00 | 0.00 | 0.00 |  |
| 79 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 80 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 81 | Sona | 0.00 | 0.00 | 0.00 |  |
| 82 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 83 | Swain | 0.00 | 0.00 | 0.00 |  |
| 84 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 85 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 86 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 87 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 88 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 89 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 90 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 91 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 92 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 93 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 94 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 95 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 96 | Yone | -0.05 | 0.16 | 0.21 |  |
| 97 | Braum | -0.06 | 0.38 | 0.44 |  |
| 98 | Poppy | -0.06 | 0.38 | 0.44 |  |
| 99 | Thresh | -0.07 | 0.00 | 0.07 |  |
| 100 | Ivern | -0.08 | 0.00 | 0.08 |  |
| 101 | Warwick | -0.09 | 0.20 | 0.29 |  |
| 102 | Graves | -0.09 | 0.00 | 0.09 |  |
| 103 | Zac | -0.11 | 0.30 | 0.41 |  |
| 104 | Kled | -0.12 | 0.05 | 0.17 |  |
| 105 | Morgana | -0.14 | 0.08 | 0.22 |  |
| 106 | Malphite | -0.15 | 0.29 | 0.44 |  |
| 107 | Nocturne | -0.16 | 0.28 | 0.44 |  |
| 108 | Rakan | -0.18 | 0.00 | 0.18 |  |
| 109 | Viego | -0.19 | 0.00 | 0.19 |  |
| 110 | Katarina | -0.20 | 0.24 | 0.44 |  |
| 111 | Jarvan IV | -0.21 | 0.00 | 0.21 |  |
| 112 | Sylas | -0.21 | 0.00 | 0.21 |  |
| 113 | Singed | -0.22 | 0.66 | 0.88 |  |
| 114 | Briar | -0.22 | 0.00 | 0.22 |  |
| 115 | Karthus | -0.22 | 0.00 | 0.22 |  |
| 116 | K'Sante | -0.22 | 0.00 | 0.22 |  |
| 117 | Naafiri | -0.22 | 0.00 | 0.22 |  |
| 118 | Urgot | -0.22 | 0.00 | 0.22 |  |
| 119 | Zaahen | -0.23 | 0.05 | 0.28 |  |
| 120 | Lillia | -0.25 | 0.00 | 0.25 |  |
| 121 | Hecarim | -0.28 | 0.00 | 0.28 |  |
| 122 | Wukong | -0.28 | 0.00 | 0.28 |  |
| 123 | Ornn | -0.28 | 0.00 | 0.28 |  |
| 124 | Rell | -0.28 | 0.00 | 0.28 |  |
| 125 | Amumu | -0.29 | 0.15 | 0.44 |  |
| 126 | Akali | -0.29 | 0.00 | 0.29 |  |
| 127 | Ambessa | -0.29 | 0.00 | 0.29 |  |
| 128 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 129 | Ekko | -0.29 | 0.00 | 0.29 |  |
| 130 | Galio | -0.29 | 0.00 | 0.29 |  |
| 131 | Lee Sin | -0.29 | 0.00 | 0.29 |  |
| 132 | Pyke | -0.29 | 0.00 | 0.29 |  |
| 133 | Qiyana | -0.29 | 0.00 | 0.29 |  |
| 134 | Riven | -0.29 | 0.00 | 0.29 |  |
| 135 | Talon | -0.29 | 0.00 | 0.29 |  |
| 136 | Vi | -0.29 | 0.00 | 0.29 |  |
| 137 | Volibear | -0.29 | 0.00 | 0.29 |  |
| 138 | Udyr | -0.33 | 0.11 | 0.44 |  |
| 139 | Irelia | -0.39 | 0.00 | 0.39 |  |
| 140 | Alistar | -0.40 | 0.04 | 0.44 |  |
| 141 | Aatrox | -0.41 | 0.00 | 0.41 |  |
| 142 | Nautilus | -0.41 | 0.00 | 0.41 |  |
| 143 | Tahm Kench | -0.41 | 0.00 | 0.41 |  |
| 144 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 145 | Nasus | -0.43 | 0.45 | 0.88 | attack speed slow (Wither) |
| 146 | Diana | -0.44 | 0.00 | 0.44 |  |
| 147 | Gragas | -0.44 | 0.00 | 0.44 |  |
| 148 | Illaoi | -0.44 | 0.00 | 0.44 |  |
| 149 | Kassadin | -0.44 | 0.00 | 0.44 |  |
| 150 | Kha'Zix | -0.44 | 0.00 | 0.44 |  |
| 151 | Leona | -0.44 | 0.00 | 0.44 |  |
| 152 | Locke | -0.44 | 0.00 | 0.44 |  |
| 153 | Renekton | -0.44 | 0.00 | 0.44 |  |
| 154 | Sejuani | -0.44 | 0.00 | 0.44 |  |
| 155 | Sett | -0.44 | 0.00 | 0.44 |  |
| 156 | Shyvana | -0.44 | 0.00 | 0.44 |  |
| 157 | Garen | -0.71 | 0.12 | 0.83 |  |
| 158 | Mordekaiser | -0.72 | 0.11 | 0.83 |  |
| 159 | Nunu & Willump | -0.75 | 0.13 | 0.88 |  |
| 160 | Sion | -0.78 | 0.05 | 0.83 |  |
| 161 | Rengar | -0.80 | 0.08 | 0.88 |  |
| 162 | Gangplank | -0.81 | 0.07 | 0.88 |  |
| 163 | Skarner | -0.82 | 0.06 | 0.88 |  |
| 164 | Olaf | -0.83 | 0.05 | 0.88 |  |
| 165 | Darius | -0.83 | 0.00 | 0.83 |  |
| 166 | Trundle | -0.83 | 0.00 | 0.83 |  |
| 167 | Yorick | -0.83 | 0.00 | 0.83 |  |
| 168 | Blitzcrank | -0.88 | 0.00 | 0.88 |  |
| 169 | Cho'Gath | -0.88 | 0.00 | 0.88 |  |
| 170 | Dr. Mundo | -0.88 | 0.00 | 0.88 |  |
| 171 | Rumble | -0.88 | 0.00 | 0.88 |  |
| 172 | Taric | -0.88 | 0.00 | 0.88 |  |
