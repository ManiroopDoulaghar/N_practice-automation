const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {

  constructor(driver) {
    super(driver);

    this.emailInput = By.name('email');
    this.passwordInput = By.name('password');
    this.signInButton = By.css('[data-uia="cta-button"]');
  }

  async assertOnLoginPage() {
    await this.waitForUrlContains("signup");
    await this.waitForElementVisible(this.emailInput);
    console.log("Current URL:", await this.getURLOfCurrentPage());
  }
}

module.exports = LoginPage;