# Counters to Zoe (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Zoe: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Zoe wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Zoe --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +1.00 |
| 2 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 3 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 4 | Jarvan IV | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 5 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 6 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 7 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 8 | Sylas | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 9 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 10 | Diana | +0.81 | +0.98 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 11 | Fizz | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 12 | Xin Zhao | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 13 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 14 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 15 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 16 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 17 | Rengar | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 18 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 19 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 20 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 21 | Sejuani | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 22 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 23 | Viego | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 24 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 25 | Yunara | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 26 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 27 | Vi | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 28 | Master Yi | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 29 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 30 | Gnar | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 31 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 32 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 33 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 34 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 35 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 36 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 37 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 38 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 39 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 40 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 41 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 42 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 43 | Volibear | +0.79 | +1.00 | +0.99 | +1.00 | −0.06 | +0.99 | +0.00 |
| 44 | Shaco | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 45 | Sion | +0.79 | +0.99 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 46 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 47 | Smolder | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 48 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 49 | Gwen | +0.78 | +0.94 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 50 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 51 | Kayle | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 52 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 53 | Wukong | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 54 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 55 | Neeko | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 56 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 57 | Naafiri | +0.78 | +0.86 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 58 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 59 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 60 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 61 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 62 | Gragas | +0.77 | +0.88 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 63 | Samira | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 64 | Akshan | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 65 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 66 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 67 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 68 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 69 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 70 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 71 | Kennen | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 72 | Pantheon | +0.76 | +0.85 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 73 | Quinn | +0.75 | +0.96 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 74 | Jinx | +0.73 | +1.00 | +1.00 | +1.00 | −0.03 | +0.38 | +0.00 |
| 75 | Orianna | +0.72 | +1.00 | +1.00 | +1.00 | +0.00 | +0.16 | +0.00 |
| 76 | Mordekaiser | +0.72 | +1.00 | +0.88 | +0.85 | −0.09 | +0.88 | +0.00 |
| 77 | Miss Fortune | +0.68 | +1.00 | +0.67 | +1.00 | −0.02 | +0.67 | +0.00 |
| 78 | Rammus | +0.68 | +0.55 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 79 | Varus | +0.67 | +0.58 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 80 | Kindred | +0.66 | +1.00 | +1.00 | +1.00 | −0.07 | −0.32 | +0.00 |
| 81 | Swain | +0.65 | +0.76 | +0.77 | +1.00 | +0.02 | – | +0.00 |
| 82 | Sett | +0.64 | +0.98 | +0.58 | +1.00 | −0.03 | +0.58 | +0.00 |
| 83 | Ivern | +0.63 | +1.00 | +0.50 | +1.00 | −0.07 | – | +0.00 |
| 84 | Garen | +0.62 | +1.00 | +1.00 | +0.05 | +0.04 | +1.00 | +0.00 |
| 85 | Skarner | +0.60 | +0.97 | +1.00 | +0.11 | −0.07 | +1.00 | +0.00 |
| 86 | Galio | +0.60 | +0.74 | +0.60 | +1.00 | +0.03 | +0.60 | +0.00 |
| 87 | Lucian | +0.59 | +0.93 | +0.43 | +1.00 | −0.04 | – | +0.00 |
| 88 | Rakan | +0.59 | +0.10 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 89 | Singed | +0.56 | +1.00 | +0.34 | +1.00 | −0.05 | +0.34 | +0.00 |
| 90 | Kayn | +0.51 | +0.54 | +0.53 | +1.00 | −0.05 | +0.53 | +0.00 |
| 91 | Maokai | +0.51 | +0.37 | +1.00 | +0.35 | −0.02 | +1.00 | +0.00 |
| 92 | Darius | +0.49 | +1.00 | +0.67 | +0.05 | −0.05 | +0.67 | +0.00 |
| 93 | Amumu | +0.48 | +0.82 | +0.20 | +1.00 | +0.02 | +0.20 | +0.00 |
| 94 | Irelia | +0.46 | +1.00 | +0.02 | +1.00 | +0.04 | +0.02 | +0.00 |
| 95 | Aatrox | +0.44 | +0.42 | +0.49 | +0.93 | −0.16 | +0.49 | +0.00 |
| 96 | Illaoi | +0.36 | +0.31 | +0.29 | +0.94 | −0.07 | +0.29 | +0.00 |
| 97 | Ryze | +0.34 | −0.53 | +0.96 | +1.00 | −0.01 | – | +0.00 |
| 98 | Annie | +0.30 | +0.35 | +0.40 | +0.39 | +0.04 | – | +0.00 |
| 99 | Zac | +0.27 | +0.93 | +0.02 | +0.17 | −0.04 | +0.02 | +0.00 |
| 100 | Briar | +0.26 | +1.00 | −0.49 | +1.00 | −0.13 | −0.49 | +0.00 |
| 101 | Twitch | +0.26 | +0.46 | +0.81 | −0.36 | −0.08 | – | +0.00 |
| 102 | Malzahar | +0.25 | +0.09 | +0.02 | +1.00 | +0.00 | – | +0.00 |
| 103 | Rek'Sai | +0.24 | +0.35 | +0.23 | +0.34 | +0.01 | +0.23 | +0.00 |
| 104 | Locke | +0.19 | −0.92 | +0.73 | +0.86 | −0.05 | +0.73 | +0.00 |
| 105 | Renekton | +0.18 | +0.08 | +0.13 | +0.62 | −0.04 | +0.13 | +0.00 |
| 106 | Anivia | +0.16 | +0.31 | +0.38 | −0.11 | −0.11 | +0.32 | +0.00 |
| 107 | Zyra | +0.16 | −0.02 | −0.18 | +1.00 | −0.04 | – | +0.00 |
| 108 | Malphite | +0.13 | +0.17 | +0.19 | +0.11 | −0.02 | +0.19 | +0.00 |
| 109 | Tahm Kench | +0.13 | +0.14 | +0.17 | +0.19 | −0.04 | +0.17 | +0.00 |
| 110 | Karma | +0.10 | +0.10 | +0.12 | +0.18 | +0.02 | – | +0.00 |
| 111 | Nilah | +0.09 | +0.32 | −0.05 | +0.15 | −0.03 | −0.05 | +0.00 |
| 112 | Zed | +0.09 | +1.00 | −1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 113 | Nautilus | +0.07 | +0.08 | +0.09 | +0.09 | +0.04 | +0.09 | +0.00 |
| 114 | Rell | +0.07 | +0.09 | +0.07 | +0.03 | +0.10 | +0.07 | +0.00 |
| 115 | Braum | +0.07 | +0.04 | +0.12 | +0.11 | −0.03 | +0.12 | +0.00 |
| 116 | Yone | +0.06 | +0.67 | −0.20 | −0.07 | −0.14 | −0.20 | +0.00 |
| 117 | Shen | +0.05 | +0.05 | +0.03 | +0.10 | +0.01 | +0.03 | +0.00 |
| 118 | Urgot | +0.03 | +0.03 | +0.00 | +0.10 | +0.03 | +0.00 | +0.00 |
| 119 | Taric | +0.01 | +0.01 | +0.02 | +0.00 | +0.02 | +0.02 | +0.00 |
| 120 | Ornn | +0.01 | +0.04 | −0.01 | +0.07 | −0.06 | −0.01 | +0.00 |
| 121 | Caitlyn | +0.00 | −0.65 | +0.27 | +1.00 | −0.02 | −1.00 | +0.00 |
| 122 | Leona | −0.02 | −0.04 | +0.01 | −0.03 | −0.02 | +0.01 | +0.00 |
| 123 | Nunu & Willump | −0.04 | −0.05 | −0.11 | −0.02 | +0.07 | −0.11 | +0.00 |
| 124 | Alistar | −0.05 | −0.06 | −0.05 | −0.05 | −0.02 | −0.05 | +0.00 |
| 125 | Soraka | −0.08 | −0.12 | −0.13 | −0.00 | −0.02 | −0.13 | +0.00 |
| 126 | Akali | −0.10 | +0.05 | −0.19 | −0.19 | −0.04 | −0.19 | +0.00 |
| 127 | Hecarim | −0.10 | −1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 128 | Blitzcrank | −0.16 | −0.21 | −0.20 | −0.16 | −0.02 | −0.20 | +0.00 |
| 129 | Karthus | −0.20 | −0.21 | −0.27 | −0.25 | −0.02 | −0.27 | +0.00 |
| 130 | Fiddlesticks | −0.21 | +0.62 | −0.69 | −0.79 | −0.10 | – | +0.00 |
| 131 | Ekko | −0.25 | +0.98 | −0.90 | −0.84 | −0.10 | −0.90 | +0.00 |
| 132 | Nidalee | −0.26 | −0.84 | +0.02 | −0.10 | −0.05 | – | +0.00 |
| 133 | Vladimir | −0.27 | −0.32 | −0.40 | −0.20 | −0.10 | −0.40 | +0.00 |
| 134 | Hwei | −0.31 | −0.57 | −0.37 | −0.22 | +0.03 | – | +0.00 |
| 135 | Mel | −0.32 | −1.00 | −1.00 | +1.00 | +0.08 | – | +0.00 |
| 136 | Lux | −0.32 | −1.00 | −1.00 | +1.00 | +0.06 | – | +0.00 |
| 137 | Brand | −0.34 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 138 | Elise | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 139 | Viktor | −0.34 | −1.00 | −1.00 | +1.00 | −0.07 | – | +0.00 |
| 140 | Bard | −0.34 | −1.00 | −1.00 | +1.00 | −0.07 | – | +0.00 |
| 141 | Vel'Koz | −0.35 | −0.55 | −0.02 | −1.00 | +0.16 | – | +0.00 |
| 142 | Milio | −0.41 | +0.03 | −0.66 | −1.00 | −0.05 | – | +0.00 |
| 143 | Kha'Zix | −0.46 | −0.89 | −0.15 | −0.91 | −0.00 | −0.15 | +0.00 |
| 144 | Nami | −0.51 | −0.82 | −0.26 | −0.96 | +0.01 | – | +0.00 |
| 145 | Veigar | −0.55 | −0.18 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 146 | Ziggs | −0.69 | −0.72 | −0.96 | −1.00 | +0.14 | −0.96 | +0.00 |
| 147 | Ambessa | −0.70 | −0.92 | −0.83 | −0.88 | −0.01 | −0.83 | +0.00 |
| 148 | Janna | −0.72 | −1.00 | −1.00 | −0.61 | +0.02 | −1.00 | +0.00 |
| 149 | Ezreal | −0.72 | −0.76 | −0.94 | −1.00 | +0.00 | −0.94 | +0.00 |
| 150 | Zilean | −0.75 | −1.00 | −0.88 | −1.00 | −0.02 | – | +0.00 |
| 151 | Sivir | −0.77 | −1.00 | −1.00 | −0.92 | −0.08 | – | +0.00 |
| 152 | Vex | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 153 | Aurelion Sol | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 154 | LeBlanc | −0.78 | −1.00 | −0.97 | −1.00 | −0.03 | – | +0.00 |
| 155 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 156 | Seraphine | −0.78 | −0.99 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 157 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 158 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 159 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 160 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 161 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 162 | Ahri | −0.79 | −1.00 | −1.00 | −0.98 | −0.09 | – | +0.00 |
| 163 | Morgana | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 164 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 165 | Lissandra | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 166 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 167 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 168 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 169 | Evelynn | −0.81 | −0.97 | −1.00 | −0.99 | −0.12 | −1.00 | +0.00 |
| 170 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 171 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 172 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Zoe's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zoe's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zoe` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Samira (net +0.78)

- **0.55** projectile block: Blade Whirl blocks Zoe's Sleepy Trouble Bubble, a projectile. Blade Whirl for 0.75 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. (Samira W Blade Whirl → Zoe E Sleepy Trouble Bubble)
- **0.27** projectile block: Blade Whirl blocks Zoe's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Zoe basic attacks)
- **0.26** projectile block: Blade Whirl blocks Zoe's Paddle Star!, a projectile. Blade Whirl for 0.75 s; Paddle Star! takes 0.92 s to land, enough to react. (Samira W Blade Whirl → Zoe Q Paddle Star!)

#### 2. Mel (net +0.74)

- **0.51** projectile block: Rebuttal blocks Zoe's Sleepy Trouble Bubble, a projectile. Rebuttal for 0.75 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. (Mel W Rebuttal → Zoe E Sleepy Trouble Bubble)
- **0.27** projectile block: Rebuttal blocks Zoe's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Zoe basic attacks)
- **0.25** projectile block: Rebuttal blocks Zoe's Paddle Star!, a projectile. Rebuttal for 0.75 s; Paddle Star! takes 0.92 s to land, enough to react. (Mel W Rebuttal → Zoe Q Paddle Star!)

#### 3. Braum (net +0.73)

- **0.70** projectile block: Unbreakable blocks Zoe's Sleepy Trouble Bubble, a projectile. Unbreakable for 4 s, long enough to use ahead of Sleepy Trouble Bubble. (Braum E Unbreakable → Zoe E Sleepy Trouble Bubble)
- **0.45** projectile block: Unbreakable blocks Zoe's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Zoe basic attacks)
- **0.40** projectile block: Unbreakable blocks Zoe's Paddle Star!, a projectile. Unbreakable for 4 s, long enough to use ahead of Paddle Star!. (Braum E Unbreakable → Zoe Q Paddle Star!)
- Watch out: Zoe's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 4. Yasuo (net +0.70)

- **0.63** projectile block: Wind Wall blocks Zoe's Sleepy Trouble Bubble, a projectile. Wind Wall for 4 s, long enough to use ahead of Sleepy Trouble Bubble. (Yasuo W Wind Wall → Zoe E Sleepy Trouble Bubble)
- **0.35** projectile block: Wind Wall blocks Zoe's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Zoe basic attacks)
- **0.28** projectile block: Wind Wall blocks Zoe's Paddle Star!, a projectile. Wind Wall for 4 s, long enough to use ahead of Paddle Star!. (Yasuo W Wind Wall → Zoe Q Paddle Star!)
- Watch out: Zoe's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 5. Fizz (net +0.55)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Zoe's Sleepy Trouble Bubble. Untargetable for 0.75 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. (Fizz E Playful → Zoe E Sleepy Trouble Bubble)
- Watch out: Zoe's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 6. Morgana (net +0.49)

- **0.65** cc immunity: Black Shield makes Morgana immune to Zoe's Sleepy Trouble Bubble (sleep, slow, drowsy). Immune for 5 s, long enough to use ahead of Sleepy Trouble Bubble. (Morgana E Black Shield → Zoe E Sleepy Trouble Bubble)
- Watch out: Zoe's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

#### 7. Fiora (net +0.47)

- **0.75** parry: Riposte parries Zoe's Sleepy Trouble Bubble and stuns back. Parry for 0.75 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. Negating Sleepy Trouble Bubble's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zoe E Sleepy Trouble Bubble)
- **0.08** attack speed slow: Riposte cuts Zoe's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Zoe basic attacks)
- Watch out: Zoe's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 8. Teemo (net +0.43)

- **0.43** blind: Blinding Dart's blind makes Zoe's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Zoe basic attacks)

#### 9. Vladimir (net +0.42)

- **0.65** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zoe's Sleepy Trouble Bubble. Untargetable for 2 s, long enough to use ahead of Sleepy Trouble Bubble. (Vladimir W Sanguine Pool → Zoe E Sleepy Trouble Bubble)
- Watch out: Zoe's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 10. Maokai (net +0.38)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Zoe's Sleepy Trouble Bubble. Untargetable for 1.4 s; Sleepy Trouble Bubble takes 0.68 s to land, enough to react. (Maokai W Twisted Advance → Zoe E Sleepy Trouble Bubble)
- Watch out: Zoe's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.78 | 0.78 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +0.74 | 0.74 | 0.00 | projectile block (Rebuttal) |
| 3 | Braum | +0.73 | 1.05 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Yasuo | +0.70 | 0.90 | 0.20 | projectile block (Wind Wall) |
| 5 | Fizz | +0.55 | 0.70 | 0.15 |  |
| 6 | Morgana | +0.49 | 0.65 | 0.16 |  |
| 7 | Fiora | +0.47 | 0.79 | 0.32 |  |
| 8 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 9 | Vladimir | +0.42 | 0.65 | 0.23 |  |
| 10 | Maokai | +0.38 | 0.70 | 0.32 |  |
| 11 | Udyr | +0.38 | 0.70 | 0.32 |  |
| 12 | Aurora | +0.38 | 0.38 | 0.00 |  |
| 13 | Milio | +0.36 | 0.36 | 0.00 |  |
| 14 | Bard | +0.35 | 0.35 | 0.00 |  |
| 15 | Lissandra | +0.35 | 0.35 | 0.00 |  |
| 16 | Xayah | +0.34 | 0.34 | 0.00 |  |
| 17 | Cassiopeia | +0.33 | 0.33 | 0.00 |  |
| 18 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 19 | Sivir | +0.30 | 0.30 | 0.00 |  |
| 20 | Gwen | +0.29 | 0.61 | 0.32 |  |
| 21 | Kalista | +0.26 | 0.26 | 0.00 |  |
| 22 | Kayle | +0.25 | 0.25 | 0.00 |  |
| 23 | Master Yi | +0.24 | 0.73 | 0.49 |  |
| 24 | Camille | +0.23 | 0.39 | 0.16 |  |
| 25 | Yuumi | +0.21 | 0.70 | 0.49 |  |
| 26 | Kled | +0.21 | 0.33 | 0.12 |  |
| 27 | Rek'Sai | +0.19 | 0.39 | 0.20 |  |
| 28 | Zaahen | +0.15 | 0.35 | 0.20 |  |
| 29 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 30 | Evelynn | +0.13 | 0.35 | 0.22 |  |
| 31 | Shaco | +0.13 | 0.35 | 0.22 |  |
| 32 | Zed | +0.12 | 0.34 | 0.22 |  |
| 33 | Nocturne | +0.10 | 0.42 | 0.32 |  |
| 34 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 35 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 36 | Vex | +0.07 | 0.07 | 0.00 |  |
| 37 | Nilah | +0.04 | 0.30 | 0.26 |  |
| 38 | Annie | +0.04 | 0.04 | 0.00 |  |
| 39 | Jax | +0.03 | 0.35 | 0.32 |  |
| 40 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 41 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 42 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 43 | Azir | 0.00 | 0.00 | 0.00 |  |
| 44 | Brand | 0.00 | 0.00 | 0.00 |  |
| 45 | Corki | 0.00 | 0.00 | 0.00 |  |
| 46 | Draven | 0.00 | 0.00 | 0.00 |  |
| 47 | Elise | 0.00 | 0.00 | 0.00 |  |
| 48 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 49 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 50 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 51 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 52 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 53 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 54 | Karma | 0.00 | 0.00 | 0.00 |  |
| 55 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 56 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 57 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 58 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 59 | Lux | 0.00 | 0.00 | 0.00 |  |
| 60 | Nami | 0.00 | 0.00 | 0.00 |  |
| 61 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 62 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 63 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 64 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 65 | Senna | 0.00 | 0.00 | 0.00 |  |
| 66 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 67 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 68 | Sona | 0.00 | 0.00 | 0.00 |  |
| 69 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 70 | Swain | 0.00 | 0.00 | 0.00 |  |
| 71 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 72 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 73 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 74 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 75 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 76 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 77 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 78 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 79 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 80 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 81 | K'Sante | -0.02 | 0.14 | 0.16 |  |
| 82 | Alistar | -0.04 | 0.28 | 0.32 |  |
| 83 | Malphite | -0.04 | 0.28 | 0.32 |  |
| 84 | Malzahar | -0.05 | 0.35 | 0.40 |  |
| 85 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 86 | Aurelion Sol | -0.07 | 0.00 | 0.07 |  |
| 87 | Graves | -0.07 | 0.00 | 0.07 |  |
| 88 | Jarvan IV | -0.08 | 0.07 | 0.15 |  |
| 89 | Yone | -0.08 | 0.07 | 0.15 |  |
| 90 | Gangplank | -0.09 | 0.56 | 0.65 |  |
| 91 | Rengar | -0.09 | 0.56 | 0.65 |  |
| 92 | Varus | -0.10 | 0.00 | 0.10 |  |
| 93 | Xin Zhao | -0.13 | 0.17 | 0.30 |  |
| 94 | Hecarim | -0.13 | 0.07 | 0.20 |  |
| 95 | Ornn | -0.13 | 0.07 | 0.20 |  |
| 96 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 97 | Volibear | -0.15 | 0.07 | 0.22 |  |
| 98 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 99 | Briar | -0.16 | 0.00 | 0.16 |  |
| 100 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 101 | Quinn | -0.17 | 0.00 | 0.17 |  |
| 102 | Ivern | -0.18 | 0.00 | 0.18 |  |
| 103 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 104 | Caitlyn | -0.19 | 0.09 | 0.28 |  |
| 105 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 106 | Rell | -0.20 | 0.00 | 0.20 |  |
| 107 | Akali | -0.22 | 0.00 | 0.22 |  |
| 108 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 109 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 110 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 111 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 112 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 113 | Riven | -0.22 | 0.00 | 0.22 |  |
| 114 | Talon | -0.22 | 0.00 | 0.22 |  |
| 115 | Rammus | -0.23 | 0.32 | 0.55 |  |
| 116 | Illaoi | -0.25 | 0.07 | 0.32 |  |
| 117 | Sett | -0.25 | 0.07 | 0.32 |  |
| 118 | Shyvana | -0.25 | 0.07 | 0.32 |  |
| 119 | Viego | -0.26 | 0.07 | 0.33 |  |
| 120 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 121 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 122 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 123 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 124 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 125 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 126 | Garen | -0.29 | 0.32 | 0.61 |  |
| 127 | Kayn | -0.30 | 0.35 | 0.65 |  |
| 128 | Olaf | -0.30 | 0.35 | 0.65 |  |
| 129 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 130 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 131 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 132 | Singed | -0.31 | 0.34 | 0.65 |  |
| 133 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 134 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 135 | Diana | -0.32 | 0.00 | 0.32 |  |
| 136 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 137 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 138 | Leona | -0.32 | 0.00 | 0.32 |  |
| 139 | Locke | -0.32 | 0.00 | 0.32 |  |
| 140 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 141 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 142 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 143 | Shen | -0.34 | 0.33 | 0.67 |  |
| 144 | Sion | -0.35 | 0.38 | 0.73 |  |
| 145 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 146 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 147 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 148 | Pantheon | -0.39 | 0.30 | 0.69 |  |
| 149 | Janna | -0.40 | 0.00 | 0.40 |  |
| 150 | Warwick | -0.42 | 0.43 | 0.85 |  |
| 151 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 152 | Karthus | -0.44 | 0.00 | 0.44 |  |
| 153 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 154 | Vi | -0.48 | 0.07 | 0.55 |  |
| 155 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 156 | Poppy | -0.52 | 0.00 | 0.52 |  |
| 157 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 158 | Skarner | -0.56 | 0.09 | 0.65 |  |
| 159 | Katarina | -0.60 | 0.00 | 0.60 |  |
| 160 | Darius | -0.61 | 0.00 | 0.61 |  |
| 161 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 162 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 163 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 164 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 165 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 166 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 167 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 168 | Taric | -0.65 | 0.00 | 0.65 |  |
| 169 | Zac | -0.69 | 0.00 | 0.69 |  |
| 170 | Tahm Kench | -0.80 | 0.00 | 0.80 |  |
| 171 | Galio | -0.81 | 0.00 | 0.81 |  |
| 172 | Nunu & Willump | -0.93 | 0.21 | 1.14 |  |
