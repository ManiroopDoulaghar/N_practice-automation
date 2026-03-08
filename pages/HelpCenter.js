const BasePage = require("./BasePage");
const { By } = require("selenium-webdriver");

class HelpCenter extends BasePage {
    constructor(driver) {
        super(driver);
        this.helpSection = By.xpath("//section[@id='search-intro']");
        this.searchInput = By.css("#search-input");
        this.plansAndPricing = By.xpath("//div[@role='listbox']//li[contains(.,'Plans and Pricing')]")
    }

    async verifyHelpCenterPageLoaded() {
        await this.waitForPageLoad();
    }

    async verifyHeader() {
        await this.waitForElementVisible(this.helpSection);
        console.log("Header section is visible.");
    }

    async enterSearchInputAndSelect(text){
       await this.type(this.searchInput,text);
        await this.click(this.plansAndPricing);
    }

}
module.exports = HelpCenter;