const FORM_SELECTOR = 'form#edit-app';
const NAME_SELECTOR = '#name[type="text"]';
const LOGO_SELECTOR = '#logo[type="text"]';
const UPDATE_SELECTOR = '[type="submit"]';
const ERROR_SELECTOR = '.error';

module.exports = page => {
  return {
    async isVisible() {
      return page.waitForSelector(FORM_SELECTOR, { timeout: 10000 });
    },
    async enterName(name) {
      await page.waitForSelector(NAME_SELECTOR, { timeout: 10000 });
      await page.$eval(NAME_SELECTOR, el => (el.value = ''));
      return page.type(NAME_SELECTOR, name);
    },
    async enterLogo(logoUrl) {
      await page.waitForSelector(LOGO_SELECTOR, { timeout: 10000 });
      await page.$eval(LOGO_SELECTOR, el => (el.value = ''));
      return page.type(LOGO_SELECTOR, logoUrl);
    },
    async checkNameValue(name) {
      await page.waitForSelector(NAME_SELECTOR, { timeout: 10000 });
      const nameValue = await page.$eval(NAME_SELECTOR, el => el.value);
      return nameValue === name;
    },
    async checkLogoValue(logoUrl) {
      await page.waitForSelector(LOGO_SELECTOR, { timeout: 10000 });
      const loggValue = await page.$eval(LOGO_SELECTOR, el => el.src);
      return loggValue === logoUrl;
    },
    async clickUpdate() {
      await page.waitForSelector(UPDATE_SELECTOR, { timeout: 10000 });
      return page.click(UPDATE_SELECTOR);
    },
    async hasSubmissionError() {
      await page.waitForSelector(ERROR_SELECTOR, { timeout: 10000 });
    }
  };
};
