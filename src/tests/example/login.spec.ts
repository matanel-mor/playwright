import { test } from '@playwright/test';
import LoginPage from '../../pages/example/loginPage';
import logger from '../../utils/Logger';

test('login', async ({ page }) => {
      logger.info("----------- Starting login test -----------");
      const loginPage = new LoginPage(page);
      const homePage = await loginPage.login();
      await homePage.assertNavigationToHomePage();
});