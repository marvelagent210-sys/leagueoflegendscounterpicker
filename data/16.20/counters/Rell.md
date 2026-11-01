# Counters to Rell (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Rell: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Rell wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Rell --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.88 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +1.00 |
| 2 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +1.00 |
| 3 | Nasus | +0.85 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 4 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 5 | Bel'Veth | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 6 | Master Yi | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +1.00 |
| 7 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +1.00 |
| 8 | Nilah | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 9 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 10 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 11 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 12 | Neeko | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 13 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 14 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 15 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 16 | Draven | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 17 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 18 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 19 | Aphelios | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 20 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 21 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 22 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 23 | Ezreal | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 24 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 25 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 26 | Aurora | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 27 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 28 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 29 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 30 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 31 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 32 | Yunara | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 33 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 34 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 35 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 36 | Zilean | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 37 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 38 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 39 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 40 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 41 | Karma | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 42 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 43 | Graves | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 44 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 45 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 46 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 47 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 48 | Lucian | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 49 | Sion | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 50 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 51 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 52 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 53 | Sivir | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 54 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 55 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 56 | Jinx | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +0.99 | +0.00 |
| 57 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 58 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 59 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 60 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 61 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 62 | Gnar | +0.77 | +1.00 | +0.93 | +1.00 | −0.09 | +1.00 | +0.00 |
| 63 | Milio | +0.77 | +1.00 | +1.00 | +1.00 | +0.08 | +0.53 | +0.00 |
| 64 | Lillia | +0.75 | +0.96 | +1.00 | +1.00 | −0.09 | +0.71 | +0.00 |
| 65 | Kennen | +0.72 | +1.00 | +1.00 | +1.00 | −0.02 | +0.27 | +0.00 |
| 66 | Shyvana | +0.72 | +1.00 | +1.00 | +1.00 | −0.11 | +0.32 | +0.00 |
| 67 | Morgana | +0.71 | +0.81 | +0.92 | +0.96 | −0.03 | +0.86 | +0.00 |
| 68 | Yasuo | +0.69 | +1.00 | +1.00 | +1.00 | −0.11 | +0.07 | +0.00 |
| 69 | Renekton | +0.69 | +1.00 | +1.00 | +1.00 | −0.11 | +0.07 | +0.00 |
| 70 | Warwick | +0.69 | +1.00 | +1.00 | +1.00 | −0.07 | +0.00 | +0.00 |
| 71 | Rek'Sai | +0.68 | +1.00 | +1.00 | +1.00 | −0.16 | +0.00 | +0.00 |
| 72 | Mordekaiser | +0.67 | +1.00 | +1.00 | +1.00 | −0.08 | −0.14 | +0.00 |
| 73 | Elise | +0.65 | +1.00 | +1.00 | +1.00 | +0.07 | −0.63 | +0.00 |
| 74 | Miss Fortune | +0.63 | +1.00 | +1.00 | +1.00 | −0.11 | −0.50 | +0.00 |
| 75 | Jayce | +0.62 | +1.00 | +1.00 | +1.00 | +0.15 | −1.00 | +0.00 |
| 76 | Heimerdinger | +0.61 | +0.28 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 77 | Samira | +0.60 | +1.00 | +1.00 | +1.00 | −0.02 | −1.00 | +0.00 |
| 78 | Jarvan IV | +0.59 | +1.00 | +1.00 | +1.00 | −0.03 | −1.00 | +0.00 |
| 79 | Urgot | +0.59 | +1.00 | +1.00 | +1.00 | −0.07 | −1.00 | +0.00 |
| 80 | Camille | +0.58 | +1.00 | +1.00 | +1.00 | −0.12 | −1.00 | +0.00 |
| 81 | Cho'Gath | +0.58 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | +0.00 |
| 82 | Irelia | +0.58 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | +0.00 |
| 83 | Rumble | +0.58 | +0.98 | +1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 84 | Yone | +0.58 | +1.00 | +1.00 | +1.00 | −0.14 | −1.00 | +0.00 |
| 85 | Vi | +0.58 | +1.00 | +1.00 | +1.00 | −0.15 | −1.00 | +0.00 |
| 86 | Ryze | +0.57 | +0.74 | +0.74 | +0.74 | −0.12 | +0.73 | +0.00 |
| 87 | Wukong | +0.57 | +1.00 | +1.00 | +1.00 | −0.21 | −1.00 | +0.00 |
| 88 | Akshan | +0.55 | +0.07 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 89 | Rakan | +0.54 | +0.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 90 | Vel'Koz | +0.52 | +0.99 | +0.99 | +0.45 | −0.05 | −0.57 | +0.00 |
| 91 | Zac | +0.48 | +0.26 | +0.98 | +0.98 | −0.14 | +0.00 | +0.00 |
| 92 | Skarner | +0.43 | +0.00 | +1.00 | +1.00 | −0.14 | +0.00 | +0.00 |
| 93 | Jhin | +0.42 | −0.05 | +1.00 | +1.00 | −0.12 | +0.00 | +0.00 |
| 94 | Briar | +0.26 | −1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 95 | Kayn | +0.19 | +0.43 | +0.43 | +0.43 | −0.06 | −1.00 | +0.00 |
| 96 | Rammus | +0.18 | +1.00 | +1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 97 | Annie | +0.16 | +0.08 | +0.08 | +0.07 | +0.00 | +1.00 | +0.00 |
| 98 | Maokai | +0.15 | +0.23 | +0.23 | +0.19 | −0.04 | +0.00 | +0.00 |
| 99 | Swain | +0.11 | +0.19 | +0.13 | +0.11 | −0.10 | +0.19 | +0.00 |
| 100 | Syndra | +0.08 | +0.05 | +0.11 | +0.11 | +0.04 | +0.12 | +0.00 |
| 101 | Pantheon | +0.08 | −1.00 | +1.00 | +1.00 | −0.13 | −1.00 | +0.00 |
| 102 | Braum | +0.08 | +0.09 | +0.12 | +0.11 | −0.07 | +0.12 | +0.00 |
| 103 | Tahm Kench | +0.07 | +0.10 | +0.11 | +0.10 | −0.08 | +0.11 | +0.00 |
| 104 | Malphite | +0.03 | +0.07 | +0.06 | +0.06 | −0.08 | −0.01 | +0.00 |
| 105 | Hwei | +0.01 | +0.01 | +0.00 | +0.02 | −0.04 | +0.13 | +0.00 |
| 106 | Taric | −0.00 | +0.03 | +0.01 | +0.00 | −0.06 | −0.04 | +0.00 |
| 107 | Sett | −0.00 | +0.01 | +0.00 | −0.01 | −0.04 | −0.01 | +0.00 |
| 108 | Anivia | −0.02 | −0.03 | −0.01 | −0.01 | −0.13 | +0.06 | +0.00 |
| 109 | Senna | −0.03 | +0.03 | −0.02 | +0.01 | −0.12 | −0.14 | +0.00 |
| 110 | Soraka | −0.03 | −0.04 | +0.00 | +0.00 | −0.04 | −0.14 | +0.00 |
| 111 | Singed | −0.04 | +0.13 | +0.07 | +0.11 | −0.07 | −1.00 | +0.00 |
| 112 | Gragas | −0.05 | −0.07 | −0.06 | −0.07 | −0.01 | −0.01 | +0.00 |
| 113 | Nami | −0.05 | −0.04 | −0.03 | −0.03 | −0.11 | −0.08 | +0.00 |
| 114 | Leona | −0.06 | −0.05 | −0.06 | −0.05 | −0.08 | −0.13 | +0.00 |
| 115 | Zyra | −0.06 | −0.10 | −0.05 | −0.06 | −0.04 | −0.06 | +0.00 |
| 116 | Ornn | −0.06 | −0.05 | −0.08 | −0.08 | +0.07 | −0.27 | +0.00 |
| 117 | Zoe | −0.07 | −0.07 | −0.09 | −0.03 | −0.10 | −0.07 | +0.00 |
| 118 | Bard | −0.07 | −0.07 | −0.09 | −0.05 | −0.11 | −0.02 | +0.00 |
| 119 | Janna | −0.11 | +1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.00 |
| 120 | Veigar | −0.14 | −0.16 | −0.20 | −0.20 | −0.01 | −0.06 | +0.00 |
| 121 | Ahri | −0.15 | +0.04 | −0.58 | −0.11 | −0.01 | +0.06 | +0.00 |
| 122 | Malzahar | −0.16 | +1.00 | −1.00 | −1.00 | −0.09 | +0.49 | +0.00 |
| 123 | Shen | −0.17 | −0.16 | −0.12 | −0.13 | −0.06 | −0.63 | +0.00 |
| 124 | Nunu & Willump | −0.23 | −0.20 | −0.14 | −0.20 | −0.02 | −1.00 | +0.00 |
| 125 | Karthus | −0.26 | −0.31 | −0.31 | −0.30 | −0.12 | −0.31 | +0.00 |
| 126 | Nautilus | −0.27 | −0.08 | −0.05 | −1.00 | −0.10 | – | +0.00 |
| 127 | Rengar | −0.28 | −1.00 | +0.94 | −1.00 | +0.26 | −1.00 | +0.00 |
| 128 | Ziggs | −0.29 | +1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 129 | Lux | −0.29 | −0.69 | −0.21 | +0.02 | +0.02 | −0.75 | +0.00 |
| 130 | Ambessa | −0.31 | +1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 131 | Kassadin | −0.32 | +1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 132 | Brand | −0.39 | −0.62 | −0.41 | −0.40 | −0.12 | −0.33 | +0.00 |
| 133 | Mel | −0.40 | −0.26 | −0.91 | −0.29 | −0.08 | −0.36 | +0.00 |
| 134 | Xerath | −0.53 | −0.19 | −1.00 | −1.00 | −0.05 | −0.22 | +0.00 |
| 135 | Seraphine | −0.57 | −0.20 | −1.00 | −1.00 | −0.10 | −0.55 | +0.00 |
| 136 | Sona | −0.58 | −0.05 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 137 | Vex | −0.61 | −1.00 | −0.55 | −0.55 | −0.11 | −1.00 | +0.00 |
| 138 | Riven | −0.61 | −1.00 | −1.00 | +0.00 | −0.08 | −1.00 | +0.00 |
| 139 | Yuumi | −0.63 | −0.24 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 140 | Viktor | −0.64 | −1.00 | −1.00 | −0.08 | −0.15 | −1.00 | +0.00 |
| 141 | Aurelion Sol | −0.67 | −1.00 | −1.00 | −1.00 | +0.28 | −0.14 | +0.00 |
| 142 | Lissandra | −0.72 | −1.00 | −1.00 | −1.00 | −0.07 | −0.13 | +0.00 |
| 143 | Nidalee | −0.72 | −1.00 | −1.00 | −1.00 | −0.16 | +0.00 | +0.00 |
| 144 | LeBlanc | −0.74 | −1.00 | −1.00 | −1.00 | −0.15 | −0.22 | +0.00 |
| 145 | Blitzcrank | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 146 | Sylas | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 147 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 148 | Caitlyn | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 149 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 150 | Galio | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 151 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 152 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 153 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 154 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 155 | Sejuani | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 156 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 157 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 158 | Cassiopeia | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 159 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 160 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 161 | Kha'Zix | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 162 | Amumu | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 163 | Kindred | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 164 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 165 | Zed | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 166 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 167 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 168 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 169 | Taliyah | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 170 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 171 | Fiddlesticks | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 172 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Rell's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rell's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rell` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.84)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Rell's Ferromancy: Crash Down. Spell shield for 1.5 s, long enough to use ahead of Ferromancy: Crash Down. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rell W Ferromancy: Crash Down)
- **0.90** spell shield: Shroud of Darkness's spell shield blocks Rell's Ferromancy: Mount Up. Spell shield for 1.5 s, long enough to use ahead of Ferromancy: Mount Up. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rell W Ferromancy: Mount Up)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Rell's Full Tilt. Spell shield for 1.5 s, long enough to use ahead of Full Tilt. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rell E Full Tilt)

