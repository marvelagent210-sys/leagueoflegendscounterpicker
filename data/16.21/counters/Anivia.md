# Counters to Anivia (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Anivia: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Anivia wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Anivia --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.72 |
| 2 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.41 | +1.00 | −0.41 |
| 3 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.09 |
| 4 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.06 |
| 5 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.37 |
| 6 | Yorick | +0.80 | +0.95 | +1.00 | +1.00 | −0.02 | +1.00 | +0.26 |
| 7 | Master Yi | +0.49 | +0.40 | +1.00 | −0.06 | +0.09 | +1.00 | +0.88 |
| 8 | Darius | +0.40 | −0.13 | +1.00 | +1.00 | +0.15 | −0.24 | −0.27 |
| 9 | Udyr | +0.34 | +1.00 | +0.28 | +0.03 | +0.20 | −0.05 | −0.21 |
| 10 | Bel'Veth | +0.34 | +1.00 | −0.43 | +1.00 | +0.03 | +0.05 | −0.26 |
| 11 | Zac | +0.29 | +0.44 | +0.28 | +0.45 | +0.02 | +0.35 | −0.32 |
| 12 | Swain | +0.27 | +0.32 | +0.30 | +0.34 | +0.12 | – | −0.04 |
| 13 | Diana | +0.24 | +0.27 | +0.29 | +0.27 | +0.15 | +0.14 | +0.06 |
| 14 | Shyvana | +0.22 | +0.29 | −0.21 | +1.00 | +0.09 | −0.21 | +0.22 |
| 15 | Zaahen | +0.22 | +0.49 | +0.07 | +0.13 | +0.15 | +0.07 | +0.45 |
| 16 | Heimerdinger | +0.22 | +0.91 | +0.10 | −0.14 | +0.14 | −0.21 | −0.15 |
| 17 | Renekton | +0.21 | +0.28 | +0.23 | +0.21 | +0.08 | +0.25 | +0.11 |
| 18 | Dr. Mundo | +0.17 | +0.23 | +0.20 | +0.15 | +0.05 | +0.25 | +0.10 |
| 19 | Fiddlesticks | +0.16 | +0.17 | +0.34 | +0.24 | +0.06 | −0.08 | −0.24 |
| 20 | Rakan | +0.13 | +0.01 | +0.16 | +0.25 | +0.09 | +0.12 | +0.28 |
| 21 | Nautilus | +0.13 | +0.13 | +0.17 | +0.15 | +0.08 | +0.17 | −0.08 |
| 22 | Galio | +0.12 | +0.23 | +0.22 | −0.16 | +0.14 | +0.20 | −0.10 |
| 23 | Yasuo | +0.11 | +0.15 | −0.05 | +0.31 | +0.12 | +0.04 | +0.04 |
| 24 | Viego | +0.10 | −1.00 | +0.71 | +1.00 | +0.21 | −0.81 | +0.44 |
| 25 | Camille | +0.10 | −0.23 | −0.07 | +1.00 | +0.05 | −0.23 | −0.28 |
| 26 | Maokai | +0.08 | +0.24 | −0.03 | +0.03 | +0.17 | −0.01 | −0.09 |
| 27 | Sejuani | +0.08 | +0.10 | +0.09 | −0.16 | +0.13 | +0.17 | +0.45 |
| 28 | Malphite | +0.07 | +0.14 | +0.16 | −0.07 | +0.11 | −0.10 | +0.04 |
| 29 | Braum | +0.06 | +0.03 | +0.03 | +0.21 | +0.11 | +0.01 | −0.19 |
| 30 | Amumu | +0.06 | +0.04 | −0.05 | +0.15 | +0.09 | +0.12 | +0.23 |
| 31 | Rek'Sai | +0.06 | +0.18 | −0.14 | +0.23 | +0.13 | −0.14 | +0.03 |
| 32 | Sylas | +0.06 | +0.07 | +0.05 | −0.03 | +0.23 | +0.02 | −0.02 |
| 33 | Tahm Kench | +0.06 | +0.04 | +0.04 | +0.14 | +0.11 | +0.02 | −0.15 |
| 34 | Volibear | +0.06 | +0.11 | −0.11 | +0.13 | +0.07 | +0.24 | −0.03 |
| 35 | Hwei | +0.05 | +0.06 | +0.05 | +0.10 | +0.06 | – | −0.13 |
| 36 | Ornn | +0.05 | +0.02 | +0.03 | +0.07 | +0.20 | +0.06 | −0.13 |
| 37 | Rammus | +0.05 | +0.13 | +0.13 | −0.06 | +0.06 | −0.17 | +0.12 |
| 38 | Jarvan IV | +0.05 | +0.07 | −0.01 | +0.02 | +0.14 | +0.01 | +0.21 |
| 39 | Yone | +0.05 | +0.46 | −0.03 | −0.36 | +0.15 | −0.15 | +0.11 |
| 40 | Shen | +0.05 | +0.04 | −0.01 | +0.14 | +0.07 | −0.10 | +0.27 |
| 41 | Taric | +0.04 | +0.16 | −0.12 | +0.10 | +0.07 | −0.03 | −0.05 |
| 42 | Poppy | +0.03 | −0.11 | +0.20 | −0.12 | +0.10 | +0.05 | +0.19 |
| 43 | Nunu & Willump | +0.02 | +0.00 | −0.06 | +0.15 | +0.20 | −0.09 | −0.28 |
| 44 | Karma | +0.02 | −0.04 | −0.02 | +0.13 | +0.13 | – | −0.15 |
| 45 | Rell | +0.02 | +0.01 | −0.01 | +0.03 | +0.13 | −0.06 | −0.01 |
| 46 | Mordekaiser | +0.02 | +0.07 | −0.04 | +0.01 | +0.12 | −0.11 | −0.01 |
| 47 | Xin Zhao | +0.02 | −0.11 | +0.12 | +0.09 | +0.12 | −0.15 | −0.12 |
| 48 | Urgot | +0.01 | +0.05 | +0.05 | −0.17 | +0.12 | +0.12 | −0.17 |
| 49 | Ambessa | +0.01 | −0.04 | −0.08 | −0.12 | +0.25 | +0.01 | +0.47 |
| 50 | Jax | +0.00 | −0.08 | −0.08 | +0.03 | +0.20 | +0.04 | +0.04 |
| 51 | Akshan | +0.00 | −0.07 | −0.05 | +0.15 | +0.07 | −0.01 | −0.16 |
| 52 | Vel'Koz | −0.00 | +0.10 | +0.10 | −0.30 | +0.22 | −0.24 | +0.03 |
| 53 | Gangplank | −0.00 | −0.07 | +0.01 | −0.04 | +0.27 | −0.15 | −0.09 |
| 54 | Skarner | −0.00 | −0.03 | −0.04 | +0.06 | +0.08 | −0.05 | −0.16 |
| 55 | Tryndamere | −0.01 | −0.12 | +0.14 | +0.02 | +0.06 | −0.25 | +0.01 |
| 56 | Kayn | −0.01 | −0.11 | +0.12 | −0.13 | +0.12 | −0.03 | +0.03 |
| 57 | Malzahar | −0.01 | −0.05 | −0.05 | +0.02 | +0.09 | −0.01 | −0.04 |
| 58 | Cho'Gath | −0.01 | +0.01 | −0.05 | +0.16 | −0.00 | −0.22 | −0.20 |
| 59 | Quinn | −0.01 | +0.02 | +0.02 | −0.05 | +0.04 | – | −0.33 |
| 60 | Naafiri | −0.01 | −0.08 | +0.03 | −0.01 | +0.12 | −0.05 | −0.23 |
| 61 | Graves | −0.02 | +0.03 | −0.02 | −0.15 | +0.22 | −0.15 | −0.25 |
| 62 | Leona | −0.03 | +0.05 | +0.00 | −0.22 | +0.05 | +0.07 | −0.20 |
| 63 | Xerath | −0.03 | −0.04 | −0.05 | −0.03 | +0.06 | −0.01 | −0.13 |
| 64 | Gragas | −0.03 | −0.14 | −0.09 | −0.17 | +0.15 | +0.28 | +0.19 |
| 65 | Sett | −0.03 | −0.06 | −0.03 | +0.01 | +0.06 | −0.18 | −0.12 |
| 66 | Kled | −0.03 | −0.22 | −0.22 | +0.28 | +0.05 | +0.13 | +0.02 |
| 67 | Teemo | −0.04 | −0.01 | −0.09 | +0.02 | +0.08 | −0.16 | −0.22 |
| 68 | Briar | −0.04 | −0.09 | −0.01 | −0.07 | +0.07 | +0.06 | −0.35 |
| 69 | Kha'Zix | −0.04 | −0.04 | −0.14 | −0.02 | +0.03 | −0.07 | +0.19 |
| 70 | Lee Sin | −0.04 | +0.16 | −0.27 | −0.24 | +0.11 | +0.18 | +0.02 |
| 71 | Akali | −0.04 | −0.07 | −0.08 | −0.03 | +0.04 | −0.00 | −0.07 |
| 72 | Alistar | −0.04 | −0.24 | +0.19 | −0.23 | +0.09 | −0.00 | +0.02 |
| 73 | Evelynn | −0.05 | −0.06 | −0.07 | +0.00 | +0.05 | −0.05 | −0.34 |
| 74 | Illaoi | −0.05 | −0.14 | −0.07 | +0.03 | +0.11 | −0.12 | −0.15 |
| 75 | Aatrox | −0.05 | −0.02 | −0.01 | +0.01 | +0.00 | −0.33 | −0.29 |
| 76 | Aurora | −0.05 | −0.06 | −0.12 | −0.01 | +0.10 | – | −0.32 |
| 77 | Soraka | −0.05 | −0.09 | −0.12 | +0.04 | +0.05 | – | −0.22 |
| 78 | Nasus | −0.05 | −0.06 | −0.21 | +0.05 | +0.10 | −0.06 | −0.17 |
| 79 | Hecarim | −0.06 | −0.20 | −0.04 | −0.04 | +0.12 | +0.07 | −0.26 |
| 80 | Samira | −0.06 | −0.26 | −0.03 | −0.08 | +0.23 | +0.04 | −0.12 |
| 81 | Ivern | −0.06 | −0.09 | −0.10 | −0.03 | +0.03 | +0.09 | −0.37 |
| 82 | Karthus | −0.06 | −0.10 | −0.12 | −0.08 | +0.10 | +0.03 | −0.19 |
| 83 | Rumble | −0.06 | −0.03 | +0.02 | −0.20 | +0.08 | −0.19 | −0.24 |
| 84 | Nilah | −0.07 | −0.24 | −0.20 | +0.02 | +0.30 | +0.07 | −0.32 |
| 85 | Nami | −0.07 | −0.03 | −0.12 | −0.12 | +0.07 | – | −0.27 |
| 86 | Lulu | −0.08 | −0.07 | −0.19 | −0.07 | +0.13 | – | −0.17 |
| 87 | Ekko | −0.08 | −0.07 | −0.13 | +0.02 | +0.00 | −0.21 | −0.31 |
| 88 | Jayce | −0.08 | −0.29 | +0.05 | −0.15 | +0.11 | +0.04 | −0.25 |
| 89 | Veigar | −0.09 | −0.12 | −0.12 | −0.07 | +0.02 | −0.07 | −0.16 |
| 90 | Seraphine | −0.09 | −0.11 | −0.13 | −0.10 | +0.06 | – | −0.17 |
| 91 | Irelia | −0.09 | −0.06 | −0.20 | −0.10 | +0.10 | −0.24 | +0.07 |
| 92 | Tristana | −0.09 | −0.11 | −0.10 | −0.11 | +0.07 | −0.17 | −0.20 |
| 93 | Trundle | −0.09 | −0.05 | −0.21 | −0.07 | +0.03 | −0.15 | −0.02 |
| 94 | Azir | −0.09 | +0.44 | −0.01 | −1.00 | +0.12 | – | −0.15 |
| 95 | Kindred | −0.10 | −0.10 | −0.09 | −0.28 | +0.19 | −0.04 | −0.33 |
| 96 | Fizz | −0.10 | −0.13 | −0.11 | −0.21 | +0.10 | −0.17 | +0.07 |
| 97 | Locke | −0.10 | −0.11 | −0.13 | −0.18 | +0.02 | +0.01 | −0.25 |
| 98 | Kassadin | −0.10 | −0.20 | −0.14 | −0.17 | +0.07 | −0.18 | +0.42 |
| 99 | Vi | −0.11 | −0.04 | −0.32 | −0.05 | +0.03 | −0.14 | +0.12 |
| 100 | Blitzcrank | −0.11 | −0.16 | −0.16 | −0.14 | +0.09 | −0.12 | −0.02 |
| 101 | Orianna | −0.11 | +0.10 | −0.34 | −0.24 | +0.13 | – | −0.14 |
| 102 | Sion | −0.11 | −0.17 | −0.19 | −0.10 | +0.06 | −0.08 | +0.03 |
| 103 | Gnar | −0.11 | −0.18 | −0.25 | −0.08 | +0.15 | −0.10 | +0.03 |
| 104 | Brand | −0.11 | −0.02 | −0.03 | −0.38 | +0.04 | −0.19 | −0.27 |
| 105 | Singed | −0.12 | −0.13 | −0.21 | −0.05 | +0.06 | −0.27 | −0.14 |
| 106 | Shaco | −0.12 | −0.24 | +0.01 | −0.25 | +0.10 | −0.24 | −0.13 |
| 107 | Wukong | −0.12 | −0.16 | −0.21 | −0.17 | +0.11 | −0.17 | +0.12 |
| 108 | Kennen | −0.12 | −0.19 | −0.19 | −0.16 | +0.09 | – | +0.06 |
| 109 | Kalista | −0.13 | −0.02 | −0.06 | −0.46 | +0.08 | – | −0.28 |
| 110 | Nidalee | −0.14 | −0.14 | −0.17 | −0.18 | +0.03 | – | −0.33 |
| 111 | Nocturne | −0.14 | −0.23 | −0.22 | −0.14 | +0.07 | −0.10 | +0.01 |
| 112 | Vladimir | −0.14 | −0.16 | −0.13 | −0.12 | −0.04 | −0.32 | −0.14 |
| 113 | Garen | −0.15 | −0.14 | −0.24 | −0.19 | +0.15 | −0.27 | −0.24 |
| 114 | Talon | −0.15 | −0.34 | +0.01 | −0.20 | +0.04 | −0.26 | −0.27 |
| 115 | Jhin | −0.16 | −0.21 | −0.21 | −0.21 | +0.14 | – | −0.25 |
| 116 | Zoe | −0.17 | −0.38 | −0.31 | +0.11 | +0.11 | −0.32 | −0.17 |
| 117 | Bard | −0.17 | −0.17 | −0.34 | −0.12 | +0.04 | −0.21 | −0.16 |
| 118 | Riven | −0.19 | +0.05 | −0.16 | −0.60 | +0.16 | −0.51 | −0.23 |
| 119 | Kog'Maw | −0.19 | −0.21 | −0.05 | −0.59 | +0.10 | −0.15 | −0.13 |
| 120 | Ziggs | −0.22 | −0.30 | −0.30 | −0.35 | +0.21 | – | −0.17 |
| 121 | Janna | −0.24 | −0.27 | −0.36 | −0.30 | +0.10 | – | −0.21 |
| 122 | Pantheon | −0.24 | −0.40 | −0.35 | −0.21 | +0.07 | −0.24 | +0.14 |
| 123 | Taliyah | −0.25 | −0.09 | −0.08 | −1.00 | +0.10 | – | −0.05 |
| 124 | Lillia | −0.26 | −0.34 | −0.34 | −0.39 | +0.10 | −0.28 | +0.07 |
| 125 | Rengar | −0.26 | −0.21 | −0.21 | −1.00 | +0.37 | −0.15 | +0.04 |
| 126 | Viktor | −0.27 | −0.07 | −0.09 | −1.00 | +0.05 | – | −0.21 |
| 127 | Katarina | −0.28 | −0.46 | +0.01 | −0.74 | +0.06 | −0.16 | −0.13 |
| 128 | Annie | −0.30 | −0.46 | −0.34 | −0.41 | +0.08 | – | +0.00 |
| 129 | Aurelion Sol | −0.31 | −0.38 | −0.38 | −0.42 | +0.08 | −0.40 | −0.20 |
| 130 | Ezreal | −0.32 | −0.38 | −0.47 | −0.44 | +0.07 | – | +0.04 |
| 131 | Varus | −0.33 | −0.18 | −0.20 | −1.00 | +0.06 | – | −0.20 |
| 132 | Twisted Fate | −0.34 | −0.20 | −0.20 | −1.00 | +0.11 | – | −0.38 |
| 133 | Syndra | −0.34 | −0.46 | +0.02 | −1.00 | +0.09 | – | −0.18 |
| 134 | Neeko | −0.35 | −0.26 | −0.27 | −1.00 | +0.12 | −0.25 | −0.21 |
| 135 | Aphelios | −0.37 | −0.24 | −0.28 | −1.00 | +0.13 | – | −0.39 |
| 136 | Zed | −0.38 | −0.40 | −0.36 | −1.00 | +0.04 | −0.16 | +0.45 |
| 137 | Draven | −0.40 | −0.53 | −0.15 | −1.00 | +0.09 | – | −0.11 |
| 138 | Sivir | −0.41 | −0.21 | −0.21 | −1.00 | +0.05 | −1.00 | −0.34 |
| 139 | Warwick | −0.43 | −1.00 | +0.15 | −1.00 | +0.21 | −0.27 | −0.51 |
| 140 | Twitch | −0.47 | −0.41 | −0.46 | −1.00 | +0.06 | – | −0.27 |
| 141 | Jinx | −0.47 | −0.44 | −0.46 | −1.00 | +0.10 | – | −0.35 |
| 142 | Elise | −0.48 | −0.49 | −0.69 | −0.63 | +0.03 | – | −0.23 |
| 143 | Gwen | −0.48 | −0.58 | −1.00 | −0.12 | +0.32 | −0.86 | −0.43 |
| 144 | Zyra | −0.48 | −1.00 | −0.13 | −1.00 | +0.10 | −0.07 | −0.15 |
| 145 | Sona | −0.49 | −1.00 | +0.02 | −1.00 | +0.07 | – | −0.05 |
| 146 | Kayle | −0.49 | −1.00 | +0.04 | −1.00 | +0.16 | – | −0.43 |
| 147 | Mel | −0.50 | −1.00 | −0.04 | −1.00 | +0.14 | – | −0.12 |
| 148 | Milio | −0.53 | −1.00 | −0.10 | −1.00 | +0.13 | – | −0.46 |
| 149 | Xayah | −0.55 | −0.98 | −0.53 | −0.70 | +0.14 | – | +0.07 |
| 150 | Caitlyn | −0.56 | −0.61 | −0.62 | −1.00 | +0.08 | – | −0.17 |
| 151 | Morgana | −0.58 | −0.53 | −1.00 | −1.00 | +0.12 | −0.13 | −0.15 |
| 152 | Ryze | −0.59 | −0.36 | −1.00 | −1.00 | +0.17 | −0.61 | −0.32 |
| 153 | Lucian | −0.59 | −1.00 | −0.30 | −0.90 | +0.08 | −1.00 | +0.04 |
| 154 | LeBlanc | −0.60 | −0.63 | −1.00 | −0.48 | +0.07 | −0.88 | −0.30 |
| 155 | Zilean | −0.61 | −0.40 | −1.00 | −1.00 | +0.04 | – | −0.14 |
| 156 | Lissandra | −0.63 | −1.00 | −0.51 | −1.00 | +0.07 | – | −0.04 |
| 157 | Ahri | −0.64 | −0.76 | −1.00 | −0.75 | +0.03 | – | +0.12 |
| 158 | Yuumi | −0.72 | −1.00 | −0.83 | −1.00 | +0.03 | −0.41 | −0.44 |
| 159 | Vex | −0.72 | −1.00 | −1.00 | −0.71 | +0.02 | – | −0.11 |
| 160 | Ashe | −0.74 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.26 |
| 161 | Pyke | −0.74 | −0.95 | −0.80 | −1.00 | −0.01 | −0.96 | −0.17 |
| 162 | Renata Glasc | −0.76 | −1.00 | −0.93 | −1.00 | +0.09 | – | −0.25 |
| 163 | Cassiopeia | −0.76 | −1.00 | −1.00 | −1.00 | +0.16 | – | −0.14 |
| 164 | Zeri | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | −0.03 |
| 165 | Smolder | −0.77 | −1.00 | −1.00 | −1.00 | +0.14 | – | −0.26 |
| 166 | Yunara | −0.77 | −1.00 | −1.00 | −1.00 | +0.16 | – | −0.33 |
| 167 | Lux | −0.77 | −1.00 | −1.00 | −1.00 | +0.11 | – | −0.18 |
| 168 | Miss Fortune | −0.77 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.29 |
| 169 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.29 |
| 170 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.42 |
| 171 | Qiyana | −0.79 | −0.99 | −1.00 | −1.00 | +0.04 | −0.91 | −0.09 |
| 172 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.77 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Anivia's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Anivia's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Anivia` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.03)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Anivia's Crystallize. Untargetable for 0.75 s; Crystallize takes 0.25 s to land, enough to react. (Fizz E Playful → Anivia W Crystallize)
- **0.65** untargetable: Playful makes Fizz untargetable, dodging Anivia's Flash Frost. Untargetable for 0.75 s; Flash Frost takes 1.41 s to land, enough to react. (Fizz E Playful → Anivia Q Flash Frost)
- **0.39** untargetable: Playful makes Fizz untargetable, dodging Anivia's Frostbite. Untargetable for 0.75 s; Frostbite takes 0.63 s to land, enough to react. (Fizz E Playful → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 425 units farther than Fizz's (600 vs 175 attack range).

#### 2. Fiora (net +0.94)

- **0.80** parry: Riposte parries Anivia's Crystallize and stuns back. Parry for 0.75 s; Crystallize takes 0.25 s to land, enough to react. Negating Crystallize's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Anivia W Crystallize)
- **0.56** parry: Riposte parries Anivia's Flash Frost and stuns back. Parry for 0.75 s; Flash Frost takes 1.41 s to land, enough to react. Negating Flash Frost's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Anivia Q Flash Frost)
- **0.30** parry: Riposte parries Anivia's Frostbite. Parry for 0.75 s; Frostbite takes 0.63 s to land, enough to react. (Fiora W Riposte → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 450 units farther than Fiora's (600 vs 150 attack range).

#### 3. Maokai (net +0.86)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Crystallize. Untargetable for 1.4 s; Crystallize takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Anivia W Crystallize)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Flash Frost. Untargetable for 1.4 s; Flash Frost takes 1.41 s to land, enough to react. (Maokai W Twisted Advance → Anivia Q Flash Frost)
- **0.35** untargetable: Twisted Advance makes Maokai untargetable, dodging Anivia's Frostbite. Untargetable for 1.4 s; Frostbite takes 0.63 s to land, enough to react. (Maokai W Twisted Advance → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 475 units farther than Maokai's (600 vs 125 attack range).

#### 4. Udyr (net +0.83)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Crystallize (airborne). Immune for 1.5 s, long enough to use ahead of Crystallize. (Udyr E Blazing Stampede → Anivia W Crystallize)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Flash Frost (slow, stun). Immune for 1.5 s, long enough to use ahead of Flash Frost. (Udyr E Blazing Stampede → Anivia Q Flash Frost)
- **0.10** cc immunity: Blazing Stampede makes Udyr immune to Anivia's Glacial Storm (slow). Immune for 1.5 s, long enough to use ahead of Glacial Storm. (Udyr E Blazing Stampede → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 475 units farther than Udyr's (600 vs 125 attack range).

#### 5. Morgana (net +0.77)

- **0.70** cc immunity: Black Shield makes Morgana immune to Anivia's Crystallize (airborne). Immune for 5 s, long enough to use ahead of Crystallize. (Morgana E Black Shield → Anivia W Crystallize)
- **0.46** cc immunity: Black Shield makes Morgana immune to Anivia's Flash Frost (slow, stun). Immune for 5 s, long enough to use ahead of Flash Frost. (Morgana E Black Shield → Anivia Q Flash Frost)
- **0.08** cc immunity: Black Shield makes Morgana immune to Anivia's Glacial Storm (slow). Immune for 5 s, long enough to use ahead of Glacial Storm. (Morgana E Black Shield → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 150 units farther than Morgana's (600 vs 450 attack range).

#### 6. Gwen (net +0.76)

- **0.68** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Crystallize. Untargetable for ?; Crystallize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia W Crystallize)
- **0.44** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Flash Frost. Untargetable for ?; Flash Frost takes 1.41 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia Q Flash Frost)
- **0.29** untargetable: Hallowed Mist makes Gwen untargetable, dodging Anivia's Frostbite. Untargetable for ?; Frostbite takes 0.63 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Anivia E Frostbite)
- Watch out: Anivia's basic attacks reach 450 units farther than Gwen's (600 vs 150 attack range).

#### 7. Vladimir (net +0.72)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Crystallize. Untargetable for 2 s, long enough to use ahead of Crystallize. (Vladimir W Sanguine Pool → Anivia W Crystallize)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Flash Frost. Untargetable for 2 s, long enough to use ahead of Flash Frost. (Vladimir W Sanguine Pool → Anivia Q Flash Frost)
- **0.31** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Anivia's Glacial Storm. Untargetable for 2 s, long enough to use ahead of Glacial Storm. (Vladimir W Sanguine Pool → Anivia R Glacial Storm)
- Watch out: Anivia's basic attacks reach 150 units farther than Vladimir's (600 vs 450 attack range).

#### 8. Braum (net +0.69)

- **0.65** projectile block: Unbreakable blocks Anivia's Flash Frost, a projectile. Unbreakable for 4 s, long enough to use ahead of Flash Frost. (Braum E Unbreakable → Anivia Q Flash Frost)
- **0.39** projectile block: Unbreakable blocks Anivia's Frostbite, a projectile. Unbreakable for 4 s, long enough to use ahead of Frostbite. (Braum E Unbreakable → Anivia E Frostbite)
- **0.33** projectile block: Unbreakable blocks Anivia's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Anivia basic attacks)
- Watch out: Anivia's basic attacks reach 475 units farther than Braum's (600 vs 125 attack range).

#### 9. Lissandra (net +0.63)

- **0.37** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Crystallize. Untargetable for 2.5 s, long enough to use ahead of Crystallize. (Lissandra R Frozen Tomb → Anivia W Crystallize)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Flash Frost. Untargetable for 2.5 s, long enough to use ahead of Flash Frost. (Lissandra R Frozen Tomb → Anivia Q Flash Frost)
- **0.27** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Anivia's Glacial Storm. Untargetable for 2.5 s, long enough to use ahead of Glacial Storm. (Lissandra R Frozen Tomb → Anivia R Glacial Storm)

#### 10. Aurora (net +0.59)

- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Crystallize. Untargetable for 0.4 s; Crystallize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia W Crystallize)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Flash Frost. Untargetable for 0.4 s; Flash Frost takes 1.41 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia Q Flash Frost)
- **0.23** untargetable: Between Worlds makes Aurora untargetable, dodging Anivia's Frostbite. Untargetable for 0.4 s; Frostbite takes 0.63 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Anivia E Frostbite)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.03 | 1.15 | 0.12 |  |
| 2 | Fiora | +0.94 | 1.18 | 0.24 |  |
| 3 | Maokai | +0.86 | 1.10 | 0.24 |  |
| 4 | Udyr | +0.83 | 1.07 | 0.24 |  |
| 5 | Morgana | +0.77 | 0.95 | 0.18 |  |
| 6 | Gwen | +0.76 | 1.00 | 0.24 |  |
| 7 | Vladimir | +0.72 | 1.05 | 0.33 |  |
| 8 | Braum | +0.69 | 0.93 | 0.24 | projectile block (Unbreakable) |
| 9 | Lissandra | +0.63 | 0.63 | 0.00 |  |
| 10 | Aurora | +0.59 | 0.59 | 0.00 |  |
| 11 | Mel | +0.58 | 0.58 | 0.00 |  |
| 12 | Bard | +0.57 | 0.63 | 0.06 |  |
| 13 | Samira | +0.56 | 0.60 | 0.04 | projectile block (Blade Whirl) |
| 14 | Yasuo | +0.51 | 0.67 | 0.16 | projectile block (Wind Wall) |
| 15 | Xayah | +0.51 | 0.60 | 0.09 |  |
| 16 | Master Yi | +0.49 | 1.13 | 0.64 |  |
| 17 | Rek'Sai | +0.48 | 0.64 | 0.16 |  |
| 18 | Camille | +0.48 | 0.60 | 0.12 |  |
| 19 | Evelynn | +0.45 | 0.61 | 0.16 |  |
| 20 | Shaco | +0.45 | 0.61 | 0.16 |  |
| 21 | Zed | +0.42 | 0.58 | 0.16 |  |
| 22 | Kled | +0.41 | 0.51 | 0.10 |  |
| 23 | Zaahen | +0.38 | 0.54 | 0.16 |  |
| 24 | Kalista | +0.37 | 0.40 | 0.03 |  |
| 25 | Nocturne | +0.36 | 0.60 | 0.24 |  |
| 26 | Kayle | +0.35 | 0.35 | 0.00 |  |
| 27 | Yuumi | +0.33 | 1.24 | 0.91 |  |
| 28 | Rengar | +0.33 | 0.81 | 0.48 |  |
| 29 | Gangplank | +0.29 | 0.77 | 0.48 |  |
| 30 | Sivir | +0.28 | 0.40 | 0.12 |  |
| 31 | Milio | +0.26 | 0.35 | 0.09 |  |
| 32 | Lulu | +0.22 | 0.22 | 0.00 |  |
| 33 | Alistar | +0.20 | 0.44 | 0.24 |  |
| 34 | Teemo | +0.19 | 0.31 | 0.12 |  |
| 35 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 36 | K'Sante | +0.16 | 0.28 | 0.12 |  |
| 37 | Vex | +0.14 | 0.14 | 0.00 |  |
| 38 | Aphelios | +0.11 | 0.11 | 0.00 |  |
| 39 | Heimerdinger | +0.11 | 0.11 | 0.00 |  |
| 40 | Xin Zhao | +0.10 | 0.34 | 0.24 |  |
| 41 | Olaf | +0.07 | 0.55 | 0.48 |  |
| 42 | Malphite | +0.06 | 0.30 | 0.24 |  |
| 43 | Jarvan IV | +0.02 | 0.14 | 0.12 |  |
| 44 | Yone | +0.02 | 0.14 | 0.12 |  |
| 45 | Jax | +0.01 | 0.25 | 0.24 |  |
| 46 | Nilah | 0.00 | 0.22 | 0.22 |  |
| 47 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 48 | Annie | 0.00 | 0.00 | 0.00 |  |
| 49 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 50 | Brand | 0.00 | 0.00 | 0.00 |  |
| 51 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 52 | Corki | 0.00 | 0.00 | 0.00 |  |
| 53 | Elise | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 56 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 57 | Lux | 0.00 | 0.00 | 0.00 |  |
| 58 | Nami | 0.00 | 0.00 | 0.00 |  |
| 59 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 60 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 61 | Senna | 0.00 | 0.00 | 0.00 |  |
| 62 | Sona | 0.00 | 0.00 | 0.00 |  |
| 63 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 64 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 65 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 66 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 67 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 68 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 69 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 70 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 71 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 72 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 73 | Hecarim | -0.01 | 0.15 | 0.16 |  |
| 74 | Ornn | -0.02 | 0.14 | 0.16 |  |
| 75 | Volibear | -0.02 | 0.14 | 0.16 |  |
| 76 | Azir | -0.03 | 0.00 | 0.03 |  |
| 77 | Gnar | -0.03 | 0.00 | 0.03 |  |
| 78 | Kai'Sa | -0.04 | 0.00 | 0.04 |  |
| 79 | LeBlanc | -0.04 | 0.00 | 0.04 |  |
| 80 | Nidalee | -0.04 | 0.00 | 0.04 |  |
| 81 | Jayce | -0.06 | 0.00 | 0.06 |  |
| 82 | Kindred | -0.06 | 0.00 | 0.06 |  |
| 83 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 84 | Graves | -0.07 | 0.00 | 0.07 |  |
| 85 | Jinx | -0.09 | 0.00 | 0.09 |  |
| 86 | Karma | -0.09 | 0.00 | 0.09 |  |
| 87 | Orianna | -0.09 | 0.00 | 0.09 |  |
| 88 | Seraphine | -0.09 | 0.00 | 0.09 |  |
| 89 | Swain | -0.09 | 0.00 | 0.09 |  |
| 90 | Viktor | -0.09 | 0.00 | 0.09 |  |
| 91 | Illaoi | -0.10 | 0.14 | 0.24 |  |
| 92 | Sett | -0.10 | 0.14 | 0.24 |  |
| 93 | Shyvana | -0.10 | 0.14 | 0.24 |  |
| 94 | Garen | -0.11 | 0.37 | 0.48 |  |
| 95 | Briar | -0.12 | 0.00 | 0.12 |  |
| 96 | Kog'Maw | -0.12 | 0.00 | 0.12 |  |
| 97 | Rakan | -0.12 | 0.00 | 0.12 |  |
| 98 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 99 | Urgot | -0.15 | 0.00 | 0.15 |  |
| 100 | Akali | -0.16 | 0.00 | 0.16 |  |
| 101 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 102 | Bel'Veth | -0.16 | 0.00 | 0.16 |  |
| 103 | Ekko | -0.16 | 0.00 | 0.16 |  |
| 104 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 105 | Lillia | -0.16 | 0.00 | 0.16 |  |
| 106 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 107 | Qiyana | -0.16 | 0.00 | 0.16 |  |
| 108 | Rell | -0.16 | 0.00 | 0.16 |  |
| 109 | Riven | -0.16 | 0.00 | 0.16 |  |
| 110 | Talon | -0.16 | 0.00 | 0.16 |  |
| 111 | Sion | -0.17 | 0.58 | 0.75 |  |
| 112 | Smolder | -0.18 | 0.00 | 0.18 |  |
| 113 | Varus | -0.20 | 0.00 | 0.20 |  |
| 114 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 115 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 116 | Amumu | -0.24 | 0.00 | 0.24 |  |
| 117 | Diana | -0.24 | 0.00 | 0.24 |  |
| 118 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 119 | Kassadin | -0.24 | 0.00 | 0.24 |  |
| 120 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 121 | Leona | -0.24 | 0.00 | 0.24 |  |
| 122 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 123 | Renekton | -0.24 | 0.00 | 0.24 |  |
| 124 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 125 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 126 | Draven | -0.26 | 0.00 | 0.26 |  |
| 127 | Syndra | -0.26 | 0.00 | 0.26 |  |
| 128 | Aurelion Sol | -0.31 | 0.00 | 0.31 |  |
| 129 | Ivern | -0.33 | 0.00 | 0.33 |  |
| 130 | Skarner | -0.35 | 0.13 | 0.48 |  |
| 131 | Malzahar | -0.38 | 0.54 | 0.92 |  |
| 132 | Viego | -0.40 | 0.14 | 0.54 |  |
| 133 | Quinn | -0.41 | 0.00 | 0.41 |  |
| 134 | Mordekaiser | -0.42 | 0.06 | 0.48 |  |
| 135 | Kayn | -0.45 | 0.61 | 1.06 |  |
| 136 | Blitzcrank | -0.48 | 0.00 | 0.48 |  |
| 137 | Cho'Gath | -0.48 | 0.00 | 0.48 |  |
| 138 | Darius | -0.48 | 0.00 | 0.48 |  |
| 139 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 140 | Rumble | -0.48 | 0.00 | 0.48 |  |
| 141 | Singed | -0.48 | 0.00 | 0.48 |  |
| 142 | Taric | -0.48 | 0.00 | 0.48 |  |
| 143 | Trundle | -0.48 | 0.00 | 0.48 |  |
| 144 | Yorick | -0.48 | 0.00 | 0.48 |  |
| 145 | Locke | -0.50 | 0.00 | 0.50 |  |
| 146 | Rammus | -0.53 | 0.24 | 0.77 |  |
| 147 | Caitlyn | -0.56 | 0.00 | 0.56 |  |
| 148 | Gragas | -0.56 | 0.00 | 0.56 |  |
| 149 | Jhin | -0.56 | 0.00 | 0.56 |  |
| 150 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 151 | Akshan | -0.62 | 0.00 | 0.62 |  |
| 152 | Lucian | -0.62 | 0.00 | 0.62 |  |
| 153 | Poppy | -0.64 | 0.00 | 0.64 |  |
| 154 | Vel'Koz | -0.65 | 0.00 | 0.65 |  |
| 155 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 156 | Pantheon | -0.72 | 0.44 | 1.16 |  |
| 157 | Xerath | -0.73 | 0.00 | 0.73 |  |
| 158 | Karthus | -0.74 | 0.00 | 0.74 |  |
| 159 | Twisted Fate | -0.74 | 0.00 | 0.74 |  |
| 160 | Warwick | -0.78 | 0.69 | 1.47 |  |
| 161 | Vi | -0.79 | 0.14 | 0.93 |  |
| 162 | Janna | -0.80 | 0.00 | 0.80 |  |
| 163 | Katarina | -0.80 | 0.00 | 0.80 |  |
| 164 | Shen | -0.82 | 0.24 | 1.06 |  |
| 165 | Pyke | -0.87 | 0.00 | 0.87 |  |
| 166 | Fiddlesticks | -0.94 | 0.00 | 0.94 |  |
| 167 | Taliyah | -1.00 | 0.00 | 1.00 |  |
| 168 | Naafiri | -1.02 | 0.00 | 1.02 |  |
| 169 | Zac | -1.10 | 0.00 | 1.10 |  |
| 170 | Nunu & Willump | -1.18 | 0.24 | 1.42 |  |
| 171 | Tahm Kench | -1.24 | 0.00 | 1.24 |  |
| 172 | Galio | -1.33 | 0.00 | 1.33 |  |
