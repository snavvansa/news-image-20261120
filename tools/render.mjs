// Renders src/page.html to entry.png at exactly 1024 x 1024 with headless Chromium.
// Not part of the entry's run: main.py only copies the committed entry.png.
//
//   PW_DIR=<dir holding node_modules/playwright> node tools/render.mjs
//
// Playwright lives outside the repository (PW_DIR), so nothing is vendored here.
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { statSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pwDir = process.env.PW_DIR;
if (!pwDir) throw new Error('set PW_DIR to the folder whose node_modules holds playwright');
const require = createRequire(join(pwDir, 'package.json'));
const { chromium } = require('playwright');

const out = process.argv[2] ?? join(root, 'entry.png');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
const src = process.env.PAGE ?? join(root, 'src', 'front.html');
await page.goto(pathToFileURL(src).href);
await page.evaluate(() => document.fonts.ready);
// Fail loudly if the layout spills past the square instead of silently cropping it.
const overflow = await page.evaluate(() => {
  const bad = [];
  for (const el of document.querySelectorAll('.card, .brief li, .lead')) {
    if (el.scrollHeight > el.clientHeight + 1) bad.push(el.id || el.className + ': ' + el.textContent.slice(0, 40));
  }
  // one-line items cut off with an ellipsis
  for (const el of document.querySelectorAll('.brief li, .tag')) {
    if (el.scrollWidth > el.clientWidth + 1) bad.push('cut: ' + el.textContent.slice(0, 50));
  }
  const last = document.querySelector('.foot').getBoundingClientRect().bottom;
  if (last > 1024) bad.push('footer ends at ' + Math.round(last) + 'px');
  const h = document.documentElement.scrollHeight;
  return { bad, h };
});
if (overflow.h > 1024) console.warn('page is taller than 1024px:', overflow.h);
if (overflow.bad.length) console.warn('clipped boxes:\n  ' + overflow.bad.join('\n  '));
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
await browser.close();
console.log('wrote', out, statSync(out).size, 'bytes');
