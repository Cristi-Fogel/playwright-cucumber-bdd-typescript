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
  await this.loginPage.loginLink.waitFor({ state: 'visible', timeout: 30000 }); //insert wait to ensure element is properly loaded
  await this.loginPage.loginLink.click();
});

Given('User enter the username as {string}', async function (username) {
  await this.loginPage.usernameField.fill(username);
});

Given('User enter the password as {string}', async function (password) {
  await this.loginPage.passwordField.fill(password);
});

When('User click on the login button', async function () {
  await this.loginPage.loginButton.waitFor({ state: 'visible', timeout: 30000 }); //insert wait to ensure element is properly loaded
  await this.loginPage.loginButton.click();
  await pageFixture.page.waitForLoadState();
  await pageFixture.page.waitForTimeout(2000);
});

Then('Login should be success', async function () {
  const textMessage = await this.loginPage.usernameLink.textContent();
  console.log('Username: ' + textMessage);
});

When('Login should fail', async function () {
  const errorMessage = this.loginPage.registerButton;
  await expect(errorMessage).toBeVisible(); 
});
