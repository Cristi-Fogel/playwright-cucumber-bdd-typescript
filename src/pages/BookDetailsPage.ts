import {Locator, Page} from '@playwright/test';

export class BookDetailsPage {
   page: Page;
   //bookDetailsPageLocators
   searchField: Locator; 
   searchFieldOption: Locator;
   cartBadge: Locator;

   //bookOrderPageLocators
   addBookToCartButton: Locator;

  constructor(page: Page) {
    this.page = page; 
    this.searchField = page.locator('input[type="search"]');
    this.searchFieldOption = page.locator('mat-option[role="option"] span');
    this.addBookToCartButton = page.locator('//button[@class="mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base"]');
    this.cartBadge = page.locator('#mat-badge-content-0');
  }  
}