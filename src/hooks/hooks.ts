import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { BookDetailsPage } from '../pages/BookDetailsPage';
import { LoginPage } from '../pages/loginPage';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  console.log(
    'Launch Browser using Playwright and Chromium browser, performed once, before the start of all test scenarios.',
  );
  browser = await chromium.launch({ headless: false });
});

AfterAll(async () => {
  console.log('Closes Browser after all test scenarios');
  await browser.close();
});

Before(async function () {
  console.log('Launch Browser, performed before each individual test scenario');
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
  // Initialize Page Objects and store in Cucumber's "this" (steps fill will need to have this. appended to access the page objects)
  this.loginPage = new LoginPage(page);
  this.bookDetailsPage = new BookDetailsPage(page);
});

After(async function ({ pickle, result }) {
  console.log('Browser closed after each scenario, and result?.status');
  // screenshot
  if (result?.status == Status.FAILED) {
    await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png',
    });
  }

  await pageFixture.page.close();
  await context.close();
});
