# Counters to Lillia (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Lillia: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Lillia wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Lillia --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +1.00 |
| 2 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.43 | +1.00 | +0.00 |
| 3 | Master Yi | +0.86 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +1.00 |
| 4 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.00 |
| 5 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 6 | Nilah | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 7 | Jayce | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 8 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.24 |
| 9 | Sylas | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 10 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.15 |
| 11 | Shyvana | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 12 | Yunara | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 13 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 14 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 15 | Samira | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 16 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 17 | Smolder | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 18 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 19 | Yone | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 20 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 21 | Lee Sin | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 22 | Kassadin | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 23 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 24 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 25 | Zaahen | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 26 | Yasuo | +0.80 | +1.00 | +0.98 | +1.00 | +0.09 | +0.95 | +0.00 |
| 27 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 28 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 29 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 30 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 31 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 32 | Xin Zhao | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 33 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 34 | Xayah | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 35 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 36 | Urgot | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 37 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 38 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 39 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 40 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 41 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 42 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 43 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 44 | Gragas | +0.78 | +0.96 | +0.96 | +1.00 | +0.00 | +1.00 | +0.00 |
| 45 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 46 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 47 | Rakan | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 48 | Viego | +0.76 | +0.79 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 49 | Olaf | +0.76 | +0.99 | +0.90 | +1.00 | −0.00 | +0.89 | +0.00 |
| 50 | Ashe | +0.74 | +0.86 | +0.86 | +1.00 | +0.03 | +1.00 | +0.00 |
| 51 | Lulu | +0.72 | +1.00 | +1.00 | +1.00 | +0.05 | +0.10 | +0.00 |
| 52 | Gnar | +0.72 | +0.85 | +0.85 | +1.00 | +0.04 | +0.86 | +0.00 |
| 53 | Sion | +0.68 | +0.95 | +0.99 | +0.97 | −0.03 | +0.01 | +0.00 |
| 54 | Fiddlesticks | +0.61 | +1.00 | +1.00 | +1.00 | +0.03 | −1.00 | +0.00 |
| 55 | Aatrox | +0.60 | +0.98 | +1.00 | +1.00 | −0.14 | −0.74 | +0.00 |
| 56 | Gwen | +0.59 | +0.57 | +0.58 | +1.00 | −0.02 | +1.00 | +0.00 |
| 57 | Illaoi | +0.57 | +0.07 | +0.97 | +1.00 | +0.05 | +1.00 | +0.00 |
| 58 | Renekton | +0.55 | +1.00 | +0.39 | +1.00 | −0.03 | +0.04 | +0.00 |
| 59 | Garen | +0.55 | +1.00 | −0.07 | +1.00 | +0.10 | +1.00 | +0.00 |
| 60 | Mordekaiser | +0.51 | +0.95 | +0.40 | +0.90 | −0.03 | −0.00 | +0.00 |
| 61 | Wukong | +0.51 | +1.00 | −0.04 | +1.00 | −0.22 | +1.00 | +0.00 |
| 62 | Elise | +0.50 | +0.89 | +0.68 | +1.00 | +0.06 | −1.00 | +0.00 |
| 63 | Kai'Sa | +0.49 | +0.38 | +0.38 | +1.00 | +0.01 | +1.00 | +0.00 |
| 64 | Kalista | +0.49 | +0.38 | +0.39 | +1.00 | −0.04 | +1.00 | +0.00 |
| 65 | Kennen | +0.47 | +0.54 | +0.95 | +1.00 | −0.03 | −1.00 | +0.00 |
| 66 | Quinn | +0.44 | +0.34 | +0.28 | +1.00 | −0.08 | +1.00 | +0.00 |
| 67 | Neeko | +0.42 | −0.14 | +1.00 | +1.00 | +0.08 | −0.13 | +0.00 |
| 68 | Fizz | +0.41 | −0.53 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 69 | Karma | +0.40 | +0.44 | +0.14 | +0.84 | −0.02 | +0.92 | +0.00 |
| 70 | Kindred | +0.38 | +1.00 | −0.17 | +1.00 | +0.01 | −0.31 | +0.00 |
| 71 | Varus | +0.34 | +0.09 | +0.09 | +1.00 | −0.01 | +1.00 | +0.00 |
| 72 | Tryndamere | +0.32 | −0.88 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 73 | Swain | +0.29 | +1.00 | +0.33 | −0.78 | +0.10 | +1.00 | +0.00 |
| 74 | Dr. Mundo | +0.28 | +0.27 | +0.36 | +0.62 | −0.10 | +0.15 | +0.00 |
| 75 | Twisted Fate | +0.27 | −0.06 | −0.06 | +1.00 | +0.02 | +1.00 | +0.00 |
| 76 | Taric | +0.26 | +0.54 | +0.00 | +0.53 | +0.04 | +0.10 | +0.00 |
| 77 | Rammus | +0.23 | +1.00 | +0.34 | −0.95 | −0.08 | +1.00 | +0.00 |
| 78 | Ziggs | +0.23 | +1.00 | +1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 79 | Anivia | +0.22 | +0.24 | +0.33 | +0.31 | −0.10 | +0.27 | +0.00 |
| 80 | Sett | +0.09 | +0.17 | +1.00 | −0.90 | −0.07 | −0.09 | +0.00 |
| 81 | Sivir | +0.07 | +0.03 | +0.04 | −0.22 | −0.01 | +1.00 | +0.00 |
| 82 | Ryze | +0.07 | −0.23 | −0.04 | +0.80 | +0.07 | −0.34 | +0.00 |
| 83 | Azir | +0.07 | +0.96 | −0.21 | −0.09 | −0.01 | −1.00 | +0.00 |
| 84 | Irelia | +0.06 | −0.51 | +0.12 | +0.80 | +0.13 | −0.23 | +0.00 |
| 85 | Galio | +0.04 | +0.04 | +0.01 | +0.02 | +0.11 | +0.06 | +0.00 |
| 86 | Singed | +0.02 | +0.20 | −0.06 | −0.01 | −0.05 | −0.00 | +0.00 |
| 87 | Zac | +0.01 | +0.02 | +0.02 | +0.03 | +0.08 | −0.18 | +0.00 |
| 88 | Tahm Kench | +0.01 | +0.01 | +0.01 | +0.03 | +0.04 | −0.07 | +0.00 |
| 89 | Milio | −0.02 | +0.38 | +0.35 | −0.82 | +0.19 | −0.61 | +0.00 |
| 90 | Lucian | −0.02 | +0.06 | −0.14 | −0.46 | −0.09 | +1.00 | +0.00 |
| 91 | Leona | −0.04 | −0.05 | −0.05 | −0.02 | −0.07 | −0.06 | +0.00 |
| 92 | Cho'Gath | −0.05 | −0.59 | +0.03 | +1.00 | −0.07 | −1.00 | +0.00 |
| 93 | Akshan | −0.12 | −0.11 | −0.11 | −0.81 | −0.03 | +1.00 | +0.00 |
| 94 | Diana | −0.14 | −0.02 | −0.48 | −0.02 | +0.06 | −0.16 | +0.00 |
| 95 | Braum | −0.14 | −0.12 | −0.20 | −0.10 | −0.05 | −0.31 | +0.00 |
| 96 | Aurora | −0.14 | −0.31 | +0.81 | −0.87 | +0.04 | −1.00 | +0.00 |
| 97 | Alistar | −0.19 | −0.06 | −0.59 | −0.05 | −0.09 | −0.04 | +0.00 |
| 98 | Nidalee | −0.19 | −0.40 | −0.40 | +0.57 | −0.06 | −1.00 | +0.00 |
| 99 | Jhin | −0.20 | −1.00 | −1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 100 | Shen | −0.22 | −0.26 | −0.14 | −0.19 | +0.07 | −0.97 | +0.00 |
| 101 | Morgana | −0.22 | +0.06 | −0.06 | −0.72 | +0.12 | −0.99 | +0.00 |
| 102 | Nautilus | −0.24 | −0.56 | −0.11 | −0.26 | +0.01 | −0.22 | +0.00 |
| 103 | Vi | −0.27 | −0.95 | +1.00 | −0.94 | −0.04 | −0.91 | +0.00 |
| 104 | Janna | −0.28 | −0.37 | +0.03 | −0.72 | +0.06 | −0.56 | +0.00 |
| 105 | Caitlyn | −0.36 | −0.15 | −0.16 | −0.94 | +0.02 | −1.00 | +0.00 |
| 106 | Jinx | −0.38 | −0.90 | −0.90 | +0.14 | +0.03 | +0.34 | +0.00 |
| 107 | Nocturne | −0.39 | −0.59 | −0.60 | −0.35 | −0.07 | −0.13 | +0.00 |
| 108 | Pantheon | −0.39 | −1.00 | −1.00 | +1.00 | −0.03 | −0.85 | +0.00 |
| 109 | Skarner | −0.40 | −0.97 | −0.97 | +0.89 | +0.06 | −1.00 | +0.00 |
| 110 | Aurelion Sol | −0.41 | −0.57 | −0.09 | −1.00 | +0.39 | −1.00 | +0.00 |
| 111 | Kayn | −0.44 | −0.81 | −0.05 | −0.60 | −0.01 | −1.00 | +0.00 |
| 112 | Briar | −0.45 | −0.87 | −0.87 | −0.53 | −0.05 | +1.00 | +0.00 |
| 113 | Ornn | −0.49 | −0.36 | −0.68 | −0.98 | +0.14 | −0.53 | +0.00 |
| 114 | Ezreal | −0.49 | −0.98 | −0.98 | +0.54 | −0.05 | −1.00 | +0.00 |
| 115 | Vel'Koz | −0.51 | −0.97 | −0.97 | −0.62 | +0.22 | +0.64 | +0.00 |
| 116 | Draven | −0.51 | −0.82 | −0.80 | −0.08 | +0.03 | −1.00 | +0.00 |
| 117 | Brand | −0.52 | −0.83 | −0.87 | −0.27 | +0.01 | −0.43 | +0.00 |
| 118 | Hwei | −0.53 | −0.97 | −0.98 | −0.08 | −0.06 | −0.15 | +0.00 |
| 119 | Jarvan IV | −0.53 | −0.95 | −0.10 | −0.90 | +0.07 | −1.00 | +0.00 |
| 120 | Twitch | −0.53 | −0.49 | −0.60 | −0.91 | +0.04 | −0.85 | +0.00 |
| 121 | Nunu & Willump | −0.56 | −0.93 | −0.15 | −0.93 | −0.02 | −1.00 | +0.00 |
| 122 | Rek'Sai | −0.57 | −0.97 | −0.53 | −0.97 | −0.01 | −0.02 | +0.00 |
| 123 | Tristana | −0.66 | −1.00 | −1.00 | −0.72 | +0.02 | −0.21 | +0.00 |
| 124 | Miss Fortune | −0.67 | −0.85 | −0.85 | −0.84 | +0.10 | −0.95 | +0.00 |
| 125 | Mel | −0.69 | −0.79 | −0.85 | −1.00 | +0.14 | −1.00 | +0.00 |
| 126 | Karthus | −0.71 | −0.59 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 127 | Zilean | −0.72 | −0.96 | −0.94 | −0.92 | −0.03 | −0.51 | +0.00 |
| 128 | Rell | −0.75 | −1.00 | −0.96 | −1.00 | +0.09 | −0.71 | +0.00 |
| 129 | Annie | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | −0.73 | +0.00 |
| 130 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 131 | Ambessa | −0.77 | −0.95 | −0.95 | −1.00 | +0.01 | −1.00 | +0.00 |
| 132 | Ekko | −0.78 | −0.88 | −1.00 | −0.92 | −0.16 | −0.99 | +0.00 |
| 133 | Heimerdinger | −0.78 | −1.00 | −1.00 | −0.98 | +0.09 | −1.00 | +0.00 |
| 134 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −0.98 | +0.00 |
| 135 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 136 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 137 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 138 | Bard | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 139 | Rumble | −0.79 | −1.00 | −1.00 | −0.95 | −0.03 | −1.00 | +0.00 |
| 140 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 141 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 142 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 143 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 144 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 145 | Shaco | −0.80 | −1.00 | −0.99 | −0.98 | −0.04 | −0.99 | +0.00 |
| 146 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 147 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 148 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 149 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 150 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 151 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 152 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 153 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 154 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 155 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −0.99 | +0.00 |
| 156 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 157 | Zed | −0.80 | −0.95 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 158 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 159 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 160 | Akali | −0.81 | −1.00 | −0.95 | −1.00 | −0.14 | −1.00 | +0.00 |
| 161 | Sejuani | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 162 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 163 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 164 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 165 | Soraka | −0.81 | −0.99 | −0.99 | −0.99 | −0.12 | −1.00 | +0.00 |
| 166 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 167 | Kha'Zix | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 168 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 169 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 170 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 171 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 172 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Lillia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Lillia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Lillia` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Mel (net +1.02)

