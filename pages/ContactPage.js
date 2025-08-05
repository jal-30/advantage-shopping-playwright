export class ContactPage {
  constructor(page) {
    this.page = page;
    this.categoryDropdown = page.locator('select[name="categoryListboxContactUs"]');
    this.productDropdown = page.locator('select[name="productListboxContactUs"]');
    this.emailInput = page.locator('input[name="emailContactUs"]');
    this.subjectTextarea = page.locator('textarea[name="subjectTextareaContactUs"]');
    this.sendButton = page.locator("//button[@id='send_btn']");
  }

  async fillContactForm({ category, product, email, subject }) {
    await this.categoryDropdown.selectOption({ label: category });
    await this.productDropdown.selectOption({ label: product });
    await this.emailInput.fill(email);
    await this.subjectTextarea.fill(subject);
  }

  async submitForm() {
    await this.sendButton.click();
  }
}
