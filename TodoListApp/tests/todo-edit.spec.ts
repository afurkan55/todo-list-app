import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/todo.page';

test.describe('Todo Edit', () => {
  test('should edit a todo title', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    const originalTitle = `Edit me ${Date.now()}`;
    const updatedTitle = `Edited ${Date.now()}`;

    await todoPage.addTodo(originalTitle);
    await todoPage.editTodo(originalTitle, updatedTitle);

    const titles = await todoPage.getTodoTitles();
    expect(titles).toContain(updatedTitle);
    expect(titles).not.toContain(originalTitle);
  });
});