import { expect, test } from '@playwright/test';
import LoginPage from '../../pages/example/loginPage';

test('login', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = await loginPage.login();
      await homePage.assertNavigationToHomePage();
});