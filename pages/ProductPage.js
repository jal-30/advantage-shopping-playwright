const { expect } = require('@playwright/test');

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.tabletsTile = page.locator("xpath=//*[@id='tabletsImg']");
    this.shopNowButton = page.locator("xpath=//*[@id='tabletsLink']");
    this.product = page.locator("xpath=//div[@class='cell categoryRight']");
    this.addToCartButton = page.locator("xpath=//*[@id='productProperties']/div[4]/button");
  }

  async selectProduct() {
    await this.tabletsTile.hover();
    await this.shopNowButton.waitFor({ state: 'visible' });
    await this.shopNowButton.click();

    await this.product.first().waitFor({ state: 'visible' });
    await expect(this.product.first()).toBeVisible();
    // Click the first product directly
    await this.product.first().click();
  }

  async addToCart() {
    await this.addToCartButton.waitFor({ state: 'visible' });
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }
}
