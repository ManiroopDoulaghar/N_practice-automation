require("dotenv").config();

const { Builder } = require("selenium-webdriver");

const BasePage = require("../pages/BasePage");

(async function smoke() {
    const baseUrl = process.env.BASE_URL || "https://www.netflix.com";
    console.log("Base URL:", baseUrl);

    const driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();

    const basePage = new BasePage(driver);

  try {
    console.log("Opening:", baseUrl);

    await basePage.open(baseUrl);

    const title = await basePage.waitForTitleNotEmpty();

    console.log("Title:", title);

    console.log("Smoke test passed");
  } catch (error) {
    console.error("Smoke test failed:", error);
  } finally {
    await driver.quit();
  }
})();