#### 2. Udyr (net +1.83)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Rell's Ferromancy: Crash Down (airborne, stun). Immune for 1.5 s, long enough to use ahead of Ferromancy: Crash Down. (Udyr E Blazing Stampede → Rell W Ferromancy: Crash Down)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Rell's Ferromancy: Mount Up (airborne, stun). Immune for 1.5 s, long enough to use ahead of Ferromancy: Mount Up. (Udyr E Blazing Stampede → Rell W Ferromancy: Mount Up)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Rell's Magnet Storm (airborne, kinematics). Immune for 1.5 s, long enough to use ahead of Magnet Storm. (Udyr E Blazing Stampede → Rell R Magnet Storm)

#### 3. Fizz (net +1.68)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Rell's Ferromancy: Crash Down. Untargetable for 0.75 s; Ferromancy: Crash Down takes 0.63 s to land, enough to react. (Fizz E Playful → Rell W Ferromancy: Crash Down)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Rell's Magnet Storm. Untargetable for 0.75 s; Magnet Storm takes 0.25 s to land, enough to react. (Fizz E Playful → Rell R Magnet Storm)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Rell's Shattering Strike. Untargetable for 0.75 s; Shattering Strike takes 0.4 s to land, enough to react. (Fizz E Playful → Rell Q Shattering Strike)

