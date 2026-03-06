class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    await this.driver.get(url);
  }

  async waitUntilLocated(locator, timeoutMs = 15000) {
    return await this.driver.wait(until.elementLocated(locator), timeoutMs);
  }

  async waitUntilVisible(element, timeoutMs = 15000) {
    await this.driver.wait(until.elementIsVisible(element), timeoutMs);
  }

  async waitUntilEnabled(element, timeoutMs = 15000) {
    await this.driver.wait(until.elementIsEnabled(element), timeoutMs);
  }
  
}

module.exports = BasePage;