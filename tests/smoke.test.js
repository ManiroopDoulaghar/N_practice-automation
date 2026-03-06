require("dotenv").config();

const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const { waitForTitleNotEmpty } = require("../utils/commonUtil");
const HomePage = require("../pages/HomePage");


(async function smoke() {

  const baseUrl = process.env.BASE_URL;

  const options = new chrome.Options();
  options.addArguments("--start-maximized");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {

    const home = new HomePage(driver);

    console.log("Opening:", baseUrl);

    await home.openHome(baseUrl);

    await waitForTitleNotEmpty(driver);

    const title = await driver.getTitle();
    const url = await driver.getCurrentUrl();

    console.log("Title:", title);
    console.log("URL:", url);

    console.log("Smoke test passed");

  } catch (error) {

    console.error("Smoke test failed:", error);

  } finally {

    await driver.quit();

  }

})();