async function waitForTitleNotEmpty(driver, timeoutMs = 15000) {
  await driver.wait(async () => {
    const title = await driver.getTitle();
    return typeof title === "string" && title.length > 0;
  }, timeoutMs);
}

async function waitForUrlContains(driver, part, timeoutMs = 15000) {
  await driver.wait(until.urlContains(part), timeoutMs);
}

module.exports = {
    waitForTitleNotEmpty,
    waitForUrlContains
};