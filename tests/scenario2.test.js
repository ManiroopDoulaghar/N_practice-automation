require("dotenv").config();

const { Builder } = require("selenium-webdriver");

const HomePage = require("../pages/HomePage");
const HelpCenter = require("../pages/HelpCenter");
const PlansAndPricing = require("../pages/PlansAndPricing");
const SearchResultsPage = require("../pages/SearchResultsPage");



async function scenario2(){
     const baseUrl = process.env.BASE_URL || "https://www.netflix.com";
    console.log("Base URL:", baseUrl);

    const driver = await new Builder().forBrowser("chrome").build();

    await driver.manage().window().maximize();

    const homePage = new HomePage(driver);
    const helpCenter = new HelpCenter(driver);
    const searchResults = new SearchResultsPage(driver);
    const plansAndPricing = new PlansAndPricing(driver);

    try {
        console.log("START: scenario2 test");

         // step1: Open Netflix home page and verify it loaded
        await homePage.openHome(baseUrl);
        await homePage.verifyPageLoaded();

        // step2: scroll to the bottom footer section
        await homePage.clickFooterLink();
        await helpCenter.verifyHelpCenterPageLoaded();


        // step3: verify header section
        await helpCenter.verifyHeader();

        //input the plans and pricing
        await helpCenter.enterSearchInputAndSelect("Plans and Pricing");

        await searchResults.clickOnReadArticle();

        //Assert Plans and Pricing loaded and assert header
        await plansAndPricing.verifyPlansAndPricingPageLoaded();
        await plansAndPricing.verifyHeaderOfPlansAndPricingPage();

        await plansAndPricing.verifyAndNavigateToPlansComparisonTableDisplayed();

        await plansAndPricing.verifyPricingForThePlans();

        console.log("Test completed successfully!");

    }catch (error) {
        console.error("Test failed with error:", error);
    } finally {
        await driver.quit();
    }
}

(async () => {
    await scenario2();
})();