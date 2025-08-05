export class SignOutPage {
  constructor(page) {
    this.page = page;
    // Profile/user icon top right
    this.userMenu = page.locator("xpath=//*[@id='menuUserSVGPath']");
    // Sign Out option in dropdown
    this.signOutButton = page.locator("xpath=//label[@role='link'][normalize-space()='Sign out']");
  }

  async signOut() {
    // Hover over the user menu to show dropdown
    await this.userMenu.click();
    // Wait for Sign out to be visible
    await this.signOutButton.waitFor({ state: 'visible' });
    // Click Sign out
    await this.signOutButton.click();
  }
}
