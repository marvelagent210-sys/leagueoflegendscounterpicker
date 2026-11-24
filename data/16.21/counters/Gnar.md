# Counters to Gnar (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Gnar: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Gnar wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Gnar --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +1.00 |
| 2 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 3 | Yunara | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 4 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | +0.85 | +0.00 |
| 5 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 6 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 7 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 8 | Ashe | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | +0.97 | +0.00 |
| 9 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 10 | Draven | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 11 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 12 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 13 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 14 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 15 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 16 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 17 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 18 | Mordekaiser | +0.77 | +0.99 | +0.99 | +0.98 | −0.12 | +0.98 | +0.00 |
| 19 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 20 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.26 | +1.00 | +0.00 |
| 21 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.27 | +1.00 | +0.00 |
| 22 | Sivir | +0.75 | +0.79 | +1.00 | +0.99 | −0.00 | +1.00 | +0.00 |
| 23 | Quinn | +0.75 | +0.90 | +0.90 | +1.00 | −0.03 | +1.00 | +0.00 |
| 24 | Jhin | +0.74 | +0.90 | +0.96 | +1.00 | +0.05 | +0.70 | +0.00 |
| 25 | Xin Zhao | +0.73 | +1.00 | +1.00 | +1.00 | +0.05 | +0.23 | +0.00 |
| 26 | Aurora | +0.69 | +0.72 | +0.84 | +1.00 | +0.03 | +1.00 | +0.00 |
| 27 | Sion | +0.68 | +0.82 | +0.86 | +1.00 | −0.10 | +0.80 | +0.00 |
| 28 | Nocturne | +0.68 | +1.00 | +1.00 | +1.00 | −0.28 | +0.21 | +0.00 |
| 29 | Kayle | +0.66 | +1.00 | +1.00 | +0.02 | +0.37 | +1.00 | +0.00 |
| 30 | Shyvana | +0.64 | +1.00 | +1.00 | +1.00 | −0.18 | −0.33 | +0.00 |
| 31 | Volibear | +0.63 | +1.00 | +1.00 | +1.00 | −0.26 | −0.29 | +0.00 |
| 32 | Camille | +0.62 | +1.00 | +1.00 | +1.00 | −0.20 | −0.49 | +0.00 |
| 33 | Jax | +0.61 | +1.00 | +1.00 | +1.00 | +0.03 | −0.99 | +0.00 |
| 34 | Malphite | +0.59 | +1.00 | +1.00 | +1.00 | −0.05 | −1.00 | +0.00 |
| 35 | Corki | +0.56 | +1.00 | +1.00 | −0.24 | +0.04 | +1.00 | +0.00 |
| 36 | Caitlyn | +0.56 | +0.59 | +0.59 | +1.00 | −0.01 | +0.61 | +0.00 |
| 37 | Varus | +0.54 | +0.94 | +1.00 | −0.20 | −0.01 | +1.00 | +0.00 |
| 38 | Zeri | +0.53 | +1.00 | +1.00 | −0.45 | +0.13 | +1.00 | +0.00 |
| 39 | Garen | +0.51 | +1.00 | −0.09 | +1.00 | −0.12 | +1.00 | +0.00 |
| 40 | Illaoi | +0.50 | +1.00 | +0.55 | +1.00 | −0.20 | −0.62 | +0.00 |
| 41 | Fiora | +0.47 | +0.30 | +0.30 | +1.00 | −0.17 | +1.00 | +1.00 |
| 42 | Darius | +0.47 | −0.19 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 43 | Xayah | +0.43 | +0.31 | +0.18 | +1.00 | +0.07 | +1.00 | +0.00 |
| 44 | Gangplank | +0.42 | +0.16 | +1.00 | +1.00 | −0.03 | −0.63 | +0.00 |
| 45 | Milio | +0.40 | +0.15 | +0.20 | +1.00 | +0.11 | +1.00 | +0.00 |
| 46 | Lucian | +0.40 | −0.17 | +1.00 | +0.50 | −0.04 | +1.00 | +0.00 |
| 47 | Aatrox | +0.34 | +0.15 | +0.17 | +1.00 | −0.25 | +1.00 | +0.00 |
| 48 | Jinx | +0.26 | +0.68 | +0.69 | −1.00 | +0.09 | +1.00 | +0.00 |
| 49 | Ivern | +0.20 | −0.65 | +0.28 | +1.00 | −0.07 | +1.00 | +0.00 |
| 50 | Zac | +0.18 | +0.47 | −0.04 | +0.10 | −0.04 | +0.62 | +0.00 |
| 51 | Rammus | +0.16 | +1.00 | +1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 52 | Jayce | +0.13 | +1.00 | −1.00 | +0.57 | +0.00 | +0.17 | +0.00 |
| 53 | Anivia | +0.11 | +0.25 | +0.18 | +0.08 | −0.15 | +0.10 | +0.00 |
| 54 | Kalista | +0.10 | +0.81 | +0.02 | −1.00 | −0.07 | +1.00 | +0.00 |
| 55 | Sett | +0.07 | +1.00 | −1.00 | +1.00 | −0.20 | −1.00 | +0.00 |
| 56 | Wukong | +0.06 | +1.00 | −1.00 | +1.00 | −0.36 | −0.82 | +0.00 |
| 57 | Taric | +0.05 | +0.14 | +0.16 | +0.20 | −0.03 | −0.62 | +0.00 |
| 58 | Irelia | −0.02 | −0.51 | −0.01 | +0.59 | −0.04 | −0.06 | +0.00 |
| 59 | Miss Fortune | −0.03 | +1.00 | −0.76 | −1.00 | +0.08 | +1.00 | +0.00 |
| 60 | Dr. Mundo | −0.07 | +0.12 | +0.17 | −0.65 | −0.05 | +0.03 | +0.00 |
| 61 | Karma | −0.11 | −0.50 | +0.13 | −0.53 | +0.02 | +0.84 | +0.00 |
| 62 | Samira | −0.19 | −0.40 | −0.40 | +0.28 | +0.02 | −0.50 | +0.00 |
| 63 | Orianna | −0.20 | −0.83 | −0.23 | −0.25 | +0.07 | +1.00 | +0.00 |
| 64 | Neeko | −0.24 | −1.00 | −1.00 | +0.73 | +0.08 | +0.99 | +0.00 |
| 65 | Nilah | −0.29 | −0.41 | −0.38 | −1.00 | +0.03 | +1.00 | +0.00 |
| 66 | Tahm Kench | −0.30 | −0.22 | −0.26 | −0.49 | −0.12 | −0.62 | +0.00 |
| 67 | Master Yi | −0.31 | −0.69 | −0.37 | −1.00 | +0.02 | +1.00 | +1.00 |
| 68 | Bard | −0.32 | −0.52 | −0.33 | −1.00 | −0.07 | +1.00 | +0.00 |
| 69 | Twitch | −0.33 | −0.67 | −0.34 | −1.00 | +0.16 | +1.00 | +0.00 |
| 70 | Zilean | −0.36 | −1.00 | −0.05 | −1.00 | +0.03 | +1.00 | +0.00 |
| 71 | Cho'Gath | −0.37 | −0.89 | −0.89 | +1.00 | −0.20 | −1.00 | +0.00 |
| 72 | Ezreal | −0.38 | −0.65 | −0.79 | −0.11 | −0.01 | −0.00 | +0.00 |
| 73 | Lee Sin | −0.39 | −0.97 | −0.96 | +1.00 | −0.06 | −1.00 | +0.00 |
| 74 | Tristana | −0.41 | −1.00 | −1.00 | −0.14 | +0.10 | +1.00 | +0.00 |
| 75 | Renekton | −0.42 | −1.00 | −1.00 | +1.00 | −0.15 | −1.00 | +0.00 |
| 76 | Kled | −0.44 | −1.00 | −1.00 | +0.79 | +0.03 | −1.00 | +0.00 |
| 77 | Azir | −0.45 | −0.87 | −0.55 | −1.00 | +0.05 | +1.00 | +0.00 |
| 78 | Renata Glasc | −0.46 | −1.00 | −0.99 | −0.28 | +0.14 | +0.68 | +0.00 |
| 79 | Annie | −0.49 | +0.13 | −1.00 | −1.00 | +0.06 | −0.84 | +0.00 |
| 80 | Kennen | −0.54 | −0.97 | −0.97 | −0.67 | −0.03 | +0.89 | +0.00 |
| 81 | Kai'Sa | −0.54 | −0.88 | −0.88 | −1.00 | −0.01 | +1.00 | +0.00 |
| 82 | Riven | −0.57 | −1.00 | −1.00 | +0.00 | −0.01 | −0.65 | +0.00 |
| 83 | Smolder | −0.58 | −1.00 | −1.00 | −1.00 | +0.15 | +1.00 | +0.00 |
| 84 | Rengar | −0.60 | −1.00 | −1.00 | −1.00 | +0.34 | +0.50 | +0.00 |
| 85 | Kindred | −0.60 | −1.00 | −1.00 | −1.00 | −0.01 | +1.00 | +0.00 |
| 86 | Rumble | −0.61 | −0.82 | −0.82 | −1.00 | −0.16 | +0.19 | +0.00 |
| 87 | Maokai | −0.62 | −1.00 | −0.26 | −1.00 | −0.01 | −1.00 | +0.00 |
| 88 | Udyr | −0.63 | −0.73 | −1.00 | −0.39 | −0.14 | −1.00 | +0.00 |
| 89 | Akshan | −0.64 | −1.00 | −1.00 | −1.00 | −0.01 | +0.65 | +0.00 |
| 90 | Senna | −0.67 | −0.92 | −0.92 | −1.00 | +0.07 | −0.17 | +0.00 |
| 91 | Janna | −0.67 | −1.00 | −1.00 | −1.00 | +0.12 | +0.07 | +0.00 |
| 92 | Swain | −0.68 | −0.99 | −0.99 | −1.00 | +0.10 | −0.01 | +0.00 |
| 93 | Jarvan IV | −0.70 | −0.84 | −0.99 | −0.82 | +0.11 | −0.99 | +0.00 |
| 94 | Zyra | −0.71 | −1.00 | −1.00 | −1.00 | +0.03 | −0.19 | +0.00 |
| 95 | Diana | −0.73 | −0.94 | −0.86 | −1.00 | +0.11 | −1.00 | +0.00 |
| 96 | Karthus | −0.75 | −1.00 | −1.00 | −1.00 | −0.02 | −0.50 | +0.00 |
| 97 | Elise | −0.76 | −1.00 | −1.00 | −1.00 | +0.07 | −0.67 | +0.00 |
| 98 | Heimerdinger | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | −0.73 | +0.00 |
| 99 | Syndra | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | −0.74 | +0.00 |
| 100 | Vel'Koz | −0.77 | −1.00 | −1.00 | −0.91 | +0.11 | −1.00 | +0.00 |
| 101 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | −0.77 | +0.00 |
| 102 | Lillia | −0.77 | −0.93 | −0.93 | −1.00 | −0.04 | −1.00 | +0.00 |
| 103 | Rek'Sai | −0.77 | −0.88 | −1.00 | −0.84 | −0.23 | −1.00 | +0.00 |
| 104 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 105 | Pantheon | −0.78 | −1.00 | −1.00 | −0.93 | −0.24 | −0.57 | +0.00 |
| 106 | Aurelion Sol | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 107 | Sylas | −0.79 | −0.99 | −0.94 | −0.95 | −0.09 | −1.00 | +0.00 |
| 108 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 109 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 110 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 111 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 112 | Vi | −0.79 | −1.00 | −1.00 | −0.94 | −0.02 | −1.00 | +0.00 |
| 113 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 114 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 115 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 116 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 117 | Brand | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 118 | Lux | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 119 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 120 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 121 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 122 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 123 | Hwei | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 124 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 125 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 126 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 127 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 128 | Ambessa | −0.80 | −0.94 | −0.94 | −1.00 | −0.19 | −1.00 | +0.00 |
| 129 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 130 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 131 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 132 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 133 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 134 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 135 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 136 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 137 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 138 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 139 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 140 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 141 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 142 | Braum | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 143 | Bel'Veth | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 144 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 145 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 146 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 147 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 148 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 149 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 150 | Lissandra | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 151 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 152 | Kayn | −0.81 | −0.98 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 153 | Nunu & Willump | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 154 | Ornn | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 155 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 156 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 157 | Kha'Zix | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 158 | Amumu | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 159 | Sejuani | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 160 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 161 | Singed | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 162 | Kassadin | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 163 | Shaco | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 164 | Fizz | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 165 | Viego | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 166 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 167 | Rakan | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 168 | Yone | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 169 | Qiyana | −0.85 | −1.00 | −1.00 | −1.00 | −0.32 | −1.00 | +0.00 |
| 170 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.00 |
| 171 | Gwen | −0.86 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | +0.00 |
| 172 | Briar | −0.87 | −1.00 | −1.00 | −1.00 | −0.45 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Gnar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Gnar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Gnar` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Morgana (net +1.09)

- **0.80** cc immunity: Black Shield makes Morgana immune to Gnar's GNAR! (airborne, slow, stun). Immune for 5 s, long enough to use ahead of GNAR!. (Morgana E Black Shield → Gnar R GNAR!)
- **0.46** cc immunity: Black Shield makes Morgana immune to Gnar's Wallop (stun). Immune for 5 s, long enough to use ahead of Wallop. (Morgana E Black Shield → Gnar W Wallop)
- **0.13** cc immunity: Black Shield makes Morgana immune to Gnar's Crunch (slow). Immune for 5 s, long enough to use ahead of Crunch. (Morgana E Black Shield → Gnar E Crunch)

#### 2. Sivir (net +1.02)

- **0.80** spell shield: Spell Shield's spell shield blocks Gnar's GNAR!. Spell shield for 1.5 s, long enough to use ahead of GNAR!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gnar R GNAR!)
- **0.44** spell shield: Spell Shield's spell shield blocks Gnar's Wallop. Spell shield for 1.5 s, long enough to use ahead of Wallop. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gnar W Wallop)

#### 3. Fizz (net +0.99)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Gnar's GNAR!. Untargetable for 0.75 s; GNAR! takes 0.25 s to land, enough to react. (Fizz E Playful → Gnar R GNAR!)
- **0.65** untargetable: Playful makes Fizz untargetable, dodging Gnar's Wallop. Untargetable for 0.75 s; Wallop takes 0.6 s to land, enough to react. (Fizz E Playful → Gnar W Wallop)
- Watch out: Gnar's basic attacks reach 336.765 units farther than Fizz's (511.765 vs 175 attack range).

#### 4. Udyr (net +0.89)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Gnar's GNAR! (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of GNAR!. (Udyr E Blazing Stampede → Gnar R GNAR!)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Gnar's Wallop (stun). Immune for 1.5 s, long enough to use ahead of Wallop. (Udyr E Blazing Stampede → Gnar W Wallop)
- **0.15** cc immunity: Blazing Stampede makes Udyr immune to Gnar's Crunch (slow). Immune for 1.5 s, long enough to use ahead of Crunch. (Udyr E Blazing Stampede → Gnar E Crunch)
- Watch out: Gnar's basic attacks reach 386.765 units farther than Udyr's (511.765 vs 125 attack range).

#### 5. Fiora (net +0.89)

- **0.90** parry: Riposte parries Gnar's GNAR! and stuns back. Parry for 0.75 s; GNAR! takes 0.25 s to land, enough to react. Negating GNAR!'s immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Gnar R GNAR!)
- **0.56** parry: Riposte parries Gnar's Wallop and stuns back. Parry for 0.75 s; Wallop takes 0.6 s to land, enough to react. Negating Wallop's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Gnar W Wallop)
- **0.08** attack speed slow: Riposte cuts Gnar's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Gnar basic attacks)
- Watch out: Gnar's basic attacks reach 361.765 units farther than Fiora's (511.765 vs 150 attack range).

#### 6. Vladimir (net +0.88)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gnar's GNAR!. Untargetable for 2 s, long enough to use ahead of GNAR!. (Vladimir W Sanguine Pool → Gnar R GNAR!)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gnar's Wallop. Untargetable for 2 s, long enough to use ahead of Wallop. (Vladimir W Sanguine Pool → Gnar W Wallop)
- Watch out: Wallop's stun interrupts Vladimir's Tides of Blood (charge-up).

#### 7. Nocturne (net +0.81)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Gnar's GNAR!. Spell shield for 1.5 s, long enough to use ahead of GNAR!. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gnar R GNAR!)
- **0.52** spell shield: Shroud of Darkness's spell shield blocks Gnar's Wallop. Spell shield for 1.5 s, long enough to use ahead of Wallop. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gnar W Wallop)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Gnar's GNAR! (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Gnar R GNAR!)
- Watch out: Gnar's basic attacks reach 386.765 units farther than Nocturne's (511.765 vs 125 attack range).

#### 8. Maokai (net +0.76)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Gnar's GNAR!. Untargetable for 1.4 s; GNAR! takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Gnar R GNAR!)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Gnar's Wallop. Untargetable for 1.4 s; Wallop takes 0.6 s to land, enough to react. (Maokai W Twisted Advance → Gnar W Wallop)
- Watch out: Gnar's basic attacks reach 386.765 units farther than Maokai's (511.765 vs 125 attack range).

#### 9. Lissandra (net +0.72)

- **0.50** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Gnar's GNAR!. Untargetable for 2.5 s, long enough to use ahead of GNAR!. (Lissandra R Frozen Tomb → Gnar R GNAR!)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Gnar's Wallop. Untargetable for 2.5 s, long enough to use ahead of Wallop. (Lissandra R Frozen Tomb → Gnar W Wallop)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Gnar's Crunch mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Gnar E Crunch)

#### 10. Gwen (net +0.71)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Gnar's GNAR!. Untargetable for ?; GNAR! takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Gnar R GNAR!)
- **0.44** untargetable: Hallowed Mist makes Gwen untargetable, dodging Gnar's Wallop. Untargetable for ?; Wallop takes 0.6 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Gnar W Wallop)
- Watch out: Gnar's basic attacks reach 361.765 units farther than Gwen's (511.765 vs 150 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Morgana | +1.09 | 1.09 | 0.00 |  |
| 2 | Sivir | +1.02 | 1.02 | 0.00 |  |
| 3 | Fizz | +0.99 | 1.13 | 0.14 |  |
| 4 | Udyr | +0.89 | 1.22 | 0.33 |  |
| 5 | Fiora | +0.89 | 1.20 | 0.31 |  |
| 6 | Vladimir | +0.88 | 1.03 | 0.15 |  |
| 7 | Nocturne | +0.81 | 1.14 | 0.33 |  |
| 8 | Maokai | +0.76 | 1.09 | 0.33 |  |
| 9 | Lissandra | +0.72 | 0.72 | 0.00 |  |
| 10 | Gwen | +0.71 | 1.02 | 0.31 |  |
| 11 | Bard | +0.66 | 0.66 | 0.00 |  |
| 12 | Aurora | +0.64 | 0.64 | 0.00 |  |
| 13 | Xayah | +0.62 | 0.62 | 0.00 |  |
| 14 | Master Yi | +0.54 | 1.20 | 0.66 |  |
| 15 | Milio | +0.54 | 0.54 | 0.00 |  |
| 16 | Kled | +0.52 | 0.63 | 0.11 |  |
| 17 | Camille | +0.50 | 0.66 | 0.16 |  |
| 18 | Kalista | +0.50 | 0.50 | 0.00 |  |
| 19 | Rek'Sai | +0.49 | 0.68 | 0.19 |  |
| 20 | Zaahen | +0.49 | 0.68 | 0.19 |  |
| 21 | Samira | +0.49 | 0.49 | 0.00 |  |
| 22 | Vex | +0.47 | 0.47 | 0.00 |  |
| 23 | Mel | +0.46 | 0.46 | 0.00 |  |
| 24 | Ahri | +0.45 | 0.45 | 0.00 |  |
| 25 | Hwei | +0.45 | 0.45 | 0.00 |  |
| 26 | Jinx | +0.45 | 0.45 | 0.00 |  |
| 27 | Teemo | +0.45 | 0.45 | 0.00 | blind (Blinding Dart) |
| 28 | Evelynn | +0.44 | 0.66 | 0.22 |  |
| 29 | Shaco | +0.44 | 0.66 | 0.22 |  |
| 30 | Cassiopeia | +0.43 | 0.43 | 0.00 |  |
| 31 | Viktor | +0.43 | 0.43 | 0.00 |  |
| 32 | Braum | +0.41 | 0.74 | 0.33 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 33 | Veigar | +0.41 | 0.41 | 0.00 |  |
| 34 | Zed | +0.40 | 0.62 | 0.22 |  |
| 35 | Kayle | +0.40 | 0.40 | 0.00 |  |
| 36 | Yasuo | +0.37 | 0.56 | 0.19 |  |
| 37 | Lulu | +0.32 | 0.32 | 0.00 |  |
| 38 | Yuumi | +0.27 | 1.15 | 0.88 |  |
| 39 | Rengar | +0.26 | 0.92 | 0.66 |  |
| 40 | Gangplank | +0.22 | 0.88 | 0.66 |  |
| 41 | Alistar | +0.22 | 0.55 | 0.33 |  |
| 42 | Yone | +0.17 | 0.31 | 0.14 |  |
| 43 | Aphelios | +0.13 | 0.13 | 0.00 |  |
| 44 | Heimerdinger | +0.13 | 0.13 | 0.00 |  |
| 45 | Tristana | +0.11 | 0.11 | 0.00 |  |
| 46 | Nilah | +0.07 | 0.31 | 0.24 |  |
| 47 | Ashe | +0.05 | 0.05 | 0.00 |  |
| 48 | Senna | +0.05 | 0.05 | 0.00 |  |
| 49 | Malzahar | +0.04 | 0.84 | 0.80 |  |
| 50 | Annie | +0.04 | 0.04 | 0.00 |  |
| 51 | Olaf | +0.03 | 0.69 | 0.66 |  |
| 52 | Jax | +0.03 | 0.36 | 0.33 |  |
| 53 | Anivia | +0.03 | 0.03 | 0.00 |  |
| 54 | Xin Zhao | +0.02 | 0.31 | 0.29 |  |
| 55 | Garen | +0.01 | 0.58 | 0.57 |  |
| 56 | K'Sante | +0.01 | 0.16 | 0.15 |  |
| 57 | Azir | 0.00 | 0.00 | 0.00 |  |
| 58 | Brand | 0.00 | 0.00 | 0.00 |  |
| 59 | Corki | 0.00 | 0.00 | 0.00 |  |
| 60 | Draven | 0.00 | 0.00 | 0.00 |  |
| 61 | Elise | 0.00 | 0.00 | 0.00 |  |
| 62 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 63 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 64 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 65 | Karma | 0.00 | 0.00 | 0.00 |  |
| 66 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 67 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 68 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 69 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 70 | Lux | 0.00 | 0.00 | 0.00 |  |
| 71 | Nami | 0.00 | 0.00 | 0.00 |  |
| 72 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 73 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 74 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 75 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 76 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 77 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 78 | Sona | 0.00 | 0.00 | 0.00 |  |
| 79 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 80 | Swain | 0.00 | 0.00 | 0.00 |  |
| 81 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 82 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 83 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 84 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 85 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 86 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 87 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 88 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 89 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 90 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 91 | Malphite | -0.03 | 0.30 | 0.33 |  |
| 92 | Graves | -0.05 | 0.00 | 0.05 |  |
| 93 | Sion | -0.06 | 0.76 | 0.82 |  |
| 94 | Jarvan IV | -0.06 | 0.08 | 0.14 |  |
| 95 | Hecarim | -0.11 | 0.08 | 0.19 |  |
| 96 | Ornn | -0.11 | 0.08 | 0.19 |  |
| 97 | Amumu | -0.12 | 0.21 | 0.33 |  |
| 98 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 99 | Volibear | -0.13 | 0.08 | 0.21 |  |
| 100 | Sylas | -0.14 | 0.00 | 0.14 |  |
| 101 | Urgot | -0.14 | 0.00 | 0.14 |  |
| 102 | Aurelion Sol | -0.15 | 0.00 | 0.15 |  |
| 103 | Briar | -0.16 | 0.00 | 0.16 |  |
| 104 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 105 | Varus | -0.18 | 0.00 | 0.18 |  |
| 106 | Wukong | -0.19 | 0.00 | 0.19 |  |
| 107 | Rell | -0.19 | 0.00 | 0.19 |  |
| 108 | Singed | -0.21 | 0.45 | 0.66 |  |
| 109 | Bel'Veth | -0.21 | 0.00 | 0.21 |  |
| 110 | Qiyana | -0.21 | 0.00 | 0.21 |  |
| 111 | Poppy | -0.22 | 0.51 | 0.73 |  |
| 112 | Akali | -0.22 | 0.00 | 0.22 |  |
| 113 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 114 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 115 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 116 | Riven | -0.22 | 0.00 | 0.22 |  |
| 117 | Talon | -0.22 | 0.00 | 0.22 |  |
| 118 | Shyvana | -0.23 | 0.08 | 0.31 |  |
| 119 | Ivern | -0.24 | 0.00 | 0.24 |  |
| 120 | Illaoi | -0.25 | 0.08 | 0.33 |  |
| 121 | Sett | -0.25 | 0.08 | 0.33 |  |
| 122 | Irelia | -0.27 | 0.00 | 0.27 |  |
| 123 | Aatrox | -0.29 | 0.00 | 0.29 |  |
| 124 | Nautilus | -0.29 | 0.00 | 0.29 |  |
| 125 | Tryndamere | -0.29 | 0.00 | 0.29 |  |
| 126 | Diana | -0.31 | 0.00 | 0.31 |  |
| 127 | Kassadin | -0.31 | 0.00 | 0.31 |  |
| 128 | Sejuani | -0.31 | 0.00 | 0.31 |  |
| 129 | Nasus | -0.32 | 0.34 | 0.66 |  |
| 130 | Kha'Zix | -0.33 | 0.00 | 0.33 |  |
| 131 | Leona | -0.33 | 0.00 | 0.33 |  |
| 132 | Locke | -0.33 | 0.00 | 0.33 |  |
| 133 | Renekton | -0.33 | 0.00 | 0.33 |  |
| 134 | Quinn | -0.36 | 0.00 | 0.36 |  |
| 135 | Kayn | -0.43 | 0.66 | 1.09 |  |
| 136 | Viego | -0.44 | 0.08 | 0.52 |  |
| 137 | Skarner | -0.46 | 0.16 | 0.62 |  |
| 138 | Caitlyn | -0.48 | 0.08 | 0.56 |  |
| 139 | Rammus | -0.49 | 0.34 | 0.83 |  |
| 140 | Mordekaiser | -0.49 | 0.08 | 0.57 |  |
| 141 | Pyke | -0.49 | 0.00 | 0.49 |  |
| 142 | Akshan | -0.56 | 0.00 | 0.56 |  |
| 143 | Jhin | -0.56 | 0.00 | 0.56 |  |
| 144 | Karthus | -0.56 | 0.00 | 0.56 |  |
| 145 | Lucian | -0.56 | 0.00 | 0.56 |  |
| 146 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 147 | Vel'Koz | -0.56 | 0.00 | 0.56 |  |
| 148 | Darius | -0.57 | 0.00 | 0.57 |  |
| 149 | Trundle | -0.57 | 0.00 | 0.57 |  |
| 150 | Yorick | -0.57 | 0.00 | 0.57 |  |
| 151 | Taric | -0.62 | 0.00 | 0.62 |  |
| 152 | Zac | -0.63 | 0.45 | 1.08 |  |
| 153 | Gragas | -0.63 | 0.00 | 0.63 |  |
| 154 | Xerath | -0.64 | 0.00 | 0.64 |  |
| 155 | Blitzcrank | -0.66 | 0.00 | 0.66 |  |
| 156 | Cho'Gath | -0.66 | 0.00 | 0.66 |  |
| 157 | Dr. Mundo | -0.66 | 0.00 | 0.66 |  |
| 158 | Rumble | -0.66 | 0.00 | 0.66 |  |
| 159 | Pantheon | -0.67 | 0.51 | 1.18 |  |
| 160 | Warwick | -0.68 | 0.83 | 1.51 |  |
| 161 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 162 | Twisted Fate | -0.70 | 0.00 | 0.70 |  |
| 163 | Shen | -0.78 | 0.34 | 1.12 |  |
| 164 | Janna | -0.80 | 0.00 | 0.80 |  |
| 165 | Vi | -0.86 | 0.08 | 0.94 |  |
| 166 | Fiddlesticks | -0.88 | 0.00 | 0.88 |  |
| 167 | Katarina | -0.89 | 0.00 | 0.89 |  |
| 168 | Taliyah | -0.96 | 0.00 | 0.96 |  |
| 169 | Naafiri | -1.06 | 0.00 | 1.06 |  |
| 170 | Tahm Kench | -1.16 | 0.00 | 1.16 |  |
| 171 | Nunu & Willump | -1.24 | 0.31 | 1.55 |  |
| 172 | Galio | -1.36 | 0.00 | 1.36 |  |
