# Counters to Xerath (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Xerath: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Xerath wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Xerath --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +1.00 |
| 2 | Jarvan IV | +0.85 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.59 |
| 3 | Jayce | +0.84 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.61 |
| 4 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.50 |
| 5 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.38 |
| 6 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.75 |
| 7 | Lillia | +0.83 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.40 |
| 8 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.77 |
| 9 | Yasuo | +0.83 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.48 |
| 10 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.90 |
| 11 | Camille | +0.83 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.44 |
| 12 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.33 |
| 13 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.52 |
| 14 | Malphite | +0.82 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.20 |
| 15 | Kassadin | +0.82 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.43 |
| 16 | Galio | +0.82 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.19 |
| 17 | Nocturne | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.42 |
| 18 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.49 |
| 19 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.15 |
| 20 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.38 |
| 21 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.16 |
| 22 | Rammus | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.39 |
| 23 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.06 |
| 24 | Zaahen | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.31 |
| 25 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.60 |
| 26 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.08 |
| 27 | Tryndamere | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.38 |
| 28 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.03 |
| 29 | Rakan | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.20 |
| 30 | Nautilus | +0.81 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.15 |
| 31 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.52 |
| 32 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.22 |
| 33 | Amumu | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.32 |
| 34 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.23 |
| 35 | Gragas | +0.81 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.35 |
| 36 | Shyvana | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.32 |
| 37 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.36 |
| 38 | Zed | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.43 |
| 39 | Akali | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.02 |
| 40 | Rengar | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.20 |
| 41 | Rumble | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.19 |
| 42 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.11 |
| 43 | Vi | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.01 |
| 44 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.10 |
| 45 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.23 |
| 46 | Urgot | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.08 |
| 47 | Sejuani | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.14 |
| 48 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.04 |
| 49 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.03 |
| 50 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.04 |
| 51 | Viego | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.04 |
| 52 | Irelia | +0.80 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.10 |
| 53 | Ziggs | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.18 |
| 54 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.31 |
| 55 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.15 |
| 56 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.07 |
| 57 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.12 |
| 58 | Wukong | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 59 | Rek'Sai | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.03 |
| 60 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.21 |
| 61 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.12 |
| 62 | Shaco | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | −0.00 |
| 63 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.12 |
| 64 | Pantheon | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.11 |
| 65 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.20 |
| 66 | Kindred | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.11 |
| 67 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | −0.17 |
| 68 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.11 |
| 69 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.03 |
| 70 | Singed | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.06 |
| 71 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.21 |
| 72 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.19 |
| 73 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.18 |
| 74 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | −0.14 |
| 75 | Yunara | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.26 |
| 76 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.13 |
| 77 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | −0.12 |
| 78 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.11 |
| 79 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.29 |
| 80 | Tahm Kench | +0.78 | +1.00 | +0.96 | +0.97 | +0.02 | +1.00 | −0.10 |
| 81 | Kayn | +0.78 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.15 |
| 82 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | −0.14 |
| 83 | Bel'Veth | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.41 |
| 84 | Caitlyn | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | +0.96 | −0.26 |
| 85 | Vel'Koz | +0.78 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.29 |
| 86 | Lucian | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.11 |
| 87 | Azir | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.01 |
| 88 | Zoe | +0.77 | +1.00 | +1.00 | +1.00 | +0.02 | – | −0.11 |
| 89 | Briar | +0.77 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | −0.04 |
| 90 | Xin Zhao | +0.77 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | −0.26 |
| 91 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.39 |
| 92 | Smolder | +0.77 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.16 |
| 93 | Skarner | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | −0.33 |
| 94 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.07 |
| 95 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.07 |
| 96 | Lulu | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.20 |
| 97 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | −0.21 |
| 98 | Jhin | +0.76 | +1.00 | +1.00 | +1.00 | +0.02 | – | −0.31 |
| 99 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.24 |
| 100 | Kalista | +0.76 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.24 |
| 101 | Yone | +0.76 | +1.00 | +0.91 | +1.00 | −0.10 | +1.00 | −0.08 |
| 102 | Varus | +0.76 | +0.93 | +1.00 | +1.00 | +0.02 | – | −0.08 |
| 103 | Twitch | +0.76 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.28 |
| 104 | Akshan | +0.75 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.14 |
| 105 | Zac | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | +0.99 | −0.40 |
| 106 | Leona | +0.75 | +0.97 | +0.95 | +0.98 | −0.04 | +0.76 | +0.14 |
| 107 | Draven | +0.75 | +0.98 | +1.00 | +1.00 | −0.04 | – | −0.25 |
| 108 | Kai'Sa | +0.75 | +1.00 | +1.00 | +1.00 | −0.07 | – | −0.31 |
| 109 | Nidalee | +0.75 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.34 |
| 110 | Quinn | +0.75 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.43 |
| 111 | Twisted Fate | +0.74 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.37 |
| 112 | Neeko | +0.73 | +0.88 | +1.00 | +1.00 | −0.03 | – | −0.21 |
| 113 | Miss Fortune | +0.69 | +1.00 | +1.00 | +1.00 | +0.00 | +0.03 | −0.29 |
| 114 | Janna | +0.67 | +1.00 | +0.45 | +1.00 | +0.01 | +1.00 | +0.08 |
| 115 | Ezreal | +0.67 | +0.96 | +0.70 | +0.90 | −0.04 | +0.75 | +0.04 |
| 116 | Ahri | +0.66 | +0.97 | +0.55 | +1.00 | +0.01 | – | +0.17 |
| 117 | Karma | +0.62 | +0.47 | +0.98 | +1.00 | +0.01 | – | −0.09 |
| 118 | Taric | +0.62 | +1.00 | +0.40 | +1.00 | +0.02 | +0.73 | −0.11 |
| 119 | Fiddlesticks | +0.61 | +0.53 | +1.00 | +1.00 | −0.03 | – | −0.55 |
| 120 | Shen | +0.61 | +1.00 | +0.19 | +1.00 | +0.04 | +1.00 | +0.07 |
| 121 | Ekko | +0.60 | +1.00 | +0.29 | +1.00 | −0.07 | +1.00 | −0.18 |
| 122 | Rell | +0.59 | +1.00 | +0.29 | +1.00 | +0.05 | +0.62 | −0.13 |
| 123 | Evelynn | +0.58 | +1.00 | +1.00 | +1.00 | −0.02 | −1.00 | −0.24 |
| 124 | Qiyana | +0.55 | +0.99 | +0.89 | +1.00 | −0.05 | −1.00 | −0.17 |
| 125 | Ornn | +0.55 | +0.30 | +1.00 | +1.00 | −0.01 | +0.22 | +0.03 |
| 126 | Braum | +0.53 | +0.42 | +0.50 | +1.00 | −0.02 | +0.99 | +0.03 |
| 127 | Kennen | +0.52 | +0.05 | +1.00 | +1.00 | −0.05 | – | +0.33 |
| 128 | Nunu & Willump | +0.51 | +1.00 | +0.10 | +1.00 | +0.20 | −0.01 | +0.05 |
| 129 | Hwei | +0.45 | −0.02 | +0.86 | +1.00 | −0.02 | – | −0.09 |
| 130 | Naafiri | +0.39 | +1.00 | +1.00 | −1.00 | +0.00 | +1.00 | −0.30 |
| 131 | Seraphine | +0.37 | +0.23 | +0.40 | +1.00 | −0.06 | – | −0.23 |
| 132 | Sivir | +0.35 | +1.00 | +1.00 | −0.91 | −0.04 | – | +0.12 |
| 133 | Talon | +0.34 | +0.00 | +1.00 | +0.00 | −0.00 | +1.00 | −0.14 |
| 134 | Milio | +0.32 | +1.00 | +1.00 | −1.00 | −0.02 | – | −0.08 |
| 135 | Jinx | +0.31 | +1.00 | −0.84 | +1.00 | −0.03 | +1.00 | −0.40 |
| 136 | Hecarim | +0.31 | +1.00 | −1.00 | +1.00 | +0.00 | +1.00 | +0.23 |
| 137 | Bard | +0.31 | −0.55 | +1.00 | +1.00 | −0.06 | – | −0.53 |
| 138 | Sylas | +0.29 | +1.00 | +1.00 | −1.00 | +0.01 | +0.00 | −0.23 |
| 139 | Morgana | +0.24 | +0.64 | +0.35 | −0.13 | +0.02 | – | −0.11 |
| 140 | Locke | +0.24 | −0.73 | +0.99 | +0.91 | −0.08 | +0.05 | −0.05 |
| 141 | Aurelion Sol | +0.24 | +0.03 | +0.04 | +1.00 | −0.03 | – | −0.01 |
| 142 | Kha'Zix | +0.23 | +1.00 | −0.92 | +1.00 | −0.08 | +0.00 | +0.52 |
| 143 | Zilean | +0.23 | −1.00 | +1.00 | +1.00 | −0.08 | – | +0.29 |
| 144 | Vladimir | +0.20 | −1.00 | +1.00 | +1.00 | −0.16 | – | +0.01 |
| 145 | Malzahar | +0.20 | −0.03 | −0.04 | +1.00 | −0.00 | – | −0.11 |
| 146 | Pyke | +0.10 | +1.00 | +0.20 | −1.00 | −0.12 | +0.21 | +0.03 |
| 147 | Katarina | +0.09 | +1.00 | −1.00 | +1.00 | −0.04 | −1.00 | −0.15 |
| 148 | Anivia | +0.03 | +0.05 | +0.04 | +0.03 | −0.06 | +0.01 | +0.13 |
| 149 | Senna | +0.02 | +0.40 | +0.54 | −1.00 | +0.01 | – | −0.35 |
| 150 | Cassiopeia | +0.01 | −0.42 | −0.31 | +1.00 | −0.05 | – | −0.01 |
| 151 | Brand | +0.01 | −0.30 | −0.44 | +1.00 | −0.01 | – | −0.19 |
| 152 | Taliyah | −0.13 | −0.69 | +1.00 | −1.00 | +0.01 | – | +0.15 |
| 153 | Karthus | −0.13 | −0.17 | −0.12 | −0.17 | −0.02 | – | −0.16 |
| 154 | Samira | −0.19 | −0.42 | −0.95 | +1.00 | −0.08 | – | −0.27 |
| 155 | Zyra | −0.20 | +0.03 | +0.04 | −1.00 | −0.00 | – | +0.03 |
| 156 | Blitzcrank | −0.22 | −0.08 | −0.01 | −0.91 | +0.02 | −0.12 | −0.07 |
| 157 | Soraka | −0.28 | −0.40 | −0.51 | +0.06 | +0.01 | −0.47 | −0.36 |
| 158 | Mel | −0.32 | −0.93 | −1.00 | +1.00 | +0.03 | – | −0.23 |
| 159 | Ryze | −0.32 | −0.96 | −0.91 | +1.00 | −0.05 | – | −0.37 |
| 160 | Viktor | −0.33 | −1.00 | −1.00 | +1.00 | −0.04 | – | +0.17 |
| 161 | Elise | −0.34 | −1.00 | −1.00 | +1.00 | −0.02 | – | −0.04 |
| 162 | Lux | −0.34 | −1.00 | −1.00 | +1.00 | +0.01 | – | −0.16 |
| 163 | Nami | −0.35 | −0.99 | −0.96 | +0.93 | −0.00 | – | −0.26 |
| 164 | Vex | −0.35 | −1.00 | −1.00 | +0.98 | −0.01 | – | −0.14 |
| 165 | Sona | −0.38 | −0.94 | +0.03 | −1.00 | −0.00 | +0.48 | −0.06 |
| 166 | LeBlanc | −0.59 | −0.31 | −0.98 | −1.00 | +0.00 | – | −0.20 |
| 167 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.00 |
| 168 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.12 |
| 169 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.04 |
| 170 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.22 |
| 171 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.29 |
| 172 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.46 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Xerath's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Xerath's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Xerath` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.43)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Xerath's Rite of the Arcane (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Xerath R Rite of the Arcane)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Xerath's Rite of the Arcane (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Xerath R Rite of the Arcane)
- **0.28** interrupt: Full Tilt's stun interrupts Xerath's Rite of the Arcane (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 350 units farther than Rell's (525 vs 175 attack range).

#### 2. Braum (net +1.24)

- **0.70** projectile block: Unbreakable blocks Xerath's Shocking Orb, a projectile. Unbreakable for 4 s, long enough to use ahead of Shocking Orb. (Braum E Unbreakable → Xerath E Shocking Orb)
- **0.37** projectile block: Unbreakable blocks Xerath's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Xerath basic attacks)
- **0.28** interrupt: Concussive Blows's stun interrupts Xerath's Rite of the Arcane (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 3. Yasuo (net +1.18)

- **0.55** projectile block: Wind Wall blocks Xerath's Shocking Orb, a projectile. Wind Wall for 4 s, long enough to use ahead of Shocking Orb. (Yasuo W Wind Wall → Xerath E Shocking Orb)
- **0.29** projectile block: Wind Wall blocks Xerath's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Xerath basic attacks)
- **0.28** interrupt: Last Breath's airborne interrupts Xerath's Rite of the Arcane (normal channel). Last Breath must land during the channel. (Yasuo R Last Breath → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 4. Fizz (net +1.05)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Xerath's Shocking Orb. Untargetable for 0.75 s; Shocking Orb takes 1.05 s to land, enough to react. (Fizz E Playful → Xerath E Shocking Orb)
- **0.33** untargetable: Playful makes Fizz untargetable, dodging Xerath's Rite of the Arcane. Untargetable for 0.75 s; Rite of the Arcane lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Xerath R Rite of the Arcane)
- **0.28** interrupt: Chum the Waters's airborne interrupts Xerath's Rite of the Arcane (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 5. Nocturne (net +0.99)

- **0.66** spell shield: Shroud of Darkness's spell shield blocks Xerath's Shocking Orb. Spell shield for 1.5 s, long enough to use ahead of Shocking Orb. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xerath E Shocking Orb)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Xerath's Rite of the Arcane. Spell shield for 1.5 s, long enough to use ahead of Rite of the Arcane. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xerath R Rite of the Arcane)
- **0.28** interrupt: Unspeakable Horror's fear interrupts Xerath's Rite of the Arcane (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 6. Maokai (net +0.93)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Xerath's Shocking Orb. Untargetable for 1.4 s; Shocking Orb takes 1.05 s to land, enough to react. (Maokai W Twisted Advance → Xerath E Shocking Orb)
- **0.33** untargetable: Twisted Advance makes Maokai untargetable, dodging Xerath's Rite of the Arcane. Untargetable for 1.4 s; Rite of the Arcane lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Xerath R Rite of the Arcane)
- **0.28** interrupt: Bramble Smash's airborne interrupts Xerath's Rite of the Arcane (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

#### 7. Rek'Sai (net +0.90)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Xerath's Rite of the Arcane. Untargetable for 1.5 s, long enough to use ahead of Rite of the Arcane. (Rek'Sai R Void Rush → Xerath R Rite of the Arcane)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Xerath's Shocking Orb. Untargetable for 1.5 s, long enough to use ahead of Shocking Orb. (Rek'Sai R Void Rush → Xerath E Shocking Orb)
- **0.28** interrupt: Unburrow's airborne interrupts Xerath's Rite of the Arcane (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

#### 8. Zaahen (net +0.85)

- **0.34** cc immunity: Grim Deliverance makes Zaahen immune to Xerath's Shocking Orb (stun). Immune for ?; Shocking Orb takes 1.05 s to land, enough to react. (Zaahen R Grim Deliverance → Xerath E Shocking Orb)
- **0.28** interrupt: Dreaded Return's airborne interrupts Xerath's Rite of the Arcane (normal channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Xerath R Rite of the Arcane)
- **0.28** interrupt: The Darkin Glaive's airborne interrupts Xerath's Rite of the Arcane (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 350 units farther than Zaahen's (525 vs 175 attack range).

#### 9. Xin Zhao (net +0.84)

- **0.55** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Xerath's Rite of the Arcane. Invulnerable for 4 s, long enough to use ahead of Rite of the Arcane. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Xerath R Rite of the Arcane)
- **0.28** interrupt: Crescent Guard's airborne interrupts Xerath's Rite of the Arcane (normal channel). Crescent Guard must land during the channel. (Xin Zhao R Crescent Guard → Xerath R Rite of the Arcane)
- **0.28** interrupt: Three Talon Strike's airborne interrupts Xerath's Rite of the Arcane (normal channel). Three Talon Strike must land during the channel. (Xin Zhao Q Three Talon Strike → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 350 units farther than Xin Zhao's (525 vs 175 attack range).

#### 10. K'Sante (net +0.83)

- **0.28** interrupt: All Out's airborne interrupts Xerath's Rite of the Arcane (normal channel). All Out must land during the channel. (K'Sante R All Out → Xerath R Rite of the Arcane)
- **0.28** interrupt: Ntofo Strikes's airborne interrupts Xerath's Rite of the Arcane (normal channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Xerath R Rite of the Arcane)
- **0.28** interrupt: Path Maker's airborne interrupts Xerath's Rite of the Arcane (normal channel). Path Maker must land during the channel. (K'Sante W Path Maker → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 375 units farther than K'Sante's (525 vs 150 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.43 | 1.59 | 0.16 |  |
| 2 | Braum | +1.24 | 1.51 | 0.27 | projectile block (Unbreakable) |
| 3 | Yasuo | +1.18 | 1.34 | 0.16 | projectile block (Wind Wall) |
| 4 | Fizz | +1.05 | 1.17 | 0.12 |  |
| 5 | Nocturne | +0.99 | 1.26 | 0.27 |  |
| 6 | Maokai | +0.93 | 1.20 | 0.27 |  |
| 7 | Rek'Sai | +0.90 | 1.06 | 0.16 |  |
| 8 | Zaahen | +0.85 | 1.01 | 0.16 |  |
| 9 | Xin Zhao | +0.84 | 1.07 | 0.23 |  |
| 10 | K'Sante | +0.83 | 0.96 | 0.13 |  |
| 11 | Kayle | +0.82 | 0.82 | 0.00 |  |
| 12 | Sivir | +0.82 | 0.82 | 0.00 |  |
| 13 | Bard | +0.80 | 0.80 | 0.00 |  |
| 14 | Lissandra | +0.80 | 0.80 | 0.00 |  |
| 15 | Camille | +0.76 | 0.89 | 0.13 |  |
| 16 | Anivia | +0.73 | 0.73 | 0.00 |  |
| 17 | Lulu | +0.73 | 0.73 | 0.00 |  |
| 18 | Xayah | +0.72 | 0.72 | 0.00 |  |
| 19 | Sejuani | +0.71 | 0.96 | 0.25 |  |
| 20 | Kled | +0.70 | 0.79 | 0.09 |  |
| 21 | Heimerdinger | +0.69 | 0.69 | 0.00 |  |
| 22 | Milio | +0.68 | 0.68 | 0.00 |  |
| 23 | Vladimir | +0.67 | 0.85 | 0.18 |  |
| 24 | Alistar | +0.66 | 0.93 | 0.27 |  |
| 25 | Evelynn | +0.65 | 0.83 | 0.18 |  |
| 26 | Shaco | +0.64 | 0.82 | 0.18 |  |
| 27 | Gnar | +0.64 | 0.64 | 0.00 |  |
| 28 | Nami | +0.63 | 0.63 | 0.00 |  |
| 29 | Tristana | +0.63 | 0.63 | 0.00 |  |
| 30 | Malzahar | +0.62 | 1.02 | 0.40 |  |
| 31 | Viktor | +0.62 | 0.62 | 0.00 |  |
| 32 | Udyr | +0.61 | 0.88 | 0.27 |  |
| 33 | Thresh | +0.61 | 0.64 | 0.03 |  |
| 34 | Fiora | +0.60 | 0.85 | 0.25 |  |
| 35 | Renata Glasc | +0.60 | 0.60 | 0.00 |  |
| 36 | Samira | +0.60 | 0.60 | 0.00 | projectile block (Blade Whirl) |
| 37 | Seraphine | +0.60 | 0.60 | 0.00 |  |
| 38 | Mel | +0.57 | 0.57 | 0.00 | projectile block (Rebuttal) |
| 39 | Aurelion Sol | +0.55 | 0.63 | 0.08 |  |
| 40 | Rakan | +0.53 | 0.63 | 0.10 |  |
| 41 | Yone | +0.52 | 0.64 | 0.12 |  |
| 42 | Morgana | +0.52 | 0.62 | 0.10 |  |
| 43 | Urgot | +0.50 | 0.62 | 0.12 |  |
| 44 | Aurora | +0.50 | 0.50 | 0.00 |  |
| 45 | Ornn | +0.47 | 0.63 | 0.16 |  |
| 46 | Gwen | +0.46 | 0.71 | 0.25 |  |
| 47 | Riven | +0.46 | 0.64 | 0.18 |  |
| 48 | Ashe | +0.45 | 0.45 | 0.00 |  |
| 49 | Taliyah | +0.44 | 0.92 | 0.48 |  |
| 50 | Blitzcrank | +0.43 | 0.96 | 0.53 |  |
| 51 | Annie | +0.43 | 0.43 | 0.00 |  |
| 52 | Rammus | +0.40 | 0.92 | 0.52 |  |
| 53 | Yuumi | +0.40 | 0.87 | 0.47 |  |
| 54 | Kalista | +0.39 | 0.39 | 0.00 |  |
| 55 | Leona | +0.37 | 0.64 | 0.27 |  |
| 56 | Sett | +0.36 | 0.63 | 0.27 |  |
| 57 | Nilah | +0.36 | 0.56 | 0.20 |  |
| 58 | Amumu | +0.35 | 0.62 | 0.27 |  |
| 59 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 60 | Master Yi | +0.34 | 0.78 | 0.44 |  |
| 61 | Pyke | +0.33 | 0.65 | 0.32 |  |
| 62 | Brand | +0.33 | 0.33 | 0.00 |  |
| 63 | Zilean | +0.33 | 0.33 | 0.00 |  |
| 64 | Zed | +0.32 | 0.50 | 0.18 |  |
| 65 | Ahri | +0.32 | 0.32 | 0.00 |  |
| 66 | Draven | +0.32 | 0.32 | 0.00 |  |
| 67 | Elise | +0.32 | 0.32 | 0.00 |  |
| 68 | Hwei | +0.32 | 0.32 | 0.00 |  |
| 69 | Jayce | +0.32 | 0.32 | 0.00 |  |
| 70 | Kennen | +0.32 | 0.32 | 0.00 |  |
| 71 | Soraka | +0.32 | 0.32 | 0.00 |  |
| 72 | Swain | +0.32 | 0.32 | 0.00 |  |
| 73 | Syndra | +0.32 | 0.32 | 0.00 |  |
| 74 | Vayne | +0.32 | 0.32 | 0.00 |  |
| 75 | Veigar | +0.32 | 0.32 | 0.00 |  |
| 76 | Vex | +0.32 | 0.32 | 0.00 |  |
| 77 | Ziggs | +0.32 | 0.32 | 0.00 |  |
| 78 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 79 | Viego | +0.31 | 0.63 | 0.32 |  |
| 80 | Azir | +0.31 | 0.31 | 0.00 |  |
| 81 | Cassiopeia | +0.31 | 0.31 | 0.00 |  |
| 82 | Neeko | +0.31 | 0.31 | 0.00 |  |
| 83 | Orianna | +0.31 | 0.31 | 0.00 |  |
| 84 | Sona | +0.31 | 0.31 | 0.00 |  |
| 85 | Zyra | +0.31 | 0.31 | 0.00 |  |
| 86 | Zac | +0.27 | 0.95 | 0.68 |  |
| 87 | Sion | +0.25 | 0.85 | 0.60 |  |
| 88 | Tahm Kench | +0.23 | 0.96 | 0.73 |  |
| 89 | Kayn | +0.22 | 0.83 | 0.61 |  |
| 90 | Janna | +0.22 | 0.62 | 0.40 |  |
| 91 | Malphite | +0.22 | 0.49 | 0.27 |  |
| 92 | Fiddlesticks | +0.21 | 0.65 | 0.44 |  |
| 93 | Gragas | +0.20 | 0.62 | 0.42 |  |
| 94 | Sylas | +0.20 | 0.32 | 0.12 |  |
| 95 | Jarvan IV | +0.19 | 0.31 | 0.12 |  |
| 96 | Briar | +0.18 | 0.31 | 0.13 |  |
| 97 | Jax | +0.17 | 0.44 | 0.27 |  |
| 98 | Bel'Veth | +0.16 | 0.33 | 0.17 |  |
| 99 | Lillia | +0.16 | 0.29 | 0.13 |  |
| 100 | Quinn | +0.15 | 0.33 | 0.18 |  |
| 101 | Volibear | +0.15 | 0.32 | 0.17 |  |
| 102 | Hecarim | +0.15 | 0.31 | 0.16 |  |
| 103 | Wukong | +0.15 | 0.31 | 0.16 |  |
| 104 | Galio | +0.14 | 0.90 | 0.76 |  |
| 105 | Ambessa | +0.13 | 0.31 | 0.18 |  |
| 106 | Lee Sin | +0.13 | 0.31 | 0.18 |  |
| 107 | Cho'Gath | +0.12 | 0.65 | 0.53 |  |
| 108 | Senna | +0.12 | 0.12 | 0.00 |  |
| 109 | Qiyana | +0.11 | 0.28 | 0.17 |  |
| 110 | Vi | +0.10 | 0.64 | 0.54 |  |
| 111 | Aatrox | +0.10 | 0.33 | 0.23 |  |
| 112 | Irelia | +0.10 | 0.32 | 0.22 |  |
| 113 | Rengar | +0.08 | 0.61 | 0.53 |  |
| 114 | Kassadin | +0.08 | 0.33 | 0.25 |  |
| 115 | Nautilus | +0.08 | 0.31 | 0.23 |  |
| 116 | Garen | +0.07 | 0.54 | 0.47 |  |
| 117 | Shyvana | +0.07 | 0.32 | 0.25 |  |
| 118 | Renekton | +0.06 | 0.33 | 0.27 |  |
| 119 | Diana | +0.06 | 0.31 | 0.25 |  |
| 120 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 121 | Vel'Koz | +0.04 | 0.32 | 0.28 |  |
| 122 | Pantheon | +0.03 | 0.69 | 0.66 |  |
| 123 | Warwick | 0.00 | 0.83 | 0.83 |  |
| 124 | Gangplank | 0.00 | 0.53 | 0.53 |  |
| 125 | Corki | 0.00 | 0.00 | 0.00 |  |
| 126 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 127 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 128 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 129 | Karma | 0.00 | 0.00 | 0.00 |  |
| 130 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 131 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 132 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 133 | Lux | 0.00 | 0.00 | 0.00 |  |
| 134 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 135 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 136 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 137 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 138 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 139 | Twisted Fate | -0.02 | 0.33 | 0.35 |  |
| 140 | Shen | -0.04 | 0.59 | 0.63 |  |
| 141 | Graves | -0.04 | 0.00 | 0.04 |  |
| 142 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 143 | Mordekaiser | -0.08 | 0.39 | 0.47 |  |
| 144 | Varus | -0.11 | 0.00 | 0.11 |  |
| 145 | Skarner | -0.13 | 0.37 | 0.50 |  |
| 146 | Ivern | -0.14 | 0.00 | 0.14 |  |
| 147 | Darius | -0.15 | 0.32 | 0.47 |  |
| 148 | Trundle | -0.15 | 0.32 | 0.47 |  |
| 149 | Yorick | -0.15 | 0.32 | 0.47 |  |
| 150 | Olaf | -0.16 | 0.37 | 0.53 |  |
| 151 | Poppy | -0.16 | 0.31 | 0.47 |  |
| 152 | Taric | -0.18 | 0.32 | 0.50 |  |
| 153 | Akali | -0.18 | 0.00 | 0.18 |  |
| 154 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 155 | Talon | -0.18 | 0.00 | 0.18 |  |
| 156 | Singed | -0.20 | 0.33 | 0.53 |  |
| 157 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 158 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 159 | Illaoi | -0.27 | 0.00 | 0.27 |  |
| 160 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 161 | Locke | -0.27 | 0.00 | 0.27 |  |
| 162 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 163 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 164 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 165 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 166 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 167 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 168 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 169 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 170 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 171 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 172 | Nunu & Willump | -0.67 | 0.35 | 1.02 |  |
