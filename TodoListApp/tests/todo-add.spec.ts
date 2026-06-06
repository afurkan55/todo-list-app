import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/todo.page';

test.describe('Todo Add', () => {
  test('should add a new todo', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    const uniqueTitle = `Test todo ${Date.now()}`;
    await todoPage.addTodo(uniqueTitle);

    const titles = await todoPage.getTodoTitles();
    expect(titles).toContain(uniqueTitle);
  });

  test('should not add empty todo', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    await todoPage.addTodo('');
    const finalTitles = await todoPage.getTodoTitles();

    expect(finalTitles).not.toContain('');
  });
});
