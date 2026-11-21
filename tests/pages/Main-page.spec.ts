import { test, expect, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('Main page tests', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });
  test('Visibility test for Header navigation elements', async () => {
    await mainPage.checkElementsVisability();
  });
  test('Naming test for Header navigation elements', async () => {
    await mainPage.checkElementsText();
  });
  test('Href test for Header navigation elements', async () => {
    await mainPage.checkElementsHrefAttribute();
  });
  test('Light mode switch test', async () => {
    await test.step('Switching to dark mode', async () => {
      await mainPage.clickSwitchThemeButton();
    });
    await test.step('Checking data-theme attribute for light mode', async () => {
      await mainPage.checkDataThemeAttribute();
    });
    await test.step('Switching to dark mode', async () => {
      await mainPage.clickDarkThemeButton();
    });
    await test.step('Checking data-theme attribute for dark mode', async () => {
      await mainPage.checkDarkThemeAttribute();
    });
  });
  test('H1 test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toContainText(
        'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      );
  });
  test(`Light mode value check`, async () => {
    await test.step('Switching to light mode', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Checking light mode value', async () => {
      await mainPage.CheckLayoutLightValue();
    });
  });
  test(`Dark mode value check`, async () => {
    await test.step('Switching to dark mode', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Checking dark mode value', async () => {
      await mainPage.CheckLayoutDarkValue();
    });
  });
});
