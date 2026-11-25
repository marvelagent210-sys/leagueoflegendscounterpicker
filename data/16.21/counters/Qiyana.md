# Counters to Qiyana (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Qiyana: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Qiyana wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Qiyana --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Gangplank | +0.87 | +1.00 | +1.00 | +1.00 | +0.36 | – | +0.67 |
| 2 | Ambessa | +0.86 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.50 |
| 3 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.38 | – | +0.34 |
| 4 | Udyr | +0.86 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.60 |
| 5 | Gwen | +0.86 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.79 |
| 6 | Poppy | +0.86 | +1.00 | +1.00 | +1.00 | +0.36 | – | +0.33 |
| 7 | Kog'Maw | +0.86 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.08 |
| 8 | Kayle | +0.85 | +1.00 | +1.00 | +1.00 | +0.38 | +1.00 | −0.04 |
| 9 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.70 |
| 10 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | – | +0.43 |
| 11 | Shyvana | +0.85 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.64 |
| 12 | Xayah | +0.85 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.47 |
| 13 | Olaf | +0.85 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.56 |
| 14 | Urgot | +0.85 | +1.00 | +1.00 | +1.00 | +0.43 | +1.00 | −0.32 |
| 15 | Ahri | +0.85 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.29 |
| 16 | Jarvan IV | +0.84 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.72 |
| 17 | Gnar | +0.84 | +1.00 | +1.00 | +1.00 | +0.32 | +1.00 | −0.12 |
| 18 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.87 |
| 19 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.37 |
| 20 | Bel'Veth | +0.84 | +1.00 | +1.00 | +1.00 | +0.46 | – | −0.23 |
| 21 | Orianna | +0.84 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.23 |
| 22 | Camille | +0.84 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.69 |
| 23 | Rakan | +0.84 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.14 |
| 24 | Malphite | +0.84 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.40 |
| 25 | Annie | +0.84 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.12 |
| 26 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.34 |
| 27 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.13 |
| 28 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.44 |
| 29 | Mel | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.03 |
| 30 | Nilah | +0.83 | +1.00 | +1.00 | +1.00 | +0.44 | – | −0.37 |
| 31 | Ashe | +0.83 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | −0.30 |
| 32 | Zeri | +0.83 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.66 |
| 33 | Riven | +0.83 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.48 |
| 34 | Lulu | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | −0.01 |
| 35 | Lillia | +0.83 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.31 |
| 36 | Akshan | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | −0.07 |
| 37 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.72 |
| 38 | Volibear | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.51 |
| 39 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | −0.36 |
| 40 | Amumu | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.42 |
| 41 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | −0.14 |
| 42 | Nocturne | +0.82 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.82 |
| 43 | Illaoi | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | −0.04 |
| 44 | Neeko | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.11 |
| 45 | Aurelion Sol | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | −0.06 |
| 46 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.15 |
| 47 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.33 |
| 48 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | −0.35 |
| 49 | Draven | +0.82 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | −0.32 |
| 50 | Kindred | +0.82 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.12 |
| 51 | Lissandra | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.25 |
| 52 | Morgana | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.18 |
| 53 | Kalista | +0.82 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | −0.27 |
| 54 | Yunara | +0.82 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | −0.21 |
| 55 | Jax | +0.82 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.10 |
| 56 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | −0.22 |
| 57 | Yasuo | +0.82 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.09 |
| 58 | Zed | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.57 |
| 59 | Karma | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.14 |
| 60 | Yone | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.17 |
| 61 | Heimerdinger | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.14 |
| 62 | Sejuani | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.35 |
| 63 | Kha'Zix | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.69 |
| 64 | Milio | +0.81 | +1.00 | +1.00 | +0.97 | +0.26 | +1.00 | −0.38 |
| 65 | Zoe | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.07 |
| 66 | Rell | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −0.23 |
| 67 | Lux | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.25 |
| 68 | Tahm Kench | +0.81 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.16 |
| 69 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.36 |
| 70 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.12 |
| 71 | Jhin | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.19 |
| 72 | Swain | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.14 |
| 73 | Caitlyn | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | −0.33 |
| 74 | Cassiopeia | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.11 |
| 75 | Nautilus | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.03 |
| 76 | Lucian | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.06 |
| 77 | Samira | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.01 |
| 78 | Bard | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.17 |
| 79 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.16 |
| 80 | Ivern | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.22 |
| 81 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.19 |
| 82 | Kennen | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.16 |
| 83 | Gragas | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.23 |
| 84 | Shen | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.22 |
| 85 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | −0.07 |
| 86 | Kayn | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.25 |
| 87 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | −0.43 |
| 88 | Ryze | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.22 |
| 89 | Ziggs | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.02 |
| 90 | Hwei | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.09 |
| 91 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | −0.48 |
| 92 | Skarner | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | −0.10 |
| 93 | Smolder | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.15 |
| 94 | Vex | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.20 |
| 95 | Zilean | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.29 |
| 96 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.25 | – | −0.27 |
| 97 | Malzahar | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.02 |
| 98 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.41 |
| 99 | Rek'Sai | +0.80 | +1.00 | +1.00 | +1.00 | +0.18 | – | −0.07 |
| 100 | Taric | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.01 |
| 101 | Aurora | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.20 |
| 102 | Syndra | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.34 |
| 103 | Twitch | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.18 |
| 104 | Blitzcrank | +0.80 | +1.00 | +1.00 | +1.00 | +0.18 | – | −0.07 |
| 105 | Varus | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.02 |
| 106 | Miss Fortune | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.28 |
| 107 | Briar | +0.80 | +1.00 | +1.00 | +1.00 | +0.19 | – | −0.18 |
| 108 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.05 |
| 109 | Ornn | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | −0.07 |
| 110 | Leona | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.18 |
| 111 | Jinx | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | −0.34 |
| 112 | Ezreal | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | −0.22 |
| 113 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.11 |
| 114 | Zac | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | −0.13 |
| 115 | Sion | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | −0.13 |
| 116 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.19 |
| 117 | Rumble | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.08 |
| 118 | Vi | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.26 |
| 119 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.13 | – | −0.08 |
| 120 | LeBlanc | +0.79 | +0.90 | +1.00 | +1.00 | +0.07 | +1.00 | +0.19 |
| 121 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.16 |
| 122 | Azir | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.05 |
| 123 | Soraka | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.19 |
| 124 | Fiddlesticks | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.15 |
| 125 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.14 |
| 126 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.12 | – | −0.09 |
| 127 | Viktor | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.19 |
| 128 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | +0.20 | – | −0.38 |
| 129 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.12 |
| 130 | Pantheon | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.13 |
| 131 | Wukong | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.11 |
| 132 | Brand | +0.79 | +1.00 | +0.98 | +1.00 | +0.02 | +1.00 | −0.18 |
| 133 | Kai'Sa | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.32 |
| 134 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.10 |
| 135 | Irelia | +0.79 | +1.00 | +1.00 | +1.00 | +0.12 | – | −0.20 |
| 136 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.16 |
| 137 | Anivia | +0.79 | +1.00 | +0.99 | +1.00 | −0.04 | +0.91 | +0.09 |
| 138 | Xin Zhao | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.14 |
| 139 | Hecarim | +0.78 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.23 |
| 140 | Singed | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.06 |
| 141 | Galio | +0.78 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.22 |
| 142 | Locke | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.10 |
| 143 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.04 |
| 144 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.17 |
| 145 | Naafiri | +0.78 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.33 |
| 146 | Fizz | +0.77 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.20 |
| 147 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.08 |
| 148 | Shaco | +0.77 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.17 |
| 149 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.12 |
| 150 | Talon | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.20 |
| 151 | Nami | +0.76 | +0.91 | +1.00 | +1.00 | +0.05 | +0.91 | −0.35 |
| 152 | Ekko | +0.75 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.26 |
| 153 | Akali | +0.75 | +1.00 | +1.00 | +1.00 | −0.11 | – | −0.18 |
| 154 | Senna | +0.74 | +0.96 | +0.97 | +0.94 | +0.04 | +0.74 | −0.12 |
| 155 | Janna | +0.71 | +1.00 | +1.00 | +1.00 | +0.17 | −0.07 | −0.23 |
| 156 | Zyra | +0.69 | +1.00 | +1.00 | +0.96 | +0.10 | −0.04 | −0.21 |
| 157 | Elise | +0.63 | +1.00 | +1.00 | +1.00 | +0.30 | −0.96 | −0.30 |
| 158 | Nidalee | +0.58 | +1.00 | +1.00 | +1.00 | −0.05 | −1.00 | −0.33 |
| 159 | Nunu & Willump | +0.57 | +1.00 | +1.00 | +0.00 | +0.14 | – | −0.16 |
| 160 | Seraphine | +0.42 | +1.00 | +1.00 | −0.96 | +0.10 | +1.00 | −0.01 |
| 161 | Pyke | +0.30 | +1.00 | +1.00 | −1.00 | −0.11 | – | −0.31 |
| 162 | Evelynn | +0.25 | +0.03 | +0.03 | +1.00 | +0.06 | – | +0.01 |
| 163 | Sona | +0.21 | +1.00 | +1.00 | −1.00 | +0.03 | −1.00 | +0.02 |
| 164 | Katarina | +0.20 | +1.00 | −1.00 | +1.00 | −0.06 | – | −0.24 |
| 165 | Karthus | −0.02 | −0.03 | −0.01 | −0.02 | −0.02 | +0.00 | −0.10 |
| 166 | Veigar | −0.04 | +0.73 | −0.53 | −0.98 | +0.08 | +1.00 | −0.11 |
| 167 | Vladimir | −0.11 | −1.00 | +1.00 | −1.00 | −0.04 | +1.00 | −0.03 |
| 168 | Thresh | −0.31 | +0.85 | −0.97 | −1.00 | +0.07 | −0.85 | −0.23 |
| 169 | Xerath | −0.55 | −0.89 | −0.99 | −1.00 | +0.05 | +1.00 | +0.17 |
| 170 | Renata Glasc | −0.72 | −0.79 | −0.75 | −1.00 | +0.07 | −1.00 | −0.83 |
| 171 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | −0.75 | −0.05 |
| 172 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.45 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Qiyana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Qiyana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Qiyana` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.53)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 0.75 s; Supreme Display of Talent takes 0.69 s to land, enough to react. (Fizz E Playful → Qiyana R Supreme Display of Talent)
- **0.74** untargetable: Playful makes Fizz untargetable, dodging Qiyana's Audacity. Untargetable for 0.75 s; Audacity takes 1.08 s to land, enough to react. (Fizz E Playful → Qiyana E Audacity)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 0.75 s; Elemental Wrath takes 0.54 s to land, enough to react. (Fizz E Playful → Qiyana Q Elemental Wrath)

#### 2. Sivir (net +1.47)

- **0.80** spell shield: Spell Shield's spell shield blocks Qiyana's Supreme Display of Talent. Spell shield for 1.5 s, long enough to use ahead of Supreme Display of Talent. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana R Supreme Display of Talent)
- **0.51** spell shield: Spell Shield's spell shield blocks Qiyana's Audacity. Spell shield for 1.5 s, long enough to use ahead of Audacity. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana E Audacity)
- **0.51** spell shield: Spell Shield's spell shield blocks Qiyana's Elemental Wrath. Spell shield for 1.5 s, long enough to use ahead of Elemental Wrath. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana Q Elemental Wrath)

#### 3. Kled (net +1.44)

- **0.80** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Qiyana's Supreme Display of Talent (airborne, stun). Immune for ?; Supreme Display of Talent takes 0.69 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Qiyana R Supreme Display of Talent)
- **0.32** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Qiyana's Elemental Wrath (slow, root). Immune for ?; Elemental Wrath takes 0.54 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Qiyana Q Elemental Wrath)
- **0.18** reveal: Bear Trap on a Rope reveals Qiyana through Elemental Wrath's stealth. (Kled Q Bear Trap on a Rope → Qiyana Q Elemental Wrath)

#### 4. Morgana (net +1.37)

- **0.80** cc immunity: Black Shield makes Morgana immune to Qiyana's Supreme Display of Talent (airborne, stun). Immune for 5 s, long enough to use ahead of Supreme Display of Talent. (Morgana E Black Shield → Qiyana R Supreme Display of Talent)
- **0.54** cc immunity: Black Shield makes Morgana immune to Qiyana's Elemental Wrath (slow, root). Immune for 5 s, long enough to use ahead of Elemental Wrath. (Morgana E Black Shield → Qiyana Q Elemental Wrath)
- **0.18** reveal: Soul Shackles reveals Qiyana through Elemental Wrath's stealth. (Morgana R Soul Shackles → Qiyana Q Elemental Wrath)

#### 5. Fiora (net +1.36)

- **0.90** parry: Riposte parries Qiyana's Supreme Display of Talent and stuns back. Parry for 0.75 s; Supreme Display of Talent takes 0.69 s to land, enough to react. Negating Supreme Display of Talent's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Qiyana R Supreme Display of Talent)
- **0.64** parry: Riposte parries Qiyana's Elemental Wrath and stuns back. Parry for 0.75 s; Elemental Wrath takes 0.54 s to land, enough to react. Negating Elemental Wrath's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Qiyana Q Elemental Wrath)
- **0.53** parry: Riposte parries Qiyana's Audacity. Parry for 0.75 s; Audacity takes 1.08 s to land, enough to react. (Fiora W Riposte → Qiyana E Audacity)

#### 6. Nocturne (net +1.35)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Supreme Display of Talent. Spell shield for 1.5 s, long enough to use ahead of Supreme Display of Talent. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana R Supreme Display of Talent)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Elemental Wrath. Spell shield for 1.5 s, long enough to use ahead of Elemental Wrath. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana Q Elemental Wrath)
- **0.60** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Audacity. Spell shield for 1.5 s, long enough to use ahead of Audacity. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana E Audacity)

#### 7. Maokai (net +1.32)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 1.4 s; Supreme Display of Talent takes 0.69 s to land, enough to react. (Maokai W Twisted Advance → Qiyana R Supreme Display of Talent)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 1.4 s; Elemental Wrath takes 0.54 s to land, enough to react. (Maokai W Twisted Advance → Qiyana Q Elemental Wrath)
- **0.66** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Audacity. Untargetable for 1.4 s; Audacity takes 1.08 s to land, enough to react. (Maokai W Twisted Advance → Qiyana E Audacity)

#### 8. Xayah (net +1.30)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 1.5 s, long enough to use ahead of Supreme Display of Talent. (Xayah R Featherstorm → Qiyana R Supreme Display of Talent)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Audacity. Untargetable for 1.5 s, long enough to use ahead of Audacity. (Xayah R Featherstorm → Qiyana E Audacity)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 1.5 s, long enough to use ahead of Elemental Wrath. (Xayah R Featherstorm → Qiyana Q Elemental Wrath)

#### 9. Bard (net +1.28)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 2.5 s, long enough to use ahead of Supreme Display of Talent. (Bard R Tempered Fate → Qiyana R Supreme Display of Talent)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Audacity. Untargetable for 2.5 s, long enough to use ahead of Audacity. (Bard R Tempered Fate → Qiyana E Audacity)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 2.5 s, long enough to use ahead of Elemental Wrath. (Bard R Tempered Fate → Qiyana Q Elemental Wrath)

#### 10. Rengar (net +1.28)

- **0.64** cleanse: Battle Roar cleanses Qiyana's Supreme Display of Talent (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Qiyana R Supreme Display of Talent)
- **0.56** cleanse: Battle Roar cleanses Qiyana's Elemental Wrath (slow, root) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Qiyana Q Elemental Wrath)
- **0.18** reveal: Bola Strike reveals Qiyana through Elemental Wrath's stealth. (Rengar E Bola Strike → Qiyana Q Elemental Wrath)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.53 | 1.53 | 0.00 |  |
| 2 | Sivir | +1.47 | 1.47 | 0.00 |  |
| 3 | Kled | +1.44 | 1.44 | 0.00 |  |
| 4 | Morgana | +1.37 | 1.37 | 0.00 |  |
| 5 | Fiora | +1.36 | 1.36 | 0.00 |  |
| 6 | Nocturne | +1.35 | 1.35 | 0.00 |  |
| 7 | Maokai | +1.32 | 1.32 | 0.00 |  |
| 8 | Xayah | +1.30 | 1.30 | 0.00 |  |
| 9 | Bard | +1.28 | 1.28 | 0.00 |  |
| 10 | Rengar | +1.28 | 1.28 | 0.00 |  |
| 11 | Vladimir | +1.26 | 1.31 | 0.05 |  |
| 12 | Aurora | +1.26 | 1.26 | 0.00 |  |
| 13 | Lissandra | +1.25 | 1.25 | 0.00 |  |
| 14 | Yuumi | +1.23 | 1.58 | 0.35 |  |
| 15 | Master Yi | +1.20 | 1.30 | 0.10 |  |
| 16 | Gwen | +1.18 | 1.18 | 0.00 |  |
| 17 | Udyr | +1.15 | 1.15 | 0.00 |  |
| 18 | Rek'Sai | +1.09 | 1.09 | 0.00 |  |
| 19 | Camille | +1.07 | 1.07 | 0.00 |  |
| 20 | Evelynn | +1.06 | 1.06 | 0.00 |  |
| 21 | Shaco | +1.06 | 1.06 | 0.00 |  |
| 22 | Zed | +1.06 | 1.06 | 0.00 |  |
| 23 | Milio | +1.05 | 1.05 | 0.00 |  |
| 24 | Hwei | +1.00 | 1.00 | 0.00 |  |
| 25 | Kalista | +0.97 | 0.97 | 0.00 |  |
| 26 | Olaf | +0.97 | 0.97 | 0.00 |  |
| 27 | Zaahen | +0.97 | 0.97 | 0.00 |  |
| 28 | Yasuo | +0.91 | 0.91 | 0.00 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 29 | Sion | +0.90 | 0.98 | 0.08 |  |
| 30 | Braum | +0.90 | 0.90 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 31 | Gangplank | +0.87 | 0.87 | 0.00 |  |
| 32 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 33 | Samira | +0.86 | 0.86 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 34 | Mel | +0.82 | 0.82 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 35 | Vex | +0.81 | 0.81 | 0.00 |  |
| 36 | Alistar | +0.78 | 0.78 | 0.00 |  |
| 37 | Kayn | +0.73 | 1.09 | 0.36 |  |
| 38 | Cassiopeia | +0.72 | 0.72 | 0.00 |  |
| 39 | Malzahar | +0.70 | 1.02 | 0.32 |  |
| 40 | Lulu | +0.70 | 0.70 | 0.00 |  |
| 41 | Jinx | +0.68 | 0.68 | 0.00 |  |
| 42 | Warwick | +0.66 | 1.13 | 0.47 |  |
| 43 | Viktor | +0.64 | 0.64 | 0.00 |  |
| 44 | Garen | +0.62 | 0.62 | 0.00 |  |
| 45 | Xin Zhao | +0.62 | 0.62 | 0.00 |  |
| 46 | Ahri | +0.60 | 0.60 | 0.00 |  |
| 47 | Teemo | +0.60 | 0.60 | 0.00 |  |
| 48 | Singed | +0.59 | 0.59 | 0.00 |  |
| 49 | Veigar | +0.58 | 0.58 | 0.00 |  |
| 50 | Poppy | +0.50 | 0.68 | 0.18 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 51 | Karma | +0.50 | 0.50 | 0.00 |  |
| 52 | Renata Glasc | +0.44 | 0.44 | 0.00 |  |
| 53 | Kai'Sa | +0.42 | 0.42 | 0.00 |  |
| 54 | Skarner | +0.41 | 0.41 | 0.00 |  |
| 55 | Elise | +0.40 | 0.40 | 0.00 |  |
| 56 | Zac | +0.38 | 0.60 | 0.22 |  |
| 57 | Caitlyn | +0.37 | 0.60 | 0.23 |  |
| 58 | Nidalee | +0.37 | 0.37 | 0.00 |  |
| 59 | Lee Sin | +0.36 | 0.36 | 0.00 |  |
| 60 | Yone | +0.35 | 0.35 | 0.00 |  |
| 61 | Nilah | +0.34 | 0.34 | 0.00 |  |
| 62 | Zyra | +0.34 | 0.34 | 0.00 |  |
| 63 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 64 | Jax | +0.32 | 0.32 | 0.00 |  |
| 65 | LeBlanc | +0.32 | 0.32 | 0.00 |  |
| 66 | Nasus | +0.30 | 0.30 | 0.00 |  |
| 67 | Thresh | +0.30 | 0.30 | 0.00 |  |
| 68 | Pantheon | +0.29 | 0.77 | 0.48 |  |
| 69 | Kindred | +0.29 | 0.29 | 0.00 |  |
| 70 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 71 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 72 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 73 | Malphite | +0.28 | 0.28 | 0.00 |  |
| 74 | Amumu | +0.27 | 0.27 | 0.00 |  |
| 75 | Sona | +0.27 | 0.27 | 0.00 |  |
| 76 | Urgot | +0.27 | 0.27 | 0.00 |  |
| 77 | Illaoi | +0.26 | 0.26 | 0.00 |  |
| 78 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 79 | Draven | +0.24 | 0.24 | 0.00 |  |
| 80 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 81 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 82 | Corki | +0.22 | 0.22 | 0.00 |  |
| 83 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 84 | Mordekaiser | +0.22 | 0.22 | 0.00 |  |
| 85 | Senna | +0.22 | 0.22 | 0.00 |  |
| 86 | Sett | +0.22 | 0.22 | 0.00 |  |
| 87 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 88 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 89 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 90 | Gnar | +0.21 | 0.21 | 0.00 |  |
| 91 | Heimerdinger | +0.20 | 0.20 | 0.00 |  |
| 92 | Jayce | +0.19 | 0.19 | 0.00 |  |
| 93 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 94 | Lux | +0.19 | 0.19 | 0.00 |  |
| 95 | Akshan | +0.18 | 0.39 | 0.21 |  |
| 96 | Aatrox | +0.18 | 0.18 | 0.00 |  |
| 97 | Akali | +0.18 | 0.18 | 0.00 |  |
| 98 | Ambessa | +0.18 | 0.18 | 0.00 |  |
| 99 | Briar | +0.18 | 0.18 | 0.00 |  |
| 100 | Seraphine | +0.18 | 0.18 | 0.00 |  |
| 101 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 102 | Sylas | +0.18 | 0.18 | 0.00 |  |
| 103 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 104 | Azir | +0.17 | 0.17 | 0.00 |  |
| 105 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 106 | Orianna | +0.17 | 0.17 | 0.00 |  |
| 107 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 108 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 109 | Fiddlesticks | +0.15 | 0.48 | 0.33 |  |
| 110 | Rammus | +0.15 | 0.30 | 0.15 |  |
| 111 | Annie | +0.15 | 0.15 | 0.00 |  |
| 112 | Brand | +0.15 | 0.15 | 0.00 |  |
| 113 | Graves | +0.15 | 0.15 | 0.00 |  |
| 114 | Nami | +0.15 | 0.15 | 0.00 |  |
| 115 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 116 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 117 | Varus | +0.13 | 0.18 | 0.05 |  |
| 118 | Swain | +0.13 | 0.13 | 0.00 |  |
| 119 | Twisted Fate | +0.12 | 0.45 | 0.33 |  |
| 120 | Quinn | +0.11 | 0.24 | 0.13 |  |
| 121 | Aurelion Sol | +0.09 | 0.15 | 0.06 |  |
| 122 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 123 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 124 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 125 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 126 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 127 | Rakan | +0.07 | 0.07 | 0.00 |  |
| 128 | Lillia | +0.06 | 0.06 | 0.00 |  |
| 129 | Ivern | +0.05 | 0.12 | 0.07 |  |
| 130 | Vi | 0.00 | 0.22 | 0.22 |  |
| 131 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 132 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 133 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 134 | Darius | 0.00 | 0.00 | 0.00 |  |
| 135 | Diana | 0.00 | 0.00 | 0.00 |  |
| 136 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 137 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 138 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 139 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 140 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 141 | Leona | 0.00 | 0.00 | 0.00 |  |
| 142 | Locke | 0.00 | 0.00 | 0.00 |  |
| 143 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 144 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 145 | Rell | 0.00 | 0.00 | 0.00 |  |
| 146 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 147 | Riven | 0.00 | 0.00 | 0.00 |  |
| 148 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 149 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 150 | Talon | 0.00 | 0.00 | 0.00 |  |
| 151 | Taric | 0.00 | 0.00 | 0.00 |  |
| 152 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 153 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 154 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 155 | Lucian | -0.01 | 0.22 | 0.23 |  |
| 156 | Miss Fortune | -0.03 | 0.22 | 0.25 |  |
| 157 | Viego | -0.03 | 0.08 | 0.11 |  |
| 158 | Jhin | -0.05 | 0.18 | 0.23 |  |
| 159 | Vel'Koz | -0.05 | 0.17 | 0.22 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 162 | Nunu & Willump | -0.11 | 0.20 | 0.31 |  |
| 163 | Xerath | -0.11 | 0.17 | 0.28 |  |
| 164 | Janna | -0.12 | 0.24 | 0.36 |  |
| 165 | Shen | -0.15 | 0.30 | 0.45 |  |
| 166 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 167 | Katarina | -0.17 | 0.00 | 0.17 |  |
| 168 | Naafiri | -0.18 | 0.18 | 0.36 |  |
| 169 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 170 | Tahm Kench | -0.24 | 0.00 | 0.24 |  |
| 171 | Taliyah | -0.31 | 0.17 | 0.48 |  |
| 172 | Galio | -0.54 | 0.00 | 0.54 |  |