- **0.80** projectile block: Rebuttal blocks Lillia's Lilting Lullaby, a projectile. Rebuttal for 0.75 s; Lilting Lullaby takes 0.4 s to land, enough to react. (Mel W Rebuttal → Lillia R Lilting Lullaby)
- **0.15** projectile block: Rebuttal blocks part of Lillia's Swirlseed, a projectile. Rebuttal for 0.75 s; Swirlseed takes 0.54 s to land, enough to react. Only part of the ability is a projectile. Swirlseed's origin is determined from Lillia's position at the start of cast, the rolling direction is determined from Lillia's position at the end of cast (when the projectile is created, not when the seed starts rolling). Projectile destroying effects will still make the rolling seed detonate upon colliding with them, but not when the initial arcing missile is destroyed.
  - If Unbreakable blocks the initial projectile, it is destroyed and deals 0 damage to him, as well as not triggering the cone-shaped area of effect. (Mel W Rebuttal → Lillia E Swirlseed)
- **0.15** range: Mel's basic attacks reach 225 units farther than Lillia's (550 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Mel basic attacks → Lillia basic attacks)

#### 2. Samira (net +1.02)

- **0.80** projectile block: Blade Whirl blocks Lillia's Lilting Lullaby, a projectile. Blade Whirl for 0.75 s; Lilting Lullaby takes 0.4 s to land, enough to react. (Samira W Blade Whirl → Lillia R Lilting Lullaby)
- **0.16** projectile block: Blade Whirl blocks part of Lillia's Swirlseed, a projectile. Blade Whirl for 0.75 s; Swirlseed takes 0.54 s to land, enough to react. Only part of the ability is a projectile. Swirlseed's origin is determined from Lillia's position at the start of cast, the rolling direction is determined from Lillia's position at the end of cast (when the projectile is created, not when the seed starts rolling). Projectile destroying effects will still make the rolling seed detonate upon colliding with them, but not when the initial arcing missile is destroyed.
  - If Unbreakable blocks the initial projectile, it is destroyed and deals 0 damage to him, as well as not triggering the cone-shaped area of effect. (Samira W Blade Whirl → Lillia E Swirlseed)
