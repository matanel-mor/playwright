import { Page, expect } from "@playwright/test";
import logger from "../utils/Logger";

export default class HomePage {
      constructor(private page: Page) { }

      async navigateToHomePage() {
            if (!process.env.BASE_URL) {
                  logger.error("BASE_URL is not defined in the environment configuration.");
                  throw new Error("BASE_URL is not defined in the environment configuration.");
            }
            this.page.waitForLoadState("domcontentloaded");
            await expect(this.page).toHaveURL(`${process.env.BASE_URL}`, { timeout: 15000 });
            logger.info("Navigated to home page.");
      }
}