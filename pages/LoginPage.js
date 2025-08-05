const { expect } = require('@playwright/test');


export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('[name="password"]');
    this.rememberMeCheckbox = page.locator('input[name="remember_me"]');
    this.signInButton = page.locator('//*[@id="sign_in_btn"]');
  }

  async login(username, password) {

    await this.usernameInput.fill(username);
    await expect(this.usernameInput).toHaveValue(username);

    await this.passwordInput.fill(password);

    await this.rememberMeCheckbox.check();
    expect(await this.rememberMeCheckbox.isChecked()).toBeTruthy();

    await this.signInButton.click();
  }
}