- **0.14** range: Samira's basic attacks reach 175 units farther than Lillia's (500 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Samira basic attacks → Lillia basic attacks)

#### 3. Aurora (net +1.00)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 0.4 s; Lilting Lullaby takes 0.4 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Lillia R Lilting Lullaby)
- **0.16** range: Aurora's basic attacks reach 225 units farther than Lillia's (550 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Aurora basic attacks → Lillia basic attacks)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Lillia's Lilting Lullaby (sleep) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Lillia R Lilting Lullaby)

#### 4. Lissandra (net +0.99)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 2.5 s, long enough to use ahead of Lilting Lullaby. (Lissandra R Frozen Tomb → Lillia R Lilting Lullaby)
- **0.14** dash stop: Frozen Tomb's knockdown can stop Lillia's Watch Out! Eep! mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Lillia W Watch Out! Eep!)
- **0.12** range: Lissandra's basic attacks reach 225 units farther than Lillia's (550 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Lissandra basic attacks → Lillia basic attacks)

#### 5. Xayah (net +0.99)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 1.5 s, long enough to use ahead of Lilting Lullaby. (Xayah R Featherstorm → Lillia R Lilting Lullaby)
- **0.19** range: Xayah's basic attacks reach 200 units farther than Lillia's (525 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Xayah basic attacks → Lillia basic attacks)