#### 4. Maokai (net +1.67)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Rell's Ferromancy: Crash Down. Untargetable for 1.4 s; Ferromancy: Crash Down takes 0.63 s to land, enough to react. (Maokai W Twisted Advance → Rell W Ferromancy: Crash Down)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Rell's Magnet Storm. Untargetable for 1.4 s; Magnet Storm takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Rell R Magnet Storm)
- **0.66** untargetable: Twisted Advance makes Maokai untargetable, dodging Rell's Shattering Strike. Untargetable for 1.4 s; Shattering Strike takes 0.4 s to land, enough to react. (Maokai W Twisted Advance → Rell Q Shattering Strike)

#### 5. Morgana (net +1.60)

- **0.80** cc immunity: Black Shield makes Morgana immune to Rell's Magnet Storm (airborne, kinematics). Immune for 5 s, long enough to use ahead of Magnet Storm. (Morgana E Black Shield → Rell R Magnet Storm)
- **0.78** cc immunity: Black Shield makes Morgana immune to Rell's Ferromancy: Crash Down (airborne, stun). Immune for 5 s, long enough to use ahead of Ferromancy: Crash Down. (Morgana E Black Shield → Rell W Ferromancy: Crash Down)
- **0.78** cc immunity: Black Shield makes Morgana immune to Rell's Ferromancy: Mount Up (airborne, stun). Immune for 5 s, long enough to use ahead of Ferromancy: Mount Up. (Morgana E Black Shield → Rell W Ferromancy: Mount Up)

