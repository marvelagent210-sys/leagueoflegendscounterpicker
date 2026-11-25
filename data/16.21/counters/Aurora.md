# Counters to Aurora (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Aurora: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Aurora wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Aurora --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.88 | +1.00 | +1.00 | +1.00 | +0.43 | +1.00 | +0.31 |
| 2 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.55 |
| 3 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.74 |
| 4 | Master Yi | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.14 |
| 5 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.42 |
| 6 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.36 |
| 7 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.15 |
| 8 | Sion | +0.80 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.31 |
| 9 | Zeri | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.13 |
| 10 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.01 |
| 11 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.14 |
| 12 | Lucian | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.45 |
| 13 | Nocturne | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.17 |
| 14 | Annie | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.19 |
| 15 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.17 |
| 16 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.17 |
| 17 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.08 |
| 18 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.05 |
| 19 | Jinx | +0.79 | +0.99 | +0.98 | +1.00 | +0.07 | – | +0.17 |
| 20 | Vi | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.09 |
| 21 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.17 |
| 22 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.42 |
| 23 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.27 |
| 24 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.05 |
| 25 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.10 |
| 26 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.04 |
| 27 | Graves | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.31 |
| 28 | Miss Fortune | +0.78 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.12 |
| 29 | Kayle | +0.78 | +1.00 | +1.00 | +1.00 | +0.07 | – | −0.24 |
| 30 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | −0.17 |
| 31 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.10 |
| 32 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.09 |
| 33 | Yunara | +0.77 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.22 |
| 34 | Heimerdinger | +0.76 | +1.00 | +0.90 | +1.00 | +0.06 | – | +0.08 |
| 35 | Xayah | +0.76 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.23 |
| 36 | Smolder | +0.76 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.37 |
| 37 | Kalista | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.11 |
| 38 | Lulu | +0.76 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.30 |
| 39 | Kog'Maw | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.18 |
| 40 | Kindred | +0.76 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.34 |
| 41 | Jhin | +0.75 | +1.00 | +1.00 | +0.94 | −0.05 | – | −0.06 |
| 42 | Twisted Fate | +0.75 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.21 |
| 43 | Orianna | +0.75 | +1.00 | +0.86 | +1.00 | +0.07 | – | −0.02 |
| 44 | Quinn | +0.74 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.46 |
| 45 | Kai'Sa | +0.74 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.40 |
| 46 | Vel'Koz | +0.74 | +1.00 | +0.78 | +0.92 | +0.17 | – | +0.22 |
| 47 | Mordekaiser | +0.73 | +0.92 | +0.82 | +1.00 | −0.08 | +0.88 | +0.37 |
| 48 | Volibear | +0.72 | +1.00 | +0.73 | +1.00 | −0.06 | +1.00 | +0.00 |
| 49 | Caitlyn | +0.72 | +0.86 | +0.89 | +0.95 | +0.01 | +0.99 | −0.26 |
| 50 | Galio | +0.71 | +1.00 | +1.00 | +1.00 | +0.04 | +0.03 | +0.09 |
| 51 | Dr. Mundo | +0.61 | +0.94 | +0.56 | +0.75 | −0.07 | +0.90 | +0.09 |
| 52 | Rumble | +0.60 | +0.99 | +0.97 | +0.66 | −0.09 | −0.08 | −0.08 |
| 53 | Garen | +0.60 | +1.00 | +1.00 | +1.00 | +0.03 | −1.00 | −0.15 |
| 54 | Warwick | +0.58 | +1.00 | +1.00 | +1.00 | −0.09 | −1.00 | −0.20 |
| 55 | Renekton | +0.57 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | −0.15 |
| 56 | Braum | +0.48 | +0.86 | +0.72 | +1.00 | −0.06 | −1.00 | −0.17 |
| 57 | Lee Sin | +0.47 | +1.00 | +0.10 | +1.00 | −0.03 | +0.01 | −0.03 |
| 58 | Kled | +0.41 | +1.00 | +1.00 | −1.00 | +0.07 | +1.00 | −0.04 |
| 59 | Olaf | +0.35 | +1.00 | +1.00 | −1.00 | −0.11 | +0.80 | −0.24 |
| 60 | Azir | +0.35 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.16 |
| 61 | Yasuo | +0.34 | −0.09 | +1.00 | +0.02 | +0.02 | +0.91 | +0.28 |
| 62 | Nilah | +0.33 | +0.00 | +1.00 | +0.98 | −0.08 | −1.00 | −0.04 |
| 63 | Sett | +0.29 | +1.00 | −0.15 | +1.00 | −0.18 | −0.95 | −0.09 |
| 64 | Ziggs | +0.25 | −1.00 | +1.00 | +1.00 | +0.15 | – | +0.06 |
| 65 | Draven | +0.21 | −0.98 | +1.00 | +1.00 | −0.07 | – | −0.01 |
| 66 | Xin Zhao | +0.20 | +1.00 | +1.00 | −1.00 | +0.04 | −1.00 | −0.10 |
| 67 | Jayce | +0.20 | +1.00 | −0.62 | +1.00 | +0.05 | −1.00 | −0.04 |
| 68 | Malzahar | +0.20 | +0.96 | −1.00 | +0.99 | −0.03 | – | −0.10 |
| 69 | Malphite | +0.19 | +1.00 | +1.00 | −1.00 | −0.08 | −1.00 | +0.03 |
| 70 | Pantheon | +0.19 | +1.00 | +1.00 | −1.00 | −0.08 | −1.00 | +0.01 |
| 71 | Rammus | +0.18 | +1.00 | +1.00 | −1.00 | −0.19 | −1.00 | +0.26 |
| 72 | Lillia | +0.14 | −0.83 | +0.29 | +0.86 | −0.04 | +1.00 | +0.21 |
| 73 | Anivia | +0.05 | +0.12 | +0.06 | +0.01 | −0.10 | – | +0.32 |
| 74 | Zac | +0.03 | +0.08 | +0.02 | −0.02 | +0.04 | +0.13 | −0.28 |
| 75 | Rakan | +0.02 | +0.08 | −0.05 | +0.06 | −0.06 | +0.05 | +0.19 |
| 76 | Zaahen | −0.02 | −0.15 | +1.00 | −1.00 | −0.16 | −0.23 | +0.28 |
| 77 | Tahm Kench | −0.08 | −0.08 | −0.06 | −0.18 | −0.05 | +0.07 | −0.15 |
| 78 | Aphelios | −0.10 | −0.53 | −0.52 | +1.00 | −0.05 | – | −0.42 |
| 79 | Sivir | −0.13 | +0.69 | −0.46 | −0.83 | −0.01 | – | −0.17 |
| 80 | Zed | −0.15 | +0.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.38 |
| 81 | Yone | −0.18 | +0.00 | −1.00 | +1.00 | −0.13 | −1.00 | −0.28 |
| 82 | Maokai | −0.22 | −1.00 | +1.00 | −1.00 | +0.01 | −0.11 | −0.22 |
| 83 | Zilean | −0.25 | −0.02 | −0.42 | −0.51 | −0.04 | – | −0.18 |
| 84 | Diana | −0.28 | −1.00 | +1.00 | −1.00 | +0.19 | −1.00 | −0.18 |
| 85 | Swain | −0.32 | −0.63 | +0.26 | −0.89 | −0.02 | – | −0.31 |
| 86 | Varus | −0.32 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.24 |
| 87 | Gangplank | −0.34 | −1.00 | +0.04 | −1.00 | +0.05 | +1.00 | −0.25 |
| 88 | Ivern | −0.35 | −0.60 | −0.64 | +0.16 | −0.11 | – | −0.33 |
| 89 | Neeko | −0.35 | −1.00 | −1.00 | +1.00 | −0.04 | – | −0.09 |
| 90 | Samira | −0.35 | −1.00 | −1.00 | +1.00 | +0.04 | – | −0.35 |
| 91 | Gragas | −0.40 | −1.00 | −1.00 | +1.00 | −0.02 | −1.00 | +0.09 |
| 92 | Irelia | −0.40 | −1.00 | −1.00 | +1.00 | +0.02 | −1.00 | −0.13 |
| 93 | Singed | −0.42 | −1.00 | −1.00 | +1.00 | −0.11 | −1.00 | +0.04 |
| 94 | Twitch | −0.42 | −0.66 | +0.00 | −1.00 | −0.02 | – | −0.23 |
| 95 | Wukong | −0.43 | −1.00 | −1.00 | +1.00 | −0.26 | −1.00 | +0.17 |
| 96 | Illaoi | −0.44 | −1.00 | −0.19 | −0.30 | −0.09 | −0.58 | −0.11 |
| 97 | Soraka | −0.45 | −0.39 | −0.39 | −0.94 | −0.05 | – | −0.19 |
| 98 | Gwen | −0.61 | −1.00 | −1.00 | −1.00 | −0.07 | +1.00 | +0.03 |
| 99 | Fizz | −0.63 | −1.00 | −1.00 | −1.00 | −0.14 | +1.00 | −0.17 |
| 100 | Akali | −0.64 | −0.57 | −1.00 | −1.00 | −0.04 | −0.45 | +0.16 |
| 101 | Kayn | −0.64 | −1.00 | −1.00 | −1.00 | −0.10 | +0.82 | −0.13 |
| 102 | Briar | −0.64 | −1.00 | −1.00 | −1.00 | −0.27 | +1.00 | +0.01 |
| 103 | Milio | −0.67 | −0.95 | −0.94 | −0.62 | +0.06 | – | −0.20 |
| 104 | Sejuani | −0.67 | −0.98 | −1.00 | −1.00 | −0.11 | +0.37 | +0.14 |
| 105 | Gnar | −0.69 | −0.84 | −0.72 | −1.00 | −0.03 | −1.00 | +0.08 |
| 106 | Aurelion Sol | −0.69 | −1.00 | −1.00 | −1.00 | +0.53 | – | −0.09 |
| 107 | Taric | −0.71 | −0.99 | −0.90 | −0.99 | +0.01 | −0.34 | −0.07 |
| 108 | Karthus | −0.72 | −1.00 | −1.00 | −0.60 | +0.05 | −1.00 | −0.12 |
| 109 | Fiddlesticks | −0.74 | −0.88 | −0.88 | −1.00 | −0.09 | – | −0.18 |
| 110 | Ahri | −0.76 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.26 |
| 111 | Hwei | −0.76 | −1.00 | −1.00 | −0.92 | −0.01 | – | −0.04 |
| 112 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.32 |
| 113 | Brand | −0.77 | −1.00 | −1.00 | −0.88 | −0.02 | – | −0.30 |
| 114 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.02 |
| 115 | Ezreal | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.12 |
| 116 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.03 |
| 117 | Janna | −0.78 | −1.00 | −0.99 | −0.88 | −0.04 | – | −0.39 |
| 118 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.24 |
| 119 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.06 |
| 120 | Karma | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.01 |
| 121 | Zyra | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.04 |
| 122 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.11 |
| 123 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.11 |
| 124 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 125 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.05 |
| 126 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.16 |
| 127 | Mel | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.27 |
| 128 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.18 |
| 129 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.20 |
| 130 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.15 |
| 131 | Rek'Sai | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.38 |
| 132 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.07 |
| 133 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.15 |
| 134 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.07 |
| 135 | Ambessa | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.36 |
| 136 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.15 |
| 137 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.06 |
| 138 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.16 |
| 139 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.19 |
| 140 | Rell | −0.80 | −1.00 | −0.98 | −1.00 | +0.04 | −1.00 | −0.14 |
| 141 | Morgana | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.08 |
| 142 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.38 |
| 143 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.40 |
| 144 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.03 |
| 145 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.01 |
| 146 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.11 |
| 147 | Nidalee | −0.80 | −1.00 | −1.00 | −0.98 | −0.06 | – | −0.33 |
| 148 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.20 |
| 149 | Riven | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.16 |
| 150 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.12 |
| 151 | Renata Glasc | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.30 |
| 152 | Syndra | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.53 |
| 153 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.27 |
| 154 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.17 |
| 155 | Bard | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.31 |
| 156 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.25 |
| 157 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.06 |
| 158 | Leona | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.12 |
| 159 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.13 |
| 160 | Alistar | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.25 |
| 161 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.08 |
| 162 | Ornn | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.15 |
| 163 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.29 |
| 164 | Viego | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.13 |
| 165 | Shaco | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.12 |
| 166 | Bel'Veth | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.43 |
| 167 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.43 |
| 168 | Cho'Gath | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.28 |
| 169 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.25 |
| 170 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.23 |
| 171 | Aatrox | −0.84 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.54 |
| 172 | Ekko | −0.84 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.41 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Aurora's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Aurora's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Aurora` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.70)

- **0.70** spell shield: Spell Shield's spell shield blocks Aurora's Between Worlds. Spell shield for 1.5 s, long enough to use ahead of Between Worlds. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Aurora R Between Worlds)

#### 2. Xayah (net +0.27)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Aurora's Between Worlds. Untargetable for 1.5 s, long enough to use ahead of Between Worlds. (Xayah R Featherstorm → Aurora R Between Worlds)
- Watch out: Between Worlds makes Aurora untargetable, dodging Xayah's Featherstorm.

#### 3. Kayle (net +0.26)

- **0.35** invulnerable: Divine Judgment makes Kayle invulnerable to Aurora's Between Worlds (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Between Worlds. (Kayle R Divine Judgment → Aurora R Between Worlds)
- **0.03** range: Kayle's basic attacks reach 75 units farther than Aurora's (625 vs 550 attack range). Aurora closes the gap with Across the Veil, Between Worlds, The Weirding. (Kayle basic attacks → Aurora basic attacks)
- Watch out: Between Worlds makes Aurora untargetable, dodging Kayle's Starfire Spellblade.

#### 4. Kai'Sa (net +0.15)

- **0.15** reveal: Void Seeker reveals Aurora through Across the Veil's stealth. (Kai'Sa W Void Seeker → Aurora W Across the Veil)

#### 5. Vladimir (net +0.13)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aurora's Between Worlds. Untargetable for 2 s, long enough to use ahead of Between Worlds. (Vladimir W Sanguine Pool → Aurora R Between Worlds)
- Watch out: Between Worlds makes Aurora untargetable, dodging Vladimir's Hemoplague.

#### 6. Master Yi (net +0.12)

- **0.42** untargetable: Alpha Strike makes Master Yi untargetable, dodging Aurora's Between Worlds. Untargetable for ?; Between Worlds lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Aurora R Between Worlds)
- **0.14** cleanse: Highlander cleanses Aurora's Between Worlds (slow) after it lands. 85 s cooldown; usable while crowd controlled. (Master Yi R Highlander → Aurora R Between Worlds)
- **0.08** cc immunity: Highlander makes Master Yi immune to Aurora's Between Worlds (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Aurora R Between Worlds)
- Watch out: Aurora's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range).

#### 7. Samira (net +0.02)

- **0.27** projectile block: Blade Whirl blocks Aurora's Twofold Hex, a projectile. Blade Whirl for 0.75 s; Twofold Hex takes 0.81 s to land, enough to react. (Samira W Blade Whirl → Aurora Q Twofold Hex)
- **0.24** projectile block: Blade Whirl blocks Aurora's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Aurora basic attacks)
- Watch out: Between Worlds makes Aurora untargetable, dodging Samira's Wild Rush.

#### 8. Lissandra (net +0.01)

- **0.70** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aurora's Between Worlds. Untargetable for 2.5 s, long enough to use ahead of Between Worlds. (Lissandra R Frozen Tomb → Aurora R Between Worlds)
- **0.16** dash stop: Frozen Tomb's knockdown can stop Aurora's Across the Veil mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Aurora W Across the Veil)
- **0.14** dash stop: Frozen Tomb's knockdown can stop Aurora's The Weirding mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Aurora E The Weirding)
- Watch out: Between Worlds makes Aurora untargetable, dodging Lissandra's Frozen Tomb.

#### 9. Twitch (net 0.00)

- No interaction in Twitch's favor.

#### 10. Yunara (net 0.00)

- No interaction in Yunara's favor.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.70 | 0.70 | 0.00 |  |
| 2 | Xayah | +0.27 | 0.70 | 0.43 |  |
| 3 | Kayle | +0.26 | 0.38 | 0.12 |  |
| 4 | Kai'Sa | +0.15 | 0.15 | 0.00 |  |
| 5 | Vladimir | +0.13 | 0.70 | 0.57 |  |
| 6 | Master Yi | +0.12 | 0.63 | 0.51 |  |
| 7 | Samira | +0.02 | 0.39 | 0.37 |  |
| 8 | Lissandra | +0.01 | 0.82 | 0.81 |  |
| 9 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 10 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 11 | Hwei | -0.01 | 0.75 | 0.76 |  |
| 12 | Teemo | -0.02 | 0.38 | 0.40 |  |
| 13 | Jinx | -0.03 | 0.45 | 0.48 |  |
| 14 | Twisted Fate | -0.03 | 0.15 | 0.18 |  |
| 15 | Bard | -0.07 | 0.70 | 0.77 |  |
| 16 | Nidalee | -0.07 | 0.15 | 0.22 |  |
| 17 | Fiora | -0.12 | 0.45 | 0.57 |  |
| 18 | Karma | -0.13 | 0.30 | 0.43 |  |
| 19 | Kayn | -0.14 | 0.50 | 0.64 |  |
| 20 | Vex | -0.15 | 0.57 | 0.72 |  |
| 21 | Lulu | -0.16 | 0.42 | 0.58 |  |
| 22 | LeBlanc | -0.16 | 0.15 | 0.31 |  |
| 23 | Veigar | -0.17 | 0.43 | 0.60 |  |
| 24 | Malzahar | -0.18 | 0.40 | 0.58 |  |
| 25 | Milio | -0.20 | 0.16 | 0.36 |  |
| 26 | Kindred | -0.20 | 0.00 | 0.20 |  |
| 27 | Yuumi | -0.22 | 0.42 | 0.64 |  |
| 28 | Yasuo | -0.23 | 0.61 | 0.84 |  |
| 29 | Zilean | -0.23 | 0.00 | 0.23 |  |
| 30 | Viktor | -0.26 | 0.44 | 0.70 |  |
| 31 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 32 | Shaco | -0.27 | 0.42 | 0.69 |  |
| 33 | Mel | -0.27 | 0.37 | 0.64 |  |
| 34 | Tryndamere | -0.27 | 0.00 | 0.27 |  |
| 35 | Corki | -0.29 | 0.00 | 0.29 |  |
| 36 | Fiddlesticks | -0.30 | 0.30 | 0.60 |  |
| 37 | Akshan | -0.30 | 0.15 | 0.45 |  |
| 38 | Zed | -0.31 | 0.42 | 0.73 |  |
| 39 | Caitlyn | -0.33 | 0.35 | 0.68 |  |
| 40 | Quinn | -0.33 | 0.00 | 0.33 |  |
| 41 | Gwen | -0.35 | 0.42 | 0.77 |  |
| 42 | Elise | -0.35 | 0.15 | 0.50 |  |
| 43 | Sylas | -0.35 | 0.15 | 0.50 |  |
| 44 | Soraka | -0.35 | 0.00 | 0.35 |  |
| 45 | Udyr | -0.36 | 0.26 | 0.62 |  |
| 46 | Rek'Sai | -0.38 | 0.77 | 1.15 |  |
| 47 | Zoe | -0.38 | 0.00 | 0.38 |  |
| 48 | Heimerdinger | -0.40 | 0.10 | 0.50 |  |
| 49 | Singed | -0.42 | 0.60 | 1.02 |  |
| 50 | Fizz | -0.42 | 0.57 | 0.99 |  |
| 51 | Shen | -0.42 | 0.29 | 0.71 |  |
| 52 | Ahri | -0.44 | 0.44 | 0.88 |  |
| 53 | Jayce | -0.44 | 0.00 | 0.44 |  |
| 54 | Ryze | -0.44 | 0.00 | 0.44 |  |
| 55 | Miss Fortune | -0.45 | 0.00 | 0.45 |  |
| 56 | Zeri | -0.45 | 0.00 | 0.45 |  |
| 57 | Cassiopeia | -0.46 | 0.41 | 0.87 |  |
| 58 | Morgana | -0.46 | 0.39 | 0.85 |  |
| 59 | Pantheon | -0.48 | 0.35 | 0.83 |  |
| 60 | Vel'Koz | -0.48 | 0.00 | 0.48 |  |
| 61 | Katarina | -0.49 | 0.12 | 0.61 |  |
| 62 | Varus | -0.49 | 0.12 | 0.61 |  |
| 63 | Vayne | -0.49 | 0.00 | 0.49 |  |
| 64 | Braum | -0.50 | 0.63 | 1.13 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 65 | Ivern | -0.50 | 0.00 | 0.50 |  |
| 66 | Xerath | -0.50 | 0.00 | 0.50 |  |
| 67 | Lux | -0.51 | 0.00 | 0.51 |  |
| 68 | Lee Sin | -0.54 | 0.30 | 0.84 |  |
| 69 | Warwick | -0.54 | 0.30 | 0.84 |  |
| 70 | Kalista | -0.54 | 0.16 | 0.70 |  |
| 71 | Rengar | -0.55 | 0.50 | 1.05 |  |
| 72 | Camille | -0.55 | 0.42 | 0.97 |  |
| 73 | Olaf | -0.56 | 0.22 | 0.78 |  |
| 74 | Nasus | -0.57 | 0.29 | 0.86 |  |
| 75 | Aatrox | -0.58 | 0.15 | 0.73 |  |
| 76 | Nocturne | -0.59 | 0.70 | 1.29 |  |
| 77 | Anivia | -0.59 | 0.00 | 0.59 |  |
| 78 | Graves | -0.59 | 0.00 | 0.59 |  |
| 79 | Nilah | -0.60 | 0.27 | 0.87 |  |
| 80 | Ashe | -0.61 | 0.00 | 0.61 |  |
| 81 | Ezreal | -0.62 | 0.00 | 0.62 |  |
| 82 | Lucian | -0.62 | 0.00 | 0.62 |  |
| 83 | Kha'Zix | -0.63 | 0.00 | 0.63 |  |
| 84 | Gnar | -0.64 | 0.00 | 0.64 |  |
| 85 | Thresh | -0.67 | 0.15 | 0.82 |  |
| 86 | Smolder | -0.67 | 0.00 | 0.67 |  |
| 87 | Talon | -0.67 | 0.00 | 0.67 |  |
| 88 | Draven | -0.68 | 0.00 | 0.68 |  |
| 89 | Kennen | -0.68 | 0.00 | 0.68 |  |
| 90 | Garen | -0.69 | 0.42 | 1.11 |  |
| 91 | Brand | -0.69 | 0.00 | 0.69 |  |
| 92 | Karthus | -0.69 | 0.00 | 0.69 |  |
| 93 | Syndra | -0.69 | 0.00 | 0.69 |  |
| 94 | Ziggs | -0.69 | 0.00 | 0.69 |  |
| 95 | Dr. Mundo | -0.70 | 0.00 | 0.70 |  |
| 96 | Alistar | -0.71 | 0.17 | 0.88 |  |
| 97 | Illaoi | -0.71 | 0.15 | 0.86 |  |
| 98 | Aurelion Sol | -0.71 | 0.00 | 0.71 |  |
| 99 | Akali | -0.72 | 0.15 | 0.87 |  |
| 100 | Annie | -0.73 | 0.02 | 0.75 |  |
| 101 | Janna | -0.73 | 0.00 | 0.73 |  |
| 102 | Riven | -0.73 | 0.00 | 0.73 |  |
| 103 | Jax | -0.74 | 0.31 | 1.05 |  |
| 104 | Jhin | -0.75 | 0.00 | 0.75 |  |
| 105 | Bel'Veth | -0.77 | 0.00 | 0.77 |  |
| 106 | Naafiri | -0.78 | 0.15 | 0.93 |  |
| 107 | Swain | -0.78 | 0.00 | 0.78 |  |
| 108 | Taric | -0.78 | 0.00 | 0.78 |  |
| 109 | Wukong | -0.79 | 0.00 | 0.79 |  |
| 110 | Senna | -0.79 | 0.00 | 0.79 |  |
| 111 | Kled | -0.80 | 0.52 | 1.32 |  |
| 112 | Sion | -0.80 | 0.22 | 1.02 |  |
| 113 | Zyra | -0.81 | 0.15 | 0.96 |  |
| 114 | Tristana | -0.81 | 0.07 | 0.88 |  |
| 115 | Shyvana | -0.81 | 0.00 | 0.81 |  |
| 116 | Orianna | -0.82 | 0.00 | 0.82 |  |
| 117 | Poppy | -0.83 | 0.50 | 1.33 |  |
| 118 | Kassadin | -0.83 | 0.00 | 0.83 |  |
| 119 | Renata Glasc | -0.84 | 0.15 | 0.99 |  |
| 120 | Zac | -0.85 | 0.49 | 1.34 |  |
| 121 | Evelynn | -0.85 | 0.42 | 1.27 |  |
| 122 | Yorick | -0.85 | 0.00 | 0.85 |  |
| 123 | Sona | -0.86 | 0.00 | 0.86 |  |
| 124 | Sett | -0.87 | 0.15 | 1.02 |  |
| 125 | Renekton | -0.87 | 0.00 | 0.87 |  |
| 126 | Urgot | -0.88 | 0.15 | 1.03 |  |
| 127 | Azir | -0.88 | 0.00 | 0.88 |  |
| 128 | Aphelios | -0.90 | 0.10 | 1.00 |  |
| 129 | Maokai | -0.93 | 0.42 | 1.35 |  |
| 130 | Neeko | -0.93 | 0.00 | 0.93 |  |
| 131 | Nunu & Willump | -0.94 | 0.25 | 1.19 |  |
| 132 | Irelia | -0.95 | 0.00 | 0.95 |  |
| 133 | Locke | -0.96 | 0.00 | 0.96 |  |
| 134 | Xin Zhao | -0.97 | 0.35 | 1.32 |  |
| 135 | Seraphine | -0.97 | 0.00 | 0.97 |  |
| 136 | Ekko | -0.98 | 0.00 | 0.98 |  |
| 137 | Lillia | -1.00 | 0.00 | 1.00 |  |
| 138 | Gangplank | -1.03 | 0.19 | 1.22 |  |
| 139 | Nami | -1.03 | 0.00 | 1.03 |  |
| 140 | Skarner | -1.04 | 0.36 | 1.40 |  |
| 141 | Ambessa | -1.04 | 0.15 | 1.19 |  |
| 142 | Zaahen | -1.05 | 0.15 | 1.20 |  |
| 143 | Yone | -1.06 | 0.23 | 1.29 |  |
| 144 | Rumble | -1.06 | 0.00 | 1.06 |  |
| 145 | Diana | -1.07 | 0.00 | 1.07 |  |
| 146 | Rammus | -1.08 | 0.29 | 1.37 |  |
| 147 | Mordekaiser | -1.09 | 0.19 | 1.28 |  |
| 148 | Briar | -1.10 | 0.15 | 1.25 |  |
| 149 | Galio | -1.10 | 0.00 | 1.10 |  |
| 150 | Amumu | -1.12 | 0.22 | 1.34 |  |
| 151 | Blitzcrank | -1.13 | 0.00 | 1.13 |  |
| 152 | Rakan | -1.15 | 0.00 | 1.15 |  |
| 153 | Pyke | -1.16 | 0.00 | 1.16 |  |
| 154 | Leona | -1.17 | 0.00 | 1.17 |  |
| 155 | Vi | -1.18 | 0.15 | 1.33 |  |
| 156 | Nautilus | -1.19 | 0.00 | 1.19 |  |
| 157 | Darius | -1.23 | 0.00 | 1.23 |  |
| 158 | Taliyah | -1.23 | 0.00 | 1.23 |  |
| 159 | Trundle | -1.23 | 0.00 | 1.23 |  |
| 160 | Cho'Gath | -1.24 | 0.00 | 1.24 |  |
| 161 | Rell | -1.24 | 0.00 | 1.24 |  |
| 162 | Gragas | -1.25 | 0.00 | 1.25 |  |
| 163 | Tahm Kench | -1.25 | 0.00 | 1.25 |  |
| 164 | Qiyana | -1.26 | 0.00 | 1.26 |  |
| 165 | Viego | -1.26 | 0.00 | 1.26 |  |
| 166 | Malphite | -1.27 | 0.19 | 1.46 |  |
| 167 | Volibear | -1.28 | 0.00 | 1.28 |  |
| 168 | Hecarim | -1.32 | 0.00 | 1.32 |  |
| 169 | Jarvan IV | -1.33 | 0.00 | 1.33 |  |
| 170 | K'Sante | -1.36 | 0.00 | 1.36 |  |
| 171 | Sejuani | -1.39 | 0.00 | 1.39 |  |
| 172 | Ornn | -1.47 | 0.00 | 1.47 |  |
