import {test, expect, Locator, Page} from '@playwright/test';  // TS import

export class LoginPage {
   page: Page;
   loginLink: Locator;
   usernameField: Locator;
   passwordField: Locator;
   loginButton: Locator;
   usernameLink: Locator;
   registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('//span[normalize-space()="Login"]');
    this.usernameField = page.locator('input[formcontrolname="username"]');
    this.passwordField = page.locator('input[formcontrolname="password"]');
    this.loginButton = page.locator('//button[@class="mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base"]');
    this.usernameLink = page.locator("a[class='mat-mdc-menu-trigger mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-primary mat-mdc-button-base ng-star-inserted'] span[class='mdc-button__label']");
    this.registerButton = page.locator('//span[normalize-space()="Register"]');
  }
}