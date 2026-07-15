/* Six product screenshots — one continuous world at six altitudes. */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.env.SHOT_DIR || new URL('../public/screenshots', import.meta.url).pathname;
const BASE = process.env.SHOT_URL || 'http://localhost:5173';

mkdirSync(OUT, { recursive: true });

const VIEWS = [
  {
    file: '01-world-arrival',
    hash: '#@2550,1560,0.40z',
    wait: 1200,
    label: 'WORLD · arrival',
  },
  {
    file: '02-region-ailab',
    hash: '#@3270,1015,1.60z',
    wait: 1400,
    label: 'REGION · AI-Lab',
  },
  {
    file: '03-system-jarvis',
    hash: '#@3270,1040,2.60z',
    wait: 1400,
    label: 'SYSTEM · Jarvis',
  },
  {
    file: '04-project-flight',
    hash: '#@3349,1089,12.00z',
    wait: 1600,
    label: 'PROJECT · Flight',
  },
  {
    file: '05-artifact-ledger',
    hash: '#@2620,1890,3.60z',
    wait: 1500,
    label: 'ARTIFACT · Decision Ledger',
  },
  {
    file: '06-world-overview',
    hash: '#@2550,1560,0.40z',
    wait: 1200,
    label: 'WORLD · zoomed back out',
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1512, height: 982 },
  deviceScaleFactor: 2,
});

const shot = async (name) => {
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('shot', name);
};

for (const view of VIEWS) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.evaluate((hash) => {
    window.location.hash = hash;
  }, view.hash);
  await page.waitForTimeout(view.wait);
  await shot(view.file);
}

/* Bonus: source stratum — PR history at bedrock depth. */
await page.goto(`${BASE}/#@3324,1096,44.00z`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);
await shot('07-source-flight-pr247');

await browser.close();
console.log('done →', OUT);
