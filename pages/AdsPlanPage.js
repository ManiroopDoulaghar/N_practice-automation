const { By, until } = require("selenium-webdriver");
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

    await this.driver.wait(
      async () => {
        const url = await this.driver.getCurrentUrl();
        return url.includes("ads");
      },
      15000,
      "URL did not change to ads plan page"
    );

    const url = await this.driver.getCurrentUrl();
    console.log("Current URL:", url);
  }

  async clickJoin() {
    const join = await this.driver.wait(
      until.elementLocated(this.joinNowCta),
      15000
    );

    const element = await this.driver.findElement(this.joinNowCta);
    await this.driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", element);

    // await this.scrollIntoView(join);

    await this.driver.wait(
      until.elementIsVisible(join),
      15000
    );

    await join.click();
  }
}

module.exports = AdsPlanPage;