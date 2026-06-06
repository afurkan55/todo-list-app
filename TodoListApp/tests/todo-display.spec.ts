import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/todo.page';

test.describe('Todo Display', () => {
  test('should display Todo List title', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await expect(page.locator('h1')).toHaveText('Todo List');
  });
});
