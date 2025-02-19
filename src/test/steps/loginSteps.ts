import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000 * 2);

Given('User navigates to the application', async function () {
  await pageFixture.page.setDefaultNavigationTimeout(60000); // Increase navigation timeout
    await pageFixture.page.goto('https://bookcart.azurewebsites.net/');
    await pageFixture.page.waitForLoadState('load'); // Ensure the page is fully loaded 
});

Given('User click on the login link', async function () {
  const loginLink = pageFixture.page.locator('//span[normalize-space()="Login"]');
  await loginLink.waitFor({ state: 'visible', timeout: 30000 }); //insert wait to ensure element is properly loaded
  await loginLink.click();
});

Given('User enter the username as {string}', async function (username) {
  await pageFixture.page
    .locator('input[formcontrolname="username"]')
    .fill(username);
});

Given('User enter the password as {string}', async function (password) {
  await pageFixture.page
    .locator('input[formcontrolname="password"]')
    .fill(password);
});

When('User click on the login button', async function () {
  const loginButton = pageFixture.page.locator('//button[@class="mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base"]');
  await loginButton.waitFor({ state: 'visible', timeout: 30000 }); //insert wait to ensure element is properly loaded
  await loginButton.click();
  // await pageFixture.page.locator('.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary').click();
  await pageFixture.page.waitForLoadState();
  await pageFixture.page.waitForTimeout(2000);
});

Then('Login should be success', async function () {
  const textMessage = await pageFixture.page
    .locator(
      "a[class='mat-mdc-menu-trigger mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-primary mat-mdc-button-base ng-star-inserted'] span[class='mdc-button__label']",
    )
    .textContent();
  console.log('Username: ' + textMessage);
});

When('Login should fail', async function () {
  // const errorMessage = pageFixture.page.locator('mat-error[role="alert"]'); //error message no longer shown from website, validating the register button instead
  const errorMessage = pageFixture.page.locator('//span[normalize-space()="Register"]');
  await expect(errorMessage).toBeVisible(); 
});