#### 6. Bard (net +0.97)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Lillia's Lilting Lullaby. Untargetable for 2.5 s, long enough to use ahead of Lilting Lullaby. (Bard R Tempered Fate → Lillia R Lilting Lullaby)
- **0.17** range: Bard's basic attacks reach 175 units farther than Lillia's (500 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Bard basic attacks → Lillia basic attacks)

#### 7. Morgana (net +0.92)

- **0.80** cc immunity: Black Shield makes Morgana immune to Lillia's Lilting Lullaby (sleep, slow, drowsy). Immune for 5 s, long enough to use ahead of Lilting Lullaby. (Morgana E Black Shield → Lillia R Lilting Lullaby)
- **0.10** cc immunity: Black Shield makes Morgana immune to Lillia's Swirlseed (slow). Immune for 5 s, long enough to use ahead of Swirlseed. (Morgana E Black Shield → Lillia E Swirlseed)
- **0.07** range: Morgana's basic attacks reach 125 units farther than Lillia's (450 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Morgana basic attacks → Lillia basic attacks)

#### 8. Milio (net +0.89)

- **0.58** cleanse: Breath of Life cleanses Lillia's Lilting Lullaby (sleep, slow, drowsy) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Lillia R Lilting Lullaby)
- **0.22** tenacity: Breath of Life's 65% tenacity shortens Lillia's Lilting Lullaby (sleep, slow). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Lillia R Lilting Lullaby)
- **0.19** range: Milio's basic attacks reach 200 units farther than Lillia's (525 vs 325 attack range). Lillia closes the gap with Watch Out! Eep!. (Milio basic attacks → Lillia basic attacks)

