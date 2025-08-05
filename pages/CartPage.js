const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('#menuCart');
    this.checkoutButton = page.locator('#checkOutPopUp');
  }

  async gotoCart() {
    await expect(this.cartIcon).toBeVisible();
    await this.cartIcon.click();
  }

  async proceedToCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }
}
