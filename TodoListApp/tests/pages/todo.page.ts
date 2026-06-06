import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly addButton: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator('input[placeholder="Add a new todo..."]');
    this.addButton = page.locator('button:has-text("Add")');
    this.todoItems = page.locator('ul li');
  }

  async goto() {
    await this.page.goto('http://localhost:4200');
  }

  async addTodo(title: string) {
    await this.input.fill(title);
    await this.addButton.click();
    if (!title.trim()) return;
    await this.page.waitForFunction(
      (t) =>
        Array.from(document.querySelectorAll('ul li span')).some(
          (el) => el.textContent?.trim() === t,
        ),
      title,
      { timeout: 5000 },
    );
  }

  async deleteTodo(title: string) {
    const items = this.todoItems;
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).locator('span').textContent();
      if (text?.trim() === title) {
        await items.nth(i).locator('button:has-text("Delete")').click();
        await this.page.waitForFunction(
          (t) =>
            !Array.from(document.querySelectorAll('ul li span')).some(
              (el) => el.textContent?.trim() === t,
            ),
          title,
          { timeout: 5000 },
        );
        break;
      }
    }
  }

  async getTodoTitles(): Promise<string[]> {
    return await this.todoItems.locator('span').allTextContents();
  }
}
