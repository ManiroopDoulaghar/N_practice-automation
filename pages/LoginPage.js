const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {

  constructor(driver) {
    super(driver);

    this.emailInput = By.css('[data-uia="email"]');
    this.passwordInput = By.css('[data-uia="password"]');
    this.signInButton = By.css('[data-uia="cta-button"]');
  }

    async assertOnLoginPage() {

      await this.driver.wait(
      async () => {
      const url = await this.driver.getCurrentUrl();
      return url.includes("signup");
    },
    15000,
    "URL did not change to login page"
  );
  const url = await this.driver.getCurrentUrl();
  console.log("Current URL:", url);
  }
}

module.exports = LoginPage;