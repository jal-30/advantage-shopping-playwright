export class HomePage {
  constructor(page) {
    this.page = page;
    this.userMenu = page.locator('#menuUser');
  }

  async goto() {
    await this.page.goto('https://www.advantageonlineshopping.com/#/');
  }

  async openLogin() {
    await this.userMenu.click();
    // Wait for login dialog directly
    await this.page.waitForSelector('[name="username"]');
  }
}
