# Counters to Nami (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Nami: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Nami wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Nami --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Sylas | +0.87 | +1.00 | +1.00 | +1.00 | +0.48 | +1.00 | +0.00 |
| 2 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.37 | +1.00 | +0.00 |
| 3 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +1.00 |
| 4 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +1.00 |
| 5 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.94 |
| 6 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +1.00 |
| 7 | Shyvana | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 8 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.88 |
| 9 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 10 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 11 | Caitlyn | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 12 | Ziggs | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 13 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 14 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 15 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 16 | Lillia | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 17 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 18 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 19 | Gwen | +0.80 | +0.98 | +1.00 | +0.97 | −0.23 | +0.99 | +0.96 |
| 20 | Irelia | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 21 | Wukong | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 22 | Pantheon | +0.80 | +1.00 | +0.99 | +1.00 | +0.01 | +1.00 | +0.00 |
| 23 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 24 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.08 |
| 25 | Milio | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 26 | Xin Zhao | +0.80 | +0.94 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 27 | Vi | +0.80 | +0.99 | +1.00 | +1.00 | +0.03 | +0.94 | +0.00 |
| 28 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 29 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 30 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 31 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 32 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +0.96 | +0.00 |
| 33 | Gnar | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 34 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 35 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 36 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 37 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 38 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 39 | Poppy | +0.79 | +0.94 | +0.99 | +0.99 | +0.06 | +0.95 | +0.00 |
| 40 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 41 | Singed | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +0.88 | +0.00 |
| 42 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 43 | Annie | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 44 | Riven | +0.78 | +1.00 | +0.93 | +1.00 | +0.00 | +1.00 | +0.00 |
| 45 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 46 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 47 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 48 | Neeko | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 49 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 50 | Jinx | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 51 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 52 | Karma | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 53 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 54 | Miss Fortune | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 55 | Smolder | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 56 | Camille | +0.78 | +0.99 | +1.00 | +0.90 | +0.02 | +1.00 | +0.00 |
| 57 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 58 | Draven | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 59 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 60 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 61 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 62 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 63 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 64 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 65 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 66 | Lucian | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 67 | Sivir | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 68 | Ryze | +0.77 | +0.99 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 69 | Akshan | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 70 | Janna | +0.77 | +1.00 | +0.98 | +1.00 | +0.00 | – | +0.00 |
| 71 | Quinn | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 72 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 73 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 74 | Zaahen | +0.77 | +0.93 | +0.98 | +1.00 | −0.06 | +1.00 | +0.00 |
| 75 | Kindred | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 76 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 77 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 78 | Twitch | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 79 | Darius | +0.77 | +0.98 | +0.93 | +0.99 | −0.04 | +0.95 | +0.00 |
| 80 | Jarvan IV | +0.76 | +0.88 | +1.00 | +0.87 | +0.15 | +0.99 | +0.00 |
| 81 | Bard | +0.76 | +0.98 | +0.98 | +1.00 | −0.03 | – | +0.00 |
| 82 | Gragas | +0.76 | +0.98 | +0.98 | +1.00 | −0.06 | +0.75 | +0.00 |
| 83 | Locke | +0.75 | +0.94 | +0.94 | +0.95 | −0.06 | +1.00 | +0.00 |
| 84 | Nidalee | +0.75 | +0.97 | +0.97 | +1.00 | −0.06 | – | +0.00 |
| 85 | Lee Sin | +0.75 | +0.93 | +0.88 | +1.00 | −0.03 | +1.00 | +0.00 |
| 86 | Ivern | +0.75 | +0.95 | +0.97 | +1.00 | −0.05 | – | +0.00 |
| 87 | Vel'Koz | +0.74 | +0.89 | +0.89 | +0.93 | +0.23 | – | +0.00 |
| 88 | Maokai | +0.72 | +0.94 | +0.94 | +0.91 | −0.06 | +0.81 | +0.00 |
| 89 | Zilean | +0.72 | +0.79 | +1.00 | +0.99 | +0.01 | – | +0.00 |
| 90 | Warwick | +0.71 | +0.84 | +0.84 | +0.99 | +0.06 | +0.86 | +0.00 |
| 91 | Mel | +0.70 | +1.00 | +0.75 | +1.00 | −0.05 | – | +0.00 |
| 92 | Briar | +0.70 | +0.86 | +0.86 | +1.00 | −0.13 | +0.88 | +0.00 |
| 93 | Naafiri | +0.67 | +0.55 | +0.95 | +0.95 | +0.01 | +1.00 | +0.00 |
| 94 | Shaco | +0.66 | +0.52 | +1.00 | +0.93 | −0.06 | +1.00 | +0.00 |
| 95 | Olaf | +0.65 | +0.89 | +0.64 | +1.00 | −0.19 | +0.94 | +0.00 |
| 96 | Ezreal | +0.63 | +0.75 | +0.75 | +0.98 | −0.03 | – | +0.00 |
| 97 | Mordekaiser | +0.62 | +0.99 | +0.53 | +0.90 | −0.07 | +0.75 | +0.00 |
| 98 | Malzahar | +0.57 | +1.00 | +1.00 | +0.07 | +0.00 | – | +0.00 |
| 99 | Rakan | +0.55 | +0.87 | +0.14 | +1.00 | +0.00 | +1.00 | +0.00 |
| 100 | Zoe | +0.51 | +0.26 | +0.82 | +0.96 | −0.01 | – | +0.00 |
| 101 | Sion | +0.48 | +0.96 | +0.07 | +0.88 | −0.07 | +0.63 | +0.00 |
| 102 | Yasuo | +0.48 | −0.12 | +0.98 | +1.00 | +0.06 | +0.58 | +0.00 |
| 103 | Nilah | +0.47 | −0.21 | +1.00 | +0.86 | +0.01 | +1.00 | +0.00 |
| 104 | Akali | +0.45 | +0.93 | +0.59 | +0.12 | −0.01 | +0.52 | +0.00 |
| 105 | Viego | +0.44 | −0.29 | +0.90 | +0.99 | −0.04 | +0.99 | +0.00 |
| 106 | Garen | +0.41 | +0.99 | +1.00 | −0.74 | +0.08 | +0.50 | +0.00 |
| 107 | Sejuani | +0.41 | +0.07 | +0.43 | +0.98 | −0.03 | +0.94 | +0.00 |
| 108 | Illaoi | +0.36 | +0.17 | +0.22 | +0.98 | −0.05 | +0.79 | +0.00 |
| 109 | Xerath | +0.33 | +0.96 | +0.99 | −0.93 | +0.00 | – | +0.00 |
| 110 | Kayn | +0.30 | −0.46 | +0.86 | +0.86 | −0.12 | +0.47 | +0.00 |
| 111 | Galio | +0.30 | −1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 112 | Nautilus | +0.29 | +0.28 | +0.10 | +0.63 | +0.07 | +0.62 | +0.00 |
| 113 | Hwei | +0.27 | +0.08 | +0.09 | +1.00 | +0.00 | – | +0.00 |
| 114 | Ambessa | +0.21 | +0.14 | −0.35 | +0.92 | −0.05 | +0.92 | +0.00 |
| 115 | Rammus | +0.20 | +0.12 | +0.13 | +0.22 | −0.02 | +0.93 | +0.00 |
| 116 | Ahri | +0.18 | −0.21 | +1.00 | −0.13 | −0.06 | – | +0.00 |
| 117 | Seraphine | +0.17 | +0.01 | +0.01 | +0.79 | −0.05 | – | +0.00 |
| 118 | Malphite | +0.17 | +0.03 | +0.03 | +0.69 | +0.02 | +0.13 | +0.00 |
| 119 | Renata Glasc | +0.16 | +0.66 | +0.66 | −0.92 | +0.00 | – | +0.00 |
| 120 | Lux | +0.16 | −0.11 | −0.11 | +1.00 | −0.01 | – | +0.00 |
| 121 | Skarner | +0.15 | −0.14 | −0.14 | +0.70 | +0.18 | +0.57 | +0.00 |
| 122 | Aatrox | +0.15 | +0.42 | +0.79 | −1.00 | −0.17 | +0.71 | +0.00 |
| 123 | Diana | +0.15 | +0.08 | +0.27 | +0.13 | +0.07 | +0.23 | +0.00 |
| 124 | Tahm Kench | +0.15 | +0.16 | +0.16 | +0.15 | +0.11 | +0.22 | +0.00 |
| 125 | Renekton | +0.11 | +0.06 | +0.28 | +0.13 | −0.06 | +0.09 | +0.00 |
| 126 | Yone | +0.10 | −0.42 | +0.12 | +0.81 | −0.07 | +0.26 | +0.00 |
| 127 | Rek'Sai | +0.10 | +0.26 | −0.09 | +0.26 | −0.00 | +0.06 | +0.00 |
| 128 | Zac | +0.09 | +0.27 | +0.27 | −0.20 | +0.13 | −0.20 | +0.00 |
| 129 | Alistar | +0.09 | +0.08 | +0.16 | +0.07 | −0.01 | +0.19 | +0.00 |
| 130 | Syndra | +0.09 | −0.82 | +0.73 | +0.49 | +0.03 | – | +0.00 |
| 131 | Sona | +0.09 | +0.16 | +0.15 | −0.00 | +0.01 | – | +0.00 |
| 132 | Zed | +0.08 | +0.99 | −1.00 | +0.99 | −0.10 | −0.99 | +0.00 |
| 133 | Anivia | +0.06 | +0.12 | +0.03 | +0.12 | −0.06 | – | +0.00 |
| 134 | Rell | +0.05 | +0.03 | +0.04 | +0.03 | +0.11 | +0.08 | +0.00 |
| 135 | Sett | +0.04 | +0.05 | +0.03 | +0.08 | −0.02 | +0.04 | +0.00 |
| 136 | Aurelion Sol | +0.03 | +0.05 | +0.05 | −0.07 | +0.13 | – | +0.00 |
| 137 | Taric | +0.03 | +0.12 | −0.10 | +0.11 | +0.01 | −0.00 | +0.00 |
| 138 | Leona | +0.01 | +0.01 | +0.01 | +0.05 | −0.04 | +0.06 | +0.00 |
| 139 | Zyra | −0.01 | −0.02 | +0.01 | −0.04 | −0.00 | – | +0.00 |
| 140 | Fiddlesticks | −0.02 | −0.06 | +0.02 | −0.04 | +0.02 | – | +0.00 |
| 141 | Soraka | −0.03 | −0.09 | −0.10 | +0.10 | −0.01 | – | +0.00 |
| 142 | Ornn | −0.04 | −0.09 | −0.06 | +0.04 | −0.02 | −0.04 | +0.00 |
| 143 | Braum | −0.04 | +0.01 | −0.16 | +0.03 | −0.02 | −0.02 | +0.00 |
| 144 | Ekko | −0.04 | +0.42 | −0.20 | −0.26 | −0.06 | −0.33 | +0.00 |
| 145 | Amumu | −0.04 | −0.06 | −0.01 | −0.05 | +0.00 | −0.12 | +0.00 |
| 146 | Shen | −0.07 | −0.06 | −0.22 | −0.01 | +0.01 | +0.01 | +0.00 |
| 147 | Urgot | −0.09 | −0.18 | −0.18 | +0.00 | +0.02 | −0.05 | +0.00 |
| 148 | Nunu & Willump | −0.11 | −0.13 | −0.16 | −0.14 | +0.03 | −0.14 | +0.00 |
| 149 | Karthus | −0.11 | −0.15 | −0.13 | −0.18 | +0.02 | −0.07 | +0.00 |
| 150 | Kha'Zix | −0.12 | −0.08 | −0.22 | −0.10 | −0.06 | −0.11 | +0.00 |
| 151 | Vladimir | −0.13 | −0.19 | −0.17 | −0.08 | −0.10 | −0.12 | +0.00 |
| 152 | Cho'Gath | −0.14 | −0.17 | −0.14 | −0.19 | −0.07 | −0.12 | +0.00 |
| 153 | Cassiopeia | −0.17 | +0.03 | +0.01 | −0.77 | −0.03 | – | +0.00 |
| 154 | Blitzcrank | −0.24 | −0.33 | −0.30 | −0.32 | +0.01 | −0.23 | +0.00 |
| 155 | Brand | −0.27 | −0.92 | −0.83 | +1.00 | −0.05 | – | +0.00 |
| 156 | Hecarim | −0.28 | −1.00 | +0.76 | −1.00 | −0.03 | −0.12 | +0.00 |
| 157 | Senna | −0.29 | −0.12 | −0.12 | −0.99 | −0.00 | – | +0.00 |
| 158 | Viktor | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 159 | Elise | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 160 | Talon | −0.34 | −0.94 | −0.03 | −0.94 | −0.07 | +1.00 | +0.00 |
| 161 | Evelynn | −0.46 | −0.76 | −0.76 | −0.95 | +0.09 | +0.92 | +0.00 |
| 162 | Veigar | −0.53 | −0.07 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 163 | Vex | −0.62 | −1.00 | −1.00 | −0.23 | −0.06 | – | +0.00 |
| 164 | LeBlanc | −0.65 | −0.96 | −1.00 | −0.38 | −0.10 | – | +0.00 |
| 165 | Morgana | −0.73 | −1.00 | −1.00 | −0.69 | −0.10 | −0.84 | +0.00 |
| 166 | Katarina | −0.76 | −1.00 | −1.00 | −1.00 | −0.04 | −0.52 | +0.00 |
| 167 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 168 | Qiyana | −0.78 | −1.00 | −0.91 | −1.00 | −0.05 | −0.91 | +0.00 |
| 169 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 170 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 171 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 172 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Nami's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nami's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nami` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.16)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Nami's Tidal Wave. Untargetable for 0.75 s; Tidal Wave takes 3.74 s to land, enough to react. (Fizz E Playful → Nami R Tidal Wave)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Nami's Aqua Prison. Untargetable for 0.75 s; Aqua Prison takes 0.25 s to land, enough to react. (Fizz E Playful → Nami Q Aqua Prison)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Nami's Ebb and Flow. Untargetable for 0.75 s; Ebb and Flow takes 0.54 s to land, enough to react. (Fizz E Playful → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 2. Nocturne (net +1.14)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Nami's Tidal Wave. Spell shield for 1.5 s, long enough to use ahead of Tidal Wave. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami R Tidal Wave)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Nami's Aqua Prison. Spell shield for 1.5 s, long enough to use ahead of Aqua Prison. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami Q Aqua Prison)
- **0.41** spell shield: Shroud of Darkness's spell shield blocks Nami's Ebb and Flow. Spell shield for 1.5 s, long enough to use ahead of Ebb and Flow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

#### 3. Sivir (net +1.12)

- **0.80** spell shield: Spell Shield's spell shield blocks Nami's Tidal Wave. Spell shield for 1.5 s, long enough to use ahead of Tidal Wave. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nami R Tidal Wave)
- **0.47** spell shield: Spell Shield's spell shield blocks Nami's Aqua Prison. Spell shield for 1.5 s, long enough to use ahead of Aqua Prison. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nami Q Aqua Prison)
- **0.33** spell shield: Spell Shield's spell shield blocks Nami's Ebb and Flow. Spell shield for 1.5 s, long enough to use ahead of Ebb and Flow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nami W Ebb and Flow)

#### 4. Samira (net +1.11)

- **0.80** projectile block: Blade Whirl blocks Nami's Tidal Wave, a projectile. Blade Whirl for 0.75 s; Tidal Wave takes 3.74 s to land, enough to react. (Samira W Blade Whirl → Nami R Tidal Wave)
- **0.43** projectile block: Blade Whirl blocks Nami's Aqua Prison, a projectile. Blade Whirl for 0.75 s; Aqua Prison takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Nami Q Aqua Prison)
- **0.30** projectile block: Blade Whirl blocks Nami's Ebb and Flow, a projectile. Blade Whirl for 0.75 s; Ebb and Flow takes 0.54 s to land, enough to react. (Samira W Blade Whirl → Nami W Ebb and Flow)

#### 5. Mel (net +1.10)

- **0.80** projectile block: Rebuttal blocks Nami's Tidal Wave, a projectile. Rebuttal for 0.75 s; Tidal Wave takes 3.74 s to land, enough to react. (Mel W Rebuttal → Nami R Tidal Wave)
- **0.41** projectile block: Rebuttal blocks Nami's Aqua Prison, a projectile. Rebuttal for 0.75 s; Aqua Prison takes 0.25 s to land, enough to react. (Mel W Rebuttal → Nami Q Aqua Prison)
- **0.28** projectile block: Rebuttal blocks Nami's Ebb and Flow, a projectile. Rebuttal for 0.75 s; Ebb and Flow takes 0.54 s to land, enough to react. (Mel W Rebuttal → Nami W Ebb and Flow)

#### 6. Braum (net +1.08)

- **0.80** projectile block: Unbreakable blocks Nami's Tidal Wave, a projectile. Unbreakable for 4 s, long enough to use ahead of Tidal Wave. (Braum E Unbreakable → Nami R Tidal Wave)
- **0.70** projectile block: Unbreakable blocks Nami's Aqua Prison, a projectile. Unbreakable for 4 s, long enough to use ahead of Aqua Prison. (Braum E Unbreakable → Nami Q Aqua Prison)
- **0.45** projectile block: Unbreakable blocks Nami's Ebb and Flow, a projectile. Unbreakable for 4 s, long enough to use ahead of Ebb and Flow. (Braum E Unbreakable → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 7. Fiora (net +1.07)

- **0.90** parry: Riposte parries Nami's Tidal Wave and stuns back. Parry for 0.75 s; Tidal Wave takes 3.74 s to land, enough to react. Negating Tidal Wave's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nami R Tidal Wave)
- **0.59** parry: Riposte parries Nami's Aqua Prison and stuns back. Parry for 0.75 s; Aqua Prison takes 0.25 s to land, enough to react. Negating Aqua Prison's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nami Q Aqua Prison)
- **0.35** parry: Riposte parries Nami's Ebb and Flow. Parry for 0.75 s; Ebb and Flow takes 0.54 s to land, enough to react. (Fiora W Riposte → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 8. Aurora (net +1.03)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Nami's Tidal Wave. Untargetable for 0.4 s; Tidal Wave takes 3.74 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nami R Tidal Wave)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Nami's Aqua Prison. Untargetable for 0.4 s; Aqua Prison takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nami Q Aqua Prison)
- **0.21** untargetable: Between Worlds makes Aurora untargetable, dodging Nami's Ebb and Flow. Untargetable for 0.4 s; Ebb and Flow takes 0.54 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nami W Ebb and Flow)

#### 9. Yasuo (net +1.02)

- **0.80** projectile block: Wind Wall blocks Nami's Tidal Wave, a projectile. Wind Wall for 4 s, long enough to use ahead of Tidal Wave. (Yasuo W Wind Wall → Nami R Tidal Wave)
- **0.48** projectile block: Wind Wall blocks Nami's Aqua Prison, a projectile. Wind Wall for 4 s, long enough to use ahead of Aqua Prison. (Yasuo W Wind Wall → Nami Q Aqua Prison)
- **0.34** projectile block: Wind Wall blocks Nami's Ebb and Flow, a projectile. Wind Wall for 4 s, long enough to use ahead of Ebb and Flow. (Yasuo W Wind Wall → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 10. Bard (net +1.01)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Nami's Tidal Wave. Untargetable for 2.5 s, long enough to use ahead of Tidal Wave. (Bard R Tempered Fate → Nami R Tidal Wave)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Nami's Aqua Prison. Untargetable for 2.5 s, long enough to use ahead of Aqua Prison. (Bard R Tempered Fate → Nami Q Aqua Prison)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Nami's Ebb and Flow. Untargetable for 2.5 s, long enough to use ahead of Ebb and Flow. (Bard R Tempered Fate → Nami W Ebb and Flow)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.16 | 1.26 | 0.10 |  |
| 2 | Nocturne | +1.14 | 1.36 | 0.22 |  |
| 3 | Sivir | +1.12 | 1.12 | 0.00 |  |
| 4 | Samira | +1.11 | 1.11 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 5 | Mel | +1.10 | 1.10 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 6 | Braum | +1.08 | 1.30 | 0.22 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Fiora | +1.07 | 1.29 | 0.22 |  |
| 8 | Aurora | +1.03 | 1.03 | 0.00 |  |
| 9 | Yasuo | +1.02 | 1.16 | 0.14 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 10 | Bard | +1.01 | 1.01 | 0.00 |  |
| 11 | Lissandra | +1.01 | 1.01 | 0.00 |  |
| 12 | Xayah | +1.01 | 1.01 | 0.00 |  |
| 13 | Maokai | +1.00 | 1.22 | 0.22 |  |
| 14 | Morgana | +0.94 | 1.05 | 0.11 |  |
| 15 | Udyr | +0.93 | 1.15 | 0.22 |  |
| 16 | Camille | +0.93 | 1.04 | 0.11 |  |
| 17 | Gwen | +0.90 | 1.12 | 0.22 |  |
| 18 | Rek'Sai | +0.90 | 1.04 | 0.14 |  |
| 19 | Vladimir | +0.88 | 1.13 | 0.25 |  |
| 20 | Evelynn | +0.86 | 1.01 | 0.15 |  |
| 21 | Shaco | +0.86 | 1.01 | 0.15 |  |
| 22 | Zed | +0.86 | 1.01 | 0.15 |  |
| 23 | Kled | +0.84 | 0.92 | 0.08 |  |
| 24 | Zaahen | +0.82 | 0.96 | 0.14 |  |
| 25 | Master Yi | +0.78 | 1.32 | 0.54 |  |
| 26 | Kalista | +0.71 | 0.71 | 0.00 |  |
| 27 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 28 | Alistar | +0.55 | 0.77 | 0.22 |  |
| 29 | Olaf | +0.52 | 0.96 | 0.44 |  |
| 30 | Rengar | +0.45 | 0.89 | 0.44 |  |
| 31 | Gangplank | +0.41 | 0.85 | 0.44 |  |
| 32 | Yuumi | +0.40 | 1.26 | 0.86 |  |
| 33 | Milio | +0.38 | 0.38 | 0.00 |  |
| 34 | Xin Zhao | +0.34 | 0.55 | 0.21 |  |
| 35 | Sion | +0.33 | 0.97 | 0.64 |  |
| 36 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 37 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 38 | K'Sante | +0.25 | 0.36 | 0.11 |  |
| 39 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 40 | Vex | +0.18 | 0.18 | 0.00 |  |
| 41 | Malphite | +0.10 | 0.32 | 0.22 |  |
| 42 | Jarvan IV | +0.08 | 0.18 | 0.10 |  |
| 43 | Yone | +0.08 | 0.18 | 0.10 |  |
| 44 | Annie | +0.08 | 0.08 | 0.00 |  |
| 45 | Aphelios | +0.08 | 0.08 | 0.00 |  |
| 46 | Heimerdinger | +0.08 | 0.08 | 0.00 |  |
| 47 | Hecarim | +0.05 | 0.19 | 0.14 |  |
| 48 | Ornn | +0.04 | 0.18 | 0.14 |  |
| 49 | Volibear | +0.03 | 0.18 | 0.15 |  |
| 50 | Kayn | +0.02 | 1.01 | 0.99 |  |
| 51 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 52 | Varus | +0.02 | 0.18 | 0.16 |  |
| 53 | Jax | +0.01 | 0.23 | 0.22 |  |
| 54 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 55 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 56 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 57 | Azir | 0.00 | 0.00 | 0.00 |  |
| 58 | Brand | 0.00 | 0.00 | 0.00 |  |
| 59 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 60 | Corki | 0.00 | 0.00 | 0.00 |  |
| 61 | Draven | 0.00 | 0.00 | 0.00 |  |
| 62 | Elise | 0.00 | 0.00 | 0.00 |  |
| 63 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 64 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 65 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 66 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 67 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 68 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 69 | Karma | 0.00 | 0.00 | 0.00 |  |
| 70 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 71 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 72 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 73 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 74 | Lux | 0.00 | 0.00 | 0.00 |  |
| 75 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 76 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 77 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 78 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 79 | Senna | 0.00 | 0.00 | 0.00 |  |
| 80 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 81 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 82 | Sona | 0.00 | 0.00 | 0.00 |  |
| 83 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 84 | Swain | 0.00 | 0.00 | 0.00 |  |
| 85 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 86 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 87 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 88 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 89 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 90 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 91 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 92 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 93 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 94 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 95 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 96 | Garen | -0.04 | 0.37 | 0.41 |  |
| 97 | Illaoi | -0.04 | 0.18 | 0.22 |  |
| 98 | Sett | -0.04 | 0.18 | 0.22 |  |
| 99 | Shyvana | -0.04 | 0.18 | 0.22 |  |
| 100 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 101 | Graves | -0.05 | 0.00 | 0.05 |  |
| 102 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 103 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 104 | Briar | -0.11 | 0.00 | 0.11 |  |
| 105 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 106 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 107 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 108 | Rell | -0.14 | 0.00 | 0.14 |  |
| 109 | Akali | -0.15 | 0.00 | 0.15 |  |
| 110 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 111 | Aurelion Sol | -0.15 | 0.00 | 0.15 |  |
| 112 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 113 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 114 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 115 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 116 | Riven | -0.15 | 0.00 | 0.15 |  |
| 117 | Talon | -0.15 | 0.00 | 0.15 |  |
| 118 | Warwick | -0.17 | 1.15 | 1.32 |  |
| 119 | Singed | -0.17 | 0.27 | 0.44 |  |
| 120 | Malzahar | -0.18 | 0.57 | 0.75 |  |
| 121 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 122 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 123 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 124 | Tryndamere | -0.21 | 0.00 | 0.21 |  |
| 125 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 126 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 127 | Diana | -0.22 | 0.00 | 0.22 |  |
| 128 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 129 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 130 | Leona | -0.22 | 0.00 | 0.22 |  |
| 131 | Locke | -0.22 | 0.00 | 0.22 |  |
| 132 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 133 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 134 | Ivern | -0.26 | 0.00 | 0.26 |  |
| 135 | Viego | -0.28 | 0.18 | 0.46 |  |
| 136 | Skarner | -0.34 | 0.10 | 0.44 |  |
| 137 | Quinn | -0.34 | 0.00 | 0.34 |  |
| 138 | Caitlyn | -0.36 | 0.18 | 0.54 |  |
| 139 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 140 | Darius | -0.41 | 0.00 | 0.41 |  |
| 141 | Pyke | -0.41 | 0.00 | 0.41 |  |
| 142 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 143 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 144 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 145 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 146 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 147 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 148 | Taric | -0.44 | 0.00 | 0.44 |  |
| 149 | Rammus | -0.45 | 0.22 | 0.67 |  |
| 150 | Gragas | -0.49 | 0.00 | 0.49 |  |
| 151 | Pantheon | -0.50 | 0.62 | 1.12 |  |
| 152 | Katarina | -0.50 | 0.18 | 0.68 |  |
| 153 | Akshan | -0.51 | 0.00 | 0.51 |  |
| 154 | Vel'Koz | -0.52 | 0.00 | 0.52 |  |
| 155 | Jhin | -0.54 | 0.00 | 0.54 |  |
| 156 | Lucian | -0.54 | 0.00 | 0.54 |  |
| 157 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 158 | Vi | -0.62 | 0.18 | 0.80 |  |
| 159 | Poppy | -0.62 | 0.00 | 0.62 |  |
| 160 | Xerath | -0.63 | 0.00 | 0.63 |  |
| 161 | Karthus | -0.67 | 0.00 | 0.67 |  |
| 162 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 163 | Twisted Fate | -0.70 | 0.00 | 0.70 |  |
| 164 | Janna | -0.80 | 0.00 | 0.80 |  |
| 165 | Shen | -0.83 | 0.22 | 1.05 |  |
| 166 | Fiddlesticks | -0.83 | 0.00 | 0.83 |  |
| 167 | Zac | -0.94 | 0.00 | 0.94 |  |
| 168 | Naafiri | -0.96 | 0.00 | 0.96 |  |
| 169 | Tahm Kench | -0.96 | 0.00 | 0.96 |  |
| 170 | Taliyah | -0.96 | 0.00 | 0.96 |  |
| 171 | Nunu & Willump | -1.02 | 0.25 | 1.27 |  |
| 172 | Galio | -1.28 | 0.00 | 1.28 |  |
