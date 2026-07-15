/* Visual verification: walks the page room by room and captures states. */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.env.SHOT_DIR || '/tmp/portfolio-shots';
const BASE = process.env.SHOT_URL || 'http://localhost:5183';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });

const shot = async (name) => {
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('shot', name);
};

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await shot('01-arrival');

/* Discovery, dormant + wake */
await page.locator('#system').scrollIntoViewIfNeeded();
await page.waitForTimeout(1800);
await shot('02-instrument-wake');

/* Select an intention, let the sequence run */
await page.getByRole('button', { name: 'Plan travel' }).first().click();
await page.waitForTimeout(2600);
await shot('03-instrument-plan-travel');

/* Hover focus on an agent + the readout strip */
await page.getByRole('button', { name: /Health — Understands/ }).hover();
await page.waitForTimeout(700);
await shot('04-instrument-focus-health');
await page.locator('.readout').scrollIntoViewIfNeeded();
await page.getByRole('button', { name: /Health — Understands/ }).hover();
await page.waitForTimeout(500);
await shot('04b-readout');

/* Outcomes view */
await page.getByRole('button', { name: 'Outcomes' }).click();
await page.locator('#system').scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await shot('04c-outcomes-view');
await page.getByRole('button', { name: 'System', exact: true }).last().click();

/* Understanding: advance three handoffs */
await page.locator('#understanding').scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy(0, -40));
await page.waitForTimeout(600);
await shot('05-oneday-initial');

const advance = page.getByRole('button', { name: /Begin — first handoff|Next handoff/ });
await advance.click();
await page.waitForTimeout(700);
await advance.click();
await page.waitForTimeout(700);
await advance.click();
await page.waitForTimeout(900);
await shot('06-oneday-three-steps');

/* Inspect a handoff */
await page.getByRole('button', { name: '+ Inspect this handoff' }).first().click();
await page.waitForTimeout(500);
await shot('07-oneday-inspect');

/* Silence */
await page.locator('.silence').scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await shot('08-silence');

/* Evidence: first assembly + depth switch */
await page.locator('#evidence').scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await shot('09-evidence-head');
await page.locator('.assembly').first().scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await shot('10-evidence-jarvis');
await page.locator('.assembly').first().getByRole('button', { name: 'Architecture' }).click();
await page.waitForTimeout(500);
await shot('11-evidence-architecture');
await page.locator('.assembly').nth(1).scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await shot('12-evidence-reserved');

/* Ledger + reveal */
await page.locator('#notes').scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await shot('13-ledger');
await page.getByRole('button', { name: 'What surprised me' }).nth(1).click();
await page.waitForTimeout(500);
await shot('14-ledger-reveal');

/* Person + note */
await page.locator('#person').scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await shot('15-person');
await page.getByRole('button', { name: /Field recording/ }).click();
await page.waitForTimeout(500);
await shot('16-person-note');

/* Far end + index */
await page.locator('#contact').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await shot('17-farend');
await page.locator('.workbench-index summary').click();
await page.waitForTimeout(500);
await shot('18-farend-index');

/* Full page */
await page.screenshot({ path: `${OUT}/19-full-page.png`, fullPage: true });
console.log('shot 19-full-page');

/* Reduced motion spot-check */
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.locator('#system').scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.getByRole('button', { name: 'Plan travel' }).first().click();
await page.waitForTimeout(900);
await shot('20-rm-instrument');

await browser.close();
console.log('done →', OUT);
