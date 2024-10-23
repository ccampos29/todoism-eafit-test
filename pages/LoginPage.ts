import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.goto("http://127.0.0.1:5000/#intro");
  }

  async login() {
    await this.page.getByRole("navigation").getByRole("link", { name: "Login" }).click();
    await this.page.getByText("Get a test account").click();
    await this.page.waitForTimeout(2000);
    await this.page.locator("#login-btn").click();
  }
}
