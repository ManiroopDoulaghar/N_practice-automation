const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class HomePage extends BasePage {

  constructor(driver) {
    super(driver);

    this.heroSection = By.css('[data-uia="hero-vlv"]');

    this.signInLink = By.css('[data-uia="header-login-link"]');

    this.learnMoreButton = By.xpath("//button[@data-uia='promo-banner-cta']");

    //help center from footer
    this.helpCenter = By.css('a[href="https://help.netflix.com"]');
  }

  async openHome(url){
    await this.open(url)
  }

  async verifyPageLoaded() {
    await this.waitForElementVisible(this.heroSection);
    console.log("Home page loaded successfully.");
  }

  async verifyHeader() {
    await this.waitForElementVisible(this.signInLink);
    console.log("Header section is visible.");
  }

  async scrollToAdsSection() {
    await this.scrollIntoView(this.learnMoreButton);
  }

  async clickAdsLearnMore() {
    await this.click(this.learnMoreButton);
  }

  async clickFooterLink(){
    await this.scrollIntoView(this.helpCenter);
    await this.click(this.helpCenter);
  }
}
module.exports = HomePage;