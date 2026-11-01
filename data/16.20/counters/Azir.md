# Counters to Azir (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Azir: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Azir wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Azir --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +1.00 |
| 2 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 3 | Jayce | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 4 | Xin Zhao | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 5 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 6 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 7 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | −0.26 | +1.00 | +1.00 |
| 8 | Lee Sin | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 9 | Galio | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 10 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 11 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 12 | Master Yi | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 13 | Alistar | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 14 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 15 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 16 | Yasuo | +0.80 | +1.00 | +1.00 | +0.99 | −0.00 | +1.00 | +0.00 |
| 17 | Urgot | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +0.95 | +0.00 |
| 18 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 19 | Zac | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 20 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 21 | Volibear | +0.79 | +1.00 | +0.99 | +1.00 | −0.02 | +0.99 | +0.00 |
| 22 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 23 | Gragas | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 24 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 25 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 26 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 27 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 28 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 29 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 30 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 31 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 32 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 33 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 34 | Swain | +0.78 | +1.00 | +1.00 | +0.96 | +0.08 | – | +0.00 |
| 35 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 36 | Nautilus | +0.78 | +1.00 | +0.87 | +1.00 | +0.09 | +0.99 | +0.00 |
| 37 | Elise | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 38 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 39 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 40 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 41 | Fiddlesticks | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 42 | Mordekaiser | +0.75 | +1.00 | +0.92 | +0.99 | −0.06 | +0.84 | +0.00 |
| 43 | Gwen | +0.74 | +0.94 | +1.00 | +1.00 | −0.26 | +0.99 | +0.00 |
| 44 | Malzahar | +0.73 | +0.85 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 45 | Yone | +0.70 | +1.00 | +1.00 | +1.00 | −0.09 | +0.17 | +0.00 |
| 46 | Rek'Sai | +0.70 | +1.00 | +1.00 | +1.00 | −0.01 | +0.00 | +0.00 |
| 47 | Tahm Kench | +0.63 | +1.00 | +0.96 | +0.22 | +0.01 | +0.96 | +0.00 |
| 48 | Kayn | +0.62 | +0.69 | +0.69 | +1.00 | −0.07 | +0.84 | +0.00 |
| 49 | Gangplank | +0.60 | +1.00 | +1.00 | +1.00 | +0.03 | −1.00 | +0.00 |
| 50 | Kayle | +0.60 | +1.00 | +1.00 | +1.00 | +0.02 | −1.00 | +0.00 |
| 51 | Trundle | +0.58 | +1.00 | +1.00 | +1.00 | −0.11 | −1.00 | +0.00 |
| 52 | Kled | +0.54 | +1.00 | +0.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 53 | Vayne | +0.51 | +1.00 | +0.07 | +1.00 | −0.06 | – | +0.00 |
| 54 | Kog'Maw | +0.50 | +0.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 55 | Gnar | +0.42 | +0.50 | +0.82 | +1.00 | −0.05 | −1.00 | +0.00 |
| 56 | Graves | +0.42 | +1.00 | +1.00 | −1.00 | +0.15 | +1.00 | +0.00 |
| 57 | Rammus | +0.41 | +1.00 | +1.00 | −0.88 | −0.09 | +1.00 | +0.00 |
| 58 | Karma | +0.40 | +0.24 | +0.44 | +0.90 | +0.03 | – | +0.00 |
| 59 | Sion | +0.37 | +0.32 | −0.01 | +1.00 | −0.04 | +1.00 | +0.00 |
| 60 | Diana | +0.37 | +0.00 | +1.00 | +0.00 | +0.11 | +1.00 | +0.00 |
| 61 | Riven | +0.30 | +0.00 | +0.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 62 | Viego | +0.29 | −1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 63 | Malphite | +0.29 | −1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 64 | Zaahen | +0.29 | −1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 65 | Pantheon | +0.29 | +0.00 | +0.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 66 | Kassadin | +0.29 | −1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 67 | Briar | +0.27 | −1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 68 | Neeko | +0.23 | +1.00 | −1.00 | +1.00 | +0.03 | – | +0.00 |
| 69 | Quinn | +0.22 | −1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 70 | Twisted Fate | +0.22 | −1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 71 | Wukong | +0.21 | +0.00 | +0.50 | +1.00 | −0.10 | −1.00 | +0.00 |
| 72 | Draven | +0.20 | +0.65 | +0.87 | −1.00 | −0.01 | – | +0.00 |
| 73 | Skarner | +0.17 | +0.00 | +0.19 | +1.00 | +0.17 | −1.00 | +0.00 |
| 74 | Irelia | +0.16 | −0.18 | −0.39 | +1.00 | +0.01 | +1.00 | +0.00 |
| 75 | Garen | +0.13 | +1.00 | −1.00 | +1.00 | +0.03 | −0.75 | +0.00 |
| 76 | Anivia | +0.08 | +0.01 | −0.44 | +1.00 | −0.12 | – | +0.00 |
| 77 | Cho'Gath | +0.08 | +1.00 | −1.00 | +1.00 | −0.12 | −1.00 | +0.00 |
| 78 | Rumble | +0.03 | −1.00 | +0.47 | +1.00 | −0.03 | −0.36 | +0.00 |
| 79 | Samira | −0.04 | −0.60 | −0.35 | +1.00 | −0.02 | – | +0.00 |
| 80 | Lillia | −0.07 | +0.21 | −0.96 | +0.09 | +0.01 | +1.00 | +0.00 |
| 81 | Jarvan IV | −0.08 | +1.00 | −1.00 | −1.00 | +0.16 | +1.00 | +0.00 |
| 82 | Sejuani | −0.10 | −0.99 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 83 | Taric | −0.10 | −0.12 | −0.09 | −0.23 | +0.00 | −0.04 | +0.00 |
| 84 | Rengar | −0.13 | −1.00 | −1.00 | +1.00 | +0.44 | +1.00 | +0.00 |
| 85 | Hwei | −0.14 | −1.00 | −0.34 | +1.00 | +0.05 | – | +0.00 |
| 86 | Illaoi | −0.19 | +0.54 | −0.13 | −1.00 | −0.06 | −0.82 | +0.00 |
| 87 | Amumu | −0.20 | +0.66 | −1.00 | −1.00 | +0.05 | +0.82 | +0.00 |
| 88 | Bel'Veth | −0.21 | −1.00 | −1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 89 | Ashe | −0.31 | −1.00 | +0.69 | −1.00 | −0.01 | – | +0.00 |
| 90 | Smolder | −0.31 | −1.00 | −1.00 | +1.00 | +0.13 | – | +0.00 |
| 91 | Ziggs | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 92 | Syndra | −0.33 | −1.00 | −1.00 | +1.00 | +0.02 | – | +0.00 |
| 93 | Corki | −0.33 | −1.00 | −1.00 | +1.00 | +0.02 | – | +0.00 |
| 94 | Orianna | −0.33 | −1.00 | −1.00 | +1.00 | +0.01 | – | +0.00 |
| 95 | Kindred | −0.33 | −1.00 | −1.00 | +1.00 | +0.01 | – | +0.00 |
| 96 | Xayah | −0.33 | −1.00 | −1.00 | +1.00 | +0.00 | – | +0.00 |
| 97 | Kalista | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 98 | Aurora | −0.34 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 99 | Karthus | −0.36 | −0.17 | −1.00 | −0.16 | +0.03 | – | +0.00 |
| 100 | Leona | −0.39 | +0.65 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 101 | Ornn | −0.39 | −1.00 | −1.00 | +0.90 | −0.04 | −0.66 | +0.00 |
| 102 | Ambessa | −0.40 | −1.00 | −1.00 | +1.00 | +0.03 | −1.00 | +0.00 |
| 103 | Singed | −0.45 | −1.00 | −1.00 | +0.77 | −0.01 | −1.00 | +0.00 |
| 104 | Jinx | −0.48 | −1.00 | −1.00 | +0.31 | +0.02 | – | +0.00 |
| 105 | Vel'Koz | −0.49 | −1.00 | −0.32 | −0.70 | +0.17 | – | +0.00 |
| 106 | Jhin | −0.55 | −1.00 | −1.00 | +0.04 | −0.02 | – | +0.00 |
| 107 | Cassiopeia | −0.55 | −1.00 | −1.00 | +0.00 | +0.01 | – | +0.00 |
| 108 | Twitch | −0.56 | −1.00 | −1.00 | +0.00 | −0.04 | – | +0.00 |
| 109 | Aatrox | −0.57 | −1.00 | −0.02 | −1.00 | −0.13 | −1.00 | +0.00 |
| 110 | Aurelion Sol | −0.71 | −1.00 | −1.00 | −1.00 | +0.40 | – | +0.00 |
| 111 | Morgana | −0.71 | −0.85 | −1.00 | −0.89 | −0.01 | – | +0.00 |
| 112 | Bard | −0.72 | −1.00 | −1.00 | −0.70 | −0.08 | – | +0.00 |
| 113 | Veigar | −0.75 | −1.00 | −1.00 | −0.87 | −0.01 | – | +0.00 |
| 114 | Zeri | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 115 | Tristana | −0.77 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.00 |
| 116 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 117 | Zoe | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 118 | Milio | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 119 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 120 | Lux | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 121 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 122 | Rell | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 123 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 124 | Ryze | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 125 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 126 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 127 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 128 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 129 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 130 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 131 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 132 | Yunara | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 133 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 134 | Brand | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 135 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 136 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 137 | Lucian | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 138 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 139 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 140 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 141 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 142 | Zyra | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 143 | Varus | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 144 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 145 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 146 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 147 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 148 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 149 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 150 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 151 | Annie | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 152 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 153 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 154 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 155 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 156 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 157 | Nilah | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 158 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 159 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 160 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 161 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 162 | Shaco | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 163 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 164 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 165 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 166 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 167 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 168 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 169 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 170 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 171 | Zed | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 172 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Azir's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Azir's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Azir` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.08)

- **0.80** spell shield: Spell Shield's spell shield blocks Azir's Emperor's Divide. Spell shield for 1.5 s, long enough to use ahead of Emperor's Divide. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Azir R Emperor's Divide)
- **0.56** spell shield: Spell Shield's spell shield blocks Azir's Shifting Sands. Spell shield for 1.5 s, long enough to use ahead of Shifting Sands. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Azir E Shifting Sands)

#### 2. Lissandra (net +1.00)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Azir's Emperor's Divide. Untargetable for 2.5 s, long enough to use ahead of Emperor's Divide. (Lissandra R Frozen Tomb → Azir R Emperor's Divide)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Azir's Shifting Sands. Untargetable for 2.5 s, long enough to use ahead of Shifting Sands. (Lissandra R Frozen Tomb → Azir E Shifting Sands)
- **0.16** dash stop: Frozen Tomb's knockdown can stop Azir's Shifting Sands mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Azir E Shifting Sands)

#### 3. Nocturne (net +0.99)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Azir's Emperor's Divide. Spell shield for 1.5 s, long enough to use ahead of Emperor's Divide. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Azir R Emperor's Divide)
- **0.60** spell shield: Shroud of Darkness's spell shield blocks Azir's Shifting Sands. Spell shield for 1.5 s, long enough to use ahead of Shifting Sands. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Azir E Shifting Sands)
- **0.16** cc immunity: Paranoia is displacement immune, ignoring Azir's Emperor's Divide (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Azir R Emperor's Divide)
- Watch out: Azir's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 4. Bard (net +0.96)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Azir's Emperor's Divide. Untargetable for 2.5 s, long enough to use ahead of Emperor's Divide. (Bard R Tempered Fate → Azir R Emperor's Divide)
- **0.31** untargetable: Tempered Fate makes Bard untargetable, dodging Azir's Shifting Sands. Untargetable for 2.5 s, long enough to use ahead of Shifting Sands. (Bard R Tempered Fate → Azir E Shifting Sands)

#### 5. Vladimir (net +0.95)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Azir's Emperor's Divide. Untargetable for 2 s, long enough to use ahead of Emperor's Divide. (Vladimir W Sanguine Pool → Azir R Emperor's Divide)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Azir's Shifting Sands. Untargetable for 2 s, long enough to use ahead of Shifting Sands. (Vladimir W Sanguine Pool → Azir E Shifting Sands)
- Watch out: Azir's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 6. Xayah (net +0.90)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Azir's Emperor's Divide. Untargetable for 1.5 s, long enough to use ahead of Emperor's Divide. (Xayah R Featherstorm → Azir R Emperor's Divide)
- **0.30** untargetable: Featherstorm makes Xayah untargetable, dodging Azir's Shifting Sands. Untargetable for 1.5 s, long enough to use ahead of Shifting Sands. (Xayah R Featherstorm → Azir E Shifting Sands)

#### 7. Aurora (net +0.88)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Azir's Emperor's Divide. Untargetable for 0.4 s; Emperor's Divide takes 0.9 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Azir R Emperor's Divide)
- **0.18** untargetable: Between Worlds makes Aurora untargetable, dodging Azir's Shifting Sands. Untargetable for 0.4 s; Shifting Sands lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Azir E Shifting Sands)
- **0.16** cc immunity: Between Worlds is displacement immune, ignoring Azir's Emperor's Divide (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Azir R Emperor's Divide)

#### 8. Fizz (net +0.86)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Azir's Emperor's Divide. Untargetable for 0.75 s; Emperor's Divide takes 0.9 s to land, enough to react. (Fizz E Playful → Azir R Emperor's Divide)
- **0.36** untargetable: Playful makes Fizz untargetable, dodging Azir's Shifting Sands. Untargetable for 0.75 s; Shifting Sands lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Azir E Shifting Sands)
- Watch out: Azir's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 9. Fiora (net +0.85)

- **0.90** parry: Riposte parries Azir's Emperor's Divide and stuns back. Parry for 0.75 s; Emperor's Divide takes 0.9 s to land, enough to react. Negating Emperor's Divide's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Azir R Emperor's Divide)
- **0.36** parry: Riposte parries Azir's Shifting Sands. Parry for 0.75 s; Shifting Sands lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Azir E Shifting Sands)
- **0.06** attack speed slow: Riposte cuts Azir's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Azir basic attacks)
- Watch out: Azir's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

#### 10. Rek'Sai (net +0.84)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Azir's Emperor's Divide. Untargetable for 1.5 s, long enough to use ahead of Emperor's Divide. (Rek'Sai R Void Rush → Azir R Emperor's Divide)
- **0.31** untargetable: Void Rush makes Rek'Sai untargetable, dodging Azir's Shifting Sands. Untargetable for 1.5 s, long enough to use ahead of Shifting Sands. (Rek'Sai R Void Rush → Azir E Shifting Sands)
- **0.16** cc immunity: Void Rush is displacement immune, ignoring Azir's Emperor's Divide (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Azir R Emperor's Divide)
- Watch out: Azir's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.08 | 1.08 | 0.00 |  |
| 2 | Lissandra | +1.00 | 1.00 | 0.00 |  |
| 3 | Nocturne | +0.99 | 1.26 | 0.27 |  |
| 4 | Bard | +0.96 | 0.96 | 0.00 |  |
| 5 | Vladimir | +0.95 | 1.10 | 0.15 |  |
| 6 | Xayah | +0.90 | 0.90 | 0.00 |  |
| 7 | Aurora | +0.88 | 0.88 | 0.00 |  |
| 8 | Fizz | +0.86 | 0.98 | 0.12 |  |
| 9 | Fiora | +0.85 | 1.10 | 0.25 |  |
| 10 | Rek'Sai | +0.84 | 1.00 | 0.16 |  |
| 11 | Camille | +0.80 | 0.93 | 0.13 |  |
| 12 | Morgana | +0.74 | 0.84 | 0.10 |  |
| 13 | Gwen | +0.72 | 0.97 | 0.25 |  |
| 14 | Evelynn | +0.72 | 0.90 | 0.18 |  |
| 15 | Shaco | +0.72 | 0.90 | 0.18 |  |
| 16 | Maokai | +0.71 | 0.98 | 0.27 |  |
| 17 | Master Yi | +0.70 | 1.04 | 0.34 |  |
| 18 | Zaahen | +0.67 | 0.83 | 0.16 |  |
| 19 | Zed | +0.66 | 0.84 | 0.18 |  |
| 20 | Kled | +0.65 | 0.74 | 0.09 |  |
| 21 | Kayle | +0.62 | 0.62 | 0.00 |  |
| 22 | Udyr | +0.59 | 0.86 | 0.27 |  |
| 23 | Kalista | +0.56 | 0.56 | 0.00 |  |
| 24 | Yuumi | +0.53 | 0.98 | 0.45 |  |
| 25 | Vex | +0.51 | 0.51 | 0.00 |  |
| 26 | Samira | +0.47 | 0.47 | 0.00 | projectile block (Blade Whirl) |
| 27 | Mel | +0.46 | 0.46 | 0.00 | projectile block (Rebuttal) |
| 28 | Alistar | +0.39 | 0.66 | 0.27 |  |
| 29 | Warwick | +0.36 | 1.06 | 0.70 |  |
| 30 | Ahri | +0.36 | 0.36 | 0.00 |  |
| 31 | Hwei | +0.36 | 0.36 | 0.00 |  |
| 32 | Jinx | +0.36 | 0.36 | 0.00 |  |
| 33 | Jax | +0.35 | 0.62 | 0.27 | attack dodge (Counter Strike) |
| 34 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 35 | Veigar | +0.35 | 0.35 | 0.00 |  |
| 36 | Viktor | +0.35 | 0.35 | 0.00 |  |
| 37 | Kayn | +0.32 | 0.90 | 0.58 |  |
| 38 | Yasuo | +0.31 | 0.47 | 0.16 | projectile block (Wind Wall) |
| 39 | Olaf | +0.30 | 0.83 | 0.53 |  |
| 40 | Xin Zhao | +0.30 | 0.53 | 0.23 |  |
| 41 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 42 | Sion | +0.28 | 0.83 | 0.55 |  |
| 43 | Nilah | +0.27 | 0.47 | 0.20 |  |
| 44 | Malzahar | +0.26 | 0.63 | 0.37 |  |
| 45 | Lulu | +0.25 | 0.25 | 0.00 |  |
| 46 | Yone | +0.24 | 0.36 | 0.12 |  |
| 47 | Braum | +0.23 | 0.50 | 0.27 | projectile block (Unbreakable) |
| 48 | K'Sante | +0.19 | 0.32 | 0.13 |  |
| 49 | Rengar | +0.15 | 0.68 | 0.53 |  |
| 50 | Gangplank | +0.14 | 0.67 | 0.53 |  |
| 51 | Pantheon | +0.12 | 0.76 | 0.64 |  |
| 52 | Tristana | +0.11 | 0.11 | 0.00 |  |
| 53 | Malphite | +0.07 | 0.34 | 0.27 |  |
| 54 | Milio | +0.06 | 0.06 | 0.00 |  |
| 55 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 56 | Ashe | +0.05 | 0.05 | 0.00 |  |
| 57 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 58 | Jarvan IV | +0.04 | 0.16 | 0.12 |  |
| 59 | Annie | +0.04 | 0.04 | 0.00 |  |
| 60 | Senna | +0.04 | 0.04 | 0.00 |  |
| 61 | Anivia | +0.03 | 0.03 | 0.00 |  |
| 62 | Hecarim | +0.01 | 0.17 | 0.16 |  |
| 63 | Ornn | 0.00 | 0.16 | 0.16 |  |
| 64 | Brand | 0.00 | 0.00 | 0.00 |  |
| 65 | Corki | 0.00 | 0.00 | 0.00 |  |
| 66 | Draven | 0.00 | 0.00 | 0.00 |  |
| 67 | Elise | 0.00 | 0.00 | 0.00 |  |
| 68 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 69 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 70 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 71 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 72 | Karma | 0.00 | 0.00 | 0.00 |  |
| 73 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 74 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 75 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 76 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 77 | Lux | 0.00 | 0.00 | 0.00 |  |
| 78 | Nami | 0.00 | 0.00 | 0.00 |  |
| 79 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 80 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 81 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 82 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 83 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 84 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 85 | Sona | 0.00 | 0.00 | 0.00 |  |
| 86 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 87 | Swain | 0.00 | 0.00 | 0.00 |  |
| 88 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 89 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 90 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 91 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 92 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 93 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 94 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 95 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 96 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 97 | Volibear | -0.01 | 0.16 | 0.17 |  |
| 98 | Shen | -0.03 | 0.60 | 0.63 | attack block (Spirit's Refuge) |
| 99 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 100 | Graves | -0.04 | 0.00 | 0.04 |  |
| 101 | Varus | -0.05 | 0.00 | 0.05 |  |
| 102 | Poppy | -0.06 | 0.41 | 0.47 |  |
| 103 | Viego | -0.06 | 0.16 | 0.22 |  |
| 104 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 105 | Ivern | -0.07 | 0.00 | 0.07 |  |
| 106 | Amumu | -0.08 | 0.19 | 0.27 |  |
| 107 | Zac | -0.09 | 0.37 | 0.46 |  |
| 108 | Shyvana | -0.09 | 0.16 | 0.25 |  |
| 109 | Rakan | -0.10 | 0.00 | 0.10 |  |
| 110 | Illaoi | -0.11 | 0.16 | 0.27 |  |
| 111 | Sett | -0.11 | 0.16 | 0.27 |  |
| 112 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 113 | Urgot | -0.12 | 0.00 | 0.12 |  |
| 114 | Briar | -0.13 | 0.00 | 0.13 |  |
| 115 | Lillia | -0.13 | 0.00 | 0.13 |  |
| 116 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 117 | Rammus | -0.15 | 0.27 | 0.42 |  |
| 118 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 119 | Rell | -0.16 | 0.00 | 0.16 |  |
| 120 | Bel'Veth | -0.17 | 0.00 | 0.17 |  |
| 121 | Qiyana | -0.17 | 0.00 | 0.17 |  |
| 122 | Akali | -0.18 | 0.00 | 0.18 |  |
| 123 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 124 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 125 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 126 | Riven | -0.18 | 0.00 | 0.18 |  |
| 127 | Talon | -0.18 | 0.00 | 0.18 |  |
| 128 | Caitlyn | -0.21 | 0.07 | 0.28 |  |
| 129 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 130 | Singed | -0.23 | 0.30 | 0.53 |  |
| 131 | Aatrox | -0.23 | 0.00 | 0.23 |  |
| 132 | Nautilus | -0.23 | 0.00 | 0.23 |  |
| 133 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 134 | Vi | -0.24 | 0.16 | 0.40 |  |
| 135 | Akshan | -0.24 | 0.00 | 0.24 |  |
| 136 | Diana | -0.25 | 0.00 | 0.25 |  |
| 137 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 138 | Pyke | -0.25 | 0.00 | 0.25 |  |
| 139 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 140 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 141 | Vel'Koz | -0.26 | 0.00 | 0.26 |  |
| 142 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 143 | Leona | -0.27 | 0.00 | 0.27 |  |
| 144 | Locke | -0.27 | 0.00 | 0.27 |  |
| 145 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 146 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 147 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 148 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 149 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 150 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 151 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 152 | Garen | -0.36 | 0.11 | 0.47 |  |
| 153 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 154 | Fiddlesticks | -0.38 | 0.00 | 0.38 |  |
| 155 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 156 | Janna | -0.40 | 0.00 | 0.40 |  |
| 157 | Mordekaiser | -0.41 | 0.06 | 0.47 |  |
| 158 | Skarner | -0.44 | 0.06 | 0.50 |  |
| 159 | Katarina | -0.46 | 0.00 | 0.46 |  |
| 160 | Darius | -0.47 | 0.00 | 0.47 |  |
| 161 | Trundle | -0.47 | 0.00 | 0.47 |  |
| 162 | Yorick | -0.47 | 0.00 | 0.47 |  |
| 163 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 164 | Tahm Kench | -0.49 | 0.00 | 0.49 |  |
| 165 | Taric | -0.50 | 0.00 | 0.50 |  |
| 166 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 167 | Cho'Gath | -0.53 | 0.00 | 0.53 |  |
| 168 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 169 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 170 | Naafiri | -0.55 | 0.00 | 0.55 |  |
| 171 | Galio | -0.72 | 0.00 | 0.72 |  |
| 172 | Nunu & Willump | -0.78 | 0.12 | 0.90 |  |
