# Counters to Bard (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Bard: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Bard wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Bard --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.88 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.60 |
| 2 | Kayle | +0.87 | +1.00 | +1.00 | +1.00 | +0.45 | +1.00 | +0.14 |
| 3 | Poppy | +0.87 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +0.37 |
| 4 | Irelia | +0.86 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.57 |
| 5 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.33 | – | +0.29 |
| 6 | Kog'Maw | +0.85 | +1.00 | +1.00 | +1.00 | +0.30 | – | +0.36 |
| 7 | Sylas | +0.85 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.26 |
| 8 | Annie | +0.85 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.21 |
| 9 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.79 |
| 10 | Ashe | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | −0.03 |
| 11 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.98 |
| 12 | Jarvan IV | +0.84 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.41 |
| 13 | Olaf | +0.84 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.99 |
| 14 | Camille | +0.84 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.79 |
| 15 | Yunara | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | −0.04 |
| 16 | Tristana | +0.83 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.34 |
| 17 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.83 |
| 18 | Kassadin | +0.83 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.63 |
| 19 | Nasus | +0.83 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.70 |
| 20 | Vel'Koz | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | −0.10 |
| 21 | Aphelios | +0.83 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.16 |
| 22 | Jayce | +0.83 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.14 |
| 23 | Fizz | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.55 |
| 24 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.69 |
| 25 | Zeri | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.39 |
| 26 | Rakan | +0.82 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.38 |
| 27 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.28 |
| 28 | Naafiri | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.10 |
| 29 | Ziggs | +0.82 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.10 |
| 30 | Orianna | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.31 |
| 31 | Cassiopeia | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.16 |
| 32 | Rumble | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.41 |
| 33 | Graves | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.17 |
| 34 | Caitlyn | +0.82 | +1.00 | +1.00 | +0.94 | +0.21 | +0.97 | +0.00 |
| 35 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.72 |
| 36 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.99 |
| 37 | Urgot | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.35 |
| 38 | Jhin | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | −0.04 |
| 39 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.31 |
| 40 | Heimerdinger | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.12 |
| 41 | Lillia | +0.81 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.30 |
| 42 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.25 |
| 43 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.20 |
| 44 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.09 |
| 45 | Akshan | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.19 |
| 46 | Varus | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.19 |
| 47 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.15 |
| 48 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | −0.02 |
| 49 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.14 |
| 50 | Malzahar | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.23 |
| 51 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.15 |
| 52 | Pantheon | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.18 |
| 53 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.05 |
| 54 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.17 |
| 55 | Kindred | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.00 |
| 56 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.11 |
| 57 | Mordekaiser | +0.79 | +0.92 | +0.99 | +0.94 | +0.06 | +0.99 | +0.26 |
| 58 | Draven | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.02 |
| 59 | Kai'Sa | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.21 |
| 60 | Ivern | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 61 | Yasuo | +0.78 | +0.98 | +0.98 | +1.00 | −0.10 | +0.97 | +0.11 |
| 62 | Kennen | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.10 |
| 63 | Samira | +0.71 | +0.77 | +0.88 | +1.00 | +0.17 | – | +0.10 |
| 64 | Zaahen | +0.70 | +0.47 | +1.00 | +1.00 | −0.08 | +1.00 | +0.99 |
| 65 | Milio | +0.70 | +1.00 | +1.00 | +0.37 | +0.33 | – | +0.06 |
| 66 | Quinn | +0.70 | +1.00 | +1.00 | +0.65 | +0.02 | – | −0.14 |
| 67 | Neeko | +0.69 | +0.73 | +0.86 | +1.00 | +0.12 | – | +0.11 |
| 68 | Zyra | +0.69 | +0.83 | +0.74 | +1.00 | +0.10 | – | +0.19 |
| 69 | Master Yi | +0.68 | +1.00 | +1.00 | +0.50 | −0.20 | +1.00 | +0.25 |
| 70 | Azir | +0.64 | +1.00 | +1.00 | +0.28 | +0.08 | – | +0.17 |
| 71 | Alistar | +0.62 | +1.00 | +0.23 | +1.00 | +0.01 | +1.00 | +0.16 |
| 72 | Viego | +0.60 | +0.63 | +0.62 | +1.00 | −0.13 | +1.00 | +0.18 |
| 73 | Brand | +0.59 | +0.44 | +0.82 | +1.00 | +0.09 | – | +0.01 |
| 74 | Miss Fortune | +0.57 | +1.00 | +0.14 | +1.00 | +0.12 | – | +0.17 |
| 75 | Lucian | +0.56 | +0.74 | +0.37 | +1.00 | −0.02 | – | +0.59 |
| 76 | Twitch | +0.54 | +0.95 | +0.94 | +0.00 | +0.09 | – | −0.01 |
| 77 | Volibear | +0.53 | +0.77 | +0.95 | +0.94 | −0.13 | −0.82 | +0.24 |
| 78 | Hwei | +0.51 | +0.85 | +0.12 | +1.00 | +0.04 | – | +0.25 |
| 79 | Riven | +0.50 | +1.00 | −0.20 | +1.00 | −0.16 | +1.00 | +0.45 |
| 80 | Gangplank | +0.43 | +1.00 | +0.09 | +1.00 | +0.16 | −0.78 | +0.22 |
| 81 | Xin Zhao | +0.42 | +0.44 | +0.39 | +1.00 | −0.12 | +0.40 | −0.23 |
| 82 | Gragas | +0.41 | +1.00 | +1.00 | −1.00 | +0.05 | +1.00 | +0.14 |
| 83 | Nilah | +0.41 | +1.00 | +1.00 | +0.00 | +0.07 | −1.00 | +0.01 |
| 84 | Rammus | +0.41 | +1.00 | +1.00 | −0.96 | −0.08 | +1.00 | +0.28 |
| 85 | Ezreal | +0.39 | +0.56 | +0.88 | −0.13 | +0.07 | – | +0.10 |
| 86 | Yone | +0.37 | +0.45 | +0.45 | +1.00 | −0.12 | −0.45 | +0.14 |
| 87 | Zoe | +0.36 | +1.00 | +1.00 | −1.00 | +0.07 | – | +0.19 |
| 88 | Mel | +0.35 | +0.19 | +0.16 | +1.00 | +0.15 | – | +0.19 |
| 89 | Sion | +0.35 | +1.00 | +1.00 | −1.00 | −0.01 | +0.49 | +0.00 |
| 90 | Gnar | +0.33 | +0.33 | +0.52 | +1.00 | +0.07 | −1.00 | +0.09 |
| 91 | Zac | +0.32 | −0.58 | +0.84 | +1.00 | −0.20 | +1.00 | −0.31 |
| 92 | Nocturne | +0.31 | −1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.67 |
| 93 | Jinx | +0.29 | +0.83 | +0.90 | −1.00 | +0.13 | – | +0.14 |
| 94 | Vi | +0.28 | +1.00 | −1.00 | +1.00 | −0.10 | +1.00 | −0.13 |
| 95 | Braum | +0.28 | +0.61 | +0.46 | +0.54 | −0.03 | −1.00 | +0.10 |
| 96 | Karma | +0.27 | +0.80 | +0.88 | −0.97 | +0.07 | – | +0.16 |
| 97 | Shaco | +0.27 | −0.34 | +1.00 | +0.00 | +0.01 | +1.00 | +0.11 |
| 98 | Smolder | +0.27 | +1.00 | −0.87 | +1.00 | +0.10 | – | −0.14 |
| 99 | Tahm Kench | +0.23 | +0.15 | −0.01 | +0.98 | −0.01 | +0.07 | −0.12 |
| 100 | Renekton | +0.23 | +0.07 | −0.01 | +1.00 | +0.03 | +0.04 | +0.10 |
| 101 | Ahri | +0.22 | −0.03 | +0.85 | −0.15 | +0.05 | – | +0.32 |
| 102 | Anivia | +0.17 | +0.34 | +0.17 | +0.12 | −0.04 | +0.21 | +0.16 |
| 103 | Zilean | +0.16 | +0.25 | +1.00 | −1.00 | +0.11 | – | +0.38 |
| 104 | Diana | +0.16 | +1.00 | −0.93 | +1.00 | +0.17 | −0.83 | −0.06 |
| 105 | Morgana | +0.15 | −0.59 | +0.20 | +1.00 | +0.09 | – | +0.42 |
| 106 | Rell | +0.10 | +0.15 | +0.05 | +0.15 | +0.11 | +0.02 | −0.08 |
| 107 | Sejuani | +0.06 | −1.00 | −0.02 | +1.00 | −0.03 | +1.00 | +0.33 |
| 108 | Bel'Veth | +0.03 | −0.93 | +0.35 | +1.00 | +0.01 | −0.16 | −0.22 |
| 109 | Fiddlesticks | +0.03 | +1.00 | +0.00 | −1.00 | −0.04 | – | −0.37 |
| 110 | Illaoi | +0.01 | +1.00 | −0.97 | +0.23 | +0.06 | −0.52 | +0.07 |
| 111 | Senna | +0.01 | +0.20 | −0.15 | −0.04 | +0.19 | −0.19 | −0.07 |
| 112 | Taric | −0.01 | −0.04 | −0.02 | +0.08 | +0.01 | −0.14 | +0.09 |
| 113 | Galio | −0.01 | −0.28 | −0.20 | +1.00 | +0.05 | −1.00 | +0.00 |
| 114 | Wukong | −0.02 | +1.00 | −1.00 | +0.00 | −0.23 | +0.00 | +0.23 |
| 115 | Syndra | −0.04 | +0.01 | +0.56 | −1.00 | +0.16 | – | +0.04 |
| 116 | Ornn | −0.04 | −0.06 | −0.05 | −0.05 | −0.03 | −0.00 | +0.06 |
| 117 | Garen | −0.05 | −1.00 | −0.37 | +1.00 | −0.02 | +0.90 | +0.18 |
| 118 | Karthus | −0.05 | −0.11 | −0.10 | −0.04 | +0.08 | – | +0.03 |
| 119 | Malphite | −0.08 | −0.17 | −0.08 | −0.18 | +0.01 | +0.06 | +0.16 |
| 120 | Zed | −0.08 | +1.00 | −1.00 | +0.00 | −0.13 | −1.00 | +0.74 |
| 121 | Sona | −0.11 | +0.17 | +0.15 | −1.00 | +0.10 | – | +0.14 |
| 122 | Lux | −0.19 | −0.32 | +0.27 | −0.94 | +0.16 | – | +0.16 |
| 123 | Gwen | −0.27 | −1.00 | −1.00 | +0.96 | −0.44 | +1.00 | +0.11 |
| 124 | Briar | −0.28 | −0.95 | −0.95 | +1.00 | −0.34 | +0.19 | +0.50 |
| 125 | Seraphine | −0.30 | −0.56 | +0.17 | −1.00 | +0.15 | – | +0.09 |
| 126 | Viktor | −0.31 | −1.00 | −1.00 | +1.00 | +0.05 | – | +0.32 |
| 127 | Xerath | −0.31 | −1.00 | +0.55 | −1.00 | +0.06 | – | +0.53 |
| 128 | Elise | −0.32 | −1.00 | −1.00 | +1.00 | +0.09 | – | +0.03 |
| 129 | Lee Sin | −0.32 | −0.85 | −0.97 | +1.00 | −0.04 | −0.88 | +0.60 |
| 130 | Ambessa | −0.33 | −1.00 | +1.00 | −1.00 | −0.20 | −1.00 | +0.09 |
| 131 | Vladimir | −0.33 | −1.00 | −1.00 | +1.00 | −0.04 | – | +0.17 |
| 132 | Nautilus | −0.34 | +0.03 | −0.96 | −1.00 | +0.03 | +1.00 | −0.13 |
| 133 | Sivir | −0.40 | −0.39 | −0.40 | −1.00 | +0.03 | – | +0.71 |
| 134 | Maokai | −0.49 | −1.00 | −0.53 | −1.00 | −0.04 | +1.00 | −0.03 |
| 135 | Nidalee | −0.50 | −0.42 | −0.56 | −1.00 | +0.01 | – | −0.12 |
| 136 | Kayn | −0.53 | −0.86 | −0.86 | −1.00 | +0.02 | +0.91 | +0.10 |
| 137 | Vex | −0.53 | −1.00 | −1.00 | +0.00 | +0.04 | – | +0.29 |
| 138 | Akali | −0.57 | −0.74 | −0.96 | −0.25 | −0.11 | −1.00 | +0.37 |
| 139 | Locke | −0.60 | −1.00 | −0.20 | −1.00 | −0.04 | −0.94 | −0.00 |
| 140 | Janna | −0.66 | −0.85 | −0.84 | −1.00 | +0.17 | – | +0.08 |
| 141 | Ryze | −0.69 | −0.91 | −0.81 | −1.00 | +0.09 | – | −0.15 |
| 142 | Veigar | −0.69 | −0.96 | −0.91 | −0.81 | +0.02 | – | +0.05 |
| 143 | Taliyah | −0.69 | −0.94 | −0.94 | −1.00 | +0.23 | – | +0.28 |
| 144 | Aurelion Sol | −0.71 | −1.00 | −1.00 | −1.00 | +0.41 | – | +0.07 |
| 145 | Leona | −0.75 | −1.00 | −0.80 | −1.00 | −0.06 | −1.00 | +0.14 |
| 146 | Amumu | −0.75 | −0.91 | −0.94 | −1.00 | −0.01 | −1.00 | +0.21 |
| 147 | Renata Glasc | −0.75 | −0.99 | −0.99 | −1.00 | +0.13 | – | −0.07 |
| 148 | Nami | −0.76 | −0.98 | −0.98 | −1.00 | +0.03 | – | +0.12 |
| 149 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.29 |
| 150 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.37 |
| 151 | Shen | −0.77 | −1.00 | −1.00 | −0.96 | +0.09 | −0.97 | +0.13 |
| 152 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.12 | −0.99 | +0.20 |
| 153 | Sett | −0.77 | −0.96 | −0.94 | −1.00 | −0.02 | −1.00 | +0.11 |
| 154 | Cho'Gath | −0.77 | −0.96 | −0.96 | −0.95 | −0.08 | −0.88 | −0.09 |
| 155 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.07 |
| 156 | Kha'Zix | −0.78 | −0.96 | −0.98 | −1.00 | −0.03 | −0.96 | +0.14 |
| 157 | Yuumi | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.08 |
| 158 | Darius | −0.79 | −1.00 | −1.00 | −0.96 | −0.09 | −0.92 | +0.18 |
| 159 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.03 |
| 160 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.32 |
| 161 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.02 |
| 162 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.27 |
| 163 | Rek'Sai | −0.80 | −0.92 | −1.00 | −1.00 | −0.21 | −0.95 | +0.04 |
| 164 | Warwick | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.42 |
| 165 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.10 |
| 166 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.17 |
| 167 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 168 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.27 | – | +0.12 |
| 169 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.11 |
| 170 | Aatrox | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −0.97 | +0.02 |
| 171 | Skarner | −0.83 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.20 |
| 172 | Singed | −0.83 | −0.94 | −1.00 | −1.00 | −0.46 | −1.00 | +0.43 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Bard's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Bard's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Bard` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.87)

- **0.80** spell shield: Spell Shield's spell shield blocks Bard's Tempered Fate. Spell shield for 1.5 s, long enough to use ahead of Tempered Fate. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Bard R Tempered Fate)
- **0.14** spell shield: Spell Shield's spell shield blocks part of Bard's Cosmic Binding. Spell shield for 1.5 s, long enough to use ahead of Cosmic Binding. A spell shield blocks only the first enemy ability that reaches it. Cosmic Binding's interaction with spell shields:
  - If the first target has a spell shield, they will block the damage but the bolt will still pass through them.
    - If the bolt hits a second target, only they will be stunned.
    - If the bolt hits terrain, the first target will be stunned.
  - If the second target has a spell shield, they will block the stun and damage.
    - The first target will still be stunned.
  - If the first target gains a spell shield after being hit, the stun will not be blocked. (Sivir E Spell Shield → Bard Q Cosmic Binding)

#### 2. Fiora (net +0.45)

- **0.90** parry: Riposte parries Bard's Tempered Fate and stuns back. Parry for 0.75 s; Tempered Fate takes 0.5 s to land, enough to react. Negating Tempered Fate's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Bard R Tempered Fate)
- **0.40** parry: Riposte parries Bard's Cosmic Binding and stuns back. Parry for 0.75 s; Cosmic Binding takes 0.82 s to land, enough to react. Negating Cosmic Binding's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Bard Q Cosmic Binding)
- **0.09** attack speed slow: Riposte cuts Bard's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Bard basic attacks)
- Watch out: Bard's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range).

#### 3. Milio (net +0.33)

- **0.49** cleanse: Breath of Life cleanses Bard's Tempered Fate (stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove stasis. (Milio R Breath of Life → Bard R Tempered Fate)
- **0.22** tenacity: Breath of Life's 65% tenacity shortens Bard's Tempered Fate (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Bard R Tempered Fate)
- **0.16** cleanse: Breath of Life cleanses Bard's Cosmic Binding (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Milio's Ultra Mega Fire Kick.

#### 4. Morgana (net +0.25)

- **0.80** cc immunity: Black Shield makes Morgana immune to Bard's Tempered Fate (stasis, stun). Immune for 5 s, long enough to use ahead of Tempered Fate. (Morgana E Black Shield → Bard R Tempered Fate)
- **0.30** cc immunity: Black Shield makes Morgana immune to Bard's Cosmic Binding (slow, stun). Immune for 5 s, long enough to use ahead of Cosmic Binding. (Morgana E Black Shield → Bard Q Cosmic Binding)
- **0.08** cc immunity: Black Shield makes Morgana immune to Bard's Traveler's Call (slow). Immune for 5 s, long enough to use ahead of Traveler's Call. (Morgana E Black Shield → Bard I Traveler's Call)
- Watch out: Tempered Fate makes Bard untargetable, dodging Morgana's Soul Shackles.

#### 5. Vladimir (net +0.22)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Bard's Tempered Fate. Untargetable for 2 s, long enough to use ahead of Tempered Fate. (Vladimir W Sanguine Pool → Bard R Tempered Fate)
- **0.15** untargetable: Sanguine Pool can deny the initial targeting of Bard's Cosmic Binding, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. The stun will apply even if the first target becomes untargetable. (Vladimir W Sanguine Pool → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Vladimir's Hemoplague.

#### 6. Master Yi (net +0.16)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Bard's Tempered Fate. Untargetable for ?; Tempered Fate takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Bard R Tempered Fate)
- **0.14** untargetable: Alpha Strike can deny the initial targeting of Bard's Cosmic Binding, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. The stun will apply even if the first target becomes untargetable. (Master Yi Q Alpha Strike → Bard Q Cosmic Binding)
- **0.05** cc immunity: Highlander makes Master Yi immune to Bard's Cosmic Binding (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Master Yi's Alpha Strike.

#### 7. Udyr (net +0.12)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Bard's Tempered Fate (stasis, stun). Immune for 1.5 s, long enough to use ahead of Tempered Fate. (Udyr E Blazing Stampede → Bard R Tempered Fate)
- **0.45** cc immunity: Blazing Stampede makes Udyr immune to Bard's Cosmic Binding (slow, stun). Immune for 1.5 s, long enough to use ahead of Cosmic Binding. (Udyr E Blazing Stampede → Bard Q Cosmic Binding)
- **0.08** cc immunity: Blazing Stampede makes Udyr immune to Bard's Traveler's Call (slow). Immune for 1.5 s, long enough to use ahead of Traveler's Call. (Udyr E Blazing Stampede → Bard I Traveler's Call)
- Watch out: Tempered Fate makes Bard untargetable, dodging Udyr's Blazing Stampede.

#### 8. Yuumi (net +0.11)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Bard's Tempered Fate. Untargetable for ?; Tempered Fate takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Bard R Tempered Fate)
- **0.23** untargetable: You and Me! can deny the initial targeting of Bard's Cosmic Binding, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Does not destroy inbound projectiles, special cased to be targetable to turrets. The stun will apply even if the first target becomes untargetable. (Yuumi W You and Me! → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Yuumi's Final Chapter.

#### 9. Teemo (net +0.08)

- **0.50** blind: Blinding Dart's blind makes Bard's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Bard basic attacks)
- Watch out: Tempered Fate makes Bard untargetable, dodging Teemo's Noxious Trap.

#### 10. Aurora (net +0.07)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Bard's Tempered Fate. Untargetable for 0.4 s; Tempered Fate takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Bard R Tempered Fate)
- **0.10** untargetable: Between Worlds can deny the initial targeting of Bard's Cosmic Binding, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Does not destroy inbound projectiles. The stun will apply even if the first target becomes untargetable. (Aurora R Between Worlds → Bard Q Cosmic Binding)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Bard's Tempered Fate (stasis) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Bard R Tempered Fate)
- Watch out: Tempered Fate makes Bard untargetable, dodging Aurora's Between Worlds.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.87 | 0.87 | 0.00 |  |
| 2 | Fiora | +0.45 | 1.12 | 0.67 |  |
| 3 | Milio | +0.33 | 0.66 | 0.33 |  |
| 4 | Morgana | +0.25 | 0.97 | 0.72 |  |
| 5 | Vladimir | +0.22 | 0.88 | 0.66 |  |
| 6 | Master Yi | +0.16 | 0.96 | 0.80 |  |
| 7 | Udyr | +0.12 | 1.05 | 0.93 |  |
| 8 | Yuumi | +0.11 | 0.92 | 0.81 |  |
| 9 | Teemo | +0.08 | 0.50 | 0.42 | blind (Blinding Dart) |
| 10 | Aurora | +0.07 | 0.77 | 0.70 |  |
| 11 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 12 | Samira | +0.05 | 0.46 | 0.41 |  |
| 13 | Xayah | +0.04 | 0.75 | 0.71 |  |
| 14 | Kayle | +0.01 | 0.21 | 0.20 |  |
| 15 | Olaf | 0.00 | 0.92 | 0.92 |  |
| 16 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 17 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 18 | Shaco | -0.01 | 0.85 | 0.86 |  |
| 19 | Gwen | -0.02 | 0.87 | 0.89 |  |
| 20 | Lissandra | -0.05 | 0.91 | 0.96 |  |
| 21 | Kayn | -0.12 | 0.85 | 0.97 |  |
| 22 | Kindred | -0.21 | 0.00 | 0.21 |  |
| 23 | Alistar | -0.26 | 0.73 | 0.99 |  |
| 24 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 25 | Mel | -0.27 | 0.45 | 0.72 |  |
| 26 | Jinx | -0.27 | 0.30 | 0.57 |  |
| 27 | Fizz | -0.29 | 0.91 | 1.20 |  |
| 28 | Corki | -0.30 | 0.00 | 0.30 |  |
| 29 | Tryndamere | -0.31 | 0.00 | 0.31 |  |
| 30 | Zilean | -0.31 | 0.00 | 0.31 |  |
| 31 | Vex | -0.32 | 0.38 | 0.70 |  |
| 32 | LeBlanc | -0.32 | 0.00 | 0.32 |  |
| 33 | Veigar | -0.35 | 0.30 | 0.65 |  |
| 34 | Zoe | -0.35 | 0.00 | 0.35 |  |
| 35 | Soraka | -0.36 | 0.00 | 0.36 |  |
| 36 | Nidalee | -0.37 | 0.00 | 0.37 |  |
| 37 | Zed | -0.39 | 0.75 | 1.14 |  |
| 38 | Malzahar | -0.39 | 0.69 | 1.08 |  |
| 39 | Braum | -0.41 | 0.75 | 1.16 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 40 | Kalista | -0.42 | 0.60 | 1.02 |  |
| 41 | Zaahen | -0.44 | 0.92 | 1.36 |  |
| 42 | Heimerdinger | -0.44 | 0.07 | 0.51 |  |
| 43 | Karma | -0.44 | 0.00 | 0.44 |  |
| 44 | Nocturne | -0.46 | 0.97 | 1.43 |  |
| 45 | Viktor | -0.48 | 0.30 | 0.78 |  |
| 46 | Varus | -0.48 | 0.23 | 0.71 |  |
| 47 | Rek'Sai | -0.49 | 0.87 | 1.36 |  |
| 48 | Vayne | -0.49 | 0.00 | 0.49 |  |
| 49 | Kled | -0.50 | 0.78 | 1.28 |  |
| 50 | Warwick | -0.51 | 1.03 | 1.54 |  |
| 51 | Twisted Fate | -0.51 | 0.00 | 0.51 |  |
| 52 | Zeri | -0.51 | 0.00 | 0.51 |  |
| 53 | Elise | -0.52 | 0.00 | 0.52 |  |
| 54 | Ivern | -0.52 | 0.00 | 0.52 |  |
| 55 | Jayce | -0.52 | 0.00 | 0.52 |  |
| 56 | Hwei | -0.54 | 0.30 | 0.84 |  |
| 57 | Sion | -0.56 | 0.92 | 1.48 |  |
| 58 | Yasuo | -0.56 | 0.55 | 1.11 | projectile block (Wind Wall) |
| 59 | Lux | -0.56 | 0.00 | 0.56 |  |
| 60 | Quinn | -0.56 | 0.00 | 0.56 |  |
| 61 | Ahri | -0.57 | 0.30 | 0.87 |  |
| 62 | Anivia | -0.57 | 0.06 | 0.63 |  |
| 63 | Ryze | -0.57 | 0.00 | 0.57 |  |
| 64 | Maokai | -0.59 | 0.89 | 1.48 |  |
| 65 | Evelynn | -0.59 | 0.85 | 1.44 |  |
| 66 | Gangplank | -0.59 | 0.78 | 1.37 |  |
| 67 | Ashe | -0.59 | 0.09 | 0.68 |  |
| 68 | Shen | -0.61 | 0.39 | 1.00 |  |
| 69 | Lulu | -0.61 | 0.36 | 0.97 |  |
| 70 | Camille | -0.62 | 0.82 | 1.44 |  |
| 71 | Rengar | -0.63 | 0.81 | 1.44 |  |
| 72 | Akshan | -0.64 | 0.00 | 0.64 |  |
| 73 | Sylas | -0.64 | 0.00 | 0.64 |  |
| 74 | Caitlyn | -0.65 | 0.14 | 0.79 |  |
| 75 | Graves | -0.65 | 0.00 | 0.65 |  |
| 76 | Ezreal | -0.66 | 0.00 | 0.66 |  |
| 77 | Gnar | -0.66 | 0.00 | 0.66 |  |
| 78 | Nasus | -0.67 | 0.39 | 1.06 |  |
| 79 | Smolder | -0.67 | 0.00 | 0.67 |  |
| 80 | Tristana | -0.68 | 0.18 | 0.86 |  |
| 81 | Kennen | -0.68 | 0.00 | 0.68 |  |
| 82 | Karthus | -0.69 | 0.00 | 0.69 |  |
| 83 | Annie | -0.70 | 0.07 | 0.77 |  |
| 84 | Kha'Zix | -0.71 | 0.00 | 0.71 |  |
| 85 | Senna | -0.72 | 0.08 | 0.80 |  |
| 86 | Ziggs | -0.72 | 0.00 | 0.72 |  |
| 87 | Singed | -0.73 | 0.42 | 1.15 |  |
| 88 | Aatrox | -0.73 | 0.00 | 0.73 |  |
| 89 | Katarina | -0.74 | 0.18 | 0.92 |  |
| 90 | Lucian | -0.74 | 0.00 | 0.74 |  |
| 91 | Miss Fortune | -0.75 | 0.00 | 0.75 |  |
| 92 | Brand | -0.76 | 0.00 | 0.76 |  |
| 93 | Draven | -0.77 | 0.00 | 0.77 |  |
| 94 | Swain | -0.78 | 0.00 | 0.78 |  |
| 95 | Syndra | -0.78 | 0.00 | 0.78 |  |
| 96 | Jax | -0.79 | 0.41 | 1.20 | attack dodge (Counter Strike) |
| 97 | Bel'Veth | -0.79 | 0.00 | 0.79 |  |
| 98 | Vel'Koz | -0.79 | 0.00 | 0.79 |  |
| 99 | Xerath | -0.80 | 0.00 | 0.80 |  |
| 100 | Jhin | -0.82 | 0.00 | 0.82 |  |
| 101 | Cassiopeia | -0.83 | 0.14 | 0.97 |  |
| 102 | Thresh | -0.83 | 0.00 | 0.83 |  |
| 103 | Shyvana | -0.84 | 0.08 | 0.92 |  |
| 104 | Garen | -0.87 | 0.39 | 1.26 |  |
| 105 | Talon | -0.89 | 0.00 | 0.89 |  |
| 106 | Nilah | -0.91 | 0.35 | 1.26 |  |
| 107 | Kassadin | -0.91 | 0.00 | 0.91 |  |
| 108 | Orianna | -0.91 | 0.00 | 0.91 |  |
| 109 | Sona | -0.91 | 0.00 | 0.91 |  |
| 110 | Dr. Mundo | -0.92 | 0.00 | 0.92 |  |
| 111 | Lee Sin | -0.92 | 0.00 | 0.92 |  |
| 112 | Aphelios | -0.93 | 0.07 | 1.00 |  |
| 113 | Zyra | -0.93 | 0.04 | 0.97 |  |
| 114 | Azir | -0.96 | 0.00 | 0.96 |  |
| 115 | Lillia | -0.97 | 0.00 | 0.97 |  |
| 116 | Neeko | -0.97 | 0.00 | 0.97 |  |
| 117 | Riven | -0.97 | 0.00 | 0.97 |  |
| 118 | Seraphine | -0.97 | 0.00 | 0.97 |  |
| 119 | Renata Glasc | -0.98 | 0.00 | 0.98 |  |
| 120 | Illaoi | -0.99 | 0.08 | 1.07 |  |
| 121 | Fiddlesticks | -1.00 | 0.00 | 1.00 |  |
| 122 | Akali | -1.01 | 0.00 | 1.01 |  |
| 123 | Nami | -1.01 | 0.00 | 1.01 |  |
| 124 | Taric | -1.01 | 0.00 | 1.01 |  |
| 125 | Aurelion Sol | -1.05 | 0.00 | 1.05 |  |
| 126 | Irelia | -1.05 | 0.00 | 1.05 |  |
| 127 | Poppy | -1.06 | 0.34 | 1.40 |  |
| 128 | Renekton | -1.07 | 0.00 | 1.07 |  |
| 129 | Yorick | -1.08 | 0.00 | 1.08 |  |
| 130 | Locke | -1.10 | 0.00 | 1.10 |  |
| 131 | Urgot | -1.10 | 0.00 | 1.10 |  |
| 132 | Janna | -1.11 | 0.00 | 1.11 |  |
| 133 | Yone | -1.14 | 0.24 | 1.38 |  |
| 134 | Rammus | -1.15 | 0.38 | 1.53 |  |
| 135 | Zac | -1.15 | 0.30 | 1.45 |  |
| 136 | Rakan | -1.17 | 0.00 | 1.17 |  |
| 137 | Ekko | -1.18 | 0.00 | 1.18 |  |
| 138 | Malphite | -1.19 | 0.33 | 1.52 |  |
| 139 | Mordekaiser | -1.24 | 0.09 | 1.33 |  |
| 140 | Ambessa | -1.24 | 0.00 | 1.24 |  |
| 141 | Diana | -1.24 | 0.00 | 1.24 |  |
| 142 | Wukong | -1.24 | 0.00 | 1.24 |  |
| 143 | Amumu | -1.25 | 0.15 | 1.40 |  |
| 144 | Jarvan IV | -1.26 | 0.08 | 1.34 |  |
| 145 | Blitzcrank | -1.27 | 0.00 | 1.27 |  |
| 146 | Rumble | -1.27 | 0.00 | 1.27 |  |
| 147 | Xin Zhao | -1.28 | 0.10 | 1.38 |  |
| 148 | Qiyana | -1.28 | 0.00 | 1.28 |  |
| 149 | Pantheon | -1.29 | 0.14 | 1.43 |  |
| 150 | Nautilus | -1.30 | 0.00 | 1.30 |  |
| 151 | Naafiri | -1.31 | 0.00 | 1.31 |  |
| 152 | Viego | -1.32 | 0.08 | 1.40 |  |
| 153 | Taliyah | -1.32 | 0.00 | 1.32 |  |
| 154 | Volibear | -1.33 | 0.08 | 1.41 |  |
| 155 | K'Sante | -1.34 | 0.16 | 1.50 |  |
| 156 | Hecarim | -1.34 | 0.08 | 1.42 |  |
| 157 | Leona | -1.34 | 0.00 | 1.34 |  |
| 158 | Pyke | -1.38 | 0.00 | 1.38 |  |
| 159 | Darius | -1.40 | 0.00 | 1.40 |  |
| 160 | Ornn | -1.41 | 0.08 | 1.49 |  |
| 161 | Gragas | -1.41 | 0.00 | 1.41 |  |
| 162 | Tahm Kench | -1.41 | 0.00 | 1.41 |  |
| 163 | Trundle | -1.41 | 0.00 | 1.41 |  |
| 164 | Cho'Gath | -1.43 | 0.00 | 1.43 |  |
| 165 | Rell | -1.43 | 0.00 | 1.43 |  |
| 166 | Nunu & Willump | -1.44 | 0.14 | 1.58 |  |
| 167 | Briar | -1.45 | 0.00 | 1.45 |  |
| 168 | Vi | -1.47 | 0.08 | 1.55 |  |
| 169 | Sejuani | -1.47 | 0.00 | 1.47 |  |
| 170 | Sett | -1.50 | 0.08 | 1.58 |  |
| 171 | Skarner | -1.51 | 0.08 | 1.59 |  |
| 172 | Galio | -1.63 | 0.00 | 1.63 |  |
