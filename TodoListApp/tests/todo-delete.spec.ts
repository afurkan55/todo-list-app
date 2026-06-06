import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/todo.page';

test.describe('Todo Delete', () => {
  test('should delete a todo', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    const uniqueTitle = `Delete me ${Date.now()}`;
    await todoPage.addTodo(uniqueTitle);

    await todoPage.deleteTodo(uniqueTitle);

    const finalTitles = await todoPage.getTodoTitles();
    expect(finalTitles).not.toContain(uniqueTitle);
  });
});
