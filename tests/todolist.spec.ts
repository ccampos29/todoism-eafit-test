import { test, expect } from "@playwright/test";
import { LoginPage } from "./../pages/LoginPage";
import { TodoPage } from "./../pages/TodoPage";

test.describe("suite de pruebas", () => {
  let loginPage: LoginPage;
  let todoPage: TodoPage;
  const TAREA = 'Mi primera tarea';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    todoPage = new TodoPage(page);

    await loginPage.navigateTo();
    await loginPage.login();
    await todoPage.addTask(TAREA);
  });

  test("agregar tarea", async () => {
    expect(await todoPage.isTaskVisible(TAREA)).toBeVisible();
  });

  test("completar tarea", async () => {
    await todoPage.completeTask(TAREA);
    expect(await todoPage.isTaskCompleted(TAREA)).toBeVisible();
  });

  test("limpiar tareas", async () => {
    await todoPage.completeTask(TAREA);
    await todoPage.clearCompletedTasks();
    expect(await todoPage.isTaskVisible("Done")).toBeVisible();
  });
});
