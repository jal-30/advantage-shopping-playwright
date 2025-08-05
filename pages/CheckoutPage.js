const { expect } = require('@playwright/test');


export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.nextButton = page.locator("xpath=//div[@class='mobileBtnHandler']//button[@id='next_btn']");
    // SafePay radio button
    this.safePayRadio = page.locator('input[name="safepay"]');
    // SafePay username and password
    this.safePayUsername = page.locator('input[name="safepay_username"]');
    this.safePayPassword = page.locator('input[name="safepay_password"]');
    // Pay Now button
    this.payNowButton = page.locator("xpath=//button[@id='pay_now_btn_SAFEPAY']");
    this.homeIcon = page.locator("xpath=//a[normalize-space()='HOME']");// Home icon to go back to home
    
    
  }

  async placeOrder(username, password) {
    // Proceed from shipping
    // await this.nextButton.waitFor({ state: 'visible' });
    await this.nextButton.click();

    // Select SafePay radio
    await this.safePayRadio.waitFor({ state: 'visible' });
    await this.safePayRadio.check();
    await expect(this.safePayRadio).toBeChecked();


    // Fill SafePay credentials
    await this.safePayUsername.waitFor({ state: 'visible' });
    await this.safePayUsername.fill(username);
    await expect(this.safePayUsername).toHaveValue(username);

    await this.safePayPassword.fill(password);

    // Click Pay Now
    await this.payNowButton.waitFor({ state: 'visible' });
    await this.payNowButton.click();
  }

  async backToHome() {
    await this.homeIcon.click();
  }
}
