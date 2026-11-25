# Counters to Trundle (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Trundle: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Trundle wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Trundle --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | −0.20 |
| 2 | Tahm Kench | +0.80 | +1.00 | +1.00 | +1.00 | +0.17 | +0.89 | −0.28 |
| 3 | Dr. Mundo | +0.77 | +0.99 | +1.00 | +1.00 | −0.01 | – | −0.02 |
| 4 | Taric | +0.76 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.44 |
| 5 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.38 |
| 6 | Tryndamere | +0.73 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.98 |
| 7 | Lulu | +0.58 | +1.00 | +1.00 | +1.00 | +0.17 | −1.00 | −0.98 |
| 8 | Aphelios | +0.39 | +1.00 | +1.00 | −1.00 | +0.21 | +1.00 | −0.85 |
| 9 | Yorick | +0.36 | +0.90 | +1.00 | −1.00 | +0.10 | – | +0.68 |
| 10 | Ivern | +0.27 | +1.00 | +1.00 | −1.00 | +0.18 | −0.11 | −1.00 |
| 11 | Anivia | +0.09 | +0.21 | +0.05 | +0.07 | −0.03 | +0.15 | +0.02 |
| 12 | Karma | −0.01 | +0.41 | +0.35 | −1.00 | +0.08 | +0.13 | −0.44 |
| 13 | Morgana | −0.05 | +0.12 | +0.57 | −1.00 | +0.27 | −0.40 | −0.41 |
| 14 | Zaahen | −0.09 | +1.00 | −1.00 | −0.23 | +0.01 | – | −0.71 |
| 15 | Sion | −0.19 | −0.66 | −0.04 | +0.00 | +0.08 | – | −0.16 |
| 16 | Illaoi | −0.36 | −1.00 | −1.00 | +1.00 | +0.06 | – | −0.72 |
| 17 | Quinn | −0.43 | −1.00 | −1.00 | +1.00 | +0.12 | −1.00 | −1.00 |
| 18 | Azir | −0.60 | −1.00 | −1.00 | −1.00 | +0.11 | +1.00 | −0.26 |
| 19 | Kennen | −0.61 | −1.00 | −1.00 | −1.00 | +0.17 | +0.99 | −0.68 |
| 20 | Zac | −0.71 | −1.00 | −0.76 | −0.78 | −0.02 | – | −0.80 |
| 21 | Jarvan IV | −0.72 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.53 |
| 22 | Ambessa | −0.72 | −1.00 | −1.00 | −1.00 | +0.37 | −1.00 | +0.46 |
| 23 | Zeri | −0.72 | −1.00 | −1.00 | −1.00 | +0.13 | +0.00 | −0.82 |
| 24 | Poppy | −0.73 | −1.00 | −1.00 | −1.00 | +0.29 | – | +0.06 |
| 25 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.42 | – | −0.39 |
| 26 | Master Yi | −0.74 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.47 |
| 27 | Udyr | −0.74 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.32 |
| 28 | K'Sante | −0.75 | −1.00 | −1.00 | −1.00 | +0.31 | −1.00 | +0.00 |
| 29 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.28 | – | −0.46 |
| 30 | Yasuo | −0.76 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.10 |
| 31 | Kha'Zix | −0.76 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.52 |
| 32 | Nocturne | −0.76 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.30 |
| 33 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 34 | Kayle | −0.77 | −1.00 | −1.00 | −1.00 | +0.53 | −1.00 | −0.93 |
| 35 | Shyvana | −0.77 | −1.00 | −1.00 | −1.00 | +0.16 | – | −0.30 |
| 36 | Sylas | −0.77 | −1.00 | −1.00 | −1.00 | +0.16 | – | −0.33 |
| 37 | Fiora | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 38 | Nilah | −0.77 | −1.00 | −1.00 | −1.00 | +0.28 | – | −0.76 |
| 39 | Lee Sin | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.20 |
| 40 | Aurelion Sol | −0.78 | −1.00 | −1.00 | −1.00 | +0.48 | −1.00 | −1.00 |
| 41 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.30 |
| 42 | Rakan | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.24 |
| 43 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.39 |
| 44 | Kog'Maw | −0.78 | −1.00 | −1.00 | −1.00 | +0.37 | −1.00 | −0.71 |
| 45 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 46 | Vel'Koz | −0.78 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | −0.66 |
| 47 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.20 | – | −0.73 |
| 48 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.14 |
| 49 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.17 |
| 50 | Malphite | −0.79 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.29 |
| 51 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | +0.18 | – | −0.77 |
| 52 | Cho'Gath | −0.79 | −1.00 | −1.00 | −1.00 | +0.24 | – | −0.96 |
| 53 | Neeko | −0.79 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | −0.73 |
| 54 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.15 |
| 55 | Twisted Fate | −0.79 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −0.53 |
| 56 | Diana | −0.79 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.64 |
| 57 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.66 |
| 58 | Milio | −0.79 | −1.00 | −1.00 | −1.00 | +0.38 | −1.00 | −1.00 |
| 59 | Gwen | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.57 |
| 60 | Lillia | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.19 |
| 61 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.54 |
| 62 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.57 |
| 63 | Yone | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.55 |
| 64 | Viego | −0.80 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.78 |
| 65 | Teemo | −0.80 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −0.55 |
| 66 | Ezreal | −0.80 | −0.95 | −1.00 | −1.00 | +0.14 | −1.00 | −0.59 |
| 67 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.73 |
| 68 | Renekton | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.48 |
| 69 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | −0.86 |
| 70 | Kled | −0.80 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.83 |
| 71 | Zilean | −0.80 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −0.66 |
| 72 | Miss Fortune | −0.80 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −0.65 |
| 73 | Aatrox | −0.80 | −1.00 | −1.00 | −1.00 | +0.17 | – | −0.92 |
| 74 | Ornn | −0.80 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.58 |
| 75 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.48 |
| 76 | Sett | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.70 |
| 77 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.62 |
| 78 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.29 |
| 79 | Xin Zhao | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.59 |
| 80 | Gangplank | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.71 |
| 81 | Orianna | −0.80 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −0.71 |
| 82 | Annie | −0.80 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −0.73 |
| 83 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.84 |
| 84 | Nunu & Willump | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.88 |
| 85 | Singed | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.42 |
| 86 | Ashe | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.86 |
| 87 | Jax | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.47 |
| 88 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.86 |
| 89 | Camille | −0.81 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.82 |
| 90 | Elise | −0.81 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.65 |
| 91 | Tristana | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.91 |
| 92 | Zed | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.59 |
| 93 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.51 |
| 94 | Corki | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.93 |
| 95 | Kalista | −0.81 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.94 |
| 96 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.72 |
| 97 | Hwei | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.48 |
| 98 | Maokai | −0.81 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.85 |
| 99 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.74 |
| 100 | Ziggs | −0.81 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −0.92 |
| 101 | Akshan | −0.81 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.73 |
| 102 | Yunara | −0.81 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −0.91 |
| 103 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.90 |
| 104 | Volibear | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.30 |
| 105 | Heimerdinger | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.58 |
| 106 | Varus | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.46 |
| 107 | Lucian | −0.81 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.78 |
| 108 | Vi | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.43 |
| 109 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.41 |
| 110 | Xayah | −0.81 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.92 |
| 111 | Darius | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.86 |
| 112 | Draven | −0.81 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.83 |
| 113 | Soraka | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.67 |
| 114 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.61 |
| 115 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.60 |
| 116 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.75 |
| 117 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −0.99 |
| 118 | Syndra | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.83 |
| 119 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.98 |
| 120 | Nautilus | −0.82 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.67 |
| 121 | Seraphine | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.90 |
| 122 | Lux | −0.82 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.95 |
| 123 | Mordekaiser | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.65 |
| 124 | Warwick | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.81 |
| 125 | Graves | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.90 |
| 126 | Ryze | −0.82 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.97 |
| 127 | Leona | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.32 |
| 128 | Jinx | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.96 |
| 129 | Olaf | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.96 |
| 130 | Wukong | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.60 |
| 131 | Fizz | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.69 |
| 132 | Sona | −0.82 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.86 |
| 133 | Brand | −0.82 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.94 |
| 134 | Caitlyn | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 135 | Mel | −0.82 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.88 |
| 136 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.72 |
| 137 | Veigar | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.70 |
| 138 | Zoe | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.94 |
| 139 | Twitch | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.95 |
| 140 | Janna | −0.83 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.98 |
| 141 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.69 |
| 142 | Jayce | −0.83 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.92 |
| 143 | Gnar | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.97 |
| 144 | Rammus | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.41 |
| 145 | Swain | −0.83 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −1.00 |
| 146 | Bel'Veth | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.96 |
| 147 | Fiddlesticks | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.90 |
| 148 | Sivir | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.93 |
| 149 | Rell | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.77 |
| 150 | Blitzcrank | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.74 |
| 151 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.98 |
| 152 | Galio | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.85 |
| 153 | Malzahar | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.83 |
| 154 | Briar | −0.83 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.94 |
| 155 | Garen | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.93 |
| 156 | Nami | −0.84 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 157 | Rek'Sai | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.97 |
| 158 | Kindred | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −1.00 |
| 159 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.97 |
| 160 | Skarner | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.81 |
| 161 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.72 |
| 162 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.83 |
| 163 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.96 |
| 164 | Jhin | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.92 |
| 165 | LeBlanc | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.96 |
| 166 | Braum | −0.84 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.85 |
| 167 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 168 | Samira | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.92 |
| 169 | Alistar | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.59 |
| 170 | Evelynn | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −1.00 |
| 171 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.96 |
| 172 | Katarina | −0.86 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.90 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Trundle's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Trundle's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Trundle` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.43)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Sivir basic attacks → Trundle basic attacks)
- **0.55** spell shield: Spell Shield's spell shield blocks Trundle's Subjugate. Spell shield for 1.5 s, long enough to use ahead of Subjugate. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Trundle R Subjugate)
- **0.14** spell shield: Spell Shield's spell shield blocks part of Trundle's Chomp. Spell shield for 1.5 s, long enough to use ahead of Chomp. A spell shield blocks only the first enemy ability that reaches it. Chomp will still incur the attack damage increase for Trundle even if the attack is dodged, blocked, missed while he is blinded, or it is blocked by spell shield. Spell shield will only block the attack damage reduction and slow. (Sivir E Spell Shield → Trundle Q Chomp)

#### 2. Bard (net +1.41)

- **0.62** range: Bard's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Bard basic attacks → Trundle basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Trundle's Subjugate. Untargetable for 2.5 s, long enough to use ahead of Subjugate. (Bard R Tempered Fate → Trundle R Subjugate)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2.5 s, long enough to use ahead of Pillar of Ice. (Bard R Tempered Fate → Trundle E Pillar of Ice)

#### 3. Xayah (net +1.38)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Trundle's (525 vs 175 attack range). Trundle has no dash or blink to close the gap. (Xayah basic attacks → Trundle basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Trundle's Subjugate. Untargetable for 1.5 s, long enough to use ahead of Subjugate. (Xayah R Featherstorm → Trundle R Subjugate)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Trundle's Pillar of Ice. Untargetable for 1.5 s, long enough to use ahead of Pillar of Ice. (Xayah R Featherstorm → Trundle E Pillar of Ice)

#### 4. Kayle (net +1.33)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Trundle's (625 vs 175 attack range). Trundle has no dash or blink to close the gap. (Kayle basic attacks → Trundle basic attacks)
- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Trundle's Subjugate. Invulnerable for 2.5 s, long enough to use ahead of Subjugate. (Kayle R Divine Judgment → Trundle R Subjugate)
- **0.12** invulnerable: Divine Judgment makes Kayle invulnerable to Trundle's Chomp (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Chomp. (Kayle R Divine Judgment → Trundle Q Chomp)

#### 5. Vladimir (net +1.25)

- **0.67** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2 s, long enough to use ahead of Pillar of Ice. (Vladimir W Sanguine Pool → Trundle E Pillar of Ice)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Trundle's Subjugate. Untargetable for 2 s, long enough to use ahead of Subjugate. (Vladimir W Sanguine Pool → Trundle R Subjugate)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Trundle's (450 vs 175 attack range). Trundle has no dash or blink to close the gap. (Vladimir basic attacks → Trundle basic attacks)
- Watch out: Pillar of Ice's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Aurora (net +1.23)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Trundle's (550 vs 175 attack range). Trundle has no dash or blink to close the gap. (Aurora basic attacks → Trundle basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Trundle's Subjugate. Untargetable for 0.4 s; Subjugate takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Trundle R Subjugate)
- **0.34** untargetable: Between Worlds makes Aurora untargetable, dodging Trundle's Pillar of Ice. Untargetable for 0.4 s; Pillar of Ice takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Trundle E Pillar of Ice)

#### 7. Teemo (net +1.22)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Teemo basic attacks → Trundle basic attacks)
- **0.54** blind: Blinding Dart's blind makes Trundle's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Trundle basic attacks)
- **0.18** blind: Blinding Dart's blind makes Trundle's Chomp, an empowered attack, miss. Blind for 3 s. Chomp will still incur the attack damage increase for Trundle even if the attack is dodged, blocked, missed while he is blinded, or it is blocked by spell shield. Spell shield will only block the attack damage reduction and slow. (Teemo Q Blinding Dart → Trundle Q Chomp)

#### 8. Yuumi (net +1.21)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Trundle's Pillar of Ice. Untargetable for ?; Pillar of Ice takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Trundle E Pillar of Ice)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Trundle's Subjugate. Untargetable for ?; Subjugate takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Trundle R Subjugate)
- **0.54** range: Yuumi's basic attacks reach 250 units farther than Trundle's (425 vs 175 attack range). Trundle has no dash or blink to close the gap. (Yuumi basic attacks → Trundle basic attacks)
- Watch out: Pillar of Ice's airborne interrupts Yuumi's Final Chapter (normal channel).

#### 9. Lissandra (net +1.20)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Trundle's Subjugate. Untargetable for 2.5 s, long enough to use ahead of Subjugate. (Lissandra R Frozen Tomb → Trundle R Subjugate)
- **0.41** range: Lissandra's basic attacks reach 375 units farther than Trundle's (550 vs 175 attack range). Trundle has no dash or blink to close the gap. (Lissandra basic attacks → Trundle basic attacks)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2.5 s, long enough to use ahead of Pillar of Ice. (Lissandra R Frozen Tomb → Trundle E Pillar of Ice)

#### 10. Fiora (net +1.10)

- **0.77** parry: Riposte parries Trundle's Pillar of Ice and stuns back. Parry for 0.75 s; Pillar of Ice takes 0.25 s to land, enough to react. Negating Pillar of Ice's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Trundle E Pillar of Ice)
- **0.55** parry: Riposte parries Trundle's Subjugate. Parry for 0.75 s; Subjugate takes 0.25 s to land, enough to react. (Fiora W Riposte → Trundle R Subjugate)
- **0.18** parry: Riposte parries Trundle's Chomp. Parry for 0.75 s; Chomp lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Trundle Q Chomp)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.43 | 1.43 | 0.00 | range (attacks) |
| 2 | Bard | +1.41 | 1.41 | 0.00 | range (attacks) |
| 3 | Xayah | +1.38 | 1.38 | 0.00 | range (attacks) |
| 4 | Kayle | +1.33 | 1.33 | 0.00 | range (attacks) |
| 5 | Vladimir | +1.25 | 1.32 | 0.07 |  |
| 6 | Aurora | +1.23 | 1.23 | 0.00 | range (attacks) |
| 7 | Teemo | +1.22 | 1.22 | 0.00 | range (attacks), blind (Blinding Dart) |
| 8 | Yuumi | +1.21 | 1.60 | 0.39 | range (attacks) |
| 9 | Lissandra | +1.20 | 1.20 | 0.00 |  |
| 10 | Fiora | +1.10 | 1.10 | 0.00 |  |
| 11 | Lulu | +1.07 | 1.07 | 0.00 | range (attacks) |
| 12 | Morgana | +1.04 | 1.04 | 0.00 |  |
| 13 | Fizz | +1.03 | 1.03 | 0.00 |  |
| 14 | Maokai | +1.02 | 1.02 | 0.00 |  |
| 15 | Gwen | +0.95 | 0.95 | 0.00 |  |
| 16 | Master Yi | +0.90 | 1.08 | 0.18 |  |
| 17 | Kalista | +0.87 | 0.87 | 0.00 | range (attacks) |
| 18 | Zeri | +0.83 | 0.83 | 0.00 | range (attacks) |
| 19 | Aphelios | +0.82 | 0.82 | 0.00 | range (attacks) |
| 20 | Kindred | +0.81 | 0.81 | 0.00 | range (attacks) |
| 21 | Twitch | +0.81 | 0.81 | 0.00 | range (attacks) |
| 22 | Vayne | +0.81 | 0.81 | 0.00 | range (attacks) |
| 23 | Rek'Sai | +0.80 | 0.80 | 0.00 |  |
| 24 | Milio | +0.78 | 0.78 | 0.00 | range (attacks) |
| 25 | Varus | +0.77 | 0.87 | 0.10 | range (attacks) |
| 26 | Evelynn | +0.77 | 0.77 | 0.00 |  |
| 27 | Shaco | +0.77 | 0.77 | 0.00 |  |
| 28 | Sona | +0.77 | 0.77 | 0.00 | range (attacks) |
| 29 | Udyr | +0.75 | 0.75 | 0.00 |  |
| 30 | Camille | +0.73 | 0.73 | 0.00 |  |
| 31 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 32 | Renata Glasc | +0.72 | 0.72 | 0.00 | range (attacks) |
| 33 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Nocturne | +0.70 | 0.70 | 0.00 |  |
| 36 | Zed | +0.69 | 0.69 | 0.00 |  |
| 37 | Draven | +0.68 | 0.68 | 0.00 | range (attacks) |
| 38 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 39 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 40 | Corki | +0.61 | 0.61 | 0.00 | range (attacks) |
| 41 | Elise | +0.61 | 0.61 | 0.00 | range (attacks) |
| 42 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 43 | Smolder | +0.61 | 0.61 | 0.00 | range (attacks) |
| 44 | Zilean | +0.61 | 0.61 | 0.00 | range (attacks) |
| 45 | Zoe | +0.61 | 0.61 | 0.00 | range (attacks) |
| 46 | Rengar | +0.60 | 0.60 | 0.00 |  |
| 47 | Gangplank | +0.59 | 0.59 | 0.00 |  |
| 48 | Gnar | +0.57 | 0.57 | 0.00 | range (attacks) |
| 49 | Vex | +0.57 | 0.57 | 0.00 | range (attacks) |
| 50 | Viktor | +0.57 | 0.57 | 0.00 | range (attacks) |
| 51 | Kennen | +0.54 | 0.54 | 0.00 | range (attacks) |
| 52 | Lux | +0.54 | 0.54 | 0.00 | range (attacks) |
| 53 | Xin Zhao | +0.54 | 0.54 | 0.00 |  |
| 54 | Jax | +0.53 | 0.53 | 0.00 | attack dodge (Counter Strike) |
| 55 | Jayce | +0.53 | 0.53 | 0.00 | range (attacks) |
| 56 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Samira | +0.53 | 0.53 | 0.00 | range (attacks) |
| 58 | Jinx | +0.51 | 0.51 | 0.00 | range (attacks) |
| 59 | Kled | +0.51 | 0.51 | 0.00 |  |
| 60 | Seraphine | +0.51 | 0.51 | 0.00 | range (attacks) |
| 61 | Singed | +0.51 | 0.51 | 0.00 |  |
| 62 | Quinn | +0.50 | 0.67 | 0.17 | range (attacks) |
| 63 | Mel | +0.50 | 0.50 | 0.00 | range (attacks) |
| 64 | Soraka | +0.50 | 0.50 | 0.00 | range (attacks) |
| 65 | Ziggs | +0.50 | 0.50 | 0.00 | range (attacks) |
| 66 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 67 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 68 | Azir | +0.47 | 0.47 | 0.00 |  |
| 69 | Heimerdinger | +0.47 | 0.47 | 0.00 |  |
| 70 | Kog'Maw | +0.47 | 0.47 | 0.00 |  |
| 71 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 72 | Nilah | +0.45 | 0.45 | 0.00 |  |
| 73 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 74 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 75 | Annie | +0.44 | 0.44 | 0.00 |  |
| 76 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 77 | Nasus | +0.42 | 0.42 | 0.00 | attack speed slow (Wither) |
| 78 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 79 | Brand | +0.41 | 0.41 | 0.00 |  |
| 80 | Cassiopeia | +0.41 | 0.41 | 0.00 |  |
| 81 | Graves | +0.41 | 0.41 | 0.00 |  |
| 82 | Nami | +0.41 | 0.41 | 0.00 |  |
| 83 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 84 | Syndra | +0.41 | 0.41 | 0.00 |  |
| 85 | Twisted Fate | +0.40 | 0.75 | 0.35 | range (attacks) |
| 86 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 87 | Karma | +0.38 | 0.38 | 0.00 |  |
| 88 | LeBlanc | +0.38 | 0.38 | 0.00 |  |
| 89 | Zaahen | +0.38 | 0.38 | 0.00 |  |
| 90 | Swain | +0.36 | 0.36 | 0.00 |  |
| 91 | Malzahar | +0.35 | 0.75 | 0.40 |  |
| 92 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 93 | Aurelion Sol | +0.34 | 0.41 | 0.07 |  |
| 94 | Malphite | +0.34 | 0.34 | 0.00 |  |
| 95 | Miss Fortune | +0.33 | 0.61 | 0.28 | range (attacks) |
| 96 | Thresh | +0.33 | 0.33 | 0.00 |  |
| 97 | Kayn | +0.32 | 0.77 | 0.45 |  |
| 98 | Alistar | +0.32 | 0.32 | 0.00 |  |
| 99 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 100 | Sion | +0.31 | 0.42 | 0.11 |  |
| 101 | Janna | +0.28 | 0.68 | 0.40 | range (attacks) |
| 102 | Garen | +0.25 | 0.25 | 0.00 |  |
| 103 | Urgot | +0.23 | 0.23 | 0.00 |  |
| 104 | Jhin | +0.22 | 0.50 | 0.28 | range (attacks) |
| 105 | Ivern | +0.21 | 0.33 | 0.12 |  |
| 106 | Vel'Koz | +0.19 | 0.47 | 0.28 |  |
| 107 | Rammus | +0.19 | 0.41 | 0.22 | attack reflect (Defensive Ball Curl) |
| 108 | Rakan | +0.18 | 0.18 | 0.00 |  |
| 109 | Lillia | +0.16 | 0.16 | 0.00 |  |
| 110 | Xerath | +0.15 | 0.47 | 0.32 |  |
| 111 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 112 | Pantheon | +0.13 | 0.62 | 0.49 |  |
| 113 | Skarner | +0.13 | 0.13 | 0.00 |  |
| 114 | Ryze | +0.10 | 0.45 | 0.35 |  |
| 115 | Mordekaiser | +0.10 | 0.10 | 0.00 |  |
| 116 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 117 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 118 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 119 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 120 | Sett | +0.07 | 0.07 | 0.00 |  |
| 121 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 122 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 123 | Yone | +0.07 | 0.07 | 0.00 |  |
| 124 | Shen | +0.06 | 0.51 | 0.45 | attack block (Spirit's Refuge) |
| 125 | Katarina | +0.06 | 0.34 | 0.28 |  |
| 126 | Karthus | +0.05 | 0.33 | 0.28 |  |
| 127 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 128 | Akali | 0.00 | 0.00 | 0.00 |  |
| 129 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 130 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 131 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 132 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 133 | Braum | 0.00 | 0.00 | 0.00 |  |
| 134 | Briar | 0.00 | 0.00 | 0.00 |  |
| 135 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 136 | Darius | 0.00 | 0.00 | 0.00 |  |
| 137 | Diana | 0.00 | 0.00 | 0.00 |  |
| 138 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 139 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 140 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 141 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 142 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 143 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 144 | Leona | 0.00 | 0.00 | 0.00 |  |
| 145 | Locke | 0.00 | 0.00 | 0.00 |  |
| 146 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 147 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 148 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 149 | Rell | 0.00 | 0.00 | 0.00 |  |
| 150 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 151 | Riven | 0.00 | 0.00 | 0.00 |  |
| 152 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 153 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 154 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 155 | Talon | 0.00 | 0.00 | 0.00 |  |
| 156 | Taric | 0.00 | 0.00 | 0.00 |  |
| 157 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 158 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 159 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 160 | Taliyah | -0.01 | 0.47 | 0.48 |  |
| 161 | Fiddlesticks | -0.09 | 0.34 | 0.43 |  |
| 162 | Viego | -0.11 | 0.07 | 0.18 |  |
| 163 | Pyke | -0.13 | 0.00 | 0.13 |  |
| 164 | Gragas | -0.14 | 0.00 | 0.14 |  |
| 165 | Warwick | -0.17 | 0.46 | 0.63 |  |
| 166 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 167 | Nunu & Willump | -0.23 | 0.25 | 0.48 |  |
| 168 | Vi | -0.25 | 0.07 | 0.32 |  |
| 169 | Zac | -0.38 | 0.00 | 0.38 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