#### 6. Fiora (net +1.59)

- **0.90** parry: Riposte parries Rell's Magnet Storm and stuns back. Parry for 0.75 s; Magnet Storm takes 0.25 s to land, enough to react. Negating Magnet Storm's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rell R Magnet Storm)
- **0.88** parry: Riposte parries Rell's Ferromancy: Crash Down and stuns back. Parry for 0.75 s; Ferromancy: Crash Down takes 0.63 s to land, enough to react. Negating Ferromancy: Crash Down's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rell W Ferromancy: Crash Down)
- **0.62** parry: Riposte parries Rell's Shattering Strike and stuns back. Parry for 0.75 s; Shattering Strike takes 0.4 s to land, enough to react. Negating Shattering Strike's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rell Q Shattering Strike)

#### 7. Sivir (net +1.58)

- **0.73** spell shield: Spell Shield's spell shield blocks Rell's Ferromancy: Crash Down. Spell shield for 1.5 s, long enough to use ahead of Ferromancy: Crash Down. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rell W Ferromancy: Crash Down)
- **0.73** spell shield: Spell Shield's spell shield blocks Rell's Ferromancy: Mount Up. Spell shield for 1.5 s, long enough to use ahead of Ferromancy: Mount Up. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rell W Ferromancy: Mount Up)
- **0.51** spell shield: Spell Shield's spell shield blocks Rell's Full Tilt. Spell shield for 1.5 s, long enough to use ahead of Full Tilt. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rell E Full Tilt)

#### 8. Rengar (net +1.46)

