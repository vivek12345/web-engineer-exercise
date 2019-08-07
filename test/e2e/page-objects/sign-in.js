const FORM_SELECTOR = "form#sign-in";
const EMAIL_SELECTOR = '[type="email"]';
const PASSWORD_SELECTOR = '[type="password"]';
const SUBMIT_SELECTOR = '[type="submit"]';
const ERROR_SELECTOR = ".error";

module.exports = page => {
  return {
    async isVisible() {
      return page.waitForSelector(FORM_SELECTOR, { timeout: 10000 });
    },
    async enterUserName(username) {
      await page.waitForSelector(EMAIL_SELECTOR, { timeout: 10000 });
      return page.type(EMAIL_SELECTOR, username);
    },
    async enterPassword(password) {
      await page.waitForSelector(PASSWORD_SELECTOR, { timeout: 10000 });
      return page.type(PASSWORD_SELECTOR, password);
    },
    async clickSubmit() {
      await page.waitForSelector(SUBMIT_SELECTOR, { timeout: 10000 });
      return page.click(SUBMIT_SELECTOR);
    },
    async hasSubmissionError() {
      await page.waitForSelector(ERROR_SELECTOR, { timeout: 10000 });
    }
  };
};
