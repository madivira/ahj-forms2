import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(60000); // default puppeteer timeout

describe('Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('active title', async () => {
    await page.goto(baseUrl);
    const create = await page.$('.create');
    await create.click();
    const inputName = await page.$('.title-form');
    await inputName.type('name');
    const inputCost = await page.$('.cost-form');
    await inputCost.type('15000');
    const btn = await page.$('.save-submit');
    await btn.click();
    await page.waitForSelector('.column-title');
  });

  test('hidden', async () => {
    await page.goto(baseUrl);
    const create = await page.$('.create');
    await create.click();
    const inputName = await page.$('.title-form');
    await inputName.type('name');
    const inputCost = await page.$('.cost-form');
    await inputCost.type('15000');
    const btn = await page.$('.save-submit');
    await btn.click();
    await page.waitForSelector('.hidden');
  });
  test('active', async () => {
    await page.goto(baseUrl);
    const create = await page.$('.create');
    await create.click();
    await page.waitForSelector('.active');
  });

  test('active cost', async () => {
    await page.goto(baseUrl);
    const create = await page.$('.create');
    await create.click();
    const inputName = await page.$('.title-form');
    await inputName.type('name');
    const inputCost = await page.$('.cost-form');
    await inputCost.type('15000');
    const btn = await page.$('.save-submit');
    await btn.click();
    await page.waitForSelector('.column-cost');
  });

  test('active update', async () => {
    await page.goto(baseUrl);
    const create = await page.$('.create');
    await create.click();
    const inputName = await page.$('.title-form');
    await inputName.type('name');
    const inputCost = await page.$('.cost-form');
    await inputCost.type('15000');
    const btn = await page.$('.save-submit');
    await btn.click();
    await page.waitForSelector('.hidden');
    const update = await page.$('span.update');
    await update.click();
    await inputName.type('Title');
    await inputCost.type('5000');
    await btn.click();
    await page.waitForSelector('.column-cost');
  });
});
