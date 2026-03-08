require("dotenv").config();

const { Builder } = require("selenium-webdriver");

const HomePage = require("../pages/HomePage");
const LoginPage = require("../pages/LoginPage");
const AdsPlanPage = require("../pages/AdsPlanPage");

async function scenario1() {
    const baseUrl = process.env.BASE_URL || "https://www.netflix.com";
    console.log("Base URL:", baseUrl);

    const driver = await new Builder().forBrowser("chrome").build();

    await driver.manage().window().maximize();

    const homePage = new HomePage(driver);
    const loginPage = new LoginPage(driver);
    const adsPlanPage = new AdsPlanPage(driver);

    try {

        console.log("START: scenario1 test");
        // step1: Open Netflix home page and verify it loaded
        await homePage.openHome(baseUrl);
        await homePage.verifyPageLoaded();


        // step2: verify header section
        await homePage.verifyHeader();

        // step3 & 4: scroll to ads section and click learn more. Assert the ads plan page loaded
        await homePage.scrollToAdsSection();
        await homePage.clickAdsLearnMore();
        await adsPlanPage.assertOnAdsPlanPage();

        await adsPlanPage.clickJoin();
        await loginPage.assertOnLoginPage();

        console.log("Test completed successfully!");

    } catch (error) {
        console.error("Test failed with error:", error);
    } finally {
        await driver.quit();
    }
}

(async () => {
    await scenario1();
})();