import test, { expect, Locator, Page } from '@playwright/test';

interface Element {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value?: string;
  };
}
export class MainPage {
  readonly page: Page;
  readonly elements: Element[];
  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo Playwright',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }),
        name: 'MCP',
        text: 'MCP',
        attribute: {
          type: 'href',
          value: '/mcp/introduction',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }),
        name: 'CLI',
        text: 'CLI',
        attribute: {
          type: 'href',
          value: '/agent-cli/introduction',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js',
        text: 'Node.js',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHub repository',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord server',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Switch between dark and light',
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Control+k)' }),
        name: 'Search (Control+k)',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElementsVisability(): Promise<void> {
    for (const { locator, name } of this.elements) {
      await test.step(`Checking visibility of ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
  async checkElementsText(): Promise<void> {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Checking text of ${name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }
  async checkElementsHrefAttribute(): Promise<void> {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`Checking href attribute for ${name}`, async () => {
          await expect.soft(locator(this.page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    }
  }
  async clickSwitchThemeButton(): Promise<void> {
    await this.page.getByLabel('Switch between dark and light').click();
  }
  async checkDataThemeAttribute(): Promise<void> {
    await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
  }
  async clickDarkThemeButton(): Promise<void> {
    await this.page.getByLabel('Switch between dark and light').click();
  }
  async checkDarkThemeAttribute(): Promise<void> {
    await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }
  async setLightMode(): Promise<void> {
    await this.page.evaluate((value) => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
  }
  async setDarkMode(): Promise<void> {
    await this.page.evaluate((value) => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
  }
  async CheckLayoutLightValue(): Promise<void> {
    await expect(this.page).toHaveScreenshot(`pageWithLight-mode.png`);
  }
  async CheckLayoutDarkValue(): Promise<void> {
    await expect(this.page).toHaveScreenshot(`pageWithDark-mode.png`);
  }
}
