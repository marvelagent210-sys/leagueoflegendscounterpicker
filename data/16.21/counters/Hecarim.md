# Counters to Hecarim (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Hecarim: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Hecarim wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Hecarim --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kog'Maw | +0.86 | +1.00 | +1.00 | +1.00 | +0.44 | +1.00 | −0.07 |
| 2 | Kayle | +0.85 | +1.00 | +1.00 | +1.00 | +0.44 | +1.00 | −0.35 |
| 3 | Zeri | +0.84 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.53 |
| 4 | Vel'Koz | +0.84 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | −0.19 |
| 5 | Malphite | +0.83 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.53 |
| 6 | Annie | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.10 |
| 7 | Ambessa | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.29 |
| 8 | Neeko | +0.82 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | −0.14 |
| 9 | Rakan | +0.82 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.35 |
| 10 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | −0.14 |
| 11 | Camille | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.57 |
| 12 | Urgot | +0.81 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | −0.41 |
| 13 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.02 |
| 14 | Lillia | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.29 |
| 15 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.88 |
| 16 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.17 |
| 17 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | −0.44 |
| 18 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | −0.44 |
| 19 | Milio | +0.81 | +1.00 | +0.95 | +1.00 | +0.20 | +1.00 | −0.21 |
| 20 | Smolder | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −0.37 |
| 21 | Morgana | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.34 |
| 22 | Nautilus | +0.81 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.12 |
| 23 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.80 |
| 24 | Lucian | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.14 |
| 25 | Diana | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.27 |
| 26 | Rell | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.09 |
| 27 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.29 |
| 28 | Nilah | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.21 |
| 29 | Cassiopeia | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.17 |
| 30 | Swain | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.17 |
| 31 | Master Yi | +0.80 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.67 |
| 32 | Bard | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.27 |
| 33 | Varus | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | −0.19 |
| 34 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.25 |
| 35 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.25 |
| 36 | Sejuani | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.31 |
| 37 | Azir | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.13 |
| 38 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.09 |
| 39 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.32 |
| 40 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.21 |
| 41 | Ahri | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.19 |
| 42 | Lux | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.18 |
| 43 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.14 |
| 44 | Hwei | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.09 |
| 45 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.56 |
| 46 | Brand | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.27 |
| 47 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.50 |
| 48 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.58 |
| 49 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.77 |
| 50 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.12 |
| 51 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.26 |
| 52 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.45 |
| 53 | Zilean | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.25 |
| 54 | Yunara | +0.79 | +1.00 | +1.00 | +0.92 | +0.11 | +1.00 | −0.23 |
| 55 | Lissandra | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.21 |
| 56 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.35 |
| 57 | Gnar | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.28 |
| 58 | Amumu | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.40 |
| 59 | Malzahar | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.21 |
| 60 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.18 |
| 61 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.35 |
| 62 | Shen | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.23 |
| 63 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.60 |
| 64 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.53 |
| 65 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.15 |
| 66 | Rammus | +0.78 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.29 |
| 67 | Ornn | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.10 |
| 68 | Kayn | +0.78 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.28 |
| 69 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.40 |
| 70 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.10 |
| 71 | Sivir | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.34 |
| 72 | Tahm Kench | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.15 |
| 73 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.17 |
| 74 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.44 |
| 75 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.32 |
| 76 | Zed | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.35 |
| 77 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.11 |
| 78 | Illaoi | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.01 |
| 79 | Corki | +0.77 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.54 |
| 80 | Fiora | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.55 |
| 81 | Quinn | +0.77 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.58 |
| 82 | Karma | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | −0.24 |
| 83 | Ezreal | +0.77 | +1.00 | +0.97 | +1.00 | −0.07 | +1.00 | −0.21 |
| 84 | Bel'Veth | +0.77 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.18 |
| 85 | Rek'Sai | +0.77 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.10 |
| 86 | Akali | +0.77 | +1.00 | +1.00 | +1.00 | +0.02 | – | −0.16 |
| 87 | Jinx | +0.77 | +0.98 | +0.98 | +0.98 | +0.02 | +0.96 | −0.26 |
| 88 | Viego | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.06 |
| 89 | Garen | +0.77 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.25 |
| 90 | Graves | +0.77 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.72 |
| 91 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.03 |
| 92 | Lee Sin | +0.77 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.14 |
| 93 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.09 |
| 94 | Rumble | +0.77 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.11 |
| 95 | Braum | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.05 |
| 96 | Kai'Sa | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | −0.50 |
| 97 | Olaf | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.03 |
| 98 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.11 |
| 99 | Singed | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.13 |
| 100 | Yone | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.11 |
| 101 | Irelia | +0.75 | +1.00 | +1.00 | +1.00 | −0.12 | – | −0.04 |
| 102 | Alistar | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | −0.07 |
| 103 | Vi | +0.75 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.23 |
| 104 | Zac | +0.75 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.15 |
| 105 | Shaco | +0.74 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.30 |
| 106 | Aatrox | +0.74 | +1.00 | +1.00 | +1.00 | −0.11 | – | −0.29 |
| 107 | Zaahen | +0.74 | +1.00 | +1.00 | +1.00 | −0.15 | – | −0.18 |
| 108 | Xin Zhao | +0.74 | +1.00 | +1.00 | +1.00 | −0.18 | – | −0.17 |
| 109 | Heimerdinger | +0.73 | +0.73 | +0.98 | +1.00 | +0.09 | +1.00 | −0.21 |
| 110 | Wukong | +0.73 | +1.00 | +1.00 | +1.00 | −0.15 | – | −0.39 |
| 111 | Vex | +0.72 | +1.00 | +0.68 | +1.00 | −0.01 | +1.00 | −0.02 |
| 112 | Tristana | +0.68 | +1.00 | +1.00 | +1.00 | +0.03 | +0.00 | −0.39 |
| 113 | Elise | +0.61 | +1.00 | +1.00 | +1.00 | +0.09 | −1.00 | −0.06 |
| 114 | Caitlyn | +0.61 | +1.00 | +1.00 | +1.00 | +0.15 | −1.00 | −0.33 |
| 115 | Akshan | +0.40 | +1.00 | +1.00 | −1.00 | +0.08 | +1.00 | −0.29 |
| 116 | Gragas | +0.37 | +0.52 | +0.52 | +1.00 | −0.09 | −1.00 | +0.45 |
| 117 | Kassadin | +0.35 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.43 |
| 118 | Fizz | +0.33 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.15 |
| 119 | Syndra | +0.32 | +1.00 | −1.00 | +1.00 | +0.24 | +1.00 | −0.22 |
| 120 | Mel | +0.30 | +0.90 | −0.91 | +1.00 | +0.06 | +1.00 | −0.14 |
| 121 | Jarvan IV | +0.27 | +1.00 | −1.00 | +1.00 | +0.07 | – | +0.71 |
| 122 | Maokai | +0.24 | +1.00 | −1.00 | +1.00 | +0.14 | – | −0.04 |
| 123 | Gangplank | +0.24 | +1.00 | −1.00 | +1.00 | +0.10 | – | +0.01 |
| 124 | Galio | +0.20 | +1.00 | −1.00 | +1.00 | −0.07 | – | −0.23 |
| 125 | Ekko | +0.19 | +1.00 | −1.00 | +1.00 | −0.12 | – | −0.28 |
| 126 | Orianna | +0.11 | −1.00 | +1.00 | +1.00 | +0.10 | −1.00 | −0.11 |
| 127 | Twitch | +0.10 | +0.00 | +0.00 | +1.00 | +0.11 | −1.00 | −0.24 |
| 128 | Zoe | +0.09 | −1.00 | +1.00 | +1.00 | −0.01 | −1.00 | −0.23 |
| 129 | Ryze | +0.09 | −1.00 | +1.00 | +1.00 | +0.06 | −1.00 | −0.46 |
| 130 | Anivia | +0.06 | +0.04 | +0.20 | +0.04 | −0.12 | −0.07 | +0.26 |
| 131 | Karthus | −0.00 | +0.00 | +0.00 | +0.00 | +0.06 | +0.00 | −0.28 |
| 132 | Draven | −0.10 | −1.00 | +1.00 | −1.00 | +0.06 | +1.00 | −0.16 |
| 133 | Rengar | −0.13 | −1.00 | +1.00 | −1.00 | +0.29 | – | +0.70 |
| 134 | Jhin | −0.20 | −0.89 | −0.89 | +1.00 | −0.01 | +0.53 | −0.26 |
| 135 | Senna | −0.21 | −0.42 | −0.42 | −0.48 | +0.06 | +1.00 | −0.19 |
| 136 | LeBlanc | −0.22 | −1.00 | −1.00 | +1.00 | −0.02 | +1.00 | −0.32 |
| 137 | Xerath | −0.31 | +1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.23 |
| 138 | Leona | −0.33 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.13 |
| 139 | Riven | −0.34 | −1.00 | −1.00 | +1.00 | −0.10 | – | +0.27 |
| 140 | Nidalee | −0.34 | −1.00 | +0.92 | −1.00 | −0.04 | −1.00 | −0.36 |
| 141 | Pantheon | −0.35 | −1.00 | −1.00 | +1.00 | −0.07 | – | −0.03 |
| 142 | Miss Fortune | −0.39 | −1.00 | −1.00 | +1.00 | +0.06 | −1.00 | −0.01 |
| 143 | Zyra | −0.40 | −1.00 | −1.00 | +1.00 | +0.08 | −1.00 | −0.15 |
| 144 | Janna | −0.41 | −1.00 | −1.00 | +1.00 | +0.04 | −1.00 | −0.27 |
| 145 | Viktor | −0.41 | −1.00 | −1.00 | +1.00 | +0.02 | −1.00 | −0.26 |
| 146 | Sona | −0.50 | −1.00 | −1.00 | +0.50 | +0.05 | −1.00 | −0.20 |
| 147 | Nami | −0.68 | −0.88 | −0.76 | −0.88 | +0.03 | −0.88 | −0.34 |
| 148 | Soraka | −0.69 | −1.00 | −1.00 | −1.00 | −0.03 | +0.31 | −0.24 |
| 149 | Briar | −0.70 | −1.00 | −1.00 | −0.38 | −0.26 | – | −0.25 |
| 150 | Veigar | −0.70 | −1.00 | −1.00 | −1.00 | +0.12 | −0.05 | −0.23 |
| 151 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.47 | −1.00 | −0.13 |
| 152 | Sylas | −0.74 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.42 |
| 153 | Ziggs | −0.76 | −1.00 | −1.00 | −1.00 | +0.36 | −1.00 | −0.19 |
| 154 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.03 |
| 155 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.39 |
| 156 | Qiyana | −0.78 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.23 |
| 157 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.03 |
| 158 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.24 |
| 159 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.10 |
| 160 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.16 |
| 161 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.12 |
| 162 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.10 |
| 163 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.12 |
| 164 | Fiddlesticks | −0.81 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.14 |
| 165 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.40 |
| 166 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.44 |
| 167 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.19 |
| 168 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.35 |
| 169 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.40 |
| 170 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 171 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.59 |
| 172 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.28 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Hecarim's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Hecarim's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Hecarim` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.65)

- **1.00** spell shield: Spell Shield's spell shield blocks Hecarim's Onslaught of Shadows. Spell shield for 1.5 s, long enough to use ahead of Onslaught of Shadows. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hecarim R Onslaught of Shadows)
- **0.75** spell shield: Spell Shield's spell shield blocks Hecarim's Devastating Charge. Spell shield for 1.5 s, long enough to use ahead of Devastating Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hecarim E Devastating Charge)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Hecarim's (500 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Sivir basic attacks → Hecarim basic attacks)

#### 2. Morgana (net +1.51)

- **1.00** cc immunity: Black Shield makes Morgana immune to Hecarim's Onslaught of Shadows (fear, slow). Immune for 5 s, long enough to use ahead of Onslaught of Shadows. (Morgana E Black Shield → Hecarim R Onslaught of Shadows)
- **0.80** cc immunity: Black Shield makes Morgana immune to Hecarim's Devastating Charge (airborne, stun). Immune for 5 s, long enough to use ahead of Devastating Charge. (Morgana E Black Shield → Hecarim E Devastating Charge)
- **0.11** range: Morgana's basic attacks reach 275 units farther than Hecarim's (450 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Morgana basic attacks → Hecarim basic attacks)

#### 3. Nocturne (net +1.48)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Hecarim's Onslaught of Shadows. Spell shield for 1.5 s, long enough to use ahead of Onslaught of Shadows. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hecarim R Onslaught of Shadows)
- **0.80** spell shield: Shroud of Darkness's spell shield blocks Hecarim's Devastating Charge. Spell shield for 1.5 s, long enough to use ahead of Devastating Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hecarim E Devastating Charge)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Hecarim's Devastating Charge (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Hecarim E Devastating Charge)

#### 4. Vladimir (net +1.45)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 2 s, long enough to use ahead of Onslaught of Shadows. (Vladimir W Sanguine Pool → Hecarim R Onslaught of Shadows)
- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hecarim's Devastating Charge. Untargetable for 2 s, long enough to use ahead of Devastating Charge. (Vladimir W Sanguine Pool → Hecarim E Devastating Charge)
- **0.10** range: Vladimir's basic attacks reach 275 units farther than Hecarim's (450 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Vladimir basic attacks → Hecarim basic attacks)
- Watch out: Onslaught of Shadows's fear interrupts Vladimir's Tides of Blood (charge-up).

#### 5. Xayah (net +1.42)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 1.5 s, long enough to use ahead of Onslaught of Shadows. (Xayah R Featherstorm → Hecarim R Onslaught of Shadows)
- **0.40** untargetable: Featherstorm makes Xayah untargetable, dodging Hecarim's Devastating Charge. Untargetable for 1.5 s, long enough to use ahead of Devastating Charge. (Xayah R Featherstorm → Hecarim E Devastating Charge)
- **0.22** range: Xayah's basic attacks reach 350 units farther than Hecarim's (525 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Xayah basic attacks → Hecarim basic attacks)

#### 6. Udyr (net +1.40)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Hecarim's Onslaught of Shadows (fear, slow). Immune for 1.5 s, long enough to use ahead of Onslaught of Shadows. (Udyr E Blazing Stampede → Hecarim R Onslaught of Shadows)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Hecarim's Devastating Charge (airborne, stun). Immune for 1.5 s, long enough to use ahead of Devastating Charge. (Udyr E Blazing Stampede → Hecarim E Devastating Charge)

#### 7. Master Yi (net +1.38)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for ?; Onslaught of Shadows takes 1.37 s to land, enough to react. (Master Yi Q Alpha Strike → Hecarim R Onslaught of Shadows)
- **0.45** untargetable: Alpha Strike makes Master Yi untargetable, dodging Hecarim's Devastating Charge. Untargetable for ?; Devastating Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Hecarim E Devastating Charge)
- **0.20** cleanse: Highlander cleanses Hecarim's Onslaught of Shadows (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove fear. (Master Yi R Highlander → Hecarim R Onslaught of Shadows)
- Watch out: Onslaught of Shadows's fear interrupts Master Yi's Meditate (normal channel).

#### 8. Bard (net +1.34)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 2.5 s, long enough to use ahead of Onslaught of Shadows. (Bard R Tempered Fate → Hecarim R Onslaught of Shadows)
- **0.42** untargetable: Tempered Fate makes Bard untargetable, dodging Hecarim's Devastating Charge. Untargetable for 2.5 s, long enough to use ahead of Devastating Charge. (Bard R Tempered Fate → Hecarim E Devastating Charge)
- **0.21** range: Bard's basic attacks reach 325 units farther than Hecarim's (500 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Bard basic attacks → Hecarim basic attacks)
- Watch out: Onslaught of Shadows is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

#### 9. Lissandra (net +1.33)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 2.5 s, long enough to use ahead of Onslaught of Shadows. (Lissandra R Frozen Tomb → Hecarim R Onslaught of Shadows)
- **0.42** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hecarim's Devastating Charge. Untargetable for 2.5 s, long enough to use ahead of Devastating Charge. (Lissandra R Frozen Tomb → Hecarim E Devastating Charge)
- **0.14** range: Lissandra's basic attacks reach 375 units farther than Hecarim's (550 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Lissandra basic attacks → Hecarim basic attacks)
- Watch out: Onslaught of Shadows is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 10. Aurora (net +1.32)

- **1.00** untargetable: Between Worlds makes Aurora untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 0.4 s; Onslaught of Shadows takes 1.37 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Hecarim R Onslaught of Shadows)
- **0.24** untargetable: Between Worlds makes Aurora untargetable, dodging Hecarim's Devastating Charge. Untargetable for 0.4 s; Devastating Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Hecarim E Devastating Charge)
- **0.18** range: Aurora's basic attacks reach 375 units farther than Hecarim's (550 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Aurora basic attacks → Hecarim basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.65 | 1.65 | 0.00 |  |
| 2 | Morgana | +1.51 | 1.51 | 0.00 |  |
| 3 | Nocturne | +1.48 | 1.48 | 0.00 |  |
| 4 | Vladimir | +1.45 | 1.50 | 0.05 |  |
| 5 | Xayah | +1.42 | 1.42 | 0.00 |  |
| 6 | Udyr | +1.40 | 1.40 | 0.00 |  |
| 7 | Master Yi | +1.38 | 1.48 | 0.10 |  |
| 8 | Bard | +1.34 | 1.42 | 0.08 |  |
| 9 | Lissandra | +1.33 | 1.38 | 0.05 |  |
| 10 | Aurora | +1.32 | 1.32 | 0.00 |  |
| 11 | Fiora | +1.31 | 1.31 | 0.00 |  |
| 12 | Gwen | +1.23 | 1.23 | 0.00 |  |
| 13 | Olaf | +1.21 | 1.21 | 0.00 |  |
| 14 | Maokai | +1.17 | 1.24 | 0.07 |  |
| 15 | Mel | +1.17 | 1.17 | 0.00 | projectile block (Rebuttal) |
| 16 | Fizz | +1.16 | 1.24 | 0.08 |  |
| 17 | Evelynn | +1.13 | 1.13 | 0.00 |  |
| 18 | Shaco | +1.13 | 1.13 | 0.00 |  |
| 19 | Gangplank | +1.12 | 1.12 | 0.00 |  |
| 20 | Rengar | +1.12 | 1.12 | 0.00 |  |
| 21 | Zed | +1.12 | 1.12 | 0.00 |  |
| 22 | Sion | +1.09 | 1.23 | 0.14 |  |
| 23 | Samira | +1.09 | 1.18 | 0.09 | projectile block (Blade Whirl) |
| 24 | Milio | +1.09 | 1.16 | 0.07 |  |
| 25 | Rek'Sai | +1.06 | 1.23 | 0.17 |  |
| 26 | Yuumi | +1.04 | 1.42 | 0.38 |  |
| 27 | Camille | +0.99 | 1.14 | 0.15 |  |
| 28 | Zaahen | +0.94 | 1.13 | 0.19 |  |
| 29 | Braum | +0.92 | 1.00 | 0.08 | projectile block (Unbreakable) |
| 30 | Kled | +0.87 | 1.12 | 0.25 |  |
| 31 | Kalista | +0.87 | 1.07 | 0.20 |  |
| 32 | Alistar | +0.85 | 0.97 | 0.12 |  |
| 33 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 34 | Singed | +0.79 | 0.86 | 0.07 | grounding (Mega Adhesive) |
| 35 | Warwick | +0.73 | 1.24 | 0.51 |  |
| 36 | Cassiopeia | +0.72 | 0.72 | 0.00 | grounding (Miasma) |
| 37 | Yasuo | +0.70 | 1.00 | 0.30 | projectile block (Wind Wall) |
| 38 | Kayn | +0.69 | 1.13 | 0.44 |  |
| 39 | Mordekaiser | +0.69 | 0.84 | 0.15 |  |
| 40 | Teemo | +0.62 | 0.62 | 0.00 | blind (Blinding Dart) |
| 41 | Jax | +0.57 | 0.57 | 0.00 | attack dodge (Counter Strike) |
| 42 | Garen | +0.56 | 0.56 | 0.00 |  |
| 43 | Malzahar | +0.54 | 0.92 | 0.38 |  |
| 44 | Lulu | +0.44 | 0.52 | 0.08 |  |
| 45 | Vex | +0.42 | 0.45 | 0.03 |  |
| 46 | Xin Zhao | +0.41 | 0.60 | 0.19 |  |
| 47 | Nilah | +0.40 | 0.48 | 0.08 |  |
| 48 | Viktor | +0.35 | 0.39 | 0.04 |  |
| 49 | Aphelios | +0.34 | 0.34 | 0.00 |  |
| 50 | Jinx | +0.33 | 0.37 | 0.04 |  |
| 51 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 52 | Varus | +0.31 | 0.36 | 0.05 |  |
| 53 | Veigar | +0.31 | 0.35 | 0.04 |  |
| 54 | Ahri | +0.30 | 0.34 | 0.04 |  |
| 55 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 56 | Hwei | +0.27 | 0.34 | 0.07 |  |
| 57 | Kindred | +0.27 | 0.27 | 0.00 |  |
| 58 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 59 | Sona | +0.26 | 0.26 | 0.00 |  |
| 60 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 61 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 62 | Heimerdinger | +0.22 | 0.22 | 0.00 |  |
| 63 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 64 | Senna | +0.22 | 0.22 | 0.00 |  |
| 65 | Pantheon | +0.21 | 0.69 | 0.48 |  |
| 66 | Vayne | +0.20 | 0.27 | 0.07 |  |
| 67 | Corki | +0.20 | 0.20 | 0.00 |  |
| 68 | Elise | +0.20 | 0.20 | 0.00 |  |
| 69 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 70 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 71 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 72 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 73 | Lux | +0.18 | 0.18 | 0.00 |  |
| 74 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 75 | Renata Glasc | +0.17 | 0.24 | 0.07 |  |
| 76 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 77 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 78 | Tristana | +0.16 | 0.24 | 0.08 |  |
| 79 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 80 | Draven | +0.15 | 0.22 | 0.07 |  |
| 81 | Annie | +0.15 | 0.15 | 0.00 |  |
| 82 | Brand | +0.14 | 0.14 | 0.00 |  |
| 83 | Graves | +0.14 | 0.14 | 0.00 |  |
| 84 | Zoe | +0.13 | 0.20 | 0.07 |  |
| 85 | Karma | +0.13 | 0.13 | 0.00 |  |
| 86 | LeBlanc | +0.13 | 0.13 | 0.00 |  |
| 87 | Shen | +0.12 | 0.57 | 0.45 | attack block (Spirit's Refuge) |
| 88 | Skarner | +0.12 | 0.12 | 0.00 |  |
| 89 | Rammus | +0.11 | 0.32 | 0.21 |  |
| 90 | Gnar | +0.11 | 0.19 | 0.08 |  |
| 91 | Jayce | +0.11 | 0.18 | 0.07 |  |
| 92 | Malphite | +0.08 | 0.29 | 0.21 |  |
| 93 | Orianna | +0.08 | 0.16 | 0.08 |  |
| 94 | Illaoi | +0.08 | 0.08 | 0.00 |  |
| 95 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 96 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 97 | Poppy | +0.07 | 0.38 | 0.31 |  |
| 98 | Syndra | +0.07 | 0.14 | 0.07 |  |
| 99 | Neeko | +0.06 | 0.14 | 0.08 |  |
| 100 | Swain | +0.05 | 0.12 | 0.07 |  |
| 101 | Amumu | +0.05 | 0.10 | 0.05 |  |
| 102 | Ivern | +0.04 | 0.11 | 0.07 |  |
| 103 | Quinn | +0.03 | 0.22 | 0.19 |  |
| 104 | Aurelion Sol | +0.02 | 0.14 | 0.12 |  |
| 105 | Anivia | +0.01 | 0.16 | 0.15 |  |
| 106 | Sett | +0.01 | 0.08 | 0.07 |  |
| 107 | Katarina | 0.00 | 0.18 | 0.18 |  |
| 108 | Akali | 0.00 | 0.00 | 0.00 |  |
| 109 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 110 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 111 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 112 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 113 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 114 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 115 | Leona | 0.00 | 0.00 | 0.00 |  |
| 116 | Locke | 0.00 | 0.00 | 0.00 |  |
| 117 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 118 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 119 | Talon | 0.00 | 0.00 | 0.00 |  |
| 120 | Taric | 0.00 | 0.00 | 0.00 |  |
| 121 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 122 | Ziggs | -0.01 | 0.17 | 0.18 |  |
| 123 | Azir | -0.01 | 0.16 | 0.17 |  |
| 124 | K'Sante | -0.01 | 0.16 | 0.17 |  |
| 125 | Zyra | -0.01 | 0.16 | 0.17 |  |
| 126 | Urgot | -0.01 | 0.08 | 0.09 |  |
| 127 | Caitlyn | -0.02 | 0.24 | 0.26 |  |
| 128 | Thresh | -0.02 | 0.11 | 0.13 |  |
| 129 | Lillia | -0.03 | 0.05 | 0.08 |  |
| 130 | Akshan | -0.04 | 0.19 | 0.23 |  |
| 131 | Nunu & Willump | -0.05 | 0.31 | 0.36 |  |
| 132 | Lucian | -0.05 | 0.21 | 0.26 |  |
| 133 | Nami | -0.05 | 0.14 | 0.19 |  |
| 134 | Briar | -0.05 | 0.00 | 0.05 |  |
| 135 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 136 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 137 | Darius | -0.07 | 0.00 | 0.07 |  |
| 138 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 139 | Miss Fortune | -0.08 | 0.20 | 0.28 |  |
| 140 | Yone | -0.08 | 0.18 | 0.26 |  |
| 141 | Ornn | -0.08 | 0.08 | 0.16 |  |
| 142 | Viego | -0.08 | 0.08 | 0.16 |  |
| 143 | Diana | -0.08 | 0.00 | 0.08 |  |
| 144 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 145 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 146 | Jhin | -0.09 | 0.17 | 0.26 |  |
| 147 | Twisted Fate | -0.10 | 0.25 | 0.35 |  |
| 148 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 149 | Zac | -0.11 | 0.20 | 0.31 |  |
| 150 | Vel'Koz | -0.12 | 0.16 | 0.28 |  |
| 151 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 152 | Pyke | -0.12 | 0.00 | 0.12 |  |
| 153 | Xerath | -0.15 | 0.16 | 0.31 |  |
| 154 | Rakan | -0.15 | 0.06 | 0.21 |  |
| 155 | Yorick | -0.15 | 0.00 | 0.15 |  |
| 156 | Karthus | -0.17 | 0.11 | 0.28 |  |
| 157 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 158 | Aatrox | -0.18 | 0.00 | 0.18 |  |
| 159 | Blitzcrank | -0.19 | 0.00 | 0.19 |  |
| 160 | Ryze | -0.20 | 0.15 | 0.35 |  |
| 161 | Riven | -0.21 | 0.00 | 0.21 |  |
| 162 | Jarvan IV | -0.22 | 0.08 | 0.30 |  |
| 163 | Fiddlesticks | -0.25 | 0.11 | 0.36 |  |
| 164 | Gragas | -0.25 | 0.00 | 0.25 |  |
| 165 | Rell | -0.25 | 0.00 | 0.25 |  |
| 166 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 167 | Vi | -0.27 | 0.08 | 0.35 |  |
| 168 | Janna | -0.30 | 0.22 | 0.52 |  |
| 169 | Tahm Kench | -0.34 | 0.00 | 0.34 |  |
| 170 | Naafiri | -0.40 | 0.00 | 0.40 |  |
| 171 | Taliyah | -0.47 | 0.16 | 0.63 |  |
| 172 | Galio | -0.67 | 0.00 | 0.67 |  |
