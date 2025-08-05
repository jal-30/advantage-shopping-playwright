import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { SignOutPage } from '../pages/SignOutPage.js';
import { ContactPage } from '../pages/ContactPage.js';

// Load JSON data
const users = require('../testData/users.json');

for (const user of users) {
  test(`End-to-End Shopping Flow - User: ${user.username}`, async ({ page }) => {
    test.setTimeout(60000);
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const signOut = new SignOutPage(page);
    const contact = new ContactPage(page);

    // Go to Home
    await home.goto();

    // Open login dialog
    await home.openLogin();

    // Perform login
    await login.login(user.username, user.password);

    // Wait briefly
    await page.waitForTimeout(2000);

    // Check if login succeeded
    const userIcon = page.locator('#menuUserLink > span');
    if (await userIcon.isVisible()) {
      console.log(` Login successful for user: ${user.username}`);

      // Select Product and Add to Cart
      await product.selectProduct();
      await product.addToCart();
      console.log(` Product selected and added to cart.`);

      // Go to Cart and Checkout
      await cart.gotoCart();
      await cart.proceedToCheckout();
      console.log(` Proceeded to checkout.`);

      // Place Order
      await checkout.placeOrder(user.username, user.password);
      console.log(` Order placed successfully.`);

      // Back to Homepage
      await checkout.backToHome();
      await expect(page).toHaveURL('https://www.advantageonlineshopping.com/#/');
      console.log(` Returned to homepage.`);

      // If contact data exists, fill Contact Us form BEFORE sign out
      if (user.contact) {
        console.log(`ℹ Filling Contact Us form for user: ${user.username}`);

        // Click CONTACT US
        await page.click("//a[normalize-space()='CONTACT US']");

        // Wait for Contact page to load
        await page.waitForSelector('textarea[name="subjectTextareaContactUs"]');

        // Fill Contact form
        await contact.fillContactForm({
          category: user.contact.category,
          product: user.contact.product,
          email: user.contact.email,
          subject: user.contact.subject
        });

        // Submit form
        await contact.submitForm();

        // Assert success message
        await expect(page.locator("//p[@class='roboto-regular successMessage ng-binding']")).toBeVisible();
        console.log(` Contact form submitted for user: ${user.username}`);

        // Return to Home after Contact Us
        await page.click('a[href="#/"]');
        await page.waitForURL('https://www.advantageonlineshopping.com/#/');
        console.log(` Returned to homepage after submitting contact form.`);
      } else {
        console.log(` No contact form data for user: ${user.username}. Skipping contact form.`);
      }

      // Sign Out
      await signOut.signOut();
      await expect(page.locator('#menuUser')).toBeVisible();
      console.log(`Signed out successfully.`);
    } else {
      console.log(` Login failed for user: ${user.username}`);
      // Assert login form still visible
       await expect(page.locator('[name="username"]')).toBeVisible();
    }
  });
}