- **0.80** cleanse: Battle Roar cleanses Rell's Ferromancy: Crash Down (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Rell W Ferromancy: Crash Down)
- **0.80** cleanse: Battle Roar cleanses Rell's Ferromancy: Mount Up (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Rell W Ferromancy: Mount Up)
- **0.64** cleanse: Battle Roar cleanses Rell's Magnet Storm (airborne) after it lands. 10 s cooldown; usable while crowd controlled. Doesn't remove kinematics. (Rengar W Battle Roar → Rell R Magnet Storm)

#### 9. Bard (net +1.43)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Rell's Magnet Storm. Untargetable for 2.5 s, long enough to use ahead of Magnet Storm. (Bard R Tempered Fate → Rell R Magnet Storm)
- **0.48** untargetable: Tempered Fate makes Bard untargetable, dodging Rell's Ferromancy: Crash Down. Untargetable for 2.5 s, long enough to use ahead of Ferromancy: Crash Down. (Bard R Tempered Fate → Rell W Ferromancy: Crash Down)
- **0.48** untargetable: Tempered Fate makes Bard untargetable, dodging Rell's Ferromancy: Mount Up. Untargetable for 2.5 s, long enough to use ahead of Ferromancy: Mount Up. (Bard R Tempered Fate → Rell W Ferromancy: Mount Up)

