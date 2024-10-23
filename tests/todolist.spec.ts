import { test, expect } from "@playwright/test";

test.describe("suite de pruebas", () => {
  async function login({ page }) {
    await page.goto("http://127.0.0.1:5000/#intro");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Login" })
      .click();
    await page.getByText("Get a test account").click();
    await page.waitForSelector("#login-btn", { state: "visible" });
    await page.locator("#login-btn").click();
  }

  async function agregarTarea({ page, tarea }) {
    await page.waitForSelector('[placeholder="What needs to be done?"]', {
      state: "visible",
    });
    await page.getByPlaceholder("What needs to be done?").click();
    await page.getByPlaceholder("What needs to be done?").fill(tarea);
    await page.getByPlaceholder("What needs to be done?").press("Enter");
  }

  test.beforeEach(async ({ page }) => {
    await login({ page });
  });

  test("agregar tarea", async ({ page }) => {
    const tarea = "Mi primera tarea";
    await agregarTarea({ page, tarea });
    await expect(page.getByText(tarea)).toBeVisible();
  });

  test("completar tarea", async ({ page }) => {
    const tarea = "Mi primera tarea";
    await agregarTarea({ page, tarea });
    await page
      .locator("span")
      .filter({ hasText: "check_box_outline_blank Mi" })
      .locator("i")
      .click();
    await expect(
      page
        .locator("span")
        .filter({ hasText: "check_box Mi primera tarea" })
        .locator("i")
    ).toBeVisible();
  });

  test("limpiar tareas", async ({ page }) => {
    const tarea = "Mi primera tarea";
    await agregarTarea({ page, tarea });
    await page
      .locator("span")
      .filter({ hasText: "check_box_outline_blank Mi" })
      .locator("i")
      .click();
    await page.getByText("clear_allClear").click();
    await expect(page.getByText("Done")).toBeVisible();
  });
});
