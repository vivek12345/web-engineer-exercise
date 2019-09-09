// const APPS_CONTAINER_SELECTOR = '#apps';
const APPS_SELECTOR = 'ul#apps li.app';
const APP_ITEM_SELECTOR = 'ul#apps li.app:nth-child(1)';
const APP_EDIT_BTN_SELECTOR = 'ul#apps li.app:nth-child(1) .edit-app-btn';
const APP_NAME_IDENTIFIER = 'ul#apps li.app:nth-child(1) p';
const APP_LOGO_IDENTIFIER = 'ul#apps li.app:nth-child(1) img';

module.exports = page => {
  return {
    async isVisible() {
      return page.waitForSelector(APPS_SELECTOR, { timeout: 10000 });
    },
    async isNotVisible() {
      return page.waitForSelector(APPS_SELECTOR, {
        timeout: 5000,
        hidden: true
      });
    },
    async assertAppCount(appCount) {
      const apps = await page.$$(APPS_SELECTOR);
      return apps.length === appCount;
    },
    async clickApp() {
      return page.click(APP_ITEM_SELECTOR);
    },
    async clickEditAppBtn() {
      return page.click(APP_EDIT_BTN_SELECTOR);
    },
    async getAppName() {
      await page.waitForSelector(APP_NAME_IDENTIFIER);
      return await page.$eval(APP_NAME_IDENTIFIER, el => el.textContent);
    },
    async getAppLogo() {
      await page.waitForSelector(APP_LOGO_IDENTIFIER);
      return await page.$eval(APP_LOGO_IDENTIFIER, el => el.src);
    }
  };
};
