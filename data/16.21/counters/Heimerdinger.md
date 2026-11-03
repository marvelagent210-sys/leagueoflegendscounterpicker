# Counters to Heimerdinger (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Heimerdinger: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Heimerdinger wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Heimerdinger --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 2 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 3 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 4 | Sylas | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 5 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 6 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.12 |
| 7 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 8 | Kassadin | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 9 | Lillia | +0.78 | +1.00 | +1.00 | +0.98 | −0.09 | +1.00 | +0.00 |
| 10 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 11 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 12 | Milio | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 13 | Gnar | +0.76 | +1.00 | +1.00 | +1.00 | −0.06 | +0.73 | +0.00 |
| 14 | Yasuo | +0.75 | +0.99 | +0.98 | +0.97 | −0.21 | +0.91 | +0.00 |
| 15 | Zac | +0.64 | +0.45 | +1.00 | +0.98 | −0.11 | +1.00 | +0.00 |
| 16 | Darius | +0.64 | +1.00 | +1.00 | +0.33 | −0.19 | +1.00 | +0.00 |
| 17 | Maokai | +0.56 | +0.14 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 18 | Mordekaiser | +0.56 | +0.92 | +0.70 | +0.72 | −0.10 | +0.31 | +0.00 |
| 19 | Renekton | +0.55 | +0.03 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 20 | Master Yi | +0.43 | +1.00 | +1.00 | −1.00 | −0.11 | +1.00 | +1.00 |
| 21 | Aphelios | +0.41 | +1.00 | +1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 22 | Poppy | +0.40 | +1.00 | +1.00 | −0.99 | −0.01 | +1.00 | +0.00 |
| 23 | Gangplank | +0.40 | +1.00 | +1.00 | −1.00 | −0.01 | +1.00 | +0.00 |
| 24 | Lee Sin | +0.39 | +1.00 | +1.00 | −1.00 | −0.04 | +1.00 | +0.00 |
| 25 | Irelia | +0.39 | +1.00 | +1.00 | −0.98 | −0.07 | +1.00 | +0.00 |
| 26 | Warwick | +0.39 | +1.00 | +1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 27 | Zaahen | +0.39 | +1.00 | +1.00 | −0.99 | −0.08 | +1.00 | +0.00 |
| 28 | Camille | +0.38 | +1.00 | +1.00 | −1.00 | −0.12 | +1.00 | +0.00 |
| 29 | Nocturne | +0.38 | +1.00 | +1.00 | −1.00 | −0.16 | +1.00 | +0.00 |
| 30 | Shyvana | +0.38 | +1.00 | +1.00 | −1.00 | −0.16 | +1.00 | +0.00 |
| 31 | Rammus | +0.37 | +1.00 | +1.00 | −1.00 | −0.18 | +1.00 | +0.00 |
| 32 | Kayle | +0.35 | +1.00 | +1.00 | −1.00 | +0.12 | – | +0.00 |
| 33 | Sivir | +0.32 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 34 | Twitch | +0.32 | +1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 35 | Kog'Maw | +0.32 | +1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 36 | Swain | +0.32 | +1.00 | +1.00 | −1.00 | −0.08 | – | +0.00 |
| 37 | K'Sante | +0.27 | +1.00 | −1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 38 | Nilah | +0.26 | +1.00 | +0.79 | −0.94 | −0.05 | +0.11 | +0.00 |
| 39 | Rumble | +0.24 | +1.00 | +1.00 | −1.00 | −0.09 | −0.49 | +0.00 |
| 40 | Galio | +0.22 | +0.26 | +0.25 | +0.13 | +0.09 | +0.55 | +0.00 |
| 41 | Gragas | +0.22 | +0.04 | +0.02 | +1.00 | −0.01 | +0.06 | +0.00 |
| 42 | Annie | +0.22 | +0.64 | +1.00 | −1.00 | −0.09 | – | +0.00 |
| 43 | Skarner | +0.21 | −0.12 | −0.13 | +0.96 | −0.12 | +1.00 | +0.00 |
| 44 | Amumu | +0.21 | +0.88 | +0.52 | −0.78 | −0.14 | +0.35 | +0.00 |
| 45 | Sejuani | +0.21 | +0.64 | +0.32 | −0.64 | −0.03 | +1.00 | +0.00 |
| 46 | Corki | +0.20 | +0.10 | −0.33 | +0.86 | +0.04 | +0.76 | +0.00 |
| 47 | Locke | +0.20 | +1.00 | +1.00 | −1.00 | −0.10 | −0.90 | +0.00 |
| 48 | Xin Zhao | +0.19 | +0.53 | +0.74 | −1.00 | −0.17 | +1.00 | +0.00 |
| 49 | Gwen | +0.17 | +1.00 | +1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 50 | Briar | +0.17 | +1.00 | +1.00 | −1.00 | −0.28 | −0.86 | +0.00 |
| 51 | Kled | +0.10 | +0.94 | +0.73 | −1.00 | −0.14 | −1.00 | +0.00 |
| 52 | Diana | +0.04 | +0.01 | +0.11 | −0.03 | +0.07 | +0.07 | +0.00 |
| 53 | Sett | +0.00 | +0.01 | +0.03 | +0.04 | −0.14 | +0.05 | +0.00 |
| 54 | Tahm Kench | −0.00 | +0.04 | +0.04 | −0.00 | −0.10 | −0.06 | +0.00 |
| 55 | Alistar | −0.01 | −0.11 | −0.17 | −0.10 | −0.11 | +1.00 | +0.00 |
| 56 | Udyr | −0.03 | −0.67 | +1.00 | −0.94 | −0.18 | +1.00 | +0.00 |
| 57 | Ezreal | −0.04 | +0.15 | +0.13 | −0.61 | −0.06 | +0.15 | +0.00 |
| 58 | Pantheon | −0.07 | +0.05 | −0.77 | +1.00 | −0.10 | −0.78 | +0.00 |
| 59 | Taric | −0.09 | −0.13 | −0.11 | −0.02 | −0.12 | −0.12 | +0.00 |
| 60 | Ryze | −0.10 | −0.42 | +0.89 | −1.00 | −0.03 | – | +0.00 |
| 61 | Tryndamere | −0.12 | −1.00 | +1.00 | −1.00 | −0.11 | +1.00 | +0.00 |
| 62 | Olaf | −0.12 | −0.98 | +0.99 | −1.00 | −0.11 | +0.93 | +0.00 |
| 63 | Braum | −0.12 | −0.12 | −0.12 | −0.18 | −0.04 | −0.22 | +0.00 |
| 64 | Vladimir | −0.14 | −0.45 | −0.01 | −0.04 | −0.08 | −0.02 | +0.00 |
| 65 | Kayn | −0.14 | −0.56 | −0.69 | +1.00 | −0.34 | +0.26 | +0.00 |
| 66 | Graves | −0.14 | −0.62 | +0.74 | −0.91 | −0.14 | +0.33 | +0.00 |
| 67 | Nunu & Willump | −0.16 | −0.16 | −0.09 | −0.46 | −0.05 | −0.02 | +0.00 |
| 68 | Naafiri | −0.18 | −0.91 | −0.95 | +1.00 | −0.08 | +1.00 | +0.00 |
| 69 | Malphite | −0.21 | −0.85 | +1.00 | −0.66 | −0.09 | −0.98 | +0.00 |
| 70 | Jhin | −0.22 | +0.91 | −0.88 | −1.00 | −0.04 | – | +0.00 |
| 71 | Anivia | −0.22 | −0.10 | −0.91 | +0.14 | −0.14 | +0.21 | +0.00 |
| 72 | Ornn | −0.23 | −0.07 | −0.17 | −0.62 | −0.15 | −0.28 | +0.00 |
| 73 | Zeri | −0.26 | −1.00 | +1.00 | −1.00 | −0.22 | – | +0.00 |
| 74 | Volibear | −0.27 | −0.61 | +0.20 | −1.00 | −0.25 | +0.74 | +0.00 |
| 75 | Shen | −0.27 | −0.23 | −0.02 | −0.92 | −0.02 | −0.22 | +0.00 |
| 76 | Miss Fortune | −0.30 | −1.00 | +1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 77 | Wukong | −0.30 | −1.00 | +1.00 | −1.00 | −0.29 | −0.59 | +0.00 |
| 78 | Urgot | −0.32 | −0.04 | −0.03 | −1.00 | −0.05 | −1.00 | +0.00 |
| 79 | Blitzcrank | −0.38 | −0.29 | −0.26 | −1.00 | −0.05 | −0.32 | +0.00 |
| 80 | Vi | −0.48 | −1.00 | +0.34 | −1.00 | −0.12 | −1.00 | +0.00 |
| 81 | Cho'Gath | −0.51 | −0.95 | −0.10 | −0.99 | −0.13 | −0.27 | +0.00 |
| 82 | Fizz | −0.51 | −0.96 | +0.11 | −0.98 | −0.08 | −0.95 | +0.00 |
| 83 | Rakan | −0.53 | −1.00 | +0.27 | −1.00 | −0.30 | −1.00 | +0.00 |
| 84 | Rek'Sai | −0.54 | −0.64 | −1.00 | −0.99 | −0.22 | +1.00 | +0.00 |
| 85 | Rengar | −0.56 | −1.00 | −1.00 | −1.00 | +0.29 | +1.00 | +0.00 |
| 86 | Akali | −0.56 | −0.97 | −0.06 | −1.00 | −0.05 | −0.96 | +0.00 |
| 87 | Singed | −0.57 | −1.00 | −0.04 | −1.00 | −0.13 | −0.92 | +0.00 |
| 88 | Sion | −0.58 | −0.76 | −0.33 | −1.00 | −0.16 | −0.84 | +0.00 |
| 89 | Ambessa | −0.60 | −0.85 | −0.85 | −1.00 | −0.20 | +0.57 | +0.00 |
| 90 | Illaoi | −0.60 | −0.66 | −0.62 | −1.00 | −0.13 | −0.63 | +0.00 |
| 91 | Rell | −0.61 | −1.00 | −0.28 | −1.00 | +0.08 | −1.00 | +0.00 |
| 92 | Jinx | −0.61 | −1.00 | −1.00 | −1.00 | −0.07 | +1.00 | +0.00 |
| 93 | Riven | −0.61 | −1.00 | −1.00 | −1.00 | −0.07 | +1.00 | +0.00 |
| 94 | Aatrox | −0.61 | −0.82 | −0.80 | −1.00 | −0.17 | +0.18 | +0.00 |
| 95 | Tristana | −0.61 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 96 | Janna | −0.65 | −0.55 | −1.00 | −1.00 | −0.03 | −0.55 | +0.00 |
| 97 | Nidalee | −0.71 | −0.72 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 98 | Vayne | −0.72 | −0.74 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 99 | Lulu | −0.73 | −1.00 | −0.81 | −1.00 | −0.02 | – | +0.00 |
| 100 | Malzahar | −0.73 | −0.88 | −0.94 | −1.00 | −0.00 | – | +0.00 |
| 101 | Viego | −0.73 | −0.84 | −0.79 | −1.00 | −0.25 | −0.84 | +0.00 |
| 102 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.27 | – | +0.00 |
| 103 | Syndra | −0.74 | −1.00 | −0.89 | −1.00 | +0.03 | – | +0.00 |
| 104 | Aurora | −0.76 | −0.90 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 105 | Vel'Koz | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 106 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 107 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 108 | Xayah | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 109 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 110 | Karma | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 111 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 112 | Zilean | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 113 | Hwei | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 114 | Fiddlesticks | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 115 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 116 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 117 | Azir | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 118 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 119 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 120 | Varus | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 121 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 122 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 123 | Twisted Fate | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 124 | Neeko | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 125 | Kennen | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 126 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 127 | Draven | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 128 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 129 | Brand | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 130 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 131 | Samira | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 132 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 133 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 134 | Orianna | −0.79 | −0.94 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 135 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 136 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 137 | Teemo | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 138 | Karthus | −0.79 | −0.97 | −0.97 | −1.00 | −0.04 | −1.00 | +0.00 |
| 139 | Quinn | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 140 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 141 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 142 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 143 | Bel'Veth | −0.80 | −1.00 | −0.96 | −0.94 | −0.24 | −0.82 | +0.00 |
| 144 | Kalista | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 145 | Lucian | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 146 | Ivern | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 147 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 148 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 149 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 150 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 151 | Yone | −0.80 | −0.90 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 152 | Hecarim | −0.80 | −0.98 | −0.97 | −1.00 | −0.09 | −1.00 | +0.00 |
| 153 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 154 | Ashe | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 155 | Yunara | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 156 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 157 | Talon | −0.81 | −1.00 | −0.85 | −1.00 | −0.29 | −1.00 | +0.00 |
| 158 | Lissandra | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 159 | Leona | −0.81 | −0.99 | −0.99 | −1.00 | −0.09 | −0.99 | +0.00 |
| 160 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 161 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 162 | Shaco | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 163 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 164 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 165 | Zed | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 166 | Morgana | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 167 | Kindred | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 168 | Jarvan IV | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 169 | Kha'Zix | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −0.96 | +0.00 |
| 170 | Ekko | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 171 | Katarina | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 172 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Heimerdinger's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Heimerdinger's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Heimerdinger` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Braum (net +0.94)

- **0.70** projectile block: Unbreakable blocks Heimerdinger's CH-2 Electron Storm Grenade, a projectile. Unbreakable for 4 s, long enough to use ahead of CH-2 Electron Storm Grenade. (Braum E Unbreakable → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.70** projectile block: Unbreakable blocks Heimerdinger's CH-3X Lightning Grenade, a projectile. Unbreakable for 4 s, long enough to use ahead of CH-3X Lightning Grenade. (Braum E Unbreakable → Heimerdinger E CH-3X Lightning Grenade)
- **0.45** projectile block: Unbreakable blocks Heimerdinger's H-28G Evolution Turret, a projectile. Unbreakable for 4 s, long enough to use ahead of H-28G Evolution Turret. (Braum E Unbreakable → Heimerdinger Q H-28G Evolution Turret)
- Watch out: Heimerdinger's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 2. Samira (net +0.90)

- **0.49** projectile block: Blade Whirl blocks Heimerdinger's CH-2 Electron Storm Grenade, a projectile. Blade Whirl for 0.75 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. (Samira W Blade Whirl → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.49** projectile block: Blade Whirl blocks Heimerdinger's CH-3X Lightning Grenade, a projectile. Blade Whirl for 0.75 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. (Samira W Blade Whirl → Heimerdinger E CH-3X Lightning Grenade)
- **0.43** projectile block: Blade Whirl blocks Heimerdinger's H-28G Evolution Turret, a projectile. Blade Whirl for 0.75 s; H-28G Evolution Turret takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Heimerdinger Q H-28G Evolution Turret)

#### 3. Yasuo (net +0.88)

- **0.55** projectile block: Wind Wall blocks Heimerdinger's CH-2 Electron Storm Grenade, a projectile. Wind Wall for 4 s, long enough to use ahead of CH-2 Electron Storm Grenade. (Yasuo W Wind Wall → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.55** projectile block: Wind Wall blocks Heimerdinger's CH-3X Lightning Grenade, a projectile. Wind Wall for 4 s, long enough to use ahead of CH-3X Lightning Grenade. (Yasuo W Wind Wall → Heimerdinger E CH-3X Lightning Grenade)
- **0.45** projectile block: Wind Wall blocks Heimerdinger's H-28G Evolution Turret, a projectile. Wind Wall for 4 s, long enough to use ahead of H-28G Evolution Turret. (Yasuo W Wind Wall → Heimerdinger Q H-28G Evolution Turret)
- Watch out: Heimerdinger's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 4. Fizz (net +0.84)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Heimerdinger's CH-2 Electron Storm Grenade. Untargetable for 0.75 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. (Fizz E Playful → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Heimerdinger's CH-3X Lightning Grenade. Untargetable for 0.75 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. (Fizz E Playful → Heimerdinger E CH-3X Lightning Grenade)
- Watch out: Heimerdinger's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 5. Sivir (net +0.81)

- **0.54** spell shield: Spell Shield's spell shield blocks Heimerdinger's CH-2 Electron Storm Grenade. Spell shield for 1.5 s, long enough to use ahead of CH-2 Electron Storm Grenade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.54** spell shield: Spell Shield's spell shield blocks Heimerdinger's CH-3X Lightning Grenade. Spell shield for 1.5 s, long enough to use ahead of CH-3X Lightning Grenade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Heimerdinger E CH-3X Lightning Grenade)

#### 6. Udyr (net +0.79)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Heimerdinger's CH-2 Electron Storm Grenade (slow, stun). Immune for 1.5 s, long enough to use ahead of CH-2 Electron Storm Grenade. (Udyr E Blazing Stampede → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Heimerdinger's CH-3X Lightning Grenade (slow, stun). Immune for 1.5 s, long enough to use ahead of CH-3X Lightning Grenade. (Udyr E Blazing Stampede → Heimerdinger E CH-3X Lightning Grenade)
- Watch out: Heimerdinger's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

#### 7. Mel (net +0.77)

- **0.46** projectile block: Rebuttal blocks Heimerdinger's CH-2 Electron Storm Grenade, a projectile. Rebuttal for 0.75 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. (Mel W Rebuttal → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.46** projectile block: Rebuttal blocks Heimerdinger's CH-3X Lightning Grenade, a projectile. Rebuttal for 0.75 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. (Mel W Rebuttal → Heimerdinger E CH-3X Lightning Grenade)
- **0.39** projectile block: Rebuttal blocks Heimerdinger's H-28G Evolution Turret, a projectile. Rebuttal for 0.75 s; H-28G Evolution Turret takes 0.25 s to land, enough to react. (Mel W Rebuttal → Heimerdinger Q H-28G Evolution Turret)
- Watch out: H-28G Evolution Turret makes Heimerdinger immune to Mel's Solar Snare (slow).

#### 8. Maokai (net +0.75)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Heimerdinger's CH-2 Electron Storm Grenade. Untargetable for 1.4 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. (Maokai W Twisted Advance → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Heimerdinger's CH-3X Lightning Grenade. Untargetable for 1.4 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. (Maokai W Twisted Advance → Heimerdinger E CH-3X Lightning Grenade)
- Watch out: Heimerdinger's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 9. Fiora (net +0.74)

- **0.67** parry: Riposte parries Heimerdinger's CH-2 Electron Storm Grenade and stuns back. Parry for 0.75 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. Negating CH-2 Electron Storm Grenade's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.67** parry: Riposte parries Heimerdinger's CH-3X Lightning Grenade and stuns back. Parry for 0.75 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. Negating CH-3X Lightning Grenade's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Heimerdinger E CH-3X Lightning Grenade)
- **0.05** attack speed slow: Riposte cuts Heimerdinger's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Heimerdinger basic attacks)
- Watch out: Heimerdinger's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 10. Nocturne (net +0.72)

- **0.66** spell shield: Shroud of Darkness's spell shield blocks Heimerdinger's CH-2 Electron Storm Grenade. Spell shield for 1.5 s, long enough to use ahead of CH-2 Electron Storm Grenade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.66** spell shield: Shroud of Darkness's spell shield blocks Heimerdinger's CH-3X Lightning Grenade. Spell shield for 1.5 s, long enough to use ahead of CH-3X Lightning Grenade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Heimerdinger E CH-3X Lightning Grenade)
- Watch out: Heimerdinger's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Braum | +0.94 | 1.25 | 0.31 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 2 | Samira | +0.90 | 0.90 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 3 | Yasuo | +0.88 | 1.00 | 0.12 | projectile block (Wind Wall), projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Fizz | +0.84 | 1.05 | 0.21 |  |
| 5 | Sivir | +0.81 | 0.81 | 0.00 |  |
| 6 | Udyr | +0.79 | 1.05 | 0.26 |  |
| 7 | Mel | +0.77 | 0.84 | 0.07 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 8 | Maokai | +0.75 | 1.05 | 0.30 |  |
| 9 | Fiora | +0.74 | 1.02 | 0.28 |  |
| 10 | Nocturne | +0.72 | 0.99 | 0.27 |  |
| 11 | Morgana | +0.70 | 0.86 | 0.16 |  |
| 12 | Gwen | +0.55 | 0.81 | 0.26 |  |
| 13 | Vladimir | +0.52 | 0.86 | 0.34 |  |
| 14 | Xayah | +0.50 | 0.50 | 0.00 |  |
| 15 | Bard | +0.44 | 0.51 | 0.07 |  |
| 16 | Aurora | +0.40 | 0.50 | 0.10 |  |
| 17 | Lissandra | +0.39 | 0.51 | 0.12 |  |
| 18 | Rek'Sai | +0.39 | 0.51 | 0.12 |  |
| 19 | Zaahen | +0.39 | 0.51 | 0.12 |  |
| 20 | Milio | +0.38 | 0.45 | 0.07 |  |
| 21 | Rengar | +0.37 | 0.84 | 0.47 |  |
| 22 | Master Yi | +0.35 | 0.96 | 0.61 |  |
| 23 | Camille | +0.35 | 0.50 | 0.15 |  |
| 24 | Kayle | +0.35 | 0.40 | 0.05 |  |
| 25 | Kled | +0.33 | 0.48 | 0.15 |  |
| 26 | Kalista | +0.33 | 0.38 | 0.05 |  |
| 27 | Evelynn | +0.31 | 0.51 | 0.20 |  |
| 28 | Zed | +0.31 | 0.50 | 0.19 |  |
| 29 | Shaco | +0.28 | 0.51 | 0.23 |  |
| 30 | Gangplank | +0.25 | 0.74 | 0.49 |  |
| 31 | Alistar | +0.21 | 0.41 | 0.20 |  |
| 32 | Tristana | +0.21 | 0.27 | 0.06 |  |
| 33 | Teemo | +0.20 | 0.26 | 0.06 |  |
| 34 | Garen | +0.11 | 0.48 | 0.37 |  |
| 35 | Yuumi | +0.10 | 1.05 | 0.95 |  |
| 36 | Annie | +0.08 | 0.08 | 0.00 |  |
| 37 | Lulu | +0.07 | 0.19 | 0.12 |  |
| 38 | Olaf | +0.06 | 0.51 | 0.45 |  |
| 39 | Jax | +0.01 | 0.21 | 0.20 |  |
| 40 | Corki | 0.00 | 0.00 | 0.00 |  |
| 41 | Elise | 0.00 | 0.00 | 0.00 |  |
| 42 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 43 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 44 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 45 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 46 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 47 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 48 | Sona | 0.00 | 0.00 | 0.00 |  |
| 49 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 50 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 51 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 52 | Aphelios | -0.01 | 0.11 | 0.12 |  |
| 53 | Ashe | -0.03 | 0.00 | 0.03 |  |
| 54 | Azir | -0.05 | 0.00 | 0.05 |  |
| 55 | Kindred | -0.05 | 0.00 | 0.05 |  |
| 56 | Kog'Maw | -0.05 | 0.00 | 0.05 |  |
| 57 | Lux | -0.05 | 0.00 | 0.05 |  |
| 58 | Orianna | -0.05 | 0.00 | 0.05 |  |
| 59 | Renata Glasc | -0.05 | 0.00 | 0.05 |  |
| 60 | Senna | -0.05 | 0.00 | 0.05 |  |
| 61 | Twitch | -0.05 | 0.00 | 0.05 |  |
| 62 | Zeri | -0.05 | 0.00 | 0.05 |  |
| 63 | Ziggs | -0.05 | 0.00 | 0.05 |  |
| 64 | Zilean | -0.05 | 0.00 | 0.05 |  |
| 65 | Xin Zhao | -0.06 | 0.24 | 0.30 |  |
| 66 | Nilah | -0.06 | 0.18 | 0.24 |  |
| 67 | Brand | -0.06 | 0.00 | 0.06 |  |
| 68 | Jayce | -0.06 | 0.00 | 0.06 |  |
| 69 | Jinx | -0.06 | 0.00 | 0.06 |  |
| 70 | Soraka | -0.06 | 0.00 | 0.06 |  |
| 71 | Ahri | -0.07 | 0.00 | 0.07 |  |
| 72 | Draven | -0.07 | 0.00 | 0.07 |  |
| 73 | Viktor | -0.07 | 0.00 | 0.07 |  |
| 74 | Zoe | -0.07 | 0.00 | 0.07 |  |
| 75 | Karma | -0.08 | 0.00 | 0.08 |  |
| 76 | Nami | -0.08 | 0.00 | 0.08 |  |
| 77 | Yunara | -0.08 | 0.00 | 0.08 |  |
| 78 | Graves | -0.09 | 0.00 | 0.09 |  |
| 79 | Smolder | -0.09 | 0.00 | 0.09 |  |
| 80 | Swain | -0.09 | 0.00 | 0.09 |  |
| 81 | Vex | -0.09 | 0.00 | 0.09 |  |
| 82 | Yone | -0.09 | 0.00 | 0.09 |  |
| 83 | Syndra | -0.10 | 0.00 | 0.10 |  |
| 84 | Anivia | -0.11 | 0.00 | 0.11 |  |
| 85 | Cassiopeia | -0.11 | 0.00 | 0.11 |  |
| 86 | Malphite | -0.12 | 0.13 | 0.25 |  |
| 87 | Hwei | -0.12 | 0.00 | 0.12 |  |
| 88 | Wukong | -0.12 | 0.00 | 0.12 |  |
| 89 | Rell | -0.12 | 0.00 | 0.12 |  |
| 90 | Seraphine | -0.12 | 0.00 | 0.12 |  |
| 91 | Gnar | -0.13 | 0.00 | 0.13 |  |
| 92 | Riven | -0.13 | 0.00 | 0.13 |  |
| 93 | Thresh | -0.13 | 0.00 | 0.13 |  |
| 94 | Jarvan IV | -0.14 | 0.00 | 0.14 |  |
| 95 | Sylas | -0.14 | 0.00 | 0.14 |  |
| 96 | Rakan | -0.16 | 0.00 | 0.16 |  |
| 97 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 98 | K'Sante | -0.18 | 0.00 | 0.18 |  |
| 99 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 100 | Talon | -0.18 | 0.00 | 0.18 |  |
| 101 | Akali | -0.19 | 0.00 | 0.19 |  |
| 102 | Amumu | -0.20 | 0.00 | 0.20 |  |
| 103 | Qiyana | -0.20 | 0.00 | 0.20 |  |
| 104 | Renekton | -0.20 | 0.00 | 0.20 |  |
| 105 | Ekko | -0.21 | 0.00 | 0.21 |  |
| 106 | Urgot | -0.21 | 0.00 | 0.21 |  |
| 107 | Sion | -0.22 | 0.54 | 0.76 |  |
| 108 | Hecarim | -0.22 | 0.00 | 0.22 |  |
| 109 | Lillia | -0.22 | 0.00 | 0.22 |  |
| 110 | Briar | -0.23 | 0.00 | 0.23 |  |
| 111 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 112 | Aurelion Sol | -0.24 | 0.00 | 0.24 |  |
| 113 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 114 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 115 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 116 | Nasus | -0.25 | 0.20 | 0.45 |  |
| 117 | Illaoi | -0.25 | 0.00 | 0.25 |  |
| 118 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 119 | Volibear | -0.25 | 0.00 | 0.25 |  |
| 120 | Ornn | -0.26 | 0.00 | 0.26 |  |
| 121 | Bel'Veth | -0.27 | 0.00 | 0.27 |  |
| 122 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 123 | Varus | -0.27 | 0.00 | 0.27 |  |
| 124 | Malzahar | -0.28 | 0.52 | 0.80 |  |
| 125 | Diana | -0.28 | 0.00 | 0.28 |  |
| 126 | Leona | -0.28 | 0.00 | 0.28 |  |
| 127 | Locke | -0.29 | 0.00 | 0.29 |  |
| 128 | Sejuani | -0.31 | 0.00 | 0.31 |  |
| 129 | Shyvana | -0.33 | 0.00 | 0.33 |  |
| 130 | Sett | -0.34 | 0.00 | 0.34 |  |
| 131 | Skarner | -0.36 | 0.14 | 0.50 |  |
| 132 | Ivern | -0.37 | 0.00 | 0.37 |  |
| 133 | Mordekaiser | -0.38 | 0.05 | 0.43 |  |
| 134 | Blitzcrank | -0.40 | 0.00 | 0.40 |  |
| 135 | Taric | -0.40 | 0.00 | 0.40 |  |
| 136 | Yorick | -0.42 | 0.00 | 0.42 |  |
| 137 | Caitlyn | -0.44 | 0.18 | 0.62 |  |
| 138 | Quinn | -0.45 | 0.00 | 0.45 |  |
| 139 | Singed | -0.45 | 0.00 | 0.45 |  |
| 140 | Dr. Mundo | -0.46 | 0.00 | 0.46 |  |
| 141 | Darius | -0.47 | 0.00 | 0.47 |  |
| 142 | Trundle | -0.47 | 0.00 | 0.47 |  |
| 143 | Rumble | -0.49 | 0.00 | 0.49 |  |
| 144 | Cho'Gath | -0.50 | 0.00 | 0.50 |  |
| 145 | Pyke | -0.50 | 0.00 | 0.50 |  |
| 146 | Gragas | -0.55 | 0.00 | 0.55 |  |
| 147 | Akshan | -0.56 | 0.00 | 0.56 |  |
| 148 | Lucian | -0.56 | 0.00 | 0.56 |  |
| 149 | Kayn | -0.58 | 0.51 | 1.09 |  |
| 150 | Miss Fortune | -0.61 | 0.00 | 0.61 |  |
| 151 | Viego | -0.61 | 0.00 | 0.61 |  |
| 152 | Rammus | -0.63 | 0.20 | 0.83 |  |
| 153 | Jhin | -0.65 | 0.00 | 0.65 |  |
| 154 | Vel'Koz | -0.65 | 0.00 | 0.65 |  |
| 155 | Poppy | -0.66 | 0.00 | 0.66 |  |
| 156 | Xerath | -0.69 | 0.00 | 0.69 |  |
| 157 | Karthus | -0.71 | 0.00 | 0.71 |  |
| 158 | Katarina | -0.76 | 0.00 | 0.76 |  |
| 159 | Ryze | -0.77 | 0.00 | 0.77 |  |
| 160 | Twisted Fate | -0.77 | 0.00 | 0.77 |  |
| 161 | Pantheon | -0.79 | 0.41 | 1.20 |  |
| 162 | Janna | -0.85 | 0.00 | 0.85 |  |
| 163 | Vi | -0.85 | 0.00 | 0.85 |  |
| 164 | Shen | -0.88 | 0.20 | 1.08 |  |
| 165 | Warwick | -0.97 | 0.52 | 1.49 |  |
| 166 | Fiddlesticks | -0.99 | 0.00 | 0.99 |  |
| 167 | Taliyah | -1.06 | 0.00 | 1.06 |  |
| 168 | Naafiri | -1.09 | 0.00 | 1.09 |  |
| 169 | Zac | -1.21 | 0.00 | 1.21 |  |
| 170 | Nunu & Willump | -1.22 | 0.26 | 1.48 |  |
| 171 | Tahm Kench | -1.26 | 0.00 | 1.26 |  |
| 172 | Galio | -1.38 | 0.00 | 1.38 |  |
