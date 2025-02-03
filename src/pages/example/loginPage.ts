import { Page, expect } from "@playwright/test";
import logger from "../../utils/Logger";
import HomePage from "./homePage";

export default class LoginPage {
      private readonly usernameInput = "#UserName";
      private readonly passwordInput = "#UserPassword";
      private readonly loginButton = "#loginForm";

      constructor(private page: Page) { }

      async login() {
            if (!process.env.BASE_URL) {
                  logger.error("BASE_URL is not defined in the environment configuration.");
                  throw new Error("BASE_URL is not defined in the environment configuration.");
            }
            if (!process.env.USERNAME) {
                  logger.error("USERNAME is not defined in the environment configuration.");
                  throw new Error("USERNAME is not defined in the environment configuration.");
            }
            if (!process.env.PASSWORD) {
                  logger.error("PASSWORD is not defined in the environment configuration.");
                  throw new Error("PASSWORD is not defined in the environment configuration.");
            }

            if (process.env.BASE_URL && process.env.USERNAME && process.env.PASSWORD) {
                  await this.navigateToLoginPage(`${process.env.BASE_URL}/login`);
                  await expect(this.page).toHaveURL(`${process.env.BASE_URL}/login`);
                  await expect(this.page.locator(this.usernameInput)).toBeVisible();
                  logger.info("Navigated to login page.");

                  await this.fillUsername(process.env.USERNAME);

                  await this.fillPassword(process.env.PASSWORD);

                  await this.clickLoginButton();
            }

            const homePage = new HomePage(this.page);
            return homePage;
      }

      async navigateToLoginPage(url: string) {
            this.page.goto(url, { waitUntil: "domcontentloaded" });
      }

      async fillUsername(username: string) {
            this.page.fill(this.usernameInput, username);
            await expect(this.page.locator(this.usernameInput)).toHaveValue(username);
            logger.info("Filled username.");
      }

      async fillPassword(password: string) {
            this.page.fill(this.passwordInput, password);
            await expect(this.page.locator(this.passwordInput)).toHaveValue(password);
            logger.info("Filled password.");
      }

      async clickLoginButton() {
            this.page.locator(this.loginButton).click()
                  .catch(() => logger.error("Login button not found."))
                  .then(() => logger.info("Clicked login button."));
      }
}