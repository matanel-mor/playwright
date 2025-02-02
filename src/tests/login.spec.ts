import { expect, test } from '@playwright/test';
import LoginPage from '../pages/loginPage';

test('login', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = await loginPage.login();
      await homePage.navigateToHomePage();
});