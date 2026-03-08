const { until } = require("selenium-webdriver");

class BasePage {

  constructor(driver) {
    this.driver = driver;
    this.timeoutMs = 15000;
  }

  async open(url) {
    await this.driver.get(url);
  }

  async waitForTitleNotEmpty() {

    await this.driver.wait(async () => {
      return (await this.driver.getTitle()).length > 0;
    }, this.timeoutMs);

    return await this.driver.getTitle();
  }

  async waitForPageLoad() {

    await this.driver.wait(async () => {

      const state = await this.driver.executeScript(
        "return document.readyState"
      );

      return state === "complete";

    }, this.timeoutMs);

  }

  async findReadyElement(locator) {

    const element = await this.driver.wait(
      until.elementLocated(locator),
      this.timeoutMs
    );

    await this.driver.wait(
      until.elementIsVisible(element),
      this.timeoutMs
    );

    await this.driver.wait(
      until.elementIsEnabled(element),
      this.timeoutMs
    );

    return element;
  }

  async waitForElementVisible(locator) {

    const element = await this.driver.wait(
      until.elementLocated(locator),
      this.timeoutMs
    );

    await this.driver.wait(
      until.elementIsVisible(element),
      this.timeoutMs
    );

    return element;
  }

  async click(locator) {

    const element = await this.findReadyElement(locator);

    try {
      await element.click();
    } catch (error) {

      await this.driver.executeScript(
        "arguments[0].click();",
        element
      );

    }

  }

  async type(locator, text) {

    const element = await this.findReadyElement(locator);

    await element.clear();
    await element.sendKeys(text);

  }

  async scrollIntoView(locator) {

    const element = await this.waitForElementVisible(locator);

    await this.driver.executeScript(
      "arguments[0].scrollIntoView({ block: 'center' });",
      element
    );

  }

  async getText(locator) {

    const element = await this.waitForElementVisible(locator);

    return await element.getText();

  }

  async isVisible(locator) {

    const element = await this.driver.wait(
      until.elementLocated(locator),
      this.timeoutMs
    );

    return await element.isDisplayed();

  }

  async getURLOfCurrentPage() {

    return await this.driver.getCurrentUrl();

  }

  async waitForUrlContains(text) {

    await this.driver.wait(
      async () => {

        const url = await this.getURLOfCurrentPage();

        return url.includes(text);

      },
      this.timeoutMs,
      `URL did not contain '${text}'`
    );

  }

}

module.exports = BasePage;