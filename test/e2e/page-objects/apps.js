const APPS_CONTAINER_SELECTOR = '#apps';
const APPS_SELECTOR = '#apps .app';
const APP_ITEM_SELECTOR = '#apps .app:nth-child(1) a';

module.exports = (page) => {
    return {
        async isVisible() {
            return page.waitForSelector(APPS_CONTAINER_SELECTOR, { timeout: 10000 });
        },
        async isNotVisible() {
            return page.waitForSelector(APPS_CONTAINER_SELECTOR, {
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
        }
    }
}