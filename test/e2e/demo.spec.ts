import { browser, element, by, ExpectedConditions } from 'aurelia-protractor-plugin/protractor';

describe('demo', () => {
  beforeEach(async () => {
    await browser.loadAndWaitForAureliaPage('http://localhost:8080');
  });

  it('should load the page and greet the user', async () => {
    await expect(element(by.tagName('h3')).getText()).toBe('Tutors Course Reader');
    element(by.tagName('input')).sendKeys('https://wit-tutors.github.io/tutors-starter-public');
    browser.sleep(2000);
    await element(by.name('geturl')).click();
    await browser.sleep(2000);
    const url = await element(by.name('url')).getText();
    await browser.loadAndWaitForAureliaPage(url);
    await browser.sleep(2000);
  });
});
