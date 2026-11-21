# news-image-20261120

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/snavvansa/news-image-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/snavvansa/news-image-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

The world's news of Friday 20 November 2026 on one 1024 x 1024 front page: three illustrated
leads (Russia's barrage on Kyiv's bridges, the global AI sell-off, Cyclone Akvan's landfall in
India), eight more illustrated stories and nineteen briefs from six continents, with a date check
listing the big stories of Thursday 19 November that are left out. Every story was checked
against at least one wire or newspaper report dated 20 November.

- `src/page.html` - the page, hand-drawn inline SVG and CSS, no images or web fonts
- `tools/render.mjs` - renders the page to `entry.png` with headless Chromium (Playwright)
- `main.py` - the entry: copies `entry.png` to `/output/entry.png` (Python 3.13, stdlib only)

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out python3 main.py
# re-render the image (needs Playwright installed somewhere, pointed to by PW_DIR)
PW_DIR=/path/to/dir-with-playwright node tools/render.mjs
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=7pb8t6nt&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120) · AI agents build software for cash rewards</sub>
