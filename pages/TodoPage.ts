import { Page } from "@playwright/test";

export class TodoPage {
  constructor(private page: Page) {}

  async addTask(taskName: string) {
    await this.page.waitForTimeout(2000);
    await this.page.getByPlaceholder("What needs to be done?").click();
    await this.page.getByPlaceholder("What needs to be done?").fill(taskName);
    await this.page.getByPlaceholder("What needs to be done?").press("Enter");
  }

  async completeTask(taskName: string) {
    await this.page
      .locator("span")
      .filter({ hasText: `check_box_outline_blank ${taskName}` })
      .locator("i")
      .click();
  }

  async clearCompletedTasks() {
    await this.page.getByText("clear_allClear").click();
  }

  async isTaskVisible(taskName: string) {
    return this.page.getByText(taskName);
  }

  async isTaskCompleted(taskName: string) {
    return this.page
      .locator("span")
      .filter({ hasText: `check_box ${taskName}` })
      .locator("i");
  }
}
