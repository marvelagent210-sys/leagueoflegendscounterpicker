# Counters to Zac (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Zac: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Zac wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Zac --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.88 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +0.50 |
| 2 | Fiora | +0.87 | +1.00 | +1.00 | +1.00 | +0.47 | – | +0.29 |
| 3 | Yorick | +0.87 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.85 |
| 4 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.15 |
| 5 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | −0.05 |
| 6 | Nilah | +0.82 | +1.00 | +1.00 | +1.00 | +0.32 | – | −0.25 |
| 7 | Bel'Veth | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | −0.04 |
| 8 | Ashe | +0.81 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.43 |
| 9 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | −0.11 |
| 10 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.01 |
| 11 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.16 |
| 12 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.19 |
| 13 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.04 |
| 14 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | +0.08 | – | −0.22 |
| 15 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.18 |
| 16 | Nocturne | +0.75 | +0.92 | +1.00 | +0.92 | −0.01 | – | +0.22 |
| 17 | Trundle | +0.71 | +0.76 | +1.00 | +0.78 | +0.02 | – | +0.80 |
| 18 | Yasuo | +0.65 | +0.99 | +0.49 | +1.00 | +0.10 | – | +0.00 |
| 19 | Warwick | +0.59 | +0.58 | +0.61 | +1.00 | +0.22 | – | −0.02 |
| 20 | Zeri | +0.56 | +0.87 | +0.85 | −0.07 | +0.10 | +1.00 | +0.58 |
| 21 | Udyr | +0.46 | +0.66 | +0.37 | +0.79 | +0.00 | – | +0.00 |
| 22 | Taric | +0.45 | +0.67 | +0.30 | +0.67 | +0.20 | – | +0.05 |
| 23 | Twisted Fate | +0.40 | +0.34 | +0.34 | +0.91 | +0.17 | +0.33 | −0.07 |
| 24 | Corki | +0.25 | +0.69 | +0.81 | −1.00 | +0.25 | +0.39 | −0.09 |
| 25 | Xin Zhao | +0.23 | +0.05 | +0.06 | +0.94 | +0.00 | – | −0.27 |
| 26 | Cho'Gath | +0.20 | +0.39 | +0.96 | −0.85 | +0.10 | – | −0.03 |
| 27 | Ivern | +0.20 | +0.37 | +0.17 | +0.25 | +0.14 | −0.06 | −0.04 |
| 28 | Singed | +0.17 | +0.15 | +0.19 | +0.15 | +0.16 | – | +0.20 |
| 29 | Poppy | +0.15 | +0.05 | +0.24 | +0.06 | +0.28 | – | +0.19 |
| 30 | Hwei | +0.12 | +0.08 | +0.13 | +0.01 | +0.20 | +0.09 | +0.47 |
| 31 | Morgana | +0.09 | +0.15 | −0.03 | +0.09 | +0.26 | −0.09 | +0.26 |
| 32 | Gwen | +0.07 | −0.32 | +0.70 | −0.23 | +0.13 | – | −0.05 |
| 33 | Kled | +0.07 | +0.09 | +0.09 | −0.07 | +0.20 | – | −0.00 |
| 34 | Briar | +0.06 | −0.02 | −0.02 | −0.01 | +0.31 | – | +0.47 |
| 35 | Nasus | +0.06 | +0.01 | −0.04 | +0.04 | +0.19 | – | +0.50 |
| 36 | Lee Sin | +0.06 | +0.05 | +0.11 | −0.02 | +0.12 | – | +0.02 |
| 37 | Karma | +0.06 | +0.21 | −0.01 | −0.14 | +0.03 | +0.06 | +0.47 |
| 38 | Maokai | +0.05 | −0.04 | +0.05 | +0.04 | +0.24 | – | −0.01 |
| 39 | Rakan | +0.05 | +0.03 | +0.14 | −0.04 | +0.03 | −0.00 | +0.21 |
| 40 | Lillia | +0.03 | −0.06 | −0.06 | +0.01 | −0.08 | +0.43 | +0.51 |
| 41 | Soraka | +0.01 | +0.08 | −0.06 | −0.05 | +0.09 | +0.03 | −0.03 |
| 42 | Master Yi | −0.02 | −0.26 | +0.77 | −0.26 | −0.12 | −1.00 | +0.51 |
| 43 | Aurora | −0.03 | −0.02 | −0.08 | +0.02 | −0.04 | −0.13 | +0.28 |
| 44 | Riven | −0.06 | −0.83 | +1.00 | −0.73 | +0.34 | – | −0.00 |
| 45 | Lux | −0.08 | −0.17 | −0.17 | −0.14 | +0.22 | −0.09 | +0.12 |
| 46 | Nami | −0.10 | −0.30 | −0.30 | +0.20 | −0.13 | +0.20 | +0.32 |
| 47 | Malzahar | −0.11 | −0.18 | −0.05 | −0.27 | +0.11 | −0.18 | +0.05 |
| 48 | Swain | −0.11 | −0.14 | −0.16 | −0.21 | +0.09 | −0.14 | +0.07 |
| 49 | Brand | −0.14 | −0.16 | −0.18 | −0.16 | −0.07 | −0.14 | −0.01 |
| 50 | Lulu | −0.16 | −0.45 | −0.02 | +0.13 | +0.10 | −1.00 | +0.29 |
| 51 | Gnar | −0.16 | +0.04 | −0.47 | −0.10 | +0.04 | −0.62 | +0.40 |
| 52 | Camille | −0.20 | +0.64 | −0.75 | −0.88 | +0.15 | – | +0.05 |
| 53 | Sylas | −0.20 | −0.14 | +0.05 | −0.93 | +0.10 | – | +0.20 |
| 54 | Dr. Mundo | −0.21 | −0.25 | −0.27 | −0.25 | −0.06 | – | +0.02 |
| 55 | Senna | −0.21 | −0.11 | −0.11 | −0.35 | −0.14 | −0.80 | +0.26 |
| 56 | Yunara | −0.24 | +0.06 | −0.40 | −0.20 | −0.06 | −1.00 | −0.04 |
| 57 | Elise | −0.25 | −0.95 | −0.02 | −0.12 | +0.13 | −0.10 | +0.23 |
| 58 | Gragas | −0.25 | −0.30 | −0.30 | −0.65 | +0.26 | – | +0.28 |
| 59 | Viktor | −0.26 | −0.71 | −0.31 | +0.00 | −0.08 | +0.02 | +0.17 |
| 60 | Sona | −0.27 | −0.24 | −0.41 | −0.25 | −0.08 | −0.57 | +0.30 |
| 61 | Volibear | −0.28 | −0.11 | −0.93 | −0.11 | +0.17 | – | +0.13 |
| 62 | Sion | −0.28 | −0.33 | −0.32 | −0.67 | +0.29 | – | +0.00 |
| 63 | Milio | −0.28 | −0.72 | −0.73 | +0.14 | +0.20 | +0.16 | +0.12 |
| 64 | Akshan | −0.29 | −0.31 | −0.31 | −0.22 | +0.08 | −1.00 | −0.03 |
| 65 | Anivia | −0.29 | −0.28 | −0.44 | −0.45 | −0.02 | −0.35 | +0.32 |
| 66 | Zoe | −0.29 | −0.04 | −0.93 | −0.29 | +0.04 | −0.04 | +0.15 |
| 67 | Bard | −0.32 | −0.84 | +0.58 | −1.00 | +0.20 | −1.00 | +0.31 |
| 68 | Vex | −0.32 | −0.36 | −0.36 | −0.53 | −0.07 | −0.34 | +0.18 |
| 69 | Kalista | −0.33 | −1.00 | −0.25 | −0.21 | +0.10 | +0.16 | −0.04 |
| 70 | Veigar | −0.34 | −0.63 | −0.45 | −0.28 | +0.02 | −0.28 | +0.29 |
| 71 | Yone | −0.36 | −0.90 | +0.24 | −0.90 | +0.17 | – | −0.13 |
| 72 | Karthus | −0.36 | −0.46 | −0.45 | −0.41 | −0.09 | −0.45 | +0.06 |
| 73 | Varus | −0.37 | −0.20 | −0.20 | −1.00 | +0.01 | −1.00 | +0.58 |
| 74 | Annie | −0.37 | −1.00 | −0.03 | −0.29 | +0.18 | −0.98 | +0.27 |
| 75 | Zyra | −0.38 | −0.34 | −0.33 | −0.92 | +0.20 | −0.64 | +0.05 |
| 76 | Neeko | −0.39 | −0.23 | −0.34 | −0.94 | +0.21 | −0.99 | +0.17 |
| 77 | Syndra | −0.39 | −1.00 | −0.94 | +0.14 | +0.18 | +0.08 | +0.55 |
| 78 | Xayah | −0.44 | −0.96 | −1.00 | +0.68 | −0.09 | −0.96 | +0.40 |
| 79 | K'Sante | −0.45 | +0.00 | −1.00 | −1.00 | +0.29 | – | +0.10 |
| 80 | Leona | −0.45 | −0.43 | −0.43 | −1.00 | +0.01 | – | +0.09 |
| 81 | Seraphine | −0.46 | −0.45 | −0.29 | −1.00 | +0.04 | −0.91 | +0.27 |
| 82 | Tahm Kench | −0.46 | −0.69 | −0.69 | −0.40 | +0.13 | – | −0.18 |
| 83 | Ornn | −0.47 | −1.00 | −0.12 | −1.00 | +0.35 | – | +0.03 |
| 84 | Jax | −0.48 | −0.97 | +0.01 | −0.98 | −0.01 | – | +0.07 |
| 85 | Ahri | −0.49 | −0.31 | −1.00 | −0.92 | +0.20 | −0.26 | +0.32 |
| 86 | Rell | −0.49 | −0.99 | −0.25 | −0.99 | +0.14 | −0.00 | −0.12 |
| 87 | Rek'Sai | −0.50 | −0.84 | −0.20 | −0.84 | −0.05 | – | −0.20 |
| 88 | Smolder | −0.50 | −0.95 | −0.95 | −0.07 | −0.10 | −0.02 | +0.12 |
| 89 | Janna | −0.50 | −0.12 | −1.00 | −0.95 | +0.22 | −0.78 | +0.29 |
| 90 | Draven | −0.53 | −0.86 | −1.00 | −0.48 | +0.12 | −0.05 | +0.29 |
| 91 | Fiddlesticks | −0.57 | −1.00 | −0.23 | −1.00 | +0.20 | −0.98 | +0.12 |
| 92 | Braum | −0.57 | −0.95 | −0.40 | −0.98 | +0.08 | – | +0.14 |
| 93 | Ziggs | −0.58 | −1.00 | −0.20 | −1.00 | +0.07 | −1.00 | +0.11 |
| 94 | Lucian | −0.60 | −0.95 | −0.80 | −0.92 | +0.17 | +0.03 | −0.07 |
| 95 | Mel | −0.62 | −0.40 | −1.00 | −1.00 | +0.20 | −1.00 | +0.04 |
| 96 | Heimerdinger | −0.63 | −1.00 | −0.46 | −0.98 | +0.11 | −1.00 | +0.28 |
| 97 | Jayce | −0.64 | −1.00 | −0.68 | −1.00 | +0.28 | – | +0.07 |
| 98 | Shen | −0.65 | −1.00 | −0.64 | −0.99 | +0.20 | – | −0.06 |
| 99 | Jinx | −0.65 | −0.67 | −0.67 | −1.00 | −0.09 | −1.00 | +0.04 |
| 100 | Teemo | −0.66 | −0.82 | −0.92 | −0.89 | +0.14 | −0.78 | +0.17 |
| 101 | Rengar | −0.67 | −0.90 | −0.93 | −1.00 | +0.28 | – | +0.26 |
| 102 | Lissandra | −0.68 | −1.00 | −1.00 | −0.76 | +0.17 | −0.67 | +0.27 |
| 103 | Blitzcrank | −0.68 | −1.00 | −1.00 | −1.00 | +0.27 | −0.23 | −0.05 |
| 104 | LeBlanc | −0.70 | −1.00 | −1.00 | −1.00 | −0.01 | −0.07 | +0.25 |
| 105 | Malphite | −0.71 | −1.00 | −1.00 | −1.00 | +0.33 | – | +0.20 |
| 106 | Evelynn | −0.72 | −1.00 | −1.00 | −1.00 | +0.34 | – | +0.04 |
| 107 | Rammus | −0.72 | −0.99 | −1.00 | −1.00 | +0.29 | – | +0.13 |
| 108 | Sivir | −0.72 | −0.94 | −0.80 | −0.91 | −0.13 | −0.90 | +0.14 |
| 109 | Ezreal | −0.72 | −0.97 | −0.97 | −1.00 | +0.05 | −0.38 | −0.06 |
| 110 | Kassadin | −0.72 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.40 |
| 111 | Gangplank | −0.73 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.81 |
| 112 | Kai'Sa | −0.73 | −0.99 | −0.99 | −0.62 | −0.02 | −1.00 | −0.11 |
| 113 | Zilean | −0.73 | −0.83 | −1.00 | −0.94 | +0.06 | −1.00 | +0.12 |
| 114 | Alistar | −0.73 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.15 |
| 115 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.12 |
| 116 | Jarvan IV | −0.74 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.10 |
| 117 | Irelia | −0.75 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.29 |
| 118 | Hecarim | −0.75 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.15 |
| 119 | Kayn | −0.75 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.34 |
| 120 | Mordekaiser | −0.75 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.18 |
| 121 | Wukong | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | −0.07 |
| 122 | Xerath | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | −0.99 | +0.40 |
| 123 | Galio | −0.76 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.05 |
| 124 | Kennen | −0.76 | −1.00 | −0.98 | −0.87 | −0.09 | −0.84 | +0.20 |
| 125 | Amumu | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.17 |
| 126 | Rumble | −0.76 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.20 |
| 127 | Jhin | −0.76 | −1.00 | −1.00 | −0.74 | −0.04 | −1.00 | −0.11 |
| 128 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.09 |
| 129 | Zed | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.07 |
| 130 | Kog'Maw | −0.76 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.65 |
| 131 | Fizz | −0.76 | −1.00 | −0.99 | −1.00 | −0.01 | – | +0.23 |
| 132 | Illaoi | −0.77 | −1.00 | −0.98 | −0.99 | +0.07 | – | −0.11 |
| 133 | Nautilus | −0.77 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.03 |
| 134 | Caitlyn | −0.77 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −0.14 |
| 135 | Thresh | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.11 |
| 136 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.07 |
| 137 | Graves | −0.77 | −1.00 | −0.95 | −1.00 | +0.13 | −1.00 | −0.15 |
| 138 | Tryndamere | −0.77 | −1.00 | −0.98 | −1.00 | −0.02 | – | −0.02 |
| 139 | Vi | −0.78 | −1.00 | −0.99 | −0.99 | +0.02 | – | −0.09 |
| 140 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.21 |
| 141 | Kindred | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.05 |
| 142 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.16 |
| 143 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.26 |
| 144 | Orianna | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.26 |
| 145 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.24 |
| 146 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.07 |
| 147 | Samira | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.03 |
| 148 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.12 |
| 149 | Shaco | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.23 |
| 150 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.16 |
| 151 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.45 |
| 152 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.14 |
| 153 | Renekton | −0.80 | −1.00 | −0.97 | −1.00 | −0.11 | – | −0.16 |
| 154 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.05 |
| 155 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.12 |
| 156 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.05 |
| 157 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.13 |
| 158 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.05 |
| 159 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.23 |
| 160 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.16 |
| 161 | Vel'Koz | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.16 |
| 162 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.03 |
| 163 | Miss Fortune | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.16 |
| 164 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.19 |
| 165 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.20 |
| 166 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.25 |
| 167 | Tristana | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.04 |
| 168 | Ryze | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.04 |
| 169 | Aurelion Sol | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.05 |
| 170 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.07 |
| 171 | Nidalee | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.09 |
| 172 | Vladimir | −0.86 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | −0.15 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Zac's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zac's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zac` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Maokai (net +2.00)

- **0.94** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Elastic Slingshot. Untargetable for 1.4 s; Elastic Slingshot takes 1.33 s to land, enough to react. (Maokai W Twisted Advance → Zac E Elastic Slingshot)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Let's Bounce!. Untargetable for 1.4 s; Let's Bounce! takes 0.3 s to land, enough to react. (Maokai W Twisted Advance → Zac R Let's Bounce!)
- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Stretching Strikes. Untargetable for 1.4 s; Stretching Strikes takes 0.62 s to land, enough to react. (Maokai W Twisted Advance → Zac Q Stretching Strikes)

#### 2. Nocturne (net +1.73)

- **0.85** spell shield: Shroud of Darkness's spell shield blocks Zac's Elastic Slingshot. Spell shield for 1.5 s, long enough to use ahead of Elastic Slingshot. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zac E Elastic Slingshot)
- **0.45** interrupt: Unspeakable Horror's fear interrupts Zac's Elastic Slingshot (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Zac E Elastic Slingshot)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Zac's Let's Bounce!. Spell shield for 1.5 s, long enough to use ahead of Let's Bounce!. A spell shield blocks only the first enemy ability that reaches it. Spell shield only blocks a single instance of damage. (Nocturne W Shroud of Darkness → Zac R Let's Bounce!)

#### 3. Zaahen (net +1.65)

- **0.80** cc immunity: Grim Deliverance makes Zaahen immune to Zac's Let's Bounce! (airborne, slow). Immune for ?; Let's Bounce! takes 0.3 s to land, enough to react. (Zaahen R Grim Deliverance → Zac R Let's Bounce!)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Zac's Elastic Slingshot (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Zac E Elastic Slingshot)
- **0.47** cc immunity: Grim Deliverance makes Zaahen immune to Zac's Elastic Slingshot (airborne, stun). Immune for ?; Elastic Slingshot takes 1.33 s to land, enough to react. (Zaahen R Grim Deliverance → Zac E Elastic Slingshot)
- Watch out: Stretching Strikes's knockdown can stop Zaahen's Aureate Rush mid-dash.

#### 4. Udyr (net +1.64)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Zac's Elastic Slingshot (airborne, stun). Immune for 1.5 s, long enough to use ahead of Elastic Slingshot. (Udyr E Blazing Stampede → Zac E Elastic Slingshot)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Zac's Let's Bounce! (airborne, slow). Immune for 1.5 s, long enough to use ahead of Let's Bounce!. (Udyr E Blazing Stampede → Zac R Let's Bounce!)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Zac's Stretching Strikes (airborne, knockdown, slow, root, stun). Immune for 1.5 s, long enough to use ahead of Stretching Strikes. (Udyr E Blazing Stampede → Zac Q Stretching Strikes)

#### 5. Rell (net +1.51)

- **0.50** interrupt: Shattering Strike's stun interrupts Zac's Elastic Slingshot (movement channel). Shattering Strike must land during the channel. (Rell Q Shattering Strike → Zac E Elastic Slingshot)
- **0.47** interrupt: Ferromancy: Crash Down's airborne interrupts Zac's Elastic Slingshot (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Zac E Elastic Slingshot)
- **0.47** interrupt: Ferromancy: Mount Up's airborne interrupts Zac's Elastic Slingshot (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Zac E Elastic Slingshot)
- Watch out: Stretching Strikes's knockdown can stop Rell's Ferromancy: Crash Down mid-dash.

#### 6. Morgana (net +1.45)

- **0.80** cc immunity: Black Shield makes Morgana immune to Zac's Let's Bounce! (airborne, slow). Immune for 5 s, long enough to use ahead of Let's Bounce!. (Morgana E Black Shield → Zac R Let's Bounce!)
- **0.74** cc immunity: Black Shield makes Morgana immune to Zac's Elastic Slingshot (airborne, stun). Immune for 5 s, long enough to use ahead of Elastic Slingshot. (Morgana E Black Shield → Zac E Elastic Slingshot)
- **0.49** cc immunity: Black Shield makes Morgana immune to Zac's Stretching Strikes (airborne, knockdown, slow, root, stun). Immune for 5 s, long enough to use ahead of Stretching Strikes. (Morgana E Black Shield → Zac Q Stretching Strikes)

#### 7. Alistar (net +1.43)

- **0.64** cleanse: Unbreakable Will cleanses Zac's Let's Bounce! (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Zac R Let's Bounce!)
- **0.47** interrupt: Pulverize's airborne interrupts Zac's Elastic Slingshot (movement channel). Pulverize must land during the channel. (Alistar Q Pulverize → Zac E Elastic Slingshot)
- **0.47** interrupt: Trample's stun interrupts Zac's Elastic Slingshot (movement channel). Trample must land during the channel. (Alistar E Trample → Zac E Elastic Slingshot)
- Watch out: Stretching Strikes's knockdown can stop Alistar's Headbutt mid-dash.

#### 8. Milio (net +1.39)

- **0.47** interrupt: Ultra Mega Fire Kick's airborne interrupts Zac's Elastic Slingshot (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Zac E Elastic Slingshot)
- **0.35** cleanse: Breath of Life cleanses Zac's Elastic Slingshot (stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Zac E Elastic Slingshot)
- **0.34** range: Milio's basic attacks reach 350 units farther than Zac's (525 vs 175 attack range). Zac closes the gap with Elastic Slingshot. (Milio basic attacks → Zac basic attacks)

#### 9. Xayah (net +1.39)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Zac's Let's Bounce!. Untargetable for 1.5 s, long enough to use ahead of Let's Bounce!. (Xayah R Featherstorm → Zac R Let's Bounce!)
- **0.45** untargetable: Featherstorm makes Xayah untargetable, dodging Zac's Elastic Slingshot. Untargetable for 1.5 s, long enough to use ahead of Elastic Slingshot. (Xayah R Featherstorm → Zac E Elastic Slingshot)
- **0.34** range: Xayah's basic attacks reach 350 units farther than Zac's (525 vs 175 attack range). Zac closes the gap with Elastic Slingshot. (Xayah basic attacks → Zac basic attacks)

#### 10. Lissandra (net +1.37)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zac's Let's Bounce!. Untargetable for 2.5 s, long enough to use ahead of Let's Bounce!. (Lissandra R Frozen Tomb → Zac R Let's Bounce!)
- **0.47** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zac's Elastic Slingshot. Untargetable for 2.5 s, long enough to use ahead of Elastic Slingshot. (Lissandra R Frozen Tomb → Zac E Elastic Slingshot)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zac's Stretching Strikes. Untargetable for 2.5 s, long enough to use ahead of Stretching Strikes. (Lissandra R Frozen Tomb → Zac Q Stretching Strikes)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +2.00 | 2.00 | 0.00 |  |
| 2 | Nocturne | +1.73 | 1.73 | 0.00 |  |
| 3 | Zaahen | +1.65 | 2.05 | 0.40 |  |
| 4 | Udyr | +1.64 | 1.64 | 0.00 |  |
| 5 | Rell | +1.51 | 2.14 | 0.63 |  |
| 6 | Morgana | +1.45 | 1.45 | 0.00 |  |
| 7 | Alistar | +1.43 | 1.83 | 0.40 |  |
| 8 | Milio | +1.39 | 1.39 | 0.00 |  |
| 9 | Xayah | +1.39 | 1.39 | 0.00 |  |
| 10 | Lissandra | +1.37 | 1.37 | 0.00 |  |
| 11 | Sivir | +1.37 | 1.37 | 0.00 |  |
| 12 | Shaco | +1.30 | 1.50 | 0.20 |  |
| 13 | Sion | +1.29 | 1.66 | 0.37 |  |
| 14 | Fizz | +1.24 | 1.81 | 0.57 |  |
| 15 | Rek'Sai | +1.23 | 1.63 | 0.40 |  |
| 16 | Vladimir | +1.22 | 1.44 | 0.22 |  |
| 17 | Blitzcrank | +1.21 | 1.21 | 0.00 |  |
| 18 | Heimerdinger | +1.21 | 1.21 | 0.00 |  |
| 19 | Singed | +1.17 | 1.17 | 0.00 | grounding (Mega Adhesive) |
| 20 | Bard | +1.15 | 1.45 | 0.30 |  |
| 21 | Fiora | +1.14 | 1.48 | 0.34 |  |
| 22 | Evelynn | +1.13 | 1.57 | 0.44 |  |
| 23 | Viktor | +1.13 | 1.13 | 0.00 | dash stop (Gravity Field) |
| 24 | Olaf | +1.12 | 1.12 | 0.00 |  |
| 25 | Anivia | +1.10 | 1.10 | 0.00 |  |
| 26 | Yasuo | +1.09 | 1.27 | 0.18 | projectile block (Wind Wall) |
| 27 | Gangplank | +1.06 | 1.06 | 0.00 |  |
| 28 | Lulu | +1.06 | 1.06 | 0.00 |  |
| 29 | Zed | +1.05 | 1.05 | 0.00 |  |
| 30 | Kled | +1.02 | 1.62 | 0.60 |  |
| 31 | Braum | +1.00 | 1.40 | 0.40 | projectile block (Unbreakable) |
| 32 | Cho'Gath | +1.00 | 1.00 | 0.00 |  |
| 33 | Garen | +0.98 | 0.98 | 0.00 |  |
| 34 | K'Sante | +0.96 | 1.36 | 0.40 |  |
| 35 | Vex | +0.96 | 0.96 | 0.00 |  |
| 36 | Renata Glasc | +0.95 | 0.95 | 0.00 |  |
| 37 | Nami | +0.94 | 0.94 | 0.00 |  |
| 38 | Master Yi | +0.93 | 1.50 | 0.57 |  |
| 39 | Camille | +0.92 | 1.62 | 0.70 |  |
| 40 | Cassiopeia | +0.92 | 0.92 | 0.00 | grounding (Miasma) |
| 41 | Kayle | +0.92 | 0.92 | 0.00 |  |
| 42 | Seraphine | +0.92 | 0.92 | 0.00 |  |
| 43 | Hwei | +0.91 | 0.91 | 0.00 | dash stop (Grim Visage) |
| 44 | Gwen | +0.87 | 1.27 | 0.40 |  |
| 45 | Kalista | +0.87 | 1.09 | 0.22 |  |
| 46 | Teemo | +0.86 | 0.94 | 0.08 | blind (Blinding Dart) |
| 47 | Aurora | +0.85 | 1.34 | 0.49 |  |
| 48 | Veigar | +0.81 | 0.81 | 0.00 |  |
| 49 | Rengar | +0.80 | 1.19 | 0.39 |  |
| 50 | Zilean | +0.80 | 0.80 | 0.00 |  |
| 51 | Sett | +0.78 | 0.78 | 0.00 |  |
| 52 | Kennen | +0.74 | 0.74 | 0.00 |  |
| 53 | Jinx | +0.72 | 0.72 | 0.00 | dash stop (Flame Chompers!) |
| 54 | Brand | +0.71 | 0.71 | 0.00 |  |
| 55 | Annie | +0.69 | 0.69 | 0.00 |  |
| 56 | Zoe | +0.69 | 0.69 | 0.00 |  |
| 57 | Xin Zhao | +0.67 | 1.07 | 0.40 |  |
| 58 | Sejuani | +0.66 | 1.16 | 0.50 |  |
| 59 | Mel | +0.66 | 0.66 | 0.00 | projectile block (Rebuttal) |
| 60 | Yuumi | +0.65 | 1.85 | 1.20 |  |
| 61 | Yone | +0.65 | 1.00 | 0.35 |  |
| 62 | Swain | +0.65 | 0.65 | 0.00 |  |
| 63 | Malzahar | +0.64 | 1.81 | 1.17 |  |
| 64 | Jax | +0.64 | 0.98 | 0.34 | attack dodge (Counter Strike) |
| 65 | Gnar | +0.63 | 1.08 | 0.45 |  |
| 66 | Thresh | +0.62 | 1.13 | 0.51 |  |
| 67 | Sona | +0.62 | 0.62 | 0.00 |  |
| 68 | Soraka | +0.62 | 0.62 | 0.00 |  |
| 69 | Ashe | +0.61 | 0.61 | 0.00 |  |
| 70 | Vayne | +0.57 | 0.83 | 0.26 |  |
| 71 | Mordekaiser | +0.57 | 0.57 | 0.00 |  |
| 72 | Shyvana | +0.55 | 0.55 | 0.00 |  |
| 73 | Draven | +0.52 | 0.77 | 0.25 |  |
| 74 | Ahri | +0.51 | 0.86 | 0.35 | dash stop (Charm) |
| 75 | Elise | +0.51 | 0.77 | 0.26 |  |
| 76 | Kassadin | +0.50 | 0.50 | 0.00 |  |
| 77 | Malphite | +0.50 | 0.50 | 0.00 |  |
| 78 | Rammus | +0.49 | 1.22 | 0.73 |  |
| 79 | Aphelios | +0.48 | 0.48 | 0.00 |  |
| 80 | Jayce | +0.47 | 0.73 | 0.26 |  |
| 81 | Zyra | +0.47 | 0.47 | 0.00 |  |
| 82 | Orianna | +0.46 | 0.46 | 0.00 |  |
| 83 | Taric | +0.43 | 0.43 | 0.00 |  |
| 84 | Yorick | +0.43 | 0.43 | 0.00 |  |
| 85 | Nilah | +0.40 | 0.80 | 0.40 | attack dodge (Jubilant Veil) |
| 86 | Volibear | +0.38 | 0.63 | 0.25 |  |
| 87 | Skarner | +0.38 | 0.38 | 0.00 |  |
| 88 | Trundle | +0.38 | 0.38 | 0.00 |  |
| 89 | Darius | +0.37 | 0.37 | 0.00 |  |
| 90 | Syndra | +0.34 | 0.59 | 0.25 |  |
| 91 | Neeko | +0.33 | 0.44 | 0.11 |  |
| 92 | Leona | +0.32 | 0.75 | 0.43 |  |
| 93 | Urgot | +0.32 | 0.75 | 0.43 |  |
| 94 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 95 | Tristana | +0.29 | 0.59 | 0.30 |  |
| 96 | Twitch | +0.29 | 0.40 | 0.11 |  |
| 97 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 98 | Amumu | +0.28 | 0.78 | 0.50 |  |
| 99 | Samira | +0.28 | 0.69 | 0.41 | projectile block (Blade Whirl) |
| 100 | Aurelion Sol | +0.27 | 0.91 | 0.64 |  |
| 101 | Lux | +0.27 | 0.27 | 0.00 |  |
| 102 | Ziggs | +0.25 | 0.68 | 0.43 |  |
| 103 | Riven | +0.24 | 0.91 | 0.67 |  |
| 104 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 105 | Bel'Veth | +0.23 | 0.50 | 0.27 |  |
| 106 | Senna | +0.21 | 0.32 | 0.11 |  |
| 107 | Ornn | +0.19 | 0.89 | 0.70 |  |
| 108 | Aatrox | +0.19 | 0.50 | 0.31 |  |
| 109 | Karma | +0.19 | 0.19 | 0.00 |  |
| 110 | Kayn | +0.14 | 1.62 | 1.48 |  |
| 111 | Irelia | +0.13 | 0.47 | 0.34 |  |
| 112 | Varus | +0.12 | 0.39 | 0.27 |  |
| 113 | Smolder | +0.12 | 0.30 | 0.18 |  |
| 114 | Kindred | +0.11 | 0.41 | 0.30 |  |
| 115 | Zeri | +0.11 | 0.41 | 0.30 |  |
| 116 | Hecarim | +0.11 | 0.31 | 0.20 |  |
| 117 | Renekton | +0.10 | 0.50 | 0.40 |  |
| 118 | Rakan | +0.09 | 0.79 | 0.70 |  |
| 119 | Azir | +0.09 | 0.46 | 0.37 |  |
| 120 | Yunara | +0.06 | 0.36 | 0.30 |  |
| 121 | Corki | 0.00 | 0.30 | 0.30 |  |
| 122 | Lillia | 0.00 | 0.30 | 0.30 |  |
| 123 | Nidalee | 0.00 | 0.26 | 0.26 |  |
| 124 | Illaoi | 0.00 | 0.16 | 0.16 |  |
| 125 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 126 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 127 | Quinn | -0.03 | 0.84 | 0.87 |  |
| 128 | Poppy | -0.04 | 0.86 | 0.90 | dash stop (Steadfast Presence) |
| 129 | Tahm Kench | -0.06 | 1.20 | 1.26 |  |
| 130 | Warwick | -0.07 | 1.78 | 1.85 |  |
| 131 | Kai'Sa | -0.07 | 0.34 | 0.41 |  |
| 132 | Ambessa | -0.09 | 0.23 | 0.32 |  |
| 133 | Vel'Koz | -0.12 | 0.70 | 0.82 |  |
| 134 | Jarvan IV | -0.13 | 0.31 | 0.44 |  |
| 135 | Twisted Fate | -0.17 | 0.88 | 1.05 |  |
| 136 | Diana | -0.17 | 0.23 | 0.40 |  |
| 137 | Nautilus | -0.17 | 0.23 | 0.40 |  |
| 138 | Viego | -0.18 | 0.81 | 0.99 |  |
| 139 | Gragas | -0.19 | 0.67 | 0.86 |  |
| 140 | Fiddlesticks | -0.22 | 1.08 | 1.30 |  |
| 141 | LeBlanc | -0.22 | 0.19 | 0.41 |  |
| 142 | Janna | -0.24 | 0.96 | 1.20 |  |
| 143 | Xerath | -0.27 | 0.68 | 0.95 |  |
| 144 | Pyke | -0.30 | 0.95 | 1.25 |  |
| 145 | Graves | -0.30 | 0.20 | 0.50 |  |
| 146 | Sylas | -0.31 | 0.47 | 0.78 |  |
| 147 | Taliyah | -0.34 | 1.34 | 1.68 |  |
| 148 | Lee Sin | -0.35 | 0.25 | 0.60 |  |
| 149 | Briar | -0.37 | 0.23 | 0.60 |  |
| 150 | Ekko | -0.37 | 0.00 | 0.37 |  |
| 151 | Qiyana | -0.38 | 0.22 | 0.60 |  |
| 152 | Shen | -0.40 | 1.23 | 1.63 | attack block (Spirit's Refuge) |
| 153 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 154 | Wukong | -0.41 | 0.23 | 0.64 |  |
| 155 | Vi | -0.45 | 0.81 | 1.26 |  |
| 156 | Talon | -0.50 | 0.00 | 0.50 |  |
| 157 | Kha'Zix | -0.51 | 0.00 | 0.51 |  |
| 158 | Miss Fortune | -0.54 | 0.30 | 0.84 |  |
| 159 | Ivern | -0.57 | 0.16 | 0.73 |  |
| 160 | Jhin | -0.59 | 0.25 | 0.84 |  |
| 161 | Katarina | -0.63 | 0.12 | 0.75 |  |
| 162 | Caitlyn | -0.64 | 0.36 | 1.00 |  |
| 163 | Locke | -0.65 | 0.00 | 0.65 |  |
| 164 | Galio | -0.68 | 1.11 | 1.79 |  |
| 165 | Karthus | -0.68 | 0.16 | 0.84 |  |
| 166 | Akali | -0.68 | 0.00 | 0.68 |  |
| 167 | Lucian | -0.69 | 0.31 | 1.00 |  |
| 168 | Akshan | -0.71 | 0.29 | 1.00 |  |
| 169 | Nunu & Willump | -0.81 | 0.54 | 1.35 |  |
| 170 | Ryze | -0.83 | 0.22 | 1.05 |  |
| 171 | Pantheon | -1.03 | 0.63 | 1.66 |  |
| 172 | Naafiri | -1.64 | 0.00 | 1.64 |  |
