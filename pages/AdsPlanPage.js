const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class AdsPlanPage extends BasePage {
  constructor(driver) {
    super(driver);

    // hero validation
    this.heroSection = By.css('[data-uia="ads-landing-page-hero"]');

    // Join now for 7.99
    this.joinNowCta = By.xpath("//*[@data-uia='ads-landing-page-hero']//button[contains(.,'Join')]");
  }

  async assertOnAdsPlanPage() {
    await this.waitForUrlContains("ads");
    await this.waitForElementVisible(this.heroSection);
    console.log("Current URL:", await this.getURLOfCurrentPage());
  }

  async clickJoin() {
    console.log("clicking on the Join now");
    await this.click(this.joinNowCta)
  }
}

module.exports = AdsPlanPage;