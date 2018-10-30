const USERS_SELECTOR = '#users';
const USERS_PREVIOUS_NAVIGATION_DISABLED_SELECTOR = '#users .nav span.previous';
const USERS_NEXT_NAVIGATION_DISABLED_SELECTOR = '#users .nav span.next';
const USERS_ITEMS_SELECTOR = '#users ul:nth-child(2) li';

module.exports = (page) => {
    return {
        async isVisible() {
            return page.waitForSelector(USERS_SELECTOR, { timeout: 10000 });
        },
        async assertUserCount(num) {
            const userItems = await page.$$(USERS_ITEMS_SELECTOR);
            return userItems.length === num;
        },
        async isNotVisible() {
            return page.waitForSelector(USERS_SELECTOR, {
                timeout: 10000,
                hidden: true
            });
        },
        async assertPreviousLinkDisabled() {
            return page.waitForSelector(USERS_PREVIOUS_NAVIGATION_DISABLED_SELECTOR, { timeout: 10000 });
        },
        async assertNextLinkDisabled() {
            return page.waitForSelector(USERS_NEXT_NAVIGATION_DISABLED_SELECTOR, { timeout: 10000 });
        }
    }
}