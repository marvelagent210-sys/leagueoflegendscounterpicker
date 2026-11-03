# Counters to Malphite (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Malphite: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Malphite wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Malphite --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 2 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 3 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 4 | Ezreal | +0.79 | +1.00 | +1.00 | +0.99 | +0.03 | +0.89 | +0.00 |
| 5 | Maokai | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 6 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 7 | Master Yi | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 8 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 9 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 10 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 11 | K'Sante | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 12 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 13 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 14 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 15 | Fiora | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 16 | Rumble | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 17 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 18 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 19 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 20 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 21 | Warwick | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 22 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 23 | Gangplank | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 24 | Mordekaiser | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 25 | Dr. Mundo | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 26 | Tahm Kench | +0.73 | +1.00 | +1.00 | +0.93 | −0.16 | – | +0.00 |
| 27 | Zac | +0.72 | +1.00 | +1.00 | +1.00 | −0.33 | – | +0.00 |
| 28 | Lulu | +0.71 | +1.00 | +1.00 | +1.00 | +0.08 | −0.00 | +0.00 |
| 29 | Elise | +0.67 | +1.00 | +1.00 | +1.00 | −0.09 | −0.20 | +0.00 |
| 30 | Illaoi | +0.66 | +1.00 | +0.94 | +1.00 | −0.26 | +0.12 | +0.00 |
| 31 | Hwei | +0.61 | +0.85 | +0.92 | +0.81 | +0.03 | −0.01 | +0.00 |
| 32 | Shyvana | +0.59 | +1.00 | +1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 33 | Aurora | +0.56 | +1.00 | +0.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 34 | Poppy | +0.55 | +0.55 | +1.00 | +0.55 | −0.01 | – | +0.00 |
| 35 | Ashe | +0.41 | +1.00 | +1.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 36 | Kayle | +0.41 | +0.93 | +1.00 | −1.00 | +0.20 | +0.97 | +0.00 |
| 37 | Gnar | +0.35 | +0.86 | +0.92 | −1.00 | +0.05 | +1.00 | +0.00 |
| 38 | Karma | +0.35 | +0.61 | +0.47 | +0.30 | −0.27 | +0.61 | +0.00 |
| 39 | Taric | +0.29 | +0.38 | +0.39 | +0.36 | −0.01 | – | +0.00 |
| 40 | Diana | +0.27 | +0.09 | +0.08 | +1.00 | +0.00 | – | +0.00 |
| 41 | Jayce | +0.23 | +1.00 | −1.00 | +1.00 | +0.04 | – | +0.00 |
| 42 | Corki | +0.22 | +1.00 | +1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 43 | Heimerdinger | +0.21 | −1.00 | +0.85 | +0.66 | +0.09 | +0.98 | +0.00 |
| 44 | Morgana | +0.20 | +0.22 | +0.22 | +0.37 | −0.08 | +0.32 | +0.00 |
| 45 | Rakan | +0.17 | +0.23 | +0.21 | +0.19 | +0.00 | +0.21 | +0.00 |
| 46 | Vel'Koz | +0.17 | −0.15 | −0.15 | +1.00 | −0.12 | +0.64 | +0.00 |
| 47 | Bard | +0.09 | +0.09 | +0.17 | +0.16 | −0.01 | −0.04 | +0.00 |
| 48 | Annie | +0.09 | +0.30 | +0.16 | −0.33 | +0.04 | +0.32 | +0.00 |
| 49 | Jax | +0.09 | +0.00 | +0.00 | +0.00 | −0.10 | +1.00 | +0.00 |
| 50 | Syndra | +0.05 | +0.06 | +0.17 | +0.12 | −0.26 | +0.06 | +0.00 |
| 51 | Kog'Maw | +0.03 | +0.00 | +0.00 | +0.00 | +0.20 | +0.00 | +0.00 |
| 52 | Milio | +0.03 | +0.01 | +0.06 | +0.05 | −0.06 | +0.09 | +0.00 |
| 53 | Shen | +0.02 | +0.08 | −0.07 | +0.09 | −0.03 | – | +0.00 |
| 54 | Braum | +0.02 | +0.04 | +0.03 | +0.01 | −0.03 | – | +0.00 |
| 55 | Brand | +0.01 | +0.14 | +0.12 | −0.25 | +0.00 | −0.01 | +0.00 |
| 56 | Renekton | −0.01 | +0.03 | −0.03 | +0.01 | −0.09 | – | +0.00 |
| 57 | Neeko | −0.01 | −0.06 | +0.01 | +0.11 | −0.17 | +0.01 | +0.00 |
| 58 | Zyra | −0.02 | −0.03 | −0.04 | +0.03 | −0.05 | −0.01 | +0.00 |
| 59 | Lux | −0.03 | −0.09 | −0.09 | +0.07 | −0.07 | +0.10 | +0.00 |
| 60 | Rell | −0.03 | −0.06 | −0.07 | −0.06 | +0.07 | +0.01 | +0.00 |
| 61 | Soraka | −0.04 | −0.04 | +0.01 | −0.07 | −0.11 | −0.02 | +0.00 |
| 62 | Aphelios | −0.04 | +0.00 | +1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 63 | Sion | −0.06 | −0.10 | −0.07 | +0.03 | −0.10 | – | +0.00 |
| 64 | Anivia | −0.06 | −0.14 | −0.11 | +0.06 | −0.11 | +0.03 | +0.00 |
| 65 | Rammus | −0.07 | −0.06 | −0.07 | −0.07 | −0.12 | – | +0.00 |
| 66 | Singed | −0.07 | −0.06 | −0.07 | −0.06 | −0.14 | – | +0.00 |
| 67 | Ornn | −0.08 | −0.09 | −0.12 | −0.10 | +0.02 | – | +0.00 |
| 68 | Lissandra | −0.10 | −0.09 | +0.08 | −0.49 | −0.03 | +0.01 | +0.00 |
| 69 | Zoe | −0.13 | −0.19 | −0.17 | −0.11 | +0.02 | −0.19 | +0.00 |
| 70 | Zilean | −0.17 | −0.30 | −0.16 | −0.26 | +0.03 | −0.02 | +0.00 |
| 71 | Nami | −0.17 | −0.03 | −0.03 | −0.69 | −0.02 | −0.13 | +0.00 |
| 72 | Leona | −0.18 | −0.21 | −0.21 | −0.23 | −0.06 | – | +0.00 |
| 73 | Sejuani | −0.21 | −0.11 | −0.11 | −0.56 | −0.11 | – | +0.00 |
| 74 | Karthus | −0.21 | −0.29 | −0.27 | −0.25 | +0.05 | −0.27 | +0.00 |
| 75 | Mel | −0.21 | −1.00 | −1.00 | +1.00 | +0.01 | +0.86 | +0.00 |
| 76 | Fizz | −0.23 | −1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 77 | Bel'Veth | −0.24 | +1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 78 | Kled | −0.25 | +0.00 | +0.00 | −1.00 | −0.18 | – | +0.00 |
| 79 | Rengar | −0.26 | −0.06 | −0.04 | −1.00 | −0.03 | – | +0.00 |
| 80 | Jinx | −0.26 | +0.04 | +0.04 | −1.00 | +0.00 | −0.87 | +0.00 |
| 81 | Azir | −0.29 | −1.00 | +1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 82 | Quinn | −0.31 | −1.00 | +1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 83 | Udyr | −0.32 | −1.00 | +1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 84 | Xayah | −0.33 | −0.03 | −0.52 | −1.00 | +0.06 | −0.02 | +0.00 |
| 85 | Sivir | −0.33 | −0.04 | −0.05 | −1.00 | −0.03 | −1.00 | +0.00 |
| 86 | Gragas | −0.34 | −1.00 | −1.00 | +1.00 | −0.06 | – | +0.00 |
| 87 | Senna | −0.38 | −0.42 | −0.42 | −0.25 | −0.14 | −1.00 | +0.00 |
| 88 | Orianna | −0.39 | −1.00 | −1.00 | +1.00 | +0.10 | −1.00 | +0.00 |
| 89 | Janna | −0.44 | −1.00 | −0.26 | −0.13 | +0.00 | −1.00 | +0.00 |
| 90 | Swain | −0.48 | −0.51 | −0.71 | −0.66 | +0.07 | −0.51 | +0.00 |
| 91 | Fiddlesticks | −0.60 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 92 | Veigar | −0.60 | −1.00 | −0.57 | −1.00 | −0.01 | −0.08 | +0.00 |
| 93 | Ryze | −0.61 | −1.00 | −1.00 | −1.00 | +0.04 | +0.88 | +0.00 |
| 94 | Irelia | −0.61 | −1.00 | −1.00 | −0.18 | −0.11 | – | +0.00 |
| 95 | Skarner | −0.68 | −1.00 | −1.00 | −0.50 | −0.09 | – | +0.00 |
| 96 | Kalista | −0.70 | −1.00 | −1.00 | −1.00 | −0.09 | +0.16 | +0.00 |
| 97 | Vex | −0.71 | −1.00 | −1.00 | −0.53 | −0.03 | −1.00 | +0.00 |
| 98 | Kennen | −0.71 | −1.00 | −1.00 | −1.00 | −0.10 | +0.04 | +0.00 |
| 99 | LeBlanc | −0.72 | −1.00 | −1.00 | −1.00 | −0.01 | −0.17 | +0.00 |
| 100 | Aurelion Sol | −0.75 | −1.00 | −1.00 | −1.00 | +0.35 | −1.00 | +0.00 |
| 101 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 102 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 103 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 104 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 105 | Yunara | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 106 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 107 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 108 | Rek'Sai | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 109 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 110 | Sett | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 111 | Yone | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 112 | Seraphine | −0.79 | −0.98 | −0.98 | −1.00 | −0.01 | −1.00 | +0.00 |
| 113 | Miss Fortune | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 114 | Varus | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 115 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 116 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 117 | Lee Sin | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 118 | Ambessa | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 119 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 120 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 121 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 122 | Shaco | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 123 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 124 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 125 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 126 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 127 | Camille | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 128 | Zeri | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 129 | Riven | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 130 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 131 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 132 | Tristana | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 133 | Briar | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 134 | Wukong | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 135 | Tryndamere | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 136 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 137 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 138 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 139 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 140 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 141 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 142 | Garen | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 143 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 144 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 145 | Caitlyn | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 146 | Nocturne | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 147 | Lucian | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 148 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 149 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 150 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 151 | Lillia | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 152 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 153 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 154 | Zed | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 155 | Xin Zhao | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 156 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 157 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 158 | Kayn | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 159 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 160 | Sylas | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 161 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 162 | Samira | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 163 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 164 | Jhin | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 165 | Taliyah | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 166 | Nilah | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 167 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.00 |
| 168 | Ahri | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 169 | Viego | −0.84 | −1.00 | −1.00 | −1.00 | −0.35 | – | +0.00 |
| 170 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 171 | Graves | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 172 | Draven | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Malphite's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Malphite's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Malphite` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Xayah (net +1.28)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Malphite's Unstoppable Force. Untargetable for 1.5 s, long enough to use ahead of Unstoppable Force. (Xayah R Featherstorm → Malphite R Unstoppable Force)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Malphite's (525 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Xayah basic attacks → Malphite basic attacks)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Malphite's Seismic Shard. Untargetable for 1.5 s, long enough to use ahead of Seismic Shard. (Xayah R Featherstorm → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Xayah's attack speed by 50% for 3 s.

#### 2. Aurora (net +1.27)

- **1.00** untargetable: Between Worlds makes Aurora untargetable, dodging Malphite's Unstoppable Force. Untargetable for 0.4 s; Unstoppable Force takes 0.67 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Malphite R Unstoppable Force)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Malphite's (550 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Aurora basic attacks → Malphite basic attacks)
- **0.20** cc immunity: Between Worlds is displacement immune, ignoring Malphite's Unstoppable Force (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Malphite R Unstoppable Force)
- Watch out: Ground Slam cuts Aurora's attack speed by 50% for 3 s.

#### 3. Vladimir (net +1.23)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malphite's Unstoppable Force. Untargetable for 2 s, long enough to use ahead of Unstoppable Force. (Vladimir W Sanguine Pool → Malphite R Unstoppable Force)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malphite's Seismic Shard. Untargetable for 2 s, long enough to use ahead of Seismic Shard. (Vladimir W Sanguine Pool → Malphite Q Seismic Shard)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malphite's Thunderclap. Untargetable for 2 s, long enough to use ahead of Thunderclap. (Vladimir W Sanguine Pool → Malphite W Thunderclap)
- Watch out: Ground Slam cuts Vladimir's attack speed by 50% for 3 s.

#### 4. Sivir (net +1.22)

- **1.00** spell shield: Spell Shield's spell shield blocks Malphite's Unstoppable Force. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Force. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Malphite R Unstoppable Force)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Malphite's (500 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Sivir basic attacks → Malphite basic attacks)
- **0.15** spell shield: Spell Shield's spell shield blocks part of Malphite's Seismic Shard. Spell shield for 1.5 s, long enough to use ahead of Seismic Shard. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Sivir's attack speed by 50% for 3 s.

#### 5. Bard (net +1.19)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Malphite's Unstoppable Force. Untargetable for 2.5 s, long enough to use ahead of Unstoppable Force. (Bard R Tempered Fate → Malphite R Unstoppable Force)
- **0.36** range: Bard's basic attacks reach 375 units farther than Malphite's (500 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Bard basic attacks → Malphite basic attacks)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Malphite's Seismic Shard. Untargetable for 2.5 s, long enough to use ahead of Seismic Shard. (Bard R Tempered Fate → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Bard's attack speed by 50% for 3 s.

#### 6. Lissandra (net +1.19)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Malphite's Unstoppable Force. Untargetable for 2.5 s, long enough to use ahead of Unstoppable Force. (Lissandra R Frozen Tomb → Malphite R Unstoppable Force)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Malphite's (550 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Lissandra basic attacks → Malphite basic attacks)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Malphite's Seismic Shard. Untargetable for 2.5 s, long enough to use ahead of Seismic Shard. (Lissandra R Frozen Tomb → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Lissandra's attack speed by 50% for 3 s.

#### 7. Morgana (net +1.09)

- **1.00** cc immunity: Black Shield makes Morgana immune to Malphite's Unstoppable Force (airborne). Immune for 5 s, long enough to use ahead of Unstoppable Force. (Morgana E Black Shield → Malphite R Unstoppable Force)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Malphite's (450 vs 125 attack range). Malphite closes the gap with Unstoppable Force. (Morgana basic attacks → Malphite basic attacks)
- **0.08** cc immunity: Black Shield makes Morgana immune to Malphite's Seismic Shard (slow). Immune for 5 s, long enough to use ahead of Seismic Shard. (Morgana E Black Shield → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Morgana's attack speed by 50% for 3 s.

#### 8. Nocturne (net +1.04)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Malphite's Unstoppable Force. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Force. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Malphite R Unstoppable Force)
- **0.20** cc immunity: Paranoia is displacement immune, ignoring Malphite's Unstoppable Force (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Malphite R Unstoppable Force)
- **0.18** spell shield: Shroud of Darkness's spell shield blocks part of Malphite's Seismic Shard. Spell shield for 1.5 s, long enough to use ahead of Seismic Shard. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Malphite Q Seismic Shard)
- Watch out: Ground Slam cuts Nocturne's attack speed by 50% for 3 s.

#### 9. Fizz (net +1.03)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Malphite's Unstoppable Force. Untargetable for 0.75 s; Unstoppable Force takes 0.67 s to land, enough to react. (Fizz E Playful → Malphite R Unstoppable Force)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Malphite's Seismic Shard. Untargetable for 0.75 s; Seismic Shard takes 0.77 s to land, enough to react. (Fizz E Playful → Malphite Q Seismic Shard)
- **0.27** untargetable: Playful makes Fizz untargetable, dodging Malphite's Thunderclap. Untargetable for 0.75 s; Thunderclap lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Malphite W Thunderclap)
- Watch out: Ground Slam cuts Fizz's attack speed by 50% for 3 s.

#### 10. Maokai (net +1.01)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Malphite's Unstoppable Force. Untargetable for 1.4 s; Unstoppable Force takes 0.67 s to land, enough to react. (Maokai W Twisted Advance → Malphite R Unstoppable Force)
- **0.40** untargetable: Twisted Advance makes Maokai untargetable, dodging Malphite's Seismic Shard. Untargetable for 1.4 s; Seismic Shard takes 0.77 s to land, enough to react. (Maokai W Twisted Advance → Malphite Q Seismic Shard)
- **0.24** untargetable: Twisted Advance makes Maokai untargetable, dodging Malphite's Thunderclap. Untargetable for 1.4 s; Thunderclap lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Malphite W Thunderclap)
- Watch out: Ground Slam cuts Maokai's attack speed by 50% for 3 s.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Xayah | +1.28 | 1.53 | 0.25 |  |
| 2 | Aurora | +1.27 | 1.46 | 0.19 |  |
| 3 | Vladimir | +1.23 | 1.42 | 0.19 |  |
| 4 | Sivir | +1.22 | 1.55 | 0.33 |  |
| 5 | Bard | +1.19 | 1.52 | 0.33 |  |
| 6 | Lissandra | +1.19 | 1.38 | 0.19 |  |
| 7 | Morgana | +1.09 | 1.25 | 0.16 |  |
| 8 | Nocturne | +1.04 | 1.29 | 0.25 |  |
| 9 | Fizz | +1.03 | 1.29 | 0.26 |  |
| 10 | Maokai | +1.01 | 1.26 | 0.25 |  |
| 11 | Fiora | +1.01 | 1.22 | 0.21 |  |
| 12 | Evelynn | +0.96 | 1.14 | 0.18 |  |
| 13 | Yuumi | +0.95 | 1.61 | 0.66 |  |
| 14 | Gwen | +0.95 | 1.19 | 0.24 |  |
| 15 | Zed | +0.94 | 1.13 | 0.19 |  |
| 16 | Master Yi | +0.93 | 1.28 | 0.35 |  |
| 17 | Shaco | +0.93 | 1.14 | 0.21 |  |
| 18 | Rek'Sai | +0.82 | 1.18 | 0.36 |  |
| 19 | Udyr | +0.81 | 1.08 | 0.27 |  |
| 20 | Olaf | +0.79 | 1.04 | 0.25 |  |
| 21 | Camille | +0.77 | 1.17 | 0.40 |  |
| 22 | Kayle | +0.75 | 0.99 | 0.24 |  |
| 23 | Sion | +0.72 | 1.04 | 0.32 |  |
| 24 | Kalista | +0.67 | 1.07 | 0.40 |  |
| 25 | Gangplank | +0.66 | 0.85 | 0.19 |  |
| 26 | Zaahen | +0.64 | 1.03 | 0.39 |  |
| 27 | Teemo | +0.63 | 0.87 | 0.24 |  |
| 28 | Rengar | +0.61 | 0.86 | 0.25 |  |
| 29 | Kled | +0.60 | 1.11 | 0.51 |  |
| 30 | Cassiopeia | +0.56 | 0.70 | 0.14 | grounding (Miasma) |
| 31 | Kayn | +0.54 | 1.14 | 0.60 |  |
| 32 | Alistar | +0.51 | 0.83 | 0.32 |  |
| 33 | Warwick | +0.48 | 1.23 | 0.75 |  |
| 34 | Jax | +0.36 | 0.57 | 0.21 | attack dodge (Counter Strike) |
| 35 | Mel | +0.35 | 0.53 | 0.18 |  |
| 36 | Lulu | +0.31 | 0.63 | 0.32 |  |
| 37 | Samira | +0.28 | 0.58 | 0.30 |  |
| 38 | Vex | +0.26 | 0.47 | 0.21 |  |
| 39 | Malzahar | +0.24 | 0.76 | 0.52 |  |
| 40 | Singed | +0.24 | 0.49 | 0.25 | grounding (Mega Adhesive) |
| 41 | Aphelios | +0.18 | 0.43 | 0.25 |  |
| 42 | Xin Zhao | +0.16 | 0.63 | 0.47 |  |
| 43 | Braum | +0.16 | 0.45 | 0.29 | projectile block (Unbreakable) |
| 44 | Zeri | +0.15 | 0.44 | 0.29 |  |
| 45 | Twitch | +0.15 | 0.43 | 0.28 |  |
| 46 | Nilah | +0.14 | 0.55 | 0.41 |  |
| 47 | Kindred | +0.14 | 0.47 | 0.33 |  |
| 48 | Sona | +0.14 | 0.41 | 0.27 |  |
| 49 | Milio | +0.13 | 0.45 | 0.32 |  |
| 50 | Kai'Sa | +0.13 | 0.38 | 0.25 |  |
| 51 | Ashe | +0.12 | 0.36 | 0.24 |  |
| 52 | Yunara | +0.12 | 0.36 | 0.24 |  |
| 53 | Heimerdinger | +0.12 | 0.25 | 0.13 |  |
| 54 | Corki | +0.11 | 0.32 | 0.21 |  |
| 55 | Elise | +0.11 | 0.32 | 0.21 |  |
| 56 | Ezreal | +0.11 | 0.32 | 0.21 |  |
| 57 | Senna | +0.11 | 0.32 | 0.21 |  |
| 58 | Smolder | +0.11 | 0.32 | 0.21 |  |
| 59 | Zilean | +0.11 | 0.32 | 0.21 |  |
| 60 | Nidalee | +0.10 | 0.30 | 0.20 |  |
| 61 | Kennen | +0.10 | 0.29 | 0.19 |  |
| 62 | Lux | +0.10 | 0.29 | 0.19 |  |
| 63 | Seraphine | +0.10 | 0.29 | 0.19 |  |
| 64 | Soraka | +0.09 | 0.27 | 0.18 |  |
| 65 | Vayne | +0.08 | 0.43 | 0.35 |  |
| 66 | Nasus | +0.08 | 0.29 | 0.21 |  |
| 67 | Kog'Maw | +0.08 | 0.27 | 0.19 |  |
| 68 | Annie | +0.08 | 0.22 | 0.14 |  |
| 69 | Brand | +0.08 | 0.22 | 0.14 |  |
| 70 | Karma | +0.08 | 0.22 | 0.14 |  |
| 71 | LeBlanc | +0.08 | 0.22 | 0.14 |  |
| 72 | Viktor | +0.07 | 0.32 | 0.25 |  |
| 73 | Renata Glasc | +0.06 | 0.38 | 0.32 |  |
| 74 | Jinx | +0.06 | 0.29 | 0.23 |  |
| 75 | Draven | +0.05 | 0.36 | 0.31 |  |
| 76 | Tristana | +0.04 | 0.36 | 0.32 |  |
| 77 | Zoe | +0.04 | 0.32 | 0.28 |  |
| 78 | Varus | +0.04 | 0.27 | 0.23 |  |
| 79 | Veigar | +0.04 | 0.24 | 0.20 |  |
| 80 | Ahri | +0.04 | 0.22 | 0.18 |  |
| 81 | Gnar | +0.03 | 0.33 | 0.30 |  |
| 82 | Graves | +0.03 | 0.24 | 0.21 |  |
| 83 | Jayce | +0.02 | 0.30 | 0.28 |  |
| 84 | Orianna | +0.01 | 0.27 | 0.26 |  |
| 85 | Hwei | +0.01 | 0.23 | 0.22 |  |
| 86 | Syndra | +0.01 | 0.22 | 0.21 |  |
| 87 | Illaoi | +0.01 | 0.20 | 0.19 |  |
| 88 | Shyvana | +0.01 | 0.20 | 0.19 |  |
| 89 | Pantheon | 0.00 | 0.69 | 0.69 |  |
| 90 | Neeko | 0.00 | 0.22 | 0.22 |  |
| 91 | Swain | 0.00 | 0.21 | 0.21 |  |
| 92 | Volibear | -0.01 | 0.20 | 0.21 |  |
| 93 | Ivern | -0.02 | 0.19 | 0.21 |  |
| 94 | Aurelion Sol | -0.04 | 0.22 | 0.26 |  |
| 95 | K'Sante | -0.05 | 0.40 | 0.45 |  |
| 96 | Quinn | -0.06 | 0.38 | 0.44 |  |
| 97 | Anivia | -0.06 | 0.24 | 0.30 |  |
| 98 | Azir | -0.07 | 0.27 | 0.34 |  |
| 99 | Ziggs | -0.08 | 0.27 | 0.35 |  |
| 100 | Zyra | -0.08 | 0.24 | 0.32 |  |
| 101 | Hecarim | -0.08 | 0.21 | 0.29 |  |
| 102 | Sett | -0.08 | 0.20 | 0.28 |  |
| 103 | Nami | -0.10 | 0.22 | 0.32 |  |
| 104 | Thresh | -0.10 | 0.19 | 0.29 |  |
| 105 | Rammus | -0.11 | 0.29 | 0.40 |  |
| 106 | Lillia | -0.11 | 0.11 | 0.22 |  |
| 107 | Urgot | -0.12 | 0.15 | 0.27 |  |
| 108 | Akshan | -0.13 | 0.34 | 0.47 |  |
| 109 | Irelia | -0.13 | 0.05 | 0.18 |  |
| 110 | Caitlyn | -0.14 | 0.36 | 0.50 |  |
| 111 | Ornn | -0.14 | 0.20 | 0.34 |  |
| 112 | Garen | -0.14 | 0.14 | 0.28 |  |
| 113 | Shen | -0.15 | 0.55 | 0.70 | attack block (Spirit's Refuge) |
| 114 | Lucian | -0.15 | 0.36 | 0.51 |  |
| 115 | Skarner | -0.15 | 0.06 | 0.21 |  |
| 116 | Yasuo | -0.16 | 0.31 | 0.47 |  |
| 117 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 118 | Kha'Zix | -0.16 | 0.00 | 0.16 |  |
| 119 | Miss Fortune | -0.17 | 0.32 | 0.49 |  |
| 120 | Jhin | -0.17 | 0.27 | 0.44 |  |
| 121 | Vel'Koz | -0.19 | 0.27 | 0.46 |  |
| 122 | Akali | -0.19 | 0.00 | 0.19 |  |
| 123 | Kassadin | -0.19 | 0.00 | 0.19 |  |
| 124 | Leona | -0.19 | 0.00 | 0.19 |  |
| 125 | Rumble | -0.19 | 0.00 | 0.19 |  |
| 126 | Twisted Fate | -0.20 | 0.43 | 0.63 |  |
| 127 | Viego | -0.20 | 0.29 | 0.49 |  |
| 128 | Dr. Mundo | -0.21 | 0.00 | 0.21 |  |
| 129 | Ekko | -0.21 | 0.00 | 0.21 |  |
| 130 | Renekton | -0.21 | 0.00 | 0.21 |  |
| 131 | Xerath | -0.22 | 0.27 | 0.49 |  |
| 132 | Yone | -0.23 | 0.20 | 0.43 |  |
| 133 | Amumu | -0.23 | 0.00 | 0.23 |  |
| 134 | Talon | -0.24 | 0.00 | 0.24 |  |
| 135 | Karthus | -0.25 | 0.19 | 0.44 |  |
| 136 | Locke | -0.25 | 0.00 | 0.25 |  |
| 137 | Taric | -0.25 | 0.00 | 0.25 |  |
| 138 | Rakan | -0.26 | 0.13 | 0.39 |  |
| 139 | Cho'Gath | -0.26 | 0.00 | 0.26 |  |
| 140 | Diana | -0.26 | 0.00 | 0.26 |  |
| 141 | Lee Sin | -0.26 | 0.00 | 0.26 |  |
| 142 | Ryze | -0.27 | 0.24 | 0.51 |  |
| 143 | Mordekaiser | -0.28 | 0.07 | 0.35 |  |
| 144 | Qiyana | -0.28 | 0.00 | 0.28 |  |
| 145 | Tryndamere | -0.28 | 0.00 | 0.28 |  |
| 146 | Sylas | -0.29 | 0.00 | 0.29 |  |
| 147 | Fiddlesticks | -0.30 | 0.20 | 0.50 |  |
| 148 | Briar | -0.31 | 0.00 | 0.31 |  |
| 149 | Darius | -0.31 | 0.00 | 0.31 |  |
| 150 | Pyke | -0.31 | 0.00 | 0.31 |  |
| 151 | Jarvan IV | -0.32 | 0.20 | 0.52 |  |
| 152 | Bel'Veth | -0.32 | 0.00 | 0.32 |  |
| 153 | Nautilus | -0.33 | 0.00 | 0.33 |  |
| 154 | Trundle | -0.34 | 0.00 | 0.34 |  |
| 155 | Vi | -0.39 | 0.20 | 0.59 |  |
| 156 | Katarina | -0.39 | 0.00 | 0.39 |  |
| 157 | Yorick | -0.39 | 0.00 | 0.39 |  |
| 158 | Janna | -0.40 | 0.36 | 0.76 |  |
| 159 | Nunu & Willump | -0.41 | 0.13 | 0.54 |  |
| 160 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 161 | Blitzcrank | -0.42 | 0.00 | 0.42 |  |
| 162 | Gragas | -0.43 | 0.00 | 0.43 |  |
| 163 | Riven | -0.45 | 0.00 | 0.45 |  |
| 164 | Sejuani | -0.45 | 0.00 | 0.45 |  |
| 165 | Rell | -0.47 | 0.00 | 0.47 |  |
| 166 | Poppy | -0.48 | 0.00 | 0.48 |  |
| 167 | Wukong | -0.49 | 0.00 | 0.49 |  |
| 168 | Zac | -0.50 | 0.00 | 0.50 |  |
| 169 | Tahm Kench | -0.52 | 0.00 | 0.52 |  |
| 170 | Taliyah | -0.53 | 0.27 | 0.80 |  |
| 171 | Naafiri | -0.59 | 0.00 | 0.59 |  |
| 172 | Galio | -0.84 | 0.00 | 0.84 |  |
