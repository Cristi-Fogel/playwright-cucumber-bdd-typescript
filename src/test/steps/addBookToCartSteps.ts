import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000 * 2);

Given('user search for a {string}', async function (book) {
  await this.bookDetailsPage.searchField.fill(book);
  await pageFixture.page.waitForTimeout(5000);
  await this.bookDetailsPage.searchFieldOption.click();
});

When('user add the book to the cart', async function () {
  await this.bookDetailsPage.addBookToCartButton.click();
});

Then('the cart badge should get updated', async function () {
  const countInCart = await this.bookDetailsPage.cartBadge.textContent();
  expect(Number(countInCart?.length)).toBeGreaterThan(0);
});