#### 9. Yasuo (net +0.85)

- **0.80** projectile block: Wind Wall blocks Lillia's Lilting Lullaby, a projectile. Wind Wall for 4 s, long enough to use ahead of Lilting Lullaby. (Yasuo W Wind Wall → Lillia R Lilting Lullaby)
- **0.19** projectile block: Wind Wall blocks part of Lillia's Swirlseed, a projectile. Wind Wall for 4 s, long enough to use ahead of Swirlseed. Only part of the ability is a projectile. Swirlseed's origin is determined from Lillia's position at the start of cast, the rolling direction is determined from Lillia's position at the end of cast (when the projectile is created, not when the seed starts rolling). Projectile destroying effects will still make the rolling seed detonate upon colliding with them, but not when the initial arcing missile is destroyed.
  - If Unbreakable blocks the initial projectile, it is destroyed and deals 0 damage to him, as well as not triggering the cone-shaped area of effect. (Yasuo W Wind Wall → Lillia E Swirlseed)
- Watch out: Lillia's basic attacks reach 150 units farther than Yasuo's (325 vs 175 attack range).

#### 10. Master Yi (net +0.84)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Lillia's Lilting Lullaby. Untargetable for ?; Lilting Lullaby takes 0.4 s to land, enough to react. (Master Yi Q Alpha Strike → Lillia R Lilting Lullaby)
- **0.16** cleanse: Highlander cleanses Lillia's Lilting Lullaby (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove sleep, drowsy. (Master Yi R Highlander → Lillia R Lilting Lullaby)
- **0.09** cc immunity: Highlander makes Master Yi immune to Lillia's Lilting Lullaby (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Lillia R Lilting Lullaby)
- Watch out: Lilting Lullaby's sleep interrupts Master Yi's Meditate (normal channel).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +1.02 | 1.02 | 0.00 | projectile block (Rebuttal) |
| 2 | Samira | +1.02 | 1.02 | 0.00 | projectile block (Blade Whirl) |
| 3 | Aurora | +1.00 | 1.00 | 0.00 |  |
| 4 | Lissandra | +0.99 | 0.99 | 0.00 |  |
| 5 | Xayah | +0.99 | 0.99 | 0.00 |  |
| 6 | Bard | +0.97 | 0.97 | 0.00 |  |
| 7 | Morgana | +0.92 | 0.92 | 0.00 |  |
| 8 | Milio | +0.89 | 0.89 | 0.00 |  |
| 9 | Yasuo | +0.85 | 0.90 | 0.05 | projectile block (Wind Wall) |
| 10 | Master Yi | +0.84 | 1.02 | 0.18 |  |
| 11 | Fiora | +0.83 | 0.93 | 0.10 |  |
| 12 | Vladimir | +0.82 | 0.87 | 0.05 |  |
| 13 | Braum | +0.81 | 0.92 | 0.11 | projectile block (Unbreakable) |
| 14 | Kled | +0.81 | 0.83 | 0.02 |  |
| 15 | Camille | +0.79 | 0.84 | 0.05 |  |
| 16 | Rek'Sai | +0.79 | 0.84 | 0.05 |  |
| 17 | Kalista | +0.79 | 0.79 | 0.00 |  |
| 18 | Zaahen | +0.78 | 0.83 | 0.05 |  |
| 19 | Fizz | +0.76 | 0.80 | 0.04 |  |
| 20 | Udyr | +0.75 | 0.86 | 0.11 |  |
| 21 | Evelynn | +0.73 | 0.80 | 0.07 |  |
| 22 | Shaco | +0.73 | 0.80 | 0.07 |  |
| 23 | Zed | +0.73 | 0.80 | 0.07 |  |
| 24 | Gwen | +0.70 | 0.80 | 0.10 |  |
| 25 | Maokai | +0.69 | 0.80 | 0.11 |  |
| 26 | Kayle | +0.67 | 0.67 | 0.00 |  |
| 27 | Sivir | +0.62 | 0.62 | 0.00 |  |
| 28 | Olaf | +0.61 | 0.83 | 0.22 |  |
| 29 | Sion | +0.59 | 0.83 | 0.24 |  |
| 30 | Yuumi | +0.55 | 0.91 | 0.36 |  |
| 31 | Alistar | +0.55 | 0.66 | 0.11 |  |
| 32 | Rengar | +0.47 | 0.69 | 0.22 |  |
| 33 | Gangplank | +0.46 | 0.68 | 0.22 |  |
| 34 | Vex | +0.46 | 0.46 | 0.00 |  |
| 35 | Teemo | +0.45 | 0.45 | 0.00 |  |
| 36 | Jinx | +0.44 | 0.44 | 0.00 |  |
| 37 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 38 | Warwick | +0.42 | 0.97 | 0.55 |  |
| 39 | Viktor | +0.42 | 0.42 | 0.00 |  |
| 40 | Cassiopeia | +0.41 | 0.41 | 0.00 |  |
| 41 | Lulu | +0.41 | 0.41 | 0.00 |  |
| 42 | Ahri | +0.39 | 0.39 | 0.00 |  |
| 43 | Veigar | +0.38 | 0.38 | 0.00 |  |
| 44 | Kayn | +0.37 | 0.80 | 0.43 |  |
| 45 | Nocturne | +0.37 | 0.48 | 0.11 |  |
| 46 | Malzahar | +0.34 | 0.67 | 0.33 |  |
| 47 | Tristana | +0.34 | 0.34 | 0.00 |  |
| 48 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 49 | Xin Zhao | +0.32 | 0.40 | 0.08 |  |
| 50 | Garen | +0.27 | 0.43 | 0.16 |  |
| 51 | Singed | +0.26 | 0.48 | 0.22 |  |
| 52 | Ashe | +0.25 | 0.25 | 0.00 |  |
| 53 | Zeri | +0.25 | 0.25 | 0.00 |  |
| 54 | Varus | +0.24 | 0.29 | 0.05 |  |
| 55 | Twitch | +0.24 | 0.24 | 0.00 |  |
| 56 | Vayne | +0.24 | 0.24 | 0.00 |  |
| 57 | Sona | +0.23 | 0.23 | 0.00 |  |
| 58 | Heimerdinger | +0.22 | 0.22 | 0.00 |  |
| 59 | Kindred | +0.22 | 0.22 | 0.00 |  |
| 60 | Renata Glasc | +0.22 | 0.22 | 0.00 |  |
| 61 | Senna | +0.22 | 0.22 | 0.00 |  |
| 62 | Yunara | +0.22 | 0.22 | 0.00 |  |
| 63 | Draven | +0.20 | 0.20 | 0.00 |  |
| 64 | Kai'Sa | +0.19 | 0.19 | 0.00 |  |
| 65 | Yone | +0.18 | 0.22 | 0.04 |  |
| 66 | Corki | +0.18 | 0.18 | 0.00 |  |
| 67 | Elise | +0.18 | 0.18 | 0.00 |  |
| 68 | Ezreal | +0.18 | 0.18 | 0.00 |  |
| 69 | Smolder | +0.18 | 0.18 | 0.00 |  |
| 70 | Zilean | +0.18 | 0.18 | 0.00 |  |
| 71 | Zoe | +0.18 | 0.18 | 0.00 |  |
| 72 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 73 | Annie | +0.16 | 0.16 | 0.00 |  |
| 74 | Gnar | +0.16 | 0.16 | 0.00 |  |
| 75 | Kennen | +0.16 | 0.16 | 0.00 |  |
| 76 | Lux | +0.16 | 0.16 | 0.00 |  |
| 77 | Nilah | +0.15 | 0.20 | 0.05 |  |
| 78 | Nidalee | +0.15 | 0.15 | 0.00 |  |
| 79 | Soraka | +0.15 | 0.15 | 0.00 |  |
| 80 | Ziggs | +0.15 | 0.15 | 0.00 |  |
| 81 | Zyra | +0.15 | 0.15 | 0.00 |  |
| 82 | Jayce | +0.14 | 0.14 | 0.00 |  |
| 83 | Seraphine | +0.14 | 0.14 | 0.00 |  |
| 84 | Azir | +0.13 | 0.13 | 0.00 |  |
| 85 | Kog'Maw | +0.13 | 0.13 | 0.00 |  |
| 86 | Orianna | +0.13 | 0.13 | 0.00 |  |
| 87 | Jax | +0.12 | 0.23 | 0.11 |  |
| 88 | Brand | +0.12 | 0.12 | 0.00 |  |
| 89 | Nami | +0.12 | 0.12 | 0.00 |  |
| 90 | Neeko | +0.12 | 0.12 | 0.00 |  |
| 91 | Syndra | +0.12 | 0.12 | 0.00 |  |
| 92 | Malphite | +0.11 | 0.22 | 0.11 |  |
| 93 | K'Sante | +0.11 | 0.16 | 0.05 |  |
| 94 | Karma | +0.11 | 0.11 | 0.00 |  |
| 95 | LeBlanc | +0.11 | 0.11 | 0.00 |  |
| 96 | Swain | +0.10 | 0.10 | 0.00 |  |
| 97 | Poppy | +0.08 | 0.38 | 0.30 |  |
| 98 | Graves | +0.08 | 0.08 | 0.00 |  |
| 99 | Thresh | +0.07 | 0.07 | 0.00 |  |
| 100 | Aurelion Sol | +0.06 | 0.12 | 0.06 |  |
| 101 | Quinn | +0.05 | 0.19 | 0.14 |  |
| 102 | Caitlyn | +0.04 | 0.29 | 0.25 |  |
| 103 | Jarvan IV | +0.04 | 0.08 | 0.04 |  |
| 104 | Amumu | +0.03 | 0.14 | 0.11 |  |
| 105 | Hecarim | +0.03 | 0.08 | 0.05 |  |
| 106 | Ornn | +0.03 | 0.08 | 0.05 |  |
| 107 | Volibear | +0.02 | 0.08 | 0.06 |  |
| 108 | Ivern | +0.01 | 0.08 | 0.07 |  |
| 109 | Zac | 0.00 | 0.30 | 0.30 |  |
| 110 | Nasus | 0.00 | 0.22 | 0.22 |  |
| 111 | Rakan | 0.00 | 0.00 | 0.00 |  |
| 112 | Urgot | 0.00 | 0.00 | 0.00 |  |
| 113 | Shyvana | -0.02 | 0.08 | 0.10 |  |
| 114 | Illaoi | -0.03 | 0.08 | 0.11 |  |
| 115 | Sett | -0.03 | 0.08 | 0.11 |  |
| 116 | Rammus | -0.04 | 0.22 | 0.26 |  |
| 117 | Sylas | -0.04 | 0.00 | 0.04 |  |
| 118 | Briar | -0.05 | 0.00 | 0.05 |  |
| 119 | Wukong | -0.05 | 0.00 | 0.05 |  |
| 120 | Rell | -0.05 | 0.00 | 0.05 |  |
| 121 | Akshan | -0.06 | 0.16 | 0.22 |  |
| 122 | Skarner | -0.06 | 0.13 | 0.19 |  |
| 123 | Viego | -0.06 | 0.08 | 0.14 |  |
| 124 | Bel'Veth | -0.06 | 0.00 | 0.06 |  |
| 125 | Qiyana | -0.06 | 0.00 | 0.06 |  |
| 126 | Akali | -0.07 | 0.00 | 0.07 |  |
| 127 | Ambessa | -0.07 | 0.00 | 0.07 |  |
| 128 | Ekko | -0.07 | 0.00 | 0.07 |  |
| 129 | Irelia | -0.07 | 0.00 | 0.07 |  |
| 130 | Lee Sin | -0.07 | 0.00 | 0.07 |  |
| 131 | Riven | -0.07 | 0.00 | 0.07 |  |
| 132 | Talon | -0.07 | 0.00 | 0.07 |  |
| 133 | Miss Fortune | -0.08 | 0.18 | 0.26 |  |
| 134 | Lucian | -0.08 | 0.17 | 0.25 |  |
| 135 | Aatrox | -0.08 | 0.00 | 0.08 |  |
| 136 | Nautilus | -0.08 | 0.00 | 0.08 |  |
| 137 | Tryndamere | -0.08 | 0.00 | 0.08 |  |
| 138 | Jhin | -0.10 | 0.15 | 0.25 |  |
| 139 | Vel'Koz | -0.10 | 0.13 | 0.23 |  |
| 140 | Diana | -0.10 | 0.00 | 0.10 |  |
| 141 | Kassadin | -0.10 | 0.00 | 0.10 |  |
| 142 | Sejuani | -0.10 | 0.00 | 0.10 |  |
| 143 | Mordekaiser | -0.11 | 0.05 | 0.16 |  |
| 144 | Kha'Zix | -0.11 | 0.00 | 0.11 |  |
| 145 | Leona | -0.11 | 0.00 | 0.11 |  |
| 146 | Locke | -0.11 | 0.00 | 0.11 |  |
| 147 | Renekton | -0.11 | 0.00 | 0.11 |  |
| 148 | Pantheon | -0.13 | 0.40 | 0.53 |  |
| 149 | Twisted Fate | -0.14 | 0.21 | 0.35 |  |
| 150 | Pyke | -0.14 | 0.00 | 0.14 |  |
| 151 | Xerath | -0.16 | 0.13 | 0.29 |  |
| 152 | Darius | -0.16 | 0.00 | 0.16 |  |
| 153 | Trundle | -0.16 | 0.00 | 0.16 |  |
| 154 | Yorick | -0.16 | 0.00 | 0.16 |  |
| 155 | Katarina | -0.17 | 0.12 | 0.29 |  |
| 156 | Janna | -0.18 | 0.20 | 0.38 |  |
| 157 | Taric | -0.19 | 0.00 | 0.19 |  |
| 158 | Vi | -0.21 | 0.08 | 0.29 |  |
| 159 | Karthus | -0.21 | 0.07 | 0.28 |  |
| 160 | Gragas | -0.21 | 0.00 | 0.21 |  |
| 161 | Ryze | -0.22 | 0.13 | 0.35 |  |
| 162 | Blitzcrank | -0.22 | 0.00 | 0.22 |  |
| 163 | Cho'Gath | -0.22 | 0.00 | 0.22 |  |
| 164 | Dr. Mundo | -0.22 | 0.00 | 0.22 |  |
| 165 | Rumble | -0.22 | 0.00 | 0.22 |  |
| 166 | Fiddlesticks | -0.25 | 0.09 | 0.34 |  |
| 167 | Nunu & Willump | -0.28 | 0.28 | 0.56 |  |
| 168 | Shen | -0.30 | 0.22 | 0.52 |  |
| 169 | Tahm Kench | -0.33 | 0.00 | 0.33 |  |
| 170 | Taliyah | -0.35 | 0.13 | 0.48 |  |
| 171 | Naafiri | -0.43 | 0.00 | 0.43 |  |
| 172 | Galio | -0.60 | 0.00 | 0.60 |  |
