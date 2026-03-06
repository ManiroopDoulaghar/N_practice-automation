const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class HomePage extends BasePage {

  constructor(driver) {
    super(driver);

    this.heroSection = By.css('[data-uia="hero-vlv"]');

    this.signInLink = By.css('[data-uia="header-login-link"]');

    this.learnMoreButton = By.xpath("//button[@data-uia='promo-banner-cta']");
  }

  async openHome(baseUrl) {
    await this.open(baseUrl);
  }

  async verifyPageLoaded() {
    const title = await this.driver.getTitle();
    console.log(`Page title: ${title}`);
    if (!title || title.trim() === "") {
      throw new Error("Home page title is empty, page might not have loaded properly.");
    }
  }

  async verifyHeader() {
    const signInLink = await this.driver.findElement(this.signInLink).isDisplayed();
    console.log(`Sign-in link is displayed: ${signInLink}`);
    if (!signInLink) {
      throw new Error("Sign-in link is not displayed.");
    }
  }

  async scrollToAdsSection() {
    const element = await this.driver.findElement(this.learnMoreButton);
    await this.driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", element);
  }

  async clickAdsLearnMore() {
    const learnMore = await this.driver.wait(
      until.elementLocated(this.learnMoreButton),
      15000
    );

    await this.driver.wait(
      until.elementIsVisible(learnMore),
      15000
    );

    await learnMore.click();
  }

}
module.exports = HomePage;