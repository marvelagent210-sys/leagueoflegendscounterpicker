# Counters to Taric (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Taric: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Taric wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Taric --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 2 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 3 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 4 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 5 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 6 | Nilah | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 7 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 8 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 9 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 10 | Yunara | +0.76 | +1.00 | +0.93 | +0.93 | −0.04 | +1.00 | +0.00 |
| 11 | Aurora | +0.75 | +0.83 | +1.00 | +0.99 | −0.01 | +1.00 | +0.00 |
| 12 | Ashe | +0.71 | +1.00 | +0.93 | +0.65 | −0.03 | +1.00 | +0.00 |
| 13 | Smolder | +0.70 | +1.00 | +1.00 | +1.00 | −0.02 | +0.00 | +0.00 |
| 14 | Kog'Maw | +0.59 | +1.00 | +0.13 | +1.00 | +0.02 | +1.00 | +0.00 |
| 15 | Twitch | +0.56 | +0.18 | +1.00 | +1.00 | +0.04 | +0.58 | +0.00 |
| 16 | Teemo | +0.49 | +0.33 | +1.00 | +0.66 | +0.01 | +0.24 | +0.00 |
| 17 | Fiora | +0.48 | +0.60 | +1.00 | +0.00 | +0.23 | – | +0.00 |
| 18 | Zeri | +0.47 | +1.00 | +0.50 | +0.00 | −0.01 | +1.00 | +0.00 |
| 19 | Kai'Sa | +0.34 | +1.00 | +0.00 | +0.00 | −0.07 | +1.00 | +0.00 |
| 20 | Morgana | +0.31 | +0.41 | +0.37 | +0.38 | +0.04 | +0.36 | +0.00 |
| 21 | Ezreal | +0.30 | −0.15 | +0.36 | +0.76 | −0.01 | +0.96 | +0.00 |
| 22 | Orianna | +0.30 | +0.32 | +0.38 | +0.42 | +0.02 | +0.33 | +0.00 |
| 23 | Yasuo | +0.28 | +0.96 | +0.00 | +0.00 | +0.05 | – | +0.00 |
| 24 | Xayah | +0.21 | +0.17 | +0.29 | +0.32 | +0.04 | +0.28 | +0.00 |
| 25 | Sivir | +0.19 | +0.22 | +0.23 | +0.23 | +0.02 | +0.23 | +0.00 |
| 26 | Neeko | +0.18 | +0.26 | +0.29 | +0.07 | +0.00 | +0.26 | +0.00 |
| 27 | Lulu | +0.18 | +0.22 | +0.23 | +0.20 | +0.02 | +0.22 | +0.00 |
| 28 | Karma | +0.17 | +0.23 | +0.20 | +0.20 | +0.04 | +0.19 | +0.00 |
| 29 | Rakan | +0.15 | +0.17 | +0.19 | +0.16 | +0.04 | +0.28 | +0.00 |
| 30 | Quinn | +0.15 | +0.14 | +0.17 | +0.21 | −0.06 | +0.34 | +0.00 |
| 31 | Syndra | +0.15 | +0.12 | +0.17 | +0.19 | +0.05 | +0.27 | +0.00 |
| 32 | Twisted Fate | +0.14 | +0.18 | +0.16 | +0.21 | −0.05 | +0.19 | +0.00 |
| 33 | Swain | +0.14 | +0.19 | +0.14 | +0.20 | −0.02 | +0.19 | +0.00 |
| 34 | Ivern | +0.12 | +0.26 | +0.12 | +0.06 | −0.01 | +0.17 | +0.00 |
| 35 | Gwen | +0.12 | −0.54 | +1.00 | +0.00 | −0.04 | – | +0.00 |
| 36 | Viktor | +0.12 | +0.17 | +0.15 | +0.12 | +0.02 | +0.14 | +0.00 |
| 37 | Draven | +0.12 | +0.18 | +0.09 | +0.13 | −0.01 | +0.24 | +0.00 |
| 38 | Sona | +0.12 | +0.06 | +0.22 | +0.21 | −0.01 | +0.07 | +0.00 |
| 39 | Tristana | +0.11 | +0.19 | +0.12 | +0.09 | −0.02 | +0.23 | +0.00 |
| 40 | Azir | +0.10 | +0.09 | +0.12 | +0.23 | −0.00 | +0.04 | +0.00 |
| 41 | Heimerdinger | +0.09 | +0.11 | +0.13 | +0.02 | +0.12 | +0.12 | +0.00 |
| 42 | Lux | +0.08 | +0.04 | +0.11 | +0.15 | +0.01 | +0.14 | +0.00 |
| 43 | Soraka | +0.08 | +0.08 | +0.10 | +0.10 | +0.02 | +0.11 | +0.00 |
| 44 | Bard | +0.06 | +0.10 | +0.06 | +0.04 | −0.02 | +0.17 | +0.00 |
| 45 | Janna | +0.06 | +0.15 | +0.05 | −0.02 | −0.01 | +0.16 | +0.00 |
| 46 | Hwei | +0.06 | −0.01 | +0.17 | +0.06 | +0.02 | +0.02 | +0.00 |
| 47 | Milio | +0.05 | +0.06 | +0.04 | +0.08 | +0.02 | +0.04 | +0.00 |
| 48 | Aphelios | +0.04 | −0.03 | −0.46 | +0.50 | −0.00 | +0.60 | +0.00 |
| 49 | Singed | +0.04 | +0.04 | +0.13 | +0.04 | −0.12 | – | +0.00 |
| 50 | Brand | +0.03 | +0.06 | +0.07 | −0.06 | −0.03 | +0.11 | +0.00 |
| 51 | Miss Fortune | +0.02 | +0.18 | −0.07 | −0.01 | −0.04 | +0.05 | +0.00 |
| 52 | Annie | +0.02 | +0.07 | +0.01 | −0.05 | +0.02 | +0.03 | +0.00 |
| 53 | Anivia | +0.01 | +0.15 | −0.10 | +0.03 | −0.07 | +0.05 | +0.00 |
| 54 | Ziggs | +0.01 | +0.08 | −0.02 | −0.09 | +0.05 | +0.01 | +0.00 |
| 55 | Rell | +0.00 | −0.01 | −0.03 | −0.00 | +0.06 | +0.04 | +0.00 |
| 56 | Akshan | +0.00 | +0.04 | −0.02 | −0.02 | +0.00 | −0.02 | +0.00 |
| 57 | Mel | −0.00 | +0.03 | −0.02 | −0.02 | −0.02 | +0.02 | +0.00 |
| 58 | Dr. Mundo | −0.00 | +0.02 | +0.03 | +0.02 | −0.12 | – | +0.00 |
| 59 | Vel'Koz | −0.01 | +0.09 | −0.08 | −0.09 | +0.05 | −0.02 | +0.00 |
| 60 | Lucian | −0.01 | −0.08 | +0.03 | +0.02 | −0.02 | −0.01 | +0.00 |
| 61 | Senna | −0.01 | +0.15 | −0.18 | −0.10 | −0.01 | +0.16 | +0.00 |
| 62 | Zoe | −0.01 | −0.02 | −0.01 | −0.00 | −0.02 | −0.02 | +0.00 |
| 63 | Jinx | −0.02 | +0.05 | −0.05 | −0.07 | −0.03 | −0.01 | +0.00 |
| 64 | Zilean | −0.02 | −0.01 | −0.02 | −0.01 | −0.00 | −0.13 | +0.00 |
| 65 | Maokai | −0.02 | +0.02 | −0.00 | −0.10 | −0.02 | – | +0.00 |
| 66 | Nami | −0.03 | +0.10 | −0.12 | −0.11 | −0.01 | +0.00 | +0.00 |
| 67 | Kennen | −0.03 | +0.03 | −0.12 | −0.09 | +0.04 | +0.03 | +0.00 |
| 68 | Vex | −0.03 | −0.05 | −0.03 | −0.03 | +0.00 | −0.08 | +0.00 |
| 69 | Ahri | −0.04 | −0.06 | +0.00 | −0.10 | +0.03 | −0.14 | +0.00 |
| 70 | Bel'Veth | −0.04 | −1.00 | +0.00 | +1.00 | +0.07 | – | +0.00 |
| 71 | Zyra | −0.07 | +0.06 | −0.12 | −0.23 | −0.01 | −0.08 | +0.00 |
| 72 | LeBlanc | −0.08 | −0.07 | −0.29 | +0.02 | −0.01 | +0.11 | +0.00 |
| 73 | Gnar | −0.08 | −0.12 | −0.17 | −0.20 | +0.03 | +0.34 | +0.00 |
| 74 | Lissandra | −0.08 | −0.23 | −0.11 | −0.05 | +0.04 | +0.04 | +0.00 |
| 75 | Volibear | −0.11 | −0.19 | −0.11 | −0.11 | −0.05 | – | +0.00 |
| 76 | Seraphine | −0.11 | −0.13 | −0.15 | −0.17 | −0.03 | −0.04 | +0.00 |
| 77 | Yuumi | −0.12 | −0.09 | −0.17 | −0.17 | −0.05 | −0.17 | +0.00 |
| 78 | Veigar | −0.13 | −0.04 | −0.24 | −0.24 | −0.02 | −0.14 | +0.00 |
| 79 | Kled | −0.16 | −0.18 | −0.20 | −0.22 | −0.03 | – | +0.00 |
| 80 | Malzahar | −0.16 | −0.21 | −0.22 | −0.22 | +0.02 | −0.16 | +0.00 |
| 81 | Kalista | −0.17 | −0.27 | −0.29 | −0.28 | −0.05 | +0.36 | +0.00 |
| 82 | Poppy | −0.20 | −0.28 | −0.25 | −0.24 | +0.01 | – | +0.00 |
| 83 | Tahm Kench | −0.20 | −0.26 | −0.25 | −0.25 | −0.03 | – | +0.00 |
| 84 | Ryze | −0.22 | −0.16 | −0.19 | −0.60 | −0.01 | −0.08 | +0.00 |
| 85 | Braum | −0.23 | −0.28 | −0.31 | −0.31 | +0.00 | – | +0.00 |
| 86 | Aurelion Sol | −0.26 | −0.36 | −0.35 | −0.39 | +0.24 | −0.37 | +0.00 |
| 87 | Lillia | −0.26 | −0.00 | −0.54 | −0.53 | −0.04 | −0.10 | +0.00 |
| 88 | Diana | −0.26 | −0.35 | −0.35 | −0.32 | +0.02 | – | +0.00 |
| 89 | Shen | −0.29 | −0.39 | −0.43 | −0.32 | +0.07 | – | +0.00 |
| 90 | Malphite | −0.29 | −0.39 | −0.38 | −0.36 | +0.01 | – | +0.00 |
| 91 | Renekton | −0.30 | −0.37 | −0.41 | −0.38 | −0.01 | – | +0.00 |
| 92 | Karthus | −0.30 | −0.38 | −0.37 | −0.40 | +0.02 | −0.37 | +0.00 |
| 93 | Olaf | −0.31 | +0.35 | −1.00 | −0.50 | −0.08 | – | +0.00 |
| 94 | Cassiopeia | −0.32 | −0.34 | −0.27 | −0.32 | +0.01 | −1.00 | +0.00 |
| 95 | Aatrox | −0.34 | −0.39 | +0.00 | −1.00 | −0.08 | – | +0.00 |
| 96 | Xerath | −0.38 | −0.19 | −0.65 | −0.65 | −0.02 | −0.34 | +0.00 |
| 97 | Vladimir | −0.39 | −0.37 | −0.30 | −0.66 | −0.17 | −0.64 | +0.00 |
| 98 | Fiddlesticks | −0.42 | +0.08 | −1.00 | −0.65 | +0.02 | −0.64 | +0.00 |
| 99 | Zac | −0.45 | −0.30 | −0.67 | −0.67 | −0.19 | – | +0.00 |
| 100 | Ornn | −0.47 | −0.44 | −0.72 | −0.72 | +0.05 | – | +0.00 |
| 101 | Kindred | −0.51 | −1.00 | −0.48 | −0.55 | −0.04 | −0.21 | +0.00 |
| 102 | Graves | −0.51 | −0.23 | −0.56 | −1.00 | −0.10 | −1.00 | +0.00 |
| 103 | Xin Zhao | −0.54 | −0.23 | −0.85 | −1.00 | −0.10 | – | +0.00 |
| 104 | Jhin | −0.55 | −0.01 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 105 | Elise | −0.62 | −1.00 | −0.68 | −1.00 | +0.01 | +0.00 | +0.00 |
| 106 | Master Yi | −0.63 | −1.00 | −1.00 | −1.00 | −0.18 | +1.00 | +0.00 |
| 107 | Leona | −0.71 | −0.74 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 108 | Nidalee | −0.72 | −1.00 | −1.00 | −1.00 | −0.03 | −0.14 | +0.00 |
| 109 | Taliyah | −0.73 | −1.00 | −1.00 | −1.00 | +0.03 | −0.30 | +0.00 |
| 110 | Thresh | −0.74 | −0.76 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 111 | Rengar | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 112 | Nunu & Willump | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 113 | Gangplank | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 114 | Akali | −0.77 | −1.00 | −1.00 | −0.92 | −0.06 | – | +0.00 |
| 115 | Rammus | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 116 | Fizz | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 117 | Jayce | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 118 | Irelia | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 119 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 120 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 121 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 122 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 123 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 124 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 125 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 126 | Nocturne | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 127 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 128 | Warwick | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 129 | Lee Sin | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 130 | Jax | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 131 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 132 | Riven | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 133 | Cho'Gath | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 134 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 135 | Mordekaiser | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 136 | Nasus | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 137 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 138 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 139 | Yone | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 140 | Pyke | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 141 | Ambessa | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 142 | Rek'Sai | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 143 | Viego | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 144 | Trundle | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 145 | Jarvan IV | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 146 | Tryndamere | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 147 | Udyr | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 148 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 149 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 150 | Sion | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 151 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 152 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 153 | Sett | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 154 | Wukong | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 155 | Garen | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 156 | Vi | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 157 | Urgot | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 158 | Illaoi | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 159 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 160 | Camille | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 161 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 162 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 163 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 164 | Sylas | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 165 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 166 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 167 | Varus | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 168 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 169 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 170 | Caitlyn | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 171 | Samira | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 172 | Briar | −0.83 | −1.00 | −1.00 | −1.00 | −0.32 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Taric's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Taric's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Taric` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.44)

- **0.88** range: Sivir's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Sivir basic attacks → Taric basic attacks)
- **0.56** spell shield: Spell Shield's spell shield blocks Taric's Dazzle. Spell shield for 1.5 s, long enough to use ahead of Dazzle. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Taric E Dazzle)

#### 2. Teemo (net +1.13)

- **0.63** range: Teemo's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Teemo basic attacks → Taric basic attacks)
- **0.50** blind: Blinding Dart's blind makes Taric's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Taric basic attacks)

#### 3. Lulu (net +1.08)

- **0.72** range: Lulu's basic attacks reach 400 units farther than Taric's (550 vs 150 attack range). Taric has no dash or blink to close the gap. (Lulu basic attacks → Taric basic attacks)
- **0.36** disarm: Whimsy disarms Taric for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Taric basic attacks)

#### 4. Milio (net +1.08)

- **0.72** range: Milio's basic attacks reach 375 units farther than Taric's (525 vs 150 attack range). Taric has no dash or blink to close the gap. (Milio basic attacks → Taric basic attacks)
- **0.26** cleanse: Breath of Life cleanses Taric's Dazzle (stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Taric E Dazzle)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Taric's Dazzle (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Taric E Dazzle)

#### 5. Xayah (net +1.05)

- **0.72** range: Xayah's basic attacks reach 375 units farther than Taric's (525 vs 150 attack range). Taric has no dash or blink to close the gap. (Xayah basic attacks → Taric basic attacks)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Taric's Dazzle. Untargetable for 1.5 s, long enough to use ahead of Dazzle. (Xayah R Featherstorm → Taric E Dazzle)

#### 6. Bard (net +1.01)

- **0.67** range: Bard's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Bard basic attacks → Taric basic attacks)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Taric's Dazzle. Untargetable for 2.5 s, long enough to use ahead of Dazzle. (Bard R Tempered Fate → Taric E Dazzle)

#### 7. Morgana (net +0.96)

- **0.60** cc immunity: Black Shield makes Morgana immune to Taric's Dazzle (stun). Immune for 5 s, long enough to use ahead of Dazzle. (Morgana E Black Shield → Taric E Dazzle)
- **0.36** range: Morgana's basic attacks reach 300 units farther than Taric's (450 vs 150 attack range). Taric has no dash or blink to close the gap. (Morgana basic attacks → Taric basic attacks)

#### 8. Kayle (net +0.89)

- **0.72** range: Kayle's basic attacks reach 475 units farther than Taric's (625 vs 150 attack range). Taric has no dash or blink to close the gap. (Kayle basic attacks → Taric basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Taric's Dazzle (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Dazzle. (Kayle R Divine Judgment → Taric E Dazzle)

#### 9. Kindred (net +0.88)

- **0.88** range: Kindred's basic attacks reach 350 units farther than Taric's (500 vs 150 attack range). Taric has no dash or blink to close the gap. (Kindred basic attacks → Taric basic attacks)

#### 10. Zeri (net +0.88)

- **0.88** range: Zeri's basic attacks reach 400 units farther than Taric's (550 vs 150 attack range). Taric has no dash or blink to close the gap. (Zeri basic attacks → Taric basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.44 | 1.44 | 0.00 | range (attacks) |
| 2 | Teemo | +1.13 | 1.13 | 0.00 | range (attacks), blind (Blinding Dart) |
| 3 | Lulu | +1.08 | 1.08 | 0.00 | range (attacks) |
| 4 | Milio | +1.08 | 1.08 | 0.00 | range (attacks) |
| 5 | Xayah | +1.05 | 1.05 | 0.00 | range (attacks) |
| 6 | Bard | +1.01 | 1.01 | 0.00 | range (attacks) |
| 7 | Morgana | +0.96 | 0.96 | 0.00 |  |
| 8 | Kayle | +0.89 | 0.89 | 0.00 | range (attacks) |
| 9 | Kindred | +0.88 | 0.88 | 0.00 | range (attacks) |
| 10 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 11 | Kalista | +0.87 | 0.87 | 0.00 | range (attacks) |
| 12 | Vladimir | +0.86 | 0.93 | 0.07 |  |
| 13 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 14 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 15 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 16 | Aurora | +0.78 | 0.78 | 0.00 | range (attacks) |
| 17 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 18 | Aphelios | +0.77 | 0.77 | 0.00 | range (attacks) |
| 19 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 20 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 21 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 22 | Kai'Sa | +0.72 | 0.72 | 0.00 | range (attacks) |
| 23 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 24 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 25 | Nocturne | +0.70 | 0.70 | 0.00 |  |
| 26 | Udyr | +0.70 | 0.70 | 0.00 |  |
| 27 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 28 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 29 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 30 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 31 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 32 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 33 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 34 | Gnar | +0.62 | 0.62 | 0.00 | range (attacks) |
| 35 | Yuumi | +0.61 | 1.01 | 0.40 | range (attacks) |
| 36 | Viktor | +0.61 | 0.61 | 0.00 | range (attacks) |
| 37 | Varus | +0.60 | 0.71 | 0.11 | range (attacks) |
| 38 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 39 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 40 | Jayce | +0.57 | 0.57 | 0.00 | range (attacks) |
| 41 | Samira | +0.57 | 0.57 | 0.00 | range (attacks) |
| 42 | Nidalee | +0.56 | 0.56 | 0.00 | range (attacks) |
| 43 | Rengar | +0.56 | 0.56 | 0.00 |  |
| 44 | Quinn | +0.54 | 0.72 | 0.18 | range (attacks) |
| 45 | Jinx | +0.54 | 0.54 | 0.00 | range (attacks) |
| 46 | Nilah | +0.54 | 0.54 | 0.00 |  |
| 47 | Seraphine | +0.54 | 0.54 | 0.00 | range (attacks) |
| 48 | Mel | +0.53 | 0.53 | 0.00 | range (attacks) |
| 49 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 50 | Vex | +0.53 | 0.53 | 0.00 | range (attacks) |
| 51 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 52 | Fiora | +0.51 | 0.51 | 0.00 |  |
| 53 | Gangplank | +0.51 | 0.51 | 0.00 |  |
| 54 | Kog'Maw | +0.51 | 0.51 | 0.00 | range (attacks) |
| 55 | Azir | +0.50 | 0.50 | 0.00 | range (attacks) |
| 56 | Orianna | +0.50 | 0.50 | 0.00 | range (attacks) |
| 57 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 58 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 59 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 60 | Twisted Fate | +0.46 | 0.81 | 0.35 | range (attacks) |
| 61 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 62 | Graves | +0.45 | 0.45 | 0.00 |  |
| 63 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 64 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 65 | Annie | +0.44 | 0.44 | 0.00 |  |
| 66 | Brand | +0.44 | 0.44 | 0.00 |  |
| 67 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 68 | Nami | +0.44 | 0.44 | 0.00 |  |
| 69 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 70 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 71 | Fizz | +0.42 | 0.42 | 0.00 |  |
| 72 | Maokai | +0.42 | 0.42 | 0.00 |  |
| 73 | Jax | +0.41 | 0.41 | 0.00 | attack dodge (Counter Strike) |
| 74 | Karma | +0.41 | 0.41 | 0.00 |  |
| 75 | Kled | +0.41 | 0.41 | 0.00 |  |
| 76 | LeBlanc | +0.41 | 0.41 | 0.00 |  |
| 77 | Heimerdinger | +0.40 | 0.40 | 0.00 |  |
| 78 | Lucian | +0.39 | 0.67 | 0.28 | range (attacks) |
| 79 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 80 | Swain | +0.39 | 0.39 | 0.00 |  |
| 81 | Miss Fortune | +0.37 | 0.65 | 0.28 | range (attacks) |
| 82 | Aurelion Sol | +0.36 | 0.44 | 0.08 |  |
| 83 | Thresh | +0.36 | 0.36 | 0.00 |  |
| 84 | Akshan | +0.35 | 0.63 | 0.28 | range (attacks) |
| 85 | Gwen | +0.34 | 0.34 | 0.00 |  |
| 86 | Olaf | +0.34 | 0.34 | 0.00 |  |
| 87 | Rek'Sai | +0.34 | 0.34 | 0.00 |  |
| 88 | Malzahar | +0.33 | 0.73 | 0.40 |  |
| 89 | Janna | +0.32 | 0.72 | 0.40 | range (attacks) |
| 90 | Alistar | +0.27 | 0.27 | 0.00 |  |
| 91 | Singed | +0.27 | 0.27 | 0.00 |  |
| 92 | Urgot | +0.27 | 0.27 | 0.00 |  |
| 93 | Jhin | +0.25 | 0.53 | 0.28 | range (attacks) |
| 94 | Malphite | +0.25 | 0.25 | 0.00 |  |
| 95 | Sion | +0.24 | 0.36 | 0.12 |  |
| 96 | Vel'Koz | +0.22 | 0.50 | 0.28 | range (attacks) |
| 97 | Ivern | +0.22 | 0.36 | 0.14 |  |
| 98 | Rakan | +0.22 | 0.22 | 0.00 |  |
| 99 | Evelynn | +0.21 | 0.21 | 0.00 |  |
| 100 | Shaco | +0.21 | 0.21 | 0.00 |  |
| 101 | Zaahen | +0.21 | 0.21 | 0.00 |  |
| 102 | Camille | +0.20 | 0.20 | 0.00 |  |
| 103 | Zed | +0.20 | 0.20 | 0.00 |  |
| 104 | Lillia | +0.19 | 0.19 | 0.00 |  |
| 105 | Xerath | +0.18 | 0.50 | 0.32 | range (attacks) |
| 106 | Garen | +0.18 | 0.18 | 0.00 |  |
| 107 | Xin Zhao | +0.17 | 0.17 | 0.00 |  |
| 108 | Rammus | +0.14 | 0.38 | 0.24 |  |
| 109 | Master Yi | +0.14 | 0.34 | 0.20 |  |
| 110 | Ryze | +0.13 | 0.48 | 0.35 |  |
| 111 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 112 | Karthus | +0.08 | 0.36 | 0.28 |  |
| 113 | Taliyah | +0.02 | 0.50 | 0.48 | range (attacks) |
| 114 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 115 | Akali | 0.00 | 0.00 | 0.00 |  |
| 116 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 117 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 118 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 119 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 120 | Braum | 0.00 | 0.00 | 0.00 |  |
| 121 | Briar | 0.00 | 0.00 | 0.00 |  |
| 122 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 123 | Darius | 0.00 | 0.00 | 0.00 |  |
| 124 | Diana | 0.00 | 0.00 | 0.00 |  |
| 125 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 126 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 127 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 128 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 129 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 130 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 131 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 132 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 133 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 134 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 135 | Leona | 0.00 | 0.00 | 0.00 |  |
| 136 | Locke | 0.00 | 0.00 | 0.00 |  |
| 137 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 138 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 139 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 140 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 141 | Rell | 0.00 | 0.00 | 0.00 |  |
| 142 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 143 | Riven | 0.00 | 0.00 | 0.00 |  |
| 144 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 145 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 146 | Sett | 0.00 | 0.00 | 0.00 |  |
| 147 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 148 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 149 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 150 | Talon | 0.00 | 0.00 | 0.00 |  |
| 151 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 152 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 153 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 154 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 155 | Yone | 0.00 | 0.00 | 0.00 |  |
| 156 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 157 | Shen | -0.06 | 0.39 | 0.45 |  |
| 158 | Fiddlesticks | -0.08 | 0.36 | 0.44 |  |
| 159 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 160 | Pyke | -0.14 | 0.00 | 0.14 |  |
| 161 | Gragas | -0.15 | 0.00 | 0.15 |  |
| 162 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 163 | Viego | -0.20 | 0.00 | 0.20 |  |
| 164 | Pantheon | -0.22 | 0.28 | 0.50 |  |
| 165 | Kayn | -0.24 | 0.21 | 0.45 |  |
| 166 | Vi | -0.35 | 0.00 | 0.35 |  |
| 167 | Warwick | -0.43 | 0.21 | 0.64 |  |
| 168 | Zac | -0.43 | 0.00 | 0.43 |  |
| 169 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 170 | Nunu & Willump | -0.49 | 0.00 | 0.49 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
