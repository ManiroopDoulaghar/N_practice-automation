const BasePage = require("./BasePage");
const { By } = require("selenium-webdriver");

class PlansAndPricing extends BasePage {
    constructor(driver) {
        super(driver);
        this.plansAndPricingHeader = By.xpath("//h1[text()='Plans and Pricing']");
        this.plansAndPricingTable = By.xpath("//div[@data-type='spr-content-block']//span[contains(.,'Netflix Plans')]");
        this.standardPlanWithAds = By.xpath("//div[@data-type='spr-content-block']//span[contains(.,'Standard with ads')]");
        this.standardPlan = By.xpath("//div[@data-type='spr-content-block']//span[text()='Standard']");
        this.premium = By.xpath("//div[@data-type='spr-content-block']//span[text()='Premium']");
        this.standardPlanWithAdsPricing = By.xpath("//h1[contains(.,'Plans and Pricing')]//following::li[contains(.,'Standard with ads')]");
        this.standardPlanPricing = By.xpath("//h1[contains(.,'Plans and Pricing')]//following::li[contains(.,'Standard:')]");
        this.premiumPlanPricing = By.xpath("//h1[contains(.,'Plans and Pricing')]//following::li[contains(.,'Premium')]");
    }

    async verifyPlansAndPricingPageLoaded() {
        await this.waitForPageLoad();
    }

    async verifyHeaderOfPlansAndPricingPage() {
        await this.waitForElementVisible(this.plansAndPricingHeader);
        console.log("Header section is visible.");
    }

    async verifyAndNavigateToPlansComparisonTableDisplayed() {
        await this.scrollIntoView(this.plansAndPricingTable);
        await this.isVisible(this.standardPlanWithAds);
        await this.isVisible(this.standardPlan);
        await this.isVisible(this.premium);
    }

    async verifyPricingForThePlans() {
        const standardPlanWithAdsPrice = await this.getText(this.standardPlanWithAdsPricing);
        const standardPlanPrice = await this.getText(this.standardPlanPricing);
        const premiumPlanPrice = await this.getText(this.premiumPlanPricing);

        console.log("Standard with ads:", standardPlanWithAdsPrice);
        console.log("Standard:", standardPlanPrice);
        console.log("Premium:", premiumPlanPrice);

        //validate if the price is 7.99, 17.99 and 24.99
        if (!standardPlanWithAdsPrice.includes("$7.99")) {
            throw new Error("Standard with ads price is incorrect");
        }

        if (!standardPlanPrice.includes("$17.99")) {
            throw new Error("Standard price is incorrect");
        }

        if (!premiumPlanPrice.includes("$24.99")) {
            throw new Error("Premium price is incorrect");
        }

        console.log("All plan prices validated successfully");
    }

}

module.exports = PlansAndPricing;