#### 10. Lissandra (net +1.37)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rell's Magnet Storm. Untargetable for 2.5 s, long enough to use ahead of Magnet Storm. (Lissandra R Frozen Tomb → Rell R Magnet Storm)
- **0.48** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rell's Ferromancy: Crash Down. Untargetable for 2.5 s, long enough to use ahead of Ferromancy: Crash Down. (Lissandra R Frozen Tomb → Rell W Ferromancy: Crash Down)
- **0.48** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rell's Ferromancy: Mount Up. Untargetable for 2.5 s, long enough to use ahead of Ferromancy: Mount Up. (Lissandra R Frozen Tomb → Rell W Ferromancy: Mount Up)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.84 | 1.84 | 0.00 |  |
| 2 | Udyr | +1.83 | 1.83 | 0.00 |  |
| 3 | Fizz | +1.68 | 1.68 | 0.00 |  |
| 4 | Maokai | +1.67 | 1.67 | 0.00 |  |
| 5 | Morgana | +1.60 | 1.60 | 0.00 |  |
| 6 | Fiora | +1.59 | 1.59 | 0.00 |  |
| 7 | Sivir | +1.58 | 1.58 | 0.00 |  |
| 8 | Rengar | +1.46 | 1.46 | 0.00 |  |
| 9 | Bard | +1.43 | 1.43 | 0.00 |  |
| 10 | Lissandra | +1.37 | 1.37 | 0.00 |  |
| 11 | Gwen | +1.36 | 1.36 | 0.00 |  |
| 12 | Xayah | +1.33 | 1.33 | 0.00 |  |
| 13 | Aurora | +1.24 | 1.24 | 0.00 |  |
| 14 | Gangplank | +1.24 | 1.24 | 0.00 |  |
| 15 | Rek'Sai | +1.23 | 1.23 | 0.00 |  |
| 16 | Vladimir | +1.22 | 1.59 | 0.37 |  |
| 17 | Olaf | +1.22 | 1.22 | 0.00 |  |
| 18 | Jax | +1.19 | 1.19 | 0.00 | attack dodge (Counter Strike) |
| 19 | Evelynn | +1.17 | 1.17 | 0.00 |  |
| 20 | Shaco | +1.17 | 1.17 | 0.00 |  |
| 21 | Zaahen | +1.17 | 1.17 | 0.00 |  |
| 22 | Camille | +1.12 | 1.12 | 0.00 |  |
| 23 | Teemo | +1.08 | 1.08 | 0.00 | blind (Blinding Dart), blind (Blinding Dart) |
| 24 | Kled | +1.07 | 1.07 | 0.00 |  |
| 25 | Zed | +1.06 | 1.06 | 0.00 |  |
| 26 | Kalista | +1.02 | 1.02 | 0.00 |  |
| 27 | Alistar | +0.98 | 0.98 | 0.00 |  |
| 28 | Milio | +0.89 | 0.89 | 0.00 |  |
| 29 | Vex | +0.89 | 0.89 | 0.00 |  |
| 30 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 31 | Nilah | +0.83 | 0.83 | 0.00 | attack dodge (Jubilant Veil) |
| 32 | Jinx | +0.80 | 0.80 | 0.00 | dash stop (Flame Chompers!) |
| 33 | Hwei | +0.77 | 0.77 | 0.00 | dash stop (Grim Visage) |
| 34 | Viktor | +0.73 | 0.73 | 0.00 | dash stop (Gravity Field) |
| 35 | Ahri | +0.71 | 0.71 | 0.00 | dash stop (Charm) |
| 36 | Veigar | +0.67 | 0.67 | 0.00 | dash stop (Event Horizon) |
| 37 | Sion | +0.63 | 1.24 | 0.61 |  |
| 38 | Cassiopeia | +0.62 | 0.62 | 0.00 | grounding (Miasma) |
| 39 | Lulu | +0.55 | 0.55 | 0.00 |  |
| 40 | Xin Zhao | +0.55 | 0.55 | 0.00 |  |
| 41 | Yone | +0.54 | 0.54 | 0.00 |  |
| 42 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 43 | K'Sante | +0.47 | 0.47 | 0.00 |  |
| 44 | Malphite | +0.47 | 0.47 | 0.00 |  |
| 45 | Garen | +0.46 | 0.46 | 0.00 |  |
| 46 | Nasus | +0.35 | 0.35 | 0.00 |  |
| 47 | Master Yi | +0.33 | 1.36 | 1.03 |  |
| 48 | Amumu | +0.29 | 0.29 | 0.00 |  |
| 49 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 50 | Kindred | +0.27 | 0.27 | 0.00 |  |
| 51 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 52 | Vayne | +0.27 | 0.27 | 0.00 |  |
| 53 | Sona | +0.26 | 0.26 | 0.00 |  |
| 54 | Hecarim | +0.25 | 0.25 | 0.00 |  |
| 55 | Aphelios | +0.24 | 0.24 | 0.00 |  |
| 56 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 57 | Illaoi | +0.24 | 0.24 | 0.00 |  |
| 58 | Jarvan IV | +0.24 | 0.24 | 0.00 |  |
| 59 | Ornn | +0.24 | 0.24 | 0.00 |  |
| 60 | Renata Glasc | +0.24 | 0.24 | 0.00 |  |
| 61 | Sett | +0.24 | 0.24 | 0.00 |  |
| 62 | Shyvana | +0.24 | 0.24 | 0.00 |  |
| 63 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 64 | Volibear | +0.24 | 0.24 | 0.00 |  |
| 65 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 66 | Draven | +0.22 | 0.22 | 0.00 |  |
| 67 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 68 | Senna | +0.22 | 0.22 | 0.00 |  |
| 69 | Corki | +0.20 | 0.20 | 0.00 |  |
| 70 | Elise | +0.20 | 0.20 | 0.00 |  |
| 71 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 72 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 73 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 74 | Zoe | +0.20 | 0.20 | 0.00 |  |
| 75 | Gnar | +0.19 | 0.19 | 0.00 |  |
| 76 | Jayce | +0.18 | 0.18 | 0.00 |  |
| 77 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 78 | Lux | +0.18 | 0.18 | 0.00 |  |
| 79 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 80 | Samira | +0.18 | 0.18 | 0.00 |  |
| 81 | Mel | +0.17 | 0.17 | 0.00 |  |
| 82 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 83 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 84 | Ziggs | +0.17 | 0.17 | 0.00 |  |
| 85 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 86 | Azir | +0.16 | 0.16 | 0.00 |  |
| 87 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 88 | Orianna | +0.16 | 0.16 | 0.00 |  |
| 89 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 90 | Annie | +0.15 | 0.15 | 0.00 |  |
| 91 | Brand | +0.14 | 0.14 | 0.00 |  |
| 92 | Graves | +0.14 | 0.14 | 0.00 |  |
| 93 | Nami | +0.14 | 0.14 | 0.00 |  |
| 94 | Neeko | +0.14 | 0.14 | 0.00 |  |
| 95 | Syndra | +0.14 | 0.14 | 0.00 |  |
| 96 | Karma | +0.13 | 0.13 | 0.00 |  |
| 97 | LeBlanc | +0.13 | 0.13 | 0.00 |  |
| 98 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 99 | Swain | +0.12 | 0.12 | 0.00 |  |
| 100 | Thresh | +0.11 | 0.11 | 0.00 |  |
| 101 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 102 | Urgot | +0.08 | 0.08 | 0.00 |  |
| 103 | Rakan | +0.06 | 0.06 | 0.00 |  |
| 104 | Lillia | +0.05 | 0.05 | 0.00 |  |
| 105 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 106 | Akali | 0.00 | 0.00 | 0.00 |  |
| 107 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 108 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 109 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 110 | Braum | 0.00 | 0.00 | 0.00 |  |
| 111 | Briar | 0.00 | 0.00 | 0.00 |  |
| 112 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 113 | Darius | 0.00 | 0.00 | 0.00 |  |
| 114 | Diana | 0.00 | 0.00 | 0.00 |  |
| 115 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 116 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 117 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 118 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 119 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 120 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 121 | Leona | 0.00 | 0.00 | 0.00 |  |
| 122 | Locke | 0.00 | 0.00 | 0.00 |  |
| 123 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 124 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 125 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 126 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 127 | Riven | 0.00 | 0.00 | 0.00 |  |
| 128 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 129 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 130 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 131 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 132 | Talon | 0.00 | 0.00 | 0.00 |  |
| 133 | Taric | 0.00 | 0.00 | 0.00 |  |
| 134 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 135 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 136 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 137 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 138 | Yuumi | -0.14 | 1.86 | 2.00 |  |
| 139 | Aurelion Sol | -0.24 | 0.14 | 0.38 |  |
| 140 | Poppy | -0.31 | 0.69 | 1.00 | dash stop (Steadfast Presence) |
| 141 | Varus | -0.32 | 0.18 | 0.50 |  |
| 142 | Ivern | -0.56 | 0.11 | 0.67 |  |
| 143 | Malzahar | -0.66 | 1.34 | 2.00 |  |
| 144 | Quinn | -0.69 | 0.22 | 0.91 |  |
| 145 | Pyke | -0.69 | 0.00 | 0.69 |  |
| 146 | Gragas | -0.75 | 0.00 | 0.75 |  |
| 147 | Viego | -0.77 | 0.24 | 1.01 |  |
| 148 | Rammus | -0.90 | 0.35 | 1.25 |  |
| 149 | Shen | -1.07 | 1.18 | 2.25 | attack block (Spirit's Refuge) |
| 150 | Kayn | -1.08 | 1.17 | 2.25 |  |
| 151 | Caitlyn | -1.16 | 0.24 | 1.40 |  |
| 152 | Akshan | -1.18 | 0.19 | 1.37 |  |
| 153 | Lucian | -1.19 | 0.21 | 1.40 |  |
| 154 | Miss Fortune | -1.20 | 0.20 | 1.40 |  |
| 155 | Jhin | -1.23 | 0.17 | 1.40 |  |
| 156 | Vel'Koz | -1.24 | 0.16 | 1.40 |  |
| 157 | Karthus | -1.29 | 0.11 | 1.40 |  |
| 158 | Katarina | -1.32 | 0.00 | 1.32 |  |
| 159 | Xerath | -1.43 | 0.16 | 1.59 |  |
| 160 | Twisted Fate | -1.50 | 0.25 | 1.75 |  |
| 161 | Zac | -1.51 | 0.63 | 2.14 | dash stop (Stretching Strikes) |
| 162 | Vi | -1.52 | 0.24 | 1.76 |  |
| 163 | Ryze | -1.60 | 0.15 | 1.75 |  |
| 164 | Warwick | -1.74 | 1.42 | 3.16 |  |
| 165 | Pantheon | -1.75 | 0.73 | 2.48 |  |
| 166 | Janna | -1.78 | 0.22 | 2.00 |  |
| 167 | Fiddlesticks | -2.10 | 0.11 | 2.21 |  |
| 168 | Taliyah | -2.24 | 0.16 | 2.40 |  |
| 169 | Naafiri | -2.25 | 0.00 | 2.25 |  |
| 170 | Tahm Kench | -2.26 | 0.00 | 2.26 |  |
| 171 | Nunu & Willump | -2.33 | 0.00 | 2.33 |  |
| 172 | Galio | -2.91 | 0.00 | 2.91 |  |
