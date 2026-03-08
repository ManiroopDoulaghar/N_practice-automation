const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class SearchResultsPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.readArticle = By.xpath("//a[text()='Read Article']")
  }

  async clickOnReadArticle(){
    this.click(this.readArticle);
  }
}

module.exports = SearchResultsPage;
