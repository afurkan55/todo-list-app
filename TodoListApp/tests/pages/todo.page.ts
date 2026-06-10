import { Page, Locator } from '@playwright/test';
import { Locators } from './locators';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly addButton: Locator;
  readonly todoItems: Locator;
  readonly deleteButton: Locator;
  readonly editButton: Locator;
  readonly editInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.locator(Locators.input);
    this.addButton = page.locator(Locators.addButton);
    this.todoItems = page.locator(Locators.todoItems);
    this.deleteButton = page.locator(Locators.deleteButton);
    this.editButton = page.locator(Locators.editButton);
    this.editInput = page.locator(Locators.editInput);
    this.saveButton = page.locator(Locators.saveButton);

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
        await items.nth(i).locator(this.deleteButton).click();
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

  async editTodo(originalTitle: string, newTitle: string) {
    const items = this.todoItems;
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).locator('span').textContent();
      if (text?.trim() === originalTitle) {
        await items.nth(i).locator(this.editButton).click();
        await items.nth(i).locator(this.editInput).fill(newTitle);
        await items.nth(i).locator(this.saveButton).click();
        await this.page.waitForFunction(
          (t) => Array.from(document.querySelectorAll('ul li span'))
            .some(el => el.textContent?.trim() === t),
          newTitle,
          { timeout: 5000 }
        );
        break;
      }
    }
  }
}
